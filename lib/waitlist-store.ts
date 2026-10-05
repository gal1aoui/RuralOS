// Waiting-list storage: one JSON file, no database.
// - On Vercel (a Blob store connected to the project): a private file in Vercel Blob, waitlist/waitlist.json.
//   Deployed functions can't write to their own disk, so a local file there would lose sign-ups.
// - Anywhere else (local dev, a regular Node server): .data/waitlist.json on disk.
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import type { WaitlistEntry } from "./waitlist";

export type Snapshot = { entries: WaitlistEntry[]; version: string | null };

export interface WaitlistBackend {
  read(): Promise<Snapshot>;
  /** Replaces the file. Returns false when someone else changed it since `version` was read. */
  write(entries: WaitlistEntry[], version: string | null): Promise<boolean>;
}

export class WaitlistNotConfigured extends Error {}

const BLOB_PATH = "waitlist/waitlist.json";

export const blobBackend: WaitlistBackend = {
  async read() {
    const res = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return { entries: [], version: null };
    return { entries: JSON.parse(await new Response(res.stream).text()), version: res.blob.etag };
  },
  async write(entries, version) {
    const body = JSON.stringify(entries, null, 2);
    const common = { access: "private" as const, contentType: "application/json", addRandomSuffix: false, cacheControlMaxAge: 60 };
    try {
      if (version) await put(BLOB_PATH, body, { ...common, allowOverwrite: true, ifMatch: version });
      else await put(BLOB_PATH, body, { ...common, allowOverwrite: false });
      return true;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) return false;
      // Creating the file failed: if another request created it meanwhile, retry on top of theirs.
      if (!version && (await blobBackend.read()).version) return false;
      throw err;
    }
  },
};

export function fileBackend(file = path.join(process.cwd(), ".data", "waitlist.json")): WaitlistBackend {
  return {
    async read() {
      try {
        return { entries: JSON.parse(await readFile(file, "utf8")), version: null };
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return { entries: [], version: null };
        throw err; // a damaged file must never be overwritten with an empty list
      }
    },
    async write(entries) {
      await mkdir(path.dirname(file), { recursive: true });
      const tmp = `${file}.tmp`;
      await writeFile(tmp, JSON.stringify(entries, null, 2));
      await rename(tmp, file);
      return true;
    },
  };
}

function backend(): WaitlistBackend {
  // A connected Blob store sets a read-write token, or a store id used with the project's Vercel OIDC token.
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return blobBackend;
  if (process.env.VERCEL) throw new WaitlistNotConfigured("Connect a Vercel Blob store to this project (it sets BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID).");
  return fileBackend();
}

// One sign-up at a time within this server process (the file backend has no version check).
let queue: Promise<unknown> = Promise.resolve();
const serial = <R>(task: () => Promise<R>): Promise<R> => {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
};

/** Adds a sign-up unless the email is already on the list. */
export async function appendEntry(store: WaitlistBackend, entry: WaitlistEntry): Promise<{ already: boolean }> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const { entries, version } = await store.read();
    if (entries.some((e) => e.email.toLowerCase() === entry.email.toLowerCase())) return { already: true };
    if (await store.write([...entries, entry], version)) return { already: false };
    // Someone wrote first: wait a random time (full jitter) so colliding requests spread out.
    await new Promise((r) => setTimeout(r, Math.random() * Math.min(2000, 50 * 2 ** attempt)));
  }
  throw new Error("waitlist: the file kept changing during the write, try again");
}

/** Removes every entry with this email (deletion requests under GDPR). */
export async function removeEntry(store: WaitlistBackend, email: string): Promise<{ removed: number }> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const { entries, version } = await store.read();
    const kept = entries.filter((e) => e.email.toLowerCase() !== email.toLowerCase());
    if (kept.length === entries.length) return { removed: 0 };
    if (await store.write(kept, version)) return { removed: entries.length - kept.length };
    await new Promise((r) => setTimeout(r, Math.random() * Math.min(2000, 50 * 2 ** attempt)));
  }
  throw new Error("waitlist: the file kept changing during the write, try again");
}

export const addToWaitlist = (entry: WaitlistEntry) => serial(() => appendEntry(backend(), entry));
export const removeFromWaitlist = (email: string) => serial(() => removeEntry(backend(), email));
export const readWaitlist = () => serial(async () => (await backend().read()).entries);

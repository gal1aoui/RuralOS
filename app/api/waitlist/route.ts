import { createHash, timingSafeEqual } from "node:crypto";
import { parseWaitlist, type WaitlistEntry } from "@/lib/waitlist";
import { WaitlistNotConfigured, addToWaitlist, readWaitlist, removeFromWaitlist } from "@/lib/waitlist-store";

// POST: join the waiting list.
// GET (download the list) and DELETE ?email= (remove someone) need WAITLIST_ADMIN_KEY.

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  // Bots fill every field, people never see this one: accept quietly, store nothing.
  if (body && typeof body === "object" && "website" in body && String((body as { website: unknown }).website).trim()) {
    return Response.json({ ok: true, already: false });
  }
  const parsed = parseWaitlist(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
  try {
    const { already } = await addToWaitlist(parsed.entry);
    return Response.json({ ok: true, already });
  } catch (err) {
    console.error("waitlist: could not save", err instanceof Error ? err.message : err);
    const status = err instanceof WaitlistNotConfigured ? 503 : 500;
    return Response.json({ error: "The waiting list is unavailable right now. Please try again later." }, { status });
  }
}

const sameSecret = (a: string, b: string) => timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

// Spreadsheet apps run cells that start with = + - @ as formulas; prefix them so they stay text.
const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;

function toCsv(entries: WaitlistEntry[]) {
  const head = ["createdAt", "name", "email", "interests", "message", "lang"];
  const rows = entries.map((e) => [e.createdAt, e.name, e.email, e.interests.join(" "), e.message ?? "", e.lang].map(cell).join(","));
  return [head.join(","), ...rows].join("\r\n");
}

function isAdmin(request: Request, url: URL) {
  const key = process.env.WAITLIST_ADMIN_KEY;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? url.searchParams.get("key") ?? "";
  return Boolean(key && given && sameSecret(given, key));
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  if (!isAdmin(request, url)) return new Response("Not found", { status: 404 });
  const email = url.searchParams.get("email")?.trim();
  if (!email) return Response.json({ error: "Add ?email= to say who to remove." }, { status: 400 });
  return Response.json(await removeFromWaitlist(email));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!isAdmin(request, url)) return new Response("Not found", { status: 404 });
  const entries = await readWaitlist();
  const day = new Date().toISOString().slice(0, 10);
  const csv = url.searchParams.get("format") === "csv";
  return new Response(csv ? `﻿${toCsv(entries)}` : JSON.stringify(entries, null, 2), {
    headers: {
      "Content-Type": csv ? "text/csv; charset=utf-8" : "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="ruralriver-waitlist-${day}.${csv ? "csv" : "json"}"`,
      "Cache-Control": "no-store",
    },
  });
}

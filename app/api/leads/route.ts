import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// MVP lead store: appends questionnaire requests to .data/leads.json.
// Swap for a database or CRM before deploying to a read-only/serverless host.
const FILE = path.join(process.cwd(), ".data", "leads.json");

type Lead = { name: string; email: string; plan: unknown; consent: true; createdAt: string };

async function readLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<Lead> | null;
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = typeof body?.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body?.consent !== true) {
    return Response.json({ error: "Name, a valid email and consent are required." }, { status: 400 });
  }
  const lead: Lead = { name, email, plan: body.plan ?? null, consent: true, createdAt: new Date().toISOString() };
  const leads = await readLeads();
  leads.push(lead);
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(leads, null, 2));
  return Response.json({ ok: true, reference: `RO-${String(leads.length).padStart(4, "0")}` });
}

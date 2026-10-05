import { hasLang, type Lang, type T } from "./i18n";

// Shared by the waiting-list form (client) and its API route (server).

export const INTERESTS = [
  { id: "stay", label: { en: "Staying in the valley", es: "Alojarme en el valle" } },
  { id: "event", label: { en: "Hosting an event", es: "Organizar un evento" } },
  { id: "land", label: { en: "A farming project on leased land", es: "Un proyecto agrario en tierra arrendada" } },
  { id: "local", label: { en: "I'm local: my house, land or skills", es: "Soy de aquí: mi casa, finca u oficio" } },
  { id: "partner", label: { en: "Partnering, investing or joining the team", es: "Colaborar, invertir o unirme al equipo" } },
] as const satisfies readonly { id: string; label: T }[];

export type InterestId = (typeof INTERESTS)[number]["id"];

export type WaitlistEntry = {
  name: string;
  email: string;
  interests: InterestId[];
  message?: string;
  lang: Lang;
  consent: true;
  createdAt: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDS = new Set<string>(INTERESTS.map((i) => i.id));

/** Checks a submitted form. Returns the entry to store, or the reason it was rejected. */
export function parseWaitlist(body: unknown): { entry: WaitlistEntry } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim().slice(0, 120) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 200) : "";
  const message = typeof b.message === "string" ? b.message.trim().slice(0, 500) : "";
  const interests = Array.isArray(b.interests) ? [...new Set(b.interests.filter((i): i is InterestId => typeof i === "string" && IDS.has(i)))] : [];
  const lang: Lang = typeof b.lang === "string" && hasLang(b.lang) ? b.lang : "en";
  if (!name || !EMAIL.test(email) || b.consent !== true) return { error: "Name, a valid email and consent are required." };
  return { entry: { name, email, interests, ...(message ? { message } : {}), lang, consent: true, createdAt: new Date().toISOString() } };
}

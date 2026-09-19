import { tx, type Lang, type T } from "./i18n";

// Event quote logic, shared by the event builder (/events) and the questionnaire (/plan).
// Venue and kit are our prices. Catering tiers sit inside the researched €10–60
// per guest range. Music, queimada, pulpeira and marquee are estimates until quoted.
// Taxis are booked for guests and paid to the driver, so they're not in our quote.

export const EVENT_TYPES: { id: string; label: T }[] = [
  { id: "birthday", label: { en: "Birthday or anniversary", es: "Cumpleaños o aniversario" } },
  { id: "stag", label: { en: "Stag / hen weekend", es: "Despedida de soltero/a" } },
  { id: "retreat", label: { en: "Company retreat or offsite", es: "Retiro o jornada de empresa" } },
  { id: "family", label: { en: "Family reunion", es: "Reunión familiar" } },
  { id: "magosto", label: { en: "Private magosto (Oct–Nov)", es: "Magosto privado (oct–nov)" } },
  { id: "wedding", label: { en: "Small wedding celebration", es: "Celebración de boda pequeña" } },
];

export const CATERING = [
  { id: "simple", label: { en: "Rustic: empanada, churrasco, bread, local wine", es: "Rústico: empanada, churrasco, pan, vino local" }, perGuest: 25 },
  { id: "feast", label: { en: "Galician feast: pulpo á feira, churrasco, cheeses, bica cake", es: "Festín gallego: pulpo á feira, churrasco, quesos, bica" }, perGuest: 40 },
  { id: "premium", label: { en: "Premium: served menu with Ribeira Sacra wine pairing", es: "Premium: menú servido con maridaje de Ribeira Sacra" }, perGuest: 60 },
] as const satisfies readonly { id: string; label: T; perGuest: number }[];

export const EXTRAS = [
  { id: "kit", label: { en: "Our event kit (gazebo, 40 chairs, tables, lights)", es: "Nuestro kit (carpa, 40 sillas, mesas, luces)" }, price: 150, estimate: false },
  { id: "gaita", label: { en: "Gaiteiro (Galician bagpiper) live set", es: "Gaiteiro en directo" }, price: 250, estimate: true },
  { id: "queimada", label: { en: "Queimada ritual with the traditional spell", es: "Queimada con su conxuro" }, price: 120, estimate: true },
  { id: "pulpeira", label: { en: "Pulpeira cooking octopus on site", es: "Pulpeira cociendo pulpo al momento" }, price: 300, estimate: true },
  { id: "marquee", label: { en: "Large marquee (rain cover, 50+ guests)", es: "Carpa grande (lluvia, 50+ invitados)" }, price: 600, estimate: true },
] as const satisfies readonly { id: string; label: T; price: number; estimate: boolean }[];

export type ExtraId = (typeof EXTRAS)[number]["id"];
export type CateringId = (typeof CATERING)[number]["id"];

export const VENUE_FEE = 400;
export const OWNER_SHARE = 0.8;
export const COORDINATION_RATE = 0.15;
export const COORDINATION_MIN = 300;

export type QuoteRow = { label: string; amount: number; estimate?: boolean; to: string };

export function quoteEvent({ guests, catering, extras, lang }: { guests: number; catering: CateringId; extras: ExtraId[]; lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const cat = CATERING.find((c) => c.id === catering)!;
  const rows: QuoteRow[] = [];
  rows.push({
    label: t({ en: "Venue: a villager's land, grove or cellar", es: "Espacio: finca, souto o adega de un vecino" }),
    amount: VENUE_FEE,
    to: t({ en: `Owner ${OWNER_SHARE * 100}% / RuralOS ${Math.round((1 - OWNER_SHARE) * 100)}%`, es: `Propietario ${OWNER_SHARE * 100} % / RuralOS ${Math.round((1 - OWNER_SHARE) * 100)} %` }),
  });
  rows.push({ label: `${t({ en: "Catering", es: "Catering" })}: ${t(cat.label).split(":")[0]} × ${guests}`, amount: cat.perGuest * guests, to: t({ en: "Local caterer", es: "Catering local" }) });
  for (const e of EXTRAS) {
    if (!extras.includes(e.id)) continue;
    rows.push({ label: t(e.label), amount: e.price, estimate: e.estimate, to: e.id === "kit" ? "RuralOS" : t({ en: "Local supplier", es: "Proveedor local" }) });
  }
  const subtotal = rows.reduce((s, r) => s + r.amount, 0);
  const coordination = Math.max(COORDINATION_MIN, subtotal * COORDINATION_RATE);
  const total = subtotal + coordination;
  const ours = coordination + VENUE_FEE * (1 - OWNER_SHARE) + (extras.includes("kit") ? 150 : 0);
  return { rows, subtotal, coordination, total, perGuest: guests ? total / guests : 0, ownerEarns: VENUE_FEE * OWNER_SHARE, ours };
}

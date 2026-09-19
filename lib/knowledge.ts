import { ACTIVITIES, ADDONS, COMPLIANCE, CONTEXT_POINTS, HOST_OFFERS, LODGING, PACKAGES, RELOCATION, SEASONS, SEASON_NAMES, VISA } from "./data";
import { LOCALES, eur, tx, type Lang, type T } from "./i18n";

// The concierge's knowledge base: one entry per fact card, used both as the
// model's system context and by the offline keyword search fallback.
export type KnowledgeEntry = { id: string; title: string; text: string; link?: string };

function build(lang: Lang): KnowledgeEntry[] {
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const k: KnowledgeEntry[] = [
    { id: "getting-here", title: t({ en: "Getting to San Xoán de Río", es: "Cómo llegar a San Xoán de Río" }), text: t({ en: "San Xoán de Río is in Terra de Trives, Ourense province. The nearest city and main train station is Ourense (about 55–60 min by car). The high-speed train stops at A Gudiña–Porta de Galicia were suspended in June 2025, so arrive at Ourense. We book a licensed taxi for you and you pay the fare to the driver; by law we don't charge for driving guests ourselves. A car is very useful locally.", es: "San Xoán de Río está en Terra de Trives, provincia de Ourense. La ciudad y estación principal más cercana es Ourense (unos 55–60 min en coche). Las paradas del AVE en A Gudiña–Porta de Galicia se suspendieron en junio de 2025, así que llega a Ourense. Te reservamos un taxi con licencia y pagas la carrera al conductor; por ley no cobramos por llevar clientes nosotros. Un coche es muy útil en la zona." }) },
    { id: "weather", title: t({ en: "Climate", es: "Clima" }), text: t({ en: "The village sits at 875 m. Winters are cold, with snow on the nearby mountains (Manzaneda ski season). Summers are warm and dry. Bring layers all year.", es: "El pueblo está a 875 m. Los inviernos son fríos, con nieve en las montañas cercanas (temporada de esquí en Manzaneda). Los veranos son cálidos y secos. Trae capas todo el año." }) },
    { id: "work", title: t({ en: "Remote work", es: "Teletrabajo" }), text: t({ en: "Many village houses have fibre. The Rural Valley campus at Os Biocos (first cohort March 2027) offers gigabit fibre for its founders. For desk options during a stay, ask the host team.", es: "Muchas casas tienen fibra. El campus Rural Valley de Os Biocos (primera promoción en marzo de 2027) ofrece fibra de 1 Gb a sus fundadores. Para opciones de mesa durante tu estancia, pregunta al equipo." }) },
    { id: "contact", title: t({ en: "Booking and human help", es: "Reservas y ayuda humana" }), text: t({ en: "To book, use the Plan my visit questionnaire at /plan, which sends a request to the local host team. The concierge is an AI assistant; a local person confirms every booking.", es: "Para reservar, usa el cuestionario Planifica tu visita en /plan, que envía la solicitud al equipo local. El conserje es un asistente de IA; una persona local confirma cada reserva." }) },
    { id: "visa", title: t({ en: "Visa for non-EU remote workers", es: "Visado para teletrabajadores de fuera de la UE" }), link: "/relocate", text: t({ en: `Spain's telework (digital nomad) visa requires income of 200% of the minimum wage (SMI): about ${e(VISA.monthlyRequired)}/month in 2026 (SMI ${e(VISA.smiAnnual)}/year, Real Decreto 126/2026). Add 75% of the SMI (≈${e(VISA.firstFamily)}/month) for the first family member and 25% (≈${e(VISA.eachExtra)}) for each additional one. You also need a university degree or 3 years' experience. Confirm with the consulate.`, es: `El visado de teletrabajo (nómada digital) exige ingresos del 200 % del SMI: unos ${e(VISA.monthlyRequired)}/mes en 2026 (SMI ${e(VISA.smiAnnual)}/año, Real Decreto 126/2026). Suma el 75 % del SMI (≈${e(VISA.firstFamily)}/mes) por el primer familiar y el 25 % (≈${e(VISA.eachExtra)}) por cada uno más. También se pide titulación universitaria o 3 años de experiencia. Confírmalo con el consulado.` }) },
  ];
  for (const p of PACKAGES) {
    k.push({ id: `pkg-${p.id}`, title: `${t({ en: "Package", es: "Paquete" })}: ${t(p.name)} (${t(p.period)})`, link: "/packages", text: `${t(p.name)}, ${t(p.period)}, ${e(p.price)} ${t({ en: "per person for experiences (lodging booked separately with the host). ", es: "por persona en experiencias (el alojamiento se reserva aparte con el anfitrión). " })}${t(p.tagline)} ${t({ en: "Includes", es: "Incluye" })}: ${p.includes.map(t).join("; ")}.` });
  }
  k.push({ id: "lodging", title: t({ en: "Lodging", es: "Alojamiento" }), link: "/packages", text: t({ en: `Lodging is booked and paid directly with the host, separately from packages. Our renovated stone house is let whole (sleeps ${LODGING.ownHouseSleeps}) at about ${e(LODGING.ownHouseNight)} per night for stays under 30 days, or about ${e(LODGING.monthlyLet)} per month for longer stays. Villagers' houses: ${e(LODGING.marketNightLow)}–${e(LODGING.marketNightHigh)} per night (about ${e(LODGING.marketNightPeak)} in peak months). Group houses in Ourense start around ${e(LODGING.groupPerPersonNight)} per person per night.`, es: `El alojamiento se reserva y paga directamente al anfitrión, aparte de los paquetes. Nuestra casa de piedra se alquila entera (${LODGING.ownHouseSleeps} plazas) por unos ${e(LODGING.ownHouseNight)} la noche en estancias de menos de 30 días, o unos ${e(LODGING.monthlyLet)} al mes en estancias largas. Casas de vecinos: ${e(LODGING.marketNightLow)}–${e(LODGING.marketNightHigh)} la noche (unos ${e(LODGING.marketNightPeak)} en temporada alta). Casas para grupos en Ourense desde unos ${e(LODGING.groupPerPersonNight)} por persona y noche.` }) });
  k.push({ id: "relocation", title: t({ en: "Relocation subscription", es: "Suscripción de reubicación" }), link: "/relocate", text: `${t({ en: "Onboarding costs", es: "La acogida cuesta" })} ${e(RELOCATION.onboarding)}: ${RELOCATION.onboardingIncludes.map(t).join("; ")}. ${t({ en: "Then the subscription costs", es: "Después la suscripción cuesta" })} ${e(RELOCATION.monthly)}/${t({ en: "month", es: "mes" })}: ${RELOCATION.monthlyIncludes.map(t).join("; ")}. ${t(RELOCATION.diyCost)}.` });
  for (const a of ACTIVITIES) {
    const d = t(a.distance);
    const distance = d.startsWith("≈") ? `${d} ${t({ en: "from San Xoán de Río by car", es: "desde San Xoán de Río en coche" })}` : d;
    k.push({ id: `act-${a.id}`, title: `${t({ en: "Activity", es: "Actividad" })}: ${t(a.name)}`, link: "/experiences", text: `${t(a.name)}, ${a.where} (${distance}). ${t({ en: "Seasons", es: "Temporadas" })}: ${a.seasons.map((s) => t(SEASON_NAMES[s])).join(", ")}. ${t(a.blurb)} ${t({ en: "Price", es: "Precio" })}: ${t(a.price)}.` });
  }
  for (const a of ADDONS) {
    k.push({ id: `add-${a.id}`, title: `${t({ en: "Add-on", es: "Extra" })}: ${t(a.name)}`, link: "/events", text: `${t(a.name)}, ${t(a.unit)}. ${t({ en: "Market price", es: "Precio de mercado" })}: ${t(a.market)}. ${t({ en: "Our price", es: "Nuestro precio" })}: ${a.ours === null ? t({ en: "supplier quote plus 10% coordination", es: "presupuesto del proveedor + 10 % de coordinación" }) : e(a.ours)}. ${t({ en: "Partners", es: "Colaboradores" })}: ${t(a.partners)}.${a.note ? " " + t(a.note) : ""}` });
  }
  k.push({ id: "events", title: t({ en: "Hosting a private event or party", es: "Organizar un evento o fiesta privada" }), link: "/events", text: t({ en: "We organise birthdays, stag and hen parties, company retreats, family reunions, magostos and small celebrations on villagers' land, chestnut groves, threshing floors and wine cellars. The venue costs about €400 (the owner keeps 80%). Catering runs €25–60 per guest. Extras include a gaiteiro (≈€250), a queimada (≈€120), an octopus cook (≈€300), our event kit (€150) or a large marquee (≈€600). Our coordination fee is 15% of the subtotal (minimum €300). Use the event builder at /events for a live quote.", es: "Organizamos cumpleaños, despedidas, retiros de empresa, reuniones familiares, magostos y celebraciones pequeñas en fincas, soutos, eras y adegas de vecinos. El espacio cuesta unos 400 € (el propietario se queda el 80 %). El catering va de 25 a 60 € por invitado. Extras: gaiteiro (≈250 €), queimada (≈120 €), pulpeira (≈300 €), nuestro kit (150 €) o carpa grande (≈600 €). Nuestra coordinación es el 15 % del subtotal (mínimo 300 €). Usa el configurador en /events para un presupuesto al momento." }) });
  for (const s of SEASONS) {
    k.push({ id: `season-${s.name}`, title: `${t({ en: "What to do in", es: "Qué hacer en" })} ${t(SEASON_NAMES[s.name]).toLowerCase()}`, link: "/experiences", text: `${t(SEASON_NAMES[s.name])} (${t(s.months)}): ${t(s.headline)}.` });
  }
  for (const h of HOST_OFFERS) {
    k.push({ id: `host-${h.title.en}`, title: `${t({ en: "For local owners", es: "Para propietarios" })}: ${t(h.title)}`, link: "/hosts", text: `${t(h.title)}. ${t(h.share)}. ${t(h.body)}` });
  }
  for (const c of COMPLIANCE) {
    k.push({ id: `legal-${c.item.en}`, title: `${t({ en: "Rules", es: "Normativa" })}: ${t(c.item)}`, link: "/business", text: t(c.detail) });
  }
  for (const c of CONTEXT_POINTS) {
    k.push({ id: `ctx-${c.title.en}`, title: t(c.title), text: t(c.body) });
  }
  return k;
}

export const KNOWLEDGE: Record<Lang, KnowledgeEntry[]> = Object.fromEntries(LOCALES.map((l) => [l, build(l)])) as Record<Lang, KnowledgeEntry[]>;

export const knowledgeText = (lang: Lang) => KNOWLEDGE[lang].map((e) => `## ${e.title}\n${e.text}${e.link ? `\n(→ /${lang}${e.link})` : ""}`).join("\n\n");

const STOP = new Set("a an the and or of to in on for is are what where when how can i we you my me do does it with at by from about there any some which who this that be el la los las un una de del y o en para por que qué con como cómo es son mi me tu te se lo al".split(" "));

const tokens = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9€]+/).filter((t) => t.length > 2 && !STOP.has(t));

// Offline fallback used when the model is unavailable: rank entries by token overlap.
export function searchKnowledge(query: string, lang: Lang, limit = 3): KnowledgeEntry[] {
  const q = new Set(tokens(query));
  if (q.size === 0) return [];
  return KNOWLEDGE[lang].map((e) => {
    let score = 0;
    for (const t of tokens(e.title)) if (q.has(t)) score += 3;
    for (const t of tokens(e.text)) if (q.has(t)) score += 1;
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
}

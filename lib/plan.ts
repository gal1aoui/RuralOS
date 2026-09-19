import { ACTIVITIES, ADDONS, LODGING, PACKAGES, RELOCATION, SEASON_NAMES, VISA, type Kind, type Season } from "./data";
import { CATERING, EVENT_TYPES, EXTRAS, quoteEvent, type CateringId, type ExtraId } from "./event";
import { eur, tx, type Lang, type T } from "./i18n";

export type Purpose = "discover" | "relocate" | "event" | "host" | "work";

export type Answers = {
  purpose?: Purpose;
  group?: "solo" | "couple" | "family" | "friends";
  people?: number;
  length?: "week" | "month" | "trial";
  season?: Season;
  interests?: Kind[];
  lodging?: "own" | "village" | "group" | "none";
  taxi?: boolean;
  situation?: "remote" | "founder" | "family" | "retiree";
  eu?: boolean;
  kids?: boolean;
  eventType?: string;
  guests?: number;
  catering?: CateringId;
  extras?: ExtraId[];
  offer?: ("house" | "land" | "grove" | "cellar" | "skills")[];
  condition?: "ready" | "needs-work";
  nights?: number;
};

export type Choice = { value: string; label: string; hint?: string; icon?: string };
export type Question = { id: keyof Answers; title: string; help?: string; kind: "single" | "multi" | "number" | "boolean"; choices?: Choice[]; min?: number; max?: number; unit?: string };

type C = { value: string; label: T; hint?: T; icon?: string };
const loc = (cs: C[], lang: Lang): Choice[] => cs.map((c) => ({ value: c.value, icon: c.icon, label: tx(c.label, lang), hint: c.hint && tx(c.hint, lang) }));

const PURPOSES: C[] = [
  { value: "discover", icon: "🌿", label: { en: "A holiday or getaway", es: "Vacaciones o escapada" }, hint: { en: "Nature, food, wine, heritage for a week or more", es: "Naturaleza, comida, vino y patrimonio, una semana o más" } },
  { value: "relocate", icon: "🏡", label: { en: "Try living here", es: "Probar a vivir aquí" }, hint: { en: "Remote work, a startup, or moving with family", es: "Teletrabajo, una startup o mudarte con la familia" } },
  { value: "event", icon: "🎉", label: { en: "Host a party or event", es: "Organizar una fiesta o evento" }, hint: { en: "Birthday, retreat, magosto, reunion", es: "Cumpleaños, retiro, magosto, reunión" } },
  { value: "host", icon: "🔑", label: { en: "I'm local: rent my house, land or skills", es: "Soy de aquí: alquilar mi casa, finca u oficio" }, hint: { en: "Earn from what's empty or unused", es: "Saca partido a lo que está vacío" } },
  { value: "work", icon: "💼", label: { en: "A work visit", es: "Una visita de trabajo" }, hint: { en: "Rural Valley, investors, partners", es: "Rural Valley, inversores, socios" } },
];

const SEASON_CHOICES: C[] = [
  { value: "Winter", icon: "❄️", label: SEASON_NAMES.Winter, hint: { en: "Dec–Feb · skiing, Entroido carnival", es: "dic–feb · esquí, Entroido" } },
  { value: "Spring", icon: "🌱", label: SEASON_NAMES.Spring, hint: { en: "Mar–May · waterfalls, green valleys", es: "mar–may · fervenzas, valles verdes" } },
  { value: "Summer", icon: "☀️", label: SEASON_NAMES.Summer, hint: { en: "Jun–Aug · canyon trips, open-air parties", es: "jun–ago · cañón, fiestas al aire libre" } },
  { value: "Autumn", icon: "🍂", label: SEASON_NAMES.Autumn, hint: { en: "Sep–Nov · grape harvest, magosto", es: "sep–nov · vendimia, magosto" } },
];

const INTERESTS: C[] = [
  { value: "Nature", icon: "🥾", label: { en: "Nature & hiking", es: "Naturaleza y senderismo" } },
  { value: "Heritage", icon: "🏛️", label: { en: "Roman & medieval heritage", es: "Patrimonio romano y medieval" } },
  { value: "Food & wine", icon: "🍷", label: { en: "Food & wine", es: "Gastronomía y vino" } },
  { value: "Festival", icon: "🥁", label: { en: "Local festivals", es: "Fiestas locales" } },
  { value: "Adventure", icon: "🎿", label: { en: "Adventure & snow", es: "Aventura y nieve" } },
  { value: "Wellness", icon: "♨️", label: { en: "Hot springs & slow days", es: "Termas y días tranquilos" } },
];

export function questionsFor(a: Answers, lang: Lang): Question[] {
  const t = (x: T) => tx(x, lang);
  const purpose: Question = { id: "purpose", title: t({ en: "What brings you to San Xoán de Río?", es: "¿Qué te trae a San Xoán de Río?" }), help: t({ en: "Pick the closest one. You can change it later.", es: "Elige la más cercana. Puedes cambiarla después." }), kind: "single", choices: loc(PURPOSES, lang) };
  const season = (title: T): Question => ({ id: "season", title: t(title), kind: "single", choices: loc(SEASON_CHOICES, lang) });
  switch (a.purpose) {
    case "discover":
      return [
        purpose,
        { id: "group", title: t({ en: "Who's coming?", es: "¿Quién viene?" }), kind: "single", choices: loc([
          { value: "solo", icon: "🧍", label: { en: "Just me", es: "Solo yo" } }, { value: "couple", icon: "👫", label: { en: "A couple", es: "En pareja" } },
          { value: "family", icon: "👨‍👩‍👧", label: { en: "A family", es: "En familia" } }, { value: "friends", icon: "👯", label: { en: "A group of friends", es: "Con amigos" } }], lang) },
        { id: "people", title: t({ en: "How many people in total?", es: "¿Cuántas personas en total?" }), kind: "number", min: 1, max: 16, unit: t({ en: "people", es: "personas" }) },
        { id: "length", title: t({ en: "How long do you want to stay?", es: "¿Cuánto tiempo quieres quedarte?" }), kind: "single", choices: PACKAGES.map((p) => ({ value: p.id, label: `${t(p.period)}: ${t(p.name)}`, hint: `${eur(p.price, lang)} ${t({ en: "per person, experiences", es: "por persona, experiencias" })}` })) },
        season({ en: "When are you thinking of coming?", es: "¿Cuándo piensas venir?" }),
        { id: "interests", title: t({ en: "What do you love doing?", es: "¿Qué te gusta hacer?" }), help: t({ en: "Choose as many as you like.", es: "Elige todas las que quieras." }), kind: "multi", choices: loc(INTERESTS, lang) },
        { id: "lodging", title: t({ en: "Where would you like to sleep?", es: "¿Dónde te gustaría dormir?" }), kind: "single", choices: loc([
          { value: "own", label: { en: "Our renovated stone house (whole house, sleeps 4)", es: "Nuestra casa de piedra reformada (entera, 4 plazas)" }, hint: { en: `≈${eur(LODGING.ownHouseNight)}/night`, es: `≈${eur(LODGING.ownHouseNight, "es")}/noche` } },
          { value: "village", label: { en: "A villager's house", es: "La casa de un vecino" }, hint: { en: `${eur(LODGING.marketNightLow)}–${eur(LODGING.marketNightHigh)}/night`, es: `${eur(LODGING.marketNightLow, "es")}–${eur(LODGING.marketNightHigh, "es")}/noche` } },
          { value: "group", label: { en: "A group house", es: "Una casa para grupos" }, hint: { en: `from ≈${eur(LODGING.groupPerPersonNight)} per person per night`, es: `desde ≈${eur(LODGING.groupPerPersonNight, "es")} por persona y noche` } },
          { value: "none", label: { en: "I've already arranged somewhere to stay", es: "Ya tengo alojamiento" } }], lang) },
        { id: "taxi", title: t({ en: "Shall we book a licensed taxi from Ourense station?", es: "¿Te reservamos un taxi con licencia desde la estación de Ourense?" }), help: t({ en: "The nearest high-speed stop, A Gudiña, has had no trains stopping since June 2025. You pay the fare to the driver.", es: "En A Gudiña no paran trenes AVE desde junio de 2025. La carrera se paga al taxista." }), kind: "boolean" },
      ];
    case "relocate":
      return [
        purpose,
        { id: "situation", title: t({ en: "What describes you best?", es: "¿Qué te describe mejor?" }), kind: "single", choices: loc([
          { value: "remote", icon: "💻", label: { en: "Remote worker", es: "Teletrabajador/a" } }, { value: "founder", icon: "🚀", label: { en: "Startup founder / entrepreneur", es: "Fundador/a o emprendedor/a" } },
          { value: "family", icon: "👨‍👩‍👧", label: { en: "Moving with my family", es: "Me mudo con mi familia" } }, { value: "retiree", icon: "🌻", label: { en: "Retired or semi-retired", es: "Jubilado/a o casi" } }], lang) },
        { id: "people", title: t({ en: "How many adults are moving?", es: "¿Cuántos adultos se mudan?" }), kind: "number", min: 1, max: 6, unit: t({ en: "adults", es: "adultos" }) },
        { id: "kids", title: t({ en: "Are children coming too?", es: "¿Vienen también niños?" }), help: t({ en: "We'll help with school places.", es: "Te ayudamos con la plaza escolar." }), kind: "boolean" },
        { id: "eu", title: t({ en: "Do you have an EU/EEA passport?", es: "¿Tienes pasaporte de la UE/EEE?" }), help: t({ en: "If not, we'll plan your visa and TIE (foreigner ID card) steps.", es: "Si no, planificamos el visado y la TIE." }), kind: "boolean" },
        { id: "length", title: t({ en: "How long do you want to try living here first?", es: "¿Cuánto tiempo quieres probar primero?" }), kind: "single", choices: PACKAGES.filter((p) => p.id !== "week").map((p) => ({ value: p.id, label: `${t(p.period)}: ${t(p.name)}`, hint: `${eur(p.price, lang)} ${t({ en: "per person", es: "por persona" })}` })) },
        season({ en: "When would you arrive?", es: "¿Cuándo llegarías?" }),
      ];
    case "event":
      return [
        purpose,
        { id: "eventType", title: t({ en: "What are you celebrating?", es: "¿Qué celebráis?" }), kind: "single", choices: EVENT_TYPES.map((e) => ({ value: e.id, label: t(e.label) })) },
        { id: "guests", title: t({ en: "How many guests?", es: "¿Cuántos invitados?" }), kind: "number", min: 8, max: 120, unit: t({ en: "guests", es: "invitados" }) },
        season({ en: "Which season?", es: "¿En qué época?" }),
        { id: "catering", title: t({ en: "What kind of food?", es: "¿Qué tipo de comida?" }), kind: "single", choices: CATERING.map((c) => ({ value: c.id, label: t(c.label), hint: `${eur(c.perGuest, lang)} ${t({ en: "per guest", es: "por invitado" })}` })) },
        { id: "extras", title: t({ en: "Any extras?", es: "¿Algún extra?" }), help: t({ en: "Choose as many as you like. Prices marked ≈ are estimates until the supplier quotes.", es: "Elige los que quieras. Los precios con ≈ son estimados hasta tener presupuesto." }), kind: "multi", choices: EXTRAS.map((e) => ({ value: e.id, label: t(e.label), hint: `${e.estimate ? "≈" : ""}${eur(e.price, lang)}` })) },
      ];
    case "host":
      return [
        purpose,
        { id: "offer", title: t({ en: "What could you offer?", es: "¿Qué podrías ofrecer?" }), help: t({ en: "Choose as many as you like.", es: "Elige todas las que quieras." }), kind: "multi", choices: loc([
          { value: "house", icon: "🏠", label: { en: "A house or flat", es: "Una casa o piso" } }, { value: "land", icon: "🌾", label: { en: "A field or meadow", es: "Una finca o prado" } },
          { value: "grove", icon: "🌰", label: { en: "A chestnut grove (souto)", es: "Un souto de castaños" } }, { value: "cellar", icon: "🍷", label: { en: "A wine cellar (adega) or threshing floor", es: "Una adega o una era" } },
          { value: "skills", icon: "🎶", label: { en: "My skills (guiding, cooking, music, crafts, taxi)", es: "Mi oficio (guía, cocina, música, artesanía, taxi)" } }], lang) },
        { id: "condition", title: t({ en: "What condition is the property in?", es: "¿En qué estado está la propiedad?" }), kind: "single", choices: loc([
          { value: "ready", label: { en: "Ready to use", es: "Lista para usar" } }, { value: "needs-work", label: { en: "Needs some work", es: "Necesita arreglos" }, hint: { en: "The free RE-HABITA advisory service can help with grants", es: "La asesoría gratuita de RE-HABITA ayuda con las subvenciones" } }], lang) },
      ];
    case "work":
      return [
        purpose,
        { id: "people", title: t({ en: "How many people?", es: "¿Cuántas personas?" }), kind: "number", min: 1, max: 8, unit: t({ en: "people", es: "personas" }) },
        { id: "nights", title: t({ en: "How many nights?", es: "¿Cuántas noches?" }), kind: "number", min: 1, max: 14, unit: t({ en: "nights", es: "noches" }) },
        { id: "interests", title: t({ en: "Would you like anything after work?", es: "¿Te apetece algo después del trabajo?" }), kind: "multi", choices: loc(INTERESTS.filter((i) => ["Food & wine", "Nature", "Heritage"].includes(i.value)), lang) },
      ];
    default:
      return [purpose];
  }
}

export function isAnswered(q: Question, a: Answers) {
  const v = a[q.id];
  if (q.kind === "multi") return Array.isArray(v) && v.length > 0;
  if (q.kind === "boolean") return typeof v === "boolean";
  return v !== undefined && v !== "";
}

export type Line = { label: string; amount: number; estimate?: boolean; optional?: boolean };
export type Recommendation = { headline: string; summary: string; lines: Line[]; total: number; totalLabel: string; next: { href: string; label: string }[]; notes: string[]; activities: typeof ACTIVITIES };

const RURAL_VALLEY_MONTHLY = 350; // published campus fee (housing, meals, fibre, mentoring)

function matchActivities(season?: Season, interests: Kind[] = []) {
  return ACTIVITIES.filter((x) => (!season || x.seasons.includes(season)) && (interests.length === 0 || interests.includes(x.kind))).slice(0, 6);
}

const addon = (id: string) => ADDONS.find((x) => x.id === id)!;

export function recommend(a: Answers, lang: Lang): Recommendation {
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const people = a.people ?? 2;
  const taxiNote = t({ en: "We'll book a licensed taxi from Ourense station; you pay the fare to the driver (by law we can't charge for transport ourselves).", es: "Reservamos un taxi con licencia desde la estación de Ourense; pagas la carrera al conductor (por ley no podemos cobrar el transporte nosotros)." });
  switch (a.purpose) {
    case "discover": {
      const pkg = PACKAGES.find((p) => p.id === (a.length ?? "week"))!;
      const lines: Line[] = [{ label: `${t(pkg.name)} (${t(pkg.period)}) × ${people}`, amount: pkg.price * people }];
      const nights = pkg.id === "week" ? 7 : 0;
      const months = pkg.id === "month" ? 1 : pkg.id === "trial" ? 3 : 0;
      const houses = Math.ceil(people / LODGING.ownHouseSleeps);
      if (a.lodging === "own") lines.push(nights
        ? { label: t({ en: `Our stone house (whole house) × ${houses > 1 ? `${houses} lets × ` : ""}${nights} nights`, es: `Nuestra casa de piedra (entera) × ${houses > 1 ? `${houses} alquileres × ` : ""}${nights} noches` }), amount: LODGING.ownHouseNight * nights * houses, estimate: true }
        : { label: t({ en: `Our stone house · ${months} month(s), seasonal let`, es: `Nuestra casa de piedra · ${months} mes(es), alquiler de temporada` }), amount: LODGING.monthlyLet * months, estimate: true });
      if (a.lodging === "village") lines.push(nights
        ? { label: t({ en: `Villager's house × ${nights} nights (peak ≈${e(LODGING.marketNightPeak)})`, es: `Casa de un vecino × ${nights} noches (temporada alta ≈${e(LODGING.marketNightPeak)})` }), amount: LODGING.marketNightPeak * nights, estimate: true }
        : { label: t({ en: `Villager's house · ${months} month(s)`, es: `Casa de un vecino · ${months} mes(es)` }), amount: LODGING.monthlyLet * months, estimate: true });
      if (a.lodging === "group") lines.push({ label: t({ en: `Group house · ${people} × ${nights || months * 30} nights`, es: `Casa para grupos · ${people} × ${nights || months * 30} noches` }), amount: LODGING.groupPerPersonNight * people * (nights || months * 30), estimate: true });
      const i = a.interests ?? [];
      if (i.includes("Food & wine")) lines.push({ label: t({ en: `Optional: full-day Ribeira Sacra wine tour × ${people}`, es: `Opcional: ruta de vino de día completo × ${people}` }), amount: addon("winetour").ours! * people, optional: true });
      if (i.includes("Adventure") && a.season === "Winter") lines.push({ label: t({ en: `Optional: Manzaneda ski day × ${people} (pass extra, €23–28)`, es: `Opcional: día de esquí en Manzaneda × ${people} (forfait aparte, 23–28 €)` }), amount: addon("ski").ours! * people, optional: true });
      if (i.includes("Nature") || i.includes("Heritage")) lines.push({ label: t({ en: `Optional: stargazing night at Os Biocos × ${people}`, es: `Opcional: noche de estrellas en Os Biocos × ${people}` }), amount: addon("stars").ours! * people, optional: true });
      if (i.includes("Festival") && a.season === "Autumn") lines.push({ label: t({ en: `Optional: private magosto × ${people}`, es: `Opcional: magosto privado × ${people}` }), amount: addon("magosto").ours! * people, optional: true });
      const total = lines.filter((l) => !l.optional).reduce((s, l) => s + l.amount, 0);
      return {
        headline: `${t(pkg.name)}, ${t(pkg.period)}`,
        summary: t(pkg.tagline),
        lines, total, totalLabel: t({ en: `Total for ${people} (excluding optional extras)`, es: `Total para ${people} (sin extras opcionales)` }),
        next: [{ href: "/packages", label: t({ en: "Compare packages", es: "Comparar paquetes" }) }, { href: "/experiences", label: t({ en: "See all experiences", es: "Ver todas las experiencias" }) }],
        notes: [
          t({ en: "Lodging is booked and paid directly with the host, separately from the experiences package. That keeps both simple and legal.", es: "El alojamiento se reserva y paga directamente al anfitrión, aparte del paquete de experiencias. Así todo es sencillo y legal." }),
          ...(a.taxi ? [taxiNote] : []),
          t({ en: "A local host confirms availability and final prices within 24 hours.", es: "Un anfitrión local confirma disponibilidad y precios en 24 horas." }),
        ],
        activities: matchActivities(a.season, i),
      };
    }
    case "relocate": {
      const pkg = PACKAGES.find((p) => p.id === (a.length ?? "trial"))!;
      const months = pkg.id === "month" ? 1 : 3;
      const lines: Line[] = [
        { label: `${t(pkg.name)} (${t(pkg.period)}) × ${people} ${t({ en: "adult(s)", es: "adulto(s)" })}`, amount: pkg.price * people },
        a.situation === "founder"
          ? { label: t({ en: `Rural Valley cabin incl. meals, paid to the campus · ${months} month(s) × ${people}`, es: `Cabaña de Rural Valley con comidas, pagada al campus · ${months} mes(es) × ${people}` }), amount: RURAL_VALLEY_MONTHLY * months * people }
          : { label: t({ en: `Seasonal let for the trial · ${months} month(s)`, es: `Alquiler de temporada para la prueba · ${months} mes(es)` }), amount: LODGING.monthlyLet * months, estimate: true },
        { label: t({ en: "Relocation onboarding (per household)", es: "Acogida y trámites (por hogar)" }), amount: RELOCATION.onboarding },
        { label: t({ en: `Then, if you stay: subscription ${e(RELOCATION.monthly)}/month`, es: `Después, si te quedas: suscripción ${e(RELOCATION.monthly)}/mes` }), amount: RELOCATION.monthly, optional: true },
      ];
      const notes = [
        a.eu === false
          ? t({ en: `Without an EU passport: plan your visa first. Spain's telework (digital nomad) visa requires 200% of the minimum wage, about ${e(VISA.monthlyRequired)}/month in 2026, plus ${e(VISA.firstFamily)}/month for the first family member and ${e(VISA.eachExtra)} for each additional one. We prepare the NIE/TIE steps and documents.`, es: `Sin pasaporte de la UE: primero el visado. El visado de teletrabajo (nómada digital) exige el 200 % del SMI, unos ${e(VISA.monthlyRequired)}/mes en 2026, más ${e(VISA.firstFamily)}/mes por el primer familiar y ${e(VISA.eachExtra)} por cada uno adicional. Preparamos los pasos de NIE/TIE y los documentos.` })
          : t({ en: "With an EU passport: you need EU-citizen registration, the NIE and the padrón. We book the appointments.", es: "Con pasaporte de la UE: necesitas el registro de ciudadano de la UE, el NIE y el padrón. Pedimos las citas." }),
        a.kids ? t({ en: "Families: we arrange school places and the health-centre registration during onboarding.", es: "Familias: gestionamos plaza escolar y alta en el centro de salud durante la acogida." }) : "",
        a.situation === "founder" ? t({ en: "Founders: apply to the Rural Valley campus at Os Biocos (€350/month including housing and meals, first cohort March 2027). We add onboarding and experiences on top. We don't compete with it.", es: "Fundadores: solicitad plaza en el campus Rural Valley de Os Biocos (350 €/mes con alojamiento y comidas, primera promoción en marzo de 2027). Nosotros añadimos acogida y experiencias. No competimos con él." }) : "",
        a.season === "Winter" ? t({ en: "You'd be arriving in winter at 875 m. We check the heating before you arrive.", es: "Llegarías en invierno a 875 m. Revisamos la calefacción antes de tu llegada." }) : "",
      ].filter(Boolean);
      const total = lines.filter((l) => !l.optional).reduce((s, l) => s + l.amount, 0);
      return {
        headline: a.situation === "founder" ? t({ en: "Rural Valley + RuralOS onboarding", es: "Rural Valley + acogida RuralOS" }) : `${t(pkg.name)}, ${t(pkg.period)}`,
        summary: t({ en: "Test living here with an easy way out, then keep a local fixer on subscription if you stay.", es: "Prueba a vivir aquí con una salida fácil y, si te quedas, mantén a alguien local de confianza por suscripción." }),
        lines, total, totalLabel: t({ en: "Trial total (excluding the optional subscription)", es: "Total de la prueba (sin la suscripción opcional)" }),
        next: [{ href: "/relocate", label: t({ en: "How relocation works", es: "Cómo funciona la reubicación" }) }, { href: "/concierge", label: t({ en: "Ask the concierge", es: "Pregunta al conserje" }) }],
        notes, activities: matchActivities(a.season, []),
      };
    }
    case "event": {
      const guests = a.guests ?? 30;
      const q = quoteEvent({ guests, catering: a.catering ?? "feast", extras: a.extras ?? ["kit"], lang });
      const type = EVENT_TYPES.find((x) => x.id === a.eventType);
      const lines: Line[] = [...q.rows.map((r) => ({ label: r.label, amount: r.amount, estimate: r.estimate })), { label: t({ en: "Coordination (15%, minimum €300)", es: "Coordinación (15 %, mínimo 300 €)" }), amount: q.coordination }];
      return {
        headline: `${type ? t(type.label) : t({ en: "Private event", es: "Evento privado" })} · ${guests} ${t({ en: "guests", es: "invitados" })}`,
        summary: t({ en: `${e(q.perGuest)} per guest, all included. The landowner earns ${e(q.ownerEarns)} from the venue fee.`, es: `${e(q.perGuest)} por invitado, todo incluido. El propietario gana ${e(q.ownerEarns)} por el espacio.` }),
        lines, total: q.total, totalLabel: t({ en: "Estimated total", es: "Total estimado" }),
        next: [{ href: "/events", label: t({ en: "Fine-tune in the event builder", es: "Ajustar en el configurador" }) }],
        notes: [
          a.season === "Summer" ? t({ en: "Summer means fire risk: no open-fire queimada or roasting outdoors on high-risk days. We follow the official alerts and keep alternatives ready.", es: "En verano hay riesgo de incendio: sin queimada ni fuego al aire libre en días de riesgo alto. Seguimos los avisos oficiales y tenemos alternativas." }) : "",
          a.eventType === "magosto" && a.season !== "Autumn" ? t({ en: "Magostos are an October–November tradition. We suggest moving the date.", es: "El magosto es tradición de octubre y noviembre. Te sugerimos cambiar la fecha." }) : "",
          t({ en: "Guests arriving by train: we book licensed taxis, paid to the driver.", es: "Invitados que llegan en tren: reservamos taxis con licencia, se pagan al conductor." }),
          t({ en: "Every event is covered by our liability insurance, and we notify the Concello (town hall).", es: "Todos los eventos tienen nuestro seguro de responsabilidad civil y se comunican al Concello." }),
        ].filter(Boolean),
        activities: matchActivities(a.season, ["Food & wine", "Festival"]),
      };
    }
    case "host": {
      const offer = a.offer ?? [];
      const lines: Line[] = [];
      if (offer.includes("house")) lines.push({ label: t({ en: "House: ≈60 nights × €110 × 85% share", es: "Casa: ≈60 noches × 110 € × 85 %" }), amount: 60 * 110 * 0.85, estimate: true });
      const venues = offer.filter((o) => o === "land" || o === "grove" || o === "cellar").length;
      if (venues) lines.push({ label: t({ en: `Venue(s): ≈8 events × €400 × 80% share${venues > 1 ? ` × ${venues}` : ""}`, es: `Espacio(s): ≈8 eventos × 400 € × 80 %${venues > 1 ? ` × ${venues}` : ""}` }), amount: 8 * 400 * 0.8 * venues, estimate: true });
      if (offer.includes("skills")) lines.push({ label: t({ en: "Skills: ≈20 bookings × €80", es: "Oficio: ≈20 reservas × 80 €" }), amount: 20 * 80, estimate: true });
      const total = lines.reduce((s, l) => s + l.amount, 0);
      return {
        headline: t({ en: "Become a RuralOS host", es: "Hazte anfitrión de RuralOS" }),
        summary: t({ en: "You keep 85% on stays and 80% on venue fees. We bring the guests, the insurance and the paperwork.", es: "Te quedas el 85 % de las estancias y el 80 % de los espacios. Ponemos los huéspedes, el seguro y el papeleo." }),
        lines, total, totalLabel: t({ en: "Estimated first-year earnings for you", es: "Ingresos estimados para ti el primer año" }),
        next: [{ href: "/hosts", label: t({ en: "Hosting terms", es: "Condiciones" }) }],
        notes: [
          a.condition === "needs-work" ? t({ en: "Needs work: we'll put you in touch with the free RE-HABITA RURAL LAB advisory service. About 60% of its 170+ requests are about grants and financing.", es: "Necesita arreglos: te ponemos en contacto con la asesoría gratuita de RE-HABITA RURAL LAB. Cerca del 60 % de sus 170+ consultas son sobre ayudas y financiación." }) : t({ en: "Ready now: we'll visit, take photos and list you within a week.", es: "Lista: vamos a verla, hacemos fotos y la publicamos en una semana." }),
          offer.includes("house") ? t({ en: "Short stays need the whole house registered as a tourist rental (VUT) in REAT; we handle the declaration with you. Rooms alone can't be let as a VUT.", es: "Las estancias cortas requieren dar de alta la casa entera como vivienda de uso turístico (VUT) en el REAT; hacemos la declaración contigo. No se pueden alquilar habitaciones como VUT." }) : "",
          t({ en: "You're paid the week after each stay or event.", es: "Cobras la semana siguiente a cada estancia o evento." }),
        ].filter(Boolean),
        activities: [],
      };
    }
    case "work": {
      const nights = a.nights ?? 3;
      const houses = Math.ceil(people / LODGING.ownHouseSleeps);
      const lines: Line[] = [{ label: t({ en: `Our stone house (whole house) × ${nights} nights${houses > 1 ? ` × ${houses}` : ""}`, es: `Nuestra casa de piedra (entera) × ${nights} noches${houses > 1 ? ` × ${houses}` : ""}` }), amount: LODGING.ownHouseNight * nights * houses, estimate: true }];
      const i = a.interests ?? [];
      if (i.includes("Food & wine")) lines.push({ label: t({ en: `Optional: winery visit & tasting × ${people}`, es: `Opcional: visita y cata en bodega × ${people}` }), amount: addon("winery").ours! * people, optional: true });
      if (i.includes("Nature") || i.includes("Heritage")) lines.push({ label: t({ en: `Optional: guided walk × ${people}`, es: `Opcional: paseo guiado × ${people}` }), amount: addon("hike").ours! * people, optional: true });
      const total = lines.filter((l) => !l.optional).reduce((s, l) => s + l.amount, 0);
      return {
        headline: t({ en: "Work visit", es: "Visita de trabajo" }),
        summary: t({ en: "Stay a short drive from the Rural Valley campus, with an evening out if you like.", es: "Alójate a pocos minutos del campus Rural Valley, con plan de tarde si te apetece." }),
        lines, total, totalLabel: t({ en: `Total for ${people} (excluding optional extras)`, es: `Total para ${people} (sin extras opcionales)` }),
        next: [{ href: "/experiences", label: t({ en: "After-work ideas", es: "Ideas para después del trabajo" }) }],
        notes: [taxiNote, t({ en: "Ask for an invoice to your company. Group rates apply from 6 people.", es: "Pide factura a nombre de tu empresa. Tarifa de grupo a partir de 6 personas." })],
        activities: matchActivities(undefined, i),
      };
    }
    default:
      return { headline: "", summary: "", lines: [], total: 0, totalLabel: "", next: [], notes: [], activities: [] };
  }
}

import { ACTIVITIES, ADDONS, LODGING, PACKAGES, SEASON_NAMES, VISA, type Kind, type Season } from "./data";
import { CATERING, EVENT_TYPES, EXTRAS, quoteEvent, type CateringId, type ExtraId } from "./event";
import { eur, tx, type Lang, type T } from "./i18n";
import { LEASE, PARCELS, PROJECTS, quoteLease, type ProjectId } from "./land";

export type Purpose = "discover" | "startup" | "land" | "event" | "host" | "work";

export type Answers = {
  purpose?: Purpose;
  group?: "solo" | "couple" | "family" | "friends";
  people?: number;
  length?: "week" | "month" | "trial";
  season?: Season;
  interests?: Kind[];
  lodging?: "own" | "village" | "group" | "none";
  taxi?: boolean;
  projectType?: ProjectId;
  hectares?: number;
  years?: number;
  workers?: number;
  teamHousing?: boolean;
  ruralValley?: boolean;
  needs?: ("desk" | "housing" | "land" | "event")[];
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
  { value: "startup", icon: "🚀", label: { en: "Land my startup here", es: "Traer mi startup aquí" }, hint: { en: "Rural Valley campus, a season with the team, a pilot on the land", es: "Campus Rural Valley, una temporada con el equipo, un piloto en la finca" } },
  { value: "land", icon: "🌾", label: { en: "Start an agricultural project", es: "Montar un proyecto agrario" }, hint: { en: "Lease land for 5 to 25 years: chestnuts, organic, cattle, hives", es: "Arrendar tierra de 5 a 25 años: castaños, ecológico, vacuno, colmenas" } },
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
    case "land":
      return [
        purpose,
        { id: "projectType", title: t({ en: "What would you grow or raise?", es: "¿Qué cultivarías o criarías?" }), kind: "single", choices: PROJECTS.map((p) => ({ value: p.id, icon: p.icon, label: t(p.label), hint: t({ en: `from ${p.minHa} ha`, es: `desde ${p.minHa} ha` }) })) },
        { id: "hectares", title: t({ en: "How many hectares do you need?", es: "¿Cuántas hectáreas necesitas?" }), help: t({ en: `The example parcels add up to ${PARCELS.reduce((s, p) => s + p.ha, 0).toFixed(1)} ha across the municipality.`, es: `Las fincas de ejemplo suman ${PARCELS.reduce((s, p) => s + p.ha, 0).toFixed(1)} ha en todo el concello.` }), kind: "number", min: 1, max: 40, unit: "ha" },
        { id: "years", title: t({ en: "For how many years?", es: "¿Por cuántos años?" }), help: t({ en: "Five years is the legal minimum for a rural lease in Spain (Ley 49/2003).", es: "Cinco años es el mínimo legal de un arrendamiento rústico en España (Ley 49/2003)." }), kind: "single", choices: LEASE.terms.map((y) => ({ value: String(y), label: `${y} ${t({ en: "years", es: "años" })}` })) },
        { id: "workers", title: t({ en: "How many people would you employ locally?", es: "¿A cuánta gente contratarías aquí?" }), help: t({ en: "Seasonal or permanent. We recruit in the village and the valley first.", es: "De temporada o fijos. Buscamos primero en el pueblo y el valle." }), kind: "number", min: 0, max: 12, unit: t({ en: "people", es: "personas" }) },
        { id: "teamHousing", title: t({ en: "Does your team need housing here?", es: "¿Tu equipo necesita alojamiento aquí?" }), help: t({ en: "We place teams in villagers' houses on seasonal lets.", es: "Alojamos a los equipos en casas de vecinos con alquiler de temporada." }), kind: "boolean" },
      ];
    case "startup":
      return [
        purpose,
        { id: "people", title: t({ en: "How many people in the team?", es: "¿Cuántas personas sois en el equipo?" }), kind: "number", min: 1, max: 8, unit: t({ en: "people", es: "personas" }) },
        { id: "ruralValley", title: t({ en: "Are you joining the Rural Valley campus?", es: "¿Entráis en el campus Rural Valley?" }), help: t({ en: "The village's startup campus at Os Biocos: €350/month with housing, meals and gigabit fibre. First cohort March 2027.", es: "El campus de startups del pueblo en Os Biocos: 350 €/mes con alojamiento, comidas y fibra de 1 Gb. Primera promoción en marzo de 2027." }), kind: "boolean" },
        { id: "length", title: t({ en: "How long are you coming for?", es: "¿Cuánto tiempo venís?" }), kind: "single", choices: PACKAGES.filter((p) => p.id !== "week").map((p) => ({ value: p.id, label: `${t(p.period)}: ${t(p.name)}`, hint: `${eur(p.price, lang)} ${t({ en: "per person", es: "por persona" })}` })) },
        { id: "needs", title: t({ en: "What does the startup need here?", es: "¿Qué necesita la startup aquí?" }), help: t({ en: "Choose as many as you like.", es: "Elige todas las que quieras." }), kind: "multi", choices: loc([
          { value: "desk", icon: "💻", label: { en: "A desk with fibre", es: "Una mesa con fibra" } }, { value: "housing", icon: "🏠", label: { en: "Housing for the team", es: "Alojamiento para el equipo" } },
          { value: "land", icon: "🌾", label: { en: "Land for an agri-food pilot", es: "Tierra para un piloto agroalimentario" } }, { value: "event", icon: "🎉", label: { en: "A team retreat or launch event", es: "Un retiro de equipo o evento de lanzamiento" } }], lang) },
        season({ en: "When would you arrive?", es: "¿Cuándo llegaríais?" }),
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
    case "land": {
      const project = a.projectType ?? "organic";
      const pr = PROJECTS.find((p) => p.id === project)!;
      const wanted = a.hectares ?? pr.minHa;
      const years = Number(a.years ?? LEASE.terms[1]);
      // Assemble parcels that suit the project, biggest first, until the hectares are covered.
      const picked: string[] = [];
      let got = 0;
      for (const p of [...PARCELS].sort((x, y) => (y.suggested.includes(project) ? 1 : 0) - (x.suggested.includes(project) ? 1 : 0) || y.ha - x.ha)) {
        if (got >= wanted || picked.length >= 4) break;
        picked.push(p.id);
        got += p.ha;
      }
      const q = quoteLease({ parcelIds: picked, years, project, lang });
      const lines: Line[] = q.rows.map((r) => ({ label: `${r.label}${r.perYear ? ` · ${t({ en: "per year", es: "al año" })}` : ""}`, amount: r.amount, estimate: r.estimate }));
      const workers = a.workers ?? 0;
      if (a.teamHousing) lines.push({ label: t({ en: `Optional: team housing in villagers' houses, ≈${e(LODGING.monthlyLet)}/month per house (booked with the owner)`, es: `Opcional: alojamiento del equipo en casas de vecinos, ≈${e(LODGING.monthlyLet)}/mes por casa (se reserva con el propietario)` }), amount: LODGING.monthlyLet, estimate: true, optional: true });
      const notes = [
        t({ en: `${picked.length} example parcel(s), ${q.ha.toFixed(1)} ha, matched to ${t(pr.label).toLowerCase()}. Real availability is confirmed with each owner; parcels with an unknown owner go through the Banco de Terras.`, es: `${picked.length} finca(s) de ejemplo, ${q.ha.toFixed(1)} ha, ajustadas a ${t(pr.label).toLowerCase()}. La disponibilidad real se confirma con cada propietario; las de propietario desconocido pasan por el Banco de Terras.` }),
        q.ha < wanted ? t({ en: `You asked for ${wanted} ha; the listed examples reach ${q.ha.toFixed(1)}. The Cambela polygon (96.4 ha) shows the municipality has more; we go door to door.`, es: `Pediste ${wanted} ha; los ejemplos publicados llegan a ${q.ha.toFixed(1)}. El polígono de Cambela (96,4 ha) demuestra que el concello tiene más; vamos puerta por puerta.` }) : "",
        t({ en: `Rural leases run five years minimum and renew by five-year periods (Ley 49/2003). Over ${years} years this plan totals about ${e(q.termTotal)}, of which the owners receive ${e(q.ownerYear * years)}.`, es: `Los arrendamientos rústicos duran cinco años como mínimo y se prorrogan por periodos de cinco (Ley 49/2003). En ${years} años este plan suma unos ${e(q.termTotal)}, de los que los propietarios reciben ${e(q.ownerYear * years)}.` }),
        t({ en: `Local jobs, estimate: about ${q.jobs} permanent and ${q.seasonal} seasonal for this land${workers ? `; you said ${workers}` : ""}. Every lease carries a local-hiring clause and we recruit in the village first.`, es: `Empleo local, estimación: unos ${q.jobs} fijos y ${q.seasonal} de temporada para esta tierra${workers ? `; tú indicaste ${workers}` : ""}. Cada contrato lleva cláusula de contratación local y buscamos primero en el pueblo.` }),
        t({ en: "Aged 18–40? The Xunta's young-farmer aid pays €30,000 to €70,000 to start (call MR404A, 2026). Organic projects can certify with CRAEGA.", es: "¿Tienes entre 18 y 40 años? La ayuda de la Xunta a jóvenes agricultores da de 30.000 a 70.000 € para empezar (convocatoria MR404A, 2026). Los proyectos ecológicos pueden certificarse con el CRAEGA." }),
      ].filter(Boolean);
      return {
        headline: t({ en: `${t(pr.label)} on ${q.ha.toFixed(1)} ha, ${years} years`, es: `${t(pr.label)} en ${q.ha.toFixed(1)} ha, ${years} años` }),
        summary: t({ en: `${e(q.annualRent)} a year in rent, all owners included, plus set-up and management. The land stays in the village and the work does too.`, es: `${e(q.annualRent)} al año de canon, con todos los propietarios, más puesta en marcha y gestión. La tierra se queda en el pueblo y el trabajo también.` }),
        lines, total: q.firstYear, totalLabel: t({ en: "Year 1 total (rent + set-up + management)", es: "Total del año 1 (canon + puesta en marcha + gestión)" }),
        next: [{ href: "/land", label: t({ en: "Pick parcels on the map", es: "Elegir fincas en el mapa" }) }, { href: "/concierge", label: t({ en: "Ask the concierge", es: "Pregunta al conserje" }) }],
        notes, activities: matchActivities(undefined, ["Nature", "Food & wine"]),
      };
    }
    case "startup": {
      const pkg = PACKAGES.find((p) => p.id === (a.length ?? "month"))!;
      const months = pkg.id === "trial" ? 3 : 1;
      const needs = a.needs ?? [];
      const houses = Math.ceil(people / LODGING.ownHouseSleeps);
      const lines: Line[] = [{ label: `${t(pkg.name)} (${t(pkg.period)}) × ${people}`, amount: pkg.price * people }];
      if (a.ruralValley) lines.push({ label: t({ en: `Rural Valley cabin incl. meals, paid to the campus · ${months} month(s) × ${people}`, es: `Cabaña de Rural Valley con comidas, pagada al campus · ${months} mes(es) × ${people}` }), amount: RURAL_VALLEY_MONTHLY * months * people });
      else if (needs.includes("housing")) lines.push({ label: t({ en: `Seasonal let in villagers' houses · ${houses} house(s) × ${months} month(s), booked with the owner`, es: `Alquiler de temporada en casas de vecinos · ${houses} casa(s) × ${months} mes(es), se reserva con el propietario` }), amount: LODGING.monthlyLet * months * houses, estimate: true });
      if (needs.includes("land")) {
        const q = quoteLease({ parcelIds: ["ours"], years: LEASE.minYears, project: "organic", lang });
        lines.push({ label: t({ en: `Optional: agri-food pilot on our 2 ha demonstration plot, year 1 (rent + set-up + management, ${LEASE.minYears}-year lease)`, es: `Opcional: piloto agroalimentario en nuestra parcela demostrativa de 2 ha, año 1 (canon + puesta en marcha + gestión, contrato de ${LEASE.minYears} años)` }), amount: q.firstYear, estimate: true, optional: true });
      }
      if (needs.includes("event")) {
        const guests = Math.max(8, people * 2);
        const q = quoteEvent({ guests, catering: "feast", extras: ["kit"], lang });
        lines.push({ label: t({ en: `Optional: team retreat or launch event for ${guests} guests on a villager's land`, es: `Opcional: retiro de equipo o evento de lanzamiento para ${guests} invitados en una finca` }), amount: q.total, estimate: true, optional: true });
      }
      const total = lines.filter((l) => !l.optional).reduce((s, l) => s + l.amount, 0);
      const notes = [
        a.ruralValley
          ? t({ en: "Apply to the Rural Valley campus at Os Biocos directly (€350/month including housing and meals, first cohort March 2027). We add the village around it: experiences, events and land. We don't compete with it.", es: "Solicitad plaza en el campus Rural Valley de Os Biocos directamente (350 €/mes con alojamiento y comidas, primera promoción en marzo de 2027). Nosotros añadimos el pueblo alrededor: experiencias, eventos y tierra. No competimos con él." })
          : t({ en: "Not on the campus? We find you a house with fibre and a desk in the village or in A Pobra de Trives, booked with the owner.", es: "¿Fuera del campus? Os buscamos una casa con fibra y una mesa en el pueblo o en A Pobra de Trives, reservada con el propietario." }),
        t({ en: "San Xoán de Río and A Pobra de Trives form Spain's first certified Startup Village, and the village won a bronze EU Capitals of Inclusion & Diversity award in April 2026.", es: "San Xoán de Río y A Pobra de Trives forman el primer Startup Village certificado de España, y el pueblo ganó el bronce de las Capitales Europeas de la Inclusión y la Diversidad en abril de 2026." }),
        needs.includes("land") ? t({ en: "Agri-food idea? Our 2 ha demonstration plot is available on a 5-year lease from year one, and the map at /land has more parcels.", es: "¿Idea agroalimentaria? Nuestra parcela demostrativa de 2 ha está disponible con contrato de 5 años desde el primer año, y en el mapa de /land hay más fincas." }) : "",
        t({ en: `Team members without an EU passport: Spain's telework visa requires about ${e(VISA.monthlyRequired)}/month of income in 2026; founders can also look at the entrepreneur visa. Confirm with the consulate; we introduce you to a gestor.`, es: `Miembros del equipo sin pasaporte de la UE: el visado de teletrabajo exige unos ${e(VISA.monthlyRequired)}/mes de ingresos en 2026; los fundadores pueden mirar también el visado de emprendedor. Confirmadlo con el consulado; os presentamos a un gestor.` }),
        a.season === "Winter" ? t({ en: "You'd be arriving in winter at 875 m. We check the heating before you arrive.", es: "Llegaríais en invierno a 875 m. Revisamos la calefacción antes de vuestra llegada." }) : "",
      ].filter(Boolean);
      return {
        headline: a.ruralValley ? t({ en: "Rural Valley + RuralRiver", es: "Rural Valley + RuralRiver" }) : `${t(pkg.name)}, ${t(pkg.period)}`,
        summary: t({ en: "Land the startup in the village: a place to stay and work, the village around you, and land if your idea grows things.", es: "Aterriza la startup en el pueblo: un sitio donde vivir y trabajar, el pueblo alrededor y tierra si tu idea cultiva algo." }),
        lines, total, totalLabel: t({ en: `Total for ${people} (excluding optional extras)`, es: `Total para ${people} (sin extras opcionales)` }),
        next: [{ href: "/packages", label: t({ en: "Compare packages", es: "Comparar paquetes" }) }, { href: "/land", label: t({ en: "Land for a pilot", es: "Tierra para un piloto" }) }, { href: "/events", label: t({ en: "Team retreat quote", es: "Presupuesto de retiro" }) }],
        notes, activities: matchActivities(a.season, ["Food & wine", "Nature"]),
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
        headline: t({ en: "Become a RuralRiver host", es: "Hazte anfitrión de RuralRiver" }),
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

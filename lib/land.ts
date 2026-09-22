import type { SourceKey } from "./data";
import { eur, tx, type Lang, type T } from "./i18n";

// Multi-year leases of villagers' land for agricultural projects. Parcels below are
// EXAMPLE listings (real places, illustrative plots) so the map and the lease builder
// work before owners sign. Every parcel says so.

export type ProjectId = "chestnut" | "organic" | "cattle" | "honey" | "mushroom";
export type ParcelKind = "meadow" | "chestnut" | "terrace" | "arable" | "pasture" | "forest";

export type Project = { id: ProjectId; icon: string; label: T; blurb: T; minHa: number; jobsPerHa: number; seasonalPerHa: number; source?: SourceKey };

export const PROJECTS: Project[] = [
  { id: "chestnut", icon: "🌰", label: { en: "Chestnut grove (souto)", es: "Souto de castaños" }, blurb: { en: "Restore or plant a grove for the Castaña de Galicia PGI. Ourense grows about 58% of Spain's chestnuts; PGI producers went from 124 to 170 in a decade.", es: "Recuperar o plantar un souto para la IXP Castaña de Galicia. Ourense produce cerca del 58 % de la castaña de España; los productores de la IXP pasaron de 124 a 170 en una década." }, minHa: 2, jobsPerHa: 0.08, seasonalPerHa: 0.5, source: "castanaShare" },
  { id: "organic", icon: "🥬", label: { en: "Organic vegetables & berries", es: "Huerta ecológica y frutos rojos" }, blurb: { en: "Certified organic (CRAEGA). Galicia's organic sector reached €118M in 2025, up 6.4%, with 46,677 certified hectares.", es: "Certificado ecológico (CRAEGA). El sector ecológico gallego llegó a 118 M€ en 2025, un 6,4 % más, con 46.677 hectáreas certificadas." }, minHa: 1, jobsPerHa: 0.5, seasonalPerHa: 0.3, source: "craega" },
  { id: "cattle", icon: "🐄", label: { en: "Extensive cattle or sheep", es: "Vacuno o ovino extensivo" }, blurb: { en: "Grazing on recovered meadows, as the Xunta's own Cambela polygon in this municipality plans (96.4 ha for extensive, organic cattle).", es: "Pastoreo en prados recuperados, como prevé el polígono de Cambela de la Xunta en este mismo concello (96,4 ha para vacuno extensivo ecológico)." }, minHa: 8, jobsPerHa: 0.03, seasonalPerHa: 0.02, source: "cambela" },
  { id: "honey", icon: "🐝", label: { en: "Apiary & aromatic herbs", es: "Colmenas y aromáticas" }, blurb: { en: "Low-input use of small, scattered parcels: hives, lavender, thyme. Fits plots that are too small for anything else.", es: "Uso de bajo coste para parcelas pequeñas y dispersas: colmenas, lavanda, tomillo. Encaja en fincas demasiado pequeñas para otra cosa." }, minHa: 0.5, jobsPerHa: 0.15, seasonalPerHa: 0.2 },
  { id: "mushroom", icon: "🍄", label: { en: "Forest products & mushrooms", es: "Setas y productos del bosque" }, blurb: { en: "Managed oak and chestnut edges: mushrooms, firewood, chestnuts. Keeps the woods cleared, which also lowers wildfire risk.", es: "Bordes de robledal y souto gestionados: setas, leña, castañas. Mantiene el monte limpio, lo que también reduce el riesgo de incendio." }, minHa: 2, jobsPerHa: 0.1, seasonalPerHa: 0.3 },
];

export const KIND_LABELS: Record<ParcelKind, T> = {
  meadow: { en: "Riverside meadow", es: "Veiga / prado de ribera" },
  chestnut: { en: "Chestnut grove", es: "Souto" },
  terrace: { en: "Old terraces", es: "Bancales" },
  arable: { en: "Arable plateau", es: "Tierra de labor" },
  pasture: { en: "Pasture", es: "Pasto" },
  forest: { en: "Forest edge", es: "Borde de monte" },
};

export const KIND_COLORS: Record<ParcelKind, string> = { meadow: "#3f8f5a", chestnut: "#8b4a28", terrace: "#a7c049", arable: "#c9a227", pasture: "#6fa36b", forest: "#2f5d4a" };

export type Parcel = {
  id: string; name: T; place: string; lat: number; lng: number; ha: number; kind: ParcelKind; altitude: number;
  water: T; access: T; slope: T; unusedSince: number; owners: T; rentPerHa: number; suggested: ProjectId[]; note?: T;
};

// rentPerHa: our proposed annual rent (estimate). Galicia's average rural rent was €172/ha in 2023 (MAPA).
export const PARCELS: Parcel[] = [
  { id: "cambela", name: { en: "Veigas de Cambela", es: "Veigas de Cambela" }, place: "Cambela · Vilardá", lat: 42.4118, lng: -7.3242, ha: 6.2, kind: "meadow", altitude: 790, water: { en: "Stream along the north edge", es: "Regato por el borde norte" }, access: { en: "Farm track, 4×4 in winter", es: "Pista agrícola, 4×4 en invierno" }, slope: { en: "Gentle", es: "Suave" }, unusedSince: 2009, owners: { en: "7 heirs, 3 of them abroad", es: "7 herederos, 3 en el extranjero" }, rentPerHa: 160, suggested: ["cattle", "organic"], note: { en: "Next to the Xunta's public Cambela agroforestry polygon (96.4 ha, 301 parcels, 135 owners).", es: "Junto al polígono agroforestal público de Cambela de la Xunta (96,4 ha, 301 parcelas, 135 propietarios)." } },
  { id: "mouruas", name: { en: "Souto de Mouruás", es: "Souto de Mouruás" }, place: "Mouruás", lat: 42.3572, lng: -7.2932, ha: 3.4, kind: "chestnut", altitude: 840, water: { en: "None on the plot", es: "Sin agua en la finca" }, access: { en: "Paved lane to the gate", es: "Camino asfaltado hasta el portal" }, slope: { en: "Moderate", es: "Media" }, unusedSince: 2004, owners: { en: "2 siblings in Vigo", es: "2 hermanos en Vigo" }, rentPerHa: 320, suggested: ["chestnut", "mushroom"], note: { en: "Century-old trees on the Ruta da Fraga. Needs pruning and grafting; chestnut wasp treated in the area.", es: "Castaños centenarios en la Ruta da Fraga. Necesita poda e injertos; la avispilla se ha tratado en la zona." } },
  { id: "seoane", name: { en: "Ladeira de Seoane", es: "Ladeira de Seoane" }, place: "Seoane de Argas", lat: 42.3897, lng: -7.3188, ha: 2.1, kind: "terrace", altitude: 860, water: { en: "Spring with a stone tank", es: "Manantial con pilón de piedra" }, access: { en: "Track from the hamlet", es: "Pista desde la aldea" }, slope: { en: "Terraced, south-facing", es: "En bancales, orientación sur" }, unusedSince: 1998, owners: { en: "1 owner in the village", es: "1 propietaria en el pueblo" }, rentPerHa: 200, suggested: ["organic", "honey"] },
  { id: "cabanas", name: { en: "Chaira das Cabanas", es: "Chaira das Cabanas" }, place: "As Cabanas · Os Biocos", lat: 42.3992, lng: -7.2802, ha: 8.5, kind: "arable", altitude: 900, water: { en: "Well, needs a pump", es: "Pozo, necesita bomba" }, access: { en: "Road to the Os Biocos campus", es: "Carretera al campus de Os Biocos" }, slope: { en: "Flat plateau", es: "Meseta llana" }, unusedSince: 2012, owners: { en: "11 owners across 14 plots", es: "11 propietarios en 14 parcelas" }, rentPerHa: 140, suggested: ["cattle", "organic", "honey"], note: { en: "Fibre and the Rural Valley campus 5 minutes away: a project team can live and work next to its land.", es: "Fibra y el campus Rural Valley a 5 minutos: un equipo puede vivir y trabajar junto a su finca." } },
  { id: "medorra", name: { en: "Prados da Medorra", es: "Prados da Medorra" }, place: "A Medorra · As Ribadas", lat: 42.4046, lng: -7.3152, ha: 4.7, kind: "pasture", altitude: 880, water: { en: "Seasonal stream", es: "Regato estacional" }, access: { en: "Farm track", es: "Pista agrícola" }, slope: { en: "Gentle", es: "Suave" }, unusedSince: 2015, owners: { en: "3 owners, one unknown (Banco de Terras case)", es: "3 propietarios, uno desconocido (caso para el Banco de Terras)" }, rentPerHa: 130, suggested: ["cattle", "honey"], note: { en: "Stone shed (cabana) on the plot, usable for animals or hives.", es: "Cabana de piedra en la finca, útil para animales o colmenas." } },
  { id: "castro", name: { en: "Fraga de Castro", es: "Fraga de Castro" }, place: "Castro", lat: 42.3728, lng: -7.3072, ha: 5.0, kind: "forest", altitude: 850, water: { en: "Stream at the bottom", es: "Regato en el fondo" }, access: { en: "Forest track", es: "Pista forestal" }, slope: { en: "Moderate", es: "Media" }, unusedSince: 2006, owners: { en: "4 heirs", es: "4 herederos" }, rentPerHa: 110, suggested: ["mushroom", "chestnut", "honey"] },
  { id: "navea", name: { en: "Veiga do Navea", es: "Veiga do Navea" }, place: "A Ponte Navea", lat: 42.3502, lng: -7.2878, ha: 2.8, kind: "meadow", altitude: 640, water: { en: "River Navea, old irrigation channel", es: "Río Navea, antigua canle de rego" }, access: { en: "Paved road", es: "Carretera asfaltada" }, slope: { en: "Flat", es: "Llana" }, unusedSince: 2010, owners: { en: "2 owners in Ourense", es: "2 propietarios en Ourense" }, rentPerHa: 260, suggested: ["organic"], note: { en: "The warmest, lowest plot on the list, by the Roman bridge.", es: "La finca más baja y cálida de la lista, junto al puente romano." } },
  { id: "cerdeira", name: { en: "Terras de Cerdeira", es: "Terras de Cerdeira" }, place: "Cerdeira", lat: 42.3478, lng: -7.3122, ha: 3.9, kind: "arable", altitude: 780, water: { en: "Spring", es: "Manantial" }, access: { en: "Paved lane", es: "Camino asfaltado" }, slope: { en: "Gentle", es: "Suave" }, unusedSince: 2016, owners: { en: "1 emigrant family (Switzerland)", es: "1 familia emigrada (Suiza)" }, rentPerHa: 150, suggested: ["organic", "cattle"] },
  { id: "ours", name: { en: "Our own 2 hectares", es: "Nuestras 2 hectáreas" }, place: "San Xoán de Río", lat: 42.3636, lng: -7.2968, ha: 2.0, kind: "meadow", altitude: 870, water: { en: "Mains water at the house", es: "Agua de traída en la casa" }, access: { en: "Village road", es: "Calle del pueblo" }, slope: { en: "Gentle", es: "Suave" }, unusedSince: 2019, owners: { en: "RuralRiver (the brief's own land)", es: "RuralRiver (la finca del reto)" }, rentPerHa: 200, suggested: ["organic", "honey"], note: { en: "Our first event venue in summer; 1 ha available as a demonstration plot from year one.", es: "Nuestro primer espacio para eventos en verano; 1 ha disponible como parcela demostrativa desde el primer año." } },
  { id: "vilarino", name: { en: "Bancais de Vilariño", es: "Bancais de Vilariño" }, place: "Vilariño dos Palleiros", lat: 42.3542, lng: -7.3412, ha: 1.6, kind: "terrace", altitude: 820, water: { en: "Spring, shared", es: "Manantial compartido" }, access: { en: "Track, 300 m from the road", es: "Pista, a 300 m de la carretera" }, slope: { en: "Terraced", es: "En bancales" }, unusedSince: 2001, owners: { en: "5 heirs", es: "5 herederos" }, rentPerHa: 180, suggested: ["honey", "organic"] },
];

export const LEASE = {
  minYears: 5, // Ley 49/2003: shorter terms are void
  terms: [5, 10, 15, 20, 25],
  ownerShare: 0.85,
  commission: 0.15,
  setupFee: 1500, // estimate: parcel search, owner consolidation, lease drafting, Banco de Terras / Concello paperwork, local hiring
  managementYear: 600, // estimate: yearly owner payments, boundaries, seasonal labour matching, concierge
  galiciaAvgRent: 172, // €/ha/year, MAPA rural lease survey, 2023
};

export type LeaseQuote = {
  ha: number; annualRent: number; ownerYear: number; commissionYear: number; setup: number; managementYear: number;
  firstYear: number; termTotal: number; jobs: number; seasonal: number; rows: { label: string; amount: number; to: string; estimate?: boolean; perYear?: boolean }[];
};

export function quoteLease({ parcelIds, years, project, lang }: { parcelIds: string[]; years: number; project: ProjectId; lang: Lang }): LeaseQuote {
  const t = (x: T) => tx(x, lang);
  const chosen = PARCELS.filter((p) => parcelIds.includes(p.id));
  const ha = chosen.reduce((s, p) => s + p.ha, 0);
  const annualRent = chosen.reduce((s, p) => s + p.ha * p.rentPerHa, 0);
  const ownerYear = annualRent * LEASE.ownerShare;
  const commissionYear = annualRent - ownerYear;
  const pr = PROJECTS.find((p) => p.id === project)!;
  const rows: LeaseQuote["rows"] = chosen.map((p) => ({ label: `${t(p.name)} · ${p.ha} ha × ${eur(p.rentPerHa, lang)}/ha`, amount: p.ha * p.rentPerHa, to: t({ en: `Owner ${LEASE.ownerShare * 100}% / RuralRiver ${LEASE.commission * 100}%`, es: `Propietario ${LEASE.ownerShare * 100} % / RuralRiver ${LEASE.commission * 100} %` }), estimate: true, perYear: true }));
  rows.push({ label: t({ en: "Project set-up: parcels, owners, lease, registrations, hiring", es: "Puesta en marcha: parcelas, propietarios, contrato, registros, contratación" }), amount: LEASE.setupFee, to: "RuralRiver", estimate: true });
  rows.push({ label: t({ en: "Yearly management: payments, boundaries, seasonal labour, concierge", es: "Gestión anual: pagos, lindes, mano de obra estacional, conserje" }), amount: LEASE.managementYear, to: "RuralRiver", estimate: true, perYear: true });
  return {
    ha, annualRent, ownerYear, commissionYear, setup: LEASE.setupFee, managementYear: LEASE.managementYear,
    firstYear: annualRent + LEASE.setupFee + LEASE.managementYear,
    termTotal: (annualRent + LEASE.managementYear) * years + LEASE.setupFee,
    jobs: Math.round(ha * pr.jobsPerHa * 10) / 10,
    seasonal: Math.round(ha * pr.seasonalPerHa),
    rows,
  };
}

// Researched figures for the land page and the pitch deck. Each has a source key.
export const LAND_STATS: { value: T | string; label: T; source: SourceKey }[] = [
  { value: { en: "35.7%", es: "35,7 %" }, label: { en: "of Galicia's farmland is unused or abandoned, the highest share in Spain", es: "de la superficie agraria gallega está sin uso o abandonada, la mayor de España" }, source: "abandoned" },
  { value: { en: "1.7 M", es: "1,7 M" }, label: { en: "owners of rural land in Galicia, against about 44,000 people working in farming", es: "propietarios de suelo rústico en Galicia, frente a unas 44.000 personas en el sector primario" }, source: "owners" },
  { value: "96.4 ha", label: { en: "in the Xunta's Cambela agroforestry polygon in San Xoán de Río: 301 parcels, 135 owners, extensive organic cattle", es: "del polígono agroforestal de Cambela (Xunta) en San Xoán de Río: 301 parcelas, 135 propietarios, vacuno extensivo ecológico" }, source: "cambela" },
  { value: { en: "€172/ha", es: "172 €/ha" }, label: { en: "average yearly rent for farmland in Galicia (2023): land is cheap, finding and contracting it is the hard part", es: "canon medio anual de la tierra agraria en Galicia (2023): la tierra es barata; lo difícil es encontrarla y contratarla" }, source: "mapaRents" },
  { value: { en: "+6.4%", es: "+6,4 %" }, label: { en: "growth of Galicia's certified organic sector in 2025 (€118M, 46,677 ha, producers up 40% in a decade)", es: "crecimiento del sector ecológico gallego en 2025 (118 M€, 46.677 ha, productores +40 % en una década)" }, source: "craega" },
  { value: { en: "≈58%", es: "≈58 %" }, label: { en: "of Spain's chestnuts are harvested in Ourense; PGI producers rose from 124 to 170 in ten years", es: "de la castaña de España se recoge en Ourense; los productores de la IXP pasaron de 124 a 170 en diez años" }, source: "castanaShare" },
  { value: { en: "€30–70k", es: "30–70 k€" }, label: { en: "Xunta start-up aid per young farmer (18–40), with 5,000+ incorporated since 2009", es: "ayuda de la Xunta por joven agricultor (18–40 años), con más de 5.000 incorporados desde 2009" }, source: "youngFarmer" },
  { value: { en: "5 years", es: "5 años" }, label: { en: "legal minimum for a rural lease in Spain (Ley 49/2003), renewed by 5-year periods unless notified a year ahead", es: "duración mínima legal de un arrendamiento rústico (Ley 49/2003), prorrogable por periodos de 5 años salvo aviso con un año" }, source: "ley49" },
];

export const LAND_STEPS: { title: T; body: T }[] = [
  { title: { en: "Tell us the project", es: "Cuéntanos el proyecto" }, body: { en: "Chestnuts, organic vegetables, extensive cattle, hives or forest products. How many hectares, for how many years, how many people you'd hire locally.", es: "Castaños, huerta ecológica, vacuno extensivo, colmenas o productos del bosque. Cuántas hectáreas, cuántos años y cuánta gente contratarías aquí." } },
  { title: { en: "We assemble the land", es: "Reunimos la tierra" }, body: { en: "We know the owners, the heirs abroad and the plots nobody has touched since the 2000s. We consolidate several parcels into one lease and go through the Banco de Terras where an owner is unknown.", es: "Conocemos a los propietarios, a los herederos que emigraron y las fincas que nadie toca desde los 2000. Juntamos varias parcelas en un solo contrato y pasamos por el Banco de Terras cuando un propietario es desconocido." } },
  { title: { en: "One contract, 5 to 25 years", es: "Un contrato, de 5 a 25 años" }, body: { en: "A written rural lease under Ley 49/2003, minimum five years. The owner keeps 85% of the rent, paid yearly; we keep 15% plus a set-up fee and a yearly management fee.", es: "Un arrendamiento rústico por escrito según la Ley 49/2003, mínimo cinco años. El propietario se queda el 85 % del canon, cobrado cada año; nosotros el 15 %, más la puesta en marcha y una gestión anual." } },
  { title: { en: "The project starts, locals work it", es: "El proyecto arranca, la gente de aquí lo trabaja" }, body: { en: "We recruit seasonal and permanent workers in the village and the valley first, house project teams in villagers' houses, and the concierge handles the rest.", es: "Contratamos primero a gente del pueblo y del valle, alojamos a los equipos en casas de vecinos y el conserje se ocupa del resto." } },
];

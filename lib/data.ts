import type { ImgSlug } from "./images";
import type { T } from "./i18n";

// Every researched figure carries a `source` key into SOURCES. Figures we propose
// ourselves (our prices, volumes, costs) are shown with an "estimate" badge.

export const SOURCES = {
  idealista: { label: "idealista, 27 Aug 2026", url: "https://www.idealista.com/news/vacacional/rural/2026/08/27/911324-el-pueblo-de-galicia-que-perdia-40-vecinos-al-ano-y-se-convirtio-en-la-primera-startup" },
  elespanol: { label: "El Español, 30 Aug 2026", url: "https://www.elespanol.com/treintayseis/actualidad/provincia-de-ourense/20260830/rural-ourense-une-frenar-sangria-demografica-no-pueblo-sin-futuro-proyecto/1003744367035_0.html" },
  ruralvalley: { label: "Somos Comarca: Rural Valley", url: "https://www.somoscomarca.es/articulo/terras-trives/rural-valley/20260628015940220334.html" },
  ruralvalleySite: { label: "ruralvalley.eu", url: "https://ruralvalley.eu/" },
  wikipedia: { label: "Wikipedia: San Xoán de Río", url: "https://en.wikipedia.org/wiki/San_Xo%C3%A1n_de_R%C3%ADo" },
  ave: { label: "Somos Comarca: A Gudiña AVE stops", url: "https://www.somoscomarca.es/articulo/actualidad/transportes-evita-comprometer-vuelta-paradas-ave-gudina/20260224182907213540.html" },
  youngFarmer: { label: "DOG 9 Mar 2026: young farmer aid (MR404A)", url: "https://www.xunta.gal/dog/Publicados/2026/20260309/AnuncioG0426-260226-0003_es.html" },
  diversification: { label: "DOG 19 Jan 2026: rural diversification aid (MR708A)", url: "https://www.xunta.gal/dog/Publicados/2026/20260119/AnuncioO90-020126-0002_gl.html" },
  catamaran: { label: "Planomato: Ribeira Sacra catamaran guide 2026", url: "https://www.planomato.com/es/santiago-de-compostela/n/ribeira-sacra-guia-reservar-catamaran-2026" },
  wineries: { label: "Ribeira Sacra: winery visits", url: "https://turismo.ribeirasacra.org/visitas-a-bodegas" },
  viaRomana: { label: "Vía Romana wine tourism", url: "https://www.viaromana.es/seccion/208/Nuestras-visitas.html" },
  sacraActiva: { label: "Sacra Activa wine tours", url: "https://www.sacraactiva.com/wine-tours-ribeira-sacra/" },
  manzaneda: { label: "Manzaneda rates", url: "https://www.manzaneda.com/tarifas" },
  manzanedaInfobae: { label: "Infobae: Manzaneda, 23 runs and 15+ km", url: "https://www.infobae.com/espana/viajes/2026/01/30/la-estacion-de-esqui-de-manzaneda-ubicada-en-uno-de-los-mejores-entornos-naturales-de-galicia-con-mas-de-15-kilometros-esquiables-y-23-pistas/" },
  catering: { label: "Cronoshare: catering in Ourense", url: "https://www.cronoshare.com/servicios/empresas-catering/ourense/ourense" },
  groupHouses: { label: "EscapadaRural: group houses in Ourense", url: "https://www.escapadarural.com/casas-rurales-grupos-ourense" },
  trivesHouses: { label: "EscapadaRural: Terra de Trives", url: "https://www.escapadarural.com/casas-rurales/tierra-de-trives" },
  galeventos: { label: "Galeventos (marquees, tables, chairs)", url: "https://galeventos.com/servicios/alquiler/" },
  fraga: { label: "Una ruta cada día: Ruta da Fraga", url: "https://unarutacadadia.com/ruta-da-fraga-san-xoan-de-rio/" },
  galiciaMaxicaSxr: { label: "Galicia Máxica: San Xoán de Río", url: "https://www.galiciamaxica.eu/galicia/ourense/comarca-da-terra-de-trives/san-xoan-de-rio/" },
  fiestasTrives: { label: "Páxinas Galegas: fiestas in A Pobra de Trives", url: "https://www.paxinasgalegas.es/fiestas/fiestas-a-pobra-de-trives-220.html" },
  castroCaldelas: { label: "TusCasasRurales: Castro Caldelas", url: "https://www.tuscasasrurales.com/que-ver-en-castro-caldelas-5166.htm" },
  paradaSil: { label: "Galicia Máxica: Parada de Sil", url: "https://www.galiciamaxica.eu/galicia/ourense/comarca-da-terra-de-caldelas/parada-de-sil/" },
  anceu: { label: "Anceu Coliving", url: "https://anceu.com/" },
  team: { label: "Team v1 prototype (RuralOS Talent Match)", url: "https://claude.ai/artifact/JYdPgmeSyXiKnPiB7c1mHh" },
  // Official / legal sources (verified September 2026)
  boeSmi: { label: "BOE: Real Decreto 126/2026 (SMI 2026)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815" },
  sepeSmi: { label: "SEPE: SMI 2026 = €1,221 × 14 (€17,094/yr)", url: "https://sepe.es/noticia/SEPE/2026/Febrero/boe-publica-smi-2026" },
  visaConsulate: { label: "Spanish Consulate (exteriores.gob.es): telework visa requirements", url: "https://www.exteriores.gob.es/Consulados/estambul/es/Comunicacion/Noticias/Paginas/Articulos/Requisitos-Visado-Teletrabajo.aspx" },
  packageLaw: { label: "Consumo Responde: package travel & linked arrangements (RDL 1/2007, Book IV)", url: "https://www.consumoresponde.es/art%C3%ADculos/viajes_combinados_y_servicios_de_viajes" },
  art151: { label: "Art. 151 TRLGDCU (package travel definitions)", url: "https://www.iberley.es/legislacion/articulo-151-ley-defensa-consumidores-usuarios" },
  agencyXunta: { label: "Xunta TU984A: starting a travel agency", url: "https://sede.xunta.gal/es/detalle-procedemento?codtram=TU984A" },
  decree42: { label: "DOG: Decreto 42/2001 (agencies, guides, active tourism)", url: "https://www.xunta.gal/dog/Publicados/2001/20010220/Anuncio2F62_es.html" },
  decree25: { label: "Turismo de Galicia: Decreto 25/2018 (amends 42/2001)", url: "https://www.turismo.gal/canle-institucional/normativa/detalle?langId=es_ES&content=normativa_0155.html" },
  activeDraft: { label: "Draft active-tourism decree (€600k cover proposed)", url: "https://blog.urquiabas.com/el-nuevo-decreto-ley-de-turismo-activo-en-galicia/" },
  vutDecree: { label: "DOG: Decreto 12/2017 (tourist rentals, VUT)", url: "https://www.xunta.gal/dog/Publicados/2017/20170210/AnuncioG0244-020217-0002_es.html" },
  ruralDecree: { label: "DOG: Decreto 191/2004 (rural tourism)", url: "https://www.xunta.gal/dog/Publicados/2004/20040810/Anuncio172C2_es.html" },
  registroUnico: { label: "BOE: Real Decreto 1312/2024 (single rental register)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-26931" },
  supremo: { label: "idealista: Supreme Court annuls the single register (21 May 2026)", url: "https://www.idealista.com/news/inmobiliario/vivienda/2026/05/21/898563-el-supremo-tumba-el-registro-unico-de-alquiler-de-corta-duracion-por-invadir" },
  transport: { label: "Ministry of Transport: paid passenger transport needs authorisation", url: "https://www.transportes.gob.es/ministerio/comunicacion/sala-prensa/mar-08082017-0840-6" },
  transportFaq: { label: "Ministry of Transport: passenger transport FAQ", url: "https://www.transportes.gob.es/transporte-terrestre/preguntas-frecuentes-faq/transporte-de-viajeros" },
  tarifaPlana: { label: "Infoautónomos: €80 flat rate in 2026", url: "https://www.infoautonomos.com/seguridad-social/tarifa-plana-autonomos/" },
  // Land & agriculture (researched September 2026)
  abandoned: { label: "El Correo Gallego, 20 Mar 2026: 35.7% of Galicia's farmland unused (MAPA data)", url: "https://www.elcorreogallego.es/galicia/2026/03/20/tercio-superficie-agraria-gallega-abandonada-128179935.html" },
  owners: { label: "El Correo Gallego, 20 Sep 2026: 1.7M rural-land owners vs ≈44,000 farm workers", url: "https://www.elcorreogallego.es/galicia/2026/09/20/galicia-1-7-millones-propietarios-134479671.html" },
  cambela: { label: "Campo Galego: Cambela agroforestry polygon, 96.4 ha in San Xoán de Río", url: "https://www.campogalego.es/la-xunta-promueve-un-poligono-agroforestal-de-96-hectareas-en-san-xoan-de-rio/" },
  cambelaDog: { label: "DOG 19 Apr 2024: Cambela polygon procedure (San Xoán de Río)", url: "https://www.xunta.gal/dog/Publicados/2024/20240419/AnuncioO90-110424-0003_es.html" },
  agader: { label: "Agader: agroforestry polygons (17 of 26 are in Ourense)", url: "https://agader.xunta.gal/es/recuperacion-de-tierras/poligonos-agroforestales" },
  bancoTerras: { label: "Agader: land recovery and the Banco de Terras", url: "https://agader.xunta.gal/es/recuperacion-de-tierras" },
  lei11: { label: "SITEGAL: Lei 11/2021 de recuperación da terra agraria", url: "https://info-sitegal.xunta.gal/gl/paxina/lei-112021-do-14-de-maio-de-recuperacion-da-terra-agraria-de-galicia" },
  bancoBalance: { label: "Campo Galego: balance of the land-recovery law (≈10,200 ha mobilised, May 2025)", url: "https://www.campogalego.gal/balance-da-lei-de-recuperacion-de-terra-agraria/" },
  mapaRents: { label: "MAPA: rural lease rents survey 2020–2024 (Galicia €172/ha in 2023)", url: "https://www.mapa.gob.es/dam/mapa/contenido/estadisticas/temas/estadisticas-agrarias/1.economicas/canones-de-arrendamientos-rusticos/canones-arrendamiento-26.pdf" },
  ley49: { label: "BOE: Ley 49/2003 de Arrendamientos Rústicos (minimum 5 years)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-21616" },
  craega: { label: "Campo Galego: CRAEGA 2025 report (€118M, 46,677 ha, +6.4%)", url: "https://www.campogalego.es/el-sector-ecologico-gallego-supero-los-118-millones-de-euros-e-incremento-su-superficie-certificada-en-2025" },
  castanaShare: { label: "La Región: ≈58% of Spain's chestnuts are harvested in Ourense", url: "https://www.laregion.es/articulo/ourense/casi-60-castana-que-produce-espana-recoge-ourense/202308302242181241672.html" },
  castanaFuture: { label: "La Región, Nov 2025: PGI chestnut producers 124 → 170, area doubled", url: "https://www.laregion.es/la-revista/castana-historia-futuro_1_20251121-4064673.html" },
} as const;

export type SourceKey = keyof typeof SOURCES;

// ---------------------------------------------------------------- the brief
export const BRIEF = {
  persona: { en: "32 years old, living in San Xoán de Río (Ourense, Galicia)", es: "32 años, vive en San Xoán de Río (Ourense, Galicia)" } as T,
  assets: [
    { icon: "🏡", label: { en: "Family stone house needing renovation", es: "Casa familiar de piedra que necesita reforma" }, use: { en: "Rented as a whole-house tourist let after an €8k refit, and the base of operations", es: "Se alquila entera como vivienda de uso turístico tras una reforma de 8.000 €, y es la base de operaciones" } },
    { icon: "🌱", label: { en: "2 hectares of rural land", es: "2 hectáreas de terreno rural" }, use: { en: "The first event venue, a 1 ha demonstration plot, and the pilot for villagers leasing land to agricultural projects for 5+ years", es: "El primer espacio para eventos, 1 ha de parcela demostrativa y el piloto para que los vecinos arrienden fincas a proyectos agrarios por 5+ años" } },
    { icon: "🚗", label: { en: "A small car", es: "Un coche pequeño" }, use: { en: "Logistics: event kit, supplies, owner visits. Paid guest transfers go to licensed taxis, as the law requires.", es: "Logística: material de eventos, compras, visitas a propietarios. Los traslados de clientes los hacen taxis con licencia, como exige la ley." } },
    { icon: "💻", label: { en: "Good general digital skills", es: "Buenas competencias digitales" }, use: { en: "Website, bookings and the AI concierge's knowledge base", es: "Web, reservas y la base de conocimiento del conserje IA" } },
    { icon: "🧭", label: { en: "Deep knowledge of the local area", es: "Conocimiento profundo de la zona" }, use: { en: "The product itself: routes, owners, cooks, musicians, festivals", es: "El producto en sí: rutas, propietarios, cocineros, músicos, fiestas" } },
    { icon: "💰", label: { en: "€5,000 savings + €20,000 personal loan", es: "5.000 € de ahorros + préstamo personal de 20.000 €" }, use: { en: "€25,000 of starting capital, fully allocated below", es: "25.000 € de capital inicial, repartido al completo más abajo" } },
  ] as { icon: string; label: T; use: T }[],
  goal: { en: "build a profitable business generating more than €100,000 in under 12 months", es: "crear un negocio rentable que genere más de 100.000 € en menos de 12 meses" } as T,
};

// ---------------------------------------------------------------- place facts
export const FACTS: { value: T | string; label: T; source: SourceKey }[] = [
  { value: "510", label: { en: "residents (municipal register, 2025)", es: "habitantes (padrón, 2025)" }, source: "wikipedia" },
  { value: "≈61", label: { en: "average age; nearly half are over 65", es: "edad media; casi la mitad tiene más de 65" }, source: "idealista" },
  { value: { en: "3,000+", es: "3.000+" }, label: { en: "residents in the 1980s; the village lost 30–40 a year before 2019", es: "habitantes en los 80; perdía 30–40 al año antes de 2019" }, source: "idealista" },
  { value: "875 m", label: { en: "altitude over 61.1 km², so winters are cold", es: "de altitud en 61,1 km²: inviernos fríos" }, source: "wikipedia" },
  { value: { en: "1st", es: "1.º" }, label: { en: "certified “Startup Village” in Spain, with A Pobra de Trives", es: "“Startup Village” certificado de España, junto con A Pobra de Trives" }, source: "idealista" },
  { value: { en: "Bronze", es: "Bronce" }, label: { en: "EU Capitals of Inclusion & Diversity award, April 2026", es: "premio europeo Capitales de la Inclusión y la Diversidad, abril de 2026" }, source: "idealista" },
];

export const CONTEXT_POINTS: { title: T; body: T; source: SourceKey }[] = [
  {
    title: { en: "Rural Valley campus (Os Biocos)", es: "Campus Rural Valley (Os Biocos)" },
    body: {
      en: "The municipality's startup campus: 50 cabins, €350/month including housing, meals and gigabit fibre. The first cohort arrives in March 2027, with 120 entrepreneurs a year expected from 16 countries. They will need things to do, places to celebrate and, for the agri-food ideas among them, land, so we partner with the campus instead of competing on housing.",
      es: "El campus de startups del concello: 50 cabañas, 350 €/mes con alojamiento, comidas y fibra de 1 Gb. La primera promoción llega en marzo de 2027 y se esperan 120 emprendedores al año de 16 países. Necesitarán cosas que hacer, sitios donde celebrar y, para las ideas agroalimentarias, tierra, así que colaboramos con el campus en lugar de competir en alojamiento.",
    },
    source: "ruralvalley",
  },
  {
    title: { en: "RE-HABITA RURAL LAB", es: "RE-HABITA RURAL LAB" },
    body: {
      en: "A €260,941 housing network across 9 municipalities. It has received 170+ owner requests, about 60% of them asking about financing or grants. That makes it our best route to owners who have houses and land to list.",
      es: "Una red de vivienda de 260.941 € entre 9 concellos. Ha recibido más de 170 consultas de propietarios, cerca del 60 % sobre financiación o ayudas. Es nuestra mejor vía para llegar a quien tiene casas y fincas que ofrecer.",
    },
    source: "idealista",
  },
  {
    title: { en: "Cambela agroforestry polygon", es: "Polígono agroforestal de Cambela" },
    body: {
      en: "The Xunta is consolidating 96.4 hectares in this municipality, split into 301 parcels owned by 135 people, for extensive organic cattle. It proves two things: the land here is worth working, and ownership is so fragmented that a project cannot assemble it alone. That gap is our land service.",
      es: "La Xunta está agrupando 96,4 hectáreas en este concello, repartidas en 301 parcelas de 135 propietarios, para vacuno extensivo ecológico. Demuestra dos cosas: que la tierra merece trabajarse y que la propiedad está tan fragmentada que un proyecto no puede reunirla solo. Ese hueco es nuestro servicio de tierra.",
    },
    source: "cambela",
  },
  {
    title: { en: "Transport gap", es: "Hueco de transporte" },
    body: {
      en: "The high-speed train stops at A Gudiña–Porta de Galicia (2h12 from Madrid) were suspended in June 2025, and the government declined to restore them in February 2026. We book licensed taxis from Ourense station instead.",
      es: "Las paradas del AVE en A Gudiña–Porta de Galicia (2h12 desde Madrid) se suspendieron en junio de 2025 y el Gobierno descartó recuperarlas en febrero de 2026. Por eso reservamos taxis con licencia desde la estación de Ourense.",
    },
    source: "ave",
  },
  {
    title: { en: "Cooperation between councils", es: "Cooperación entre concellos" },
    body: {
      en: "The regional press names San Xoán de Río, Montederramo and A Teixeira as councils working together against depopulation. (The v1 prototype said A Pobra de Trives; that was corrected here.)",
      es: "La prensa regional cita a San Xoán de Río, Montederramo y A Teixeira como concellos que colaboran contra la despoblación. (El prototipo v1 decía A Pobra de Trives; aquí está corregido).",
    },
    source: "elespanol",
  },
];

// ---------------------------------------------------------------- packages
export type Package = { id: "week" | "month" | "trial"; name: T; period: T; price: number; directCost: number; tagline: T; includes: T[]; image: ImgSlug };

export const PACKAGES: Package[] = [
  {
    id: "week", name: { en: "Discover Trives", es: "Descubre Trives" }, period: { en: "1 week", es: "1 semana" }, price: 220, directCost: 80, image: "sil-catamaran",
    tagline: { en: "The best of the Navea valley and Ribeira Sacra in seven days.", es: "Lo mejor del valle del Navea y la Ribeira Sacra en siete días." },
    includes: [
      { en: "AI concierge available 24/7, built on local knowledge", es: "Conserje IA disponible 24/7, con conocimiento local" },
      { en: "Guided walk on the Ruta da Fraga (8 km loop through chestnut forest)", es: "Paseo guiado por la Ruta da Fraga (8 km circulares entre castaños)" },
      { en: "Sil canyon catamaran ticket, with the host along", es: "Billete del catamarán del cañón del Sil, con el anfitrión" },
      { en: "Ribeira Sacra winery visit with tasting", es: "Visita a una bodega de la Ribeira Sacra con cata" },
      { en: "One local dinner (pulpo á feira, or a magosto in autumn)", es: "Una cena local (pulpo á feira, o un magosto en otoño)" },
      { en: "Arrival help: we book a licensed taxi from Ourense station (you pay the driver)", es: "Ayuda a la llegada: reservamos un taxi con licencia desde Ourense (se paga al conductor)" },
    ],
  },
  {
    id: "month", name: { en: "Live like a local", es: "Vive como un local" }, period: { en: "1 month", es: "1 mes" }, price: 450, directCost: 150, image: "navea-valley",
    tagline: { en: "Work remotely by day and join village life in the evenings.", es: "Teletrabaja de día y únete a la vida del pueblo por la tarde." },
    includes: [
      { en: "Everything in Discover Trives", es: "Todo lo de Descubre Trives" },
      { en: "One guided activity every week: stargazing at Os Biocos, the Ponte Bibei and Vía Nova route, Manzaneda", es: "Una actividad guiada cada semana: estrellas en Os Biocos, la ruta de Ponte Bibei y la Vía Nova, Manzaneda" },
      { en: "Community evenings with neighbours", es: "Tardes de comunidad con los vecinos" },
      { en: "Introductions to local producers, cooks and makers", es: "Presentaciones a productores, cocineros y artesanos" },
      { en: "Help finding a desk: home fibre or the village's spaces", es: "Ayuda para encontrar mesa de trabajo: fibra en casa o espacios del pueblo" },
    ],
  },
  {
    id: "trial", name: { en: "A season here", es: "Una temporada aquí" }, period: { en: "3 months", es: "3 meses" }, price: 900, directCost: 300, image: "stone-house",
    tagline: { en: "Three months for remote workers, project teams and families thinking about the village, with an easy way out.", es: "Tres meses para teletrabajadores, equipos de proyecto y familias que se plantean el pueblo, con una salida fácil." },
    includes: [
      { en: "Everything in Live like a local", es: "Todo lo de Vive como un local" },
      { en: "Help finding a longer let and a desk with fibre", es: "Ayuda para encontrar un alquiler más largo y una mesa con fibra" },
      { en: "Introductions at the Concello, the school and the health centre", es: "Presentaciones en el Concello, el colegio y el centro de salud" },
      { en: "Monthly one-to-one review of how the season is going", es: "Revisión mensual individual de cómo va la temporada" },
      { en: "First look at parcels coming up for multi-year lease", es: "Acceso anticipado a las fincas que salen en arrendamiento plurianual" },
    ],
  },
];

export const LODGING = {
  ownHouseNight: 110, // estimate: the whole refitted house (sleeps 4), a tourist let under 30 days
  ownHouseSleeps: 4,
  marketNightLow: 65,
  marketNightHigh: 160,
  marketNightPeak: 95,
  groupPerPersonNight: 15,
  monthlyLet: 800, // estimate: stays of 30+ days are ordinary seasonal lets
  commission: 0.15,
};

// Verified against official sources, September 2026. Kept for the concierge: non-EU
// project owners and remote workers ask about it.
export const VISA = {
  smiAnnual: 17094,
  smiMonthly14: 1221,
  monthlyRequired: Math.round((17094 * 2) / 12), // 200% SMI, annual ÷ 12 → €2,849
  firstFamily: Math.round((17094 * 0.75) / 12), // 75% → €1,068
  eachExtra: Math.round((17094 * 0.25) / 12), // 25% → €356
};

// ---------------------------------------------------------------- add-ons marketplace
export type AddOn = {
  id: string;
  category: "experiences" | "food" | "music" | "venue" | "transport";
  name: T;
  unit: T;
  market: T;
  ours: number | null; // our proposed price (estimate) or null = supplier quote
  partners: T;
  source?: SourceKey;
  note?: T;
};

export const CATEGORY_NAMES: Record<AddOn["category"], T> = {
  experiences: { en: "Experiences", es: "Experiencias" },
  food: { en: "Food & drink", es: "Comida y bebida" },
  music: { en: "Music & tradition", es: "Música y tradición" },
  venue: { en: "Venue & equipment", es: "Espacio y material" },
  transport: { en: "Transport", es: "Transporte" },
};

const Q: T = { en: "quote", es: "presupuesto" };

export const ADDONS: AddOn[] = [
  { id: "catamaran", category: "experiences", name: { en: "Sil canyon catamaran: booking + host-led outing", es: "Catamarán del cañón del Sil: reserva + salida con el anfitrión" }, unit: { en: "per person", es: "por persona" }, market: { en: "€12–13 ticket", es: "billete 12–13 €" }, ours: 25, partners: { en: "Catamarán Ribeira Sacra (Abeleda), Hemisferios (Santo Estevo)", es: "Catamarán Ribeira Sacra (Abeleda), Hemisferios (Santo Estevo)" }, source: "catamaran", note: { en: "Meet at the pier: your own car or a licensed taxi we book. Summer weekends sell out.", es: "Quedamos en el embarcadero: en tu coche o en un taxi con licencia que reservamos. Los fines de semana de verano se agotan." } },
  { id: "winery", category: "experiences", name: { en: "Winery visit & tasting, host-led", es: "Visita y cata en bodega, con el anfitrión" }, unit: { en: "per person", es: "por persona" }, market: { en: "€12–30", es: "12–30 €" }, ours: 40, partners: { en: "Vía Romana, Casa Moreiras, Malcavada", es: "Vía Romana, Casa Moreiras, Malcavada" }, source: "wineries" },
  { id: "winetour", category: "experiences", name: { en: "Full-day Ribeira Sacra wine tour", es: "Ruta de vino de día completo por la Ribeira Sacra" }, unit: { en: "per person", es: "por persona" }, market: { en: "€150", es: "150 €" }, ours: 150, partners: { en: "Sacra Activa (we take a referral commission)", es: "Sacra Activa (cobramos comisión por derivación)" }, source: "sacraActiva" },
  { id: "hike", category: "experiences", name: { en: "Guided hike: Ruta da Fraga or Reboleiras do Navea", es: "Ruta guiada: Ruta da Fraga o Reboleiras do Navea" }, unit: { en: "per person, min. 4", es: "por persona, mín. 4" }, market: { en: "free to walk alone", es: "gratis por libre" }, ours: 25, partners: { en: "Qualified local guide", es: "Guía local titulado" }, source: "fraga" },
  { id: "stars", category: "experiences", name: { en: "Stargazing night at Os Biocos", es: "Noche de estrellas en Os Biocos" }, unit: { en: "per person", es: "por persona" }, market: { en: "—", es: "—" }, ours: 20, partners: { en: "Local guide + Os Biocos observatory area", es: "Guía local + zona del observatorio de Os Biocos" } },
  { id: "ski", category: "experiences", name: { en: "Manzaneda ski day: rental + lesson coordination", es: "Día de esquí en Manzaneda: alquiler + clases" }, unit: { en: "per person, excl. pass", es: "por persona, sin forfait" }, market: { en: "Day pass €23–28 (Tuesdays €16)", es: "Forfait 23–28 € (martes 16 €)" }, ours: 30, partners: { en: "Manzaneda mountain resort", es: "Estación de montaña de Manzaneda" }, source: "manzaneda" },
  { id: "summer", category: "experiences", name: { en: "Manzaneda summer adventure (bike park, adventure park, horse riding, archery)", es: "Aventura de verano en Manzaneda (bike park, multiaventura, hípica, tiro con arco)" }, unit: { en: "per person", es: "por persona" }, market: { en: "set by the resort", es: "según la estación" }, ours: null, partners: { en: "Manzaneda mountain resort", es: "Estación de montaña de Manzaneda" }, source: "manzaneda" },
  { id: "catering", category: "food", name: { en: "Catering: empanada, churrasco, octopus", es: "Catering: empanada, churrasco, pulpo" }, unit: { en: "per guest", es: "por invitado" }, market: { en: "€10–60", es: "10–60 €" }, ours: null, partners: { en: "Licensed Ourense caterers and octopus cooks", es: "Catering y pulpeiras con licencia de Ourense" }, source: "catering", note: { en: "Passed through at cost + 10% coordination.", es: "Al coste + 10 % de coordinación." } },
  { id: "pulpeiro", category: "food", name: { en: "Pulpeira: octopus cooked on site", es: "Pulpeira: pulpo cocido al momento" }, unit: { en: "per event", es: "por evento" }, market: Q, ours: null, partners: { en: "Local pulpeiras", es: "Pulpeiras locales" }, source: "catering" },
  { id: "magosto", category: "food", name: { en: "Magosto: chestnut roast with local wine", es: "Magosto: castañas asadas con vino local" }, unit: { en: "per guest (Oct–Nov)", es: "por invitado (oct–nov)" }, market: { en: "—", es: "—" }, ours: 18, partners: { en: "Neighbours' chestnut groves", es: "Soutos de los vecinos" } },
  { id: "gaita", category: "music", name: { en: "Gaiteiro (Galician bagpiper) live set", es: "Gaiteiro en directo" }, unit: { en: "per event", es: "por evento" }, market: Q, ours: null, partners: { en: "Local musicians", es: "Músicos locales" } },
  { id: "queimada", category: "music", name: { en: "Queimada ritual with the traditional spell", es: "Queimada con su conxuro" }, unit: { en: "per event", es: "por evento" }, market: Q, ours: null, partners: { en: "Local host", es: "Anfitrión local" } },
  { id: "venue", category: "venue", name: { en: "Villagers' land, chestnut grove, threshing floor or wine cellar", es: "Finca, souto, era o adega de los vecinos" }, unit: { en: "per event", es: "por evento" }, market: { en: "venues from €500", es: "espacios desde 500 €" }, ours: 400, partners: { en: "Local owners (they keep 80%)", es: "Propietarios locales (se quedan el 80 %)" }, source: "groupHouses" },
  { id: "kit", category: "venue", name: { en: "Our event kit: gazebo, 40 chairs, tables, festoon lights", es: "Nuestro kit: carpa, 40 sillas, mesas, guirnaldas de luz" }, unit: { en: "per event", es: "por evento" }, market: { en: "hire by quote", es: "alquiler bajo presupuesto" }, ours: 150, partners: { en: "Owned kit, €1,500 in the budget", es: "Kit propio, 1.500 € del presupuesto" } },
  { id: "marquee", category: "venue", name: { en: "Large marquee, stage, generator", es: "Carpa grande, escenario, generador" }, unit: { en: "per event", es: "por evento" }, market: Q, ours: null, partners: { en: "Galeventos, Carpas CK, La Factoría del Show", es: "Galeventos, Carpas CK, La Factoría del Show" }, source: "galeventos" },
  { id: "taxi", category: "transport", name: { en: "Licensed taxi from Ourense station (we book, you pay the driver)", es: "Taxi con licencia desde la estación de Ourense (reservamos, pagas al conductor)" }, unit: { en: "per trip", es: "por trayecto" }, market: { en: "taxi fare", es: "tarifa de taxi" }, ours: null, partners: { en: "Licensed taxis and minibuses in Terra de Trives", es: "Taxis y microbuses con licencia de Terra de Trives" }, source: "transportFaq", note: { en: "By law we don't charge for driving guests in our own car.", es: "Por ley no cobramos por llevar a clientes en nuestro coche." } },
];

// ---------------------------------------------------------------- activities
export type Season = "Winter" | "Spring" | "Summer" | "Autumn";
export type Kind = "Nature" | "Heritage" | "Food & wine" | "Festival" | "Adventure" | "Wellness";

export const SEASON_NAMES: Record<Season, T> = {
  Winter: { en: "Winter", es: "Invierno" }, Spring: { en: "Spring", es: "Primavera" }, Summer: { en: "Summer", es: "Verano" }, Autumn: { en: "Autumn", es: "Otoño" },
};
export const KIND_NAMES: Record<Kind, T> = {
  Nature: { en: "Nature", es: "Naturaleza" }, Heritage: { en: "Heritage", es: "Patrimonio" }, "Food & wine": { en: "Food & wine", es: "Gastronomía y vino" },
  Festival: { en: "Festival", es: "Fiestas" }, Adventure: { en: "Adventure", es: "Aventura" }, Wellness: { en: "Wellness", es: "Bienestar" },
};

export type Activity = { id: string; name: T; where: string; distance: T; seasons: Season[]; kind: Kind; blurb: T; price: T; image?: ImgSlug; source?: SourceKey };

const INV: T = { en: "in the village", es: "en el pueblo" };

export const ACTIVITIES: Activity[] = [
  { id: "fraga", name: { en: "Ruta da Fraga", es: "Ruta da Fraga" }, where: "San Xoán de Río (Mouruás)", distance: INV, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Nature", blurb: { en: "An 8 km, low-difficulty loop through centuries-old chestnut and oak woods, passing hamlets and the nature school.", es: "Ruta circular de 8 km y dificultad baja entre castaños y robles centenarios, aldeas y la escuela de la naturaleza." }, price: { en: "Free alone · €25 guided", es: "Gratis por libre · 25 € guiada" }, image: "fraga", source: "fraga" },
  { id: "reboleiras", name: { en: "Reboleiras do Navea", es: "Reboleiras do Navea" }, where: "San Xoán de Río", distance: INV, seasons: ["Spring", "Summer", "Autumn"], kind: "Nature", blurb: { en: "Native oak forest, streams and views over the Navea river, starting from the village or the stone bridge.", es: "Robledal autóctono, regatos y vistas al río Navea, saliendo del pueblo o del puente de piedra." }, price: { en: "Free · €25 guided", es: "Gratis · 25 € guiada" }, image: "navea-valley-2", source: "galiciaMaxicaSxr" },
  { id: "pintasilva", name: { en: "Pintasilva waterfalls & Guístolas reservoir", es: "Fervenzas de Pintasilva y encoro de Guístolas" }, where: "San Xoán de Río", distance: INV, seasons: ["Spring", "Summer"], kind: "Nature", blurb: { en: "Waterfalls on the hiking routes, and a 37-hectare reservoir on the Navea for picnics and views.", es: "Cascadas en las rutas de senderismo y un embalse de 37 hectáreas en el Navea para merendar y disfrutar de las vistas." }, price: { en: "Free", es: "Gratis" }, image: "navea-taboazas", source: "galiciaMaxicaSxr" },
  { id: "ponte-navea", name: { en: "Ponte Navea & the Roman Vía Nova", es: "Ponte Navea y la Vía Nova romana" }, where: "San Xoán de Río / A Pobra de Trives", distance: { en: "≈10 min", es: "≈10 min" }, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Heritage", blurb: { en: "A 46 m stone bridge of Roman origin, rebuilt in the Middle Ages, on the Vía Nova road. Roman milestones stand nearby.", es: "Puente de piedra de 46 m de origen romano, reconstruido en la Edad Media, en la Vía Nova. Cerca hay miliarios romanos." }, price: { en: "Free · €25 guided", es: "Gratis · 25 € guiada" }, image: "ponte-navea", source: "galiciaMaxicaSxr" },
  { id: "biocos", name: { en: "Stargazing at Os Biocos", es: "Estrellas en Os Biocos" }, where: "Os Biocos, San Xoán de Río", distance: { en: "≈10 min", es: "≈10 min" }, seasons: ["Spring", "Summer", "Autumn"], kind: "Nature", blurb: { en: "Dark skies over the plateau where the Rural Valley campus is being built. Guided night with blankets and a hot drink.", es: "Cielos oscuros sobre la meseta donde se construye el campus Rural Valley. Noche guiada con mantas y algo caliente." }, price: { en: "€20", es: "20 €" }, image: "biocos-observatory" },
  { id: "bibei", name: { en: "Ponte Bibei Roman bridge", es: "Puente romano de Bibei" }, where: "A Pobra de Trives", distance: { en: "≈25 min", es: "≈25 min" }, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Heritage", blurb: { en: "A Roman bridge over the Bibei river on the old Vía Nova road, with Roman milestones beside it.", es: "Puente romano sobre el río Bibei en la antigua Vía Nova, con miliarios romanos al lado." }, price: { en: "Free", es: "Gratis" }, image: "ponte-bibei" },
  { id: "trives", name: { en: "A Pobra de Trives market days", es: "Feira de A Pobra de Trives" }, where: "A Pobra de Trives", distance: { en: "≈15 min", es: "≈15 min" }, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Food & wine", blurb: { en: "The feira (market) on the 1st and 15th of each month in a town on Spain's “Magical Towns” list, with pulpo á feira at the stalls.", es: "Feira los días 1 y 15 de cada mes en una villa de la red de “Pueblos Mágicos”, con pulpo á feira en los puestos." }, price: { en: "Free", es: "Gratis" }, image: "pulpo", source: "fiestasTrives" },
  { id: "bica", name: { en: "Festa da Bica", es: "Festa da Bica" }, where: "A Pobra de Trives", distance: { en: "≈15 min", es: "≈15 min" }, seasons: ["Summer"], kind: "Festival", blurb: { en: "Held for more than 50 years on the last weekend of July, celebrating the bica, Trives's traditional butter cake.", es: "Más de 50 años celebrándose el último fin de semana de julio en honor a la bica, el bizcocho tradicional de Trives." }, price: { en: "Free", es: "Gratis" }, image: "gaita", source: "fiestasTrives" },
  { id: "ski", name: { en: "Skiing at Manzaneda", es: "Esquí en Manzaneda" }, where: "Cabeza de Manzaneda", distance: { en: "≈40 min", es: "≈40 min" }, seasons: ["Winter"], kind: "Adventure", blurb: { en: "Galicia's only ski resort: 23 runs and over 15 km of slopes. Day passes cost €23–28, or €16 on Tuesdays.", es: "La única estación de esquí de Galicia: 23 pistas y más de 15 km esquiables. Forfait de 23–28 €, o 16 € los martes." }, price: { en: "Pass €23–28 · add-on €30", es: "Forfait 23–28 € · extra 30 €" }, image: "manzaneda-ski", source: "manzanedaInfobae" },
  { id: "manzaneda-summer", name: { en: "Manzaneda in summer", es: "Manzaneda en verano" }, where: "Cabeza de Manzaneda", distance: { en: "≈40 min", es: "≈40 min" }, seasons: ["Summer", "Spring"], kind: "Adventure", blurb: { en: "Bike park, adventure park, horse riding, karting, archery, paintball and a spa, with views from the summit.", es: "Bike park, multiaventura, hípica, karts, tiro con arco, paintball y spa, con vistas desde la cumbre." }, price: { en: "Set by the resort", es: "Según la estación" }, image: "cabeza-manzaneda", source: "manzaneda" },
  { id: "entroido", name: { en: "Entroido (Carnival) in Terra de Trives", es: "Entroido en Terra de Trives" }, where: "Manzaneda / A Pobra de Trives", distance: { en: "≈30 min", es: "≈30 min" }, seasons: ["Winter"], kind: "Festival", blurb: { en: "More than a month of folións (drum-and-costume parades), masks and the famous “bull”, ending on Carnival Tuesday.", es: "Más de un mes de folións, máscaras y el famoso “boi”, hasta el martes de Entroido." }, price: { en: "Free", es: "Gratis" }, image: "entroido", source: "fiestasTrives" },
  { id: "montederramo", name: { en: "Monastery of Santa María de Montederramo", es: "Monasterio de Santa María de Montederramo" }, where: "Montederramo", distance: { en: "≈30 min", es: "≈30 min" }, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Heritage", blurb: { en: "A Renaissance monastery built mainly between the 16th and 17th centuries. Visits need a reservation.", es: "Monasterio renacentista construido sobre todo entre los siglos XVI y XVII. Visitas con reserva." }, price: { en: "Visit by reservation", es: "Visita con reserva" }, image: "montederramo" },
  { id: "caldelas", name: { en: "Castle of Castro Caldelas", es: "Castillo de Castro Caldelas" }, where: "Castro Caldelas", distance: { en: "≈40 min", es: "≈40 min" }, seasons: ["Spring", "Summer", "Autumn", "Winter"], kind: "Heritage", blurb: { en: "A hilltop castle with an ethnographic museum, overlooking the Sil canyons and vineyards.", es: "Castillo en lo alto con museo etnográfico, sobre los cañones del Sil y los viñedos." }, price: { en: "Small entry fee", es: "Entrada reducida" }, image: "castro-caldelas", source: "castroCaldelas" },
  { id: "catamaran", name: { en: "Sil canyon by catamaran", es: "Cañón del Sil en catamarán" }, where: "Abeleda (Castro Caldelas) / Santo Estevo", distance: { en: "≈45–60 min", es: "≈45–60 min" }, seasons: ["Spring", "Summer", "Autumn"], kind: "Nature", blurb: { en: "Tickets cost €12–13. The trip from Santo Estevo takes 1h15 and the one from Abeleda 1h45. Book online in summer.", es: "Billete de 12–13 €. Desde Santo Estevo son 1h15 y desde Abeleda 1h45. En verano, reserva online." }, price: { en: "€12–13 · add-on €25", es: "12–13 € · extra 25 €" }, image: "sil-catamaran", source: "catamaran" },
  { id: "balcones", name: { en: "Balcones de Madrid viewpoint", es: "Mirador Balcones de Madrid" }, where: "Parada de Sil", distance: { en: "≈60 min", es: "≈60 min" }, seasons: ["Spring", "Summer", "Autumn"], kind: "Nature", blurb: { en: "The best-known viewpoint in the Ribeira Sacra, high above the Sil canyon.", es: "El mirador más famoso de la Ribeira Sacra, muy por encima del cañón del Sil." }, price: { en: "Free", es: "Gratis" }, image: "sil-canyon", source: "paradaSil" },
  { id: "wine", name: { en: "Ribeira Sacra wineries", es: "Bodegas de la Ribeira Sacra" }, where: "Sil & Bibei", distance: { en: "≈40–60 min", es: "≈40–60 min" }, seasons: ["Spring", "Summer", "Autumn"], kind: "Food & wine", blurb: { en: "Mencía and Godello wines from steep terraced vineyards. Visits cost €12–30; a full-day tour of all 5 sub-zones costs €150.", es: "Mencía y Godello de viñedos en bancales imposibles. Visitas de 12–30 €; ruta de día completo por las 5 subzonas, 150 €." }, price: { en: "€12–30 · add-on €40", es: "12–30 € · extra 40 €" }, image: "sil-vineyards", source: "viaRomana" },
  { id: "vendima", name: { en: "Grape harvest (vendima) days", es: "Días de vendimia" }, where: "Ribeira Sacra", distance: { en: "≈40–60 min", es: "≈40–60 min" }, seasons: ["Autumn"], kind: "Food & wine", blurb: { en: "September harvest on the terraced vineyards, followed by a winegrowers' lunch.", es: "Vendimia de septiembre en los bancales, con comida de viticultores después." }, price: Q, image: "mencia" },
  { id: "magosto", name: { en: "Magosto chestnut festival", es: "Magosto" }, where: "Terra de Trives", distance: { en: "local", es: "local" }, seasons: ["Autumn"], kind: "Festival", blurb: { en: "November chestnut roasts with sausages, wine and music, such as the Magosto Moteiro in A Pobra de Trives. We also host private magostos in neighbours' chestnut groves.", es: "Castañas asadas en noviembre con chorizo, vino y música, como el Magosto Moteiro de A Pobra de Trives. También organizamos magostos privados en soutos de vecinos." }, price: { en: "Free · private €18/guest", es: "Gratis · privado 18 €/invitado" }, image: "magosto", source: "fiestasTrives" },
  { id: "termas", name: { en: "Ourense hot springs", es: "Termas de Ourense" }, where: "Outariz, Ourense", distance: { en: "≈60 min", es: "≈60 min" }, seasons: ["Winter", "Autumn", "Spring"], kind: "Wellness", blurb: { en: "Outdoor thermal pools by the Miño river. Easy to combine with arrival day in Ourense.", es: "Piscinas termales al aire libre junto al Miño. Fácil de combinar con el día de llegada a Ourense." }, price: { en: "Varies", es: "Variable" }, image: "termas" },
];

export const SEASONS: { name: Season; months: T; headline: T }[] = [
  { name: "Winter", months: { en: "Dec–Feb", es: "dic–feb" }, headline: { en: "Skiing at Manzaneda, the Entroido carnival, fireside stone-house stays, Ourense hot springs", es: "Esquí en Manzaneda, Entroido, estancias junto al fuego, termas de Ourense" } },
  { name: "Spring", months: { en: "Mar–May", es: "mar–may" }, headline: { en: "Waterfalls in full flow, the Rural Valley cohort arrives (March 2027), Easter trips", es: "Fervenzas a pleno caudal, llega la promoción de Rural Valley (marzo de 2027), Semana Santa" } },
  { name: "Summer", months: { en: "Jun–Aug", es: "jun–ago" }, headline: { en: "Catamarans, outdoor parties on villagers' land, Festa da Bica, stargazing", es: "Catamaranes, fiestas al aire libre en fincas, Festa da Bica, estrellas" } },
  { name: "Autumn", months: { en: "Sep–Nov", es: "sep–nov" }, headline: { en: "Grape harvest, magosto chestnut roasts, woods in autumn colour", es: "Vendimia, magostos, bosques de colores" } },
];

// ---------------------------------------------------------------- hosts (villagers)
export const HOST_OFFERS: { title: T; share: T; body: T }[] = [
  { title: { en: "Rent out your house", es: "Alquila tu casa" }, share: { en: "You keep 85%", es: "Te quedas el 85 %" }, body: { en: "We bring vetted guests for stays from one week to three months, handle cleaning between stays, help with the tourist-rental registration, and advise on the RE-HABITA renovation grants.", es: "Traemos huéspedes verificados para estancias de una semana a tres meses, nos ocupamos de la limpieza, te ayudamos con el alta de vivienda de uso turístico y te orientamos sobre las ayudas de RE-HABITA." } },
  { title: { en: "Rent out your land, chestnut grove or wine cellar", es: "Alquila tu finca, souto o adega" }, share: { en: "You keep 80% of the venue fee", es: "Te quedas el 80 % del alquiler del espacio" }, body: { en: "Birthdays, magostos, company retreats and family reunions. Venues typically earn €300–500 per event. We bring insurance, clean-up and the permit paperwork.", es: "Cumpleaños, magostos, retiros de empresa y reuniones familiares. Un espacio suele ganar 300–500 € por evento. Ponemos el seguro, la limpieza y los permisos." } },
  { title: { en: "Lease your land for years", es: "Arrienda tu finca por años" }, share: { en: "You keep 85% of the rent, every year", es: "Te quedas el 85 % del canon, cada año" }, body: { en: "Chestnut, organic, livestock and beekeeping projects need land for 5 to 25 years. We find the project, draft the lease under Ley 49/2003, register it and pay you every year. Land that is worked stays cleared and does not burn.", es: "Los proyectos de castaña, ecológico, ganadería y apicultura necesitan tierra de 5 a 25 años. Buscamos el proyecto, redactamos el contrato según la Ley 49/2003, lo registramos y te pagamos cada año. La tierra trabajada se mantiene limpia y no arde." } },
  { title: { en: "Offer your skills", es: "Ofrece tu oficio" }, share: { en: "You set your fee", es: "Tú pones el precio" }, body: { en: "Guides, octopus cooks, bakers, gaiteiros (bagpipers), craftspeople, licensed taxi drivers, farmhands and harvest crews. You join the marketplace and get paid per booking or per season.", es: "Guías, pulpeiras, panaderos, gaiteiros, artesanos, taxistas con licencia, peones y cuadrillas de cosecha. Entras en el catálogo y cobras por reserva o por temporada." } },
];

export const OUTREACH_PLAN: { item: T; cost: number }[] = [
  { item: { en: "Printed letters to every household + posters at the Concello and bars", es: "Cartas a todas las casas + carteles en el Concello y los bares" }, cost: 250 },
  { item: { en: "Stall at A Pobra de Trives market (1st & 15th)", es: "Puesto en la feira de A Pobra de Trives (días 1 y 15)" }, cost: 150 },
  { item: { en: "Opening magosto for neighbours and returning emigrants", es: "Magosto de presentación para vecinos y emigrantes que vuelven" }, cost: 450 },
  { item: { en: "Calls and visits to owners through the RE-HABITA office", es: "Llamadas y visitas a propietarios a través de la oficina de RE-HABITA" }, cost: 150 },
];

// ---------------------------------------------------------------- financial model
export const BUDGET: { item: T; amount: number; note: T; fromUser: boolean }[] = [
  { item: { en: "House refit", es: "Reforma de la casa" }, amount: 8000, note: { en: "Cosmetic refit so the whole house can be let: paint, beds, bathroom, heating. Not structural work.", es: "Reforma estética para alquilar la casa entera: pintura, camas, baño, calefacción. Sin obra estructural." }, fromUser: true },
  { item: { en: "Marketing", es: "Marketing" }, amount: 3000, note: { en: "Launch content, ads targeting Madrid, Vigo, Ourense and remote-worker communities", es: "Contenido de lanzamiento y anuncios en Madrid, Vigo, Ourense y comunidades de teletrabajo" }, fromUser: true },
  { item: { en: "Owner outreach", es: "Captación de propietarios" }, amount: 1000, note: { en: "Finding villagers and emigrants with houses and land to list, including heirs abroad for multi-year land leases", es: "Encontrar vecinos y emigrantes con casas y fincas, incluidos herederos en el extranjero para arrendamientos plurianuales" }, fromUser: true },
  { item: { en: "Insurance, registrations, gestor", es: "Seguros, registros, gestoría" }, amount: 2500, note: { en: "Liability insurance, REAT registrations, self-employed registration, accountant", es: "Seguro de responsabilidad civil, altas en el REAT, alta de autónomo, gestoría" }, fromUser: false },
  { item: { en: "AI concierge + website", es: "Conserje IA + web" }, amount: 1500, note: { en: "Knowledge base, hosting, AI usage for the year", es: "Base de conocimiento, alojamiento web, uso de IA durante el año" }, fromUser: false },
  { item: { en: "Event kit", es: "Kit de eventos" }, amount: 1500, note: { en: "Gazebo, 40 chairs, tables, festoon lights. Owning it beats renting after about 10 events.", es: "Carpa, 40 sillas, mesas y luces. Comprarlo compensa a partir de unos 10 eventos." }, fromUser: false },
  { item: { en: "Cash reserve", es: "Reserva de caja" }, amount: 7500, note: { en: "Covers the first four loan payments and slow winter months", es: "Cubre las cuatro primeras cuotas del préstamo y los meses flojos de invierno" }, fromUser: false },
];

export type Line = { id: string; label: T; unitLabel: T; volume: number; price: number; costRate: number; min: number; max: number; step: number };

// Default = the scenario presented to the jury. All volumes are our estimates.
export const LINES: Line[] = [
  { id: "week", label: { en: "1-week packages", es: "Paquetes de 1 semana" }, unitLabel: { en: "people", es: "personas" }, volume: 150, price: 220, costRate: 80 / 220, min: 0, max: 400, step: 10 },
  { id: "month", label: { en: "1-month packages", es: "Paquetes de 1 mes" }, unitLabel: { en: "people", es: "personas" }, volume: 20, price: 450, costRate: 150 / 450, min: 0, max: 80, step: 2 },
  { id: "trial", label: { en: "3-month packages (a season here)", es: "Paquetes de 3 meses (una temporada)" }, unitLabel: { en: "people", es: "personas" }, volume: 8, price: 900, costRate: 300 / 900, min: 0, max: 40, step: 1 },
  { id: "house", label: { en: "Own house (whole-house lets)", es: "Casa propia (alquiler completo)" }, unitLabel: { en: "nights", es: "noches" }, volume: 100, price: 110, costRate: 2500 / 11000, min: 0, max: 300, step: 10 },
  { id: "hosts", label: { en: "15% on villagers' houses", es: "15 % sobre casas de vecinos" }, unitLabel: { en: "€k booked", es: "k€ reservados" }, volume: 40, price: 150, costRate: 0, min: 0, max: 120, step: 5 },
  { id: "events", label: { en: "Private events on villagers' land", es: "Eventos privados en fincas" }, unitLabel: { en: "events", es: "eventos" }, volume: 25, price: 2000, costRate: 0.68, min: 0, max: 60, step: 1 },
  // Land for agricultural projects: leases of 5–25 years on villagers' parcels.
  { id: "land", label: { en: "Agricultural project set-ups (multi-year leases)", es: "Puesta en marcha de proyectos agrarios (arrendamientos plurianuales)" }, unitLabel: { en: "projects", es: "proyectos" }, volume: 10, price: 1500, costRate: 0.2, min: 0, max: 30, step: 1 },
  { id: "landMgmt", label: { en: "Land management + 15% rent commission", es: "Gestión de fincas + 15 % del canon" }, unitLabel: { en: "projects", es: "proyectos" }, volume: 10, price: 800, costRate: 0.1, min: 0, max: 30, step: 1 },
];

export const FIXED_COSTS: { item: T; amount: number }[] = [
  { item: { en: "Marketing", es: "Marketing" }, amount: 3000 },
  { item: { en: "Owner outreach", es: "Captación de propietarios" }, amount: 1000 },
  { item: { en: "Insurance, registrations, gestor", es: "Seguros, registros, gestoría" }, amount: 2500 },
  { item: { en: "AI concierge + website", es: "Conserje IA + web" }, amount: 1500 },
  { item: { en: "Car, fuel, maintenance", es: "Coche, combustible, mantenimiento" }, amount: 2500 },
  { item: { en: "Self-employed social security (€80/month flat rate, year 1)", es: "Cuota de autónomo (tarifa plana 80 €/mes, año 1)" }, amount: 960 },
  { item: { en: "Contingency", es: "Imprevistos" }, amount: 1500 },
];

export const CAPEX: { item: T; amount: number }[] = [
  { item: { en: "House refit", es: "Reforma de la casa" }, amount: 8000 },
  { item: { en: "Event kit", es: "Kit de eventos" }, amount: 1500 },
];

export const LOAN = { principal: 20000, annualRate: 0.07, months: 12, ownFunds: 5000 };

export function loanPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12;
  return r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
}

// Share of annual revenue by month (Oct 2026 → Sep 2027). Estimate.
export const MONTHS: Record<"en" | "es", string[]> = {
  en: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  es: ["oct", "nov", "dic", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep"],
};
export const SEASONALITY = [0, 0.03, 0.04, 0.05, 0.06, 0.08, 0.09, 0.09, 0.11, 0.14, 0.16, 0.15];

// ---------------------------------------------------------------- plan, risks, compliance
export const TIMELINE: { when: T; what: T[] }[] = [
  { when: { en: "Month 1 · Oct 2026", es: "Mes 1 · oct 2026" }, what: [
    { en: "Register as self-employed (€80/month flat rate), take out liability insurance", es: "Alta de autónomo (tarifa plana de 80 €/mes) y seguro de responsabilidad civil" },
    { en: "File the tourist-rental declaration for the whole house (REAT) and the active-tourism declaration for guided walks", es: "Declaración responsable de vivienda de uso turístico (REAT) y de turismo activo para las rutas guiadas" },
    { en: "Sign a partner deal with a licensed travel agency for any bundled offers, and with local taxis", es: "Acuerdo con una agencia de viajes con licencia para ofertas combinadas, y con taxis locales" },
    { en: "Start the house refit, build the knowledge base, contact 30 owners", es: "Empezar la reforma, crear la base de conocimiento, contactar con 30 propietarios" },
  ] },
  { when: { en: "Month 2 · Nov 2026", es: "Mes 2 · nov 2026" }, what: [
    { en: "Pilot magosto in a neighbour's chestnut grove, launched with neighbours and returning emigrants", es: "Magosto piloto en el souto de un vecino, con vecinos y emigrantes" },
    { en: "List the first 5 houses and 10 parcels; first owner meetings about multi-year leases", es: "Publicar las primeras 5 casas y 10 fincas; primeras reuniones con propietarios sobre arrendamientos plurianuales" },
    { en: "Partner agreements: catamaran, winery, caterer, marquee hire", es: "Acuerdos con catamarán, bodega, catering y carpas" },
  ] },
  { when: { en: "Month 3 · Dec 2026", es: "Mes 3 · dic 2026" }, what: [
    { en: "House ready and registered", es: "Casa lista y registrada" },
    { en: "Winter packages: Manzaneda skiing and fireside stays", es: "Paquetes de invierno: esquí en Manzaneda y estancias junto al fuego" },
    { en: "First paying weekly guests", es: "Primeros clientes semanales" },
  ] },
  { when: { en: "Months 4–5 · Jan–Feb 2027", es: "Meses 4–5 · ene–feb 2027" }, what: [
    { en: "Entroido carnival packages", es: "Paquetes de Entroido" },
    { en: "Outreach to companies for team retreats", es: "Captación de empresas para retiros" },
    { en: "First multi-year land lease signed: parcels consolidated, contract under Ley 49/2003", es: "Primer arrendamiento plurianual firmado: parcelas agrupadas, contrato según la Ley 49/2003" },
  ] },
  { when: { en: "Month 6 · Mar 2027", es: "Mes 6 · mar 2027" }, what: [
    { en: "First Rural Valley cohort arrives: guests, event clients, and land for its agri-food projects", es: "Llega la primera promoción de Rural Valley: huéspedes, clientes de eventos y tierra para sus proyectos agroalimentarios" },
    { en: "Weekend events on villagers' land", es: "Eventos de fin de semana en fincas de vecinos" },
  ] },
  { when: { en: "Months 7–8 · Apr–May 2027", es: "Meses 7–8 · abr–may 2027" }, what: [
    { en: "Easter peak", es: "Pico de Semana Santa" },
    { en: "Municipal elections in May 2027: no revenue depends on council contracts", es: "Elecciones municipales en mayo de 2027: ningún ingreso depende de contratos municipales" },
  ] },
  { when: { en: "Months 9–11 · Jun–Aug 2027", es: "Meses 9–11 · jun–ago 2027" }, what: [
    { en: "Peak season for events and weekly packages", es: "Temporada alta de eventos y paquetes semanales" },
    { en: "Hire 2 freelance guides and weekend event staff", es: "Contratar 2 guías autónomos y personal para eventos" },
  ] },
  { when: { en: "Month 12 · Sep 2027", es: "Mes 12 · sep 2027" }, what: [
    { en: "Grape-harvest experiences", es: "Experiencias de vendimia" },
    { en: "Loan fully repaid; 10 projects under management; year-two plan (own travel-agency licence?)", es: "Préstamo devuelto; 10 proyectos en gestión; plan del segundo año (¿licencia propia de agencia?)" },
  ] },
];

export const RISKS: { risk: T; mitigation: T }[] = [
  { risk: { en: "Selling lodging or transport together with activities at one price makes it a “package holiday”, which needs a travel-agency licence and insolvency cover", es: "Vender alojamiento o transporte junto con actividades a precio global es un “viaje combinado”, que exige licencia de agencia y garantía" }, mitigation: { en: "Our packages contain only tourist services. Guests book and pay lodging directly with the host, and taxis directly with the driver. Anything bundled goes through a licensed partner agency.", es: "Nuestros paquetes solo incluyen servicios turísticos. El alojamiento se reserva y paga directamente al anfitrión y el taxi al conductor. Lo combinado pasa por una agencia colaboradora con licencia." } },
  { risk: { en: "Driving paying guests in our own car without a transport licence is a very serious infringement (€4,001–6,000)", es: "Llevar clientes que pagan en el coche propio sin autorización es una infracción muy grave (4.001–6.000 €)" }, mitigation: { en: "Transfers are done by licensed taxis we book; the car is used only for logistics.", es: "Los traslados los hacen taxis con licencia que reservamos; el coche solo se usa para logística." } },
  { risk: { en: "A Galician tourist-rental licence (VUT) covers only whole dwellings for stays under 30 days", es: "Una vivienda de uso turístico (VUT) en Galicia solo puede alquilarse entera y para estancias de menos de 30 días" }, mitigation: { en: "We let the whole house for short stays. Stays of 30+ days are ordinary seasonal lets. Renting single rooms would need rural-tourism registration.", es: "Alquilamos la casa entera en estancias cortas. Las de 30 días o más son alquiler de temporada. Alquilar habitaciones exigiría registrarse como turismo rural." } },
  { risk: { en: "Seasonality and winter at 875 m", es: "Estacionalidad e invierno a 875 m" }, mitigation: { en: "Winter products (skiing, Entroido, hot springs, fireside stays) and Rural Valley arrivals in spring flatten the curve.", es: "Productos de invierno (esquí, Entroido, termas, chimenea) y las llegadas de Rural Valley en primavera suavizan la curva." } },
  { risk: { en: "No high-speed train stop nearby since June 2025", es: "Sin parada de AVE cerca desde junio de 2025" }, mitigation: { en: "Arrival via Ourense station with a licensed taxi booked by us.", es: "Llegada por la estación de Ourense con un taxi con licencia reservado por nosotros." } },
  { risk: { en: "One person has limited time", es: "Una sola persona tiene tiempo limitado" }, mitigation: { en: "Freelance guides and event staff paid per job (already in direct costs). The AI concierge answers routine questions around the clock.", es: "Guías y personal de eventos por encargo (ya en costes directos). El conserje IA responde las dudas habituales a cualquier hora." } },
  { risk: { en: "Overlap with Rural Valley's €350/month housing", es: "Solapamiento con el alojamiento de Rural Valley a 350 €/mes" }, mitigation: { en: "We don't compete on housing. We sell its founders experiences and events, and offer its agri-food projects land.", es: "No competimos en alojamiento. Vendemos a sus fundadores experiencias y eventos, y ofrecemos tierra a sus proyectos agroalimentarios." } },
  { risk: { en: "Land ownership is scattered: the Cambela polygon needs 135 owners for 96 ha, so one project may need a dozen signatures", es: "La propiedad está dispersa: el polígono de Cambela necesita 135 propietarios para 96 ha, así que un proyecto puede exigir una docena de firmas" }, mitigation: { en: "We are the local who knows every heir. One lease per project across several owners; unknown owners go through the Banco de Terras. The set-up fee pays for that work.", es: "Somos quien conoce a cada heredero. Un contrato por proyecto con varios propietarios; los desconocidos pasan por el Banco de Terras. La puesta en marcha paga ese trabajo." } },
  { risk: { en: "Owners fear a 5-year minimum lease", es: "Los propietarios temen el mínimo de 5 años" }, mitigation: { en: "Ley 49/2003 protects both sides: written contract, yearly rent, the land stays theirs and comes back cleared. We start with parcels already abandoned for a decade.", es: "La Ley 49/2003 protege a ambas partes: contrato escrito, canon anual, la tierra sigue siendo suya y vuelve limpia. Empezamos por fincas abandonadas desde hace una década." } },
  { risk: { en: "Municipal elections in May 2027 slow council decisions", es: "Las elecciones municipales de mayo de 2027 frenan decisiones" }, mitigation: { en: "The model has no council contract. Any municipal deal is upside only.", es: "El modelo no depende de contratos municipales. Cualquier acuerdo es un extra." } },
  { risk: { en: "Villagers hesitant to rent their land", es: "Vecinos reacios a alquilar sus fincas" }, mitigation: { en: "Owners are paid the week after each event, keep 80%, and are covered by our liability insurance. We start with a pilot magosto they can attend.", es: "Cobran la semana siguiente al evento, se quedan el 80 % y los cubre nuestro seguro. Empezamos con un magosto piloto al que pueden venir." } },
  { risk: { en: "Demand is slower than planned", es: "La demanda llega más despacio" }, mitigation: { en: "The sliders show the break-even. Pre-sell events and company retreats before fixing dates.", es: "Los controles muestran el punto de equilibrio. Prevender eventos y retiros antes de cerrar fechas." } },
];

export type Status = "verified" | "changed" | "draft";
export const COMPLIANCE: { item: T; detail: T; status: Status; sources: SourceKey[] }[] = [
  {
    item: { en: "Packages contain tourist services only (not a “package holiday”)", es: "Paquetes solo con servicios turísticos (no es “viaje combinado”)" },
    detail: {
      en: "Under Spanish consumer law (RDL 1/2007, Book IV, art. 151), a package holiday combines at least two different types of travel service (transport, accommodation, car hire, other tourist services) at one price, lasting over 24 hours or including a night. Our packages combine only the last type. Selling lodging alongside in the same booking can create “linked travel arrangements”, with information and insolvency-protection duties. So lodging is booked and paid directly with the host, and any bundle goes through a licensed partner agency. Our own licence later means a responsible declaration plus a guarantee (Decreto 42/2001, amended by Decreto 25/2018; procedure TU984A).",
      es: "Según la ley de consumidores (RDL 1/2007, libro IV, art. 151), un viaje combinado junta al menos dos tipos distintos de servicio de viaje (transporte, alojamiento, alquiler de coche, otros servicios turísticos) a precio global, de más de 24 horas o con una noche. Nuestros paquetes solo combinan el último tipo. Vender alojamiento en la misma reserva puede crear “servicios de viaje vinculados”, con deberes de información y garantía. Por eso el alojamiento se reserva y paga directamente al anfitrión, y lo combinado pasa por una agencia colaboradora. Una licencia propia exigiría declaración responsable y garantía (Decreto 42/2001, modificado por el Decreto 25/2018; trámite TU984A).",
    },
    status: "verified", sources: ["art151", "packageLaw", "agencyXunta", "decree25"],
  },
  {
    item: { en: "No paid transfers in our own car", es: "Sin traslados de pago en el coche propio" },
    detail: {
      en: "Carrying passengers for payment needs a transport authorisation. Doing it without one, or invoicing transport in your own name, is a very serious infringement (€4,001–6,000; up to €18,000 if repeated). Transfers go to licensed taxis, paid directly to the driver.",
      es: "Transportar viajeros a cambio de dinero exige autorización. Hacerlo sin ella, o facturar transporte a tu nombre, es infracción muy grave (4.001–6.000 €; hasta 18.000 € si se repite). Los traslados los hacen taxis con licencia y se pagan al conductor.",
    },
    status: "changed", sources: ["transport", "transportFaq"],
  },
  {
    item: { en: "Our house: tourist rental (VUT), whole house, under 30 days", es: "Nuestra casa: vivienda de uso turístico (VUT), entera, menos de 30 días" },
    detail: {
      en: "Decreto 12/2017 (art. 5) only allows letting the whole dwelling, never by room, for stays under 30 consecutive days. Stays of 30+ days fall outside it (ordinary seasonal lets). Start with a responsible declaration (art. 41) and REAT registration (art. 43), and show the number in adverts. Renting single rooms would need a rural-tourism establishment (Decreto 191/2004).",
      es: "El Decreto 12/2017 (art. 5) solo permite ceder la vivienda completa, nunca por habitaciones, en estancias de menos de 30 días seguidos. Las de 30 o más quedan fuera (alquiler de temporada). Se inicia con declaración responsable (art. 41) e inscripción en el REAT (art. 43), y el número figura en los anuncios. Alquilar habitaciones exigiría un establecimiento de turismo rural (Decreto 191/2004).",
    },
    status: "changed", sources: ["vutDecree", "ruralDecree"],
  },
  {
    item: { en: "National single rental register: registration procedure annulled", es: "Registro Único de Arrendamientos: procedimiento anulado" },
    detail: {
      en: "The Supreme Court annulled the registration-number procedure of Real Decreto 1312/2024 on 21 May 2026 (ruling 620/2026). Galicia's own register (REAT) still applies, platforms still send data to the Digital Single Window, and EU Regulation 2024/1028 still applies.",
      es: "El Tribunal Supremo anuló el 21 de mayo de 2026 (sentencia 620/2026) el procedimiento de número de registro del Real Decreto 1312/2024. Sigue vigente el registro gallego (REAT), las plataformas siguen enviando datos a la Ventanilla Única Digital y se aplica el Reglamento (UE) 2024/1028.",
    },
    status: "changed", sources: ["supremo", "registroUnico"],
  },
  {
    item: { en: "Active tourism (guided walks): REAT + insurance", es: "Turismo activo (rutas guiadas): REAT + seguro" },
    detail: {
      en: "Decreto 42/2001 (as amended by Decreto 25/2018) still applies: register, use qualified guides, and hold liability insurance of at least €390,657.86 with no excess. A draft new decree proposes €600,000 per claim plus €30,000 accident cover; budget for that level.",
      es: "Sigue vigente el Decreto 42/2001 (modificado por el Decreto 25/2018): alta, guías cualificados y seguro de responsabilidad civil de al menos 390.657,86 € sin franquicia. Un borrador de nuevo decreto propone 600.000 € por siniestro y 30.000 € de seguro de accidentes; presupuestamos ese nivel.",
    },
    status: "verified", sources: ["decree42", "decree25", "activeDraft"],
  },
  {
    item: { en: "Self-employed flat rate", es: "Tarifa plana de autónomos" },
    detail: { en: "€80/month for the first 12 months for first-time self-employed in 2026 (extendable if income stays below the minimum wage).", es: "80 €/mes durante los primeros 12 meses para nuevos autónomos en 2026 (prorrogable si los ingresos no superan el SMI)." },
    status: "verified", sources: ["tarifaPlana"],
  },
  {
    item: { en: "Events on private land", es: "Eventos en fincas privadas" },
    detail: { en: "Notify the Concello, use licensed caterers, respect noise limits and the Xunta's fire-risk rules (no open fires on high-risk days).", es: "Comunicar al Concello, catering con licencia, respetar el ruido y las normas de riesgo de incendio de la Xunta (sin fuego en días de riesgo alto)." },
    status: "verified", sources: [],
  },
  {
    item: { en: "Multi-year land leases: Ley 49/2003", es: "Arrendamientos de fincas plurianuales: Ley 49/2003" },
    detail: {
      en: "Rural leases last a minimum of five years; any shorter clause is void. Unless the owner gives a year's notice, the contract renews by five-year periods. Contracts are written, rent is usually yearly, and improvements need the owner's consent. We broker and manage the lease; the farming, its registrations (REAGA, CAP) and its insurance belong to the project.",
      es: "Los arrendamientos rústicos duran un mínimo de cinco años; cualquier plazo menor es nulo. Salvo aviso del propietario con un año de antelación, el contrato se prorroga por periodos de cinco años. Se firma por escrito, el canon suele ser anual y las mejoras necesitan consentimiento. Nosotros intermediamos y gestionamos; la actividad agraria, sus registros (REAGA, PAC) y su seguro son del proyecto.",
    },
    status: "verified", sources: ["ley49"],
  },
  {
    item: { en: "Land recovery: Lei 11/2021 and the Banco de Terras", es: "Recuperación de tierras: Lei 11/2021 y Banco de Terras" },
    detail: {
      en: "Galicia's land-recovery law created public instruments for abandoned parcels: the Banco de Terras (public land bank), model villages and agroforestry polygons. San Xoán de Río already has one, Cambela (96.4 ha, 301 parcels, 135 owners). We use the bank for parcels with unknown owners and coordinate with Agader rather than compete with it.",
      es: "La ley gallega de recuperación de tierras creó instrumentos públicos para las parcelas abandonadas: el Banco de Terras, las aldeas modelo y los polígonos agroforestales. San Xoán de Río ya tiene uno, Cambela (96,4 ha, 301 parcelas, 135 propietarios). Usamos el banco para las parcelas de propietario desconocido y nos coordinamos con Agader en lugar de competir con ella.",
    },
    status: "verified", sources: ["lei11", "bancoTerras", "cambela", "cambelaDog"],
  },
  {
    item: { en: "GDPR + AI transparency", es: "RGPD + transparencia de la IA" },
    detail: { en: "Leads are stored with consent. The concierge always says it is an AI, in line with the EU AI Act's transparency rules.", es: "Los contactos se guardan con consentimiento. El conserje siempre dice que es una IA, conforme a la transparencia de la Ley de IA de la UE." },
    status: "verified", sources: [],
  },
];

export const FUNDING: { name: T; amount: T; fit: T; source: SourceKey }[] = [
  { name: { en: "Xunta young farmer aid (MR404A)", es: "Ayuda de la Xunta a jóvenes agricultores (MR404A)" }, amount: { en: "€30,000, up to €70,000", es: "30.000 €, hasta 70.000 €" }, fit: { en: "Ages 18–40. For the project owners on the parcels we lease, and for our own 1 ha demonstration plot. Counted as funding, not revenue.", es: "De 18 a 40 años. Para los titulares de proyecto en las fincas que arrendamos y para nuestra parcela demostrativa de 1 ha. Es financiación, no ingreso." }, source: "youngFarmer" },
  { name: { en: "Rural diversification investment aid (MR708A)", es: "Ayuda a inversiones de diversificación rural (MR708A)" }, amount: { en: "Subsidised capex", es: "Inversión subvencionada" }, fit: { en: "Could co-fund the house refit or the event kit. 2026 call open.", es: "Podría cofinanciar la reforma o el kit de eventos. Convocatoria 2026 abierta." }, source: "diversification" },
];

// What changed versus the team's v1 prototype.
export const FIXES: { was: T; now: T }[] = [
  { was: { en: "A regional platform that ignored the persona's house, land, car and local knowledge", es: "Una plataforma regional que ignoraba la casa, la finca, el coche y el conocimiento local" }, now: { en: "Built around those assets: the house is lodging, the land is the first venue, the car covers logistics, local knowledge is the product", es: "Construido sobre esos recursos: la casa es alojamiento, la finca el primer espacio, el coche la logística y el conocimiento local el producto" } },
  { was: { en: "Revenue depended on €15k/year council contracts and a 12% cut of shop spending", es: "Los ingresos dependían de contratos municipales de 15.000 €/año y un 12 % del gasto en comercios" }, now: { en: "Revenue starts in month 2 from guests, events and land leases, with no council contract needed", es: "Ingresos desde el mes 2 con huéspedes, eventos y arrendamientos de fincas, sin contratos municipales" } },
  { was: { en: "Unclear who receives the €750–1,550/month rent", es: "No quedaba claro quién cobra los 750–1.550 €/mes" }, now: { en: "Clear prices per period, lodging priced separately, and the 15% commission stated plainly", es: "Precios claros por periodo, alojamiento aparte y comisión del 15 % explícita" } },
  { was: { en: "Competed with the village's own €350/month Rural Valley campus", es: "Competía con el propio campus Rural Valley a 350 €/mes" }, now: { en: "Partners with it: we sell experiences and events to its 120 founders a year, and land to its agri-food projects", es: "Colabora con él: vendemos experiencias y eventos a sus 120 fundadores al año, y tierra a sus proyectos agroalimentarios" } },
  { was: { en: "A relocation subscription (€99/month for paperwork): a thin service with no asset behind it", es: "Una suscripción de reubicación (99 €/mes por trámites): un servicio flojo sin ningún activo detrás" }, now: { en: "Multi-year land leases for agricultural projects: the village's most abandoned asset becomes recurring rent, set-up and management fees, and local jobs", es: "Arrendamientos plurianuales de fincas para proyectos agrarios: el activo más abandonado del pueblo se convierte en canon recurrente, puesta en marcha, gestión y empleo local" } },
  { was: { en: "Generated images, match scores for villages not yet surveyed, one wrong fact (A Pobra de Trives vs A Teixeira)", es: "Imágenes generadas, puntuaciones de pueblos sin estudiar y un dato erróneo (A Pobra de Trives en vez de A Teixeira)" }, now: { en: "Real, openly licensed photos with credits, sourced figures, and estimates labelled as estimates", es: "Fotos reales con licencia abierta y créditos, cifras con fuente y estimaciones señaladas" } },
  { was: { en: "“AI concierge” promised but never explained", es: "“Conserje IA” prometido pero sin explicar" }, now: { en: "A working concierge: an AI model answering from a curated local knowledge base", es: "Un conserje real: un modelo de IA que responde desde una base de conocimiento local" } },
  { was: { en: "No legal or financial plan", es: "Sin plan legal ni financiero" }, now: { en: "Compliance checked against official sources, €25k budget, 12-month P&L with loan repayment, risks and a timeline", es: "Cumplimiento verificado con fuentes oficiales, presupuesto de 25.000 €, cuenta de resultados a 12 meses con el préstamo, riesgos y calendario" } },
];

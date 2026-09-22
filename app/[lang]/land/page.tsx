import type { Metadata } from "next";
import LandExplorer from "@/components/LandExplorer";
import { Button, Estimate, PageHero, Photo, Section, SectionTitle, Src } from "@/components/ui";
import { FUNDING } from "@/lib/data";
import { eur, href, tx, type T } from "@/lib/i18n";
import { LAND_STATS, LAND_STEPS, LEASE, PARCELS, PROJECTS } from "@/lib/land";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/land">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: tx({ en: "Land for agricultural projects · RuralRiver", es: "Tierra para proyectos agrarios · RuralRiver" }, lang),
    description: tx({ en: "Lease villagers' land in San Xoán de Río for 5 to 25 years: chestnuts, organic farming, extensive cattle, hives. We assemble the parcels, draft the lease and hire locally.", es: "Alquila fincas de vecinos en San Xoán de Río de 5 a 25 años: castaños, ecológico, vacuno extensivo, colmenas. Reunimos las parcelas, redactamos el contrato y contratamos aquí." }, lang),
    alternates: alternates(lang, "/land"),
  };
}

export default async function LandPage({ params }: PageProps<"/[lang]/land">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const totalHa = PARCELS.reduce((s, p) => s + p.ha, 0);
  return (
    <>
      <PageHero slug="chestnuts" lang={lang} eyebrow={t({ en: "Agricultural projects · leases of 5 to 25 years", es: "Proyectos agrarios · arrendamientos de 5 a 25 años" })} title={t({ en: "The land is here. Bring the project, we bring the owners, the contract and the workers.", es: "La tierra está aquí. Trae el proyecto: nosotros ponemos los propietarios, el contrato y la mano de obra." })} lead={t({ en: `Villagers' meadows, chestnut groves and terraces that nobody has worked for years, leased for the long term to chestnut, organic, livestock and beekeeping projects. ${PARCELS.length} example parcels, ${totalHa.toFixed(1)} hectares, on the map below.`, es: `Prados, soutos y bancales de vecinos que nadie trabaja desde hace años, arrendados a largo plazo a proyectos de castaña, ecológico, ganadería y apicultura. ${PARCELS.length} fincas de ejemplo, ${totalHa.toFixed(1)} hectáreas, en el mapa de abajo.` })}>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#map">{t({ en: "See the parcels →", es: "Ver las fincas →" })}</Button>
          <Button href={href("/plan", lang)} variant="light">{t({ en: "Plan my project", es: "Planificar mi proyecto" })}</Button>
        </div>
      </PageHero>

      <Section>
        <SectionTitle eyebrow={t({ en: "Why land, why now", es: "Por qué tierra, por qué ahora" })} title={t({ en: "Galicia has the most unused farmland in Spain. This valley is no exception.", es: "Galicia es la comunidad con más tierra agraria sin uso de España. Este valle no es la excepción." })} lead={t({ en: "The Xunta is already consolidating 96 hectares in this municipality for organic cattle. What projects still lack is a local who knows every owner. That is the service.", es: "La Xunta ya está reuniendo 96 hectáreas en este concello para vacuno ecológico. Lo que sigue faltando a los proyectos es alguien del pueblo que conozca a cada propietario. Ese es el servicio." })} />
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAND_STATS.map((f) => (
            <div key={f.label.en} className="rounded-2xl bg-stone p-5">
              <dt className="font-display text-3xl font-semibold text-moss">{tx(f.value, lang)}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{t(f.label)}</dd>
              <dd className="mt-2"><Src k={f.source} /></dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="bg-stone">
        <Section>
          <SectionTitle eyebrow={t({ en: "How it works", es: "Cómo funciona" })} title={t({ en: "From an idea to a signed lease in four steps.", es: "De la idea al contrato firmado en cuatro pasos." })} />
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {LAND_STEPS.map((s, i) => (
              <li key={s.title.en} className="rounded-2xl bg-paper p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-moss font-semibold text-on-moss">{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{t(s.title)}</h3>
                <p className="mt-2 text-sm text-ink-soft">{t(s.body)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { v: `${LEASE.ownerShare * 100}%`, l: { en: "of the rent goes to the owners, paid every year", es: "del canon es para los propietarios, cobrado cada año" } },
              { v: e(LEASE.setupFee), l: { en: "one-off set-up fee per project: parcels, owners, lease, registrations, first hires", es: "puesta en marcha por proyecto: parcelas, propietarios, contrato, registros, primeras contrataciones" } },
              { v: `${e(LEASE.managementYear)}/${t({ en: "yr", es: "año" })}`, l: { en: "management: owner payments, boundaries, seasonal labour, concierge", es: "gestión: pagos a propietarios, lindes, mano de obra estacional, conserje" } },
            ].map((x) => (
              <div key={x.l.en} className="rounded-2xl border border-line bg-paper p-5"><p className="font-display text-3xl font-semibold">{x.v}<Estimate lang={lang} /></p><p className="mt-1 text-sm text-ink-soft">{t(x.l)}</p></div>
            ))}
          </div>
        </Section>
      </section>

      <Section id="map">
        <SectionTitle eyebrow={t({ en: "The map", es: "El mapa" })} title={t({ en: "San Xoán de Río, parcel by parcel.", es: "San Xoán de Río, finca a finca." })} lead={t({ en: "Pick the parcels, the project and the term. The quote updates as you go, including what the owners receive and how many local jobs the project could support.", es: "Elige las fincas, el proyecto y la duración. El presupuesto se actualiza al momento, incluido lo que cobran los propietarios y cuánto empleo local podría sostener el proyecto." })} />
        <div className="mt-8"><LandExplorer lang={lang} /></div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow={t({ en: "Project types", es: "Tipos de proyecto" })} title={t({ en: "What grows at 800 metres in Terra de Trives.", es: "Qué crece a 800 metros en Terra de Trives." })} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <div key={p.id} className="rounded-2xl border border-line p-5">
              <p className="text-3xl" aria-hidden>{p.icon}</p>
              <h3 className="mt-2 text-xl font-semibold">{t(p.label)}</h3>
              <p className="mt-1 text-sm text-ink-soft">{t(p.blurb)}</p>
              <p className="mt-2 text-xs text-ink-soft">{t({ en: `From ${p.minHa} ha · about ${p.jobsPerHa} permanent and ${p.seasonalPerHa} seasonal jobs per hectare`, es: `Desde ${p.minHa} ha · unos ${p.jobsPerHa} empleos fijos y ${p.seasonalPerHa} de temporada por hectárea` })}<Estimate lang={lang} /></p>
              {p.source && <p className="mt-2"><Src k={p.source} /></p>}
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-moss-deep text-on-accent">
        <Section>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Photo slug="chestnut-tree" lang={lang} className="h-72 rounded-2xl" sizes="50vw" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Jobs, and a reason to come back", es: "Empleo, y una razón para volver" })}</p>
              <h2 className="mt-2 text-3xl font-semibold">{t({ en: "A project that leases 20 hectares hires in the village first.", es: "Un proyecto que arrienda 20 hectáreas contrata primero en el pueblo." })}</h2>
              <p className="mt-3 text-on-accent/85">{t({ en: "Every lease we sign has a local-hiring clause: seasonal harvest crews, a permanent farmhand, a driver, a bookkeeper. We match people from San Xoán de Río and the valley first, then emigrants who want to return, then the project's own team, whom we house in villagers' houses. Land that is worked is also land that does not burn.", es: "Cada contrato que firmamos lleva una cláusula de contratación local: cuadrillas de cosecha, un peón fijo, un conductor, alguien para la administración. Buscamos primero en San Xoán de Río y el valle, después a emigrantes que quieren volver y por último al equipo del propio proyecto, al que alojamos en casas de vecinos. La tierra que se trabaja tampoco arde." })}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FUNDING.slice(0, 2).map((f) => (
                  <div key={f.name.en} className="rounded-xl bg-on-accent/10 p-3 text-sm"><p className="font-semibold">{t(f.name)}</p><p className="text-on-accent/80">{t(f.amount)} · {t(f.fit)}</p><Src k={f.source} /></div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="rounded-3xl border border-line p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">{t({ en: "Honest notes before you sign", es: "Avisos sinceros antes de firmar" })}</h2>
          <ul className="mt-4 space-y-2 text-ink-soft">
            <li>• {t({ en: "Rural leases in Spain last five years minimum and renew by five-year periods unless one side gives a year's notice. Plan for that horizon; it protects you too.", es: "Los arrendamientos rústicos duran cinco años como mínimo y se prorrogan por periodos de cinco salvo aviso con un año. Cuenta con ese horizonte; también te protege a ti." })} <Src k="ley49" /></li>
            <li>• {t({ en: "We broker and manage the land; the farming, its registrations (REAGA, CAP) and its insurance are the project's. We introduce you to the gestor and the Medio Rural office.", es: "Nosotros intermediamos y gestionamos la tierra; la actividad agraria, sus registros (REAGA, PAC) y su seguro son del proyecto. Te presentamos al gestor y a la oficina agraria." })}</li>
            <li>• {t({ en: "Parcels with an unknown or absent owner go through the Xunta's Banco de Terras; that takes months, not weeks.", es: "Las parcelas con propietario desconocido o ausente pasan por el Banco de Terras de la Xunta; eso lleva meses, no semanas." })} <Src k="bancoTerras" /></li>
            <li>• {t({ en: "The village sits at 875 m: late frosts and cold winters. Chestnuts, pasture, berries and hardy vegetables do well; vines do not.", es: "El pueblo está a 875 m: heladas tardías e inviernos fríos. Castaños, pastos, frutos rojos y hortalizas resistentes van bien; la vid, no." })}</li>
          </ul>
          <div className="mt-6"><Button href={href("/plan", lang)}>{t({ en: "Plan my project →", es: "Planificar mi proyecto →" })}</Button></div>
        </div>
      </Section>
    </>
  );
}

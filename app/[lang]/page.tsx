import type { Metadata } from "next";
import Link from "next/link";
import { Button, Photo, PageHero, Section, SectionTitle, Src } from "@/components/ui";
import { ACTIVITIES, FACTS, HOST_OFFERS, PACKAGES } from "@/lib/data";
import { eur, href, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";
import type { ImgSlug } from "@/lib/images";
import { computeModel } from "@/lib/model";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await langOf(params);
  return { alternates: alternates(lang, "") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const m = computeModel();
  const ways: { path: string; slug: ImgSlug; title: T; body: T; cta: T }[] = [
    { path: "/packages", slug: "sil-catamaran", title: { en: "Stay", es: "Quédate" }, body: { en: "Packages of 1 week, 1 month or 3 months with a guided walk, the Sil canyon, a winery and a local dinner. Lodging is booked separately with the host.", es: "Paquetes de 1 semana, 1 mes o 3 meses con paseo guiado, el cañón del Sil, una bodega y una cena local. El alojamiento se reserva aparte con el anfitrión." }, cta: { en: `From ${eur(PACKAGES[0].price, lang)} per person`, es: `Desde ${eur(PACKAGES[0].price, lang)} por persona` } },
    { path: "/events", slug: "queimada", title: { en: "Celebrate", es: "Celebra" }, body: { en: "Birthdays, retreats and magostos on villagers' land and in their wine cellars, with an octopus cook, a gaiteiro and a queimada.", es: "Cumpleaños, retiros y magostos en fincas y adegas de vecinos, con pulpeira, gaiteiro y queimada." }, cta: { en: "Build a live quote", es: "Calcula tu presupuesto" } },
    { path: "/relocate", slug: "stone-house", title: { en: "Move", es: "Múdate" }, body: { en: "Try living here for three months, then keep a local fixer on subscription for the padrón, NIE/TIE, bank and schools.", es: "Prueba a vivir aquí tres meses y, después, mantén a alguien local por suscripción para el padrón, NIE/TIE, banco y colegio." }, cta: { en: "€500 onboarding + €99/month", es: "500 € de acogida + 99 €/mes" } },
  ];
  const steps: T[] = [
    { en: "Why are you coming?", es: "¿Por qué vienes?" },
    { en: "Who is coming?", es: "¿Quién viene?" },
    { en: "When and for how long?", es: "¿Cuándo y cuánto tiempo?" },
    { en: "What do you love doing?", es: "¿Qué te gusta hacer?" },
    { en: "Your plan, priced", es: "Tu plan, con precio" },
  ];
  return (
    <>
      <PageHero
        slug="navea-valley"
        lang={lang}
        eyebrow="San Xoán de Río · Terra de Trives · Ourense"
        title={t({ en: "Spend a week, a month or a season in a Galician valley, with a host who grew up here.", es: "Pasa una semana, un mes o una temporada en un valle gallego, con un anfitrión que creció aquí." })}
        lead={t({ en: "Chestnut forests, Roman bridges, the Sil canyon and Ribeira Sacra wine, 510 neighbours and a table set for you. Tell us why you're coming and we'll plan the rest.", es: "Bosques de castaños, puentes romanos, el cañón del Sil y el vino de la Ribeira Sacra, 510 vecinos y una mesa puesta para ti. Cuéntanos por qué vienes y planificamos el resto." })}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={href("/plan", lang)}>{t({ en: "Plan my visit →", es: "Planifica tu visita →" })}</Button>
          <Button href={href("/concierge", lang)} variant="light">{t({ en: "Ask the AI concierge", es: "Pregunta al conserje IA" })}</Button>
        </div>
      </PageHero>

      <Section>
        <SectionTitle eyebrow={t({ en: "Three ways in", es: "Tres formas de venir" })} title={t({ en: "Stay, celebrate or move.", es: "Quédate, celebra o múdate." })} lead={t({ en: "One local host, a network of villagers and suppliers, and an AI concierge that knows every route, festival and price in the valley.", es: "Un anfitrión local, una red de vecinos y proveedores, y un conserje IA que conoce cada ruta, fiesta y precio del valle." })} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ways.map((w) => (
            <Link key={w.path} href={href(w.path, lang)} className="group overflow-hidden rounded-2xl border border-line bg-paper transition hover:shadow-lg">
              <Photo slug={w.slug} lang={lang} className="h-52" sizes="(min-width: 768px) 33vw, 100vw" inLink />
              <div className="p-5">
                <h3 className="text-2xl font-semibold">{t(w.title)}</h3>
                <p className="mt-2 text-ink-soft">{t(w.body)}</p>
                <p className="mt-4 text-sm font-semibold text-moss group-hover:underline">{t(w.cta)} →</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-moss-deep text-on-accent">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Not sure where to start?", es: "¿No sabes por dónde empezar?" })}</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{t({ en: "Answer a few quick questions and get your plan and price.", es: "Responde unas preguntas rápidas y recibe tu plan con precio." })}</h2>
            <p className="mt-3 text-on-accent/85">{t({ en: "The questionnaire asks why you're coming, who with, when and what you enjoy. It then recommends a package, an event set-up, a relocation plan or a hosting deal, with a price breakdown you can send to us in one click.", es: "El cuestionario pregunta por qué vienes, con quién, cuándo y qué te gusta. Después te recomienda un paquete, un evento, un plan de mudanza o un acuerdo como anfitrión, con el desglose de precios, y nos lo envías con un clic." })}</p>
            <div className="mt-6"><Button href={href("/plan", lang)} variant="light">{t({ en: "Start the questionnaire →", es: "Empezar el cuestionario →" })}</Button></div>
          </div>
          <ol className="grid gap-2 text-sm">
            {steps.map((q, i) => (
              <li key={q.en} className="flex items-center gap-3 rounded-xl bg-on-accent/10 px-4 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-sun font-semibold text-on-sun">{i + 1}</span>
                {t(q)}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow={t({ en: "The village", es: "El pueblo" })} title={t({ en: "Small, ageing, and already working on it.", es: "Pequeño, envejecido y ya manos a la obra." })} lead={t({ en: "San Xoán de Río is fighting depopulation with its own startup campus and a housing programme. We add the missing piece: someone local to host the people those projects bring in.", es: "San Xoán de Río combate la despoblación con su propio campus de startups y un programa de vivienda. Nosotros ponemos la pieza que falta: alguien local que acoja a la gente que esos proyectos atraen." })} />
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.label.en} className="rounded-2xl bg-stone p-5">
              <dt className="font-display text-4xl font-semibold text-moss">{tx(f.value, lang)}</dt>
              <dd className="mt-1 text-ink-soft">{t(f.label)}</dd>
              <dd className="mt-2"><Src k={f.source} /></dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow={t({ en: "In and around the valley", es: "En el valle y alrededores" })} title={t({ en: "Things to do, all year.", es: "Qué hacer, todo el año." })} />
          <Button href={href("/experiences", lang)} variant="ghost">{t({ en: `All ${ACTIVITIES.length} experiences →`, es: `Las ${ACTIVITIES.length} experiencias →` })}</Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.filter((a) => ["fraga", "ponte-navea", "catamaran", "wine", "ski", "magosto"].includes(a.id)).map((a) => (
            <article key={a.id} className="overflow-hidden rounded-2xl border border-line">
              {a.image && <Photo slug={a.image} lang={lang} className="h-44" sizes="(min-width: 1024px) 33vw, 50vw" />}
              <div className="p-4">
                <p className="text-xs text-ink-soft">{a.where} · {t(a.distance)}</p>
                <h3 className="mt-1 text-xl font-semibold">{t(a.name)}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t(a.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-stone">
        <Section>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Photo slug="magosto" lang={lang} className="h-80 rounded-2xl" sizes="(min-width: 768px) 50vw, 100vw" />
            <div>
              <SectionTitle eyebrow={t({ en: "For neighbours", es: "Para vecinos" })} title={t({ en: "Your empty house or field can earn money.", es: "Tu casa vacía o tu finca pueden darte ingresos." })} />
              <ul className="mt-6 space-y-3">
                {HOST_OFFERS.map((h) => (
                  <li key={h.title.en} className="rounded-xl bg-paper p-4">
                    <p className="font-semibold">{t(h.title)} <span className="ml-1 text-sm font-normal text-moss">{t(h.share)}</span></p>
                  </li>
                ))}
              </ul>
              <div className="mt-6"><Button href={href("/hosts", lang)}>{t({ en: "How hosting works →", es: "Cómo funciona →" })}</Button></div>
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="rounded-3xl border border-line p-8 md:p-10">
          <SectionTitle eyebrow={t({ en: "For the jury", es: "Para el jurado" })} title={t({ en: "From €25k to €100k+ in 12 months, with the loan repaid.", es: "De 25.000 € a más de 100.000 € en 12 meses, con el préstamo devuelto." })} lead={t({ en: "This is built on the brief's assets: a stone house, 2 ha of land, a car, digital skills and local knowledge.", es: "Todo se apoya en los recursos del reto: una casa de piedra, 2 ha de terreno, un coche, competencias digitales y conocimiento local." })} />
          <dl className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { k: { en: "Year-1 revenue", es: "Ingresos del año 1" }, v: eur(m.revenue, lang) },
              { k: { en: "Revenue after repaying the loan", es: "Ingresos tras devolver el préstamo" }, v: eur(m.revenue - m.loanTotal, lang) },
              { k: { en: "Profit after all costs", es: "Beneficio tras todos los costes" }, v: eur(m.profit, lang) },
              { k: { en: "Cash at month 12", es: "Caja en el mes 12" }, v: eur(m.cashEnd, lang) },
            ].map((x) => (
              <div key={x.k.en} className="rounded-2xl bg-stone p-4">
                <dt className="text-sm text-ink-soft">{t(x.k)}</dt>
                <dd className="font-display text-2xl font-semibold">{x.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={href("/business", lang)}>{t({ en: "Open the business plan →", es: "Ver el plan de negocio →" })}</Button>
            <Button href={href("/credits", lang)} variant="ghost">{t({ en: "Image licences", es: "Licencias de imágenes" })}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

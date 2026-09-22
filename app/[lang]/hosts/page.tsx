import type { Metadata } from "next";
import { Button, PageHero, Photo, Section, SectionTitle, Src } from "@/components/ui";
import { CONTEXT_POINTS, HOST_OFFERS, OUTREACH_PLAN } from "@/lib/data";
import { eur, href, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/hosts">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "For locals · RuralRiver", es: "Para vecinos · RuralRiver" }, lang), alternates: alternates(lang, "/hosts") };
}

export default async function HostsPage({ params }: PageProps<"/[lang]/hosts">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const rehabita = CONTEXT_POINTS[1];
  const steps: T[] = [
    { en: "We visit, take photos and agree a price with you. There's no fee to list.", es: "Vamos a verla, hacemos fotos y acordamos el precio contigo. Publicar no cuesta nada." },
    { en: "For short stays we file the tourist-rental declaration (VUT) with you and register the house in REAT. VUTs are let whole, never by the room.", es: "Para estancias cortas hacemos contigo la declaración de vivienda de uso turístico (VUT) y el alta en el REAT. Las VUT se alquilan enteras, nunca por habitaciones." },
    { en: "Guests and event organisers book through RuralRiver; our insurance covers them.", es: "Huéspedes y organizadores reservan a través de RuralRiver; nuestro seguro los cubre." },
    { en: "We clean between stays and after events, and handle the Concello notification.", es: "Limpiamos entre estancias y tras los eventos, y hacemos la comunicación al Concello." },
    { en: "You're paid the week after, with a clear statement.", es: "Cobras la semana siguiente, con un resumen claro." },
  ];
  return (
    <>
      <PageHero slug="stone-house" lang={lang} eyebrow={t({ en: "For neighbours and emigrants", es: "Para vecinos y emigrantes" })} title={t({ en: "The empty house, the old wine cellar, the chestnut grove: they can pay their way.", es: "La casa vacía, la vieja adega, el souto: pueden darte ingresos." })} lead={t({ en: "We bring the guests, the insurance and the paperwork. You keep most of the money, paid the week after each stay or event.", es: "Ponemos los huéspedes, el seguro y el papeleo. Tú te quedas con la mayor parte, cobrada la semana siguiente a cada estancia o evento." })} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {HOST_OFFERS.map((h) => (
            <div key={h.title.en} className="rounded-3xl border border-line p-6">
              <p className="font-display text-2xl font-semibold text-moss">{t(h.share)}</p>
              <h2 className="mt-2 text-xl font-semibold">{t(h.title)}</h2>
              <p className="mt-2 text-ink-soft">{t(h.body)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Photo slug="chestnut-tree" lang={lang} className="h-64 rounded-2xl" sizes="25vw" />
            <Photo slug="fraga-2" lang={lang} className="h-64 rounded-2xl" sizes="25vw" />
          </div>
          <div>
            <SectionTitle eyebrow={t({ en: "How it works", es: "Cómo funciona" })} title={t({ en: "From first visit to first payout.", es: "De la primera visita al primer cobro." })} />
            <ol className="mt-6 space-y-3">
              {steps.map((s, i) => (
                <li key={s.en} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun font-semibold text-on-sun">{i + 1}</span>{t(s)}</li>
              ))}
            </ol>
            <p className="mt-4 flex flex-wrap gap-3"><Src k="vutDecree" /><Src k="supremo" /></p>
          </div>
        </div>
      </Section>

      <section className="bg-stone">
        <Section>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionTitle eyebrow={t({ en: "Needs work?", es: "¿Necesita arreglos?" })} title={t({ en: "Start with RE-HABITA.", es: "Empieza por RE-HABITA." })} />
              <p className="mt-4 text-ink-soft">{t(rehabita.body)}</p>
              <p className="mt-2"><Src k={rehabita.source} /></p>
              <p className="mt-4 text-ink-soft">{t({ en: "We refer owners to the free advisory service, and list the house once it's ready.", es: "Derivamos a los propietarios a la asesoría gratuita y publicamos la casa cuando esté lista." })}</p>
            </div>
            <div className="rounded-3xl bg-paper p-6">
              <h3 className="text-xl font-semibold">{t({ en: "Our outreach budget", es: "Nuestro presupuesto de captación" })}: {eur(OUTREACH_PLAN.reduce((s, o) => s + o.cost, 0), lang)}</h3>
              <p className="mt-1 text-sm text-ink-soft">{t({ en: "How we find the first 30 owners, including emigrants who inherited houses.", es: "Cómo encontramos a los 30 primeros propietarios, incluidos emigrantes que heredaron casas." })}</p>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-line">
                  {OUTREACH_PLAN.map((o) => <tr key={o.item.en}><td className="py-2 pr-3">{t(o.item)}</td><td className="py-2 text-right font-semibold">{eur(o.cost, lang)}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10"><Button href={href("/plan", lang)}>{t({ en: "List my house or land →", es: "Ofrecer mi casa o finca →" })}</Button></div>
        </Section>
      </section>
    </>
  );
}

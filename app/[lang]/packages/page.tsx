import type { Metadata } from "next";
import { Button, Estimate, PageHero, Photo, Section, SectionTitle, Src } from "@/components/ui";
import { ADDONS, LODGING, PACKAGES } from "@/lib/data";
import { eur, href, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/packages">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Packages · RuralRiver", es: "Paquetes · RuralRiver" }, lang), alternates: alternates(lang, "/packages") };
}

export default async function PackagesPage({ params }: PageProps<"/[lang]/packages">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const lodging: { label: T; price: string; estimate?: boolean }[] = [
    { label: { en: `Our renovated stone house, let whole (sleeps ${LODGING.ownHouseSleeps}), stays under 30 days`, es: `Nuestra casa de piedra reformada, entera (${LODGING.ownHouseSleeps} plazas), menos de 30 días` }, price: `≈${e(LODGING.ownHouseNight)}${t({ en: "/night", es: "/noche" })}`, estimate: true },
    { label: { en: "Villagers' houses in Terra de Trives", es: "Casas de vecinos en Terra de Trives" }, price: `${e(LODGING.marketNightLow)}–${e(LODGING.marketNightHigh)}${t({ en: "/night", es: "/noche" })}` },
    { label: { en: "…in peak months (average)", es: "…en temporada alta (media)" }, price: `≈${e(LODGING.marketNightPeak)}${t({ en: "/night", es: "/noche" })}` },
    { label: { en: "Group houses in Ourense province", es: "Casas para grupos en la provincia de Ourense" }, price: `${t({ en: "from", es: "desde" })} ${e(LODGING.groupPerPersonNight)}${t({ en: "/person/night", es: "/persona/noche" })}` },
    { label: { en: "Seasonal lets (30+ days)", es: "Alquiler de temporada (30+ días)" }, price: `≈${e(LODGING.monthlyLet)}${t({ en: "/month", es: "/mes" })}`, estimate: true },
  ];
  return (
    <>
      <PageHero slug="sil-vineyards" lang={lang} eyebrow={t({ en: "Packages", es: "Paquetes" })} title={t({ en: "One week, one month or three.", es: "Una semana, un mes o tres." })} lead={t({ en: "Prices are per person for experiences and support. Lodging is booked separately with the host, so you only pay for the house you choose.", es: "Los precios son por persona en experiencias y acompañamiento. El alojamiento se reserva aparte con el anfitrión: solo pagas la casa que eliges." })} />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <article key={p.id} className={`flex flex-col overflow-hidden rounded-3xl border ${i === 0 ? "border-moss shadow-lg" : "border-line"}`}>
              <Photo slug={p.image} lang={lang} className="h-48" sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-chestnut">{t(p.period)}</p>
                <h2 className="mt-1 text-2xl font-semibold">{t(p.name)}</h2>
                <p className="mt-2 text-ink-soft">{t(p.tagline)}</p>
                <p className="mt-4 font-display text-4xl font-semibold">{e(p.price)}<span className="text-base font-normal text-ink-soft"> / {t({ en: "person", es: "persona" })}</span></p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {p.includes.map((x) => <li key={x.en} className="flex gap-2"><span className="text-moss">✓</span>{t(x)}</li>)}
                </ul>
                <div className="mt-6"><Button href={href("/plan", lang)}>{t({ en: "Plan this stay →", es: "Planificar esta estancia →" })}</Button></div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-stone p-6 sm:p-8">
            <SectionTitle eyebrow={t({ en: "Lodging", es: "Alojamiento" })} title={t({ en: "Choose your roof.", es: "Elige tu techo." })} />
            <table className="mt-6 w-full text-sm">
              <tbody className="divide-y divide-line">
                {lodging.map((l) => <tr key={l.label.en}><td className="py-2.5 pr-3">{t(l.label)}{l.estimate && <Estimate lang={lang} />}</td><td className="py-2.5 text-right font-semibold whitespace-nowrap">{l.price}</td></tr>)}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-ink-soft">{t({ en: "Market prices", es: "Precios de mercado" })}: <Src k="trivesHouses" /> · <Src k="groupHouses" />. {t({ en: `On villagers' houses we take a ${LODGING.commission * 100}% commission; the owner keeps the rest.`, es: `En las casas de vecinos cobramos un ${LODGING.commission * 100} % de comisión; el resto es para el propietario.` })}</p>
          </div>
          <div className="rounded-3xl border border-line p-6 sm:p-8">
            <SectionTitle eyebrow={t({ en: "Why the price is split", es: "Por qué el precio va separado" })} title={t({ en: "Clear prices, and legal too.", es: "Precios claros y legales." })} />
            <p className="mt-4 text-ink-soft">{t({ en: "Under Spanish consumer law, selling lodging or transport together with activities at one price is a package holiday, which needs a travel-agency licence and insolvency cover. Our packages contain only tourist services. You book the house directly with the host, and taxis are paid to the driver.", es: "Según la ley de consumidores, vender alojamiento o transporte junto con actividades a precio global es un viaje combinado, que exige licencia de agencia y garantía. Nuestros paquetes solo incluyen servicios turísticos. La casa se reserva directamente con el anfitrión y el taxi se paga al conductor." })}</p>
            <p className="mt-2"><Src k="art151" /></p>
            <p className="mt-4 text-ink-soft">{t({ en: "For comparison, a rural coliving in Galicia such as Anceu starts at €882/month.", es: "Como referencia, un coliving rural en Galicia como Anceu empieza en 882 €/mes." })} <Src k="anceu" /></p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow={t({ en: "Add-ons", es: "Extras" })} title={t({ en: "Extras for any package.", es: "Extras para cualquier paquete." })} lead={t({ en: "Market prices come from local suppliers. Our price includes booking and a host on the day. Getting there: your own car or a licensed taxi we book.", es: "Los precios de mercado son de proveedores locales. El nuestro incluye la reserva y el anfitrión ese día. Para llegar: tu coche o un taxi con licencia que reservamos." })} />
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-stone text-left"><tr><th className="p-3">{t({ en: "Add-on", es: "Extra" })}</th><th className="p-3">{t({ en: "Market price", es: "Precio de mercado" })}</th><th className="p-3">{t({ en: "Our price", es: "Nuestro precio" })}<Estimate lang={lang} /></th><th className="p-3">{t({ en: "Source", es: "Fuente" })}</th></tr></thead>
            <tbody className="divide-y divide-line">
              {ADDONS.filter((a) => a.category === "experiences" || a.category === "transport").map((a) => (
                <tr key={a.id}><td className="p-3 font-medium">{t(a.name)}<div className="text-xs font-normal text-ink-soft">{t(a.unit)}</div></td><td className="p-3">{t(a.market)}</td><td className="p-3 font-semibold">{a.ours === null ? (a.category === "transport" ? t({ en: "paid to driver", es: "se paga al conductor" }) : t({ en: "quote + 10%", es: "presupuesto + 10 %" })) : e(a.ours)}</td><td className="p-3">{a.source ? <Src k={a.source} /> : "—"}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

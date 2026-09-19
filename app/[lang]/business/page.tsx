import type { Metadata } from "next";
import BusinessModel from "@/components/BusinessModel";
import { Estimate, PageHero, Section, SectionTitle, Src } from "@/components/ui";
import { BRIEF, BUDGET, COMPLIANCE, CONTEXT_POINTS, FACTS, FIXES, FUNDING, LOAN, RISKS, SOURCES, TIMELINE, loanPayment, type Status } from "@/lib/data";
import { eur, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";
import { computeModel } from "@/lib/model";

export async function generateMetadata({ params }: PageProps<"/[lang]/business">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Business plan · RuralOS", es: "Plan de negocio · RuralOS" }, lang), alternates: alternates(lang, "/business") };
}

const STATUS: Record<Status, { label: T; cls: string }> = {
  verified: { label: { en: "Verified", es: "Verificado" }, cls: "bg-moss text-on-moss" },
  changed: { label: { en: "Verified: plan changed", es: "Verificado: plan cambiado" }, cls: "bg-sun text-on-sun" },
  draft: { label: { en: "Draft rule", es: "Norma en borrador" }, cls: "bg-stone-deep text-ink" },
};

export default async function BusinessPage({ params }: PageProps<"/[lang]/business">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const m = computeModel();
  const pay12 = loanPayment(LOAN.principal, LOAN.annualRate, 12);
  return (
    <>
      <PageHero slug="navea-taboazas" lang={lang} eyebrow={t({ en: "Hackathon brief · business plan", es: "Reto del hackathon · plan de negocio" })} title={t({ en: `€25,000 in, ${e(Math.floor(m.revenue / 1000) * 1000)}+ revenue out, loan repaid within the year.`, es: `25.000 € de inversión, más de ${e(Math.floor(m.revenue / 1000) * 1000)} de ingresos y el préstamo devuelto en el año.` })} lead={<>{t({ en: "The brief", es: "El reto" })}: {t(BRIEF.persona)}. {t({ en: "Goal", es: "Objetivo" })}: {t(BRIEF.goal)}.</>} />

      <Section>
        <SectionTitle eyebrow={t({ en: "1 · The brief's assets", es: "1 · Los recursos del reto" })} title={t({ en: "Every asset has a job.", es: "Cada recurso tiene su función." })} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRIEF.assets.map((a) => (
            <div key={a.label.en} className="rounded-2xl border border-line p-5">
              <p className="text-2xl" aria-hidden>{a.icon}</p>
              <p className="mt-2 font-semibold">{t(a.label)}</p>
              <p className="mt-1 text-sm text-ink-soft">→ {t(a.use)}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-stone">
        <Section>
          <SectionTitle eyebrow={t({ en: "2 · What we changed from v1", es: "2 · Qué cambiamos respecto a la v1" })} title={t({ en: "From a regional platform to a local business that works on day one.", es: "De plataforma regional a negocio local que funciona desde el primer día." })} lead={<>{t({ en: "Our first prototype pitched a relocation platform for several villages. Critical review found these gaps:", es: "Nuestro primer prototipo proponía una plataforma de reubicación para varios pueblos. La revisión crítica encontró estos fallos:" })} <Src k="team" /></>} />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-paper">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left"><tr><th className="w-1/2 p-3 text-chestnut">{t({ en: "v1 problem", es: "Problema de la v1" })}</th><th className="p-3 text-moss">{t({ en: "v2 answer", es: "Respuesta de la v2" })}</th></tr></thead>
              <tbody className="divide-y divide-line">{FIXES.map((f) => <tr key={f.was.en}><td className="p-3 text-ink-soft">{t(f.was)}</td><td className="p-3">{t(f.now)}</td></tr>)}</tbody>
            </table>
          </div>
        </Section>
      </section>

      <Section>
        <SectionTitle eyebrow={t({ en: "3 · Research on the place", es: "3 · Investigación sobre el lugar" })} title={t({ en: "San Xoán de Río already has projects. It lacks a local host.", es: "San Xoán de Río ya tiene proyectos. Le falta un anfitrión local." })} />
        <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FACTS.map((f) => (
            <div key={f.label.en} className="rounded-2xl bg-stone p-4">
              <dt className="font-display text-2xl font-semibold">{tx(f.value, lang)}</dt>
              <dd className="text-xs text-ink-soft">{t(f.label)}</dd>
              <dd className="mt-1"><Src k={f.source} /></dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CONTEXT_POINTS.map((c) => (
            <div key={c.title.en} className="rounded-2xl border border-line p-5">
              <h3 className="text-lg font-semibold">{t(c.title)}</h3>
              <p className="mt-1 text-sm text-ink-soft">{t(c.body)}</p>
              <p className="mt-2"><Src k={c.source} /></p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow={t({ en: "4 · Revenue engines", es: "4 · Motores de ingresos" })} title={t({ en: "Three products, one host, one network.", es: "Tres productos, un anfitrión, una red." })} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {([
            { t: { en: "Stays", es: "Estancias" }, d: { en: "Packages of 1 week (€220), 1 month (€450) or 3 months (€900) per person, tourist services only. Our house is let whole (≈€110/night), and we take 15% on villagers' houses.", es: "Paquetes de 1 semana (220 €), 1 mes (450 €) o 3 meses (900 €) por persona, solo servicios turísticos. Nuestra casa se alquila entera (≈110 €/noche) y cobramos un 15 % en casas de vecinos." } },
            { t: { en: "Events", es: "Eventos" }, d: { en: "Parties, retreats and magostos on villagers' land. The owner keeps 80% of the venue fee; we earn 15% coordination (minimum €300) plus our kit.", es: "Fiestas, retiros y magostos en fincas de vecinos. El propietario se queda el 80 % del espacio; nosotros, un 15 % de coordinación (mínimo 300 €) más el kit." } },
            { t: { en: "Relocation", es: "Reubicación" }, d: { en: "€500 onboarding + €99/month, sold to trial guests and to Rural Valley's 120 founders a year from March 2027.", es: "500 € de acogida + 99 €/mes, para quienes hacen la prueba y para los 120 fundadores anuales de Rural Valley desde marzo de 2027." } },
          ] as { t: T; d: T }[]).map((x) => <div key={x.t.en} className="rounded-2xl bg-moss-deep p-5 text-on-accent"><h3 className="text-2xl font-semibold">{t(x.t)}</h3><p className="mt-2 text-sm text-on-accent/85">{t(x.d)}</p></div>)}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow={t({ en: "5 · Using the €25,000", es: "5 · Uso de los 25.000 €" })} title={t({ en: "Every euro of starting capital, allocated.", es: "Cada euro del capital inicial, asignado." })} lead={t({ en: "The team's plan set aside €8k for the house, €3k for marketing and €1k for owner outreach. We added the items the business can't run without.", es: "El plan del equipo reservaba 8.000 € para la casa, 3.000 € para marketing y 1.000 € para captar propietarios. Añadimos lo imprescindible para que el negocio funcione." })} />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[600px] text-sm">
            <tbody className="divide-y divide-line">
              {BUDGET.map((b) => (
                <tr key={b.item.en}>
                  <td className="p-3 font-medium">{t(b.item)}{!b.fromUser && <span className="ml-2 rounded-full bg-sun/25 px-2 py-0.5 text-[10px] font-semibold uppercase text-chestnut">{t({ en: "added", es: "añadido" })}</span>}</td>
                  <td className="p-3 text-ink-soft">{t(b.note)}</td>
                  <td className="p-3 text-right font-semibold tabular-nums">{e(b.amount)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-ink font-semibold"><td className="p-3" colSpan={2}>{t({ en: "Total = €5,000 savings + €20,000 loan", es: "Total = 5.000 € de ahorros + 20.000 € de préstamo" })}</td><td className="p-3 text-right">{e(BUDGET.reduce((s, b) => s + b.amount, 0))}</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow={t({ en: "6 · 12-month model", es: "6 · Modelo a 12 meses" })} title={t({ en: "Aim for €120k+ so that €100k+ remains after the loan.", es: "Apuntar a 120.000 €+ para que queden 100.000 €+ tras el préstamo." })} lead={<>{t({ en: `The €20k loan must be paid back. Over 12 months at an assumed 7% that's ${e(pay12)}/month, ${e(pay12 * 12)} in total. The default scenario brings in ${e(m.revenue)}, which leaves ${e(m.revenue - m.loanTotal)} after full repayment. Move the sliders to test the downside. All volumes are our estimates.`, es: `El préstamo de 20.000 € hay que devolverlo. A 12 meses y un 7 % supuesto son ${e(pay12)}/mes, ${e(pay12 * 12)} en total. El escenario base ingresa ${e(m.revenue)}, y quedan ${e(m.revenue - m.loanTotal)} tras devolverlo entero. Mueve los controles para ver el peor caso. Todos los volúmenes son estimaciones.` })}<Estimate lang={lang} /></>} />
        <div className="mt-8"><BusinessModel lang={lang} /></div>
      </Section>

      <section className="bg-stone">
        <Section>
          <SectionTitle eyebrow={t({ en: "7 · Timeline", es: "7 · Calendario" })} title={t({ en: "Month by month.", es: "Mes a mes." })} />
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {TIMELINE.map((x) => (
              <li key={x.when.en} className="rounded-2xl bg-paper p-5">
                <p className="font-semibold text-chestnut">{t(x.when)}</p>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">{x.what.map((w) => <li key={w.en}>• {t(w)}</li>)}</ul>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      <Section>
        <SectionTitle eyebrow={t({ en: "8 · Risks", es: "8 · Riesgos" })} title={t({ en: "What could go wrong, and our answer.", es: "Qué puede fallar y cómo respondemos." })} />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-stone text-left"><tr><th className="w-2/5 p-3">{t({ en: "Risk", es: "Riesgo" })}</th><th className="p-3">{t({ en: "Mitigation", es: "Respuesta" })}</th></tr></thead>
            <tbody className="divide-y divide-line">{RISKS.map((r) => <tr key={r.risk.en}><td className="p-3 font-medium">{t(r.risk)}</td><td className="p-3 text-ink-soft">{t(r.mitigation)}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>

      <Section className="pt-0" id="compliance">
        <SectionTitle eyebrow={t({ en: "9 · Compliance, checked against official sources (Sept 2026)", es: "9 · Cumplimiento, contrastado con fuentes oficiales (sept. 2026)" })} title={t({ en: "Legal from day one.", es: "Legal desde el primer día." })} lead={t({ en: "Each rule below was checked against the official text or an official body. Three findings changed the plan: taxis instead of our car, whole-house lets only, and the annulled national register.", es: "Cada norma se ha contrastado con el texto oficial o un organismo oficial. Tres hallazgos cambiaron el plan: taxis en vez de nuestro coche, alquiler solo de la casa entera y el registro nacional anulado." })} />
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {COMPLIANCE.map((c) => (
            <li key={c.item.en} className="rounded-2xl border border-line p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS[c.status].cls}`}>{t(STATUS[c.status].label)}</span>
                <p className="font-semibold">{t(c.item)}</p>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{t(c.detail)}</p>
              {c.sources.length > 0 && <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">{c.sources.map((s) => <Src key={s} k={s} />)}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">{t({ en: "Still worth one hour with a gestor in month 1: confirming the set-up with a partner travel agency, and whether guided heritage visits need an accredited tourist guide. This is research, not legal advice.", es: "Sigue mereciendo una hora con un gestor en el mes 1: cerrar el acuerdo con la agencia colaboradora y confirmar si las visitas guiadas a monumentos requieren guía de turismo habilitado. Esto es investigación, no asesoramiento legal." })}</p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow={t({ en: "10 · Extra funding", es: "10 · Financiación adicional" })} title={t({ en: "Grants help with capital, but they aren't revenue.", es: "Las ayudas ayudan con el capital, pero no son ingresos." })} />
            <ul className="mt-6 space-y-3">
              {FUNDING.map((f) => (
                <li key={f.name.en} className="rounded-2xl bg-stone p-4">
                  <p className="font-semibold">{t(f.name)}: {t(f.amount)}</p>
                  <p className="text-sm text-ink-soft">{t(f.fit)}</p>
                  <Src k={f.source} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-5 text-sm text-ink-soft">
            <p className="text-lg font-semibold text-ink">{t({ en: "KPIs we track monthly", es: "Indicadores que seguimos cada mes" })}</p>
            <ul className="mt-2 space-y-1">
              {([
                { en: "Paying guests and events vs the plan", es: "Huéspedes y eventos frente al plan" },
                { en: "Owners listed (target: 30 in 3 months)", es: "Propietarios dados de alta (objetivo: 30 en 3 meses)" },
                { en: "Add-on revenue per guest", es: "Ingresos por extras por huésped" },
                { en: "Share of questions the AI concierge answers without the host", es: "Porcentaje de preguntas que el conserje IA resuelve sin el anfitrión" },
                { en: "Cash vs the loan schedule", es: "Caja frente al calendario del préstamo" },
              ] as T[]).map((k) => <li key={k.en}>• {t(k)}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <section className="bg-stone">
        <Section>
          <SectionTitle eyebrow={t({ en: "Sources", es: "Fuentes" })} title={t({ en: "Every researched figure, and where it came from.", es: "Cada cifra investigada y de dónde sale." })} />
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            {Object.entries(SOURCES).map(([k, s]) => (
              <li key={k}><a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-dotted hover:text-moss">{s.label}</a></li>
            ))}
          </ul>
        </Section>
      </section>
    </>
  );
}

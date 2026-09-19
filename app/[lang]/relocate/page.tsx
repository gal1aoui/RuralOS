import type { Metadata } from "next";
import { Button, PageHero, Photo, Section, SectionTitle, Src } from "@/components/ui";
import { CONTEXT_POINTS, PACKAGES, RELOCATION, VISA } from "@/lib/data";
import { eur, href, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/relocate">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Relocate · RuralOS", es: "Mudarte · RuralOS" }, lang), alternates: alternates(lang, "/relocate") };
}

export default async function RelocatePage({ params }: PageProps<"/[lang]/relocate">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const rv = CONTEXT_POINTS[0];
  const steps: { t: T; d: T }[] = [
    { t: { en: "Try it", es: "Pruébalo" }, d: { en: `A 1-month (${e(PACKAGES[1].price)}) or 3-month (${e(PACKAGES[2].price)}) stay with experiences, introductions and a monthly check-in. Nothing is permanent yet.`, es: `Una estancia de 1 mes (${e(PACKAGES[1].price)}) o 3 meses (${e(PACKAGES[2].price)}) con experiencias, presentaciones y seguimiento mensual. Nada es definitivo todavía.` } },
    { t: { en: "Onboard", es: "Instálate" }, d: { en: `${e(RELOCATION.onboarding)} once. We book and prepare the NIE/TIE, padrón, bank, health centre and school paperwork with you.`, es: `${e(RELOCATION.onboarding)} una vez. Pedimos citas y preparamos contigo NIE/TIE, padrón, banco, centro de salud y colegio.` } },
    { t: { en: "Stay", es: "Quédate" }, d: { en: `${e(RELOCATION.monthly)}/month. A local fixer on call, priority concierge, community invitations and 10% off experiences.`, es: `${e(RELOCATION.monthly)}/mes. Alguien local de guardia, conserje prioritario, invitaciones a la comunidad y 10 % en experiencias.` } },
  ];
  return (
    <>
      <PageHero slug="church" lang={lang} eyebrow={t({ en: "Relocate", es: "Mudarte" })} title={t({ en: "Move to the village, with an easy way out.", es: "Múdate al pueblo, con una salida fácil." })} lead={t({ en: "Most people never move because it feels irreversible. We make it a three-month trial with the paperwork handled.", es: "La mayoría nunca se muda porque parece irreversible. Lo convertimos en una prueba de tres meses con el papeleo resuelto." })} />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t.en} className="rounded-3xl border border-line p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-moss font-semibold text-on-moss">{i + 1}</span>
              <h2 className="mt-4 text-2xl font-semibold">{t(s.t)}</h2>
              <p className="mt-2 text-ink-soft">{t(s.d)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-stone p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">{t({ en: "Onboarding", es: "Acogida" })} · {e(RELOCATION.onboarding)}</h2>
            <ul className="mt-4 space-y-2">{RELOCATION.onboardingIncludes.map((x) => <li key={x.en} className="flex gap-2"><span className="text-moss">✓</span>{t(x)}</li>)}</ul>
            <h2 className="mt-8 text-2xl font-semibold">{t({ en: "Subscription", es: "Suscripción" })} · {e(RELOCATION.monthly)}/{t({ en: "month", es: "mes" })}</h2>
            <ul className="mt-4 space-y-2">{RELOCATION.monthlyIncludes.map((x) => <li key={x.en} className="flex gap-2"><span className="text-moss">✓</span>{t(x)}</li>)}</ul>
            <p className="mt-6 text-sm text-ink-soft">{t(RELOCATION.diyCost)}{t({ en: ", plus the time, the language and the queues.", es: ", más el tiempo, el idioma y las colas." })}</p>
          </div>
          <div>
            <SectionTitle eyebrow={t({ en: "How we compare", es: "Comparativa" })} title={t({ en: "City relocation firms price by quote.", es: "Las empresas de reubicación urbanas dan presupuesto." })} />
            <ul className="mt-6 space-y-3">
              {RELOCATION.competitors.map((c) => (
                <li key={c.name} className="rounded-2xl border border-line p-4">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-ink-soft">{t(c.note)}</p>
                  <Src k={c.source} />
                </li>
              ))}
              <li className="rounded-2xl border-2 border-moss p-4">
                <p className="font-semibold">RuralOS</p>
                <p className="text-sm text-ink-soft">{t({ en: "A published price, a person who lives in the village, and help with village life too, not just the papers.", es: "Precio publicado, una persona que vive en el pueblo y ayuda con la vida diaria, no solo con los papeles." })}</p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-6 sm:p-8">
          <SectionTitle eyebrow={t({ en: "Checked with official sources · Sept 2026", es: "Contrastado con fuentes oficiales · sept. 2026" })} title={t({ en: "The visa for non-EU remote workers", es: "El visado para teletrabajadores de fuera de la UE" })} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { v: e(VISA.monthlyRequired), l: { en: "per month for the applicant: 200% of the minimum wage (SMI)", es: "al mes para el titular: 200 % del SMI" } },
              { v: `+${e(VISA.firstFamily)}`, l: { en: "per month for the first family member (75% of the SMI)", es: "al mes por el primer familiar (75 % del SMI)" } },
              { v: `+${e(VISA.eachExtra)}`, l: { en: "per month for each additional family member (25%)", es: "al mes por cada familiar adicional (25 %)" } },
            ].map((x) => (
              <div key={x.v} className="rounded-2xl bg-stone p-4">
                <p className="font-display text-3xl font-semibold">{x.v}</p>
                <p className="text-sm text-ink-soft">{t(x.l)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{t({ en: `The 2026 minimum wage is ${e(VISA.smiMonthly14)} × 14 payments = ${e(VISA.smiAnnual)} a year (Real Decreto 126/2026). Spanish consulates apply 200% of it for the telework visa; divided over 12 months that's about ${e(VISA.monthlyRequired)}. Applicants also need a university degree or at least 3 years' professional experience. Some guides quote ${e(VISA.smiMonthly14 * 2)} (200% of one of the 14 payments), so confirm the exact figure with your consulate.`, es: `El SMI de 2026 es ${e(VISA.smiMonthly14)} × 14 pagas = ${e(VISA.smiAnnual)} al año (Real Decreto 126/2026). Los consulados exigen el 200 % para el visado de teletrabajo; repartido en 12 meses son unos ${e(VISA.monthlyRequired)}. También se pide titulación universitaria o al menos 3 años de experiencia. Algunas guías citan ${e(VISA.smiMonthly14 * 2)} (200 % de una de las 14 pagas), así que confirma la cifra con tu consulado.` })}</p>
          <p className="mt-2 flex flex-wrap gap-3"><Src k="boeSmi" /><Src k="sepeSmi" /><Src k="visaConsulate" /></p>
        </div>
      </Section>

      <section className="bg-moss-deep text-on-accent">
        <Section>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Photo slug="biocos-observatory" lang={lang} className="h-72 rounded-2xl" sizes="50vw" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Founders", es: "Fundadores" })}</p>
              <h2 className="mt-2 text-3xl font-semibold">{t({ en: "Coming for Rural Valley? We're your local fixer.", es: "¿Vienes por Rural Valley? Somos tu contacto local." })}</h2>
              <p className="mt-3 text-on-accent/85">{t(rv.body)}</p>
              <p className="mt-3 text-sm text-on-accent/70">{t({ en: "Sources", es: "Fuentes" })}: <a className="underline" href="https://www.somoscomarca.es/articulo/terras-trives/rural-valley/20260628015940220334.html" target="_blank" rel="noreferrer">Somos Comarca</a> · <a className="underline" href="https://ruralvalley.eu/" target="_blank" rel="noreferrer">ruralvalley.eu</a></p>
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="rounded-3xl border border-line p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">{t({ en: "Honest notes before you move", es: "Avisos sinceros antes de mudarte" })}</h2>
          <ul className="mt-4 space-y-2 text-ink-soft">
            <li>• {t({ en: "The village sits at 875 m and winters are cold. We check every house's heating before you arrive.", es: "El pueblo está a 875 m y los inviernos son fríos. Revisamos la calefacción de cada casa antes de tu llegada." })}</li>
            <li>• {t({ en: "The high-speed train stop at A Gudiña has been suspended since June 2025. Arrive at Ourense; we book a licensed taxi.", es: "La parada del AVE en A Gudiña está suspendida desde junio de 2025. Llega a Ourense; te reservamos un taxi con licencia." })} <Src k="ave" /></li>
            <li>• {t({ en: "Stays of 30 days or more are ordinary seasonal lets, not tourist rentals, so the contract is different.", es: "Las estancias de 30 días o más son alquiler de temporada, no vivienda turística, así que el contrato es distinto." })} <Src k="vutDecree" /></li>
          </ul>
          <div className="mt-6"><Button href={href("/plan", lang)}>{t({ en: "Plan my trial →", es: "Planificar mi prueba →" })}</Button></div>
        </div>
      </Section>
    </>
  );
}

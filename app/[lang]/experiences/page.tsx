import type { Metadata } from "next";
import ExperienceBrowser from "@/components/ExperienceBrowser";
import { Button, PageHero, Section, SectionTitle } from "@/components/ui";
import { SEASONS, SEASON_NAMES } from "@/lib/data";
import { href, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/experiences">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Experiences · RuralOS", es: "Experiencias · RuralOS" }, lang), alternates: alternates(lang, "/experiences") };
}

export default async function ExperiencesPage({ params }: PageProps<"/[lang]/experiences">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  return (
    <>
      <PageHero slug="ponte-navea" lang={lang} eyebrow={t({ en: "Experiences", es: "Experiencias" })} title={t({ en: "Roman bridges, chestnut forests and a canyon of vineyards.", es: "Puentes romanos, bosques de castaños y un cañón de viñedos." })} lead={t({ en: "Everything within an hour of the village, grouped by season. Guided options are run by qualified local guides.", es: "Todo a menos de una hora del pueblo, por temporadas. Las opciones guiadas las llevan guías locales cualificados." })} />

      <Section>
        <SectionTitle eyebrow={t({ en: "The year in Terra de Trives", es: "El año en Terra de Trives" })} title={t({ en: "Every season has something on.", es: "Cada época tiene su plan." })} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((s) => (
            <div key={s.name} className="rounded-2xl bg-stone p-5">
              <p className="font-display text-2xl font-semibold">{t(SEASON_NAMES[s.name])}</p>
              <p className="text-sm text-chestnut">{t(s.months)}</p>
              <p className="mt-2 text-sm text-ink-soft">{t(s.headline)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <ExperienceBrowser lang={lang} />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={href("/plan", lang)}>{t({ en: "Build a stay around these →", es: "Monta tu estancia con estas →" })}</Button>
          <Button href={href("/concierge", lang)} variant="ghost">{t({ en: "Ask the concierge what's on", es: "Pregunta al conserje qué hay" })}</Button>
        </div>
      </Section>
    </>
  );
}

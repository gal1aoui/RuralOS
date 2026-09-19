import type { Metadata } from "next";
import Planner from "@/components/Planner";
import { Eyebrow } from "@/components/ui";
import { tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/plan">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: tx({ en: "Plan my visit · RuralOS", es: "Planifica tu visita · RuralOS" }, lang),
    description: tx({ en: "A step-by-step questionnaire that recommends a package, event, relocation plan or hosting deal, with prices.", es: "Un cuestionario paso a paso que recomienda un paquete, evento, plan de mudanza o acuerdo de anfitrión, con precios." }, lang),
    alternates: alternates(lang, "/plan"),
  };
}

export default async function PlanPage({ params }: PageProps<"/[lang]/plan">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  return (
    <div className="bg-stone/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto mb-8 max-w-3xl">
          <Eyebrow>{t({ en: "Plan my visit", es: "Planifica tu visita" })}</Eyebrow>
          <h1 className="mt-2 text-4xl font-semibold">{t({ en: "Tell us why you're coming and we'll plan the rest.", es: "Cuéntanos por qué vienes y planificamos el resto." })}</h1>
          <p className="mt-3 text-lg text-ink-soft">{t({ en: "A few quick questions give you a recommendation, a price breakdown and matching experiences. Send it to a local host in one click.", es: "Con unas preguntas rápidas obtienes una recomendación, el desglose de precios y experiencias a tu medida. Envíalo a un anfitrión local con un clic." })}</p>
        </div>
        <Planner lang={lang} />
      </div>
    </div>
  );
}

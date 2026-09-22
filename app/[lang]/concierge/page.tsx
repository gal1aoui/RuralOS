import type { Metadata } from "next";
import Chat from "@/components/Chat";
import { Eyebrow } from "@/components/ui";
import { tx, type T } from "@/lib/i18n";
import { KNOWLEDGE } from "@/lib/knowledge";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/concierge">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "AI concierge · RuralRiver", es: "Conserje IA · RuralRiver" }, lang), alternates: alternates(lang, "/concierge") };
}

export default async function ConciergePage({ params, searchParams }: PageProps<"/[lang]/concierge">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const q = (await searchParams).q;
  const how: T[] = [
    { en: `**Not trained, curated.** The model answers from a knowledge base of ${KNOWLEDGE[lang].length} local fact cards: routes, festivals, suppliers, prices, lodging, legal rules and the visa. Updating it means editing data, not retraining.`, es: `**No entrenado: curado.** El modelo responde desde una base de ${KNOWLEDGE[lang].length} fichas locales: rutas, fiestas, proveedores, precios, alojamiento, normativa y visado. Actualizarlo es editar datos, no reentrenar.` },
    { en: "**Model:** Claude Opus 5 via the Anthropic API, streaming, low effort for fast chat, with the knowledge base prompt-cached so repeat questions are cheap.", es: "**Modelo:** Claude Opus 5 por la API de Anthropic, en streaming, con esfuerzo bajo para respuestas rápidas y la base de conocimiento en caché para abaratar preguntas repetidas." },
    { en: "**Guardrails:** it never invents prices or dates, keeps market prices separate from ours, and hands anything uncertain to a local host.", es: "**Límites:** nunca inventa precios ni fechas, separa precios de mercado de los nuestros y deriva lo dudoso a un anfitrión local." },
    { en: "**Offline demo mode:** with no API key set, it falls back to keyword search over the same knowledge base, so the MVP works on any laptop.", es: "**Modo demo sin conexión:** sin clave de API, usa búsqueda por palabras clave en la misma base, así que el MVP funciona en cualquier portátil." },
  ];
  const value: T[] = [
    { en: "Answers routine questions around the clock, so the host spends time on guests, not inboxes", es: "Responde dudas habituales a cualquier hora, así el anfitrión dedica su tiempo a los huéspedes y no al correo" },
    { en: "Suggests add-ons (catamaran, winery, taxi booking) at the right moment", es: "Sugiere extras (catamarán, bodega, taxi) en el momento oportuno" },
    { en: "Speaks to founders from 16 countries in their language", es: "Habla con fundadores de 16 países en su idioma" },
    { en: "Costs about €1,500 a year, website included, in the budget", es: "Cuesta unos 1.500 € al año, web incluida, dentro del presupuesto" },
  ];
  const bold = (s: string) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <Eyebrow>{t({ en: "AI concierge", es: "Conserje IA" })}</Eyebrow>
        <h1 className="mt-2 text-4xl font-semibold">{t({ en: "Ask anything about the valley.", es: "Pregunta lo que quieras sobre el valle." })}</h1>
        <p className="mt-3 mb-6 text-ink-soft">{t({ en: "Replies in English, Spanish or Galician. It's an AI and says so; a local host confirms every booking.", es: "Responde en español, inglés o gallego. Es una IA y lo dice; un anfitrión local confirma cada reserva." })}</p>
        <Chat lang={lang} initial={typeof q === "string" ? q : undefined} />
      </div>
      <aside className="space-y-6 text-sm">
        <div className="rounded-3xl bg-stone p-6">
          <h2 className="text-xl font-semibold">{t({ en: "How it works", es: "Cómo funciona" })}</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">{how.map((h) => <li key={h.en}>• {bold(t(h))}</li>)}</ul>
        </div>
        <div className="rounded-3xl border border-line p-6">
          <h2 className="text-xl font-semibold">{t({ en: "What it does for the business", es: "Qué aporta al negocio" })}</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">{value.map((v) => <li key={v.en}>• {t(v)}</li>)}</ul>
        </div>
      </aside>
    </div>
  );
}

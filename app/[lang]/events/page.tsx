import type { Metadata } from "next";
import EventBuilder from "@/components/EventBuilder";
import { Estimate, PageHero, Photo, Section, SectionTitle, Src } from "@/components/ui";
import { ADDONS, CATEGORY_NAMES, type AddOn } from "@/lib/data";
import { eur, tx, type T } from "@/lib/i18n";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/events">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Private events · RuralOS", es: "Eventos privados · RuralOS" }, lang), alternates: alternates(lang, "/events") };
}

const CATEGORIES: AddOn["category"][] = ["food", "music", "venue", "transport", "experiences"];

export default async function EventsPage({ params }: PageProps<"/[lang]/events">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  return (
    <>
      <PageHero slug="magosto" lang={lang} eyebrow={t({ en: "Private events", es: "Eventos privados" })} title={t({ en: "Your party in a chestnut grove, a meadow or an old wine cellar.", es: "Tu fiesta en un souto, un prado o una vieja adega." })} lead={t({ en: "Neighbours rent us their land, and we bring the food, music, tables and permits. Build your quote below.", es: "Los vecinos nos alquilan sus fincas y nosotros ponemos la comida, la música, las mesas y los permisos. Calcula tu presupuesto aquí abajo." })} />

      <Section>
        <SectionTitle eyebrow={t({ en: "Event builder", es: "Configurador" })} title={t({ en: "Price it in 30 seconds.", es: "Precio en 30 segundos." })} lead={t({ en: "See where every euro goes: to the landowner, to local suppliers, and our coordination fee.", es: "Mira a dónde va cada euro: al propietario, a los proveedores locales y a nuestra coordinación." })} />
        <div className="mt-8"><EventBuilder lang={lang} /></div>
      </Section>

      <section className="bg-stone">
        <Section>
          <div className="grid gap-4 sm:grid-cols-3">
            <Photo slug="pulpo" lang={lang} className="h-56 rounded-2xl" sizes="33vw" />
            <Photo slug="gaita" lang={lang} className="h-56 rounded-2xl" sizes="33vw" />
            <Photo slug="queimada" lang={lang} className="h-56 rounded-2xl" sizes="33vw" />
          </div>
          <div className="mt-10">
            <SectionTitle eyebrow={t({ en: "Add-on marketplace", es: "Catálogo de extras" })} title={t({ en: "Local suppliers, in one place.", es: "Proveedores locales, en un solo sitio." })} lead={t({ en: "Market prices come from our research. Where no public price exists, we pass the supplier's quote through with a 10% coordination fee.", es: "Los precios de mercado salen de nuestra investigación. Donde no hay precio público, trasladamos el presupuesto del proveedor con un 10 % de coordinación." })} />
          </div>
          {CATEGORIES.map((cat) => (
            <div key={cat} className="mt-8">
              <h3 className="text-xl font-semibold">{t(CATEGORY_NAMES[cat])}</h3>
              <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-paper">
                <table className="w-full min-w-[680px] text-sm">
                  <thead className="text-left text-ink-soft"><tr><th className="p-3">{t({ en: "Add-on", es: "Extra" })}</th><th className="p-3">{t({ en: "Unit", es: "Unidad" })}</th><th className="p-3">{t({ en: "Market", es: "Mercado" })}</th><th className="p-3">{t({ en: "Our price", es: "Nuestro precio" })}<Estimate lang={lang} /></th><th className="p-3">{t({ en: "Partners", es: "Colaboradores" })}</th></tr></thead>
                  <tbody className="divide-y divide-line">
                    {ADDONS.filter((a) => a.category === cat).map((a) => (
                      <tr key={a.id}>
                        <td className="p-3 font-medium">{t(a.name)}{a.note && <div className="text-xs font-normal text-ink-soft">{t(a.note)}</div>}</td>
                        <td className="p-3">{t(a.unit)}</td>
                        <td className="p-3">{t(a.market)}{a.source && <div><Src k={a.source} /></div>}</td>
                        <td className="p-3 font-semibold">{a.ours === null ? (cat === "transport" ? t({ en: "paid to driver", es: "se paga al conductor" }) : t({ en: "quote + 10%", es: "presupuesto + 10 %" })) : eur(a.ours, lang)}</td>
                        <td className="p-3 text-ink-soft">{t(a.partners)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p className="mt-6 text-sm text-ink-soft">{t({ en: "Every event is covered by our liability insurance and notified to the Concello (town hall). Open fires (queimada, chestnut roasting) are never lit on high fire-risk days. Catering is always by licensed caterers.", es: "Todos los eventos tienen nuestro seguro de responsabilidad civil y se comunican al Concello. Nunca se hace fuego (queimada, castañas) en días de riesgo alto de incendio. El catering siempre es de empresas con licencia." })}</p>
        </Section>
      </section>
    </>
  );
}

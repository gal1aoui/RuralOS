import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionTitle, altFor, placeFor } from "@/components/ui";
import { tx, type T } from "@/lib/i18n";
import { images } from "@/lib/images";
import { alternates, langOf } from "@/lib/lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/credits">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: tx({ en: "Image credits · RuralRiver", es: "Créditos de imágenes · RuralRiver" }, lang), alternates: alternates(lang, "/credits") };
}

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  const counts = images.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.license]: (acc[i.license] ?? 0) + 1 }), {});
  const kinds: { title: string; body: T }[] = [
    { title: t({ en: "CC0 / Public domain", es: "CC0 / Dominio público" }), body: { en: "Free to use for any purpose. Credit is optional, but we give it anyway.", es: "Uso libre para cualquier fin. El crédito es opcional, pero lo damos igualmente." } },
    { title: "CC BY", body: { en: "Commercial use allowed. Credit the creator, link the licence, and say if changed (we resized them).", es: "Uso comercial permitido. Hay que citar al autor, enlazar la licencia e indicar cambios (las redimensionamos)." } },
    { title: "CC BY-SA", body: { en: "As CC BY. Any edited version of the image itself must keep the same licence. Using it unedited on a page does not change the page's licence.", es: "Como CC BY. Cualquier versión editada de la imagen debe mantener la misma licencia. Usarla sin editar en una página no cambia la licencia de la página." } },
  ];
  return (
    <>
      <Section>
        <SectionTitle eyebrow={t({ en: "Image credits", es: "Créditos de imágenes" })} title={t({ en: "Every photo is openly licensed for commercial use.", es: "Todas las fotos tienen licencia abierta para uso comercial." })} lead={<>{t({ en: `${images.length} photos from Wikimedia Commons, checked through the Commons API (licence, author and attribution flag for each file). Licences used:`, es: `${images.length} fotos de Wikimedia Commons, comprobadas con la API de Commons (licencia, autor y obligación de atribución de cada archivo). Licencias:` })} {Object.entries(counts).map(([l, n]) => `${l} (${n})`).join(", ")}. {t({ en: "None are NC (non-commercial) or ND (no-derivatives).", es: "Ninguna es NC (no comercial) ni ND (sin obras derivadas)." })}</>} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {kinds.map((k) => <div key={k.title} className="rounded-2xl bg-stone p-5 text-sm"><p className="font-semibold">{k.title}</p><p className="mt-1 text-ink-soft">{t(k.body)}</p></div>)}
        </div>
        <p className="mt-4 text-sm text-ink-soft">{t({ en: "Each photo on the site also shows its creator and licence in a caption linked to its Commons page. Unsplash and Pexels were not used: their search APIs need a key, so we couldn't verify licences automatically. Both licences allow commercial use without attribution if the team adds generic shots later.", es: "Cada foto de la web muestra también su autor y licencia en un pie enlazado a su página de Commons. No usamos Unsplash ni Pexels: sus APIs de búsqueda requieren clave y no podíamos verificar las licencias automáticamente. Ambas licencias permiten uso comercial sin atribución si el equipo añade fotos genéricas más adelante." })}</p>
      </Section>

      <Section className="pt-0">
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-stone text-left">
              <tr><th className="p-3">{t({ en: "Image", es: "Imagen" })}</th><th className="p-3">{t({ en: "Shows / location", es: "Qué muestra / lugar" })}</th><th className="p-3">{t({ en: "Creator", es: "Autor" })}</th><th className="p-3">{t({ en: "Licence", es: "Licencia" })}</th><th className="p-3">{t({ en: "Attribution", es: "Atribución" })}</th><th className="p-3">{t({ en: "Links", es: "Enlaces" })}</th></tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {images.map((i) => (
                <tr key={i.slug} id={i.slug}>
                  <td className="p-3"><div className="relative h-16 w-24 overflow-hidden rounded-lg"><Image src={i.src} alt={altFor(i.slug, lang)} fill sizes="96px" className="object-cover" /></div></td>
                  <td className="p-3"><p className="font-medium">{altFor(i.slug, lang)}</p><p className="text-xs text-ink-soft">{placeFor(i.slug, lang)}</p></td>
                  <td className="p-3">{i.creator}</td>
                  <td className="p-3">{i.licenseUrl ? <a href={i.licenseUrl} target="_blank" rel="noreferrer" className="underline">{i.license}</a> : i.license}{i.shareAlike && <p className="text-xs text-ink-soft">share-alike</p>}</td>
                  <td className="p-3 text-xs">{i.attributionRequired ? <><span className="font-semibold">{t({ en: "Required.", es: "Obligatoria." })}</span> {i.attribution}</> : <><span className="font-semibold">{t({ en: "Not required.", es: "No obligatoria." })}</span> {t({ en: "Credited anyway.", es: "La damos igualmente." })}</>}</td>
                  <td className="p-3 text-xs"><a href={i.sourcePage} target="_blank" rel="noreferrer" className="underline">{t({ en: "Commons page", es: "Página en Commons" })}</a><br /><a href={i.originalUrl} target="_blank" rel="noreferrer" className="underline">{t({ en: "Image URL", es: "URL de la imagen" })}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

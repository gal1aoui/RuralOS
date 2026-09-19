import Image from "next/image";
import Link from "next/link";
import { img, type ImgSlug } from "@/lib/images";
import { IMAGES_ES } from "@/lib/images-es";
import { SOURCES, type SourceKey } from "@/lib/data";
import { tx, type Lang } from "@/lib/i18n";

export const altFor = (slug: ImgSlug, lang: Lang) => (lang === "es" ? IMAGES_ES[slug].alt : img(slug).alt);
export const placeFor = (slug: ImgSlug, lang: Lang) => (lang === "es" ? IMAGES_ES[slug].place : img(slug).place);

// Every photo carries its own attribution line, as its licence requires.
// Inside a link, pass `inLink` so the credit renders as text (links can't nest).
export function Photo({ slug, lang, className = "", sizes = "100vw", priority = false, credit = true, inLink = false }: { slug: ImgSlug; lang: Lang; className?: string; sizes?: string; priority?: boolean; credit?: boolean; inLink?: boolean }) {
  const i = img(slug);
  return (
    <figure className={`relative overflow-hidden bg-stone-deep ${className}`}>
      <Image src={i.src} alt={altFor(slug, lang)} fill sizes={sizes} priority={priority} className="object-cover" />
      {credit && (
        <figcaption className="absolute bottom-0 right-0 max-w-full truncate bg-scrim/65 px-2 py-0.5 text-[10px] text-on-accent">
          {inLink ? i.creator : (
            <a href={i.sourcePage} target="_blank" rel="noreferrer" className="hover:underline">
              {i.creator}
            </a>
          )}{" "}
          · {i.license}
        </figcaption>
      )}
    </figure>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}

export function SectionTitle({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-lg text-ink-soft">{lead}</p>}
    </div>
  );
}

export function Src({ k }: { k: SourceKey }) {
  const s = SOURCES[k];
  return (
    <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-ink-soft underline decoration-dotted hover:text-ink">
      {s.label}
    </a>
  );
}

export function Estimate({ lang }: { lang: Lang }) {
  return <span className="ml-1 rounded-full bg-sun/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-chestnut">{tx({ en: "estimate", es: "estimación" }, lang)}</span>;
}

export function PageHero({ slug, lang, eyebrow, title, lead, children }: { slug: ImgSlug; lang: Lang; eyebrow: string; title: string; lead: React.ReactNode; children?: React.ReactNode }) {
  const i = img(slug);
  return (
    <section className="relative isolate min-h-[46vh] overflow-hidden">
      <Photo slug={slug} lang={lang} priority credit={false} className="!absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/90 via-scrim/60 to-scrim/30" />
      <a href={i.sourcePage} target="_blank" rel="noreferrer" className="absolute bottom-0 right-0 bg-scrim/65 px-2 py-0.5 text-[10px] text-on-accent hover:underline">
        {i.creator} · {i.license}
      </a>
      <div className="mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 text-on-accent">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        <div className="mt-4 max-w-2xl text-lg text-on-accent/90">{lead}</div>
        {children}
      </div>
    </section>
  );
}

export function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" | "light" }) {
  const cls =
    variant === "primary"
      ? "bg-moss text-on-moss hover:opacity-90"
      : variant === "light"
        ? "bg-on-accent text-on-sun hover:opacity-90"
        : "border border-current hover:bg-ink/5";
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${cls}`}>
      {children}
    </Link>
  );
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>
      {children}
    </section>
  );
}

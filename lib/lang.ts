import { notFound } from "next/navigation";
import { hasLang, LOCALES, type Lang } from "./i18n";

/** Resolve and validate the [lang] route param (404 for unknown languages). */
export async function langOf(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();
  return lang;
}

/** hreflang alternates for a page path, for metadata. */
export const alternates = (lang: Lang, path: string) => ({
  canonical: `/${lang}${path}`,
  languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
});

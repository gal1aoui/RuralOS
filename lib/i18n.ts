export const LOCALES = ["en", "es"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_NAMES: Record<Lang, string> = { en: "English", es: "Español" };

export const hasLang = (s: string): s is Lang => (LOCALES as readonly string[]).includes(s);

/** A string in every supported language. */
export type T = Record<Lang, string>;

/** Pick the string for `lang`. Plain strings (names, numbers) pass through. */
export const tx = (t: T | string, lang: Lang) => (typeof t === "string" ? t : t[lang]);

/** Localised internal link: href("/plan", "es") → "/es/plan". */
export const href = (path: string, lang: Lang) => `/${lang}${path === "/" ? "" : path}`;

export const eur = (n: number, lang: Lang = "en", digits = 0) =>
  new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);

export const num = (n: number, lang: Lang) => new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE").format(n);

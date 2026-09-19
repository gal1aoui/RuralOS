"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { LANG_NAMES, LOCALES, tx, type Lang } from "@/lib/i18n";

type Theme = "system" | "light" | "dark";
const ORDER: Theme[] = ["system", "light", "dark"];
const ICON: Record<Theme, string> = { system: "◐", light: "☀", dark: "☾" };
const LABEL: Record<Theme, { en: string; es: string }> = {
  system: { en: "Theme: system", es: "Tema: sistema" },
  light: { en: "Theme: light", es: "Tema: claro" },
  dark: { en: "Theme: dark", es: "Tema: oscuro" },
};

// The inline script in the layout applies the saved theme before paint; this store
// only mirrors it so the button shows the current choice.
const listeners = new Set<() => void>();
const readTheme = (): Theme => (document.documentElement.dataset.theme as Theme | undefined) ?? "system";
const subscribe = (cb: () => void) => { listeners.add(cb); return () => listeners.delete(cb); };

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  try {
    if (theme === "system") { delete root.dataset.theme; localStorage.removeItem("theme"); }
    else { root.dataset.theme = theme; localStorage.setItem("theme", theme); }
  } catch {
    if (theme === "system") delete root.dataset.theme; else root.dataset.theme = theme;
  }
  listeners.forEach((l) => l());
}

export function ThemeToggle({ lang }: { lang: Lang }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  return (
    <button type="button" onClick={() => applyTheme(next)} title={tx(LABEL[theme], lang)} aria-label={tx(LABEL[theme], lang)}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-base hover:bg-stone">
      <span aria-hidden>{ICON[theme]}</span>
    </button>
  );
}

export function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  return (
    <div className="flex rounded-full border border-line p-0.5 text-xs font-semibold" role="group" aria-label={tx({ en: "Language", es: "Idioma" }, lang)}>
      {LOCALES.map((l) => (
        <Link key={l} href={`/${l}${rest}`} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined} title={LANG_NAMES[l]}
          onClick={() => { document.cookie = `lang=${l}; path=/; max-age=31536000; SameSite=Lax`; }}
          className={`rounded-full px-2.5 py-1 uppercase ${l === lang ? "bg-moss text-on-moss" : "text-ink-soft hover:text-ink"}`}>
          {l}
        </Link>
      ))}
    </div>
  );
}

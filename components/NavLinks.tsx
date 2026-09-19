"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { href, tx, type Lang, type T } from "@/lib/i18n";

export type NavItem = { path: string; label: T };

// The header lives in the root layout, which doesn't re-render on navigation,
// so the active link has to come from the client-side pathname.
function useIsActive(lang: Lang) {
  const pathname = usePathname() ?? "";
  return (path: string) => {
    const target = href(path, lang);
    return pathname === target || pathname.startsWith(`${target}/`);
  };
}

export function DesktopNav({ items, lang, label }: { items: NavItem[]; lang: Lang; label: string }) {
  const isActive = useIsActive(lang);
  return (
    <nav className="hidden gap-0.5 xl:flex" aria-label={label}>
      {items.map((n) => {
        const active = isActive(n.path);
        // "Plan my visit" stays visible as the main call to action (outlined) when it isn't the current page.
        const cls = active
          ? "bg-moss text-on-moss"
          : n.path === "/plan"
            ? "border border-moss text-moss hover:bg-moss hover:text-on-moss"
            : "hover:bg-stone";
        return (
          <Link key={n.path} href={href(n.path, lang)} aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm transition-colors ${cls}`}>
            {tx(n.label, lang)}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav({ items, lang, label, menu }: { items: NavItem[]; lang: Lang; label: string; menu: string }) {
  const isActive = useIsActive(lang);
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);

  // Close the dropdown once the new page is showing.
  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);

  return (
    <details ref={details} className="relative xl:hidden">
      <summary className="cursor-pointer list-none rounded-full border border-line px-3 py-1.5 text-sm">{menu}</summary>
      <nav className="absolute right-0 mt-2 flex w-56 flex-col rounded-xl border border-line bg-paper p-2 shadow-lg" aria-label={label}>
        {items.map((n) => {
          const active = isActive(n.path);
          return (
            <Link key={n.path} href={href(n.path, lang)} aria-current={active ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm ${active ? "bg-moss font-semibold text-on-moss" : "hover:bg-stone"}`}>
              {tx(n.label, lang)}
            </Link>
          );
        })}
      </nav>
    </details>
  );
}

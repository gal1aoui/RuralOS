import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LOCALES, hasLang, type Lang } from "@/lib/i18n";

// Accept-Language → the first supported language, by the header's own order and q-values.
function preferred(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map((r) => r.base).find(hasLang) ?? DEFAULT_LANG;
}

// Every page lives under /en or /es. Bare paths redirect to the visitor's language:
// their saved choice (cookie) first, then the browser's preference.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // The relocation feature became the land feature; old links still work.
  const moved = pathname.match(/^\/(en|es)\/relocate\/?$/);
  if (moved) {
    const url = request.nextUrl.clone();
    url.pathname = `/${moved[1]}/land`;
    return NextResponse.redirect(url, 308);
  }
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const saved = request.cookies.get("lang")?.value;
  const lang = saved && hasLang(saved) ? saved : preferred(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, favicon).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import Link from "next/link";
import { Logo } from "@/components/Brand";
import { DesktopNav, MobileNav, type NavItem } from "@/components/NavLinks";
import { LangSwitch, ThemeToggle } from "@/components/Switchers";
import { LOCALES, href, tx, type Lang, type T } from "@/lib/i18n";
import { langOf } from "@/lib/lang";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Bricolage Grotesque is the typeface of the RuralOS wordmark (public/assets).
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F6F0" },
    { media: "(prefers-color-scheme: dark)", color: "#101915" },
  ],
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: "RuralOS · San Xoán de Río",
    description: tx({ en: "Stays, private events and relocation in San Xoán de Río and Terra de Trives (Galicia), run by a local host with an AI concierge.", es: "Estancias, eventos privados y reubicación en San Xoán de Río y Terra de Trives (Galicia), con un anfitrión local y un conserje IA." }, lang),
  };
}

const NAV: NavItem[] = [
  { path: "/plan", label: { en: "Plan my visit", es: "Planifica tu visita" } },
  { path: "/packages", label: { en: "Packages", es: "Paquetes" } },
  { path: "/experiences", label: { en: "Experiences", es: "Experiencias" } },
  { path: "/events", label: { en: "Events", es: "Eventos" } },
  { path: "/relocate", label: { en: "Relocate", es: "Mudarte" } },
  { path: "/hosts", label: { en: "For locals", es: "Para vecinos" } },
  { path: "/concierge", label: { en: "AI concierge", es: "Conserje IA" } },
  { path: "/business", label: { en: "Business plan", es: "Plan de negocio" } },
];

// Applies the saved theme before first paint (no flash). "system" = no attribute.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang: Lang = await langOf(params);
  const t = (x: T) => tx(x, lang);
  return (
    <html lang={lang} className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">
          {t({ en: "Skip to content", es: "Saltar al contenido" })}
        </a>
        <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href={href("/", lang)} className="flex items-center gap-2" aria-label="RuralOS · San Xoán de Río">
              <Logo />
              <span className="hidden text-sm text-ink-soft sm:inline xl:hidden 2xl:inline">San Xoán de Río</span>
            </Link>
            <DesktopNav items={NAV} lang={lang} label={t({ en: "Main", es: "Principal" })} />
            <div className="flex items-center gap-2">
              <LangSwitch lang={lang} />
              <ThemeToggle lang={lang} />
              <MobileNav items={NAV} lang={lang} label={t({ en: "Main", es: "Principal" })} menu={t({ en: "Menu", es: "Menú" })} />
            </div>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="bg-moss-deep text-on-accent/80">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:grid-cols-3">
            <div>
              <Logo reversed size="lg" />
              <p className="mt-1 text-on-accent">San Xoán de Río · Terra de Trives</p>
              <p className="mt-3">{t({ en: "A local host business: stays, private events on villagers' land, and relocation, with an AI concierge. Hackathon MVP, September 2026.", es: "Un negocio de anfitrión local: estancias, eventos privados en fincas de vecinos y reubicación, con un conserje IA. MVP de hackathon, septiembre de 2026." })}</p>
            </div>
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link key={n.path} href={href(n.path, lang)} className="hover:text-on-accent hover:underline">{t(n.label)}</Link>
              ))}
            </div>
            <div>
              <p>
                {t({ en: "Photos: Wikimedia Commons contributors under CC0, public domain, CC BY and CC BY-SA licences.", es: "Fotos: colaboradores de Wikimedia Commons con licencias CC0, dominio público, CC BY y CC BY-SA." })}{" "}
                <Link href={href("/credits", lang)} className="underline hover:text-on-accent">{t({ en: "Full image credits", es: "Créditos de las imágenes" })}</Link>.
              </p>
              <p className="mt-2">{t({ en: "Researched prices link to their sources. Our own prices and volumes are marked as estimates. Legal points checked against official sources in September 2026; not legal advice.", es: "Los precios investigados enlazan a su fuente. Nuestros precios y volúmenes están marcados como estimaciones. Normativa contrastada con fuentes oficiales en septiembre de 2026; no es asesoramiento legal." })}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

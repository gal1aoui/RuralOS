"use client";

import { useState } from "react";
import { Photo, Src } from "@/components/ui";
import { ACTIVITIES, KIND_NAMES, SEASON_NAMES, type Kind, type Season } from "@/lib/data";
import { tx, type Lang, type T } from "@/lib/i18n";

const SEASONS: (Season | "All")[] = ["All", "Winter", "Spring", "Summer", "Autumn"];
const KINDS: (Kind | "All")[] = ["All", "Nature", "Heritage", "Food & wine", "Festival", "Adventure", "Wellness"];
const ALL: T = { en: "All", es: "Todas" };

export default function ExperienceBrowser({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const [season, setSeason] = useState<Season | "All">("All");
  const [kind, setKind] = useState<Kind | "All">("All");
  const list = ACTIVITIES.filter((a) => (season === "All" || a.seasons.includes(season)) && (kind === "All" || a.kind === kind));

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Chips label={t({ en: "Season", es: "Época" })} options={SEASONS} value={season} onChange={setSeason} name={(o) => t(o === "All" ? ALL : SEASON_NAMES[o])} />
        <Chips label={t({ en: "Type", es: "Tipo" })} options={KINDS} value={kind} onChange={setKind} name={(o) => t(o === "All" ? ALL : KIND_NAMES[o])} />
      </div>
      <p className="mt-4 text-sm text-ink-soft">{t({ en: `${list.length} experiences · drive times from San Xoán de Río are approximate`, es: `${list.length} experiencias · los tiempos en coche desde San Xoán de Río son aproximados` })}</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <article key={a.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper">
            {a.image && <Photo slug={a.image} lang={lang} className="h-48" sizes="(min-width: 1024px) 33vw, 50vw" />}
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs text-ink-soft">{t(KIND_NAMES[a.kind])} · {a.where} · {t(a.distance)}</p>
              <h3 className="mt-1 text-xl font-semibold">{t(a.name)}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{t(a.blurb)}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {a.seasons.map((s) => <span key={s} className="rounded-full bg-stone px-2 py-0.5 text-xs">{t(SEASON_NAMES[s])}</span>)}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-moss">{t(a.price)}</span>
                {a.source && <Src k={a.source} />}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Chips<O extends string>({ label, options, value, onChange, name }: { label: string; options: O[]; value: O; onChange: (v: O) => void; name: (o: O) => string }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="w-16 text-sm font-semibold">{label}</span>
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-sm ${value === o ? "border-moss bg-moss text-on-moss" : "border-line hover:bg-stone"}`}>
          {name(o)}
        </button>
      ))}
    </div>
  );
}

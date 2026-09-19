"use client";

import Link from "next/link";
import { useState } from "react";
import { eur, href, tx, type Lang, type T } from "@/lib/i18n";
import { CATERING, EVENT_TYPES, EXTRAS, quoteEvent, type CateringId, type ExtraId } from "@/lib/event";

export default function EventBuilder({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const [type, setType] = useState<string>(EVENT_TYPES[0].id);
  const [guests, setGuests] = useState(30);
  const [catering, setCatering] = useState<CateringId>("feast");
  const [extras, setExtras] = useState<ExtraId[]>(["kit", "gaita"]);
  const q = quoteEvent({ guests, catering, extras, lang });
  const toggle = (id: ExtraId) => setExtras((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));
  const option = (active: boolean) => `flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-sm ${active ? "border-moss bg-moss/15" : "border-line"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold" htmlFor="etype">{t({ en: "Occasion", es: "Ocasión" })}</label>
          <select id="etype" value={type} onChange={(ev) => setType(ev.target.value)} className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2.5">
            {EVENT_TYPES.map((x) => <option key={x.id} value={x.id}>{t(x.label)}</option>)}
          </select>
        </div>
        <div>
          <label className="flex justify-between text-sm font-semibold" htmlFor="guests"><span>{t({ en: "Guests", es: "Invitados" })}</span><span className="tabular-nums">{guests}</span></label>
          <input id="guests" type="range" min={8} max={120} value={guests} onChange={(ev) => setGuests(Number(ev.target.value))} className="mt-2 w-full" />
        </div>
        <fieldset>
          <legend className="text-sm font-semibold">{t({ en: "Food", es: "Comida" })}</legend>
          <div className="mt-2 space-y-2">
            {CATERING.map((c) => (
              <label key={c.id} className={option(catering === c.id)}>
                <span className="flex items-center gap-2"><input type="radio" name="cat" checked={catering === c.id} onChange={() => setCatering(c.id)} />{t(c.label)}</span>
                <span className="whitespace-nowrap font-semibold">{e(c.perGuest)}/{t({ en: "guest", es: "invitado" })}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold">{t({ en: "Extras", es: "Extras" })}</legend>
          <div className="mt-2 space-y-2">
            {EXTRAS.map((x) => (
              <label key={x.id} className={option(extras.includes(x.id))}>
                <span className="flex items-center gap-2"><input type="checkbox" checked={extras.includes(x.id)} onChange={() => toggle(x.id)} />{t(x.label)}</span>
                <span className="whitespace-nowrap font-semibold">{x.estimate ? "≈" : ""}{e(x.price)}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-soft">{t({ en: "Guests arriving by train: we book licensed taxis or a minibus, paid directly to the driver.", es: "Invitados que llegan en tren: reservamos taxis con licencia o un microbús, que se pagan directamente al conductor." })}</p>
        </fieldset>
      </div>

      <aside className="h-fit rounded-3xl bg-moss-deep p-6 text-on-accent lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Live quote", es: "Presupuesto al momento" })}</p>
        <p className="mt-2 font-display text-5xl font-semibold tabular-nums">{e(q.total)}</p>
        <p className="text-on-accent/80">{e(q.perGuest)} {t({ en: "per guest", es: "por invitado" })} · {t(EVENT_TYPES.find((x) => x.id === type)!.label)}</p>
        <ul className="mt-6 space-y-2 text-sm">
          {q.rows.map((r) => (
            <li key={r.label} className="flex justify-between gap-4 border-b border-on-accent/15 pb-2">
              <span>{r.label}{r.estimate && <span className="ml-1 text-sun">≈</span>}<span className="block text-xs text-on-accent/60">→ {r.to}</span></span>
              <span className="tabular-nums">{e(r.amount)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4"><span>{t({ en: "Coordination (15%, min. €300)", es: "Coordinación (15 %, mín. 300 €)" })}</span><span className="tabular-nums">{e(q.coordination)}</span></li>
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: "Landowner earns", es: "El propietario gana" })}</p><p className="font-display text-2xl">{e(q.ownerEarns)}</p></div>
          <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: "RuralOS keeps", es: "RuralOS se queda" })}</p><p className="font-display text-2xl">{e(q.ours)}</p></div>
        </div>
        <p className="mt-4 text-xs text-on-accent/70">{t({ en: "≈ marks estimates until the supplier quotes. Catering tiers sit within the researched €10–60 per guest range for Ourense.", es: "≈ indica estimación hasta tener presupuesto. Los niveles de catering están dentro del rango investigado de 10–60 € por invitado en Ourense." })}</p>
        <Link href={href("/plan", lang)} className="mt-5 inline-block rounded-full bg-on-accent px-5 py-2.5 text-sm font-semibold text-on-sun hover:opacity-90">{t({ en: "Request this event →", es: "Solicitar este evento →" })}</Link>
      </aside>
    </div>
  );
}

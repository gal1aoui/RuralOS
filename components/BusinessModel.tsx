"use client";

import { useState } from "react";
import { CAPEX, FIXED_COSTS, LINES, LOAN, MONTHS } from "@/lib/data";
import { eur, tx, type Lang, type T } from "@/lib/i18n";
import { computeModel, type Volumes } from "@/lib/model";

// Bars use --chart: validated separately against the light and dark surfaces.
const BAR = "var(--chart)";

export default function BusinessModel({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const defaults = () => Object.fromEntries(LINES.map((l) => [l.id, l.volume]));
  const [volumes, setVolumes] = useState<Volumes>(defaults);
  const [months, setMonths] = useState(LOAN.months);
  const m = computeModel(volumes, months);
  const target = 100000;
  const reset = () => { setVolumes(defaults()); setMonths(LOAN.months); };
  const afterLoan = m.revenue - m.loanPaidInYear;

  return (
    <div className="space-y-10">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label={t({ en: "Year-1 revenue", es: "Ingresos del año 1" })} value={e(m.revenue)} good={m.revenue >= target} hint={m.revenue >= target ? t({ en: "Above the €100k goal", es: "Por encima del objetivo de 100.000 €" }) : t({ en: `${e(target - m.revenue)} short of €100k`, es: `Faltan ${e(target - m.revenue)} para 100.000 €` })} />
        <Kpi label={t({ en: "Revenue after loan repayments", es: "Ingresos tras pagar el préstamo" })} value={e(afterLoan)} good={afterLoan >= target} hint={t({ en: `Loan paid this year: ${e(m.loanPaidInYear)}`, es: `Préstamo pagado este año: ${e(m.loanPaidInYear)}` })} />
        <Kpi label={t({ en: "Profit after all costs", es: "Beneficio tras todos los costes" })} value={e(m.profit)} good={m.profit > 0} hint={t({ en: "Includes the refit, the kit and interest", es: "Incluye reforma, kit e intereses" })} />
        <Kpi label={t({ en: "Cash at month 12", es: "Caja en el mes 12" })} value={e(m.cashEnd)} good={m.cashEnd > 0} hint={m.balanceEnd > 1 ? t({ en: `Loan still owed: ${e(m.balanceEnd)}`, es: `Préstamo pendiente: ${e(m.balanceEnd)}` }) : t({ en: "Loan fully repaid", es: "Préstamo devuelto" })} />
      </dl>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-3xl border border-line p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{t({ en: "Adjust the assumptions", es: "Ajusta las hipótesis" })}</h3>
            <button onClick={reset} className="text-sm text-ink-soft underline hover:text-ink">{t({ en: "Reset", es: "Restablecer" })}</button>
          </div>
          <div className="mt-4 space-y-4">
            {LINES.map((l) => (
              <label key={l.id} className="block">
                <span className="flex justify-between text-sm"><span>{t(l.label)}</span><span className="font-semibold tabular-nums">{volumes[l.id]} {t(l.unitLabel)}</span></span>
                <input type="range" min={l.min} max={l.max} step={l.step} value={volumes[l.id]} onChange={(ev) => setVolumes((v) => ({ ...v, [l.id]: Number(ev.target.value) }))} className="w-full" aria-label={t(l.label)} />
              </label>
            ))}
            <fieldset className="pt-2">
              <legend className="text-sm">{t({ en: "Loan term (7% a year assumed)", es: "Plazo del préstamo (7 % anual supuesto)" })}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {[12, 24, 60].map((n) => (
                  <button key={n} onClick={() => setMonths(n)} aria-pressed={months === n} className={`rounded-full border px-3 py-1 text-sm ${months === n ? "border-moss bg-moss text-on-moss" : "border-line"}`}>
                    {n} {t({ en: "months", es: "meses" })} · {e(computeModel(volumes, n).payment)}/{t({ en: "mo", es: "mes" })}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="rounded-3xl border border-line p-6">
          <h3 className="text-xl font-semibold">{t({ en: "Revenue by month, Oct 2026 – Sep 2027", es: "Ingresos por mes, oct 2026 – sep 2027" })}</h3>
          <p className="text-sm text-ink-soft">{t({ en: "October is set-up; peaks in summer and the September grape harvest. The seasonal curve is an estimate.", es: "Octubre es de arranque; picos en verano y en la vendimia de septiembre. La curva estacional es una estimación." })}</p>
          <MonthlyBars values={m.monthly} lang={lang} />
          <h4 className="mt-8 text-sm font-semibold">{t({ en: "Revenue mix", es: "Mezcla de ingresos" })}</h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {[...m.lines].sort((a, b) => b.revenue - a.revenue).map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <span className="w-44 shrink-0 truncate text-ink-soft">{t(l.label)}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-stone-deep">
                  <span className="block h-full rounded-full" style={{ width: `${m.revenue ? (l.revenue / m.revenue) * 100 : 0}%`, background: BAR }} />
                </span>
                <span className="w-12 text-right tabular-nums">{m.revenue ? Math.round((l.revenue / m.revenue) * 100) : 0}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-stone text-left">
            <tr>
              <th className="p-3">{t({ en: "P&L line", es: "Partida" })}</th><th className="p-3 text-right">{t({ en: "Volume", es: "Volumen" })}</th><th className="p-3 text-right">{t({ en: "Unit price", es: "Precio unitario" })}</th>
              <th className="p-3 text-right">{t({ en: "Revenue", es: "Ingresos" })}</th><th className="p-3 text-right">{t({ en: "Direct cost", es: "Coste directo" })}</th><th className="p-3 text-right">{t({ en: "Margin", es: "Margen" })}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line tabular-nums">
            {m.lines.map((l) => (
              <tr key={l.id}><td className="p-3">{t(l.label)}</td><td className="p-3 text-right">{l.volume} {t(l.unitLabel)}</td><td className="p-3 text-right">{e(l.price)}</td><td className="p-3 text-right">{e(l.revenue)}</td><td className="p-3 text-right">{e(l.direct)}</td><td className="p-3 text-right font-semibold">{e(l.margin)}</td></tr>
            ))}
            <tr className="bg-stone/60 font-semibold"><td className="p-3" colSpan={3}>Total</td><td className="p-3 text-right">{e(m.revenue)}</td><td className="p-3 text-right">{e(m.direct)}</td><td className="p-3 text-right">{e(m.revenue - m.direct)}</td></tr>
            {FIXED_COSTS.map((c) => <tr key={c.item.en} className="text-ink-soft"><td className="p-3" colSpan={5}>− {t(c.item)}</td><td className="p-3 text-right">{e(-c.amount)}</td></tr>)}
            {CAPEX.map((c) => <tr key={c.item.en} className="text-ink-soft"><td className="p-3" colSpan={5}>− {t(c.item)} ({t({ en: "one-off, expensed in year 1", es: "pago único, imputado al año 1" })})</td><td className="p-3 text-right">{e(-c.amount)}</td></tr>)}
            <tr className="text-ink-soft"><td className="p-3" colSpan={5}>− {t({ en: "Loan interest paid this year", es: "Intereses del préstamo este año" })}</td><td className="p-3 text-right">{e(-m.interest)}</td></tr>
            <tr className="border-t-2 border-ink font-semibold"><td className="p-3" colSpan={5}>{t({ en: "Profit", es: "Beneficio" })}</td><td className="p-3 text-right">{e(m.profit)}</td></tr>
            <tr className="text-ink-soft"><td className="p-3" colSpan={5}>{t({ en: "Start cash (€5k savings + €20k loan) + profit − loan principal repaid", es: "Caja inicial (5.000 € ahorros + 20.000 € préstamo) + beneficio − principal devuelto" })}</td><td className="p-3 text-right">{e(m.cashEnd)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint, good }: { label: string; value: string; hint: string; good: boolean }) {
  return (
    <div className="rounded-2xl bg-stone p-4">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="font-display text-3xl font-semibold tabular-nums">{value}</dd>
      <dd className="mt-1 flex items-center gap-1 text-xs text-ink-soft"><span aria-hidden>{good ? "✓" : "!"}</span>{hint}</dd>
    </div>
  );
}

function MonthlyBars({ values, lang }: { values: number[]; lang: Lang }) {
  const [hover, setHover] = useState<number | null>(null);
  const months = MONTHS[lang];
  const max = Math.max(...values, 1);
  const ceiling = Math.ceil(max / 5000) * 5000;
  const peak = values.indexOf(max);
  const H = 200;
  return (
    <div className="mt-6">
      <div className="relative" style={{ height: H }}>
        {[0, 0.5, 1].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-line" style={{ bottom: f * H }}>
            <span className="absolute -top-2.5 left-0 bg-paper pr-1 text-[10px] text-ink-soft">{eur(ceiling * f, lang)}</span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-end gap-[2px] pl-14">
          {values.map((v, i) => (
            <button key={months[i]} type="button" className="relative flex h-full flex-1 items-end justify-center focus:outline-none"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              aria-label={`${months[i]}: ${eur(v, lang)}`}>
              <span className="w-full max-w-7 rounded-t-[4px] transition-opacity" style={{ height: `${(v / ceiling) * 100}%`, background: BAR, opacity: hover === null || hover === i ? 1 : 0.55 }} />
              {(hover === i || (hover === null && i === peak)) && (
                <span className="pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-paper" style={{ bottom: `calc(${(v / ceiling) * 100}% + 6px)` }}>
                  {months[i]} · {eur(v, lang)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-[2px] pl-14 text-center text-[10px] text-ink-soft">
        {months.map((mo) => <span key={mo} className="flex-1">{mo}</span>)}
      </div>
    </div>
  );
}

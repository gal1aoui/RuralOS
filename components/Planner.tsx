"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Photo } from "@/components/ui";
import { eur, href, tx, type Lang, type T } from "@/lib/i18n";
import { isAnswered, questionsFor, recommend, type Answers, type Question } from "@/lib/plan";

const DEFAULTS: Partial<Answers> = { people: 2, guests: 30, nights: 3, hectares: 6, workers: 2 };

const CLEARED: Answers = {
  group: undefined, people: undefined, length: undefined, season: undefined, interests: undefined, lodging: undefined, taxi: undefined,
  projectType: undefined, hectares: undefined, years: undefined, workers: undefined, teamHousing: undefined, ruralValley: undefined, needs: undefined, eventType: undefined, guests: undefined, catering: undefined, extras: undefined,
  offer: undefined, condition: undefined, nights: undefined,
};

export default function Planner({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const questions = useMemo(() => questionsFor(answers, lang), [answers, lang]);
  const done = answers.purpose !== undefined && step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];

  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => { setAnswers({}); setStep(0); };

  const progress = done ? 100 : Math.round((step / Math.max(questions.length, 5)) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <span>{done ? t({ en: "Your plan", es: "Tu plan" }) : `${t({ en: "Step", es: "Paso" })} ${step + 1} ${t({ en: "of", es: "de" })} ${answers.purpose ? questions.length : "…"}`}</span>
          {step > 0 && <button onClick={restart} className="underline hover:text-ink">{t({ en: "Start over", es: "Empezar de nuevo" })}</button>}
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-deep" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-moss transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {done ? (
        <Result answers={answers} lang={lang} onBack={back} onRestart={restart} />
      ) : (
        <Step key={q.id} q={q} lang={lang} answers={answers} set={set} onNext={next} onBack={step > 0 ? back : undefined} />
      )}
    </div>
  );
}

function Step({ q, lang, answers, set, onNext, onBack }: { q: Question; lang: Lang; answers: Answers; set: (p: Partial<Answers>) => void; onNext: () => void; onBack?: () => void }) {
  const t = (x: T) => tx(x, lang);
  const value = answers[q.id];
  // Number questions start from a sensible default so "Next" is always available.
  const num = Number(value ?? DEFAULTS[q.id] ?? q.min);
  const answered = q.kind === "number" || isAnswered(q, answers);

  const pickSingle = (v: string) => {
    // Changing the purpose clears the answers that belonged to the previous branch.
    set(q.id === "purpose" ? { ...CLEARED, purpose: v as Answers["purpose"] } : ({ [q.id]: v } as Partial<Answers>));
    setTimeout(onNext, 150);
  };
  const goNext = () => {
    if (q.kind === "number" && value === undefined) set({ [q.id]: num } as Partial<Answers>);
    onNext();
  };
  const card = (active: boolean) => `flex items-start gap-3 rounded-2xl border p-4 text-left transition ${active ? "border-moss bg-moss/15" : "border-line hover:border-moss hover:bg-stone"}`;

  return (
    <fieldset className="rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-8">
      <legend className="sr-only">{q.title}</legend>
      <h2 className="text-2xl font-semibold sm:text-3xl">{q.title}</h2>
      {q.help && <p className="mt-2 text-ink-soft">{q.help}</p>}

      <div className="mt-6">
        {q.kind === "single" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {q.choices!.map((c) => (
              <button key={c.value} type="button" onClick={() => pickSingle(c.value)} aria-pressed={value === c.value} className={card(value === c.value)}>
                {c.icon && <span className="text-2xl" aria-hidden>{c.icon}</span>}
                <span>
                  <span className="block font-semibold">{c.label}</span>
                  {c.hint && <span className="mt-0.5 block text-sm text-ink-soft">{c.hint}</span>}
                </span>
              </button>
            ))}
          </div>
        )}

        {q.kind === "multi" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {q.choices!.map((c) => {
              const list = (value as string[] | undefined) ?? [];
              const active = list.includes(c.value);
              return (
                <button key={c.value} type="button" aria-pressed={active} className={card(active)}
                  onClick={() => set({ [q.id]: active ? list.filter((x) => x !== c.value) : [...list, c.value] } as Partial<Answers>)}>
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border text-xs ${active ? "border-moss bg-moss text-on-moss" : "border-ink-soft"}`}>{active ? "✓" : ""}</span>
                  <span>
                    <span className="block font-semibold">{c.icon ? `${c.icon} ` : ""}{c.label}</span>
                    {c.hint && <span className="mt-0.5 block text-sm text-ink-soft">{c.hint}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {q.kind === "number" && (
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => set({ [q.id]: Math.max(q.min!, num - 1) } as Partial<Answers>)} className="h-12 w-12 rounded-full border border-line text-2xl hover:bg-stone" aria-label={t({ en: "Fewer", es: "Menos" })}>−</button>
            <input type="number" min={q.min} max={q.max} value={num} aria-label={q.title}
              onChange={(e) => set({ [q.id]: Math.min(q.max!, Math.max(q.min!, Number(e.target.value) || q.min!)) } as Partial<Answers>)}
              className="w-24 rounded-xl border border-line bg-paper px-3 py-2 text-center font-display text-3xl" />
            <button type="button" onClick={() => set({ [q.id]: Math.min(q.max!, num + 1) } as Partial<Answers>)} className="h-12 w-12 rounded-full border border-line text-2xl hover:bg-stone" aria-label={t({ en: "More", es: "Más" })}>+</button>
            <span className="text-ink-soft">{q.unit}</span>
          </div>
        )}

        {q.kind === "boolean" && (
          <div className="flex gap-3">
            {[{ v: true, l: t({ en: "Yes", es: "Sí" }) }, { v: false, l: t({ en: "No", es: "No" }) }].map((o) => (
              <button key={o.l} type="button" aria-pressed={value === o.v} onClick={() => { set({ [q.id]: o.v } as Partial<Answers>); setTimeout(onNext, 150); }}
                className={`rounded-2xl border px-8 py-4 font-semibold ${value === o.v ? "border-moss bg-moss/15" : "border-line hover:border-moss hover:bg-stone"}`}>
                {o.l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {onBack ? <button type="button" onClick={onBack} className="text-sm text-ink-soft underline hover:text-ink">← {t({ en: "Back", es: "Atrás" })}</button> : <span />}
        {(q.kind === "multi" || answered) && (
          <button type="button" onClick={goNext} disabled={!answered}
            className="rounded-full bg-moss px-6 py-2.5 text-sm font-semibold text-on-moss hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            {t({ en: "Next →", es: "Siguiente →" })}
          </button>
        )}
      </div>
    </fieldset>
  );
}

function Result({ answers, lang, onBack, onRestart }: { answers: Answers; lang: Lang; onBack: () => void; onRestart: () => void }) {
  const t = (x: T) => tx(x, lang);
  const r = recommend(answers, lang);
  const [optional, setOptional] = useState<Record<string, boolean>>({});
  const extra = r.lines.filter((l) => l.optional && optional[l.label]).reduce((s, l) => s + l.amount, 0);
  const total = r.total + extra;
  const question = t({ en: `I'm planning: ${r.headline}. ${r.summary} What do you recommend?`, es: `Estoy planificando: ${r.headline}. ${r.summary} ¿Qué me recomiendas?` });
  const pill = "rounded-full border border-line px-4 py-2 hover:bg-stone";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-moss-deep p-6 text-on-accent sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Our recommendation", es: "Nuestra recomendación" })}</p>
        <h2 className="mt-2 text-3xl font-semibold">{r.headline}</h2>
        <p className="mt-2 text-on-accent/85">{r.summary}</p>
      </div>

      <div className="rounded-3xl border border-line p-6 sm:p-8">
        <h3 className="text-xl font-semibold">{t({ en: "Price breakdown", es: "Desglose de precios" })}</h3>
        <ul className="mt-4 divide-y divide-line">
          {r.lines.map((l) => (
            <li key={l.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <label className={`flex items-center gap-2 ${l.optional ? "cursor-pointer" : ""}`}>
                {l.optional && <input type="checkbox" checked={!!optional[l.label]} onChange={(e) => setOptional((o) => ({ ...o, [l.label]: e.target.checked }))} />}
                <span className={l.optional ? "text-ink-soft" : ""}>{l.label}</span>
                {l.estimate && <span className="rounded-full bg-sun/25 px-2 text-[10px] font-semibold uppercase text-chestnut">{t({ en: "estimate", es: "estimación" })}</span>}
              </label>
              <span className="font-semibold tabular-nums">{eur(l.amount, lang)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-3">
          <span className="font-semibold">{extra ? t({ en: "Total with selected extras", es: "Total con los extras elegidos" }) : r.totalLabel}</span>
          <span className="font-display text-3xl font-semibold tabular-nums">{eur(total, lang)}</span>
        </div>
        {r.notes.length > 0 && <ul className="mt-5 space-y-2 text-sm text-ink-soft">{r.notes.map((n) => <li key={n}>• {n}</li>)}</ul>}
      </div>

      {r.activities.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold">{t({ en: "Experiences that match", es: "Experiencias a tu medida" })}</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {r.activities.map((a) => (
              <div key={a.id} className="overflow-hidden rounded-2xl border border-line">
                {a.image && <Photo slug={a.image} lang={lang} className="h-28" sizes="33vw" credit={false} />}
                <div className="p-3">
                  <p className="font-semibold leading-tight">{t(a.name)}</p>
                  <p className="text-xs text-ink-soft">{t(a.distance)} · {t(a.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <LeadForm answers={answers} lang={lang} headline={r.headline} total={total} />

      <div className="flex flex-wrap gap-3 text-sm">
        <button onClick={onBack} className={pill}>← {t({ en: "Change my answers", es: "Cambiar respuestas" })}</button>
        <button onClick={onRestart} className={pill}>{t({ en: "Start over", es: "Empezar de nuevo" })}</button>
        <Link href={`${href("/concierge", lang)}?q=${encodeURIComponent(question)}`} className={pill}>{t({ en: "Ask the AI concierge about this plan", es: "Preguntar al conserje IA por este plan" })}</Link>
        {r.next.map((n) => <Link key={n.href} href={href(n.href, lang)} className={pill}>{n.label}</Link>)}
      </div>
    </div>
  );
}

function LeadForm({ answers, lang, headline, total }: { answers: Answers; lang: Lang; headline: string; total: number }) {
  const t = (x: T) => tx(x, lang);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const res = await fetch("/api/leads", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), email: f.get("email"), consent: f.get("consent") === "on", plan: { headline, total, lang, answers, message: f.get("message") } }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) { setRef(data.reference); setState("sent"); } else { setError(data.error ?? t({ en: "Something went wrong. Please try again.", es: "Algo ha fallado. Inténtalo de nuevo." })); setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl border-2 border-moss bg-moss/15 p-6">
        <p className="text-lg font-semibold">{t({ en: `Request sent. Your reference is ${ref}.`, es: `Solicitud enviada. Tu referencia es ${ref}.` })}</p>
        <p className="mt-1 text-ink-soft">{t({ en: "A local host will confirm availability and final prices within 24 hours.", es: "Un anfitrión local confirmará disponibilidad y precios en 24 horas." })}</p>
      </div>
    );
  }

  const input = "rounded-xl border border-line bg-paper px-4 py-2.5";
  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-stone p-6 sm:p-8">
      <h3 className="text-xl font-semibold">{t({ en: "Send this plan to a local host", es: "Envía este plan a un anfitrión local" })}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder={t({ en: "Your name", es: "Tu nombre" })} className={input} />
        <input name="email" type="email" required placeholder="Email" className={input} />
        <textarea name="message" placeholder={t({ en: "Dates, questions, anything else (optional)", es: "Fechas, dudas o cualquier otra cosa (opcional)" })} className={`${input} sm:col-span-2`} rows={3} />
      </div>
      <label className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t({ en: "I agree that RuralRiver can store these details to answer my request (GDPR). We never share them.", es: "Acepto que RuralRiver guarde estos datos para responder a mi solicitud (RGPD). Nunca los compartimos." })}
      </label>
      {state === "error" && <p className="mt-2 text-sm text-chestnut">{error}</p>}
      <button disabled={state === "sending"} className="mt-4 rounded-full bg-moss px-6 py-2.5 text-sm font-semibold text-on-moss hover:opacity-90 disabled:opacity-50">
        {state === "sending" ? t({ en: "Sending…", es: "Enviando…" }) : t({ en: "Send request", es: "Enviar solicitud" })}
      </button>
    </form>
  );
}

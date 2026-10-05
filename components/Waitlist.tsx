"use client";

import { useState } from "react";
import { tx, type Lang, type T } from "@/lib/i18n";
import { INTERESTS, type InterestId } from "@/lib/waitlist";

export default function Waitlist({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const [interests, setInterests] = useState<InterestId[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");
  const [error, setError] = useState("");

  const toggle = (id: InterestId) => setInterests((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), email: f.get("email"), message: f.get("message"), interests, consent: f.get("consent") === "on", website: f.get("website"), lang }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) setState(data.already ? "already" : "sent");
    else {
      setError(res?.status === 400 ? t({ en: "Please add your name, a valid email and your consent.", es: "Añade tu nombre, un email válido y tu consentimiento." }) : t({ en: "Something went wrong. Please try again later.", es: "Algo ha fallado. Inténtalo de nuevo más tarde." }));
      setState("error");
    }
  }

  if (state === "sent" || state === "already") {
    return (
      <div className="rounded-3xl border-2 border-moss bg-moss/15 p-6 sm:p-8" role="status">
        <p className="text-xl font-semibold">
          {state === "sent" ? t({ en: "You're on the waiting list. Thank you!", es: "Ya estás en la lista de espera. ¡Gracias!" }) : t({ en: "You're already on the waiting list.", es: "Ya estabas en la lista de espera." })}
        </p>
        <p className="mt-2 text-ink-soft">{t({ en: "We'll write to you first when stays, events and land leases open in San Xoán de Río.", es: "Te escribiremos antes que a nadie cuando abran las estancias, los eventos y los arrendamientos de tierra en San Xoán de Río." })}</p>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-line bg-paper px-4 py-2.5";
  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-stone p-6 sm:p-8">
      <h3 className="text-2xl font-semibold">{t({ en: "Join the waiting list", es: "Únete a la lista de espera" })}</h3>
      <p className="mt-1 text-sm text-ink-soft">{t({ en: "Be the first to know when we open, and how you can take part.", es: "Entérate antes que nadie de cuándo abrimos y de cómo puedes participar." })}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input name="name" required autoComplete="name" placeholder={t({ en: "Your name", es: "Tu nombre" })} aria-label={t({ en: "Your name", es: "Tu nombre" })} className={input} />
        <input name="email" type="email" required autoComplete="email" placeholder="Email" aria-label="Email" className={input} />
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold">{t({ en: "What interests you? (optional)", es: "¿Qué te interesa? (opcional)" })}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interests.includes(i.id);
            return (
              <button key={i.id} type="button" aria-pressed={on} onClick={() => toggle(i.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${on ? "border-moss bg-moss text-on-moss" : "border-line bg-paper hover:border-moss"}`}>
                {on ? "✓ " : ""}{t(i.label)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <textarea name="message" rows={3} maxLength={500} placeholder={t({ en: "Anything you'd like to tell us (optional)", es: "Algo que quieras contarnos (opcional)" })} aria-label={t({ en: "Message", es: "Mensaje" })} className={`${input} mt-4`} />

      {/* Honeypot: hidden from people, filled in by bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      <label className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t({ en: "I agree that RuralRiver can store these details to contact me about the project (GDPR). We never share them, and you can ask us to delete them at any time.", es: "Acepto que RuralRiver guarde estos datos para contactarme sobre el proyecto (RGPD). Nunca los compartimos y puedes pedirnos que los borremos cuando quieras." })}
      </label>

      {state === "error" && <p className="mt-2 text-sm text-chestnut" role="alert">{error}</p>}
      <button disabled={state === "sending"} className="mt-4 rounded-full bg-moss px-6 py-2.5 text-sm font-semibold text-on-moss hover:opacity-90 disabled:opacity-50">
        {state === "sending" ? t({ en: "Sending…", es: "Enviando…" }) : t({ en: "Join the waiting list", es: "Unirme a la lista" })}
      </button>
    </form>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tx, type Lang, type T } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: Record<Lang, string[]> = {
  en: [
    "What can we do in winter with two kids?",
    "How much is a birthday for 30 people with octopus and a gaiteiro?",
    "I'm joining Rural Valley with my startup. How can you help?",
    "I want to plant chestnuts on 5 hectares. How does a lease work?",
    "I have a field nobody uses. What would I earn leasing it for 10 years?",
  ],
  es: [
    "¿Qué podemos hacer en invierno con dos niños?",
    "¿Cuánto cuesta un cumpleaños para 30 con pulpo y gaiteiro?",
    "Vengo a Rural Valley con mi startup, ¿cómo me ayudáis?",
    "Tengo una finca que nadie trabaja, ¿cuánto cobraría arrendándola 10 años?",
    "Quiero poner vacuno ecológico en 20 hectáreas, ¿qué tierra hay?",
  ],
};

// Minimal formatting: **bold**, internal /links and line breaks.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <p key={i} className="min-h-[0.5rem]">
          {line.split(/(\*\*[^*]+\*\*|\/(?:en|es)\/[a-z]+|\/(?:en|es)(?=[\s).,]|$))/g).map((part, j) =>
            part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong>
              : /^\/(en|es)(\/[a-z]+)?$/.test(part) ? <Link key={j} href={part} className="underline">{part}</Link>
                : part,
          )}
        </p>
      ))}
    </>
  );
}

export default function Chat({ lang, initial }: { lang: Lang; initial?: string }) {
  const t = (x: T) => tx(x, lang);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState(initial ?? "");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history, lang }) });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: t({ en: `Sorry, I couldn't reach the concierge. Please try again, or use /${lang}/plan.`, es: `Lo siento, no he podido conectar con el conserje. Inténtalo de nuevo o usa /${lang}/plan.` }) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-[70vh] min-h-[480px] flex-col overflow-hidden rounded-3xl border border-line bg-paper">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <Avatar size={36} />
        <div>
          <p className="font-display font-extrabold leading-tight tracking-[-0.02em]">{t({ en: "RuralRiver concierge", es: "Conserje RuralRiver" })}</p>
          <p className="text-xs text-ink-soft">{t({ en: "AI assistant · a local host confirms every booking", es: "Asistente de IA · un anfitrión local confirma cada reserva" })}</p>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
        {messages.length === 0 && (
          <div>
            <p className="text-ink-soft">{t({ en: "Hi! I'm the RuralRiver concierge, an AI assistant for San Xoán de Río and Terra de Trives. Ask me about stays, events, prices, routes or leasing land for a project. A local person confirms every booking.", es: "¡Hola! Soy el conserje de RuralRiver, un asistente de IA para San Xoán de Río y Terra de Trives. Pregúntame por estancias, eventos, precios, rutas o cómo arrendar tierra para un proyecto. Una persona local confirma cada reserva." })}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS[lang].map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-sm hover:bg-stone">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex items-start gap-2"}>
            {m.role === "assistant" && <Avatar size={28} />}
            <div className={`max-w-[85%] space-y-1 rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-moss text-on-moss" : "bg-stone"}`}>
              {m.content ? <Rich text={m.content} /> : <span className="animate-pulse text-ink-soft">{t({ en: "Thinking…", es: "Pensando…" })}</span>}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t({ en: "Ask about stays, events, prices, routes…", es: "Pregunta por estancias, eventos, precios, rutas…" })} aria-label={t({ en: "Your question", es: "Tu pregunta" })}
          className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5" />
        <button disabled={busy || !input.trim()} className="rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-on-moss hover:opacity-90 disabled:opacity-40">{t({ en: "Send", es: "Enviar" })}</button>
      </form>
    </div>
  );
}

// The brand app icon (public/assets/ruralriver-appicon.png) is the concierge's face.
function Avatar({ size }: { size: number }) {
  return <Image src="/assets/ruralriver-appicon.png" alt="" width={size} height={size} unoptimized className="shrink-0 rounded-lg" />;
}

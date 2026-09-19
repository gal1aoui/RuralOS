import Anthropic from "@anthropic-ai/sdk";
import { DEFAULT_LANG, hasLang, type Lang } from "@/lib/i18n";
import { knowledgeText, searchKnowledge } from "@/lib/knowledge";

const system = (lang: Lang) => `You are the RuralOS concierge for San Xoán de Río and Terra de Trives (Ourense, Galicia). You help visitors plan stays, events and relocations, and you help local owners understand how to rent their houses or land.

How to answer:
- Answer only from the knowledge base below. If something is not covered (opening hours, exact availability, a supplier's quote), say that a local host will confirm it and suggest the Plan my visit questionnaire at /${lang}/plan.
- Prices: quote them as given, in euros, and keep "market price" separate from "our price". Never invent prices, distances or dates.
- Transport: RuralOS never charges for driving guests; it books licensed taxis that guests pay directly. Lodging is booked and paid directly with the host.
- Recommend a concrete next step with its link (packages, events, relocate, experiences or hosts pages under /${lang}/).
- You are an AI assistant. Say so if asked, and remind people that a local person confirms every booking.
- Reply in the visitor's language. The site language is ${lang === "es" ? "Spanish" : "English"}; use it unless they write in another language (Galician is welcome too). Keep answers short: a few sentences or a short list.

# Knowledge base
${knowledgeText(lang)}`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parse(body: unknown): { messages: ChatMessage[]; lang: Lang } | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const rawLang = (body as { lang?: unknown }).lang;
  const lang = typeof rawLang === "string" && hasLang(rawLang) ? rawLang : DEFAULT_LANG;
  const msgs = (body as { messages: unknown[] }).messages
    .filter((m): m is ChatMessage => {
      const r = (m as ChatMessage)?.role;
      return (r === "user" || r === "assistant") && typeof (m as ChatMessage).content === "string";
    })
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  // The API expects the conversation to start with a user turn and end with one.
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  return { messages: msgs, lang };
}

function offlineAnswer(question: string, lang: Lang) {
  const hits = searchKnowledge(question, lang);
  const intro = lang === "es"
    ? "Modo demo sin conexión: el modelo de IA no está conectado, así que aquí tienes las entradas más cercanas de nuestra base de conocimiento local.\n\n"
    : "Offline demo mode: the AI model isn't connected, so here are the closest entries from our local knowledge base.\n\n";
  if (!hits.length) return intro + (lang === "es" ? `No lo he encontrado. Prueba el cuestionario en /${lang}/plan y te responderá un anfitrión local.` : `I couldn't find that. Try the questionnaire at /${lang}/plan and a local host will answer.`);
  return intro + hits.map((h) => `**${h.title}**\n${h.text}${h.link ? ` (→ /${lang}${h.link})` : ""}`).join("\n\n");
}

export async function POST(request: Request) {
  const parsed = parse(await request.json().catch(() => null));
  if (!parsed) return Response.json({ error: "Send { messages: [{ role, content }], lang } ending with a user message." }, { status: 400 });
  const { messages, lang } = parsed;
  const question = messages[messages.length - 1].content;
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteAny = false;
      try {
        const client = new Anthropic();
        const stream = client.beta.messages.stream({
          model: "claude-opus-5",
          max_tokens: 64000,
          output_config: { effort: "low" }, // short, latency-sensitive chat answers
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: [{ type: "text", text: system(lang), cache_control: { type: "ephemeral" } }],
          messages,
        });
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
            wroteAny = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !wroteAny) {
          controller.enqueue(encoder.encode(lang === "es" ? `No puedo ayudarte con eso. Para tu estancia, eventos o mudanza, pregúntame o usa /${lang}/plan.` : `I can't help with that one. For your stay, events or moving here, ask away, or use /${lang}/plan.`));
        }
      } catch (err) {
        console.error("concierge: model unavailable, using offline search", err instanceof Error ? err.message : err);
        if (!wroteAny) controller.enqueue(encoder.encode(offlineAnswer(question, lang)));
      }
      controller.close();
    },
  });

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

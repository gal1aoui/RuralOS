# RuralOS · San Xoán de Río

Hackathon MVP. The brief: a 32-year-old in San Xoán de Río (Ourense, Galicia) has a stone house, 2 ha of land, a car, digital skills, local knowledge and €25k (€5k savings + €20k loan). They must build a profitable business generating more than €100k in 12 months.

RuralOS is a local host business with three revenue engines:

- **Stays**: packages of 1 week (€220), 1 month (€450) or 3 months (€900) per person. Lodging is priced separately: our refitted house, or villagers' houses at a 15% commission.
- **Events**: parties, retreats and magostos on villagers' land (the owner keeps 80% of the venue fee), with an add-on marketplace of local suppliers.
- **Relocation**: €500 onboarding + €99/month, sold to trial guests and to founders at the Rural Valley startup campus.

An **AI concierge** answers from a curated local knowledge base.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

To connect the AI concierge to Claude, set `ANTHROPIC_API_KEY` (or sign in with `ant auth login`). Without credentials, it falls back to keyword search over the same knowledge base, so the demo works offline.

## Languages and themes

- **English and Spanish.** Every page lives under `/en/...` or `/es/...`. `proxy.ts` sends bare URLs to the visitor's saved choice (the `lang` cookie set by the EN/ES switch) or their browser's `Accept-Language`. Content is written once in `lib/data.ts` as `{ en, es }` pairs; `tx(value, lang)` picks the right string.
- **Light and dark mode.** Colours are CSS tokens in `app/globals.css`. Dark follows the system by default; the header toggle cycles system → light → dark and is remembered in `localStorage`. An inline script applies it before first paint, so there's no flash. Chart colours are validated against both backgrounds.

## Pages (under `/en` and `/es`)

| Route | What it is |
|---|---|
| `/plan` | **Step-by-step questionnaire (MVP core)**: purpose → branch questions → recommendation, price breakdown, matching experiences, lead form |
| `/packages` | The three packages, lodging options, add-ons |
| `/experiences` | 19 activities in and around the valley, filterable by season and type |
| `/events` | Live event quote builder + add-on marketplace |
| `/relocate` | Relocation onboarding and subscription |
| `/hosts` | For villagers: rent out a house, land or skills; the outreach plan |
| `/concierge` | AI concierge chat (Claude Opus 5, streaming, prompt-cached knowledge base) |
| `/business` | Business plan for the jury: fixes vs v1, research, budget, interactive 12-month model, timeline, risks, compliance checked against official sources (`#compliance`), sources |
| `/credits` | Licence and attribution for every image |

## Where things live

- `lib/data.ts`: every researched figure (with its source), our own estimates, and the compliance checklist (verified against official sources, September 2026). All text is bilingual. Edit prices and volumes here.
- `lib/i18n.ts`, `lib/lang.ts`, `proxy.ts`: languages, route validation, redirects.
- `lib/model.ts`: the P&L, loan amortisation and cash model.
- `lib/plan.ts`: questionnaire steps and the recommendation logic.
- `lib/event.ts`: event quote logic, shared by `/events` and `/plan`.
- `lib/knowledge.ts`: the concierge knowledge base, built from `lib/data.ts`.
- `lib/images.ts`: image metadata generated from the Wikimedia Commons API (licence, creator, attribution).
- `app/api/concierge`: Claude streaming route with an offline fallback.
- `app/api/leads`: stores questionnaire requests in `.data/leads.json` (MVP only; use a database before deploying to a serverless host).

## Images

All 28 photos come from Wikimedia Commons under CC0, public domain, CC BY or CC BY-SA, all of which allow commercial use. Each photo shows its creator and licence, and `/credits` lists the full attribution. Adapted (resized) versions of CC BY-SA images must keep the same licence.

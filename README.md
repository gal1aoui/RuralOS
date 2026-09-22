# RuralRiver · The Hidden Heaven

Hackathon MVP for San Xoán de Río (Ourense, Galicia). The brief: a 32-year-old with a stone house, 2 ha of land, a car, digital skills, local knowledge and €25k (€5k savings + €20k loan) must build a profitable business generating more than €100k in 12 months.

RuralRiver puts the village's resources to work. Three revenue engines, one local host:

- **Stays**: packages of 1 week (€220), 1 month (€450) or 3 months (€900) per person. Lodging is priced separately: our refitted house, or villagers' houses at a 15% commission.
- **Events**: parties, retreats and magostos on villagers' land (the owner keeps 80% of the venue fee), with an add-on marketplace of local suppliers.
- **Land for agricultural projects**: villagers' abandoned parcels leased for 5–25 years (Ley 49/2003 minimum: 5) to chestnut, organic, cattle, beekeeping and forest projects. Owners keep 85% of the rent; we earn 15% plus a set-up fee and yearly management, and every lease hires locally.

An **AI concierge** answers from a curated local knowledge base. The app is the source of truth for the pitch deck: `GET /api/model` returns every figure the slides use.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

To connect the AI concierge to Claude, set `ANTHROPIC_API_KEY` (or sign in with `ant auth login`). Without credentials, it falls back to keyword search over the same knowledge base, so the demo works offline.

## Languages and themes

- **English and Spanish.** Every page lives under `/en/...` or `/es/...`. `proxy.ts` sends bare URLs to the visitor's saved choice (the `lang` cookie set by the EN/ES switch) or their browser's `Accept-Language`, and redirects the old `/relocate` route to `/land`. Content is written once in `lib/data.ts` and `lib/land.ts` as `{ en, es }` pairs; `tx(value, lang)` picks the right string.
- **Light and dark mode.** Colours are CSS tokens in `app/globals.css`. Dark follows the system by default; the header toggle cycles system → light → dark and is remembered in `localStorage`. An inline script applies it before first paint, so there's no flash. Map tiles are re-tinted in dark mode.

## Pages (under `/en` and `/es`)

| Route | What it is |
|---|---|
| `/plan` | **Step-by-step questionnaire (MVP core)**: purpose (holiday, startup landing, agricultural project, event, local owner, work visit) → branch questions → recommendation, price breakdown, matching experiences, lead form |
| `/packages` | The three packages, lodging options, add-ons |
| `/experiences` | 19 activities in and around the valley, filterable by season and type |
| `/events` | Live event quote builder + add-on marketplace |
| `/land` | **Land for agricultural projects**: researched statistics, a Leaflet map of the municipality (OSM boundary) with example parcels, and a lease builder (parcels × years × project → rent, owner share, fees, local jobs) |
| `/hosts` | For villagers: rent out a house, lease land for years, offer skills; the outreach plan |
| `/concierge` | AI concierge chat (Claude Opus 5, streaming, prompt-cached knowledge base) |
| `/business` | Business plan for the jury: fixes vs v1, research, budget, interactive 12-month model, timeline, risks, compliance checked against official sources (`#compliance`), sources |
| `/credits` | Licence and attribution for every image |

## Where things live

- `lib/data.ts`: every researched figure (with its source), our own estimates, and the compliance checklist. All text is bilingual. Edit prices and volumes here.
- `lib/land.ts`: example parcels (real places, illustrative plots), project types, lease economics (`quoteLease`) and the land statistics with sources.
- `lib/geo/san-xoan-de-rio.json`: the municipal boundary and hamlet coordinates from OpenStreetMap (Nominatim), fetched once.
- `lib/i18n.ts`, `lib/lang.ts`, `proxy.ts`: languages, route validation, redirects.
- `lib/model.ts`: the P&L, loan amortisation and cash model.
- `lib/plan.ts`: questionnaire steps and the recommendation logic (discover, startup, land, event, host, work).
- `lib/event.ts`: event quote logic, shared by `/events` and `/plan`.
- `lib/knowledge.ts`: the concierge knowledge base, built from `lib/data.ts` and `lib/land.ts`.
- `lib/images.ts`: image metadata generated from the Wikimedia Commons API (licence, creator, attribution).
- `components/Brand.tsx`, `public/assets/ruralriver-*.png`: the logo (the team's design: an R with the river running through it, pines and hills at its foot, and the "Rural River" wordmark), in an off-white variant for dark surfaces and a green one for light surfaces, plus the app icons derived from it.
- `app/api/concierge`: Claude streaming route with an offline fallback.
- `app/api/leads`: stores questionnaire and lease requests in `.data/leads.json` (MVP only; use a database before deploying to a serverless host).
- `app/api/model`: JSON of the whole model for the pitch-deck generator.

## Images

All photos come from Wikimedia Commons under CC0, public domain, CC BY or CC BY-SA, all of which allow commercial use. Each photo shows its creator and licence, and `/credits` lists the full attribution. Adapted (resized) versions of CC BY-SA images must keep the same licence. Map tiles and the boundary are © OpenStreetMap contributors (ODbL).

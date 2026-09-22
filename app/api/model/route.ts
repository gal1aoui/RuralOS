import { BRIEF, BUDGET, CAPEX, FACTS, FIXED_COSTS, LINES, LOAN, MONTHS, PACKAGES, RISKS, SOURCES, TIMELINE } from "@/lib/data";
import { LAND_STATS, LEASE, PARCELS, PROJECTS } from "@/lib/land";
import { computeModel } from "@/lib/model";

// The app is the source of truth for the pitch deck: the deck generator reads this JSON
// so every figure on a slide is the figure the site shows.
export const dynamic = "force-dynamic";

export function GET() {
  const base = computeModel();
  const half = computeModel(Object.fromEntries(LINES.map((l) => [l.id, Math.round(l.volume / 2)])));
  const noEvents = computeModel({ events: 0 });
  const noLand = computeModel({ land: 0, landMgmt: 0 });
  const breakeven = (() => {
    // Smallest uniform scale of all volumes that keeps the year profitable.
    for (let f = 0.05; f <= 1; f += 0.01) {
      const m = computeModel(Object.fromEntries(LINES.map((l) => [l.id, Math.round(l.volume * f)])));
      if (m.profit >= 0) return { factor: Math.round(f * 100) / 100, revenue: m.revenue };
    }
    return { factor: 1, revenue: base.revenue };
  })();
  return Response.json({
    generatedAt: new Date().toISOString(),
    brand: { name: "RuralRiver", tagline: "The Hidden Heaven", place: "San Xoán de Río · Terra de Trives · Ourense" },
    brief: BRIEF, facts: FACTS, packages: PACKAGES, budget: BUDGET, fixedCosts: FIXED_COSTS, capex: CAPEX, loan: LOAN, months: MONTHS, timeline: TIMELINE, risks: RISKS,
    land: { stats: LAND_STATS, lease: LEASE, parcels: PARCELS, projects: PROJECTS, totalHa: PARCELS.reduce((s, p) => s + p.ha, 0) },
    model: base,
    scenarios: { half, noEvents, noLand, breakeven },
    sources: SOURCES,
  });
}

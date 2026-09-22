"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { CircleMarker, Map as LeafletMap } from "leaflet";
import geo from "@/lib/geo/san-xoan-de-rio.json";
import { KIND_COLORS, KIND_LABELS, LEASE, PARCELS, PROJECTS, quoteLease, type ProjectId } from "@/lib/land";
import { eur, tx, type Lang, type T } from "@/lib/i18n";

// Map of San Xoán de Río (OpenStreetMap tiles + the municipality boundary from OSM) with
// example parcels, and a lease builder for agricultural projects that run for years.
export default function LandExplorer({ lang }: { lang: Lang }) {
  const t = (x: T) => tx(x, lang);
  const e = (n: number) => eur(n, lang);
  const [selected, setSelected] = useState<string[]>(["cambela"]);
  const [project, setProject] = useState<ProjectId>("cattle");
  const [years, setYears] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState("");
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markers = useRef<Record<string, CircleMarker>>({});
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  // Build the map once, on the client only.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      const map = L.map(mapEl.current, { scrollWheelZoom: false, attributionControl: true });
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 17, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
      const boundary = L.geoJSON(geo.boundary as GeoJSON.GeoJsonObject, { style: { color: "#2f5d4a", weight: 2, fillColor: "#a7c049", fillOpacity: 0.08, dashArray: "6 4" } }).addTo(map);
      map.fitBounds(boundary.getBounds(), { padding: [12, 12] });
      for (const p of PARCELS) {
        const m = L.circleMarker([p.lat, p.lng], { radius: 9, color: "#f3f6f0", weight: 2, fillColor: KIND_COLORS[p.kind], fillOpacity: 0.95 }).addTo(map);
        m.bindTooltip(`${tx(p.name, lang)} · ${p.ha} ha`, { direction: "top", offset: [0, -8] });
        m.on("click", () => toggle(p.id));
        markers.current[p.id] = m;
      }
      L.circleMarker([geo.centre[0], geo.centre[1]], { radius: 4, color: "#16211b", weight: 1, fillColor: "#16211b", fillOpacity: 1 }).addTo(map).bindTooltip("San Xoán de Río", { permanent: true, direction: "right", offset: [6, 0], className: "rr-label" });
      restyle(selectedRef.current);
    })();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; markers.current = {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restyle(sel: string[]) {
    for (const [id, m] of Object.entries(markers.current)) {
      const on = sel.includes(id);
      m.setStyle({ radius: on ? 12 : 9, color: on ? "#16211b" : "#f3f6f0", weight: on ? 3 : 2 });
      if (on) m.bringToFront();
    }
  }
  useEffect(() => restyle(selected), [selected]);

  const quote = useMemo(() => quoteLease({ parcelIds: selected, years, project, lang }), [selected, years, project, lang]);
  const pr = PROJECTS.find((p) => p.id === project)!;
  const tooSmall = quote.ha > 0 && quote.ha < pr.minHa;

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, consent, plan: { kind: "lease", project, years, parcels: selected, ha: quote.ha, annualRent: quote.annualRent, termTotal: quote.termTotal, lang } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReference(data.reference);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <div ref={mapEl} className="h-[420px] w-full overflow-hidden rounded-2xl border border-line bg-stone sm:h-[520px]" role="region" aria-label={t({ en: "Map of San Xoán de Río with example parcels", es: "Mapa de San Xoán de Río con fincas de ejemplo" })} />
        <p className="mt-2 text-xs text-ink-soft">{t({ en: "Dashed line: municipal boundary (OpenStreetMap). Dots: example parcels, colour by type. Click a dot to add it to your project. Real listings need each owner's written consent; these illustrate the kind of land the village has.", es: "Línea discontinua: límite municipal (OpenStreetMap). Puntos: fincas de ejemplo, color por tipo. Pulsa un punto para añadirlo a tu proyecto. Las fincas reales requieren el consentimiento escrito de cada propietario; estas ilustran el tipo de tierra que tiene el pueblo." })}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {(Object.keys(KIND_LABELS) as (keyof typeof KIND_LABELS)[]).map((k) => (
            <li key={k} className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full border border-paper" style={{ background: KIND_COLORS[k] }} />{t(KIND_LABELS[k])}</li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {PARCELS.map((p) => {
            const on = selected.includes(p.id);
            return (
              <li key={p.id}>
                <button type="button" onClick={() => toggle(p.id)} aria-pressed={on} className={`w-full rounded-2xl border p-4 text-left transition ${on ? "border-moss bg-moss/10 shadow-sm" : "border-line hover:bg-stone"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{t(p.name)}</p>
                      <p className="text-xs text-ink-soft">{p.place} · {p.altitude} m · {t(KIND_LABELS[p.kind])}</p>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-on-accent" style={{ background: KIND_COLORS[p.kind] }}>{p.ha} ha</span>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-ink-soft">
                    <dt>{t({ en: "Water", es: "Agua" })}</dt><dd>{t(p.water)}</dd>
                    <dt>{t({ en: "Access", es: "Acceso" })}</dt><dd>{t(p.access)}</dd>
                    <dt>{t({ en: "Slope", es: "Pendiente" })}</dt><dd>{t(p.slope)}</dd>
                    <dt>{t({ en: "Unused since", es: "Sin uso desde" })}</dt><dd>{p.unusedSince}</dd>
                    <dt>{t({ en: "Owners", es: "Propietarios" })}</dt><dd>{t(p.owners)}</dd>
                    <dt>{t({ en: "Rent", es: "Canon" })}</dt><dd>{e(p.rentPerHa)}/ha/{t({ en: "year", es: "año" })} · {t({ en: "estimate", es: "estimación" })}</dd>
                  </dl>
                  <p className="mt-2 text-xs">{t({ en: "Suits", es: "Encaja con" })}: {p.suggested.map((s) => `${PROJECTS.find((x) => x.id === s)!.icon} ${t(PROJECTS.find((x) => x.id === s)!.label)}`).join(" · ")}</p>
                  {p.note && <p className="mt-1 text-xs text-ink-soft">{t(p.note)}</p>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <form onSubmit={submit} className="self-start rounded-3xl bg-moss-deep p-6 text-on-accent lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Lease builder", es: "Configura tu arrendamiento" })}</p>
        <label className="mt-4 block text-sm">
          <span className="font-semibold">{t({ en: "Project", es: "Proyecto" })}</span>
          <select value={project} onChange={(ev) => setProject(ev.target.value as ProjectId)} className="mt-1 w-full rounded-xl border border-on-accent/20 bg-on-accent/10 px-3 py-2 text-on-accent">
            {PROJECTS.map((p) => <option key={p.id} value={p.id} className="text-ink">{p.icon} {t(p.label)}</option>)}
          </select>
        </label>
        <p className="mt-1 text-xs text-on-accent/70">{t(pr.blurb)}</p>
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">{t({ en: "Term", es: "Duración" })}</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {LEASE.terms.map((y) => (
              <button key={y} type="button" onClick={() => setYears(y)} aria-pressed={years === y} className={`rounded-full px-3 py-1 text-sm ${years === y ? "bg-sun font-semibold text-on-sun" : "bg-on-accent/10 hover:bg-on-accent/20"}`}>{y} {t({ en: "years", es: "años" })}</button>
            ))}
          </div>
          <p className="mt-1 text-xs text-on-accent/70">{t({ en: "Five years is the legal minimum (Ley 49/2003). Not days, not months.", es: "Cinco años es el mínimo legal (Ley 49/2003). Ni días ni meses." })}</p>
        </fieldset>

        <div className="mt-5 rounded-2xl bg-on-accent/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">{t({ en: "Live quote", es: "Presupuesto al momento" })}</p>
          <p className="mt-1 font-display text-4xl font-semibold">{e(quote.annualRent)}<span className="text-base font-normal text-on-accent/70"> / {t({ en: "year", es: "año" })}</span></p>
          <p className="text-sm text-on-accent/80">{selected.length} {t({ en: "parcel(s)", es: "finca(s)" })} · {quote.ha.toFixed(1)} ha · {t({ en: "rent, all owners", es: "canon, todos los propietarios" })}</p>
          {tooSmall && <p className="mt-2 rounded-lg bg-sun/20 px-2 py-1 text-xs">{t({ en: `This project usually needs at least ${pr.minHa} ha. Add parcels.`, es: `Este proyecto suele necesitar al menos ${pr.minHa} ha. Añade fincas.` })}</p>}
          <ul className="mt-3 divide-y divide-on-accent/15 text-sm">
            {quote.rows.map((r) => (
              <li key={r.label} className="flex items-start justify-between gap-3 py-2">
                <span>{r.label}<span className="block text-xs text-on-accent/60">→ {r.to}{r.perYear ? ` · ${t({ en: "per year", es: "al año" })}` : ` · ${t({ en: "once", es: "una vez" })}`}</span></span>
                <span className="whitespace-nowrap font-semibold">{r.estimate ? "≈" : ""}{e(r.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: "Year 1, all in", es: "Año 1, todo incluido" })}</p><p className="font-display text-xl font-semibold">{e(quote.firstYear)}</p></div>
            <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: `Over ${years} years`, es: `En ${years} años` })}</p><p className="font-display text-xl font-semibold">{e(quote.termTotal)}</p></div>
            <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: "Owners receive / year", es: "Propietarios cobran / año" })}</p><p className="font-display text-xl font-semibold">{e(quote.ownerYear)}</p></div>
            <div className="rounded-xl bg-on-accent/10 p-3"><p className="text-on-accent/70">{t({ en: "Local jobs (estimate)", es: "Empleo local (estimación)" })}</p><p className="font-display text-xl font-semibold">{quote.jobs} <span className="text-sm font-normal">{t({ en: "FTE", es: "ETC" })}</span> + {quote.seasonal} <span className="text-sm font-normal">{t({ en: "seasonal", es: "temporada" })}</span></p></div>
          </div>
          <p className="mt-2 text-xs text-on-accent/60">{t({ en: "Rents are our estimates around Galicia's €172/ha average (MAPA, 2023); owners set the final figure. Jobs use per-hectare ratios by project type.", es: "Los cánones son estimaciones en torno a la media gallega de 172 €/ha (MAPA, 2023); la cifra final la fija cada propietario. El empleo usa ratios por hectárea según el tipo de proyecto." })}</p>
        </div>

        {status === "sent" ? (
          <p className="mt-4 rounded-xl bg-sun/20 p-3 text-sm">{t({ en: `Request sent (ref. ${reference}). We'll call the owners and come back within a week with what's really available.`, es: `Solicitud enviada (ref. ${reference}). Llamamos a los propietarios y te decimos en una semana qué hay realmente disponible.` })}</p>
        ) : (
          <div className="mt-4 grid gap-2 text-sm">
            <input required value={name} onChange={(ev) => setName(ev.target.value)} placeholder={t({ en: "Your name or company", es: "Tu nombre o empresa" })} className="rounded-xl border border-on-accent/20 bg-on-accent/10 px-3 py-2 placeholder:text-on-accent/50" />
            <input required type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="email" className="rounded-xl border border-on-accent/20 bg-on-accent/10 px-3 py-2 placeholder:text-on-accent/50" />
            <label className="flex items-start gap-2 text-xs text-on-accent/80"><input type="checkbox" required checked={consent} onChange={(ev) => setConsent(ev.target.checked)} className="mt-0.5" />{t({ en: "RuralRiver may store these details to answer this request (GDPR). We never share them.", es: "RuralRiver puede guardar estos datos para responder a esta solicitud (RGPD). Nunca los compartimos." })}</label>
            <button type="submit" disabled={status === "sending" || selected.length === 0} className="rounded-full bg-on-accent px-5 py-2.5 font-semibold text-on-sun disabled:opacity-50">{status === "sending" ? "…" : t({ en: "Request this lease →", es: "Solicitar este arrendamiento →" })}</button>
            {status === "error" && <p className="text-xs text-sun">{t({ en: "Something went wrong. Try again.", es: "Algo ha fallado. Inténtalo de nuevo." })}</p>}
          </div>
        )}
      </form>
    </div>
  );
}

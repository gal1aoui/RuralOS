import { readFileSync } from "node:fs";
import path from "node:path";

// The mark is read from the brand asset itself (public/assets/ruralos-mark.svg) so there
// is one source of truth. Its fixed colours become theme tokens: the rings follow
// `currentColor`, the dot follows --brand-dot (lime #6F8A18 on light, #A7C049 on dark).
const MARK = readFileSync(path.join(process.cwd(), "public/assets/ruralos-mark.svg"), "utf8")
  .replace(/<svg[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" aria-hidden="true" width="100%" height="100%">')
  .replaceAll('stroke="#2F5D4A"', 'stroke="currentColor"')
  .replaceAll('fill="#6F8A18"', 'fill="var(--brand-dot)"');

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return <span className={`inline-block shrink-0 ${className}`} dangerouslySetInnerHTML={{ __html: MARK }} />;
}

// Mirrors ruralos-wordmark-reversed.svg: Bricolage Grotesque 800, tight tracking,
// "OS" in sage. Colours come from --wordmark / --wordmark-os so the reversed
// palette (#F3F6F0 + #77B393) is used automatically on dark backgrounds.
export function Wordmark({ className = "text-2xl", reversed = false }: { className?: string; reversed?: boolean }) {
  return (
    <span className={`font-display font-extrabold tracking-[-0.034em] ${className}`} style={{ color: reversed ? "#F3F6F0" : "var(--wordmark)" }}>
      Rural<span style={{ color: reversed ? "#77B393" : "var(--wordmark-os)" }}>OS</span>
    </span>
  );
}

export function Logo({ reversed = false, size = "md" }: { reversed?: boolean; size?: "md" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2" style={reversed ? { color: "#F3F6F0", ["--brand-dot" as string]: "#A7C049" } : { color: "var(--wordmark)" }}>
      <Mark className={size === "lg" ? "h-10 w-10" : "h-8 w-8"} />
      <Wordmark reversed={reversed} className={size === "lg" ? "text-3xl" : "text-2xl"} />
    </span>
  );
}

import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// Brand assets are derived from the team's logo (an R with the river running through it,
// pines and hills at its foot, and the "Rural River" wordmark), see public/assets:
//   ruralriver-logo.png        horizontal lockup, off-white, for dark surfaces
//   ruralriver-logo-green.png  the same recoloured in brand green, for light surfaces
//   ruralriver-mark*.png       the R alone, same two variants
// Both variants are rendered and CSS shows the one that matches the theme
// (--show-on-light / --show-on-dark in globals.css), so the switch needs no JavaScript.

function dims(file: string) {
  // PNG IHDR: width and height are big-endian at bytes 16 and 20.
  const b = readFileSync(path.join(process.cwd(), "public/assets", file));
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
const LOGO = dims("ruralriver-logo.png");
const MARK = dims("ruralriver-mark.png");

function Themed({ light, dark, alt, height, className = "" }: { light: string; dark: string; alt: string; height: number; className?: string }) {
  const ratio = light.includes("mark") ? MARK.w / MARK.h : LOGO.w / LOGO.h;
  const width = Math.round(height * ratio);
  const common = { alt, width, height, unoptimized: true, priority: true, className: `h-auto ${className}`, style: { height, width: "auto" } };
  return (
    <>
      <Image src={light} {...common} alt={alt} className={`${common.className} [display:var(--show-on-light)]`} />
      <Image src={dark} {...common} alt={alt} className={`${common.className} [display:var(--show-on-dark)]`} />
    </>
  );
}

export function Mark({ height = 32, reversed = false }: { height?: number; reversed?: boolean }) {
  if (reversed) return <Image src="/assets/ruralriver-mark.png" alt="" width={Math.round(height * MARK.w / MARK.h)} height={height} unoptimized style={{ height, width: "auto" }} />;
  return <Themed light="/assets/ruralriver-mark-green.png" dark="/assets/ruralriver-mark.png" alt="" height={height} />;
}

// Text fallback for places that need the name without the image (keeps the two-word wordmark).
export function Wordmark({ className = "text-2xl", reversed = false }: { className?: string; reversed?: boolean }) {
  return (
    <span className={`font-display font-extrabold tracking-[-0.02em] ${className}`} style={{ color: reversed ? "#F3F6F0" : "var(--wordmark)" }}>
      Rural <span style={{ color: reversed ? "#5BBCF5" : "var(--wordmark-river)" }}>River</span>
    </span>
  );
}

export function Logo({ reversed = false, size = "md" }: { reversed?: boolean; size?: "md" | "lg" }) {
  const height = size === "lg" ? 52 : 40;
  if (reversed) return <Image src="/assets/ruralriver-logo.png" alt="Rural River" width={Math.round(height * LOGO.w / LOGO.h)} height={height} unoptimized style={{ height, width: "auto" }} />;
  return <span className="inline-flex items-center"><Themed light="/assets/ruralriver-logo-green.png" dark="/assets/ruralriver-logo.png" alt="Rural River" height={height} /></span>;
}

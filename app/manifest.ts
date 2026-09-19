import type { MetadataRoute } from "next";

// Installable web app manifest, using the brand app icon from public/assets.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RuralOS · San Xoán de Río",
    short_name: "RuralOS",
    description: "Stays, private events and relocation in San Xoán de Río (Galicia), with a local host and an AI concierge.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F6F0",
    theme_color: "#2F5D4A",
    icons: [
      { src: "/assets/ruralos-appicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

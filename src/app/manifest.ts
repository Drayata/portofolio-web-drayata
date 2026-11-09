import type { MetadataRoute } from "next";
import { profile, seo } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${seo.siteName} — ${profile.name} Portfolio`,
    short_name: seo.siteName,
    description: `Portfolio of ${profile.name} (${seo.siteName}), ${profile.role}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#06070A",
    theme_color: "#06070A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

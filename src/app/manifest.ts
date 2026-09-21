import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Indra Surya Adinata — Portfolio",
    short_name: "ISA Portfolio",
    description: "Portfolio of Indra Surya Adinata, Web Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070A",
    theme_color: "#06070A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

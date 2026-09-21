import type { MetadataRoute } from "next";
import { projects, seo } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/resume"];
  return [
    ...staticRoutes.map((route) => ({ url: `${seo.url}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...projects.map((project) => ({ url: `${seo.url}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

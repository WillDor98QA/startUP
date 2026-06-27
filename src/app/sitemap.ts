import type { MetadataRoute } from "next";
import { CASE_STUDIES, INSIGHTS } from "@/lib/content";

const BASE = "https://kova.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/solutions",
    "/projects",
    "/industries",
    "/process",
    "/about",
    "/insights",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projects = CASE_STUDIES.map((c) => ({
    url: `${BASE}/projects/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insights = INSIGHTS.map((a) => ({
    url: `${BASE}/insights/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...projects, ...insights];
}

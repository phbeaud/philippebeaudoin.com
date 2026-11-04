import type { MetadataRoute } from "next";

const BASE = "https://www.philippebeaudoin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "", priority: 1 },
    { path: "/conferences", priority: 0.9 },
    { path: "/formations-sur-mesure", priority: 0.9 },
    { path: "/formations", priority: 0.8 },
    { path: "/clienteles", priority: 0.8 },
    { path: "/test-styles", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}

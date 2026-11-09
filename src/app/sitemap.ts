import type { MetadataRoute } from "next";
import { allSlugs } from "./test-styles/resultat/profiles";

const BASE = "https://www.philippebeaudoin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "", priority: 1 },
    { path: "/conferences", priority: 0.9 },
    { path: "/formations-sur-mesure", priority: 0.9 },
    { path: "/formations", priority: 0.8 },
    { path: "/clienteles", priority: 0.8 },
    { path: "/profils-nova-mbti", priority: 0.8 },
    { path: "/test-styles", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/confidentialite", priority: 0.3 },
    ...allSlugs().map((slug) => ({ path: `/test-styles/resultat/${slug}`, priority: 0.5 })),
  ].map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}

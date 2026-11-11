import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/tableau-de-bord", "/g/"] },
    sitemap: "https://www.philippebeaudoin.com/sitemap.xml",
  };
}

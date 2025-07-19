import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/poems/",
    },
    sitemap: "https://orpheus.krishg.com/sitemap.xml",
  };
}

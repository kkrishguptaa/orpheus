import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://orpheus.krishg.com",
    sitemap: "https://orpheus.krishg.com/sitemap.xml",
  };
}

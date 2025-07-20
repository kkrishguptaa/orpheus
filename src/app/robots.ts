import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://orpheus.krishg.com"
    ).toString(),
    sitemap: `${new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/sitemap.xml`
        : "https://orpheus.krishg.com"
    ).toString()}/sitemap.xml`,
  };
}

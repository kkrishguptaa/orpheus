import type { MetadataRoute } from "next";
import { getPoems } from "./poems/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const poems = await getPoems();

  return [
    {
      url: "https://orpheus.krishg.com",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1.0,
    },
    {
      url: "https://orpheus.krishg.com/poems",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    ...poems.map((poem) => ({
      url: `https://orpheus.krishg.com/poems/${poem.slug}`,
      lastModified: poem.frontmatter.date,
      changeFrequency: "never" as const,
      priority: 0.8,
    })),
  ];
}

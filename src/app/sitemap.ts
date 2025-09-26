import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const poems = await getPoems();

  return [
    {
      url: 'https://poems.krishg.com',
      changeFrequency: 'never',
      priority: 1.0,
    },
    // ...poems.map((poem) => ({
    //   url: `https://poems.krishg.com/${poem.slug}`,
    //   lastModified: poem.frontmatter.date,
    //   changeFrequency: "never" as const,
    //   priority: 0.8,
    // })),
  ];
}

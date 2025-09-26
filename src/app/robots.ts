import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://poems.krishg.com',
    sitemap: 'https://poems.krishg.com/sitemap.xml',
  };
}

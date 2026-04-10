import type { MetadataRoute } from 'next';
import { STATIC_ARTICLES } from '@/data/articles';
import { getArticleSlugs } from '@/sanity/lib/fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://womeninfocus.ng';
  const now = new Date().toISOString();

  // Static pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/survey`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Static article pages
  for (const article of STATIC_ARTICLES) {
    pages.push({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.publishedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // CMS article pages
  try {
    const cmsSlugs = await getArticleSlugs();
    for (const slug of cmsSlugs) {
      pages.push({
        url: `${baseUrl}/articles/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  } catch {
    // Sanity not configured — skip CMS articles
  }

  return pages;
}

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { calculators, guides, hubs, products, listicles } from '#site/content';

// Fixed content dates for sitemap freshness signals (not rebuild dates)
const CONTENT_DATES = {
  site: new Date('2026-03-29'),
  about: new Date('2026-03-20'),
  editorial: new Date('2026-03-20'),
  privacy: new Date('2026-03-15'),
  authors: new Date('2026-03-20'),
  calculators: new Date('2026-03-29'),
  guides: new Date('2026-03-29'),
  hubs: new Date('2026-03-27'),
  compare: new Date('2026-03-27'),
  glossary: new Date('2026-03-27'),
  howWeRank: new Date('2026-03-20'),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: CONTENT_DATES.site,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: CONTENT_DATES.about,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-standards`,
      lastModified: CONTENT_DATES.editorial,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: CONTENT_DATES.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/authors/editorial-team`,
      lastModified: CONTENT_DATES.authors,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: CONTENT_DATES.calculators,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: CONTENT_DATES.guides,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hubs`,
      lastModified: CONTENT_DATES.hubs,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: CONTENT_DATES.compare,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: CONTENT_DATES.glossary,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-we-rank`,
      lastModified: CONTENT_DATES.howWeRank,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: CONTENT_DATES.calculators,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const hubRoutes: MetadataRoute.Sitemap = hubs.map((hub) => ({
    url: `${baseUrl}/hubs/${hub.slug}`,
    lastModified: CONTENT_DATES.hubs,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/compare/${p.category}`,
    lastModified: new Date(p.lastVerified),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const listicleRoutes: MetadataRoute.Sitemap = listicles.map((l) => ({
    url: `${baseUrl}/compare/best/${l.slug}`,
    lastModified: new Date(l.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...guideRoutes, ...hubRoutes, ...comparisonRoutes, ...listicleRoutes];
}

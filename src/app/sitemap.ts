import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { calculators, guides, hubs, products, listicles } from '#site/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-standards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/authors/editorial-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hubs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-we-rank`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
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
    lastModified: new Date(),
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

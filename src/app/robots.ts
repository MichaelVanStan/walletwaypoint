import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/go/'],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap/core.xml`,
      `${siteConfig.url}/sitemap/paycheck.xml`,
      `${siteConfig.url}/sitemap/state-taxes.xml`,
      `${siteConfig.url}/sitemap/homebuyer.xml`,
      `${siteConfig.url}/sitemap/city-rent.xml`,
    ],
  };
}

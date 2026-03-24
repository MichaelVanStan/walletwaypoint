import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createMetadata({
  title,
  description,
  path,
  ogImage,
  ...overrides
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
} & Partial<Metadata>): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: ogImage || siteConfig.ogImage }],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...overrides.twitter,
    },
    alternates: {
      canonical: url,
    },
    ...overrides,
  };
}

import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createMetadata({
  title,
  description,
  path,
  ogImage,
  ogType,
  ...overrides
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
} & Partial<Metadata>): Metadata {
  const url = `${siteConfig.url}${path}`;
  const generatedOgImage = `${siteConfig.url}/og?title=${encodeURIComponent(title)}&type=${ogType || 'default'}`;
  const ogImageUrl = ogImage || generatedOgImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      ...overrides.twitter,
    },
    alternates: {
      canonical: url,
    },
    ...overrides,
  };
}

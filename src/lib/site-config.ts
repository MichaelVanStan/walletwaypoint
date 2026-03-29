export const siteConfig = {
  name: 'WalletWaypoint',
  tagline: 'Your next financial milestone starts here',
  description:
    'Interactive calculators, top picks, and educational guides for every life stage.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://walletwaypoint.com',
  ogImage: '/og.png',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  author: {
    name: 'WalletWaypoint Editorial Team',
    role: 'Editorial Team',
    slug: 'editorial-team',
  },
} as const;

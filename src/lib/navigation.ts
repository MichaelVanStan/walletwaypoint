import type { NavItem, FooterNavigation } from '@/types';

export const mainNavigation: NavItem[] = [
  {
    title: 'Calculators',
    href: '/calculators',
    description: 'Interactive financial calculators',
    disabled: true,
    children: [
      {
        title: 'Mortgage Calculator',
        href: '/calculators/mortgage',
        description: 'Calculate monthly mortgage payments and amortization',
        disabled: true,
      },
      {
        title: 'Rent Affordability',
        href: '/calculators/rent-affordability',
        description: 'Find out how much rent you can afford',
        disabled: true,
      },
      {
        title: 'Compound Interest',
        href: '/calculators/compound-interest',
        description: 'See how your savings grow over time',
        disabled: true,
      },
    ],
  },
  {
    title: 'Guides',
    href: '/guides',
    description: 'Educational financial guides',
  },
  {
    title: 'Life Stage Hubs',
    href: '/hubs',
    description: 'Financial tools organized by life stage',
  },
  {
    title: 'Glossary',
    href: '/glossary',
    description: 'Financial terms explained',
  },
  {
    title: 'Compare',
    href: '/compare',
    description: 'Side-by-side product comparisons',
    disabled: true,
  },
];

export const footerNavigation: FooterNavigation = {
  tools: [
    {
      title: 'Calculators',
      href: '/calculators',
      disabled: true,
    },
    {
      title: 'Comparisons',
      href: '/compare',
      disabled: true,
    },
  ],
  learn: [
    {
      title: 'Guides',
      href: '/guides',
    },
    {
      title: 'Life Stage Hubs',
      href: '/hubs',
    },
    {
      title: 'Glossary',
      href: '/glossary',
    },
  ],
  company: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Editorial Standards',
      href: '/editorial-standards',
    },
  ],
  legal: [
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      title: 'Terms of Use',
      href: '/terms',
    },
    {
      title: 'Affiliate Disclosure',
      href: '/editorial-standards#affiliate-disclosure',
    },
  ],
};

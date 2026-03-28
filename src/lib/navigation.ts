import type { NavItem, FooterNavigation } from '@/types';

export const mainNavigation: NavItem[] = [
  {
    title: 'Your Journey',
    href: '/hubs',
    description: 'Financial tools and guides for where you are in life',
  },
  {
    title: 'Calculators',
    href: '/calculators',
    description: 'Interactive financial calculators',
    children: [
      {
        title: 'Mortgage Calculator',
        href: '/calculators/mortgage',
        description: 'Calculate monthly mortgage payments and amortization',
      },
      {
        title: 'Rent Affordability',
        href: '/calculators/rent-affordability',
        description: 'Find out how much rent you can afford',
      },
      {
        title: 'Compound Interest',
        href: '/calculators/compound-interest',
        description: 'See how your savings grow over time',
      },
    ],
  },
  {
    title: 'Guides',
    href: '/guides',
    description: 'Educational financial guides',
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
    children: [
      {
        title: 'Credit Cards',
        href: '/compare/credit-cards',
        description: 'Compare credit card rewards, fees, and rates',
      },
      {
        title: 'Personal Loans',
        href: '/compare/personal-loans',
        description: 'Compare personal loan rates and terms',
      },
      {
        title: 'Savings & CDs',
        href: '/compare/savings-accounts',
        description: 'Compare savings account and CD rates',
      },
      {
        title: 'Insurance',
        href: '/compare/insurance',
        description: 'Compare auto and renters insurance',
      },
    ],
  },
];

export const footerNavigation: FooterNavigation = {
  tools: [
    {
      title: 'Calculators',
      href: '/calculators',
    },
    {
      title: 'Comparisons',
      href: '/compare',
    },
  ],
  learn: [
    {
      title: 'Guides',
      href: '/guides',
    },
    {
      title: 'Your Journey',
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
    {
      title: 'How We Rank',
      href: '/how-we-rank',
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

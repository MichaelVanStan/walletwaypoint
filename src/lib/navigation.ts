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
        title: 'View All Calculators',
        href: '/calculators',
        description: 'Browse all 10 interactive financial calculators',
      },
      {
        title: 'Budget Calculator',
        href: '/calculators/budget',
        description: 'Break down your income using the 50/30/20 rule',
      },
      {
        title: 'Compound Interest',
        href: '/calculators/compound-interest',
        description: 'See how your savings grow over time',
      },
      {
        title: 'Loan Repayment',
        href: '/calculators/loan-repayment',
        description: 'See your payoff timeline and how extra payments save you money',
      },
      {
        title: 'Mortgage Payment',
        href: '/calculators/mortgage-payment',
        description: 'See your monthly payment, total interest, and amortization',
      },
      {
        title: 'Rent Affordability',
        href: '/calculators/rent-affordability',
        description: 'Find out how much rent you can afford',
      },
      {
        title: 'Rent vs. Buy',
        href: '/calculators/rent-vs-buy',
        description: 'Compare the total cost of renting versus buying',
      },
      {
        title: 'Retirement',
        href: '/calculators/retirement',
        description: 'Project your retirement savings and see if you are on track',
      },
      {
        title: 'Savings Goal',
        href: '/calculators/savings-goal',
        description: 'Find out how much to save each month to reach your target',
      },
      {
        title: 'Student Loan',
        href: '/calculators/student-loan',
        description: 'Compare standard, graduated, and income-driven repayment plans',
      },
      {
        title: 'Tax Estimator',
        href: '/calculators/tax-estimator',
        description: 'Estimate your federal tax liability by income and filing status',
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
    title: 'Top Picks',
    href: '/compare',
    description: 'Our top picks for financial products',
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
      {
        title: 'Auto Insurance',
        href: '/compare/auto-insurance',
        description: 'Compare auto insurance rates and coverage',
      },
      {
        title: 'Life Insurance',
        href: '/compare/life-insurance',
        description: 'Compare life insurance policies and rates',
      },
      {
        title: 'Investments',
        href: '/compare/investment-platforms',
        description: 'Compare investment platforms and brokerages',
      },
      {
        title: 'Tax Software',
        href: '/compare/tax-software',
        description: 'Compare tax filing software',
      },
      {
        title: 'Best Picks',
        href: '/compare/best',
        description: 'Our curated best-of lists',
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
      title: 'Top Picks',
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

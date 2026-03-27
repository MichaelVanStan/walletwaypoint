import type { ReactNode } from 'react';
import type { ProductCategory } from '@/lib/compare/product-types';

export interface StatConfig {
  key: string;
  label: string;
  render?: (value: unknown, product: Record<string, unknown>) => ReactNode;
}

// --- Strip stats: 3 inline stats shown on each horizontal strip ---

const creditCardStripStats: StatConfig[] = [
  {
    key: 'annualFee',
    label: 'Annual Fee',
    render: (v) => (v === 0 ? '$0' : `$${v}`),
  },
  {
    key: 'rewardsRate',
    label: 'Rewards Rate',
  },
  {
    key: 'creditScoreMin',
    label: 'Credit Score',
    render: (v) => `${v}+`,
  },
];

const personalLoanStripStats: StatConfig[] = [
  {
    key: 'aprLow',
    label: 'APR Range',
    render: (_v, p) => `${p.aprLow}%-${p.aprHigh}%`,
  },
  {
    key: 'loanAmountMax',
    label: 'Loan Amount',
    render: (_v, p) =>
      `$${(p.loanAmountMin as number).toLocaleString()}-$${(p.loanAmountMax as number).toLocaleString()}`,
  },
  {
    key: 'termMax',
    label: 'Term',
    render: (_v, p) => `${p.termMin}-${p.termMax} mo`,
  },
];

const savingsStripStats: StatConfig[] = [
  {
    key: 'apy',
    label: 'APY',
    render: (v) => `${v}%`,
  },
  {
    key: 'minimumDeposit',
    label: 'Min. Deposit',
    render: (v) =>
      (v as number) === 0 ? '$0' : `$${(v as number).toLocaleString()}`,
  },
  {
    key: 'accountType',
    label: 'Type',
    render: (v) =>
      v === 'high-yield-savings' ? 'High-Yield Savings' : 'CD',
  },
];

const insuranceStripStats: StatConfig[] = [
  {
    key: 'monthlyPremium',
    label: 'Monthly Premium',
  },
  {
    key: 'coverageLevel',
    label: 'Coverage',
    render: (v) => {
      const labels: Record<string, string> = {
        basic: 'Basic',
        standard: 'Standard',
        premium: 'Premium',
      };
      return labels[v as string] || String(v);
    },
  },
  {
    key: 'deductibleMin',
    label: 'Deductible',
    render: (_v, p) =>
      `$${(p.deductibleMin as number).toLocaleString()}-$${(p.deductibleMax as number).toLocaleString()}`,
  },
];

// --- Detail stats: remaining attributes shown in expanded detail panel ---

const creditCardDetailStats: StatConfig[] = [
  {
    key: 'apr',
    label: 'APR',
  },
  {
    key: 'signupBonus',
    label: 'Signup Bonus',
  },
  {
    key: 'rewardsType',
    label: 'Rewards Type',
    render: (v) => {
      const s = String(v);
      return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
    },
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

const personalLoanDetailStats: StatConfig[] = [
  {
    key: 'originationFee',
    label: 'Origination Fee',
  },
  {
    key: 'creditScoreRange',
    label: 'Credit Score',
    render: (v) => {
      const labels: Record<string, string> = {
        excellent: 'Excellent (750+)',
        good: 'Good (670+)',
        fair: 'Fair (580+)',
      };
      return labels[v as string] || String(v);
    },
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

const savingsDetailStats: StatConfig[] = [
  {
    key: 'termMonths',
    label: 'Term',
    render: (v) => (v == null ? 'None' : `${v} months`),
  },
  {
    key: 'compounding',
    label: 'Compounding',
  },
  {
    key: 'fdic',
    label: 'FDIC',
    render: (v) => (v ? 'Yes' : 'No'),
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

const insuranceDetailStats: StatConfig[] = [
  {
    key: 'insuranceType',
    label: 'Insurance Type',
    render: (v) => {
      const labels: Record<string, string> = {
        auto: 'Auto',
        renters: 'Renters',
      };
      return labels[v as string] || String(v);
    },
  },
  {
    key: 'coverageHighlights',
    label: 'Coverage Highlights',
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

// --- Public API ---

const stripStatsMap: Record<ProductCategory, StatConfig[]> = {
  'credit-cards': creditCardStripStats,
  'personal-loans': personalLoanStripStats,
  'savings-accounts': savingsStripStats,
  insurance: insuranceStripStats,
};

const detailStatsMap: Record<ProductCategory, StatConfig[]> = {
  'credit-cards': creditCardDetailStats,
  'personal-loans': personalLoanDetailStats,
  'savings-accounts': savingsDetailStats,
  insurance: insuranceDetailStats,
};

export function getStripStats(category: ProductCategory): StatConfig[] {
  return stripStatsMap[category];
}

export function getDetailStats(category: ProductCategory): StatConfig[] {
  return detailStatsMap[category];
}

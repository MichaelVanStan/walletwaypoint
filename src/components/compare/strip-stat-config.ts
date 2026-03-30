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

// --- Auto insurance stats ---

const autoInsuranceStripStats: StatConfig[] = [
  {
    key: 'monthlyPremium',
    label: 'Monthly Premium',
  },
  {
    key: 'amBestRating',
    label: 'AM Best Rating',
  },
  {
    key: 'coverageTypes',
    label: 'Coverage',
  },
];

const autoInsuranceDetailStats: StatConfig[] = [
  {
    key: 'deductible',
    label: 'Deductible',
  },
  {
    key: 'discounts',
    label: 'Discounts',
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

// --- Life insurance stats ---

const lifeInsuranceStripStats: StatConfig[] = [
  {
    key: 'policyType',
    label: 'Policy Type',
  },
  {
    key: 'monthlyPremium',
    label: 'Monthly Premium',
  },
  {
    key: 'amBestRating',
    label: 'AM Best Rating',
  },
];

const lifeInsuranceDetailStats: StatConfig[] = [
  {
    key: 'termLength',
    label: 'Term Length',
  },
  {
    key: 'coverageAmount',
    label: 'Coverage Amount',
  },
  {
    key: 'medicalExam',
    label: 'Medical Exam',
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

// --- Investment platforms stats ---

const investmentPlatformsStripStats: StatConfig[] = [
  {
    key: 'commissions',
    label: 'Commissions',
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: (v) =>
      (v as number) === 0 ? '$0' : `$${(v as number).toLocaleString()}`,
  },
  {
    key: 'managementFee',
    label: 'Mgmt Fee',
  },
];

const investmentPlatformsDetailStats: StatConfig[] = [
  {
    key: 'accountTypes',
    label: 'Account Types',
  },
  {
    key: 'features',
    label: 'Features',
  },
  {
    key: 'issuer',
    label: 'Issuer',
  },
];

// --- Tax software stats ---

const taxSoftwareStripStats: StatConfig[] = [
  {
    key: 'priceFree',
    label: 'Free Tier',
  },
  {
    key: 'pricePremium',
    label: 'Premium Price',
  },
  {
    key: 'selfEmployed',
    label: 'Self-Employed',
    render: (v) => (v ? 'Yes' : 'No'),
  },
];

const taxSoftwareDetailStats: StatConfig[] = [
  {
    key: 'stateFiling',
    label: 'State Filing',
  },
  {
    key: 'auditDefense',
    label: 'Audit Defense',
    render: (v) => (v ? 'Yes' : 'No'),
  },
  {
    key: 'importForms',
    label: 'Import Forms',
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
  'auto-insurance': autoInsuranceStripStats,
  'life-insurance': lifeInsuranceStripStats,
  'investment-platforms': investmentPlatformsStripStats,
  'tax-software': taxSoftwareStripStats,
};

const detailStatsMap: Record<ProductCategory, StatConfig[]> = {
  'credit-cards': creditCardDetailStats,
  'personal-loans': personalLoanDetailStats,
  'savings-accounts': savingsDetailStats,
  insurance: insuranceDetailStats,
  'auto-insurance': autoInsuranceDetailStats,
  'life-insurance': lifeInsuranceDetailStats,
  'investment-platforms': investmentPlatformsDetailStats,
  'tax-software': taxSoftwareDetailStats,
};

export function getStripStats(category: ProductCategory): StatConfig[] {
  return stripStatsMap[category];
}

export function getDetailStats(category: ProductCategory): StatConfig[] {
  return detailStatsMap[category];
}

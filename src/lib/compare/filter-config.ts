import type { ProductCategory } from './product-types';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

// Credit card filters (per UI-SPEC Interaction Contract)
const creditCardFilters: FilterConfig[] = [
  {
    id: 'rewards',
    label: 'Rewards Type',
    options: [
      { value: 'all', label: 'All Rewards' },
      { value: 'cash-back', label: 'Cash Back' },
      { value: 'travel', label: 'Travel' },
      { value: 'points', label: 'Points' },
      { value: 'balance-transfer', label: 'Balance Transfer' },
    ],
  },
  {
    id: 'score',
    label: 'Credit Score',
    options: [
      { value: 'all', label: 'All Scores' },
      { value: 'excellent', label: 'Excellent (750+)' },
      { value: 'good', label: 'Good (670-749)' },
      { value: 'fair', label: 'Fair (580-669)' },
    ],
  },
  {
    id: 'fee',
    label: 'Annual Fee',
    options: [
      { value: 'all', label: 'Any Fee' },
      { value: 'no-fee', label: 'No Fee' },
      { value: 'under-100', label: 'Under $100' },
      { value: '100-plus', label: '$100+' },
    ],
  },
];

// Personal loan filters
const personalLoanFilters: FilterConfig[] = [
  {
    id: 'amount',
    label: 'Loan Amount',
    options: [
      { value: 'all', label: 'Any Amount' },
      { value: 'under-5k', label: 'Under $5,000' },
      { value: '5k-15k', label: '$5,000-$15,000' },
      { value: '15k-35k', label: '$15,000-$35,000' },
      { value: '35k-plus', label: '$35,000+' },
    ],
  },
  {
    id: 'score',
    label: 'Credit Score',
    options: [
      { value: 'all', label: 'All Scores' },
      { value: 'excellent', label: 'Excellent (750+)' },
      { value: 'good', label: 'Good (670-749)' },
      { value: 'fair', label: 'Fair (580-669)' },
    ],
  },
  {
    id: 'term',
    label: 'Loan Term',
    options: [
      { value: 'all', label: 'Any Term' },
      { value: '12-24', label: '12-24 months' },
      { value: '36-60', label: '36-60 months' },
      { value: '60-plus', label: '60+ months' },
    ],
  },
];

// Savings account filters
const savingsFilters: FilterConfig[] = [
  {
    id: 'type',
    label: 'Account Type',
    options: [
      { value: 'all', label: 'All Types' },
      { value: 'high-yield-savings', label: 'High-Yield Savings' },
      { value: 'cd', label: 'Certificate of Deposit' },
    ],
  },
  {
    id: 'deposit',
    label: 'Minimum Deposit',
    options: [
      { value: 'all', label: 'Any Minimum' },
      { value: 'no-minimum', label: 'No Minimum' },
      { value: 'under-1k', label: 'Under $1,000' },
      { value: '1k-plus', label: '$1,000+' },
    ],
  },
  {
    id: 'sterm',
    label: 'Term Length',
    options: [
      { value: 'all', label: 'Any Term' },
      { value: 'no-term', label: 'No Term (Savings)' },
      { value: '6-12', label: '6-12 months' },
      { value: '1-3yr', label: '1-3 years' },
      { value: '3yr-plus', label: '3+ years' },
    ],
  },
];

// Insurance filters
const insuranceFilters: FilterConfig[] = [
  {
    id: 'itype',
    label: 'Insurance Type',
    options: [
      { value: 'all', label: 'All Types' },
      { value: 'auto', label: 'Auto Insurance' },
      { value: 'renters', label: 'Renters Insurance' },
    ],
  },
  {
    id: 'coverage',
    label: 'Coverage Level',
    options: [
      { value: 'all', label: 'Any Coverage' },
      { value: 'basic', label: 'Basic' },
      { value: 'standard', label: 'Standard' },
      { value: 'premium', label: 'Premium' },
    ],
  },
  {
    id: 'deductible',
    label: 'Deductible',
    options: [
      { value: 'all', label: 'Any Deductible' },
      { value: 'under-500', label: 'Under $500' },
      { value: '500-1000', label: '$500-$1,000' },
      { value: '1000-plus', label: '$1,000+' },
    ],
  },
];

export const filterConfigs: Record<ProductCategory, FilterConfig[]> = {
  'credit-cards': creditCardFilters,
  'personal-loans': personalLoanFilters,
  'savings-accounts': savingsFilters,
  'insurance': insuranceFilters,
};

// Filter match functions per filter ID
type FilterMatcher = (product: Record<string, unknown>, value: string) => boolean;

const filterMatchers: Record<string, FilterMatcher> = {
  rewards: (p, v) => v === 'all' || p.rewardsType === v,
  score: (p, v) => {
    if (v === 'all') return true;
    return p.creditScoreRange === v;
  },
  fee: (p, v) => {
    if (v === 'all') return true;
    const fee = p.annualFee as number;
    if (v === 'no-fee') return fee === 0;
    if (v === 'under-100') return fee < 100;
    if (v === '100-plus') return fee >= 100;
    return true;
  },
  amount: (p, v) => {
    if (v === 'all') return true;
    const max = p.loanAmountMax as number;
    if (v === 'under-5k') return max < 5000;
    if (v === '5k-15k') return max >= 5000 && max <= 15000;
    if (v === '15k-35k') return max > 15000 && max <= 35000;
    if (v === '35k-plus') return max > 35000;
    return true;
  },
  term: (p, v) => {
    if (v === 'all') return true;
    const max = p.termMax as number;
    if (v === '12-24') return max <= 24;
    if (v === '36-60') return max >= 36 && max <= 60;
    if (v === '60-plus') return max > 60;
    return true;
  },
  type: (p, v) => v === 'all' || p.accountType === v,
  deposit: (p, v) => {
    if (v === 'all') return true;
    const min = p.minimumDeposit as number;
    if (v === 'no-minimum') return min === 0;
    if (v === 'under-1k') return min > 0 && min < 1000;
    if (v === '1k-plus') return min >= 1000;
    return true;
  },
  sterm: (p, v) => {
    if (v === 'all') return true;
    const months = p.termMonths as number | undefined;
    if (v === 'no-term') return months == null;
    if (v === '6-12') return months != null && months >= 6 && months <= 12;
    if (v === '1-3yr') return months != null && months > 12 && months <= 36;
    if (v === '3yr-plus') return months != null && months > 36;
    return true;
  },
  itype: (p, v) => v === 'all' || p.insuranceType === v,
  coverage: (p, v) => v === 'all' || p.coverageLevel === v,
  deductible: (p, v) => {
    if (v === 'all') return true;
    const min = p.deductibleMin as number;
    if (v === 'under-500') return min < 500;
    if (v === '500-1000') return min >= 500 && min <= 1000;
    if (v === '1000-plus') return min > 1000;
    return true;
  },
};

export function applyFilters(
  products: Record<string, unknown>[],
  activeFilters: Record<string, string>,
): Record<string, unknown>[] {
  return products.filter((product) =>
    Object.entries(activeFilters).every(([filterId, value]) => {
      const matcher = filterMatchers[filterId];
      if (!matcher || value === 'all') return true;
      return matcher(product, value);
    }),
  );
}

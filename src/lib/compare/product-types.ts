// Product category slugs (used as YAML filenames and URL params)
export const productCategories = ['credit-cards', 'personal-loans', 'savings-accounts', 'insurance'] as const;
export type ProductCategory = (typeof productCategories)[number];

// Base fields shared by all product items
export interface ProductItemBase {
  id: string;
  name: string;
  issuer: string;
  bestFor?: string;
  affiliateUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  hasAffiliate: boolean;
}

// Category-specific product types (per D-02, AFFIL-02, AFFIL-03)
export interface CreditCardProduct extends ProductItemBase {
  apr: string;            // "21.49%-28.49%" range string
  annualFee: number;      // 0, 95, 250, etc.
  rewardsType: 'cash-back' | 'travel' | 'points' | 'balance-transfer';
  rewardsRate: string;    // "5X on travel, 3X dining, 2X other"
  signupBonus: string;    // "60,000 points after $4,000 in 3 months"
  creditScoreMin: number; // 670, 580, 750, etc.
  creditScoreRange: 'excellent' | 'good' | 'fair';
}

export interface PersonalLoanProduct extends ProductItemBase {
  aprLow: number;         // 5.99
  aprHigh: number;        // 24.99
  loanAmountMin: number;  // 1000
  loanAmountMax: number;  // 100000
  termMin: number;        // 12 months
  termMax: number;        // 84 months
  creditScoreRange: 'excellent' | 'good' | 'fair';
  originationFee: string; // "0%-8%" or "None"
}

export interface SavingsProduct extends ProductItemBase {
  apy: number;            // 4.50
  minimumDeposit: number; // 0, 500, 1000
  accountType: 'high-yield-savings' | 'cd';
  termMonths?: number;    // CD term length (null for savings)
  compounding: string;    // "Daily", "Monthly"
  fdic: boolean;
}

export interface InsuranceProduct extends ProductItemBase {
  insuranceType: 'auto' | 'renters';
  monthlyPremium: string;     // "$45-$120" range string
  coverageLevel: 'basic' | 'standard' | 'premium';
  deductibleMin: number;      // 250
  deductibleMax: number;      // 2000
  coverageHighlights: string; // "Liability, collision, comprehensive"
}

// Union type for any product
export type ProductItem = CreditCardProduct | PersonalLoanProduct | SavingsProduct | InsuranceProduct;

// Category-level data (one per YAML file)
export interface ProductCategoryData {
  category: ProductCategory;
  categoryTitle: string;
  categoryDescription: string;
  lastVerified: string;
  products: ProductItem[];
}

// Sort direction type
export const sortDirections = ['asc', 'desc'] as const;
export type SortDirection = (typeof sortDirections)[number];

// Per-category sort columns
export const creditCardSortColumns = ['name', 'annualFee', 'creditScoreMin'] as const;
export const personalLoanSortColumns = ['name', 'aprLow', 'loanAmountMax', 'termMax'] as const;
export const savingsSortColumns = ['name', 'apy', 'minimumDeposit'] as const;
export const insuranceSortColumns = ['name', 'coverageLevel', 'deductibleMin'] as const;

// CTA labels per category (per UI-SPEC Copywriting Contract)
export const ctaLabels: Record<ProductCategory, string> = {
  'credit-cards': 'Apply Now',
  'personal-loans': 'Check Rates',
  'savings-accounts': 'Open Account',
  'insurance': 'Get Quote',
};

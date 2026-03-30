// Product category slugs (used as YAML filenames and URL params)
export const productCategories = ['credit-cards', 'personal-loans', 'savings-accounts', 'insurance', 'auto-insurance', 'life-insurance', 'investment-platforms', 'tax-software'] as const;
export type ProductCategory = (typeof productCategories)[number];

// Base fields shared by all product items
export interface ProductItemBase {
  id: string;
  name: string;
  issuer: string;
  bestFor?: string;
  imageUrl?: string;
  affiliateUrl: string;
  destinationUrl: string;
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

export interface AutoInsuranceProduct extends ProductItemBase {
  monthlyPremium: string;      // "$85-$150"
  coverageTypes: string;       // "Liability, Collision, Comprehensive"
  deductible: string;          // "$500-$2,000"
  discounts: string;           // "Safe driver, bundling, student"
  amBestRating: string;        // "A+", "A", "A-"
}

export interface LifeInsuranceProduct extends ProductItemBase {
  policyType: string;          // "Term", "Whole", "Universal"
  termLength: string;          // "10, 20, 30 years"
  monthlyPremium: string;      // "$25-$50 for $500K"
  coverageAmount: string;      // "$100K-$10M"
  medicalExam: string;         // "Required", "No exam available"
  amBestRating: string;
}

export interface InvestmentPlatformProduct extends ProductItemBase {
  accountTypes: string;        // "Brokerage, IRA, Roth IRA, 401k rollover"
  commissions: string;         // "$0 stock/ETF trades"
  minimumInvestment: number;   // 0, 500, 3000
  managementFee: string;       // "0.25%", "0%", "$0"
  features: string;            // "Robo-advisor, fractional shares, crypto"
}

export interface TaxSoftwareProduct extends ProductItemBase {
  priceFree: string;           // "Simple returns free"
  pricePremium: string;        // "$89.99"
  stateFiling: string;         // "$39.99/state" or "Included"
  selfEmployed: boolean;
  auditDefense: boolean;
  importForms: string;         // "W-2, 1099, PDF import"
}

// Union type for any product
export type ProductItem = CreditCardProduct | PersonalLoanProduct | SavingsProduct | InsuranceProduct | AutoInsuranceProduct | LifeInsuranceProduct | InvestmentPlatformProduct | TaxSoftwareProduct;

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
export const autoInsuranceSortColumns = ['name', 'amBestRating'] as const;
export const lifeInsuranceSortColumns = ['name', 'policyType', 'amBestRating'] as const;
export const investmentPlatformsSortColumns = ['name', 'minimumInvestment'] as const;
export const taxSoftwareSortColumns = ['name', 'pricePremium'] as const;

// CTA labels per category (per UI-SPEC Copywriting Contract)
export const ctaLabels: Record<ProductCategory, string> = {
  'credit-cards': 'Apply Now',
  'personal-loans': 'Check Rates',
  'savings-accounts': 'Open Account',
  'insurance': 'Get Quote',
  'auto-insurance': 'Get Quote',
  'life-insurance': 'Get Quote',
  'investment-platforms': 'Open Account',
  'tax-software': 'Start Filing',
};

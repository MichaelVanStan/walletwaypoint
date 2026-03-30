import { parseAsStringLiteral } from 'nuqs';
import {
  sortDirections,
  creditCardSortColumns,
  personalLoanSortColumns,
  savingsSortColumns,
  insuranceSortColumns,
  autoInsuranceSortColumns,
  lifeInsuranceSortColumns,
  investmentPlatformsSortColumns,
  taxSoftwareSortColumns,
  type ProductCategory,
} from './product-types';

// Credit card filter values (from UI-SPEC Interaction Contract)
const rewardsTypes = ['all', 'cash-back', 'travel', 'points', 'balance-transfer'] as const;
const creditScoreValues = ['all', 'excellent', 'good', 'fair'] as const;
const annualFeeValues = ['all', 'no-fee', 'under-100', '100-plus'] as const;

export const creditCardParams = {
  sort: parseAsStringLiteral(creditCardSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  rewards: parseAsStringLiteral(rewardsTypes).withDefault('all'),
  score: parseAsStringLiteral(creditScoreValues).withDefault('all'),
  fee: parseAsStringLiteral(annualFeeValues).withDefault('all'),
};

// Personal loan filter values
const loanAmountValues = ['all', 'under-5k', '5k-15k', '15k-35k', '35k-plus'] as const;
const loanTermValues = ['all', '12-24', '36-60', '60-plus'] as const;

export const personalLoanParams = {
  sort: parseAsStringLiteral(personalLoanSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  amount: parseAsStringLiteral(loanAmountValues).withDefault('all'),
  score: parseAsStringLiteral(creditScoreValues).withDefault('all'),
  term: parseAsStringLiteral(loanTermValues).withDefault('all'),
};

// Savings account filter values
const accountTypeValues = ['all', 'high-yield-savings', 'cd'] as const;
const minDepositValues = ['all', 'no-minimum', 'under-1k', '1k-plus'] as const;
const savingsTermValues = ['all', 'no-term', '6-12', '1-3yr', '3yr-plus'] as const;

export const savingsParams = {
  sort: parseAsStringLiteral(savingsSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  type: parseAsStringLiteral(accountTypeValues).withDefault('all'),
  deposit: parseAsStringLiteral(minDepositValues).withDefault('all'),
  sterm: parseAsStringLiteral(savingsTermValues).withDefault('all'),
};

// Insurance filter values
const insuranceTypeValues = ['all', 'auto', 'renters'] as const;
const coverageLevelValues = ['all', 'basic', 'standard', 'premium'] as const;
const deductibleValues = ['all', 'under-500', '500-1000', '1000-plus'] as const;

export const insuranceParams = {
  sort: parseAsStringLiteral(insuranceSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  itype: parseAsStringLiteral(insuranceTypeValues).withDefault('all'),
  coverage: parseAsStringLiteral(coverageLevelValues).withDefault('all'),
  deductible: parseAsStringLiteral(deductibleValues).withDefault('all'),
};

// Auto insurance filter values
const amBestRatingValues = ['all', 'A+', 'A', 'A-'] as const;

export const autoInsuranceParams = {
  sort: parseAsStringLiteral(autoInsuranceSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  rating: parseAsStringLiteral(amBestRatingValues).withDefault('all'),
};

// Life insurance filter values
const policyTypeValues = ['all', 'term', 'whole', 'universal'] as const;
const medicalExamValues = ['all', 'required', 'no-exam'] as const;

export const lifeInsuranceParams = {
  sort: parseAsStringLiteral(lifeInsuranceSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  policy: parseAsStringLiteral(policyTypeValues).withDefault('all'),
  exam: parseAsStringLiteral(medicalExamValues).withDefault('all'),
};

// Investment platform filter values
const investMinValues = ['all', 'no-minimum', 'under-500', '500-plus'] as const;
const feeValues = ['all', 'no-fee', 'under-050', '050-plus'] as const;

export const investmentPlatformsParams = {
  sort: parseAsStringLiteral(investmentPlatformsSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  invmin: parseAsStringLiteral(investMinValues).withDefault('all'),
  mgmtfee: parseAsStringLiteral(feeValues).withDefault('all'),
};

// Tax software filter values
const selfEmployedValues = ['all', 'yes', 'no'] as const;
const auditDefenseValues = ['all', 'yes', 'no'] as const;

export const taxSoftwareParams = {
  sort: parseAsStringLiteral(taxSoftwareSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  selfemp: parseAsStringLiteral(selfEmployedValues).withDefault('all'),
  audit: parseAsStringLiteral(auditDefenseValues).withDefault('all'),
};

// Map category to its params
export const categoryParams: Record<ProductCategory, typeof creditCardParams | typeof personalLoanParams | typeof savingsParams | typeof insuranceParams | typeof autoInsuranceParams | typeof lifeInsuranceParams | typeof investmentPlatformsParams | typeof taxSoftwareParams> = {
  'credit-cards': creditCardParams,
  'personal-loans': personalLoanParams,
  'savings-accounts': savingsParams,
  'insurance': insuranceParams,
  'auto-insurance': autoInsuranceParams,
  'life-insurance': lifeInsuranceParams,
  'investment-platforms': investmentPlatformsParams,
  'tax-software': taxSoftwareParams,
};

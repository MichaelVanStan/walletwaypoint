import { parseAsFloat, parseAsInteger, parseAsBoolean, parseAsString, parseAsStringLiteral } from 'nuqs';

// ============================================================================
// Mortgage Calculator
// ============================================================================
export const mortgageParams = {
  price: parseAsInteger.withDefault(415000),
  dp: parseAsInteger.withDefault(20),
  rate: parseAsFloat.withDefault(6.5),
  term: parseAsInteger.withDefault(30),
  tax: parseAsFloat.withDefault(1.1),
  ins: parseAsInteger.withDefault(1500),
  compare: parseAsBoolean.withDefault(false),
  b_price: parseAsInteger.withDefault(415000),
  b_dp: parseAsInteger.withDefault(20),
  b_rate: parseAsFloat.withDefault(6.5),
  b_term: parseAsInteger.withDefault(30),
  b_tax: parseAsFloat.withDefault(1.1),
  b_ins: parseAsInteger.withDefault(1500),
};

// ============================================================================
// Rent Affordability Calculator
// ============================================================================
export const rentParams = {
  income: parseAsInteger.withDefault(5500),
  maxPct: parseAsInteger.withDefault(28),
  utilities: parseAsInteger.withDefault(200),
  other: parseAsInteger.withDefault(300),
  compare: parseAsBoolean.withDefault(false),
  b_income: parseAsInteger.withDefault(5500),
  b_maxPct: parseAsInteger.withDefault(28),
  b_utilities: parseAsInteger.withDefault(200),
  b_other: parseAsInteger.withDefault(300),
};

// ============================================================================
// Compound Interest Calculator
// ============================================================================
export const compoundInterestParams = {
  initial: parseAsInteger.withDefault(10000),
  monthly: parseAsInteger.withDefault(500),
  rate: parseAsFloat.withDefault(7),
  years: parseAsInteger.withDefault(20),
  compare: parseAsBoolean.withDefault(false),
  b_initial: parseAsInteger.withDefault(10000),
  b_monthly: parseAsInteger.withDefault(500),
  b_rate: parseAsFloat.withDefault(7),
  b_years: parseAsInteger.withDefault(20),
};

// ============================================================================
// Loan Repayment Calculator
// ============================================================================
export const loanParams = {
  amount: parseAsInteger.withDefault(25000),
  rate: parseAsFloat.withDefault(8),
  term: parseAsInteger.withDefault(5),
  extra: parseAsInteger.withDefault(0),
  compare: parseAsBoolean.withDefault(false),
  b_amount: parseAsInteger.withDefault(25000),
  b_rate: parseAsFloat.withDefault(8),
  b_term: parseAsInteger.withDefault(5),
  b_extra: parseAsInteger.withDefault(0),
};

// ============================================================================
// Savings Goal Calculator
// ============================================================================
export const savingsParams = {
  goal: parseAsInteger.withDefault(50000),
  current: parseAsInteger.withDefault(5000),
  rate: parseAsFloat.withDefault(4.5),
  years: parseAsInteger.withDefault(5),
  monthly: parseAsInteger.withDefault(0),
  compare: parseAsBoolean.withDefault(false),
  b_goal: parseAsInteger.withDefault(50000),
  b_current: parseAsInteger.withDefault(5000),
  b_rate: parseAsFloat.withDefault(4.5),
  b_years: parseAsInteger.withDefault(5),
  b_monthly: parseAsInteger.withDefault(0),
};

// ============================================================================
// Retirement Calculator
// ============================================================================
export const retirementParams = {
  age: parseAsInteger.withDefault(30),
  retireAge: parseAsInteger.withDefault(65),
  savings: parseAsInteger.withDefault(50000),
  monthly: parseAsInteger.withDefault(500),
  returnRate: parseAsFloat.withDefault(7),
  withdrawalRate: parseAsFloat.withDefault(4),
  compare: parseAsBoolean.withDefault(false),
  b_age: parseAsInteger.withDefault(30),
  b_retireAge: parseAsInteger.withDefault(65),
  b_savings: parseAsInteger.withDefault(50000),
  b_monthly: parseAsInteger.withDefault(500),
  b_returnRate: parseAsFloat.withDefault(7),
  b_withdrawalRate: parseAsFloat.withDefault(4),
};

// ============================================================================
// Budget Calculator (50/30/20 rule)
// ============================================================================
export const budgetParams = {
  income: parseAsInteger.withDefault(7000),
  compare: parseAsBoolean.withDefault(false),
  b_income: parseAsInteger.withDefault(7000),
};

// ============================================================================
// Tax Estimator
// ============================================================================
const filingStatuses = ['single', 'married-jointly', 'married-separately', 'head-of-household'] as const;

export const taxParams = {
  income: parseAsInteger.withDefault(75000),
  filing: parseAsStringLiteral(filingStatuses).withDefault('single'),
  deduction: parseAsInteger.withDefault(15700),
  compare: parseAsBoolean.withDefault(false),
  b_income: parseAsInteger.withDefault(75000),
  b_filing: parseAsStringLiteral(filingStatuses).withDefault('single'),
  b_deduction: parseAsInteger.withDefault(15700),
};

// ============================================================================
// Rent vs Buy Calculator
// ============================================================================
export const rentVsBuyParams = {
  rent: parseAsInteger.withDefault(1800),
  price: parseAsInteger.withDefault(415000),
  dp: parseAsInteger.withDefault(20),
  rate: parseAsFloat.withDefault(6.5),
  years: parseAsInteger.withDefault(30),
  appreciation: parseAsFloat.withDefault(3),
  rentIncrease: parseAsFloat.withDefault(3),
  compare: parseAsBoolean.withDefault(false),
  b_rent: parseAsInteger.withDefault(1800),
  b_price: parseAsInteger.withDefault(415000),
  b_dp: parseAsInteger.withDefault(20),
  b_rate: parseAsFloat.withDefault(6.5),
  b_years: parseAsInteger.withDefault(30),
  b_appreciation: parseAsFloat.withDefault(3),
  b_rentIncrease: parseAsFloat.withDefault(3),
};

// ============================================================================
// Home Affordability Calculator
// ============================================================================
export const homeAffordabilityParams = {
  income: parseAsInteger.withDefault(75000),
  debts: parseAsInteger.withDefault(500),
  dp: parseAsInteger.withDefault(20),
  rate: parseAsFloat.withDefault(6.5),
  compare: parseAsBoolean.withDefault(false),
  b_income: parseAsInteger.withDefault(75000),
  b_debts: parseAsInteger.withDefault(500),
  b_dp: parseAsInteger.withDefault(20),
  b_rate: parseAsFloat.withDefault(6.5),
};

// ============================================================================
// Student Loan Repayment Calculator
// ============================================================================
export const studentLoanParams = {
  balance: parseAsInteger.withDefault(30000),
  rate: parseAsFloat.withDefault(5.5),
  income: parseAsInteger.withDefault(55000),
  compare: parseAsBoolean.withDefault(false),
  b_balance: parseAsInteger.withDefault(30000),
  b_rate: parseAsFloat.withDefault(5.5),
  b_income: parseAsInteger.withDefault(55000),
};

// ============================================================================
// Credit Card Payoff Calculator
// ============================================================================
export const creditCardPayoffParams = {
  balance: parseAsInteger.withDefault(10000),
  apr: parseAsFloat.withDefault(30),
  minpct: parseAsFloat.withDefault(2),
  extra: parseAsInteger.withDefault(100),
  compare: parseAsBoolean.withDefault(false),
  b_balance: parseAsInteger.withDefault(10000),
  b_apr: parseAsFloat.withDefault(30),
  b_minpct: parseAsFloat.withDefault(2),
  b_extra: parseAsInteger.withDefault(100),
};

// ============================================================================
// Car Affordability & Auto Loan Calculator
// ============================================================================
export const carAffordabilityParams = {
  income: parseAsInteger.withDefault(4500),
  price: parseAsInteger.withDefault(35000),
  down: parseAsInteger.withDefault(5000),
  rate: parseAsFloat.withDefault(6.84),
  term: parseAsInteger.withDefault(5),
  compare: parseAsBoolean.withDefault(false),
  b_income: parseAsInteger.withDefault(4500),
  b_price: parseAsInteger.withDefault(35000),
  b_down: parseAsInteger.withDefault(5000),
  b_rate: parseAsFloat.withDefault(6.84),
  b_term: parseAsInteger.withDefault(5),
};

// ============================================================================
// Paycheck Calculator
// ============================================================================
const paycheckFilingStatuses = ['single', 'married', 'head'] as const;
const payFrequencies = ['weekly', 'biweekly', 'semimonthly', 'monthly'] as const;

export const paycheckParams = {
  salary: parseAsInteger.withDefault(65000),
  state: parseAsString.withDefault('california'),
  filing: parseAsStringLiteral(paycheckFilingStatuses).withDefault('single'),
  frequency: parseAsStringLiteral(payFrequencies).withDefault('biweekly'),
  withholding: parseAsInteger.withDefault(0),
  pretaxDeductions: parseAsInteger.withDefault(0),
};

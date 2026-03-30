import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import type { FicaResult, TaxBracket } from '@/lib/states/types';
import { calculateProgressiveTax, calculateFederalTax } from '@/lib/calculators/math/tax';
import { formatCurrency } from '@/lib/calculators/formatters';
import { STATE_BY_SLUG } from '@/lib/states/state-list';

// ---------------------------------------------------------------------------
// FICA Constants (2026 projected)
// ---------------------------------------------------------------------------
/** Social Security wage base for 2026 (projected) */
const SS_WAGE_BASE_2026 = 176100;
const SS_RATE = 6.2; // percent
const MEDICARE_RATE = 1.45; // percent
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.9; // percent

// ---------------------------------------------------------------------------
// Pay frequency divisors
// ---------------------------------------------------------------------------
const PAY_PERIODS: Record<string, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const PAY_FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'weekly',
  biweekly: 'biweekly',
  semimonthly: 'semi-monthly',
  monthly: 'monthly',
};

// ---------------------------------------------------------------------------
// No-income-tax states
// ---------------------------------------------------------------------------
const NO_INCOME_TAX_STATES = new Set([
  'alaska', 'florida', 'nevada', 'new-hampshire',
  'south-dakota', 'tennessee', 'texas', 'washington', 'wyoming',
]);

// ---------------------------------------------------------------------------
// Flat-rate states (2026 rates, percent)
// ---------------------------------------------------------------------------
const FLAT_RATE_STATES: Record<string, number> = {
  'colorado': 4.4,
  'illinois': 4.95,
  'indiana': 3.05,
  'kentucky': 4.0,
  'massachusetts': 5.0,
  'michigan': 4.25,
  'north-carolina': 4.5,
  'pennsylvania': 3.07,
  'utah': 4.65,
};

// ---------------------------------------------------------------------------
// Graduated-rate state brackets (2026 single filer, simplified)
// Married and head-of-household brackets use doubled thresholds where applicable
// ---------------------------------------------------------------------------
const STATE_BRACKETS: Record<string, Record<string, TaxBracket[]>> = {
  california: {
    single: [
      { min: 0, max: 10412, rate: 1 },
      { min: 10413, max: 24684, rate: 2 },
      { min: 24685, max: 38959, rate: 4 },
      { min: 38960, max: 54081, rate: 6 },
      { min: 54082, max: 68350, rate: 8 },
      { min: 68351, max: 349137, rate: 9.3 },
      { min: 349138, max: 418961, rate: 10.3 },
      { min: 418962, max: 698271, rate: 11.3 },
      { min: 698272, max: Infinity, rate: 12.3 },
    ],
    married: [
      { min: 0, max: 20824, rate: 1 },
      { min: 20825, max: 49368, rate: 2 },
      { min: 49369, max: 77918, rate: 4 },
      { min: 77919, max: 108162, rate: 6 },
      { min: 108163, max: 136700, rate: 8 },
      { min: 136701, max: 698274, rate: 9.3 },
      { min: 698275, max: 837922, rate: 10.3 },
      { min: 837923, max: 1396542, rate: 11.3 },
      { min: 1396543, max: Infinity, rate: 12.3 },
    ],
    head: [
      { min: 0, max: 20839, rate: 1 },
      { min: 20840, max: 49371, rate: 2 },
      { min: 49372, max: 63644, rate: 4 },
      { min: 63645, max: 78765, rate: 6 },
      { min: 78766, max: 93037, rate: 8 },
      { min: 93038, max: 474824, rate: 9.3 },
      { min: 474825, max: 569790, rate: 10.3 },
      { min: 569791, max: 949649, rate: 11.3 },
      { min: 949650, max: Infinity, rate: 12.3 },
    ],
  },
  'new-york': {
    single: [
      { min: 0, max: 8500, rate: 4 },
      { min: 8501, max: 11700, rate: 4.5 },
      { min: 11701, max: 13900, rate: 5.25 },
      { min: 13901, max: 80650, rate: 5.5 },
      { min: 80651, max: 215400, rate: 6 },
      { min: 215401, max: 1077550, rate: 6.85 },
      { min: 1077551, max: 5000000, rate: 9.65 },
      { min: 5000001, max: 25000000, rate: 10.3 },
      { min: 25000001, max: Infinity, rate: 10.9 },
    ],
    married: [
      { min: 0, max: 17150, rate: 4 },
      { min: 17151, max: 23600, rate: 4.5 },
      { min: 23601, max: 27900, rate: 5.25 },
      { min: 27901, max: 161550, rate: 5.5 },
      { min: 161551, max: 323200, rate: 6 },
      { min: 323201, max: 2155350, rate: 6.85 },
      { min: 2155351, max: 5000000, rate: 9.65 },
      { min: 5000001, max: 25000000, rate: 10.3 },
      { min: 25000001, max: Infinity, rate: 10.9 },
    ],
    head: [
      { min: 0, max: 12800, rate: 4 },
      { min: 12801, max: 17650, rate: 4.5 },
      { min: 17651, max: 20900, rate: 5.25 },
      { min: 20901, max: 107650, rate: 5.5 },
      { min: 107651, max: 269300, rate: 6 },
      { min: 269301, max: 1616450, rate: 6.85 },
      { min: 1616451, max: 5000000, rate: 9.65 },
      { min: 5000001, max: 25000000, rate: 10.3 },
      { min: 25000001, max: Infinity, rate: 10.9 },
    ],
  },
  'new-jersey': {
    single: [
      { min: 0, max: 20000, rate: 1.4 },
      { min: 20001, max: 35000, rate: 1.75 },
      { min: 35001, max: 40000, rate: 3.5 },
      { min: 40001, max: 75000, rate: 5.525 },
      { min: 75001, max: 500000, rate: 6.37 },
      { min: 500001, max: 1000000, rate: 8.97 },
      { min: 1000001, max: Infinity, rate: 10.75 },
    ],
    married: [
      { min: 0, max: 20000, rate: 1.4 },
      { min: 20001, max: 50000, rate: 1.75 },
      { min: 50001, max: 70000, rate: 2.45 },
      { min: 70001, max: 80000, rate: 3.5 },
      { min: 80001, max: 150000, rate: 5.525 },
      { min: 150001, max: 500000, rate: 6.37 },
      { min: 500001, max: 1000000, rate: 8.97 },
      { min: 1000001, max: Infinity, rate: 10.75 },
    ],
    head: [
      { min: 0, max: 20000, rate: 1.4 },
      { min: 20001, max: 50000, rate: 1.75 },
      { min: 50001, max: 70000, rate: 2.45 },
      { min: 70001, max: 80000, rate: 3.5 },
      { min: 80001, max: 150000, rate: 5.525 },
      { min: 150001, max: 500000, rate: 6.37 },
      { min: 500001, max: 1000000, rate: 8.97 },
      { min: 1000001, max: Infinity, rate: 10.75 },
    ],
  },
  georgia: {
    single: [
      { min: 0, max: 750, rate: 1 },
      { min: 751, max: 2250, rate: 2 },
      { min: 2251, max: 3750, rate: 3 },
      { min: 3751, max: 5250, rate: 4 },
      { min: 5251, max: 7000, rate: 5 },
      { min: 7001, max: Infinity, rate: 5.49 },
    ],
    married: [
      { min: 0, max: 1000, rate: 1 },
      { min: 1001, max: 3000, rate: 2 },
      { min: 3001, max: 5000, rate: 3 },
      { min: 5001, max: 7000, rate: 4 },
      { min: 7001, max: 10000, rate: 5 },
      { min: 10001, max: Infinity, rate: 5.49 },
    ],
    head: [
      { min: 0, max: 750, rate: 1 },
      { min: 751, max: 2250, rate: 2 },
      { min: 2251, max: 3750, rate: 3 },
      { min: 3751, max: 5250, rate: 4 },
      { min: 5251, max: 7000, rate: 5 },
      { min: 7001, max: Infinity, rate: 5.49 },
    ],
  },
  ohio: {
    single: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26051, max: 100000, rate: 2.75 },
      { min: 100001, max: Infinity, rate: 3.5 },
    ],
    married: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26051, max: 100000, rate: 2.75 },
      { min: 100001, max: Infinity, rate: 3.5 },
    ],
    head: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26051, max: 100000, rate: 2.75 },
      { min: 100001, max: Infinity, rate: 3.5 },
    ],
  },
};

// Standard deductions by state (where applicable)
const STATE_STANDARD_DEDUCTIONS: Record<string, Record<string, number>> = {
  'new-york': { single: 8000, married: 16050, head: 11200 },
  georgia: { single: 5400, married: 7100, head: 5400 },
};

// ---------------------------------------------------------------------------
// FICA Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate FICA taxes (Social Security + Medicare).
 *
 * @param income - Income subject to FICA (gross minus pre-tax deductions)
 * @returns FicaResult with socialSecurity, medicare, and totalFica
 */
export function calculateFica(income: number): FicaResult {
  const ssIncome = Math.min(income, SS_WAGE_BASE_2026);
  const socialSecurity = new Decimal(ssIncome)
    .times(SS_RATE)
    .div(100)
    .toDecimalPlaces(2)
    .toNumber();

  let medicare = new Decimal(income)
    .times(MEDICARE_RATE)
    .div(100)
    .toDecimalPlaces(2)
    .toNumber();

  // Additional Medicare tax on income over $200,000
  if (income > ADDITIONAL_MEDICARE_THRESHOLD) {
    const additionalMedicare = new Decimal(income - ADDITIONAL_MEDICARE_THRESHOLD)
      .times(ADDITIONAL_MEDICARE_RATE)
      .div(100)
      .toDecimalPlaces(2)
      .toNumber();
    medicare += additionalMedicare;
  }

  return {
    socialSecurity,
    medicare,
    totalFica: new Decimal(socialSecurity).plus(medicare).toDecimalPlaces(2).toNumber(),
  };
}

// ---------------------------------------------------------------------------
// State Tax Calculation (built-in fallback data)
// ---------------------------------------------------------------------------

function calculateStateTax(
  taxableIncome: number,
  stateSlug: string,
  filing: string,
): number {
  // No income tax states
  if (NO_INCOME_TAX_STATES.has(stateSlug)) return 0;

  // Flat rate states
  if (FLAT_RATE_STATES[stateSlug] !== undefined) {
    return new Decimal(taxableIncome)
      .times(FLAT_RATE_STATES[stateSlug])
      .div(100)
      .toDecimalPlaces(2)
      .toNumber();
  }

  // Graduated rate states
  const stateBrackets = STATE_BRACKETS[stateSlug];
  if (stateBrackets) {
    const brackets = stateBrackets[filing] || stateBrackets.single;
    const stateDeductions = STATE_STANDARD_DEDUCTIONS[stateSlug];
    const deduction = stateDeductions
      ? (stateDeductions[filing] || stateDeductions.single || 0)
      : 0;
    const stateTaxableIncome = Math.max(taxableIncome - deduction, 0);
    const result = calculateProgressiveTax(stateTaxableIncome, brackets);
    return result.totalTax;
  }

  // Fallback: estimate 5% for unknown states with income tax
  return new Decimal(taxableIncome)
    .times(5)
    .div(100)
    .toDecimalPlaces(2)
    .toNumber();
}

// ---------------------------------------------------------------------------
// Paycheck Calculator
// ---------------------------------------------------------------------------

/**
 * Paycheck Calculator (CALC-01, CALC-02)
 *
 * Computes net take-home pay after federal tax, state tax, FICA,
 * and deductions. Returns per-paycheck and annual breakdowns with
 * chart data for pie and bar visualizations.
 *
 * @param params.salary - Annual gross salary
 * @param params.state - State slug (e.g., "california")
 * @param params.filing - Filing status ('single' | 'married' | 'head')
 * @param params.frequency - Pay frequency ('weekly' | 'biweekly' | 'semimonthly' | 'monthly')
 * @param params.withholding - Additional annual withholding (default 0)
 * @param params.pretaxDeductions - Pre-tax 401k/HSA deductions per year (default 0)
 */
export function calculatePaycheck(params: Record<string, number | string>): CalculatorResults {
  const salary = Number(params.salary);
  const stateSlug = String(params.state || 'california');
  const filing = String(params.filing || 'single');
  const frequency = String(params.frequency || 'biweekly');
  const withholding = Number(params.withholding || 0);
  const pretaxDeductions = Number(params.pretaxDeductions || 0);

  // Taxable income for federal and state (after pre-tax deductions like 401k/HSA)
  const adjustedIncome = Math.max(salary - pretaxDeductions, 0);

  // 1. Federal tax (uses standard deduction internally)
  const federalResult = calculateFederalTax(adjustedIncome, filing);
  const federalTax = federalResult.totalTax;

  // 2. State tax
  const stateTax = calculateStateTax(adjustedIncome, stateSlug, filing);

  // 3. FICA (applies to income minus pre-tax deductions)
  const fica = calculateFica(adjustedIncome);

  // 4. Totals
  const totalTax = new Decimal(federalTax)
    .plus(stateTax)
    .plus(fica.totalFica)
    .plus(withholding)
    .toDecimalPlaces(2)
    .toNumber();

  const annualNetPay = new Decimal(salary)
    .minus(pretaxDeductions)
    .minus(totalTax)
    .toDecimalPlaces(2)
    .toNumber();

  const periods = PAY_PERIODS[frequency] || 26;
  const netPayPerPaycheck = new Decimal(annualNetPay)
    .div(periods)
    .toDecimalPlaces(2)
    .toNumber();

  const effectiveRate = salary > 0
    ? new Decimal(totalTax).div(salary).times(100).toDecimalPlaces(2).toNumber()
    : 0;

  // Chart: pie breakdown
  const breakdown: Record<string, number | string>[] = [
    { name: 'Federal Tax', value: federalTax },
    { name: 'State Tax', value: stateTax },
    { name: 'FICA', value: fica.totalFica },
    ...(withholding > 0 ? [{ name: 'Additional Withholding', value: withholding }] : []),
    { name: 'Take-Home', value: annualNetPay },
  ];

  // Chart: monthly bar breakdown
  const monthlyGross = new Decimal(salary).div(12).toDecimalPlaces(0).toNumber();
  const monthlyTax = new Decimal(totalTax).div(12).toDecimalPlaces(0).toNumber();
  const monthlyNet = new Decimal(annualNetPay).div(12).toDecimalPlaces(0).toNumber();
  const monthlyBreakdown: Record<string, number | string>[] = [
    { name: 'Gross', value: monthlyGross },
    { name: 'Taxes', value: monthlyTax },
    { name: 'Net', value: monthlyNet },
  ];

  // Detail rows
  const detailRows: Array<Record<string, string | number>> = [
    { category: 'Federal Income Tax', annual: federalTax, perPaycheck: new Decimal(federalTax).div(periods).toDecimalPlaces(2).toNumber() },
    { category: 'State Income Tax', annual: stateTax, perPaycheck: new Decimal(stateTax).div(periods).toDecimalPlaces(2).toNumber() },
    { category: 'Social Security', annual: fica.socialSecurity, perPaycheck: new Decimal(fica.socialSecurity).div(periods).toDecimalPlaces(2).toNumber() },
    { category: 'Medicare', annual: fica.medicare, perPaycheck: new Decimal(fica.medicare).div(periods).toDecimalPlaces(2).toNumber() },
  ];

  if (withholding > 0) {
    detailRows.push({
      category: 'Additional Withholding',
      annual: withholding,
      perPaycheck: new Decimal(withholding).div(periods).toDecimalPlaces(2).toNumber(),
    });
  }

  if (pretaxDeductions > 0) {
    detailRows.push({
      category: 'Pre-tax Deductions (401k/HSA)',
      annual: pretaxDeductions,
      perPaycheck: new Decimal(pretaxDeductions).div(periods).toDecimalPlaces(2).toNumber(),
    });
  }

  detailRows.push({
    category: 'Total Deductions',
    annual: totalTax + pretaxDeductions,
    perPaycheck: new Decimal(totalTax + pretaxDeductions).div(periods).toDecimalPlaces(2).toNumber(),
  });

  detailRows.push({
    category: 'Net Take-Home Pay',
    annual: annualNetPay,
    perPaycheck: netPayPerPaycheck,
  });

  const detailColumns = [
    { key: 'category', label: 'Category' },
    { key: 'annual', label: 'Annual', format: 'currency' as const },
    { key: 'perPaycheck', label: `Per Paycheck (${PAY_FREQUENCY_LABELS[frequency] || frequency})`, format: 'currency' as const },
  ];

  // State name for display
  const stateInfo = STATE_BY_SLUG[stateSlug];
  const stateName = stateInfo?.name || stateSlug;

  const interpretation = `Based on your **${formatCurrency(salary)}** salary in **${stateName}**, your estimated take-home pay is **${formatCurrency(netPayPerPaycheck)}** per paycheck (${PAY_FREQUENCY_LABELS[frequency] || frequency}), after **${formatCurrency(federalTax)}** in federal tax, **${formatCurrency(stateTax)}** in state tax, and **${formatCurrency(fica.totalFica)}** in FICA.`;

  return {
    outputs: {
      netPayPerPaycheck,
      annualNetPay,
      totalTax,
      effectiveRate,
      federalTax,
      stateTax,
      socialSecurity: fica.socialSecurity,
      medicare: fica.medicare,
      ficaTotal: fica.totalFica,
    },
    chartData: {
      breakdown,
      monthlyBreakdown,
    },
    interpretation,
    detailRows,
    detailColumns,
  };
}

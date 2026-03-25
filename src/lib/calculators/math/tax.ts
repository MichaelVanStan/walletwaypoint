import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/** 2026 Federal Tax Brackets (Tax Foundation projections) */
const TAX_BRACKETS: Record<string, Array<{ min: number; max: number; rate: number }>> = {
  single: [
    { min: 0, max: 11925, rate: 10 },
    { min: 11926, max: 48475, rate: 12 },
    { min: 48476, max: 103350, rate: 22 },
    { min: 103351, max: 197300, rate: 24 },
    { min: 197301, max: 250525, rate: 32 },
    { min: 250526, max: 640600, rate: 35 },
    { min: 640601, max: Infinity, rate: 37 },
  ],
  married: [
    { min: 0, max: 23850, rate: 10 },
    { min: 23851, max: 96950, rate: 12 },
    { min: 96951, max: 206700, rate: 22 },
    { min: 206701, max: 394600, rate: 24 },
    { min: 394601, max: 501050, rate: 32 },
    { min: 501051, max: 768600, rate: 35 },
    { min: 768601, max: Infinity, rate: 37 },
  ],
  head: [
    { min: 0, max: 17000, rate: 10 },
    { min: 17001, max: 64850, rate: 12 },
    { min: 64851, max: 103350, rate: 22 },
    { min: 103351, max: 197300, rate: 24 },
    { min: 197301, max: 250500, rate: 32 },
    { min: 250501, max: 640600, rate: 35 },
    { min: 640601, max: Infinity, rate: 37 },
  ],
};

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 15700,
  married: 31400,
  head: 23500,
};

/**
 * Tax Estimator (TOOL-08)
 *
 * Computes federal tax liability using 2026 projected brackets for
 * single, married filing jointly, and head of household statuses.
 *
 * @param params.income - Annual gross income
 * @param params.filing - Filing status ('single' | 'married' | 'head')
 * @param params.deduction - Standard or itemized deduction amount
 */
export function calculateTax(params: Record<string, number | string>): CalculatorResults {
  const income = Number(params.income);
  const filing = String(params.filing) as 'single' | 'married' | 'head';
  const deduction = Number(params.deduction);

  // Taxable income after deduction
  const taxableIncome = Math.max(income - deduction, 0);

  // Get brackets for filing status
  const brackets = TAX_BRACKETS[filing] || TAX_BRACKETS.single;

  // Walk through brackets computing tax at each marginal rate
  let totalTax = new Decimal(0);
  let marginalRate = 0;
  const bracketDetails: Array<{
    rate: number;
    rangeMin: number;
    rangeMax: number;
    taxableAtRate: number;
    taxAtRate: number;
  }> = [];

  let remaining = new Decimal(taxableIncome);

  for (const bracket of brackets) {
    if (remaining.lte(0)) break;

    const bracketWidth = bracket.max === Infinity
      ? remaining
      : new Decimal(bracket.max - bracket.min + 1);

    const taxableAtRate = remaining.gt(bracketWidth)
      ? bracketWidth
      : remaining;

    const taxAtRate = taxableAtRate.times(bracket.rate).div(100);
    totalTax = totalTax.plus(taxAtRate);

    if (taxableAtRate.gt(0)) {
      marginalRate = bracket.rate;
      bracketDetails.push({
        rate: bracket.rate,
        rangeMin: bracket.min,
        rangeMax: bracket.max === Infinity ? taxableIncome : Math.min(bracket.max, taxableIncome),
        taxableAtRate: taxableAtRate.toDecimalPlaces(2).toNumber(),
        taxAtRate: taxAtRate.toDecimalPlaces(2).toNumber(),
      });
    }

    remaining = remaining.minus(taxableAtRate);
  }

  const totalTaxNum = totalTax.toDecimalPlaces(2).toNumber();
  const effectiveRate = income > 0
    ? new Decimal(totalTaxNum).div(income).times(100).toDecimalPlaces(2).toNumber()
    : 0;
  const takeHome = new Decimal(income).minus(totalTaxNum).toDecimalPlaces(2).toNumber();

  // Chart data: brackets bar chart (only non-zero)
  const bracketsChart: Record<string, number | string>[] = bracketDetails.map((b) => ({
    bracket: `${b.rate}%`,
    amount: b.taxAtRate,
  }));

  // Chart data: breakdown pie chart
  const breakdown: Record<string, number | string>[] = [
    { name: 'Federal Tax', value: totalTaxNum },
    { name: 'Take Home', value: takeHome },
  ];

  // Detail rows: bracket-by-bracket breakdown
  const detailRows: Array<Record<string, string | number>> = bracketDetails.map((b) => ({
    rate: `${b.rate}%`,
    incomeRange: `${formatCurrency(b.rangeMin)} - ${b.rangeMax === taxableIncome && brackets.some((br) => br.max === Infinity && br.rate === b.rate) ? formatCurrency(taxableIncome) : formatCurrency(b.rangeMax)}`,
    taxableAmount: b.taxableAtRate,
    taxAmount: b.taxAtRate,
  }));

  const detailColumns = [
    { key: 'rate', label: 'Tax Rate' },
    { key: 'incomeRange', label: 'Income Range' },
    { key: 'taxableAmount', label: 'Taxable Amount', format: 'currency' as const },
    { key: 'taxAmount', label: 'Tax', format: 'currency' as const },
  ];

  // Filing status display name
  const filingNames: Record<string, string> = {
    single: 'single',
    married: 'married filing jointly',
    head: 'head of household',
  };

  const interpretation = `On ${formatCurrency(income)} income (${filingNames[filing] || filing} filing), your estimated federal tax is ${formatCurrency(totalTaxNum)} -- an effective rate of ${effectiveRate}%. Your marginal rate is ${marginalRate}%. You take home ${formatCurrency(takeHome)}.`;

  return {
    outputs: {
      totalTax: totalTaxNum,
      effectiveRate,
      marginalRate,
      takeHome,
      taxableIncome,
    },
    chartData: {
      brackets: bracketsChart,
      breakdown,
    },
    interpretation,
    detailRows,
    detailColumns,
  };
}

import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Budget Calculator (TOOL-07)
 *
 * Allocates monthly income using the 50/30/20 rule:
 * - 50% Needs (housing, food, transport, insurance, minimum debt payments)
 * - 30% Wants (dining out, entertainment, subscriptions, shopping)
 * - 20% Savings (emergency fund, retirement, debt beyond minimums, investments)
 *
 * @param params.income - Monthly income
 */
export function calculateBudget(params: Record<string, number>): CalculatorResults {
  const income = new Decimal(params.income);

  const needs = income.times(0.50).toDecimalPlaces(2).toNumber();
  const wants = income.times(0.30).toDecimalPlaces(2).toNumber();
  const savings = income.times(0.20).toDecimalPlaces(2).toNumber();
  const annualIncome = income.times(12).toDecimalPlaces(2).toNumber();

  // Pie chart: budget allocation
  const budgetAllocation: Record<string, number | string>[] = [
    { name: 'Needs (50%)', value: needs },
    { name: 'Wants (30%)', value: wants },
    { name: 'Savings (20%)', value: savings },
  ];

  // Bar chart: recommended vs US average
  // US average spending: ~60% needs, ~25% wants, ~15% savings
  const comparison: Record<string, number | string>[] = [
    {
      category: 'Needs',
      recommended: needs,
      usAvg: income.times(0.60).toDecimalPlaces(2).toNumber(),
    },
    {
      category: 'Wants',
      recommended: wants,
      usAvg: income.times(0.25).toDecimalPlaces(2).toNumber(),
    },
    {
      category: 'Savings',
      recommended: savings,
      usAvg: income.times(0.15).toDecimalPlaces(2).toNumber(),
    },
  ];

  // Interpretation
  const interpretation = `Based on ${formatCurrency(params.income)}/mo income, the 50/30/20 rule suggests ${formatCurrency(needs)} for needs, ${formatCurrency(wants)} for wants, and ${formatCurrency(savings)} for savings each month.`;

  return {
    outputs: {
      needs,
      wants,
      savings,
      annualIncome,
    },
    chartData: {
      budgetAllocation,
      comparison,
    },
    interpretation,
  };
}

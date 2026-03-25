import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Rent Affordability Calculator (TOOL-02)
 *
 * Computes max affordable rent based on income percentage and expense deductions.
 *
 * @param params.income - Monthly income
 * @param params.maxPct - Maximum rent as percentage of income
 * @param params.utilities - Monthly utility costs
 * @param params.other - Other monthly housing expenses
 */
export function calculateRentAffordability(params: Record<string, number>): CalculatorResults {
  const income = new Decimal(params.income);
  const maxPct = new Decimal(params.maxPct);
  const utilities = new Decimal(params.utilities);
  const other = new Decimal(params.other);

  // Core calculations
  const maxRent = income.times(maxPct.div(100));
  const affordableRent = maxRent.minus(utilities).minus(other);
  const monthlyRemaining = income.minus(affordableRent).minus(utilities).minus(other);
  const annualRentCost = affordableRent.times(12);

  // Round final values
  const maxRentNum = maxRent.toDecimalPlaces(2).toNumber();
  const affordableRentNum = affordableRent.toDecimalPlaces(2).toNumber();
  const monthlyRemainingNum = monthlyRemaining.toDecimalPlaces(2).toNumber();
  const annualRentCostNum = annualRentCost.toDecimalPlaces(2).toNumber();

  // Income allocation pie chart
  const remainingIncome = income.minus(affordableRent).minus(utilities).minus(other);
  const incomeAllocation: Record<string, number | string>[] = [
    { name: 'Affordable Rent', value: Math.max(affordableRentNum, 0) },
    { name: 'Utilities', value: params.utilities },
    { name: 'Other Expenses', value: params.other },
    { name: 'Remaining', value: Math.max(remainingIncome.toDecimalPlaces(2).toNumber(), 0) },
  ];

  // Interpretation
  const interpretation = `Based on $${params.income}/mo income, you can afford up to ${formatCurrency(Math.max(affordableRentNum, 0))} in rent after ${formatCurrency(params.utilities)} utilities and ${formatCurrency(params.other)} in other housing costs.`;

  return {
    outputs: {
      maxRent: maxRentNum,
      affordableRent: affordableRentNum,
      monthlyRemaining: monthlyRemainingNum,
      annualRentCost: annualRentCostNum,
    },
    chartData: {
      incomeAllocation,
    },
    interpretation,
  };
}

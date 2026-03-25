import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';
import { fv } from './precision';

/**
 * Retirement Calculator (TOOL-06)
 *
 * Models accumulation phase (working years with contributions) and
 * distribution phase (withdrawal years with balance depletion).
 *
 * @param params.age - Current age
 * @param params.retireAge - Target retirement age
 * @param params.savings - Current retirement savings
 * @param params.monthly - Monthly contribution
 * @param params.returnRate - Expected annual return rate (%)
 * @param params.withdrawalRate - Annual withdrawal rate (%)
 */
export function calculateRetirement(params: Record<string, number>): CalculatorResults {
  const age = params.age;
  const retireAge = params.retireAge;
  const savings = params.savings;
  const monthly = params.monthly;
  const returnRate = params.returnRate;
  const withdrawalRate = params.withdrawalRate;

  const yearsToRetirement = retireAge - age;

  // Accumulation phase: compute retirement balance using FV
  const retirementBalance = fv(savings, monthly, returnRate, yearsToRetirement);

  // Distribution phase: model year-by-year balance depletion
  const annualWithdrawal = new Decimal(retirementBalance).times(withdrawalRate).div(100).toDecimalPlaces(2).toNumber();
  const monthlyWithdrawal = new Decimal(annualWithdrawal).div(12).toDecimalPlaces(2).toNumber();

  // Post-retirement return rate (conservative: returnRate - 1%)
  const postReturnRate = Math.max(returnRate - 1, 0);

  // Track distribution phase to find years until depleted
  let distributionBalance = new Decimal(retirementBalance);
  let yearsUntilDepleted = 0;
  const maxRetirementYears = 30;

  for (let y = 1; y <= maxRetirementYears; y++) {
    // Subtract annual withdrawal
    distributionBalance = distributionBalance.minus(annualWithdrawal);
    if (distributionBalance.lte(0)) {
      yearsUntilDepleted = y;
      break;
    }
    // Apply post-retirement returns on remaining balance
    distributionBalance = distributionBalance.times(
      new Decimal(1).plus(new Decimal(postReturnRate).div(100)),
    );
    if (y === maxRetirementYears) {
      yearsUntilDepleted = distributionBalance.gt(0) ? 30 : y;
    }
  }

  // If balance never depleted in 30 years, mark as 30+
  if (yearsUntilDepleted === 0) {
    yearsUntilDepleted = 30;
  }

  // Total contributed
  const totalContributed = savings + monthly * yearsToRetirement * 12;

  // Chart data: year-by-year projection (accumulation + distribution)
  const retirementProjection: Record<string, number | string>[] = [];

  // Start: age with current savings
  retirementProjection.push({ age, balance: savings });

  // Accumulation phase: year by year
  for (let y = 1; y <= yearsToRetirement; y++) {
    const yearBalance = fv(savings, monthly, returnRate, y);
    retirementProjection.push({
      age: age + y,
      balance: Math.round(yearBalance),
    });
  }

  // Distribution phase: year by year (up to 30 years)
  let distBalance = new Decimal(retirementBalance);
  for (let y = 1; y <= maxRetirementYears; y++) {
    distBalance = distBalance.minus(annualWithdrawal);
    if (distBalance.lte(0)) {
      retirementProjection.push({
        age: retireAge + y,
        balance: 0,
      });
      break;
    }
    distBalance = distBalance.times(
      new Decimal(1).plus(new Decimal(postReturnRate).div(100)),
    );
    retirementProjection.push({
      age: retireAge + y,
      balance: Math.round(distBalance.toNumber()),
    });
  }

  // Interpretation
  const interpretation = `By saving ${formatCurrency(monthly)}/mo from age ${age} to ${retireAge} at ${returnRate}% return, you would have ${formatCurrency(retirementBalance)}. At a ${withdrawalRate}% withdrawal rate, that provides ${formatCurrency(monthlyWithdrawal)}/mo for an estimated ${yearsUntilDepleted} years.`;

  return {
    outputs: {
      retirementBalance,
      annualWithdrawal,
      monthlyWithdrawal,
      yearsUntilDepleted,
      totalContributed,
    },
    chartData: {
      retirementProjection,
    },
    interpretation,
  };
}

import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Savings Goal Calculator (TOOL-05)
 *
 * Computes required monthly contribution to reach a target amount.
 * Supports optional monthly override for "what if I save more?" exploration.
 *
 * @param params.goal - Target savings amount
 * @param params.current - Current savings
 * @param params.rate - Annual return rate (%)
 * @param params.years - Time horizon in years
 * @param params.monthly - Monthly savings override (0 = auto-calculate minimum)
 */
export function calculateSavingsGoal(params: Record<string, number>): CalculatorResults {
  const goal = new Decimal(params.goal);
  const current = new Decimal(params.current);
  const annualRate = new Decimal(params.rate);
  const years = params.years;
  const monthlyOverride = params.monthly ?? 0;
  const n = years * 12;
  const monthlyRate = annualRate.div(100).div(12);
  const isZeroRate = monthlyRate.isZero();

  // Calculate minimum required monthly contribution
  let monthlyRequired: Decimal;

  if (isZeroRate) {
    monthlyRequired = goal.minus(current).div(n);
  } else {
    const onePlusR = monthlyRate.plus(1);
    const compounded = onePlusR.toPower(n);
    const pvFuture = current.times(compounded);
    const annuityFactor = compounded.minus(1).div(monthlyRate);
    monthlyRequired = goal.minus(pvFuture).div(annuityFactor);
  }

  // Ensure non-negative
  if (monthlyRequired.lt(0)) {
    monthlyRequired = new Decimal(0);
  }

  const monthlyRequiredNum = monthlyRequired.toDecimalPlaces(2).toNumber();

  // Actual monthly contribution: use override if > 0, otherwise use computed minimum
  const hasOverride = monthlyOverride > 0;
  const actualMonthly = hasOverride
    ? new Decimal(monthlyOverride)
    : monthlyRequired;

  // Compute years to goal at actual monthly rate
  let yearsToGoal: number;

  if (!hasOverride) {
    // Auto mode: years to goal is the time horizon by definition
    yearsToGoal = years;
  } else if (current.gte(goal)) {
    yearsToGoal = 0;
  } else if (isZeroRate) {
    const monthsNeeded = goal.minus(current).div(actualMonthly);
    yearsToGoal = Math.ceil(monthsNeeded.toNumber() / 12);
  } else {
    // Iterate month by month to find when balance >= goal
    let balance = new Decimal(current);
    let months = 0;
    const maxMonths = 360; // 30 year cap
    while (balance.lt(goal) && months < maxMonths) {
      balance = balance.times(monthlyRate.plus(1)).plus(actualMonthly);
      months++;
    }
    yearsToGoal = Math.ceil(months / 12);
  }

  // Year-by-year projection using actual monthly contribution
  const chartYears = Math.max(years, yearsToGoal);
  const savingsProgress: Record<string, number | string>[] = [];

  // Year 0
  savingsProgress.push({
    year: 0,
    balance: current.toDecimalPlaces(2).toNumber(),
    goal: params.goal,
  });

  let projectedTotal = new Decimal(0);

  for (let year = 1; year <= chartYears; year++) {
    const months = year * 12;
    let yearBalance: Decimal;

    if (isZeroRate) {
      yearBalance = current.plus(actualMonthly.times(months));
    } else {
      const onePlusR = monthlyRate.plus(1);
      const compounded = onePlusR.toPower(months);
      const pvFuture = current.times(compounded);
      const annuityFactor = compounded.minus(1).div(monthlyRate);
      const pmtFuture = actualMonthly.times(annuityFactor);
      yearBalance = pvFuture.plus(pmtFuture);
    }

    savingsProgress.push({
      year,
      balance: yearBalance.toDecimalPlaces(2).toNumber(),
      goal: params.goal,
    });

    if (year === chartYears) {
      projectedTotal = yearBalance;
    }
  }

  const projectedTotalNum = projectedTotal.toDecimalPlaces(2).toNumber();
  const totalContributed = current.plus(actualMonthly.times(chartYears * 12));
  const totalContributedNum = totalContributed.toDecimalPlaces(2).toNumber();
  const interestEarned = projectedTotal.minus(totalContributed);
  const interestEarnedNum = interestEarned.toDecimalPlaces(2).toNumber();

  // Interpretation
  const savingMore = monthlyOverride > 0 && actualMonthly.gt(monthlyRequired);
  const interpretation = savingMore
    ? `Saving **${formatCurrency(monthlyOverride)}/mo** (**${formatCurrency(monthlyOverride - monthlyRequiredNum)}** above the minimum), you will reach **${formatCurrency(params.goal)}** in about **${yearsToGoal} years** instead of ${years}. You will earn **${formatCurrency(Math.max(interestEarnedNum, 0))}** in interest.`
    : `To reach **${formatCurrency(params.goal)}** in **${years} years** starting with **${formatCurrency(params.current)}**, save **${formatCurrency(monthlyRequiredNum)}/mo** at **${params.rate}%** return. You will contribute **${formatCurrency(totalContributedNum)}** and earn **${formatCurrency(Math.max(interestEarnedNum, 0))}** in interest.`;

  return {
    outputs: {
      monthlyRequired: monthlyRequiredNum,
      yearsToGoal,
      projectedTotal: projectedTotalNum,
      totalContributed: totalContributedNum,
      interestEarned: Math.max(interestEarnedNum, 0),
    },
    chartData: {
      savingsProgress,
    },
    interpretation,
  };
}

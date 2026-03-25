import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Savings Goal Calculator (TOOL-05)
 *
 * Computes required monthly contribution to reach a target amount.
 *
 * @param params.goal - Target savings amount
 * @param params.current - Current savings
 * @param params.rate - Annual return rate (%)
 * @param params.years - Time horizon in years
 */
export function calculateSavingsGoal(params: Record<string, number>): CalculatorResults {
  const goal = new Decimal(params.goal);
  const current = new Decimal(params.current);
  const annualRate = new Decimal(params.rate);
  const years = params.years;
  const n = years * 12;
  const monthlyRate = annualRate.div(100).div(12);
  const isZeroRate = monthlyRate.isZero();

  // Calculate required monthly contribution
  let monthlyRequired: Decimal;

  if (isZeroRate) {
    // PMT = (goal - current) / n
    monthlyRequired = goal.minus(current).div(n);
  } else {
    // FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r
    // Solve for PMT: PMT = (FV - PV*(1+r)^n) / (((1+r)^n - 1)/r)
    const onePlusR = monthlyRate.plus(1);
    const compounded = onePlusR.toPower(n);
    const pvFuture = current.times(compounded);
    const annuityFactor = compounded.minus(1).div(monthlyRate);
    monthlyRequired = goal.minus(pvFuture).div(annuityFactor);
  }

  const monthlyRequiredNum = monthlyRequired.toDecimalPlaces(2).toNumber();

  // Year-by-year projection
  const savingsProgress: Record<string, number | string>[] = [];

  // Year 0
  savingsProgress.push({
    year: 0,
    balance: current.toDecimalPlaces(2).toNumber(),
    goal: params.goal,
  });

  let projectedTotal = new Decimal(0);

  for (let year = 1; year <= years; year++) {
    const months = year * 12;
    let yearBalance: Decimal;

    if (isZeroRate) {
      yearBalance = current.plus(monthlyRequired.times(months));
    } else {
      const onePlusR = monthlyRate.plus(1);
      const compounded = onePlusR.toPower(months);
      const pvFuture = current.times(compounded);
      const annuityFactor = compounded.minus(1).div(monthlyRate);
      const pmtFuture = monthlyRequired.times(annuityFactor);
      yearBalance = pvFuture.plus(pmtFuture);
    }

    savingsProgress.push({
      year,
      balance: yearBalance.toDecimalPlaces(2).toNumber(),
      goal: params.goal,
    });

    if (year === years) {
      projectedTotal = yearBalance;
    }
  }

  const projectedTotalNum = projectedTotal.toDecimalPlaces(2).toNumber();
  const totalContributed = current.plus(monthlyRequired.times(n));
  const totalContributedNum = totalContributed.toDecimalPlaces(2).toNumber();
  const interestEarned = projectedTotal.minus(totalContributed);
  const interestEarnedNum = interestEarned.toDecimalPlaces(2).toNumber();

  // Interpretation
  const interpretation = `To reach ${formatCurrency(params.goal)} in ${years} years starting with ${formatCurrency(params.current)}, save ${formatCurrency(monthlyRequiredNum)} per month at ${params.rate}% return. You will contribute ${formatCurrency(totalContributedNum)} and earn ${formatCurrency(Math.max(interestEarnedNum, 0))} in interest.`;

  return {
    outputs: {
      monthlyRequired: monthlyRequiredNum,
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

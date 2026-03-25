import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Compound Interest Calculator (TOOL-03)
 *
 * Computes future value with regular monthly contributions over time.
 *
 * @param params.initial - Initial deposit
 * @param params.monthly - Monthly contribution
 * @param params.rate - Annual return rate (%)
 * @param params.years - Investment time horizon
 */
export function calculateCompoundInterest(params: Record<string, number>): CalculatorResults {
  const initial = new Decimal(params.initial);
  const monthly = new Decimal(params.monthly);
  const annualRate = new Decimal(params.rate);
  const years = params.years;

  const monthlyRate = annualRate.div(100).div(12);
  const isZeroRate = monthlyRate.isZero();

  // Year-by-year growth chart data (year 0 through year N)
  const growth: Record<string, number | string>[] = [];

  // Year 0
  growth.push({
    year: 0,
    contributions: initial.toDecimalPlaces(2).toNumber(),
    interest: 0,
    balance: initial.toDecimalPlaces(2).toNumber(),
  });

  let futureValue = new Decimal(0);

  for (let year = 1; year <= years; year++) {
    const n = year * 12;
    let yearBalance: Decimal;

    if (isZeroRate) {
      yearBalance = initial.plus(monthly.times(n));
    } else {
      const onePlusR = monthlyRate.plus(1);
      const compounded = onePlusR.toPower(n);
      const pvFuture = initial.times(compounded);
      const annuityFactor = compounded.minus(1).div(monthlyRate);
      const pmtFuture = monthly.times(annuityFactor);
      yearBalance = pvFuture.plus(pmtFuture);
    }

    const totalContributions = initial.plus(monthly.times(n));
    const interestEarned = yearBalance.minus(totalContributions);

    growth.push({
      year,
      contributions: totalContributions.toDecimalPlaces(2).toNumber(),
      interest: Math.max(interestEarned.toDecimalPlaces(2).toNumber(), 0),
      balance: yearBalance.toDecimalPlaces(2).toNumber(),
    });

    if (year === years) {
      futureValue = yearBalance;
    }
  }

  // Final calculations
  const totalContributions = initial.plus(monthly.times(years * 12));
  const totalInterestEarned = futureValue.minus(totalContributions);

  const futureValueNum = futureValue.toDecimalPlaces(2).toNumber();
  const totalContributionsNum = totalContributions.toDecimalPlaces(2).toNumber();
  const totalInterestEarnedNum = totalInterestEarned.toDecimalPlaces(2).toNumber();

  // Interpretation
  const interpretation = `Starting with **${formatCurrency(params.initial)}** and adding **${formatCurrency(params.monthly)}/mo** at **${params.rate}%** return, your investment would grow to **${formatCurrency(futureValueNum)}** in **${years} years** -- that is **${formatCurrency(totalInterestEarnedNum)}** in earnings on **${formatCurrency(totalContributionsNum)}** contributed.`;

  return {
    outputs: {
      futureValue: futureValueNum,
      totalContributions: totalContributionsNum,
      totalInterestEarned: totalInterestEarnedNum,
    },
    chartData: {
      growth,
    },
    interpretation,
  };
}

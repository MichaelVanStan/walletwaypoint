import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Home Affordability Calculator (CALC-03, CALC-04)
 *
 * Computes how much house a user can afford using three DTI-based tiers:
 *   - Conservative: 28% front-end DTI, 36% back-end DTI
 *   - Moderate: 30% front-end DTI, 43% back-end DTI
 *   - Aggressive: 35% front-end DTI, 50% back-end DTI
 *
 * For each tier, derives maxMonthlyPayment, maxLoanAmount (30-year fixed),
 * maxHomePrice, downPaymentAmount, and the monthly housing payment.
 *
 * @param params.income - Annual gross income ($)
 * @param params.debts - Existing monthly debt payments ($)
 * @param params.dp - Down payment percentage (%)
 * @param params.rate - Annual mortgage interest rate (%)
 * @param params.netIncome - Optional annual net income after taxes (from persisted state). 0 means not provided.
 */
export function calculateHomeAffordability(
  params: Record<string, number | string>,
): CalculatorResults {
  const income = new Decimal(Number(params.income));
  const monthlyDebts = new Decimal(Number(params.debts));
  const downPaymentPct = new Decimal(Number(params.dp));
  const annualRate = new Decimal(Number(params.rate));
  const netIncome = Number(params.netIncome) || 0; // 0 means not provided

  const grossMonthlyIncome = income.div(12);
  const monthlyRate = annualRate.div(100).div(12);
  const n = 360; // 30-year fixed mortgage

  // DTI tier definitions: [label, frontEndDTI, backEndDTI]
  const tiers = [
    { label: 'Conservative', frontEnd: 0.28, backEnd: 0.36 },
    { label: 'Moderate', frontEnd: 0.30, backEnd: 0.43 },
    { label: 'Aggressive', frontEnd: 0.35, backEnd: 0.50 },
  ] as const;

  /**
   * Solve for present value (max loan) given a fixed monthly payment:
   *   PV = PMT * ((1 - (1+r)^-n) / r)
   * If rate is zero: PV = PMT * n
   */
  function solveMaxLoan(payment: Decimal): Decimal {
    if (monthlyRate.isZero()) {
      return payment.times(n);
    }
    const onePlusR = monthlyRate.plus(1);
    const onePlusRtoN = onePlusR.toPower(n);
    const factor = onePlusRtoN.minus(1).div(monthlyRate.times(onePlusRtoN));
    return payment.times(factor);
  }

  const tierResults = tiers.map((tier) => {
    // Max housing payment is the lesser of:
    //   1. Front-end: grossMonthlyIncome * frontEndDTI
    //   2. Back-end: grossMonthlyIncome * backEndDTI - monthlyDebts
    const frontEndMax = grossMonthlyIncome.times(tier.frontEnd);
    const backEndMax = grossMonthlyIncome.times(tier.backEnd).minus(monthlyDebts);

    // Ensure non-negative payment
    // decimal.js-light does not have static min/max, use gte/lte comparisons
    const minOfDTI = frontEndMax.lte(backEndMax) ? frontEndMax : backEndMax;
    const maxMonthlyPayment = minOfDTI.lt(0) ? new Decimal(0) : minOfDTI;

    const maxLoanAmount = solveMaxLoan(maxMonthlyPayment);

    // maxHomePrice = maxLoanAmount / (1 - downPaymentPct/100)
    const loanFraction = new Decimal(1).minus(downPaymentPct.div(100));
    const maxHomePrice = loanFraction.gt(0)
      ? maxLoanAmount.div(loanFraction)
      : new Decimal(0);

    const downPaymentAmount = maxHomePrice.times(downPaymentPct.div(100));

    // DTI percentages for comparison table
    const housingDti = grossMonthlyIncome.gt(0)
      ? maxMonthlyPayment.div(grossMonthlyIncome).times(100).toNumber()
      : 0;
    const totalDti = grossMonthlyIncome.gt(0)
      ? maxMonthlyPayment.plus(monthlyDebts).div(grossMonthlyIncome).times(100).toNumber()
      : 0;

    // Disposable income: monthly net minus housing payment minus debts
    // -1 sentinel means "no state selected / no net income available"
    let disposableIncome = -1;
    if (netIncome > 0) {
      const monthlyNet = netIncome / 12;
      disposableIncome = Math.round(monthlyNet - maxMonthlyPayment.toNumber() - monthlyDebts.toNumber());
    }

    return {
      label: tier.label,
      frontEnd: tier.frontEnd,
      backEnd: tier.backEnd,
      maxMonthlyPayment: Math.round(maxMonthlyPayment.toNumber()),
      maxLoanAmount: Math.round(maxLoanAmount.toNumber()),
      maxHomePrice: Math.round(maxHomePrice.toNumber()),
      downPaymentAmount: Math.round(downPaymentAmount.toNumber()),
      housingDti,
      totalDti,
      disposableIncome,
    };
  });

  const [conservative, moderate, aggressive] = tierResults;

  // Outputs for the result cards + comparison table
  const outputs: Record<string, number> = {
    conservativePrice: conservative.maxHomePrice,
    conservativePayment: conservative.maxMonthlyPayment,
    moderatePrice: moderate.maxHomePrice,
    moderatePayment: moderate.maxMonthlyPayment,
    aggressivePrice: aggressive.maxHomePrice,
    aggressivePayment: aggressive.maxMonthlyPayment,
    // DTI percentages for comparison table
    conservativeHousingDti: conservative.housingDti,
    conservativeTotalDti: conservative.totalDti,
    moderateHousingDti: moderate.housingDti,
    moderateTotalDti: moderate.totalDti,
    aggressiveHousingDti: aggressive.housingDti,
    aggressiveTotalDti: aggressive.totalDti,
    // Down payment amounts
    conservativeDown: conservative.downPaymentAmount,
    moderateDown: moderate.downPaymentAmount,
    aggressiveDown: aggressive.downPaymentAmount,
    // Disposable income (-1 means no state/net income available)
    conservativeDisposable: conservative.disposableIncome,
    moderateDisposable: moderate.disposableIncome,
    aggressiveDisposable: aggressive.disposableIncome,
  };

  // Bar chart data for tier comparison
  const tierComparison: Array<Record<string, number | string | unknown>> = tierResults.map(
    (t) => ({
      tier: t.label,
      price: t.maxHomePrice,
      payment: t.maxMonthlyPayment,
    }),
  );

  // Friendly mentor interpretation
  const incomeStr = formatCurrency(income.toNumber());
  const debtsStr = formatCurrency(monthlyDebts.toNumber());
  const conservativeStr = formatCurrency(conservative.maxHomePrice);
  const aggressiveStr = formatCurrency(aggressive.maxHomePrice);

  const interpretation =
    `Based on your **${incomeStr}** annual income and **${debtsStr}/mo** in existing debts, ` +
    `you could comfortably afford a home between **${conservativeStr}** (conservative) and ` +
    `**${aggressiveStr}** (aggressive). We recommend staying closer to the conservative ` +
    `range to keep flexibility in your budget.`;

  return {
    outputs,
    chartData: {
      tierComparison,
    },
    interpretation,
  };
}

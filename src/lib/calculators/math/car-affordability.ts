import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Car Affordability & Auto Loan Calculator (CALC-09, CALC-10)
 *
 * Two connected sections on a single page:
 * 1. "How much car can I afford?" — income-based tiers (10/12/15% rule)
 * 2. "What's my auto loan payment?" — standard PMT loan calculation
 *
 * @param params.income - Monthly take-home pay (net)
 * @param params.price - Vehicle price (MSRP or asking price)
 * @param params.down - Down payment (dollar amount)
 * @param params.rate - Loan APR (%)
 * @param params.term - Loan term in years
 */
export function calculateCarAffordability(params: Record<string, number>): CalculatorResults {
  const monthlyIncome = new Decimal(params.income);
  const vehiclePrice = new Decimal(params.price);
  const downPayment = new Decimal(params.down);
  const annualRate = new Decimal(params.rate);
  const termYears = params.term;

  const n = termYears * 12;
  const monthlyRate = annualRate.div(100).div(12);

  // =========================================================================
  // Section 1: Affordability tiers (10% / 12% / 15% of net monthly income)
  // =========================================================================
  // Industry rule: total car costs = payment + insurance + gas
  // Estimate insurance + gas at $200/month (industry average)
  const INSURANCE_GAS_ESTIMATE = new Decimal(200);

  const tiers = [
    { label: 'Conservative (10%)', pct: new Decimal(0.10) },
    { label: 'Moderate (12%)', pct: new Decimal(0.12) },
    { label: 'Aggressive (15%)', pct: new Decimal(0.15) },
  ];

  /**
   * Solve for max loan amount (present value) given a max monthly payment:
   * PV = PMT * ((1 - (1+r)^-n) / r)
   * When rate is 0: PV = PMT * n
   */
  function solveMaxLoanAmount(maxPayment: Decimal): Decimal {
    if (monthlyRate.isZero()) {
      return maxPayment.times(n);
    }
    const onePlusR = monthlyRate.plus(1);
    const onePlusRtoNegN = onePlusR.toPower(-n);
    const numerator = new Decimal(1).minus(onePlusRtoNegN);
    return maxPayment.times(numerator.div(monthlyRate));
  }

  const affordabilityTiers: Array<Record<string, number | string>> = [];
  const tierPrices: Record<string, number> = {};

  for (const tier of tiers) {
    const maxTotalCarCost = monthlyIncome.times(tier.pct);
    const maxLoanPayment = maxTotalCarCost.minus(INSURANCE_GAS_ESTIMATE);
    // If max loan payment is negative (income too low), max price is just the down payment
    const maxLoanAmount = maxLoanPayment.gt(0)
      ? solveMaxLoanAmount(maxLoanPayment)
      : new Decimal(0);
    const maxVehiclePrice = maxLoanAmount.plus(downPayment);

    const priceNum = maxVehiclePrice.toDecimalPlaces(0).toNumber();
    affordabilityTiers.push({
      tier: tier.label,
      maxPrice: priceNum,
    });

    // Store for outputs
    if (tier.pct.eq(0.10)) tierPrices.conservativePrice = priceNum;
    if (tier.pct.eq(0.12)) tierPrices.moderatePrice = priceNum;
    if (tier.pct.eq(0.15)) tierPrices.aggressivePrice = priceNum;
  }

  // =========================================================================
  // Section 2: Auto loan payment calculation
  // =========================================================================
  const loanAmount = vehiclePrice.minus(downPayment);
  // Guard against negative loan amount (down payment exceeds price)
  const effectiveLoan = loanAmount.gt(0) ? loanAmount : new Decimal(0);

  let monthlyPayment: Decimal;
  if (monthlyRate.isZero()) {
    monthlyPayment = n > 0 ? effectiveLoan.div(n) : effectiveLoan;
  } else {
    const onePlusR = monthlyRate.plus(1);
    const onePlusRtoN = onePlusR.toPower(n);
    const numerator = effectiveLoan.times(monthlyRate).times(onePlusRtoN);
    const denominator = onePlusRtoN.minus(1);
    monthlyPayment = numerator.div(denominator);
  }

  const totalPaid = monthlyPayment.times(n);
  const totalInterest = totalPaid.minus(effectiveLoan);
  const totalCost = totalPaid.plus(downPayment);

  // Round final values
  const monthlyPaymentNum = monthlyPayment.toDecimalPlaces(2).toNumber();
  const loanAmountNum = effectiveLoan.toDecimalPlaces(2).toNumber();
  const totalInterestNum = totalInterest.toDecimalPlaces(2).toNumber();
  const totalCostNum = totalCost.toDecimalPlaces(2).toNumber();

  // =========================================================================
  // Chart data
  // =========================================================================

  // Pie chart: total cost breakdown
  const loanBreakdown: Array<Record<string, number | string>> = [
    { name: 'Down Payment', value: downPayment.toDecimalPlaces(0).toNumber() },
    { name: 'Principal', value: loanAmountNum },
    { name: 'Interest', value: totalInterestNum },
  ];

  // =========================================================================
  // Interpretation
  // =========================================================================
  const conservativePrice = tierPrices.conservativePrice;
  const aggressivePrice = tierPrices.aggressivePrice;

  const interpretation = `Based on your **${formatCurrency(params.income)}/mo** take-home pay, a comfortable car budget is **${formatCurrency(conservativePrice)}**--**${formatCurrency(aggressivePrice)}**. At a **${formatCurrency(params.price)}** vehicle price with **${formatCurrency(params.down)}** down, your monthly payment would be **${formatCurrency(monthlyPaymentNum)}/mo** for **${termYears} years**, with **${formatCurrency(totalInterestNum)}** total in interest.`;

  return {
    outputs: {
      conservativePrice,
      moderatePrice: tierPrices.moderatePrice,
      aggressivePrice,
      monthlyPayment: monthlyPaymentNum,
      loanAmount: loanAmountNum,
      totalInterest: totalInterestNum,
      totalCost: totalCostNum,
    },
    chartData: {
      affordabilityTiers,
      loanBreakdown,
    },
    interpretation,
  };
}

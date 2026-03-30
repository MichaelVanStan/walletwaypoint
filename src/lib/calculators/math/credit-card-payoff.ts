import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Credit Card Payoff Calculator (CALC-05, CALC-06)
 *
 * Computes two scenarios -- minimum payments only vs. with extra payments --
 * showing payoff timeline, total interest, and delta savings.
 *
 * @param params.balance - Total credit card balance
 * @param params.apr - Annual Percentage Rate (%)
 * @param params.minpct - Minimum payment as % of balance (typically 2%)
 * @param params.extra - Extra monthly payment on top of minimum
 */
export function calculateCreditCardPayoff(params: Record<string, number | string>): CalculatorResults {
  const balance = new Decimal(Number(params.balance));
  const apr = new Decimal(Number(params.apr));
  const minPaymentPct = new Decimal(Number(params.minpct));
  const extraPayment = new Decimal(Number(params.extra));

  const monthlyRate = apr.div(100).div(12);
  const MAX_MONTHS = 600; // 50-year cap to prevent infinite loops

  // ============================================================================
  // Scenario 1: Minimum payments only
  // ============================================================================
  let minBalance = new Decimal(balance);
  let minTotalInterest = new Decimal(0);
  let minTotalPaid = new Decimal(0);
  let minMonths = 0;
  const minBalances: number[] = [];

  for (let month = 1; month <= MAX_MONTHS; month++) {
    if (minBalance.lte(0)) break;

    const interest = minBalance.times(monthlyRate);
    // Minimum payment = max(balance * minPct / 100, $25 floor)
    const calcPayment = minBalance.times(minPaymentPct).div(100);
    const minFloor = new Decimal(25);
    let payment = calcPayment.gt(minFloor) ? calcPayment : minFloor;

    // If payment exceeds remaining balance + interest, cap it
    if (payment.gt(minBalance.plus(interest))) {
      payment = minBalance.plus(interest);
    }

    const principal = payment.minus(interest);

    // If payment doesn't cover interest, debt grows -- cap at max months
    if (principal.lte(0)) {
      minMonths = MAX_MONTHS;
      minTotalInterest = minTotalInterest.plus(interest.times(MAX_MONTHS - month + 1));
      minTotalPaid = minTotalPaid.plus(payment.times(MAX_MONTHS - month + 1));
      for (let fill = month; fill <= MAX_MONTHS; fill++) {
        minBalances.push(minBalance.toDecimalPlaces(2).toNumber());
      }
      break;
    }

    minBalance = minBalance.minus(principal);
    if (minBalance.lt(0)) minBalance = new Decimal(0);

    minTotalInterest = minTotalInterest.plus(interest);
    minTotalPaid = minTotalPaid.plus(payment);
    minBalances.push(minBalance.toDecimalPlaces(2).toNumber());
    minMonths = month;

    if (minBalance.lt(1)) break; // Balance under $1 = paid off
  }

  // ============================================================================
  // Scenario 2: With extra payments
  // ============================================================================
  let extraBalance = new Decimal(balance);
  let extraTotalInterest = new Decimal(0);
  let extraTotalPaid = new Decimal(0);
  let extraMonths = 0;
  const extraBalances: number[] = [];
  const detailRows: Array<Record<string, string | number>> = [];

  for (let month = 1; month <= MAX_MONTHS; month++) {
    if (extraBalance.lte(0)) break;

    const interest = extraBalance.times(monthlyRate);
    const calcPayment = extraBalance.times(minPaymentPct).div(100);
    const minFloor2 = new Decimal(25);
    const basePayment = calcPayment.gt(minFloor2) ? calcPayment : minFloor2;
    let payment = basePayment.plus(extraPayment);

    // Cap payment at remaining balance + interest
    if (payment.gt(extraBalance.plus(interest))) {
      payment = extraBalance.plus(interest);
    }

    const principal = payment.minus(interest);

    extraBalance = extraBalance.minus(principal);
    if (extraBalance.lt(0)) extraBalance = new Decimal(0);

    extraTotalInterest = extraTotalInterest.plus(interest);
    extraTotalPaid = extraTotalPaid.plus(payment);

    const balanceVal = extraBalance.toDecimalPlaces(2).toNumber();
    extraBalances.push(balanceVal);

    detailRows.push({
      month,
      payment: payment.toDecimalPlaces(2).toNumber(),
      interest: interest.toDecimalPlaces(2).toNumber(),
      principal: principal.toDecimalPlaces(2).toNumber(),
      balance: balanceVal,
    });

    extraMonths = month;

    if (extraBalance.lt(1)) break;
  }

  // ============================================================================
  // Delta metrics
  // ============================================================================
  const monthsSaved = minMonths - extraMonths;
  const interestSaved = minTotalInterest.minus(extraTotalInterest).toDecimalPlaces(2).toNumber();

  // ============================================================================
  // Chart data: overlaid area chart with both balance timelines
  // ============================================================================
  const maxLen = Math.max(minBalances.length, extraBalances.length);
  const balanceOverTime: Array<Record<string, number | string | unknown>> = [];

  for (let i = 0; i < maxLen; i++) {
    balanceOverTime.push({
      month: i + 1,
      'Minimum Only': i < minBalances.length ? minBalances[i] : 0,
      'With Extra': i < extraBalances.length ? extraBalances[i] : 0,
    });
  }

  // ============================================================================
  // Detail columns for amortization table
  // ============================================================================
  const detailColumns = [
    { key: 'month', label: 'Month', format: 'number' as const },
    { key: 'payment', label: 'Payment', format: 'currency' as const },
    { key: 'interest', label: 'Interest', format: 'currency' as const },
    { key: 'principal', label: 'Principal', format: 'currency' as const },
    { key: 'balance', label: 'Balance', format: 'currency' as const },
  ];

  // ============================================================================
  // Interpretation
  // ============================================================================
  const balanceNum = Number(params.balance);
  const extraNum = Number(params.extra);
  const minYears = Math.floor(minMonths / 12);
  const minRemMonths = minMonths % 12;
  const minTimeStr = minYears > 0
    ? `${minMonths} months (${minYears} years${minRemMonths > 0 ? `, ${minRemMonths} months` : ''})`
    : `${minMonths} months`;

  let interpretation = `With minimum payments only, it would take **${minTimeStr}** and cost **${formatCurrency(minTotalInterest.toDecimalPlaces(2).toNumber())}** in interest to pay off your **${formatCurrency(balanceNum)}** balance.`;

  if (extraNum > 0) {
    interpretation += ` By adding **${formatCurrency(extraNum)}** extra per month, you could be debt-free in **${extraMonths} months** -- saving **${monthsSaved} months** and **${formatCurrency(Math.max(interestSaved, 0))}** in interest.`;
  } else {
    interpretation += ' Consider making extra payments to dramatically reduce your payoff time and interest costs.';
  }

  return {
    outputs: {
      minMonths,
      minTotalInterest: minTotalInterest.toDecimalPlaces(2).toNumber(),
      minTotalPaid: minTotalPaid.toDecimalPlaces(2).toNumber(),
      extraMonths,
      extraTotalInterest: extraTotalInterest.toDecimalPlaces(2).toNumber(),
      extraTotalPaid: extraTotalPaid.toDecimalPlaces(2).toNumber(),
      monthsSaved: Math.max(monthsSaved, 0),
      interestSaved: Math.max(interestSaved, 0),
    },
    chartData: {
      balanceOverTime,
    },
    interpretation,
    detailRows,
    detailColumns,
  };
}

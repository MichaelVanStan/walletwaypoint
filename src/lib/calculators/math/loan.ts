import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Loan Repayment Calculator (TOOL-04)
 *
 * Computes payoff timeline with optional extra payments and shows interest savings.
 *
 * @param params.amount - Loan amount
 * @param params.rate - Annual interest rate (%)
 * @param params.term - Loan term in years
 * @param params.extra - Extra monthly payment toward principal
 */
export function calculateLoanRepayment(params: Record<string, number>): CalculatorResults {
  const loanAmount = new Decimal(params.amount);
  const annualRate = new Decimal(params.rate);
  const termYears = params.term;
  const extra = new Decimal(params.extra);
  const n = termYears * 12;
  const monthlyRate = annualRate.div(100).div(12);
  const isZeroRate = monthlyRate.isZero();

  // Standard monthly payment via PMT formula
  let standardPayment: Decimal;
  if (isZeroRate) {
    standardPayment = loanAmount.div(n);
  } else {
    const onePlusR = monthlyRate.plus(1);
    const onePlusRtoN = onePlusR.toPower(n);
    const numerator = loanAmount.times(monthlyRate).times(onePlusRtoN);
    const denominator = onePlusRtoN.minus(1);
    standardPayment = numerator.div(denominator);
  }

  const monthlyPaymentNum = standardPayment.toDecimalPlaces(2).toNumber();

  // Standard amortization (no extra payments) for baseline totals
  let standardBalance = new Decimal(loanAmount);
  let standardTotalInterest = new Decimal(0);
  const standardBalances: number[] = [];

  for (let month = 1; month <= n; month++) {
    const interest = isZeroRate ? new Decimal(0) : standardBalance.times(monthlyRate);
    const principal = standardPayment.minus(interest);
    standardBalance = standardBalance.minus(principal);
    standardTotalInterest = standardTotalInterest.plus(interest);
    standardBalances.push(
      (standardBalance.lt(0) ? new Decimal(0) : standardBalance).toDecimalPlaces(2).toNumber()
    );
  }

  const totalInterestNum = standardTotalInterest.toDecimalPlaces(2).toNumber();
  const totalCostNum = standardPayment.times(n).toDecimalPlaces(2).toNumber();

  // Amortization with extra payments
  let extraBalance = new Decimal(loanAmount);
  let extraTotalInterest = new Decimal(0);
  let payoffMonths = n;
  const extraBalances: number[] = [];
  const detailRows: Array<Record<string, string | number>> = [];

  for (let month = 1; month <= n; month++) {
    if (extraBalance.lte(0)) {
      extraBalances.push(0);
      continue;
    }

    const interest = isZeroRate ? new Decimal(0) : extraBalance.times(monthlyRate);
    const actualPayment = standardPayment.plus(extra);
    const totalPrincipal = actualPayment.minus(interest);
    const principal = totalPrincipal.gt(extraBalance) ? extraBalance : totalPrincipal;
    const extraApplied = extra.gt(0) ? (principal.minus(standardPayment.minus(interest)).gt(0) ? principal.minus(standardPayment.minus(interest)) : new Decimal(0)) : new Decimal(0);

    extraBalance = extraBalance.minus(principal);
    extraTotalInterest = extraTotalInterest.plus(interest);

    const balanceVal = (extraBalance.lt(0) ? new Decimal(0) : extraBalance).toDecimalPlaces(2).toNumber();
    extraBalances.push(balanceVal);

    detailRows.push({
      month,
      payment: actualPayment.toDecimalPlaces(2).toNumber(),
      principal: (principal.minus(extraApplied)).toDecimalPlaces(2).toNumber(),
      interest: interest.toDecimalPlaces(2).toNumber(),
      extra: extraApplied.toDecimalPlaces(2).toNumber(),
      balance: balanceVal,
    });

    if (extraBalance.lte(0) && payoffMonths === n) {
      payoffMonths = month;
    }
  }

  const interestSaved = standardTotalInterest.minus(extraTotalInterest).toDecimalPlaces(2).toNumber();
  const monthsSaved = n - payoffMonths;

  // Chart data: balance over time
  const balanceOverTime: Record<string, number | string>[] = [];
  const maxMonths = Math.max(n, payoffMonths);

  for (let month = 1; month <= n; month++) {
    balanceOverTime.push({
      month,
      standard: standardBalances[month - 1],
      withExtra: month - 1 < extraBalances.length ? extraBalances[month - 1] : 0,
    });
  }

  const detailColumns = [
    { key: 'month', label: 'Month', format: 'number' as const },
    { key: 'payment', label: 'Payment', format: 'currency' as const },
    { key: 'principal', label: 'Principal', format: 'currency' as const },
    { key: 'interest', label: 'Interest', format: 'currency' as const },
    { key: 'extra', label: 'Extra', format: 'currency' as const },
    { key: 'balance', label: 'Balance', format: 'currency' as const },
  ];

  // Interpretation
  let interpretation = `A ${formatCurrency(params.amount)} loan at ${params.rate}% over ${termYears} years costs ${formatCurrency(monthlyPaymentNum)}/mo.`;
  if (params.extra > 0) {
    interpretation += ` Adding ${formatCurrency(params.extra)}/mo extra saves ${formatCurrency(interestSaved)} in interest and pays off ${monthsSaved} months early.`;
  } else {
    interpretation += ' Consider extra payments to save on interest.';
  }

  return {
    outputs: {
      monthlyPayment: monthlyPaymentNum,
      totalInterest: totalInterestNum,
      totalCost: totalCostNum,
      payoffMonths,
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

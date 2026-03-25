import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';
import { pmt } from './precision';

/**
 * Student Loan Repayment Calculator (TOOL-10)
 *
 * Compares three repayment plans:
 * - Standard (10-year fixed)
 * - Graduated (starts low, increases every 2 years)
 * - Income-Driven (IDR, simplified SAVE/REPAYE model)
 *
 * @param params.balance - Loan balance
 * @param params.rate - Annual interest rate (%)
 * @param params.income - Annual gross income (for IDR calculation)
 */
export function calculateStudentLoan(params: Record<string, number>): CalculatorResults {
  const balance = new Decimal(params.balance);
  const rate = params.rate;
  const income = new Decimal(params.income);
  const monthlyRate = new Decimal(rate).div(100).div(12);

  // ---- STANDARD PLAN (10-year fixed) ----
  const standardMonthly = pmt(params.balance, rate, 10);
  const standardTotal = new Decimal(standardMonthly).times(120).toDecimalPlaces(2).toNumber();
  const standardInterest = new Decimal(standardTotal).minus(balance).toDecimalPlaces(2).toNumber();

  // ---- GRADUATED PLAN ----
  // Initial payment = ~60% of standard payment
  const graduatedInitialDecimal = new Decimal(standardMonthly).times(0.60);
  const graduatedInitial = graduatedInitialDecimal.toDecimalPlaces(2).toNumber();

  // Payment increases 10% every 2 years over 10 years
  let graduatedBalance = new Decimal(balance);
  let graduatedTotalPaid = new Decimal(0);
  let currentGraduatedPayment = new Decimal(graduatedInitial);
  const graduatedPayments: number[] = [];
  let graduatedMonths = 0;

  for (let month = 1; month <= 240; month++) {
    // Increase every 24 months
    if (month > 1 && (month - 1) % 24 === 0) {
      currentGraduatedPayment = currentGraduatedPayment.times(1.10);
    }

    const interest = monthlyRate.isZero()
      ? new Decimal(0)
      : graduatedBalance.times(monthlyRate);
    const principal = currentGraduatedPayment.minus(interest);

    if (principal.lt(0)) {
      // Payment doesn't cover interest: balance grows
      graduatedBalance = graduatedBalance.plus(interest.minus(currentGraduatedPayment));
    } else {
      graduatedBalance = graduatedBalance.minus(principal);
    }

    graduatedTotalPaid = graduatedTotalPaid.plus(currentGraduatedPayment);
    graduatedPayments.push(currentGraduatedPayment.toDecimalPlaces(2).toNumber());
    graduatedMonths = month;

    if (graduatedBalance.lte(0)) break;
  }

  const graduatedTotal = graduatedTotalPaid.toDecimalPlaces(2).toNumber();

  // ---- INCOME-DRIVEN REPAYMENT (IDR) ----
  // discretionaryIncome = max(income - 15700 * 1.5, 0) (150% of poverty line ~$23,550)
  const povertyLine150 = new Decimal(15700).times(1.5);
  const discretionaryIncome = income.gt(povertyLine150)
    ? income.minus(povertyLine150)
    : new Decimal(0);

  // Monthly payment = 10% of discretionary income / 12
  const idrMonthlyDecimal = discretionaryIncome.times(0.10).div(12);
  const idrMonthly = idrMonthlyDecimal.toDecimalPlaces(2).toNumber();

  // Cap at 20 years (240 months) - remaining balance forgiven
  let idrBalance = new Decimal(balance);
  let idrTotalPaid = new Decimal(0);
  let idrMonths = 0;

  for (let month = 1; month <= 240; month++) {
    const interest = monthlyRate.isZero()
      ? new Decimal(0)
      : idrBalance.times(monthlyRate);
    const principal = idrMonthlyDecimal.minus(interest);

    if (principal.lt(0)) {
      // Negative amortization: balance grows
      idrBalance = idrBalance.plus(interest.minus(idrMonthlyDecimal));
    } else {
      idrBalance = idrBalance.minus(principal);
    }

    idrTotalPaid = idrTotalPaid.plus(idrMonthlyDecimal);
    idrMonths = month;

    if (idrBalance.lte(0)) break;
  }

  const idrForgiven = idrBalance.gt(0) ? idrBalance.toDecimalPlaces(2).toNumber() : 0;
  const idrTotal = idrTotalPaid.toDecimalPlaces(2).toNumber();

  // ---- CHART DATA ----
  // Plan comparison bar chart
  const planComparison: Record<string, number | string>[] = [
    { plan: 'Standard', totalCost: standardTotal, monthlyPayment: standardMonthly },
    { plan: 'Graduated', totalCost: graduatedTotal, monthlyPayment: graduatedInitial },
    { plan: 'Income-Driven', totalCost: idrTotal, monthlyPayment: idrMonthly },
  ];

  // Payment over time line chart (sampled every 12 months for readability)
  const maxMonths = Math.max(120, graduatedMonths, idrMonths);
  const paymentOverTime: Record<string, number | string>[] = [];
  const sampleInterval = 12;

  for (let m = 1; m <= maxMonths; m += sampleInterval) {
    const standardPmt = m <= 120 ? standardMonthly : 0;
    const gradPmt = m <= graduatedMonths
      ? (graduatedPayments[m - 1] || 0)
      : 0;
    const idrPmt = m <= idrMonths ? idrMonthly : 0;

    paymentOverTime.push({
      month: m,
      standard: standardPmt,
      graduated: gradPmt,
      idr: idrPmt,
    });
  }

  // Detail rows: plan comparison table
  const detailRows: Array<Record<string, string | number>> = [
    {
      plan: 'Standard',
      monthlyPayment: standardMonthly,
      totalCost: standardTotal,
      totalInterest: standardInterest,
      term: '120 months',
      forgiven: 0,
    },
    {
      plan: 'Graduated',
      monthlyPayment: graduatedInitial,
      totalCost: graduatedTotal,
      totalInterest: new Decimal(graduatedTotal).minus(balance).toDecimalPlaces(2).toNumber(),
      term: `${graduatedMonths} months`,
      forgiven: 0,
    },
    {
      plan: 'Income-Driven',
      monthlyPayment: idrMonthly,
      totalCost: idrTotal,
      totalInterest: new Decimal(idrTotal).minus(balance).plus(idrForgiven).toDecimalPlaces(2).toNumber(),
      term: `${idrMonths} months`,
      forgiven: idrForgiven,
    },
  ];

  const detailColumns = [
    { key: 'plan', label: 'Repayment Plan' },
    { key: 'monthlyPayment', label: 'Monthly Payment', format: 'currency' as const },
    { key: 'totalCost', label: 'Total Paid', format: 'currency' as const },
    { key: 'totalInterest', label: 'Total Interest', format: 'currency' as const },
    { key: 'term', label: 'Term' },
    { key: 'forgiven', label: 'Forgiven', format: 'currency' as const },
  ];

  // Interpretation
  const interpretation = `For a **${formatCurrency(params.balance)}** student loan at **${rate}%**: Standard repayment costs **${formatCurrency(standardMonthly)}/mo** (**${formatCurrency(standardTotal)}** total). Income-driven at **${formatCurrency(params.income)}/yr** income costs **${formatCurrency(idrMonthly)}/mo** with **${formatCurrency(idrForgiven)}** potentially forgiven after **20 years**.`;

  return {
    outputs: {
      standardMonthly,
      standardTotal,
      graduatedInitial,
      graduatedTotal,
      idrMonthly,
      idrTotal,
      idrForgiven,
    },
    chartData: {
      planComparison,
      paymentOverTime,
    },
    interpretation,
    detailRows,
    detailColumns,
  };
}

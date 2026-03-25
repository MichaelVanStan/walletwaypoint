import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';

/**
 * Mortgage Payment Calculator (TOOL-01)
 *
 * Computes monthly payment (P&I + tax + insurance), total interest,
 * total cost, and generates amortization schedule.
 *
 * @param params.price - Home price
 * @param params.dp - Down payment percentage
 * @param params.rate - Annual interest rate (%)
 * @param params.term - Loan term in years
 * @param params.tax - Annual property tax rate (%)
 * @param params.ins - Annual insurance cost ($)
 */
export function calculateMortgage(params: Record<string, number>): CalculatorResults {
  const price = new Decimal(params.price);
  const dpPct = new Decimal(params.dp);
  const annualRate = new Decimal(params.rate);
  const termYears = params.term;
  const taxRate = new Decimal(params.tax);
  const annualInsurance = new Decimal(params.ins);

  // Core calculations
  const downPayment = price.times(dpPct.div(100));
  const loanAmount = price.minus(downPayment);
  const n = termYears * 12;
  const monthlyRate = annualRate.div(100).div(12);

  // Monthly P&I
  let monthlyPI: Decimal;
  if (monthlyRate.isZero()) {
    monthlyPI = loanAmount.div(n);
  } else {
    const onePlusR = monthlyRate.plus(1);
    const onePlusRtoN = onePlusR.toPower(n);
    const numerator = loanAmount.times(monthlyRate).times(onePlusRtoN);
    const denominator = onePlusRtoN.minus(1);
    monthlyPI = numerator.div(denominator);
  }

  // Monthly tax and insurance
  const monthlyTax = price.times(taxRate.div(100)).div(12);
  const monthlyIns = annualInsurance.div(12);
  const monthlyPayment = monthlyPI.plus(monthlyTax).plus(monthlyIns);

  // Totals
  const totalInterest = monthlyPI.times(n).minus(loanAmount);
  const totalCost = monthlyPayment.times(n).plus(downPayment);

  // Round final values
  const monthlyPaymentNum = monthlyPayment.toDecimalPlaces(2).toNumber();
  const totalInterestNum = totalInterest.toDecimalPlaces(2).toNumber();
  const totalCostNum = totalCost.toDecimalPlaces(2).toNumber();
  const loanAmountNum = loanAmount.toDecimalPlaces(2).toNumber();
  const monthlyPINum = monthlyPI.toDecimalPlaces(2).toNumber();
  const monthlyTaxNum = monthlyTax.toDecimalPlaces(2).toNumber();
  const monthlyInsNum = monthlyIns.toDecimalPlaces(2).toNumber();

  // Year-by-year amortization chart data
  const amortization: Record<string, number | string>[] = [];
  let balance = new Decimal(loanAmount);
  let cumulativePrincipal = new Decimal(0);
  let cumulativeInterest = new Decimal(0);
  const yearlyTaxInsurance = monthlyTax.plus(monthlyIns).times(12);

  for (let year = 1; year <= termYears; year++) {
    for (let month = 0; month < 12; month++) {
      if (balance.lte(0)) break;
      const interestPayment = monthlyRate.isZero()
        ? new Decimal(0)
        : balance.times(monthlyRate);
      const rawPrincipal = monthlyPI.minus(interestPayment);
      const principalPayment = rawPrincipal.gt(balance) ? balance : rawPrincipal;
      balance = balance.minus(principalPayment);
      cumulativePrincipal = cumulativePrincipal.plus(principalPayment);
      cumulativeInterest = cumulativeInterest.plus(interestPayment);
    }

    const totalPaid = cumulativePrincipal
      .plus(cumulativeInterest)
      .plus(yearlyTaxInsurance.times(year));

    amortization.push({
      year,
      principal: cumulativePrincipal.toDecimalPlaces(0).toNumber(),
      interest: cumulativeInterest.toDecimalPlaces(0).toNumber(),
      balance: (balance.lt(0) ? new Decimal(0) : balance).toDecimalPlaces(0).toNumber(),
      totalPaid: totalPaid.toDecimalPlaces(0).toNumber(),
    });
  }

  // Payment breakdown pie chart
  const paymentBreakdown: Record<string, number | string>[] = [
    { name: 'Principal & Interest', value: monthlyPINum },
    { name: 'Property Tax', value: monthlyTaxNum },
    { name: 'Insurance', value: monthlyInsNum },
  ];

  // Month-by-month detail rows
  const detailRows: Array<Record<string, string | number>> = [];
  let detailBalance = new Decimal(loanAmount);

  for (let month = 1; month <= n; month++) {
    if (detailBalance.lte(0)) break;
    const interestPayment = monthlyRate.isZero()
      ? new Decimal(0)
      : detailBalance.times(monthlyRate);
    const rawPrincipal = monthlyPI.minus(interestPayment);
    const principalPayment = rawPrincipal.gt(detailBalance) ? detailBalance : rawPrincipal;
    detailBalance = detailBalance.minus(principalPayment);

    detailRows.push({
      month,
      payment: monthlyPINum,
      principal: principalPayment.toDecimalPlaces(2).toNumber(),
      interest: interestPayment.toDecimalPlaces(2).toNumber(),
      balance: (detailBalance.lt(0) ? new Decimal(0) : detailBalance).toDecimalPlaces(2).toNumber(),
    });
  }

  const detailColumns = [
    { key: 'month', label: 'Month', format: 'number' as const },
    { key: 'payment', label: 'Payment', format: 'currency' as const },
    { key: 'principal', label: 'Principal', format: 'currency' as const },
    { key: 'interest', label: 'Interest', format: 'currency' as const },
    { key: 'balance', label: 'Balance', format: 'currency' as const },
  ];

  // Interpretation
  const incomePercent = ((monthlyPaymentNum / 7000) * 100).toFixed(0);
  const savingsHint =
    termYears >= 30
      ? 'Consider a 15-year term to save significantly on total interest.'
      : 'A shorter term means more equity built faster.';

  const interpretation = `With a ${formatCurrency(params.price)} home at ${params.rate}%, you would pay ${formatCurrency(monthlyPaymentNum)} per month -- that is about ${incomePercent}% of the median US household income. ${savingsHint}`;

  return {
    outputs: {
      monthlyPayment: monthlyPaymentNum,
      totalInterest: totalInterestNum,
      totalCost: totalCostNum,
      loanAmount: loanAmountNum,
    },
    chartData: {
      amortization,
      paymentBreakdown,
    },
    interpretation,
    detailRows,
    detailColumns,
  };
}

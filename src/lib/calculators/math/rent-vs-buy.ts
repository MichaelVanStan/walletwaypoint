import Decimal from 'decimal.js-light';
import type { CalculatorResults } from '@/lib/calculators/types';
import { formatCurrency } from '@/lib/calculators/formatters';
import { pmt } from './precision';

/**
 * Rent vs. Buy Calculator (TOOL-09)
 *
 * Compares total cost of renting versus buying over a configurable
 * time horizon, including opportunity cost of invested down payment.
 *
 * @param params.rent - Monthly rent
 * @param params.price - Home purchase price
 * @param params.dp - Down payment percentage
 * @param params.rate - Mortgage interest rate (%)
 * @param params.years - Time horizon in years
 * @param params.appreciation - Annual home appreciation (%)
 * @param params.rentIncrease - Annual rent increase (%)
 */
export function calculateRentVsBuy(params: Record<string, number>): CalculatorResults {
  const rent = new Decimal(params.rent);
  const price = new Decimal(params.price);
  const dpPct = new Decimal(params.dp);
  const rate = params.rate;
  const years = params.years;
  const appreciation = new Decimal(params.appreciation);
  const rentIncrease = new Decimal(params.rentIncrease);

  // Buy costs
  const downPayment = price.times(dpPct.div(100));
  const loanAmount = price.minus(downPayment);
  const monthlyMortgage = new Decimal(pmt(loanAmount.toNumber(), rate, 30)); // 30yr mortgage
  const closingCosts = price.times(0.03);

  // Property costs: tax (1.1%), insurance ($1500/yr), maintenance (1%/yr)
  const annualPropertyTax = price.times(0.011);
  const annualInsurance = new Decimal(1500);
  const annualMaintenance = price.times(0.01);

  // Rent costs: year-by-year with annual increase
  let cumulativeRentCost = new Decimal(0);
  let cumulativeBuyCost = new Decimal(0);
  const chartData: Record<string, number | string>[] = [];
  const netPositionData: Record<string, number | string>[] = [];

  // Track mortgage balance for equity calculation
  const monthlyRate = new Decimal(rate).div(100).div(12);
  let mortgageBalance = new Decimal(loanAmount);

  // Investment opportunity cost: if down payment + closing were invested at 7%
  const investedAmount = downPayment.plus(closingCosts);
  const investmentReturnRate = new Decimal(0.07);

  for (let y = 1; y <= years; y++) {
    // Rent cost this year (compounding annual increase)
    const yearRent = rent.times(
      new Decimal(1).plus(rentIncrease.div(100)).toPower(y - 1),
    ).times(12);
    cumulativeRentCost = cumulativeRentCost.plus(yearRent);

    // Buy cost this year: mortgage + tax + insurance + maintenance
    const yearBuyCost = monthlyMortgage.times(12)
      .plus(annualPropertyTax)
      .plus(annualInsurance)
      .plus(annualMaintenance);
    cumulativeBuyCost = cumulativeBuyCost.plus(yearBuyCost);

    // Update mortgage balance (monthly amortization)
    for (let m = 0; m < 12; m++) {
      if (mortgageBalance.lte(0)) break;
      const interestPayment = monthlyRate.isZero()
        ? new Decimal(0)
        : mortgageBalance.times(monthlyRate);
      const principalPayment = monthlyMortgage.minus(interestPayment);
      mortgageBalance = mortgageBalance.minus(
        principalPayment.gt(mortgageBalance) ? mortgageBalance : principalPayment,
      );
    }

    chartData.push({
      year: y,
      renting: cumulativeRentCost.toDecimalPlaces(0).toNumber(),
      buying: cumulativeBuyCost.toDecimalPlaces(0).toNumber(),
    });

    // Net position at this year (accounting for equity and investment gains)
    const homeValueAtYear = price.times(
      new Decimal(1).plus(appreciation.div(100)).toPower(y),
    );
    const equityAtYear = homeValueAtYear.minus(
      mortgageBalance.lt(0) ? new Decimal(0) : mortgageBalance,
    );
    const investmentAtYear = investedAmount.times(
      new Decimal(1).plus(investmentReturnRate).toPower(y),
    );
    const investmentGainsAtYear = investmentAtYear.minus(investedAmount);

    const netRentAtYear = cumulativeRentCost.minus(investmentGainsAtYear);
    const netBuyAtYear = cumulativeBuyCost.plus(downPayment).plus(closingCosts).minus(equityAtYear);

    netPositionData.push({
      year: y,
      netRentCost: netRentAtYear.toDecimalPlaces(0).toNumber(),
      netBuyCost: netBuyAtYear.toDecimalPlaces(0).toNumber(),
    });
  }

  // Total rent cost (gross)
  const totalRentCost = cumulativeRentCost.toDecimalPlaces(2).toNumber();

  // Total buy cost (gross, including down payment and closing costs)
  const totalBuyCostGross = cumulativeBuyCost.plus(downPayment).plus(closingCosts);
  const totalBuyCost = totalBuyCostGross.toDecimalPlaces(2).toNumber();

  // Home equity at end of period
  const homeValueFinal = price.times(
    new Decimal(1).plus(appreciation.div(100)).toPower(years),
  );
  const sellingCosts = homeValueFinal.times(0.06); // 6% selling costs
  const equityGained = homeValueFinal.minus(
    mortgageBalance.lt(0) ? new Decimal(0) : mortgageBalance,
  ).minus(sellingCosts);

  // Net buy cost = total costs - equity gained
  const netBuyCostDecimal = totalBuyCostGross.minus(equityGained);
  const netBuyCost = netBuyCostDecimal.toDecimalPlaces(2).toNumber();

  // Investment gains if renting (down payment + closing invested at 7%)
  const investmentValue = investedAmount.times(
    new Decimal(1).plus(investmentReturnRate).toPower(years),
  );
  const investmentGains = investmentValue.minus(investedAmount);

  // Net rent cost = total rent - investment gains
  const netRentCostDecimal = cumulativeRentCost.minus(investmentGains);
  const netRentCost = netRentCostDecimal.toDecimalPlaces(2).toNumber();

  // Recommendation: buy if net buy cost < net rent cost
  const recommendation = netBuyCostDecimal.lt(netRentCostDecimal) ? 1 : 0;
  const savingsAmount = netBuyCostDecimal.minus(netRentCostDecimal).abs().toDecimalPlaces(2).toNumber();

  // Interpretation
  const interpretation = `Over ${years} years, renting costs ${formatCurrency(netRentCost)} net while buying costs ${formatCurrency(netBuyCost)} net. ${recommendation === 1 ? 'Buying' : 'Renting'} saves you ${formatCurrency(savingsAmount)}.`;

  return {
    outputs: {
      totalRentCost,
      totalBuyCost,
      netRentCost,
      netBuyCost,
      savingsAmount,
      recommendation,
    },
    chartData: {
      cumulativeCost: chartData,
      netPosition: netPositionData,
    },
    interpretation,
  };
}

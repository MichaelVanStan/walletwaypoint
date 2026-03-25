import { describe, it, expect } from 'vitest';
import { calculateMortgage } from '../mortgage';

describe('calculateMortgage', () => {
  it('computes correct monthly payment for standard 30yr mortgage', () => {
    const result = calculateMortgage({
      price: 415000,
      dp: 20,
      rate: 6.5,
      term: 30,
      tax: 1.1,
      ins: 1500,
    });

    // Loan amount = 415000 * 0.8 = 332000
    expect(result.outputs.loanAmount).toBe(332000);

    // Monthly P&I should be close to ~$2098 (just P&I, not including tax/ins)
    // Total monthly payment (P&I + tax + insurance) should be close to $2528
    expect(result.outputs.monthlyPayment).toBeGreaterThan(2400);
    expect(result.outputs.monthlyPayment).toBeLessThan(2650);

    // Total interest over 30 years should be substantial
    expect(result.outputs.totalInterest).toBeGreaterThan(400000);
    expect(result.outputs.totalInterest).toBeLessThan(500000);

    // Total cost should be positive and larger than just interest
    expect(result.outputs.totalCost).toBeGreaterThan(result.outputs.totalInterest);
  });

  it('generates year-by-year amortization chart data', () => {
    const result = calculateMortgage({
      price: 415000,
      dp: 20,
      rate: 6.5,
      term: 30,
      tax: 1.1,
      ins: 1500,
    });

    // Should have amortization chart data with 30 year entries
    expect(result.chartData.amortization).toBeDefined();
    expect(result.chartData.amortization.length).toBe(30);

    // First year should have principal, interest, balance
    const firstYear = result.chartData.amortization[0];
    expect(firstYear).toHaveProperty('year');
    expect(firstYear).toHaveProperty('principal');
    expect(firstYear).toHaveProperty('interest');
    expect(firstYear).toHaveProperty('balance');

    // Balance should decrease over time
    const lastYear = result.chartData.amortization[29];
    expect(Number(lastYear.balance)).toBeLessThan(Number(firstYear.balance));
  });

  it('generates payment breakdown pie chart data', () => {
    const result = calculateMortgage({
      price: 415000,
      dp: 20,
      rate: 6.5,
      term: 30,
      tax: 1.1,
      ins: 1500,
    });

    expect(result.chartData.paymentBreakdown).toBeDefined();
    expect(result.chartData.paymentBreakdown.length).toBe(3);
  });

  it('generates 360 detail rows for 30yr mortgage', () => {
    const result = calculateMortgage({
      price: 415000,
      dp: 20,
      rate: 6.5,
      term: 30,
      tax: 1.1,
      ins: 1500,
    });

    expect(result.detailRows).toBeDefined();
    expect(result.detailRows!.length).toBe(360);

    // Detail columns should be defined
    expect(result.detailColumns).toBeDefined();
    expect(result.detailColumns!.length).toBeGreaterThanOrEqual(5);
  });

  it('handles zero rate edge case', () => {
    const result = calculateMortgage({
      price: 360000,
      dp: 0,
      rate: 0,
      term: 30,
      tax: 0,
      ins: 0,
    });

    // With 0% rate, monthly payment = loanAmount / (term * 12)
    // 360000 / 360 = 1000
    expect(result.outputs.monthlyPayment).toBeCloseTo(1000, 0);
    expect(result.outputs.totalInterest).toBe(0);
    expect(result.outputs.loanAmount).toBe(360000);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateMortgage({
      price: 415000,
      dp: 20,
      rate: 6.5,
      term: 30,
      tax: 1.1,
      ins: 1500,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });
});

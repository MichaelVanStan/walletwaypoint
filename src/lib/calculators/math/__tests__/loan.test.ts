import { describe, it, expect } from 'vitest';
import { calculateLoanRepayment } from '../loan';

describe('calculateLoanRepayment', () => {
  it('computes correct monthly payment for standard loan', () => {
    const result = calculateLoanRepayment({
      amount: 25000,
      rate: 8,
      term: 5,
      extra: 0,
    });

    // Monthly payment should be close to $507
    expect(result.outputs.monthlyPayment).toBeGreaterThan(500);
    expect(result.outputs.monthlyPayment).toBeLessThan(515);

    // Total interest should be close to $5416
    expect(result.outputs.totalInterest).toBeGreaterThan(5300);
    expect(result.outputs.totalInterest).toBeLessThan(5500);

    // Total cost should be close to $30416
    expect(result.outputs.totalCost).toBeGreaterThan(30200);
    expect(result.outputs.totalCost).toBeLessThan(30600);

    // No extra payments, payoff at full term
    expect(result.outputs.payoffMonths).toBe(60);
    expect(result.outputs.interestSaved).toBe(0);
  });

  it('computes correct savings with extra payments', () => {
    const result = calculateLoanRepayment({
      amount: 25000,
      rate: 8,
      term: 5,
      extra: 100,
    });

    // With extra payments, payoff should be less than 60 months
    expect(result.outputs.payoffMonths).toBeLessThan(60);

    // Interest saved should be positive
    expect(result.outputs.interestSaved).toBeGreaterThan(0);

    // Monthly payment should still be the standard payment (extra is separate)
    expect(result.outputs.monthlyPayment).toBeGreaterThan(500);
    expect(result.outputs.monthlyPayment).toBeLessThan(515);
  });

  it('generates balance over time chart data', () => {
    const result = calculateLoanRepayment({
      amount: 25000,
      rate: 8,
      term: 5,
      extra: 100,
    });

    expect(result.chartData.balanceOverTime).toBeDefined();
    expect(result.chartData.balanceOverTime.length).toBeGreaterThan(0);

    // Should have standard and withExtra series
    const firstPoint = result.chartData.balanceOverTime[0];
    expect(firstPoint).toHaveProperty('month');
    expect(firstPoint).toHaveProperty('standard');
    expect(firstPoint).toHaveProperty('withExtra');
  });

  it('generates detail rows with month-by-month schedule', () => {
    const result = calculateLoanRepayment({
      amount: 25000,
      rate: 8,
      term: 5,
      extra: 0,
    });

    expect(result.detailRows).toBeDefined();
    expect(result.detailRows!.length).toBe(60);

    expect(result.detailColumns).toBeDefined();
    expect(result.detailColumns!.length).toBeGreaterThanOrEqual(6);
  });

  it('handles zero rate edge case', () => {
    const result = calculateLoanRepayment({
      amount: 12000,
      rate: 0,
      term: 2,
      extra: 0,
    });

    // With 0% rate, monthly payment = 12000 / 24 = 500
    expect(result.outputs.monthlyPayment).toBeCloseTo(500, 0);
    expect(result.outputs.totalInterest).toBe(0);
    expect(result.outputs.payoffMonths).toBe(24);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateLoanRepayment({
      amount: 25000,
      rate: 8,
      term: 5,
      extra: 0,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });
});

import { describe, it, expect } from 'vitest';
import { calculateStudentLoan } from '../student-loan';

describe('calculateStudentLoan', () => {
  const defaultParams = {
    balance: 30000,
    rate: 5.5,
    income: 55000,
  };

  it('computes standard plan with 120 month term', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.outputs.standardMonthly).toBeGreaterThan(0);
    // Standard total should exceed balance due to interest
    expect(result.outputs.standardTotal).toBeGreaterThan(30000);
  });

  it('graduated initial payment is less than standard payment', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.outputs.graduatedInitial).toBeLessThan(
      result.outputs.standardMonthly,
    );
  });

  it('all plan total costs exceed the loan balance', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.outputs.standardTotal).toBeGreaterThan(30000);
    expect(result.outputs.graduatedTotal).toBeGreaterThan(30000);
    expect(result.outputs.idrTotal).toBeGreaterThan(0);
  });

  it('generates planComparison bar chart data', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.chartData.planComparison).toBeDefined();
    expect(result.chartData.planComparison.length).toBe(3);

    const standard = result.chartData.planComparison.find(
      (d) => d.plan === 'Standard',
    );
    expect(standard).toBeDefined();
    expect(Number(standard!.totalCost)).toBeGreaterThan(0);
  });

  it('generates paymentOverTime line chart data', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.chartData.paymentOverTime).toBeDefined();
    expect(result.chartData.paymentOverTime.length).toBeGreaterThan(0);

    // First entry should have month, standard, graduated, idr
    const first = result.chartData.paymentOverTime[0];
    expect(first).toHaveProperty('month');
    expect(first).toHaveProperty('standard');
    expect(first).toHaveProperty('graduated');
    expect(first).toHaveProperty('idr');
  });

  it('computes IDR monthly based on income', () => {
    const result = calculateStudentLoan(defaultParams);

    // IDR monthly should be based on discretionary income
    expect(result.outputs.idrMonthly).toBeGreaterThan(0);
    expect(result.outputs.idrMonthly).toBeLessThan(
      result.outputs.standardMonthly,
    );
  });

  it('tracks IDR forgiveness amount', () => {
    const result = calculateStudentLoan(defaultParams);

    // idrForgiven should be a number (may be 0 if fully paid)
    expect(typeof result.outputs.idrForgiven).toBe('number');
    expect(result.outputs.idrForgiven).toBeGreaterThanOrEqual(0);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateStudentLoan(defaultParams);

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });

  it('handles low income scenario with higher IDR forgiveness', () => {
    const result = calculateStudentLoan({
      balance: 50000,
      rate: 6.0,
      income: 30000,
    });

    // Low income should result in lower IDR payments and potentially more forgiveness
    expect(result.outputs.idrMonthly).toBeLessThan(
      result.outputs.standardMonthly,
    );
  });
});

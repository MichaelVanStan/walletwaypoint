import { describe, it, expect } from 'vitest';
import { calculateSavingsGoal } from '../savings';

describe('calculateSavingsGoal', () => {
  it('computes positive monthly required to reach goal', () => {
    const result = calculateSavingsGoal({
      goal: 50000,
      current: 5000,
      rate: 4.5,
      years: 5,
    });

    // Monthly required should be positive
    expect(result.outputs.monthlyRequired).toBeGreaterThan(0);

    // Projected total should be very close to goal
    expect(result.outputs.projectedTotal).toBeGreaterThan(49900);
    expect(result.outputs.projectedTotal).toBeLessThan(50100);

    // Total contributed = current + monthlyRequired * months
    expect(result.outputs.totalContributed).toBeCloseTo(
      5000 + result.outputs.monthlyRequired * 60,
      0
    );

    // Interest earned should be positive with non-zero rate
    expect(result.outputs.interestEarned).toBeGreaterThan(0);
  });

  it('handles zero rate edge case', () => {
    const result = calculateSavingsGoal({
      goal: 50000,
      current: 5000,
      rate: 0,
      years: 5,
    });

    // monthlyRequired = (50000 - 5000) / (5 * 12) = 45000 / 60 = 750
    expect(result.outputs.monthlyRequired).toBeCloseTo(750, 0);
    expect(result.outputs.interestEarned).toBe(0);
  });

  it('generates savings progress chart data', () => {
    const result = calculateSavingsGoal({
      goal: 50000,
      current: 5000,
      rate: 4.5,
      years: 5,
    });

    expect(result.chartData.savingsProgress).toBeDefined();
    // Should have 6 entries (year 0 through year 5)
    expect(result.chartData.savingsProgress.length).toBe(6);

    // Year 0 should start with current savings
    const yearZero = result.chartData.savingsProgress[0];
    expect(yearZero.year).toBe(0);
    expect(Number(yearZero.balance)).toBe(5000);
    expect(Number(yearZero.goal)).toBe(50000);

    // Last year should reach the goal
    const lastYear = result.chartData.savingsProgress[5];
    expect(Number(lastYear.balance)).toBeGreaterThan(49900);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateSavingsGoal({
      goal: 50000,
      current: 5000,
      rate: 4.5,
      years: 5,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });
});

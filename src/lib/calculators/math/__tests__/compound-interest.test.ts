import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest } from '../compound-interest';

describe('calculateCompoundInterest', () => {
  it('computes correct future value with monthly contributions', () => {
    const result = calculateCompoundInterest({
      initial: 10000,
      monthly: 500,
      rate: 7,
      years: 20,
    });

    // totalContributions = 10000 + 500 * 240 = 130000
    expect(result.outputs.totalContributions).toBe(130000);

    // futureValue should be close to ~$300,851 (verified in 02-01-SUMMARY.md)
    expect(result.outputs.futureValue).toBeGreaterThan(290000);
    expect(result.outputs.futureValue).toBeLessThan(320000);

    // totalInterestEarned = futureValue - totalContributions
    expect(result.outputs.totalInterestEarned).toBeCloseTo(
      result.outputs.futureValue - result.outputs.totalContributions,
      0
    );
  });

  it('generates year-by-year growth chart data', () => {
    const result = calculateCompoundInterest({
      initial: 10000,
      monthly: 500,
      rate: 7,
      years: 20,
    });

    // Should have 21 entries (year 0 through year 20)
    expect(result.chartData.growth).toBeDefined();
    expect(result.chartData.growth.length).toBe(21);

    // Year 0 should be the initial deposit
    const yearZero = result.chartData.growth[0];
    expect(yearZero.year).toBe(0);
    expect(Number(yearZero.contributions)).toBe(10000);
    expect(Number(yearZero.interest)).toBe(0);
    expect(Number(yearZero.balance)).toBe(10000);

    // Balance should grow over time
    const lastYear = result.chartData.growth[20];
    expect(Number(lastYear.balance)).toBeGreaterThan(Number(yearZero.balance));
  });

  it('handles zero rate edge case', () => {
    const result = calculateCompoundInterest({
      initial: 10000,
      monthly: 500,
      rate: 0,
      years: 20,
    });

    // futureValue = 10000 + 500 * 240 = 130000
    expect(result.outputs.futureValue).toBe(130000);
    expect(result.outputs.totalInterestEarned).toBe(0);
    expect(result.outputs.totalContributions).toBe(130000);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateCompoundInterest({
      initial: 10000,
      monthly: 500,
      rate: 7,
      years: 20,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });
});

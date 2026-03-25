import { describe, it, expect } from 'vitest';
import { calculateRentAffordability } from '../rent-affordability';

describe('calculateRentAffordability', () => {
  it('computes correct affordable rent from income and expenses', () => {
    const result = calculateRentAffordability({
      income: 5500,
      maxPct: 28,
      utilities: 200,
      other: 300,
    });

    // maxRent = 5500 * 0.28 = 1540
    expect(result.outputs.maxRent).toBe(1540);

    // affordableRent = 1540 - 200 - 300 = 1040
    expect(result.outputs.affordableRent).toBe(1040);

    // annualRentCost = 1040 * 12 = 12480
    expect(result.outputs.annualRentCost).toBe(12480);

    // monthlyRemaining = 5500 - 1040 - 200 - 300 = 3960
    expect(result.outputs.monthlyRemaining).toBe(3960);
  });

  it('generates income allocation pie chart data', () => {
    const result = calculateRentAffordability({
      income: 5500,
      maxPct: 28,
      utilities: 200,
      other: 300,
    });

    expect(result.chartData.incomeAllocation).toBeDefined();
    expect(result.chartData.incomeAllocation.length).toBe(4);

    // Should contain rent, utilities, other, remaining
    const names = result.chartData.incomeAllocation.map((d) => d.name);
    expect(names).toContain('Affordable Rent');
    expect(names).toContain('Utilities');
    expect(names).toContain('Other Expenses');
    expect(names).toContain('Remaining');
  });

  it('handles high expense scenario where affordable rent is zero or negative', () => {
    const result = calculateRentAffordability({
      income: 2000,
      maxPct: 28,
      utilities: 400,
      other: 300,
    });

    // maxRent = 2000 * 0.28 = 560
    // affordableRent = 560 - 400 - 300 = -140, should clamp to 0
    expect(result.outputs.affordableRent).toBeLessThanOrEqual(0);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateRentAffordability({
      income: 5500,
      maxPct: 28,
      utilities: 200,
      other: 300,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });
});

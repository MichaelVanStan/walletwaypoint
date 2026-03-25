import { describe, it, expect } from 'vitest';
import { calculateRetirement } from '../retirement';

describe('calculateRetirement', () => {
  it('computes retirement balance for standard inputs', () => {
    const result = calculateRetirement({
      age: 30,
      retireAge: 65,
      savings: 50000,
      monthly: 500,
      returnRate: 7,
      withdrawalRate: 4,
    });

    // With 35 years of contributions at 7%, balance should exceed $1M
    expect(result.outputs.retirementBalance).toBeGreaterThan(1000000);

    // Annual withdrawal at 4%
    expect(result.outputs.annualWithdrawal).toBeCloseTo(
      result.outputs.retirementBalance * 0.04,
      -2,
    );

    // Monthly withdrawal should be annual / 12
    expect(result.outputs.monthlyWithdrawal).toBeCloseTo(
      result.outputs.annualWithdrawal / 12,
      0,
    );

    // Years until depleted should be > 20 at 4% withdrawal with reduced returns
    expect(result.outputs.yearsUntilDepleted).toBeGreaterThan(20);
  });

  it('tracks total contributions correctly', () => {
    const result = calculateRetirement({
      age: 30,
      retireAge: 65,
      savings: 50000,
      monthly: 500,
      returnRate: 7,
      withdrawalRate: 4,
    });

    // totalContributed = savings + monthly * years * 12
    const expected = 50000 + 500 * 35 * 12;
    expect(result.outputs.totalContributed).toBe(expected);
  });

  it('generates retirementProjection chart data', () => {
    const result = calculateRetirement({
      age: 30,
      retireAge: 65,
      savings: 50000,
      monthly: 500,
      returnRate: 7,
      withdrawalRate: 4,
    });

    expect(result.chartData.retirementProjection).toBeDefined();
    expect(result.chartData.retirementProjection.length).toBeGreaterThan(35);

    // First entry should match starting age and savings
    const first = result.chartData.retirementProjection[0];
    expect(first.age).toBe(30);
    expect(first.balance).toBe(50000);

    // Balance should grow during accumulation phase
    const atRetirement = result.chartData.retirementProjection.find(
      (d) => d.age === 65,
    );
    expect(atRetirement).toBeDefined();
    expect(Number(atRetirement!.balance)).toBeGreaterThan(50000);
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateRetirement({
      age: 30,
      retireAge: 65,
      savings: 50000,
      monthly: 500,
      returnRate: 7,
      withdrawalRate: 4,
    });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });

  it('handles zero savings start', () => {
    const result = calculateRetirement({
      age: 25,
      retireAge: 65,
      savings: 0,
      monthly: 1000,
      returnRate: 7,
      withdrawalRate: 4,
    });

    expect(result.outputs.retirementBalance).toBeGreaterThan(0);
    expect(result.outputs.totalContributed).toBe(1000 * 40 * 12);
  });
});

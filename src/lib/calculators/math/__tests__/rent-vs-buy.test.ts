import { describe, it, expect } from 'vitest';
import { calculateRentVsBuy } from '../rent-vs-buy';

describe('calculateRentVsBuy', () => {
  const defaultParams = {
    rent: 1800,
    price: 415000,
    dp: 20,
    rate: 6.5,
    years: 7,
    appreciation: 3,
    rentIncrease: 3,
  };

  it('computes positive total costs for both renting and buying', () => {
    const result = calculateRentVsBuy(defaultParams);

    expect(result.outputs.totalRentCost).toBeGreaterThan(0);
    expect(result.outputs.totalBuyCost).toBeGreaterThan(0);
    expect(result.outputs.netRentCost).toBeGreaterThan(0);
    expect(result.outputs.netBuyCost).toBeGreaterThan(0);
  });

  it('returns recommendation as 0 (rent) or 1 (buy)', () => {
    const result = calculateRentVsBuy(defaultParams);

    expect([0, 1]).toContain(result.outputs.recommendation);
  });

  it('computes savings amount as absolute difference of net costs', () => {
    const result = calculateRentVsBuy(defaultParams);

    const expectedSavings = Math.abs(
      result.outputs.netBuyCost - result.outputs.netRentCost,
    );
    expect(result.outputs.savingsAmount).toBeCloseTo(expectedSavings, 0);
  });

  it('generates cumulativeCost area chart data', () => {
    const result = calculateRentVsBuy(defaultParams);

    expect(result.chartData.cumulativeCost).toBeDefined();
    expect(result.chartData.cumulativeCost.length).toBe(7);

    // Each entry should have year, renting, buying
    const firstYear = result.chartData.cumulativeCost[0];
    expect(firstYear).toHaveProperty('year');
    expect(firstYear).toHaveProperty('renting');
    expect(firstYear).toHaveProperty('buying');
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateRentVsBuy(defaultParams);

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });

  it('favors renting for short time horizon with high home price', () => {
    const result = calculateRentVsBuy({
      rent: 1200,
      price: 600000,
      dp: 10,
      rate: 7.5,
      years: 2,
      appreciation: 2,
      rentIncrease: 3,
    });

    // Short horizon with high buy costs should favor renting
    expect(result.outputs.recommendation).toBe(0);
  });

  it('cumulative costs increase over time', () => {
    const result = calculateRentVsBuy(defaultParams);

    const chart = result.chartData.cumulativeCost;
    for (let i = 1; i < chart.length; i++) {
      expect(Number(chart[i].renting)).toBeGreaterThanOrEqual(
        Number(chart[i - 1].renting),
      );
    }
  });
});

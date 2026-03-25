import { describe, it, expect } from 'vitest';
import { calculateTax } from '../tax';

describe('calculateTax', () => {
  it('computes tax for single filer at $75K', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    // taxableIncome = 75000 - 15700 = 59300
    expect(result.outputs.taxableIncome).toBe(59300);

    // Walk through brackets:
    // 10% on first 11925 = 1192.50
    // 12% on 11926-48475 = (48475 - 11925) * 0.12 = 36550 * 0.12 = 4386.00
    // 22% on 48476-59300 = (59300 - 48475) * 0.22 = 10825 * 0.22 = 2381.50
    // Total = 1192.50 + 4386.00 + 2381.50 = 7960.00
    expect(result.outputs.totalTax).toBeCloseTo(7960, -1);

    // Effective rate should be between 10% and 15%
    expect(result.outputs.effectiveRate).toBeGreaterThan(10);
    expect(result.outputs.effectiveRate).toBeLessThan(15);

    // Marginal rate should be 22%
    expect(result.outputs.marginalRate).toBe(22);

    // Take home = income - totalTax
    expect(result.outputs.takeHome).toBeCloseTo(
      75000 - result.outputs.totalTax,
      0,
    );
  });

  it('computes lower tax for married filing jointly at $75K', () => {
    const resultSingle = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    const resultMarried = calculateTax({
      income: 75000,
      filing: 'married',
      deduction: 31400,
    } as unknown as Record<string, number>);

    // Married should have lower tax
    expect(resultMarried.outputs.totalTax).toBeLessThan(
      resultSingle.outputs.totalTax,
    );

    // taxableIncome = 75000 - 31400 = 43600
    expect(resultMarried.outputs.taxableIncome).toBe(43600);
  });

  it('handles zero income', () => {
    const result = calculateTax({
      income: 0,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.outputs.totalTax).toBe(0);
    expect(result.outputs.effectiveRate).toBe(0);
    expect(result.outputs.takeHome).toBe(0);
    expect(result.outputs.taxableIncome).toBe(0);
  });

  it('handles income less than deduction', () => {
    const result = calculateTax({
      income: 10000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.outputs.totalTax).toBe(0);
    expect(result.outputs.taxableIncome).toBe(0);
  });

  it('generates brackets bar chart data', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.chartData.brackets).toBeDefined();
    // Only non-zero brackets should appear
    expect(result.chartData.brackets.length).toBeGreaterThan(0);
    expect(result.chartData.brackets.length).toBeLessThanOrEqual(7);
  });

  it('generates breakdown pie chart data', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.chartData.breakdown).toBeDefined();
    expect(result.chartData.breakdown.length).toBe(2);
  });

  it('generates detail rows for bracket breakdown', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.detailRows).toBeDefined();
    expect(result.detailRows!.length).toBeGreaterThan(0);
    expect(result.detailColumns).toBeDefined();
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'single',
      deduction: 15700,
    } as unknown as Record<string, number>);

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });

  it('handles head of household filing', () => {
    const result = calculateTax({
      income: 75000,
      filing: 'head',
      deduction: 23500,
    } as unknown as Record<string, number>);

    expect(result.outputs.taxableIncome).toBe(51500);
    expect(result.outputs.totalTax).toBeGreaterThan(0);
  });
});

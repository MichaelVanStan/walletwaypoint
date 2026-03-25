import { describe, it, expect } from 'vitest';
import { calculateBudget } from '../budget';

describe('calculateBudget', () => {
  it('splits income by 50/30/20 rule', () => {
    const result = calculateBudget({ income: 7000 });

    expect(result.outputs.needs).toBe(3500);
    expect(result.outputs.wants).toBe(2100);
    expect(result.outputs.savings).toBe(1400);
  });

  it('needs + wants + savings equals income', () => {
    const result = calculateBudget({ income: 7000 });

    const sum =
      result.outputs.needs + result.outputs.wants + result.outputs.savings;
    expect(sum).toBe(7000);
  });

  it('computes annual income', () => {
    const result = calculateBudget({ income: 7000 });

    expect(result.outputs.annualIncome).toBe(84000);
  });

  it('generates budgetAllocation pie chart data', () => {
    const result = calculateBudget({ income: 7000 });

    expect(result.chartData.budgetAllocation).toBeDefined();
    expect(result.chartData.budgetAllocation.length).toBe(3);

    // Values should match
    const needsEntry = result.chartData.budgetAllocation.find(
      (d) => String(d.name).includes('Needs'),
    );
    expect(needsEntry).toBeDefined();
    expect(needsEntry!.value).toBe(3500);
  });

  it('generates comparison bar chart data', () => {
    const result = calculateBudget({ income: 7000 });

    expect(result.chartData.comparison).toBeDefined();
    expect(result.chartData.comparison.length).toBe(3);

    // Should have recommended vs usAvg columns
    const needsRow = result.chartData.comparison.find(
      (d) => d.category === 'Needs',
    );
    expect(needsRow).toBeDefined();
    expect(needsRow!.recommended).toBe(3500);
    expect(needsRow!.usAvg).toBe(4200); // 60% of 7000
  });

  it('returns non-empty interpretation string', () => {
    const result = calculateBudget({ income: 7000 });

    expect(result.interpretation).toBeTruthy();
    expect(result.interpretation.length).toBeGreaterThan(20);
  });

  it('handles different income levels', () => {
    const result = calculateBudget({ income: 10000 });

    expect(result.outputs.needs).toBe(5000);
    expect(result.outputs.wants).toBe(3000);
    expect(result.outputs.savings).toBe(2000);
    expect(result.outputs.annualIncome).toBe(120000);
  });
});

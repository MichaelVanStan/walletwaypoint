import { describe, it, expect } from 'vitest';
import { calculatorDefaults } from '../defaults';

describe('calculatorDefaults', () => {
  it('has defaults for all 10 calculators', () => {
    expect(calculatorDefaults).toHaveProperty('mortgage');
    expect(calculatorDefaults).toHaveProperty('rent');
    expect(calculatorDefaults).toHaveProperty('compound-interest');
    expect(calculatorDefaults).toHaveProperty('loan');
    expect(calculatorDefaults).toHaveProperty('savings');
    expect(calculatorDefaults).toHaveProperty('retirement');
    expect(calculatorDefaults).toHaveProperty('budget');
    expect(calculatorDefaults).toHaveProperty('tax');
    expect(calculatorDefaults).toHaveProperty('rent-vs-buy');
    expect(calculatorDefaults).toHaveProperty('student-loan');
  });

  it('mortgage defaults match national averages', () => {
    const m = calculatorDefaults.mortgage;
    expect(m.price).toBe(415000);
    expect(m.dp).toBe(20);
    expect(m.rate).toBe(6.5);
    expect(m.term).toBe(30);
  });

  it('retirement defaults are reasonable', () => {
    const r = calculatorDefaults.retirement;
    expect(r.age).toBe(30);
    expect(r.retireAge).toBe(65);
    expect(r.savings).toBe(50000);
    expect(r.monthly).toBe(500);
    expect(r.returnRate).toBe(7);
    expect(r.withdrawalRate).toBe(4);
  });
});

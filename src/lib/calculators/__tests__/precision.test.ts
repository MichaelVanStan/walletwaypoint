import { describe, it, expect } from 'vitest';
import { pmt, fv, pv, toCents } from '../math/precision';

describe('precision math utilities', () => {
  describe('pmt (monthly payment)', () => {
    it('calculates monthly mortgage payment for $250K at 6.5% over 30 years', () => {
      const result = pmt(250000, 6.5, 30);
      expect(result).toBeCloseTo(1580.17, 0);
    });

    it('handles zero interest rate', () => {
      const result = pmt(250000, 0, 30);
      expect(result).toBeCloseTo(694.44, 2);
    });

    it('calculates a 15-year mortgage', () => {
      const result = pmt(300000, 5.0, 15);
      // Expected ~2372.38
      expect(result).toBeGreaterThan(2300);
      expect(result).toBeLessThan(2500);
    });
  });

  describe('fv (future value with contributions)', () => {
    it('calculates compound interest future value', () => {
      const result = fv(10000, 500, 7, 20);
      // PV * (1+r/12)^(240) + PMT * [((1+r/12)^240 - 1) / (r/12)]
      expect(result).toBeCloseTo(308175, -2); // within hundreds
    });

    it('handles zero interest rate', () => {
      const result = fv(10000, 500, 0, 20);
      // 10000 + 500*240 = 130000
      expect(result).toBe(130000);
    });
  });

  describe('pv (present value)', () => {
    it('calculates present value of future amount', () => {
      const result = pv(100000, 5, 10);
      // Discounted back 120 months at 5%/12 per month
      expect(result).toBeGreaterThan(60000);
      expect(result).toBeLessThan(65000);
    });

    it('handles zero interest rate', () => {
      const result = pv(100000, 0, 10);
      expect(result).toBe(100000);
    });
  });

  describe('toCents (round to 2 decimal places)', () => {
    it('rounds to 2 decimal places', () => {
      expect(toCents(1234.5678)).toBe(1234.57);
    });

    it('handles exact values', () => {
      expect(toCents(100)).toBe(100);
    });

    it('handles negative values', () => {
      expect(toCents(-99.999)).toBe(-100);
    });
  });
});

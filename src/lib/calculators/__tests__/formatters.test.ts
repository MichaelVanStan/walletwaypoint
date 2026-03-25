import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent, formatNumber, formatYears, formatByType } from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats without cents by default', () => {
      expect(formatCurrency(2528.43)).toBe('$2,528');
    });

    it('formats with cents when requested', () => {
      expect(formatCurrency(2528.43, true)).toBe('$2,528.43');
    });

    it('formats zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('formats large numbers with commas', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567');
    });
  });

  describe('formatPercent', () => {
    it('formats simple percentage', () => {
      expect(formatPercent(6.5)).toBe('6.5%');
    });

    it('trims trailing zeros from decimals', () => {
      expect(formatPercent(32.1234)).toBe('32.12%');
    });

    it('formats whole number percentages', () => {
      expect(formatPercent(10)).toBe('10%');
    });
  });

  describe('formatNumber', () => {
    it('formats with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('formats with decimal places', () => {
      expect(formatNumber(1234.5678, 2)).toBe('1,234.57');
    });
  });

  describe('formatYears', () => {
    it('formats plural years', () => {
      expect(formatYears(30)).toBe('30 years');
    });

    it('formats singular year', () => {
      expect(formatYears(1)).toBe('1 year');
    });
  });

  describe('formatByType', () => {
    it('delegates to formatCurrency for currency type', () => {
      expect(formatByType(2528.43, 'currency')).toBe('$2,528');
    });

    it('delegates to formatPercent for percent type', () => {
      expect(formatByType(6.5, 'percent')).toBe('6.5%');
    });

    it('delegates to formatYears for years type', () => {
      expect(formatByType(30, 'years')).toBe('30 years');
    });

    it('delegates to formatNumber for number type', () => {
      expect(formatByType(1234, 'number')).toBe('1,234');
    });
  });
});

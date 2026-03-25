import { describe, it, expect } from 'vitest';
import {
  mortgageParams,
  rentParams,
  compoundInterestParams,
  loanParams,
  savingsParams,
  retirementParams,
  budgetParams,
  taxParams,
  rentVsBuyParams,
  studentLoanParams,
} from '../url-params';

describe('nuqs url parameter definitions', () => {
  describe('mortgageParams', () => {
    it('has required keys', () => {
      expect(mortgageParams).toHaveProperty('price');
      expect(mortgageParams).toHaveProperty('dp');
      expect(mortgageParams).toHaveProperty('rate');
      expect(mortgageParams).toHaveProperty('term');
      expect(mortgageParams).toHaveProperty('tax');
      expect(mortgageParams).toHaveProperty('ins');
      expect(mortgageParams).toHaveProperty('compare');
    });

    it('has Scenario B params', () => {
      expect(mortgageParams).toHaveProperty('b_price');
      expect(mortgageParams).toHaveProperty('b_dp');
      expect(mortgageParams).toHaveProperty('b_rate');
      expect(mortgageParams).toHaveProperty('b_term');
      expect(mortgageParams).toHaveProperty('b_tax');
      expect(mortgageParams).toHaveProperty('b_ins');
    });
  });

  describe('all 10 calculator param objects exist', () => {
    it('mortgageParams is defined', () => {
      expect(mortgageParams).toBeDefined();
    });
    it('rentParams is defined', () => {
      expect(rentParams).toBeDefined();
    });
    it('compoundInterestParams is defined', () => {
      expect(compoundInterestParams).toBeDefined();
    });
    it('loanParams is defined', () => {
      expect(loanParams).toBeDefined();
    });
    it('savingsParams is defined', () => {
      expect(savingsParams).toBeDefined();
    });
    it('retirementParams is defined', () => {
      expect(retirementParams).toBeDefined();
    });
    it('budgetParams is defined', () => {
      expect(budgetParams).toBeDefined();
    });
    it('taxParams is defined', () => {
      expect(taxParams).toBeDefined();
    });
    it('rentVsBuyParams is defined', () => {
      expect(rentVsBuyParams).toBeDefined();
    });
    it('studentLoanParams is defined', () => {
      expect(studentLoanParams).toBeDefined();
    });
  });

  describe('all params have compare toggle', () => {
    const allParams = [
      { name: 'mortgage', params: mortgageParams },
      { name: 'rent', params: rentParams },
      { name: 'compoundInterest', params: compoundInterestParams },
      { name: 'loan', params: loanParams },
      { name: 'savings', params: savingsParams },
      { name: 'retirement', params: retirementParams },
      { name: 'budget', params: budgetParams },
      { name: 'tax', params: taxParams },
      { name: 'rentVsBuy', params: rentVsBuyParams },
      { name: 'studentLoan', params: studentLoanParams },
    ];

    allParams.forEach(({ name, params }) => {
      it(`${name}Params has compare toggle`, () => {
        expect(params).toHaveProperty('compare');
      });
    });
  });
});

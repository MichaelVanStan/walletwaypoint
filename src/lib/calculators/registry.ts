import type { CalculatorResults } from './types';
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
  carAffordabilityParams,
} from './url-params';
import { calculateMortgage } from './math/mortgage';
import { calculateRentAffordability } from './math/rent-affordability';
import { calculateCompoundInterest } from './math/compound-interest';
import { calculateLoanRepayment } from './math/loan';
import { calculateSavingsGoal } from './math/savings';
import { calculateRetirement } from './math/retirement';
import { calculateBudget } from './math/budget';
import { calculateTax } from './math/tax';
import { calculateRentVsBuy } from './math/rent-vs-buy';
import { calculateStudentLoan } from './math/student-loan';
import { calculateCarAffordability } from './math/car-affordability';

type ComputeFunction = (params: Record<string, number | string>) => CalculatorResults;

interface CalculatorRegistryEntry {
  compute: ComputeFunction;
  params: Record<string, any>;
}

const registry: Record<string, CalculatorRegistryEntry> = {
  'mortgage': { compute: calculateMortgage as ComputeFunction, params: mortgageParams },
  'rent-affordability': { compute: calculateRentAffordability as ComputeFunction, params: rentParams },
  'compound-interest': { compute: calculateCompoundInterest as ComputeFunction, params: compoundInterestParams },
  'loan': { compute: calculateLoanRepayment as ComputeFunction, params: loanParams },
  'savings': { compute: calculateSavingsGoal as ComputeFunction, params: savingsParams },
  'retirement': { compute: calculateRetirement as ComputeFunction, params: retirementParams },
  'budget': { compute: calculateBudget as ComputeFunction, params: budgetParams },
  'tax': { compute: calculateTax, params: taxParams },
  'rent-vs-buy': { compute: calculateRentVsBuy as ComputeFunction, params: rentVsBuyParams },
  'student-loan': { compute: calculateStudentLoan as ComputeFunction, params: studentLoanParams },
  'car-affordability': { compute: calculateCarAffordability as ComputeFunction, params: carAffordabilityParams },
};

export function getCalculatorCompute(mathModule: string): ComputeFunction {
  const entry = registry[mathModule];
  if (!entry) throw new Error(`Unknown calculator math module: ${mathModule}`);
  return entry.compute;
}

export function getCalculatorParams(mathModule: string): Record<string, any> {
  const entry = registry[mathModule];
  if (!entry) throw new Error(`Unknown calculator math module: ${mathModule}`);
  return entry.params;
}

export const calculatorRegistry = registry;

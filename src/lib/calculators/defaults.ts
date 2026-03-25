/** National average default values for all calculators (plain objects for non-URL contexts) */
export const calculatorDefaults = {
  mortgage: {
    price: 415000,
    dp: 20,
    rate: 6.5,
    term: 30,
    tax: 1.1,
    ins: 1500,
  },
  rent: {
    income: 5500,
    maxPct: 28,
    utilities: 200,
    other: 300,
  },
  'compound-interest': {
    initial: 10000,
    monthly: 500,
    rate: 7,
    years: 20,
  },
  loan: {
    amount: 25000,
    rate: 8,
    term: 5,
    extra: 0,
  },
  savings: {
    goal: 50000,
    current: 5000,
    rate: 4.5,
    years: 5,
    monthly: 0,
  },
  retirement: {
    age: 30,
    retireAge: 65,
    savings: 50000,
    monthly: 500,
    returnRate: 7,
    withdrawalRate: 4,
  },
  budget: {
    income: 7000,
  },
  tax: {
    income: 75000,
    filing: 'single',
    deduction: 15700,
  },
  'rent-vs-buy': {
    rent: 1800,
    price: 415000,
    dp: 20,
    rate: 6.5,
    years: 30,
    appreciation: 3,
    rentIncrease: 3,
  },
  'student-loan': {
    balance: 30000,
    rate: 5.5,
    income: 55000,
  },
} as const;

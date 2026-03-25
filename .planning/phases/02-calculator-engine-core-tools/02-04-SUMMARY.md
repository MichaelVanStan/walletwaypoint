---
phase: 02-calculator-engine-core-tools
plan: 04
subsystem: calculator-engine
tags: [decimal.js-light, mortgage, rent-affordability, compound-interest, loan-repayment, savings-goal, velite-yaml, vitest, precision-math]

# Dependency graph
requires:
  - phase: 02-calculator-engine-core-tools
    plan: 01
    provides: "Calculator type system (CalculatorResults, InputConfig), precision math (pmt, fv, decimal), Velite YAML schema, formatters"
provides:
  - "5 calculator math modules: mortgage, rent-affordability, compound-interest, loan, savings"
  - "calculateMortgage: P&I + tax + insurance, amortization schedule, payment breakdown pie"
  - "calculateRentAffordability: income-based max rent with expense deductions"
  - "calculateCompoundInterest: FV with monthly contributions, year-by-year growth"
  - "calculateLoanRepayment: PMT with extra payments, interest savings, payoff timeline"
  - "calculateSavingsGoal: inverse FV for required monthly contribution"
  - "5 YAML calculator configs with inputs, outputs, charts, callouts, interpretation, SEO metadata"
  - "24 passing unit tests across 5 math modules"
affects: [02-05, 02-06, 02-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [decimal-math-pure-functions, yaml-calculator-config, calculator-results-interface]

key-files:
  created:
    - src/lib/calculators/math/mortgage.ts
    - src/lib/calculators/math/rent-affordability.ts
    - src/lib/calculators/math/compound-interest.ts
    - src/lib/calculators/math/loan.ts
    - src/lib/calculators/math/savings.ts
    - src/lib/calculators/math/__tests__/mortgage.test.ts
    - src/lib/calculators/math/__tests__/rent-affordability.test.ts
    - src/lib/calculators/math/__tests__/compound-interest.test.ts
    - src/lib/calculators/math/__tests__/loan.test.ts
    - src/lib/calculators/math/__tests__/savings.test.ts
    - content/calculators/mortgage-payment.yaml
    - content/calculators/rent-affordability.yaml
    - content/calculators/compound-interest.yaml
    - content/calculators/loan-repayment.yaml
    - content/calculators/savings-goal.yaml
  modified: []

key-decisions:
  - "Used inline Decimal comparisons (.gt/.lt) instead of Decimal.min/Decimal.max static methods (not available in decimal.js-light)"
  - "Math modules accept Record<string, number> params matching nuqs urlKey names for direct integration"
  - "Year-by-year chart data for mortgage/compound-interest (not month-by-month) to keep chart data manageable"
  - "Month-by-month detail rows for mortgage and loan for expandable table (360 rows for 30yr mortgage)"

patterns-established:
  - "Calculator math module pattern: export function calculate*(params: Record<string, number>): CalculatorResults"
  - "All intermediate math uses Decimal from decimal.js-light, final values use .toDecimalPlaces(2).toNumber()"
  - "Chart data keyed by dataKey matching YAML config chart definitions"
  - "YAML configs map to math modules via mathModule field (e.g., mathModule: mortgage -> mortgage.ts)"

requirements-completed: [TOOL-01, TOOL-02, TOOL-03, TOOL-04, TOOL-05]

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 02 Plan 04: Calculators 1-5 Math & Config Summary

**5 financial calculator math modules (mortgage, rent, compound interest, loan, savings) with decimal.js-light precision, 24 unit tests, and 5 YAML configs defining inputs/outputs/charts/SEO**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-25T01:38:40Z
- **Completed:** 2026-03-25T01:43:43Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments
- Implemented 5 calculator math modules using decimal.js-light for precision financial calculations
- Mortgage calculator computes P&I + property tax + insurance, generates year-by-year amortization and 360-row month-by-month detail table
- Loan repayment calculator supports extra payments with interest savings calculation and dual-curve balance chart
- Compound interest and savings goal calculators use FV/inverse-FV formulas with year-by-year projections
- Created 5 YAML config files with complete input definitions (primary + advanced), outputs, charts, callouts, interpretation templates, and SEO metadata
- 24 unit tests pass covering standard inputs, zero-rate edge cases, chart data generation, and interpretation strings

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Add failing tests for mortgage, rent affordability, compound interest** - `da58fc1` (test)
2. **Task 1 GREEN: Implement mortgage, rent affordability, compound interest math modules** - `88eea52` (feat)
3. **Task 2 RED: Add failing tests for loan repayment and savings goal** - `7c4eb15` (test)
4. **Task 2 GREEN: Implement loan/savings math modules and 5 YAML configs** - `7d0651c` (feat)

## Files Created/Modified
- `src/lib/calculators/math/mortgage.ts` - Mortgage payment calculator with PMT formula, amortization schedule, payment breakdown
- `src/lib/calculators/math/rent-affordability.ts` - Rent affordability based on income percentage and expense deductions
- `src/lib/calculators/math/compound-interest.ts` - Compound interest with monthly contributions, year-by-year growth
- `src/lib/calculators/math/loan.ts` - Loan repayment with extra payments, interest savings, dual balance curves
- `src/lib/calculators/math/savings.ts` - Savings goal using inverse FV formula for required monthly contribution
- `src/lib/calculators/math/__tests__/mortgage.test.ts` - 6 tests: standard 30yr, amortization chart, pie chart, detail rows, zero rate, interpretation
- `src/lib/calculators/math/__tests__/rent-affordability.test.ts` - 4 tests: standard calculation, pie chart, high expense edge case, interpretation
- `src/lib/calculators/math/__tests__/compound-interest.test.ts` - 4 tests: FV with contributions, growth chart, zero rate, interpretation
- `src/lib/calculators/math/__tests__/loan.test.ts` - 6 tests: standard payment, extra payments, balance chart, detail rows, zero rate, interpretation
- `src/lib/calculators/math/__tests__/savings.test.ts` - 4 tests: monthly required, zero rate, progress chart, interpretation
- `content/calculators/mortgage-payment.yaml` - Home category, 4 primary + 2 advanced inputs, 2 charts, 4 outputs
- `content/calculators/rent-affordability.yaml` - Home category, 4 primary inputs, 1 pie chart, 4 outputs
- `content/calculators/compound-interest.yaml` - Savings category, 4 primary inputs, 1 area chart, 3 outputs
- `content/calculators/loan-repayment.yaml` - Loans category, 4 primary inputs, 1 area chart, 5 outputs
- `content/calculators/savings-goal.yaml` - Savings category, 4 primary inputs, 1 line chart, 4 outputs

## Decisions Made
- Used `.gt()` / `.lt()` instance methods instead of `Decimal.min()` / `Decimal.max()` static methods because decimal.js-light does not include static min/max
- Math modules accept `Record<string, number>` with keys matching nuqs urlKey names for seamless integration with URL state
- Mortgage and loan generate month-by-month detail rows but year-by-year chart data (too many points for chart with 360 months)
- Rent affordability allows negative affordableRent when expenses exceed maxRent budget (user feedback, not clamped in outputs)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] decimal.js-light missing Decimal.min/Decimal.max static methods**
- **Found during:** Task 1 (mortgage math implementation)
- **Issue:** Used `Decimal.min()` and `Decimal.max()` which exist in decimal.js but not decimal.js-light
- **Fix:** Replaced with inline `.gt()` / `.lt()` Decimal instance method comparisons
- **Files modified:** src/lib/calculators/math/mortgage.ts
- **Verification:** All 6 mortgage tests pass
- **Committed in:** 88eea52

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Trivial API difference in decimal.js-light. No scope change.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all math modules are fully functional with no placeholder data or TODO markers.

## Next Phase Readiness
- 5 math modules ready for CalculatorShell to invoke via mathModule field in YAML configs
- YAML configs ready for Velite processing and dynamic page generation
- Detail rows and chart data match expected shapes for calculator-results and calculator-charts components
- Plan 02-05 can build the remaining 5 calculator math modules (retirement, budget, tax, rent-vs-buy, student loan) following the same pattern

## Self-Check: PASSED

All 15 created files verified present. All 4 commit hashes (da58fc1, 88eea52, 7c4eb15, 7d0651c) found in git log.

---
*Phase: 02-calculator-engine-core-tools*
*Completed: 2026-03-25*

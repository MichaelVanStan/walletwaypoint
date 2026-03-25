---
phase: 02-calculator-engine-core-tools
plan: 05
subsystem: calculators
tags: [decimal.js-light, retirement, budget, tax, rent-vs-buy, student-loan, yaml, velite, tdd, vitest]

# Dependency graph
requires:
  - phase: 02-calculator-engine-core-tools (plan 01)
    provides: Velite schema, precision math library (pmt, fv), calculator types, formatters
provides:
  - 5 calculator math modules (retirement, budget, tax, rent-vs-buy, student-loan)
  - 5 YAML calculator configs completing the full set of 10
  - Tax bracket computation for 3 filing statuses (2026 projected)
  - Student loan 3-plan comparison (standard, graduated, IDR)
affects: [02-06 calculator shell/dynamic routing, 02-07 comparison mode, phase 03 content/guides]

# Tech tracking
tech-stack:
  added: []
  patterns: [tax bracket walker with marginal rate accumulation, multi-plan loan comparison, rent-vs-buy opportunity cost model]

key-files:
  created:
    - src/lib/calculators/math/retirement.ts
    - src/lib/calculators/math/budget.ts
    - src/lib/calculators/math/tax.ts
    - src/lib/calculators/math/rent-vs-buy.ts
    - src/lib/calculators/math/student-loan.ts
    - src/lib/calculators/math/__tests__/retirement.test.ts
    - src/lib/calculators/math/__tests__/budget.test.ts
    - src/lib/calculators/math/__tests__/tax.test.ts
    - src/lib/calculators/math/__tests__/rent-vs-buy.test.ts
    - src/lib/calculators/math/__tests__/student-loan.test.ts
    - content/calculators/retirement.yaml
    - content/calculators/budget.yaml
    - content/calculators/tax-estimator.yaml
    - content/calculators/rent-vs-buy.yaml
    - content/calculators/student-loan.yaml
  modified: []

key-decisions:
  - "Tax brackets use 2026 Tax Foundation projections with 7 rates (10%-37%) for single, married, and head of household"
  - "Retirement distribution models conservative post-retirement returns (returnRate - 1%) during withdrawal phase"
  - "Rent vs buy includes 6% selling costs, 3% closing costs, 7% opportunity cost on invested down payment"
  - "Student loan IDR uses simplified SAVE model: 10% of discretionary income (income minus 150% poverty line)"
  - "Tax estimator YAML uses type: select with options array for filing status dropdown"

patterns-established:
  - "Tax bracket walker: iterate brackets accumulating marginal tax, track marginal rate as highest non-zero bracket"
  - "Multi-plan comparison: compute all plans independently, return unified outputs and comparison chart data"
  - "Opportunity cost model: compare scenarios with different capital allocation (invest down payment vs build equity)"

requirements-completed: [TOOL-06, TOOL-07, TOOL-08, TOOL-09, TOOL-10]

# Metrics
duration: 6min
completed: 2026-03-25
---

# Phase 02 Plan 05: Calculators 6-10 Math and Config Summary

**Retirement (accumulation + 4% rule distribution), budget (50/30/20), tax estimator (2026 federal brackets for 3 filing statuses), rent-vs-buy (opportunity cost model), and student loan (standard/graduated/IDR plan comparison) math modules with 37 unit tests and 5 YAML configs**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-25T01:46:16Z
- **Completed:** 2026-03-25T01:51:50Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments
- Implemented 5 calculator math modules completing the full set of 10 financial calculators
- Tax estimator walks 2026 projected brackets for single, married filing jointly, and head of household with detail rows
- Student loan compares standard (10yr fixed), graduated (60% start, +10% every 2yr), and income-driven (10% discretionary income, 20yr forgiveness) plans
- Rent vs buy models opportunity cost of invested down payment, home appreciation, equity, and selling costs
- 37 new tests (61 total across all 10 calculator test files) all passing
- 5 YAML configs (10 total) with complete inputs, outputs, charts, callouts, interpretation, and SEO fields

## Task Commits

Each task was committed atomically:

1. **Task 1: Retirement, budget, tax math** - `80fb8fa` (test: failing tests), `b8ed0a1` (feat: implementations)
2. **Task 2: Rent-vs-buy, student-loan math, 5 YAMLs** - `45feaf4` (test: failing tests), `90d78ca` (feat: implementations + configs)

_TDD tasks had RED (test) and GREEN (feat) commits._

## Files Created/Modified
- `src/lib/calculators/math/retirement.ts` - Accumulation + distribution phase modeling with FV projection
- `src/lib/calculators/math/budget.ts` - 50/30/20 income allocation with US average comparison
- `src/lib/calculators/math/tax.ts` - 2026 federal tax bracket computation for 3 filing statuses
- `src/lib/calculators/math/rent-vs-buy.ts` - Total cost comparison with opportunity cost of invested down payment
- `src/lib/calculators/math/student-loan.ts` - Standard, graduated, and income-driven repayment plan comparison
- `src/lib/calculators/math/__tests__/retirement.test.ts` - 5 tests for retirement calculator
- `src/lib/calculators/math/__tests__/budget.test.ts` - 7 tests for budget calculator
- `src/lib/calculators/math/__tests__/tax.test.ts` - 9 tests for tax estimator
- `src/lib/calculators/math/__tests__/rent-vs-buy.test.ts` - 7 tests for rent vs buy
- `src/lib/calculators/math/__tests__/student-loan.test.ts` - 9 tests for student loan
- `content/calculators/retirement.yaml` - 6 inputs, area chart, 5 outputs
- `content/calculators/budget.yaml` - 1 input, pie + bar charts, 4 outputs
- `content/calculators/tax-estimator.yaml` - 3 inputs (including select type for filing status), bar + pie charts, 5 outputs
- `content/calculators/rent-vs-buy.yaml` - 5 primary + 2 advanced inputs, area chart, 5 outputs
- `content/calculators/student-loan.yaml` - 3 inputs, bar + line charts, 7 outputs

## Decisions Made
- Tax brackets use 2026 Tax Foundation projections (same source as RESEARCH.md)
- Retirement distribution uses conservative post-retirement return (returnRate - 1%) to model reduced risk allocation
- Rent vs buy assumes 30yr mortgage regardless of time horizon (realistic for most buyers)
- Student loan IDR simplified to SAVE model (10% discretionary income, 150% poverty line threshold)
- Tax estimator YAML uses type: select with options array -- matches Velite schema and CalculatorInputs Select component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 10 calculator math modules and YAML configs complete
- Ready for Plan 06 (calculator shell, dynamic routing, param registry) and Plan 07 (comparison mode)
- Tax estimator select input type ready for CalculatorInputs component (Plan 02 already handles it)

## Self-Check: PASSED

- All 15 created files verified present on disk
- All 4 commit hashes (80fb8fa, b8ed0a1, 45feaf4, 90d78ca) verified in git log
- 61 tests passing across 10 test files
- TypeScript compiles cleanly (tsc --noEmit exits 0)
- 10 YAML calculator configs present in content/calculators/

---
*Phase: 02-calculator-engine-core-tools*
*Completed: 2026-03-25*

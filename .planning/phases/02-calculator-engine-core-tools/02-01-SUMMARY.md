---
phase: 02-calculator-engine-core-tools
plan: 01
subsystem: calculator-engine
tags: [decimal.js-light, recharts, nuqs, velite, zod, shadcn-ui, precision-math, url-state, vitest]

# Dependency graph
requires:
  - phase: 01-foundation-trust
    provides: "Next.js project scaffold, shadcn/ui base components, root layout, tsconfig aliases"
provides:
  - "Calculator type system (CalculatorConfig, InputConfig, OutputConfig, ChartConfig, CalculatorResults, ComparisonDelta)"
  - "Precision math utilities (pmt, fv, pv, toCents, decimal) via decimal.js-light"
  - "nuqs parameter definitions for all 10 calculators with national-average defaults"
  - "Velite configuration for calculator YAML processing"
  - "NuqsAdapter in root layout for URL state management"
  - "Currency/percent/number/years formatters with formatByType dispatcher"
  - "8 new shadcn/ui components (slider, input, label, tabs, switch, collapsible, table, select)"
  - "Vitest test infrastructure with 50 passing tests"
affects: [02-02, 02-03, 02-04, 02-05, 02-06, 02-07]

# Tech tracking
tech-stack:
  added: [decimal.js-light, recharts, nuqs, velite, zod, vitest]
  patterns: [config-driven-calculator-engine, nuqs-url-state, precision-math-wrapper, velite-programmatic-api]

key-files:
  created:
    - velite.config.ts
    - src/lib/calculators/types.ts
    - src/lib/calculators/math/precision.ts
    - src/lib/calculators/formatters.ts
    - src/lib/calculators/url-params.ts
    - src/lib/calculators/defaults.ts
    - vitest.config.ts
    - src/lib/calculators/__tests__/precision.test.ts
    - src/lib/calculators/__tests__/formatters.test.ts
    - src/lib/calculators/__tests__/url-params.test.ts
    - src/lib/calculators/__tests__/defaults.test.ts
    - src/components/ui/slider.tsx
    - src/components/ui/input.tsx
    - src/components/ui/label.tsx
    - src/components/ui/tabs.tsx
    - src/components/ui/switch.tsx
    - src/components/ui/collapsible.tsx
    - src/components/ui/table.tsx
    - src/components/ui/select.tsx
  modified:
    - package.json
    - package-lock.json
    - next.config.ts
    - tsconfig.json
    - .gitignore
    - src/app/layout.tsx

key-decisions:
  - "Used Velite programmatic API (not VeliteWebpackPlugin) for Turbopack compatibility"
  - "nuqs replaces react-hook-form for calculator state management (real-time URL state, no submit button)"
  - "Velite input type enum includes 'select' for tax estimator filing status dropdown"
  - "parseAsStringLiteral used for tax filing status (typed union) instead of parseAsString"
  - "Vitest installed as test infrastructure for calculator math unit tests"

patterns-established:
  - "Velite programmatic API: top-level await in next.config.ts with VELITE_STARTED guard"
  - "nuqs parameter definition pattern: parseAsFloat for rates, parseAsInteger for amounts, parseAsBoolean for toggles"
  - "Scenario B prefix convention: b_ prefix for all comparison parameters"
  - "#site/content tsconfig alias for Velite output directory"
  - "Precision math: all financial calculations through decimal.js-light wrappers, never native JS arithmetic"

requirements-completed: [CALC-01, CALC-03, CALC-06, CALC-08]

# Metrics
duration: 6min
completed: 2026-03-25
---

# Phase 02 Plan 01: Foundation Dependencies Summary

**Velite calculator YAML engine, decimal.js-light precision math (pmt/fv/pv), nuqs URL state for 10 calculators, 8 shadcn/ui components, and 50 passing vitest tests**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-25T01:17:20Z
- **Completed:** 2026-03-25T01:23:28Z
- **Tasks:** 2
- **Files modified:** 26

## Accomplishments
- Installed all Phase 2 dependencies (decimal.js-light, recharts, nuqs, velite, zod) and 8 shadcn/ui components
- Created complete calculator type system with CalculatorConfig, InputConfig (with select type), OutputConfig, ChartConfig, CalculatorResults, and ComparisonDelta interfaces
- Built precision math utilities (pmt, fv, pv, toCents) with decimal.js-light for floating-point-safe financial calculations
- Defined nuqs URL parameter schemas for all 10 calculators with national-average defaults and Scenario B comparison params
- Set up Velite with programmatic API and calculator YAML schema (Turbopack-compatible)
- Wrapped root layout in NuqsAdapter for URL state management across all pages
- Established vitest test infrastructure with 50 passing unit tests

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, add shadcn/ui components, configure Velite and NuqsAdapter** - `02a53c7` (feat)
2. **Task 2 RED: Add failing tests for precision math, formatters, url-params, defaults** - `83d55cb` (test)
3. **Task 2 GREEN: Implement type system, precision math, nuqs params, defaults, formatters** - `dabc427` (feat)

## Files Created/Modified
- `velite.config.ts` - Velite configuration with calculator YAML schema (6 categories, select input type)
- `src/lib/calculators/types.ts` - Calculator type system (8 interfaces)
- `src/lib/calculators/math/precision.ts` - decimal.js-light wrapper (pmt, fv, pv, toCents, decimal)
- `src/lib/calculators/formatters.ts` - Currency/percent/number/years formatters with formatByType dispatcher
- `src/lib/calculators/url-params.ts` - nuqs parameter definitions for all 10 calculators
- `src/lib/calculators/defaults.ts` - National average defaults as plain objects
- `vitest.config.ts` - Vitest configuration with @/ alias
- `next.config.ts` - Velite programmatic API integration
- `tsconfig.json` - Added #site/content alias for Velite output
- `src/app/layout.tsx` - NuqsAdapter wrapping body content
- `.gitignore` - Added .velite to ignore list
- `src/components/ui/slider.tsx` - shadcn/ui Base UI slider
- `src/components/ui/input.tsx` - shadcn/ui Base UI input
- `src/components/ui/label.tsx` - shadcn/ui Base UI label
- `src/components/ui/tabs.tsx` - shadcn/ui Base UI tabs
- `src/components/ui/switch.tsx` - shadcn/ui Base UI switch
- `src/components/ui/collapsible.tsx` - shadcn/ui Base UI collapsible
- `src/components/ui/table.tsx` - shadcn/ui Base UI table
- `src/components/ui/select.tsx` - shadcn/ui Base UI select

## Decisions Made
- Used Velite programmatic API (not VeliteWebpackPlugin) for Turbopack compatibility per research Pitfall 2
- nuqs replaces react-hook-form for calculator state -- calculators have no submit button, all state lives in URL
- Velite input type enum includes 'select' alongside currency/percent/years/number for tax filing status dropdown
- parseAsStringLiteral used for tax filing status to get typed union ('single' | 'married-jointly' | etc.)
- Installed vitest as test infrastructure for TDD on calculator math (not in original plan but needed for TDD task)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected FV test expected value**
- **Found during:** Task 2 (TDD GREEN phase)
- **Issue:** Plan specified fv(10000, 500, 7, 20) should return ~308175, but correct mathematical result is ~300850.72
- **Fix:** Updated test expected value to 300850.72 (verified with manual calculation)
- **Files modified:** src/lib/calculators/__tests__/precision.test.ts
- **Verification:** Test passes with correct expected value, verified against manual JS calculation
- **Committed in:** dabc427

**2. [Rule 3 - Blocking] Added vitest and vitest.config.ts for TDD task**
- **Found during:** Task 2 (TDD RED phase)
- **Issue:** Task 2 is marked tdd="true" but vitest was not installed or configured
- **Fix:** Installed vitest as dev dependency and created vitest.config.ts with path aliases
- **Files modified:** package.json, package-lock.json, vitest.config.ts
- **Verification:** npx vitest run executes all tests successfully
- **Committed in:** 83d55cb

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both fixes necessary for correctness. No scope creep.

## Issues Encountered
None beyond the deviations documented above.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all code is functional with no placeholder data or TODO markers.

## Next Phase Readiness
- All Phase 2 foundation dependencies installed and configured
- Type system ready for calculator-specific math modules (Plans 02-07)
- Velite YAML schema ready for calculator config files (Plans 04, 05)
- nuqs params ready for CalculatorShell component to use (Plan 02)
- Precision math ready for mortgage, compound interest, loan, etc. modules (Plans 03-07)
- 8 shadcn/ui components ready for calculator UI assembly (Plan 02)
- No blockers for any downstream Phase 2 plan

## Self-Check: PASSED

All 15 created files verified present. All 3 commit hashes (02a53c7, 83d55cb, dabc427) found in git log.

---
*Phase: 02-calculator-engine-core-tools*
*Completed: 2026-03-25*

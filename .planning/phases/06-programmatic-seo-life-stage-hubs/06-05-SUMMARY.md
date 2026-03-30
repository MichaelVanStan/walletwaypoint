---
phase: 06-programmatic-seo-life-stage-hubs
plan: 05
subsystem: state-indicator, home-affordability, calculator-shell
tags: [state-persistence, dti-badge, comparison-table, guidance-banner, calculator-ui]

# Dependency graph
requires:
  - phase: 06-01
    provides: state-list, state types, tax engine
  - phase: 06-03
    provides: usePersistedState hook, paycheck calculator
provides:
  - StateIndicator component for header showing persisted state
  - ResultTable comparison table component with tier columns
  - DtiBadge color-coded DTI badge component (green/amber/red)
  - GuidanceBanner contextual financial guidance banner
  - Home affordability math with DTI percentages and disposable income
  - CalculatorShell resultLayout toggle (table vs cards)
affects: [06-06 state tax guides, 06-07 city rent pages, any future calculator using table layout]

# Tech tracking
tech-stack:
  added: []
  patterns: [resultLayout conditional rendering in CalculatorShell, OKLCH semantic colors for DTI status]

key-files:
  created:
    - src/components/calculator/state-indicator.tsx
    - src/components/calculator/dti-badge.tsx
    - src/components/calculator/guidance-banner.tsx
    - src/components/calculator/result-table.tsx
  modified:
    - src/components/layout/header.tsx
    - src/components/calculator/calculator-shell.tsx
    - src/lib/calculators/math/home-affordability.ts
    - src/lib/calculators/types.ts
    - content/calculators/home-affordability.yaml
    - velite.config.ts

key-decisions:
  - "StateIndicator returns null (not hidden div) when no state selected -- zero CLS"
  - "Disposable income uses -1 sentinel value from math module; ResultTable maps -1 to null for empty-state UI"
  - "resultLayout field added to both Velite schema and TypeScript CalculatorConfig type for type-safe conditional rendering"

patterns-established:
  - "Client-component hydration pattern: render null on server, fade-in after useEffect reads localStorage"
  - "DTI badge thresholds: housing <28/28-35/>35, total <36/36-43/>43 with text labels for accessibility"
  - "resultLayout: 'table' | 'cards' enables per-calculator result display customization"

requirements-completed: [PSEO-10]

# Metrics
duration: 4min
completed: 2026-03-30
---

# Phase 6 Plan 05: State Indicator + Home Affordability Comparison Table Summary

**State indicator badge in header with zero-CLS hydration, plus home affordability redesigned as comparison table with color-coded DTI badges and contextual guidance banner**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-30T16:03:48Z
- **Completed:** 2026-03-30T16:08:04Z
- **Tasks:** 2/2
- **Files modified:** 10

## Accomplishments

- Created StateIndicator client component that shows persisted state abbreviation in header badge
- Zero CLS design: returns null when no state selected, fades in with 150ms opacity transition after hydration
- Popover dropdown lists all 50 states + DC alphabetically for state selection
- Accessible aria-labels on StateIndicator and DtiBadge per UI-SPEC requirements
- Created DtiBadge with green/amber/red color coding using OKLCH semantic tokens
- Created GuidanceBanner with info/warning variants using shadcn Alert component
- Created ResultTable comparison table with tiers as columns and metrics as rows
- Extended home affordability math module with housingDti, totalDti, and disposableIncome outputs
- Added resultLayout field to Velite calculator schema and TypeScript types
- CalculatorShell conditionally renders ResultTable when resultLayout is 'table', scorecards otherwise
- Home affordability YAML set to resultLayout: table

## Task Commits

Each task was committed atomically:

1. **Task 1: State indicator badge + header integration** - `692ad94` (feat)
2. **Task 2: Home affordability comparison table + DTI badges + guidance banner + math update** - `cce4c3b` (feat)

## Files Created/Modified

- `src/components/calculator/state-indicator.tsx` - StateIndicator client component with Popover for state selection
- `src/components/calculator/dti-badge.tsx` - Color-coded DTI badge (green <28/<36, amber 28-35/36-43, red >35/>43)
- `src/components/calculator/guidance-banner.tsx` - Contextual guidance banner using shadcn Alert
- `src/components/calculator/result-table.tsx` - Comparison table with tiers as columns, DtiBadge integration
- `src/components/layout/header.tsx` - Added StateIndicator between nav and mobile hamburger
- `src/components/calculator/calculator-shell.tsx` - Added ResultTable import and resultLayout conditional rendering
- `src/lib/calculators/math/home-affordability.ts` - Added housingDti, totalDti, disposableIncome per tier
- `src/lib/calculators/types.ts` - Added resultLayout optional field to CalculatorConfig
- `content/calculators/home-affordability.yaml` - Added resultLayout: table and new DTI/disposable output entries
- `velite.config.ts` - Added resultLayout enum field to calculator schema

## Decisions Made

- StateIndicator returns null (not a hidden div) when no state is selected, producing zero CLS since no space is reserved
- Disposable income calculation uses -1 sentinel from the math module; ResultTable maps -1 to null and shows "Set your state" link
- resultLayout field added to both Velite schema (with default 'cards') and TypeScript type for compile-time safety

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None -- all components render real data from calculator math outputs or persisted state.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- StateIndicator is available in the header for all pages that use the standard layout
- ResultTable pattern can be reused for any future calculator needing tabular comparison output
- DtiBadge can be imported independently for other DTI-aware components
- Home affordability disposable income integrates with any state persistence workflow

## Self-Check: PASSED

All 10 files verified present. Both task commits (692ad94, cce4c3b) verified in git log.

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

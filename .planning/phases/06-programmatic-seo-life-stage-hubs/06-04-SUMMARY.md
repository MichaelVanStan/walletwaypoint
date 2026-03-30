---
phase: 06-programmatic-seo-life-stage-hubs
plan: 04
subsystem: paycheck-calculator, programmatic-seo
tags: [state-pages, bracket-table, seo, isr, generateStaticParams, velite]

# Dependency graph
requires:
  - phase: 06-01
    provides: calculateProgressiveTax(), state-list, types
  - phase: 06-02
    provides: 51 state YAML files with brackets, editorial content, FAQs, tips
  - phase: 06-03
    provides: calculatePaycheck(), paycheck calculator page, usePersistedState
provides:
  - 51 state-specific paycheck calculator pages at /calculators/paycheck/[state]
  - BracketTable component for graduated/flat/none tax bracket display with filing status tabs
  - StateSelector component for accessible state dropdown
  - StatePaycheckClient wrapper for state-defaulted URL params
  - Regional cross-state navigation grid
affects: [06-06 state tax guides, 06-07 city rent pages, sitemap expansion]

# Tech tracking
tech-stack:
  added: []
  patterns: [state-specific SSG with ISR (revalidate 86400), custom param wrapper for state-defaulted calculator]

key-files:
  created:
    - src/components/calculator/bracket-table.tsx
    - src/components/calculator/state-selector.tsx
    - src/app/calculators/paycheck/[state]/page.tsx
    - src/app/calculators/paycheck/[state]/state-paycheck-client.tsx
  modified: []

key-decisions:
  - "StatePaycheckClient created to override nuqs default state param per page, rather than modifying global CalculatorPageClient"
  - "Regional neighbor map hardcoded for cross-state linking (6 related states per page) rather than algorithmic geo-distance"
  - "BracketTable uses Info card for no-tax states, single-row table for flat-tax states, and tabbed table for graduated states"

patterns-established:
  - "State-specific SSG page: generateStaticParams from Velite collection, ISR 86400, state-scoped calculator client"
  - "Editorial content rendering: split on double-newlines, wrap each in <p> with text-base leading-relaxed"
  - "Cross-state navigation: hardcoded regional neighbor map for geographically relevant cross-linking"

requirements-completed: [PSEO-01, PSEO-02]

# Metrics
duration: 7min
completed: 2026-03-30
---

# Phase 6 Plan 04: State-Specific Paycheck Calculator Pages Summary

**51 state paycheck calculator SEO landing pages with bracket tables, editorial content, FAQs, tips, and cross-state navigation at /calculators/paycheck/[state]**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-30T16:04:06Z
- **Completed:** 2026-03-30T16:11:11Z
- **Tasks:** 2/2
- **Files modified:** 4

## Accomplishments

- Created BracketTable component handling all 3 tax types: graduated (tabbed by filing status), flat (single-row with explanatory text), and no-income-tax (informational card)
- Created StateSelector component wrapping shadcn Select with state name + abbreviation display and proper aria-label
- Built 51 state-specific paycheck calculator pages using Velite states collection
- Each page has: unique metadata, BracketTable, editorial content (300+ words), FAQ accordion with JSON-LD, tax tips as callout cards, and regional cross-state navigation
- Created StatePaycheckClient wrapper to ensure the calculator defaults to the page's state via nuqs URL params
- ISR configured at 24-hour revalidation for all state pages
- Regional cross-linking map covers all 51 states with 6 geographically relevant neighbors each
- Build verified: all 51 state pages generate successfully

## Task Commits

Each task was committed atomically:

1. **Task 1: BracketTable and StateSelector components** - `6cd5f46` (feat)
2. **Task 2: State-specific paycheck calculator pages** - `3dca923` (feat)

## Files Created/Modified

- `src/components/calculator/bracket-table.tsx` - Tabbed bracket table with graduated/flat/none handling, filing status tabs, formatted income ranges and tax calculations
- `src/components/calculator/state-selector.tsx` - Accessible state dropdown using shadcn Select with base-ui onValueChange signature compatibility
- `src/app/calculators/paycheck/[state]/page.tsx` - 51 state-specific SSG pages with generateStaticParams, generateMetadata, BracketTable, editorial, FAQs, tips, cross-state nav
- `src/app/calculators/paycheck/[state]/state-paycheck-client.tsx` - Custom CalculatorShell wrapper overriding nuqs state param default to match the page's state slug

## Decisions Made

- Created a dedicated StatePaycheckClient component rather than modifying the shared CalculatorPageClient, because the state-specific pages need per-page nuqs param defaults while the main paycheck page uses a global default
- Used a hardcoded regional neighbor map for cross-state linking rather than algorithmic geo-distance, because it provides editorially curated results and includes both neighbors and popular states (CA, TX, NY, FL)
- BracketTable renders Info card (not empty table) for no-income-tax states to provide meaningful content about FICA-only withholding

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] base-ui Select onValueChange signature mismatch**
- **Found during:** Task 1
- **Issue:** StateSelector passed `onChange` directly to base-ui Select's `onValueChange`, but base-ui expects `(value: Value | null, eventDetails) => void`
- **Fix:** Wrapped onChange in arrow function: `(val) => { if (val) onChange(val); }`
- **Files modified:** src/components/calculator/state-selector.tsx
- **Commit:** 6cd5f46

**2. [Rule 3 - Blocking] Calculator needs state-specific URL param default**
- **Found during:** Task 2
- **Issue:** CalculatorPageClient uses paycheckParams from registry which defaults state to 'california'. State-specific pages need to default to their own state slug.
- **Fix:** Created StatePaycheckClient that builds custom params with the page's state slug as the nuqs default
- **Files modified:** src/app/calculators/paycheck/[state]/state-paycheck-client.tsx
- **Commit:** 3dca923

## Issues Encountered

None.

## Known Stubs

None -- all state pages render real data from Velite YAML files with genuine editorial content, FAQs, and tips.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- BracketTable component is reusable for Plan 06 (state tax guide pages)
- StateSelector component is reusable for any page needing state selection
- State page pattern (SSG + ISR + Velite collection) establishes the template for city rent pages (Plan 07)
- Cross-state navigation grid pattern can be reused across state-specific guide pages

## Self-Check: PASSED

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

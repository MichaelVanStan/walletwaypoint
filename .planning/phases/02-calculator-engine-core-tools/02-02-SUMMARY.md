---
phase: 02-calculator-engine-core-tools
plan: 02
subsystem: ui
tags: [react, calculator, nuqs, shadcn-ui, base-ui, tailwind, components]

# Dependency graph
requires:
  - phase: 02-calculator-engine-core-tools plan 01
    provides: TypeScript types (CalculatorConfig, CalculatorResults, InputConfig, OutputConfig), formatters (formatByType, formatCurrency, formatPercent), URL param definitions (nuqs parsers), shadcn/ui base components
provides:
  - InputSliderCombo: synchronized slider + number input component
  - CalculatorInputs: config-driven input group renderer with collapsible advanced section and select dropdown support
  - ResultCard: key metric display card
  - Interpretation: plain-English result summary
  - ActionCallout: guide link card with dynamic Lucide icons
  - ScenarioToggle: comparison mode switch toggle
  - DetailTable: expandable collapsible breakdown table
  - CalculatorShell: main calculator orchestrator with two-column layout, URL state via nuqs, comparison mode, result rendering
affects: [02-03 (calculator charts), 02-04 (comparison view), 02-06 (integration/page wiring), 02-07 (calculator index)]

# Tech tracking
tech-stack:
  added: []
  patterns: [config-driven UI rendering, URL state management via nuqs useQueryStates, Base UI primitives composition]

key-files:
  created:
    - src/components/calculator/input-slider-combo.tsx
    - src/components/calculator/calculator-inputs.tsx
    - src/components/calculator/result-card.tsx
    - src/components/calculator/interpretation.tsx
    - src/components/calculator/action-callout.tsx
    - src/components/calculator/scenario-toggle.tsx
    - src/components/calculator/detail-table.tsx
    - src/components/calculator/calculator-shell.tsx
  modified: []

key-decisions:
  - "CalculatorShell receives params as prop (no inline paramRegistry) to keep it as pure UI orchestrator"
  - "Base UI Switch uses checked/onCheckedChange props (not data-state pattern) for comparison toggle"
  - "LucideIcon dynamic import via namespace cast to unknown then Record for type safety"
  - "CollapsibleTrigger styled inline (not asChild) since Base UI Collapsible does not support asChild prop"

patterns-established:
  - "Config-driven calculator rendering: CalculatorConfig + computeResults function + nuqs params = complete calculator page"
  - "URL state pattern: useQueryStates with history: replace, throttleMs: 200 for real-time URL sync"
  - "Input rendering: InputSliderCombo for numeric inputs, Select for dropdown inputs, both driven by InputConfig.type"
  - "Responsive comparison: desktop shows both scenarios stacked in same panel, mobile uses Tabs component"

requirements-completed: [CALC-01, CALC-02, CALC-05, CALC-06, CALC-07]

# Metrics
duration: 4min
completed: 2026-03-25
---

# Phase 02 Plan 02: Calculator Engine UI Components Summary

**8 reusable calculator UI components: InputSliderCombo with ARIA and extreme value warnings, config-driven CalculatorInputs with Select support, CalculatorShell orchestrating two-column layout with nuqs URL state, comparison mode toggle with mobile tabs, and expandable DetailTable for breakdowns**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-25T01:26:04Z
- **Completed:** 2026-03-25T01:30:33Z
- **Tasks:** 2
- **Files created:** 8

## Accomplishments
- Built 7 calculator sub-components (InputSliderCombo, CalculatorInputs, ResultCard, Interpretation, ActionCallout, ScenarioToggle, DetailTable) with full ARIA accessibility
- Built CalculatorShell with responsive two-column layout, sticky input panel, URL state management via nuqs, comparison mode with mobile tabs, and share/reset functionality
- All 8 components compile cleanly with TypeScript strict mode (zero errors)
- DetailTable renders expandable breakdown tables with formatByType cell formatting and alternating row striping

## Task Commits

Each task was committed atomically:

1. **Task 1: Build InputSliderCombo, CalculatorInputs, ResultCard, Interpretation, ActionCallout, ScenarioToggle, DetailTable** - `360a756` (feat)
2. **Task 2: Build CalculatorShell with two-column layout, URL state, comparison mode** - `35efe6c` (feat)

## Files Created/Modified
- `src/components/calculator/input-slider-combo.tsx` - Synchronized slider + number input with ARIA labels, extreme value amber border, inputMode switching
- `src/components/calculator/calculator-inputs.tsx` - Config-driven input group renderer with collapsible advanced section and Select dropdown for type='select' inputs
- `src/components/calculator/result-card.tsx` - Key metric display card with primary (28px on lg) and secondary (24px) sizing
- `src/components/calculator/interpretation.tsx` - Plain-English result summary with body typography (16px, 1.6 line height)
- `src/components/calculator/action-callout.tsx` - Guide link cards with dynamic Lucide icon lookup and accent color
- `src/components/calculator/scenario-toggle.tsx` - Comparison mode switch with descriptive label states and ARIA
- `src/components/calculator/detail-table.tsx` - Expandable collapsible table with Collapsible wrapper, formatByType formatting, scope="col" headers, alternating row striping
- `src/components/calculator/calculator-shell.tsx` - Main calculator engine shell: two-column responsive layout (360px/300px input panel), nuqs URL state with 200ms throttle, comparison mode with desktop stacked and mobile tabs, result cards/interpretation/callouts/detail table rendering, share/reset buttons, reduced motion detection

## Decisions Made
- CalculatorShell receives `params` as a prop rather than containing an inline paramRegistry mapping, keeping it as a pure UI orchestrator with no knowledge of which calculators exist
- Used Base UI Collapsible inline styling for trigger buttons since Base UI does not support the `asChild` composition pattern
- Dynamic Lucide icon lookup uses namespace import cast through `unknown` to `Record<string, LucideIcon>` for proper TypeScript safety
- Base UI Select `onValueChange` can return `null` on deselection; added null guard before calling onChange callback

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Base UI Slider onValueChange type signature**
- **Found during:** Task 1 (InputSliderCombo)
- **Issue:** Base UI Slider passes `readonly number[]` not `number[]` to onValueChange callback
- **Fix:** Changed handler parameter type from `number | number[]` to `number | readonly number[]`
- **Files modified:** src/components/calculator/input-slider-combo.tsx
- **Verification:** TypeScript compilation passes
- **Committed in:** 360a756 (Task 1 commit)

**2. [Rule 3 - Blocking] Fixed Base UI Collapsible asChild incompatibility**
- **Found during:** Task 1 (DetailTable)
- **Issue:** Base UI CollapsibleTrigger does not support `asChild` prop (not Radix)
- **Fix:** Applied ghost button styling directly to CollapsibleTrigger instead of wrapping with Button via asChild
- **Files modified:** src/components/calculator/detail-table.tsx
- **Verification:** TypeScript compilation passes
- **Committed in:** 360a756 (Task 1 commit)

**3. [Rule 3 - Blocking] Fixed Base UI Select onValueChange nullable type**
- **Found during:** Task 1 (CalculatorInputs)
- **Issue:** Base UI Select `onValueChange` callback receives `string | null`, but onChange expects `string | number`
- **Fix:** Added null guard `if (v !== null)` before calling onChange
- **Files modified:** src/components/calculator/calculator-inputs.tsx
- **Verification:** TypeScript compilation passes
- **Committed in:** 360a756 (Task 1 commit)

**4. [Rule 3 - Blocking] Fixed LucideIcons namespace type cast for dynamic icon lookup**
- **Found during:** Task 1 (ActionCallout)
- **Issue:** Direct cast of lucide-react namespace to `Record<string, ComponentType>` failed due to complex icon prop types
- **Fix:** Cast through `unknown` first, then to `Record<string, LucideIcon>` using lucide-react's own LucideIcon type
- **Files modified:** src/components/calculator/action-callout.tsx
- **Verification:** TypeScript compilation passes
- **Committed in:** 360a756 (Task 1 commit)

---

**Total deviations:** 4 auto-fixed (4 blocking - Base UI API differences from Radix)
**Impact on plan:** All auto-fixes necessary for TypeScript compilation. No scope creep. Core issue: plan was written assuming Radix API patterns, but project uses Base UI primitives (shadcn base-nova preset).

## Issues Encountered
None beyond the type-level fixes documented in deviations.

## User Setup Required
None - no external service configuration required.

## Known Stubs
- `src/components/calculator/calculator-shell.tsx` line ~240: Chart area placeholder (`<div id="chart-area" />`) -- intentional, will be wired in Plan 06 (integration layer)
- `src/components/calculator/calculator-shell.tsx` line ~274: Comparison area placeholder (`<div id="comparison-area" />`) -- intentional, will be wired in Plan 06 (integration layer)

## Next Phase Readiness
- All 8 calculator UI components ready for chart integration (Plan 03), comparison view (Plan 04), and page wiring (Plan 06)
- CalculatorShell accepts any config + computeResults + params combination, making it fully pluggable
- Chart and comparison view integration points are marked with placeholder divs

## Self-Check: PASSED

- All 8 files exist on disk
- Commit 360a756 (Task 1) found in git log
- Commit 35efe6c (Task 2) found in git log
- TypeScript compilation: zero errors

---
*Phase: 02-calculator-engine-core-tools*
*Completed: 2026-03-25*

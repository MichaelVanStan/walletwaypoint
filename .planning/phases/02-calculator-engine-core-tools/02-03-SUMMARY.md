---
phase: 02-calculator-engine-core-tools
plan: 03
subsystem: ui
tags: [recharts, charts, comparison, csv, visualization, accessibility]

# Dependency graph
requires:
  - phase: 02-01
    provides: "Calculator types (ChartConfig, CalculatorResults, ComparisonDelta), formatters (formatCurrency, formatByType)"
provides:
  - "CalculatorCharts Recharts wrapper with 4 chart types and OKLCH styling"
  - "ComparisonView side-by-side table with color-coded delta badges"
  - "CsvExportButton for downloadable comparison data"
  - "downloadCsv utility with UTF-8 BOM for Excel compatibility"
affects: [02-06-integration, calculator-shell, results-display]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Recharts wrapper with OKLCH/hex color fallback", "Custom tooltip using Tailwind classes for theme-aware rendering", "CSV with UTF-8 BOM for Excel compatibility"]

key-files:
  created:
    - src/components/calculator/calculator-charts.tsx
    - src/components/calculator/comparison-view.tsx
    - src/components/calculator/csv-export.tsx
    - src/lib/calculators/csv.ts
  modified: []

key-decisions:
  - "Used CSS.supports() check for OKLCH with hex fallback in SVG contexts"
  - "Dynamic series key detection from data points (excludes known X-axis keys)"
  - "Collapsible detail table with separate sub-sections per scenario (A/B)"

patterns-established:
  - "Chart color resolution: OKLCH primary with hex fallback via CSS.supports check"
  - "Delta badge semantic colors: bg-accent/10 for positive, bg-destructive/10 for negative"
  - "Accessible tables: scope=col for headers, scope=row for row labels, aria-label on badges"

requirements-completed: [CALC-04, CALC-07]

# Metrics
duration: 3min
completed: 2026-03-25
---

# Phase 02 Plan 03: Chart Visualization and Comparison Summary

**Recharts wrapper with 4 chart types (area/pie/line/bar), OKLCH gradient styling, comparison table with delta badges, and CSV export with UTF-8 BOM**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-25T01:33:31Z
- **Completed:** 2026-03-25T01:36:52Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- CalculatorCharts renders all 4 Recharts chart types (area, pie, line, bar) with OKLCH color palette, gradient area fills, responsive heights, and reduced-motion support
- ComparisonView displays side-by-side comparison table with color-coded delta badges (green for savings, red for higher costs) and expandable detail breakdown
- CSV export generates downloadable UTF-8 BOM files for Excel compatibility with disabled state tooltip

## Task Commits

Each task was committed atomically:

1. **Task 1: Build CalculatorCharts Recharts wrapper with OKLCH styling and responsive containers** - `8e1c381` (feat)
2. **Task 2: Build ComparisonView with delta badges, detail table, and CSV export** - `e1e9739` (feat)

## Files Created/Modified
- `src/components/calculator/calculator-charts.tsx` - Recharts wrapper rendering area, pie, line, bar charts with OKLCH colors, gradient fills, custom tooltips, responsive heights, no gridlines, and reduced-motion support
- `src/components/calculator/comparison-view.tsx` - Side-by-side comparison table with delta badges, expandable detail table via Collapsible, proper ARIA accessibility
- `src/components/calculator/csv-export.tsx` - Export button with disabled tooltip state, calls downloadCsv with formatted comparison data
- `src/lib/calculators/csv.ts` - CSV generation utility with UTF-8 BOM, proper quoting for special characters, Blob download

## Decisions Made
- Used CSS.supports() runtime check for OKLCH color support with hex color array fallback for SVG contexts where oklch() may not render
- Dynamic series key detection from first data point (excludes known X-axis keys like year, month, age, label) instead of requiring explicit series configuration
- Detail table in comparison mode renders as separate sub-sections per scenario (Your Scenario / Alternative Scenario) for clarity

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully wired to their data sources and ready for integration in Plan 06.

## Next Phase Readiness
- CalculatorCharts, ComparisonView, CsvExportButton, and downloadCsv are standalone importable modules
- Ready for wiring into CalculatorShell in Plan 06 (integration layer)
- All components respect reduced motion preferences and WCAG accessibility requirements

## Self-Check: PASSED

All 4 files verified on disk. Both task commits (8e1c381, e1e9739) verified in git log.

---
*Phase: 02-calculator-engine-core-tools*
*Completed: 2026-03-25*

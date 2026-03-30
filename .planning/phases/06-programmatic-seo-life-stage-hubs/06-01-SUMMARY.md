---
phase: 06-programmatic-seo-life-stage-hubs
plan: 01
subsystem: tax-engine, data-layer
tags: [tax, velite, zod, typescript, state-data, progressive-tax]

# Dependency graph
requires:
  - phase: 05-content-volume-revenue-foundation
    provides: existing tax calculator (TOOL-08), Velite config with 6 collections
provides:
  - parameterized calculateProgressiveTax() reusable for any bracket-based tax system
  - calculateFederalTax() convenience wrapper for paycheck calculator
  - StateTaxData, CityRentData, HomebuyerProgramData type definitions
  - 51-entry state list with slug/name/abbreviation mappings
  - Velite states, cities, homebuyerPrograms collections ready for YAML data
affects: [06-02 state tax YAML data, 06-03 paycheck calculator, 06-04 state paycheck pages, 06-06 state tax guides, 06-07 city rent pages]

# Tech tracking
tech-stack:
  added: []
  patterns: [parameterized tax engine, shared Velite schema helpers (bracketSchema, faqSchema)]

key-files:
  created:
    - src/lib/states/types.ts
    - src/lib/states/state-list.ts
    - content/states/.gitkeep
    - content/cities/.gitkeep
    - content/homebuyer-programs/.gitkeep
  modified:
    - src/lib/calculators/math/tax.ts
    - velite.config.ts

key-decisions:
  - "Effective rate in calculateProgressiveTax uses taxableIncome as denominator (not gross), while calculateTax wrapper uses gross income for user-facing display"
  - "Shared faqSchema and bracketSchema helpers reduce duplication across Velite collections"

patterns-established:
  - "Parameterized tax engine: calculateProgressiveTax(taxableIncome, brackets) accepts any bracket array"
  - "State data lives in src/lib/states/ module (types.ts, state-list.ts)"
  - "New Velite collections use shared schema helpers (faqSchema, bracketSchema) for DRY definitions"

requirements-completed: [TAX-04]

# Metrics
duration: 4min
completed: 2026-03-30
---

# Phase 6 Plan 01: Tax Engine Refactor + State Data Infrastructure Summary

**Parameterized progressive tax engine extracted from federal calculator, with state/city/homebuyer data types and Velite collections ready for 51-state YAML data**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-30T15:29:42Z
- **Completed:** 2026-03-30T15:33:32Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Extracted bracket-walking logic into reusable calculateProgressiveTax() that accepts any TaxBracket array
- Added calculateFederalTax() convenience wrapper for downstream paycheck calculator
- Defined complete type system for state tax data, city rent data, and homebuyer programs
- Created 51-entry state list with slug, name, abbreviation for all 50 states + DC
- Extended Velite config with 3 new collections (states, cities, homebuyerPrograms) validated by Zod schemas
- Refactored existing FAQ schemas to use shared faqSchema helper

## Task Commits

Each task was committed atomically:

1. **Task 1: Refactor tax engine + define state types and state list** - `9c9e827` (feat)
2. **Task 2: Extend Velite config with state, city, and homebuyer program collections** - `c0eec91` (feat)

## Files Created/Modified
- `src/lib/states/types.ts` - TaxBracket, ProgressiveTaxResult, StateTaxData, CityRentData, HomebuyerProgramData interfaces
- `src/lib/states/state-list.ts` - STATES array (51 entries), STATE_BY_SLUG and STATE_BY_ABBREVIATION lookup maps
- `src/lib/calculators/math/tax.ts` - Refactored with calculateProgressiveTax(), calculateFederalTax(), renamed FEDERAL_TAX_BRACKETS
- `velite.config.ts` - Added states, cities, homebuyerPrograms collections with bracketSchema/faqSchema helpers
- `content/states/.gitkeep` - Empty directory for state YAML data files
- `content/cities/.gitkeep` - Empty directory for city YAML data files
- `content/homebuyer-programs/.gitkeep` - Empty directory for homebuyer program YAML data files

## Decisions Made
- Effective rate in calculateProgressiveTax uses taxableIncome as denominator (mathematically correct for the engine), while calculateTax wrapper uses gross income for user-facing effective rate display (unchanged behavior)
- Created shared faqSchema and bracketSchema helpers to reduce schema duplication across Velite collections

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- calculateProgressiveTax() is ready for 06-02 (state tax YAML data) and 06-03 (paycheck calculator)
- State types are ready for 06-02 to populate with real state tax data
- Velite collections are ready to accept YAML files in content/states/, content/cities/, content/homebuyer-programs/
- Existing tax calculator produces identical results (refactor preserved all behavior)

## Self-Check: PASSED

All 7 created files verified present. Both task commits (9c9e827, c0eec91) verified in git log.

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

---
phase: 04-comparison-affiliate-infrastructure
plan: 01
subsystem: data-layer
tags: [velite, zod, nuqs, typescript, comparison, affiliate, product-schema]

# Dependency graph
requires:
  - phase: 02-calculator-engine-core-tools
    provides: Velite content pipeline, nuqs URL state pattern, Zod schema validation
provides:
  - Velite products collection schema (products/*.yaml)
  - TypeScript types for 4 product categories (credit-cards, personal-loans, savings-accounts, insurance)
  - nuqs URL param definitions for sort/filter state per category
  - Generic sort utility for product arrays
  - Category-specific filter configs with match functions
affects: [04-02, 04-03, 04-04, 04-05]

# Tech tracking
tech-stack:
  added: []
  patterns: [product-category-schema, filter-matcher-pattern, category-params-map]

key-files:
  created:
    - src/lib/compare/product-types.ts
    - src/lib/compare/url-params.ts
    - src/lib/compare/sort-utils.ts
    - src/lib/compare/filter-config.ts
  modified:
    - velite.config.ts

key-decisions:
  - "Flat productItemSchema with optional fields per category (vs discriminated union) for Velite/Zod compatibility"
  - "Filter matchers keyed by URL param id for direct nuqs integration"

patterns-established:
  - "Product data contract: TypeScript interfaces in product-types.ts are the single source of truth for all downstream consumers"
  - "Category params map: categoryParams record maps ProductCategory to nuqs param set for generic category page rendering"
  - "Filter matcher pattern: filterMatchers record maps filter id to match function for AND-logic product filtering"

requirements-completed: [AFFIL-02, AFFIL-03]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 4 Plan 01: Data Foundation Summary

**Velite product collection schema with Zod validation, TypeScript types for 4 financial product categories, nuqs sort/filter URL params, and generic sort/filter utilities**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T21:41:58Z
- **Completed:** 2026-03-26T21:44:51Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Velite products collection validates YAML product data against Zod schema at build time (pattern: products/*.yaml)
- TypeScript types define all 4 product categories with category-specific fields (CreditCard, PersonalLoan, Savings, Insurance)
- nuqs parseAsStringLiteral params for type-safe sort columns, sort directions, and filter values per category
- Generic sortProducts utility handles null values and supports numeric/string comparison
- Filter configuration with 12 filter definitions across 4 categories and AND-logic applyFilters function

## Task Commits

Each task was committed atomically:

1. **Task 1: Velite product collection schema and TypeScript types** - `a700a3f` (feat)
2. **Task 2: URL params, sort utilities, and filter configurations** - `ef73870` (feat)

## Files Created/Modified
- `velite.config.ts` - Added productItemSchema and products collection to existing Velite config
- `src/lib/compare/product-types.ts` - TypeScript interfaces for all 4 product categories, sort columns, CTA labels
- `src/lib/compare/url-params.ts` - nuqs param definitions for sort/filter URL state per category
- `src/lib/compare/sort-utils.ts` - Generic sort function for product arrays by column and direction
- `src/lib/compare/filter-config.ts` - Category-specific filter configurations with labels, options, and match functions

## Decisions Made
- Used flat productItemSchema with optional fields per category rather than discriminated union, for Velite/Zod collection compatibility where all YAML files share one schema
- Filter matchers keyed by nuqs URL param id (rewards, score, fee, amount, term, etc.) for direct integration with URL state

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Data contracts complete; Plan 02 (YAML product data authoring) can consume the Velite products collection schema
- Plan 03 (comparison UI components) can import types, URL params, sort/filter utilities
- Plan 04 (page routes) can use categoryParams map for generic category page rendering

## Self-Check: PASSED

- All 6 files verified present on disk
- Both commit hashes (a700a3f, ef73870) verified in git log

---
*Phase: 04-comparison-affiliate-infrastructure*
*Completed: 2026-03-26*

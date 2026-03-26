---
phase: 04-comparison-affiliate-infrastructure
plan: 04
subsystem: ui
tags: [react, shadcn, comparison-table, affiliate, ga4, accessibility, base-ui]

# Dependency graph
requires:
  - phase: 04-comparison-affiliate-infrastructure
    provides: "TypeScript interfaces (ProductItem, ProductCategory), filter configs, sort utils, URL params from Plan 01"
provides:
  - "7 comparison UI components: SortHeader, BestForBadge, AffiliateLink, ProductCount, ComparisonFilters, ComparisonTable, ProductCard"
  - "GA4 affiliate_click event tracking via sendGAEvent"
  - "Desktop sortable table with sticky first column and ARIA sort attributes"
  - "Mobile stacked product cards with attribute definition lists"
  - "Category-specific filter bar with Base UI Select dropdowns"
affects: [04-05-PLAN, comparison-pages, affiliate-tracking]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Base UI Select with nullable onValueChange for filter dropdowns"
    - "Button render prop pattern (nativeButton={false}) for affiliate link-as-button"
    - "Dual render pattern: hidden lg:block table + lg:hidden card for responsive comparison"
    - "sendGAEvent from @next/third-parties/google for affiliate click tracking"

key-files:
  created:
    - src/components/compare/sort-header.tsx
    - src/components/compare/best-for-badge.tsx
    - src/components/compare/affiliate-link.tsx
    - src/components/compare/product-count.tsx
    - src/components/compare/comparison-filters.tsx
    - src/components/compare/comparison-table.tsx
    - src/components/compare/product-card.tsx
  modified: []

key-decisions:
  - "Used typeof narrowing for Record<string, unknown> product fields to satisfy strict TypeScript ReactNode checks"
  - "UTM params built at render time via URL constructor rather than stored pre-concatenated"

patterns-established:
  - "Comparison component pattern: receive Record<string, unknown>[] products with ColumnDef/attribute renderers for category-agnostic display"
  - "Affiliate link pattern: sendGAEvent on click, UTM params built from base href, nofollow + noopener + noreferrer"

requirements-completed: [AFFIL-01, AFFIL-06]

# Metrics
duration: 4min
completed: 2026-03-26
---

# Phase 4 Plan 04: Comparison UI Components Summary

**7 comparison React components with sortable desktop table (sticky first column, ARIA sort), mobile stacked cards, GA4 affiliate click tracking via sendGAEvent, and category-specific filter bar using Base UI Select**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-26T21:49:57Z
- **Completed:** 2026-03-26T21:54:00Z
- **Tasks:** 2
- **Files created:** 7

## Accomplishments
- Built 4 small utility components: SortHeader (sortable column header with ArrowUp/Down/UpDown icons and ARIA label), BestForBadge ("Our Pick: {label}" badge with Star icon), AffiliateLink (GA4 sendGAEvent on click with UTM-parameterized URL), ProductCount (filtered/total indicator)
- Built ComparisonFilters with Base UI Select dropdowns, clear-all button, and nav landmark with aria-label="Product filters"
- Built ComparisonTable with shadcn Table primitives, sticky first column (bg-background), aria-sort attributes on th scope="col", even row striping, and affiliate CTA in last column with /how-we-rank methodology link in caption
- Built ProductCard for mobile with stacked dl/dt/dd attribute layout, BestForBadge, full-width affiliate CTA, and lg:hidden responsive breakpoint

## Task Commits

Each task was committed atomically:

1. **Task 1: Small utility components** - `2ac954e` (feat)
2. **Task 2: Comparison filters, desktop table, mobile product card** - `d1c965f` (feat)

## Files Created/Modified
- `src/components/compare/sort-header.tsx` - Client component: sortable column header button with ArrowUpDown/ArrowUp/ArrowDown icons, ARIA labels
- `src/components/compare/best-for-badge.tsx` - Server component: "Our Pick: {label}" editorial badge with Star icon using shadcn Badge default variant
- `src/components/compare/affiliate-link.tsx` - Client component: Button render prop wrapping anchor with GA4 sendGAEvent, UTM params, nofollow, sr-only new tab hint
- `src/components/compare/product-count.tsx` - Server-compatible component: "Showing N of M products" text indicator
- `src/components/compare/comparison-filters.tsx` - Client component: category-specific Select dropdowns with clear-all button, nav landmark
- `src/components/compare/comparison-table.tsx` - Client component: desktop sortable data table with sticky first column, aria-sort, scope="col", even row striping, affiliate CTA, methodology caption link
- `src/components/compare/product-card.tsx` - Client component: mobile stacked product card with dl/dt/dd attributes, BestForBadge, full-width AffiliateLink CTA

## Decisions Made
- Used typeof narrowing (e.g., `typeof product.bestFor === 'string'`) instead of `as` casts for Record<string, unknown> product fields to satisfy strict TypeScript ReactNode assignability checks
- Built UTM params at render time via URL constructor (new URL + searchParams.set) rather than storing pre-concatenated URLs in data
- ComparisonTable receives ColumnDef[] with optional render functions for category-agnostic column display, making it reusable across all 4 product categories

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript strict mode errors for unknown-to-ReactNode**
- **Found during:** Task 2
- **Issue:** `Record<string, unknown>` product fields like `product.bestFor` are `unknown`, which TypeScript strict mode does not allow as JSX children (ReactNode)
- **Fix:** Used typeof narrowing (`typeof product.bestFor === 'string'`) and String() conversion instead of `as` casts
- **Files modified:** src/components/compare/comparison-table.tsx, src/components/compare/product-card.tsx
- **Verification:** `npx tsc --noEmit` passes with zero errors in compare components
- **Committed in:** d1c965f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential for TypeScript correctness. No scope creep.

## Issues Encountered
- Worktree did not have lib/compare files from Plan 01 (Wave 1 dependency). Resolved by checking out from main branch via `git checkout main -- src/lib/compare/`. These files are a dependency, not new work.

## Known Stubs
None - all components are fully functional with the props they receive. Data wiring happens in Plan 05 (page routes).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 7 comparison UI components ready for composition into page routes (Plan 05)
- Components consume Record<string, unknown>[] products array with ColumnDef/attribute configs for category-agnostic rendering
- ComparisonTable and ProductCard are separate components per D-06 (not CSS show/hide on same markup)
- Affiliate click tracking ready when NEXT_PUBLIC_GA_ID is set

## Self-Check: PASSED

All 7 component files verified present. Both task commits (2ac954e, d1c965f) verified in git log. SUMMARY.md created.

---
*Phase: 04-comparison-affiliate-infrastructure*
*Completed: 2026-03-26*

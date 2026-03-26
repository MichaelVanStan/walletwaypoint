---
phase: 04-comparison-affiliate-infrastructure
plan: 05
subsystem: ui
tags: [next.js, ssg, nuqs, comparison, affiliate, json-ld, navigation, sitemap, velite]

# Dependency graph
requires:
  - phase: 04-comparison-affiliate-infrastructure
    provides: "Velite product schema, TypeScript types, URL params, sort/filter utilities (04-01), product YAML data (04-03), comparison UI components (04-04)"
provides:
  - "Working /compare index page with 4 category cards"
  - "Dynamic SSG /compare/[category] pages with sortable table, filters, and mobile cards"
  - "ProductSchema FinancialProduct JSON-LD for SEO"
  - "Compare section layout with DisclaimerBanner"
  - "Navigation enabled with category sub-links"
  - "Sitemap with comparison category URLs and /how-we-rank"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server/client split: RSC page wrapper + client component for nuqs interactivity"
    - "Category column/attribute definitions as switch-case functions for per-category rendering"
    - "Sort cycle: unsorted -> asc -> desc -> unsorted via nuqs state"

key-files:
  created:
    - src/app/compare/layout.tsx
    - src/app/compare/[category]/page.tsx
    - src/app/compare/[category]/comparison-page-client.tsx
    - src/components/seo/product-schema.tsx
  modified:
    - src/app/compare/page.tsx
    - src/lib/navigation.ts
    - src/app/sitemap.ts

key-decisions:
  - "Server/client split for category page: Server Component handles SSG, metadata, and disclosure; Client Component manages nuqs sort/filter state"
  - "Category-specific column definitions via switch-case functions rather than config objects for render function flexibility"
  - "Sort state uses 'name' as default column with asc direction; clicking cycles asc -> desc -> reset"

patterns-established:
  - "Comparison page pattern: RSC wrapper (generateStaticParams + metadata) with Suspense-wrapped client interactivity component"
  - "Product card mobile fallback: ComparisonTable hidden on mobile (hidden lg:block), ProductCard list hidden on desktop (lg:hidden)"

requirements-completed: [AFFIL-01, AFFIL-04, AFFIL-06]

# Metrics
duration: 5min
completed: 2026-03-26
---

# Phase 4 Plan 05: Route Assembly and Navigation Summary

**Working comparison pages at /compare and /compare/[category] with SSG, nuqs sort/filter, FTC affiliate disclosure, FinancialProduct JSON-LD, and enabled site navigation**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-26T21:57:09Z
- **Completed:** 2026-03-26T22:02:09Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Comparison index page at /compare shows 4 category cards with Lucide icons, product counts, and methodology link
- Dynamic SSG category pages at /compare/[category] with Server Component wrapper and interactive client component
- Client component manages sort/filter state via nuqs URL params (bookmarkable, shareable)
- AffiliateDisclosure positioned before comparison table on every category page (FTC D-09 compliance)
- FinancialProduct JSON-LD schema renders on all category pages for SEO
- Compare navigation enabled with category sub-links; How We Rank added to footer
- Sitemap updated with comparison category URLs and /how-we-rank

## Task Commits

Each task was committed atomically:

1. **Task 1: Compare layout, index page, and product JSON-LD schema** - `562d54b` (feat)
2. **Task 2: Category dynamic route, navigation enablement, and sitemap** - `d891455` (feat)

## Files Created/Modified
- `src/app/compare/layout.tsx` - Compare section layout with DisclaimerBanner
- `src/app/compare/page.tsx` - Comparison index page with 4 category cards (replaced Coming Soon)
- `src/app/compare/[category]/page.tsx` - Dynamic SSG category page with AffiliateDisclosure and ProductSchema
- `src/app/compare/[category]/comparison-page-client.tsx` - Client component with nuqs sort/filter, column definitions, empty state
- `src/components/seo/product-schema.tsx` - FinancialProduct JSON-LD schema component
- `src/lib/navigation.ts` - Compare enabled with category sub-links, How We Rank footer link
- `src/app/sitemap.ts` - Added comparison routes and /how-we-rank

## Decisions Made
- Server/client split for category page: Server Component handles SSG, metadata, and FTC disclosure; Client Component manages nuqs sort/filter state via useQueryStates
- Category-specific column definitions use switch-case functions returning arrays, allowing render functions for formatting (currency, percentages, ranges)
- Sort default is 'name' ascending; sort cycle: click unsorted column -> asc, click asc -> desc, click desc -> reset to name/asc

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all pages wire real Velite product data. Category intro paragraphs are hardcoded but intentional (not placeholder content).

## Next Phase Readiness
- All Phase 4 plans complete: data foundation, methodology page, product YAML, comparison components, and route assembly
- Comparison pages fully accessible from site navigation
- Phase 4 verification plan can validate end-to-end functionality

## Self-Check: PASSED

- [x] src/app/compare/layout.tsx exists
- [x] src/app/compare/page.tsx exists
- [x] src/app/compare/[category]/page.tsx exists
- [x] src/app/compare/[category]/comparison-page-client.tsx exists
- [x] src/components/seo/product-schema.tsx exists
- [x] src/lib/navigation.ts exists (modified)
- [x] src/app/sitemap.ts exists (modified)
- [x] Commit 562d54b exists (Task 1)
- [x] Commit d891455 exists (Task 2)

---
*Phase: 04-comparison-affiliate-infrastructure*
*Completed: 2026-03-26*

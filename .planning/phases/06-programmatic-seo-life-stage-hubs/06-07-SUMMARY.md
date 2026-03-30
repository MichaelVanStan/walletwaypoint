---
phase: 06-programmatic-seo-life-stage-hubs
plan: 07
subsystem: content, seo, calculators
tags: [city-rent, yaml, velite, HUD-FMR, programmatic-seo, rent-affordability, ISR]

# Dependency graph
requires:
  - phase: 06-programmatic-seo-life-stage-hubs
    provides: Velite City collection schema with slug, cityName, medianRents, editorial fields (Plan 01)
provides:
  - 25 city rent YAML data files with HUD FMR FY2026 median rent data
  - City-specific rent calculator pages at /calculators/rent-affordability/[city]
  - Dedicated rent-affordability base page with city navigation grid
  - Route coexistence pattern for [slug] exclusion with dedicated directory
affects: [06-10 sitemap splitting, future city expansion]

# Tech tracking
tech-stack:
  added: []
  patterns: [city YAML data convention with slug/cityName/stateName/medianRents/editorialContent/faqs/costContext, dedicated route directory overriding [slug] pattern, generateStaticParams exclusion list for route coexistence]

key-files:
  created:
    - content/cities/new-york-city.yaml
    - content/cities/los-angeles.yaml
    - content/cities/chicago.yaml
    - content/cities/houston.yaml
    - content/cities/phoenix.yaml
    - content/cities/philadelphia.yaml
    - content/cities/san-antonio.yaml
    - content/cities/san-diego.yaml
    - content/cities/dallas.yaml
    - content/cities/san-jose.yaml
    - content/cities/austin.yaml
    - content/cities/jacksonville.yaml
    - content/cities/fort-worth.yaml
    - content/cities/columbus.yaml
    - content/cities/charlotte.yaml
    - content/cities/indianapolis.yaml
    - content/cities/san-francisco.yaml
    - content/cities/seattle.yaml
    - content/cities/denver.yaml
    - content/cities/nashville.yaml
    - content/cities/oklahoma-city.yaml
    - content/cities/portland.yaml
    - content/cities/las-vegas.yaml
    - content/cities/memphis.yaml
    - content/cities/miami.yaml
    - src/app/calculators/rent-affordability/page.tsx
    - src/app/calculators/rent-affordability/[city]/page.tsx
  modified:
    - velite.config.ts
    - src/app/calculators/[slug]/page.tsx

key-decisions:
  - "Added faqSchema helper and cities collection to velite.config.ts since plan 01 changes not yet merged into worktree"
  - "Created dedicated rent-affordability/page.tsx to handle base route, excluding rent-affordability from [slug] generateStaticParams via DEDICATED_ROUTE_SLUGS array"
  - "Related cities grid uses random selection of 8 cities rather than geographic proximity, avoiding complexity of geographic distance calculations"
  - "Used Intl.NumberFormat for currency formatting in median rent table rather than importing calculators formatCurrency to keep the page server-component compatible"

patterns-established:
  - "Route coexistence pattern: DEDICATED_ROUTE_SLUGS array in [slug]/page.tsx excludes slugs that have dedicated route directories"
  - "City YAML data pattern: slug/cityName/stateName/stateAbbreviation/medianRents/dataSource/dataYear/lastVerified/editorialContent/faqs/costContext"
  - "City page template: breadcrumb, calculator, median rent table, editorial, cost context, FAQs with JSON-LD, city navigation grid, financial disclaimer"

requirements-completed: [PSEO-07, PSEO-08]

# Metrics
duration: 16min
completed: 2026-03-30
---

# Phase 6 Plan 07: City Rent Data + City-Specific Rent Calculator Pages Summary

**25 city rent YAML files with HUD FMR FY2026 data and 25 city-specific rent calculator pages at /calculators/rent-affordability/[city] with median rent tables, editorial content, and FAQ schema**

## Performance

- **Duration:** 16 min
- **Started:** 2026-03-30T16:03:03Z
- **Completed:** 2026-03-30T16:19:00Z
- **Tasks:** 2
- **Files modified:** 28 (25 YAML created, 2 TSX created, 1 TSX modified, 1 config modified)

## Accomplishments
- Created 25 city rent YAML files with genuine unique editorial content per city covering local rental markets, neighborhood pricing, transportation costs, tax implications, and cost-of-living factors
- Built city-specific rent calculator pages with breadcrumbs, calculator widget, median rent tables, editorial content sections, cost context, FAQ accordions with JSON-LD schema, and cross-city navigation grid
- Resolved route coexistence between existing /calculators/[slug] and new /calculators/rent-affordability/[city] via dedicated directory with DEDICATED_ROUTE_SLUGS exclusion pattern
- All content validated by Velite build and TypeScript type checking

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 25 city rent YAML data files** - `7bd4ca0` (feat)
2. **Task 2: City-specific rent calculator pages** - `2d648d4` (feat)

## Files Created/Modified
- `content/cities/*.yaml` (25 files) - City rent data with HUD FMR FY2026 median rents, 200+ words editorial content, 3-5 FAQs, and cost context per city
- `velite.config.ts` - Added faqSchema helper and cities Velite collection
- `src/app/calculators/rent-affordability/[city]/page.tsx` - City-specific rent calculator page with full page structure
- `src/app/calculators/rent-affordability/page.tsx` - Base rent affordability page with city navigation grid
- `src/app/calculators/[slug]/page.tsx` - Excluded rent-affordability from generateStaticParams

## Decisions Made
- Added cities collection schema and faqSchema helper directly to velite.config.ts since plan 01 changes were not yet merged into this worktree (parallel execution). The schema matches plan 01's definition exactly.
- Created a DEDICATED_ROUTE_SLUGS array in [slug]/page.tsx to filter out slugs that have their own route directories, preventing Next.js route conflicts. This is extensible for future dedicated calculator routes.
- Related cities in the "Explore Other Cities" grid use random selection rather than geographic proximity to avoid needing a geographic distance calculation library. This provides variety on each page load.
- Used native Intl.NumberFormat for currency formatting in the median rent table to keep the city page fully server-component compatible without importing client-side formatter utilities.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added faqSchema and cities collection to velite.config.ts**
- **Found during:** Task 1 (city YAML creation)
- **Issue:** The velite.config.ts in this worktree did not include the cities collection schema (defined in Plan 01, running in parallel)
- **Fix:** Added the faqSchema helper and cities collection directly to the config, matching Plan 01's schema definition
- **Files modified:** velite.config.ts
- **Verification:** `npx velite build` passes, all 25 city YAML files validate
- **Committed in:** 7bd4ca0 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking - parallel execution dependency)
**Impact on plan:** Minor -- necessary to unblock Velite validation in parallel worktree. Schema matches Plan 01 definition exactly.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all data is populated with genuine city-specific content and real HUD FMR data.

## Next Phase Readiness
- 25 city rent calculator pages ready for inclusion in Plan 10 sitemap splitting
- ISR configured with daily revalidation (86400 seconds)
- City navigation grid provides cross-linking between all 25 city pages
- Base rent affordability page updated with city directory linking

## Self-Check: PASSED

All 27 created files verified present. Both task commits (7bd4ca0, 2d648d4) verified in git log.

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

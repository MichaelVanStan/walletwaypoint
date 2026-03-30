---
phase: 06-programmatic-seo-life-stage-hubs
plan: 06
subsystem: guides, content, programmatic-seo
tags: [state-tax-guides, homebuyer-programs, yaml, velite, ssg, isr, faq-schema]

# Dependency graph
requires:
  - phase: 06-02
    provides: 51 state YAML files with brackets, editorial content, FAQs, tips
  - phase: 06-04
    provides: BracketTable component for graduated/flat/none tax bracket display
provides:
  - 51 state tax guide pages at /guides/state-taxes/[state] with brackets, deductions, and FAQs
  - 51 homebuyer program YAML data files with state HFA programs plus federal programs
  - 51 homebuyer program guide pages at /guides/first-time-buyer-programs/[state]
affects: [sitemap expansion, internal linking from hub pages, SEO coverage for guide-oriented queries]

# Tech tracking
tech-stack:
  added: []
  patterns: [programmatic guide pages from YAML data with editorial content, program card component with assistance type badges]

key-files:
  created:
    - src/app/guides/state-taxes/[state]/page.tsx
    - src/app/guides/first-time-buyer-programs/[state]/page.tsx
    - content/homebuyer-programs/alabama.yaml
    - content/homebuyer-programs/alaska.yaml
    - content/homebuyer-programs/arizona.yaml
    - content/homebuyer-programs/arkansas.yaml
    - content/homebuyer-programs/california.yaml
    - content/homebuyer-programs/colorado.yaml
    - content/homebuyer-programs/connecticut.yaml
    - content/homebuyer-programs/delaware.yaml
    - content/homebuyer-programs/district-of-columbia.yaml
    - content/homebuyer-programs/florida.yaml
    - content/homebuyer-programs/georgia.yaml
    - content/homebuyer-programs/hawaii.yaml
    - content/homebuyer-programs/idaho.yaml
    - content/homebuyer-programs/illinois.yaml
    - content/homebuyer-programs/indiana.yaml
    - content/homebuyer-programs/iowa.yaml
    - content/homebuyer-programs/kansas.yaml
    - content/homebuyer-programs/kentucky.yaml
    - content/homebuyer-programs/louisiana.yaml
    - content/homebuyer-programs/maine.yaml
    - content/homebuyer-programs/maryland.yaml
    - content/homebuyer-programs/massachusetts.yaml
    - content/homebuyer-programs/michigan.yaml
    - content/homebuyer-programs/minnesota.yaml
    - content/homebuyer-programs/mississippi.yaml
    - content/homebuyer-programs/missouri.yaml
    - content/homebuyer-programs/montana.yaml
    - content/homebuyer-programs/nebraska.yaml
    - content/homebuyer-programs/nevada.yaml
    - content/homebuyer-programs/new-hampshire.yaml
    - content/homebuyer-programs/new-jersey.yaml
    - content/homebuyer-programs/new-mexico.yaml
    - content/homebuyer-programs/new-york.yaml
    - content/homebuyer-programs/north-carolina.yaml
    - content/homebuyer-programs/north-dakota.yaml
    - content/homebuyer-programs/ohio.yaml
    - content/homebuyer-programs/oklahoma.yaml
    - content/homebuyer-programs/oregon.yaml
    - content/homebuyer-programs/pennsylvania.yaml
    - content/homebuyer-programs/rhode-island.yaml
    - content/homebuyer-programs/south-carolina.yaml
    - content/homebuyer-programs/south-dakota.yaml
    - content/homebuyer-programs/tennessee.yaml
    - content/homebuyer-programs/texas.yaml
    - content/homebuyer-programs/utah.yaml
    - content/homebuyer-programs/vermont.yaml
    - content/homebuyer-programs/virginia.yaml
    - content/homebuyer-programs/washington.yaml
    - content/homebuyer-programs/west-virginia.yaml
    - content/homebuyer-programs/wisconsin.yaml
    - content/homebuyer-programs/wyoming.yaml
  modified: []

key-decisions:
  - "State tax guide pages use D-06 programmatic pattern with editorial content from YAML rather than separate MDX files"
  - "Homebuyer program pages split programs into state-specific and federal sections for clear organization"
  - "Each homebuyer YAML includes 2-5 state HFA programs plus 3 federal programs (FHA, VA, USDA)"
  - "No-tax state guide variant shows property tax, sales tax, and cost of living tables instead of bracket tables"

patterns-established:
  - "Programmatic guide page: SSG from Velite collection with ISR 86400, breadcrumb nav, two-column layout with sticky TOC"
  - "Program card pattern: structured data rendered with assistance type badge, agency, amount, eligibility, external link"
  - "Editorial content split: first 2 paragraphs as overview, remaining paragraphs in separate understanding/tips section"

requirements-completed: [PSEO-03, PSEO-04, PSEO-05, PSEO-06]

# Metrics
duration: 9min
completed: 2026-03-30
---

# Phase 6 Plan 06: State Tax Guide Pages and Homebuyer Program Guides Summary

**102 programmatic guide pages (51 state tax + 51 homebuyer) with state-specific data, editorial content, FAQ rich results, and bracket tables**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-30T16:24:27Z
- **Completed:** 2026-03-30T16:33:14Z
- **Tasks:** 2/2
- **Files modified:** 53 created (2 page components + 51 YAML files)

## Accomplishments

- Created 51 state tax guide pages at /guides/state-taxes/[state] reusing BracketTable from Plan 04
- Each state tax guide has: overview, bracket table (graduated/flat/none variants), deductions table, filing tips, revenue authority link, related calculators, FAQ accordion with JSON-LD
- No-tax state variant shows property tax, sales tax, and cost-of-living tables instead of bracket and deduction sections
- Created 51 homebuyer program YAML files with 2-5 state-specific HFA programs plus 3 federal programs (FHA, VA, USDA) per state
- Each homebuyer YAML has unique 200+ word editorial content, 3-5 state-specific FAQs, program details with eligibility and URLs
- Created homebuyer program guide pages at /guides/first-time-buyer-programs/[state] with program cards showing assistance type badges
- Both page types follow the existing guide layout pattern with two-column layout, sticky TOC sidebar, breadcrumb navigation
- ISR configured at 24-hour revalidation (86400 seconds) for all pages
- AdBreak placements between major sections and AdSlot in sidebar

## Task Commits

Each task was committed atomically:

1. **Task 1: State tax guide pages** - `9acc6fd` (feat)
2. **Task 2: Homebuyer program YAML + guide pages** - `d2035a6` (feat)

## Files Created/Modified

- `src/app/guides/state-taxes/[state]/page.tsx` - 51 state tax guide SSG pages with BracketTable, deductions, FAQs, revenue authority links
- `src/app/guides/first-time-buyer-programs/[state]/page.tsx` - 51 homebuyer program guide SSG pages with program cards
- `content/homebuyer-programs/*.yaml` (51 files) - State-specific homebuyer program data with HFA programs, federal programs, editorial content, FAQs

## Decisions Made

- State tax guide pages render editorial content from YAML `editorialContent` field (D-06 programmatic pattern) rather than separate MDX files, satisfying D-07 intent for programmatic pages
- Homebuyer program pages split programs into state-specific vs. federal sections for clearer user navigation
- Each homebuyer YAML includes 2-5 state HFA programs plus 3 federal programs (FHA, VA, USDA), providing comprehensive coverage
- No-tax state guide variant replaces bracket/deduction sections with property tax, sales tax, and cost-of-living data tables
- Editorial content rendered with paragraph splitting (first 2 for overview, rest for understanding/tips section) for natural reading flow

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None -- all pages render real data from Velite YAML collections with genuine editorial content, program details, and FAQs.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- 102 new programmatic guide pages expand the sitemap significantly for SEO coverage
- State tax guides complement the paycheck calculator state pages (Plan 04) with guide-oriented content
- Homebuyer program guides complement the home affordability calculator (Plan 09) with state-specific program information
- Both page types are linked from related calculators and will be linked from hub pages (Plans 08)

## Self-Check: PASSED

All 51 homebuyer YAML files verified present. Both page components verified. Both task commits verified in git log.

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

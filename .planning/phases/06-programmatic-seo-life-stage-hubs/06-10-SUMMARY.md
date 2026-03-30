---
phase: 06-programmatic-seo-life-stage-hubs
plan: 10
subsystem: seo
tags: [sitemap, robots, next.js, seo, programmatic-seo, listicle]

# Dependency graph
requires:
  - phase: 06-01
    provides: "State, city, and homebuyer program Velite collections"
  - phase: 06-04
    provides: "State paycheck calculator pages at /calculators/paycheck/[state]"
  - phase: 06-05
    provides: "State indicator badge and comparison table"
  - phase: 06-06
    provides: "State tax guide pages at /guides/state-taxes/[state]"
  - phase: 06-07
    provides: "City rent calculator pages at /calculators/rent-affordability/[city]"
  - phase: 06-08
    provides: "Life-stage hub pages and guides"
  - phase: 06-09
    provides: "Calculator-paired educational guides"
provides:
  - "Split sitemap with 5 content-type sitemaps covering 200+ URLs"
  - "Listicle index page at /compare/best listing all best-of articles"
  - "Route conflict resolution between [slug] and dedicated calculator directories"
  - "Updated robots.ts with all sitemap references"
affects: [deployment, crawl-efficiency, seo-indexation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "generateSitemaps + async sitemap() pattern for split sitemaps in Next.js"
    - "DEDICATED_ROUTES filter pattern for [slug] route coexistence with static directories"

key-files:
  created:
    - "src/app/compare/best/page.tsx"
  modified:
    - "src/app/sitemap.ts"
    - "src/app/robots.ts"
    - "src/app/calculators/[slug]/page.tsx"

key-decisions:
  - "Split sitemaps by content type (core, paycheck, state-taxes, homebuyer, city-rent) rather than by URL count"
  - "Only filter paycheck from [slug] route since rent-affordability has no root page.tsx in its directory"
  - "Updated robots.ts disallow from /private/ to /go/ for affiliate redirect URLs"

patterns-established:
  - "generateSitemaps pattern: each content type gets its own sitemap XML for efficient crawling"
  - "DEDICATED_ROUTES exclusion pattern: filter known static-directory slugs from dynamic [slug] route generation"

requirements-completed: [PSEO-09, PSEO-10, HUB-01, HUB-02, HUB-03, HUB-04]

# Metrics
duration: 3min
completed: 2026-03-30
---

# Phase 06 Plan 10: Sitemap Splitting and Listicle Index Summary

**Split sitemap into 5 content-type sitemaps for 200+ programmatic URLs, created listicle index page at /compare/best, and resolved calculator route conflicts**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-30T16:23:54Z
- **Completed:** 2026-03-30T16:26:47Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Split single sitemap into 5 content-type sitemaps (core, paycheck, state-taxes, homebuyer, city-rent) covering 200+ URLs for efficient crawl budget distribution
- Created listicle index page at /compare/best with responsive 3-column card grid listing all best-of articles
- Resolved route conflict between /calculators/[slug] and /calculators/paycheck by filtering dedicated routes from generateStaticParams
- Updated robots.ts to reference all 5 split sitemap URLs and corrected disallow path from /private/ to /go/

## Task Commits

Each task was committed atomically:

1. **Task 1: Split sitemap + update robots.ts** - `92fa09e` (feat)
2. **Task 2: Listicle index page + route conflict resolution** - `effc16d` (feat)

## Files Created/Modified
- `src/app/sitemap.ts` - Refactored from single sitemap to generateSitemaps pattern with 5 content-type sitemaps
- `src/app/robots.ts` - Updated to reference all 5 split sitemap URLs, corrected disallow rules
- `src/app/compare/best/page.tsx` - New listicle index page with responsive card grid
- `src/app/calculators/[slug]/page.tsx` - Added DEDICATED_ROUTES filter to exclude paycheck from dynamic route

## Decisions Made
- Split sitemaps by content type rather than arbitrary URL count -- enables targeted crawl scheduling per content area
- Only filter "paycheck" from [slug] route, not "rent-affordability" -- rent-affordability directory has no root page.tsx so [slug] still serves the base route correctly
- Updated robots.ts disallow from /private/ to /go/ -- /go/ is the affiliate redirect path that should not be indexed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Updated robots.ts disallow from /private/ to /go/**
- **Found during:** Task 1 (robots.ts update)
- **Issue:** robots.ts disallowed /private/ which doesn't exist, but should disallow /go/ (affiliate redirect path)
- **Fix:** Changed disallow from ['/api/', '/private/'] to ['/api/', '/go/']
- **Files modified:** src/app/robots.ts
- **Verification:** robots.ts now correctly blocks crawling of affiliate redirect URLs

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Minor correction to robots.ts disallow path. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All programmatic pages are now included in split sitemaps for efficient crawl discovery
- Listicle index page provides entry point to all best-of comparison articles
- Route conflicts resolved for clean coexistence of dynamic and static calculator routes
- Phase 06 integration complete -- all 10 plans delivered

## Self-Check: PASSED

All files verified present. All commit hashes verified in git log.

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

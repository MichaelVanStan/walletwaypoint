---
phase: 01-foundation-trust
plan: 03
subsystem: ui
tags: [nextjs, react, homepage, placeholder-pages, error-pages, disclaimer, seo, server-components]

# Dependency graph
requires:
  - phase: 01-02
    provides: "Root layout with header, footer, breadcrumbs, SEO infrastructure, shadcn/ui components"
provides:
  - "Homepage with hero section, CTAs, trust signals, and placeholder cards"
  - "Four placeholder landing pages at /calculators, /guides, /hubs, /compare"
  - "Custom 404 and error pages"
  - "DisclaimerBanner component for calculator and guide routes"
  - "Full URL structure established for crawlers"
affects: [01-04, 01-05, 02-calculator-engine, 03-content-system]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Base UI render prop for Button+Link composition (not asChild)"
    - "Route-level layouts for cross-cutting concerns (disclaimer banner)"
    - "Server Component pages with static metadata via createMetadata"

key-files:
  created:
    - src/app/page.tsx
    - src/app/calculators/page.tsx
    - src/app/calculators/layout.tsx
    - src/app/guides/page.tsx
    - src/app/guides/layout.tsx
    - src/app/hubs/page.tsx
    - src/app/compare/page.tsx
    - src/app/not-found.tsx
    - src/app/error.tsx
    - src/components/trust/disclaimer-banner.tsx
  modified: []

key-decisions:
  - "Used render prop pattern for Button+Link composition (Base UI v4 does not support asChild)"
  - "Route-level layouts for /calculators and /guides to apply DisclaimerBanner without it appearing on /hubs or /compare"

patterns-established:
  - "Placeholder page pattern: Badge, H1, description, Back to Home button, cross-links to trust pages"
  - "DisclaimerBanner at route layout level for selective page application"
  - "render={<Link href='...' />} for polymorphic Button components"

requirements-completed: [TRUST-02]

# Metrics
duration: 2min
completed: 2026-03-24
---

# Phase 01 Plan 03: Homepage, Placeholder Pages, and Error Pages Summary

**Homepage with hero/CTAs/trust signals, four Coming Soon placeholder pages establishing URL structure, DisclaimerBanner on calculator/guide routes, and custom 404/error pages**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-24T15:04:42Z
- **Completed:** 2026-03-24T15:07:33Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Homepage renders hero with "Navigate money with confidence" headline, accent CTA to /calculators, outline CTA to /guides, four Coming Soon placeholder cards, and three trust signal cards with Shield/BookOpen/Scale icons
- Four placeholder landing pages (/calculators, /guides, /hubs, /compare) with descriptive content, Coming Soon badges, Back to Home buttons, and cross-links to About and Editorial Standards
- DisclaimerBanner component with role="note", aria-label, and link to /editorial-standards -- applied via route-level layouts on /calculators and /guides only
- Custom 404 page with friendly message, homepage link, and navigation suggestions
- Custom error page (client component) with try-again reset button and contact link
- All pages use createMetadata for title, description, OG, Twitter, and canonical URL

## Task Commits

Each task was committed atomically:

1. **Task 1: Build homepage with hero, CTAs, trust signals, and placeholder cards** - `3872acf` (feat)
2. **Task 2: Build placeholder pages, error pages, and disclaimer banner integration** - `9e1596a` (feat)

## Files Created/Modified
- `src/app/page.tsx` - Homepage with hero section, CTAs, placeholder cards, trust signals
- `src/app/calculators/page.tsx` - Calculators placeholder page with Coming Soon badge
- `src/app/calculators/layout.tsx` - Route layout applying DisclaimerBanner
- `src/app/guides/page.tsx` - Guides placeholder page with Coming Soon badge
- `src/app/guides/layout.tsx` - Route layout applying DisclaimerBanner
- `src/app/hubs/page.tsx` - Life Stage Hubs placeholder page
- `src/app/compare/page.tsx` - Product Comparisons placeholder page
- `src/app/not-found.tsx` - Custom 404 page with navigation links
- `src/app/error.tsx` - Client-side error boundary with reset button
- `src/components/trust/disclaimer-banner.tsx` - Reusable disclaimer banner component

## Decisions Made
- Used `render={<Link href="..." />}` prop pattern instead of `asChild` -- shadcn/ui v4 uses Base UI primitives which support the render prop, not the Radix asChild pattern
- Applied DisclaimerBanner via route-level layouts (/calculators/layout.tsx, /guides/layout.tsx) rather than conditional rendering in root layout, following Next.js nested layout conventions

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Button+Link composition pattern**
- **Found during:** Task 1 (Homepage build)
- **Issue:** Plan specified `<Button asChild>` wrapping `<Link>`, but shadcn/ui v4 uses Base UI which does not support `asChild` prop
- **Fix:** Used `render={<Link href="..." />}` prop pattern consistent with existing codebase (header.tsx, breadcrumbs.tsx)
- **Files modified:** src/app/page.tsx
- **Verification:** Build passes with zero TypeScript errors
- **Committed in:** 3872acf (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary adaptation for Base UI API. Pattern applied consistently across all Button+Link instances. No scope creep.

## Issues Encountered
None beyond the Button API deviation documented above.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all pages render substantive content matching UI-SPEC Copywriting Contract. Placeholder pages are intentionally "Coming Soon" by design (D-05), not implementation stubs.

## Next Phase Readiness
- Full URL structure established: /, /calculators, /guides, /hubs, /compare
- DisclaimerBanner ready for reuse on any future calculator or guide sub-routes
- Error boundaries in place for graceful failure handling
- Ready for Plan 04 (trust pages: About, Editorial Standards, Privacy Policy) which will complete the trust foundation

## Self-Check: PASSED

All 10 files verified present on disk. Both task commits (3872acf, 9e1596a) verified in git log.

---
*Phase: 01-foundation-trust*
*Completed: 2026-03-24*

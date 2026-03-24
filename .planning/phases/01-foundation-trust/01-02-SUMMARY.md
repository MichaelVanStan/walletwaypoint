---
phase: 01-foundation-trust
plan: 02
subsystem: ui, seo
tags: [next.js, shadcn-ui, navigation-menu, sheet, breadcrumbs, json-ld, schema-dts, sitemap, robots, structured-data]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Root layout, site-config, navigation data, type definitions, shadcn/ui components, Tailwind theme"
provides:
  - "Sticky header with desktop NavigationMenu and mobile hamburger Sheet"
  - "Multi-column footer with financial disclaimer"
  - "Auto-detecting breadcrumbs with BreadcrumbList JSON-LD schema"
  - "Generic JsonLd renderer with XSS-safe serialization"
  - "Organization, Article, FAQPage, WebApplication JSON-LD schema components"
  - "Programmatic sitemap.ts with 9 Phase 1 page URLs"
  - "Programmatic robots.ts with sitemap reference"
  - "Skip-to-main-content accessibility link"
affects: [01-03, 01-04, 01-05, phase-02, phase-03, phase-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component wrapper with Client Component inner for interactive layout (header + header-mobile)"
    - "JSON-LD schema components using schema-dts types with XSS-safe replace(/</g, \\u003c)"
    - "Auto-detecting breadcrumbs from pathname with optional manual override"
    - "Programmatic sitemap/robots using Next.js MetadataRoute types"

key-files:
  created:
    - src/components/layout/header.tsx
    - src/components/layout/header-mobile.tsx
    - src/components/layout/mobile-nav.tsx
    - src/components/layout/footer.tsx
    - src/components/layout/breadcrumbs.tsx
    - src/components/seo/json-ld.tsx
    - src/components/seo/breadcrumb-schema.tsx
    - src/components/seo/organization-schema.tsx
    - src/components/seo/article-schema.tsx
    - src/components/seo/faq-schema.tsx
    - src/components/seo/web-app-schema.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Split header into Server Component (header.tsx) + Client Component (header-mobile.tsx) to minimize client JS bundle"
  - "Created json-ld.tsx and breadcrumb-schema.tsx in Task 1 alongside layout components since breadcrumbs.tsx imports BreadcrumbSchema"
  - "Used side='left' for mobile Sheet per UI-SPEC Interaction Contract"

patterns-established:
  - "Layout components live in src/components/layout/ as Server Components with 'use client' inner components for interactivity"
  - "SEO schema components live in src/components/seo/ using a generic JsonLd<T> renderer"
  - "All JSON-LD serialization uses .replace(/</g, '\\u003c') for XSS prevention"
  - "Breadcrumbs auto-detect from pathname; pass items prop for manual override"

requirements-completed: [INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-07]

# Metrics
duration: 5min
completed: 2026-03-24
---

# Phase 1 Plan 2: Layout Shell & SEO Infrastructure Summary

**Sticky header with desktop NavigationMenu and mobile Sheet hamburger, 4-column footer with financial disclaimer, auto-detecting breadcrumbs with BreadcrumbList JSON-LD, 6 schema components (Organization, Article, FAQ, WebApp, Breadcrumb, generic JsonLd), programmatic sitemap and robots.txt**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-24T14:56:16Z
- **Completed:** 2026-03-24T15:01:43Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Complete site shell (header, footer, mobile nav, breadcrumbs) wired into root layout, rendering on every page
- 6 JSON-LD schema components with type-safe schema-dts types and XSS-safe serialization
- Programmatic sitemap.xml listing all 9 Phase 1 page URLs with priorities and change frequencies
- Programmatic robots.txt with sitemap reference and /api/ disallow rule
- Skip-to-main-content accessibility link as first focusable element
- Organization schema rendered site-wide via root layout

## Task Commits

Each task was committed atomically:

1. **Task 1: Build layout components and wire into root layout** - `269f75a` (feat)
2. **Task 2: Build SEO infrastructure** - `7a45180` (feat)

## Files Created/Modified
- `src/components/layout/header.tsx` - Sticky header with desktop NavigationMenu, logo, skip-nav link
- `src/components/layout/header-mobile.tsx` - Client component managing mobile hamburger state
- `src/components/layout/mobile-nav.tsx` - Sheet-based slide-out mobile navigation from left
- `src/components/layout/footer.tsx` - 4-column footer with navigation, disclaimer, copyright
- `src/components/layout/breadcrumbs.tsx` - Auto-detecting breadcrumbs with JSON-LD and optional manual items
- `src/components/seo/json-ld.tsx` - Generic JSON-LD script renderer with XSS-safe serialization
- `src/components/seo/breadcrumb-schema.tsx` - BreadcrumbList JSON-LD component
- `src/components/seo/organization-schema.tsx` - Organization JSON-LD component (site-wide)
- `src/components/seo/article-schema.tsx` - Article JSON-LD component for trust/content pages
- `src/components/seo/faq-schema.tsx` - FAQPage JSON-LD component for FAQ sections
- `src/components/seo/web-app-schema.tsx` - WebApplication JSON-LD component for calculators
- `src/app/sitemap.ts` - Programmatic XML sitemap with 9 Phase 1 URLs
- `src/app/robots.ts` - Programmatic robots.txt with sitemap and disallow rules
- `src/app/layout.tsx` - Updated to include Header, Footer, Breadcrumbs, OrganizationSchema, main-content id

## Decisions Made
- Split header into Server Component (header.tsx) + Client Component (header-mobile.tsx) to keep the majority of header rendering on the server and minimize client JS. Only the hamburger button state management needs "use client".
- Created json-ld.tsx, breadcrumb-schema.tsx, and organization-schema.tsx in Task 1 commit because breadcrumbs.tsx imports BreadcrumbSchema and layout.tsx imports OrganizationSchema -- these were blocking dependencies (Rule 3).
- Used Base UI NavigationMenu and Sheet (shadcn/ui v4 components) rather than Radix primitives -- this is what the installed shadcn components use.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created json-ld.tsx, breadcrumb-schema.tsx, organization-schema.tsx in Task 1**
- **Found during:** Task 1 (Layout components)
- **Issue:** breadcrumbs.tsx imports BreadcrumbSchema from seo/breadcrumb-schema, and layout.tsx imports OrganizationSchema. These were listed as Task 2 files but were needed for Task 1 to compile.
- **Fix:** Created the three SEO components as part of Task 1 commit since they are import dependencies of the layout components.
- **Files modified:** src/components/seo/json-ld.tsx, src/components/seo/breadcrumb-schema.tsx, src/components/seo/organization-schema.tsx
- **Verification:** `npx next build` succeeds after Task 1
- **Committed in:** 269f75a (Task 1 commit)

**2. [Rule 2 - Missing Critical] Created header-mobile.tsx as separate client component**
- **Found during:** Task 1 (Header implementation)
- **Issue:** Plan specified header.tsx as Server Component with Client Component inner. A separate client component file was needed for the useState hook managing mobile nav open/close state.
- **Fix:** Created header-mobile.tsx as the "use client" boundary containing the hamburger button and MobileNav state.
- **Files modified:** src/components/layout/header-mobile.tsx
- **Verification:** Header renders as Server Component, only hamburger interaction ships as client JS
- **Committed in:** 269f75a (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical)
**Impact on plan:** Both deviations were necessary for correct compilation and proper Server/Client Component separation. No scope creep.

## Issues Encountered
None - all components built and build passed on first attempt.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all components are fully implemented with real data sources (navigation.ts, site-config.ts).

## Next Phase Readiness
- Layout shell complete -- all future pages get header, footer, breadcrumbs automatically
- SEO schema components ready for use on trust pages (Plan 04) and calculator pages (Phase 2)
- Sitemap and robots.txt active at /sitemap.xml and /robots.txt
- Organization schema rendering site-wide

## Self-Check: PASSED

- All 14 files verified as existing on disk
- Both commit hashes (269f75a, 7a45180) verified in git log
- `npx next build` passed with zero errors

---
*Phase: 01-foundation-trust*
*Completed: 2026-03-24*

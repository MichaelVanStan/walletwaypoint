---
phase: quick
plan: 260327-ovz
subsystem: content, navigation, sitemap, legal
tags: [bugfix, dead-links, sitemap, navigation, dead-code, terms-of-use]
dependency_graph:
  requires: [phase-02-calculators, phase-03-guides, phase-04-compare]
  provides: [valid-callout-hrefs, terms-page, calculator-sitemap, calculator-nav]
  affects: [content/calculators/*.yaml, src/app/sitemap.ts, src/lib/navigation.ts, src/app/terms/page.tsx]
tech_stack:
  added: []
  patterns: [trust-page-pattern]
key_files:
  created:
    - src/app/terms/page.tsx
  modified:
    - content/calculators/mortgage-payment.yaml
    - content/calculators/rent-affordability.yaml
    - content/calculators/compound-interest.yaml
    - content/calculators/loan-repayment.yaml
    - content/calculators/savings-goal.yaml
    - content/calculators/budget.yaml
    - content/calculators/retirement.yaml
    - content/calculators/tax-estimator.yaml
    - content/calculators/rent-vs-buy.yaml
    - content/calculators/student-loan.yaml
    - src/app/sitemap.ts
    - src/lib/navigation.ts
  deleted:
    - src/components/compare/comparison-table.tsx
    - src/components/compare/comparison-filters.tsx
    - src/components/compare/sort-header.tsx
decisions:
  - Fixed 30 callout hrefs to map each calculator to its paired guide + 2 topically related guides
  - Terms of Use page follows privacy-policy trust page pattern with ArticleSchema and createMetadata
metrics:
  duration: 4min
  completed: "2026-03-27T22:02:21Z"
---

# Quick Task 260327-ovz: Fix v1.0 Milestone Audit Gaps Summary

Fix 30 dead calculator callout hrefs, add Terms of Use page, add calculator URLs to sitemap, enable calculator navigation, and delete 3 orphaned comparison components.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 8b5ae83 | Fix 30 dead callout hrefs and add Terms of Use page |
| 2 | f7604ed | Add calculators to sitemap, enable nav, delete dead code |

## What Changed

### Task 1: Fix 30 calculator YAML callout hrefs and create Terms of Use page

**Callout hrefs (30 total across 10 files):** Every calculator YAML had 3 callout entries with placeholder hrefs pointing to nonexistent guide slugs (e.g., `/guides/mortgage-rate-tips`, `/guides/investing-basics`). Updated all 30 hrefs to reference valid guide pages. Each calculator's first callout links to its own paired guide; the other two link to topically related guides.

**Terms of Use page:** Created `src/app/terms/page.tsx` following the trust page pattern from `privacy-policy/page.tsx`. Includes `createMetadata`, `ArticleSchema` with structured data, and 9 content sections covering: acceptance of terms, use of content, calculator disclaimer, intellectual property, third-party links, limitation of liability, modifications, governing law, and contact.

### Task 2: Add calculators to sitemap, enable nav, delete dead code

**Sitemap:** Added `calculators` to the `#site/content` import and created a `calculatorRoutes` block that maps all 10 calculator slugs into the sitemap with monthly change frequency and 0.8 priority.

**Navigation:** Removed 5 `disabled: true` flags from calculator entries in `navigation.ts` (1 parent Calculators entry, 3 children in mainNavigation, 1 footer tools entry). Calculators are now fully navigable from header and footer.

**Dead code:** Deleted 3 orphaned comparison components that were replaced by the Phase 4 hybrid UI rebuild: `comparison-table.tsx`, `comparison-filters.tsx`, `sort-header.tsx`. Verified no other files import them before deletion.

## Verification

- `npx next build` passes cleanly with `/terms` as a static route
- All 10 `/calculators/[slug]` URLs appear in the build output
- Zero `disabled` flags remain in navigation.ts
- All 30 callout hrefs reference one of the 10 valid guide slugs
- Three orphaned comparison files are deleted

## Deviations from Plan

### Minor Adjustments

**1. Sitemap already had products/comparisonRoutes from Phase 4.** The plan's import snippet (`import { calculators, guides, hubs, products }`) was already partially applied -- `products` was already imported and `comparisonRoutes` already existed. Added only `calculators` to the existing import. Not a deviation, just a more current starting state than the plan assumed.

**2. Compare nav already enabled.** The plan mentioned 5 `disabled: true` instances for calculators. The Compare section had already been enabled in Phase 4. Only calculator-related disabled flags (5 total) remained and were removed.

**3. Orphaned comparison files -- dead code already confirmed.** The plan asked to verify no imports before deleting. Only `comparison-table.tsx` imported `sort-header.tsx` internally; nothing outside the three files referenced them.

## Known Stubs

None -- all links resolve to real pages, all data is wired, no placeholder content.

## Self-Check: PASSED

- src/app/terms/page.tsx: FOUND
- comparison-table.tsx: CONFIRMED DELETED
- comparison-filters.tsx: CONFIRMED DELETED
- sort-header.tsx: CONFIRMED DELETED
- Commit 8b5ae83: FOUND
- Commit f7604ed: FOUND

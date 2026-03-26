---
phase: 04-comparison-affiliate-infrastructure
plan: 02
subsystem: ui
tags: [methodology, trust, cfpb, seo, json-ld, compliance]

# Dependency graph
requires:
  - phase: 01-foundation-trust
    provides: trust page layout pattern (editorial-standards), ArticleSchema, createMetadata, siteConfig, Separator component
provides:
  - CFPB-compliant ranking methodology page at /how-we-rank
  - Independence promise documentation (commission does not affect rankings)
  - Per-category ranking criteria for credit cards, personal loans, savings/CDs, insurance
affects: [04-comparison-affiliate-infrastructure]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Methodology page follows trust page pattern (720px max-width, Article JSON-LD, Separator dividers)"

key-files:
  created:
    - src/app/how-we-rank/page.tsx
  modified: []

key-decisions:
  - "Used ArticleSchema component (reuse from Phase 1) rather than inline JsonLd for consistency with editorial-standards page"
  - "Used Separator client component between sections for visual hierarchy per UI-SPEC"
  - "Text-xl for H2 headings (20px subheading) per UI-SPEC typography scale"

patterns-established:
  - "Methodology page pattern: H1 > date > intro > Separator > H2 sections with criteria lists > cross-reference links"

requirements-completed: [AFFIL-05]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 4 Plan 2: How We Rank Products Summary

**CFPB-compliant ranking methodology page at /how-we-rank with per-category criteria, independence promise, and data source documentation**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T21:41:49Z
- **Completed:** 2026-03-26T21:44:48Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Created /how-we-rank methodology page with ~1350+ words of substantive content
- Independence promise explicitly states commission rates do not influence rankings (D-12)
- Four per-category ranking criteria sections: credit cards, personal loans, savings accounts & CDs, insurance
- CFPB reference and data sources documentation
- Cross-reference links to /editorial-standards and /compare
- Article JSON-LD schema for SEO

## Task Commits

Each task was committed atomically:

1. **Task 1: How We Rank Products methodology page** - `b4ba00a` (feat)

**Plan metadata:** pending final commit (docs: complete plan)

## Files Created/Modified
- `src/app/how-we-rank/page.tsx` - CFPB-compliant ranking methodology page with independence promise, per-category criteria, data sources, and update frequency documentation

## Decisions Made
- Used ArticleSchema component (reuse from Phase 1) rather than building inline JsonLd -- consistent with editorial-standards page pattern
- Used Separator (client component) between major sections for visual hierarchy per UI-SPEC methodology page layout
- H2 headings at text-xl (20px) per UI-SPEC typography scale (Heading role = 24px for H1, Subheading role = 20px for H2)

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all content is final, non-placeholder text.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /how-we-rank page ready for cross-referencing from comparison category pages
- Comparison table caption will link to this methodology page per UI-SPEC copy contract
- Page follows same trust page pattern as editorial-standards for visual consistency

## Self-Check: PASSED

- FOUND: src/app/how-we-rank/page.tsx
- FOUND: .planning/phases/04-comparison-affiliate-infrastructure/04-02-SUMMARY.md
- FOUND: commit b4ba00a

---
*Phase: 04-comparison-affiliate-infrastructure*
*Completed: 2026-03-26*

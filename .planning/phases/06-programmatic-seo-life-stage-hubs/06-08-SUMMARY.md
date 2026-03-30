---
phase: 06-programmatic-seo-life-stage-hubs
plan: 08
subsystem: content
tags: [yaml, mdx, velite, hubs, guides, navigation, life-stage]

# Dependency graph
requires:
  - phase: 06-01
    provides: "Hub YAML schema, hub page route, guide schema, Velite collections"
provides:
  - "4 new life-stage hub YAML configs (new-parents, wedding-marriage, fire-early-retirement, debt-crisis-recovery)"
  - "8 new MDX guides (2 per hub) with 2000-3000 words each"
  - "Expanded navigation with children entries for all 10 hubs"
affects: [06-09, 06-10]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hub YAML pattern extended to 4 new life stages with consistent structure"
    - "Guide MDX content with hub cross-references and calculator pairings"

key-files:
  created:
    - content/hubs/new-parents.yaml
    - content/hubs/wedding-marriage.yaml
    - content/hubs/fire-early-retirement.yaml
    - content/hubs/debt-crisis-recovery.yaml
    - content/guides/new-parent-financial-checklist.mdx
    - content/guides/cost-of-raising-a-child.mdx
    - content/guides/wedding-budget-guide.mdx
    - content/guides/combining-finances-after-marriage.mdx
    - content/guides/fire-basics.mdx
    - content/guides/four-percent-rule-explained.mdx
    - content/guides/debt-recovery-guide.mdx
    - content/guides/debt-snowball-vs-avalanche.mdx
  modified:
    - src/lib/navigation.ts

key-decisions:
  - "Used correct calculator slugs (tax-estimator, loan-repayment) instead of plan-specified abbreviations (tax, loan) to match actual calculator YAML files"
  - "Expanded navigation with children entries for all 10 hubs (not just the 4 new ones) for consistent discovery"

patterns-established:
  - "Hub YAML: each hub references 3 calculators, 2 guides, 4 tips, 2 next-step hubs"
  - "Guide MDX: 2000-3000 word educational content with 5 keyTakeaways, 5 FAQs, relatedGuides array"

requirements-completed: [HUB-01, HUB-02, HUB-03, HUB-04, CONT-06]

# Metrics
duration: 13min
completed: 2026-03-30
---

# Phase 06 Plan 08: Life-Stage Hubs + Guides Summary

**4 new life-stage hub YAML configs (New Parents, Wedding/Marriage, FIRE, Debt Crisis) with 8 companion MDX guides and expanded hub navigation**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-30T15:37:48Z
- **Completed:** 2026-03-30T15:50:47Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Created 4 hub YAML configs following existing hub pattern with calculators, guides, tips, and next-step links
- Wrote 8 MDX guides (2 per hub) totaling approximately 20,000 words of genuine financial education content
- Expanded navigation to include children entries for all 10 hubs for consistent user discovery
- All content validated by Velite build (exits 0, all schemas pass)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 4 hub YAML configs** - `ff8c11f` (feat)
2. **Task 2: Write 8 hub guides + update navigation** - `7ef010c` (feat)

## Files Created/Modified
- `content/hubs/new-parents.yaml` - New Parents / Growing Family hub config
- `content/hubs/wedding-marriage.yaml` - Wedding / Marriage hub config
- `content/hubs/fire-early-retirement.yaml` - FIRE / Early Retirement hub config
- `content/hubs/debt-crisis-recovery.yaml` - Debt Crisis / Financial Recovery hub config
- `content/guides/new-parent-financial-checklist.mdx` - Financial checklist for new parents
- `content/guides/cost-of-raising-a-child.mdx` - Year-by-year child costs breakdown
- `content/guides/wedding-budget-guide.mdx` - Wedding budget planning guide
- `content/guides/combining-finances-after-marriage.mdx` - Merging finances after marriage
- `content/guides/fire-basics.mdx` - FIRE fundamentals and step-by-step guide
- `content/guides/four-percent-rule-explained.mdx` - Trinity Study and withdrawal rate deep dive
- `content/guides/debt-recovery-guide.mdx` - Judgment-free debt crisis recovery plan
- `content/guides/debt-snowball-vs-avalanche.mdx` - Side-by-side debt payoff strategy comparison
- `src/lib/navigation.ts` - Added children entries for all 10 hubs under Your Journey

## Decisions Made
- Used correct existing calculator slugs (tax-estimator instead of tax, loan-repayment instead of loan) to match actual YAML files
- Added all 10 hubs as navigation children (not just the 4 new ones) for consistent user experience
- Each guide written in "friendly mentor" tone per project guidelines, with actionable tables, examples, and calculator cross-references

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected calculator slug references**
- **Found during:** Task 1 (Hub YAML creation)
- **Issue:** Plan specified `tax` and `loan` as calculator slugs, but actual calculator YAML files use `tax-estimator` and `loan-repayment`
- **Fix:** Used correct slugs in hub YAML configs
- **Files modified:** content/hubs/wedding-marriage.yaml, content/hubs/debt-crisis-recovery.yaml
- **Verification:** Velite build passes, calculator references resolve correctly

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Minor slug correction necessary for correctness. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 10 hubs now have YAML configs and are renderable at /hubs/[slug]
- 29 total guide MDX files available in content/guides/
- Navigation fully wired with all hub links
- Ready for remaining plans in phase 06

## Self-Check: PASSED

- All 13 files verified as existing on disk
- Both task commits (ff8c11f, 7ef010c) verified in git history

---
*Phase: 06-programmatic-seo-life-stage-hubs*
*Completed: 2026-03-30*

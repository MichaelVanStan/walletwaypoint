---
phase: 03-content-system-life-stage-hubs
plan: 02
subsystem: content
tags: [mdx, callout, glossary, popover, toc, intersection-observer, ssg, guide-pages]

# Dependency graph
requires:
  - phase: 03-content-system-life-stage-hubs
    provides: "Velite guides/glossary collections, MDXContent renderer, mdxComponents map, Popover component"
provides:
  - "KeyTakeaway, ProTip, Definition callout components for MDX content"
  - "Term component with glossary Popover lookup"
  - "TableOfContents component with IntersectionObserver scroll tracking"
  - "GuideCtaBanner CTA card linking to paired calculator"
  - "RelatedContent card grid for guide cross-linking"
  - "Guide [slug] dynamic route with SSG, Article/FAQPage JSON-LD, two-column layout"
  - "Guide index page with responsive card grid"
affects: [03-03, 03-04, 03-05, 03-06]

# Tech tracking
tech-stack:
  added: []
  patterns: [callout box pattern with role=note and icon+label, IntersectionObserver TOC tracking, Base UI Popover for inline glossary definitions]

key-files:
  created:
    - src/components/content/key-takeaway.tsx
    - src/components/content/pro-tip.tsx
    - src/components/content/definition.tsx
    - src/components/content/term.tsx
    - src/components/content/table-of-contents.tsx
    - src/components/content/guide-cta-banner.tsx
    - src/components/content/related-content.tsx
    - src/app/guides/[slug]/page.tsx
  modified:
    - src/components/content/mdx-components.tsx
    - src/app/guides/page.tsx

key-decisions:
  - "Base UI Accordion uses multiple (boolean) prop instead of type='single', no collapsible prop needed"
  - "PopoverTrigger renders as button directly (no nested button) to avoid invalid HTML"
  - "Term component uses silent fallback (plain span) for unrecognized glossary terms"
  - "TOC mobile view shows only H2 headings in horizontal pills; desktop shows full H2+H3 hierarchy"

patterns-established:
  - "Callout component pattern: role=note, aria-label, icon+label header, children body, color via Tailwind theme tokens"
  - "Guide page two-column layout: max-w-[1080px] container, lg:grid-cols-[1fr_240px], sticky sidebar at top-24"
  - "Guide article column: max-w-[720px] for readable line lengths"
  - "Guide card grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 with hover:border-accent/50 transition"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]

# Metrics
duration: 9min
completed: 2026-03-26
---

# Phase 3 Plan 2: Guide Components & Page Architecture Summary

**7 MDX content components (callouts, glossary Term, TOC, CTA banner, related cards) with guide [slug] SSG route and index page grid**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-26T06:07:05Z
- **Completed:** 2026-03-26T06:16:09Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Created 3 callout box components (KeyTakeaway blue, ProTip green, Definition teal) with role=note accessibility and consistent icon+label styling
- Built glossary Term component with Base UI Popover for hover/tap definitions, dotted underline styling, and silent fallback for unknown terms
- Implemented sticky TableOfContents with IntersectionObserver scroll tracking on desktop and collapsible horizontal pills on mobile
- Created GuideCtaBanner linking to paired calculator and RelatedContent card grid for guide cross-linking
- Built guide [slug] dynamic route with two-column layout, Article/FAQPage JSON-LD schema, breadcrumb navigation, and FAQ accordion
- Replaced guides index placeholder with responsive three-column card grid showing all guides with reading time badges

## Task Commits

Each task was committed atomically:

1. **Task 1: Create MDX callout components, Term component, TOC sidebar, CTA banner, and related content cards** - `d1c36a5` (feat)
2. **Task 2: Create guide [slug] page route with SSG and guide index page** - `63969ab` (feat)

## Files Created/Modified
- `src/components/content/key-takeaway.tsx` - Blue callout box with Lightbulb icon for main points
- `src/components/content/pro-tip.tsx` - Green callout box with Sparkles icon for actionable advice
- `src/components/content/definition.tsx` - Teal callout box with BookOpen icon for term definitions
- `src/components/content/term.tsx` - Client component with glossary Popover lookup on hover/tap
- `src/components/content/table-of-contents.tsx` - Sticky TOC with IntersectionObserver and mobile collapse
- `src/components/content/guide-cta-banner.tsx` - CTA aside card linking to paired calculator
- `src/components/content/related-content.tsx` - Related guides card grid with reading time badges
- `src/components/content/mdx-components.tsx` - Updated to register KeyTakeaway, ProTip, Definition, Term
- `src/app/guides/[slug]/page.tsx` - Dynamic guide route with SSG, two-column layout, JSON-LD schema
- `src/app/guides/page.tsx` - Guide index page with responsive card grid

## Decisions Made
- Base UI Accordion uses `multiple` (boolean, default false) and `defaultValue` as array instead of Radix-style `type="single"` with string defaultValue
- PopoverTrigger renders directly as the trigger button element (applying className to PopoverTrigger) instead of nesting a button inside to avoid invalid HTML
- Term component uses silent fallback (renders plain span) when glossary term is not found, per UI-SPEC error states
- Mobile TOC shows only H2 headings in horizontal pill layout for space efficiency; full H2+H3 hierarchy shown on desktop sidebar

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Accordion API mismatch with Base UI**
- **Found during:** Task 2 (guide [slug] page)
- **Issue:** Plan specified `type="single" collapsible defaultValue="faq-0"` which is Radix Accordion API; Base UI Accordion uses `multiple` (boolean) and `defaultValue` as array
- **Fix:** Changed to `defaultValue={['faq-0']}` without type or collapsible props (Base UI defaults to single-item, always collapsible)
- **Files modified:** src/app/guides/[slug]/page.tsx
- **Verification:** TypeScript compiles without Accordion prop errors
- **Committed in:** 63969ab (Task 2 commit)

**2. [Rule 1 - Bug] Fixed nested button in Term Popover trigger**
- **Found during:** Task 1 (Term component)
- **Issue:** Plan specified wrapping a `<button>` inside `<PopoverTrigger>`, but Base UI PopoverTrigger already renders as a button, causing invalid HTML (button inside button)
- **Fix:** Applied className styling directly to PopoverTrigger instead of nesting a button
- **Files modified:** src/components/content/term.tsx
- **Verification:** No nested button elements, trigger still keyboard accessible
- **Committed in:** d1c36a5 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Both fixes necessary for correctness. Base UI API differs from Radix API patterns referenced in plan. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all components are functional. Guide pages will render MDX content once guide MDX files are authored in Plans 04-05.

## Next Phase Readiness
- All guide rendering components ready for content authoring in Plans 04-05
- Guide [slug] route will generate pages via SSG when MDX content files exist in content/guides/
- Guide index page dynamically lists all published guides
- TOC sidebar auto-populates from heading IDs generated by rehype-slug (configured in Plan 01)

## Self-Check: PASSED

All 10 created/modified files verified present. Both task commits (d1c36a5, 63969ab) verified in git log.

---
*Phase: 03-content-system-life-stage-hubs*
*Completed: 2026-03-26*

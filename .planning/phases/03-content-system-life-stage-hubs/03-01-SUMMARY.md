---
phase: 03-content-system-life-stage-hubs
plan: 01
subsystem: content
tags: [velite, mdx, glossary, rehype, popover, content-pipeline]

# Dependency graph
requires:
  - phase: 02-calculator-engine-core-tools
    provides: "Velite config with calculator collection, Zod schema patterns, content directory structure"
provides:
  - "Velite guides collection (MDX) with slug, title, description, calculator, hub, keyTakeaways, faqs, metadata, body"
  - "Velite hubs collection (YAML) with slug, name, tagline, icon, accentColor, calculatorSlugs, guideSlugs, tips, nextSteps"
  - "Velite glossary collection (single YAML) with 25 financial terms"
  - "MDXContent client component using useMDXComponent pattern"
  - "mdxComponents map with HTML element overrides for guide typography"
  - "shadcn/ui Popover component (Base UI)"
  - "rehype-slug and rehype-autolink-headings configured in Velite MDX pipeline"
affects: [03-02, 03-03, 03-04, 03-05, 03-06, 03-07]

# Tech tracking
tech-stack:
  added: [rehype-slug, rehype-autolink-headings]
  patterns: [useMDXComponent with new Function() + react/jsx-runtime, single YAML glossary collection, MDX component map with HTML overrides]

key-files:
  created:
    - content/glossary.yaml
    - src/components/content/mdx-content.tsx
    - src/components/content/mdx-components.tsx
    - src/components/ui/popover.tsx
  modified:
    - velite.config.ts
    - package.json
    - package-lock.json

key-decisions:
  - "Used useMDXComponent pattern (new Function + jsx-runtime) instead of next-mdx-remote for MDX rendering"
  - "HTML element overrides in mdxComponents use leading-[1.7] for guide body text readability"
  - "Glossary uses single YAML collection pattern with 25 initial terms covering core financial literacy concepts"

patterns-established:
  - "MDX rendering: useMDXComponent pattern with shared component map for custom MDX elements"
  - "Content collections: guides (MDX), hubs (YAML), glossary (single YAML) alongside existing calculators"
  - "Rehype pipeline: rehype-slug before rehype-autolink-headings for heading anchor links"

requirements-completed: [CONT-01, CONT-05]

# Metrics
duration: 6min
completed: 2026-03-26
---

# Phase 3 Plan 1: Content Infrastructure Summary

**Velite extended with guides/hubs/glossary collections, MDX renderer using useMDXComponent pattern, and 25-term financial glossary YAML**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-26T05:56:13Z
- **Completed:** 2026-03-26T06:02:32Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Extended Velite config from 1 collection (calculators) to 4 collections (calculators, guides, hubs, glossary) with full Zod schema validation
- Created MDX rendering pipeline using useMDXComponent pattern with shared component map for HTML element typography overrides
- Authored glossary.yaml with 25 plain-English financial terms covering APR, DTI, PMI, amortization, compound interest, and more
- Installed rehype-slug and rehype-autolink-headings for automatic heading IDs and anchor links in MDX content
- Added shadcn/ui Popover component (Base UI) for glossary term hover definitions

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend Velite config with guides, hubs, and glossary collections + install rehype plugins** - `28f666f` (feat)
2. **Task 2: Create MDX rendering pipeline and glossary YAML data file** - `5a24d5b` (feat)

## Files Created/Modified
- `velite.config.ts` - Extended with guides (MDX), hubs (YAML), glossary (single YAML) collections and rehype plugin configuration
- `content/glossary.yaml` - 25 financial glossary terms with term, slug, definition, and optional longDefinition
- `src/components/content/mdx-content.tsx` - Client component MDX renderer using useMDXComponent pattern with new Function() + react/jsx-runtime
- `src/components/content/mdx-components.tsx` - Shared MDX component map with HTML element overrides for guide typography (h2, h3, p, ul, ol, a, blockquote, table)
- `src/components/ui/popover.tsx` - shadcn/ui Popover component (Base UI) for glossary term hover definitions
- `package.json` - Added rehype-slug and rehype-autolink-headings dependencies
- `package-lock.json` - Updated lockfile

## Decisions Made
- Used useMDXComponent pattern (new Function + jsx-runtime) instead of next-mdx-remote, keeping the architecture consistent with Velite's compilation model
- HTML element overrides use leading-[1.7] for paragraph text and leading-[1.6] for list items, matching UI-SPEC guide typography
- Glossary structured as single YAML collection (not per-file) for centralized term management across all content

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all components are functional. The mdxComponents map will be extended in Plan 02 with KeyTakeaway, ProTip, Definition, and Term custom components as planned.

## Next Phase Readiness
- Velite collections ready for content authoring (guides MDX, hubs YAML, glossary data)
- MDX rendering pipeline ready for guide page implementation in Plan 03
- Popover component ready for glossary Term component in Plan 02
- rehype plugins configured for automatic heading IDs and anchor links

## Self-Check: PASSED

All 6 created/modified files verified present. Both task commits (28f666f, 5a24d5b) verified in git log.

---
*Phase: 03-content-system-life-stage-hubs*
*Completed: 2026-03-26*

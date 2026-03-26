# Phase 3: Content System & Life-Stage Hubs - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the MDX content pipeline, 10 educational guides (one paired with each calculator), 6 life-stage hub pages, an internal linking system connecting calculators/guides/hubs, and an inline financial glossary with hover tooltips. Content is authored in MDX, processed by Velite, and rendered as statically generated pages.

</domain>

<decisions>
## Implementation Decisions

### Guide page structure
- **D-01:** Comprehensive guides (2000-3000 words) — full educational articles covering what the concept is, how the math works, common mistakes, worked examples, and FAQs. Best for YMYL SEO and E-E-A-T authority.
- **D-02:** Long-form layout with sticky TOC sidebar — article content centered, sticky table-of-contents on the right (desktop). Scannable sections with callout boxes between them. Collapses to top anchor nav on mobile.
- **D-03:** Three distinct callout types — blue "Key Takeaway" boxes for main points, subtle inline "Definition" highlights for terms, and green "Pro Tip" boxes for actionable advice (maps to CONT-03).
- **D-04:** Sticky CTA banner linking to paired calculator — guide is a standalone page at /guides/[slug], with a persistent banner/card linking to the paired calculator at /calculators/[slug]. Two separate indexable pages for SEO.

### Hub page design
- **D-05:** Hero + curated sections layout — hero banner with life-stage tagline, then curated sections: "Your Calculators" (card grid), "Guides For You" (article previews), "Quick Tips" (checklist/callouts), "Next Steps" (related hub links). Editorial narrative ties it together.
- **D-06:** Intro paragraph + section intros — 2-3 sentence intro setting the scene ("Just graduated? Here's your money roadmap."), then brief 1-2 sentence intros per section. "Smart friend" tone shines here.
- **D-07:** Calculators + guides only for Phase 3 — no product recommendation sections until Phase 4 comparison infrastructure exists. Placeholder slots can be added now.
- **D-08:** Shared layout, unique icon + accent color per hub — same page structure across all 6 hubs, each gets a distinct icon and subtle accent color (e.g., Student = green, Retirement = navy). Light theming, consistent feel.

### Glossary & tooltips
- **D-09:** Single YAML glossary file — one `content/glossary.yaml` with all terms + definitions, processed by Velite into a typed collection. Single source of truth, reusable across guides and hubs.
- **D-10:** Custom MDX component `<Term>APR</Term>` — authors wrap terms explicitly in a Term component that auto-looks up the definition from the glossary. No auto-detection, no false positives.
- **D-11:** Standalone /glossary page — alphabetical listing of all terms, A-Z. Good for SEO ("what is APR"), acts as internal link hub.
- **D-12:** Dotted underline + hover popover — terms get subtle dotted underline, hover shows small popover with 2-3 sentence definition. Tap on mobile. Uses shadcn Tooltip or Popover component.

### Content authoring
- **D-13:** Claude generates drafts, user reviews — Claude writes comprehensive first drafts in "smart friend" tone, user reviews and edits. MDX files land in repo for ongoing editing.
- **D-14:** Flat content directory: `content/guides/[slug].mdx` — mirrors calculator slugs 1:1. Velite processes as a "guides" collection.
- **D-15:** Rich frontmatter with Velite schema — title, description, calculator (paired slug), hub (life-stage), readingTime, lastUpdated, keyTakeaways[], faqs[], relatedGuides[]. Validated against Zod schema. Enables programmatic linking and structured data.
- **D-16:** YAML config + MDX intro for hubs — each hub has a YAML config (`content/hubs/[slug].yaml`) defining name, tagline, accent color, icon, calculator slugs, guide slugs, tips[], nextSteps[]. Optional MDX file for editorial intro paragraph.

### Claude's Discretion
- Exact Velite schema definitions for guides and hubs collections
- MDX component library design (KeyTakeaway, ProTip, Definition callout implementations)
- TOC generation approach (remark plugin vs manual frontmatter)
- Glossary term selection (which financial terms to include initially)
- Hub accent color palette choices within the established blue-based design system
- Internal linking component implementation (related guides sidebar, next steps cards)
- FAQPage and Article schema markup structure for guide pages
- Reading time calculation approach
- Mobile-responsive behavior for sticky TOC sidebar

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Content requirements
- `.planning/REQUIREMENTS.md` — CONT-01 through CONT-05 (content/guide requirements), HUB-01 through HUB-06 (life-stage hub requirements)

### Existing infrastructure
- `velite.config.ts` — Current Velite configuration with calculator collection schema (must be extended for guides, hubs, glossary collections)
- `src/app/guides/page.tsx` — Existing placeholder guides index page
- `src/app/guides/layout.tsx` — Existing guides layout with DisclaimerBanner
- `src/app/hubs/page.tsx` — Existing placeholder hubs index page
- `content/calculators/mortgage-payment.yaml` — Reference for YAML config pattern used by calculators

### Prior phase context
- `.planning/phases/01-foundation-trust/01-CONTEXT.md` — Visual identity decisions (D-01 through D-04: blue palette, Inter font, shadcn/ui)
- `.planning/phases/02-calculator-engine-core-tools/02-CONTEXT.md` — Calculator layout and interaction decisions, callout card links to guides

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **shadcn/ui Tooltip component** (`src/components/ui/tooltip.tsx`): Can be used for glossary term hover popovers
- **Card component** (`src/components/ui/card.tsx`): Reusable for hub calculator/guide cards
- **Badge component** (`src/components/ui/badge.tsx`): Category badges, reading time tags
- **Accordion component** (`src/components/ui/accordion.tsx`): FAQ sections in guides
- **Table component** (`src/components/ui/table.tsx`): Comparison tables in guides
- **Tabs component** (`src/components/ui/tabs.tsx`): Potential mobile TOC alternative
- **DisclaimerBanner** (`src/components/trust/disclaimer-banner.tsx`): Already in guides layout
- **createMetadata helper** (`src/lib/metadata.ts`): SEO metadata generation pattern
- **Navigation system** (`src/lib/navigation.ts`): Site navigation structure

### Established Patterns
- **Velite + YAML collections**: Calculator configs define a proven pattern for content-as-data
- **Dynamic routes with generateStaticParams**: `src/app/calculators/[slug]/page.tsx` demonstrates the SSG pattern for content pages
- **Calculator registry pattern**: `src/lib/calculators/registry.ts` maps slugs to modules — similar pattern could work for guide/hub routing
- **OKLCH color system**: Blue palette with teal accents established in Phase 1

### Integration Points
- **Calculator callout cards**: Already link to `/guides/[slug]` — these need real pages to land on
- **Site navigation**: Header nav already has Guides and Hubs links pointing to placeholder pages
- **Sitemap**: `src/app/sitemap.ts` needs guide and hub URLs added
- **Existing placeholder pages**: `/guides` and `/hubs` need to be replaced with real index pages

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decisions captured above.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-content-system-life-stage-hubs*
*Context gathered: 2026-03-26*

# Phase 4: Comparison & Affiliate Infrastructure - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Build product comparison tables for 4 financial product categories with sortable columns, category-specific filters, and mobile-responsive stacked cards. Implement a centralized affiliate link registry using YAML/Velite, automatic FTC-compliant disclosure injection, GA4 click tracking, and a detailed "How We Rank Products" methodology page. All product data uses real products researched from current market offerings.

</domain>

<decisions>
## Implementation Decisions

### Product Categories & Data
- **D-01:** Launch with 4 product categories: credit cards, personal loans, savings accounts/CDs, and insurance (auto/renters).
- **D-02:** Use real product data from day one — actual products with real rates, terms, and attributes. No placeholder/fictional products.
- **D-03:** Target 10-15 products per category (~40-60 total products across 4 categories).

### Comparison Table Design
- **D-04:** Sortable data table layout — dense table with sortable column headers, row highlighting, and sticky first column for product names. NerdWallet-style.
- **D-05:** Category-specific filter dropdowns above each table (credit cards: rewards type, credit score range, annual fee; loans: amount, term, credit score; etc.).
- **D-06:** Mobile responsive via stacked cards — each product becomes a card showing all attributes, sortable via dropdown above cards. No horizontal scrolling.
- **D-07:** Editorial "Best For" badges — hand-curated in YAML data, 2-3 per category. Clearly labeled as "Our Pick" editorial selections, not objective rankings.

### Affiliate Link Registry
- **D-08:** YAML per product category (e.g., `content/products/credit-cards.yaml`). Each product entry includes affiliate URL, UTM params, disclosure flag. Velite validates with Zod schema. Consistent with existing calculator/hub YAML content pattern.
- **D-09:** Affiliate disclosure placed above the fold, before the comparison table. Reuses existing `AffiliateDisclosure` component from `src/components/trust/affiliate-disclosure.tsx`. Always visible, never hidden. FTC-compliant positioning.
- **D-10:** GA4 custom events for click tracking — fire `gtag('event', ...)` on each affiliate link click with product ID, category, and table position. Zero additional infrastructure since GA4 integration already exists in code (conditionally renders when `NEXT_PUBLIC_GA_ID` env var is set). Note: GA4 property needs to be created externally and measurement ID configured.

### Ranking Methodology
- **D-11:** Detailed transparency page at `/how-we-rank` (~1500 words). Explains criteria per product category, ranking approach, independence from affiliate relationships, data sources, and update frequency. CFPB-aligned. Builds YMYL trust.
- **D-12:** Consumer benefit first ranking criteria — rank by value to consumer (total cost, rewards value, fees, eligibility breadth). Explicitly state that commission rates do NOT influence rankings.

### Claude's Discretion
- Product data schema attributes per category (exact fields beyond those in requirements)
- Table component architecture (shadcn Table vs custom)
- Filter component implementation details
- GA4 event naming conventions and parameter structure
- How We Rank page content structure and section organization

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Components
- `src/components/trust/affiliate-disclosure.tsx` — Existing FTC disclosure component to reuse on comparison pages
- `src/app/compare/page.tsx` — Current "Coming Soon" placeholder to replace with real comparison index

### Content Patterns
- `velite.config.ts` — Existing Velite collections (calculators, guides, hubs, glossary) — follow same pattern for products collection
- `content/calculators/*.yaml` — YAML content pattern with Zod validation to mirror for product data files
- `content/hubs/*.yaml` — Hub YAML structure showing how to define curated lists of related content

### Trust & Legal
- `src/app/editorial-standards/page.tsx` — Existing editorial standards page; methodology page should cross-reference
- `src/components/layout/disclaimer-banner.tsx` — Existing disclaimer banner pattern

### Requirements
- `.planning/REQUIREMENTS.md` — AFFIL-01 through AFFIL-06 define acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AffiliateDisclosure` component: Ready to use, proper ARIA attributes, links to editorial standards
- Velite + Zod content pipeline: Proven pattern for YAML -> typed collections, used by calculators, hubs, glossary
- shadcn/ui Table, Badge, Button components: Available for comparison table UI
- `nuqs` URL state management: Could enable shareable filtered/sorted table states
- GA4 integration: `@next/third-parties/google` already imported, conditional render in layout

### Established Patterns
- YAML content files processed by Velite with Zod schema validation at build time
- SSG with `generateStaticParams` for content pages
- `createMetadata` helper for consistent SEO metadata
- Two-column responsive layouts (calculators use this pattern)

### Integration Points
- Navigation: `src/lib/navigation.ts` — Compare section already exists, needs real sub-links per category
- Sitemap: `src/app/sitemap.ts` — Add comparison page URLs (already handles dynamic content)
- Footer: `src/lib/navigation.ts` footerNavigation — Add comparison links to Tools column
- Hub pages: Hub YAML configs could reference comparison pages in their curated content

</code_context>

<specifics>
## Specific Ideas

- NerdWallet-style sortable data tables as the primary comparison interface
- "Best For" badges as editorial picks (not algorithmic) — clearly labeled "Our Pick"
- Each category gets its own relevant filter set rather than generic filters
- Stacked cards on mobile instead of horizontal scroll tables

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-comparison-affiliate-infrastructure*
*Context gathered: 2026-03-26*

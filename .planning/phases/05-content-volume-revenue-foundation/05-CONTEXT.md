# Phase 5: Content Volume & Revenue Foundation - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can access 3 new calculators (home affordability, credit card payoff, car affordability/auto loan), 10+ new educational guides, expanded glossary (50+ terms), FAQ sections with rich results on all calculator and guide pages, CLS-safe ad containers on all page templates, expanded affiliate categories, and 4-6 "Best X for Y" editorial listicle pages. The site is revenue-ready for Mediavine activation.

</domain>

<decisions>
## Implementation Decisions

### Ad Container Placement
- **D-01:** Content pages (guides, hubs) get a sticky 300px sidebar ad on desktop plus 2-3 in-content ad breaks between sections. Mobile gets in-content breaks only (no sidebar ads). Sidebar widens from 240px to 300px to accommodate standard ad units.
- **D-02:** Calculator pages get a single ad slot below the results area, above the FAQ section. Never between inputs and results — keeps the tool frictionless. Calculator sidebar stays dedicated to inputs.
- **D-03:** Comparison pages stay monetized through affiliate links only — no display ads. Avoids cluttering commercial intent pages and protects affiliate CTR.
- **D-04:** Pre-Mediavine period: render empty containers with min-height matching standard ad sizes (250px sidebar, 90px leaderboard). CLS is zero from day one because space is already reserved. Mediavine fills them later with no layout changes needed.

### New Calculator Outputs
- **D-05:** Home affordability calculator presents three side-by-side tiered cards: Conservative (28/36 DTI rule), Moderate (30/43), Aggressive (35/50). Each card shows max home price, monthly payment, and a visual meter with green/yellow/red color coding. Bar chart comparing all three tiers below, plus friendly mentor summary.
- **D-06:** Credit card payoff calculator shows before/after comparison: "Minimum payments only" vs "With extra payments." Each column shows payoff date, total interest, and total paid. Big delta badges highlight months saved and interest saved. Overlaid area chart shows both balance-over-time timelines.
- **D-07:** Car affordability and auto loan are a single calculator page with two connected sections. "How much car can I afford?" (income-based, 10-15% net income rule) feeds into "What's my auto loan payment?" (price, down payment, rate, term). Vehicle price auto-fills from the affordability result but remains editable.

### Guide Topic Strategy
- **D-08:** Mix of calculator-paired guides (5) and standalone search-driven guides (5-7). Calculator-paired guides cover home affordability, credit card payoff, car buying, auto loans, and debt management. Standalone guides target high-volume "How to..." and "Should I..." search queries.
- **D-09:** Claude researches optimal standalone guide topics during the research phase based on search volume, competition, and relevance to existing content. User reviews the final topic list before writing begins.
- **D-10:** All new guides AND all existing 10 guides get FAQ sections (4-6 questions each) with FAQPage JSON-LD schema. Doubles rich result opportunities across the entire site.

### "Best X for Y" Listicles
- **D-11:** Editorial article format — intro paragraph explaining audience needs, then 3-5 curated product picks with editorial "why it's best for you" write-ups, pros/cons lists, and affiliate links. Distinct from existing comparison data tables. NerdWallet "Best X" article style.
- **D-12:** Launch 4-6 listicle pages — one per existing product category (credit cards, personal loans, savings, insurance) plus 1-2 targeting new calculator audiences (e.g., "Best mortgage lenders for first-time buyers", "Best auto loan rates").
- **D-13:** URL structure: `/compare/best/[slug]` — under the existing /compare section. Keeps all product content together.

### Claude's Discretion
- FAQ implementation details on calculator pages (accordion placement, content sourcing, schema markup)
- OG image generation design and approach (next/og ImageResponse)
- Glossary term selection for expansion from 25 to 50+ terms
- lastModified dates implementation across all content files
- Internal link audit approach and execution
- AdSlot and AdBreak component architecture, exact ad sizes, and density rules
- Specific listicle audience targets and product selections
- New affiliate category product data (auto insurance, life insurance, investment platforms, tax software)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level
- `.planning/PROJECT.md` -- Project vision, constraints, "friendly mentor" brand voice, key decisions
- `.planning/REQUIREMENTS.md` -- CALC-03 through CALC-06, CALC-09, CALC-10, CONT-01 through CONT-04, REV-01 through REV-06, SEO-01 through SEO-03
- `.planning/ROADMAP.md` -- Phase 5 goal, success criteria, and requirement mapping

### Prior phase context
- `.planning/phases/01-foundation-trust/01-CONTEXT.md` -- Visual identity (blue palette, Inter font, shadcn/ui, OKLCH), analytics (GA4, Vercel Analytics)
- `.planning/phases/02-calculator-engine-core-tools/02-CONTEXT.md` -- Calculator layout (two-column, sticky inputs, slider+field, compare mode, Recharts), friendly mentor summaries, action callout cards
- `.planning/phases/03-content-system-life-stage-hubs/03-CONTEXT.md` -- Guide structure (2000-3000 words, sticky TOC, callout types), glossary (YAML, Term component), MDX+Velite pipeline, hub layout
- `.planning/phases/04-comparison-affiliate-infrastructure/04-CONTEXT.md` -- Product comparison (sortable tables, filters, YAML registry), affiliate infrastructure (/go/ redirects, GA4 tracking, FTC disclosure)

### Existing code patterns
- `src/lib/calculators/registry.ts` -- Calculator registry pattern for adding new calculators
- `src/lib/calculators/math/` -- Existing math modules to follow for new calculator implementations
- `content/calculators/*.yaml` -- YAML config pattern for calculator definitions
- `content/guides/*.mdx` -- MDX guide authoring pattern
- `content/products/*.yaml` -- Product YAML pattern for affiliate data
- `velite.config.ts` -- Velite collections and Zod schemas to extend
- `src/components/trust/affiliate-disclosure.tsx` -- Existing disclosure component to reuse on listicle pages
- `src/components/content/table-of-contents.tsx` -- Sticky TOC pattern for guide pages

### Tech stack
- `CLAUDE.md` $Technology Stack -- Recharts 3.8, nuqs, Zod 4.3, next/og for OG images, schema-dts for JSON-LD

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Calculator engine**: Full parameterized system (registry, math modules, YAML configs, URL params, Recharts charts, comparison view). New calculators follow the exact same pattern.
- **Guide pipeline**: MDX + Velite + Zod schema with frontmatter validation. 10 existing guides demonstrate the pattern.
- **Product YAML collections**: 4 product categories already in `content/products/`. Expanding affiliate categories follows the same schema pattern.
- **shadcn/ui components**: Card, Accordion, Badge, Button, Table, Tooltip, Tabs -- all available for new UI needs.
- **AffiliateDisclosure component**: Ready to reuse on listicle pages.
- **JsonLd renderer**: Generic `JsonLd<T>` component with XSS-safe serialization for FAQPage schema.
- **createMetadata helper**: SEO metadata generation for new pages.

### Established Patterns
- Calculator pages: two-column layout, `calculator-shell.tsx` wrapper, `calculator-page-client.tsx` client boundary
- Content pages: MDX rendering via `mdx-content.tsx`, glossary `Term` component, callout components (KeyTakeaway, ProTip, Definition)
- Product data: YAML -> Velite -> typed collections with Zod validation
- URL state: nuqs for all calculator parameters and comparison filters
- Route structure: `/calculators/[slug]`, `/guides/[slug]`, `/compare/[category]`

### Integration Points
- Calculator registry (`registry.ts`) needs 3 new entries
- Velite config needs new calculator YAML files validated
- Navigation (`src/lib/navigation.ts`) needs `/compare/best` sub-section
- Sitemap (`src/app/sitemap.ts`) needs listicle and new calculator URLs
- Existing guide pages need FAQ sections retrofitted
- All page layouts need AdSlot/AdBreak components integrated

</code_context>

<specifics>
## Specific Ideas

- Home affordability tiered cards use green/yellow/red color coding matching the "safe zone / balanced / stretched" mental model
- Credit card payoff before/after layout with prominent delta badges makes the "extra payment impact" immediately visceral
- Car calculator auto-fills vehicle price from affordability result — seamless flow between the two connected calculations
- Listicle pages follow NerdWallet "Best X" article style — editorial write-ups, not just data tables
- Pre-Mediavine ad containers are invisible but CLS-safe — space reserved from day one

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 05-content-volume-revenue-foundation*
*Context gathered: 2026-03-29*

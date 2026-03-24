# Phase 2: Calculator Engine & Core Tools - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the parameterized calculator engine and all 10 financial calculators with real-time slider inputs, visual charts (Recharts), URL-shareable state (nuqs), side-by-side what-if comparison, plain-English result interpretation, and precision math free of floating-point errors. Calculator definitions are driven by YAML/JSON config files validated by Zod schemas.

</domain>

<decisions>
## Implementation Decisions

### Calculator page layout
- **D-01:** Two-column layout on desktop: inputs panel on left, results + charts on right. Collapses to stacked on mobile.
- **D-02:** Full content width (~1080px max) for calculator pages — wider than the 720px trust pages to accommodate two columns.
- **D-03:** Sticky input panel on desktop — stays visible while user scrolls through charts, breakdowns, and interpretation text.
- **D-04:** Mobile layout: stacked — inputs section first, results and charts below. Natural vertical scroll flow, no tabs.

### Input interaction design
- **D-05:** Each input uses a slider + editable number field combo. Dragging the slider updates the number field; typing a number moves the slider. Both stay in sync.
- **D-06:** Gentle inline validation hints — soft color change on the field + hint text below (e.g., "Typical range: $100K–$1M"). Never block the user from entering unusual values; show a note if the value seems extreme.
- **D-07:** Grouped inputs with collapsible sections for complex calculators — primary inputs always visible (e.g., loan amount, rate, term), advanced inputs (taxes, insurance, PMI) in a collapsible "Advanced" section.
- **D-08:** National average default values with contextual labels — pre-fill all inputs with US national averages, show a subtle "US average" label. User sees realistic results immediately on first load.

### What-if comparison UX
- **D-09:** Toggle "Compare" button adds a Scenario B input column. Default view shows a single scenario. Comparison is opt-in, not always visible.
- **D-10:** Comparison results displayed as a side-by-side table with color-coded delta badges showing +/− amounts (green for savings, red for higher costs). Plus an "Export to CSV" button for downloading comparison data.
- **D-11:** Mobile comparison mode: stacked scenarios with a toggle switch between Scenario A and B inputs. Delta summary card at top of results.
- **D-12:** Comparison mode available on all 10 calculators — the engine handles it generically since all calculators share the same config-driven input/output structure.

### Results & chart presentation
- **D-13:** Charts are the primary visual at the top of the results area (amortization curves, growth projections, pie breakdowns). Key numbers summarized in cards below the chart.
- **D-14:** Conversational "friendly mentor" summary (1-2 sentences) below key numbers, e.g., "With a $400K home at 6.5%, you'd pay $2,528/mo — that's about 32% of the median US household income." Followed by 2-3 action callout cards linking to relevant guides (e.g., "Lower your rate", "Increase down payment", "Compare lenders").
- **D-15:** Expandable detail table — collapsed by default with a "Show full amortization schedule" or "View monthly breakdown" expander. Opens a sortable table with month-by-month or year-by-year data.
- **D-16:** Clean minimal Recharts style — smooth curves, no gridlines, brand blue + teal accent colors from Phase 1 palette, subtle hover tooltips, light gradient fill under area charts.

### Claude's Discretion
- Precision math implementation (integer cents vs decimal.js — resolve the STATE.md blocker)
- Exact Recharts configuration, responsive chart sizing, and chart type selection per calculator
- Calculator YAML/JSON config schema structure (CALC-01 parameterized engine)
- URL query parameter naming conventions for nuqs (CALC-06)
- Specific default values per calculator (research national averages)
- Input range limits and step sizes per calculator
- WebApplication schema markup structure per calculator
- Animation/transition behavior when results update in real-time
- Export format details (CSV structure, column names)
- Slider component implementation (shadcn/ui Slider or custom)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level
- `.planning/PROJECT.md` — Project vision, constraints, "friendly mentor" brand voice, key decisions
- `.planning/REQUIREMENTS.md` — Full requirement definitions: CALC-01 through CALC-08 (engine), TOOL-01 through TOOL-10 (specific calculators)
- `.planning/ROADMAP.md` — Phase 2 goal and success criteria

### Prior phase context
- `.planning/phases/01-foundation-trust/01-CONTEXT.md` — Phase 1 visual identity decisions: blue palette, shadcn/ui defaults, Inter font, clean/professional mood

### Tech stack
- `CLAUDE.md` §Technology Stack — Recharts 3.8, nuqs, Zod 4.3, react-hook-form 7.72, Velite 0.3 specs and version compatibility

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — Card component with size variants; can wrap input panel, result summary cards, and action callouts
- `src/components/ui/accordion.tsx` — Collapsible sections for advanced calculator inputs
- `src/components/ui/tooltip.tsx` — Hover tooltips for input field hints and chart data points
- `src/components/ui/badge.tsx` — Delta badges for comparison mode (+/− amounts)
- `src/components/ui/button.tsx` — Compare toggle, export button (uses render prop for Link composition)
- `src/components/seo/json-ld.tsx` — Generic JsonLd<T> renderer with XSS-safe serialization
- `src/components/seo/web-app-schema.tsx` — WebApplication schema (extend for calculator-specific markup)
- `src/lib/metadata.ts` — createMetadata() helper for page-level SEO
- `src/lib/site-config.ts` — Site config with name, tagline, GA ID

### Established Patterns
- Route-level layouts: `src/app/calculators/layout.tsx` wraps all calculator pages with DisclaimerBanner
- shadcn/ui with Tailwind v4 OKLCH color system and CSS variable theming
- Server Component + Client Component split (header pattern) to minimize client JS bundle
- Trust/content pages use max-w-[720px] — calculators will use wider max-w-[1080px]
- Render prop pattern for Button+Link composition (Base UI v4)

### Integration Points
- `/calculators` route exists as placeholder page — will be replaced with calculator index listing all 10 tools
- `/calculators/[slug]` dynamic route needed for individual calculator pages
- DisclaimerBanner already active on all calculator routes via layout.tsx
- Navigation header already links to /calculators
- Breadcrumb component exists for calculator page hierarchy

</code_context>

<specifics>
## Specific Ideas

- NerdWallet-style two-column calculator layout is the visual reference — inputs left, results right, sticky sidebar
- "Smart friend" tone for result interpretations: relate numbers to real-world context (e.g., percentage of median income, comparison to typical values)
- Export/download feature for comparison data — user specifically requested this alongside the comparison table
- Action callout cards should link to relevant guides (Phase 3 content), use placeholder links until guides exist

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-calculator-engine-core-tools*
*Context gathered: 2026-03-24*

# Phase 5: Content Volume & Revenue Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-03-29
**Phase:** 05-content-volume-revenue-foundation
**Areas discussed:** Ad container placement, New calculator outputs, Guide topic strategy, "Best X for Y" listicles

---

## Ad Container Placement

### Content page ad positioning

| Option | Description | Selected |
|--------|-------------|----------|
| Sidebar + in-content | Sticky 300px sidebar ad on desktop + 2-3 in-content ad breaks. Mobile: in-content only. NerdWallet/Bankrate pattern. | ✓ |
| In-content only | Ad breaks between sections only. No sidebar. Cleaner but lower revenue. | |
| Minimal footer-only | Single ad at bottom. Least intrusive, lowest RPM. | |

**User's choice:** Sidebar + in-content
**Notes:** None

### Calculator page ad positioning

| Option | Description | Selected |
|--------|-------------|----------|
| Below results only | Ad container below results, above FAQ. Never between inputs and results. | ✓ |
| Sidebar + below results | Widen layout for 300px ad sidebar alongside calculator. Higher revenue, tighter space. | |
| No ads on calculators | Keep calculator pages ad-free. Monetize via affiliate callouts. | |

**User's choice:** Below results only
**Notes:** None

### Comparison page ads

| Option | Description | Selected |
|--------|-------------|----------|
| Affiliate-only | No display ads on comparison pages. Affiliate clicks are the monetization. | ✓ |
| Light ads (sidebar only) | 300px sidebar ad alongside comparison content. | |

**User's choice:** Affiliate-only
**Notes:** None

### Pre-Mediavine strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Reserved empty space | Empty containers with min-height matching standard ad sizes. CLS-safe from day one. | ✓ |
| House ads / cross-promo | Fill with internal promotions until Mediavine activates. | |
| Hidden until activation | No containers until Mediavine loads. Risk: CLS issues when ads appear. | |

**User's choice:** Reserved empty space
**Notes:** None

---

## New Calculator Outputs

### Home affordability DTI tiers

| Option | Description | Selected |
|--------|-------------|----------|
| Tiered cards | Three side-by-side cards (Conservative/Moderate/Aggressive) with max price, payment, visual meter, color coding. | ✓ |
| Slider with zones | Horizontal zone slider showing where target price falls across tiers. | |
| Single result + toggle | Default moderate tier, dropdown to switch. Simpler but no range visibility. | |

**User's choice:** Tiered cards
**Notes:** None

### Credit card payoff extra payments

| Option | Description | Selected |
|--------|-------------|----------|
| Before/after comparison | Two-column: min payments vs extra payments. Delta badges. Overlaid area chart. | ✓ |
| Interactive slider | Single result updating in real-time as extra payment slider moves. | |
| Timeline chart focus | Large timeline chart as primary result with stats as badges. | |

**User's choice:** Before/after comparison
**Notes:** None

### Car affordability + auto loan relationship

| Option | Description | Selected |
|--------|-------------|----------|
| Single page, two sections | Two connected sections: affordability feeds into loan details. Price auto-fills. | ✓ |
| Two separate calculators | Separate pages. User transfers price manually. | |
| Tabbed single page | Tabs switching between affordability and loan views. | |

**User's choice:** Single page, two sections
**Notes:** None

---

## Guide Topic Strategy

### Topic mix

| Option | Description | Selected |
|--------|-------------|----------|
| Calculator-paired + standalone | 5 paired + 5-7 standalone "How to" / "Should I" guides. | ✓ |
| All calculator-paired | All guides directly support calculators. | |
| All standalone search-driven | All guides target popular search queries. | |

**User's choice:** Calculator-paired + standalone
**Notes:** None

### Guide FAQ sections

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, all new guides | Every new guide + existing 10 guides get FAQs with FAQPage schema. | ✓ |
| New guides only | Only new guides get FAQs. | |
| No FAQs on guides | FAQs only on calculator pages. | |

**User's choice:** Yes, all new guides
**Notes:** None

### Topic selection approach

| Option | Description | Selected |
|--------|-------------|----------|
| Claude researches | Claude identifies optimal topics during research phase. User reviews before writing. | ✓ |
| Use example topics | Go with the 7 examples provided. | |
| User provides topics | User has specific topics in mind. | |

**User's choice:** Claude researches
**Notes:** None

---

## "Best X for Y" Listicles

### Page format

| Option | Description | Selected |
|--------|-------------|----------|
| Editorial article + product picks | Intro + 3-5 curated picks with write-ups, pros/cons, affiliate links. NerdWallet style. | ✓ |
| Filtered comparison view | Same comparison table UI pre-filtered for audience. | |
| Hybrid: mini-table + editorial | Short table at top, editorial below each product. | |

**User's choice:** Editorial article + product picks
**Notes:** None

### Launch volume

| Option | Description | Selected |
|--------|-------------|----------|
| 4-6 pages | One per product category + 1-2 for new calculator audiences. | ✓ |
| 2-3 pages | Highest-value categories only. Test format first. | |
| 8-10 pages | Multiple per category targeting different audiences. | |

**User's choice:** 4-6 pages
**Notes:** None

### URL structure

| Option | Description | Selected |
|--------|-------------|----------|
| /compare/best/[slug] | Under existing /compare section. All product content together. | ✓ |
| /guides/best-[slug] | Under guides. Mixes editorial with commercial. | |
| /best/[slug] | Top-level route. Clean URLs but new section. | |

**User's choice:** /compare/best/[slug]
**Notes:** None

---

## Claude's Discretion

- FAQ implementation details on calculator pages
- OG image generation design
- Glossary term selection (25 to 50+)
- lastModified dates implementation
- Internal link audit approach
- AdSlot/AdBreak component architecture
- Listicle audience targets and product selections
- New affiliate category product data

## Deferred Ideas

None -- discussion stayed within phase scope

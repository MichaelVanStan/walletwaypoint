# Phase 4: Comparison & Affiliate Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 04-comparison-affiliate-infrastructure
**Areas discussed:** Product categories & data, Comparison table design, Affiliate link registry, Ranking methodology

---

## Product Categories & Data

| Option | Description | Selected |
|--------|-------------|----------|
| Credit cards | APR, annual fee, rewards rate, sign-up bonus, credit score range | Yes |
| Personal loans | Interest rates, terms, loan amounts, eligibility, origination fees | Yes |
| Savings accounts / CDs | APY, minimum deposit, terms, FDIC insurance, early withdrawal penalties | Yes |
| Insurance (auto/renters) | Premium ranges, coverage types, deductibles, discounts | Yes |

**User's choice:** All four categories
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Realistic placeholders | Fictional products with realistic attributes | |
| Real products from day one | Research actual products with real rates and terms | Yes |
| Mix — real for credit cards, placeholder for rest | Real CC data, placeholders elsewhere | |

**User's choice:** Real products from day one

| Option | Description | Selected |
|--------|-------------|----------|
| 5-8 per category | ~25-30 total products | |
| 10-15 per category | ~50+ products to source | Yes |
| 3-5 per category | Minimal viable set | |

**User's choice:** 10-15 per category

---

## Comparison Table Design

| Option | Description | Selected |
|--------|-------------|----------|
| Sortable data table | Dense table with sortable headers, sticky first column, NerdWallet-style | Yes |
| Card grid with compare mode | Product cards in grid, select 2-3 to compare side-by-side | |
| Hybrid — cards + expandable table | Top "Best For" cards + full sortable table below | |

**User's choice:** Sortable data table

| Option | Description | Selected |
|--------|-------------|----------|
| Category-specific filters | Each category gets relevant filter dropdowns | Yes |
| Sort-only, no filters | Just sortable columns | |
| Universal search + filters | Search bar + filter dropdowns | |

**User's choice:** Category-specific filters

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked cards | Each product becomes a card on mobile, sort via dropdown | Yes |
| Horizontally scrollable table | Same table, swipe to see columns | |
| You decide | Claude picks best responsive approach | |

**User's choice:** Stacked cards on mobile

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, editorial picks | Hand-curated "Best For" badges, 2-3 per category | Yes |
| No badges | Let data speak, users sort and decide | |
| Auto-generated from data | Algorithmically assigned badges | |

**User's choice:** Editorial "Best For" badges

---

## Affiliate Link Registry

| Option | Description | Selected |
|--------|-------------|----------|
| YAML per category | One YAML file per product category, Velite validates with Zod | Yes |
| Single JSON registry | One affiliates.json mapping product IDs to affiliate URLs | |
| Inline in product YAML | Affiliate URL as another field on product entry | |

**User's choice:** YAML per category

| Option | Description | Selected |
|--------|-------------|----------|
| Above the fold, before table | FTC-compliant, reuses existing AffiliateDisclosure component | Yes |
| Sticky banner at top of page | Persistent thin banner while scrolling | |
| Both — inline + per-link icon | Disclosure block above table + icon on each affiliate link | |

**User's choice:** Above the fold, before table

| Option | Description | Selected |
|--------|-------------|----------|
| GA4 custom events | Fire gtag event on affiliate click with product ID, category, position | Yes |
| Server-side redirect tracking | Links go through /api/go/[product-id] redirect | |
| You decide | Claude picks simplest approach | |

**User's choice:** GA4 custom events
**Notes:** User asked whether GA4 property has been created yet. Confirmed: code infrastructure exists (site-config reads NEXT_PUBLIC_GA_ID, layout conditionally renders GoogleAnalytics), but the actual GA4 property needs to be created in Google Analytics and the measurement ID configured as an environment variable.

---

## Ranking Methodology

| Option | Description | Selected |
|--------|-------------|----------|
| Detailed transparency page | Full /how-we-rank page, ~1500 words, CFPB-aligned | Yes |
| Short methodology section | Brief section on each comparison page | |
| Both — standalone + per-category summaries | Full page plus inline summaries | |

**User's choice:** Detailed transparency page

| Option | Description | Selected |
|--------|-------------|----------|
| Consumer benefit first | Rank by value to consumer, explicitly state commissions don't influence | Yes |
| Multi-factor scoring | Published scoring formula with transparent weights | |
| You decide | Claude designs methodology based on CFPB guidelines | |

**User's choice:** Consumer benefit first

---

## Claude's Discretion

- Product data schema attributes per category (exact fields)
- Table component architecture
- Filter component implementation
- GA4 event naming conventions
- How We Rank page content structure

## Deferred Ideas

None

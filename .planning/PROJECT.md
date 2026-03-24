# WalletWaypoint

## What This Is

WalletWaypoint is a financial literacy website that helps people navigate money decisions at every life stage. Through interactive calculators, comparison pages, and educational guides organized into life-stage "hubs," it meets users where they are — whether they're a student managing their first loan, a renter weighing affordability, a first-time homebuyer, a freelancer estimating taxes, or someone planning retirement. The tone is a friendly mentor: a smart friend who explains money clearly, not a bank.

## Core Value

Users can find a trustworthy, interactive tool or guide that helps them make a confident financial decision at any life-stage milestone.

## Requirements

### Validated

- [x] SEO-optimized pages targeting long-tail financial keywords — Validated in Phase 01: Foundation & Trust (sitemap, robots, meta tags, canonical URLs, JSON-LD schemas)
- [x] Schema markup and rich results for calculators and guides — Validated in Phase 01: Foundation & Trust (Organization, Article, FAQ, BreadcrumbList, WebApplication schemas)
- [x] Responsive, fast, modern design that feels trustworthy — Validated in Phase 01: Foundation & Trust (Tailwind OKLCH blue palette, Inter font, shadcn/ui, static generation)

### Active

- [ ] Interactive financial calculators (loan repayment, mortgage, compound interest, rent affordability, tax estimator, retirement withdrawal, etc.)
- [ ] Life-stage content hubs (Student/New Grad, First-Time Renter, First Home Buyer, Rent vs Buy / Buy-to-Rent, Freelancer/Self-Employed, Pre-Retirement)
- [ ] Comparison pages for financial products (credit cards, loans, insurance)
- [ ] Educational guides with clear, jargon-free explanations
- [ ] SEO-optimized pages targeting long-tail financial keywords
- [ ] Schema markup and rich results for calculators and guides
- [ ] Responsive, fast, modern design that feels trustworthy
- [ ] Display ad integration (Mediavine/Raptiv-ready at 50k sessions/month)
- [ ] Affiliate link infrastructure for credit card/loan/insurance recommendations
- [ ] Programmatic content generation at scale (calculator engine parameterized for hundreds of scenarios)

### Out of Scope

- Real-time financial data feeds or stock tickers — high complexity, not core to financial literacy
- User accounts / login system — content is freely accessible, no auth needed for v1
- Mobile app — web-first, responsive design covers mobile
- Direct lending or financial product origination — we recommend, not originate
- Community features (forums, comments) — editorial-first, community deferred
- Personalized financial planning / robo-advisor — we educate, not advise

## Context

- Builder has experience shipping a news site (NewsBalance) with Next.js, Python pipelines, AI summarization, and SEO/schema markup
- The finance niche has extremely high RPMs ($20-50 for display ads) and lucrative affiliate programs ($50-200+ per credit card approval)
- Head terms ("best credit cards") are dominated by NerdWallet/Bankrate with DA 80-90+; strategy is long-tail niche keywords for specific life situations
- Calculators are the moat: interactive tools get backlinks, repeat visitors, rich results, and are hard for AI sites to replicate
- Revenue model is balanced: display ads for traffic monetization + affiliate for high-intent product recommendations + eventual lead gen
- Name confirmed: WalletWaypoint — tagline direction: "Your next financial milestone starts here"
- Expected ramp: months 1-6 building content/tools, 6-12 qualifying for ad networks, year 1-2 affiliate compounding

## Constraints

- **Tech stack**: Next.js (consistent with builder's existing expertise from NewsBalance)
- **SEO**: Must be SSR/SSG for crawlability; no client-only rendering for content pages
- **Performance**: Core Web Vitals must pass for all pages (LCP < 2.5s, CLS < 0.1)
- **Content**: Must be genuinely useful — not thin affiliate bait; E-E-A-T compliance for YMYL content
- **Legal**: Financial disclaimers required; "not financial advice" disclosures; affiliate disclosure compliance (FTC)
- **Monetization**: Site must be Mediavine/Raptiv-ready (clean ad slots, no layout shift from ads)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Name: WalletWaypoint | Survived 6 rounds of 200+ alternatives; W-W alliteration, journey metaphor, 4 syllables, trustworthy + warm | — Pending |
| Life-stage hub architecture | Content organized by life milestones rather than product categories; differentiates from NerdWallet's product-first approach | — Pending |
| Long-tail SEO strategy | Can't compete on head terms with DA 80+ incumbents; specific life situations are underserved and high-converting | — Pending |
| Balanced revenue model | Display ads + affiliate + lead gen; not dependent on any single stream | — Pending |
| Calculators as traffic moat | Interactive tools are hardest to replicate, earn backlinks, drive repeat visits, and get rich results | — Pending |
| Friendly mentor tone | "Smart friend explaining money" — not corporate, not preachy, not scammy | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-24 after Phase 01 completion*

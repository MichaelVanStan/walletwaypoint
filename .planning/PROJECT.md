# WalletWaypoint

## What This Is

WalletWaypoint is a financial literacy website that helps people navigate money decisions at every life stage. Through interactive calculators, comparison pages, and educational guides organized into life-stage "hubs," it meets users where they are — whether they're a student managing their first loan, a renter weighing affordability, a first-time homebuyer, a freelancer estimating taxes, or someone planning retirement. The tone is a friendly mentor: a smart friend who explains money clearly, not a bank.

## Core Value

Users can find a trustworthy, interactive tool or guide that helps them make a confident financial decision at any life-stage milestone.

## Requirements

### Validated

- SEO infrastructure (sitemap, robots, meta tags, canonical URLs, JSON-LD) — v1.0
- Schema markup (Organization, Article, FAQ, BreadcrumbList, WebApplication, FinancialProduct) — v1.0
- Responsive design with Tailwind OKLCH, Inter font, shadcn/ui, SSG — v1.0
- 10 interactive financial calculators with real-time UI, charts, URL state, precision math — v1.0
- 6 life-stage hubs aggregating calculators, guides, and product recommendations — v1.0
- 10 educational guides with jargon-free "smart friend" tone, callout boxes, glossary terms — v1.0
- Product comparison pages with sortable strips, filter chips, side-by-side compare panel — v1.0
- Affiliate link infrastructure with /go/ redirects, GA4 click tracking, FTC-compliant disclosure — v1.0
- Trust pages (About, Editorial Standards, Privacy, Terms, How We Rank, Author Bios) — v1.0
- Inline glossary with hover definitions for financial terms — v1.0

### Active

- [ ] Display ad integration (Mediavine/Raptiv-ready at 50k sessions/month)
- [ ] Programmatic content generation at scale (city/state-specific calculator pages)
- [ ] Dark mode toggle
- [ ] PWA support (offline-capable calculators)
- [ ] Email lead generation (save/email calculator results as PDF)

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
| Name: WalletWaypoint | W-W alliteration, journey metaphor, trustworthy + warm | Good |
| Life-stage hub architecture | Content organized by life milestones, differentiates from NerdWallet | Good — 6 hubs shipped |
| Long-tail SEO strategy | Specific life situations underserved and high-converting | Good — all pages SSG with rich schema |
| Balanced revenue model | Display ads + affiliate + lead gen | Good — affiliate infra shipped, ads ready |
| Calculators as traffic moat | Interactive tools hardest to replicate, earn backlinks | Good — 10 calculators with 1,332 unit tests |
| Friendly mentor tone | Smart friend explaining money | Good — all guides follow tone guidelines |
| nuqs over react-hook-form | Real-time URL state, no submit button, shareable results | Good — all calculators + comparison filters use nuqs |
| Velite over Contentlayer | Actively maintained, Zod-native, 1000+ doc perf | Good — handles calculators, guides, hubs, products |
| Hybrid comparison UI | Strips + compare panel + filter chips over data table | Good — validated by user testing |
| /go/ redirect pattern | Server-side redirects for centralized affiliate link management | Good — UTM params server-side only |

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

## Current State

**v1.0 MVP shipped 2026-03-27.** Full financial literacy platform with 10 calculators, 10 guides, 6 life-stage hubs, 4-category product comparison with affiliate infrastructure, and complete SEO/trust foundation. 12,135 LOC TypeScript, 140 source files, 31 content files, 1,332 unit tests, 10 E2E tests.

---
*Last updated: 2026-03-27 after v1.0 milestone*

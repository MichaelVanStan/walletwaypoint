# Roadmap: WalletWaypoint

## Overview

WalletWaypoint delivers a financial literacy website built in four phases: first, the SEO and trust foundation that every YMYL site needs to rank; second, the parameterized calculator engine and all 10 core calculators that form the product's moat; third, the educational content system and life-stage hubs that differentiate from NerdWallet/Bankrate; and fourth, the comparison pages and affiliate infrastructure that generate revenue. Each phase delivers a complete, verifiable capability that unlocks the next.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Trust** - Next.js project scaffold with SEO infrastructure, responsive design system, legal compliance pages, and E-E-A-T signals
- [ ] **Phase 2: Calculator Engine & Core Tools** - Parameterized calculator engine with real-time UI, charts, URL state, and all 10 financial calculators
- [ ] **Phase 3: Content System & Life-Stage Hubs** - MDX content pipeline with educational guides, life-stage hub pages, internal linking, and inline glossary
- [ ] **Phase 4: Comparison & Affiliate Infrastructure** - Product comparison tables, affiliate link registry, click tracking, and compliance-first ranking methodology

## Phase Details

### Phase 1: Foundation & Trust
**Goal**: The site exists as a fast, responsive, crawlable Next.js application with complete SEO infrastructure and all trust/legal pages required for YMYL credibility
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, TRUST-01, TRUST-02, TRUST-03, TRUST-04, TRUST-05, TRUST-06
**Success Criteria** (what must be TRUE):
  1. All pages render as static HTML (SSG/ISR) and are crawlable by search engines with correct meta tags, canonical URLs, and Open Graph data
  2. Site passes Core Web Vitals on all pages (LCP < 2.5s, CLS < 0.1, INP < 200ms) with responsive layout across mobile, tablet, and desktop
  3. Breadcrumb navigation with BreadcrumbList schema, automated XML sitemap, and robots.txt are all functioning
  4. Trust pages exist and are linked from site navigation: About, Editorial Standards, Privacy Policy, and "Not financial advice" disclaimers appear on relevant pages
  5. Author bio pages with credentials exist, affiliate disclosure component renders near affiliate link locations, and FAQPage/HowTo/Article/WebApplication schema markup is in place on relevant page types
**Plans**: 5 plans
Plans:
- [x] 01-01-PLAN.md -- Project scaffold, design system, root layout with analytics
- [x] 01-02-PLAN.md -- Layout components (header, footer, mobile nav, breadcrumbs) and SEO infrastructure (JSON-LD, sitemap, robots)
- [x] 01-03-PLAN.md -- Homepage with hero/CTAs/trust signals, placeholder pages, error pages, disclaimer banner
- [x] 01-04-PLAN.md -- Trust pages (About, Editorial Standards, Privacy Policy, Author Bio) and trust components
- [ ] 01-05-PLAN.md -- Final verification and human checkpoint
**UI hint**: yes

### Phase 2: Calculator Engine & Core Tools
**Goal**: Users can interact with 10 financial calculators that update results in real-time, display visual charts, share results via URL, and produce accurate calculations free of floating-point errors
**Depends on**: Phase 1
**Requirements**: CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, CALC-06, CALC-07, CALC-08, TOOL-01, TOOL-02, TOOL-03, TOOL-04, TOOL-05, TOOL-06, TOOL-07, TOOL-08, TOOL-09, TOOL-10
**Success Criteria** (what must be TRUE):
  1. A user can open any of the 10 calculators, adjust slider inputs, and see results update immediately without clicking a submit button
  2. Each calculator displays results with appropriate charts (amortization curves, growth projections, pie breakdowns) and plain-English interpretation with actionable next steps
  3. Calculator state is stored in URL query parameters so results can be bookmarked and shared, and every calculator loads with sensible national-average defaults
  4. Side-by-side "what-if" scenario comparison works, allowing users to compare two sets of inputs with contrasted outcomes
  5. All financial math is accurate (validated against reference sources) with no floating-point rounding errors visible to users
**Plans**: 7 plans
Plans:
- [x] 02-01-PLAN.md -- Foundation: dependencies, Velite config, types, precision math, NuqsAdapter, shadcn/ui components
- [x] 02-02-PLAN.md -- Calculator engine UI: InputSliderCombo, CalculatorInputs, ResultCard, CalculatorShell with two-column layout
- [x] 02-03-PLAN.md -- Charts (Recharts wrapper) and comparison view with delta badges and CSV export
- [x] 02-04-PLAN.md -- Math modules batch 1: mortgage, rent affordability, compound interest, loan repayment, savings goal + YAML configs
- [x] 02-05-PLAN.md -- Math modules batch 2: retirement, budget, tax estimator, rent vs buy, student loan + YAML configs
- [x] 02-06-PLAN.md -- Integration: calculator registry, index page, dynamic [slug] route with Velite
- [ ] 02-07-PLAN.md -- Final verification and human checkpoint
**UI hint**: yes

### Phase 3: Content System & Life-Stage Hubs
**Goal**: Users can read jargon-free educational guides paired with each calculator, navigate life-stage hub pages that aggregate relevant tools and content, and discover related resources through internal linking and an inline glossary
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, HUB-01, HUB-02, HUB-03, HUB-04, HUB-05, HUB-06
**Success Criteria** (what must be TRUE):
  1. Each of the 10 calculators has a paired educational guide page written in a clear, jargon-free "smart friend" tone with callout boxes, key takeaways, and definition highlights
  2. All 6 life-stage hub pages (Student/New Grad, First-Time Renter, First Home Buyer, Rent vs Buy, Freelancer, Pre-Retirement) exist and aggregate relevant calculators, guides, and product recommendations for that life stage
  3. Internal linking connects related calculators to related guides and suggests logical next steps, creating a navigable content network
  4. Hovering over common financial terms (APR, DTI, amortization, etc.) shows a tooltip definition from the inline glossary
**Plans**: TBD
**UI hint**: yes

### Phase 4: Comparison & Affiliate Infrastructure
**Goal**: Users can compare financial products (credit cards, loans, insurance) in sortable tables with transparent ranking methodology, while all affiliate links are centrally managed with automatic disclosure and click tracking
**Depends on**: Phase 3
**Requirements**: AFFIL-01, AFFIL-02, AFFIL-03, AFFIL-04, AFFIL-05, AFFIL-06
**Success Criteria** (what must be TRUE):
  1. Users can view comparison tables with sortable columns for credit cards (APR, annual fee, rewards, credit score range) and loans (rates, terms, eligibility)
  2. All affiliate links are served from a centralized registry with automatic FTC-compliant disclosure injected above the fold before the first affiliate link on any page
  3. A published "How We Rank Products" methodology page explains CFPB-compliant ranking criteria based on consumer benefit, not commission
  4. Affiliate link clicks are tracked for revenue attribution
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Trust | 4/5 | In progress | - |
| 2. Calculator Engine & Core Tools | 0/7 | Planned | - |
| 3. Content System & Life-Stage Hubs | 0/0 | Not started | - |
| 4. Comparison & Affiliate Infrastructure | 0/0 | Not started | - |

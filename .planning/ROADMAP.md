# Roadmap: WalletWaypoint

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-03-27) | [Archive](milestones/v1.0-ROADMAP.md)
- 🚧 **v2.0 Growth Engine** — Phases 5-7 (in progress)

## v1.0 MVP (Phases 1-4) — SHIPPED 2026-03-27

- [x] Phase 1: Foundation & Trust (5/5 plans) — SEO infrastructure, responsive design, trust pages, E-E-A-T
- [x] Phase 2: Calculator Engine & Core Tools (7/7 plans) — 10 financial calculators with real-time UI, charts, URL state
- [x] Phase 3: Content System & Life-Stage Hubs (7/7 plans) — MDX guides, life-stage hubs, glossary, internal linking
- [x] Phase 4: Comparison & Affiliate Infrastructure (5/5 plans) — Product comparison, affiliate links, /go/ redirects, GA4 tracking

**Total:** 4 phases, 24 plans, 45 tasks, 12,135 LOC TypeScript, 156 commits over 4 days.

---

## 🚧 v2.0 Growth Engine (In Progress)

**Milestone Goal:** Triple the content footprint, activate all revenue channels, and build the engagement infrastructure to reach Mediavine qualification (50K sessions/month).

## Phases

**Phase Numbering:**
- Integer phases (5, 6, 7): Planned milestone work
- Decimal phases (5.1, 5.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 5: Content Volume & Revenue Foundation** - Standard calculators, ad containers, affiliate expansion, guides, glossary, FAQ schema, SEO enhancements
- [ ] **Phase 6: Programmatic SEO & Life-Stage Hubs** - State tax data, paycheck calculator, 51 state pages, programmatic guides, sitemap split, 4 new hubs
- [ ] **Phase 7: Engagement Engine & Lead Generation** - Debt snowball calculator, quiz/decision tree system, email capture, PDF export, newsletter

## Phase Details

### Phase 5: Content Volume & Revenue Foundation
**Goal**: Users can access 3 new calculators, 10+ new guides, expanded glossary, FAQ rich results on all calculator pages, and the site is revenue-ready with ad containers and expanded affiliate categories
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: CALC-03, CALC-04, CALC-05, CALC-06, CALC-09, CALC-10, CONT-01, CONT-02, CONT-03, CONT-04, REV-01, REV-02, REV-03, REV-04, REV-05, REV-06, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. User can determine maximum affordable home price by entering income, debts, down payment, and rate, and sees conservative/moderate/aggressive affordability tiers
  2. User can calculate credit card payoff timeline with extra payments and see total interest saved
  3. User can determine car affordability and calculate auto loan payments
  4. User can find 10+ new "How to" and "Should I" guides with FAQs, takeaways, and glossary integration
  5. Every calculator page has an FAQ section that produces FAQPage rich results in Google, and all page templates include CLS-safe ad container slots ready for Mediavine activation
**Plans**: 9 plans

Plans:
- [x] 05-01-PLAN.md — Ad container components (AdSlot, AdBreak) and guide sidebar widening
- [x] 05-02-PLAN.md — Home affordability calculator (3-tier DTI analysis)
- [x] 05-03-PLAN.md — Credit card payoff calculator (before/after comparison)
- [x] 05-04-PLAN.md — Car affordability and auto loan calculator
- [x] 05-05-PLAN.md — FAQ sections on all calculator pages + glossary expansion to 50+ terms
- [x] 05-06-PLAN.md — 7 new educational guides (calculator-paired + standalone)
- [x] 05-07-PLAN.md — 4 new affiliate categories + 4 "Best X for Y" listicle articles
- [x] 05-08-PLAN.md — 5 more guides, OG image generation, lastModified dates, internal link audit
- [x] 05-09-PLAN.md — Gap closure: inline calculator hyperlinks in 9 guides + REQUIREMENTS.md status fix

**UI hint**: yes

### Phase 6: Programmatic SEO & Life-Stage Hubs
**Goal**: Users can access state-specific financial tools and guides for all 50 states + DC, and navigate 4 new life-stage hubs with relevant calculators, guides, and next steps
**Depends on**: Phase 5
**Requirements**: CALC-01, CALC-02, TAX-01, TAX-02, TAX-03, TAX-04, PSEO-01, PSEO-02, PSEO-03, PSEO-04, PSEO-05, PSEO-06, PSEO-07, PSEO-08, PSEO-09, PSEO-10, HUB-01, HUB-02, HUB-03, HUB-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):
  1. User can select any US state and calculate accurate net take-home pay with federal, state, FICA, and deduction breakdowns shown in pie and bar charts
  2. User can visit a state-specific paycheck calculator page (e.g., /calculators/paycheck/california) with full bracket tables, 300+ words of state-specific editorial content, unique FAQs, and tips
  3. User can access state-by-state tax guides, first-time homebuyer program guides, and city-specific rent affordability calculators through programmatic page routes
  4. User can navigate New Parents, Wedding/Marriage, FIRE/Early Retirement, and Debt Crisis/Recovery hubs, each populated with relevant calculators, guides, and recommendations
  5. Sitemap is split to handle 200+ URLs and programmatic pages use ISR for manageable build times
**Plans**: 10 plans

Plans:
- [x] 06-01-PLAN.md — Tax engine refactor + state data types + Velite schema extensions
- [x] 06-02-PLAN.md — 51 state tax YAML data files (all 50 states + DC)
- [x] 06-03-PLAN.md — Paycheck calculator math module + main page + state persistence hook
- [ ] 06-04-PLAN.md — 51 state-specific paycheck calculator pages + BracketTable component
- [ ] 06-05-PLAN.md — State indicator badge + home affordability comparison table redesign
- [ ] 06-06-PLAN.md — State tax guides + homebuyer program guides (102 programmatic pages)
- [ ] 06-07-PLAN.md — 25 city rent calculator pages + city YAML data
- [x] 06-08-PLAN.md — 4 new life-stage hubs + 8 hub guides + navigation update
- [x] 06-09-PLAN.md — 4 calculator-paired educational guides
- [ ] 06-10-PLAN.md — Sitemap split + listicle index page + route conflict resolution

**UI hint**: yes

### Phase 7: Engagement Engine & Lead Generation
**Goal**: Users can take interactive quizzes, use decision trees, compare debt payoff strategies, export results as PDF, and subscribe to a newsletter -- all driving deeper engagement and email list growth
**Depends on**: Phase 6
**Requirements**: CALC-07, CALC-08, ENGAGE-01, ENGAGE-02, ENGAGE-03, ENGAGE-04, ENGAGE-05, ENGAGE-06, EMAIL-01, EMAIL-02, EMAIL-03, EMAIL-04, EMAIL-05, EMAIL-06
**Success Criteria** (what must be TRUE):
  1. User can input multiple debts and compare snowball vs avalanche payoff strategies side-by-side with a visual timeline chart showing each debt being eliminated
  2. User can take the Financial Health Score quiz and receive a personalized score with category breakdowns and links to relevant calculators and guides
  3. User can use "Which X is right for you?" decision trees that link to pre-filtered comparison pages, with results shareable via URL
  4. User can sign up for a newsletter, export calculator/quiz results as a PDF, and receive a welcome email -- with basic results always free and only enhanced output gated behind email capture
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 5 -> 5.1 -> 5.2 -> 6 -> 6.1 -> 7

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation & Trust | v1.0 | 5/5 | Complete | 2026-03-24 |
| 2. Calculator Engine | v1.0 | 7/7 | Complete | 2026-03-25 |
| 3. Content System | v1.0 | 7/7 | Complete | 2026-03-26 |
| 4. Comparison & Affiliate | v1.0 | 5/5 | Complete | 2026-03-27 |
| 5. Content Volume & Revenue Foundation | v2.0 | 9/9 | Complete | 2026-03-30 |
| 6. Programmatic SEO & Life-Stage Hubs | v2.0 | 2/10 | In Progress|  |
| 7. Engagement Engine & Lead Generation | v2.0 | 0/TBD | Not started | - |

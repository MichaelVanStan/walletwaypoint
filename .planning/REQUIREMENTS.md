# Requirements: WalletWaypoint v2.0 Growth Engine

**Defined:** 2026-03-29
**Core Value:** Users can find a trustworthy, interactive tool or guide that helps them make a confident financial decision at any life-stage milestone.

## v2.0 Requirements

Requirements for v2.0 release. Each maps to roadmap phases.

### Calculators

- [x] **CALC-01**: User can calculate net take-home pay by entering salary, state, filing status, and deductions (paycheck calculator)
- [x] **CALC-02**: User can see federal, state, FICA, and deduction breakdowns in the paycheck calculator with pie and bar charts
- [x] **CALC-03**: User can determine maximum affordable home price based on income, debts, down payment, and interest rate (home affordability calculator)
- [x] **CALC-04**: User can see conservative (28/36), moderate (30/43), and aggressive (35/50) DTI-based affordability levels
- [x] **CALC-05**: User can calculate credit card payoff timeline with minimum payments and optional extra payments
- [x] **CALC-06**: User can see total interest paid and time saved with extra payments on credit card payoff
- [ ] **CALC-07**: User can input multiple debts and compare snowball vs avalanche payoff strategies side-by-side
- [ ] **CALC-08**: User can see a visual payoff timeline chart showing each debt being eliminated over time
- [x] **CALC-09**: User can determine how much car they can afford based on income and the 10-15% net income rule
- [x] **CALC-10**: User can calculate auto loan monthly payments given price, down payment, rate, and term

### State Tax Data

- [x] **TAX-01**: User can select any of 50 US states + DC and see accurate 2026 state income tax calculations
- [x] **TAX-02**: State tax data includes bracket tables, standard deductions, and personal exemptions per state
- [x] **TAX-03**: Each state tax data file includes lastVerified date, data source, and tax year metadata
- [x] **TAX-04**: Existing federal tax module refactored to accept bracket data as a parameter (enabling state-specific calculations)

### Programmatic SEO

- [ ] **PSEO-01**: User can access a state-specific paycheck calculator page for each of 51 states/DC at /calculators/paycheck/[state]
- [ ] **PSEO-02**: Each state paycheck page has unique bracket tables, 300+ words of state-specific editorial content, unique FAQs, and state-specific tips
- [ ] **PSEO-03**: User can access state-by-state income tax rate guide pages at /guides/state-taxes/[state]
- [ ] **PSEO-04**: Each state tax guide has state-specific brackets, rates, deduction rules, and links to state revenue authority
- [ ] **PSEO-05**: User can access first-time homebuyer program guides by state at /guides/first-time-buyer-programs/[state]
- [ ] **PSEO-06**: Each homebuyer program guide lists state-specific down payment assistance, grants, and eligibility requirements
- [ ] **PSEO-07**: User can access city-specific rent affordability calculators for top 25 metro areas at /calculators/rent-affordability/[city]
- [ ] **PSEO-08**: Each city rent page includes city-specific median rent data and local cost context
- [ ] **PSEO-09**: Sitemap is split into multiple sitemaps to handle 200+ URLs efficiently
- [ ] **PSEO-10**: Programmatic pages use ISR with revalidation to manage build times at scale

### Life-Stage Hubs

- [ ] **HUB-01**: User can access a New Parents / Growing Family hub with relevant calculators, guides, tips, and next steps
- [ ] **HUB-02**: User can access a Wedding / Marriage / Combining Finances hub with relevant calculators, guides, tips, and next steps
- [ ] **HUB-03**: User can access a FIRE / Early Retirement hub with relevant calculators, guides, tips, and next steps
- [ ] **HUB-04**: User can access a Debt Crisis / Financial Recovery hub with relevant calculators, guides, tips, and next steps

### Content Expansion

- [x] **CONT-01**: 10+ new educational guides published targeting "How to..." and "Should I..." search queries
- [x] **CONT-02**: New guides follow existing tone, include FAQs, key takeaways, related content links, and glossary term integration
- [x] **CONT-03**: Glossary expanded from 25 to 50+ financial terms with hover definitions
- [x] **CONT-04**: All calculator pages include FAQ sections with FAQPage JSON-LD schema for rich results
- [ ] **CONT-05**: New guides written for each new calculator (paycheck, home affordability, car affordability, credit card payoff, debt snowball)
- [ ] **CONT-06**: New guides written for each new hub (new parents financial checklist, wedding budget guide, FIRE basics, debt recovery guide)

### Engagement Tools

- [ ] **ENGAGE-01**: User can take a Financial Health Score quiz (10-15 questions across Spend, Save, Borrow, Plan dimensions)
- [ ] **ENGAGE-02**: User receives a personalized score with category breakdowns and links to relevant calculators/guides
- [ ] **ENGAGE-03**: User can use "Which X is right for you?" decision trees (retirement account, debt payoff strategy, credit card type)
- [ ] **ENGAGE-04**: Decision tree results link to pre-filtered comparison pages via nuqs URL params
- [ ] **ENGAGE-05**: Quiz and decision tree tools live at /tools/[slug] with separate QuizShell component system
- [ ] **ENGAGE-06**: Quiz results are shareable via URL with encoded final state

### Email & Lead Generation

- [ ] **EMAIL-01**: User can sign up for a newsletter via contextual email capture forms (inline, card, modal variants)
- [ ] **EMAIL-02**: User can export calculator results as a PDF document
- [ ] **EMAIL-03**: PDF export is offered as an email capture opportunity ("Get your detailed report")
- [ ] **EMAIL-04**: Welcome email sent via Resend when user subscribes to newsletter
- [ ] **EMAIL-05**: Email capture forms comply with CAN-SPAM and GDPR (explicit opt-in, physical address, unsubscribe)
- [ ] **EMAIL-06**: Basic calculator/quiz results are never gated behind email — only enhanced output (PDF, detailed breakdown)

### Revenue Infrastructure

- [x] **REV-01**: CLS-safe ad container components (AdSlot, AdBreak) built into all page templates with reserved minimum heights
- [x] **REV-02**: Mediavine/Journey script integration ready to activate when traffic qualifies (50K sessions/month)
- [x] **REV-03**: Sidebar widened from 240px to 300px on relevant layouts to accommodate standard ad units
- [x] **REV-04**: Affiliate categories expanded beyond current 4 (add: auto insurance, life insurance, investment platforms, tax software)
- [x] **REV-05**: "Best X for Y" listicle comparison pages targeting specific audiences (e.g., "Best credit card for freelancers")
- [x] **REV-06**: Centralized affiliate disclosure component works across all new contexts (programmatic pages, quiz results, email)

### SEO Enhancements

- [x] **SEO-01**: OG image generation for calculator result pages using next/og ImageResponse
- [x] **SEO-02**: All content files include lastModified dates for freshness signals
- [x] **SEO-03**: Internal link audit ensures every guide links to 2-3 calculators and vice versa

## v3.0 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Programmatic Expansion

- **PSEO-V3-01**: Cost of living city-vs-city comparison pages (top 50 metros, ~1,225 pairwise combinations)
- **PSEO-V3-02**: State-specific first-time homebuyer programs expanded from top states to all 50
- **PSEO-V3-03**: City-specific rent affordability expanded from 25 to 100+ metros

### Additional Hubs

- **HUB-V3-01**: Military / Veterans hub (VA loan, TSP, GI Bill)
- **HUB-V3-02**: Mid-Career / Career Change hub (401k rollover, RSU calculator, salary negotiation)
- **HUB-V3-03**: Empty Nester hub (downsizing, catch-up contributions, Medicare bridge)

### Additional Calculators

- **CALC-V3-01**: Cost of raising a child calculator
- **CALC-V3-02**: 529 education savings calculator
- **CALC-V3-03**: Life insurance needs calculator
- **CALC-V3-04**: Wedding budget calculator
- **CALC-V3-05**: FIRE number / Coast FIRE calculator
- **CALC-V3-06**: Roth conversion ladder calculator
- **CALC-V3-07**: Net worth calculator / tracker
- **CALC-V3-08**: 401(k) employer match optimizer
- **CALC-V3-09**: HSA calculator
- **CALC-V3-10**: Emergency fund calculator

### Advanced Features

- **ADV-V3-01**: Advisor matchmaking lead generation
- **ADV-V3-02**: localStorage-based "My Financial Snapshot" dashboard
- **ADV-V3-03**: Dark mode toggle
- **ADV-V3-04**: PWA support (offline-capable calculators)
- **ADV-V3-05**: Sponsored content infrastructure (featured product placements, calculator sponsorship)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real-time financial data feeds | High complexity, not core to financial literacy education |
| User accounts / login system | Content is freely accessible, no auth needed |
| Mobile app | Web-first, responsive design covers mobile |
| Direct lending / product origination | We recommend, not originate |
| Community features (forums, comments) | Editorial-first, community deferred |
| Personalized financial planning / robo-advisor | We educate, not advise |
| RAP student loan calculator | DOE final rules not published until April-May 2026; defer until regulations finalize |
| Local/city income tax in paycheck calculator | Deferred to v3; allow manual input as advanced field in v2 |
| Cost of living comparison calculator | Data sourcing bottleneck (no authoritative free API); defer to v3 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CALC-01 | Phase 6 | Complete |
| CALC-02 | Phase 6 | Complete |
| CALC-03 | Phase 5 | Complete |
| CALC-04 | Phase 5 | Complete |
| CALC-05 | Phase 5 | Complete |
| CALC-06 | Phase 5 | Complete |
| CALC-07 | Phase 7 | Pending |
| CALC-08 | Phase 7 | Pending |
| CALC-09 | Phase 5 | Complete |
| CALC-10 | Phase 5 | Complete |
| TAX-01 | Phase 6 | Complete |
| TAX-02 | Phase 6 | Complete |
| TAX-03 | Phase 6 | Complete |
| TAX-04 | Phase 6 | Complete |
| PSEO-01 | Phase 6 | Pending |
| PSEO-02 | Phase 6 | Pending |
| PSEO-03 | Phase 6 | Pending |
| PSEO-04 | Phase 6 | Pending |
| PSEO-05 | Phase 6 | Pending |
| PSEO-06 | Phase 6 | Pending |
| PSEO-07 | Phase 6 | Pending |
| PSEO-08 | Phase 6 | Pending |
| PSEO-09 | Phase 6 | Pending |
| PSEO-10 | Phase 6 | Pending |
| HUB-01 | Phase 6 | Pending |
| HUB-02 | Phase 6 | Pending |
| HUB-03 | Phase 6 | Pending |
| HUB-04 | Phase 6 | Pending |
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| CONT-04 | Phase 5 | Complete |
| CONT-05 | Phase 6 | Pending |
| CONT-06 | Phase 6 | Pending |
| ENGAGE-01 | Phase 7 | Pending |
| ENGAGE-02 | Phase 7 | Pending |
| ENGAGE-03 | Phase 7 | Pending |
| ENGAGE-04 | Phase 7 | Pending |
| ENGAGE-05 | Phase 7 | Pending |
| ENGAGE-06 | Phase 7 | Pending |
| EMAIL-01 | Phase 7 | Pending |
| EMAIL-02 | Phase 7 | Pending |
| EMAIL-03 | Phase 7 | Pending |
| EMAIL-04 | Phase 7 | Pending |
| EMAIL-05 | Phase 7 | Pending |
| EMAIL-06 | Phase 7 | Pending |
| REV-01 | Phase 5 | Complete |
| REV-02 | Phase 5 | Complete |
| REV-03 | Phase 5 | Complete |
| REV-04 | Phase 5 | Complete |
| REV-05 | Phase 5 | Complete |
| REV-06 | Phase 5 | Complete |
| SEO-01 | Phase 5 | Complete |
| SEO-02 | Phase 5 | Complete |
| SEO-03 | Phase 5 | Complete |

**Coverage:**
- v2.0 requirements: 55 total
- Mapped to phases: 55
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap creation*

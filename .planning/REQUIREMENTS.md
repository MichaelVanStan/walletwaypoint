# Requirements: WalletWaypoint

**Defined:** 2026-03-24
**Core Value:** Users can find a trustworthy, interactive tool or guide that helps them make a confident financial decision at any life-stage milestone.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure & SEO

- [x] **INFRA-01**: All content pages are statically generated (SSG) or ISR for crawlability
- [x] **INFRA-02**: Every page has correct meta tags (title, description, og:image, canonical URL)
- [x] **INFRA-03**: Breadcrumb navigation on all pages with BreadcrumbList schema markup
- [x] **INFRA-04**: Automated XML sitemap and robots.txt generation
- [x] **INFRA-05**: FAQPage, HowTo, Article, and WebApplication schema markup on relevant pages
- [x] **INFRA-06**: Core Web Vitals passing on all pages (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [x] **INFRA-07**: Responsive design that works on mobile, tablet, and desktop

### Legal & Trust

- [x] **TRUST-01**: Standardized affiliate disclosure component displayed near all affiliate links
- [x] **TRUST-02**: "Not financial advice" disclaimer on all calculator and guide pages
- [x] **TRUST-03**: Privacy policy page compliant with CCPA/GDPR basics
- [x] **TRUST-04**: Editorial standards / methodology page explaining how content is created
- [x] **TRUST-05**: Author bio pages with credentials and "reviewed by" attribution on content
- [x] **TRUST-06**: About page establishing site credibility and mission

### Calculator Engine

- [x] **CALC-01**: Parameterized calculator engine that renders calculators from YAML/JSON config definitions
- [ ] **CALC-02**: Slider inputs with real-time result updates (no submit button)
- [x] **CALC-03**: Precision math using decimal.js or integer-cents to avoid floating-point errors
- [ ] **CALC-04**: Results visualization with charts (pie, bar, line/amortization curves) via Recharts
- [ ] **CALC-05**: Contextual results with plain-English interpretation and actionable next steps
- [x] **CALC-06**: Calculator state stored in URL query params (nuqs) for bookmarkable/shareable results
- [ ] **CALC-07**: Side-by-side "what-if" scenario comparison (two sets of inputs, compared outcomes)
- [x] **CALC-08**: Sensible default values for all calculator inputs based on national averages

### Core Calculators

- [ ] **TOOL-01**: Mortgage payment calculator (monthly payment, total interest, amortization schedule)
- [ ] **TOOL-02**: Rent affordability calculator (max rent based on income, expenses, location)
- [ ] **TOOL-03**: Compound interest calculator (growth over time with contributions)
- [ ] **TOOL-04**: Loan repayment calculator (payoff timeline, total cost, extra payment impact)
- [ ] **TOOL-05**: Savings goal calculator (how much to save monthly to reach a target)
- [ ] **TOOL-06**: Retirement calculator (projected retirement savings, withdrawal rate, timeline)
- [ ] **TOOL-07**: Budget calculator (50/30/20 rule breakdown with category allocation)
- [ ] **TOOL-08**: Tax estimator (estimated federal tax liability by filing status and income)
- [ ] **TOOL-09**: Rent vs buy calculator (total cost comparison over time with opportunity cost)
- [ ] **TOOL-10**: Student loan repayment calculator (standard, graduated, income-driven plan comparison)

### Content & Guides

- [ ] **CONT-01**: Educational guide page paired with each calculator (10 guides minimum)
- [ ] **CONT-02**: Jargon-free "smart friend" tone across all content
- [ ] **CONT-03**: Scannable layout with callout boxes, key takeaways, and definition highlights
- [ ] **CONT-04**: Internal linking system (related calculators, related guides, next steps)
- [ ] **CONT-05**: Inline financial glossary with hover tooltips for common terms (APR, DTI, amortization, etc.)

### Life-Stage Hubs

- [ ] **HUB-01**: Student/New Grad hub aggregating relevant calculators, guides, and product recommendations
- [ ] **HUB-02**: First-Time Renter hub with rent affordability tools, cost breakdowns, and lease guidance
- [ ] **HUB-03**: First Home Buyer hub with mortgage tools, down payment guides, and state-specific programs
- [ ] **HUB-04**: Rent vs Buy / Buy-to-Rent hub with investment calculators and landlord cost analysis
- [ ] **HUB-05**: Freelancer/Self-Employed hub with tax estimator, quarterly payment guide, and business credit info
- [ ] **HUB-06**: Pre-Retirement hub with withdrawal calculator, Social Security guidance, and Medicare overview

### Comparison & Affiliate

- [ ] **AFFIL-01**: Comparison table component with sortable columns for financial products
- [ ] **AFFIL-02**: Product data schema for credit cards (APR, annual fee, rewards, credit score range)
- [ ] **AFFIL-03**: Product data schema for loans (rates, terms, eligibility)
- [ ] **AFFIL-04**: Centralized affiliate link registry with automatic disclosure injection
- [ ] **AFFIL-05**: CFPB-compliant product ranking methodology (consumer benefit, not commission)
- [ ] **AFFIL-06**: Affiliate link click tracking for revenue attribution

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Programmatic Scaling

- **SCALE-01**: Programmatic calculator pages for city/state-specific scenarios (e.g., "mortgage calculator Portland")
- **SCALE-02**: Location data integration for cost-of-living adjustments in calculators
- **SCALE-03**: Expanded programmatic content (hundreds of city/scenario pages)

### Enhanced Monetization

- **MONET-01**: Full Mediavine/Raptiv ad integration (requires 50K sessions/month)
- **MONET-02**: Credit profile filtering on comparison tables (750+, 670-749, etc.)
- **MONET-03**: Email lead generation via save/email calculator results as PDF
- **MONET-04**: Ad slot containers pre-allocated in page layouts (CLS-safe)

### Polish

- **POLISH-01**: Print-friendly amortization schedules and payment breakdowns
- **POLISH-02**: Dark mode toggle
- **POLISH-03**: PWA support (offline-capable calculators, installable)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / login system | URL-based state via nuqs eliminates need; auth adds massive complexity; NN/g warns against mandatory registration for calculators |
| Real-time financial data feeds | Expensive licensing ($10K+/year); stale data worse than no data; curate rates manually |
| AI chatbot / financial advisor | YMYL liability; AI hallucinations about finances = legal risk; let content be the advisor |
| Community features (forums, comments) | Moderation burden; UGC on YMYL hurts E-E-A-T; editorial-first approach |
| Mobile app | Search-driven usage pattern; responsive web + PWA covers mobile |
| Personalized financial dashboard | Requires bank integrations (Plaid), PII handling, SOC 2; life-stage hubs serve as self-selection "personalization" |
| Paywall / premium content | Finance content abundant and free; paywall kills SEO; monetize via ads + affiliate |
| Stock simulator / portfolio tracker | Requires real-time market data; not aligned with calculator/education focus |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 1 | Complete |
| TRUST-01 | Phase 1 | Complete |
| TRUST-02 | Phase 1 | Complete |
| TRUST-03 | Phase 1 | Complete |
| TRUST-04 | Phase 1 | Complete |
| TRUST-05 | Phase 1 | Complete |
| TRUST-06 | Phase 1 | Complete |
| CALC-01 | Phase 2 | Complete |
| CALC-02 | Phase 2 | Pending |
| CALC-03 | Phase 2 | Complete |
| CALC-04 | Phase 2 | Pending |
| CALC-05 | Phase 2 | Pending |
| CALC-06 | Phase 2 | Complete |
| CALC-07 | Phase 2 | Pending |
| CALC-08 | Phase 2 | Complete |
| TOOL-01 | Phase 2 | Pending |
| TOOL-02 | Phase 2 | Pending |
| TOOL-03 | Phase 2 | Pending |
| TOOL-04 | Phase 2 | Pending |
| TOOL-05 | Phase 2 | Pending |
| TOOL-06 | Phase 2 | Pending |
| TOOL-07 | Phase 2 | Pending |
| TOOL-08 | Phase 2 | Pending |
| TOOL-09 | Phase 2 | Pending |
| TOOL-10 | Phase 2 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Pending |
| HUB-01 | Phase 3 | Pending |
| HUB-02 | Phase 3 | Pending |
| HUB-03 | Phase 3 | Pending |
| HUB-04 | Phase 3 | Pending |
| HUB-05 | Phase 3 | Pending |
| HUB-06 | Phase 3 | Pending |
| AFFIL-01 | Phase 4 | Pending |
| AFFIL-02 | Phase 4 | Pending |
| AFFIL-03 | Phase 4 | Pending |
| AFFIL-04 | Phase 4 | Pending |
| AFFIL-05 | Phase 4 | Pending |
| AFFIL-06 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 48 total
- Mapped to phases: 48
- Unmapped: 0

---
*Requirements defined: 2026-03-24*
*Last updated: 2026-03-24 after roadmap creation*

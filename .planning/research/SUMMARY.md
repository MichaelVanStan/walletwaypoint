# Project Research Summary

**Project:** WalletWaypoint
**Domain:** Financial literacy website with interactive calculators, comparison pages, and SEO-first content architecture
**Researched:** 2026-03-24
**Confidence:** HIGH

## Executive Summary

WalletWaypoint is a content-plus-tools financial literacy site that competes by organizing educational content and interactive calculators around life stages (Student, First Renter, First Home Buyer, Freelancer, Pre-Retirement) rather than product categories. The expert-consensus approach for this type of site is: Next.js App Router with SSG/ISR for SEO performance, a parameterized calculator engine driven by YAML definitions for programmatic scaling, MDX for editorial content, and a hub-and-spoke information architecture that builds topical authority. The stack is mature, well-documented, and the builder has direct prior experience with Next.js (NewsBalance). There are no significant unknowns in the core technology choices.

The recommended approach is to build the calculator engine and content system as two parallel pillars on a shared foundation of SEO infrastructure, then layer monetization (affiliate links, ad slots) on top once pages are ranking and attracting traffic. The parameterized calculator pattern -- one React component driven by many YAML definitions -- is the architectural centerpiece because it enables scaling from 10 to 1,000+ calculator pages without proportional code growth. Life-stage hubs are the primary differentiator; no major competitor (NerdWallet, Bankrate, SmartAsset, Investopedia) organizes content this way. The differentiation is real and defensible.

The critical risks are all YMYL-specific. Google applies its strictest quality standards to financial content: thin programmatic pages will be deindexed, missing E-E-A-T signals (author bios, credentials, editorial policy) will prevent ranking regardless of content quality, and FTC/CFPB compliance on affiliate disclosures and comparison rankings is not optional -- violations carry $51K+ penalties per page. Calculator accuracy errors from JavaScript floating-point math are trust-destroying in a domain where users compare results against their bank's numbers. All of these must be addressed in the foundation phase, not retrofitted later.

## Key Findings

### Recommended Stack

The stack centers on Next.js 16.2 with React 19, TypeScript 5.8, and Tailwind CSS 4.2. This is a thoroughly proven combination with no compatibility risks. The builder's existing Next.js expertise eliminates ramp-up time. Key supporting libraries: Velite for type-safe MDX/YAML content processing, Recharts for financial visualizations, shadcn/ui for accessible UI components, Zod 4 for validation, react-hook-form for calculator inputs, and nuqs for URL state management (enabling bookmarkable/shareable calculator results). All choices have React 19 compatibility confirmed.

**Core technologies:**
- **Next.js 16.2 (App Router):** SSG/ISR for SEO, built-in sitemap/robots/metadata API, `generateStaticParams` for programmatic page generation, stable Turbopack for 400% faster dev builds
- **Velite 0.3:** Turns MDX/YAML/JSON content into a type-safe data layer with Zod schemas; spiritual successor to abandoned Contentlayer; handles 1,000+ documents in under 8 seconds
- **Recharts 3.8:** Declarative React chart components for amortization curves, compound interest projections, payment breakdowns -- the right complexity level for financial calculators
- **nuqs:** URL state management storing calculator inputs in query strings -- makes results bookmarkable, shareable, and crawlable by Google
- **Zod 4.3:** 14x faster than v3; validates calculator inputs and content schemas; shared between client forms and build-time content processing
- **shadcn/ui (CLI v4):** Copy-paste accessible components (sliders, tabs, tables, tooltips) built on Radix primitives + Tailwind; eliminates weeks of component development

**Deployment:** Vercel free tier to start, Pro ($20/month) as traffic grows. Evaluate self-hosting on Coolify/Hetzner only if costs exceed $100/month consistently (likely at 200K+ sessions).

**Notable exclusions:** No user accounts, no database, no global state management, no CMS (filesystem content is sufficient for a solo/small team), no real-time data feeds.

### Expected Features

**Must have (table stakes):**
- Parameterized calculator engine with 8-10 initial calculators (mortgage, compound interest, loan repayment, savings, retirement, budget/50-30-20, rent affordability, tax estimator)
- Mobile-responsive calculator UI with sliders and real-time results (no submit button)
- Results visualization with charts and amortization tables
- Educational guide pages paired 1:1 with each calculator
- Full SEO infrastructure: SSG pages, schema markup (FAQPage, HowTo, BreadcrumbList, WebApplication), meta tags, canonical URLs, breadcrumbs, programmatic sitemaps
- Affiliate disclosures and financial disclaimers (legal non-negotiable)
- Core Web Vitals passing (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Author/methodology pages for E-E-A-T compliance
- Internal linking system (related calculators, related guides, breadcrumbs)

**Should have (differentiators):**
- 2-3 life-stage hub pages (First-Time Renter, First Home Buyer, Student/New Grad) -- the core differentiator
- Contextual calculator results with actionable next steps
- Save/share calculator results via URL parameters
- Inline financial glossary with hover tooltips
- Comparison tables with affiliate links for credit cards and loans
- Programmatic calculator pages at scale (city-specific, scenario-specific)

**Defer (v2+):**
- What-if scenario comparison (side-by-side)
- Credit profile filtering on comparison tables
- Print/PDF output
- Dark mode
- Full Mediavine/Raptiv integration (gated by 50K sessions/month)
- Email lead generation

**Anti-features (do not build):**
- User accounts / login system -- use URL state instead
- Real-time financial data feeds -- use manually curated rates
- AI chatbot / financial advisor -- YMYL liability nightmare
- Community features / forums -- moderation burden outweighs value
- Mobile app -- responsive web + PWA is the distribution channel
- Paywall -- free content is the product, monetize through ads and affiliates

### Architecture Approach

The architecture follows a four-layer pattern: Presentation (layout shell, SEO, ads, disclosures), Pages (life-stage hubs, calculator pages, guides, comparisons), Components (calculator engine as client island, MDX renderer as server component, product cards with affiliate tracking), and Data (calculator definitions in YAML, content in MDX, product data in JSON). The critical pattern is "Server-Static Shell + Client Interactive Island": pages render as full static HTML for SEO crawlability, with only the interactive calculator widget hydrating as a client component. This gives Google full content to index while users get instant interactivity.

**Major components:**
1. **Parameterized Calculator Engine** -- one `CalculatorShell` React component + pure TypeScript formula library + YAML definitions; adding a new calculator means adding a YAML file, not writing code
2. **Hub-and-Spoke Content System** -- life-stage pillar pages link to spoke pages (guides, calculators, comparisons); spokes link back; creates dense internal linking network for topical SEO authority
3. **Centralized Affiliate Registry** -- all affiliate links in a JSON registry referenced by product ID; components never construct URLs directly; enables compliance auditing, click tracking, and easy URL updates
4. **Ad-Ready Layout** -- pre-allocated `min-height` containers for ad slots preventing CLS; built into templates from day one, even before joining an ad network
5. **SEO Infrastructure** -- JSON-LD schema generators, dynamic sitemap, metadata templates, breadcrumbs -- all co-located with pages, not in global config

### Critical Pitfalls

1. **Google YMYL penalty on thin programmatic pages** -- Do not scale to hundreds of pages immediately. Start with 10-20 hand-crafted calculator pages with unique editorial content. Each page needs 300+ unique words of scenario-specific guidance. Monitor indexation ratio in Search Console and stay above 60%. Scale at 50 pages/month max.
2. **Missing E-E-A-T signals on a new domain** -- Build trust infrastructure (About, Editorial Policy, How We Make Money, author bio system) in Phase 1, not as an afterthought. Every content page needs a visible author byline, credentials, "Last Updated" date, and source citations. Without these, even excellent content will not rank in YMYL.
3. **CFPB preferencing violation on comparison pages** -- Rank products by objective consumer criteria (APR, fees, rewards value), never by commission. Include non-affiliate products. Publish a "How We Rank" methodology page. Separate editorial decisions from monetization knowledge.
4. **FTC affiliate disclosure non-compliance** -- $51,744 per violation in 2026. Build disclosures as an automatic code-level component, not a content-level habit. Every page with affiliate links must show disclosure above the fold before the first affiliate link.
5. **Calculator accuracy from floating-point errors** -- Use integer arithmetic (cents) or `decimal.js` for all financial math from day one. Validate every calculator against reference sources (Bankrate, IRS tables). Write property-based tests (amortization principal payments must sum to original loan amount exactly).
6. **Ad integration destroying Core Web Vitals** -- Pre-allocate fixed-height ad slots in every template from the start. Use `lazyOnload` script strategy. Test CWV with and without ads. CLS > 0.1 tanks rankings, creating a death spiral: worse rankings, less traffic, cannot qualify for premium ad networks.
7. **Targeting head terms instead of long-tail** -- A new DA-0 domain cannot rank for "mortgage calculator" against NerdWallet (DA 92). Focus exclusively on long-tail, life-stage-specific keywords for the first 6-12 months. Only target keyword difficulty < 30.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Infrastructure
**Rationale:** Every subsequent phase depends on the project scaffold, design system, data schemas, SEO infrastructure, and trust/compliance pages. Architecture research shows a clear dependency chain: project structure -> data layer -> everything else. Pitfalls research demands that E-E-A-T signals, disclosure components, ad slot containers, and precision math be established from the start -- retrofitting any of these is significantly harder than building them in.
**Delivers:** Working Next.js project with routing, design system (shadcn/ui), root layout with ad-ready containers, calculator definition schema (Zod), content file conventions, SEO infrastructure (metadata API, JSON-LD helpers, sitemap, robots), trust pages (About, Editorial Policy, How We Make Money, Privacy), affiliate disclosure component, financial disclaimer component, author bio system.
**Addresses:** SEO infrastructure (P1), legal compliance (P1), author/methodology pages (P1), responsive design foundation (P1), Core Web Vitals baseline (P1)
**Avoids:** Missing E-E-A-T signals (Pitfall 2), FTC disclosure gaps (Pitfall 4), ad CLS without pre-allocated slots (Pitfall 6)

### Phase 2: Calculator Engine and Core Calculators
**Rationale:** The calculator engine is the product's core value and its primary architectural moat. It must be built before any content or monetization because content pages reference calculators, life-stage hubs aggregate them, and comparison pages assume calculator pages exist. Architecture research identifies the parameterized engine pattern as the single most important architectural decision.
**Delivers:** Parameterized calculator engine (TypeScript formula library + `CalculatorShell` client component + YAML definition schema), chart/visualization integration (Recharts), URL state management (nuqs), 8-10 working calculators (mortgage, compound interest, loan repayment, savings, retirement, budget/50-30-20, rent affordability, tax estimator), calculator accuracy test suite with reference validation.
**Addresses:** Calculator engine (P1), core calculators (P1), results visualization (P1), responsive calculator UX with sliders (P1)
**Avoids:** Floating-point calculation errors (Pitfall 5), client-side-only rendering anti-pattern (Architecture anti-pattern 1), hardcoded per-calculator logic anti-pattern (Architecture anti-pattern 2)

### Phase 3: Content System and Life-Stage Hubs
**Rationale:** Once calculators work, the content system brings them to life with educational context (required for E-E-A-T) and organizes them into the life-stage hubs that differentiate WalletWaypoint from competitors. The content system depends on Phase 2 because guides embed calculators and hubs aggregate them. This is also where SEO begins delivering traffic -- long-tail keywords around life-stage topics.
**Delivers:** MDX rendering pipeline with custom components, 8-10 educational guide pages (one per calculator), internal linking engine (related calculators, related guides), 2-3 life-stage hub pages (Student/New Grad, First-Time Renter, First Home Buyer) with hub-and-spoke linking, inline glossary tooltip system, content authoring workflow.
**Addresses:** Educational guides (P1), life-stage hubs (P1), internal linking (P1), inline glossary (P2)
**Avoids:** Thin content without editorial substance (Pitfall 1 prevention), flat URL structure anti-pattern (Architecture anti-pattern 6), targeting head terms (Pitfall 7 -- life-stage hubs naturally target long-tail)

### Phase 4: Comparison Pages and Affiliate Infrastructure
**Rationale:** Comparison tables and affiliate links are the first revenue mechanism that does not require traffic thresholds. They depend on the content system (comparison pages live within the content hierarchy) and the affiliate registry pattern (Architecture Pattern 4). CFPB and FTC compliance must be baked in from the start of this phase.
**Delivers:** Product data schema (JSON), centralized affiliate link registry, affiliate click tracking API route, comparison table component with filtering, comparison pages for credit cards and loans, "How We Rank Products" methodology page, FTC-compliant disclosure integration across all affiliate-containing pages.
**Addresses:** Comparison tables (P2), affiliate link infrastructure (P2), save/share results (P2)
**Avoids:** CFPB preferencing violations (Pitfall 3), inline affiliate link anti-pattern (Architecture anti-pattern 3), FTC non-compliance (Pitfall 4)

### Phase 5: Programmatic Scaling
**Rationale:** Scaling calculator pages programmatically is the traffic moat, but it must come after core calculators are proven, indexed, and receiving traffic. Pitfalls research is unambiguous: launching hundreds of programmatic pages on a new domain before establishing quality signals will trigger a YMYL penalty. This phase uses the calculator variant system (YAML variants -> `generateStaticParams`) to stamp out city-specific and scenario-specific pages.
**Delivers:** Calculator variant system generating pages from YAML, initial batch of 20-50 programmatic pages (city-specific mortgage, rent affordability by location), remaining life-stage hubs (Freelancer, Rent-vs-Buy, Pre-Retirement), Search Console indexation monitoring per page group, content uniqueness validation.
**Addresses:** Programmatic calculator pages (P2), remaining life-stage hubs (P2)
**Avoids:** Google YMYL penalty on thin programmatic pages (Pitfall 1 -- gradual rollout with unique editorial content per page, 50 pages/month max)

### Phase 6: Monetization and Polish
**Rationale:** Ad network integration comes last because it requires traffic volume (Mediavine Journey: 1K+ sessions/month, full Mediavine: 50K+) and because ad scripts are the highest risk to Core Web Vitals. The ad-ready containers from Phase 1 make integration straightforward. This phase also handles analytics, performance optimization, and accessibility auditing.
**Delivers:** Mediavine Journey or AdSense integration (as traffic bridge), full analytics setup (GA4 + Vercel Analytics), performance optimization (bundle analysis, image optimization), accessibility audit and fixes, content expansion tooling (scripts to scaffold new calculators and guides), dark mode, print/PDF output.
**Addresses:** Ad slot infrastructure (P2), full ad network integration (P3), dark mode (P3), print/PDF (P3), email lead generation (P3)
**Avoids:** CWV failures from ad integration (Pitfall 6 -- CLS-safe containers already in place, thorough before/after testing)

### Phase Ordering Rationale

- **Foundation before everything:** E-E-A-T, compliance, and ad-slot architecture are all "day one or suffer later" requirements identified by pitfalls research. The architecture dependency graph confirms this.
- **Calculator engine before content:** Content pages embed and reference calculators. Hubs aggregate them. Building content without working calculators means building placeholders that need rework.
- **Content before affiliate monetization:** Comparison pages live within the content hierarchy and require the internal linking system. Affiliate programs also require existing traffic as proof for application.
- **Core pages before programmatic scaling:** Pitfalls research is the strongest signal here -- scaling before quality signals are established on core pages triggers YMYL penalties. Prove the model with 10-20 hand-crafted pages before generating hundreds.
- **Monetization last:** Both ad networks and affiliate programs require traffic volume. Building monetization infrastructure before traffic exists is premature optimization. The Phase 1 ad containers ensure zero rework when the time comes.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Calculator Engine):** The precision math strategy (integer cents vs. `decimal.js`) needs a concrete decision with performance benchmarking on complex amortization schedules. Formula correctness validation against reference sources is critical and domain-specific.
- **Phase 4 (Comparison/Affiliate):** CFPB compliance for ranking methodology, affiliate network selection (CJ vs. Impact vs. direct partnerships), and product data sourcing require domain research during planning.
- **Phase 5 (Programmatic Scaling):** Content uniqueness scoring, optimal batch size, indexation monitoring setup, and city/location data sourcing are all specific enough to warrant pre-phase research.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js App Router scaffolding, Tailwind/shadcn setup, SEO metadata API -- all thoroughly documented with established patterns.
- **Phase 3 (Content System):** MDX rendering with Velite, hub-and-spoke architecture, internal linking -- well-documented patterns with multiple reference implementations.
- **Phase 6 (Monetization/Polish):** Mediavine integration, analytics setup, performance optimization -- standard patterns with official documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are current stable releases with confirmed React 19 / Next.js 16 compatibility. Builder has prior Next.js experience. 14 of 17 sources rated HIGH confidence. Only Velite (pre-1.0) and Mediavine Next.js integration carry MEDIUM confidence. |
| Features | HIGH | Based on direct analysis of NerdWallet, Bankrate, SmartAsset, Investopedia, and Credit Karma, plus NN/g usability research. Feature priorities are well-grounded in competitor analysis and domain-specific user research. |
| Architecture | HIGH | Patterns are drawn from Next.js official documentation, real-world programmatic SEO case studies, and established hub-and-spoke SEO methodology. Project structure follows App Router conventions. |
| Pitfalls | HIGH | Sources include CFPB circulars, FTC enforcement data with specific penalty amounts, Google quality rater guidelines, and developer community consensus on JavaScript floating-point issues. Multiple authoritative primary sources per pitfall. |

**Overall confidence:** HIGH

### Gaps to Address

- **Precision math library decision:** Research identifies the problem (floating-point) and two solutions (integer cents, `decimal.js`) but does not benchmark performance for complex calculations (30-year monthly amortization with extra payments). Decide during Phase 2 planning with a concrete spike.
- **Velite at pre-1.0:** Velite is the best available option (Contentlayer is abandoned), but it is v0.3. Mitigate by keeping the content loading interface abstract so swapping to Content Collections or a custom loader is possible without rewriting page components.
- **Analytics choice:** Architecture research recommends Plausible/Umami (privacy-respecting, no cookie banner) while Stack research lists GA4 (required for Mediavine application). Resolve this conflict: likely run both, or confirm Mediavine accepts Plausible data. Decide during Phase 1 planning.
- **Initial content quality for E-E-A-T:** Research is clear that author credentials are critical for YMYL, but does not address what to do if the builder lacks formal finance credentials (CFP, CFA, CPA). Resolution: either partner with a credentialed reviewer or build E-E-A-T through demonstrated experience and transparent methodology rather than credentials alone.
- **Affiliate program acceptance:** Research assumes affiliate programs will accept a new site. In practice, many programs require minimum traffic. Plan for a bootstrap period with no affiliate revenue (AdSense as stopgap, or no monetization until traffic establishes).

## Sources

### Primary (HIGH confidence)
- Next.js 16 / 16.2 release blogs -- confirmed framework features, versions, compatibility
- Tailwind CSS v4.0 release -- CSS-first config, performance characteristics
- Zod v4 InfoQ coverage -- parsing performance, bundle size
- React 19.2, TypeScript 5.8 official releases -- version compatibility
- CFPB Circular 2024-01 -- comparison page preferencing legal requirements
- FTC affiliate disclosure enforcement data -- penalty amounts, compliance requirements
- Google December 2025 core update analysis -- YMYL programmatic content risks
- NN/g calculator UX research -- 12 design recommendations for calculator tools
- schema-dts, Recharts, Motion, nuqs npm packages -- version and compatibility data

### Secondary (MEDIUM confidence)
- Velite GitHub (pre-1.0 library, active maintenance confirmed)
- Mediavine Next.js integration guide (community source, not official)
- NerdWallet tech stack analysis (external analysis via StackShare)
- Vercel vs. self-hosting cost comparison (third-party analysis)
- Programmatic SEO case studies (developer community)
- Competitor feature analysis (NerdWallet, Bankrate, SmartAsset, Investopedia -- external observation)

### Tertiary (LOW confidence)
- None. All findings are corroborated by at least two independent sources.

---
*Research completed: 2026-03-24*
*Ready for roadmap: yes*

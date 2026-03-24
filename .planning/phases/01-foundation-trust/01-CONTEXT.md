# Phase 1: Foundation & Trust - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

The site exists as a fast, responsive, crawlable Next.js application with complete SEO infrastructure (SSG, meta tags, breadcrumbs, sitemap, schema markup, Core Web Vitals) and all trust/legal pages required for YMYL credibility (About, Editorial Standards, Privacy Policy, disclaimers, author attribution, affiliate disclosure component).

</domain>

<decisions>
## Implementation Decisions

### Visual identity & design system
- **D-01:** Clean & professional visual mood — white space, muted blues/greens, clear hierarchy. Conveys "trustworthy financial resource" immediately, aligned with YMYL trust signals.
- **D-02:** Blue-based primary color palette — navy/slate blue with a teal or green accent. Signals reliability and stability in the finance context.
- **D-03:** Inter or system-like sans-serif typography — clean, neutral, excellent readability, small file size. Professional without being stuffy.
- **D-04:** shadcn/ui defaults with custom theme via CSS variables (colors, radius, spacing). No heavy customization — fast to ship, consistent, easy to maintain.

### Site navigation & page structure
- **D-05:** Full navigation with placeholders — show complete future navigation (Calculators, Guides, Hubs, Compare) with placeholder/coming-soon landing pages. Establishes site structure for crawlers early.
- **D-06:** Fixed top bar header — logo left, nav links center or right, sticky on scroll. Mobile: hamburger menu. Standard, predictable content site pattern.
- **D-07:** Comprehensive multi-column footer — site links, legal pages, about/contact, social placeholders, and a prominent financial disclaimer. Google quality raters expect trust signals in the footer.
- **D-08:** Homepage with hero + value prop + trust signals — hero section with tagline, brief description of WalletWaypoint's offering, placeholder cards for upcoming calculators/hubs, trust badges/signals at bottom.

### Trust page authorship & depth
- **D-09:** Brand-authored content — attributed to "WalletWaypoint Editorial Team" with a methodology page explaining the review process. No fake personas. Real author bios added later when contributors join.
- **D-10:** Comprehensive Editorial Standards page — full methodology: how content is researched, fact-checked, updated. Data sources cited. Clear distinction between editorial and affiliate content.
- **D-11:** Mission-driven About page — why WalletWaypoint exists, who it's for, what makes it different (life-stage approach, tools not advice). Credibility through purpose and transparency, not credentials.
- **D-12:** Sticky banner + inline disclaimer components — persistent small banner on calculator/guide pages ("For educational purposes — not financial advice") plus an inline disclaimer component for contextual placement.

### Analytics & tracking
- **D-13:** GA4 from day one — required by Mediavine for 50K session qualification. Start collecting data immediately so history exists when applying. Resolves the Plausible vs GA4 blocker flagged in STATE.md.
- **D-14:** Vercel Analytics included — Real User Monitoring for LCP, CLS, INP. Critical since Mediavine qualification depends on passing Core Web Vitals. Free on Vercel hobby tier.

### Claude's Discretion
- Exact color hex values and CSS variable definitions within the blue-based palette
- Specific shadcn/ui components to install in Phase 1
- Breadcrumb implementation details
- Schema markup structure (FAQPage, HowTo, Article, WebApplication)
- XML sitemap and robots.txt configuration
- Privacy Policy page content structure (CCPA/GDPR basics)
- Responsive breakpoint strategy
- Coming-soon placeholder page design
- GA4 event tracking configuration specifics

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements are fully captured in decisions above and in the following project documents:

### Project-level
- `.planning/PROJECT.md` — Project vision, constraints, key decisions, "friendly mentor" brand voice
- `.planning/REQUIREMENTS.md` — Full requirement definitions (INFRA-01 through INFRA-07, TRUST-01 through TRUST-06 for this phase)
- `.planning/ROADMAP.md` — Phase 1 goal and success criteria
- `CLAUDE.md` §Technology Stack — Complete tech stack with versions, compatibility notes, and alternatives considered

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing code — greenfield project

### Established Patterns
- No established patterns yet — Phase 1 sets all conventions

### Integration Points
- Next.js App Router will be the foundation for all subsequent phases
- shadcn/ui components initialized here will be reused across all phases
- Tailwind CSS theme variables set here define the visual language for the entire site
- SEO infrastructure (meta tags, schema, sitemap) established here applies to all future pages

</code_context>

<specifics>
## Specific Ideas

- NerdWallet-style clean/professional look is the visual reference point
- "Smart friend explaining money" brand voice should be reflected in page copy (About, Editorial Standards)
- WalletWaypoint tagline direction: "Your next financial milestone starts here"
- Full nav with placeholders signals scope to search engines before content arrives

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-trust*
*Context gathered: 2026-03-24*

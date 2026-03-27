# Milestones

## v1.0 MVP (Shipped: 2026-03-27)

**Phases completed:** 4 phases, 24 plans, 45 tasks

**Key accomplishments:**

- Next.js 16 project with blue OKLCH Tailwind theme, Inter font, shadcn/ui components, GA4/Vercel analytics, and shared config/metadata/navigation utilities
- Sticky header with desktop NavigationMenu and mobile Sheet hamburger, 4-column footer with financial disclaimer, auto-detecting breadcrumbs with BreadcrumbList JSON-LD, 6 schema components (Organization, Article, FAQ, WebApp, Breadcrumb, generic JsonLd), programmatic sitemap and robots.txt
- Homepage with hero/CTAs/trust signals, four Coming Soon placeholder pages establishing URL structure, DisclaimerBanner on calculator/guide routes, and custom 404/error pages
- Four E-E-A-T trust pages (About, Editorial Standards, Privacy Policy, Author Bio) with substantive content, Article/FAQ JSON-LD schema, and three reusable trust components (AuthorCard, DisclaimerInline, AffiliateDisclosure)
- Velite calculator YAML engine, decimal.js-light precision math (pmt/fv/pv), nuqs URL state for 10 calculators, 8 shadcn/ui components, and 50 passing vitest tests
- 8 reusable calculator UI components: InputSliderCombo with ARIA and extreme value warnings, config-driven CalculatorInputs with Select support, CalculatorShell orchestrating two-column layout with nuqs URL state, comparison mode toggle with mobile tabs, and expandable DetailTable for breakdowns
- Recharts wrapper with 4 chart types (area/pie/line/bar), OKLCH gradient styling, comparison table with delta badges, and CSV export with UTF-8 BOM
- 5 financial calculator math modules (mortgage, rent, compound interest, loan, savings) with decimal.js-light precision, 24 unit tests, and 5 YAML configs defining inputs/outputs/charts/SEO
- Retirement (accumulation + 4% rule distribution), budget (50/30/20), tax estimator (2026 federal brackets for 3 filing statuses), rent-vs-buy (opportunity cost model), and student loan (standard/graduated/IDR plan comparison) math modules with 37 unit tests and 5 YAML configs
- Calculator registry, RSC boundary wrapper, index page, and dynamic [slug] route wiring all 10 calculators with charts, comparison mode, and static generation from Velite
- Playwright E2E tests validate all 10 calculators load, compute, persist URL state, and support comparison mode; user approved Phase 2 complete

---

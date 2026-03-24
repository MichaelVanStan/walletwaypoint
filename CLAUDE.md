<!-- GSD:project-start source:PROJECT.md -->
## Project

**WalletWaypoint**

WalletWaypoint is a financial literacy website that helps people navigate money decisions at every life stage. Through interactive calculators, comparison pages, and educational guides organized into life-stage "hubs," it meets users where they are — whether they're a student managing their first loan, a renter weighing affordability, a first-time homebuyer, a freelancer estimating taxes, or someone planning retirement. The tone is a friendly mentor: a smart friend who explains money clearly, not a bank.

**Core Value:** Users can find a trustworthy, interactive tool or guide that helps them make a confident financial decision at any life-stage milestone.

### Constraints

- **Tech stack**: Next.js (consistent with builder's existing expertise from NewsBalance)
- **SEO**: Must be SSR/SSG for crawlability; no client-only rendering for content pages
- **Performance**: Core Web Vitals must pass for all pages (LCP < 2.5s, CLS < 0.1)
- **Content**: Must be genuinely useful — not thin affiliate bait; E-E-A-T compliance for YMYL content
- **Legal**: Financial disclaimers required; "not financial advice" disclosures; affiliate disclosure compliance (FTC)
- **Monetization**: Site must be Mediavine/Raptiv-ready (clean ad slots, no layout shift from ads)
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.2 | Full-stack React framework | Builder has existing Next.js expertise (NewsBalance). v16 ships stable Turbopack (400% faster dev startup), stable React Compiler, and `use cache` for instant navigation. App Router with SSG/ISR is the gold standard for SEO-first content sites. Built-in `sitemap.ts`, `robots.ts`, metadata API, and JSON-LD support eliminate the need for third-party SEO plumbing. |
| React | 19.2 | UI library | Required by Next.js 16. React 19 brings Server Components (reduce client JS bundle for content pages), Server Actions (form handling without API routes), `use cache` directive, and the stable React Compiler that auto-memoizes components. |
| TypeScript | 5.8 | Type safety | Industry standard for any non-trivial project. Direct execution in Node.js 23.6+ via `--erasableSyntaxOnly`. Zod v4 + TypeScript gives end-to-end type safety from content schemas through to UI props. |
| Tailwind CSS | 4.2 | Utility-first styling | CSS-first configuration (no more `tailwind.config.js`), 5x faster full builds, 100x faster incremental builds. Design tokens as CSS variables by default. Native `@tailwindcss/postcss` plugin integrates cleanly with Next.js. shadcn/ui is built on Tailwind, so the entire component system aligns. |
| Velite | 0.3 | Content data layer (MDX/YAML/JSON) | Turns MDX files into a type-safe data layer with Zod schema validation. Framework-agnostic output (JSON + TypeScript types). Handles 1000+ documents in under 8 seconds cold start, 60ms hot rebuild. Successor to the abandoned Contentlayer. Perfect for parameterized calculator pages and educational content at scale. |
### Content and SEO
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| MDX | 3.x | Content authoring format | Markdown with embedded React components. Calculator widgets, comparison tables, and interactive elements live inline with educational content. No CMS vendor lock-in -- content lives in the repo as files. |
| next-mdx-remote | 6.0 | Remote/dynamic MDX rendering | Renders MDX on the server via RSC (`next-mdx-remote/rsc`). Pairs with Velite for static content but handles dynamic MDX scenarios (e.g., A/B test content variants). |
| schema-dts | 1.1 | JSON-LD TypeScript types | Google-maintained TypeScript types for Schema.org vocabulary. Type-safe structured data for `FAQPage`, `HowTo`, `FinancialProduct`, `Calculator` schemas. Catches schema errors at compile time, not in Google Search Console weeks later. |
| Built-in Next.js SEO | -- | Sitemaps, robots, metadata | Next.js 16 has native `sitemap.ts`, `robots.ts`, and the Metadata API. No need for `next-sitemap` or `next-seo` packages. Programmatic sitemap generation handles thousands of calculator variant pages. |
### UI Components and Visualization
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| shadcn/ui | latest (CLI v4) | Component library | Not a dependency -- components are copied into your codebase, giving full control. Built on Radix UI primitives (accessible by default) + Tailwind CSS. Sliders, tabs, cards, tooltips, accordions, and data tables are all needed for calculators and comparison pages. CLI v4 (March 2026) scaffolds full project templates. |
| Recharts | 3.8 | Charts and data visualization | Declarative, composable React components for line/bar/area/pie charts. Perfect complexity level for financial calculators (loan amortization curves, compound interest projections, retirement withdrawal charts). Supports React 19. Simpler than Nivo/Visx, which are overkill for this use case. |
| Lucide React | 0.577 | Icon system | Tree-shakable SVGs, 1500+ icons on a consistent 24x24 grid. Default icon set for shadcn/ui. TypeScript typed. Negligible bundle impact because you only ship the icons you import. |
| Motion (prev. Framer Motion) | 12.38 | Animations | Import from `motion/react`. Smooth calculator result transitions, comparison card reveals, and scroll-linked animations for educational content. Scroll-linked animations refined for long content pages -- exactly what financial guides need. |
### Calculator Engine and Forms
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Zod | 4.3 | Schema validation | 14x faster parsing than v3, 57% smaller core. Validates calculator inputs (loan amount ranges, interest rate bounds, term limits). Shared schemas between client-side forms and server-side processing. Built-in `.toJSONSchema()` for API documentation. |
| react-hook-form | 7.72 | Form state management | Lightweight, performant form library. Works with React 19 and Server Actions. `@hookform/resolvers` bridges to Zod for declarative validation. Calculator input forms need instant validation feedback without re-rendering the entire page. |
| nuqs | latest | URL state management | Stores calculator parameters in the URL query string (`?amount=250000&rate=6.5&term=30`). Users can bookmark and share calculator results. Type-safe with built-in parsers. Only 6 kB gzipped. Used by Vercel, Sentry, Supabase. Critical for SEO -- Google can crawl parameterized calculator states. |
### Infrastructure and Deployment
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vercel | -- | Hosting and deployment | Native Next.js support (they build it). Edge network for global CDN. Automatic ISR, image optimization, and analytics. Free tier sufficient for development and early traffic. At 50k+ sessions/month, Pro plan ($20/month) handles the load. Evaluate self-hosting only if monthly bill consistently exceeds $100+. |
| Vercel Analytics | -- | Core Web Vitals monitoring | Real User Monitoring for LCP, CLS, INP. Critical for a site where ad network qualification (Mediavine) depends on passing Core Web Vitals. |
| Google Analytics 4 | -- | Traffic analytics | Industry standard for content sites. Tracks page views, calculator engagement, affiliate click-through rates, and audience segments. Required for Mediavine application. |
### Monetization Infrastructure
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Mediavine / Journey | -- | Display ad management | Premium ad network with $20-50 RPMs in finance niche. Requires 50k sessions/month to qualify. Supports Next.js/React SPAs. Optimizes for CLS automatically. Plan ad slot containers from day one even before qualifying. |
| Custom affiliate module | -- | Affiliate link management | Build a simple internal system: a JSON/YAML config of affiliate links with UTM parameters, nofollow attributes, and disclosure flags. No need for third-party affiliate tracking SaaS at this stage. Track clicks via GA4 events. Graduate to LinkJolt or similar only if managing 100+ affiliate partners. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + `eslint-config-next` | Linting | Next.js 16 ships `next lint` with built-in rules. Add `eslint-plugin-jsx-a11y` for accessibility (critical for financial tools -- ADA compliance). |
| Prettier | Code formatting | Consistent formatting across MDX content files and TypeScript. Use `prettier-plugin-tailwindcss` for class sorting. |
| Turbopack | Dev server bundler | Stable in Next.js 16, used by default. No configuration needed. 400% faster dev startup than Webpack. |
| sharp | Image optimization | Next.js `<Image>` component uses sharp for server-side image optimization. Install explicitly for production builds. |
| Playwright | E2E testing | Test calculator flows end-to-end: input values, verify output, check URL state persistence. Financial calculators must produce correct results -- bugs are trust-destroying in YMYL content. |
| Vitest | Unit testing | Fast, Vite-native test runner. Unit test calculator math functions (amortization formulas, compound interest, tax brackets) independently of React components. |
## Installation
# Core framework
# Content layer
# UI components (initialize shadcn/ui, then add components as needed)
# Charts and visualization
# Forms and validation
# URL state management
# Animations
# SEO and structured data
# Icons (installed by shadcn/ui, but listed for clarity)
# Dev dependencies
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Velite (local MDX) | Sanity CMS | Use Sanity if you hire a content team that needs a visual editing interface and real-time collaboration. Solo/small team writing MDX in VS Code does not need a headless CMS. Sanity adds hosting costs, API latency, and vendor dependency. |
| Velite (local MDX) | Contentlayer | Do not use. Contentlayer is abandoned (last commit 2023). Velite is its spiritual successor with active maintenance and Zod-native schemas. |
| Recharts | Nivo | Use Nivo if you need highly stylized, pre-themed chart types (radar, waffle, sunburst). For standard line/bar/area charts in calculators, Recharts is simpler and sufficient. |
| Recharts | Visx | Use Visx only if you need fully custom D3-level chart primitives. Steep learning curve, no pre-built chart components. Overkill for financial calculators. |
| Vercel | Coolify on Hetzner VPS | Use Coolify self-hosting if Vercel bills exceed $100/month consistently (likely at 200k+ sessions/month). Save 80% on hosting but absorb DevOps overhead. Not worth it until revenue justifies the time cost. |
| Vercel | Netlify | Use Netlify if you need the OpenNext adapter for vendor-neutral deployment. Vercel is still the path of least resistance for Next.js. |
| nuqs | Manual `useSearchParams` | Never. Manual search params management is error-prone, lacks type safety, and requires boilerplate for serialization/deserialization. nuqs solves this in 6 kB. |
| shadcn/ui | Radix UI directly | Use raw Radix only if shadcn/ui's opinionated Tailwind styling conflicts with a custom design system. For most projects, shadcn/ui saves weeks of component development. |
| Custom affiliate module | LinkJolt / Rewardful | Use a third-party affiliate platform only when managing 100+ affiliate partners or needing sub-ID tracking at scale. A JSON config with GA4 event tracking is sufficient for launch. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| WordPress | Slow, plugin-heavy, PHP ecosystem, poor developer experience, security surface area. Financial content sites on WP are stuck in 2015. | Next.js + MDX. You get SSG performance, React interactivity, and full control. |
| Gatsby | Effectively dead. Acquired by Netlify, minimal updates. Build times scale poorly with content volume. | Next.js. Active development, Vercel backing, ISR for incremental builds. |
| `next-seo` package | Unnecessary with Next.js 16. The built-in Metadata API and `generateMetadata()` handle everything `next-seo` does, natively. | Next.js Metadata API (`metadata` export, `generateMetadata()` function). |
| `next-sitemap` package | Unnecessary with Next.js 16. Native `sitemap.ts` and `robots.ts` files are simpler and more maintainable. | Built-in `app/sitemap.ts` and `app/robots.ts`. |
| Contentlayer | Abandoned. Last meaningful update was 2023. Known compatibility issues with newer Next.js versions. | Velite. Same concept (MDX to typed data layer), actively maintained, Zod-native. |
| Chart.js / react-chartjs-2 | Imperative API wrapped in React. Canvas-based (not SSR-friendly without workarounds). Less composable than Recharts. | Recharts. Declarative React components, SVG-based, SSR-compatible. |
| D3.js directly | Fights React's rendering model. DOM manipulation conflicts with React's virtual DOM. Massive learning curve for simple charts. | Recharts (uses D3 internally but exposes React components). |
| Zustand / Redux | Global state management is overkill for a content site with calculators. Calculator state belongs in URL params (shareable, bookmarkable, SEO-crawlable). | nuqs for URL state. React state (`useState`) for ephemeral UI state. |
| Material UI (MUI) | Heavy bundle size, opinionated "Google Material" aesthetic that does not convey financial trust. Theming is complex. | shadcn/ui + Tailwind CSS. Copy-paste components, full control, lighter bundle. |
| Google AdSense | Low RPMs ($2-5) compared to premium ad networks ($20-50 in finance). No optimization intelligence. Use only as a temporary bridge before qualifying for Mediavine. | Mediavine (after 50k sessions/month). AdSense only as a stopgap in months 1-6. |
## Stack Patterns by Variant
- Use `generateStaticParams()` with ISR to generate pages at build time and revalidate on a schedule
- Store calculator configurations in YAML/JSON files processed by Velite
- Each config file defines: calculator type, input parameters, default values, SEO metadata template
- Velite validates all configs against Zod schemas at build time, catching errors before deployment
- Add Sanity CMS as a headless backend for editorial content (guides, articles)
- Keep calculators and comparison data in local MDX/YAML (developer-managed)
- Use Sanity webhooks to trigger ISR revalidation on content publish
- Deploy to Coolify on a Hetzner CAX21 (4 vCPU, 8 GB RAM, ~$7/month)
- Use Cloudflare CDN in front for global edge caching
- Total cost: ~$15/month vs $100+ on Vercel Pro with overages
- Trade-off: you manage the server, SSL, and deployment pipeline
- Use Next.js built-in i18n routing (`app/[locale]/`)
- Content files organized as `content/en/`, `content/es/`, etc.
- Velite processes all locales into typed collections
- Do not use `next-i18next` -- it's a Pages Router library. Use `next-intl` for App Router.
## Version Compatibility
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.2 | React 19.2, TypeScript 5.8 | Requires React 19. Turbopack is the default bundler. |
| Tailwind CSS 4.2 | Next.js 16 via `@tailwindcss/postcss` | CSS-first config. No `tailwind.config.js` needed. Auto-scans project for classes. |
| shadcn/ui CLI v4 | Tailwind CSS 4, Next.js 16, React 19 | Supports both Radix and Base UI primitives. Tailwind v4 mode is the default. |
| Velite 0.3 | Next.js 16, MDX 3 | Framework-agnostic output. Configure via `velite.config.ts` at project root. |
| Recharts 3.8 | React 17/18/19 | Works with React 19. SVG-based, SSR-compatible. |
| Zod 4.3 | TypeScript 5.5+ | 14x faster than Zod 3. New `@zod/mini` available (1.9 KB) for client-only validation if bundle size is critical. |
| react-hook-form 7.72 | React 19, Zod 4 via `@hookform/resolvers` | Works with React 19 `useActionState`. |
| nuqs | Next.js >=14.2 | Supports App Router and Pages Router. Works with React Server Components. |
| Motion 12.38 | React 19 | Import from `motion/react` (not `framer-motion`). Improved layout transitions under React 19 concurrent rendering. |
| next-mdx-remote 6.0 | Next.js 16, React 19, MDX 3 | Use `next-mdx-remote/rsc` for Server Components. Async component -- must render on server. |
| schema-dts 1.1 | TypeScript 5.x | Type-only package. Zero runtime cost. |
## Sources
- [Next.js 16 release blog](https://nextjs.org/blog/next-16) -- Confirmed v16 features: stable Turbopack, React Compiler, `use cache` -- HIGH confidence
- [Next.js 16.2 release blog](https://nextjs.org/blog/next-16-2) -- Latest version 16.2.1 confirmed, 400% faster dev startup -- HIGH confidence
- [Tailwind CSS v4.0 release](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, performance improvements -- HIGH confidence
- [Zod v4 InfoQ coverage](https://www.infoq.com/news/2025/08/zod-v4-available/) -- 14x faster parsing, Zod Mini -- HIGH confidence
- [Velite GitHub](https://github.com/zce/velite) -- v0.3.1, Zod-native, 1000+ doc performance -- MEDIUM confidence (pre-1.0 library)
- [Recharts npm](https://www.npmjs.com/package/recharts) -- v3.8.0, React 19 compatible -- HIGH confidence
- [shadcn/ui CLI v4 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) -- March 2026 release, Tailwind v4 support -- HIGH confidence
- [Motion npm](https://www.npmjs.com/package/motion) -- v12.38.0, import from `motion/react` -- HIGH confidence
- [nuqs at React Advanced 2025](https://www.infoq.com/news/2025/12/nuqs-react-advanced/) -- Type-safe URL state, production usage at Vercel/Sentry -- HIGH confidence
- [next-mdx-remote npm](https://www.npmjs.com/package/next-mdx-remote) -- v6.0.0, RSC support -- HIGH confidence
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) -- v1.1, 100k+ weekly downloads -- HIGH confidence
- [React 19.2 release](https://react.dev/blog/2025/10/01/react-19-2) -- v19.2.4 latest stable -- HIGH confidence
- [TypeScript 5.8 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/) -- v5.8.3 latest -- HIGH confidence
- [Mediavine Next.js integration guide](https://gpacalculators.net/guides/journey-mediavine-nextjs-implementation-guide/) -- Next.js 15 integration documented, CLS optimization -- MEDIUM confidence (community source)
- [Vercel pricing comparison](https://massivegrid.com/blog/vercel-vs-self-hosted-coolify-cost-comparison/) -- Cost analysis at scale -- MEDIUM confidence
- [NerdWallet tech stack](https://stackshare.io/nerdwallet/nerdwallet) -- React, TypeScript, AWS -- MEDIUM confidence (external analysis)
- [Programmatic SEO in Next.js](https://practicalprogrammatic.com/blog/programmatic-seo-in-nextjs) -- SSG + ISR pattern for scale -- HIGH confidence
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

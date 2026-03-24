# Architecture Research

**Domain:** Financial literacy / calculator content website
**Researched:** 2026-03-24
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Layout   │  │   SEO    │  │  Ad Slots    │  │  Affiliate   │   │
│  │  Shell    │  │ Metadata │  │ (Mediavine)  │  │  Disclosure  │   │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  └──────┬───────┘   │
│       │              │               │                 │           │
├───────┴──────────────┴───────────────┴─────────────────┴───────────┤
│                      PAGE LAYER (Routes)                           │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Life-Stage │  │ Calculator │  │ Guide /  │  │ Comparison   │   │
│  │ Hub Pages  │  │   Pages    │  │ Article  │  │   Pages      │   │
│  └─────┬──────┘  └─────┬──────┘  └────┬─────┘  └──────┬───────┘   │
│        │               │              │               │           │
├────────┴───────────────┴──────────────┴───────────────┴───────────┤
│                    COMPONENT LAYER                                 │
│  ┌────────────┐  ┌─────────────────┐  ┌───────────────────────┐   │
│  │ Calculator │  │ Content Render  │  │  Product Cards /      │   │
│  │ Engine     │  │ (MDX + Rich)    │  │  Affiliate CTAs       │   │
│  │ (Client)   │  │ (Server)        │  │  (Server + Client)    │   │
│  └─────┬──────┘  └────────┬────────┘  └───────────┬───────────┘   │
│        │                  │                       │               │
├────────┴──────────────────┴───────────────────────┴───────────────┤
│                      DATA LAYER                                    │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────────┐     │
│  │ Calculator    │  │ Content Files │  │ Product / Affiliate│     │
│  │ Definitions   │  │ (MDX + YAML)  │  │ Data (JSON/YAML)   │     │
│  │ (JSON/YAML)   │  │               │  │                    │     │
│  └───────────────┘  └───────────────┘  └────────────────────┘     │
├───────────────────────────────────────────────────────────────────┤
│                    SEO INFRASTRUCTURE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ JSON-LD     │  │ Sitemap     │  │ robots.txt │  │ Internal │  │
│  │ Schema      │  │ Generator   │  │            │  │ Linking  │  │
│  └─────────────┘  └─────────────┘  └────────────┘  └──────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Layout Shell | Global nav, footer, ad container structure, legal disclaimers | Next.js root `layout.tsx` with route group layouts for content vs. tool pages |
| Life-Stage Hub Pages | Pillar pages organizing content by life milestone (Student, Renter, Homebuyer, etc.) | SSG pages linking to spoke content; serve as topical authority anchors |
| Calculator Pages | Interactive financial tools (loan, mortgage, compound interest, etc.) | SSG shell with client-side calculator engine; parameterized for programmatic generation |
| Guide / Article Pages | Educational long-form content with embedded calculators and CTAs | MDX-rendered SSG pages with frontmatter metadata |
| Comparison Pages | Side-by-side financial product comparisons with affiliate links | SSG pages built from product data JSON; high affiliate revenue intent |
| Calculator Engine | Parameterized math engine powering all calculator variants | Shared TypeScript library; pure functions; client component for interactivity |
| Content Renderer | Transforms MDX + frontmatter into rich HTML with embedded components | Server-side MDX compilation with custom component mapping |
| Product Cards / Affiliate CTAs | Display financial product recommendations with tracked affiliate links | Reusable components with disclosure badges; centralized link registry |
| Calculator Definitions | Data files defining each calculator variant (inputs, formulas, defaults, copy) | JSON or YAML files in `content/calculators/`; consumed by `generateStaticParams` |
| Content Files | Guides, articles, hub page content | MDX files with YAML frontmatter in `content/guides/`, `content/hubs/` |
| Product / Affiliate Data | Credit cards, loans, insurance products with affiliate URLs | JSON files in `content/products/`; versioned and auditable |
| JSON-LD Schema | Structured data for rich results (FAQPage, HowTo, FinancialProduct, WebApplication) | Generated per-page in `page.tsx` using `schema-dts` types |
| Sitemap Generator | Dynamic XML sitemap covering all programmatic pages | Next.js `sitemap.ts` convention; auto-generates from content + calculator definitions |
| Internal Linking Engine | Automated contextual cross-links between related content | Utility that resolves related content based on life-stage and topic tags |

## Recommended Project Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (nav, footer, ad shell, disclaimers)
│   ├── page.tsx                      # Homepage
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   ├── robots.ts                     # Robots.txt generation
│   │
│   ├── (marketing)/                  # Route group: static marketing pages
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   │
│   ├── (content)/                    # Route group: editorial content
│   │   ├── layout.tsx                # Content layout (sidebar, ToC, related links)
│   │   ├── guides/
│   │   │   └── [slug]/page.tsx       # Individual guide pages (SSG from MDX)
│   │   ├── hubs/
│   │   │   └── [lifestage]/          # Life-stage hub pages
│   │   │       ├── page.tsx          # Hub pillar page
│   │   │       └── [topic]/page.tsx  # Hub spoke pages
│   │   └── compare/
│   │       └── [category]/
│   │           └── [slug]/page.tsx   # Comparison pages (SSG from product data)
│   │
│   ├── (tools)/                      # Route group: interactive calculators
│   │   ├── layout.tsx                # Calculator layout (wider, tool-focused)
│   │   └── calculators/
│   │       └── [type]/
│   │           └── [variant]/page.tsx  # Programmatic calculator pages
│   │
│   └── api/                          # API routes (minimal)
│       └── affiliate/
│           └── click/route.ts        # Affiliate click tracking endpoint
│
├── components/                       # Shared React components
│   ├── ui/                           # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Slider.tsx
│   │   └── Table.tsx
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Breadcrumbs.tsx
│   ├── calculators/                  # Calculator UI components
│   │   ├── CalculatorShell.tsx       # Shared calculator wrapper (inputs + results)
│   │   ├── InputForm.tsx             # Dynamic form from calculator definition
│   │   ├── ResultsDisplay.tsx        # Formatted output with charts
│   │   ├── AmortizationTable.tsx     # Loan/mortgage amortization schedule
│   │   └── ComparisonChart.tsx       # Side-by-side scenario comparison
│   ├── content/                      # Content rendering components
│   │   ├── MDXComponents.tsx         # Custom MDX component mapping
│   │   ├── TableOfContents.tsx
│   │   ├── RelatedContent.tsx
│   │   └── AuthorBox.tsx
│   ├── products/                     # Product/affiliate components
│   │   ├── ProductCard.tsx           # Financial product recommendation card
│   │   ├── ComparisonTable.tsx       # Multi-product comparison table
│   │   └── AffiliateLink.tsx         # Tracked affiliate link with disclosure
│   ├── ads/                          # Ad integration components
│   │   ├── AdSlot.tsx                # Mediavine ad slot with CLS prevention
│   │   └── AdProvider.tsx            # Script loader for ad network
│   └── seo/                          # SEO components
│       ├── JsonLd.tsx                # Reusable JSON-LD renderer
│       ├── PageMeta.tsx              # Shared metadata helper
│       └── Breadcrumbs.tsx           # Schema.org BreadcrumbList
│
├── lib/                              # Core business logic (non-React)
│   ├── calculators/                  # Calculator engine
│   │   ├── engine.ts                 # Core calculation functions (pure math)
│   │   ├── types.ts                  # Calculator definition types
│   │   ├── registry.ts              # Load and index all calculator definitions
│   │   └── formulas/                 # Individual formula modules
│   │       ├── mortgage.ts
│   │       ├── compound-interest.ts
│   │       ├── loan-repayment.ts
│   │       ├── rent-affordability.ts
│   │       ├── tax-estimator.ts
│   │       └── retirement.ts
│   ├── content/                      # Content processing
│   │   ├── mdx.ts                    # MDX compilation utilities
│   │   ├── content-index.ts          # Build content index from filesystem
│   │   └── related.ts               # Related content resolution
│   ├── affiliate/                    # Affiliate link management
│   │   ├── links.ts                  # Centralized affiliate link registry
│   │   ├── disclosure.ts            # FTC disclosure text generation
│   │   └── tracking.ts              # Click tracking utilities
│   ├── seo/                          # SEO utilities
│   │   ├── schema.ts                 # JSON-LD schema generators
│   │   ├── sitemap.ts               # Sitemap data aggregation
│   │   └── metadata.ts              # Page metadata generators
│   └── utils/                        # General utilities
│       ├── format.ts                 # Number/currency formatting
│       └── date.ts                   # Date utilities
│
├── content/                          # Content data files (outside src/app)
│   ├── calculators/                  # Calculator definitions
│   │   ├── _schema.ts               # Zod schema for calculator definitions
│   │   ├── mortgage/
│   │   │   ├── definition.yaml      # Calculator config (inputs, defaults, labels)
│   │   │   └── variants/            # Programmatic page variants
│   │   │       ├── first-time-buyer.yaml
│   │   │       ├── refinance.yaml
│   │   │       └── investment-property.yaml
│   │   ├── loan-repayment/
│   │   │   ├── definition.yaml
│   │   │   └── variants/
│   │   ├── compound-interest/
│   │   │   ├── definition.yaml
│   │   │   └── variants/
│   │   └── ...
│   ├── guides/                       # MDX guide content
│   │   ├── understanding-apr.mdx
│   │   ├── how-credit-scores-work.mdx
│   │   └── ...
│   ├── hubs/                         # Life-stage hub content
│   │   ├── student/
│   │   │   ├── index.mdx             # Hub pillar page content
│   │   │   └── topics/
│   │   │       ├── student-loans.mdx
│   │   │       └── first-credit-card.mdx
│   │   ├── first-home-buyer/
│   │   ├── renter/
│   │   ├── freelancer/
│   │   └── pre-retirement/
│   ├── products/                     # Financial product data
│   │   ├── credit-cards.json
│   │   ├── personal-loans.json
│   │   └── insurance.json
│   └── comparisons/                  # Comparison page data
│       ├── best-student-credit-cards.yaml
│       └── ...
│
└── styles/                           # Global styles
    └── globals.css                   # Tailwind directives + custom tokens
```

### Structure Rationale

- **`src/app/` with route groups:** `(marketing)`, `(content)`, and `(tools)` separate concerns with distinct layouts. Marketing pages get a clean layout. Content pages get sidebar + ToC. Calculator pages get a wider, tool-focused layout. Route groups do not affect URL paths.
- **`src/components/`:** Feature-grouped components (calculators, content, products, ads, seo) rather than flat. Each group is self-contained. UI primitives are shared.
- **`src/lib/`:** Pure business logic with zero React dependencies. Calculator formulas are pure TypeScript functions testable without a browser. Affiliate link registry is centralized for auditability.
- **`content/`:** Sits outside `src/` as a data layer. Calculator definitions in YAML define inputs, defaults, labels, and variant metadata. MDX files contain editorial content. Product JSON contains affiliate data. This separation means content authors can update data without touching application code.
- **Calculator `definition.yaml` + `variants/`:** Each calculator type has a base definition and multiple variants. Variants customize defaults, copy, and SEO metadata for specific audiences (e.g., "first-time buyer mortgage calculator" vs. "refinance calculator"). `generateStaticParams` reads these to build hundreds of pages.

## Architectural Patterns

### Pattern 1: Parameterized Calculator Engine (The Core Moat)

**What:** A single calculator engine that renders different financial tools based on YAML/JSON definitions. One React component, many calculator pages.

**When to use:** Every calculator page on the site. This is the most important architectural decision.

**Trade-offs:** Higher upfront design cost for the definition schema, but massive scaling leverage. Adding a new calculator variant means adding a YAML file, not writing new code.

**Example:**

```typescript
// content/calculators/mortgage/definition.yaml
name: "Mortgage Calculator"
type: mortgage
formula: mortgage
inputs:
  - key: principal
    label: "Home Price"
    type: currency
    default: 300000
    min: 10000
    max: 10000000
  - key: downPayment
    label: "Down Payment"
    type: percentage
    default: 20
  - key: interestRate
    label: "Interest Rate"
    type: percentage
    default: 6.5
    step: 0.125
  - key: termYears
    label: "Loan Term"
    type: select
    options: [15, 20, 30]
    default: 30
outputs:
  - key: monthlyPayment
    label: "Monthly Payment"
    format: currency
  - key: totalInterest
    label: "Total Interest Paid"
    format: currency
  - key: amortizationSchedule
    label: "Amortization Schedule"
    format: table
seo:
  title: "{variant_title} | WalletWaypoint"
  description: "Calculate your {variant_context} with our free mortgage calculator."
  schema: WebApplication
```

```typescript
// content/calculators/mortgage/variants/first-time-buyer.yaml
slug: "first-time-buyer-mortgage-calculator"
title: "First-Time Buyer Mortgage Calculator"
context: "first home mortgage payment"
defaults:
  principal: 250000
  downPayment: 10
  interestRate: 6.75
relatedHub: "first-home-buyer"
relatedGuides:
  - "understanding-apr"
  - "down-payment-strategies"
```

```typescript
// src/app/(tools)/calculators/[type]/[variant]/page.tsx
import { getCalculatorDefinition, getVariant } from '@/lib/calculators/registry';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  const allVariants = await getAllCalculatorVariants();
  return allVariants.map(v => ({ type: v.type, variant: v.slug }));
}

export async function generateMetadata({ params }) {
  const { type, variant } = await params;
  const def = getCalculatorDefinition(type);
  const v = getVariant(type, variant);
  return {
    title: v.seo.title,
    description: v.seo.description,
  };
}

export default async function CalculatorPage({ params }) {
  const { type, variant } = await params;
  const definition = getCalculatorDefinition(type);
  const variantData = getVariant(type, variant);

  return (
    <>
      <JsonLd schema={buildCalculatorSchema(definition, variantData)} />
      <CalculatorShell
        definition={definition}
        variant={variantData}
      />
    </>
  );
}
```

### Pattern 2: Server-Static Shell + Client Interactive Island

**What:** Pages render as static HTML (SSG) with the content, SEO metadata, and surrounding layout fully server-rendered. Interactive calculator widgets hydrate as client components within the static shell.

**When to use:** Every calculator page, every page with interactive elements.

**Trade-offs:** Best of both worlds for SEO (full HTML for crawlers) and UX (instant interactivity). Requires careful boundary between server and client components. The `"use client"` directive must be placed at the calculator component level, not the page level.

**Example:**

```typescript
// src/components/calculators/CalculatorShell.tsx
"use client";

import { useState, useMemo } from 'react';
import { calculate } from '@/lib/calculators/engine';
import type { CalculatorDefinition, CalculatorVariant } from '@/lib/calculators/types';

export function CalculatorShell({
  definition,
  variant,
}: {
  definition: CalculatorDefinition;
  variant: CalculatorVariant;
}) {
  const [inputs, setInputs] = useState(
    mergeDefaults(definition.inputs, variant.defaults)
  );

  const results = useMemo(
    () => calculate(definition.formula, inputs),
    [definition.formula, inputs]
  );

  return (
    <div>
      <InputForm fields={definition.inputs} values={inputs} onChange={setInputs} />
      <ResultsDisplay outputs={definition.outputs} results={results} />
    </div>
  );
}
```

### Pattern 3: Hub-and-Spoke Content Architecture

**What:** Each life-stage hub (pillar page) links to related spoke pages (guides, calculators, comparisons). Spokes link back to the hub and cross-link to sibling spokes. This creates a dense internal linking network that builds topical authority for SEO.

**When to use:** All content organization. This is the information architecture pattern, not just a technical pattern.

**Trade-offs:** Requires upfront taxonomy design. Content must be tagged with life-stage and topic metadata. Pays off enormously for SEO authority building over time.

**Example:**

```
/hubs/first-home-buyer/                     (Hub pillar page)
    ├── /hubs/first-home-buyer/down-payments    (Spoke: guide)
    ├── /hubs/first-home-buyer/closing-costs    (Spoke: guide)
    ├── /calculators/mortgage/first-time-buyer  (Spoke: calculator)
    ├── /compare/best-first-time-buyer-mortgages (Spoke: comparison)
    └── /guides/understanding-apr                (Cross-linked spoke)
```

```typescript
// content/hubs/first-home-buyer/index.mdx frontmatter
---
title: "First-Time Home Buyer Guide"
lifestage: first-home-buyer
description: "Everything you need to know about buying your first home."
spokes:
  calculators:
    - mortgage/first-time-buyer
    - mortgage/affordability
  guides:
    - down-payment-strategies
    - understanding-apr
    - closing-costs-explained
  comparisons:
    - best-first-time-buyer-mortgages
---
```

### Pattern 4: Centralized Affiliate Link Registry

**What:** All affiliate links live in a single registry (JSON/YAML). Components reference products by ID, not raw URLs. The registry stores partner name, URL, disclosure requirements, and link expiration dates. Click tracking happens through a lightweight API route.

**When to use:** Every product recommendation, comparison page, and CTA.

**Trade-offs:** More setup than inline links, but essential for compliance (FTC disclosure), auditing (which links are active), and monetization tracking. When an affiliate program changes URLs or terms, you update one file.

**Example:**

```typescript
// content/products/credit-cards.json
{
  "products": [
    {
      "id": "chase-freedom-unlimited",
      "name": "Chase Freedom Unlimited",
      "partner": "chase",
      "affiliateUrl": "https://www.chase.com/aff?ref=walletwaypoint",
      "disclosureRequired": true,
      "disclosureText": "We earn a commission if you apply through this link.",
      "category": "credit-card",
      "tags": ["cashback", "no-annual-fee", "student-friendly"],
      "lifestages": ["student", "first-home-buyer"],
      "lastVerified": "2026-03-01",
      "expiresAt": "2026-12-31"
    }
  ]
}
```

```typescript
// src/lib/affiliate/links.ts
import productsData from '@/content/products/credit-cards.json';

export function getAffiliateLink(productId: string) {
  const product = productsData.products.find(p => p.id === productId);
  if (!product || new Date(product.expiresAt) < new Date()) return null;
  return {
    url: `/api/affiliate/click?product=${productId}`,
    disclosure: product.disclosureText,
    name: product.name,
  };
}
```

### Pattern 5: Ad-Ready Layout with CLS Prevention

**What:** Pre-allocate vertical space for ad slots in the layout using minimum height containers. Ads load asynchronously via the Mediavine script after the page is interactive, filling pre-sized slots without causing layout shift.

**When to use:** All content and calculator pages (not marketing/legal pages).

**Trade-offs:** Requires careful CSS. Pre-allocated space may show empty briefly before ads fill. Worth it because CLS > 0.1 tanks SEO rankings, and Mediavine requires passing Core Web Vitals.

**Example:**

```typescript
// src/components/ads/AdSlot.tsx
"use client";

export function AdSlot({
  id,
  size = "rectangle",
}: {
  id: string;
  size?: "rectangle" | "leaderboard" | "sidebar";
}) {
  const heights: Record<string, string> = {
    rectangle: "min-h-[250px]",
    leaderboard: "min-h-[90px]",
    sidebar: "min-h-[600px]",
  };

  return (
    <div
      id={id}
      className={`${heights[size]} w-full bg-transparent`}
      data-ad-slot={id}
      aria-hidden="true"
    />
  );
}
```

```typescript
// src/components/ads/AdProvider.tsx
"use client";

import Script from 'next/script';

export function AdProvider({ siteId }: { siteId: string }) {
  return (
    <Script
      src={`https://scripts.mediavine.com/tags/${siteId}.js`}
      strategy="afterInteractive"
    />
  );
}
```

## Data Flow

### Page Build Flow (SSG at build time)

```
Content Files (YAML/MDX/JSON)
    |
    v
generateStaticParams()              ── reads calculator definitions, content index
    |
    v
generateMetadata()                  ── builds title, description, OpenGraph from data
    |
    v
Page Component (Server)             ── reads content, renders MDX, builds JSON-LD
    |
    v
Static HTML + JSON-LD + Metadata    ── output to .next/static/
    |
    v
CDN Edge                            ── served globally, < 100ms TTFB
```

### Calculator Interaction Flow (Client-side at runtime)

```
User adjusts input (slider/field)
    |
    v
React state update (useState)
    |
    v
Calculator engine (useMemo)         ── pure function, re-calculates instantly
    |
    v
Results render                      ── formatted currency, charts, amortization table
    |
    v
(No server round-trip needed)       ── all calculation is client-side
```

### Affiliate Click Flow

```
User clicks product CTA
    |
    v
AffiliateLink component             ── renders tracked link
    |
    v
/api/affiliate/click?product=X      ── lightweight API route
    |
    v
Log click (analytics/DB)            ── record product, page, timestamp
    |
    v
302 redirect to affiliate URL       ── user lands on partner site
```

### Content Authoring Flow

```
Author creates/edits MDX file
    |
    v
Frontmatter defines metadata        ── title, lifestage, tags, related content
    |
    v
next build                          ── MDX compiled to React, pages generated
    |
    v
Content index rebuilt                ── related content links resolved
    |
    v
Sitemap regenerated                 ── new pages automatically included
    |
    v
Deploy to Vercel/CDN                ── incremental builds if using ISR
```

### Key Data Flows

1. **Calculator definition to page:** YAML definition files are read at build time by `generateStaticParams` and the page component. The definition drives both the UI (what inputs to show) and the calculation (what formula to run). Data flows one direction: file to page.
2. **Hub-spoke linking:** Each hub's frontmatter lists its spoke content. At build time, the content index resolves these references into actual URLs and titles. The `RelatedContent` component renders contextual links. Links flow bidirectionally: hub references spokes, spoke frontmatter references its parent hub.
3. **Product data to affiliate components:** Product JSON is the single source of truth. Product cards, comparison tables, and inline CTAs all resolve products by ID from this registry. The affiliate click API route redirects using the URL from the same registry.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 pages | SSG everything. Build takes seconds. Content in local YAML/MDX files. No database needed. Deploy to Vercel free tier. |
| 100-1,000 pages | SSG still works fine. Build may take 1-3 minutes. Consider ISR (Incremental Static Regeneration) for pages that update frequently (product data, rates). Sitemap may need splitting at 50K URL limit. |
| 1,000-10,000 pages | Build times become a concern (5-15 min). Move to ISR with on-demand revalidation for most pages. Keep only high-traffic pages in SSG. Consider a headless CMS (Sanity, Keystatic) for content management instead of raw MDX files. Product data might move to a database. |
| 10,000+ pages | Requires serious infra. ISR mandatory. Content stored in a CMS or database, not filesystem. Sitemap index with multiple sitemap files. Consider edge caching strategies. Build may need parallelization. |

### Scaling Priorities

1. **First bottleneck: Build time.** As calculator variants and content multiply, `next build` slows down. Mitigation: ISR with `revalidate` for content pages; keep calculator definitions lean; use `dynamicParams = true` to allow on-demand generation.
2. **Second bottleneck: Content management.** Once you have 200+ MDX files, filesystem-based content becomes unwieldy. Mitigation: Move to Keystatic (git-based CMS with a UI) or Sanity (if team grows). The architecture above supports this migration because content is already separated from application code.
3. **Third bottleneck: Product data staleness.** Affiliate URLs change, products get discontinued, rates update. Mitigation: Product JSON includes `lastVerified` and `expiresAt` fields. Build a script that flags stale products. Eventually, source product data from partner APIs with ISR.

## Anti-Patterns

### Anti-Pattern 1: Client-Side-Only Calculator Pages

**What people do:** Build the entire calculator page as a client component, including the surrounding content, SEO text, and metadata.
**Why it's wrong:** Search engines see a blank page or minimal content. Core Web Vitals suffer (large JS bundle, slow LCP). The entire reason calculators are a moat is that they rank well -- but only if the content is crawlable.
**Do this instead:** SSG the page shell (title, description, educational content, JSON-LD, related links) as a server component. Only the interactive calculator widget itself should be a client component marked with `"use client"`.

### Anti-Pattern 2: Hardcoding Calculator Logic Per Page

**What people do:** Create a separate React component for each calculator type, duplicating input handling, result formatting, and layout logic.
**Why it's wrong:** Prevents programmatic scaling. Adding 50 mortgage calculator variants means duplicating code 50 times. Bugs in one calculator are not fixed in others.
**Do this instead:** Use the parameterized calculator engine pattern. One `CalculatorShell` component, one `engine.ts` with formula functions, many YAML definition files.

### Anti-Pattern 3: Inline Affiliate Links

**What people do:** Hardcode affiliate URLs directly in MDX content or component props.
**Why it's wrong:** When a partner changes their affiliate URL or terms, you must search-and-replace across hundreds of files. No auditing of which links are active. No tracking. FTC disclosure becomes inconsistent.
**Do this instead:** Centralized affiliate registry. Components reference products by ID. Links are resolved at render time from the registry.

### Anti-Pattern 4: Ad Slots Without Reserved Space

**What people do:** Let Mediavine inject ads dynamically without pre-allocated space in the layout.
**Why it's wrong:** Causes Cumulative Layout Shift (CLS). Content jumps around as ads load. CLS > 0.1 fails Core Web Vitals, which tanks rankings. Mediavine requires CWV compliance.
**Do this instead:** Pre-allocate `min-height` for every ad slot position. Use the `AdSlot` component with size presets. Accept brief empty space as the cost of stable layout.

### Anti-Pattern 5: Using Contentlayer for Content Processing

**What people do:** Adopt Contentlayer because of its popularity in Next.js blog tutorials.
**Why it's wrong:** Contentlayer is abandoned/unmaintained since Stackbit was acquired by Netlify. No active development, no bug fixes, no Next.js 15+ compatibility guarantees.
**Do this instead:** Use Content Collections (actively maintained, Zod-based, Next.js App Router compatible) or Velite (similar feature set, commercially backed). Alternatively, write simple custom content loading utilities with `fs` + `gray-matter` + `next-mdx-remote` -- it is less code than you think for a content site of this scale.

### Anti-Pattern 6: Flat URL Structure Without Topical Hierarchy

**What people do:** Put all content at `/blog/slug` or `/calculators/slug` without any topical grouping.
**Why it's wrong:** Destroys the hub-and-spoke SEO benefit. Search engines cannot infer topical relationships from URL structure. Internal linking becomes ad hoc instead of systematic.
**Do this instead:** Use `/hubs/[lifestage]/[topic]` for content, `/calculators/[type]/[variant]` for tools, and `/compare/[category]/[slug]` for comparisons. URL structure mirrors the information architecture.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Mediavine / Raptiv | `<Script strategy="afterInteractive">` in root layout; ad slots with `min-height` | Requires 50K sessions/month to qualify. Build ad-ready from day one so no layout refactoring later. |
| Affiliate Networks (Commission Junction, Impact, etc.) | Centralized product registry JSON; API route for click tracking + redirect | Each network has different tracking params. Abstract behind the registry. |
| Vercel (hosting) | Standard Next.js deployment; Edge Network for SSG; ISR for dynamic content | Free tier covers initial phase. Pro tier ($20/mo) for team features and analytics. |
| Google Search Console | Sitemap submission; structured data monitoring; Core Web Vitals reporting | Submit sitemap.xml after every deploy. Monitor rich result eligibility. |
| Analytics (Plausible or Umami) | Lightweight script tag; privacy-respecting; no cookie consent banner needed | Avoid Google Analytics -- heavy, requires cookie consent, reduces trust for finance audience. |
| Schema Validation | Build-time validation of JSON-LD against schema.org specs | Use `schema-dts` TypeScript types for compile-time checking. Validate with Google Rich Results Test post-deploy. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page routes <-> Content data | `generateStaticParams` + direct file reads at build time | No runtime API calls for content. Everything is resolved at build. |
| Calculator page (server) <-> Calculator widget (client) | Props (definition + variant passed as serializable data) | Keep the serialization boundary clean. Definition objects must be JSON-serializable (no functions, no classes). |
| Content components <-> Affiliate registry | Import from `@/lib/affiliate/links.ts` | Components never construct affiliate URLs directly. Always go through the registry. |
| Ad slots <-> Mediavine script | DOM-based (Mediavine finds slots by `data-ad-slot` attribute) | No React-level integration. Mediavine operates on the DOM after hydration. |
| Content <-> SEO infrastructure | Each page's `generateMetadata` + inline `<script type="application/ld+json">` | Metadata and schema are co-located with the page, not in a global config. |

## Build Order (Dependency Graph)

The following order respects dependencies -- each layer depends on the ones above it.

```
Phase 1: Foundation
  ├── Project scaffolding (Next.js App Router + TypeScript + Tailwind)
  ├── Design system primitives (UI components)
  └── Root layout (Header, Footer, nav structure)

Phase 2: Data Layer
  ├── Calculator definition schema (TypeScript types + Zod validation)
  ├── Content file structure (MDX + frontmatter conventions)
  ├── Product data schema (affiliate registry format)
  └── Content loading utilities (fs + gray-matter + MDX compilation)

Phase 3: Calculator Engine
  ├── Formula library (pure TypeScript math functions)
  ├── Calculator engine (maps definition -> formula -> results)
  ├── CalculatorShell client component (dynamic form + results display)
  └── First calculator working end-to-end (mortgage as proof of concept)

Phase 4: Content System
  ├── MDX rendering pipeline (custom components, syntax highlighting)
  ├── Guide pages with generateStaticParams
  ├── Hub pillar pages
  └── Internal linking / related content resolution

Phase 5: Programmatic Scaling
  ├── Calculator variant system (YAML variants -> generateStaticParams)
  ├── Comparison page generation from product data
  ├── SEO infrastructure (JSON-LD, sitemap, robots, metadata templates)
  └── Hub spoke pages

Phase 6: Monetization Layer
  ├── Affiliate link registry + AffiliateLink component
  ├── Click tracking API route
  ├── Ad slot components with CLS prevention
  ├── Mediavine script integration
  └── FTC disclosure components

Phase 7: Polish & Scale
  ├── Analytics integration
  ├── Performance optimization (bundle analysis, image optimization)
  ├── Accessibility audit
  └── Content expansion tooling (scripts to scaffold new calculators/guides)
```

**Dependency rationale:**
- Phase 2 depends on Phase 1 (need project structure before defining data schemas)
- Phase 3 depends on Phase 2 (calculator engine needs definition types)
- Phase 4 depends on Phase 2 (content rendering needs content loading utilities)
- Phase 3 and 4 can partially overlap (independent concerns once Phase 2 is done)
- Phase 5 depends on Phase 3 + 4 (scaling requires working calculator + content systems)
- Phase 6 depends on Phase 5 (monetization goes on top of working pages)
- Phase 7 depends on Phase 6 (polish after core is functional)

## Sources

- [Next.js App Router Documentation - Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) -- Official, verified 2026-03-20
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- Official, verified 2026-03-20
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- Official
- [Next.js Partial Prerendering](https://nextjs.org/docs/15/app/getting-started/partial-prerendering) -- Official
- [NerdWallet Tech Stack](https://stackshare.io/nerdwallet/nerdwallet) -- NerdWallet uses React, Node, Python, PostgreSQL microservices at scale
- [Mediavine CLS Optimization](https://www.mediavine.com/blog/cls-solving-for-cumulative-layout-shift/) -- Official Mediavine guidance
- [Monetize Next.js with Journey by Mediavine](https://softzar.com/monetize-your-next-js-website-with-journey-by-mediavine/) -- Integration guide
- [Programmatic SEO in Next.js](https://practicalprogrammatic.com/blog/programmatic-seo-in-nextjs) -- Pattern reference
- [pSEO Case Study: 500+ Static Pages](https://dev.to/trinc4/how-i-built-a-pseo-app-with-nextjs-14-generating-500-static-pages-case-study-522e) -- Real-world example
- [Hub-and-Spoke SEO Model](https://www.seo-kreativ.de/en/blog/hub-and-spoke-model/) -- Content architecture pattern
- [Website Structure for SEO: Practical Blueprint (2026)](https://library.linkbot.com/website-structure-seo/) -- SEO architecture
- [Contentlayer Abandoned - Alternatives](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives) -- Content Collections and Velite as replacements
- [Migrating from Contentlayer to Content Collections](https://dub.co/blog/content-collections) -- Migration guidance
- [Affiliate Link Disclosures: 2025 Compliance Guide](https://impact.com/influencer/affiliate-link-disclosure/) -- FTC compliance
- [Affiliate Marketing Compliance for Fintechs](https://www.fintelconnect.com/blog/affiliate-marketing-compliance/) -- Finance-specific compliance

---
*Architecture research for: WalletWaypoint (financial literacy / calculator content site)*
*Researched: 2026-03-24*

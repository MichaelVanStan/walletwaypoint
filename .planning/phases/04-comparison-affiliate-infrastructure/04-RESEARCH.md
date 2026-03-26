# Phase 4: Comparison & Affiliate Infrastructure - Research

**Researched:** 2026-03-26
**Domain:** Product comparison tables, affiliate link management, FTC/CFPB compliance, GA4 event tracking
**Confidence:** HIGH

## Summary

Phase 4 builds product comparison tables for 4 financial product categories (credit cards, personal loans, savings accounts/CDs, insurance) with sortable columns, category-specific filters, and mobile-responsive stacked cards. It also implements a centralized affiliate link registry using YAML/Velite, automatic FTC-compliant disclosure injection, GA4 click tracking, and a "How We Rank Products" methodology page.

The existing codebase provides strong foundations: Velite + Zod content pipeline for YAML data, shadcn/ui Table/Card/Badge/Select components, nuqs for URL state management, GA4 via `@next/third-parties/google` with `sendGAEvent`, and an `AffiliateDisclosure` component ready to reuse. The primary implementation work is defining product data schemas in Velite, building sort/filter client components that sync state to the URL, and authoring real product data for ~40-60 products across 4 categories.

**Primary recommendation:** Follow the established Velite YAML collection pattern (as used by calculators, guides, hubs, glossary) to define a `products` collection with per-category YAML files validated by Zod schemas at build time. Use `sendGAEvent` from `@next/third-parties/google` for affiliate click tracking. Use nuqs `parseAsStringLiteral` for sort/filter URL state. Use schema-dts `FinancialProduct` for JSON-LD structured data.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Launch with 4 product categories: credit cards, personal loans, savings accounts/CDs, and insurance (auto/renters).
- **D-02:** Use real product data from day one -- actual products with real rates, terms, and attributes. No placeholder/fictional products.
- **D-03:** Target 10-15 products per category (~40-60 total products across 4 categories).
- **D-04:** Sortable data table layout -- dense table with sortable column headers, row highlighting, and sticky first column for product names. NerdWallet-style.
- **D-05:** Category-specific filter dropdowns above each table (credit cards: rewards type, credit score range, annual fee; loans: amount, term, credit score; etc.).
- **D-06:** Mobile responsive via stacked cards -- each product becomes a card showing all attributes, sortable via dropdown above cards. No horizontal scrolling.
- **D-07:** Editorial "Best For" badges -- hand-curated in YAML data, 2-3 per category. Clearly labeled as "Our Pick" editorial selections, not objective rankings.
- **D-08:** YAML per product category (e.g., `content/products/credit-cards.yaml`). Each product entry includes affiliate URL, UTM params, disclosure flag. Velite validates with Zod schema. Consistent with existing calculator/hub YAML content pattern.
- **D-09:** Affiliate disclosure placed above the fold, before the comparison table. Reuses existing `AffiliateDisclosure` component from `src/components/trust/affiliate-disclosure.tsx`. Always visible, never hidden. FTC-compliant positioning.
- **D-10:** GA4 custom events for click tracking -- fire `sendGAEvent` on each affiliate link click with product ID, category, and table position. Zero additional infrastructure since GA4 integration already exists in code (conditionally renders when `NEXT_PUBLIC_GA_ID` env var is set).
- **D-11:** Detailed transparency page at `/how-we-rank` (~1500 words). Explains criteria per product category, ranking approach, independence from affiliate relationships, data sources, and update frequency. CFPB-aligned. Builds YMYL trust.
- **D-12:** Consumer benefit first ranking criteria -- rank by value to consumer (total cost, rewards value, fees, eligibility breadth). Explicitly state that commission rates do NOT influence rankings.

### Claude's Discretion
- Product data schema attributes per category (exact fields beyond those in requirements)
- Table component architecture (shadcn Table vs custom)
- Filter component implementation details
- GA4 event naming conventions and parameter structure
- How We Rank page content structure and section organization

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AFFIL-01 | Comparison table component with sortable columns for financial products | shadcn Table component exists, sort state via nuqs `parseAsStringLiteral`, `aria-sort` attributes for accessibility. Dual render: table on lg+, stacked cards on mobile. |
| AFFIL-02 | Product data schema for credit cards (APR, annual fee, rewards, credit score range) | Velite collection with Zod schema. Schema-dts `CreditCard` type for JSON-LD. YAML file at `content/products/credit-cards.yaml`. |
| AFFIL-03 | Product data schema for loans (rates, terms, eligibility) | Velite collection with Zod schema. Schema-dts `LoanOrCredit` type for JSON-LD. YAML file at `content/products/personal-loans.yaml`. |
| AFFIL-04 | Centralized affiliate link registry with automatic disclosure injection | YAML product files serve as the registry. `AffiliateDisclosure` component already exists. Velite validates affiliate URLs and disclosure flags at build time. |
| AFFIL-05 | CFPB-compliant product ranking methodology (consumer benefit, not commission) | CFPB Circular 2024-01 guidance on preferencing/steering. Methodology page at `/how-we-rank` with per-category ranking criteria. |
| AFFIL-06 | Affiliate link click tracking for revenue attribution | `sendGAEvent` from `@next/third-parties/google`. Custom event `affiliate_click` with product_id, category, position, product_name parameters. |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16.2 with React 19.2, TypeScript, Tailwind CSS 4.2, Velite, Zod 4.3
- **SEO**: Must be SSR/SSG for crawlability; no client-only rendering for content pages
- **Performance**: Core Web Vitals must pass (LCP < 2.5s, CLS < 0.1)
- **Content**: Must be genuinely useful; E-E-A-T compliance for YMYL content
- **Legal**: Financial disclaimers required; "not financial advice" disclosures; affiliate disclosure compliance (FTC)
- **Monetization**: Mediavine/Raptiv-ready (clean ad slots, no layout shift from ads)
- **Avoid**: Zustand/Redux for state (use nuqs for URL state), next-seo/next-sitemap (use built-in), Chart.js, MUI
- **Use**: shadcn/ui for components, nuqs for URL state, Velite for content, schema-dts for JSON-LD
- **Pattern**: Base UI (not Radix) primitives via shadcn/ui base-nova preset; `useRender` pattern; no `asChild`

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Installed Version | Purpose | Why Standard |
|---------|-------------------|---------|--------------|
| Velite | 0.3.1 | YAML content -> typed data layer | Existing pattern for calculators, guides, hubs, glossary. Zod schema validation at build time. |
| Zod | 4.3.6 | Schema validation for product data | Already used for all Velite collections. Validates product attributes, affiliate URLs, filter values. |
| nuqs | 2.8.9 | URL state for sort/filter params | Existing pattern for calculator state. `parseAsStringLiteral` for sort column/direction, filter values. |
| schema-dts | 2.0.0 | JSON-LD TypeScript types | Existing pattern for SEO schemas. `FinancialProduct`, `CreditCard`, `LoanOrCredit` types available. |
| shadcn/ui (Table, Card, Badge, Select, Button) | CLI v4 | UI components | All needed components exist from Phases 1-3. No new components to install. |
| @next/third-parties | 16.2.1 | GA4 event tracking | `sendGAEvent` for affiliate click tracking. Already integrated in layout. |
| Lucide React | 1.0.1 | Icons | `ArrowUpDown`, `ArrowUp`, `ArrowDown`, `Star`, `ExternalLink` for sort indicators and badges. |

### No New Packages Required

Phase 4 requires zero new npm dependencies. Everything builds on the existing installed stack. This is verified by examining package.json and the feature requirements.

## Architecture Patterns

### Recommended Project Structure

```
content/
  products/
    credit-cards.yaml          # 10-15 real credit card products
    personal-loans.yaml        # 10-15 real personal loan products
    savings-accounts.yaml      # 10-15 real savings/CD products
    insurance.yaml             # 10-15 real auto/renters insurance products

src/
  app/
    compare/
      page.tsx                 # Comparison index (replace "Coming Soon")
      [category]/
        page.tsx               # SSG category comparison page
      layout.tsx               # DisclaimerBanner + AffiliateDisclosure layout
    how-we-rank/
      page.tsx                 # Methodology page (~1500 words)

  components/
    compare/
      comparison-table.tsx     # Desktop sortable data table
      product-card.tsx         # Mobile stacked product card
      comparison-filters.tsx   # Category-specific filter bar with Select dropdowns
      sort-header.tsx          # Sortable column header cell
      affiliate-link.tsx       # CTA button with GA4 click tracking
      best-for-badge.tsx       # "Our Pick: {label}" badge
      product-count.tsx        # "Showing N products" indicator
    seo/
      product-schema.tsx       # FinancialProduct JSON-LD

  lib/
    compare/
      product-types.ts         # TypeScript types for product data
      filter-config.ts         # Category-specific filter configurations
      sort-utils.ts            # Sorting logic for product arrays
      url-params.ts            # nuqs param definitions for sort/filter state

velite.config.ts               # Add products collection to existing config
```

### Pattern 1: Velite Product Collection (mirrors existing calculator/hub pattern)

**What:** Define a `products` collection in `velite.config.ts` with per-category YAML files, each validated by a Zod schema.
**When to use:** For all product data definition.
**How it works in this codebase:**

The existing Velite configuration defines collections like:
```typescript
// Existing pattern from velite.config.ts
const calculators = defineCollection({
  name: 'Calculator',
  pattern: 'calculators/*.yaml',
  schema: s.object({ /* ... */ }),
});
```

Products follow the same pattern:
```typescript
const products = defineCollection({
  name: 'Product',
  pattern: 'products/*.yaml',
  single: false,
  schema: s.object({
    // File-level metadata
    category: s.enum(['credit-cards', 'personal-loans', 'savings-accounts', 'insurance']),
    categoryTitle: s.string(),
    categoryDescription: s.string(),
    lastVerified: s.isodate(),
    products: s.array(productSchema),
  }),
});
```

Each YAML file is one category, containing an array of products. This maps to the D-08 decision: "YAML per product category."

**Confidence:** HIGH -- follows proven codebase pattern used by 4 existing collections.

### Pattern 2: Client-Side Sort/Filter with nuqs URL State

**What:** Sort and filter state managed by nuqs `useQueryStates` with `parseAsStringLiteral` for type-safe URL params.
**When to use:** For the comparison category pages where users interact with sort/filter controls.
**How it works in this codebase:**

The existing calculator pattern uses nuqs in `url-params.ts`:
```typescript
// Existing pattern from src/lib/calculators/url-params.ts
import { parseAsStringLiteral } from 'nuqs';

const sortColumns = ['name', 'apr', 'annual-fee', 'rewards'] as const;
const sortDirections = ['asc', 'desc'] as const;

export const comparisonParams = {
  sort: parseAsStringLiteral(sortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  rewards: parseAsStringLiteral(['all', 'cash-back', 'travel', 'points', 'balance-transfer'] as const)
    .withDefault('all'),
  score: parseAsStringLiteral(['all', 'excellent', 'good', 'fair'] as const)
    .withDefault('all'),
  fee: parseAsStringLiteral(['all', 'no-fee', 'under-100', '100-plus'] as const)
    .withDefault('all'),
};
```

This makes every sort/filter state bookmarkable and shareable via URL, consistent with the nuqs pattern throughout the codebase.

**Confidence:** HIGH -- `parseAsStringLiteral` is already used for calculator tax filing status.

### Pattern 3: Dual Render (Table + Cards) with Shared Data

**What:** Desktop renders shadcn Table component, mobile renders Card components. Both consume the same filtered/sorted data array.
**When to use:** For responsive comparison layouts (D-06).
**Key insight from UI-SPEC:**

```
The table and stacked cards are two separate rendered components,
not CSS show/hide on the same markup.
Table renders at `lg:block hidden` and cards at `lg:hidden block`.
Both consume the same filtered/sorted product data array from shared state.
```

This avoids hydration mismatches and keeps the DOM clean. The sort/filter logic lives in a parent client component that passes the derived `filteredProducts` array down to both rendering components.

**Confidence:** HIGH -- follows established responsive patterns in the codebase.

### Pattern 4: SSG with generateStaticParams for Category Pages

**What:** Static generation of the 4 category pages at build time.
**When to use:** For `/compare/[category]` dynamic route.
**How it works in this codebase:**

```typescript
// Follows exact pattern from src/app/calculators/[slug]/page.tsx
import { products } from '#site/content';

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category }));
}
```

Velite processes the 4 YAML files into a typed array. `generateStaticParams` generates `/compare/credit-cards`, `/compare/personal-loans`, `/compare/savings-accounts`, `/compare/insurance`.

**Confidence:** HIGH -- exact same pattern as calculators, guides, hubs.

### Pattern 5: sendGAEvent for Affiliate Click Tracking

**What:** Use `sendGAEvent` from `@next/third-parties/google` for GA4 custom events on affiliate link clicks.
**When to use:** In the `affiliate-link.tsx` component on every CTA button click.
**Verified pattern from Next.js official docs:**

```typescript
'use client';
import { sendGAEvent } from '@next/third-parties/google';

// In the click handler:
sendGAEvent('event', 'affiliate_click', {
  product_id: productId,
  category: category,
  position: position,
  product_name: productName,
});
```

The `<GoogleAnalytics>` component is already in the root layout at `src/app/layout.tsx`. The `sendGAEvent` function sends events via the `dataLayer` object. It works only when the `NEXT_PUBLIC_GA_ID` env var is set and `<GoogleAnalytics>` renders, which is the existing conditional behavior.

**Important:** `sendGAEvent` requires a client component (`'use client'`). The affiliate link component must be a client component.

**Confidence:** HIGH -- verified from Next.js 16.2.1 official documentation.

### Pattern 6: JSON-LD Structured Data for Financial Products

**What:** Use schema-dts types (`FinancialProduct`, `CreditCard`, `LoanOrCredit`) with the existing `JsonLd<T>` renderer for search engine structured data.
**When to use:** On each comparison category page.
**Schema.org type hierarchy relevant to this phase:**

- `FinancialProduct` -- base type for all financial products
  - `CreditCard` (extends `LoanOrCredit` and `PaymentCard`) -- for credit card comparison
  - `LoanOrCredit` -- for personal loan comparison
  - `BankAccount` -- for savings accounts/CDs
  - `FinancialProduct` -- for insurance (no specific subtype)

**Key properties across types:** `name`, `annualPercentageRate`, `interestRate`, `feesAndCommissionsSpecification`, `offers` (with `offeredBy`).

```typescript
import type { WithContext, FinancialProduct } from 'schema-dts';

const schema: WithContext<FinancialProduct> = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: product.name,
  provider: { '@type': 'Organization', name: product.issuer },
  annualPercentageRate: product.apr,
  feesAndCommissionsSpecification: product.fees,
};
```

**Confidence:** HIGH -- schema-dts 2.0.0 is installed and confirmed to export these types. Existing `JsonLd<T>` component pattern handles rendering.

### Anti-Patterns to Avoid

- **Client-side data fetching for product data:** All product data is statically embedded at build time via Velite. Do NOT use `fetch()` or API routes to load product data. This is an SSG site.
- **Global state for sort/filter:** Do NOT use `useState` or context for sort/filter state. Use nuqs URL params so state is shareable, bookmarkable, and SEO-crawlable (per D-10 and CLAUDE.md constraint against Zustand/Redux).
- **Single component for desktop + mobile:** Do NOT try to make one component work for both table and card layouts via CSS. Use two separate components with shared data props (per UI-SPEC D-06 guidance).
- **Inline affiliate URLs:** Do NOT hardcode affiliate URLs in components. All URLs come from YAML data validated by Velite/Zod. This is the centralized registry requirement (AFFIL-04).
- **Custom table implementation:** Do NOT hand-roll table markup. Use the existing shadcn `Table` component primitives (`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sortable table | Custom table with sort logic | shadcn Table + nuqs sort params | Table component already exists with proper styles, hover states, responsive container. nuqs handles URL persistence. |
| Filter dropdowns | Custom dropdown/popover | shadcn Select (Base UI) | Select component exists with proper keyboard nav, ARIA, animations. Filter values are simple enum lists. |
| URL state management | `useSearchParams` + manual serialization | nuqs `parseAsStringLiteral` | Type-safe, auto-serialization, `.withDefault()`, used throughout codebase. Manual approach is error-prone per CLAUDE.md. |
| GA4 event tracking | Manual `window.gtag()` calls | `sendGAEvent` from `@next/third-parties/google` | Already integrated. Handles script loading, dataLayer, SSR safety. Do not access `window.gtag` directly. |
| JSON-LD structured data | Manual JSON string building | `JsonLd<T>` component + schema-dts types | Existing component handles XSS-safe serialization. schema-dts provides compile-time type checking against Schema.org vocabulary. |
| Affiliate disclosure component | New disclosure UI | Existing `AffiliateDisclosure` from `src/components/trust/affiliate-disclosure.tsx` | Already built with proper ARIA (`role="note"`), links to editorial standards, styled consistently. |
| Content validation | Runtime type checking | Velite + Zod build-time validation | Catches invalid product data, missing fields, bad URLs before deployment. Proven pattern for all content. |

**Key insight:** Phase 4 introduces zero new infrastructure patterns. Every technical building block already exists in the codebase from Phases 1-3. The work is composing existing patterns into new page types and authoring real product data.

## Common Pitfalls

### Pitfall 1: Base UI Select API Differences from Radix

**What goes wrong:** Writing Select components using Radix API patterns (e.g., `onValueChange` accepting string, `value` as controlled prop) when the codebase uses Base UI primitives.
**Why it happens:** Most online shadcn/ui examples assume Radix. This project uses the base-nova preset with Base UI.
**How to avoid:** Check the existing `src/components/ui/select.tsx` before writing filter components. Base UI Select uses `value` prop that can be `null` (not just string), and `onValueChange` receives `(value: string | null, event)` -- the nullable parameter is critical.
**Warning signs:** Type errors on Select `onValueChange` callback. Runtime null values breaking filter logic.

### Pitfall 2: Sticky First Column CSS Complexity

**What goes wrong:** The sticky first column (D-04: product name, 200px width) does not work correctly with the shadcn Table's `overflow-x-auto` container, or creates visual glitches with borders and backgrounds.
**Why it happens:** CSS `position: sticky` on table cells requires the cell to have an explicit background color (otherwise scrolled content shows through). The table container must have `overflow-x: auto` on the wrapper but the sticky column needs to break out of that scroll context.
**How to avoid:** Apply `sticky left-0 z-10 bg-background` to the first `TableCell` and first `TableHead` in each row. The `bg-background` is essential to prevent content bleeding through. The hover state must also apply to the stuck cell.
**Warning signs:** Content visible behind the sticky column when scrolling horizontally. Sticky column not "sticking" on tablet/desktop. Border alignment issues at the sticky boundary.

### Pitfall 3: sendGAEvent Requires Client Component Context

**What goes wrong:** Calling `sendGAEvent` from a Server Component or from a component that is not marked `'use client'`.
**Why it happens:** `sendGAEvent` accesses the `window.dataLayer` object, which only exists in the browser.
**How to avoid:** The `affiliate-link.tsx` component MUST be a client component (`'use client'` directive). The click handler fires `sendGAEvent` on user interaction, not during render.
**Warning signs:** "window is not defined" errors. Events not appearing in GA4 debug view.

### Pitfall 4: Velite Collection Pattern Mismatch

**What goes wrong:** Defining the products collection as `single: true` (like glossary) when it should be a multi-file collection, or vice versa.
**Why it happens:** The glossary uses `single: true` because it is one YAML file with an array. Products are 4 separate YAML files (one per category), each containing a product array.
**How to avoid:** Use the multi-file collection pattern (like calculators: `pattern: 'products/*.yaml'`). Each file is one category object with a `products` array. Access via `products` from `#site/content` which returns an array of category objects.
**Warning signs:** Velite build errors about missing fields. Empty `products` array at build time.

### Pitfall 5: FTC Disclosure Positioning

**What goes wrong:** Placing the affiliate disclosure after the comparison table or below the fold, violating FTC guidelines.
**Why it happens:** Developer focuses on the table first and adds disclosure as an afterthought.
**How to avoid:** The disclosure MUST appear before the comparison table in DOM order, above the fold (visible without scrolling). The layout contract in the UI-SPEC specifies: `[AffiliateDisclosure]` appears between `[Page Header]` and `[Filter Bar]`. The existing component is already FTC-compliant in content; placement is the implementation concern.
**Warning signs:** Disclosure not visible on initial page load without scrolling. Disclosure positioned after the first affiliate link.

### Pitfall 6: YAML Data Freshness and Accuracy

**What goes wrong:** Publishing comparison pages with stale or incorrect product data (wrong APR, outdated fees, discontinued products).
**Why it happens:** Financial product terms change frequently. Data entered at development time becomes stale.
**How to avoid:** Include a `lastVerified` date field in each YAML file. Display it in the table caption ("Rates and terms as of {month} {year}"). The methodology page states monthly review commitment. Use real data sources (issuer websites, CFPB TCCP survey) at authoring time.
**Warning signs:** Published rates that don't match issuer websites. Missing `lastVerified` dates.

## Code Examples

### Product YAML Schema (Credit Cards Example)

```yaml
# content/products/credit-cards.yaml
category: credit-cards
categoryTitle: "Best Credit Cards Compared"
categoryDescription: "Find the right credit card based on rewards, fees, and your credit score. We rank by value to you, not by what pays us."
lastVerified: "2026-03-26"

products:
  - id: chase-sapphire-preferred
    name: "Chase Sapphire Preferred"
    issuer: "Chase"
    apr: "21.49%-28.49%"
    annualFee: 95
    rewardsType: travel
    rewardsRate: "5X on travel through Chase, 3X dining, 2X other travel"
    signupBonus: "60,000 points after $4,000 in 3 months"
    creditScoreMin: 670
    creditScoreRange: good
    bestFor: "Best for Travel Rewards"
    affiliateUrl: "https://www.example.com/chase-sapphire"
    utmSource: walletwaypoint
    utmMedium: comparison_table
    utmCampaign: credit-cards
    hasAffiliate: true
```

### Velite Collection Definition

```typescript
// In velite.config.ts -- add to existing collections
const productItemSchema = s.object({
  id: s.string(),
  name: s.string(),
  issuer: s.string(),
  bestFor: s.string().optional(),
  affiliateUrl: s.string().url(),
  utmSource: s.string().default('walletwaypoint'),
  utmMedium: s.string().default('comparison_table'),
  utmCampaign: s.string(),
  hasAffiliate: s.boolean().default(true),
  // Category-specific fields handled by union or flexible schema
});

const products = defineCollection({
  name: 'Product',
  pattern: 'products/*.yaml',
  schema: s.object({
    category: s.enum(['credit-cards', 'personal-loans', 'savings-accounts', 'insurance']),
    categoryTitle: s.string(),
    categoryDescription: s.string(),
    lastVerified: s.isodate(),
    products: s.array(productItemSchema),
  }),
});
```

### nuqs Sort/Filter URL Params

```typescript
// src/lib/compare/url-params.ts
import { parseAsStringLiteral } from 'nuqs';

const sortDirections = ['asc', 'desc'] as const;

// Credit cards sort columns
const creditCardSortColumns = ['name', 'apr', 'annualFee', 'rewardsRate'] as const;

export const creditCardParams = {
  sort: parseAsStringLiteral(creditCardSortColumns).withDefault('name'),
  dir: parseAsStringLiteral(sortDirections).withDefault('asc'),
  rewards: parseAsStringLiteral([
    'all', 'cash-back', 'travel', 'points', 'balance-transfer'
  ] as const).withDefault('all'),
  score: parseAsStringLiteral([
    'all', 'excellent', 'good', 'fair'
  ] as const).withDefault('all'),
  fee: parseAsStringLiteral([
    'all', 'no-fee', 'under-100', '100-plus'
  ] as const).withDefault('all'),
};
```

### sendGAEvent Affiliate Click Tracking

```typescript
// src/components/compare/affiliate-link.tsx
'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface AffiliateLinkProps {
  href: string;
  productId: string;
  category: string;
  position: number;
  productName: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  href, productId, category, position, productName, children,
}: AffiliateLinkProps) {
  const handleClick = () => {
    sendGAEvent('event', 'affiliate_click', {
      product_id: productId,
      category: category,
      position: position,
      product_name: productName,
    });
  };

  return (
    <Button
      nativeButton={false}
      size="sm"
      render={
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={handleClick}
        />
      }
    >
      {children}
      <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
      <span className="sr-only">(opens in new tab)</span>
    </Button>
  );
}
```

### Sortable Table Header

```typescript
// src/components/compare/sort-header.tsx
'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortHeaderProps {
  column: string;
  label: string;
  active: boolean;
  direction: 'asc' | 'desc' | null;
  onSort: (column: string) => void;
}

export function SortHeader({ column, label, active, direction, onSort }: SortHeaderProps) {
  const Icon = active
    ? direction === 'asc' ? ArrowUp : ArrowDown
    : ArrowUpDown;

  return (
    <button
      onClick={() => onSort(column)}
      className="inline-flex items-center gap-1"
      aria-label={`Sort by ${label}`}
    >
      {label}
      <Icon className={`h-4 w-4 ${active ? 'text-foreground' : 'text-muted-foreground'}`} />
    </button>
  );
}
```

### Button with render prop (Base UI pattern used in this project)

The project uses Base UI via shadcn base-nova preset. The Button component uses `render` prop instead of Radix's `asChild`:

```typescript
// Correct pattern for this codebase (NOT Radix asChild)
<Button nativeButton={false} render={<a href={url} target="_blank" />}>
  Apply Now
</Button>
```

This is documented in STATE.md: "Used render prop pattern for Button+Link composition (Base UI v4 does not support asChild)."

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `window.gtag()` direct calls | `sendGAEvent` from `@next/third-parties/google` | Next.js 14+ | Type-safe, SSR-safe, automatic script loading coordination |
| Radix asChild for button-as-link | Base UI `render` prop pattern | This project (base-nova preset) | Must use `nativeButton={false}` + `render={<a />}` instead of asChild |
| `next-seo` for structured data | Built-in Metadata API + schema-dts + custom `JsonLd<T>` | Next.js 14+ | No third-party dependency, compile-time type checking |
| Contentlayer for content pipeline | Velite 0.3 with Zod schemas | 2024 | Contentlayer abandoned; Velite is its spiritual successor |
| Manual `useSearchParams()` | nuqs parsers with `.withDefault()` | 2024+ | Type-safe, serialization handled, URL state as primary state source |

**Deprecated/outdated:**
- `next-seo` package: Unnecessary, use built-in Metadata API
- `next-sitemap` package: Unnecessary, use built-in `sitemap.ts`
- Radix `asChild` pattern: This project uses Base UI, which does not support `asChild`
- `window.gtag()` direct access: Use `sendGAEvent` wrapper from Next.js

## FTC and CFPB Compliance Notes

### FTC Affiliate Disclosure Requirements (2025-2026)

- Disclosure must be "clear and conspicuous" -- easily noticeable and understandable
- Must appear "above the fold" -- visible without scrolling on initial page load
- Must be near affiliate links, not buried in footer or behind expandable text
- Must use plain language (existing component uses: "Some links on this page are affiliate links")
- Civil penalties per violation can reach $51,744 as of 2026
- The existing `AffiliateDisclosure` component meets content requirements; placement before the comparison table meets positioning requirements

### CFPB Comparison Shopping Guidance (Circular 2024-01)

- CFPB identifies protecting consumer ability to compare financial products as a core statutory objective
- Companies operating comparison-shopping tools can violate law when they steer consumers based on kickbacks
- Paid content must be completely visually separate from product rankings
- Rankings must not be manipulated by behind-the-scenes incentive payments
- The "How We Rank" methodology page directly addresses these requirements by explaining consumer-benefit-first ranking criteria and explicitly stating commission rates do not influence rankings

### Implementation Checklist

1. `AffiliateDisclosure` appears before first affiliate link in DOM order (D-09)
2. All affiliate links include `rel="noopener noreferrer nofollow"` attributes
3. "How We Rank" page explains ranking criteria per category
4. Independence statement explicitly addresses commission non-influence
5. "Our Pick" badges are clearly labeled as editorial selections, not algorithmic rankings (D-07)
6. Table caption includes data freshness date and methodology link

## Schema.org Structured Data Types

For comparison pages, the relevant schema-dts types are:

| Product Category | Schema.org Type | Key Properties |
|-----------------|-----------------|----------------|
| Credit Cards | `CreditCard` | `name`, `annualPercentageRate`, `feesAndCommissionsSpecification`, `offers.offeredBy` |
| Personal Loans | `LoanOrCredit` | `name`, `annualPercentageRate`, `loanTerm`, `amount` |
| Savings/CDs | `BankAccount` or `FinancialProduct` | `name`, `interestRate`, `feesAndCommissionsSpecification` |
| Insurance | `FinancialProduct` | `name`, `feesAndCommissionsSpecification`, `provider` |

All types are available from `schema-dts` v2.0.0 (installed). The existing `JsonLd<FinancialProduct>` component pattern handles rendering with XSS-safe serialization.

## Open Questions

1. **Product data sourcing scope**
   - What we know: D-02 requires real product data. CFPB TCCP survey provides credit card data. Issuer websites provide current rates.
   - What's unclear: The exact 10-15 products per category need to be researched and selected. This is content authoring work, not technical implementation.
   - Recommendation: Define the YAML schema and one complete product entry per category as the technical task. Treat full product data population as a separate content authoring task that can proceed in parallel.

2. **Category-specific product schema fields**
   - What we know: AFFIL-02 specifies credit card fields (APR, annual fee, rewards, credit score range). AFFIL-03 specifies loan fields (rates, terms, eligibility).
   - What's unclear: Exact fields for savings accounts/CDs and insurance categories.
   - Recommendation: Define based on the filter configurations in the UI-SPEC. Savings: APY, minimum deposit, account type, term length. Insurance: insurance type, coverage level, deductible range, monthly premium. Claude has discretion on these per CONTEXT.md.

3. **Velite schema strategy: union vs flexible**
   - What we know: Each category has different product attributes. All share common fields (id, name, issuer, affiliateUrl, etc.).
   - What's unclear: Whether to use a Zod discriminated union by category or a single flexible schema with optional fields.
   - Recommendation: Use a base schema with common fields + category-specific YAML files where each file's schema can have additional required fields. Velite processes each file independently anyway. Define per-category item schemas that extend a shared base.

## Sources

### Primary (HIGH confidence)
- Next.js 16.2.1 official docs -- [Third-Party Libraries guide](https://nextjs.org/docs/app/guides/third-party-libraries): `sendGAEvent` API, `GoogleAnalytics` component usage
- nuqs official docs -- [Built-in parsers](https://nuqs.dev/docs/parsers/built-in): `parseAsStringLiteral` usage and type inference
- Schema.org -- [FinancialProduct](https://schema.org/FinancialProduct), [CreditCard](https://schema.org/CreditCard), [LoanOrCredit](https://schema.org/LoanOrCredit): JSON-LD type properties
- CFPB -- [Circular 2024-01](https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-01-preferencing-and-steering-practices-by-digital-intermediaries-for-consumer-financial-products-or-services/): Comparison shopping guidance on preferencing and steering
- Existing codebase (verified): `velite.config.ts`, `src/lib/calculators/url-params.ts`, `src/components/trust/affiliate-disclosure.tsx`, `src/components/ui/table.tsx`, `src/components/ui/select.tsx`, `src/app/layout.tsx`

### Secondary (MEDIUM confidence)
- FTC enforcement -- [FTC Affiliate Disclosure rules and penalties](https://www.referralcandy.com/blog/ftc-affiliate-disclosure): 2026 penalty amounts, "above the fold" requirement
- CFPB -- [Credit card comparison tool announcement](https://www.consumerfinance.gov/about-us/newsroom/cfpb-enhances-tool-to-promote-competition-comparison-shopping-credit-card-market/): CFPB's own approach to fair comparison

### Tertiary (LOW confidence)
- None -- all findings verified against official sources or existing codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all packages verified installed at exact versions
- Architecture: HIGH -- all patterns proven in Phases 1-3 of this exact codebase
- Pitfalls: HIGH -- identified from direct code inspection (Base UI API, sticky CSS, sendGAEvent requirements)
- Compliance: HIGH for FTC disclosure positioning (verified against official guidance); MEDIUM for CFPB methodology (principles clear, exact implementation is content judgment)

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (stable -- no fast-moving dependencies; product data freshness is the variable)

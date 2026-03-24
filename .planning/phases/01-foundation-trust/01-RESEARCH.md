# Phase 1: Foundation & Trust - Research

**Researched:** 2026-03-24
**Domain:** Next.js 16 project setup, SEO infrastructure, YMYL trust/legal pages, schema markup, analytics
**Confidence:** HIGH

## Summary

Phase 1 is a greenfield scaffolding phase that establishes the Next.js 16 application with all SEO infrastructure (static generation, metadata, sitemap, robots, breadcrumbs, structured data) and trust/legal pages required for YMYL credibility in the finance niche. The tech stack is fully locked by CLAUDE.md and CONTEXT.md decisions -- no alternatives need evaluation.

The core pattern is: create a statically generated Next.js 16 App Router site with shadcn/ui components, Tailwind CSS 4 theming (blue-based palette), Inter font, and a complete set of trust pages (About, Editorial Standards, Privacy Policy) plus SEO plumbing (BreadcrumbList schema, sitemap.ts, robots.ts, JSON-LD structured data). GA4 and Vercel Analytics are included from day one per decision D-13/D-14.

All pages in Phase 1 are static content pages with no dynamic data fetching, so every page will be statically generated at build time by default. No `generateStaticParams` or ISR configuration is needed yet -- those patterns come in Phase 2 when calculator pages with dynamic routes appear.

**Primary recommendation:** Scaffold the project with `npx create-next-app@latest`, initialize shadcn/ui with `npx shadcn@latest init`, configure Tailwind CSS 4 theme variables for the blue-based palette, then build out the page structure and SEO components top-down from the root layout.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Clean & professional visual mood -- white space, muted blues/greens, clear hierarchy. Conveys "trustworthy financial resource" immediately, aligned with YMYL trust signals.
- **D-02:** Blue-based primary color palette -- navy/slate blue with a teal or green accent. Signals reliability and stability in the finance context.
- **D-03:** Inter or system-like sans-serif typography -- clean, neutral, excellent readability, small file size. Professional without being stuffy.
- **D-04:** shadcn/ui defaults with custom theme via CSS variables (colors, radius, spacing). No heavy customization -- fast to ship, consistent, easy to maintain.
- **D-05:** Full navigation with placeholders -- show complete future navigation (Calculators, Guides, Hubs, Compare) with placeholder/coming-soon landing pages. Establishes site structure for crawlers early.
- **D-06:** Fixed top bar header -- logo left, nav links center or right, sticky on scroll. Mobile: hamburger menu. Standard, predictable content site pattern.
- **D-07:** Comprehensive multi-column footer -- site links, legal pages, about/contact, social placeholders, and a prominent financial disclaimer. Google quality raters expect trust signals in the footer.
- **D-08:** Homepage with hero + value prop + trust signals -- hero section with tagline, brief description of WalletWaypoint's offering, placeholder cards for upcoming calculators/hubs, trust badges/signals at bottom.
- **D-09:** Brand-authored content -- attributed to "WalletWaypoint Editorial Team" with a methodology page explaining the review process. No fake personas. Real author bios added later when contributors join.
- **D-10:** Comprehensive Editorial Standards page -- full methodology: how content is researched, fact-checked, updated. Data sources cited. Clear distinction between editorial and affiliate content.
- **D-11:** Mission-driven About page -- why WalletWaypoint exists, who it's for, what makes it different (life-stage approach, tools not advice). Credibility through purpose and transparency, not credentials.
- **D-12:** Sticky banner + inline disclaimer components -- persistent small banner on calculator/guide pages ("For educational purposes -- not financial advice") plus an inline disclaimer component for contextual placement.
- **D-13:** GA4 from day one -- required by Mediavine for 50K session qualification. Start collecting data immediately so history exists when applying.
- **D-14:** Vercel Analytics included -- Real User Monitoring for LCP, CLS, INP. Critical since Mediavine qualification depends on passing Core Web Vitals.

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

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | All content pages statically generated (SSG) or ISR for crawlability | Next.js App Router renders pages as static HTML by default when no dynamic APIs are used. All Phase 1 pages are static content -- no configuration needed beyond default behavior. |
| INFRA-02 | Every page has correct meta tags (title, description, og:image, canonical URL) | Next.js 16 Metadata API: static `metadata` export per page or `generateMetadata` function. Built-in support for title, description, openGraph, twitter, alternates (canonical). |
| INFRA-03 | Breadcrumb navigation on all pages with BreadcrumbList schema markup | shadcn/ui Breadcrumb component for visual navigation + JSON-LD `<script>` tag with BreadcrumbList schema type for structured data. |
| INFRA-04 | Automated XML sitemap and robots.txt generation | Native `app/sitemap.ts` and `app/robots.ts` files using `MetadataRoute.Sitemap` and `MetadataRoute.Robots` types. No third-party packages needed. |
| INFRA-05 | FAQPage, HowTo, Article, and WebApplication schema markup on relevant pages | JSON-LD `<script>` tags with `schema-dts` TypeScript types. Reusable helper components for each schema type. Note: FAQPage rich results restricted since 2023 but still useful for structure. |
| INFRA-06 | Core Web Vitals passing on all pages (LCP < 2.5s, CLS < 0.1, INP < 200ms) | Static HTML generation + `next/font` self-hosting + Tailwind utility classes + `@vercel/speed-insights` monitoring. No heavy JS on content pages. |
| INFRA-07 | Responsive design that works on mobile, tablet, and desktop | Tailwind CSS 4 responsive utilities (sm/md/lg/xl breakpoints). shadcn/ui components are responsive by default. Sheet component for mobile hamburger menu. |
| TRUST-01 | Standardized affiliate disclosure component displayed near all affiliate links | Reusable React component with FTC-compliant disclosure text. No affiliate links exist yet in Phase 1, but the component must be built and ready. |
| TRUST-02 | "Not financial advice" disclaimer on all calculator and guide pages | Sticky banner component (D-12) + inline disclaimer component. Applied via layout composition on relevant route segments. |
| TRUST-03 | Privacy policy page compliant with CCPA/GDPR basics | Static page at `/privacy-policy` with required sections: data collected, purpose, rights (CCPA opt-out, GDPR consent), cookies, contact info, retention. |
| TRUST-04 | Editorial standards / methodology page explaining how content is created | Static page at `/editorial-standards` per D-10. Methodology, fact-checking process, data sources, editorial vs affiliate distinction. |
| TRUST-05 | Author bio pages with credentials and "reviewed by" attribution on content | Author profile for "WalletWaypoint Editorial Team" (D-09). Author card component with methodology link. Bio page at `/authors/editorial-team`. |
| TRUST-06 | About page establishing site credibility and mission | Static page at `/about` per D-11. Mission, audience, differentiation (life-stage approach), transparency focus. |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16.2 with App Router, React 19.2, TypeScript 5.8, Tailwind CSS 4.2
- **SEO**: Must be SSR/SSG for crawlability; no client-only rendering for content pages
- **Performance**: Core Web Vitals must pass (LCP < 2.5s, CLS < 0.1)
- **Content**: Must be genuinely useful -- E-E-A-T compliance for YMYL content
- **Legal**: Financial disclaimers required; "not financial advice" disclosures; affiliate disclosure compliance (FTC)
- **Monetization**: Site must be Mediavine/Raptiv-ready (clean ad slots, no layout shift from ads)
- **Forbidden**: Do NOT use `next-seo`, `next-sitemap`, Contentlayer, Chart.js, D3 directly, Zustand/Redux, MUI, AdSense
- **SEO plumbing**: Use built-in Next.js Metadata API, `sitemap.ts`, `robots.ts` -- no third-party SEO packages
- **Icons**: Lucide React (default for shadcn/ui)
- **Fonts**: `next/font` for self-hosted optimization, zero layout shift
- **Animations**: Motion (import from `motion/react`, not `framer-motion`)
- **State**: No global state libraries -- URL state via nuqs, local state via useState
- **Linting**: ESLint + `eslint-config-next` + `eslint-plugin-jsx-a11y`
- **Formatting**: Prettier + `prettier-plugin-tailwindcss`

## Standard Stack

### Core (Phase 1 Scope)

| Library | Version | Purpose | Verified |
|---------|---------|---------|----------|
| next | 16.2.1 | App Router framework with SSG, Metadata API, sitemap/robots | npm registry 2026-03-24 |
| react | 19.2.4 | UI library (Server Components for zero-JS content pages) | npm registry 2026-03-24 |
| typescript | 6.0.2 | Type safety | npm registry 2026-03-24 |
| tailwindcss | 4.2.2 | Utility-first CSS with CSS-first configuration | npm registry 2026-03-24 |
| @tailwindcss/postcss | 4.2.2 | PostCSS plugin for Next.js integration | npm registry 2026-03-24 |
| tw-animate-css | 1.4.0 | Animation utilities (replaces deprecated tailwindcss-animate) | npm registry 2026-03-24 |
| schema-dts | 2.0.0 | TypeScript types for Schema.org JSON-LD | npm registry 2026-03-24 |
| lucide-react | 1.0.1 | Tree-shakable icon library (shadcn/ui default) | npm registry 2026-03-24 |
| sharp | 0.34.5 | Image optimization for Next.js `<Image>` component | npm registry 2026-03-24 |

### Analytics (Phase 1 Scope)

| Library | Version | Purpose | Verified |
|---------|---------|---------|----------|
| @next/third-parties | 16.2.1 | GoogleAnalytics component for GA4 integration | npm registry 2026-03-24 |
| @vercel/analytics | 2.0.1 | Vercel Web Analytics (pageviews, events) | npm registry 2026-03-24 |
| @vercel/speed-insights | 2.0.0 | Core Web Vitals Real User Monitoring | npm registry 2026-03-24 |

### Development Tools

| Library | Version | Purpose | Verified |
|---------|---------|---------|----------|
| eslint | 10.1.0 | Linting (via `eslint-config-next`) | npm registry 2026-03-24 |
| eslint-plugin-jsx-a11y | 6.10.2 | Accessibility linting (ADA compliance) | npm registry 2026-03-24 |
| prettier | 3.8.1 | Code formatting | npm registry 2026-03-24 |
| prettier-plugin-tailwindcss | 0.7.2 | Tailwind class sorting | npm registry 2026-03-24 |

### shadcn/ui Components (Phase 1 Recommended)

Install via `npx shadcn@latest add <component>`:

| Component | Purpose in Phase 1 |
|-----------|-------------------|
| button | CTAs, navigation actions |
| navigation-menu | Desktop top navigation (D-06) |
| sheet | Mobile hamburger menu slide-out (D-06) |
| breadcrumb | Visual breadcrumb navigation (INFRA-03) |
| card | Homepage placeholder cards, trust signal cards (D-08) |
| badge | Status indicators, coming-soon badges |
| separator | Visual dividers in footer/content |
| accordion | FAQ sections on trust pages |
| alert | Disclaimer banners (D-12, TRUST-02) |
| tooltip | Contextual information on trust elements |

### Installation

```bash
# Create project
npx create-next-app@latest walletwaypoint --typescript --tailwind --eslint --app --src-dir --yes

# Install core dependencies
npm install schema-dts @next/third-parties @vercel/analytics @vercel/speed-insights sharp

# Install dev dependencies
npm install -D eslint-plugin-jsx-a11y prettier prettier-plugin-tailwindcss

# Initialize shadcn/ui (after project creation)
npx shadcn@latest init

# Add Phase 1 components
npx shadcn@latest add button navigation-menu sheet breadcrumb card badge separator accordion alert tooltip
```

## Architecture Patterns

### Recommended Project Structure

```
src/
  app/
    layout.tsx              # Root layout: Inter font, analytics, sticky header, footer
    page.tsx                # Homepage (D-08)
    sitemap.ts              # Programmatic XML sitemap (INFRA-04)
    robots.ts               # Programmatic robots.txt (INFRA-04)
    favicon.ico             # Site favicon
    opengraph-image.tsx     # Default OG image generator
    globals.css             # Tailwind imports + CSS theme variables
    about/
      page.tsx              # About page (TRUST-06, D-11)
    editorial-standards/
      page.tsx              # Editorial standards (TRUST-04, D-10)
    privacy-policy/
      page.tsx              # Privacy policy (TRUST-03)
    authors/
      [slug]/
        page.tsx            # Author bio pages (TRUST-05)
    calculators/
      page.tsx              # Calculators landing (placeholder, D-05)
    guides/
      page.tsx              # Guides landing (placeholder, D-05)
    hubs/
      page.tsx              # Hubs landing (placeholder, D-05)
    compare/
      page.tsx              # Compare landing (placeholder, D-05)
  components/
    ui/                     # shadcn/ui components (auto-generated)
    layout/
      header.tsx            # Sticky header with nav (D-06)
      footer.tsx            # Multi-column footer (D-07)
      mobile-nav.tsx        # Sheet-based mobile hamburger menu
      breadcrumbs.tsx       # Breadcrumb wrapper with auto-detection
    seo/
      json-ld.tsx           # Generic JSON-LD renderer
      breadcrumb-schema.tsx # BreadcrumbList JSON-LD
      article-schema.tsx    # Article JSON-LD
      faq-schema.tsx        # FAQPage JSON-LD
      web-app-schema.tsx    # WebApplication JSON-LD
      organization-schema.tsx # Organization JSON-LD (site-wide)
    trust/
      disclaimer-banner.tsx # Sticky "not financial advice" banner (D-12)
      disclaimer-inline.tsx # Inline disclaimer component (D-12)
      affiliate-disclosure.tsx # FTC-compliant affiliate disclosure (TRUST-01)
      author-card.tsx       # Author attribution component (TRUST-05)
  lib/
    metadata.ts             # Shared metadata defaults and helper functions
    site-config.ts          # Site-wide constants (name, URL, description)
    navigation.ts           # Navigation structure definition
  types/
    index.ts                # Shared TypeScript types
```

### Pattern 1: Static Metadata with Shared Defaults

**What:** Define site-wide metadata defaults in a shared config, override per-page.
**When to use:** Every page in Phase 1 (and future phases).

```typescript
// Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
// src/lib/site-config.ts
export const siteConfig = {
  name: 'WalletWaypoint',
  description: 'Your next financial milestone starts here. Interactive calculators, comparison tools, and educational guides for every life stage.',
  url: 'https://walletwaypoint.com',
  ogImage: 'https://walletwaypoint.com/og.png',
} as const;

// src/lib/metadata.ts
import { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createMetadata(overrides: Partial<Metadata> & { title: string; description: string }): Metadata {
  return {
    title: overrides.title,
    description: overrides.description,
    openGraph: {
      title: overrides.title,
      description: overrides.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: 'website',
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: overrides.title,
      description: overrides.description,
      ...overrides.twitter,
    },
    alternates: {
      canonical: overrides.alternates?.canonical,
    },
    ...overrides,
  };
}

// src/app/about/page.tsx
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'About WalletWaypoint - Our Mission',
  description: 'WalletWaypoint helps you navigate money decisions at every life stage with free calculators, guides, and tools.',
  alternates: { canonical: 'https://walletwaypoint.com/about' },
});
```

### Pattern 2: Root Layout with Analytics and Font

**What:** Single root layout that loads Inter font, analytics providers, header, and footer.
**When to use:** Applied once at the top level.

```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// Source: https://nextjs.org/docs/app/guides/third-party-libraries
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
```

### Pattern 3: JSON-LD Structured Data Components

**What:** Reusable server components that render `<script type="application/ld+json">` tags.
**When to use:** Every page that needs structured data.

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
import { WithContext, BreadcrumbList, Article, FAQPage, WebApplication } from 'schema-dts';

// Generic JSON-LD renderer
export function JsonLd<T extends Record<string, unknown>>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// BreadcrumbList schema component
export function BreadcrumbSchema({ items }: {
  items: { name: string; url: string }[];
}) {
  const jsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={jsonLd} />;
}
```

### Pattern 4: Programmatic Sitemap

**What:** `app/sitemap.ts` that returns all site URLs with metadata.
**When to use:** Placed once in the app root.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://walletwaypoint.com';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/editorial-standards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/authors/editorial-team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/calculators`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/hubs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];
}
```

### Pattern 5: Robots.txt

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: 'https://walletwaypoint.com/sitemap.xml',
  };
}
```

### Pattern 6: Tailwind CSS 4 Theme Configuration

**What:** CSS-first theme with blue-based palette via CSS variables and `@theme inline`.
**When to use:** Applied in `globals.css`.

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.99 0.002 240);
  --foreground: oklch(0.15 0.02 240);
  --primary: oklch(0.35 0.1 245);           /* Navy/slate blue */
  --primary-foreground: oklch(0.98 0.005 240);
  --secondary: oklch(0.93 0.01 240);
  --secondary-foreground: oklch(0.25 0.04 240);
  --accent: oklch(0.55 0.12 175);           /* Teal/green accent */
  --accent-foreground: oklch(0.98 0.005 175);
  --muted: oklch(0.95 0.005 240);
  --muted-foreground: oklch(0.55 0.02 240);
  --destructive: oklch(0.55 0.2 25);
  --border: oklch(0.88 0.01 240);
  --ring: oklch(0.35 0.1 245);
  --radius: 0.5rem;
  /* Chart colors for Phase 2 */
  --chart-1: oklch(0.35 0.1 245);
  --chart-2: oklch(0.55 0.12 175);
  --chart-3: oklch(0.65 0.1 140);
  --chart-4: oklch(0.45 0.08 260);
  --chart-5: oklch(0.75 0.08 200);
}

.dark {
  --background: oklch(0.12 0.02 240);
  --foreground: oklch(0.95 0.005 240);
  --primary: oklch(0.65 0.12 245);
  --primary-foreground: oklch(0.12 0.02 240);
  /* ... dark mode overrides */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

### Anti-Patterns to Avoid

- **Client-only rendering for content pages:** All trust/legal pages and placeholder pages MUST export static metadata and render as Server Components. Never use `"use client"` at the page level for content pages.
- **`next-seo` or `next-sitemap` packages:** Forbidden by CLAUDE.md. Use built-in Next.js Metadata API, `sitemap.ts`, and `robots.ts`.
- **`tailwind.config.js`:** Tailwind CSS 4 uses CSS-first configuration. No JavaScript config file. Theme goes in `globals.css` with `@theme inline`.
- **Importing `framer-motion`:** Import from `motion/react` (package is now called "Motion").
- **Using `<Script>` for JSON-LD:** The official recommendation is to use a native `<script>` tag, not the `next/script` component, because JSON-LD is data, not executable code.
- **Hardcoding metadata on each page:** Use a shared `createMetadata()` helper to ensure consistent OG/Twitter/canonical patterns.
- **Layout shift from font loading:** Always use `next/font` with the `variable` approach and a CSS variable fallback, never external font links.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Meta tags | Custom head management | Next.js Metadata API (`metadata` export / `generateMetadata`) | Handles title templates, OG, Twitter, canonical, robots automatically |
| Sitemap | Manual XML file | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Auto-updates with routes, type-safe, cached by default |
| Robots.txt | Static text file | `app/robots.ts` with `MetadataRoute.Robots` | Dynamic, type-safe, references sitemap URL |
| Font loading | `<link>` tags to Google Fonts | `next/font/google` Inter import | Self-hosted, zero CLS, no external requests |
| GA4 integration | Manual `<script>` tags | `@next/third-parties/google` GoogleAnalytics component | Optimized loading, automatic pageview tracking on route change |
| Breadcrumb UI | Custom breadcrumb HTML/CSS | shadcn/ui `breadcrumb` component | Accessible, consistent styling, composable API |
| Mobile nav | Custom drawer/overlay | shadcn/ui `sheet` component | Accessible, animation built-in, focus trapping |
| JSON-LD typing | Manual object shapes | `schema-dts` TypeScript types | Google-maintained, catches schema errors at compile time |
| Core Web Vitals monitoring | Manual performance API | `@vercel/speed-insights` SpeedInsights component | RUM data in Vercel dashboard, zero config |

## Common Pitfalls

### Pitfall 1: Missing Canonical URLs
**What goes wrong:** Google indexes duplicate content if canonical URLs are not set, especially with trailing slash variations.
**Why it happens:** Developers forget to set `alternates.canonical` in metadata for each page.
**How to avoid:** The `createMetadata()` helper MUST require `alternates.canonical` as a parameter. Set `trailingSlash: false` in `next.config.ts` for consistency.
**Warning signs:** Google Search Console showing duplicate pages.

### Pitfall 2: CLS from Font Loading
**What goes wrong:** Flash of unstyled text (FOUT) causes Cumulative Layout Shift.
**Why it happens:** External font loading or incorrect font configuration.
**How to avoid:** Use `next/font/google` with `variable` option. The font is self-hosted and preloaded -- zero external requests. Apply via CSS variable (`--font-inter`) referenced in Tailwind's `@theme inline` as `--font-sans`.
**Warning signs:** LCP > 2.5s, visible font swap on page load.

### Pitfall 3: JSON-LD XSS Vulnerability
**What goes wrong:** Malicious content in JSON-LD payloads can be used for XSS injection.
**Why it happens:** Using `JSON.stringify` without sanitization in `dangerouslySetInnerHTML`.
**How to avoid:** Always replace `<` with `\\u003c` in the JSON string: `JSON.stringify(data).replace(/</g, '\\u003c')`. This is documented in the official Next.js JSON-LD guide.
**Warning signs:** Security audit flagging `dangerouslySetInnerHTML` usage.

### Pitfall 4: Tailwind CSS 4 Config Migration Mistakes
**What goes wrong:** Components styled with Tailwind v3 patterns (JS config, `hsl()` wrappers) break.
**Why it happens:** shadcn/ui CLI v4 generates v4-compatible code, but tutorials/examples online may reference v3 patterns.
**How to avoid:** Never create `tailwind.config.js`. All theming in `globals.css` with `@theme inline`. Colors use OKLCH (shadcn/ui v4 default), not HSL. Use `tw-animate-css` instead of `tailwindcss-animate`.
**Warning signs:** Tailwind classes not applying, color rendering differences.

### Pitfall 5: FAQPage Schema Rich Results Restriction
**What goes wrong:** Expecting FAQ rich results in Google but not getting them.
**Why it happens:** Since 2023, Google restricted FAQPage rich results primarily to authoritative government and health sites for competitive queries.
**How to avoid:** Still include FAQPage schema (it helps AI and other engines) but do NOT depend on it for Google rich results. Focus on BreadcrumbList (reliable) and Article schema.
**Warning signs:** Schema validates in Rich Results Test but no rich results appear in search.

### Pitfall 6: Placeholder Pages Returning 404 or No Content
**What goes wrong:** Google crawls placeholder/coming-soon pages and devalues the site for thin content.
**Why it happens:** Empty placeholder pages with no useful content.
**How to avoid:** Each placeholder page should have a meaningful title, description, brief explanation of what's coming, and links to existing content. Return 200 status (not 404). Include `noindex` in metadata if content is truly thin, but prefer having enough content for indexing.
**Warning signs:** Google Search Console showing "soft 404" or "thin content" warnings.

### Pitfall 7: Analytics Not Tracking Client-Side Navigations
**What goes wrong:** GA4 only tracks the initial page load, not subsequent navigations.
**Why it happens:** Manual GA4 setup via `<script>` tags doesn't handle SPA routing.
**How to avoid:** Use `@next/third-parties/google` GoogleAnalytics component which automatically handles browser history state changes. It tracks client-side navigations out of the box.
**Warning signs:** Page view counts much lower than expected, only landing pages recorded.

### Pitfall 8: YMYL Content Without Adequate Trust Signals
**What goes wrong:** Google deprioritizes the site because finance content lacks E-E-A-T signals.
**Why it happens:** Missing or inadequate About page, no author attribution, no editorial methodology, no disclaimers.
**How to avoid:** Every trust page must be substantive (not boilerplate). The About page needs mission, methodology, team info. Editorial Standards needs specific process details. Disclaimers must be prominent, not buried in footer.
**Warning signs:** Low search rankings despite good content, Search Console manual actions.

## Code Examples

### Disclaimer Banner Component (D-12, TRUST-02)

```typescript
// src/components/trust/disclaimer-banner.tsx
// Source: Pattern derived from D-12 decision + shadcn/ui Alert component
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <Alert variant="default" className="rounded-none border-x-0 border-t-0 bg-muted/50">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm text-muted-foreground">
        For educational purposes only — not financial advice.{' '}
        <a href="/editorial-standards" className="underline hover:text-foreground">
          Learn about our editorial process
        </a>
      </AlertDescription>
    </Alert>
  );
}
```

### Affiliate Disclosure Component (TRUST-01)

```typescript
// src/components/trust/affiliate-disclosure.tsx
// Source: FTC affiliate disclosure requirements
export function AffiliateDisclosure() {
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
    >
      <strong>Disclosure:</strong> Some links on this page are affiliate links.
      We may earn a commission if you make a purchase, at no extra cost to you.
      This does not influence our editorial content.{' '}
      <a href="/editorial-standards" className="underline hover:text-foreground">
        Read our editorial standards
      </a>
    </aside>
  );
}
```

### Author Card Component (TRUST-05)

```typescript
// src/components/trust/author-card.tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AuthorCardProps {
  name: string;
  role: string;
  slug: string;
  methodologyUrl?: string;
}

export function AuthorCard({ name, role, slug, methodologyUrl = '/editorial-standards' }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <Avatar>
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <a href={`/authors/${slug}`} className="text-sm font-medium hover:underline">{name}</a>
        <p className="text-xs text-muted-foreground">{role}</p>
        <a href={methodologyUrl} className="text-xs text-accent hover:underline">
          Our editorial process
        </a>
      </div>
    </div>
  );
}
```

### Navigation Structure

```typescript
// src/lib/navigation.ts
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;  // true for placeholder/coming-soon pages
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Calculators',
    href: '/calculators',
    description: 'Interactive financial calculators',
    disabled: true,  // Coming soon in Phase 2
    children: [
      { title: 'Mortgage Calculator', href: '/calculators/mortgage', disabled: true },
      { title: 'Rent Affordability', href: '/calculators/rent-affordability', disabled: true },
      { title: 'Compound Interest', href: '/calculators/compound-interest', disabled: true },
    ],
  },
  {
    title: 'Guides',
    href: '/guides',
    description: 'Educational financial guides',
    disabled: true,
  },
  {
    title: 'Life Stage Hubs',
    href: '/hubs',
    description: 'Tools organized by life stage',
    disabled: true,
  },
  {
    title: 'Compare',
    href: '/compare',
    description: 'Financial product comparisons',
    disabled: true,
  },
];

export const footerNavigation = {
  tools: [
    { title: 'Calculators', href: '/calculators' },
    { title: 'Comparisons', href: '/compare' },
  ],
  learn: [
    { title: 'Guides', href: '/guides' },
    { title: 'Life Stage Hubs', href: '/hubs' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Editorial Standards', href: '/editorial-standards' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms of Use', href: '/terms' },
    { title: 'Affiliate Disclosure', href: '/editorial-standards#affiliate-disclosure' },
  ],
};
```

### Privacy Policy Required Sections (TRUST-03)

The privacy policy page must include these sections to cover CCPA/GDPR basics:

1. **Information We Collect** -- categories of personal information (analytics data, cookies, device info)
2. **How We Use Your Information** -- purposes (analytics, site improvement, ad personalization)
3. **Cookies and Tracking** -- what cookies are used (GA4, Vercel Analytics), how to opt out
4. **Third-Party Services** -- list GA4, Vercel Analytics, future Mediavine
5. **Your Privacy Rights (CCPA)** -- right to know, right to delete, right to opt-out of sale, non-discrimination
6. **Your Privacy Rights (GDPR)** -- consent, access, rectification, erasure, data portability (applicable to EU visitors)
7. **Data Retention** -- how long data is kept
8. **Children's Privacy** -- COPPA compliance (do not collect from under 13)
9. **Changes to This Policy** -- notification process
10. **Contact Information** -- how to reach the business for privacy requests

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | CSS-first with `@theme inline` in `globals.css` | Tailwind CSS 4.0 (Jan 2025) | No JS config file. Theme via CSS variables. OKLCH colors. |
| `tailwindcss-animate` | `tw-animate-css` | shadcn/ui CLI v4 (Mar 2026) | Drop-in replacement, installed by default |
| HSL color values | OKLCH color values | shadcn/ui CLI v4 (Mar 2026) | Better perceptual uniformity across palette |
| `forwardRef` pattern | Direct props with `data-slot` | React 19 + shadcn/ui v4 | Simpler component code |
| `next-seo` package | Built-in Metadata API | Next.js 13.2+ (stable in 16) | No third-party dependency, native streaming |
| `next-sitemap` package | Built-in `sitemap.ts` | Next.js 13.3+ (stable in 16) | Type-safe, cached Route Handler |
| `framer-motion` import | `motion/react` import | Motion 12.x | Package renamed, same API |
| `next lint` in build | Separate `eslint` CLI command | Next.js 16 | `next build` no longer runs linter automatically |

**Deprecated/outdated:**
- `next-seo`: Unnecessary since Next.js Metadata API
- `next-sitemap`: Unnecessary since native sitemap.ts
- `tailwindcss-animate`: Replaced by `tw-animate-css`
- `Contentlayer`: Abandoned, use Velite
- `framer-motion` import path: Use `motion/react`

## Open Questions

1. **Exact GA4 Measurement ID**
   - What we know: GA4 must be integrated from day one (D-13). Use `@next/third-parties/google` GoogleAnalytics component.
   - What's unclear: The actual GA4 measurement ID (G-XXXXXXXXXX) needs to be created in Google Analytics console.
   - Recommendation: Use an environment variable `NEXT_PUBLIC_GA_ID` so the ID can be set without code changes. The planner should include a task for creating the GA4 property.

2. **Domain Name / Base URL**
   - What we know: The site is called WalletWaypoint.
   - What's unclear: Whether `walletwaypoint.com` is registered and configured.
   - Recommendation: Use a `NEXT_PUBLIC_SITE_URL` environment variable. Default to `http://localhost:3000` for development. Sitemap and canonical URLs reference this variable.

3. **Dark Mode in Phase 1**
   - What we know: POLISH-02 (dark mode toggle) is explicitly deferred to v2. shadcn/ui supports dark mode via `.dark` class.
   - What's unclear: Whether to include dark mode CSS variables now (for future) or skip entirely.
   - Recommendation: Include the `.dark` CSS variables in `globals.css` for future-proofing but do NOT add a toggle or `prefers-color-scheme` detection in Phase 1. Ship light mode only.

4. **Ad Slot Placeholders**
   - What we know: Site must be Mediavine/Raptiv-ready. MONET-04 (ad slot containers) is in v2.
   - What's unclear: Whether to add empty ad container divs now.
   - Recommendation: Skip ad containers in Phase 1. Mediavine requires 50K sessions before qualifying. Focus on content/SEO first.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 16 (requires >= 20.9) | Yes | 22.16.0 | -- |
| npm | Package management | Yes | 10.9.2 | -- |
| npx | create-next-app, shadcn CLI | Yes | 10.9.2 | -- |
| git | Version control | Yes | 2.49.0 | -- |
| GA4 Property | Analytics tracking (D-13) | Unknown | -- | Use env var placeholder, create property when deploying |
| Vercel Account | Deployment, analytics (D-14) | Unknown | -- | Local dev works without it; analytics only activate on Vercel |

**Missing dependencies with no fallback:** None -- all critical tools are available.

**Missing dependencies with fallback:**
- GA4 measurement ID: Use `NEXT_PUBLIC_GA_ID` environment variable with conditional rendering
- Vercel deployment: Local development and `next build` work without Vercel; analytics components are no-ops outside Vercel

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Installation](https://nextjs.org/docs/app/getting-started/installation) - create-next-app setup, project structure, defaults (v16.2.1 docs, updated 2026-03-20)
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Static/dynamic metadata, OG images, streaming metadata
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official JSON-LD implementation pattern with XSS prevention
- [Next.js sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Programmatic sitemap generation, MetadataRoute.Sitemap type
- [Next.js robots.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Programmatic robots.txt generation, MetadataRoute.Robots type
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - next/font/google, self-hosting, variable fonts
- [Next.js Third-Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries) - @next/third-parties GoogleAnalytics component
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) - CLI init, component structure
- [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4) - CSS variables, @theme inline, OKLCH colors
- [shadcn/ui CLI v4 Changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) - March 2026 release features
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights/quickstart) - @vercel/speed-insights setup
- [Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) - @vercel/analytics setup
- npm registry version checks (all packages verified 2026-03-24)

### Secondary (MEDIUM confidence)
- [Google BreadcrumbList Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) - Official Google schema docs
- [BreadcrumbList - Schema.org](https://schema.org/BreadcrumbList) - Schema.org type definition
- [CCPA Privacy Policy Requirements 2025](https://secureprivacy.ai/blog/ccpa-privacy-policy-requirements-2025) - CCPA compliance sections
- [E-E-A-T Guide 2026](https://www.seo-kreativ.de/en/blog/e-e-a-t-guide-for-more-trust-and-top-rankings/) - E-E-A-T signal implementation
- [E-E-A-T Signals 2026](https://systemsarchitect.net/e-e-a-t-signals-what-google-actually-looks-for-with-examples/) - Practical E-E-A-T examples
- [Google Quality Rater Guidelines (Sep 2025)](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf) - Official rater guidelines PDF

### Tertiary (LOW confidence)
- [WebApplication JSON-LD](https://www.darrenlester.com/blog/json-ld-structured-data-for-web-applications) - WebApplication schema structure (single source, blog post)
- [FAQPage Schema Guide 2026](https://schemavalidator.org/guides/faq-schema-markup-guide) - FAQPage rich results restrictions (community source)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified against npm registry, versions confirmed, official docs reviewed
- Architecture: HIGH - Patterns derived from official Next.js 16, shadcn/ui, and Tailwind CSS 4 documentation
- Pitfalls: HIGH - Based on documented breaking changes (Tailwind v4, shadcn/ui v4, Next.js 16) and official guidance (JSON-LD XSS, font optimization)
- E-E-A-T / Trust: MEDIUM - Based on Google Quality Rater Guidelines and SEO community consensus, but Google's exact ranking signals are not public

**Research date:** 2026-03-24
**Valid until:** 2026-04-24 (30 days -- stable ecosystem, no major releases expected)

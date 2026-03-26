# Phase 3: Content System & Life-Stage Hubs - Research

**Researched:** 2026-03-26
**Domain:** MDX content pipeline, Velite collections, life-stage hub architecture, inline glossary system
**Confidence:** HIGH

## Summary

Phase 3 builds the content layer on top of the existing Velite + Next.js SSG infrastructure established in Phases 1-2. The core task is extending `velite.config.ts` with three new collections (guides, hubs, glossary), creating an MDX rendering pipeline with custom components (callout boxes, glossary Term component), building 10 guide pages paired 1:1 with existing calculators, 6 life-stage hub pages, and a glossary system with hover tooltips.

The project already has a proven Velite pattern (YAML calculator configs validated by Zod, imported via `#site/content`, rendered with `generateStaticParams`). Guides will follow the same pattern but use `s.mdx()` for compiled MDX body content instead of pure YAML data. Hubs use YAML config files (like calculators) since their content is structured data referencing guides and calculators, with an optional MDX intro paragraph. The glossary is a single YAML file processed into a typed collection.

**Primary recommendation:** Use Velite's built-in `s.mdx()` schema for guide content compilation (NOT next-mdx-remote), render with the `useMDXComponent` pattern using `new Function()` + `react/jsx-runtime`, and inject custom MDX components (KeyTakeaway, ProTip, Term) at render time via a shared components map. This keeps the architecture consistent with Velite's compilation model and avoids adding next-mdx-remote as an unnecessary dependency.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Comprehensive guides (2000-3000 words) -- full educational articles covering what the concept is, how the math works, common mistakes, worked examples, and FAQs
- **D-02:** Long-form layout with sticky TOC sidebar -- article content centered, sticky table-of-contents on the right (desktop). Collapses to top anchor nav on mobile
- **D-03:** Three distinct callout types -- blue "Key Takeaway" boxes for main points, subtle inline "Definition" highlights for terms, and green "Pro Tip" boxes for actionable advice
- **D-04:** Sticky CTA banner linking to paired calculator -- guide is a standalone page at /guides/[slug], with a persistent banner/card linking to the paired calculator at /calculators/[slug]
- **D-05:** Hero + curated sections layout for hubs -- hero banner with life-stage tagline, then curated sections: "Your Calculators" (card grid), "Guides For You" (article previews), "Quick Tips" (checklist/callouts), "Next Steps" (related hub links)
- **D-06:** Intro paragraph + section intros for hubs -- 2-3 sentence intro setting the scene, then brief 1-2 sentence intros per section
- **D-07:** Calculators + guides only for Phase 3 -- no product recommendation sections until Phase 4
- **D-08:** Shared layout, unique icon + accent color per hub
- **D-09:** Single YAML glossary file -- `content/glossary.yaml` processed by Velite
- **D-10:** Custom MDX component `<Term>APR</Term>` -- explicit author markup, no auto-detection
- **D-11:** Standalone /glossary page -- alphabetical listing, A-Z
- **D-12:** Dotted underline + hover popover -- uses shadcn Tooltip or Popover
- **D-13:** Claude generates drafts, user reviews
- **D-14:** Flat content directory: `content/guides/[slug].mdx`
- **D-15:** Rich frontmatter with Velite schema -- title, description, calculator, hub, readingTime, lastUpdated, keyTakeaways[], faqs[], relatedGuides[]
- **D-16:** YAML config + MDX intro for hubs -- `content/hubs/[slug].yaml` with optional MDX intro

### Claude's Discretion
- Exact Velite schema definitions for guides and hubs collections
- MDX component library design (KeyTakeaway, ProTip, Definition callout implementations)
- TOC generation approach (remark plugin vs manual frontmatter)
- Glossary term selection (which financial terms to include initially)
- Hub accent color palette choices within the established blue-based design system
- Internal linking component implementation (related guides sidebar, next steps cards)
- FAQPage and Article schema markup structure for guide pages
- Reading time calculation approach
- Mobile-responsive behavior for sticky TOC sidebar

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Educational guide page paired with each calculator (10 guides minimum) | Velite MDX collection with `s.mdx()`, `generateStaticParams` pattern from calculator pages, 1:1 slug pairing |
| CONT-02 | Jargon-free "smart friend" tone across all content | Content authoring guidance, Claude-generated drafts with tone guidelines |
| CONT-03 | Scannable layout with callout boxes, key takeaways, and definition highlights | Custom MDX components: KeyTakeaway, ProTip, Definition -- injected via shared components map |
| CONT-04 | Internal linking system (related calculators, related guides, next steps) | Frontmatter `relatedGuides[]`, `calculator` slug, hub cross-references, RelatedContent component |
| CONT-05 | Inline financial glossary with hover tooltips for common terms | Velite YAML glossary collection, `<Term>` MDX component, shadcn Popover for hover/tap |
| HUB-01 | Student/New Grad hub | Hub YAML config referencing calculator + guide slugs, hub page template |
| HUB-02 | First-Time Renter hub | Same hub infrastructure, unique icon + accent color |
| HUB-03 | First Home Buyer hub | Same hub infrastructure, unique icon + accent color |
| HUB-04 | Rent vs Buy hub | Same hub infrastructure, unique icon + accent color |
| HUB-05 | Freelancer/Self-Employed hub | Same hub infrastructure, unique icon + accent color |
| HUB-06 | Pre-Retirement hub | Same hub infrastructure, unique icon + accent color |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Velite | 0.3.1 | Content data layer -- MDX compilation + YAML processing | Already in project, proven with calculator configs |
| Next.js | 16.2.1 | SSG with `generateStaticParams`, App Router | Already in project |
| React | 19.2.4 | UI rendering, Server Components for guide pages | Already in project |
| Tailwind CSS | 4.x | Styling for callout boxes, TOC, hub layouts | Already in project |
| shadcn/ui (Base UI) | 4.x | Tooltip/Popover for glossary, Card for hub sections, Accordion for FAQ | Already in project |
| Lucide React | 1.0.1+ | Hub icons, callout icons | Already in project |
| schema-dts | 2.0.0 | Type-safe Article + FAQPage JSON-LD | Already in project |

### New Dependencies Required
| Library | Version | Purpose | Why Needed |
|---------|---------|---------|------------|
| rehype-slug | 6.0.0 | Add `id` attributes to MDX headings for TOC anchor links | Required for sticky TOC sidebar, standard rehype plugin |
| rehype-autolink-headings | 7.1.0 | Add self-linking anchors to headings | Pairs with rehype-slug for clickable heading links |

### NOT Needed
| Library | Reason |
|---------|--------|
| next-mdx-remote | Velite's `s.mdx()` already compiles MDX to function-body strings; `useMDXComponent` pattern renders them. Adding next-mdx-remote would duplicate compilation and add unnecessary complexity. |
| remark-toc | TOC will be generated at render time by parsing heading structure from the compiled MDX, not injected into the MDX content itself. A client-side TOC component using IntersectionObserver provides scroll-tracking and active heading highlighting. |
| tocbot | Heavyweight DOM-based TOC library; custom React component is lighter and more controllable |
| @mdx-js/mdx | Velite handles MDX compilation internally |

**Installation:**
```bash
npm install rehype-slug rehype-autolink-headings
```

## Architecture Patterns

### Recommended Project Structure
```
content/
  calculators/             # Existing YAML configs (10 files)
  guides/                  # NEW: MDX guide files (10 files)
    mortgage-payment.mdx
    rent-affordability.mdx
    compound-interest.mdx
    loan-repayment.mdx
    savings-goal.mdx
    retirement.mdx
    budget.mdx
    tax-estimator.mdx
    rent-vs-buy.mdx
    student-loan.mdx
  hubs/                    # NEW: YAML hub configs (6 files)
    student-new-grad.yaml
    first-time-renter.yaml
    first-home-buyer.yaml
    rent-vs-buy.yaml
    freelancer.yaml
    pre-retirement.yaml
  glossary.yaml            # NEW: Single glossary file

src/
  app/
    guides/
      page.tsx             # Replace placeholder with real index
      layout.tsx           # Existing (has DisclaimerBanner)
      [slug]/
        page.tsx           # NEW: Dynamic guide page (SSG)
    hubs/
      page.tsx             # Replace placeholder with real index
      [slug]/
        page.tsx           # NEW: Dynamic hub page (SSG)
    glossary/
      page.tsx             # NEW: Standalone glossary page
  components/
    content/               # NEW: Content-specific components
      mdx-content.tsx      # MDX renderer (useMDXComponent pattern)
      mdx-components.tsx   # Shared component map (KeyTakeaway, ProTip, Term, etc.)
      key-takeaway.tsx     # Blue callout box
      pro-tip.tsx          # Green callout box
      definition.tsx       # Inline definition highlight
      term.tsx             # Glossary term with hover popover
      table-of-contents.tsx # Sticky TOC sidebar with scroll tracking
      related-content.tsx  # Related guides / next steps cards
      guide-cta-banner.tsx # Sticky CTA linking to paired calculator
      hub-hero.tsx         # Hub page hero banner
      hub-section.tsx      # Hub curated section (calculator grid, guide previews)
      next-steps.tsx       # Related hub links component
```

### Pattern 1: Velite MDX Collection for Guides

**What:** Extend `velite.config.ts` with a guides collection using `s.mdx()` for body content and rich frontmatter validated by Zod.

**When to use:** All 10 guide pages. Each MDX file has YAML frontmatter + MDX body with custom components.

**Example:**
```typescript
// velite.config.ts (addition)
const guides = defineCollection({
  name: 'Guide',
  pattern: 'guides/*.mdx',
  schema: s.object({
    slug: s.slug('guides'),
    title: s.string().max(120),
    description: s.string().max(300),
    calculator: s.string(),          // paired calculator slug
    hub: s.string(),                 // life-stage hub slug
    lastUpdated: s.isodate(),
    keyTakeaways: s.array(s.string()),
    faqs: s.array(s.object({
      question: s.string(),
      answer: s.string(),
    })),
    relatedGuides: s.array(s.string()).optional(),
    metadata: s.metadata(),          // auto reading time + word count
    body: s.mdx(),                   // compiled MDX body
  }),
});
```

**Confidence:** HIGH -- `s.mdx()` and `s.metadata()` are documented Velite schemas, validated against official docs.

### Pattern 2: Velite YAML Collection for Hubs

**What:** Hub pages are structured data (references to calculators, guides, tips) stored as YAML, NOT free-form MDX. Optional editorial intro stored separately.

**Example:**
```typescript
// velite.config.ts (addition)
const hubs = defineCollection({
  name: 'Hub',
  pattern: 'hubs/*.yaml',
  schema: s.object({
    slug: s.slug('hubs'),
    name: s.string(),
    tagline: s.string(),
    description: s.string(),
    icon: s.string(),                 // Lucide icon name
    accentColor: s.string(),          // OKLCH color value
    calculatorSlugs: s.array(s.string()),
    guideSlugs: s.array(s.string()),
    tips: s.array(s.object({
      title: s.string(),
      description: s.string(),
    })),
    nextSteps: s.array(s.object({
      hubSlug: s.string(),
      label: s.string(),
    })),
  }),
});
```

**Confidence:** HIGH -- follows the exact same pattern as the existing calculator YAML collection.

### Pattern 3: Velite YAML Collection for Glossary

**What:** Single `content/glossary.yaml` file with all financial terms, processed by Velite into a typed array.

**Example:**
```typescript
// velite.config.ts (addition)
const glossary = defineCollection({
  name: 'GlossaryTerm',
  pattern: 'glossary.yaml',
  single: true,
  schema: s.object({
    terms: s.array(s.object({
      term: s.string(),
      slug: s.slug('glossary'),
      definition: s.string().max(300),
      longDefinition: s.string().optional(),
    })),
  }),
});
```

**Confidence:** HIGH -- Velite supports `single: true` for single-file collections, documented in official guide.

### Pattern 4: MDX Rendering with useMDXComponent

**What:** Velite's `s.mdx()` compiles MDX to a function-body string at build time. At render time, execute it with `new Function()` and inject custom components.

**Why:** This is Velite's documented rendering approach. It avoids adding next-mdx-remote as a dependency and keeps the content pipeline self-contained.

**Example:**
```typescript
// src/components/content/mdx-content.tsx
'use client';

import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from './mdx-components';

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
}
```

```typescript
// src/components/content/mdx-components.tsx
import { KeyTakeaway } from './key-takeaway';
import { ProTip } from './pro-tip';
import { Definition } from './definition';
import { Term } from './term';

export const mdxComponents = {
  KeyTakeaway,
  ProTip,
  Definition,
  Term,
  // Override default HTML elements for consistent styling
  h2: (props: any) => <h2 id={props.id} className="mt-10 mb-4 text-xl font-semibold" {...props} />,
  h3: (props: any) => <h3 id={props.id} className="mt-8 mb-3 text-lg font-semibold" {...props} />,
  p: (props: any) => <p className="mb-4 text-base leading-[1.7]" {...props} />,
  ul: (props: any) => <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]" {...props} />,
  ol: (props: any) => <ol className="mb-4 list-decimal space-y-2 pl-6 text-base leading-[1.6]" {...props} />,
  a: (props: any) => <a className="text-accent underline hover:text-foreground" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-accent/30 pl-4 italic text-muted-foreground" {...props} />,
  table: (props: any) => <div className="overflow-x-auto mb-4"><table className="w-full text-sm" {...props} /></div>,
};
```

**Confidence:** HIGH -- documented pattern from Velite official snippets page, uses standard `react/jsx-runtime`.

**Important caveat:** The `useMDXComponent` function uses `new Function()` which requires the component to be a Client Component (`'use client'`). The guide page itself is a Server Component that passes the compiled code string to this client component.

### Pattern 5: Sticky TOC Sidebar with Scroll Tracking

**What:** Client-side TOC component that extracts headings from the rendered DOM using `querySelectorAll`, tracks scroll position with `IntersectionObserver`, and highlights the active heading.

**When to use:** Guide pages on desktop (>= 1024px). Collapses to horizontal anchor nav on mobile.

**Example approach:**
```typescript
// src/components/content/table-of-contents.tsx
'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract h2/h3 headings from the article element
    const article = document.querySelector('article');
    if (!article) return;
    const elements = article.querySelectorAll('h2[id], h3[id]');
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName[1]),
    }));
    setHeadings(items);

    // IntersectionObserver for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-24 hidden lg:block" aria-label="Table of contents">
      {/* ... render heading links with active state */}
    </nav>
  );
}
```

**Confidence:** HIGH -- IntersectionObserver-based TOC is the standard pattern for Next.js MDX blogs. Well-documented across multiple sources.

### Pattern 6: Guide Page Route (SSG)

**What:** Dynamic route at `src/app/guides/[slug]/page.tsx` following the exact pattern established by calculator pages.

**Example:**
```typescript
// src/app/guides/[slug]/page.tsx
import { guides } from '#site/content';
import { MDXContent } from '@/components/content/mdx-content';
import { ArticleSchema } from '@/components/seo/article-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import { createMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      <ArticleSchema ... />
      {guide.faqs.length > 0 && <FaqSchema items={guide.faqs} />}
      {/* Two-column layout: article + sticky TOC */}
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
          <article>
            <MDXContent code={guide.body} />
          </article>
          <TableOfContents />
        </div>
      </div>
    </>
  );
}
```

**Confidence:** HIGH -- mirrors the existing calculator `[slug]/page.tsx` pattern exactly.

### Pattern 7: Hub Page Route (SSG)

**What:** Hub pages render structured YAML data (not MDX) into a templated layout with curated sections.

**Example:**
```typescript
// src/app/hubs/[slug]/page.tsx
import { hubs, calculators, guides } from '#site/content';
// Hub page resolves calculator/guide slugs to full objects for rendering
export default async function HubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = hubs.find((h) => h.slug === slug);
  if (!hub) notFound();

  const hubCalculators = calculators.filter((c) => hub.calculatorSlugs.includes(c.slug));
  const hubGuides = guides.filter((g) => hub.guideSlugs.includes(g.slug));

  return (
    <>
      <HubHero name={hub.name} tagline={hub.tagline} icon={hub.icon} accentColor={hub.accentColor} />
      <HubSection title="Your Calculators" items={hubCalculators} type="calculator" />
      <HubSection title="Guides For You" items={hubGuides} type="guide" />
      <QuickTips tips={hub.tips} />
      <NextSteps steps={hub.nextSteps} />
    </>
  );
}
```

**Confidence:** HIGH -- pure data rendering, no MDX compilation needed.

### Anti-Patterns to Avoid
- **Using next-mdx-remote with Velite:** Velite already compiles MDX. Using next-mdx-remote would mean compiling MDX twice or bypassing Velite's compilation. Stick with Velite's `s.mdx()` + `useMDXComponent`.
- **Auto-detecting glossary terms:** D-10 explicitly requires explicit `<Term>` markup. Auto-detection via regex would cause false positives and unexpected behavior.
- **Storing hub content as MDX:** Hubs are structured data (lists of calculator/guide references, tips, next steps). MDX would be overkill. YAML keeps the data queryable and type-safe.
- **Server-side TOC generation via remark plugin:** Remark-toc injects the TOC into the content itself. For a sticky sidebar TOC, the TOC needs to be a separate component. Client-side extraction with IntersectionObserver is the correct pattern.
- **Importing Lucide icons dynamically in hub configs:** The existing `action-callout.tsx` already has a `getIcon()` pattern using dynamic import from lucide-react. Reuse this pattern for hub icons.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Heading IDs for TOC links | Custom heading ID generator | rehype-slug plugin | Handles edge cases (duplicate headings, special chars, unicode) |
| Reading time calculation | Custom word count / WPM calculation | Velite `s.metadata()` | Built-in, tested, returns `readingTime` and `wordCount` automatically |
| MDX compilation | Custom MDX compiler | Velite `s.mdx()` | Already handles compilation at build time with remark/rehype pipeline |
| Scroll-linked heading anchor links | Custom scroll handler | rehype-autolink-headings | Standardized approach, accessible, configurable behavior |
| Hover popover positioning | Custom absolute positioning | shadcn/ui Popover (Base UI) | Handles edge detection, viewport boundaries, mobile tap |

## Common Pitfalls

### Pitfall 1: MDX Content is a Client Component Boundary
**What goes wrong:** The `useMDXComponent` pattern uses `new Function()` which only works in client-side JavaScript. Developers might try to render MDX in a Server Component.
**Why it happens:** The guide page route is a Server Component, but the MDX renderer must be a Client Component.
**How to avoid:** Create `MDXContent` as a `'use client'` component. The Server Component page passes the compiled code string (serializable) as a prop.
**Warning signs:** "new Function is not defined" or "Cannot use 'new Function' in Server Component" errors.

### Pitfall 2: Velite Collection Name Conflicts
**What goes wrong:** Velite requires unique collection names. Using duplicate `s.slug()` scopes causes build failures.
**Why it happens:** If both guides and hubs use `s.slug('global')` or the same scope string.
**How to avoid:** Use distinct scope strings: `s.slug('guides')`, `s.slug('hubs')`, `s.slug('glossary')`.
**Warning signs:** Velite build errors about duplicate slugs.

### Pitfall 3: Glossary Term Component Must Be Client-Side
**What goes wrong:** The `<Term>` component needs to show a hover popover, which requires client-side interactivity (event handlers, state).
**Why it happens:** Tooltips/popovers are inherently interactive UI.
**How to avoid:** The `Term` component should be a Client Component. It receives the glossary data as a prop (or imports it from the compiled Velite output). Since it is injected via `mdxComponents` inside the `MDXContent` client boundary, it automatically runs on the client.
**Warning signs:** Popover not appearing, event handlers not firing.

### Pitfall 4: Popover vs Tooltip for Glossary Terms
**What goes wrong:** Using shadcn Tooltip requires a wrapping `TooltipProvider` and doesn't handle mobile tap well. The existing tooltip component has dark background (bg-foreground) which may not suit longer definitions.
**Why it happens:** The existing tooltip component is designed for short hints, not 2-3 sentence definitions.
**How to avoid:** Use shadcn **Popover** component instead of Tooltip. Popover supports click/tap activation (better for mobile), allows more content, has light background by default, and can include formatted text. Will need to install the Popover component via shadcn CLI: `npx shadcn@latest add popover`.
**Warning signs:** Definitions truncated, poor mobile UX, dark tooltip hard to read for long text.

### Pitfall 5: MDX Rehype Plugin Order
**What goes wrong:** Heading IDs not generated, autolink anchors missing.
**Why it happens:** rehype-slug must run before rehype-autolink-headings. If order is wrong, headings have no IDs when the autolink plugin runs.
**How to avoid:** In `velite.config.ts` MDX options, always put rehype-slug first: `rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]`.
**Warning signs:** Headings have no `id` attribute in rendered HTML.

### Pitfall 6: Sitemap and Navigation Not Updated
**What goes wrong:** New guide and hub pages are not included in the XML sitemap or navigation.
**Why it happens:** The current `sitemap.ts` has hardcoded routes. The `navigation.ts` has placeholder entries with `disabled: true`.
**How to avoid:** Update `sitemap.ts` to dynamically import guides and hubs from `#site/content` and generate sitemap entries. Enable navigation links in `navigation.ts`.
**Warning signs:** Guide/hub pages not appearing in search console, navigation links still disabled.

### Pitfall 7: Hub Accent Colors Must Use CSS Custom Properties
**What goes wrong:** Hard-coded color classes in hub templates can't be changed per-hub.
**Why it happens:** Each hub has a unique accent color, but Tailwind classes must be known at build time.
**How to avoid:** Use inline CSS custom properties (CSS variables) on the hub container: `style={{ '--hub-accent': hub.accentColor }}`. Then reference with `text-[--hub-accent]` or arbitrary value classes.
**Warning signs:** All hubs look the same, Tailwind purging removes dynamic class names.

## Code Examples

### Guide MDX Frontmatter Format
```mdx
---
slug: mortgage-payment
title: "How Mortgage Payments Actually Work"
description: "A clear breakdown of principal, interest, taxes, and insurance -- and how to lower your monthly payment."
calculator: mortgage-payment
hub: first-home-buyer
lastUpdated: 2026-03-26
keyTakeaways:
  - "Your monthly payment includes principal, interest, taxes, and insurance (PITI)"
  - "A higher down payment reduces both your loan amount and your interest rate"
  - "Over a 30-year mortgage, you'll typically pay more in interest than the home's price"
faqs:
  - question: "What is included in a mortgage payment?"
    answer: "A mortgage payment typically includes four components: principal (paying down the loan), interest (the cost of borrowing), property taxes, and homeowner's insurance. This is often abbreviated as PITI."
  - question: "How much house can I afford?"
    answer: "Most financial advisors recommend keeping your total housing costs below 28% of your gross monthly income. Use our mortgage calculator to see exactly how different home prices affect your monthly payment."
relatedGuides:
  - rent-vs-buy
  - savings-goal
---

## What is a Mortgage Payment?

When you buy a home with a mortgage, your lender gives you a large sum of money...

<KeyTakeaway>
Your monthly mortgage payment is not just the loan -- it includes principal, interest, taxes, and insurance (PITI).
</KeyTakeaway>

## How the Math Works

The standard mortgage payment formula calculates...

<Term>amortization</Term> means your payment stays the same each month, but the split between principal and interest shifts over time...

<ProTip>
Making just one extra payment per year can shave 4-5 years off a 30-year mortgage and save tens of thousands in interest.
</ProTip>
```

### Hub YAML Config Format
```yaml
# content/hubs/first-home-buyer.yaml
slug: first-home-buyer
name: "First Home Buyer"
tagline: "Your roadmap from dreaming to closing day"
description: "Everything you need to understand mortgages, save for a down payment, and make your first home purchase with confidence."
icon: Home
accentColor: "oklch(0.55 0.12 175)"

calculatorSlugs:
  - mortgage-payment
  - savings-goal
  - rent-vs-buy

guideSlugs:
  - mortgage-payment
  - savings-goal
  - rent-vs-buy

tips:
  - title: "Get pre-approved before house hunting"
    description: "A pre-approval letter shows sellers you're serious and helps you know your real budget."
  - title: "Budget for closing costs"
    description: "Expect 2-5% of the home price in closing costs on top of your down payment."
  - title: "Don't open new credit lines before closing"
    description: "New credit inquiries can lower your score and jeopardize your mortgage approval."

nextSteps:
  - hubSlug: first-time-renter
    label: "Still renting? Start here"
  - hubSlug: freelancer
    label: "Self-employed? Special mortgage considerations"
```

### Glossary YAML Format
```yaml
# content/glossary.yaml
terms:
  - term: APR
    slug: apr
    definition: "Annual Percentage Rate -- the total yearly cost of borrowing, including interest and fees, expressed as a percentage."
    longDefinition: "APR includes the interest rate plus any additional fees charged by the lender (origination fees, closing costs, etc.), giving you a more complete picture of what a loan actually costs compared to the interest rate alone."
  - term: DTI
    slug: dti
    definition: "Debt-to-Income ratio -- the percentage of your gross monthly income that goes toward debt payments."
  - term: Amortization
    slug: amortization
    definition: "The process of spreading a loan into a series of fixed payments over time, where each payment covers both principal and interest."
  - term: Principal
    slug: principal
    definition: "The original amount of money borrowed in a loan, not including interest."
  - term: Escrow
    slug: escrow
    definition: "A third-party account where funds are held during a transaction, commonly used for property taxes and insurance in mortgage payments."
  # ... (20-30 terms covering key financial vocabulary)
```

### Popover Component Installation
```bash
npx shadcn@latest add popover
```

### Term Component with Popover
```typescript
// src/components/content/term.tsx
'use client';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { glossary } from '#site/content';

interface TermProps {
  children: string;
}

export function Term({ children }: TermProps) {
  const termText = children.toString().toLowerCase();
  const entry = glossary.terms.find(
    (t) => t.term.toLowerCase() === termText
  );
  if (!entry) return <span>{children}</span>;

  return (
    <Popover>
      <PopoverTrigger className="cursor-help border-b border-dotted border-muted-foreground/50 text-inherit">
        {children}
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm">
        <p className="font-semibold mb-1">{entry.term}</p>
        <p className="text-muted-foreground">{entry.definition}</p>
      </PopoverContent>
    </Popover>
  );
}
```

### Hub Accent Color Pattern
```typescript
// Inline CSS variable approach for per-hub accent color
<div style={{ '--hub-accent': hub.accentColor } as React.CSSProperties}>
  <div className="text-[color:var(--hub-accent)]">
    {/* Hub content with accent color */}
  </div>
</div>
```

### velite.config.ts MDX Options with Rehype Plugins
```typescript
// In velite.config.ts defineConfig:
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  root: 'content',
  output: { ... },
  collections: { calculators, guides, hubs, glossary },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Contentlayer for MDX data layer | Velite 0.3.x | 2024 | Contentlayer abandoned; Velite is the successor with Zod-native schemas |
| next-mdx-remote/serialize + hydrate | next-mdx-remote/rsc (RSC native) | 2024 (v5+) | Compilation and rendering unified in RSC; but NOT needed with Velite |
| Radix UI Tooltip | Base UI Tooltip/Popover | 2025-2026 | shadcn/ui v4 uses Base UI; Popover component uses `@base-ui/react/popover` |
| remark-toc (inject TOC into content) | Client-side IntersectionObserver TOC | 2023+ | Sidebar TOC with scroll tracking is the standard for long-form content |
| Manual reading time calculation | Velite `s.metadata()` | Built-in | Automatic readingTime and wordCount extraction |

**Deprecated/outdated:**
- Contentlayer: Abandoned, do not use
- next-mdx-remote < v5: Pages Router pattern, replaced by RSC approach
- @mdx-js/react MDXProvider: Does not work with RSC (no React Context in Server Components)

## Open Questions

1. **Glossary Term Import in Client Component**
   - What we know: The `<Term>` component needs access to the glossary data. Since it runs inside the `MDXContent` client boundary, it can import from `#site/content`.
   - What's unclear: Whether importing `glossary` from `#site/content` inside a client component causes the entire glossary JSON to be bundled into each guide page's client JS.
   - Recommendation: If bundle size is a concern, pass the glossary data as a prop from the Server Component page through to `MDXContent`, which passes it to the `Term` component via a context or component prop override. Alternatively, the glossary is small (20-30 terms, ~2KB) so direct import is acceptable.

2. **Hub Intro Paragraph (D-16 Optional MDX)**
   - What we know: D-16 says optional MDX file for editorial intro paragraph alongside YAML config.
   - What's unclear: Whether to make the hub schema support an optional `intro: s.mdx()` field within the YAML file, or use a separate MDX file.
   - Recommendation: Keep it simple -- add an `intro` string field to the hub YAML schema (plain text, not MDX). If rich formatting is needed later, add a separate `content/hubs/[slug].mdx` file. For Phase 3, a 2-3 sentence plain text intro is sufficient for the "smart friend" scene-setting described in D-06.

3. **Ten Guides Content Scope**
   - What we know: 10 guides at 2000-3000 words each = 20,000-30,000 words of content.
   - What's unclear: Exact guide pairings and content outline per guide.
   - Recommendation: Use the existing 10 calculator slugs as 1:1 guide slugs. Each guide title follows the pattern "How [Topic] Actually Works" or "Understanding [Topic]: A Complete Guide". Claude generates first drafts following the frontmatter schema and using KeyTakeaway/ProTip/Term components.

## Guide-to-Calculator Slug Mapping

| Calculator Slug | Guide Slug | Guide Title (suggested) |
|----------------|------------|------------------------|
| mortgage-payment | mortgage-payment | How Mortgage Payments Actually Work |
| rent-affordability | rent-affordability | How Much Rent Can You Really Afford? |
| compound-interest | compound-interest | Understanding Compound Interest: Your Money's Best Friend |
| loan-repayment | loan-repayment | Paying Off Loans Faster: A Complete Guide |
| savings-goal | savings-goal | How to Set (and Actually Hit) a Savings Goal |
| retirement | retirement | Retirement Planning: How Much Do You Really Need? |
| budget | budget | The 50/30/20 Budget Rule Explained |
| tax-estimator | tax-estimator | Understanding Your Federal Taxes: A Plain-English Guide |
| rent-vs-buy | rent-vs-buy | Rent vs Buy: The Real Math Behind the Decision |
| student-loan | student-loan | Student Loan Repayment Plans Compared |

## Hub-to-Content Mapping

| Hub Slug | Calculators | Guides | Icon | Accent Color Recommendation |
|----------|-------------|--------|------|-----------------------------|
| student-new-grad | student-loan, budget, savings-goal | student-loan, budget, savings-goal | GraduationCap | oklch(0.55 0.12 145) -- green |
| first-time-renter | rent-affordability, budget | rent-affordability, budget | Building | oklch(0.55 0.1 200) -- sky blue |
| first-home-buyer | mortgage-payment, savings-goal, rent-vs-buy | mortgage-payment, savings-goal, rent-vs-buy | Home | oklch(0.55 0.12 175) -- teal (matches existing accent) |
| rent-vs-buy | rent-vs-buy, mortgage-payment, compound-interest | rent-vs-buy, mortgage-payment, compound-interest | Scale | oklch(0.50 0.1 260) -- indigo |
| freelancer | tax-estimator, budget, savings-goal, retirement | tax-estimator, budget, savings-goal, retirement | Briefcase | oklch(0.55 0.12 45) -- amber |
| pre-retirement | retirement, compound-interest, savings-goal | retirement, compound-interest, savings-goal | Landmark | oklch(0.40 0.1 245) -- navy (matches primary) |

## Glossary Initial Terms (Recommended 25)

APR, DTI, Amortization, Principal, Interest, Escrow, PMI, Equity, Pre-approval, Closing Costs, Credit Score, Down Payment, Fixed Rate, Variable Rate, Compound Interest, Inflation, Net Worth, Gross Income, Deduction, Filing Status, Tax Bracket, Emergency Fund, Opportunity Cost, Refinancing, Index Fund

## Sources

### Primary (HIGH confidence)
- [Velite MDX Support](https://velite.js.org/guide/using-mdx) -- s.mdx() schema, useMDXComponent rendering pattern
- [Velite Define Collections](https://velite.js.org/guide/define-collections) -- Collection patterns, YAML/MDX configuration
- [Velite Schemas Reference](https://velite.js.org/guide/velite-schemas) -- s.metadata(), s.slug(), s.mdx(), s.isodate() signatures
- [Velite Configuration Reference](https://velite.js.org/reference/config) -- MDX rehype/remark plugin configuration
- [Velite Snippets](https://velite.js.org/other/snippets) -- useMDXComponent code pattern, Next.js integration
- [Velite GitHub Example](https://github.com/zce/velite/blob/main/examples/nextjs/velite.config.ts) -- Full Next.js collection config example
- [rehype-slug npm](https://www.npmjs.com/package/rehype-slug) -- v6.0.0
- [rehype-autolink-headings npm](https://www.npmjs.com/package/rehype-autolink-headings) -- v7.1.0
- [Google FAQPage Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) -- FAQPage schema requirements

### Secondary (MEDIUM confidence)
- [shadcn/ui Popover (Base UI)](https://ui.shadcn.com/docs/components/base/popover) -- Base UI popover component for glossary terms
- [next-mdx-remote GitHub](https://github.com/hashicorp/next-mdx-remote) -- Confirmed RSC approach exists but NOT needed with Velite

### Tertiary (LOW confidence)
- None -- all key findings verified against primary sources

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js 16.2 with React 19, Tailwind CSS 4.x, Velite 0.3, Zod 4.3 -- all already installed
- **SEO:** Must be SSR/SSG for crawlability. Guide and hub pages MUST use `generateStaticParams` for static generation
- **Performance:** Core Web Vitals must pass (LCP < 2.5s, CLS < 0.1). Large MDX bundles and unoptimized images are risks
- **Content:** Must be genuinely useful, E-E-A-T compliance for YMYL content. Guides need Article + FAQPage schema markup
- **Legal:** Financial disclaimers required. DisclaimerBanner already in guides layout. Must be present on hub pages too
- **Monetization:** Mediavine/Raptiv-ready. Ad slot containers should be considered in guide/hub layouts (placeholder only)
- **shadcn/ui uses Base UI (NOT Radix):** All UI components use `@base-ui/react` primitives, not Radix. Popover will use `@base-ui/react/popover`
- **Button composition uses render prop:** Not `asChild`. Pattern: `<Button nativeButton={false} render={<Link href="..." />}>`
- **Velite programmatic API:** Project uses programmatic Velite (not VeliteWebpackPlugin) for Turbopack compatibility
- **Content imports via `#site/content`:** Alias mapped to `.velite/` output directory
- **OKLCH color system:** All colors use OKLCH. Hub accent colors must follow this convention
- **Max width patterns:** Trust/article pages use `max-w-[720px]`, calculator pages use `max-w-[1080px]`. Guide pages should use a wider layout to accommodate TOC sidebar

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and proven in project; only rehype-slug and rehype-autolink-headings are new (well-established packages)
- Architecture: HIGH -- follows exact patterns established by calculator pages (Velite collection, generateStaticParams, dynamic routes)
- Pitfalls: HIGH -- documented from real codebase analysis (Base UI vs Radix, client/server boundaries, existing component patterns)
- Content mapping: MEDIUM -- guide titles and hub-to-content associations are recommendations, subject to user review

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (stable stack, no fast-moving dependencies)

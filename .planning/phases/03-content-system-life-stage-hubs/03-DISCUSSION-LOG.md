# Phase 3: Content System & Life-Stage Hubs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 03-content-system-life-stage-hubs
**Areas discussed:** Guide page structure, Hub page design, Glossary & tooltips, Content authoring

---

## Guide Page Structure

### Guide depth

| Option | Description | Selected |
|--------|-------------|----------|
| Comprehensive (2000-3000 words) | Full educational article: concept, math, mistakes, examples, FAQs. Best for YMYL SEO. | ✓ |
| Medium (1000-1500 words) | Focused explainer: key concepts, calculator usage, tips, brief FAQ. | |
| Quick reference (500-800 words) | Concise overview with definitions, tips, CTA to calculator. | |

**User's choice:** Comprehensive (2000-3000 words)

### Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Long-form with sticky TOC sidebar | Article centered, sticky TOC on right (desktop). Scannable sections, callout boxes. | ✓ |
| Tabbed sections | Content split into tabs. Compact but hides content from crawlers. | |
| Single scroll with anchor nav | Full content in one column, top anchor links. Simpler, all visible to crawlers. | |

**User's choice:** Long-form with sticky TOC sidebar

### Callouts

| Option | Description | Selected |
|--------|-------------|----------|
| Key Takeaway + Definition + Pro Tip | Three distinct types: blue takeaway, inline definition, green pro tip. Maps to CONT-03. | ✓ |
| Single callout style | One generic callout box. Simpler but less scannable. | |
| Callouts + interactive examples | Callouts plus embedded mini-calculators. More engaging but complex. | |

**User's choice:** Key Takeaway + Definition + Pro Tip

### Calculator-guide linking

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky CTA banner linking to calculator | Guide is standalone at /guides/[slug], persistent banner links to /calculators/[slug]. Two indexable pages. | ✓ |
| Calculator embedded in guide | Full calculator widget embedded at top of guide. One page, longer load. | |
| Side-by-side split | Calculator on one side, guide on other. Desktop-only, complex responsive. | |

**User's choice:** Sticky CTA banner linking to calculator

---

## Hub Page Design

### Hub layout

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + curated sections | Hero banner with tagline, then curated sections: Calculators, Guides, Tips, Next Steps. | ✓ |
| Dashboard-style grid | Minimal narrative, mostly card grid linking to tools. Quick access, less editorial. | |
| Long-form landing page | Full editorial article with tools woven in. More like a mega-guide. | |

**User's choice:** Hero + curated sections

### Hub voice

| Option | Description | Selected |
|--------|-------------|----------|
| Intro paragraph + section intros | 2-3 sentence scene-setting intro, brief section intros. Smart friend tone. | ✓ |
| Minimal — headings and cards only | No narrative prose. Clean and fast but less differentiated. | |
| Heavy editorial — full article wrapper | 1000+ words wrapping tool links. More SEO but blurs hub/guide line. | |

**User's choice:** Intro paragraph + section intros

### Hub scope

| Option | Description | Selected |
|--------|-------------|----------|
| Calculators + guides only | Clean for Phase 3. Add product sections in Phase 4. | ✓ |
| Include placeholder product sections | Coming Soon product sections. Shows full vision, adds complexity. | |

**User's choice:** Calculators + guides only

### Hub theming

| Option | Description | Selected |
|--------|-------------|----------|
| Shared layout, unique icon + accent color | Same structure, distinct icon and accent per hub. Light theming. | ✓ |
| Fully themed per hub | Unique hero image, color scheme, layout per hub. Harder to maintain. | |
| Identical styling | All hubs look the same except content. Simplest. | |

**User's choice:** Shared layout, unique icon + accent color

---

## Glossary & Tooltips

### Glossary data source

| Option | Description | Selected |
|--------|-------------|----------|
| Single YAML glossary file | One content/glossary.yaml, processed by Velite. Single source of truth. | ✓ |
| Per-guide frontmatter | Each MDX guide defines its own terms. Scoped but duplicative. | |
| Separate MDX files per term | Each term gets its own MDX file. More SEO surface but complex. | |

**User's choice:** Single YAML glossary file

### Term markup

| Option | Description | Selected |
|--------|-------------|----------|
| Custom MDX component: `<Term>APR</Term>` | Authors wrap terms explicitly. No false positives. | ✓ |
| Auto-detect on first occurrence | Remark/rehype plugin auto-wraps. Zero friction but false positive risk. | |
| Markdown link syntax | Links to /glossary#term with tooltip behavior. Familiar but verbose. | |

**User's choice:** Custom MDX component

### Standalone glossary page

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, alphabetical glossary page | /glossary with A-Z terms. Good for SEO, internal link hub. | ✓ |
| No standalone page | Terms only as inline tooltips. Simpler, less SEO. | |

**User's choice:** Yes, alphabetical glossary page

### Tooltip UX

| Option | Description | Selected |
|--------|-------------|----------|
| Dotted underline + hover popover | Subtle dotted underline, hover shows popover. Tap on mobile. Uses shadcn. | ✓ |
| Highlighted background + click modal | Light background highlight, click opens modal. More prominent. | |
| Sidebar glossary panel | Underlined terms, click opens sidebar panel. Desktop-only. | |

**User's choice:** Dotted underline + hover popover

---

## Content Authoring

### Initial content author

| Option | Description | Selected |
|--------|-------------|----------|
| Claude generates drafts, you review | Claude writes comprehensive drafts in smart friend tone. Fastest path. | ✓ |
| You write all content manually | Full manual authoring. Highest quality control, most time. | |
| Structured templates, Claude fills in | Rigid section template, Claude fills sections. Middle ground. | |

**User's choice:** Claude generates drafts, you review

### File layout

| Option | Description | Selected |
|--------|-------------|----------|
| content/guides/[slug].mdx | Flat directory mirroring calculator slugs 1:1. Simple. | ✓ |
| content/guides/[category]/[slug].mdx | Nested by category. Adds structure but breaks 1:1 mirror. | |

**User's choice:** Flat directory

### Frontmatter structure

| Option | Description | Selected |
|--------|-------------|----------|
| Rich frontmatter with Velite schema | Full metadata: title, description, calculator, hub, readingTime, keyTakeaways, faqs, relatedGuides. Zod validated. | ✓ |
| Minimal frontmatter | Just title, description, calculator slug. Less flexible. | |

**User's choice:** Rich frontmatter with Velite schema

### Hub content definition

| Option | Description | Selected |
|--------|-------------|----------|
| YAML config + MDX intro | YAML for structured data (calculators, guides, tips), optional MDX for editorial intro. | ✓ |
| Pure MDX per hub | Full MDX with frontmatter listing resources. More flexible prose. | |
| Pure YAML per hub | Everything in YAML. Simplest but prose in YAML is awkward. | |

**User's choice:** YAML config + MDX intro

---

## Claude's Discretion

- Exact Velite schema definitions for guides and hubs collections
- MDX component library design (KeyTakeaway, ProTip, Definition callout implementations)
- TOC generation approach (remark plugin vs manual frontmatter)
- Glossary term selection (which financial terms to include initially)
- Hub accent color palette choices
- Internal linking component implementation
- FAQPage and Article schema markup structure
- Reading time calculation
- Mobile-responsive behavior for sticky TOC sidebar

## Deferred Ideas

None — discussion stayed within phase scope.

# Phase 1: Foundation & Trust - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-24
**Phase:** 01-foundation-trust
**Areas discussed:** Visual identity & design system, Site navigation & page structure, Trust page authorship & depth, Analytics & tracking setup

---

## Visual identity & design system

### Visual mood

| Option | Description | Selected |
|--------|-------------|----------|
| Clean & professional | NerdWallet-style: white space, muted blues/greens, clear hierarchy. Trustworthy financial resource. | ✓ |
| Warm & approachable | Softer palette (teal, warm neutrals, rounded elements). Friendly guide feel. | |
| Bold & modern | Vibrant accents, strong typography, card-heavy. Stands out but risks feeling less "safe." | |

**User's choice:** Clean & professional
**Notes:** Aligns with YMYL trust signals

### Primary color direction

| Option | Description | Selected |
|--------|-------------|----------|
| Blue-based | Trust, stability, finance. Navy/slate blue with teal or green accent. | ✓ |
| Green-based | Growth, money, prosperity. Emerald or forest green primary. | |
| Teal/cyan blend | Professional but warmer than pure blue. Journey metaphor alignment. | |

**User's choice:** Blue-based
**Notes:** None

### Typography approach

| Option | Description | Selected |
|--------|-------------|----------|
| Inter / system-like | Clean neutral sans-serif. Excellent readability, small file size. | ✓ |
| Serif headings + sans body | Editorial authority (WSJ, Bloomberg style). | |
| Geometric sans (Plus Jakarta) | Modern, rounded, fresh and friendly. | |

**User's choice:** Inter / system-like
**Notes:** None

### Design system structure

| Option | Description | Selected |
|--------|-------------|----------|
| shadcn/ui defaults + custom theme | Customize via CSS variables. Fast, consistent, maintainable. | ✓ |
| Heavily customized components | Fork and restyle significantly. More unique but higher maintenance. | |
| Minimal — build from primitives | Radix primitives with custom Tailwind. Maximum control, slowest build. | |

**User's choice:** shadcn/ui defaults + custom theme
**Notes:** None

---

## Site navigation & page structure

### Main navigation in Phase 1

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal skeleton | Home, About, Editorial Standards, Privacy Policy only. | |
| Full nav with placeholders | Complete future navigation with coming-soon landing pages. | ✓ |
| Just trust pages | Only legal/trust pages in nav. | |

**User's choice:** Full nav with placeholders
**Notes:** Signals scope to search engines early

### Header layout

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed top bar | Logo left, nav right, sticky on scroll. Mobile: hamburger. | ✓ |
| Fixed with mega-menu | Dropdown mega-menus for main categories. | |
| Minimal + sidebar nav | Small header, full navigation in sidebar drawer. | |

**User's choice:** Fixed top bar
**Notes:** None

### Footer content

| Option | Description | Selected |
|--------|-------------|----------|
| Comprehensive footer | Multi-column: site links, legal, about/contact, social, disclaimer. | ✓ |
| Minimal footer | Copyright, privacy link, disclaimer only. | |
| You decide | Claude picks based on best practices. | |

**User's choice:** Comprehensive footer
**Notes:** None

### Homepage design

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + value prop + trust signals | Hero with tagline, description, placeholder cards, trust badges. | ✓ |
| Landing page with email capture | Coming-soon style with email signup. | |
| Content-forward with category cards | Grid of category cards linking to placeholders. | |

**User's choice:** Hero + value prop + trust signals
**Notes:** None

---

## Trust page authorship & depth

### Author attribution

| Option | Description | Selected |
|--------|-------------|----------|
| Brand-authored with editorial team page | "WalletWaypoint Editorial Team" attribution with methodology page. | ✓ |
| Real personal author bio | Real name/credentials. Strongest E-E-A-T but requires personal investment. | |
| Fictional expert personas | Named personas with credentials. Risky — Google penalizes fake bios in YMYL. | |

**User's choice:** Brand-authored with editorial team page
**Notes:** Add real author bios later when contributors join

### Editorial Standards depth

| Option | Description | Selected |
|--------|-------------|----------|
| Comprehensive | Full methodology: research, fact-checking, updates, sources, editorial vs affiliate distinction. | ✓ |
| Standard boilerplate | One-page overview of editorial principles. | |
| You decide | Claude determines appropriate depth. | |

**User's choice:** Comprehensive
**Notes:** This is what Google quality raters look for

### About page emphasis

| Option | Description | Selected |
|--------|-------------|----------|
| Mission-driven story | Why WalletWaypoint exists, who it's for, what makes it different. | ✓ |
| Company/team-style | Team section, values, history. | |
| You decide | Claude determines right approach. | |

**User's choice:** Mission-driven story
**Notes:** Credibility through purpose and transparency

### Financial disclaimers

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky banner + inline | Persistent banner on relevant pages + inline component for contextual use. | ✓ |
| Page-level only | One disclaimer block per page. | |
| Footer only | Single disclaimer in footer. | |

**User's choice:** Sticky banner + inline
**Notes:** None

---

## Analytics & tracking setup

### Analytics platform

| Option | Description | Selected |
|--------|-------------|----------|
| GA4 from day one | Required by Mediavine. Start collecting data for qualification history. | ✓ |
| Both GA4 + Plausible | GA4 for Mediavine + Plausible for daily use. | |
| Plausible only (defer GA4) | Privacy-first now, add GA4 later. Risk: no history when applying. | |

**User's choice:** GA4 from day one
**Notes:** Resolves Plausible vs GA4 blocker from STATE.md

### Vercel Analytics

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, include Vercel Analytics | RUM for CWV metrics. Critical for Mediavine CWV requirement. | ✓ |
| Skip for now | Use DevTools/PageSpeed manually. | |
| You decide | Claude determines if worth adding. | |

**User's choice:** Yes, include Vercel Analytics
**Notes:** Free on hobby tier

---

## Claude's Discretion

- Exact color hex values and CSS variable definitions
- Specific shadcn/ui components to install
- Breadcrumb implementation details
- Schema markup structure
- XML sitemap and robots.txt configuration
- Privacy Policy content structure
- Responsive breakpoints
- Coming-soon placeholder design
- GA4 event tracking configuration

## Deferred Ideas

None — discussion stayed within phase scope

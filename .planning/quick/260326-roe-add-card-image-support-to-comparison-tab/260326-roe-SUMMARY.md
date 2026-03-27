---
phase: quick
plan: 260326-roe
subsystem: comparison-ui
tags: [comparison, product-images, affiliate-links, ga4-tracking]
dependency_graph:
  requires: [04-04-comparison-table, 04-04-affiliate-link]
  provides: [product-image-component, affiliate-link-text-component]
  affects: [comparison-table, product-card, product-types, velite-schema]
tech_stack:
  added: []
  patterns: [issuer-gradient-color-map, css-card-placeholder-fallback, ga4-click-element-discriminator]
key_files:
  created:
    - src/components/compare/product-image.tsx
  modified:
    - src/lib/compare/product-types.ts
    - velite.config.ts
    - content/products/credit-cards.yaml
    - content/products/personal-loans.yaml
    - content/products/savings-accounts.yaml
    - content/products/insurance.yaml
    - src/components/compare/affiliate-link.tsx
    - src/components/compare/comparison-table.tsx
    - src/components/compare/product-card.tsx
decisions:
  - "Issuer-based gradient color map for CSS placeholder cards (7 issuers + default slate)"
  - "click_element GA4 field distinguishes product_name vs cta_button clicks"
metrics:
  duration: 7min
  completed: "2026-03-26T23:58:42Z"
  tasks: 2
  files: 10
---

# Quick Task 260326-roe: Add Card Image Support to Comparison Tab Summary

CSS card placeholder images with issuer-branded gradients and clickable affiliate-linked product names in comparison tables and mobile cards, with GA4 click_element discriminator for name vs CTA tracking.

## What Was Done

### Task 1: Add imageUrl to data layer and create ProductImage component
**Commit:** `d458dd5`

- Added `imageUrl?: string` optional field to `ProductItemBase` interface in product-types.ts
- Added `imageUrl: s.string().optional()` to Velite `productItemSchema` in velite.config.ts
- Added `imageUrl: ""` to all 48 product entries across 4 YAML files (credit-cards, personal-loans, savings-accounts, insurance)
- Created `ProductImage` component with two rendering modes:
  - **Image mode:** Renders Next.js `<Image>` when `imageUrl` is a non-empty string
  - **Placeholder mode:** Renders CSS gradient card with chip rectangle and truncated name text
  - Issuer gradient color map: Chase (blue), Citi (blue), Capital One (red), Discover (orange), American Express (emerald), Bank of America (red), Wells Fargo (yellow), default (slate)

### Task 2: Add AffiliateLinkText component and wire images into table and cards
**Commit:** `8a48eb1`

- Added `AffiliateLinkText` export to affiliate-link.tsx: text-only affiliate link (no Button wrapper) for product names
- Added `click_element: 'cta_button'` to existing `AffiliateLink` GA4 event for consistency
- Added `click_element: 'product_name'` to new `AffiliateLinkText` GA4 event
- Updated comparison table first column:
  - Widened from 200px to 280px (both TableHead and TableCell)
  - Added ProductImage + AffiliateLinkText in flex row layout
- Updated mobile product card header:
  - Added ProductImage alongside product name
  - Product name now rendered as AffiliateLinkText instead of plain h3

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

**imageUrl empty strings in YAML files** - All 48 product entries have `imageUrl: ""` which triggers the CSS placeholder fallback. This is intentional: real product card images can be added later by populating the imageUrl field with actual image paths. The CSS placeholders provide a polished visual in the meantime.

## Verification

- TypeScript compiles without errors (pre-existing Velite `#site/content` module errors unrelated to this change)
- All modified files pass type checking
- ProductImage component handles both image and placeholder modes
- AffiliateLinkText fires GA4 events with `click_element: 'product_name'`
- AffiliateLink fires GA4 events with `click_element: 'cta_button'`

## Self-Check: PASSED

- All 10 files exist on disk
- Commit d458dd5 verified in git log
- Commit 8a48eb1 verified in git log

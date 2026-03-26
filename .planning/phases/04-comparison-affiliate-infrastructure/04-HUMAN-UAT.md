---
status: partial
phase: 04-comparison-affiliate-infrastructure
source: [04-VERIFICATION.md]
started: 2026-03-26T22:10:00Z
updated: 2026-03-26T22:10:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Comparison index page renders 4 category cards
expected: 4 cards display — Best Credit Cards, Personal Loans, Savings Accounts & CDs, Auto & Renters Insurance. Each shows product count (12) and links to /compare/[category].
result: [pending]

### 2. Sort column click interaction (asc/desc/unsorted cycling)
expected: First click on column header sorts ascending (ArrowUp icon). Second click descending (ArrowDown). Third click unsorted (ArrowUpDown). Products reorder visibly.
result: [pending]

### 3. Mobile vs desktop responsive view switch at lg breakpoint
expected: Desktop shows sortable table with sticky first column. Below 1024px, stacked product cards appear with dl/dt/dd attributes and full-width CTA.
result: [pending]

### 4. Filter + URL state persistence via nuqs
expected: Selecting a filter updates URL params. Copying URL to new tab restores filtered state. ProductCount reflects filtered count.
result: [pending]

### 5. GA4 affiliate_click event in browser DevTools
expected: Clicking affiliate CTA fires GA4 event with event_name=affiliate_click, product_id, category, position, product_name.
result: [pending]

### 6. Affiliate disclosure above-fold positioning
expected: "Disclosure: Some links on this page are affiliate links..." aside visible without scrolling, before comparison content.
result: [pending]

### 7. How We Rank page renders with cross-links
expected: /how-we-rank shows all sections. Links to /editorial-standards and /compare resolve correctly.
result: [pending]

## Summary

total: 7
passed: 0
issues: 0
pending: 7
skipped: 0
blocked: 0

## Gaps

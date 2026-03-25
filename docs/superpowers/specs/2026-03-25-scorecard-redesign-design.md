# Scorecard Redesign & Layout Reorder

## Summary

Redesign calculator result scorecards and reorder the results panel so scorecards and the recommendation nugget appear above charts. Currently charts sit at the top of the results panel with plain result cards below. The new layout leads with the key numbers and a plain-language interpretation, then shows charts for visual detail.

## Scope

- **In scope:** ResultCard component redesign, Interpretation/nugget restyling, results panel layout reorder in CalculatorShell
- **Out of scope:** Input panel changes, chart component changes, comparison view redesign, new calculator features

## Current Layout (results panel)

1. Charts
2. Result cards (grid of plain `<Card>` components)
3. Interpretation (plain `<p>` tag)
4. Detail table / Comparison view
5. Action callouts

## New Layout (results panel)

1. **Scorecards** (redesigned)
2. **Recommendation nugget** (restyled interpretation) — use `mt-4` spacing from scorecards (tighter, same conceptual unit)
3. Charts — use `mt-8` spacing from nugget
4. Detail table / Comparison view
5. Action callouts

## Output Count Reality

Calculators have between 3 and 7 outputs:

| Calculator | Outputs | Primary position |
|---|---|---|
| compound-interest | 3 | 1st |
| mortgage-payment | 4 | 1st |
| budget | 4 | 1st |
| rent-affordability | 4 | 1st |
| tax-estimator | 5 | 1st |
| loan-repayment | 5 | 1st |
| retirement | 5 | 1st |
| savings-goal | 5 | 1st |
| rent-vs-buy | 5 | 3rd |
| student-loan | 7 | 1st |

The grid must handle N outputs gracefully, not just 3.

## Scorecard Design

### Rendering order

Before rendering, sort outputs so the primary card always comes first. This ensures the primary card is visually prominent at the top-left on all breakpoints and enables the mobile 1+2 pattern to work correctly regardless of YAML order.

```tsx
const sortedOutputs = [...config.outputs].sort((a, b) => {
  if (a.primary && !b.primary) return -1;
  if (!a.primary && b.primary) return 1;
  return 0; // preserve relative order otherwise
});
```

### Desktop (lg and up) — 3-column wrapping grid

- `grid grid-cols-3 gap-3`
- Grid wraps naturally: 3 outputs = 1 row, 4 = 2 rows (3+1), 5 = 2 rows (3+2), 7 = 3 rows (3+3+1)
- Orphan cards on the last row are fine — they align left and maintain consistent card width
- No spanning or special treatment for row counts; the grid handles it

### Tablet (sm to lg) — 2-column wrapping grid

- `sm:grid-cols-2` (available width with sidebar is too narrow for 3 columns)
- Primary card: `sm:col-span-2` (spans full width of the 2-col grid)
- Remaining cards fill 2-column rows naturally

### Mobile (below sm, < 640px) — single column

- `grid-cols-1` as the base
- All cards stack full-width
- This avoids cramped currency values like "$1,234,567" in narrow 2-column layouts

### Responsive grid classes (on the container in calculator-shell.tsx)

```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
```

Primary card gets an additional class:

```
sm:col-span-2 lg:col-span-1
```

This means:
- **Mobile (<640px):** single column, all cards stacked
- **Tablet (640-1023px):** primary spans full 2-col width, secondaries in pairs
- **Desktop (1024px+):** all cards equal in 3-col grid (primary loses its span)

### Card styling

Each card: white background, 1px border (`border-border`), rounded-lg, padding 16-20px

- **Primary card** (output with `primary: true`): `bg-accent/5` background, `border-accent/30` border, value in `text-accent`
- **Secondary cards:** standard `bg-card` background, `border-border`, value in `text-foreground`
- **Label:** `text-xs font-medium uppercase tracking-wide text-muted-foreground`
- **Value:** `text-2xl font-bold`

### No primary fallback

If no output has `primary: true`, all cards get secondary styling. No spanning — the grid is a plain wrapping grid with no `col-span` on any card.

### Component changes

**`src/components/calculator/result-card.tsx`:**
- Add accent styling when `primary` prop is true
- Background: `bg-accent/5`
- Border: `border-accent/30`
- Value color: `text-accent` for primary, `text-foreground` for others
- Label: add `uppercase tracking-wide` classes
- Accept optional `className` prop for the `sm:col-span-2 lg:col-span-1` span override

## Recommendation Nugget

Restyled `Interpretation` component:

- Container: `bg-primary/5` background, `border border-primary/15`, `rounded-lg`, `px-4 py-3.5`
- Text: `text-sm text-foreground leading-relaxed`
- Keep as a styled container around the plain text string — no markdown parsing, no emoji prefix

### Component changes

**`src/components/calculator/interpretation.tsx`:**
- Wrap text in a styled container `<div>` instead of a bare `<p>`
- Add background, border, border-radius, padding

## Layout Reorder

**`src/components/calculator/calculator-shell.tsx`:**

Move the results section order from:

```
<CalculatorCharts />           {/* mt-0 (first element) */}
<div>ResultCards grid</div>    {/* mt-8 */}
<Interpretation />             {/* mt-8 */}
<DetailTable />                {/* mt-8 */}
<ComparisonView />             {/* mt-8 */}
<ActionCallouts />             {/* mt-8 */}
```

To:

```
<div>ResultCards grid</div>    {/* mt-0 (first element) */}
<Interpretation />             {/* mt-4 (tighter — same conceptual unit as scorecards) */}
<CalculatorCharts />           {/* mt-8 */}
<DetailTable />                {/* mt-8 */}
<ComparisonView />             {/* mt-8 */}
<ActionCallouts />             {/* mt-8 */}
```

Also update the grid container classes from `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` to the new responsive pattern, and sort outputs before mapping.

## Files to Modify

1. `src/components/calculator/result-card.tsx` — accent styling for primary cards, uppercase labels, accept className prop
2. `src/components/calculator/interpretation.tsx` — container styling
3. `src/components/calculator/calculator-shell.tsx` — reorder sections, sort outputs, update grid classes, adjust spacing

## Accessibility

- Primary card accent background + accent text must maintain WCAG 2.1 AA contrast ratio (4.5:1 minimum). The site's accent color (`oklch(0.55 0.12 175)` — a medium teal) on `accent/5` background should be verified.
- No additional ARIA attributes needed — the cards are presentational data display, not interactive elements.

## Testing

- Visual: all 10 calculator pages should show scorecards above charts
- Primary card should be accent-tinted on each calculator
- Verify grid behavior at all breakpoints: single col (<640px), 2-col with primary spanning (640-1023px), 3-col equal (1024px+)
- Test calculators with varying output counts: 3 (compound-interest), 4 (mortgage), 5 (retirement), 7 (student-loan)
- Verify rent-vs-buy: primary card (3rd in YAML) should render first after sorting
- Comparison mode: scorecards still show for Scenario A results
- Existing Playwright E2E tests should still pass

# Calculator Results Redesign — Guided Narrative Flow

**Date:** 2026-03-30
**Status:** Approved
**Mockups:** `.superpowers/brainstorm/35712-1774926106/content/`

## Problem

Calculator results use a generic card grid that wastes space, lacks visual hierarchy, and doesn't help readers understand what the numbers mean. Cards are oversized, vary inconsistently between calculators, and charts use separate legends instead of inline labels.

## Solution

Replace the card grid with a **Guided Narrative Flow** — results presented as a story with a hero number, compact stat rows, themed narrative sections with inline charts, and contextual tips. Applied to all 14 calculators.

## Universal Design Pattern

Every calculator follows this structure in the results panel:

### 1. Hero Number
- Single dominant metric, centered
- 48px font, accent green (#4ade80), font-weight 700
- Label above: 11px uppercase tracking-wide, muted
- Subtitle below: 13px, summarizes key inputs (e.g., "on a $415,000 home at 6.5% for 30 years")

### 2. Narrative Sections
- Each section answers a user question ("Where does my money go?", "How does it change over time?")
- Section label: 11px uppercase, letter-spacing 1.5px, colored per section (green/orange/blue)
- Prose: 13px, muted text, with bold white/colored inline values
- Charts embedded within their relevant section (not in a separate "Charts" area)

### 3. Compact Stat Row
- Horizontal row with 1px gap dividers, dark background panels
- Label: 10px uppercase muted
- Value: 16-18px semibold
- Used for secondary metrics that don't need full cards

### 4. Inline Chart Labels
- No separate Legend component — labels directly on chart elements
- Stacked bars: text inside segments when wide enough
- Donut/pie: center label with total, inline legend beside with values + percentages
- Sparklines/area: endpoint text annotations, phase labels directly on chart
- Crossover points: circle marker + label

### 5. Narrative Interpretation
- Green-tinted left-border callout (bg: rgba(74,222,128,0.08), border-left: 3px solid #4ade80)
- Contextualizes results with comparisons and actionable framing
- Replaces the current `Interpretation` component

### 6. Tip Callout
- Bordered box at bottom: green-tinted background, green border
- "Tip:" prefix in bold green
- One actionable insight with bold numbers (e.g., "Adding $200/mo saves $127K")

### 7. Detail Table
- Shown inline (not collapsed) for calculators with amortization/bracket data
- Clean minimal styling: no striped rows, thin borders, muted headers
- Net/total row highlighted in accent green

## Archetype Mapping

### Pattern 1: Simple Breakdown
**Calculators:** Budget, Rent Affordability

- **Hero:** Max affordable rent / Monthly needs allocation
- **Sections:** "Your Split" → labeled stacked bar or donut with center label, "What's Left" → remaining income context
- **No detail table**

### Pattern 2: Projection Over Time
**Calculators:** Compound Interest, Retirement, Savings Goal

- **Hero:** Future value / Retirement balance / Monthly required
- **Sections:** "Building Your Nest Egg" → contributions vs growth stat row + prose, "In Retirement" → withdrawal sustainability + two-phase sparkline
- **Retirement special:** Accumulation/distribution phase divider on chart, depletion age in stat row
- **Savings special:** Goal reference line, "on track" / "behind" indicator

### Pattern 3: Amortization/Payoff
**Calculators:** Mortgage, Loan Repayment, Credit Card Payoff, Student Loan

- **Hero:** Monthly payment
- **Sections:** "Your Payment" → stacked bar breakdown (P&I/tax/insurance), "The Cost of Borrowing" → total interest with ratio context, "Over Time" → amortization sparkline with principal/interest crossover annotation
- **Detail table:** Shown inline for mortgage and loan (full amortization)
- **Student Loan special:** Three stacked plan cards with colored left borders (green=standard, orange=graduated, purple=IDR), each showing monthly/total/interest/forgiven. Payment timeline sparkline showing all three.
- **Credit Card special:** Minimum vs extra payment comparison

### Pattern 4: Comparison
**Calculators:** Rent vs Buy, Home Affordability

- **Rent vs Buy hero:** Verdict statement ("Buying Saves $184,320"), centered
- **Sections:** "Total Cost Comparison" → side-by-side panels with proportional bars, "When Buying Wins" → crossover chart with annotated inflection point, equity vs investment stat row
- **Home Affordability hero:** Moderate tier price ("You Can Comfortably Afford $285,000")
- **Sections:** "Your Affordability Range" → compact 3-tier table with DTI badges (keep existing table but restyle within narrative), narrative guidance callout

### Pattern 5: Tax Breakdown
**Calculators:** Tax Estimator, Paycheck

- **Hero:** Take-home pay (per paycheck for paycheck, annual for tax estimator)
- **Sections:** "Your Taxes" → horizontal stacked bar (fed/state/FICA with inline dollar labels), stat row (total tax, effective rate, monthly net), "Where Your Paycheck Goes" → donut with center value + inline legend
- **Detail table:** Tax breakdown shown inline (category, annual, per-paycheck columns)
- **Paycheck special:** State-specific context in prose

### Pattern 6: Affordability Tiers
**Calculators:** Car Affordability

- **Hero:** Moderate tier price ("You can comfortably afford...")
- **Sections:** "Your Range" → 3-tier stat row or cards, "Your Loan" → specific vehicle payment breakdown with donut
- **Chart:** Tier bar with direct labels

## Components

### New Components

| Component | Path | Purpose |
|-----------|------|---------|
| `HeroMetric` | `src/components/calculator/hero-metric.tsx` | Large centered primary number with label + subtitle |
| `StatRow` | `src/components/calculator/stat-row.tsx` | Compact horizontal stat panels with dividers |
| `NarrativeSection` | `src/components/calculator/narrative-section.tsx` | Themed section with colored label, children slot |
| `StackedBar` | `src/components/calculator/stacked-bar.tsx` | Horizontal stacked bar with inline segment labels |
| `InlineDonut` | `src/components/calculator/inline-donut.tsx` | SVG donut with center label + beside legend |
| `TipCallout` | `src/components/calculator/tip-callout.tsx` | Green-bordered actionable tip box |
| `NarrativeInterpretation` | `src/components/calculator/narrative-interpretation.tsx` | Green left-border contextual callout |
| `PlanCard` | `src/components/calculator/plan-card.tsx` | Stacked plan comparison card (student loan) |

### Modified Components

| Component | Path | Changes |
|-----------|------|---------|
| `CalculatorShell` | `src/components/calculator/calculator-shell.tsx` | Add narrative rendering path when `config.narrative` exists; keep card grid as fallback |
| `DetailTable` | `src/components/calculator/detail-table.tsx` | Add `inline` prop to render without collapsible wrapper; style cleanup |
| `CalculatorCharts` | `src/components/calculator/calculator-charts.tsx` | Add `inlineLabels` mode that removes Legend, adds direct text labels |

### Kept As-Is

| Component | Reason |
|-----------|--------|
| `ResultCard` | Still used in comparison/scenario mode deltas |
| `ComparisonView` | Scenario A vs B comparison unchanged |
| `CalculatorInputs` | Input panel unchanged |
| `ScenarioToggle` | Comparison toggle unchanged |

## Config Extension

Add to `CalculatorConfig` type in `src/lib/calculators/types.ts`:

```typescript
narrative?: {
  heroKey: string;
  heroLabel?: string;
  sections: Array<{
    label: string;
    color: 'green' | 'orange' | 'blue' | 'red' | 'purple' | 'muted';
    content: 'chart' | 'stats' | 'breakdown' | 'table' | 'plans' | 'comparison';
    chartKey?: string;
    statKeys?: string[];
    prose?: string; // template with {{key}} interpolation from outputs
  }>;
  tip?: string; // template string
  showDetailTable?: boolean;
};
```

Each calculator YAML gets a `narrative` block. Calculators without one fall back to the existing card grid (backwards compatible during rollout).

## Responsive Behavior

- **Mobile (<768px):** Narrative sections stack full-width; stat rows wrap to 2-col or stack; stacked bars maintain inline labels down to ~100px segments; donut scales to 100px with legend below
- **Tablet (768px+):** Side-by-side input+results layout; narrative sections in results panel
- **Desktop:** Same as current max-width 1080px container

## Verification

1. All 14 calculators render with narrative layout
2. Comparison mode still works (card+delta fallback)
3. Mobile responsive at 375px, 768px, 1024px, 1440px
4. `npx tsc --noEmit` passes
5. `npx vitest run src/lib/` passes (math modules unchanged)
6. Visual inspection of each calculator
7. Chart labels readable at mobile widths
8. Detail tables render inline where specified

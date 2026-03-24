# Phase 2: Calculator Engine & Core Tools - Research

**Researched:** 2026-03-24
**Domain:** Financial calculator engine, precision math, interactive charting, URL state management
**Confidence:** HIGH

## Summary

Phase 2 builds a parameterized calculator engine that renders 10 financial calculators from config definitions, with real-time slider inputs synced to URL state (nuqs), precision math (decimal.js-light), visual charts (Recharts), side-by-side comparison mode, and plain-English result interpretation. The core architectural decision is treating calculators as data-driven: each calculator is defined by a config file specifying inputs, defaults, formulas, chart types, and SEO metadata. A shared engine component reads these configs and renders the appropriate UI.

The key technical decisions are: (1) Use decimal.js-light (12.7 KB minified) for precision math -- it covers all needed operations (add, subtract, multiply, divide, exponentiate) without the trigonometric bloat of full decimal.js (32.1 KB), and integer-cents is insufficient because interest rates and percentages require fractional multiplication. (2) Use nuqs `useQueryStates` directly as the state manager for calculator inputs rather than layering react-hook-form on top -- calculators have no submit button, update in real-time, and all state belongs in the URL. react-hook-form adds unnecessary complexity for this use case. (3) Recharts components must be client-only (`"use client"` directive) since they depend on SVG/DOM rendering; data computation happens in pure functions that can be tested independently.

**Primary recommendation:** Build a config-driven calculator engine where each calculator is a YAML/JSON definition processed by Velite at build time, with a shared `CalculatorShell` component that handles layout, input rendering, URL state, comparison mode, and chart display. Calculator-specific math lives in pure TypeScript functions validated by unit tests.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Two-column layout on desktop: inputs panel on left, results + charts on right. Collapses to stacked on mobile.
- **D-02:** Full content width (~1080px max) for calculator pages -- wider than the 720px trust pages to accommodate two columns.
- **D-03:** Sticky input panel on desktop -- stays visible while user scrolls through charts, breakdowns, and interpretation text.
- **D-04:** Mobile layout: stacked -- inputs section first, results and charts below. Natural vertical scroll flow, no tabs.
- **D-05:** Each input uses a slider + editable number field combo. Dragging the slider updates the number field; typing a number moves the slider. Both stay in sync.
- **D-06:** Gentle inline validation hints -- soft color change on the field + hint text below (e.g., "Typical range: $100K-$1M"). Never block the user from entering unusual values; show a note if the value seems extreme.
- **D-07:** Grouped inputs with collapsible sections for complex calculators -- primary inputs always visible, advanced inputs in a collapsible "Advanced" section.
- **D-08:** National average default values with contextual labels -- pre-fill all inputs with US national averages, show a subtle "US average" label. User sees realistic results immediately on first load.
- **D-09:** Toggle "Compare" button adds a Scenario B input column. Default view shows a single scenario. Comparison is opt-in, not always visible.
- **D-10:** Comparison results displayed as a side-by-side table with color-coded delta badges showing +/- amounts (green for savings, red for higher costs). Plus an "Export to CSV" button for downloading comparison data.
- **D-11:** Mobile comparison mode: stacked scenarios with a toggle switch between Scenario A and B inputs. Delta summary card at top of results.
- **D-12:** Comparison mode available on all 10 calculators -- the engine handles it generically.
- **D-13:** Charts are the primary visual at the top of the results area. Key numbers summarized in cards below the chart.
- **D-14:** Conversational "friendly mentor" summary below key numbers, followed by 2-3 action callout cards linking to relevant guides.
- **D-15:** Expandable detail table -- collapsed by default with a "Show full amortization schedule" or "View monthly breakdown" expander.
- **D-16:** Clean minimal Recharts style -- smooth curves, no gridlines, brand blue + teal accent colors, subtle hover tooltips, light gradient fill under area charts.

### Claude's Discretion
- Precision math implementation (integer cents vs decimal.js -- resolved below in research)
- Exact Recharts configuration, responsive chart sizing, and chart type selection per calculator
- Calculator YAML/JSON config schema structure (CALC-01 parameterized engine)
- URL query parameter naming conventions for nuqs (CALC-06)
- Specific default values per calculator (research national averages)
- Input range limits and step sizes per calculator
- WebApplication schema markup structure per calculator
- Animation/transition behavior when results update in real-time
- Export format details (CSV structure, column names)
- Slider component implementation (shadcn/ui Slider or custom)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CALC-01 | Parameterized calculator engine that renders calculators from YAML/JSON config definitions | Velite processes YAML/JSON configs with Zod validation at build time; CalculatorShell component renders from typed config objects |
| CALC-02 | Slider inputs with real-time result updates (no submit button) | Base UI Slider component (shadcn/ui base-nova variant) with controlled value/onValueChange synced to nuqs state; throttled URL updates |
| CALC-03 | Precision math using decimal.js or integer-cents to avoid floating-point errors | Use decimal.js-light (12.7 KB) -- covers all needed financial math operations without trigonometric bloat; integer-cents insufficient for rate calculations |
| CALC-04 | Results visualization with charts via Recharts | Recharts 3.8 with ResponsiveContainer, AreaChart for amortization, PieChart for breakdowns, LineChart for projections; client-only components with gradient fills |
| CALC-05 | Contextual results with plain-English interpretation and actionable next steps | Template-driven interpretation strings with computed values; action callout cards with placeholder links to Phase 3 guides |
| CALC-06 | Calculator state stored in URL query params (nuqs) for bookmarkable/shareable results | nuqs useQueryStates with parseAsFloat/parseAsInteger/parseAsBoolean; NuqsAdapter in root layout; urlKeys for short param names |
| CALC-07 | Side-by-side "what-if" scenario comparison | Toggle adds Scenario B state (separate nuqs params with `b_` prefix); delta computation in pure functions; color-coded Badge components for +/- |
| CALC-08 | Sensible default values for all calculator inputs based on national averages | Researched current US averages: 6.5% mortgage rate, $415K median home price, $84K median household income, 30-year term defaults |
| TOOL-01 | Mortgage payment calculator | PMT formula with decimal.js-light; amortization schedule generation; AreaChart for principal vs interest over time |
| TOOL-02 | Rent affordability calculator | Income-based max rent calculation (28% rule); expense deduction; PieChart for budget allocation |
| TOOL-03 | Compound interest calculator | A = P(1 + r/n)^(nt) formula; LineChart for growth over time with contribution stacking |
| TOOL-04 | Loan repayment calculator | Standard amortization with extra payment impact; AreaChart showing accelerated payoff timeline |
| TOOL-05 | Savings goal calculator | Future value calculation reversed to find required monthly contribution; LineChart for progress projection |
| TOOL-06 | Retirement calculator | Accumulation + distribution phases; 4% rule withdrawal rate; AreaChart for projected balance over retirement |
| TOOL-07 | Budget calculator (50/30/20 rule) | Income allocation by needs/wants/savings; PieChart for breakdown; comparison to US averages |
| TOOL-08 | Tax estimator | 2026 federal tax brackets (7 rates: 10%-37%); standard deduction; filing status selection; effective vs marginal rate display |
| TOOL-09 | Rent vs buy calculator | Total cost comparison over configurable time horizon; opportunity cost of down payment invested; AreaChart for cumulative cost curves |
| TOOL-10 | Student loan repayment calculator | Standard (10yr fixed), graduated (increasing payments), and income-driven (% of discretionary income) plan comparison; BarChart for total cost per plan |
</phase_requirements>

## Standard Stack

### Core (Phase 2 additions to existing project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| decimal.js-light | 2.5.1 | Precision financial math | 12.7 KB minified (vs 32.1 KB full decimal.js). Covers all financial operations: add, subtract, multiply, divide, exponentiate, toFixed. No floating-point errors on currency. No trigonometric bloat. |
| recharts | 3.8.0 | Financial chart visualization | Declarative React components for line/area/pie/bar charts. SVG-based, composable. React 19 compatible. ResponsiveContainer handles resize. |
| nuqs | 2.8.9 | URL state management for calculator params | Type-safe URL query state with built-in parsers. useQueryStates for batch updates. 6 KB gzipped. Used by Vercel, Sentry, Supabase. |
| velite | 0.3.1 | Calculator config data layer (YAML/JSON to typed data) | Processes YAML/JSON calculator definitions into typed TypeScript objects with Zod validation at build time. Framework-agnostic output. |
| zod | 4.3.6 | Calculator config and input validation | Already a project dependency target. Validates calculator configs at build time (Velite) and input ranges at runtime. 14x faster than v3. |

### Supporting (new shadcn/ui components needed)
| Component | Source | Purpose | When to Use |
|-----------|--------|---------|-------------|
| Slider | `shadcn add slider` (Base UI variant) | Range input for calculator parameters | Every calculator input -- syncs with number field |
| Input | `shadcn add input` (Base UI variant) | Editable number field paired with slider | Every calculator input -- syncs with slider |
| Tabs | `shadcn add tabs` (Base UI variant) | Mobile scenario A/B toggle in comparison mode | Comparison mode on mobile only |
| Switch | `shadcn add switch` (Base UI variant) | Compare mode toggle | Toggle between single and comparison view |
| Collapsible | `shadcn add collapsible` (Base UI variant) | Advanced inputs section | Calculators with advanced/optional parameters |
| Table | `shadcn add table` (Base UI variant) | Amortization schedules, comparison tables, detail breakdowns | Expandable detail views, comparison results |
| Select | `shadcn add select` (Base UI variant) | Filing status selector (tax estimator), repayment plan selector | TOOL-08 filing status, TOOL-10 plan type |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| decimal.js-light | Integer cents (multiply by 100) | Integer cents fails for interest rate calculations (6.5% * $250,000 requires fractional multiplication). Would need to track scale factors manually. decimal.js-light handles this natively. |
| decimal.js-light | Full decimal.js | Full decimal.js is 32.1 KB vs 12.7 KB for -light. Trig functions not needed for financial math. -light covers all needed operations. |
| decimal.js-light | big.js (7.0.1) | big.js is 6 KB minified but lacks `toPower()` needed for compound interest formula A=P(1+r/n)^(nt). decimal.js-light has `toPower()` built in. |
| nuqs only | nuqs + react-hook-form | react-hook-form is designed for forms with submit buttons. Calculators update in real-time with no submit -- react-hook-form adds an unnecessary abstraction layer. nuqs useQueryStates directly manages calculator state. Zod validates at the input handler level. |
| Velite YAML configs | Hardcoded calculator definitions | YAML configs enable adding new calculators without touching component code. Build-time Zod validation catches config errors. Consistent structure enforced by schema. |

**Installation:**
```bash
npm install decimal.js-light recharts nuqs velite zod react-hook-form @hookform/resolvers
npx shadcn@latest add slider input tabs switch collapsible table select
```

Note: react-hook-form and @hookform/resolvers are included for potential future use and are already in the project's tech stack specification, but calculator inputs will use nuqs directly. Velite is installed as a dev dependency for build-time content processing.

**Version verification:** All versions confirmed against npm registry on 2026-03-24:
- decimal.js-light: 2.5.1 (latest)
- recharts: 3.8.0 (latest)
- nuqs: 2.8.9 (latest, published 18 days ago)
- velite: 0.3.1 (latest)
- zod: 4.3.6 (latest)
- @hookform/resolvers: 5.2.2 (Zod v4 output type fix included)

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/
    calculators/
      layout.tsx              # Existing -- DisclaimerBanner wrapper
      page.tsx                # Calculator index listing all 10 tools (replace placeholder)
      [slug]/
        page.tsx              # Dynamic route -- loads calculator config, renders CalculatorShell
  components/
    calculator/
      calculator-shell.tsx    # "use client" -- main engine: layout, inputs, results, comparison
      calculator-inputs.tsx   # Slider+Input combo renderer, grouped sections
      calculator-results.tsx  # Charts, summary cards, interpretation, detail table
      calculator-charts.tsx   # Recharts wrapper components (area, pie, line, bar)
      comparison-view.tsx     # Side-by-side comparison table with delta badges
      csv-export.tsx          # Client-side CSV generation and download
      scenario-toggle.tsx     # Compare mode toggle button
      input-slider-combo.tsx  # Single slider+number input pair component
      result-card.tsx         # Key metric display card
      action-callout.tsx      # Actionable next-step card linking to guides
      interpretation.tsx      # Plain-English result summary
    ui/
      slider.tsx              # shadcn/ui Base UI slider (new)
      input.tsx               # shadcn/ui Base UI input (new)
      tabs.tsx                # shadcn/ui Base UI tabs (new)
      switch.tsx              # shadcn/ui Base UI switch (new)
      collapsible.tsx         # shadcn/ui Base UI collapsible (new)
      table.tsx               # shadcn/ui Base UI table (new)
      select.tsx              # shadcn/ui Base UI select (new)
  lib/
    calculators/
      types.ts                # Calculator config types, input/output type definitions
      registry.ts             # Calculator slug-to-config mapping
      math/
        mortgage.ts           # Mortgage PMT, amortization schedule
        compound-interest.ts  # Compound interest formula
        loan.ts               # Loan repayment with extra payments
        savings.ts            # Savings goal inverse calculation
        retirement.ts         # Accumulation + withdrawal modeling
        budget.ts             # 50/30/20 allocation
        tax.ts                # 2026 federal tax bracket computation
        rent-affordability.ts # Income-based rent calculation
        rent-vs-buy.ts        # Total cost comparison over time
        student-loan.ts       # Standard, graduated, income-driven plan math
        precision.ts          # decimal.js-light wrapper utilities (toCents, fromCents, pmt, fv, pv)
      defaults.ts             # National average default values per calculator
      interpretations.ts      # Template functions for plain-English summaries
      csv.ts                  # CSV generation utility
      url-params.ts           # nuqs parser definitions per calculator
content/
  calculators/
    mortgage.yaml             # Calculator config: inputs, defaults, chart type, SEO metadata
    rent-affordability.yaml
    compound-interest.yaml
    loan-repayment.yaml
    savings-goal.yaml
    retirement.yaml
    budget.yaml
    tax-estimator.yaml
    rent-vs-buy.yaml
    student-loan.yaml
velite.config.ts              # Velite configuration with calculator schema
```

### Pattern 1: Config-Driven Calculator Engine
**What:** Each calculator is defined by a YAML config file specifying its inputs (name, type, min, max, step, default, label, hint), output fields, chart type, and SEO metadata. Velite processes these at build time into typed TypeScript objects. The `CalculatorShell` component consumes these configs to render the full calculator UI.
**When to use:** Every calculator page. This is the core pattern.
**Example:**
```yaml
# content/calculators/mortgage.yaml
slug: mortgage-payment
title: Mortgage Payment Calculator
description: Calculate your monthly mortgage payment, total interest, and view your full amortization schedule.
category: home
inputs:
  primary:
    - name: homePrice
      label: Home Price
      type: currency
      min: 50000
      max: 2000000
      step: 5000
      default: 415000
      hint: "US median: $415K"
      urlKey: price
    - name: downPayment
      label: Down Payment
      type: percent
      min: 0
      max: 50
      step: 1
      default: 20
      hint: "Typical: 10-20%"
      urlKey: dp
    - name: interestRate
      label: Interest Rate
      type: percent
      min: 1
      max: 15
      step: 0.125
      default: 6.5
      hint: "Current avg: ~6.5%"
      urlKey: rate
    - name: loanTerm
      label: Loan Term
      type: years
      min: 10
      max: 30
      step: 5
      default: 30
      hint: "Standard: 15 or 30 years"
      urlKey: term
  advanced:
    - name: propertyTax
      label: Annual Property Tax Rate
      type: percent
      min: 0
      max: 5
      step: 0.1
      default: 1.1
      urlKey: tax
    - name: insurance
      label: Annual Insurance
      type: currency
      min: 0
      max: 10000
      step: 100
      default: 1500
      urlKey: ins
charts:
  - type: area
    title: Principal vs Interest Over Time
    dataKey: amortization
  - type: pie
    title: Monthly Payment Breakdown
    dataKey: paymentBreakdown
outputs:
  - key: monthlyPayment
    label: Monthly Payment
    format: currency
    primary: true
  - key: totalInterest
    label: Total Interest Paid
    format: currency
  - key: totalCost
    label: Total Cost of Home
    format: currency
seo:
  schemaType: WebApplication
  applicationCategory: FinanceApplication
```

### Pattern 2: nuqs State Management for Calculator Inputs
**What:** Each calculator defines its URL parameters using nuqs `useQueryStates` with typed parsers and defaults. All calculator state lives in the URL -- no local React state for input values. Changes to any input immediately trigger recalculation.
**When to use:** Every calculator page. This ensures bookmarkable, shareable calculator states.
**Example:**
```typescript
// src/lib/calculators/url-params.ts
import { parseAsFloat, parseAsInteger, parseAsBoolean, createSerializer } from 'nuqs';

export const mortgageParams = {
  price: parseAsInteger.withDefault(415000),
  dp: parseAsInteger.withDefault(20),
  rate: parseAsFloat.withDefault(6.5),
  term: parseAsInteger.withDefault(30),
  tax: parseAsFloat.withDefault(1.1),
  ins: parseAsInteger.withDefault(1500),
  compare: parseAsBoolean.withDefault(false),
  // Scenario B params (only used when compare=true)
  b_price: parseAsInteger.withDefault(415000),
  b_dp: parseAsInteger.withDefault(20),
  b_rate: parseAsFloat.withDefault(6.5),
  b_term: parseAsInteger.withDefault(30),
  b_tax: parseAsFloat.withDefault(1.1),
  b_ins: parseAsInteger.withDefault(1500),
};

// In component:
// const [params, setParams] = useQueryStates(mortgageParams, { throttleMs: 200 });
```

### Pattern 3: Precision Math with decimal.js-light
**What:** All financial calculations use decimal.js-light to avoid floating-point errors. A thin wrapper module (`precision.ts`) exposes financial helper functions (PMT, FV, PV) that accept regular numbers and return formatted strings or numbers for display.
**When to use:** Every calculation function. Never use native JS arithmetic for money or rate calculations.
**Example:**
```typescript
// src/lib/calculators/math/precision.ts
import Decimal from 'decimal.js-light';

/** Monthly payment (PMT) for a fixed-rate loan */
export function pmt(principal: number, annualRate: number, years: number): number {
  const P = new Decimal(principal);
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const n = new Decimal(years).times(12);

  if (monthlyRate.isZero()) {
    return P.div(n).toNumber();
  }

  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const onePlusR = monthlyRate.plus(1);
  const onePlusRtoN = onePlusR.toPower(n.toNumber());
  const numerator = P.times(monthlyRate).times(onePlusRtoN);
  const denominator = onePlusRtoN.minus(1);
  return numerator.div(denominator).toNumber();
}

/** Format a number as currency string */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Round to cents for display */
export function toCents(value: number): number {
  return new Decimal(value).toDecimalPlaces(2).toNumber();
}
```

### Pattern 4: Client-Only Chart Wrapper
**What:** Recharts requires DOM access (SVG rendering) and cannot be server-rendered. Chart components use `"use client"` directive and wrap Recharts in a consistent styling layer matching the project's OKLCH color palette.
**When to use:** Every chart rendering.
**Example:**
```typescript
// src/components/calculator/calculator-charts.tsx
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface AmortizationChartProps {
  data: Array<{ year: number; principal: number; interest: number; balance: number }>;
}

export function AmortizationChart({ data }: AmortizationChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.35 0.1 245)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.35 0.1 245)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.55 0.12 175)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.55 0.12 175)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
          }
        />
        <Area
          type="monotone"
          dataKey="principal"
          stroke="oklch(0.35 0.1 245)"
          fill="url(#principalGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="interest"
          stroke="oklch(0.55 0.12 175)"
          fill="url(#interestGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

### Pattern 5: Slider + Input Combo Component
**What:** Each calculator input renders as a synchronized slider and number field. The slider uses Base UI's Slider component via shadcn/ui. Typing in the number field updates the slider position; dragging the slider updates the number field. Both write to nuqs state.
**When to use:** Every calculator input (D-05 requirement).
**Example:**
```typescript
// src/components/calculator/input-slider-combo.tsx
"use client";

import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputSliderComboProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  hint?: string;
  format?: 'currency' | 'percent' | 'years' | 'number';
}

export function InputSliderCombo({
  label, value, onChange, min, max, step, hint, format
}: InputSliderComboProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
  };

  const isExtreme = value < min * 0.5 || value > max * 1.5;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className={`w-28 text-right ${isExtreme ? 'border-amber-400' : ''}`}
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
      />
      {hint && (
        <p className="text-xs text-muted-foreground">
          {hint}
          {isExtreme && <span className="ml-1 text-amber-600">Unusual value</span>}
        </p>
      )}
    </div>
  );
}
```

### Pattern 6: CSV Export (Client-Side)
**What:** Comparison data exported as CSV via client-side Blob URL. No server interaction needed.
**When to use:** Comparison mode "Export to CSV" button (D-10).
**Example:**
```typescript
// src/lib/calculators/csv.ts
export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]): void {
  const bom = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  const csvContent = bom + [
    headers.join(','),
    ...rows.map(row => row.map(cell =>
      typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
    ).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
```

### Anti-Patterns to Avoid
- **Using native JS arithmetic for money:** `0.1 + 0.2 !== 0.3` in JavaScript. Always use decimal.js-light for any financial calculation. Even "simple" percentage calculations can produce floating-point errors.
- **Server-rendering Recharts:** Recharts needs DOM/SVG. Always use `"use client"` on chart components. Never try to render charts in a Server Component.
- **Storing calculator state in React useState:** Calculator state must live in the URL via nuqs. Using local state breaks bookmarkability, shareability, and SEO crawlability.
- **Using react-hook-form for real-time calculators:** react-hook-form is designed for submit-based forms. Calculators update on every input change. nuqs `useQueryStates` is the correct state manager here.
- **Hardcoding calculator definitions in components:** Use YAML configs processed by Velite. Hardcoded definitions make adding new calculators require component code changes and duplicate boilerplate.
- **Putting Scenario B params in separate nuqs calls:** Use a single `useQueryStates` call with all params (including `b_` prefixed comparison params) to ensure atomic URL updates.
- **Using Chart.js/D3 directly:** Chart.js is canvas-based (not SSR-friendly), D3 fights React's rendering model. Recharts wraps D3 in React components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL state management | Custom useSearchParams wrapper | nuqs useQueryStates | Type safety, parsers, throttling, batched updates, history control -- 6 KB |
| Financial math precision | Manual integer-cents tracking | decimal.js-light | Interest rates require fractional multiplication; toPower() needed for compound interest; -light is 12.7 KB |
| Slider + input sync | Custom range input from scratch | shadcn/ui Slider (Base UI) + Input | Accessible, keyboard navigable, ARIA labels, touch-optimized, consistent with project's Base UI base |
| Chart rendering | SVG manipulation or D3 directly | Recharts | Declarative React components, responsive, composable, tooltip/legend built in |
| CSV generation | Custom string concatenation | Blob URL download pattern | UTF-8 BOM for Excel, proper escaping, standard browser API -- no library needed, but pattern matters |
| Content schema validation | Manual TypeScript types for configs | Velite + Zod schemas | Build-time validation catches config errors; auto-generates TypeScript types; watch mode for dev |

**Key insight:** The calculator engine is fundamentally a config-driven rendering pipeline. The engine itself (CalculatorShell) should never contain calculator-specific logic -- that belongs in the config (structure) and math modules (computation). This separation means adding calculator #11 someday requires only a new YAML file and a new math module, with zero changes to the engine.

## Common Pitfalls

### Pitfall 1: Floating-Point Display Errors
**What goes wrong:** Monthly payment shows as $2,528.4299999999997 instead of $2,528.43.
**Why it happens:** JavaScript floating-point arithmetic accumulates errors across multiple operations (rate division, exponentiation, multiplication).
**How to avoid:** Use decimal.js-light for all intermediate calculations. Only convert to native Number at the final display step using `toDecimalPlaces(2).toNumber()` for money and `toDecimalPlaces(4).toNumber()` for rates.
**Warning signs:** Any displayed number with more than 2 decimal places for currency or more than 3 for percentages.

### Pitfall 2: Velite + Turbopack Incompatibility
**What goes wrong:** Velite's VeliteWebpackPlugin does not work with Turbopack (Next.js 16 default bundler). Build fails or content is not processed.
**Why it happens:** Turbopack is not compatible with Webpack plugins. The VeliteWebpackPlugin hooks into Webpack's compiler lifecycle, which Turbopack does not expose.
**How to avoid:** Use the programmatic API approach in `next.config.ts`:
```typescript
const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  const { build } = await import('velite');
  await build({ watch: isDev, clean: !isDev });
}
```
**Warning signs:** Build succeeds but calculator configs are empty or undefined; "VeliteWebpackPlugin" errors in console.

### Pitfall 3: nuqs URL Thrashing
**What goes wrong:** Slider drag generates dozens of URL updates per second, causing browser history pollution and performance issues.
**Why it happens:** Each slider value change triggers a nuqs state update, which by default pushes to browser history.
**How to avoid:** Use `{ history: 'replace', throttleMs: 200 }` option on `useQueryStates`. This replaces the URL instead of pushing new entries and throttles updates to 200ms intervals during rapid slider dragging.
**Warning signs:** Browser back button takes user through dozens of intermediate slider positions instead of back to the previous page.

### Pitfall 4: Recharts SSR Hydration Mismatch
**What goes wrong:** `Prop 'id' did not match` error in console. Charts render incorrectly on first load.
**Why it happens:** Recharts generates random IDs for SVG gradients and clip paths. Server-rendered IDs differ from client-rendered IDs.
**How to avoid:** Always use `"use client"` on chart components. Never attempt to server-render Recharts. If needed, use `next/dynamic` with `{ ssr: false }` as a fallback.
**Warning signs:** Console warnings about prop mismatches, visual glitches on first load that resolve after interaction.

### Pitfall 5: Comparison Mode URL Bloat
**What goes wrong:** URL becomes extremely long with duplicated params for both scenarios, making sharing difficult.
**Why it happens:** Full calculator state doubled: `?price=415000&rate=6.5&term=30&b_price=350000&b_rate=7.0&b_term=15&compare=true`
**How to avoid:** Use short `urlKeys` in nuqs (e.g., `price` not `homePrice`, `dp` not `downPayment`). Only include Scenario B params in URL when `compare=true`. When comparison is off, Scenario B params should be null (not included in URL).
**Warning signs:** URLs longer than ~200 characters; social media link previews truncating the URL.

### Pitfall 6: Zod v4 Type Inference with react-hook-form
**What goes wrong:** TypeScript errors when using `zodResolver` with Zod v4 schemas that use `z.coerce` or `.transform()`.
**Why it happens:** Zod v4 separates input and output types more strictly. Specifying `useForm<z.infer<Schema>>()` fails because `z.infer` returns the output type, but the form needs the input type.
**How to avoid:** Do not specify generic type parameter on `useForm`. Let it infer from the resolver. If you must, use `z.input<typeof schema>` for the form type and `z.output<typeof schema>` for the validated data type.
**Warning signs:** TypeScript errors mentioning `ZodType` type parameter mismatches.

### Pitfall 7: NuqsAdapter Missing in Layout
**What goes wrong:** Error: `[nuqs] nuqs requires an adapter to work with your framework.`
**Why it happens:** NuqsAdapter must wrap the application in the root layout for nuqs to function with Next.js App Router.
**How to avoid:** Add `NuqsAdapter` from `nuqs/adapters/next/app` to `src/app/layout.tsx`, wrapping `{children}`.
**Warning signs:** Runtime error on any page using `useQueryState` or `useQueryStates`.

## Code Examples

### Velite Calculator Config Schema
```typescript
// velite.config.ts
import { defineConfig, s } from 'velite';

const calculatorInputSchema = s.object({
  name: s.string(),
  label: s.string(),
  type: s.enum(['currency', 'percent', 'years', 'number']),
  min: s.number(),
  max: s.number(),
  step: s.number(),
  default: s.number(),
  hint: s.string().optional(),
  urlKey: s.string(),
});

const calculatorChartSchema = s.object({
  type: s.enum(['area', 'pie', 'line', 'bar']),
  title: s.string(),
  dataKey: s.string(),
});

const calculatorOutputSchema = s.object({
  key: s.string(),
  label: s.string(),
  format: s.enum(['currency', 'percent', 'number', 'years']),
  primary: s.boolean().optional(),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    calculators: {
      name: 'Calculator',
      pattern: 'calculators/*.yaml',
      schema: s.object({
        slug: s.slug('calculators'),
        title: s.string(),
        description: s.string(),
        category: s.enum(['home', 'savings', 'loans', 'retirement', 'budget', 'tax']),
        inputs: s.object({
          primary: s.array(calculatorInputSchema),
          advanced: s.array(calculatorInputSchema).optional(),
        }),
        charts: s.array(calculatorChartSchema),
        outputs: s.array(calculatorOutputSchema),
        seo: s.object({
          schemaType: s.string().default('WebApplication'),
          applicationCategory: s.string().default('FinanceApplication'),
        }),
      }),
    },
  },
});
```

### NuqsAdapter Setup in Root Layout
```typescript
// src/app/layout.tsx (modification)
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NuqsAdapter>
          <OrganizationSchema />
          <Header />
          <main id="main-content">
            <Breadcrumbs />
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NuqsAdapter>
      </body>
      {siteConfig.gaId && <GoogleAnalytics gaId={siteConfig.gaId} />}
    </html>
  );
}
```

### Dynamic Calculator Route
```typescript
// src/app/calculators/[slug]/page.tsx
import { calculators } from '#site/content'; // Velite output
import { CalculatorShell } from '@/components/calculator/calculator-shell';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return calculators.map((calc) => ({ slug: calc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return {};
  return createMetadata({
    title: calc.title,
    description: calc.description,
    path: `/calculators/${calc.slug}`,
  });
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) notFound();

  return (
    <>
      <WebAppSchema
        name={calc.title}
        description={calc.description}
        url={`${siteConfig.url}/calculators/${calc.slug}`}
      />
      <CalculatorShell config={calc} />
    </>
  );
}
```

### Mortgage Math Module
```typescript
// src/lib/calculators/math/mortgage.ts
import Decimal from 'decimal.js-light';

interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number;
  annualRate: number;
  termYears: number;
  annualPropertyTaxRate: number;
  annualInsurance: number;
}

interface MortgageResults {
  monthlyPayment: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
  amortization: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const price = new Decimal(inputs.homePrice);
  const downPayment = price.times(new Decimal(inputs.downPaymentPercent).div(100));
  const loanAmount = price.minus(downPayment);
  const monthlyRate = new Decimal(inputs.annualRate).div(100).div(12);
  const totalMonths = new Decimal(inputs.termYears).times(12);

  let monthlyPI: Decimal;
  if (monthlyRate.isZero()) {
    monthlyPI = loanAmount.div(totalMonths);
  } else {
    const onePlusR = monthlyRate.plus(1);
    const compounded = onePlusR.toPower(totalMonths.toNumber());
    monthlyPI = loanAmount.times(monthlyRate).times(compounded).div(compounded.minus(1));
  }

  const monthlyTax = price.times(new Decimal(inputs.annualPropertyTaxRate).div(100)).div(12);
  const monthlyIns = new Decimal(inputs.annualInsurance).div(12);
  const monthlyTotal = monthlyPI.plus(monthlyTax).plus(monthlyIns);

  // Generate amortization schedule
  const amortization = [];
  let balance = loanAmount;
  for (let month = 1; month <= totalMonths.toNumber(); month++) {
    const interestPayment = balance.times(monthlyRate);
    const principalPayment = monthlyPI.minus(interestPayment);
    balance = balance.minus(principalPayment);

    amortization.push({
      month,
      payment: monthlyPI.toDecimalPlaces(2).toNumber(),
      principal: principalPayment.toDecimalPlaces(2).toNumber(),
      interest: interestPayment.toDecimalPlaces(2).toNumber(),
      balance: Decimal.max(balance, 0).toDecimalPlaces(2).toNumber(),
    });
  }

  const totalPaid = monthlyPI.times(totalMonths);
  const totalInterest = totalPaid.minus(loanAmount);

  return {
    monthlyPayment: monthlyTotal.toDecimalPlaces(2).toNumber(),
    monthlyPrincipalAndInterest: monthlyPI.toDecimalPlaces(2).toNumber(),
    monthlyPropertyTax: monthlyTax.toDecimalPlaces(2).toNumber(),
    monthlyInsurance: monthlyIns.toDecimalPlaces(2).toNumber(),
    totalInterest: totalInterest.toDecimalPlaces(2).toNumber(),
    totalCost: totalPaid.plus(downPayment).toDecimalPlaces(2).toNumber(),
    loanAmount: loanAmount.toDecimalPlaces(2).toNumber(),
    amortization,
  };
}
```

## Default Values Reference (National Averages)

Researched US national averages as of March 2026 for calculator defaults:

| Calculator | Parameter | Default Value | Source | Confidence |
|-----------|-----------|--------------|--------|------------|
| Mortgage | Home Price | $415,000 | NAR Q4 2025 median existing-home price | HIGH |
| Mortgage | Interest Rate | 6.5% | Freddie Mac PMMS 30yr avg ~6.2-6.5% range March 2026 | HIGH |
| Mortgage | Down Payment | 20% | Conventional standard; first-time buyer median is 10% | HIGH |
| Mortgage | Loan Term | 30 years | Standard US mortgage term | HIGH |
| Mortgage | Property Tax | 1.1% | US average effective rate | MEDIUM |
| Mortgage | Insurance | $1,500/yr | Approximate national average homeowners insurance | MEDIUM |
| Rent | Monthly Income | $5,500 | ~$66K/yr (close to median individual income) | MEDIUM |
| Rent | Max % for Rent | 28% | Standard affordability guideline | HIGH |
| Compound Interest | Initial Deposit | $10,000 | Reasonable starting amount | HIGH |
| Compound Interest | Monthly Contribution | $500 | Reasonable monthly savings target | MEDIUM |
| Compound Interest | Annual Return | 7% | Long-term S&P 500 average return (inflation-adjusted ~7%) | HIGH |
| Compound Interest | Time Horizon | 20 years | Common long-term investment horizon | MEDIUM |
| Loan | Loan Amount | $25,000 | Typical personal/auto loan amount | MEDIUM |
| Loan | Interest Rate | 8% | Approximate average for personal loans | MEDIUM |
| Loan | Term | 5 years | Common personal loan term | HIGH |
| Savings | Goal Amount | $50,000 | Emergency fund / major purchase target | MEDIUM |
| Savings | Current Savings | $5,000 | Starting point | MEDIUM |
| Savings | Annual Return | 4.5% | HYSA rate environment | MEDIUM |
| Savings | Timeline | 5 years | Common savings horizon | MEDIUM |
| Retirement | Current Age | 30 | Working-age adult | MEDIUM |
| Retirement | Retirement Age | 65 | Standard retirement age | HIGH |
| Retirement | Current Savings | $50,000 | Median retirement savings for 30s | MEDIUM |
| Retirement | Monthly Contribution | $500 | Reasonable 401k contribution | MEDIUM |
| Retirement | Expected Return | 7% | Long-term stock market average | HIGH |
| Retirement | Withdrawal Rate | 4% | Trinity study "safe" withdrawal rate | HIGH |
| Budget | Monthly Income | $7,000 | ~$84K/yr (median US household income) | HIGH |
| Tax | Filing Status | Single | Default, with dropdown to change | HIGH |
| Tax | Annual Income | $75,000 | Near median for single filers | MEDIUM |
| Tax | Standard Deduction | $15,700 | 2026 single filer standard deduction (estimated) | MEDIUM |
| Rent vs Buy | Monthly Rent | $1,800 | Approximate US average for 2-bedroom | MEDIUM |
| Rent vs Buy | Time Horizon | 7 years | Average homeowner tenure | MEDIUM |
| Student Loan | Loan Balance | $30,000 | Approximate average student loan debt | HIGH |
| Student Loan | Interest Rate | 5.5% | Federal direct loan rate range | MEDIUM |
| Student Loan | Income (for IDR) | $55,000 | Entry-level graduate salary | MEDIUM |

## Chart Type Selection Per Calculator

| Calculator | Primary Chart | Secondary Chart | Rationale |
|-----------|--------------|----------------|-----------|
| TOOL-01 Mortgage | AreaChart (principal vs interest vs balance) | PieChart (payment breakdown) | Amortization curve is the canonical mortgage visualization |
| TOOL-02 Rent Affordability | PieChart (income allocation) | None | Budget allocation is naturally a pie breakdown |
| TOOL-03 Compound Interest | AreaChart (balance + contributions over time) | None | Growth over time is the key visual |
| TOOL-04 Loan Repayment | AreaChart (balance over time, with/without extra payments) | None | Payoff timeline comparison |
| TOOL-05 Savings Goal | LineChart (savings progress toward goal line) | None | Progress toward a target is naturally a line with goal marker |
| TOOL-06 Retirement | AreaChart (accumulation phase + distribution phase) | PieChart (income sources in retirement) | Two-phase lifecycle is unique to retirement |
| TOOL-07 Budget | PieChart (50/30/20 allocation) | BarChart (comparison to recommended) | Pie for allocation, bar for comparison |
| TOOL-08 Tax Estimator | BarChart (effective vs marginal rate, bracket visualization) | PieChart (tax vs take-home) | Bracket visualization is naturally bar-based |
| TOOL-09 Rent vs Buy | AreaChart (cumulative cost curves for both options) | None | Total cost comparison over time |
| TOOL-10 Student Loan | BarChart (total cost per repayment plan) | LineChart (monthly payment over time per plan) | Plan comparison is naturally bar-based |

## 2026 Federal Tax Bracket Reference

For TOOL-08 Tax Estimator implementation:

| Rate | Single | Married Filing Jointly | Head of Household |
|------|--------|----------------------|-------------------|
| 10% | $0 - $11,925 | $0 - $23,850 | $0 - $17,000 |
| 12% | $11,926 - $48,475 | $23,851 - $96,950 | $17,001 - $64,850 |
| 22% | $48,476 - $103,350 | $96,951 - $206,700 | $64,851 - $103,350 |
| 24% | $103,351 - $197,300 | $206,701 - $394,600 | $103,351 - $197,300 |
| 32% | $197,301 - $250,525 | $394,601 - $501,050 | $197,301 - $250,500 |
| 35% | $250,526 - $640,600 | $501,051 - $768,600 | $250,501 - $640,600 |
| 37% | $640,601+ | $768,601+ | $640,601+ |

**Standard Deduction 2026:** Single ~$15,700, MFJ ~$31,400, HoH ~$23,500 (estimated with 2.7% inflation adjustment; verify against IRS publication when available)

**Confidence:** MEDIUM -- 2026 brackets are from Tax Foundation projections. The "One Big Beautiful Bill Act" provided differentiated inflation adjustments (4% for bottom two brackets, 2.3% for higher brackets). Exact IRS-published figures should be confirmed.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Contentlayer for content schema | Velite 0.3 | 2024 | Contentlayer abandoned; Velite is Zod-native, actively maintained |
| framer-motion for animations | motion/react 12.x | 2025 | Import from `motion/react`, not `framer-motion` |
| Manual useSearchParams | nuqs 2.x | 2024-2025 | Type-safe URL state with parsers, throttling, batch updates |
| Zod v3 | Zod v4.3 | 2025 | 14x faster parsing, stricter input/output type separation |
| Webpack bundler | Turbopack (default in Next.js 16) | 2025-2026 | Velite webpack plugin incompatible; use programmatic API instead |
| @hookform/resolvers zodResolver (Zod v3) | zodResolver (Zod v4 via @hookform/resolvers 5.2.2) | 2025 | Output type fix for Zod v4; do not specify generics on useForm |

**Deprecated/outdated:**
- Contentlayer: Abandoned since 2023, do not use
- next-seo: Unnecessary with Next.js 16 Metadata API
- VeliteWebpackPlugin with Turbopack: Use programmatic API in next.config.ts instead
- `framer-motion` import path: Use `motion/react` instead

## Open Questions

1. **Velite output directory and import alias**
   - What we know: Velite outputs to `.velite/` by default and generates TypeScript types. Next.js needs a path alias to import from it.
   - What's unclear: The exact import pattern (`#site/content` or a custom alias) and whether `.velite/` should be gitignored.
   - Recommendation: Follow Velite docs -- add `.velite` to `.gitignore`, configure `#site/content` alias in tsconfig.json paths, and verify the import works with Turbopack.

2. **Recharts OKLCH color support**
   - What we know: The project uses OKLCH colors via CSS custom properties. Recharts accepts color strings for stroke/fill.
   - What's unclear: Whether Recharts handles OKLCH color strings natively in SVG rendering or requires hex/rgb fallbacks.
   - Recommendation: Test OKLCH colors in Recharts during implementation. If SVG rendering fails, use CSS custom properties via `var(--chart-1)` etc. (already defined in globals.css) or convert to hex equivalents.

3. **nuqs throttling optimal value**
   - What we know: nuqs supports `throttleMs` option. Too low causes URL thrashing, too high makes results feel laggy.
   - What's unclear: The ideal throttle value for slider interactions.
   - Recommendation: Start with 200ms. Test with real slider interactions and adjust. This is the sweet spot between responsiveness and URL stability.

4. **2026 tax bracket exact figures**
   - What we know: Tax Foundation published projections with 2.7% inflation adjustment and the "One Big Beautiful Bill Act" differentiated adjustments.
   - What's unclear: Whether IRS has published final 2026 figures or if projections are the best available.
   - Recommendation: Use Tax Foundation projections for now. Add a "last updated" note on the tax calculator. Update when IRS publishes Rev. Proc. for 2026.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All build tools | Needs verification | -- | -- |
| npm | Package installation | Needs verification | -- | -- |
| Velite CLI | Build-time content processing | Not yet installed | 0.3.1 (target) | npm install velite |
| decimal.js-light | Precision math | Not yet installed | 2.5.1 (target) | npm install decimal.js-light |
| recharts | Chart rendering | Not yet installed | 3.8.0 (target) | npm install recharts |
| nuqs | URL state management | Not yet installed | 2.8.9 (target) | npm install nuqs |

**Missing dependencies with no fallback:**
- None -- all dependencies are npm packages that can be installed

**Missing dependencies with fallback:**
- None -- all are straightforward npm installs

## Project Constraints (from CLAUDE.md)

The following directives from CLAUDE.md apply to Phase 2:

- **Tech stack:** Next.js 16.2 with React 19.2, TypeScript 5.8, Tailwind CSS 4.2
- **SEO:** Must be SSR/SSG for crawlability; calculator pages use `generateStaticParams()` for static generation
- **Performance:** Core Web Vitals must pass (LCP < 2.5s, CLS < 0.1) -- charts must not cause layout shift
- **Content:** Must be genuinely useful, not thin affiliate bait; calculator results must be accurate
- **Legal:** "Not financial advice" disclaimer already in place via DisclaimerBanner on calculator layout
- **Monetization:** Mediavine/Raptiv-ready -- plan ad slot containers even before qualifying
- **Recharts 3.8:** Specified in stack, React 19 compatible, SVG-based
- **nuqs:** Specified in stack for URL state management, type-safe with built-in parsers
- **Zod 4.3:** Specified in stack for validation, 14x faster than v3
- **react-hook-form 7.72:** Specified in stack but research recommends nuqs directly for calculator state (react-hook-form reserved for future contact/submission forms)
- **Velite 0.3:** Specified in stack for content data layer (YAML/JSON), framework-agnostic output
- **shadcn/ui CLI v4:** Base UI variant (`base-nova` style) -- add components via `shadcn add`
- **Motion 12.38:** Import from `motion/react` for result transitions
- **No Zustand/Redux:** Calculator state belongs in URL params via nuqs
- **No Chart.js/D3 directly:** Use Recharts
- **GSD Workflow:** All changes through GSD commands

## Sources

### Primary (HIGH confidence)
- npm registry -- verified current versions for decimal.js-light (2.5.1), recharts (3.8.0), nuqs (2.8.9), velite (0.3.1), zod (4.3.6), @hookform/resolvers (5.2.2)
- [nuqs official documentation](https://nuqs.dev) -- useQueryStates API, built-in parsers, NuqsAdapter setup, throttling options
- [nuqs built-in parsers docs](https://nuqs.dev/docs/parsers/built-in) -- parseAsFloat, parseAsInteger, parseAsString, parseAsBoolean, withDefault
- [nuqs batching docs](https://nuqs.dev/docs/batching) -- useQueryStates batch update API, urlKeys remapping
- [Base UI Slider component](https://base-ui.com/react/components/slider) -- Full Slider API: Root, Track, Indicator, Thumb, Value, Label, controlled pattern
- [shadcn/ui Slider (Base UI variant)](https://ui.shadcn.com/docs/components/base/slider) -- Installation, usage, controlled state pattern
- [Velite official docs](https://velite.js.org/guide/with-nextjs) -- Next.js integration, Turbopack workaround with programmatic API
- [decimal.js-light GitHub](https://github.com/MikeMcl/decimal.js-light) -- 12.7 KB minified, API: plus, minus, times, dividedBy, toPower, toFixed, toDecimalPlaces
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms) -- 30-year fixed mortgage rate ~6.22% as of March 2026
- [NAR Q4 2025 home prices](https://www.nar.realtor/newsroom/home-prices-increased-in-73-of-metro-areas-in-fourth-quarter-of-2025) -- Median existing-home price $414,900
- [Tax Foundation 2026 brackets](https://taxfoundation.org/data/all/federal/2026-tax-brackets/) -- 2026 federal income tax brackets and rates

### Secondary (MEDIUM confidence)
- [Armand Salle: React Hook Form + Nuqs integration](https://www.armand-salle.fr/post/persisting-form-data-in-react-a-modern-approach-with-nuqs/) -- Pattern for syncing form state to URL params
- [Recharts documentation](https://recharts.github.io/en-US/api/) -- ResponsiveContainer, AreaChart, PieChart, Tooltip, gradient fill
- [GitHub: Zod v4 + hookform resolvers](https://github.com/colinhacks/zod/issues/4992) -- Resolved: don't specify generics on useForm with Zod v4
- [GitHub: @hookform/resolvers releases](https://github.com/react-hook-form/resolvers/releases) -- v5.2.2 includes Zod v4 output type fix
- [GitHub: nuqs Next.js 16 adapter issue](https://github.com/47ng/nuqs/issues/1263) -- Monorepo-specific issue, not relevant for single-project setup
- [Census Bureau median household income](https://www.census.gov/library/stories/2025/09/median-household-income.html) -- $83,730 median household income (2024 data)

### Tertiary (LOW confidence)
- 2026 tax bracket exact figures -- Tax Foundation projections, not yet IRS-confirmed
- Some calculator default values (property tax rate, insurance costs) -- approximations from multiple sources, not single authoritative source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified against npm registry, version compatibility confirmed, APIs documented from official sources
- Architecture: HIGH -- config-driven calculator engine is a well-established pattern; all integration points (Velite + nuqs + Recharts) have documented APIs
- Pitfalls: HIGH -- Velite/Turbopack incompatibility verified from official docs; nuqs throttling documented; Recharts SSR issues well-known
- Math precision: HIGH -- decimal.js-light API verified, financial formulas standard
- Default values: MEDIUM -- most values from authoritative sources (Freddie Mac, NAR, Census Bureau) but some are approximations
- Tax brackets: MEDIUM -- from Tax Foundation projections, subject to final IRS publication

**Research date:** 2026-03-24
**Valid until:** 2026-04-24 (30 days -- stable stack, tax brackets may update if IRS publishes final figures)

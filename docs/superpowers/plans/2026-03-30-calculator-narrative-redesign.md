# Calculator Narrative Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic card grid calculator results with a Guided Narrative Flow — hero number, compact stat rows, themed narrative sections with inline charts, and contextual tips — across all 14 calculators.

**Architecture:** New narrative components (HeroMetric, StatRow, NarrativeSection, StackedBar, InlineDonut, TipCallout) are composed inside a ResultNarrative orchestrator. CalculatorShell gains a fourth rendering branch: when `config.narrative` exists, it delegates to ResultNarrative. Each calculator's YAML/config gets a `narrative` block defining its flow. Calculators without a narrative block fall back to the existing card grid.

**Tech Stack:** React 19, Tailwind CSS 4, Recharts 3.8, TypeScript 5.8, Velite 0.3

**Spec:** `docs/superpowers/specs/2026-03-30-calculator-narrative-redesign.md`

---

## Task 1: HeroMetric Component

**Files:**
- Create: `src/components/calculator/hero-metric.tsx`

- [ ] **Step 1: Create HeroMetric component**

```tsx
// src/components/calculator/hero-metric.tsx
"use client";

import { cn } from "@/lib/utils";

interface HeroMetricProps {
  label: string;
  value: string;
  subtitle?: string;
  className?: string;
}

export function HeroMetric({ label, value, subtitle, className }: HeroMetricProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-5xl font-bold text-accent leading-tight">
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/hero-metric.tsx
git commit -m "feat: add HeroMetric component for narrative calculator layout"
```

---

## Task 2: StatRow Component

**Files:**
- Create: `src/components/calculator/stat-row.tsx`

- [ ] **Step 1: Create StatRow component**

```tsx
// src/components/calculator/stat-row.tsx
"use client";

import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
  color?: string; // Tailwind text color class, e.g. "text-orange-500"
}

interface StatRowProps {
  items: StatItem[];
  className?: string;
}

export function StatRow({ items, className }: StatRowProps) {
  return (
    <div className={cn("flex gap-px overflow-hidden rounded-md bg-border", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex-1 bg-muted/50 px-2 py-2.5 text-center"
        >
          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </div>
          <div className={cn("mt-0.5 text-lg font-semibold", item.color ?? "text-foreground")}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/stat-row.tsx
git commit -m "feat: add StatRow component for compact horizontal stats"
```

---

## Task 3: NarrativeSection + TipCallout + NarrativeInterpretation

**Files:**
- Create: `src/components/calculator/narrative-section.tsx`
- Create: `src/components/calculator/tip-callout.tsx`
- Create: `src/components/calculator/narrative-interpretation.tsx`

- [ ] **Step 1: Create NarrativeSection**

```tsx
// src/components/calculator/narrative-section.tsx
"use client";

import { cn } from "@/lib/utils";

const SECTION_COLORS: Record<string, string> = {
  green: "text-accent",
  orange: "text-orange-500",
  blue: "text-sky-500",
  red: "text-red-500",
  purple: "text-purple-400",
  muted: "text-muted-foreground",
};

interface NarrativeSectionProps {
  label: string;
  color?: keyof typeof SECTION_COLORS;
  children: React.ReactNode;
  className?: string;
}

export function NarrativeSection({
  label,
  color = "muted",
  children,
  className,
}: NarrativeSectionProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div
        className={cn(
          "mb-3 text-[11px] font-medium uppercase tracking-[0.15em]",
          SECTION_COLORS[color] ?? SECTION_COLORS.muted
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create TipCallout**

```tsx
// src/components/calculator/tip-callout.tsx
"use client";

import { cn } from "@/lib/utils";

interface TipCalloutProps {
  children: React.ReactNode;
  className?: string;
}

export function TipCallout({ children, className }: TipCalloutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-accent/20 bg-accent/5 px-3.5 py-2.5 text-xs leading-relaxed text-accent/80",
        className
      )}
    >
      <strong className="font-semibold text-accent">Tip: </strong>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create NarrativeInterpretation**

```tsx
// src/components/calculator/narrative-interpretation.tsx
"use client";

import { cn } from "@/lib/utils";

interface NarrativeInterpretationProps {
  text: string;
  className?: string;
}

/** Renders **bold** markers as strong tags with accent color */
function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function NarrativeInterpretation({ text, className }: NarrativeInterpretationProps) {
  return (
    <div
      className={cn(
        "rounded-r-md border-l-[3px] border-accent bg-accent/5 px-3.5 py-2.5 text-sm leading-relaxed text-muted-foreground",
        className
      )}
    >
      {renderBold(text)}
    </div>
  );
}
```

- [ ] **Step 4: Verify all compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/calculator/narrative-section.tsx src/components/calculator/tip-callout.tsx src/components/calculator/narrative-interpretation.tsx
git commit -m "feat: add NarrativeSection, TipCallout, NarrativeInterpretation components"
```

---

## Task 4: StackedBar Component

**Files:**
- Create: `src/components/calculator/stacked-bar.tsx`

- [ ] **Step 1: Create StackedBar with inline labels**

```tsx
// src/components/calculator/stacked-bar.tsx
"use client";

import { cn } from "@/lib/utils";

interface Segment {
  label: string;
  value: number;
  color: string;         // Tailwind bg class, e.g. "bg-red-500"
  textColor?: string;    // Tailwind text class, defaults to "text-white"
}

interface StackedBarProps {
  segments: Segment[];
  height?: string;       // Tailwind h class, defaults to "h-9"
  className?: string;
}

export function StackedBar({ segments, height = "h-9", className }: StackedBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  return (
    <div className={cn("flex overflow-hidden rounded-md text-xs font-semibold", height, className)}>
      {segments.map((seg) => {
        const pct = (seg.value / total) * 100;
        // Only show label if segment is wide enough (>12%)
        const showLabel = pct > 12;
        return (
          <div
            key={seg.label}
            className={cn(
              "flex items-center justify-center transition-all",
              seg.color,
              seg.textColor ?? "text-white"
            )}
            style={{ width: `${pct}%` }}
            title={`${seg.label}: ${seg.value}`}
          >
            {showLabel && <span className="truncate px-1">{seg.label}</span>}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/stacked-bar.tsx
git commit -m "feat: add StackedBar component with inline segment labels"
```

---

## Task 5: InlineDonut Component

**Files:**
- Create: `src/components/calculator/inline-donut.tsx`

- [ ] **Step 1: Create InlineDonut with center label and beside legend**

```tsx
// src/components/calculator/inline-donut.tsx
"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/lib/calculators/formatters";

interface DonutSegment {
  label: string;
  value: number;
  color: string; // CSS color value (hex or oklch)
}

interface InlineDonutProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;            // SVG size, defaults to 120
  strokeWidth?: number;     // defaults to 14
  format?: "currency" | "percent" | "number";
  className?: string;
}

export function InlineDonut({
  segments,
  centerLabel,
  centerValue,
  size = 120,
  strokeWidth = 14,
  format = "currency",
  className,
}: InlineDonutProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let accumulated = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const dashArray = `${pct * circumference} ${circumference}`;
    const dashOffset = -(accumulated * circumference);
    accumulated += pct;
    return { ...seg, dashArray, dashOffset, pct };
  });

  const formatValue = (v: number) => {
    if (format === "currency") return formatCurrency(v);
    if (format === "percent") return formatPercent(v);
    return v.toLocaleString();
  };

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth={strokeWidth}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerLabel && (
              <div className="text-[9px] font-medium uppercase text-muted-foreground">
                {centerLabel}
              </div>
            )}
            {centerValue && (
              <div className="text-base font-bold text-foreground">{centerValue}</div>
            )}
          </div>
        )}
      </div>
      <div className="text-xs leading-7">
        {arcs.map((arc) => (
          <div key={arc.label} className="flex items-center gap-1.5">
            <span
              className="inline-block size-2 shrink-0 rounded-full"
              style={{ backgroundColor: arc.color }}
            />
            <span className="text-muted-foreground">{arc.label}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums">
              {formatValue(arc.value)}
              <span className="ml-1 font-normal text-muted-foreground">
                ({Math.round(arc.pct * 100)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/inline-donut.tsx
git commit -m "feat: add InlineDonut component with center label and inline legend"
```

---

## Task 6: Extend CalculatorConfig Type

**Files:**
- Modify: `src/lib/calculators/types.ts`

- [ ] **Step 1: Add NarrativeConfig type and narrative field to CalculatorConfig**

Add after the `OutputConfig` interface:

```typescript
/** Section type for narrative calculator layout */
export interface NarrativeSectionConfig {
  label: string;
  color: 'green' | 'orange' | 'blue' | 'red' | 'purple' | 'muted';
  content: 'chart' | 'stats' | 'breakdown' | 'table' | 'plans' | 'comparison' | 'custom';
  chartKey?: string;
  statKeys?: string[];
  prose?: string;
}

/** Narrative layout configuration for guided calculator results */
export interface NarrativeConfig {
  heroKey: string;
  heroLabel?: string;
  heroSubtitle?: string;
  sections: NarrativeSectionConfig[];
  tip?: string;
  showDetailTable?: boolean;
}
```

Add to `CalculatorConfig` interface after `faqs`:

```typescript
  /** Narrative layout configuration — when present, results use guided flow instead of card grid */
  narrative?: NarrativeConfig;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/calculators/types.ts
git commit -m "feat: add NarrativeConfig type to CalculatorConfig"
```

---

## Task 7: ResultNarrative Orchestrator

This is the main component that replaces the card grid. It reads the narrative config and composes HeroMetric, StatRow, NarrativeSection, StackedBar, InlineDonut, TipCallout, and NarrativeInterpretation.

**Files:**
- Create: `src/components/calculator/result-narrative.tsx`

- [ ] **Step 1: Create ResultNarrative component**

```tsx
// src/components/calculator/result-narrative.tsx
"use client";

import type {
  CalculatorConfig,
  CalculatorResults,
  NarrativeSectionConfig,
} from "@/lib/calculators/types";
import { formatByType } from "@/lib/calculators/formatters";
import { HeroMetric } from "./hero-metric";
import { StatRow } from "./stat-row";
import { NarrativeSection } from "./narrative-section";
import { NarrativeInterpretation } from "./narrative-interpretation";
import { TipCallout } from "./tip-callout";
import { CalculatorCharts } from "./calculator-charts";
import { DetailTable } from "./detail-table";

interface ResultNarrativeProps {
  config: CalculatorConfig;
  results: CalculatorResults;
  reducedMotion: boolean;
}

/** Interpolate {{key}} placeholders in template strings with output values */
function interpolate(
  template: string,
  outputs: Record<string, number>,
  config: CalculatorConfig
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = outputs[key];
    if (val == null) return key;
    // Find the output config to get its format
    const outputConfig = config.outputs.find((o) => o.key === key);
    if (outputConfig) return formatByType(val, outputConfig.format);
    return String(val);
  });
}

function NarrativeSectionRenderer({
  section,
  config,
  results,
  reducedMotion,
}: {
  section: NarrativeSectionConfig;
  config: CalculatorConfig;
  results: CalculatorResults;
  reducedMotion: boolean;
}) {
  return (
    <NarrativeSection label={section.label} color={section.color}>
      {/* Stats row */}
      {section.content === "stats" && section.statKeys && (
        <StatRow
          items={section.statKeys.map((key) => {
            const outputConfig = config.outputs.find((o) => o.key === key);
            return {
              label: outputConfig?.label ?? key,
              value: formatByType(
                results.outputs[key] ?? 0,
                outputConfig?.format ?? "number"
              ),
              color: outputConfig?.variant === "warning"
                ? "text-orange-500"
                : outputConfig?.primary
                ? "text-accent"
                : undefined,
            };
          })}
        />
      )}

      {/* Chart inline */}
      {section.content === "chart" && section.chartKey && (
        <CalculatorCharts
          charts={config.charts.filter((c) => c.dataKey === section.chartKey)}
          chartData={results.chartData}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Detail table inline */}
      {section.content === "table" && (
        <DetailTable
          detailRows={results.detailRows}
          detailColumns={results.detailColumns}
          inline
        />
      )}

      {/* Prose */}
      {section.prose && (
        <div className="mt-3">
          <NarrativeInterpretation
            text={interpolate(section.prose, results.outputs, config)}
          />
        </div>
      )}
    </NarrativeSection>
  );
}

export function ResultNarrative({
  config,
  results,
  reducedMotion,
}: ResultNarrativeProps) {
  const narrative = config.narrative!;
  const heroOutput = config.outputs.find((o) => o.key === narrative.heroKey);
  const heroValue = formatByType(
    results.outputs[narrative.heroKey] ?? 0,
    heroOutput?.format ?? "currency"
  );
  const heroSubtitle = narrative.heroSubtitle
    ? interpolate(narrative.heroSubtitle, results.outputs, config)
    : undefined;

  return (
    <div>
      {/* Hero */}
      <HeroMetric
        label={narrative.heroLabel ?? heroOutput?.label ?? ""}
        value={heroValue}
        subtitle={heroSubtitle}
        className="mb-8"
      />

      {/* Interpretation */}
      {results.interpretation && (
        <NarrativeInterpretation text={results.interpretation} className="mb-6" />
      )}

      {/* Sections */}
      {narrative.sections.map((section, i) => (
        <NarrativeSectionRenderer
          key={i}
          section={section}
          config={config}
          results={results}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Detail table (if configured to show inline and not already in a section) */}
      {narrative.showDetailTable &&
        !narrative.sections.some((s) => s.content === "table") && (
          <NarrativeSection label="Full Breakdown" color="muted">
            <DetailTable
              detailRows={results.detailRows}
              detailColumns={results.detailColumns}
              inline
            />
          </NarrativeSection>
        )}

      {/* Tip */}
      {narrative.tip && (
        <TipCallout className="mt-6">
          {interpolate(narrative.tip, results.outputs, config)}
        </TipCallout>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: Will fail because DetailTable doesn't have `inline` prop yet — that's Task 8.

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/result-narrative.tsx
git commit -m "feat: add ResultNarrative orchestrator component"
```

---

## Task 8: Add `inline` Prop to DetailTable

**Files:**
- Modify: `src/components/calculator/detail-table.tsx`

- [ ] **Step 1: Read current DetailTable**

Read `src/components/calculator/detail-table.tsx` to see the current implementation.

- [ ] **Step 2: Add `inline` prop**

Add `inline?: boolean` to the props interface. When `inline` is true, render the table directly without the Collapsible wrapper. When false or undefined, keep the existing collapsible behavior.

The key change: wrap the existing table rendering in a conditional — if `inline`, return just the table div; otherwise wrap in Collapsible as before.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors (ResultNarrative from Task 7 should now also compile)

- [ ] **Step 4: Commit**

```bash
git add src/components/calculator/detail-table.tsx
git commit -m "feat: add inline prop to DetailTable for narrative layout"
```

---

## Task 9: Integrate ResultNarrative into CalculatorShell

**Files:**
- Modify: `src/components/calculator/calculator-shell.tsx`

- [ ] **Step 1: Read current CalculatorShell**

Read `src/components/calculator/calculator-shell.tsx` to see the current results panel rendering.

- [ ] **Step 2: Add narrative rendering branch**

Import `ResultNarrative` at the top. In the results panel section, add a NEW first branch before the existing `isTableLayout` check:

```tsx
{config.narrative ? (
  <ResultNarrative
    config={config}
    results={results}
    reducedMotion={prefersReducedMotion}
  />
) : isTableLayout ? (
  // ... existing table layout
) : config.outputs.some((o) => o.row != null) ? (
  // ... existing row-grouped layout
) : (
  // ... existing default grid
)}
```

When narrative mode is active, also skip the separate Interpretation, CalculatorCharts, and DetailTable renders below (they're now handled inside ResultNarrative). Wrap those existing renders in a `{!config.narrative && (...)}` guard.

The comparison view (ComparisonView) and action callouts should still render regardless of narrative mode.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Test with existing calculators**

Open any calculator in the browser — they should still render the card grid since no calculator has a `narrative` config yet.

- [ ] **Step 5: Commit**

```bash
git add src/components/calculator/calculator-shell.tsx
git commit -m "feat: add narrative rendering branch to CalculatorShell"
```

---

## Task 10: Add Narrative Config to Mortgage Calculator (First Calculator)

**Files:**
- Modify: `content/calculators/mortgage-payment.yaml`

- [ ] **Step 1: Read current mortgage YAML**

Read `content/calculators/mortgage-payment.yaml`.

- [ ] **Step 2: Add narrative config and extend Velite schema**

Read `velite.config.ts` — add `narrative` to the calculator schema as an optional object with the NarrativeConfig shape. Use `s.object({...}).optional()`.

Then add the narrative block to `mortgage-payment.yaml`:

```yaml
narrative:
  heroKey: monthlyPayment
  heroLabel: "Your Monthly Payment"
  heroSubtitle: ""
  sections:
    - label: "Payment Breakdown"
      color: orange
      content: chart
      chartKey: paymentBreakdown
    - label: "The Cost of Borrowing"
      color: red
      content: stats
      statKeys: ["totalInterest", "totalCost", "loanAmount"]
    - label: "Amortization Over Time"
      color: blue
      content: chart
      chartKey: amortization
  tip: "Adding extra payments to principal can save thousands in interest and shorten your loan term significantly."
  showDetailTable: true
```

- [ ] **Step 3: Rebuild Velite**

Run: `npx velite build`
Expected: Build completes successfully

- [ ] **Step 4: Verify mortgage calculator renders with narrative layout**

Open `http://localhost:3100/calculators/mortgage-payment` in the browser. Verify:
- Hero number shows monthly payment
- Sections render with charts and stats
- Detail table shows inline
- Tip appears at bottom

- [ ] **Step 5: Commit**

```bash
git add content/calculators/mortgage-payment.yaml velite.config.ts
git commit -m "feat: add narrative config to mortgage calculator + Velite schema"
```

---

## Task 11: Add Narrative Config to Remaining 12 YAML Calculators

**Files:**
- Modify: `content/calculators/budget.yaml`
- Modify: `content/calculators/rent-affordability.yaml`
- Modify: `content/calculators/compound-interest.yaml`
- Modify: `content/calculators/loan-repayment.yaml`
- Modify: `content/calculators/savings-goal.yaml`
- Modify: `content/calculators/retirement.yaml`
- Modify: `content/calculators/tax-estimator.yaml`
- Modify: `content/calculators/rent-vs-buy.yaml`
- Modify: `content/calculators/student-loan.yaml`
- Modify: `content/calculators/home-affordability.yaml`
- Modify: `content/calculators/credit-card-payoff.yaml`
- Modify: `content/calculators/car-affordability.yaml`

- [ ] **Step 1: Read each calculator YAML and its math module**

For each calculator, read the YAML config AND its corresponding math module in `src/lib/calculators/math/` to understand which output keys and chart data keys exist. Map each calculator to its archetype from the spec.

- [ ] **Step 2: Add narrative configs to all 12 YAMLs**

Follow the archetype mapping from the spec:
- **Simple Breakdown** (budget, rent-affordability): hero + donut/pie section + stats
- **Projection** (compound-interest, retirement, savings-goal): hero + growth stats + timeline chart
- **Amortization** (loan-repayment, credit-card-payoff, student-loan): hero + payment breakdown + cost stats + timeline chart + detail table
- **Comparison** (rent-vs-buy): hero recommendation + comparison stats + timeline chart
- **Tax** (tax-estimator): hero take-home + tax breakdown stats + bracket chart + detail table
- **Affordability** (car-affordability): hero moderate price + tier stats + loan breakdown chart

For `home-affordability.yaml`: keep `resultLayout: table` and do NOT add narrative (the table layout is already custom and works well within the narrative frame from Task 9's integration — the shell already handles it).

- [ ] **Step 3: Rebuild Velite**

Run: `npx velite build`
Expected: Build completes successfully

- [ ] **Step 4: Spot-check 3-4 calculators in browser**

Open each archetype's representative calculator and verify narrative renders correctly:
- Budget (simple breakdown)
- Retirement (projection)
- Loan repayment (amortization)
- Tax estimator (tax breakdown)

- [ ] **Step 5: Commit**

```bash
git add content/calculators/*.yaml
git commit -m "feat: add narrative configs to all 12 remaining calculator YAMLs"
```

---

## Task 12: Add Narrative Config to Paycheck Calculator (Hardcoded Page)

**Files:**
- Modify: `src/app/calculators/paycheck/page.tsx`

- [ ] **Step 1: Read current paycheck page config**

Read `src/app/calculators/paycheck/page.tsx` to see the inline `paycheckConfig` object.

- [ ] **Step 2: Add narrative block to inline config**

Add the narrative config to the `paycheckConfig` object:

```typescript
narrative: {
  heroKey: 'netPayPerPaycheck',
  heroLabel: 'Your Take-Home Pay',
  heroSubtitle: '',
  sections: [
    {
      label: 'Your Taxes',
      color: 'orange' as const,
      content: 'stats' as const,
      statKeys: ['federalTax', 'stateTax', 'ficaTotal'],
    },
    {
      label: 'Where Your Paycheck Goes',
      color: 'blue' as const,
      content: 'chart' as const,
      chartKey: 'breakdown',
    },
    {
      label: 'Monthly View',
      color: 'muted' as const,
      content: 'chart' as const,
      chartKey: 'monthlyBreakdown',
    },
  ],
  tip: 'Contributing to a 401(k) reduces your taxable income and lowers both federal and state taxes.',
  showDetailTable: true,
},
```

- [ ] **Step 3: Verify paycheck calculator renders with narrative**

Open `http://localhost:3100/calculators/paycheck` and verify narrative layout.

- [ ] **Step 4: Commit**

```bash
git add src/app/calculators/paycheck/page.tsx
git commit -m "feat: add narrative config to paycheck calculator"
```

---

## Task 13: Also Sync Paycheck YAML with Narrative

**Files:**
- Modify: `content/calculators/paycheck.yaml`

- [ ] **Step 1: Add narrative config to paycheck YAML**

The paycheck YAML exists for the calculators index grid but the actual page uses the hardcoded config. Add matching narrative block to the YAML so both are consistent and Velite validates it.

- [ ] **Step 2: Rebuild Velite and verify**

Run: `npx velite build`
Expected: Build completes

- [ ] **Step 3: Commit**

```bash
git add content/calculators/paycheck.yaml
git commit -m "feat: sync paycheck YAML with narrative config"
```

---

## Task 14: Visual Polish and Responsive Testing

**Files:**
- Potentially modify: any narrative component for responsive fixes

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run unit tests**

Run: `npx vitest run src/lib/ --no-coverage`
Expected: All tests pass (math modules unchanged)

- [ ] **Step 3: Visual inspection of each calculator**

Open each calculator in the browser and verify:
1. Hero number renders correctly
2. Sections show in order with correct colors
3. Charts render inline within sections
4. Detail tables show inline where configured
5. Tips render at bottom
6. Comparison mode still works (toggle scenario comparison)
7. Mobile responsive (resize to 375px width)

Calculators to check:
- http://localhost:3100/calculators/budget
- http://localhost:3100/calculators/rent-affordability
- http://localhost:3100/calculators/compound-interest
- http://localhost:3100/calculators/loan-repayment
- http://localhost:3100/calculators/savings-goal
- http://localhost:3100/calculators/retirement
- http://localhost:3100/calculators/mortgage-payment
- http://localhost:3100/calculators/tax-estimator
- http://localhost:3100/calculators/rent-vs-buy
- http://localhost:3100/calculators/student-loan
- http://localhost:3100/calculators/home-affordability
- http://localhost:3100/calculators/credit-card-payoff
- http://localhost:3100/calculators/car-affordability
- http://localhost:3100/calculators/paycheck

- [ ] **Step 4: Fix any visual issues found**

Address spacing, overflow, truncation, or responsive issues.

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "fix: visual polish and responsive fixes for narrative calculator layout"
git push
```

---

## Verification Checklist

- [ ] All 14 calculators render with narrative layout (13 YAML + 1 hardcoded paycheck)
- [ ] Home affordability keeps table layout (no narrative config)
- [ ] Comparison mode still works on all calculators
- [ ] `npx tsc --noEmit` passes
- [ ] `npx vitest run src/lib/ --no-coverage` passes
- [ ] Mobile responsive at 375px width
- [ ] Charts render inline within narrative sections
- [ ] Detail tables show inline where configured
- [ ] Tip callouts render at bottom of narrative

# Scorecard Redesign & Layout Reorder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move scorecards and recommendation nugget above charts, redesign card styling with accent-tinted primary cards and responsive grid layout.

**Architecture:** Three component modifications — ResultCard gets accent styling, Interpretation gets container styling, CalculatorShell reorders sections and sorts outputs. No new files, no new dependencies.

**Tech Stack:** React, Tailwind CSS, shadcn/ui Card component

**Spec:** `docs/superpowers/specs/2026-03-25-scorecard-redesign-design.md`

---

### Task 1: Redesign ResultCard component

**Files:**
- Modify: `src/components/calculator/result-card.tsx`

- [ ] **Step 1: Update ResultCard to accept className prop and apply accent styling**

Replace the entire file content with:

```tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  primary?: boolean;
  className?: string;
}

export function ResultCard({ label, value, primary, className }: ResultCardProps) {
  return (
    <Card
      className={cn(
        "p-4",
        primary
          ? "ring-accent/30 bg-accent/5"
          : "",
        className
      )}
    >
      <CardContent className="p-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 text-2xl font-bold",
            primary ? "text-accent" : "text-foreground"
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
```

Key changes from current code:
- Label: `text-sm text-muted-foreground` → `text-xs font-medium uppercase tracking-wide text-muted-foreground`
- Value: `text-2xl font-semibold` → `text-2xl font-bold` with `mt-1` gap
- Primary card: `ring-accent/30 bg-accent/5` overrides the Card's default `ring-foreground/10`, plus `text-accent` value
- Secondary card: empty string lets Card defaults apply (no override needed)
- Added `className` prop for grid span overrides
- Uses `cn()` utility (already exists at `src/lib/utils.ts`)

- [ ] **Step 2: Verify cn utility exists**

Run: `grep -l "export function cn" src/lib/utils.ts`
Expected: file path printed, confirming `cn` exists

- [ ] **Step 3: Run TypeScript check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors related to result-card.tsx

- [ ] **Step 4: Commit**

```bash
git add src/components/calculator/result-card.tsx
git commit -m "feat: redesign ResultCard with accent styling for primary cards"
```

---

### Task 2: Restyle Interpretation as recommendation nugget

**Files:**
- Modify: `src/components/calculator/interpretation.tsx`

- [ ] **Step 1: Update Interpretation component with container styling**

Replace the entire file content with:

```tsx
"use client";

interface InterpretationProps {
  text: string;
}

export function Interpretation({ text }: InterpretationProps) {
  return (
    <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3.5">
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}
```

Key changes from current code:
- Bare `<p>` → wrapped in styled `<div>` container
- Container: `bg-primary/5` background, `border-primary/15` border, `rounded-lg`, padding
- Text: `text-base` → `text-sm`, `leading-[1.6]` → `leading-relaxed`

- [ ] **Step 2: Run TypeScript check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors related to interpretation.tsx

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/interpretation.tsx
git commit -m "feat: restyle Interpretation as recommendation nugget"
```

---

### Task 3: Reorder layout and update grid in CalculatorShell

**Files:**
- Modify: `src/components/calculator/calculator-shell.tsx:326-390`

- [ ] **Step 1: Replace the results panel section**

In `src/components/calculator/calculator-shell.tsx`, find the results panel section (lines 326-390) and replace it with the reordered layout. The section starts with `{/* Results Panel */}` and ends with `</section>`.

Replace this block:

```tsx
        {/* Results Panel */}
        <section className="flex-1 min-w-0" aria-label="Calculator results">
          {/* Charts */}
          <CalculatorCharts
            charts={config.charts}
            chartData={results.chartData}
            reducedMotion={prefersReducedMotion}
          />

          {/* Result summary cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.outputs.map((output) => (
              <ResultCard
                key={output.key}
                label={output.label}
                value={formatByType(
                  results.outputs[output.key] ?? 0,
                  output.format
                )}
                primary={output.primary}
              />
            ))}
          </div>

          {/* Interpretation */}
          <div className="mt-8">
            <Interpretation text={results.interpretation} />
          </div>

          {/* Detail table for single-scenario mode (per D-15) */}
          {!isComparing && (
            <div className="mt-8">
              <DetailTable
                detailRows={results.detailRows}
                detailColumns={results.detailColumns}
                triggerLabel={detailTriggerLabel}
              />
            </div>
          )}

          {/* Comparison results */}
          {isComparing && resultsB && (
            <div className="mt-8">
              <ComparisonView
                deltas={computeDeltas(results, resultsB, config.outputs)}
                calculatorSlug={config.slug}
                detailRowsA={results.detailRows}
                detailRowsB={resultsB.detailRows}
                detailColumns={results.detailColumns}
              />
            </div>
          )}

          {/* Action callout cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.callouts.map((callout) => (
              <ActionCallout
                key={callout.title}
                title={callout.title}
                href={callout.href}
                icon={callout.icon}
              />
            ))}
          </div>
        </section>
```

With:

```tsx
        {/* Results Panel */}
        <section className="flex-1 min-w-0" aria-label="Calculator results">
          {/* Scorecards — sorted so primary renders first */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...config.outputs]
              .sort((a, b) => {
                if (a.primary && !b.primary) return -1;
                if (!a.primary && b.primary) return 1;
                return 0;
              })
              .map((output) => (
                <ResultCard
                  key={output.key}
                  label={output.label}
                  value={formatByType(
                    results.outputs[output.key] ?? 0,
                    output.format
                  )}
                  primary={output.primary}
                  className={output.primary ? "sm:col-span-2 lg:col-span-1" : undefined}
                />
              ))}
          </div>

          {/* Recommendation nugget */}
          <div className="mt-4">
            <Interpretation text={results.interpretation} />
          </div>

          {/* Charts */}
          <div className="mt-8">
            <CalculatorCharts
              charts={config.charts}
              chartData={results.chartData}
              reducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Detail table for single-scenario mode (per D-15) */}
          {!isComparing && (
            <div className="mt-8">
              <DetailTable
                detailRows={results.detailRows}
                detailColumns={results.detailColumns}
                triggerLabel={detailTriggerLabel}
              />
            </div>
          )}

          {/* Comparison results */}
          {isComparing && resultsB && (
            <div className="mt-8">
              <ComparisonView
                deltas={computeDeltas(results, resultsB, config.outputs)}
                calculatorSlug={config.slug}
                detailRowsA={results.detailRows}
                detailRowsB={resultsB.detailRows}
                detailColumns={results.detailColumns}
              />
            </div>
          )}

          {/* Action callout cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.callouts.map((callout) => (
              <ActionCallout
                key={callout.title}
                title={callout.title}
                href={callout.href}
                icon={callout.icon}
              />
            ))}
          </div>
        </section>
```

Key changes:
- Scorecards moved to top (no `mt-*` — first element)
- Outputs sorted: primary first via `.sort()`
- Grid: `gap-4` → `gap-3`, same responsive columns
- Primary card gets `sm:col-span-2 lg:col-span-1` (full-width on tablet, equal on desktop)
- Interpretation moved up with `mt-4` (tighter spacing — same unit as scorecards)
- Charts wrapped in `<div className="mt-8">` and moved below interpretation
- Detail table, comparison, and callouts unchanged

- [ ] **Step 2: Run TypeScript check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Run build to verify all 10 calculator pages compile**

Run: `npm run build 2>&1 | tail -30`
Expected: build succeeds, all calculator routes listed

- [ ] **Step 4: Commit**

```bash
git add src/components/calculator/calculator-shell.tsx
git commit -m "feat: reorder results panel — scorecards and nugget above charts"
```

---

### Task 4: Visual verification

- [ ] **Step 1: Start dev server and verify layout on mortgage calculator**

Run: `npm run dev` (should already be running on port 3100)
Open: `http://localhost:3100/calculators/mortgage-payment`

Verify:
- Scorecards appear above charts
- Primary card (Monthly Payment) has teal-tinted background and border
- Secondary cards have standard white/gray styling
- Labels are uppercase and small
- Recommendation nugget sits between scorecards and charts with blue-tinted background

- [ ] **Step 2: Verify calculators with different output counts**

Check these URLs for correct grid behavior:
- `http://localhost:3100/calculators/compound-interest` (3 outputs — single row)
- `http://localhost:3100/calculators/mortgage-payment` (4 outputs — 3+1)
- `http://localhost:3100/calculators/retirement` (5 outputs — 3+2)
- `http://localhost:3100/calculators/student-loan` (7 outputs — 3+3+1)

- [ ] **Step 3: Verify rent-vs-buy primary sorting**

Open: `http://localhost:3100/calculators/rent-vs-buy`

Verify: primary card (`Net Rent Cost`) renders first despite being 3rd in the YAML config

- [ ] **Step 4: Verify mobile responsive layout**

Use browser DevTools to resize to 375px width:
- All cards should stack in a single column
- Primary card should look the same (accent styling)

Resize to 640px width:
- Primary card should span full width (2 columns)
- Secondary cards should pair up below

- [ ] **Step 5: Run existing Playwright E2E tests**

Run: `npx playwright test --reporter=list 2>&1 | tail -20`
Expected: all existing tests pass (they test functionality, not layout)

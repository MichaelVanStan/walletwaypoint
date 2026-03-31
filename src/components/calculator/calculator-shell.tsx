"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useQueryStates } from "nuqs";
import { CalculatorInputs } from "./calculator-inputs";
import { ScenarioToggle } from "./scenario-toggle";
import { ResultCard } from "./result-card";
import { ResultTable } from "./result-table";
import { Interpretation } from "./interpretation";
import { ActionCallout } from "./action-callout";
import { DetailTable } from "./detail-table";
import { CalculatorCharts } from "./calculator-charts";
import { ComparisonView } from "./comparison-view";
import { ResultNarrative } from "./result-narrative";
import { usePersistedState } from "@/lib/states/state-persistence";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2, RotateCcw } from "lucide-react";
import { formatByType } from "@/lib/calculators/formatters";
import type {
  CalculatorConfig,
  CalculatorResults,
  ComparisonDelta,
  OutputConfig,
} from "@/lib/calculators/types";

/** Compute comparison deltas between two result sets */
function computeDeltas(
  resultsA: CalculatorResults,
  resultsB: CalculatorResults,
  outputs: OutputConfig[]
): ComparisonDelta[] {
  return outputs.map((output) => {
    const valueA = resultsA.outputs[output.key] ?? 0;
    const valueB = resultsB.outputs[output.key] ?? 0;
    const delta = valueA - valueB;
    const semantic = output.deltaSemantic ?? "lower_is_better";

    let direction: "positive" | "negative" | "neutral";
    if (delta === 0 || semantic === "neutral") {
      direction = "neutral";
    } else if (semantic === "higher_is_better") {
      direction = delta > 0 ? "positive" : "negative";
    } else {
      // lower_is_better (default)
      direction = delta > 0 ? "negative" : "positive";
    }

    return {
      key: output.key,
      label: output.label,
      valueA,
      valueB,
      delta,
      format: output.format,
      direction,
    };
  });
}

interface CalculatorShellProps {
  config: CalculatorConfig;
  computeResults: (values: Record<string, number | string>) => CalculatorResults;
  params: Record<string, any>;
}

export function CalculatorShell({
  config,
  computeResults,
  params,
}: CalculatorShellProps) {
  const [values, setValues] = useQueryStates(params, {
    history: "replace",
    throttleMs: 200,
  });

  const [shareCopied, setShareCopied] = useState(false);
  const shareTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mql.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, []);

  const handleChange = useCallback(
    (key: string, value: number | string) => {
      setValues({ [key]: value });
    },
    [setValues]
  );

  const handleCompareToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        // Copy current Scenario A values to Scenario B
        const updates: Record<string, unknown> = { compare: true };
        const allInputs = [
          ...config.inputs.primary,
          ...(config.inputs.advanced ?? []),
        ];
        for (const input of allInputs) {
          const currentValue = values[input.urlKey];
          if (currentValue !== undefined) {
            updates[`b_${input.urlKey}`] = currentValue;
          }
        }
        setValues(updates);
      } else {
        setValues({ compare: false });
      }
    },
    [setValues, values, config.inputs.primary, config.inputs.advanced]
  );

  // Compute results for Scenario A
  const results = useMemo(
    () => computeResults(values as Record<string, number | string>),
    [values, computeResults]
  );

  // Auto-populate computed defaults (e.g., savings calculator monthly input)
  // When an input is 0 and there's a matching "Required" output, sync once
  useEffect(() => {
    const vals = values as Record<string, unknown>;
    if (
      vals.monthly === 0 &&
      results.outputs.monthlyRequired != null &&
      results.outputs.monthlyRequired > 0
    ) {
      setValues({ monthly: Math.round(results.outputs.monthlyRequired) });
    }
  }, [results.outputs.monthlyRequired, values, setValues]);

  // Compute results for Scenario B when comparison mode is active
  // Extract b_ prefixed values and map them back to original param keys
  const resultsB = useMemo(() => {
    if (!(values as Record<string, unknown>).compare) return null;
    const bValues: Record<string, number | string> = {};
    for (const [key, val] of Object.entries(values)) {
      if (key.startsWith("b_")) {
        bValues[key.slice(2)] = val as number | string;
      }
    }
    // Carry over non-b_ keys that don't have a b_ counterpart (like compare flag itself)
    for (const [key, val] of Object.entries(values)) {
      if (!key.startsWith("b_") && !(key in bValues) && key !== "compare") {
        bValues[key] = val as number | string;
      }
    }
    return computeResults(bValues);
  }, [values, computeResults]);

  // Build default values from params for reset
  const defaultValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const key of Object.keys(params)) {
      const parser = params[key];
      if (parser && typeof parser === "object" && "defaultValue" in parser) {
        defaults[key] = parser.defaultValue;
      }
    }
    return defaults;
  }, [params]);

  const handleReset = useCallback(() => {
    setValues(defaultValues);
  }, [setValues, defaultValues]);

  const handleShare = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      if (shareTimeoutRef.current) {
        clearTimeout(shareTimeoutRef.current);
      }
      shareTimeoutRef.current = setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    }
  }, []);

  const isComparing = Boolean((values as Record<string, unknown>).compare);
  const { userState } = usePersistedState();

  // Whether to use comparison table layout (home affordability)
  const isTableLayout = config.resultLayout === 'table';

  // Build Scenario B inputs with b_ prefix
  const scenarioBInputs = useMemo(
    () =>
      config.inputs.primary.map((input) => ({
        ...input,
        urlKey: `b_${input.urlKey}`,
      })),
    [config.inputs.primary]
  );

  const scenarioBAdvanced = useMemo(
    () =>
      config.inputs.advanced?.map((input) => ({
        ...input,
        urlKey: `b_${input.urlKey}`,
      })),
    [config.inputs.advanced]
  );

  // Determine detail table trigger label
  const detailTriggerLabel = config.slug.includes("mortgage")
    ? "Show full amortization schedule"
    : "View monthly breakdown";

  return (
    <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        {config.title}
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        {config.description}
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* Input Panel */}
        <aside
          className="w-full md:w-[300px] lg:w-[360px] shrink-0 md:sticky md:top-[120px] md:self-start rounded-lg border border-border bg-muted/50 p-6"
          aria-label="Calculator inputs"
        >
          {/* Desktop: show both scenarios stacked */}
          <div className="hidden md:block">
            {isComparing && (
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Your Scenario
              </h3>
            )}
            <CalculatorInputs
              inputs={config.inputs.primary}
              advancedInputs={config.inputs.advanced}
              values={values as Record<string, number | string>}
              onChange={handleChange}
            />

            <div className="mt-6">
              <ScenarioToggle
                enabled={isComparing}
                onToggle={handleCompareToggle}
              />
            </div>

            {isComparing && (
              <div className="mt-6 -mx-6 border-t border-orange-300/40 bg-orange-50/30 px-6 pt-5 pb-1 dark:border-orange-500/20 dark:bg-orange-950/10">
                <CalculatorInputs
                  inputs={scenarioBInputs}
                  advancedInputs={scenarioBAdvanced}
                  values={values as Record<string, number | string>}
                  onChange={handleChange}
                  scenarioLabel="Alternative Scenario"
                />
              </div>
            )}
          </div>

          {/* Mobile: tabs for scenarios when comparing */}
          <div className="md:hidden">
            {isComparing ? (
              <Tabs defaultValue="a">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="a">Your Scenario</TabsTrigger>
                  <TabsTrigger value="b">Alternative Scenario</TabsTrigger>
                </TabsList>
                <TabsContent value="a">
                  <CalculatorInputs
                    inputs={config.inputs.primary}
                    advancedInputs={config.inputs.advanced}
                    values={values as Record<string, number | string>}
                    onChange={handleChange}
                  />
                </TabsContent>
                <TabsContent value="b">
                  <CalculatorInputs
                    inputs={scenarioBInputs}
                    advancedInputs={scenarioBAdvanced}
                    values={values as Record<string, number | string>}
                    onChange={handleChange}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <CalculatorInputs
                inputs={config.inputs.primary}
                advancedInputs={config.inputs.advanced}
                values={values as Record<string, number | string>}
                onChange={handleChange}
              />
            )}

            <div className="mt-6">
              <ScenarioToggle
                enabled={isComparing}
                onToggle={handleCompareToggle}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="justify-start"
            >
              <RotateCcw className="size-4" />
              Reset to defaults
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="justify-start"
            >
              <Share2 className="size-4" />
              {shareCopied ? "Link copied!" : "Share Results"}
            </Button>
          </div>
        </aside>

        {/* Results Panel */}
        <section className="flex-1 min-w-0" aria-label="Calculator results">
          {/* Results: Narrative layout, Table layout, or Scorecards */}
          {config.narrative ? (
            <ResultNarrative
              config={config}
              results={results}
              resultsB={isComparing ? resultsB : undefined}
              reducedMotion={prefersReducedMotion}
            />
          ) : isTableLayout ? (
            <ResultTable
              tiers={[
                {
                  label: 'Conservative',
                  dtiRule: '28/36',
                  maxHomePrice: results.outputs.conservativePrice ?? 0,
                  monthlyPayment: results.outputs.conservativePayment ?? 0,
                  housingDti: results.outputs.conservativeHousingDti ?? 0,
                  totalDti: results.outputs.conservativeTotalDti ?? 0,
                  downPaymentAmount: results.outputs.conservativeDown ?? 0,
                  estimatedDisposableIncome:
                    (results.outputs.conservativeDisposable ?? -1) === -1
                      ? null
                      : results.outputs.conservativeDisposable,
                },
                {
                  label: 'Moderate',
                  dtiRule: '30/43',
                  maxHomePrice: results.outputs.moderatePrice ?? 0,
                  monthlyPayment: results.outputs.moderatePayment ?? 0,
                  housingDti: results.outputs.moderateHousingDti ?? 0,
                  totalDti: results.outputs.moderateTotalDti ?? 0,
                  downPaymentAmount: results.outputs.moderateDown ?? 0,
                  estimatedDisposableIncome:
                    (results.outputs.moderateDisposable ?? -1) === -1
                      ? null
                      : results.outputs.moderateDisposable,
                },
                {
                  label: 'Aggressive',
                  dtiRule: '35/50',
                  maxHomePrice: results.outputs.aggressivePrice ?? 0,
                  monthlyPayment: results.outputs.aggressivePayment ?? 0,
                  housingDti: results.outputs.aggressiveHousingDti ?? 0,
                  totalDti: results.outputs.aggressiveTotalDti ?? 0,
                  downPaymentAmount: results.outputs.aggressiveDown ?? 0,
                  estimatedDisposableIncome:
                    (results.outputs.aggressiveDisposable ?? -1) === -1
                      ? null
                      : results.outputs.aggressiveDisposable,
                },
              ]}
              hasPersistedState={!!userState}
              guidanceMessage="Lenders generally approve up to 43% total DTI. Below 36% gives you the most financial flexibility."
            />
          ) : config.outputs.some((o) => o.row != null) ? (
            /* Row-grouped layout */
            <div className="space-y-3">
              {Object.entries(
                config.outputs.reduce<Record<number, typeof config.outputs>>((acc, output) => {
                  const row = output.row ?? 0;
                  (acc[row] ??= []).push(output);
                  return acc;
                }, {})
              )
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([row, outputs]) => (
                  <div key={row} className={`grid gap-3 ${
                    outputs.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                    outputs.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                    'grid-cols-1'
                  }`}>
                    {outputs.map((output) => (
                      <ResultCard
                        key={output.key}
                        label={output.label}
                        value={formatByType(
                          results.outputs[output.key] ?? 0,
                          output.format
                        )}
                        primary={output.primary}
                        variant={output.variant}
                      />
                    ))}
                  </div>
                ))}
            </div>
          ) : (
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
                    variant={output.variant}
                    className={output.primary ? "sm:col-span-2 lg:col-span-1" : undefined}
                  />
                ))}
            </div>
          )}

          {/* Recommendation nugget (skip when narrative handles it) */}
          {!config.narrative && (
            <div className="mt-4">
              <Interpretation text={results.interpretation} />
            </div>
          )}

          {/* Charts (skip when narrative handles it) */}
          {!config.narrative && (
            <div className="mt-8">
              <CalculatorCharts
                charts={config.charts}
                chartData={results.chartData}
                chartDataB={isComparing ? resultsB?.chartData : undefined}
                reducedMotion={prefersReducedMotion}
              />
            </div>
          )}

          {/* Detail table for single-scenario mode (skip when narrative handles it) */}
          {!config.narrative && !isComparing && (
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
      </div>
    </div>
  );
}

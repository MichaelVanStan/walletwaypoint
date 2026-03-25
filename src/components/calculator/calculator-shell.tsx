"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useQueryStates } from "nuqs";
import { CalculatorInputs } from "./calculator-inputs";
import { ScenarioToggle } from "./scenario-toggle";
import { ResultCard } from "./result-card";
import { Interpretation } from "./interpretation";
import { ActionCallout } from "./action-callout";
import { DetailTable } from "./detail-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2, RotateCcw } from "lucide-react";
import { formatByType } from "@/lib/calculators/formatters";
import type { CalculatorConfig, CalculatorResults } from "@/lib/calculators/types";

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

  // Compute results for Scenario A
  const results = useMemo(
    () => computeResults(values as Record<string, number | string>),
    [values, computeResults]
  );

  // Compute results for Scenario B when comparison mode is active
  const resultsB = useMemo(() => {
    if (!(values as Record<string, unknown>).compare) return null;
    return computeResults(values as Record<string, number | string>);
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
          className="w-full md:w-[300px] lg:w-[360px] shrink-0 md:sticky md:top-[120px] md:self-start md:max-h-[calc(100vh-152px)] md:overflow-y-auto rounded-lg border border-border bg-muted/50 p-6"
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
                onToggle={(v) => setValues({ compare: v })}
              />
            </div>

            {isComparing && (
              <div className="mt-6">
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
                onToggle={(v) => setValues({ compare: v })}
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
          {/* Chart placeholder - wired in Plan 06 */}
          <div
            id="chart-area"
            className="min-h-[240px] md:min-h-[300px]"
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

          {/* Comparison results placeholder - wired in Plan 06 */}
          {isComparing && <div id="comparison-area" className="mt-8" />}

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

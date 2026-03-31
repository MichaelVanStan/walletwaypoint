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
  resultsB?: CalculatorResults | null;
  reducedMotion: boolean;
}

/** Interpolate {{key}} placeholders with output values */
function interpolate(
  template: string,
  outputs: Record<string, number>,
  config: CalculatorConfig
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = outputs[key];
    if (val == null) return key;
    const outputConfig = config.outputs.find((o) => o.key === key);
    if (outputConfig) return formatByType(val, outputConfig.format);
    return String(val);
  });
}

function NarrativeSectionRenderer({
  section,
  config,
  results,
  resultsB,
  reducedMotion,
}: {
  section: NarrativeSectionConfig;
  config: CalculatorConfig;
  results: CalculatorResults;
  resultsB?: CalculatorResults | null;
  reducedMotion: boolean;
}) {
  return (
    <NarrativeSection label={section.label} color={section.color}>
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
                : outputConfig?.variant === "success"
                ? "text-emerald-500"
                : outputConfig?.primary
                ? "text-accent"
                : undefined,
            };
          })}
        />
      )}

      {section.content === "chart" && section.chartKey && (
        <CalculatorCharts
          charts={config.charts.filter((c) => c.dataKey === section.chartKey)}
          chartData={results.chartData}
          chartDataB={resultsB?.chartData}
          referenceLines={results.referenceLines}
          reducedMotion={reducedMotion}
        />
      )}

      {section.content === "table" && (
        <DetailTable
          detailRows={results.detailRows}
          detailColumns={results.detailColumns}
          inline
        />
      )}

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
  resultsB,
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
      <HeroMetric
        label={narrative.heroLabel ?? heroOutput?.label ?? ""}
        value={heroValue}
        subtitle={heroSubtitle}
        className="mb-8"
      />

      {results.interpretation && (
        <NarrativeInterpretation text={results.interpretation} className="mb-6" />
      )}

      {narrative.sections.map((section, i) => (
        <NarrativeSectionRenderer
          key={i}
          section={section}
          config={config}
          results={results}
          resultsB={resultsB}
          reducedMotion={reducedMotion}
        />
      ))}

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

      {narrative.tip && (
        <TipCallout className="mt-6">
          {interpolate(narrative.tip, results.outputs, config)}
        </TipCallout>
      )}
    </div>
  );
}

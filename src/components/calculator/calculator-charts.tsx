"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import type { ChartConfig } from "@/lib/calculators/types";
import { formatCurrency, formatNumber } from "@/lib/calculators/formatters";

/** OKLCH chart colors matching globals.css --chart-1 through --chart-5 */
const CHART_COLORS = [
  "oklch(0.35 0.1 245)", // chart-1 blue
  "oklch(0.55 0.12 175)", // chart-2 teal
  "oklch(0.65 0.1 140)", // chart-3 green
  "oklch(0.45 0.08 260)", // chart-4 indigo
  "oklch(0.75 0.08 200)", // chart-5 light blue
];

/** Hex fallbacks for SVG contexts that may not support oklch() */
const CHART_COLORS_HEX = [
  "#1e40af",
  "#0d9488",
  "#16a34a",
  "#4338ca",
  "#38bdf8",
];

/** Alternative palette for Scenario B — warmer tones to contrast A's cool palette */
const CHART_COLORS_ALT = [
  "oklch(0.60 0.15 30)",   // warm coral
  "oklch(0.55 0.12 60)",   // amber
  "oklch(0.60 0.10 330)",  // rose
  "oklch(0.50 0.12 15)",   // burnt orange
  "oklch(0.65 0.10 45)",   // gold
];

const CHART_COLORS_ALT_HEX = [
  "#e05555",
  "#d97706",
  "#db2777",
  "#c2410c",
  "#ca8a04",
];

/** Get chart color with hex fallback for SVG rendering */
function getColor(index: number): string {
  // Use OKLCH if CSS supports it, otherwise fall back to hex
  if (typeof CSS !== "undefined" && CSS.supports?.("color", CHART_COLORS[0])) {
    return CHART_COLORS[index % CHART_COLORS.length];
  }
  return CHART_COLORS_HEX[index % CHART_COLORS_HEX.length];
}

/** Get alternative chart color for Scenario B */
function getAltColor(index: number): string {
  if (typeof CSS !== "undefined" && CSS.supports?.("color", CHART_COLORS_ALT[0])) {
    return CHART_COLORS_ALT[index % CHART_COLORS_ALT.length];
  }
  return CHART_COLORS_ALT_HEX[index % CHART_COLORS_ALT_HEX.length];
}

/** Keys commonly used for X-axis labels -- excluded when detecting data series */
const X_AXIS_KEYS = new Set([
  "year",
  "month",
  "age",
  "label",
  "name",
  "period",
  "date",
  "category",
]);

/** Human-friendly labels for chart data keys */
const SERIES_LABELS: Record<string, string> = {
  standard: "Standard",
  withExtra: "With Extra Payments",
  balance: "Balance",
  principal: "Principal",
  interest: "Interest",
  savings: "Savings",
  growth: "Growth",
};

function formatSeriesName(key: string): string {
  if (SERIES_LABELS[key]) return SERIES_LABELS[key];
  // camelCase → Title Case
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

/** Detect data series keys from the first data point (excludes X-axis keys) */
function getSeriesKeys(data: Record<string, number | string | unknown>[]): {
  xKey: string;
  seriesKeys: string[];
} {
  if (!data.length) return { xKey: "label", seriesKeys: [] };
  const allKeys = Object.keys(data[0]);
  const xKey = allKeys.find((k) => X_AXIS_KEYS.has(k)) ?? allKeys[0];
  const seriesKeys = allKeys.filter(
    (k) => k !== xKey && typeof data[0][k] === "number"
  );
  return { xKey, seriesKeys };
}

/** Format large currency values as abbreviated (e.g., "$150K") */
function formatAxisCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return formatCurrency(value);
}

/** Shared custom tooltip component using Tailwind classes for proper theming */
function CustomTooltip({
  active,
  payload,
  formatter,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    dataKey: string;
    value: number;
    color: string;
    payload: Record<string, unknown>;
  }>;
  formatter?: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  const dataPoint = payload[0]?.payload;
  const breakdown = dataPoint?._breakdown as
    | Record<string, { principal: number; interest: number }>
    | undefined;

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm">
      {payload.map((entry, i) => {
        const seriesBreakdown = breakdown?.[entry.dataKey];
        return (
          <div key={i} className="mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {formatSeriesName(entry.dataKey)}:
              </span>
              <span className="font-medium text-foreground">
                {formatter ? formatter(entry.value) : formatNumber(entry.value)}
              </span>
            </div>
            {seriesBreakdown && (
              <div className="ml-4 flex gap-3 text-xs text-muted-foreground">
                <span>P: {formatCurrency(seriesBreakdown.principal)}</span>
                <span>I: {formatCurrency(seriesBreakdown.interest)}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface CalculatorChartsProps {
  charts: ChartConfig[];
  chartData: Record<string, Record<string, number | string | unknown>[]>;
  chartDataB?: Record<string, Record<string, number | string | unknown>[]> | null;
  referenceLines?: Record<string, Array<{ x: number; label: string }>>;
  reducedMotion?: boolean;
  hideTitle?: boolean;
}

/** Merge Scenario B data into Scenario A data, suffixing B series with _B */
function mergeChartData(
  dataA: Record<string, number | string | unknown>[],
  dataB: Record<string, number | string | unknown>[],
  xKey: string,
  seriesKeys: string[]
): Record<string, number | string | unknown>[] {
  const merged = new Map<string | number, Record<string, unknown>>();

  for (const row of dataA) {
    const key = row[xKey] as string | number;
    merged.set(key, { ...row });
  }

  for (const row of dataB) {
    const key = row[xKey] as string | number;
    const existing = merged.get(key) ?? { [xKey]: key };
    for (const sk of seriesKeys) {
      if (row[sk] != null) {
        existing[`${sk}_B`] = row[sk];
      }
    }
    merged.set(key, existing);
  }

  return Array.from(merged.values());
}

export function CalculatorCharts({
  charts,
  chartData,
  chartDataB,
  referenceLines,
  reducedMotion = false,
  hideTitle = false,
}: CalculatorChartsProps) {
  if (!charts.length) return null;

  return (
    <div className="space-y-6">
      {charts.map((chart) => {
        const data = chartData[chart.dataKey];
        const dataB = chartDataB?.[chart.dataKey];
        const refLines = referenceLines?.[chart.dataKey];
        if (!data?.length) {
          return (
            <div key={chart.dataKey} className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                No data to display
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Adjust the inputs above to see your results visualized here.
              </p>
            </div>
          );
        }

        return (
          <div key={chart.dataKey}>
            {!hideTitle && (
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {chart.title}
              </h3>
            )}
            <div
              className="h-[240px] md:h-[300px]"
              role="img"
              aria-label={`${chart.title} chart`}
            >
              {chart.type === "area" && (
                <AreaChartRenderer
                  data={data}
                  dataB={dataB}
                  refLines={refLines}
                  reducedMotion={reducedMotion}
                />
              )}
              {chart.type === "pie" && (
                <PieChartRenderer
                  data={data}
                  dataB={dataB}
                  reducedMotion={reducedMotion}
                />
              )}
              {chart.type === "line" && (
                <LineChartRenderer
                  data={data}
                  dataB={dataB}
                  reducedMotion={reducedMotion}
                />
              )}
              {chart.type === "bar" && (
                <BarChartRenderer
                  data={data}
                  dataB={dataB}
                  reducedMotion={reducedMotion}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Find the index of the last data point with a non-zero value for a series.
 */
function findLastNonZeroIndex(
  data: Record<string, number | string | unknown>[],
  key: string
): number {
  for (let i = data.length - 1; i >= 0; i--) {
    if (typeof data[i][key] === "number" && (data[i][key] as number) > 0) {
      return i;
    }
  }
  return data.length - 1;
}

/**
 * Check whether two series have identical data (e.g., extra payment = 0
 * means "standard" and "withExtra" are the same line).
 */
function seriesAreIdentical(
  data: Record<string, number | string | unknown>[],
  keyA: string,
  keyB: string
): boolean {
  return data.every((d) => d[keyA] === d[keyB]);
}

/**
 * Custom dot renderer that draws a leader line + label at the last data point.
 * For all other points, renders nothing.
 */
function LeaderDot({
  cx,
  cy,
  index,
  lastIndex,
  color,
  label,
  yOffset = 0,
}: {
  cx?: number;
  cy?: number;
  index?: number;
  lastIndex: number;
  color: string;
  label: string;
  yOffset?: number;
}) {
  if (index !== lastIndex || cx == null || cy == null) return <g />;
  const labelY = cy + yOffset;
  const lineEndX = cx + 18;
  const dotX = lineEndX + 6;
  const textX = dotX + 10;
  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={lineEndX}
        y2={labelY}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.6}
      />
      <circle cx={dotX} cy={labelY} r={3.5} fill={color} />
      <text
        x={textX}
        y={labelY + 4}
        fontSize={11}
        fontWeight={500}
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

/** Area chart with gradient fills for amortization curves, growth projections */
function AreaChartRenderer({
  data,
  dataB,
  refLines,
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  dataB?: Record<string, number | string | unknown>[];
  refLines?: Array<{ x: number; label: string }>;
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);

  // Merge B series when comparing
  const chartData = dataB?.length
    ? mergeChartData(data, dataB, xKey, seriesKeys)
    : data;
  const bSeriesKeys = dataB?.length ? seriesKeys.map((k) => `${k}_B`) : [];

  // Show labels: always for single series, only when distinct for multi-series
  const hasDistinctMultiple =
    seriesKeys.length > 1 &&
    !seriesKeys.every((k) => seriesAreIdentical(chartData, seriesKeys[0], k));
  const showLabels = seriesKeys.length === 1 || hasDistinctMultiple || bSeriesKeys.length > 0;

  // Precompute last indices and detect endpoint overlap for vertical offset
  const allKeys = [...seriesKeys, ...bSeriesKeys];
  const lastIndices = allKeys.map((key) => findLastNonZeroIndex(chartData, key));
  const endpointsSame = allKeys.length > 1 && lastIndices.every((idx) => idx === lastIndices[0]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={showLabels ? { right: 130 } : undefined}>
        <defs>
          {seriesKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`gradient-${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={getColor(i)}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={getColor(i)}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
          {bSeriesKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`gradient-b-${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={getAltColor(i)}
                stopOpacity={0.15}
              />
              <stop
                offset="95%"
                stopColor={getAltColor(i)}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatAxisCurrency}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          content={
            <CustomTooltip formatter={(v) => formatCurrency(v)} />
          }
        />
        {refLines?.map((ref, i) => (
          <ReferenceLine
            key={`ref-${i}`}
            x={ref.x}
            stroke="oklch(0.55 0 0)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: ref.label,
              position: "top",
              fontSize: 11,
              fill: "oklch(0.55 0 0)",
            }}
          />
        ))}
        {seriesKeys.map((key, i) => {
          const keyIndex = i;
          const lastIdx = showLabels ? lastIndices[keyIndex] : -1;
          const yOffset = endpointsSame ? (keyIndex === 0 ? -12 : 12) : 0;
          const label = bSeriesKeys.length > 0
            ? `${formatSeriesName(key)} (Baseline)`
            : formatSeriesName(key);
          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={getColor(i)}
              strokeWidth={2}
              fill={`url(#gradient-${i})`}
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
              dot={
                showLabels
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <LeaderDot
                        cx={props.cx}
                        cy={props.cy}
                        index={props.index}
                        lastIndex={lastIdx}
                        color={getColor(i)}
                        label={label}
                        yOffset={yOffset}
                      />
                    )) as any
                  : false
              }
            />
          );
        })}
        {bSeriesKeys.map((key, i) => {
          const keyIndex = seriesKeys.length + i;
          const lastIdx = showLabels ? lastIndices[keyIndex] : -1;
          const yOffset = endpointsSame ? (keyIndex === 0 ? -12 : 12) : 0;
          const originalKey = seriesKeys[i];
          const label = `${formatSeriesName(originalKey)} (Alternative)`;
          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={getAltColor(i)}
              strokeWidth={2}
              strokeDasharray="6 4"
              fill={`url(#gradient-b-${i})`}
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
              dot={
                showLabels
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <LeaderDot
                        cx={props.cx}
                        cy={props.cy}
                        index={props.index}
                        lastIndex={lastIdx}
                        color={getAltColor(i)}
                        label={label}
                        yOffset={yOffset}
                      />
                    )) as any
                  : false
              }
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Pie (donut) chart for breakdowns */
function PieChartRenderer({
  data,
  dataB,
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  dataB?: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);
  const valueKey = seriesKeys[0] ?? "value";
  const hasDual = dataB && dataB.length > 0;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {hasDual && (
          <>
            <text
              x="30%"
              y={20}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              className="fill-foreground"
            >
              Baseline
            </text>
            <text
              x="70%"
              y={20}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              className="fill-foreground"
            >
              Alternative
            </text>
          </>
        )}
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={xKey}
          cx={hasDual ? "30%" : "50%"}
          cy="50%"
          innerRadius={hasDual ? 40 : 60}
          outerRadius={hasDual ? 70 : 100}
          animationDuration={reducedMotion ? 0 : 300}
          isAnimationActive={!reducedMotion}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={getColor(i)} />
          ))}
        </Pie>
        {hasDual && (
          <Pie
            data={dataB}
            dataKey={valueKey}
            nameKey={xKey}
            cx="70%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            animationDuration={reducedMotion ? 0 : 300}
            isAnimationActive={!reducedMotion}
          >
            {dataB.map((_, i) => (
              <Cell key={i} fill={getAltColor(i)} />
            ))}
          </Pie>
        )}
        <Tooltip
          content={
            <CustomTooltip formatter={(v) => formatCurrency(v)} />
          }
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Line chart for savings progress, projections */
function LineChartRenderer({
  data,
  dataB,
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  dataB?: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);
  const hasGoal = data.some((d) => "goal" in d && typeof d.goal === "number");
  const plotKeys = seriesKeys.filter((k) => k !== "goal");

  // Merge B series when comparing
  const chartData = dataB?.length
    ? mergeChartData(data, dataB, xKey, plotKeys)
    : data;
  const bPlotKeys = dataB?.length ? plotKeys.map((k) => `${k}_B`) : [];

  // Show labels when there are multiple plotted series OR a goal reference line
  const hasDistinctSeries =
    plotKeys.length > 1 &&
    !plotKeys.every((k) => seriesAreIdentical(chartData, plotKeys[0], k));
  const showLabels = hasDistinctSeries || (plotKeys.length >= 1 && hasGoal) || bPlotKeys.length > 0;

  const allKeys = [...plotKeys, ...bPlotKeys];
  const lastIndices = allKeys.map((key) => findLastNonZeroIndex(chartData, key));
  const endpointsSame = allKeys.length > 1 && lastIndices.every((idx) => idx === lastIndices[0]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={showLabels ? { right: 130 } : undefined}>
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatAxisCurrency}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          content={
            <CustomTooltip formatter={(v) => formatCurrency(v)} />
          }
        />
        {hasGoal && (
          <ReferenceLine
            y={Number(chartData[0]?.goal ?? 0)}
            stroke={getColor(2)}
            strokeDasharray="4 4"
            label={{
              value: "Goal",
              position: "right",
              fontSize: 12,
              fill: getColor(2),
            }}
          />
        )}
        {plotKeys.map((key, i) => {
          const keyIndex = i;
          const lastIdx = showLabels ? lastIndices[keyIndex] : -1;
          const yOffset = endpointsSame ? (keyIndex === 0 ? -12 : 12) : 0;
          const label = bPlotKeys.length > 0
            ? `${formatSeriesName(key)} (Baseline)`
            : formatSeriesName(key);
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={getColor(i)}
              strokeWidth={2}
              dot={
                showLabels
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <LeaderDot
                        cx={props.cx}
                        cy={props.cy}
                        index={props.index}
                        lastIndex={lastIdx}
                        color={getColor(i)}
                        label={label}
                        yOffset={yOffset}
                      />
                    )) as any
                  : false
              }
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
            />
          );
        })}
        {bPlotKeys.map((key, i) => {
          const keyIndex = plotKeys.length + i;
          const lastIdx = showLabels ? lastIndices[keyIndex] : -1;
          const yOffset = endpointsSame ? (keyIndex === 0 ? -12 : 12) : 0;
          const originalKey = plotKeys[i];
          const label = `${formatSeriesName(originalKey)} (Alternative)`;
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={getAltColor(i)}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={
                showLabels
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <LeaderDot
                        cx={props.cx}
                        cy={props.cy}
                        index={props.index}
                        lastIndex={lastIdx}
                        color={getAltColor(i)}
                        label={label}
                        yOffset={yOffset}
                      />
                    )) as any
                  : false
              }
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Bar chart for plan comparisons, bracket visualization */
function BarChartRenderer({
  data,
  dataB,
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  dataB?: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);

  // Merge B series when comparing
  const chartData = dataB?.length
    ? mergeChartData(data, dataB, xKey, seriesKeys)
    : data;
  const bSeriesKeys = dataB?.length ? seriesKeys.map((k) => `${k}_B`) : [];
  const allKeys = [...seriesKeys, ...bSeriesKeys];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatAxisCurrency}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          content={
            <CustomTooltip formatter={(v) => formatCurrency(v)} />
          }
        />
        {allKeys.length > 1 && (
          <Legend iconType="circle" iconSize={8} />
        )}
        {seriesKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            name={bSeriesKeys.length > 0 ? `${formatSeriesName(key)} (Baseline)` : formatSeriesName(key)}
            fill={getColor(i)}
            barSize={bSeriesKeys.length > 0 ? 30 : 40}
            radius={[4, 4, 0, 0]}
            animationDuration={reducedMotion ? 0 : 300}
            isAnimationActive={!reducedMotion}
          />
        ))}
        {bSeriesKeys.map((key, i) => {
          const originalKey = seriesKeys[i];
          return (
            <Bar
              key={key}
              dataKey={key}
              name={`${formatSeriesName(originalKey)} (Alternative)`}
              fill={getAltColor(i)}
              barSize={30}
              radius={[4, 4, 0, 0]}
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

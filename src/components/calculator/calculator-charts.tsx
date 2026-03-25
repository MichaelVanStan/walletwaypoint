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

/** Get chart color with hex fallback for SVG rendering */
function getColor(index: number): string {
  // Use OKLCH if CSS supports it, otherwise fall back to hex
  if (typeof CSS !== "undefined" && CSS.supports?.("color", CHART_COLORS[0])) {
    return CHART_COLORS[index % CHART_COLORS.length];
  }
  return CHART_COLORS_HEX[index % CHART_COLORS_HEX.length];
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
  reducedMotion?: boolean;
}

export function CalculatorCharts({
  charts,
  chartData,
  reducedMotion = false,
}: CalculatorChartsProps) {
  if (!charts.length) return null;

  return (
    <div className="space-y-6">
      {charts.map((chart) => {
        const data = chartData[chart.dataKey];
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
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {chart.title}
            </h3>
            <div
              className="h-[240px] md:h-[300px]"
              role="img"
              aria-label={`${chart.title} chart`}
            >
              {chart.type === "area" && (
                <AreaChartRenderer
                  data={data}
                  reducedMotion={reducedMotion}
                />
              )}
              {chart.type === "pie" && (
                <PieChartRenderer data={data} reducedMotion={reducedMotion} />
              )}
              {chart.type === "line" && (
                <LineChartRenderer data={data} reducedMotion={reducedMotion} />
              )}
              {chart.type === "bar" && (
                <BarChartRenderer data={data} reducedMotion={reducedMotion} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Find the best index to place a direct label for a series.
 * For series that drop to 0 early (e.g., "withExtra" in loan charts),
 * we label at the midpoint of the active range.
 * For series that span the full chart, we label near the middle.
 */
function findLabelIndex(
  data: Record<string, number | string | unknown>[],
  key: string
): number {
  // Find the last non-zero data point
  let lastNonZero = data.length - 1;
  for (let i = data.length - 1; i >= 0; i--) {
    if (typeof data[i][key] === "number" && (data[i][key] as number) > 0) {
      lastNonZero = i;
      break;
    }
  }
  // Label at ~40% of the active range (avoids edges and overlapping starts)
  return Math.max(0, Math.round(lastNonZero * 0.4));
}

/** Render a direct label on a specific data point in a series */
function SeriesLabel({
  x,
  y,
  index,
  labelIndex,
  label,
  color,
}: {
  x?: number;
  y?: number;
  index?: number;
  labelIndex: number;
  label: string;
  color: string;
}) {
  if (index !== labelIndex || x == null || y == null) return null;
  return (
    <g>
      <rect
        x={x - 2}
        y={y - 14}
        width={label.length * 6.5 + 8}
        height={18}
        rx={4}
        fill="white"
        fillOpacity={0.85}
      />
      <text
        x={x + 2}
        y={y - 1}
        fontSize={11}
        fontWeight={600}
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
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);
  const hasMultipleSeries = seriesKeys.length > 1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
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
        {hasMultipleSeries && (
          <Legend iconType="circle" iconSize={8} />
        )}
        {seriesKeys.map((key, i) => {
          const labelIndex = hasMultipleSeries
            ? findLabelIndex(data, key)
            : -1;
          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={formatSeriesName(key)}
              stroke={getColor(i)}
              strokeWidth={2}
              fill={`url(#gradient-${i})`}
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
              label={
                hasMultipleSeries
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <SeriesLabel
                        x={props.x}
                        y={props.y}
                        index={props.index}
                        labelIndex={labelIndex}
                        label={formatSeriesName(key)}
                        color={getColor(i)}
                      />
                    )) as any
                  : undefined
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
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);
  const valueKey = seriesKeys[0] ?? "value";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={xKey}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          animationDuration={reducedMotion ? 0 : 300}
          isAnimationActive={!reducedMotion}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={getColor(i)} />
          ))}
        </Pie>
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
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);
  const hasGoal = data.some((d) => "goal" in d && typeof d.goal === "number");
  const plotKeys = seriesKeys.filter((k) => k !== "goal");
  const hasMultipleSeries = plotKeys.length > 1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
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
        {hasMultipleSeries && (
          <Legend iconType="circle" iconSize={8} />
        )}
        {hasGoal && (
          <ReferenceLine
            y={Number(data[0]?.goal ?? 0)}
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
          const labelIndex = hasMultipleSeries
            ? findLabelIndex(data, key)
            : -1;
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={formatSeriesName(key)}
              stroke={getColor(i)}
              strokeWidth={2}
              dot={false}
              animationDuration={reducedMotion ? 0 : 300}
              isAnimationActive={!reducedMotion}
              label={
                hasMultipleSeries
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ((props: any) => (
                      <SeriesLabel
                        x={props.x}
                        y={props.y}
                        index={props.index}
                        labelIndex={labelIndex}
                        label={formatSeriesName(key)}
                        color={getColor(i)}
                      />
                    )) as any
                  : undefined
              }
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
  reducedMotion,
}: {
  data: Record<string, number | string | unknown>[];
  reducedMotion: boolean;
}) {
  const { xKey, seriesKeys } = getSeriesKeys(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
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
        {seriesKeys.length > 1 && (
          <Legend iconType="circle" iconSize={8} />
        )}
        {seriesKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            name={formatSeriesName(key)}
            fill={getColor(i)}
            barSize={40}
            radius={[4, 4, 0, 0]}
            animationDuration={reducedMotion ? 0 : 300}
            isAnimationActive={!reducedMotion}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

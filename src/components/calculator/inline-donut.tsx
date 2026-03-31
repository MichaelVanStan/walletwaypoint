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
  size?: number;
  strokeWidth?: number;
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

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

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

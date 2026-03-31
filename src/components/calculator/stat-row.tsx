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

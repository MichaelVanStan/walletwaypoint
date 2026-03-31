"use client";

import { cn } from "@/lib/utils";

const SECTION_COLORS: Record<string, string> = {
  green: "text-accent",
  orange: "text-orange-500",
  blue: "text-slate-600 dark:text-slate-300",
  red: "text-red-500",
  purple: "text-purple-400",
  muted: "text-foreground",
};

interface NarrativeSectionProps {
  label: string;
  color?: keyof typeof SECTION_COLORS;
  children: React.ReactNode;
  className?: string;
}

export function NarrativeSection({
  label,
  color = "muted",
  children,
  className,
}: NarrativeSectionProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div
        className={cn(
          "mb-3 text-sm font-semibold",
          SECTION_COLORS[color] ?? SECTION_COLORS.muted
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

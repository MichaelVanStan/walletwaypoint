"use client";

import { cn } from "@/lib/utils";

const SECTION_COLORS: Record<string, string> = {
  green: "text-accent",
  orange: "text-orange-500",
  blue: "text-sky-500",
  red: "text-red-500",
  purple: "text-purple-400",
  muted: "text-muted-foreground",
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
          "mb-3 text-[11px] font-medium uppercase tracking-[0.15em]",
          SECTION_COLORS[color] ?? SECTION_COLORS.muted
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

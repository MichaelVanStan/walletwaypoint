"use client";

import { cn } from "@/lib/utils";

interface TipCalloutProps {
  children: React.ReactNode;
  className?: string;
}

export function TipCallout({ children, className }: TipCalloutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-accent/20 bg-accent/5 px-3.5 py-2.5 text-xs leading-relaxed text-accent/80",
        className
      )}
    >
      <strong className="font-semibold text-accent">Tip: </strong>
      {children}
    </div>
  );
}

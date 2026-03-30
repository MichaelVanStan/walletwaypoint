"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  primary?: boolean;
  variant?: 'default' | 'warning';
  className?: string;
}

export function ResultCard({ label, value, primary, variant = 'default', className }: ResultCardProps) {
  const isWarning = variant === 'warning';

  return (
    <Card
      className={cn(
        "p-4",
        primary && "ring-accent/30 bg-accent/5",
        isWarning && "border-orange-300/40 bg-orange-50/50 dark:border-orange-500/20 dark:bg-orange-950/20",
        className
      )}
    >
      <CardContent className="p-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 text-2xl font-bold",
            primary ? "text-accent" : isWarning ? "text-orange-600 dark:text-orange-400" : "text-foreground"
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

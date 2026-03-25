"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  primary?: boolean;
  className?: string;
}

export function ResultCard({ label, value, primary, className }: ResultCardProps) {
  return (
    <Card
      className={cn(
        "p-4",
        primary
          ? "ring-accent/30 bg-accent/5"
          : "",
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
            primary ? "text-accent" : "text-foreground"
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

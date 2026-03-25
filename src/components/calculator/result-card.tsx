"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  label: string;
  value: string;
  primary?: boolean;
}

export function ResultCard({ label, value, primary }: ResultCardProps) {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={
            primary
              ? "text-2xl lg:text-[28px] font-semibold text-foreground"
              : "text-2xl font-semibold text-foreground"
          }
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

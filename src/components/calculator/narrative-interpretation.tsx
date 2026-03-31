"use client";

import { cn } from "@/lib/utils";

interface NarrativeInterpretationProps {
  text: string;
  className?: string;
}

function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function NarrativeInterpretation({ text, className }: NarrativeInterpretationProps) {
  return (
    <div
      className={cn(
        "rounded-r-md border-l-[3px] border-accent bg-accent/5 px-3.5 py-2.5 text-sm leading-relaxed text-muted-foreground",
        className
      )}
    >
      {renderBold(text)}
    </div>
  );
}

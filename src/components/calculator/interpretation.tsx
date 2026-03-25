"use client";

interface InterpretationProps {
  text: string;
}

export function Interpretation({ text }: InterpretationProps) {
  return (
    <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3.5">
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

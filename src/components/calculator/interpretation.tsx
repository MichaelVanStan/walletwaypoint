"use client";

interface InterpretationProps {
  text: string;
}

export function Interpretation({ text }: InterpretationProps) {
  return (
    <p className="text-base leading-[1.6] text-foreground">{text}</p>
  );
}

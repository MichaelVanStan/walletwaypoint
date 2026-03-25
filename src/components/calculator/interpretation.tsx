"use client";

interface InterpretationProps {
  text: string;
}

/** Parse **bold** markers in text and render as accent-colored bold spans */
function renderWithHighlights(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-accent">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function Interpretation({ text }: InterpretationProps) {
  return (
    <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3.5">
      <p className="text-sm leading-relaxed text-foreground">
        {renderWithHighlights(text)}
      </p>
    </div>
  );
}

import { Lightbulb } from 'lucide-react';

export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      aria-label="Key Takeaway"
      className="bg-primary/5 border-l-4 border-primary rounded-r-lg px-4 py-6 my-6"
    >
      <div className="flex items-center gap-2 text-primary mb-2">
        <Lightbulb className="size-5 shrink-0" />
        <span className="text-sm font-semibold">Key Takeaway</span>
      </div>
      <div className="text-foreground text-base leading-[1.7]">{children}</div>
    </div>
  );
}

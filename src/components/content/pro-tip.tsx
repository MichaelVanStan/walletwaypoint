import { Sparkles } from 'lucide-react';

export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      aria-label="Pro Tip"
      className="bg-chart-3/10 border-l-4 border-chart-3 rounded-r-lg px-4 py-6 my-6"
    >
      <div className="flex items-center gap-2 text-[color:var(--chart-3)] mb-2">
        <Sparkles className="size-5 shrink-0" />
        <span className="text-sm font-semibold">Pro Tip</span>
      </div>
      <div className="text-foreground text-base leading-[1.7]">{children}</div>
    </div>
  );
}

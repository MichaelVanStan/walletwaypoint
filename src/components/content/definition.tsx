import { BookOpen } from 'lucide-react';

export function Definition({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      aria-label="Definition"
      className="bg-accent/5 border-l-4 border-accent/40 rounded-r-lg px-4 py-6 my-6"
    >
      <div className="flex items-center gap-2 text-accent mb-2">
        <BookOpen className="size-5 shrink-0" />
        <span className="text-sm font-semibold">Definition</span>
      </div>
      <div className="text-foreground text-base leading-[1.7]">{children}</div>
    </div>
  );
}

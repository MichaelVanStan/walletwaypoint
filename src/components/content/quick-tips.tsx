import { CheckCircle2 } from 'lucide-react';

interface QuickTipsProps {
  tips: { title: string; description: string }[];
}

export function QuickTips({ tips }: QuickTipsProps) {
  if (tips.length === 0) return null;

  return (
    <section className="rounded-xl bg-muted px-6 py-12" aria-label="Quick Tips">
      <h2 className="text-xl font-semibold text-foreground">Quick Tips</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Practical advice to keep in mind.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tips.map((tip) => (
          <div key={tip.title} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-chart-3" />
            <div>
              <p className="text-sm font-semibold text-foreground">{tip.title}</p>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

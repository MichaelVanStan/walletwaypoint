import Link from 'next/link';
import { guides, calculators } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, Calculator } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Financial Guides',
  description:
    'Clear, jargon-free explanations of the financial topics that matter most. Written like a smart friend who happens to know money.',
  path: '/guides',
});

export default function GuidesPage() {
  const calculatorMap = new Map(calculators.map((c) => [c.slug, c]));

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
          Financial Guides
        </h1>
        <p className="mx-auto mt-3 max-w-[480px] text-base text-muted-foreground">
          Clear, jargon-free explanations of the financial topics that matter
          most. Written like a smart friend who happens to know money.
        </p>
      </div>

      {/* Divider */}
      <div className="mx-auto mt-10 h-px w-12 bg-border" />

      {guides.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Guides are on the way. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col">
          {guides.map((guide, i) => {
            const pairedCalc = calculatorMap.get(guide.calculator);
            const isEven = i % 2 === 1;

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group grid border-b border-border transition-colors hover:bg-accent/[0.03] first:border-t md:grid-cols-2"
              >
                {/* Guide Body */}
                <div
                  className={`flex flex-col justify-center px-6 py-10 sm:px-9 ${isEven ? 'md:order-2' : ''}`}
                >
                  <span className="font-serif text-5xl font-medium text-accent/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-3 font-serif text-xl font-medium leading-snug text-foreground md:text-[22px]">
                    {guide.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">
                      <Clock className="size-3" data-icon="inline-start" />
                      {guide.metadata.readingTime} min read
                    </Badge>
                    {pairedCalc && (
                      <Link
                        href={`/calculators/${pairedCalc.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-md bg-accent/[0.08] px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/[0.15]"
                      >
                        <Calculator className="size-3" />
                        {pairedCalc.title}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div
                  className={`flex flex-col justify-center gap-4 bg-muted px-6 py-10 sm:px-9 ${isEven ? 'md:order-1' : ''}`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Key Takeaways
                  </span>
                  <ul className="flex flex-col gap-2">
                    {guide.keyTakeaways.map((takeaway) => (
                      <li
                        key={takeaway}
                        className="relative pl-4 text-sm leading-snug text-foreground before:absolute before:left-0 before:top-[7px] before:size-[5px] before:rounded-full before:bg-accent"
                      >
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

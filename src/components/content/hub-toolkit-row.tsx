import Link from 'next/link';
import { HubIcon } from '@/components/content/hub-icon';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface HubToolkitRowProps {
  index: number;
  guide?: {
    slug: string;
    title: string;
    description: string;
    readingTime: number;
  };
  calculator?: {
    slug: string;
    title: string;
    description: string;
    icon: string;
  };
}

export function HubToolkitRow({ index, guide, calculator }: HubToolkitRowProps) {
  const number = String(index + 1).padStart(2, '0');
  const hasGuide = !!guide;
  const hasCalculator = !!calculator;

  return (
    <div className="flex items-stretch overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow hover:ring-accent/50 max-sm:flex-col">
      {/* Number column */}
      <div className="flex w-16 shrink-0 items-center justify-center bg-accent/5 text-[1.75rem] font-extrabold text-accent/20 max-sm:h-10 max-sm:w-full max-sm:justify-start max-sm:gap-2 max-sm:px-4">
        {number}
      </div>

      {/* Guide section */}
      {hasGuide && (
        <Link
          href={`/guides/${guide.slug}`}
          className={`flex flex-1 flex-col gap-1 p-5 px-6 ${
            hasCalculator
              ? 'border-r border-border max-sm:border-r-0'
              : ''
          }`}
        >
          <h3 className="text-[0.9375rem] font-semibold">{guide.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {guide.description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant="secondary">{guide.readingTime} min read</Badge>
            <span className="flex items-center gap-1 text-sm text-accent">
              Read guide
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </Link>
      )}

      {/* Calculator section */}
      {hasCalculator && (
        <Link
          href={`/calculators/${calculator.slug}`}
          className={`flex w-[280px] shrink-0 flex-col justify-center gap-2 bg-accent/[0.03] p-5 px-6 max-sm:w-full ${
            !hasGuide ? '' : 'max-sm:border-t max-sm:border-border'
          }`}
        >
          <div className="flex items-center gap-2">
            <HubIcon icon={calculator.icon} className="size-4 text-accent" />
            <h3 className="text-[0.8125rem] font-semibold">
              {calculator.title}
            </h3>
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {calculator.description}
          </p>
          <span className="flex items-center gap-1 text-xs text-accent">
            Try it
            <ArrowRight className="size-3" />
          </span>
        </Link>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return ArrowRight;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || ArrowRight;
}

interface NextStepsProps {
  steps: { hubSlug: string; label: string }[];
  hubs: { slug: string; icon: string; accentColor: string }[];
}

export function NextSteps({ steps, hubs }: NextStepsProps) {
  if (steps.length === 0) return null;

  return (
    <section className="py-12" aria-label="Next Steps">
      <h2 className="text-xl font-semibold text-foreground">Next Steps</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Ready to explore more? These hubs might be your next stop.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        {steps.map((step) => {
          const matchedHub = hubs.find((h) => h.slug === step.hubSlug);
          const Icon = getIcon(matchedHub?.icon);
          const accent = matchedHub?.accentColor || 'oklch(0.55 0.12 175)';

          return (
            <Link
              key={step.hubSlug}
              href={`/hubs/${step.hubSlug}`}
              className="block flex-1"
            >
              <Card
                className="p-4 transition-colors hover:border-[color:var(--step-accent)]/50"
                style={{ '--step-accent': accent } as React.CSSProperties}
              >
                <CardContent className="flex items-center gap-3 p-0">
                  <Icon
                    className="size-5 shrink-0 text-[color:var(--step-accent)]"
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm font-semibold text-foreground">
                    {step.label}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return ArrowRight;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || ArrowRight;
}

interface HubHeroProps {
  name: string;
  tagline: string;
  icon: string;
  accentColor: string;
  intro?: string;
}

export function HubHero({ name, tagline, icon, accentColor, intro }: HubHeroProps) {
  const Icon = getIcon(icon);

  return (
    <section
      aria-label={`${name} hub`}
      className="w-full bg-[color:var(--hub-accent)]/5"
      style={{ '--hub-accent': accentColor } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
        <Icon
          className="size-8 text-[color:var(--hub-accent)] md:size-12"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          {name}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {tagline}
        </p>
        {intro && (
          <p className="mt-4 max-w-[640px] text-base text-foreground">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

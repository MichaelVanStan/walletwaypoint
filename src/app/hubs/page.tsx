import Link from 'next/link';
import { hubs } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { HubIcon } from '@/components/content/hub-icon';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Life Stage Hubs',
  description:
    'Financial tools and guides organized by where you are in life. Find your stage, get your roadmap.',
  path: '/hubs',
});

export default function HubsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-2xl font-semibold text-foreground">
        Life Stage Hubs
      </h1>
      <p className="mt-3 max-w-[640px] text-base text-muted-foreground">
        Financial tools and guides organized by where you are in life. Find your
        stage, get your roadmap.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <Link key={hub.slug} href={`/hubs/${hub.slug}`} className="block">
            <Card
              className="h-full p-4 transition-colors hover:border-[color:var(--hub-accent)]/50"
              style={
                { '--hub-accent': hub.accentColor } as React.CSSProperties
              }
            >
              <CardContent className="flex flex-col gap-3 p-0">
                <HubIcon
                  icon={hub.icon}
                  className="size-8 text-[color:var(--hub-accent)]"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {hub.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {hub.tagline}
                  </p>
                </div>
                <span className="mt-auto flex items-center gap-1 text-sm text-accent">
                  Explore this hub
                  <ArrowRight className="size-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

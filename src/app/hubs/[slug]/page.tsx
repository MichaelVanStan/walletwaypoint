import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hubs, calculators, guides } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { HubHero } from '@/components/content/hub-hero';
import { HubSection } from '@/components/content/hub-section';
import { QuickTips } from '@/components/content/quick-tips';
import { NextSteps } from '@/components/content/next-steps';
import { HubIcon } from '@/components/content/hub-icon';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return hubs.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = hubs.find((h) => h.slug === slug);
  if (!hub) return {};
  return createMetadata({
    title: hub.name,
    description: hub.description,
    path: `/hubs/${hub.slug}`,
  });
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = hubs.find((h) => h.slug === slug);
  if (!hub) notFound();

  const hubCalculators = calculators.filter((c) =>
    hub.calculatorSlugs.includes(c.slug)
  );
  const hubGuides = guides.filter((g) =>
    hub.guideSlugs.includes(g.slug)
  );
  const nextStepHubs = hubs.filter((h) =>
    hub.nextSteps.some((ns) => ns.hubSlug === h.slug)
  );

  return (
    <>
      <HubHero
        name={hub.name}
        tagline={hub.tagline}
        icon={hub.icon}
        accentColor={hub.accentColor}
        intro={hub.intro}
      />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <HubSection
          title="Your Calculators"
          intro="Interactive tools to run the numbers for your situation."
        >
          {hubCalculators.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hubCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="block"
                >
                  <Card className="h-full p-4 transition-colors hover:border-accent/50">
                    <CardContent className="flex flex-col gap-3 p-0">
                      <HubIcon
                        icon={calc.callouts?.[0]?.icon || 'Calculator'}
                        className="size-6 text-accent"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {calc.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {calc.description}
                        </p>
                      </div>
                      <span className="mt-auto flex items-center gap-1 text-sm text-accent">
                        Try this calculator
                        <ArrowRight className="size-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Calculators for this life stage are coming soon. Explore our other{' '}
              <Link href="/calculators" className="underline hover:text-foreground">
                calculators
              </Link>{' '}
              in the meantime.
            </p>
          )}
        </HubSection>

        <HubSection
          title="Guides For You"
          intro="Clear explanations to help you understand the concepts."
        >
          {hubGuides.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hubGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block"
                >
                  <Card className="h-full p-4 transition-colors hover:border-accent/50">
                    <CardContent className="flex flex-col gap-3 p-0">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {guide.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <Badge variant="secondary">
                          {guide.metadata.readingTime} min read
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-accent">
                          Read guide
                          <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Guides for this life stage are coming soon. Check out our other{' '}
              <Link href="/guides" className="underline hover:text-foreground">
                guides
              </Link>{' '}
              in the meantime.
            </p>
          )}
        </HubSection>

        <QuickTips tips={hub.tips} />

        <NextSteps steps={hub.nextSteps} hubs={nextStepHubs} />
      </div>
    </>
  );
}

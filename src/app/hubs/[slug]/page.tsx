import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hubs, calculators, guides } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { HubHero } from '@/components/content/hub-hero';
import { HubSection } from '@/components/content/hub-section';
import { HubToolkitRow } from '@/components/content/hub-toolkit-row';
import { QuickTips } from '@/components/content/quick-tips';
import { NextSteps } from '@/components/content/next-steps';

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
          title={`Your ${hub.name} Toolkit`}
          intro="Learn the concepts, then run the numbers — paired together for each topic."
        >
          {hubGuides.length > 0 || hubCalculators.length > 0 ? (
            <div className="space-y-4">
              {(() => {
                const pairedSlugs = new Set<string>();
                const items: Array<{
                  key: string;
                  guide?: (typeof hubGuides)[number];
                  calculator?: (typeof hubCalculators)[number];
                }> = [];

                for (const guideSlug of hub.guideSlugs) {
                  const guide = hubGuides.find((g) => g.slug === guideSlug);
                  const calc = hubCalculators.find(
                    (c) => c.slug === guideSlug
                  );
                  if (guide || calc) {
                    items.push({
                      key: guideSlug,
                      guide: guide || undefined,
                      calculator: calc || undefined,
                    });
                    pairedSlugs.add(guideSlug);
                  }
                }

                for (const calc of hubCalculators) {
                  if (!pairedSlugs.has(calc.slug)) {
                    items.push({
                      key: calc.slug,
                      calculator: calc,
                    });
                  }
                }

                return items.map((item, i) => (
                  <HubToolkitRow
                    key={item.key}
                    index={i}
                    guide={
                      item.guide
                        ? {
                            slug: item.guide.slug,
                            title: item.guide.title,
                            description: item.guide.description,
                            readingTime: item.guide.metadata.readingTime,
                          }
                        : undefined
                    }
                    calculator={
                      item.calculator
                        ? {
                            slug: item.calculator.slug,
                            title: item.calculator.title,
                            description: item.calculator.description,
                            icon:
                              item.calculator.callouts?.[0]?.icon ||
                              'Calculator',
                          }
                        : undefined
                    }
                  />
                ));
              })()}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tools for this life stage are coming soon. Explore our{' '}
              <Link
                href="/calculators"
                className="underline hover:text-foreground"
              >
                calculators
              </Link>{' '}
              and{' '}
              <Link
                href="/guides"
                className="underline hover:text-foreground"
              >
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

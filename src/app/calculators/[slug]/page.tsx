import { Suspense } from 'react';
import { calculators } from '#site/content';
import { CalculatorPageClient } from '@/components/calculator/calculator-page-client';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';
import { AdSlot } from '@/components/ads/ad-slot';

export function generateStaticParams() {
  return calculators.map((calc) => ({ slug: calc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return {};
  return createMetadata({
    title: calc.title,
    description: calc.description,
    path: `/calculators/${calc.slug}`,
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) notFound();

  return (
    <>
      <WebAppSchema
        name={calc.title}
        description={calc.description}
        url={`${siteConfig.url}/calculators/${calc.slug}`}
        applicationCategory={calc.seo.applicationCategory}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 md:py-12">
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-96 animate-pulse rounded bg-muted" />
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[360px] shrink-0 h-[400px] animate-pulse rounded-lg bg-muted/50" />
              <div className="flex-1 h-[300px] animate-pulse rounded-lg bg-muted/50" />
            </div>
          </div>
        }
      >
        <CalculatorPageClient config={calc} />
      </Suspense>
      <AdSlot variant="in-content" className="mx-auto max-w-[1080px] px-4 sm:px-6 mt-8" />
    </>
  );
}

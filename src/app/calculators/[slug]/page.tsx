import { Suspense } from 'react';
import { calculators } from '#site/content';
import { CalculatorPageClient } from '@/components/calculator/calculator-page-client';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';

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
      <Suspense fallback={null}>
        <CalculatorPageClient config={calc} />
      </Suspense>
    </>
  );
}

import { Suspense } from 'react';
import Link from 'next/link';
import { calculators, cities } from '#site/content';
import { CalculatorPageClient } from '@/components/calculator/calculator-page-client';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AdSlot } from '@/components/ads/ad-slot';
import { AdBreak } from '@/components/ads/ad-break';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const calc = calculators.find((c) => c.slug === 'rent-affordability')!;

export const revalidate = 86400;

export function generateMetadata() {
  return createMetadata({
    title: calc.title,
    description: calc.description,
    path: '/calculators/rent-affordability',
  });
}

export default function RentAffordabilityPage() {
  return (
    <>
      <WebAppSchema
        name={calc.title}
        description={calc.description}
        url={`${siteConfig.url}/calculators/rent-affordability`}
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
      {calc.faqs && calc.faqs.length > 0 && (
        <>
          <FaqSchema items={calc.faqs} />
          <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion defaultValue={['faq-0']}>
              {calc.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </>
      )}
      <AdBreak />
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">City-Specific Rent Calculators</h2>
        <p className="text-muted-foreground mb-6">
          Get rent affordability calculations pre-populated with local median rent data for major metro areas.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/calculators/rent-affordability/${city.slug}`}
              className="rounded-lg border border-border p-3 text-sm hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">{city.cityName}</span>
              <span className="text-muted-foreground ml-1">{city.stateAbbreviation}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

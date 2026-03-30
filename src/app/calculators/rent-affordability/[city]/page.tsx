import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { calculators, cities, states } from '#site/content';
import { CalculatorPageClient } from '@/components/calculator/calculator-page-client';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AdBreak } from '@/components/ads/ad-break';
import { AfterTaxRentContext } from '@/components/calculator/after-tax-rent-context';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const revalidate = 86400;

const rentCalcConfig = calculators.find((c) => c.slug === 'rent-affordability')!;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};
  return createMetadata({
    title: city.editorialTitle,
    description: city.editorialDescription,
    path: `/calculators/rent-affordability/${city.slug}`,
    ogType: 'calculator',
  });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Pick 6-8 other cities to show in the "Explore Other Cities" grid */
function getRelatedCities(currentSlug: string) {
  return cities
    .filter((c) => c.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
}

export default async function CityRentPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const relatedCities = getRelatedCities(city.slug);

  // Look up state tax data for after-tax context
  const stateSlug = city.stateName.toLowerCase().replace(/\s+/g, '-');
  const stateData = states.find((s) => s.slug === stateSlug);
  const hasIncomeTax = stateData?.hasIncomeTax ?? true;
  const estimatedStateRate = stateData?.topRate ?? 5;

  const rentRows = [
    { type: 'Studio', rent: city.medianRents.studio },
    { type: '1-Bedroom', rent: city.medianRents.oneBed },
    { type: '2-Bedroom', rent: city.medianRents.twoBed },
    { type: '3-Bedroom', rent: city.medianRents.threeBed },
    { type: '4-Bedroom', rent: city.medianRents.fourBed },
  ];

  return (
    <>
      <WebAppSchema
        name={city.editorialTitle}
        description={city.editorialDescription}
        url={`${siteConfig.url}/calculators/rent-affordability/${city.slug}`}
        applicationCategory="FinanceApplication"
      />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-[1080px] px-4 sm:px-6 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/calculators" />}>Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/calculators/rent-affordability" />}>
                Rent Affordability
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{city.cityName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Page Header */}
      <header className="mx-auto max-w-[1080px] px-4 sm:px-6 pt-4 pb-2">
        <h1 className="text-2xl font-semibold">{city.editorialTitle}</h1>
        <p className="mt-1 text-muted-foreground">{city.editorialDescription}</p>
      </header>

      {/* Calculator */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 md:py-12">
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[360px] shrink-0 h-[400px] animate-pulse rounded-lg bg-muted/50" />
              <div className="flex-1 h-[300px] animate-pulse rounded-lg bg-muted/50" />
            </div>
          </div>
        }
      >
        <CalculatorPageClient config={rentCalcConfig} />
      </Suspense>

      {/* After-Tax Affordability Context */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-6">
        <Suspense fallback={null}>
          <AfterTaxRentContext
            stateAbbreviation={city.stateAbbreviation}
            stateName={city.stateName}
            estimatedStateRate={estimatedStateRate}
            hasIncomeTax={hasIncomeTax}
            median1BR={city.medianRents.oneBed}
            cityName={city.cityName}
          />
        </Suspense>
      </section>

      {/* Paycheck CTA */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 pb-2">
        <Link
          href={`/calculators/paycheck?state=${stateSlug}`}
          className="inline-flex items-center gap-2 text-sm text-[oklch(0.55_0.12_175)] hover:text-[oklch(0.45_0.12_175)] underline underline-offset-2 transition-colors"
        >
          See your full {city.stateName} paycheck breakdown →
        </Link>
      </section>

      <AdBreak className="mx-auto max-w-[1080px] px-4 sm:px-6" />

      {/* Median Rent Table */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">
          Median Rents in {city.cityName}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on {city.dataSource} data. Last verified {city.lastVerified}.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apartment Type</TableHead>
              <TableHead className="text-right">Median Monthly Rent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentRows.map((row) => (
              <TableRow key={row.type}>
                <TableCell className="font-medium">{row.type}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.rent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Editorial Content */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">
          Renting in {city.cityName}
        </h2>
        <div className="prose prose-slate max-w-none">
          {city.editorialContent.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4 text-base leading-relaxed text-foreground">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </section>

      {/* Cost Context */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">
          Local Affordability Context
        </h2>
        <div className="prose prose-slate max-w-none">
          {city.costContext.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4 text-base leading-relaxed text-foreground">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </section>

      <AdBreak className="mx-auto max-w-[1080px] px-4 sm:px-6" />

      {/* FAQs */}
      {city.faqs.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion defaultValue={['faq-0']}>
            {city.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <FaqSchema items={city.faqs} />
        </section>
      )}

      {/* Explore Other Cities */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">Explore Other Cities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {relatedCities.map((relCity) => (
            <Link
              key={relCity.slug}
              href={`/calculators/rent-affordability/${relCity.slug}`}
              className="rounded-lg border border-border p-3 text-sm hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">{relCity.cityName}</span>
              <span className="text-muted-foreground ml-1">{relCity.stateAbbreviation}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/calculators/rent-affordability"
            className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
          >
            View all 25 city calculators
          </Link>
        </div>
      </section>

      {/* Financial Disclaimer */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          For educational purposes only -- not financial or tax advice. Rent data
          shown is based on {city.dataSource} and may not reflect current market
          conditions. Actual rents vary by neighborhood, building age, amenities,
          and market conditions. Consult local listings for current pricing.
        </p>
      </section>
    </>
  );
}

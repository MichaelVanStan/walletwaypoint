import Link from 'next/link';
import { states } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { MapPin } from 'lucide-react';

export const metadata = createMetadata({
  title: 'State Tax Guides for All 50 States + DC | 2026',
  description:
    'Explore income tax brackets, deductions, and filing tips for every US state. Compare tax structures, rates, and what makes each state unique.',
  path: '/guides/state-taxes',
});

function formatRate(rate: number): string {
  return rate % 1 === 0 ? `${rate}%` : `${rate.toFixed(2)}%`;
}

export default function StateTaxesIndexPage() {
  const noTaxStates = states.filter((s) => !s.hasIncomeTax);
  const flatStates = states.filter((s) => s.taxType === 'flat');
  const graduatedStates = states.filter((s) => s.taxType === 'graduated');

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
          State Tax Guides
        </h1>
        <p className="mx-auto mt-3 max-w-[540px] text-base text-muted-foreground">
          Income tax brackets, deductions, and filing tips for all 50 states and
          DC. Find your state to see how much you'll owe.
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
        <span>{noTaxStates.length} no-tax states</span>
        <span className="text-border">|</span>
        <span>{flatStates.length} flat-rate states</span>
        <span className="text-border">|</span>
        <span>{graduatedStates.length} graduated-rate states</span>
      </div>

      <hr className="mx-auto my-10 w-12 border-t-2 border-muted" />

      {/* No Income Tax */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          No State Income Tax
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {noTaxStates.map((state) => (
            <Link
              key={state.slug}
              href={`/guides/state-taxes/${state.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <MapPin className="size-4 shrink-0 text-green-600 dark:text-green-400" />
              <div className="min-w-0">
                <p className="font-medium text-foreground">{state.name}</p>
                <p className="text-xs text-green-600 dark:text-green-400">No income tax</p>
              </div>
              <span className="ml-auto text-sm font-semibold text-muted-foreground">{state.abbreviation}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flat Rate */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Flat-Rate States
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {flatStates
            .sort((a, b) => a.topRate - b.topRate)
            .map((state) => (
              <Link
                key={state.slug}
                href={`/guides/state-taxes/${state.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{state.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Flat {formatRate(state.topRate)}
                  </p>
                </div>
                <span className="ml-auto text-sm font-semibold text-muted-foreground">{state.abbreviation}</span>
              </Link>
            ))}
        </div>
      </section>

      {/* Graduated */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Graduated-Rate States
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {graduatedStates
            .sort((a, b) => b.topRate - a.topRate)
            .map((state) => (
              <Link
                key={state.slug}
                href={`/guides/state-taxes/${state.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <MapPin className="size-4 shrink-0 text-orange-500" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{state.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {state.numberOfBrackets} brackets, up to {formatRate(state.topRate)}
                  </p>
                </div>
                <span className="ml-auto text-sm font-semibold text-muted-foreground">{state.abbreviation}</span>
              </Link>
            ))}
        </div>
      </section>

      <section className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          Tax data based on {new Date().getFullYear()} rates from the Tax Foundation and state revenue departments.
          Rates may change. Consult a tax professional for your specific situation.
        </p>
      </section>
    </div>
  );
}

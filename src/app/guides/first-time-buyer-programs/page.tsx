import Link from 'next/link';
import { homebuyerPrograms } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { Building2 } from 'lucide-react';

export const metadata = createMetadata({
  title: 'First-Time Homebuyer Programs by State | 2026 Guide',
  description:
    'Explore down payment assistance, grants, and first-time buyer programs in all 50 states and DC. Find programs you qualify for.',
  path: '/guides/first-time-buyer-programs',
});

export default function HomebuyerProgramsIndexPage() {
  // Group by region for easier browsing
  const sorted = [...homebuyerPrograms].sort((a, b) =>
    a.stateName.localeCompare(b.stateName)
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
          First-Time Homebuyer Programs
        </h1>
        <p className="mx-auto mt-3 max-w-[540px] text-base text-muted-foreground">
          Every state offers programs to help first-time buyers with down
          payments, closing costs, and favorable loan terms. Find yours.
        </p>
      </div>

      <div className="mt-4 flex justify-center text-sm text-muted-foreground">
        <span>{homebuyerPrograms.length} state guides with local HFA programs + federal options</span>
      </div>

      <hr className="mx-auto my-10 w-12 border-t-2 border-muted" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sorted.map((program) => {
          const programCount = program.programs?.length ?? 0;
          return (
            <Link
              key={program.slug}
              href={`/guides/first-time-buyer-programs/${program.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <Building2 className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="font-medium text-foreground">{program.stateName}</p>
                <p className="text-xs text-muted-foreground">
                  {programCount} program{programCount !== 1 ? 's' : ''} available
                </p>
              </div>
              <span className="ml-auto text-sm font-semibold text-muted-foreground">
                {program.stateAbbreviation}
              </span>
            </Link>
          );
        })}
      </div>

      <section className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-3">Federal Programs Available Everywhere</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These federal programs are available in all states in addition to state-specific programs:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">FHA Loans</p>
            <p className="text-xs text-muted-foreground">3.5% down, lower credit requirements</p>
          </div>
          <div>
            <p className="text-sm font-medium">VA Loans</p>
            <p className="text-xs text-muted-foreground">0% down for veterans and service members</p>
          </div>
          <div>
            <p className="text-sm font-medium">USDA Loans</p>
            <p className="text-xs text-muted-foreground">0% down in eligible rural areas</p>
          </div>
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          Program details are based on publicly available information and may change.
          Verify eligibility and current terms directly with the administering agency.
          This is not financial advice.
        </p>
      </section>
    </div>
  );
}

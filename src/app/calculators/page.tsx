import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = createMetadata({
  title: 'Financial Calculators',
  description:
    'Interactive tools to help you plan mortgages, savings, loans, and more. We are building 10 calculators that update in real time -- no spreadsheets needed.',
  path: '/calculators',
});

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <Badge variant="secondary" className="mb-4">
        Coming Soon
      </Badge>
      <h1 className="text-2xl font-semibold text-foreground md:text-[24px]">
        Financial Calculators
      </h1>
      <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
        Interactive tools to help you plan mortgages, savings, loans, and more.
        We are building 10 calculators that update in real time -- no
        spreadsheets needed.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" render={<Link href="/" />}>
          Back to Home
        </Button>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Learn more about how we build our tools:{' '}
          <Link
            href="/about"
            className="underline hover:text-foreground"
          >
            About Us
          </Link>
          {' | '}
          <Link
            href="/editorial-standards"
            className="underline hover:text-foreground"
          >
            Editorial Standards
          </Link>
        </p>
      </div>
    </div>
  );
}

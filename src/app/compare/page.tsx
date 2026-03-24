import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = createMetadata({
  title: 'Product Comparisons',
  description:
    'Side-by-side comparisons of credit cards, loans, and financial products with transparent ranking methodology.',
  path: '/compare',
});

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <Badge variant="secondary" className="mb-4">
        Coming Soon
      </Badge>
      <h1 className="text-2xl font-semibold text-foreground md:text-[24px]">
        Product Comparisons
      </h1>
      <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
        Side-by-side comparisons of credit cards, loans, and financial products
        with transparent ranking methodology. Every comparison explains exactly
        how we evaluate and rank products.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button nativeButton={false} variant="outline" render={<Link href="/" />}>
          Back to Home
        </Button>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Learn more about our methodology:{' '}
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

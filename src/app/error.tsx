'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
        We hit an unexpected error. Try refreshing the page. If the problem
        continues,{' '}
        <Link
          href="/about#contact"
          className="underline hover:text-foreground"
        >
          let us know
        </Link>
        .
      </p>
      <div className="mt-8">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}

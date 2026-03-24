import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
        The page you are looking for does not exist or has been moved. Head back
        to the homepage or try one of the links below.
      </p>
      <div className="mt-8">
        <Button render={<Link href="/" />}>Go to Homepage</Button>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          You might be looking for:{' '}
          <Link
            href="/about"
            className="underline hover:text-foreground"
          >
            About
          </Link>
          {' | '}
          <Link
            href="/calculators"
            className="underline hover:text-foreground"
          >
            Calculators
          </Link>
          {' | '}
          <Link
            href="/guides"
            className="underline hover:text-foreground"
          >
            Guides
          </Link>
        </p>
      </div>
    </div>
  );
}

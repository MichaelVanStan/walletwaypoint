import { Info } from 'lucide-react';
import Link from 'next/link';

export function DisclaimerBanner() {
  return (
    <div
      role="note"
      aria-label="Educational content disclaimer"
      className="border-b border-border bg-muted/50"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <Info className="h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          For educational purposes only — not financial advice.{' '}
          <Link
            href="/editorial-standards"
            className="underline hover:text-foreground"
          >
            Learn about our editorial process
          </Link>
        </p>
      </div>
    </div>
  );
}

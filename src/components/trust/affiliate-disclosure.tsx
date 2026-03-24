import Link from 'next/link';

export function AffiliateDisclosure() {
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
    >
      <strong className="text-foreground">Disclosure:</strong> Some links on
      this page are affiliate links. We may earn a commission if you make a
      purchase, at no extra cost to you. This does not influence our editorial
      content.{' '}
      <Link
        href="/editorial-standards"
        className="underline hover:text-foreground"
      >
        Read our editorial standards
      </Link>
    </aside>
  );
}

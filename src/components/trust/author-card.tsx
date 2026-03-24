import Link from 'next/link';

interface AuthorCardProps {
  name: string;
  role: string;
  slug: string;
  methodologyUrl?: string;
}

export function AuthorCard({
  name,
  role,
  slug,
  methodologyUrl = '/editorial-standards',
}: AuthorCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        {initials}
      </div>
      <div>
        <Link
          href={`/authors/${slug}`}
          className="text-sm font-medium hover:underline"
        >
          {name}
        </Link>
        <p className="text-xs text-muted-foreground">{role}</p>
        <Link
          href={methodologyUrl}
          className="text-xs text-accent hover:underline"
        >
          Our editorial process
        </Link>
      </div>
    </div>
  );
}

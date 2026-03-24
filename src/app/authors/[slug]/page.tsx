import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { ArticleSchema } from '@/components/seo/article-schema';

const authors: Record<
  string,
  { name: string; role: string; initials: string; bio: string[] }
> = {
  'editorial-team': {
    name: 'WalletWaypoint Editorial Team',
    role: 'Editorial Team',
    initials: 'WE',
    bio: [
      'The WalletWaypoint editorial team researches, writes, and reviews all content on this site. We are committed to accuracy, clarity, and practical value in every calculator and guide we publish.',
      'Our process follows published editorial standards that you can review at any time. We start with authoritative data sources, write in plain language, and review every piece of content for factual accuracy before publication.',
      'We focus on helping people navigate real financial decisions at every stage of life -- from student loans and renting to homebuying, freelance taxes, and retirement planning.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) return {};

  return createMetadata({
    title: author.name,
    description: `Meet the ${author.name}. Learn about our background, expertise, and commitment to accurate financial content.`,
    path: `/authors/${slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = authors[slug];

  if (!author) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <ArticleSchema
        title={author.name}
        description={`Meet the ${author.name}. Learn about our background, expertise, and commitment to accurate financial content.`}
        url={`${siteConfig.url}/authors/${slug}`}
        datePublished="2026-03-24"
        dateModified="2026-03-24"
        authorName={author.name}
        authorUrl={`${siteConfig.url}/authors/${slug}`}
      />

      {/* Author Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-medium text-primary-foreground">
          {author.initials}
        </div>
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">{author.name}</h1>
          <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
      </div>

      {/* Bio */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">About</h2>
      {author.bio.map((paragraph, index) => (
        <p key={index} className="mb-4 text-base leading-[1.6]">
          {paragraph}
        </p>
      ))}
      <p className="mb-4 text-base leading-[1.6]">
        Read more about our methodology and process on the{' '}
        <Link
          href="/editorial-standards"
          className="text-accent underline hover:text-foreground"
        >
          Editorial Standards
        </Link>{' '}
        page.
      </p>

      {/* Authored Pages */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        Written by This Author
      </h2>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <Link
            href="/about"
            className="text-accent underline hover:text-foreground"
          >
            About WalletWaypoint
          </Link>
        </li>
        <li>
          <Link
            href="/editorial-standards"
            className="text-accent underline hover:text-foreground"
          >
            Editorial Standards
          </Link>
        </li>
      </ul>
      <p className="text-sm text-muted-foreground">
        More content coming soon as we build out calculators and guides.
      </p>
    </article>
  );
}

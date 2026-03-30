import { listicles } from '#site/content';
import { MDXContent } from '@/components/content/mdx-content';
import { ArticleSchema } from '@/components/seo/article-schema';
import { AffiliateDisclosure } from '@/components/trust/affiliate-disclosure';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return listicles.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listicle = listicles.find((l) => l.slug === slug);
  if (!listicle) return {};
  return createMetadata({
    title: listicle.title,
    description: listicle.description,
    path: `/compare/best/${listicle.slug}`,
  });
}

export default async function ListiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listicle = listicles.find((l) => l.slug === slug);
  if (!listicle) notFound();

  const formattedDate = new Date(listicle.lastUpdated).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  return (
    <>
      <ArticleSchema
        title={listicle.title}
        description={listicle.description}
        url={`${siteConfig.url}/compare/best/${listicle.slug}`}
        datePublished={listicle.lastUpdated}
        dateModified={listicle.lastUpdated}
        authorName="WalletWaypoint Editorial Team"
        authorUrl={`${siteConfig.url}/authors/editorial-team`}
      />

      <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6 md:py-12">
        <h1 className="text-2xl font-semibold">{listicle.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Written by WalletWaypoint Editorial Team</span>
          <span aria-hidden="true">|</span>
          <Badge variant="secondary">
            {listicle.metadata.readingTime} min read
          </Badge>
          <span aria-hidden="true">|</span>
          <span>Updated {formattedDate}</span>
        </div>

        <div className="mt-6">
          <AffiliateDisclosure />
        </div>

        <article className="mt-8">
          <MDXContent code={listicle.body} />
        </article>
      </div>
    </>
  );
}

import { guides, calculators } from '#site/content';
import { MDXContent } from '@/components/content/mdx-content';
import { ArticleSchema } from '@/components/seo/article-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/content/table-of-contents';
import { GuideCtaBanner } from '@/components/content/guide-cta-banner';
import { RelatedContent } from '@/components/content/related-content';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from 'next/link';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const pairedCalculator = calculators.find(
    (c) => c.slug === guide.calculator
  );
  const relatedGuides = guides.filter((g) =>
    guide.relatedGuides?.includes(g.slug)
  );

  const formattedDate = new Date(guide.lastUpdated).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  return (
    <>
      <ArticleSchema
        title={guide.title}
        description={guide.description}
        url={`${siteConfig.url}/guides/${guide.slug}`}
        datePublished={guide.lastUpdated}
        dateModified={guide.lastUpdated}
        authorName="WalletWaypoint Editorial Team"
        authorUrl={`${siteConfig.url}/authors/editorial-team`}
      />
      {guide.faqs.length > 0 && <FaqSchema items={guide.faqs} />}

      {/* Guide header */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/guides"
                className="hover:text-foreground transition-colors"
              >
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium truncate">
              {guide.title}
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-semibold">{guide.title}</h1>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
          <span>Written by WalletWaypoint Editorial Team</span>
          <span aria-hidden="true">|</span>
          <Badge variant="secondary">{guide.metadata.readingTime} min read</Badge>
          <span aria-hidden="true">|</span>
          <span>Updated {formattedDate}</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
          {/* Left: Article column */}
          <div>
            {/* Mobile-only CTA banner */}
            <div className="lg:hidden mb-6">
              {pairedCalculator && (
                <GuideCtaBanner
                  calculatorSlug={guide.calculator}
                  calculatorTitle={pairedCalculator.title}
                />
              )}
            </div>

            {/* Mobile-only TOC */}
            <div className="lg:hidden mb-6">
              <TableOfContents />
            </div>

            <article className="max-w-[720px]">
              <MDXContent code={guide.body} />
            </article>

            {/* FAQ Section */}
            {guide.faqs.length > 0 && (
              <section className="mt-12 max-w-[720px]">
                <h2 className="text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>
                <Accordion defaultValue={['faq-0']}>
                  {guide.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section className="mt-12 max-w-[720px]">
                <RelatedContent guides={relatedGuides} />
              </section>
            )}
          </div>

          {/* Right: Sidebar (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {pairedCalculator && (
                <GuideCtaBanner
                  calculatorSlug={guide.calculator}
                  calculatorTitle={pairedCalculator.title}
                />
              )}
              <TableOfContents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

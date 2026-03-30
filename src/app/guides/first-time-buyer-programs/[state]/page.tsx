import Link from 'next/link';
import { notFound } from 'next/navigation';
import { homebuyerPrograms } from '#site/content';
import { FaqSchema } from '@/components/seo/faq-schema';
import { ArticleSchema } from '@/components/seo/article-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AdBreak } from '@/components/ads/ad-break';
import { AdSlot } from '@/components/ads/ad-slot';
import { TableOfContents } from '@/components/content/table-of-contents';
import {
  ExternalLink,
  Calculator,
  Building2,
  BadgeCheck,
  DollarSign,
  Users,
  MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const revalidate = 86400;

export function generateStaticParams() {
  return homebuyerPrograms.map((p) => ({ state: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const programData = homebuyerPrograms.find((p) => p.slug === state);
  if (!programData) return {};

  return createMetadata({
    title: `${programData.stateName} First-Time Homebuyer Programs 2026 | WalletWaypoint`,
    description: programData.editorialDescription,
    path: `/guides/first-time-buyer-programs/${programData.slug}`,
  });
}

function renderEditorialContent(content: string) {
  const paragraphs = content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-base leading-relaxed text-foreground">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

interface Program {
  name: string;
  adminAgency: string;
  assistanceType: string;
  amount: string;
  incomeLimits: string;
  eligibleAreas: string;
  firstTimeBuyerRequired: boolean;
  url: string;
}

function ProgramCard({ program }: { program: Program }) {
  const isFederal =
    program.adminAgency.includes('Federal Housing') ||
    program.adminAgency.includes('Veterans Affairs') ||
    program.adminAgency.includes('Agriculture');

  return (
    <div className="rounded-lg border border-border p-5 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {program.name}
        </h3>
        <Badge
          variant="secondary"
          className="shrink-0 text-xs"
        >
          {program.assistanceType}
        </Badge>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <Building2 className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{program.adminAgency}</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <DollarSign className="size-4 text-accent shrink-0 mt-0.5" />
          <span className="text-foreground font-semibold">{program.amount}</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Users className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{program.incomeLimits}</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{program.eligibleAreas}</span>
        </div>

        {program.firstTimeBuyerRequired && (
          <div className="flex items-start gap-2 text-sm">
            <BadgeCheck className="size-4 text-accent shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              First-time buyer required
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <a
          href={program.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-semibold"
        >
          Learn more
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export default async function HomebuyerProgramGuidePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const programData = homebuyerPrograms.find((p) => p.slug === state);
  if (!programData) notFound();

  // Split programs into state-specific and federal
  const statePrograms = programData.programs.filter(
    (p) =>
      !p.adminAgency.includes('Federal Housing') &&
      !p.adminAgency.includes('Veterans Affairs') &&
      !p.adminAgency.includes('Agriculture') &&
      !p.adminAgency.includes('HUD')
  );
  const federalPrograms = programData.programs.filter(
    (p) =>
      p.adminAgency.includes('Federal Housing') ||
      p.adminAgency.includes('Veterans Affairs') ||
      p.adminAgency.includes('Agriculture') ||
      p.adminAgency.includes('HUD')
  );

  return (
    <>
      <ArticleSchema
        title={programData.editorialTitle}
        description={programData.editorialDescription}
        url={`${siteConfig.url}/guides/first-time-buyer-programs/${programData.slug}`}
        datePublished={programData.lastVerified}
        dateModified={programData.lastVerified}
        authorName="WalletWaypoint Editorial Team"
        authorUrl={`${siteConfig.url}/authors/editorial-team`}
      />
      {programData.faqs.length > 0 && <FaqSchema items={programData.faqs} />}

      {/* Guide header */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
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
            <li>
              <Link
                href="/guides/first-time-buyer-programs"
                className="hover:text-foreground transition-colors"
              >
                First-Time Buyer Programs
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-semibold">
              {programData.stateName}
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-semibold">
          {programData.editorialTitle}
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          {/* Left: Article column */}
          <div>
            {/* Mobile-only TOC */}
            <div className="lg:hidden mb-6">
              <TableOfContents />
            </div>

            <article className="max-w-[720px]">
              {/* Introduction */}
              <section>
                <h2 id="overview" className="text-xl font-semibold mb-4">
                  Overview
                </h2>
                {renderEditorialContent(
                  programData.editorialContent
                    .split('\n\n')
                    .slice(0, 2)
                    .join('\n\n')
                )}
              </section>

              {/* State Programs */}
              {statePrograms.length > 0 && (
                <section className="mt-8">
                  <h2 id="state-programs" className="text-xl font-semibold mb-4">
                    State Programs
                  </h2>
                  <div className="space-y-4">
                    {statePrograms.map((program, i) => (
                      <ProgramCard key={i} program={program} />
                    ))}
                  </div>
                </section>
              )}

              <AdBreak className="max-w-[720px]" />

              {/* Federal Programs */}
              {federalPrograms.length > 0 && (
                <section className="mt-8">
                  <h2
                    id="federal-programs"
                    className="text-xl font-semibold mb-4"
                  >
                    Federal Programs Available in {programData.stateName}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    These nationwide programs can be combined with{' '}
                    {programData.stateName} state assistance for maximum
                    benefit.
                  </p>
                  <div className="space-y-4">
                    {federalPrograms.map((program, i) => (
                      <ProgramCard key={i} program={program} />
                    ))}
                  </div>
                </section>
              )}

              {/* Remaining Editorial Content */}
              <section className="mt-8">
                <h2
                  id="tips-for-buyers"
                  className="text-xl font-semibold mb-4"
                >
                  Tips for First-Time Buyers in {programData.stateName}
                </h2>
                {renderEditorialContent(
                  programData.editorialContent
                    .split('\n\n')
                    .slice(2)
                    .join('\n\n')
                )}
              </section>

              <AdBreak className="max-w-[720px]" />

              {/* FAQ Section */}
              {programData.faqs && programData.faqs.length > 0 && (
                <section className="mt-8">
                  <h2 id="faq" className="text-xl font-semibold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <Accordion defaultValue={['faq-0']}>
                    {programData.faqs.map(
                      (
                        faq: { question: string; answer: string },
                        i: number
                      ) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </section>
              )}

              {/* Related Calculators */}
              <section className="mt-8">
                <h2
                  id="related-calculators"
                  className="text-xl font-semibold mb-4"
                >
                  Related Calculators
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/calculators/home-affordability"
                    className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Calculator className="size-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Home Affordability Calculator
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        See how much home you can afford
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/calculators/mortgage"
                    className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Calculator className="size-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Mortgage Calculator
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Calculate your monthly mortgage payment
                      </p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Financial disclaimer */}
              <section className="mt-8 pb-8">
                <p className="text-xs text-muted-foreground">
                  For educational purposes only -- not financial or tax advice.
                  Program details, eligibility requirements, and benefit amounts
                  are subject to change. Verify all information directly with
                  the administering agency before applying. Last verified:{' '}
                  {new Date(programData.lastVerified).toLocaleDateString(
                    'en-US',
                    { month: 'long', day: 'numeric', year: 'numeric' }
                  )}
                  .
                </p>
              </section>
            </article>
          </div>

          {/* Right: Sidebar (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents />
              <AdSlot variant="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

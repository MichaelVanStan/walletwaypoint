import Link from 'next/link';
import { notFound } from 'next/navigation';
import { states } from '#site/content';
import { BracketTable } from '@/components/calculator/bracket-table';
import { FaqSchema } from '@/components/seo/faq-schema';
import { ArticleSchema } from '@/components/seo/article-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AdBreak } from '@/components/ads/ad-break';
import { AdSlot } from '@/components/ads/ad-slot';
import { TableOfContents } from '@/components/content/table-of-contents';
import { formatCurrency, formatPercent } from '@/lib/calculators/formatters';
import { Lightbulb, ExternalLink, Calculator } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const revalidate = 86400;

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateData = states.find((s) => s.slug === state);
  if (!stateData) return {};

  const descriptionParts: string[] = [];
  if (stateData.taxType === 'none') {
    descriptionParts.push(`${stateData.name} has no state income tax.`);
    if (stateData.propertyTaxRate) {
      descriptionParts.push(
        `Property tax rate averages ${formatPercent(stateData.propertyTaxRate)}.`
      );
    }
    descriptionParts.push('See filing tips and tax-free state details.');
  } else if (stateData.taxType === 'flat' && stateData.flatRate) {
    descriptionParts.push(
      `${stateData.name} has a flat income tax rate of ${formatPercent(stateData.flatRate)}.`
    );
    descriptionParts.push(
      'See the full rate table, deductions, and filing tips.'
    );
  } else {
    descriptionParts.push(
      `${stateData.name} has ${stateData.numberOfBrackets} income tax brackets with rates from ${formatPercent(stateData.topRate === 0 ? 0 : (stateData.brackets?.single?.[0]?.rate ?? 0))} to ${formatPercent(stateData.topRate)}.`
    );
    descriptionParts.push(
      'See the full bracket table, deductions, and filing tips.'
    );
  }

  return createMetadata({
    title: `${stateData.name} Income Tax Rates & Brackets 2026 | WalletWaypoint`,
    description: descriptionParts.join(' '),
    path: `/guides/state-taxes/${stateData.slug}`,
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

function DeductionsTable({
  standardDeductions,
  personalExemptions,
  stateName,
}: {
  standardDeductions?: { single: number; married: number; head: number };
  personalExemptions?: {
    single: number;
    married: number;
    dependent: number;
  };
  stateName: string;
}) {
  if (!standardDeductions && !personalExemptions) {
    return (
      <p className="text-sm text-muted-foreground">
        {stateName} does not offer standard deductions or personal exemptions at
        the state level. Consult the state revenue authority for itemized
        deduction rules.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-xs font-semibold px-2 py-2">
              Filing Status
            </TableHead>
            {standardDeductions && (
              <TableHead className="text-xs font-semibold px-2 py-2 text-right">
                Standard Deduction
              </TableHead>
            )}
            {personalExemptions && (
              <TableHead className="text-xs font-semibold px-2 py-2 text-right">
                Personal Exemption
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-sm px-2 py-2">Single</TableCell>
            {standardDeductions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {standardDeductions.single > 0
                  ? formatCurrency(standardDeductions.single)
                  : 'N/A'}
              </TableCell>
            )}
            {personalExemptions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {personalExemptions.single > 0
                  ? formatCurrency(personalExemptions.single)
                  : 'N/A'}
              </TableCell>
            )}
          </TableRow>
          <TableRow className="bg-muted/30">
            <TableCell className="text-sm px-2 py-2">
              Married Filing Jointly
            </TableCell>
            {standardDeductions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {standardDeductions.married > 0
                  ? formatCurrency(standardDeductions.married)
                  : 'N/A'}
              </TableCell>
            )}
            {personalExemptions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {personalExemptions.married > 0
                  ? formatCurrency(personalExemptions.married)
                  : 'N/A'}
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="text-sm px-2 py-2">
              Head of Household
            </TableCell>
            {standardDeductions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {standardDeductions.head > 0
                  ? formatCurrency(standardDeductions.head)
                  : 'N/A'}
              </TableCell>
            )}
            {personalExemptions && (
              <TableCell className="text-sm px-2 py-2 text-right">
                {/* Head of household uses same as single for exemptions if no separate value */}
                {personalExemptions.single > 0
                  ? formatCurrency(personalExemptions.single)
                  : 'N/A'}
              </TableCell>
            )}
          </TableRow>
          {personalExemptions && personalExemptions.dependent > 0 && (
            <TableRow className="bg-muted/30">
              <TableCell className="text-sm px-2 py-2">
                Per Dependent
              </TableCell>
              {standardDeductions && (
                <TableCell className="text-sm px-2 py-2 text-right">
                  --
                </TableCell>
              )}
              <TableCell className="text-sm px-2 py-2 text-right">
                {formatCurrency(personalExemptions.dependent)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default async function StateTaxGuidePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateData = states.find((s) => s.slug === state);
  if (!stateData) notFound();

  const isNoTaxState = !stateData.hasIncomeTax;

  return (
    <>
      <ArticleSchema
        title={`${stateData.name} Income Tax Rates and Brackets 2026`}
        description={
          stateData.editorialDescription
        }
        url={`${siteConfig.url}/guides/state-taxes/${stateData.slug}`}
        datePublished={stateData.lastVerified}
        dateModified={stateData.lastVerified}
        authorName="WalletWaypoint Editorial Team"
        authorUrl={`${siteConfig.url}/authors/editorial-team`}
      />
      {stateData.faqs.length > 0 && <FaqSchema items={stateData.faqs} />}

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
                href="/guides/state-taxes"
                className="hover:text-foreground transition-colors"
              >
                State Taxes
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-semibold">{stateData.name}</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-semibold">
          {stateData.name} Income Tax Rates and Brackets 2026
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
              {/* Overview */}
              <section>
                <h2 id="overview" className="text-xl font-semibold mb-4">
                  Overview
                </h2>
                {renderEditorialContent(
                  stateData.editorialContent.split('\n\n').slice(0, 2).join('\n\n')
                )}
              </section>

              {/* Tax Brackets or No-Tax State Content */}
              {isNoTaxState ? (
                <section className="mt-8">
                  <h2
                    id="tax-characteristics"
                    className="text-xl font-semibold mb-4"
                  >
                    {stateData.name} Tax Characteristics
                  </h2>
                  <BracketTable
                    brackets={stateData.brackets}
                    stateName={stateData.name}
                    taxType={stateData.taxType as 'graduated' | 'flat' | 'none'}
                    flatRate={stateData.flatRate}
                    hasIncomeTax={stateData.hasIncomeTax}
                  />
                  {(stateData.propertyTaxRate !== undefined ||
                    stateData.salesTaxRate !== undefined) && (
                    <div className="mt-6 rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="text-xs font-semibold px-2 py-2">
                              Tax Type
                            </TableHead>
                            <TableHead className="text-xs font-semibold px-2 py-2 text-right">
                              Rate
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stateData.propertyTaxRate !== undefined && (
                            <TableRow>
                              <TableCell className="text-sm px-2 py-2">
                                Average Property Tax Rate
                              </TableCell>
                              <TableCell className="text-sm px-2 py-2 text-right">
                                {formatPercent(stateData.propertyTaxRate)}
                              </TableCell>
                            </TableRow>
                          )}
                          {stateData.salesTaxRate !== undefined && (
                            <TableRow className="bg-muted/30">
                              <TableCell className="text-sm px-2 py-2">
                                Average Combined Sales Tax Rate
                              </TableCell>
                              <TableCell className="text-sm px-2 py-2 text-right">
                                {formatPercent(stateData.salesTaxRate)}
                              </TableCell>
                            </TableRow>
                          )}
                          {stateData.costOfLivingIndex !== undefined && (
                            <TableRow>
                              <TableCell className="text-sm px-2 py-2">
                                Cost of Living Index
                              </TableCell>
                              <TableCell className="text-sm px-2 py-2 text-right">
                                {stateData.costOfLivingIndex} (US avg = 100)
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </section>
              ) : (
                <section className="mt-8">
                  <h2
                    id="tax-brackets"
                    className="text-xl font-semibold mb-4"
                  >
                    {stateData.name} Tax Brackets 2026
                  </h2>
                  <BracketTable
                    brackets={stateData.brackets}
                    stateName={stateData.name}
                    taxType={stateData.taxType as 'graduated' | 'flat' | 'none'}
                    flatRate={stateData.flatRate}
                    hasIncomeTax={stateData.hasIncomeTax}
                  />
                </section>
              )}

              <AdBreak className="max-w-[720px]" />

              {/* Standard Deductions and Exemptions */}
              {!isNoTaxState && (
                <section className="mt-8">
                  <h2
                    id="deductions-exemptions"
                    className="text-xl font-semibold mb-4"
                  >
                    Standard Deductions and Exemptions
                  </h2>
                  <DeductionsTable
                    standardDeductions={stateData.standardDeductions}
                    personalExemptions={stateData.personalExemptions}
                    stateName={stateData.name}
                  />
                </section>
              )}

              {/* Full Editorial Content */}
              <section className="mt-8">
                <h2
                  id="understanding-taxes"
                  className="text-xl font-semibold mb-4"
                >
                  Understanding {stateData.name} Taxes
                </h2>
                {renderEditorialContent(
                  stateData.editorialContent.split('\n\n').slice(2).join('\n\n')
                )}
              </section>

              {/* Filing Tips */}
              {stateData.tips && stateData.tips.length > 0 && (
                <section className="mt-8">
                  <h2 id="filing-tips" className="text-xl font-semibold mb-4">
                    Filing Tips for {stateData.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stateData.tips.map((tip: string, i: number) => (
                      <div
                        key={i}
                        className="rounded-lg bg-muted/50 p-4 flex items-start gap-3"
                      >
                        <Lightbulb className="size-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* State Revenue Authority */}
              <section className="mt-8">
                <h2
                  id="revenue-authority"
                  className="text-xl font-semibold mb-4"
                >
                  State Revenue Authority
                </h2>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-base text-foreground">
                    For the most current tax information, visit the official{' '}
                    {stateData.name} tax authority:
                  </p>
                  <a
                    href={stateData.revenueAuthorityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-accent hover:underline font-semibold"
                  >
                    {stateData.revenueAuthorityUrl.replace(
                      /^https?:\/\/(www\.)?/,
                      ''
                    )}
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </section>

              <AdBreak className="max-w-[720px]" />

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
                    href={`/calculators/paycheck/${stateData.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Calculator className="size-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {stateData.name} Paycheck Calculator
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Calculate your take-home pay
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/calculators/tax"
                    className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Calculator className="size-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Federal Tax Estimator
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Estimate your federal tax liability
                      </p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* FAQ Section */}
              {stateData.faqs && stateData.faqs.length > 0 && (
                <section className="mt-8">
                  <h2 id="faq" className="text-xl font-semibold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <Accordion defaultValue={['faq-0']}>
                    {stateData.faqs.map(
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

              <AdBreak className="max-w-[720px]" />

              {/* Financial disclaimer */}
              <section className="mt-8 pb-8">
                <p className="text-xs text-muted-foreground">
                  For educational purposes only -- not financial or tax advice.
                  Tax rates shown are based on 2026 data and may not reflect
                  recent changes. Consult a tax professional for your specific
                  situation.
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

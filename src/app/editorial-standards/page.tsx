import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AuthorCard } from '@/components/trust/author-card';
import { ArticleSchema } from '@/components/seo/article-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const metadata = createMetadata({
  title: 'Editorial Standards -- How We Create Content',
  description:
    'Learn how WalletWaypoint researches, writes, and reviews financial content. Our methodology, data sources, and editorial independence policy.',
  path: '/editorial-standards',
});

const faqItems = [
  {
    question: 'Who writes WalletWaypoint content?',
    answer:
      'All content is created by the WalletWaypoint editorial team. We research, write, and review every calculator, guide, and comparison page in-house.',
  },
  {
    question: 'How do you ensure calculator accuracy?',
    answer:
      'Our calculators use formulas based on authoritative sources such as IRS publications, Federal Reserve data, and standard financial mathematics. We test edge cases and verify results against known examples before publishing.',
  },
  {
    question: 'Do affiliate partnerships affect your content?',
    answer:
      'No. Our editorial team operates independently from business relationships. Product rankings are based on consumer benefit (rates, fees, features), not commission. Affiliate content is always clearly labeled.',
  },
  {
    question: 'How often is content updated?',
    answer:
      'We review content regularly, especially when underlying data changes (tax brackets, interest rates, policy updates). Every page displays its last updated date so you know how current the information is.',
  },
];

export default function EditorialStandardsPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <ArticleSchema
        title="Editorial Standards -- How We Create Content"
        description="Learn how WalletWaypoint researches, writes, and reviews financial content. Our methodology, data sources, and editorial independence policy."
        url={`${siteConfig.url}/editorial-standards`}
        datePublished="2026-03-24"
        dateModified="2026-03-24"
        authorName={siteConfig.author.name}
        authorUrl={`${siteConfig.url}/authors/${siteConfig.author.slug}`}
      />
      <FaqSchema items={faqItems} />

      <h1 className="text-xl font-semibold md:text-2xl">
        Our Editorial Standards
      </h1>

      <div className="mt-4">
        <AuthorCard
          name={siteConfig.author.name}
          role={siteConfig.author.role}
          slug={siteConfig.author.slug}
        />
      </div>

      <p className="mt-6 mb-4 text-base leading-[1.6]">
        Every piece of content on WalletWaypoint follows a rigorous editorial
        process. This page explains how we research, create, and maintain our
        calculators, guides, and comparison tools.
      </p>

      {/* How We Create Content */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        How We Create Content
      </h2>
      <ul className="mb-4 list-disc space-y-3 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Research:</strong> We start with authoritative sources --
          government agencies (IRS, CFPB, FHFA), academic research, and official
          financial institution disclosures. We cite our sources so you can
          verify the data yourself.
        </li>
        <li>
          <strong>Writing:</strong> Content is written in plain language. We
          avoid jargon and explain every financial term. Our goal is "smart
          friend" clarity, not textbook density.
        </li>
        <li>
          <strong>Review:</strong> All content is reviewed for accuracy, clarity,
          and completeness before publication. Calculator formulas are tested
          against known examples.
        </li>
        <li>
          <strong>Updates:</strong> Financial information changes. We review
          content regularly and note the last update date on every page. When tax
          brackets shift, interest rates move, or regulations change, we update
          the affected content.
        </li>
      </ul>

      {/* Our Data Sources */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">Our Data Sources</h2>
      <p className="mb-4 text-base leading-[1.6]">
        Accuracy depends on reliable data. Here are the primary sources we
        reference:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Federal Reserve Economic Data (FRED):</strong> Interest rates,
          economic indicators, and monetary policy data
        </li>
        <li>
          <strong>Bureau of Labor Statistics:</strong> Inflation rates,
          cost-of-living data, and employment statistics
        </li>
        <li>
          <strong>IRS Publications:</strong> Tax brackets, standard deductions,
          filing rules, and retirement contribution limits
        </li>
        <li>
          <strong>Consumer Financial Protection Bureau (CFPB):</strong> Consumer
          protection guidelines and financial product regulations
        </li>
        <li>
          <strong>National Association of Realtors:</strong> Housing market data,
          median home prices, and market trends
        </li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        When we use data in calculators, we cite the source and date so you know
        exactly where the numbers come from.
      </p>

      {/* Affiliate Content & Independence */}
      <h2
        id="affiliate-disclosure"
        className="mt-8 mb-4 text-lg font-semibold"
      >
        Affiliate Content &amp; Independence
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint earns revenue through affiliate partnerships and display
        advertising. Here is how we maintain editorial independence:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          Affiliate content is always clearly labeled with disclosure notices
        </li>
        <li>
          Product rankings are based on consumer benefit -- rates, fees, and
          features -- not affiliate commission
        </li>
        <li>
          Our editorial team operates independently from our business
          relationships
        </li>
        <li>
          We never allow advertisers to influence our editorial content or
          calculator results
        </li>
        <li>
          Non-affiliate products are included in comparisons when they are the
          best option for consumers
        </li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        For more about our mission and revenue model, visit our{' '}
        <Link
          href="/about"
          className="text-accent underline hover:text-foreground"
        >
          About page
        </Link>
        .
      </p>

      {/* Corrections Policy */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">Corrections Policy</h2>
      <p className="mb-4 text-base leading-[1.6]">
        If we publish an error, we correct it promptly and note the correction
        on the affected page. Transparency about mistakes is part of being
        trustworthy.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        If you spot an error in any of our content or calculators, please let us
        know through the contact information on our{' '}
        <Link
          href="/about#contact"
          className="text-accent underline hover:text-foreground"
        >
          About page
        </Link>
        . We take corrections seriously and will investigate every report.
      </p>

      {/* FAQ Section */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        Frequently Asked Questions
      </h2>
      <Accordion>
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8">
        <AuthorCard
          name={siteConfig.author.name}
          role={siteConfig.author.role}
          slug={siteConfig.author.slug}
        />
      </div>
    </article>
  );
}

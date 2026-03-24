import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AuthorCard } from '@/components/trust/author-card';
import { DisclaimerInline } from '@/components/trust/disclaimer-inline';
import { ArticleSchema } from '@/components/seo/article-schema';

export const metadata = createMetadata({
  title: 'About WalletWaypoint -- Our Mission',
  description:
    'WalletWaypoint helps you navigate money decisions at every life stage with free calculators, guides, and tools.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <ArticleSchema
        title="About WalletWaypoint -- Our Mission"
        description="WalletWaypoint helps you navigate money decisions at every life stage with free calculators, guides, and tools."
        url={`${siteConfig.url}/about`}
        datePublished="2026-03-24"
        dateModified="2026-03-24"
        authorName={siteConfig.author.name}
        authorUrl={`${siteConfig.url}/authors/${siteConfig.author.slug}`}
      />

      <h1 className="text-xl font-semibold md:text-2xl">
        Why WalletWaypoint Exists
      </h1>

      <div className="mt-4">
        <AuthorCard
          name={siteConfig.author.name}
          role={siteConfig.author.role}
          slug={siteConfig.author.slug}
        />
      </div>

      {/* Our Mission */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">Our Mission</h2>
      <p className="mb-4 text-base leading-[1.6]">
        Money decisions shape lives. Which student loan to take, whether you can
        afford that apartment, how much house you can buy, what you owe in
        taxes -- these choices have real, lasting consequences. Yet the
        information available to help with these decisions is often confusing,
        buried in jargon, or designed to sell you something.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint exists to be the opposite: a free, transparent resource
        that helps people make confident financial decisions at every stage of
        life. We build interactive calculators, write clear guides, and compare
        financial products honestly -- so you can understand your options and
        choose what is right for you.
      </p>

      {/* Who We Are For */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">Who We Are For</h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint is for anyone approaching a financial milestone:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>Students figuring out loan repayment strategies</li>
        <li>Renters deciding if they can afford a new place</li>
        <li>First-time homebuyers comparing mortgage options</li>
        <li>Freelancers estimating quarterly taxes</li>
        <li>Anyone planning for retirement</li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        If you have a financial milestone ahead, we are building a tool or guide
        for it.
      </p>

      {/* What Makes Us Different */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        What Makes Us Different
      </h2>
      <ul className="mb-4 list-disc space-y-3 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Life-stage approach:</strong> Our tools are organized by where
          you are in life, not by product category. Whether you are a student, a
          first-time renter, or nearing retirement, you will find resources
          tailored to your situation.
        </li>
        <li>
          <strong>Tools, not advice:</strong> We help you calculate, compare, and
          understand. We do not tell you what to do. You make the decision -- we
          give you the numbers and context.
        </li>
        <li>
          <strong>Transparent methodology:</strong> Our{' '}
          <Link
            href="/editorial-standards"
            className="text-accent underline hover:text-foreground"
          >
            editorial process
          </Link>{' '}
          is public. You can see exactly how we research and create content.
        </li>
        <li>
          <strong>No paywalls:</strong> Every calculator and guide on
          WalletWaypoint is free to use.
        </li>
      </ul>

      {/* How We Make Money */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">How We Make Money</h2>
      <p className="mb-4 text-base leading-[1.6]">
        Transparency about our revenue model matters. WalletWaypoint earns money
        through two channels:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Display advertising:</strong> Ads appear on some pages. We work
          with ad networks that optimize for a good user experience with minimal
          layout disruption.
        </li>
        <li>
          <strong>Affiliate links:</strong> When we compare financial products,
          some links are affiliate links. If you click through and sign up, we
          may earn a commission at no extra cost to you.
        </li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        Affiliate content is always clearly labeled. Our rankings are based on
        consumer benefit -- rates, fees, and features -- not on which company
        pays us the most. For full details, read our{' '}
        <Link
          href="/editorial-standards#affiliate-disclosure"
          className="text-accent underline hover:text-foreground"
        >
          editorial standards on affiliate independence
        </Link>
        .
      </p>

      {/* Get In Touch */}
      <h2 id="contact" className="mt-8 mb-4 text-lg font-semibold">
        Get In Touch
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Have questions, feedback, or a correction to report? We would love to
        hear from you. Email us at{' '}
        <a
          href="mailto:hello@walletwaypoint.com"
          className="text-accent underline hover:text-foreground"
        >
          hello@walletwaypoint.com
        </a>
        .
      </p>

      <DisclaimerInline />

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

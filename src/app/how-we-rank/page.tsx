import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { ArticleSchema } from '@/components/seo/article-schema';
import { Separator } from '@/components/ui/separator';

export const metadata = createMetadata({
  title: 'How We Rank Products',
  description:
    'Our product rankings are based on consumer benefit, not advertising revenue. Here is exactly how we evaluate and compare financial products.',
  path: '/how-we-rank',
});

export default function HowWeRankPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-8 sm:px-6 md:py-12">
      <ArticleSchema
        title="How We Rank Products"
        description="Our product rankings are based on consumer benefit, not advertising revenue. Here is exactly how we evaluate and compare financial products."
        url={`${siteConfig.url}/how-we-rank`}
        datePublished="2026-03-26"
        dateModified="2026-03-26"
        authorName={siteConfig.author.name}
        authorUrl={`${siteConfig.url}/authors/${siteConfig.author.slug}`}
      />

      <h1 className="text-xl font-semibold md:text-2xl">
        How We Rank Products
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 26, 2026
      </p>

      <p className="mt-6 text-base leading-[1.6]">
        Our product rankings are based on consumer benefit, not advertising
        revenue. Here is exactly how we evaluate and compare financial products
        across every category on WalletWaypoint.
      </p>

      <Separator className="my-8" />

      {/* Our Independence Promise */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        Our Independence Promise
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Commission rates do not influence our rankings. We rank products based on
        their value to you: total cost, rewards value, eligibility breadth, and
        customer experience. If a product pays us more but serves you worse, it
        ranks lower.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint earns revenue through affiliate links when you click
        through to a product and take action (such as applying for a credit card
        or opening a savings account). These partnerships are always clearly
        disclosed on every page that contains affiliate links. Our editorial team
        evaluates products independently from our business relationships.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        If a top-ranked product does not have an affiliate partnership with us,
        we still include it in our rankings. Omitting a great product because it
        does not pay us would violate the trust you place in our comparisons. You
        deserve to see the best options available, regardless of whether we earn
        a commission.
      </p>

      <Separator className="my-8" />

      {/* How We Rank Credit Cards */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        How We Rank Credit Cards
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Credit card rankings prioritize value to the cardholder. A card that
        costs less and rewards more ranks higher, regardless of its affiliate
        commission. Here are the criteria we evaluate:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Total cost to the cardholder:</strong> We weigh the ongoing APR
          and annual fee together. A card with a low APR and no annual fee scores
          higher than one with flashy rewards offset by steep costs. For balance
          transfer cards, we factor in the introductory period length and the
          transfer fee percentage.
        </li>
        <li>
          <strong>Rewards value relative to spending patterns:</strong> We
          calculate the effective return rate based on common spending categories
          (groceries, dining, travel, gas). A card earning 3% on groceries is
          more valuable for most people than 5x airline miles with narrow
          redemption options.
        </li>
        <li>
          <strong>Signup bonus value and attainability:</strong> A large signup
          bonus matters, but only if the spending requirement is realistic. We
          discount bonuses that require spending far above the average
          household&apos;s monthly budget.
        </li>
        <li>
          <strong>Credit score accessibility:</strong> Cards available to a wider
          range of credit scores rank higher when value is comparable. A good
          card that requires excellent credit (750+) ranks below an equally good
          card accessible to those with good credit (670+).
        </li>
        <li>
          <strong>Consumer protections and benefits:</strong> Purchase
          protection, extended warranty coverage, travel insurance, and fraud
          liability policies all factor into our assessment. These benefits add
          real dollar value beyond the stated rewards rate.
        </li>
      </ul>

      <Separator className="my-8" />

      {/* How We Rank Personal Loans */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        How We Rank Personal Loans
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Personal loan rankings focus on the total cost of borrowing. The
        cheapest, most transparent loan that serves the widest range of borrowers
        ranks highest. Here is what we evaluate:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>APR range:</strong> Lower APRs are better for equivalent loan
          terms. We compare the full APR range disclosed by each lender, not just
          the advertised minimum rate that only the most qualified borrowers
          receive.
        </li>
        <li>
          <strong>Fee transparency:</strong> Origination fees, late payment fees,
          and prepayment penalties all increase the true cost of a loan. Lenders
          that charge no origination fee and no prepayment penalty rank higher
          than those with hidden costs.
        </li>
        <li>
          <strong>Loan amount flexibility:</strong> Lenders offering a wider
          range of loan amounts (from small consolidation loans to larger home
          improvement projects) serve more borrowers effectively and rank higher
          for versatility.
        </li>
        <li>
          <strong>Term options:</strong> More repayment term options give
          borrowers better control over monthly payments and total interest paid.
          Lenders offering 12-month through 84-month terms score higher than
          those with limited options.
        </li>
        <li>
          <strong>Eligibility breadth:</strong> Lenders that accept a wider range
          of credit scores -- including fair credit (580-669) -- rank higher when
          their rates remain competitive. A lender serving only excellent credit
          borrowers helps fewer people.
        </li>
      </ul>

      <Separator className="my-8" />

      {/* How We Rank Savings Accounts & CDs */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        How We Rank Savings Accounts &amp; CDs
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Savings account and CD rankings reward institutions that pay more, charge
        less, and make it easy to get started. Here is what we evaluate:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>APY (Annual Percentage Yield):</strong> Higher APY means more
          money earned on your deposits. We compare the current APY offered by
          each institution and note whether the rate is variable (savings) or
          fixed (CDs). For CDs, we compare rates across equivalent term lengths.
        </li>
        <li>
          <strong>Minimum deposit requirements:</strong> Lower barriers to entry
          rank higher. An account requiring no minimum deposit is more accessible
          than one requiring $1,000 or more to open. We note minimum balance
          requirements to earn the stated APY.
        </li>
        <li>
          <strong>Fee structure:</strong> Monthly maintenance fees, excessive
          transaction fees, and early withdrawal penalties (for CDs) reduce the
          effective return on your savings. Accounts with no monthly fees and
          reasonable withdrawal terms rank higher.
        </li>
        <li>
          <strong>FDIC insurance confirmation:</strong> All savings accounts and
          CDs in our comparisons must be FDIC-insured (or NCUA-insured for
          credit unions). This is a baseline requirement, not a differentiator --
          uninsured institutions are excluded entirely.
        </li>
        <li>
          <strong>Access flexibility and term options:</strong> For savings
          accounts, we evaluate how easily you can access your funds (ATM
          network, mobile app, transfer speed). For CDs, we evaluate the range of
          term lengths available and whether the institution offers no-penalty CD
          options.
        </li>
      </ul>

      <Separator className="my-8" />

      {/* How We Rank Insurance */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        How We Rank Insurance
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Insurance rankings balance coverage quality with affordability. The best
        insurance provides comprehensive protection at a fair price. Here is what
        we evaluate:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Coverage value per premium dollar:</strong> We calculate the
          ratio of coverage limits to annual premium cost. A policy offering
          $100,000 in coverage for $800/year outranks one offering the same
          coverage for $1,200/year, all else being equal.
        </li>
        <li>
          <strong>Deductible options and flexibility:</strong> Insurers offering
          multiple deductible tiers ($250, $500, $1,000) let you balance premium
          cost against out-of-pocket risk. More options mean better
          customization for your budget.
        </li>
        <li>
          <strong>Claims satisfaction and customer ratings:</strong> We reference
          J.D. Power claims satisfaction studies, NAIC complaint ratios, and AM
          Best financial strength ratings. An insurer with consistently high
          claims satisfaction scores higher -- insurance is only valuable if it
          pays when you need it.
        </li>
        <li>
          <strong>Discount availability:</strong> Bundling discounts (auto +
          renters), safe driver discounts, claims-free discounts, and loyalty
          discounts all reduce the effective cost. Insurers offering more
          discount pathways rank higher for value.
        </li>
        <li>
          <strong>Coverage completeness for the tier:</strong> We evaluate what
          each coverage tier includes by default. A &quot;basic&quot; policy that
          excludes common perils (like water damage for renters) ranks lower than
          one with more inclusive base coverage, even at a slightly higher
          premium.
        </li>
      </ul>

      <Separator className="my-8" />

      {/* Where Our Data Comes From */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        Where Our Data Comes From
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        We collect product data from official issuer websites, public rate
        disclosures, and regulatory databases. For credit cards and loans, we
        verify APRs, fees, and eligibility requirements directly from
        issuer-published Schumer boxes and loan disclosures. For savings accounts
        and CDs, we confirm APY rates from institution websites and FDIC
        BankFind records.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        Insurance data is gathered from insurer quote tools, state insurance
        department rate filings, and independent rating agencies (AM Best, J.D.
        Power). We cross-reference multiple sources to ensure accuracy.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        Our ranking approach follows principles outlined by the Consumer
        Financial Protection Bureau for fair product comparisons. The CFPB
        emphasizes transparency, clear disclosure of costs and terms, and
        presentation that helps consumers make informed decisions -- principles
        that guide every comparison table on WalletWaypoint.
      </p>

      <Separator className="my-8" />

      {/* How Often We Update */}
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        How Often We Update
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        We review and update product data monthly. Rates and terms change
        frequently. The date shown in each comparison table reflects the last
        verification.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        Off-cycle updates happen when significant changes occur: a product is
        discontinued, a major rate change is announced, regulatory changes affect
        product terms, or a new product launches that merits inclusion. We
        monitor issuer announcements and regulatory filings to catch these
        changes promptly.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        If you notice that a product&apos;s rate, fee, or availability has
        changed since our last update, please let us know. Reader reports help us
        keep our data current between scheduled review cycles.
      </p>

      <Separator className="my-8" />

      {/* Cross-reference and back links */}
      <p className="text-sm text-muted-foreground">
        Read our full{' '}
        <Link
          href="/editorial-standards"
          className="underline hover:text-foreground"
        >
          editorial standards
        </Link>{' '}
        for more on how we create content.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/compare" className="underline hover:text-foreground">
          Back to product comparisons
        </Link>
      </p>
    </article>
  );
}

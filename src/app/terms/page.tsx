import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { ArticleSchema } from '@/components/seo/article-schema';

export const metadata = createMetadata({
  title: 'Terms of Use',
  description:
    'WalletWaypoint terms of use. Rules governing your use of our financial calculators, guides, and educational content.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <ArticleSchema
        title="Terms of Use"
        description="WalletWaypoint terms of use. Rules governing your use of our financial calculators, guides, and educational content."
        url={`${siteConfig.url}/terms`}
        datePublished="2026-03-24"
        dateModified="2026-03-27"
        authorName={siteConfig.author.name}
        authorUrl={`${siteConfig.url}/authors/${siteConfig.author.slug}`}
      />

      <h1 className="text-xl font-semibold md:text-2xl">Terms of Use</h1>

      <p className="mt-4 mb-8 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      {/* Section 1: Acceptance of Terms */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        By accessing and using WalletWaypoint, you agree to be bound by these
        Terms of Use. If you do not agree to these terms, please do not use our
        website. Your continued use of the site constitutes acceptance of these
        terms and any updates we may make.
      </p>

      {/* Section 2: Use of Content */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">2. Use of Content</h2>
      <p className="mb-4 text-base leading-[1.6]">
        All content on WalletWaypoint, including articles, guides, and
        calculator results, is provided for educational and informational
        purposes only. Nothing on this site constitutes financial, investment,
        tax, or legal advice.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        You should always consult a qualified financial professional before
        making any financial decisions. The information provided here is intended
        to help you understand your options, not to replace professional
        guidance.
      </p>

      {/* Section 3: Calculator Disclaimer */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        3. Calculator Disclaimer
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        Our financial calculators provide estimates only and should not be
        treated as guarantees of actual financial outcomes. Calculator results
        depend on the values you enter and on assumptions that may not reflect
        your actual financial situation.
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          Calculators use simplified models and may not account for all fees,
          taxes, or market conditions
        </li>
        <li>
          Interest rates, tax brackets, and other financial data may change
          after publication
        </li>
        <li>
          Results are approximations intended to help you explore scenarios, not
          to predict exact outcomes
        </li>
      </ul>

      {/* Section 4: Intellectual Property */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        4. Intellectual Property
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        All content, calculators, tools, designs, and other materials on
        WalletWaypoint are owned by WalletWaypoint and are protected by
        applicable intellectual property laws. You may not reproduce, distribute,
        modify, or create derivative works from our content without prior written
        permission.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        You may share links to our pages and reference our content with proper
        attribution for non-commercial purposes.
      </p>

      {/* Section 5: Third-Party Links */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        5. Third-Party Links
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint contains links to third-party websites, including
        affiliate partners. These links are provided for your convenience and
        informational purposes. We are not responsible for the content, accuracy,
        or practices of external websites.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        Some links on this site are affiliate links, which means we may earn a
        commission if you click through and make a purchase. This does not affect
        the price you pay or our editorial recommendations. For more details,
        see our{' '}
        <a
          href="/editorial-standards#affiliate-disclosure"
          className="text-accent underline hover:text-foreground"
        >
          affiliate disclosure
        </a>
        .
      </p>

      {/* Section 6: Limitation of Liability */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        6. Limitation of Liability
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint and its contributors are not liable for any financial
        losses, damages, or negative outcomes resulting from decisions made based
        on the content, calculator results, or tools provided on this website.
        You use this site and its tools at your own risk.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        To the fullest extent permitted by law, WalletWaypoint disclaims all
        warranties, express or implied, including warranties of merchantability,
        fitness for a particular purpose, and non-infringement.
      </p>

      {/* Section 7: Modifications */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">7. Modifications</h2>
      <p className="mb-4 text-base leading-[1.6]">
        We reserve the right to update or modify these Terms of Use at any time
        without prior notice. When we make changes, we will update the
        &ldquo;Last updated&rdquo; date at the top of this page. Your continued
        use of WalletWaypoint after any modifications constitutes acceptance of
        the updated terms.
      </p>

      {/* Section 8: Governing Law */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">8. Governing Law</h2>
      <p className="mb-4 text-base leading-[1.6]">
        These Terms of Use are governed by and construed in accordance with the
        laws of the United States. Any disputes arising from or related to the
        use of this website shall be resolved under the applicable laws of the
        United States.
      </p>

      {/* Section 9: Contact */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">9. Contact</h2>
      <p className="mb-4 text-base leading-[1.6]">
        If you have questions about these Terms of Use, please visit our{' '}
        <a
          href="/about#contact"
          className="text-accent underline hover:text-foreground"
        >
          About page
        </a>
        .
      </p>
    </article>
  );
}

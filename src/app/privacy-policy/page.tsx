import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { ArticleSchema } from '@/components/seo/article-schema';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'WalletWaypoint privacy policy. How we collect, use, and protect your information. Your rights under CCPA and GDPR.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
      <ArticleSchema
        title="Privacy Policy"
        description="WalletWaypoint privacy policy. How we collect, use, and protect your information. Your rights under CCPA and GDPR."
        url={`${siteConfig.url}/privacy-policy`}
        datePublished="2026-03-24"
        dateModified="2026-03-24"
        authorName={siteConfig.author.name}
        authorUrl={`${siteConfig.url}/authors/${siteConfig.author.slug}`}
      />

      <h1 className="text-xl font-semibold md:text-2xl">Privacy Policy</h1>

      <p className="mt-4 mb-8 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      {/* Section 1: Information We Collect */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        1. Information We Collect
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint collects limited information to improve your experience
        and maintain our services:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Usage data via analytics:</strong> Page views, time on page,
          device type, browser type, and general geographic region
        </li>
        <li>
          <strong>Cookies and similar tracking technologies:</strong> Small data
          files stored on your device to help us understand how you use the site
        </li>
        <li>
          <strong>Voluntarily provided information:</strong> We do NOT collect
          names, email addresses, or financial information unless you voluntarily
          provide it (for example, through a contact form)
        </li>
      </ul>

      {/* Section 2: How We Use Your Information */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        2. How We Use Your Information
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        The information we collect is used to:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>Improve site content and calculator tools</li>
        <li>
          Understand which pages and calculators are most useful to visitors
        </li>
        <li>Display relevant advertisements (when applicable)</li>
        <li>Monitor site performance and uptime</li>
      </ul>

      {/* Section 3: Cookies and Tracking */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        3. Cookies and Tracking
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint uses the following tracking technologies:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Google Analytics 4 (GA4):</strong> Measures site usage and
          helps us understand visitor behavior. Data is anonymized by default.
        </li>
        <li>
          <strong>Vercel Analytics:</strong> Monitors site performance and Core
          Web Vitals to ensure fast page load times.
        </li>
        <li>
          <strong>Display ad cookies:</strong> When applicable, our advertising
          partners (such as Mediavine) may use cookies to serve relevant
          advertisements.
        </li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        <strong>How to opt out:</strong> You can manage cookies through your
        browser settings. To opt out of Google Analytics specifically, install
        the{' '}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-foreground"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      {/* Section 4: Third-Party Services */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        4. Third-Party Services
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        We use the following third-party services that may collect data:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Google Analytics:</strong>{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-foreground"
          >
            Google Privacy Policy
          </a>
        </li>
        <li>
          <strong>Vercel:</strong>{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-foreground"
          >
            Vercel Privacy Policy
          </a>
        </li>
      </ul>
      <p className="mb-4 text-base leading-[1.6]">
        Future advertising partners will be listed here as they are added.
      </p>

      {/* Section 5: CCPA */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        5. Your Privacy Rights (CCPA)
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        If you are a California resident, you have the following rights under
        the California Consumer Privacy Act (CCPA):
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Right to know:</strong> You can request details about what
          personal information we collect about you
        </li>
        <li>
          <strong>Right to deletion:</strong> You can request that we delete your
          personal information
        </li>
        <li>
          <strong>Right to opt out:</strong> You can opt out of the sale of
          personal information. Note: WalletWaypoint does not sell personal
          information.
        </li>
        <li>
          <strong>Right to non-discrimination:</strong> We will not discriminate
          against you for exercising your privacy rights
        </li>
      </ul>

      {/* Section 6: GDPR */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        6. Your Privacy Rights (GDPR)
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        If you are located in the European Economic Area (EEA) or United
        Kingdom, you have the following rights under the General Data Protection
        Regulation (GDPR):
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]">
        <li>
          <strong>Right to consent:</strong> Data collection requires your
          consent before processing
        </li>
        <li>
          <strong>Right to access:</strong> You can request a copy of the
          personal data we hold about you
        </li>
        <li>
          <strong>Right to rectification:</strong> You can request correction of
          inaccurate personal data
        </li>
        <li>
          <strong>Right to erasure:</strong> You can request deletion of your
          personal data (&ldquo;right to be forgotten&rdquo;)
        </li>
        <li>
          <strong>Right to data portability:</strong> You can request your data
          in a structured, machine-readable format
        </li>
      </ul>

      {/* Section 7: Data Retention */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">7. Data Retention</h2>
      <p className="mb-4 text-base leading-[1.6]">
        Analytics data is retained according to third-party provider defaults.
        Google Analytics 4 retains data for 14 months by default.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint does not store personally identifiable information
        directly. Any data collected through analytics is processed by the
        respective third-party services.
      </p>

      {/* Section 8: Children's Privacy */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        8. Children&apos;s Privacy
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        WalletWaypoint is not directed at children under the age of 13. We do
        not knowingly collect personal information from children under 13 in
        compliance with the Children&apos;s Online Privacy Protection Act
        (COPPA).
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        If you believe we have inadvertently collected information from a child
        under 13, please contact us immediately so we can delete it.
      </p>

      {/* Section 9: Changes to This Policy */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        9. Changes to This Policy
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        We may update this privacy policy periodically to reflect changes in our
        practices, technology, or legal requirements. When we make changes, we
        will update the &ldquo;Last updated&rdquo; date at the top of this page.
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        Continued use of WalletWaypoint after changes are posted constitutes
        acceptance of the updated policy.
      </p>

      {/* Section 10: Contact Information */}
      <h2 className="mt-8 mb-4 text-lg font-semibold">
        10. Contact Information
      </h2>
      <p className="mb-4 text-base leading-[1.6]">
        For privacy-related questions or to exercise your rights under CCPA or
        GDPR, contact us at{' '}
        <a
          href="mailto:privacy@walletwaypoint.com"
          className="text-accent underline hover:text-foreground"
        >
          privacy@walletwaypoint.com
        </a>
        .
      </p>
      <p className="mb-4 text-base leading-[1.6]">
        For general inquiries, visit our{' '}
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

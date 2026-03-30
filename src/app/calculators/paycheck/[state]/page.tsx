import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { states } from "#site/content";
import { STATES } from "@/lib/states/state-list";
import { StatePaycheckClient } from "./state-paycheck-client";
import { BracketTable } from "@/components/calculator/bracket-table";
import { WebAppSchema } from "@/components/seo/web-app-schema";
import { FaqSchema } from "@/components/seo/faq-schema";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { AdBreak } from "@/components/ads/ad-break";
import { Lightbulb, ArrowRight } from "lucide-react";
import type { CalculatorConfig } from "@/lib/calculators/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
  return createMetadata({
    title: stateData.editorialTitle,
    description: stateData.editorialDescription,
    path: `/calculators/paycheck/${stateData.slug}`,
    ogType: "calculator",
  });
}

/**
 * Regional neighbors and popular states for cross-linking.
 * Each state maps to a list of related state slugs (neighbors + popular).
 */
const STATE_REGIONS: Record<string, string[]> = {
  alabama: ["georgia", "mississippi", "tennessee", "florida", "texas", "california"],
  alaska: ["washington", "hawaii", "california", "texas", "florida", "new-york"],
  arizona: ["california", "nevada", "new-mexico", "utah", "colorado", "texas"],
  arkansas: ["missouri", "tennessee", "mississippi", "louisiana", "texas", "oklahoma"],
  california: ["oregon", "nevada", "arizona", "washington", "texas", "new-york"],
  colorado: ["utah", "wyoming", "nebraska", "kansas", "new-mexico", "arizona"],
  connecticut: ["new-york", "massachusetts", "rhode-island", "new-jersey", "pennsylvania", "florida"],
  delaware: ["maryland", "pennsylvania", "new-jersey", "virginia", "new-york", "florida"],
  "district-of-columbia": ["maryland", "virginia", "pennsylvania", "new-york", "florida", "california"],
  florida: ["georgia", "alabama", "south-carolina", "texas", "california", "new-york"],
  georgia: ["florida", "south-carolina", "north-carolina", "alabama", "tennessee", "texas"],
  hawaii: ["california", "washington", "oregon", "alaska", "texas", "new-york"],
  idaho: ["montana", "washington", "oregon", "utah", "wyoming", "nevada"],
  illinois: ["indiana", "wisconsin", "iowa", "missouri", "michigan", "ohio"],
  indiana: ["illinois", "ohio", "michigan", "kentucky", "texas", "florida"],
  iowa: ["minnesota", "wisconsin", "illinois", "missouri", "nebraska", "south-dakota"],
  kansas: ["missouri", "nebraska", "oklahoma", "colorado", "texas", "florida"],
  kentucky: ["tennessee", "virginia", "indiana", "ohio", "west-virginia", "illinois"],
  louisiana: ["texas", "mississippi", "arkansas", "alabama", "florida", "georgia"],
  maine: ["new-hampshire", "vermont", "massachusetts", "connecticut", "new-york", "florida"],
  maryland: ["virginia", "district-of-columbia", "pennsylvania", "delaware", "west-virginia", "new-jersey"],
  massachusetts: ["connecticut", "rhode-island", "new-hampshire", "new-york", "vermont", "maine"],
  michigan: ["ohio", "indiana", "wisconsin", "illinois", "minnesota", "pennsylvania"],
  minnesota: ["wisconsin", "iowa", "north-dakota", "south-dakota", "michigan", "illinois"],
  mississippi: ["alabama", "louisiana", "tennessee", "arkansas", "georgia", "texas"],
  missouri: ["illinois", "kansas", "arkansas", "iowa", "oklahoma", "tennessee"],
  montana: ["idaho", "wyoming", "north-dakota", "south-dakota", "washington", "colorado"],
  nebraska: ["iowa", "kansas", "south-dakota", "colorado", "missouri", "wyoming"],
  nevada: ["california", "arizona", "utah", "oregon", "idaho", "washington"],
  "new-hampshire": ["vermont", "maine", "massachusetts", "connecticut", "new-york", "florida"],
  "new-jersey": ["new-york", "pennsylvania", "delaware", "connecticut", "maryland", "florida"],
  "new-mexico": ["arizona", "texas", "colorado", "utah", "oklahoma", "nevada"],
  "new-york": ["new-jersey", "connecticut", "pennsylvania", "massachusetts", "vermont", "california"],
  "north-carolina": ["south-carolina", "virginia", "tennessee", "georgia", "florida", "new-york"],
  "north-dakota": ["south-dakota", "minnesota", "montana", "wyoming", "nebraska", "iowa"],
  ohio: ["pennsylvania", "michigan", "indiana", "kentucky", "west-virginia", "illinois"],
  oklahoma: ["texas", "kansas", "arkansas", "missouri", "colorado", "new-mexico"],
  oregon: ["washington", "california", "idaho", "nevada", "montana", "colorado"],
  pennsylvania: ["new-york", "new-jersey", "ohio", "maryland", "west-virginia", "delaware"],
  "rhode-island": ["massachusetts", "connecticut", "new-york", "new-jersey", "new-hampshire", "vermont"],
  "south-carolina": ["north-carolina", "georgia", "florida", "virginia", "tennessee", "alabama"],
  "south-dakota": ["north-dakota", "minnesota", "nebraska", "wyoming", "iowa", "montana"],
  tennessee: ["kentucky", "virginia", "north-carolina", "georgia", "alabama", "mississippi"],
  texas: ["louisiana", "oklahoma", "new-mexico", "arkansas", "florida", "california"],
  utah: ["colorado", "nevada", "idaho", "arizona", "wyoming", "new-mexico"],
  vermont: ["new-hampshire", "massachusetts", "new-york", "maine", "connecticut", "rhode-island"],
  virginia: ["maryland", "district-of-columbia", "west-virginia", "north-carolina", "kentucky", "tennessee"],
  washington: ["oregon", "idaho", "california", "montana", "nevada", "colorado"],
  "west-virginia": ["virginia", "ohio", "pennsylvania", "kentucky", "maryland", "north-carolina"],
  wisconsin: ["minnesota", "michigan", "illinois", "iowa", "indiana", "ohio"],
  wyoming: ["montana", "colorado", "south-dakota", "idaho", "nebraska", "utah"],
};

function getRelatedStates(currentSlug: string): Array<{ slug: string; name: string; abbreviation: string }> {
  const regionSlugs = STATE_REGIONS[currentSlug] ?? ["california", "texas", "new-york", "florida", "illinois", "washington"];
  return regionSlugs
    .filter((slug) => slug !== currentSlug)
    .slice(0, 8)
    .map((slug) => STATES.find((s) => s.slug === slug))
    .filter((s): s is { slug: string; name: string; abbreviation: string } => s !== undefined);
}

function buildStateConfig(stateName: string, stateSlug: string): CalculatorConfig {
  return {
    slug: "paycheck",
    title: `${stateName} Paycheck Calculator 2026`,
    description: `Calculate your take-home pay in ${stateName} after federal taxes, state taxes, FICA, and deductions.`,
    category: "tax",
    mathModule: "paycheck",
    inputs: {
      primary: [
        {
          name: "salary",
          label: "Annual Salary",
          type: "currency",
          min: 15000,
          max: 500000,
          step: 1000,
          default: 65000,
          urlKey: "salary",
          hint: "Your total yearly salary before taxes",
        },
        {
          name: "state",
          label: "State",
          type: "select",
          min: 0,
          max: 0,
          step: 0,
          default: 0,
          urlKey: "state",
          options: STATES.map((s) => ({ value: s.slug, label: s.name })),
          hint: `Viewing ${stateName}`,
        },
        {
          name: "filing",
          label: "Filing Status",
          type: "select",
          min: 0,
          max: 0,
          step: 0,
          default: 0,
          urlKey: "filing",
          options: [
            { value: "single", label: "Single" },
            { value: "married", label: "Married Filing Jointly" },
            { value: "head", label: "Head of Household" },
          ],
        },
        {
          name: "frequency",
          label: "Pay Frequency",
          type: "select",
          min: 0,
          max: 0,
          step: 0,
          default: 0,
          urlKey: "frequency",
          options: [
            { value: "weekly", label: "Weekly (52 paychecks)" },
            { value: "biweekly", label: "Biweekly (26 paychecks)" },
            { value: "semimonthly", label: "Semi-monthly (24 paychecks)" },
            { value: "monthly", label: "Monthly (12 paychecks)" },
          ],
        },
        {
          name: "withholding",
          label: "Additional Withholding",
          type: "currency",
          min: 0,
          max: 5000,
          step: 10,
          default: 0,
          urlKey: "withholding",
          hint: "Extra annual tax withholding beyond standard",
          tooltip:
            "Additional federal tax withholding you request on your W-4 form (line 4c), entered as an annual total.",
        },
        {
          name: "pretaxDeductions",
          label: "Pre-tax Deductions",
          type: "currency",
          min: 0,
          max: 25000,
          step: 500,
          default: 0,
          urlKey: "pretaxDeductions",
          hint: "Annual 401(k), HSA, or FSA contributions",
          tooltip:
            "Pre-tax deductions like 401(k) contributions, HSA, or FSA reduce your taxable income before federal and state taxes are calculated.",
        },
      ],
    },
    charts: [
      { type: "pie", title: "Tax Breakdown", dataKey: "breakdown" },
      { type: "bar", title: "Monthly Breakdown", dataKey: "monthlyBreakdown" },
    ],
    outputs: [
      {
        key: "netPayPerPaycheck",
        label: "Net Pay Per Paycheck",
        format: "currency",
        primary: true,
      },
      { key: "annualNetPay", label: "Annual Net Pay", format: "currency" },
      { key: "totalTax", label: "Total Tax", format: "currency" },
      { key: "effectiveRate", label: "Effective Tax Rate", format: "percent" },
    ],
    seo: {
      schemaType: "WebApplication",
      applicationCategory: "FinanceApplication",
    },
    callouts: [],
    interpretation: {
      template: "",
      contextLabel: "paycheck",
    },
    faqs: [],
  };
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

export default async function StatePaycheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateData = states.find((s) => s.slug === state);
  if (!stateData) notFound();

  const relatedStates = getRelatedStates(state);
  const config = buildStateConfig(stateData.name, stateData.slug);

  return (
    <>
      <WebAppSchema
        name={`${stateData.name} Paycheck Calculator`}
        description={stateData.editorialDescription}
        url={`${siteConfig.url}/calculators/paycheck/${stateData.slug}`}
        applicationCategory="FinanceApplication"
      />

      {/* Calculator section with state pre-selected */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 md:py-12">
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-96 animate-pulse rounded bg-muted" />
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[360px] shrink-0 h-[400px] animate-pulse rounded-lg bg-muted/50" />
              <div className="flex-1 h-[300px] animate-pulse rounded-lg bg-muted/50" />
            </div>
          </div>
        }
      >
        <StatePaycheckClient config={config} stateSlug={stateData.slug} />
      </Suspense>

      <AdBreak className="mx-auto max-w-[1080px] px-4 sm:px-6" />

      {/* Bracket table section */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {stateData.name} Income Tax Brackets 2026
        </h2>
        <BracketTable
          brackets={stateData.brackets}
          stateName={stateData.name}
          taxType={stateData.taxType as "graduated" | "flat" | "none"}
          flatRate={stateData.flatRate}
          hasIncomeTax={stateData.hasIncomeTax}
        />
      </section>

      <AdBreak className="mx-auto max-w-[1080px] px-4 sm:px-6" />

      {/* Editorial content */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Understanding {stateData.name} Taxes
        </h2>
        {renderEditorialContent(stateData.editorialContent)}
      </section>

      {/* FAQ section */}
      {stateData.faqs && stateData.faqs.length > 0 && (
        <>
          <FaqSchema items={stateData.faqs} />
          <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion defaultValue={["faq-0"]}>
              {stateData.faqs.map(
                (faq: { question: string; answer: string }, i: number) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </section>
        </>
      )}

      {/* Tips section */}
      {stateData.tips && stateData.tips.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Tax Tips for {stateData.name} Residents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stateData.tips.map((tip: string, i: number) => (
              <div
                key={i}
                className="rounded-lg bg-muted/50 p-4 flex items-start gap-3"
              >
                <Lightbulb className="size-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <AdBreak className="mx-auto max-w-[1080px] px-4 sm:px-6" />

      {/* Related states navigation */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Calculate Your Paycheck in Other States
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {relatedStates.map((s) => (
            <Link
              key={s.slug}
              href={`/calculators/paycheck/${s.slug}`}
              className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
            >
              <div>
                <span className="text-sm font-semibold text-foreground">
                  {s.name}
                </span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({s.abbreviation})
                </span>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Financial disclaimer */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 pb-8">
        <p className="text-xs text-muted-foreground">
          For educational purposes only -- not financial or tax advice. Tax rates
          shown are based on 2026 data and may not reflect recent changes.
          Consult a tax professional for your specific situation.
        </p>
      </section>
    </>
  );
}

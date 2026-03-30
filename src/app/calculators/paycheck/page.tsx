import { Suspense } from 'react';
import { CalculatorPageClient } from '@/components/calculator/calculator-page-client';
import { WebAppSchema } from '@/components/seo/web-app-schema';
import { FaqSchema } from '@/components/seo/faq-schema';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { AdSlot } from '@/components/ads/ad-slot';
import { STATES } from '@/lib/states/state-list';
import type { CalculatorConfig } from '@/lib/calculators/types';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const PAYCHECK_FAQS = [
  {
    question: 'How is federal income tax calculated on my paycheck?',
    answer:
      'Federal income tax uses a progressive bracket system. Your income is taxed at increasing rates as it moves through brackets -- for example, the first $11,925 (single filer, 2026) is taxed at 10%, the next portion at 12%, and so on. The standard deduction ($15,700 for single filers in 2026) reduces your taxable income before brackets are applied.',
  },
  {
    question: 'What is FICA and how much is deducted from my pay?',
    answer:
      'FICA stands for the Federal Insurance Contributions Act and funds Social Security and Medicare. You pay 6.2% for Social Security on income up to $176,100 (2026) and 1.45% for Medicare on all income. If you earn over $200,000, an additional 0.9% Medicare surcharge applies. Your employer pays a matching amount.',
  },
  {
    question: 'Why does my take-home pay vary by state?',
    answer:
      'Each state has its own income tax structure. Nine states (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming) have no state income tax. Others use flat rates or progressive brackets. This can make a significant difference -- for example, a $65,000 salary yields several thousand dollars more take-home pay in Texas than in California.',
  },
  {
    question: 'How do pre-tax deductions like 401(k) contributions reduce my taxes?',
    answer:
      'Pre-tax deductions (401k, HSA, FSA) are subtracted from your gross income before federal and state income taxes are calculated, effectively lowering your taxable income. For example, contributing $6,000 to a 401(k) on a $65,000 salary means you are taxed on $59,000 instead. FICA taxes are also reduced by most pre-tax deductions.',
  },
  {
    question: 'How accurate is this paycheck calculator?',
    answer:
      'This calculator provides a close estimate based on 2026 federal brackets and state tax data. Actual paychecks may differ due to local taxes (city, county), specific employer deductions (health insurance premiums, union dues), tax credits, or mid-year changes. For precise withholding, consult your employer\'s payroll department or a tax professional.',
  },
];

const paycheckConfig: CalculatorConfig = {
  slug: 'paycheck',
  title: 'Paycheck Calculator',
  description:
    'Calculate your net take-home pay after federal taxes, state taxes, FICA, and deductions. See breakdowns by pay period for all 50 states.',
  category: 'tax',
  mathModule: 'paycheck',
  inputs: {
    primary: [
      {
        name: 'salary',
        label: 'Annual Salary',
        type: 'currency',
        min: 15000,
        max: 500000,
        step: 1000,
        default: 65000,
        urlKey: 'salary',
        hint: 'Your total yearly salary before taxes',
      },
      {
        name: 'state',
        label: 'State',
        type: 'select',
        min: 0,
        max: 0,
        step: 0,
        default: 0,
        urlKey: 'state',
        options: STATES.map((s) => ({ value: s.slug, label: s.name })),
        hint: 'Select your state for accurate tax calculation',
      },
      {
        name: 'filing',
        label: 'Filing Status',
        type: 'select',
        min: 0,
        max: 0,
        step: 0,
        default: 0,
        urlKey: 'filing',
        options: [
          { value: 'single', label: 'Single' },
          { value: 'married', label: 'Married Filing Jointly' },
          { value: 'head', label: 'Head of Household' },
        ],
      },
      {
        name: 'frequency',
        label: 'Pay Frequency',
        type: 'select',
        min: 0,
        max: 0,
        step: 0,
        default: 0,
        urlKey: 'frequency',
        options: [
          { value: 'weekly', label: 'Weekly (52 paychecks)' },
          { value: 'biweekly', label: 'Biweekly (26 paychecks)' },
          { value: 'semimonthly', label: 'Semi-monthly (24 paychecks)' },
          { value: 'monthly', label: 'Monthly (12 paychecks)' },
        ],
      },
      {
        name: 'withholding',
        label: 'Additional Withholding',
        type: 'currency',
        min: 0,
        max: 5000,
        step: 10,
        default: 0,
        urlKey: 'withholding',
        hint: 'Extra annual tax withholding beyond standard',
        tooltip: 'Additional federal tax withholding you request on your W-4 form (line 4c), entered as an annual total.',
      },
      {
        name: 'pretaxDeductions',
        label: 'Pre-tax Deductions',
        type: 'currency',
        min: 0,
        max: 25000,
        step: 500,
        default: 0,
        urlKey: 'pretaxDeductions',
        hint: 'Annual 401(k), HSA, or FSA contributions',
        tooltip: 'Pre-tax deductions like 401(k) contributions, HSA, or FSA reduce your taxable income before federal and state taxes are calculated.',
      },
    ],
  },
  charts: [
    { type: 'pie', title: 'Tax Breakdown', dataKey: 'breakdown' },
    { type: 'bar', title: 'Monthly Breakdown', dataKey: 'monthlyBreakdown' },
  ],
  outputs: [
    { key: 'netPayPerPaycheck', label: 'Net Pay Per Paycheck', format: 'currency', primary: true },
    { key: 'annualNetPay', label: 'Annual Net Pay', format: 'currency' },
    { key: 'totalTax', label: 'Total Tax', format: 'currency' },
    { key: 'effectiveRate', label: 'Effective Tax Rate', format: 'percent' },
  ],
  seo: {
    schemaType: 'WebApplication',
    applicationCategory: 'FinanceApplication',
  },
  callouts: [
    {
      title: "Find your state's tax details",
      href: '/calculators/paycheck/california',
    },
  ],
  interpretation: {
    template: '',
    contextLabel: 'paycheck',
  },
  faqs: PAYCHECK_FAQS,
};

export const metadata = createMetadata({
  title: 'Paycheck Calculator 2026 - Estimate Your Take-Home Pay',
  description:
    'Calculate your net take-home pay after federal taxes, state taxes, FICA, and deductions. See breakdowns by pay period for all 50 states.',
  path: '/calculators/paycheck',
});

export default function PaycheckCalculatorPage() {
  return (
    <>
      <WebAppSchema
        name="Paycheck Calculator"
        description="Calculate your net take-home pay after federal taxes, state taxes, FICA, and deductions."
        url={`${siteConfig.url}/calculators/paycheck`}
        applicationCategory="FinanceApplication"
      />
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
        <CalculatorPageClient config={paycheckConfig} />
      </Suspense>
      <AdSlot variant="in-content" className="mx-auto max-w-[1080px] px-4 sm:px-6 mt-8" />
      <FaqSchema items={PAYCHECK_FAQS} />
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion defaultValue={['faq-0']}>
          {PAYCHECK_FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 pb-8">
        <p className="text-xs text-muted-foreground">
          For educational purposes only -- not financial or tax advice. Tax rates shown are based on
          2026 data and may not reflect recent changes. Consult a tax professional for your specific
          situation.
        </p>
      </section>
    </>
  );
}

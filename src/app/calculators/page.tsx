import { calculators } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { CalculatorBrowse } from '@/components/calculator/calculator-browse';
import type { CalculatorConfig } from '@/lib/calculators/types';

export const metadata = createMetadata({
  title: 'Financial Calculators',
  description:
    'Free interactive tools that update in real time. Adjust the sliders, see your numbers, and share the results.',
  path: '/calculators',
});

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-2xl font-semibold text-foreground">
        Financial Calculators
      </h1>
      <p className="mt-3 text-base leading-[1.6] text-muted-foreground max-w-[640px]">
        Free interactive tools that update in real time. Adjust the sliders, see
        your numbers, and share the results.
      </p>
      <div className="mt-10">
        <CalculatorBrowse calculators={calculators as unknown as CalculatorConfig[]} />
      </div>
    </div>
  );
}

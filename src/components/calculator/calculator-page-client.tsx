'use client';

import { CalculatorShell } from './calculator-shell';
import { getCalculatorCompute, getCalculatorParams } from '@/lib/calculators/registry';
import type { CalculatorConfig } from '@/lib/calculators/types';

interface CalculatorPageClientProps {
  config: CalculatorConfig;
}

export function CalculatorPageClient({ config }: CalculatorPageClientProps) {
  const computeResults = getCalculatorCompute(config.mathModule);
  const params = getCalculatorParams(config.mathModule);

  return (
    <CalculatorShell
      config={config}
      computeResults={computeResults}
      params={params}
    />
  );
}

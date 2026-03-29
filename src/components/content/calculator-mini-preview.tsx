'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCalculatorCompute } from '@/lib/calculators/registry';
import { formatCurrency, formatPercent, formatNumber, formatByType } from '@/lib/calculators/formatters';
import { Card, CardContent } from '@/components/ui/card';
import type { Calculator } from '#site/content';

/** Format an input's default value for display based on its type */
function formatInputDefault(value: number, type: string): string {
  switch (type) {
    case 'currency': return formatCurrency(value);
    case 'percent': return formatPercent(value, value % 1 === 0 ? 0 : 1);
    case 'years': return `${value} yr`;
    case 'number': return formatNumber(value);
    default: return String(value);
  }
}

interface CalculatorMiniPreviewProps {
  calculator: Calculator;
}

export function CalculatorMiniPreview({ calculator }: CalculatorMiniPreviewProps) {
  const result = useMemo(() => {
    // Build params from all input defaults (primary + advanced)
    const params: Record<string, number | string> = {};
    for (const input of calculator.inputs.primary) {
      params[input.urlKey] = input.default;
    }
    if (calculator.inputs.advanced) {
      for (const input of calculator.inputs.advanced) {
        params[input.urlKey] = input.default;
      }
    }
    const compute = getCalculatorCompute(calculator.mathModule);
    return compute(params);
  }, [calculator]);

  // Find the primary output config
  const primaryOutput = calculator.outputs.find((o) => o.primary);

  // Budget calculator special case: show triple output
  const isBudget = calculator.mathModule === 'budget';
  const outputDisplay = isBudget
    ? `${formatCurrency(result.outputs.needs)} · ${formatCurrency(result.outputs.wants)} · ${formatCurrency(result.outputs.savings)}`
    : primaryOutput
      ? formatByType(result.outputs[primaryOutput.key], primaryOutput.format)
      : '';
  const outputLabel = isBudget
    ? '50/30/20 breakdown'
    : primaryOutput?.label ?? '';

  return (
    <aside aria-label="Try the calculator">
      <Card className="bg-accent/[0.03]">
        <CardContent className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Try it now
          </p>

          <h3 className="text-base font-semibold">{calculator.title}</h3>

          <div className="flex flex-col gap-1.5">
            {calculator.inputs.primary.map((input) => (
              <div
                key={input.name}
                className="flex items-center justify-between rounded-[calc(var(--radius)-2px)] bg-background px-3 py-2 text-[0.8125rem]"
              >
                <span className="text-muted-foreground">{input.label}</span>
                <span className="font-semibold">
                  {input.type === 'select'
                    ? (input.options?.find((o) => String(o.value) === String(input.default))?.label ?? String(input.default))
                    : formatInputDefault(input.default, input.type)}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-[calc(var(--radius)-2px)] bg-background p-4 text-center">
            <p className={`font-bold text-accent ${isBudget ? 'text-[1.125rem]' : 'text-[1.75rem]'}`}>
              {outputDisplay}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{outputLabel}</p>
          </div>

          <Link
            href={`/calculators/${calculator.slug}`}
            className="flex items-center justify-center gap-1 text-sm font-medium text-accent"
          >
            Open full calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}

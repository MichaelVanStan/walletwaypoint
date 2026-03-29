'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCalculatorCompute } from '@/lib/calculators/registry';
import { formatByType, formatCurrency, formatPercent, formatYears, formatNumber } from '@/lib/calculators/formatters';
import type { CalculatorConfig, InputConfig, OutputConfig } from '@/lib/calculators/types';

const categoryIcons: Record<string, string> = {
  home: 'Home',
  savings: 'PiggyBank',
  loans: 'Coins',
  retirement: 'TrendingUp',
  budget: 'Wallet',
  tax: 'Receipt',
};

const categoryLabels: Record<string, string> = {
  home: 'Home',
  savings: 'Savings',
  loans: 'Loans',
  retirement: 'Retire',
  budget: 'Budget',
  tax: 'Taxes',
};

function getCategoryIcon(category: string): LucideIcon {
  const iconName = categoryIcons[category] || 'Calculator';
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || ArrowRight;
}

function formatInputValue(input: InputConfig): string {
  const val = input.default;
  switch (input.type) {
    case 'currency': return formatCurrency(val);
    case 'percent': return formatPercent(val);
    case 'years': return formatYears(val);
    case 'number': return formatNumber(val);
    case 'select': {
      const opt = input.options?.find(o => String(o.value) === String(val));
      return opt?.label || String(val);
    }
    default: return String(val);
  }
}

function computePreview(config: CalculatorConfig) {
  const params: Record<string, number | string> = {};
  for (const input of config.inputs.primary) {
    params[input.urlKey] = input.default;
  }
  if (config.inputs.advanced) {
    for (const input of config.inputs.advanced) {
      params[input.urlKey] = input.default;
    }
  }
  try {
    const compute = getCalculatorCompute(config.mathModule);
    return compute(params);
  } catch {
    return null;
  }
}

interface CalculatorBrowseProps {
  calculators: CalculatorConfig[];
}

export function CalculatorBrowse({ calculators }: CalculatorBrowseProps) {
  const defaultCalc = calculators.find(c => c.slug === 'compound-interest') || calculators[0];
  const [hoveredSlug, setHoveredSlug] = useState(defaultCalc?.slug || '');

  const activeCalc = calculators.find(c => c.slug === hoveredSlug) || calculators[0];

  const preview = useMemo(() => {
    if (!activeCalc) return null;
    return computePreview(activeCalc);
  }, [activeCalc]);

  const primaryOutput = activeCalc?.outputs.find((o: OutputConfig) => o.primary) || activeCalc?.outputs[0];

  return (
    <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-10 items-start">
      {/* Left — Browse list */}
      <div className="flex flex-col">
        {calculators.map((calc, i) => {
          const Icon = getCategoryIcon(calc.category);
          const isActive = calc.slug === hoveredSlug;
          return (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-colors border-b border-foreground/[0.04] last:border-b-0 ${
                isActive ? 'bg-accent/[0.04]' : 'hover:bg-accent/[0.02]'
              }`}
              onMouseEnter={() => setHoveredSlug(calc.slug)}
            >
              <span className="text-xl font-extrabold text-accent/15 w-8 text-center shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/[0.08]">
                <Icon className="size-[18px] text-accent" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[0.9375rem] font-semibold">{calc.title}</span>
                <span className="block text-xs text-muted-foreground truncate">{calc.description}</span>
              </span>
              <Badge variant="secondary" className="shrink-0 max-lg:hidden">
                {categoryLabels[calc.category] || calc.category}
              </Badge>
              <ArrowRight className="size-4 text-muted-foreground shrink-0 lg:hidden" />
            </Link>
          );
        })}
      </div>

      {/* Right — Sticky preview sidebar (desktop only) */}
      <div className="hidden lg:block sticky top-24">
        {activeCalc && preview && primaryOutput && (
          <div className="rounded-xl bg-accent/[0.03] ring-1 ring-foreground/10 p-6 flex flex-col gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Preview
            </p>
            <h3 className="text-base font-semibold">{activeCalc.title}</h3>

            {/* Input defaults */}
            <div className="flex flex-col gap-2">
              {activeCalc.inputs.primary.map((input: InputConfig) => (
                <div
                  key={input.name}
                  className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-[0.8125rem]"
                >
                  <span className="text-muted-foreground">{input.label}</span>
                  <span className="font-semibold">{formatInputValue(input)}</span>
                </div>
              ))}
            </div>

            {/* Primary output */}
            <div className="text-center rounded-lg bg-background px-4 py-4">
              <div className="text-2xl font-bold text-accent">
                {formatByType(preview.outputs[primaryOutput.key], primaryOutput.format)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{primaryOutput.label}</div>
            </div>

            {/* CTA */}
            <Link
              href={`/calculators/${activeCalc.slug}`}
              className="flex items-center justify-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Try this calculator
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

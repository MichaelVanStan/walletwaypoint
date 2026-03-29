'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCalculatorCompute } from '@/lib/calculators/registry';
import { formatCurrency, formatPercent } from '@/lib/calculators/formatters';
import { Card, CardContent } from '@/components/ui/card';

interface CarouselCalc {
  title: string;
  slug: string;
  mathModule: string;
  params: Record<string, number | string>;
  inputs: { label: string; value: string }[];
  outputKey: string;
  outputLabel: string;
  formatOutput: (value: number) => string;
}

const CALCS: CarouselCalc[] = [
  {
    title: 'Compound Interest',
    slug: 'compound-interest',
    mathModule: 'compound-interest',
    params: { initial: 10000, monthly: 500, rate: 7, years: 20 },
    inputs: [
      { label: 'Initial Amount', value: formatCurrency(10000) },
      { label: 'Monthly Add', value: formatCurrency(500) },
      { label: 'Annual Return', value: formatPercent(7, 0) },
      { label: 'Time Period', value: '20 years' },
    ],
    outputKey: 'futureValue',
    outputLabel: 'Projected balance',
    formatOutput: (v) => formatCurrency(v),
  },
  {
    title: 'Mortgage Payment',
    slug: 'mortgage-payment',
    mathModule: 'mortgage',
    params: { price: 415000, dp: 20, rate: 6.5, term: 30, tax: 1.1, ins: 1500 },
    inputs: [
      { label: 'Home Price', value: formatCurrency(415000) },
      { label: 'Down Payment', value: formatPercent(20, 0) },
      { label: 'Interest Rate', value: formatPercent(6.5, 1) },
      { label: 'Loan Term', value: '30 yr' },
    ],
    outputKey: 'monthlyPayment',
    outputLabel: 'Estimated monthly payment',
    formatOutput: (v) => `${formatCurrency(v)}/mo`,
  },
  {
    title: 'Retirement Calculator',
    slug: 'retirement',
    mathModule: 'retirement',
    params: { age: 30, retireAge: 65, savings: 50000, monthly: 500, returnRate: 7, withdrawalRate: 4 },
    inputs: [
      { label: 'Current Age', value: '30' },
      { label: 'Retire At', value: '65' },
      { label: 'Current Savings', value: formatCurrency(50000) },
      { label: 'Monthly Saving', value: formatCurrency(500) },
    ],
    outputKey: 'retirementBalance',
    outputLabel: 'Projected retirement balance',
    formatOutput: (v) => formatCurrency(v),
  },
  {
    title: 'Rent vs. Buy',
    slug: 'rent-vs-buy',
    mathModule: 'rent-vs-buy',
    params: { rent: 1800, price: 415000, dp: 20, rate: 6.5, years: 30, appreciation: 3, rentIncrease: 3 },
    inputs: [
      { label: 'Monthly Rent', value: formatCurrency(1800) },
      { label: 'Home Price', value: formatCurrency(415000) },
      { label: 'Interest Rate', value: formatPercent(6.5, 1) },
      { label: 'Time Horizon', value: '30 years' },
    ],
    outputKey: 'buyTotalCost',
    outputLabel: 'Buying total cost over 30 years',
    formatOutput: (v) => formatCurrency(v),
  },
  {
    title: 'Budget Calculator',
    slug: 'budget',
    mathModule: 'budget',
    params: { income: 7000 },
    inputs: [
      { label: 'Monthly Income', value: formatCurrency(7000) },
    ],
    outputKey: 'needs',
    outputLabel: '50/30/20 breakdown',
    formatOutput: () => '',
  },
];

const INTERVAL = 3500;

export function CalculatorCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const results = useMemo(() => {
    return CALCS.map((calc) => {
      const compute = getCalculatorCompute(calc.mathModule);
      return compute(calc.params);
    });
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % CALCS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, advance]);

  const calc = CALCS[active];
  const result = results[active];

  // Budget gets special output formatting
  const outputDisplay =
    calc.mathModule === 'budget'
      ? `${formatCurrency(result.outputs.needs)} · ${formatCurrency(result.outputs.wants)} · ${formatCurrency(result.outputs.savings)}`
      : calc.formatOutput(result.outputs[calc.outputKey]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Card className="bg-accent/[0.03]">
        <CardContent className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Try it now
          </p>

          {/* Slide content with fade — active slide is relative to size the container */}
          <div className="relative">
            {CALCS.map((c, i) => (
              <div
                key={c.slug}
                className={`flex flex-col gap-4 transition-opacity duration-500 ${
                  i === active
                    ? 'relative opacity-100'
                    : 'absolute inset-0 opacity-0 pointer-events-none'
                }`}
              >
                <h3 className="text-base font-semibold">{c.title}</h3>

                <div className="flex flex-col gap-1.5">
                  {c.inputs.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-[calc(var(--radius)-2px)] bg-background px-3 py-2 text-[0.8125rem]"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-[calc(var(--radius)-2px)] bg-background p-4 text-center">
                  <p className={`font-bold text-accent ${
                    c.mathModule === 'budget' ? 'text-[1.125rem]' : 'text-[1.75rem]'
                  }`}>
                    {c.mathModule === 'budget'
                      ? `${formatCurrency(results[i].outputs.needs)} · ${formatCurrency(results[i].outputs.wants)} · ${formatCurrency(results[i].outputs.savings)}`
                      : c.formatOutput(results[i].outputs[c.outputKey])}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.outputLabel}
                  </p>
                </div>

                <Link
                  href={`/calculators/${c.slug}`}
                  className="flex items-center justify-center gap-1 text-sm font-medium text-accent"
                >
                  Open full calculator
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5">
            {CALCS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show ${CALCS[i].title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-5 bg-accent'
                    : 'w-1.5 bg-accent/20 hover:bg-accent/40'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCalculatorCompute } from '@/lib/calculators/registry';
import { formatCurrency, formatPercent } from '@/lib/calculators/formatters';
import { Card, CardContent } from '@/components/ui/card';

const DEFAULTS = {
  price: 415_000,
  dp: 20,
  rate: 6.5,
  term: 30,
  tax: 1.1,
  ins: 1500,
};

export function MortgagePreview() {
  const result = useMemo(() => {
    const compute = getCalculatorCompute('mortgage');
    return compute(DEFAULTS);
  }, []);

  const inputRows = [
    { label: 'Home Price', value: formatCurrency(DEFAULTS.price) },
    { label: 'Down Payment', value: formatPercent(DEFAULTS.dp, 0) },
    { label: 'Interest Rate', value: formatPercent(DEFAULTS.rate, 1) },
    { label: 'Loan Term', value: `${DEFAULTS.term} yr` },
  ];

  return (
    <Card className="bg-accent/[0.03]">
      <CardContent className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Try it now
        </p>
        <h3 className="text-base font-semibold">Mortgage Payment</h3>

        <div className="flex flex-col gap-1.5">
          {inputRows.map((row) => (
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
          <p className="text-[1.75rem] font-bold text-accent">
            {formatCurrency(result.outputs.monthlyPayment)}/mo
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Estimated monthly payment
          </p>
        </div>

        <Link
          href="/calculators/mortgage-payment"
          className="flex items-center justify-center gap-1 text-sm font-medium text-accent"
        >
          Open full calculator
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

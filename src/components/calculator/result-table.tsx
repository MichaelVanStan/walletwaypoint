'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DtiBadge } from './dti-badge';
import { GuidanceBanner } from './guidance-banner';
import { formatCurrency } from '@/lib/calculators/formatters';

interface TierData {
  /** Tier label: "Conservative", "Moderate", "Aggressive" */
  label: string;
  /** DTI rule string: "28/36", "30/43", "35/50" */
  dtiRule: string;
  /** Maximum affordable home price */
  maxHomePrice: number;
  /** Monthly mortgage payment */
  monthlyPayment: number;
  /** Housing (front-end) DTI percentage */
  housingDti: number;
  /** Total (back-end) DTI percentage */
  totalDti: number;
  /** Down payment dollar amount */
  downPaymentAmount: number;
  /** Estimated monthly disposable income, or null if no state persisted */
  estimatedDisposableIncome: number | null;
}

interface ResultTableProps {
  /** Array of tier data (conservative, moderate, aggressive) */
  tiers: TierData[];
  /** Whether a state is persisted for net income calculation */
  hasPersistedState: boolean;
  /** Message for the guidance banner below the table */
  guidanceMessage: string;
}

/**
 * Home affordability comparison table (D-10).
 *
 * Displays tiers as columns and financial metrics as rows.
 * Uses DtiBadge for color-coded DTI values and GuidanceBanner below.
 *
 * Responsive: scrolls horizontally on mobile with sticky first column.
 */
export function ResultTable({
  tiers,
  hasPersistedState,
  guidanceMessage,
}: ResultTableProps) {
  const metrics = [
    { key: 'maxHomePrice', label: 'Max Home Price', format: 'currency', bold: true },
    { key: 'monthlyPayment', label: 'Monthly Payment', format: 'currency', bold: false },
    { key: 'housingDti', label: 'Housing DTI', format: 'dti-housing', bold: false },
    { key: 'totalDti', label: 'Total DTI', format: 'dti-total', bold: false },
    { key: 'downPaymentAmount', label: 'Down Payment', format: 'currency', bold: false },
    { key: 'estimatedDisposableIncome', label: 'Est. Monthly Disposable Income', format: 'disposable', bold: false },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Table container with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="sticky left-0 z-10 bg-muted/50 min-w-[160px]">
                Metric
              </TableHead>
              {tiers.map((tier) => {
                const [housing, total] = tier.dtiRule.split('/');
                return (
                  <TableHead key={tier.label} className="min-w-[140px] text-center">
                    <div className="font-semibold">{tier.label}</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      {housing}% housing / {total}% total
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.key}>
                <TableCell className="sticky left-0 z-10 bg-background text-sm font-medium text-muted-foreground">
                  {metric.label}
                </TableCell>
                {tiers.map((tier) => {
                  const value = tier[metric.key as keyof TierData];

                  // Currency formatting
                  if (metric.format === 'currency') {
                    return (
                      <TableCell
                        key={tier.label}
                        className={`text-center ${metric.bold ? 'text-base font-bold text-foreground' : ''}`}
                      >
                        {formatCurrency(value as number)}
                      </TableCell>
                    );
                  }

                  // DTI badge formatting
                  if (metric.format === 'dti-housing') {
                    return (
                      <TableCell key={tier.label} className="text-center">
                        <DtiBadge value={value as number} type="housing" />
                      </TableCell>
                    );
                  }

                  if (metric.format === 'dti-total') {
                    return (
                      <TableCell key={tier.label} className="text-center">
                        <DtiBadge value={value as number} type="total" />
                      </TableCell>
                    );
                  }

                  // Disposable income: show value or empty-state link
                  if (metric.format === 'disposable') {
                    const disposable = value as number | null;
                    if (!hasPersistedState || disposable === null) {
                      return (
                        <TableCell
                          key={tier.label}
                          className="text-center text-sm text-muted-foreground"
                        >
                          <Link
                            href="/calculators/paycheck"
                            className="text-[oklch(0.55_0.12_175)] underline underline-offset-2 hover:text-[oklch(0.45_0.12_175)]"
                          >
                            Set your state for a more accurate take-home estimate
                          </Link>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={tier.label} className="text-center">
                        {formatCurrency(disposable)}
                      </TableCell>
                    );
                  }

                  return null;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Guidance banner below table */}
      <GuidanceBanner message={guidanceMessage} />
    </div>
  );
}

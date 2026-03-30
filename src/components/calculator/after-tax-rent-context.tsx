'use client';

import { useQueryStates } from 'nuqs';
import { rentParams } from '@/lib/calculators/url-params';
import { calculateFederalTax } from '@/lib/calculators/math/tax';
import { calculateFica } from '@/lib/calculators/math/paycheck';
import { Info } from 'lucide-react';

interface AfterTaxRentContextProps {
  stateAbbreviation: string;
  stateName: string;
  /** State income tax rate (flat) or top marginal rate, as a percent */
  estimatedStateRate: number;
  /** Whether the state has income tax */
  hasIncomeTax: boolean;
  /** Median 1BR rent in this city */
  median1BR: number;
  cityName: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Shows after-tax affordability context on city rent pages.
 *
 * Reads the user's monthly gross income from the rent calculator URL params,
 * computes federal + state + FICA taxes, and shows what percentage of
 * take-home pay the city's median 1BR rent represents.
 */
export function AfterTaxRentContext({
  stateAbbreviation,
  stateName,
  estimatedStateRate,
  hasIncomeTax,
  median1BR,
  cityName,
}: AfterTaxRentContextProps) {
  const [values] = useQueryStates(rentParams, { throttleMs: 200 });
  const monthlyGross = values.income;
  const annualGross = monthlyGross * 12;

  // Federal tax
  const federalResult = calculateFederalTax(annualGross, 'single');
  const federalTax = federalResult.totalTax;

  // State tax (simplified: use estimated rate on full income)
  const stateTax = hasIncomeTax
    ? Math.round(annualGross * estimatedStateRate / 100)
    : 0;

  // FICA
  const fica = calculateFica(annualGross);

  const totalAnnualTax = federalTax + stateTax + fica.totalFica;
  const annualTakeHome = annualGross - totalAnnualTax;
  const monthlyTakeHome = Math.round(annualTakeHome / 12);

  const rentPctOfTakeHome = monthlyTakeHome > 0
    ? Math.round((median1BR / monthlyTakeHome) * 100)
    : 0;

  const rentPctOfGross = monthlyGross > 0
    ? Math.round((median1BR / monthlyGross) * 100)
    : 0;

  const isStretched = rentPctOfTakeHome > 35;
  const isComfortable = rentPctOfTakeHome <= 28;

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-5">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            After-Tax Reality in {cityName}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-md bg-background border border-border p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Monthly Gross
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(monthlyGross)}
              </p>
            </div>
            <div className="rounded-md bg-background border border-border p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                After-Tax Take-Home
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(monthlyTakeHome)}
              </p>
              <p className="text-xs text-muted-foreground">
                Fed {formatCurrency(Math.round(federalTax / 12))}
                {hasIncomeTax && <> + {stateAbbreviation} {formatCurrency(Math.round(stateTax / 12))}</>}
                {' '}+ FICA {formatCurrency(Math.round(fica.totalFica / 12))}
              </p>
            </div>
            <div className={`rounded-md border p-3 ${
              isStretched
                ? 'border-orange-300/60 bg-orange-50/50 dark:border-orange-500/30 dark:bg-orange-950/20'
                : isComfortable
                ? 'border-green-300/60 bg-green-50/50 dark:border-green-500/30 dark:bg-green-950/20'
                : 'border-border bg-background'
            }`}>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Median 1BR vs Take-Home
              </p>
              <p className={`mt-1 text-lg font-bold ${
                isStretched
                  ? 'text-orange-600 dark:text-orange-400'
                  : isComfortable
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-foreground'
              }`}>
                {rentPctOfTakeHome}% of take-home
              </p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(median1BR)}/mo ({rentPctOfGross}% of gross)
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {isStretched
              ? `At ${rentPctOfTakeHome}% of take-home pay, the median 1BR in ${cityName} would be a stretch. Consider roommates, a studio, or neighborhoods with lower rents.`
              : isComfortable
              ? `At ${rentPctOfTakeHome}% of take-home pay, the median 1BR in ${cityName} is within the recommended 28% guideline. You'd have room for savings and other expenses.`
              : `At ${rentPctOfTakeHome}% of take-home pay, the median 1BR in ${cityName} is manageable but close to the comfort limit. Budget carefully for other expenses.`
            }
            {!hasIncomeTax && ` ${stateName} has no state income tax, which helps your take-home pay.`}
          </p>
        </div>
      </div>
    </div>
  );
}

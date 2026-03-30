'use client';

import { Badge } from '@/components/ui/badge';

interface DtiBadgeProps {
  /** DTI percentage value (e.g., 28 means 28%) */
  value: number;
  /** Determines which thresholds to apply */
  type: 'housing' | 'total';
}

/**
 * Color-coded DTI badge (D-11).
 *
 * Housing DTI thresholds: green (<28%), amber (28-35%), red (>35%)
 * Total DTI thresholds: green (<36%), amber (36-43%), red (>43%)
 *
 * Uses OKLCH colors from UI-SPEC semantic tokens.
 * Includes text labels ("Safe", "Caution", "High") per accessibility requirements
 * -- color is not the sole indicator.
 */
export function DtiBadge({ value, type }: DtiBadgeProps) {
  const rounded = Math.round(value * 10) / 10;

  let status: 'safe' | 'caution' | 'danger';
  if (type === 'housing') {
    if (rounded < 28) status = 'safe';
    else if (rounded <= 35) status = 'caution';
    else status = 'danger';
  } else {
    // total DTI
    if (rounded < 36) status = 'safe';
    else if (rounded <= 43) status = 'caution';
    else status = 'danger';
  }

  const statusLabels = {
    safe: 'Safe',
    caution: 'Caution',
    danger: 'High',
  } as const;

  const statusDescriptions = {
    safe: 'within safe range',
    caution: 'approaching limit',
    danger: 'above recommended limit',
  } as const;

  const colorClasses = {
    safe: 'bg-[oklch(0.55_0.15_145)]/10 text-[oklch(0.55_0.15_145)]',
    caution: 'bg-[oklch(0.7_0.15_85)]/10 text-[oklch(0.7_0.15_85)]',
    danger: 'bg-destructive/10 text-destructive',
  } as const;

  const typeLabel = type === 'housing' ? 'Housing' : 'Total';
  const ariaLabel = `${typeLabel} DTI ${rounded}% -- ${statusDescriptions[status]}`;

  return (
    <Badge
      className={`${colorClasses[status]} border-transparent text-xs font-semibold`}
      aria-label={ariaLabel}
    >
      {rounded}% {statusLabels[status]}
    </Badge>
  );
}

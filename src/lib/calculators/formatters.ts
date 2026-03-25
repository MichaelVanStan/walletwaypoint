/** Format a number as USD currency string (no cents by default) */
export function formatCurrency(value: number, showCents = false): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(value);
}

/** Format a number as percentage string */
export function formatPercent(value: number, decimals = 2): string {
  return `${Number(value.toFixed(decimals))}%`;
}

/** Format a number with commas */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format years as "X years" */
export function formatYears(value: number): string {
  return `${value} year${value !== 1 ? 's' : ''}`;
}

/** Format by output type */
export function formatByType(value: number, format: 'currency' | 'percent' | 'number' | 'years'): string {
  switch (format) {
    case 'currency': return formatCurrency(value);
    case 'percent': return formatPercent(value);
    case 'years': return formatYears(value);
    case 'number': return formatNumber(value);
  }
}

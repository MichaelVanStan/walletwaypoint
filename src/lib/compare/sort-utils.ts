import type { SortDirection } from './product-types';

export function sortProducts<T extends Record<string, unknown>>(
  products: T[],
  column: string | null,
  direction: SortDirection,
): T[] {
  if (!column) return products;

  return [...products].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];

    // Handle nullish values -- push to end
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    let result: number;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      result = aVal - bVal;
    } else {
      result = String(aVal).localeCompare(String(bVal));
    }

    return direction === 'desc' ? -result : result;
  });
}

import { formatCurrency, formatPercent } from './formatters';

/** Context values for enriching interpretations */
const US_MEDIAN_HOUSEHOLD_INCOME_MONTHLY = 7000; // ~$84K/yr
const US_MEDIAN_INDIVIDUAL_INCOME_MONTHLY = 5500; // ~$66K/yr

/**
 * Generate income percentage context for mortgage/rent interpretations.
 * Returns a string like "about 36% of the median US household income"
 */
export function incomePercentContext(monthlyAmount: number): string {
  const pct = (monthlyAmount / US_MEDIAN_HOUSEHOLD_INCOME_MONTHLY * 100).toFixed(0);
  return `about ${pct}% of the median US household income`;
}

/**
 * Generate a friendly summary for any calculator result.
 * Falls back to a generic pattern if no specific template matches.
 *
 * Currently returns empty string -- the primary interpretation comes from
 * the math module's CalculatorResults.interpretation field. This function
 * exists as a centralized helper if needed for cross-calculator
 * interpretation patterns or for overriding/enriching the math module output.
 */
export function generateInterpretation(
  _mathModule: string,
  _inputs: Record<string, number | string>,
  _outputs: Record<string, number>
): string {
  return '';
}

export { US_MEDIAN_HOUSEHOLD_INCOME_MONTHLY, US_MEDIAN_INDIVIDUAL_INCOME_MONTHLY };

/** Input field configuration from YAML calculator config */
export interface InputConfig {
  name: string;
  label: string;
  type: 'currency' | 'percent' | 'years' | 'number' | 'select';
  min: number;
  max: number;
  step: number;
  default: number;
  hint?: string;
  urlKey: string;
  /** Options for 'select' type inputs (e.g., filing status dropdown) */
  options?: Array<{ value: string; label: string }>;
  /** Tooltip explanation for financial jargon */
  tooltip?: string;
  /** Optional unit toggle for progressive disclosure (e.g., years ↔ months) */
  unitToggle?: {
    primary: { label: string; suffix: string };
    alternate: { label: string; suffix: string; multiplier: number };
  };
}

/** Chart configuration from YAML calculator config */
export interface ChartConfig {
  type: 'area' | 'pie' | 'line' | 'bar';
  title: string;
  dataKey: string;
}

/** Output field configuration from YAML calculator config */
export interface OutputConfig {
  key: string;
  label: string;
  format: 'currency' | 'percent' | 'number' | 'years';
  primary?: boolean;
  /** How to color-code deltas in comparison mode */
  deltaSemantic?: 'lower_is_better' | 'higher_is_better' | 'neutral';
}

/** Action callout card configuration */
export interface CalloutConfig {
  title: string;
  href: string;
  icon?: string;
}

/** Interpretation template configuration */
export interface InterpretationConfig {
  template: string;
  contextLabel: string;
}

/** SEO configuration per calculator */
export interface SeoConfig {
  schemaType: string;
  applicationCategory: string;
}

/** Full calculator configuration (matches Velite output shape) */
export interface CalculatorConfig {
  slug: string;
  title: string;
  description: string;
  category: 'home' | 'savings' | 'loans' | 'retirement' | 'budget' | 'tax';
  inputs: {
    primary: InputConfig[];
    advanced?: InputConfig[];
  };
  charts: ChartConfig[];
  outputs: OutputConfig[];
  seo: SeoConfig;
  callouts: CalloutConfig[];
  interpretation: InterpretationConfig;
  mathModule: string;
}

/** Generic calculator results shape */
export interface CalculatorResults {
  /** Key-value pairs matching OutputConfig keys to computed values */
  outputs: Record<string, number>;
  /** Chart data arrays keyed by ChartConfig dataKey. Points may include _breakdown metadata for tooltips. */
  chartData: Record<string, Array<Record<string, number | string | unknown>>>;
  /** Plain-English interpretation string */
  interpretation: string;
  /** Detail breakdown rows for expandable table */
  detailRows?: Array<Record<string, string | number>>;
  /** Detail table column headers */
  detailColumns?: Array<{ key: string; label: string; format?: 'currency' | 'percent' | 'number' }>;
}

/** Comparison delta between two scenarios */
export interface ComparisonDelta {
  key: string;
  label: string;
  valueA: number;
  valueB: number;
  delta: number;
  format: 'currency' | 'percent' | 'number' | 'years';
  /** positive = B is better/cheaper, negative = B is worse/more expensive */
  direction: 'positive' | 'negative' | 'neutral';
}

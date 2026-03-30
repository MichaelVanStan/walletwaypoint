export interface TaxBracket {
  min: number;
  max: number;   // Infinity for top bracket
  rate: number;  // percentage (e.g., 10 means 10%)
}

export interface ProgressiveTaxResult {
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  bracketDetails: Array<{
    rate: number;
    rangeMin: number;
    rangeMax: number;
    taxableAtRate: number;
    taxAtRate: number;
  }>;
}

export interface PersistedState {
  abbreviation: string;  // e.g., "CA"
  slug: string;          // e.g., "california"
  name: string;          // e.g., "California"
}

export interface FicaResult {
  socialSecurity: number;
  medicare: number;
  totalFica: number;
}

export interface StateFaq {
  question: string;
  answer: string;
}

export interface StateTaxData {
  slug: string;
  name: string;
  abbreviation: string;
  taxYear: number;
  lastVerified: string;
  dataSource: string;
  revenueAuthorityUrl: string;
  hasIncomeTax: boolean;
  taxType: 'graduated' | 'flat' | 'none';
  brackets?: {
    single: TaxBracket[];
    married: TaxBracket[];
    head: TaxBracket[];
  };
  flatRate?: number;
  standardDeductions?: {
    single: number;
    married: number;
    head: number;
  };
  personalExemptions?: {
    single: number;
    married: number;
    dependent: number;
  };
  topRate: number;
  numberOfBrackets: number;
  editorialTitle: string;
  editorialDescription: string;
  editorialContent: string;
  faqs: StateFaq[];
  tips: string[];
  propertyTaxRate?: number;
  salesTaxRate?: number;
  costOfLivingIndex?: number;
}

export interface CityRentData {
  slug: string;
  cityName: string;
  stateName: string;
  stateAbbreviation: string;
  medianRents: {
    studio: number;
    oneBed: number;
    twoBed: number;
    threeBed: number;
    fourBed: number;
  };
  dataSource: string;
  dataYear: number;
  lastVerified: string;
  editorialTitle: string;
  editorialDescription: string;
  editorialContent: string;
  faqs: StateFaq[];
  costContext: string;
}

export interface HomebuyerProgram {
  name: string;
  adminAgency: string;
  assistanceType: string;
  amount: string;
  incomeLimits: string;
  eligibleAreas: string;
  firstTimeBuyerRequired: boolean;
  url: string;
}

export interface HomebuyerProgramData {
  slug: string;
  stateName: string;
  stateAbbreviation: string;
  programs: HomebuyerProgram[];
  editorialTitle: string;
  editorialDescription: string;
  editorialContent: string;
  faqs: StateFaq[];
  lastVerified: string;
  dataSource: string;
}

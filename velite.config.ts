import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const bracketSchema = s.object({
  min: s.number(),
  max: s.number(),
  rate: s.number(),
});

const faqSchema = s.object({
  question: s.string(),
  answer: s.string(),
});

const inputOptionSchema = s.object({
  value: s.string(),
  label: s.string(),
});

const inputConfigSchema = s.object({
  name: s.string(),
  label: s.string(),
  type: s.enum(['currency', 'percent', 'years', 'number', 'select']),
  min: s.number(),
  max: s.number(),
  step: s.number(),
  default: s.number(),
  hint: s.string().optional(),
  urlKey: s.string(),
  options: s.array(inputOptionSchema).optional(),
  tooltip: s.string().optional(),
  unitToggle: s.object({
    primary: s.object({ label: s.string(), suffix: s.string() }),
    alternate: s.object({ label: s.string(), suffix: s.string(), multiplier: s.number() }),
  }).optional(),
});

const chartConfigSchema = s.object({
  type: s.enum(['area', 'pie', 'line', 'bar']),
  title: s.string(),
  dataKey: s.string(),
});

const outputConfigSchema = s.object({
  key: s.string(),
  label: s.string(),
  format: s.enum(['currency', 'percent', 'number', 'years']),
  primary: s.boolean().optional(),
  deltaSemantic: s.enum(['lower_is_better', 'higher_is_better', 'neutral']).optional(),
});

const calloutConfigSchema = s.object({
  title: s.string(),
  href: s.string(),
  icon: s.string().optional(),
});

const interpretationConfigSchema = s.object({
  template: s.string(),
  contextLabel: s.string(),
});

const seoConfigSchema = s.object({
  schemaType: s.string().default('WebApplication'),
  applicationCategory: s.string().default('FinanceApplication'),
});

const calculators = defineCollection({
  name: 'Calculator',
  pattern: 'calculators/*.yaml',
  schema: s.object({
    slug: s.slug('calculators'),
    title: s.string(),
    description: s.string(),
    category: s.enum(['home', 'savings', 'loans', 'retirement', 'budget', 'tax', 'auto']),
    inputs: s.object({
      primary: s.array(inputConfigSchema),
      advanced: s.array(inputConfigSchema).optional(),
    }),
    charts: s.array(chartConfigSchema),
    outputs: s.array(outputConfigSchema),
    seo: seoConfigSchema,
    callouts: s.array(calloutConfigSchema),
    interpretation: interpretationConfigSchema,
    mathModule: s.string(),
    resultLayout: s.enum(['cards', 'table']).default('cards').optional(),
    faqs: s.array(faqSchema).optional(),
    narrative: s.object({
      heroKey: s.string(),
      heroLabel: s.string().optional(),
      heroSubtitle: s.string().optional(),
      sections: s.array(s.object({
        label: s.string(),
        color: s.enum(['green', 'orange', 'blue', 'red', 'purple', 'muted']),
        content: s.enum(['chart', 'stats', 'breakdown', 'table', 'plans', 'comparison', 'custom']),
        chartKey: s.string().optional(),
        statKeys: s.array(s.string()).optional(),
        prose: s.string().optional(),
      })),
      tip: s.string().optional(),
      showDetailTable: s.boolean().optional(),
    }).optional(),
  }),
});

const guides = defineCollection({
  name: 'Guide',
  pattern: 'guides/*.mdx',
  schema: s.object({
    slug: s.slug('guides'),
    title: s.string().max(120),
    description: s.string().max(300),
    calculator: s.string(),
    hub: s.string(),
    lastUpdated: s.isodate(),
    keyTakeaways: s.array(s.string()),
    faqs: s.array(faqSchema),
    relatedGuides: s.array(s.string()).optional(),
    metadata: s.metadata(),
    body: s.mdx(),
  }),
});

const hubs = defineCollection({
  name: 'Hub',
  pattern: 'hubs/*.yaml',
  schema: s.object({
    slug: s.slug('hubs'),
    name: s.string(),
    tagline: s.string(),
    description: s.string(),
    icon: s.string(),
    accentColor: s.string(),
    intro: s.string().optional(),
    calculatorSlugs: s.array(s.string()),
    guideSlugs: s.array(s.string()),
    tips: s.array(s.object({
      title: s.string(),
      description: s.string(),
    })),
    nextSteps: s.array(s.object({
      hubSlug: s.string(),
      label: s.string(),
    })),
  }),
});

const glossary = defineCollection({
  name: 'GlossaryTerm',
  pattern: 'glossary.yaml',
  single: true,
  schema: s.object({
    terms: s.array(s.object({
      term: s.string(),
      slug: s.slug('glossary'),
      definition: s.string().max(300),
      longDefinition: s.string().optional(),
    })),
  }),
});

const productItemSchema = s.object({
  id: s.string(),
  name: s.string(),
  issuer: s.string(),
  bestFor: s.string().optional(),
  affiliateUrl: s.string(),
  destinationUrl: s.string(),
  utmSource: s.string().default('walletwaypoint'),
  utmMedium: s.string().default('comparison_table'),
  utmCampaign: s.string(),
  hasAffiliate: s.boolean().default(true),
  imageUrl: s.string().optional(),
  // Credit card fields
  apr: s.string().optional(),
  annualFee: s.number().optional(),
  rewardsType: s.enum(['cash-back', 'travel', 'points', 'balance-transfer']).optional(),
  rewardsRate: s.string().optional(),
  signupBonus: s.string().optional(),
  creditScoreMin: s.number().optional(),
  creditScoreRange: s.enum(['excellent', 'good', 'fair']).optional(),
  // Personal loan fields
  aprLow: s.number().optional(),
  aprHigh: s.number().optional(),
  loanAmountMin: s.number().optional(),
  loanAmountMax: s.number().optional(),
  termMin: s.number().optional(),
  termMax: s.number().optional(),
  originationFee: s.string().optional(),
  // Savings fields
  apy: s.number().optional(),
  minimumDeposit: s.number().optional(),
  accountType: s.enum(['high-yield-savings', 'cd']).optional(),
  termMonths: s.number().optional(),
  compounding: s.string().optional(),
  fdic: s.boolean().optional(),
  // Insurance fields
  insuranceType: s.enum(['auto', 'renters']).optional(),
  monthlyPremium: s.string().optional(),
  coverageLevel: s.enum(['basic', 'standard', 'premium']).optional(),
  deductibleMin: s.number().optional(),
  deductibleMax: s.number().optional(),
  coverageHighlights: s.string().optional(),
  // Auto insurance fields
  coverageTypes: s.string().optional(),
  discounts: s.string().optional(),
  amBestRating: s.string().optional(),
  deductible: s.string().optional(),
  // Life insurance fields
  policyType: s.string().optional(),
  termLength: s.string().optional(),
  coverageAmount: s.string().optional(),
  medicalExam: s.string().optional(),
  // Investment platform fields
  accountTypes: s.string().optional(),
  commissions: s.string().optional(),
  minimumInvestment: s.number().optional(),
  managementFee: s.string().optional(),
  features: s.string().optional(),
  // Tax software fields
  priceFree: s.string().optional(),
  pricePremium: s.string().optional(),
  stateFiling: s.string().optional(),
  selfEmployed: s.boolean().optional(),
  auditDefense: s.boolean().optional(),
  importForms: s.string().optional(),
});

const products = defineCollection({
  name: 'Product',
  pattern: 'products/*.yaml',
  schema: s.object({
    category: s.enum(['credit-cards', 'personal-loans', 'savings-accounts', 'insurance', 'auto-insurance', 'life-insurance', 'investment-platforms', 'tax-software']),
    categoryTitle: s.string(),
    categoryDescription: s.string(),
    lastVerified: s.isodate(),
    products: s.array(productItemSchema),
  }),
});

const listicles = defineCollection({
  name: 'Listicle',
  pattern: 'listicles/*.mdx',
  schema: s.object({
    slug: s.slug('listicles'),
    title: s.string().max(120),
    description: s.string().max(300),
    category: s.string(),
    audience: s.string(),
    lastUpdated: s.isodate(),
    relatedCalculator: s.string().optional(),
    relatedCategory: s.string(),
    metadata: s.metadata(),
    body: s.mdx(),
  }),
});

const states = defineCollection({
  name: 'State',
  pattern: 'states/*.yaml',
  schema: s.object({
    slug: s.slug('states'),
    name: s.string(),
    abbreviation: s.string().max(2),
    taxYear: s.number(),
    lastVerified: s.isodate(),
    dataSource: s.string(),
    revenueAuthorityUrl: s.string(),
    hasIncomeTax: s.boolean(),
    taxType: s.enum(['graduated', 'flat', 'none']),
    brackets: s.object({
      single: s.array(bracketSchema),
      married: s.array(bracketSchema),
      head: s.array(bracketSchema),
    }).optional(),
    flatRate: s.number().optional(),
    standardDeductions: s.object({
      single: s.number(),
      married: s.number(),
      head: s.number(),
    }).optional(),
    personalExemptions: s.object({
      single: s.number(),
      married: s.number(),
      dependent: s.number(),
    }).optional(),
    topRate: s.number(),
    numberOfBrackets: s.number(),
    editorialTitle: s.string(),
    editorialDescription: s.string().max(300),
    editorialContent: s.string(),
    faqs: s.array(faqSchema),
    tips: s.array(s.string()),
    propertyTaxRate: s.number().optional(),
    salesTaxRate: s.number().optional(),
    costOfLivingIndex: s.number().optional(),
  }),
});

const cities = defineCollection({
  name: 'City',
  pattern: 'cities/*.yaml',
  schema: s.object({
    slug: s.slug('cities'),
    cityName: s.string(),
    stateName: s.string(),
    stateAbbreviation: s.string().max(2),
    medianRents: s.object({
      studio: s.number(),
      oneBed: s.number(),
      twoBed: s.number(),
      threeBed: s.number(),
      fourBed: s.number(),
    }),
    dataSource: s.string(),
    dataYear: s.number(),
    lastVerified: s.isodate(),
    editorialTitle: s.string(),
    editorialDescription: s.string().max(300),
    editorialContent: s.string(),
    faqs: s.array(faqSchema),
    costContext: s.string(),
  }),
});

const homebuyerProgramSchema = s.object({
  name: s.string(),
  adminAgency: s.string(),
  assistanceType: s.string(),
  amount: s.string(),
  incomeLimits: s.string(),
  eligibleAreas: s.string(),
  firstTimeBuyerRequired: s.boolean(),
  url: s.string(),
});

const homebuyerPrograms = defineCollection({
  name: 'HomebuyerProgram',
  pattern: 'homebuyer-programs/*.yaml',
  schema: s.object({
    slug: s.slug('homebuyer-programs'),
    stateName: s.string(),
    stateAbbreviation: s.string().max(2),
    programs: s.array(homebuyerProgramSchema),
    editorialTitle: s.string(),
    editorialDescription: s.string().max(300),
    editorialContent: s.string(),
    faqs: s.array(faqSchema),
    lastVerified: s.isodate(),
    dataSource: s.string(),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { calculators, guides, hubs, glossary, products, listicles, states, cities, homebuyerPrograms },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend', properties: { className: ['anchor-link'], ariaHidden: true, tabIndex: -1 } }],
    ],
  },
});

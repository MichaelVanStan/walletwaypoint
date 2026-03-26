import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
    category: s.enum(['home', 'savings', 'loans', 'retirement', 'budget', 'tax']),
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
    faqs: s.array(s.object({
      question: s.string(),
      answer: s.string(),
    })),
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

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { calculators, guides, hubs, glossary },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});

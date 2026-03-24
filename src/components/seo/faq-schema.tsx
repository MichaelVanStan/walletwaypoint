import type { WithContext, FAQPage } from 'schema-dts';
import { JsonLd } from './json-ld';

interface FaqSchemaProps {
  items: { question: string; answer: string }[];
}

export function FaqSchema({ items }: FaqSchemaProps) {
  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={jsonLd} />;
}

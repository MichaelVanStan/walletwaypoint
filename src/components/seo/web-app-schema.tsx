import type { WithContext, WebApplication } from 'schema-dts';
import { JsonLd } from './json-ld';

interface WebAppSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}

export function WebAppSchema({
  name,
  description,
  url,
  applicationCategory = 'FinanceApplication',
}: WebAppSchemaProps) {
  const jsonLd: WithContext<WebApplication> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return <JsonLd data={jsonLd} />;
}

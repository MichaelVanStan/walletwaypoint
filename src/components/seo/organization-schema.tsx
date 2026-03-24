import type { WithContext, Organization } from 'schema-dts';
import { JsonLd } from './json-ld';
import { siteConfig } from '@/lib/site-config';

export function OrganizationSchema() {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/logo.png`,
  };

  return <JsonLd data={jsonLd} />;
}

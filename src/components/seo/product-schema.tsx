import type { WithContext, FinancialProduct } from 'schema-dts';
import { JsonLd } from './json-ld';
import { siteConfig } from '@/lib/site-config';

interface ProductSchemaProps {
  products: { name: string; issuer: string; id: string; [key: string]: unknown }[];
  category: string;
  categoryTitle: string;
}

export function ProductSchema({ products, category, categoryTitle }: ProductSchemaProps) {
  return (
    <>
      {products.map((product) => {
        const data: WithContext<FinancialProduct> = {
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          name: product.name,
          description: `${product.name} - ${categoryTitle} comparison on ${siteConfig.name}`,
          provider: {
            '@type': 'Organization',
            name: product.issuer,
          },
          url: `${siteConfig.url}/compare/${category}`,
        };

        return <JsonLd<FinancialProduct> key={product.id} data={data} />;
      })}
    </>
  );
}

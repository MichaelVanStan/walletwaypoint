'use client';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { AffiliateLink } from './affiliate-link';
import { BestForBadge } from './best-for-badge';
import type { ProductCategory } from '@/lib/compare/product-types';
import { ctaLabels } from '@/lib/compare/product-types';

interface ProductCardProps {
  product: Record<string, unknown>;
  category: ProductCategory;
  position: number;
  attributes: { key: string; label: string; render?: (value: unknown) => React.ReactNode }[];
}

export function ProductCard({ product, category, position, attributes }: ProductCardProps) {
  return (
    <div className="lg:hidden">
      <Card>
        <CardHeader>
          {typeof product.bestFor === 'string' && (
            <BestForBadge label={product.bestFor} />
          )}
          <h3 className="text-base font-semibold">{String(product.name)}</h3>
          {typeof product.issuer === 'string' && (
            <p className="text-sm text-muted-foreground">{product.issuer}</p>
          )}
        </CardHeader>
        <CardContent>
          <dl>
            {attributes.map((attr) => (
              <div
                key={attr.key}
                className="flex justify-between py-2 border-b border-border last:border-0"
              >
                <dt className="text-sm text-muted-foreground">{attr.label}</dt>
                <dd className="text-sm font-medium text-foreground">
                  {attr.render
                    ? attr.render(product[attr.key])
                    : (product[attr.key] as React.ReactNode)}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
        <CardFooter>
          <AffiliateLink
            className="w-full"
            href={product.affiliateUrl as string}
            productId={product.id as string}
            category={category}
            position={position}
            productName={product.name as string}
            utmSource={product.utmSource as string | undefined}
            utmMedium={product.utmMedium as string | undefined}
            utmCampaign={product.utmCampaign as string | undefined}
          >
            {ctaLabels[category]}
          </AffiliateLink>
        </CardFooter>
      </Card>
    </div>
  );
}

'use client';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { AffiliateLink, AffiliateLinkText } from './affiliate-link';
import { BestForBadge } from './best-for-badge';
import { ProductImage } from './product-image';
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
          <div className="flex items-center gap-3">
            <ProductImage
              imageUrl={product.imageUrl as string | undefined}
              name={product.name as string}
              issuer={product.issuer as string}
            />
            <div className="flex flex-col">
              <AffiliateLinkText
                productId={product.id as string}
                category={category}
                position={position}
                productName={product.name as string}
                className="text-base font-semibold"
              >
                {String(product.name)}
              </AffiliateLinkText>
              {typeof product.issuer === 'string' && (
                <p className="text-sm text-muted-foreground">{product.issuer}</p>
              )}
            </div>
          </div>
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
            productId={product.id as string}
            category={category}
            position={position}
            productName={product.name as string}
          >
            {ctaLabels[category]}
          </AffiliateLink>
        </CardFooter>
      </Card>
    </div>
  );
}

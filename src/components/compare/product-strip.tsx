'use client';

import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { AffiliateLink, AffiliateLinkText } from './affiliate-link';
import { BestForBadge } from './best-for-badge';
import { ProductImage } from './product-image';
import type { ProductCategory } from '@/lib/compare/product-types';
import { ctaLabels } from '@/lib/compare/product-types';
import type { StatConfig } from './strip-stat-config';

interface ProductStripProps {
  product: Record<string, unknown>;
  category: ProductCategory;
  position: number;
  stripStats: StatConfig[];
  detailStats: StatConfig[];
  isCompareSelected: boolean;
  onCompareToggle: (productId: string) => void;
  compareDisabled: boolean;
}

function renderStatValue(stat: StatConfig, product: Record<string, unknown>) {
  if (stat.render) {
    return stat.render(product[stat.key], product);
  }
  return product[stat.key] as React.ReactNode;
}

export function ProductStrip({
  product,
  category,
  position,
  stripStats,
  detailStats,
  isCompareSelected,
  onCompareToggle,
  compareDisabled,
}: ProductStripProps) {
  return (
    <div className="hidden lg:block">
      <Collapsible className="group">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent/5 group-data-[open]:rounded-b-none group-data-[open]:border-b-0">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isCompareSelected}
            disabled={compareDisabled}
            onChange={() => onCompareToggle(product.id as string)}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 flex-shrink-0 rounded border-border accent-primary disabled:opacity-40"
            aria-label={`Compare ${product.name as string}`}
          />

          {/* Product image */}
          <ProductImage
            imageUrl={product.imageUrl as string | undefined}
            name={product.name as string}
            issuer={product.issuer as string}
            category={category}
          />

          {/* Name block */}
          <div className="flex min-w-[200px] flex-col gap-0.5">
            {typeof product.bestFor === 'string' && (
              <BestForBadge label={product.bestFor} />
            )}
            <AffiliateLinkText
              productId={product.id as string}
              category={category}
              position={position}
              productName={product.name as string}
              className="text-sm font-semibold"
            >
              {String(product.name)}
            </AffiliateLinkText>
            {typeof product.issuer === 'string' && (
              <span className="text-sm text-muted-foreground">
                {product.issuer}
              </span>
            )}
          </div>

          {/* Inline strip stats */}
          <div className="flex flex-1 gap-6">
            {stripStats.map((stat) => (
              <div key={stat.key} className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-sm font-medium">
                  {renderStatValue(stat, product)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div onClick={(e) => e.stopPropagation()}>
            <AffiliateLink
              productId={product.id as string}
              category={category}
              position={position}
              productName={product.name as string}
            >
              {ctaLabels[category]}
            </AffiliateLink>
          </div>

          {/* Expand chevron */}
          <ChevronDown
            className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-data-[open]:rotate-180"
            aria-hidden="true"
          />
        </CollapsibleTrigger>

        {/* Expanded detail panel */}
        <CollapsibleContent className="rounded-b-lg border border-t-0 border-border bg-muted/30 p-6">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {detailStats.map((stat) => (
              <div key={stat.key}>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="text-sm font-medium">
                  {renderStatValue(stat, product)}
                </dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

'use client';

import { X, XCircle } from 'lucide-react';
import { AffiliateLink } from './affiliate-link';
import { ProductImage } from './product-image';
import type { ProductCategory } from '@/lib/compare/product-types';
import { ctaLabels } from '@/lib/compare/product-types';
import type { StatConfig } from './strip-stat-config';

interface ComparePanelProps {
  products: Record<string, unknown>[];
  category: ProductCategory;
  stripStats: StatConfig[];
  onRemove: (productId: string) => void;
  onClose: () => void;
}

function renderStatValue(stat: StatConfig, product: Record<string, unknown>) {
  if (stat.render) {
    return stat.render(product[stat.key], product);
  }
  return product[stat.key] as React.ReactNode;
}

export function ComparePanel({
  products,
  category,
  stripStats,
  onRemove,
  onClose,
}: ComparePanelProps) {
  if (products.length < 2) {
    return null;
  }

  return (
    <div
      role="complementary"
      aria-label="Product comparison"
      className="fixed bottom-0 left-0 right-0 z-50 hidden transform border-t border-border bg-card shadow-lg transition-transform duration-300 lg:block"
    >
      <div className="mx-auto max-w-5xl p-4">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Compare ({products.length})
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close comparison panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Comparison grid */}
        <div
          className={`grid gap-4 ${
            products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.id as string}
              className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3"
            >
              {/* Remove button */}
              <div className="flex justify-end">
                <button
                  onClick={() => onRemove(product.id as string)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Remove ${product.name as string} from comparison`}
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>

              {/* Product image */}
              <div className="flex justify-center">
                <ProductImage
                  imageUrl={product.imageUrl as string | undefined}
                  name={product.name as string}
                  issuer={product.issuer as string}
                  category={category}
                />
              </div>

              {/* Product name and issuer */}
              <p className="truncate text-sm font-medium">
                {String(product.name)}
              </p>
              {typeof product.issuer === 'string' && (
                <p className="text-xs text-muted-foreground">
                  {product.issuer}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-col gap-1.5">
                {stripStats.map((stat) => (
                  <div key={stat.key}>
                    <span className="text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="block text-sm font-semibold">
                      {renderStatValue(stat, product)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <AffiliateLink
                  className="w-full"
                  productId={product.id as string}
                  category={category}
                  position={index}
                  productName={product.name as string}
                >
                  {ctaLabels[category]}
                </AffiliateLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

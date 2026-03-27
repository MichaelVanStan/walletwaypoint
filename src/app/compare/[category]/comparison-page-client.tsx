'use client';

import { useState, useCallback } from 'react';
import { useQueryStates } from 'nuqs';
import Link from 'next/link';
import { ProductCard } from '@/components/compare/product-card';
import { ProductStrip } from '@/components/compare/product-strip';
import { FilterChips } from '@/components/compare/filter-chips';
import { ComparePanel } from '@/components/compare/compare-panel';
import { ProductCount } from '@/components/compare/product-count';
import { getStripStats, getDetailStats } from '@/components/compare/strip-stat-config';
import { sortProducts } from '@/lib/compare/sort-utils';
import { applyFilters, filterConfigs } from '@/lib/compare/filter-config';
import { categoryParams } from '@/lib/compare/url-params';
import type { ProductCategory } from '@/lib/compare/product-types';

interface ComparisonPageClientProps {
  products: Record<string, unknown>[];
  category: ProductCategory;
  lastVerified: string;
}

const categoryDisplayNames: Record<ProductCategory, string> = {
  'credit-cards': 'credit cards',
  'personal-loans': 'personal loans',
  'savings-accounts': 'savings accounts',
  insurance: 'insurance products',
};

// Attribute definitions for mobile product cards
function getAttributes(category: ProductCategory) {
  switch (category) {
    case 'credit-cards':
      return [
        { key: 'apr', label: 'APR' },
        {
          key: 'annualFee',
          label: 'Annual Fee',
          render: (v: unknown) => (v === 0 ? '$0' : `$${v}`),
        },
        { key: 'rewardsRate', label: 'Rewards Rate' },
        { key: 'signupBonus', label: 'Signup Bonus' },
        {
          key: 'creditScoreMin',
          label: 'Credit Score',
          render: (v: unknown) => `${v}+`,
        },
      ];
    case 'personal-loans':
      return [
        {
          key: 'aprLow',
          label: 'APR Range',
          render: (_v: unknown, p?: Record<string, unknown>) =>
            p ? `${p.aprLow}%-${p.aprHigh}%` : String(_v),
        },
        {
          key: 'loanAmountMax',
          label: 'Loan Amount',
          render: (_v: unknown, p?: Record<string, unknown>) =>
            p
              ? `$${(p.loanAmountMin as number).toLocaleString()}-$${(p.loanAmountMax as number).toLocaleString()}`
              : String(_v),
        },
        {
          key: 'termMax',
          label: 'Term',
          render: (_v: unknown, p?: Record<string, unknown>) =>
            p ? `${p.termMin}-${p.termMax} mo` : String(_v),
        },
        { key: 'originationFee', label: 'Origination Fee' },
      ];
    case 'savings-accounts':
      return [
        {
          key: 'apy',
          label: 'APY',
          render: (v: unknown) => `${v}%`,
        },
        {
          key: 'minimumDeposit',
          label: 'Min. Deposit',
          render: (v: unknown) =>
            (v as number) === 0 ? '$0' : `$${(v as number).toLocaleString()}`,
        },
        {
          key: 'accountType',
          label: 'Type',
          render: (v: unknown) =>
            v === 'high-yield-savings' ? 'High-Yield Savings' : 'CD',
        },
        {
          key: 'termMonths',
          label: 'Term',
          render: (v: unknown) =>
            v == null ? 'None' : `${v} months`,
        },
      ];
    case 'insurance':
      return [
        { key: 'monthlyPremium', label: 'Monthly Premium' },
        {
          key: 'coverageLevel',
          label: 'Coverage',
          render: (v: unknown) => {
            const labels: Record<string, string> = {
              basic: 'Basic',
              standard: 'Standard',
              premium: 'Premium',
            };
            return labels[v as string] || String(v);
          },
        },
        {
          key: 'deductibleMin',
          label: 'Deductible',
          render: (_v: unknown, p?: Record<string, unknown>) =>
            p
              ? `$${(p.deductibleMin as number).toLocaleString()}-$${(p.deductibleMax as number).toLocaleString()}`
              : String(_v),
        },
        { key: 'coverageHighlights', label: 'Coverage Highlights' },
      ];
  }
}

export function ComparisonPageClient({
  products,
  category,
  lastVerified: _lastVerified,
}: ComparisonPageClientProps) {
  const [state, setState] = useQueryStates(categoryParams[category]);

  // Compare selection state (max 3 products)
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());

  const handleCompareToggle = useCallback((productId: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else if (next.size < 3) {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const handleCompareRemove = useCallback((productId: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  const handleCompareClose = useCallback(() => {
    setCompareIds(new Set());
  }, []);

  const sortColumn = state.sort === 'name' ? null : (state.sort as string);
  const sortDirection = state.dir as 'asc' | 'desc';

  // Collect active filter values (exclude sort/dir)
  const activeFilters: Record<string, string> = {};
  for (const [key, value] of Object.entries(state)) {
    if (key !== 'sort' && key !== 'dir' && typeof value === 'string') {
      activeFilters[key] = value;
    }
  }

  // Apply filters then sort
  const filteredProducts = applyFilters(products, activeFilters);
  const sortedProducts = sortProducts(
    filteredProducts,
    sortColumn,
    sortDirection,
  );

  const attributes = getAttributes(category);
  const stripStats = getStripStats(category);
  const detailStats = getDetailStats(category);

  const handleFilterChange = (filterId: string, value: string | null) => {
    setState({ [filterId]: value ?? 'all' } as Partial<typeof state>);
  };

  const handleClearAll = () => {
    const resetState: Record<string, string> = {};
    for (const key of Object.keys(activeFilters)) {
      resetState[key] = 'all';
    }
    setState(resetState as Partial<typeof state>);
  };

  return (
    <div className="mt-8">
      {/* Filter chips */}
      <FilterChips
        filters={filterConfigs[category]}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
      />

      <div className="mt-4">
        <ProductCount count={sortedProducts.length} total={products.length} />
      </div>

      {sortedProducts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-8 text-center">
          <p className="text-base text-muted-foreground">
            No matching products found.
          </p>
          <button
            onClick={handleClearAll}
            className="mt-3 text-sm text-accent underline hover:text-foreground"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop: Product strips */}
          <div className="mt-6 hidden lg:flex lg:flex-col lg:gap-3">
            {sortedProducts.map((product, index) => (
              <ProductStrip
                key={product.id as string}
                product={product}
                category={category}
                position={index}
                stripStats={stripStats}
                detailStats={detailStats}
                isCompareSelected={compareIds.has(product.id as string)}
                onCompareToggle={handleCompareToggle}
                compareDisabled={
                  compareIds.size >= 3 &&
                  !compareIds.has(product.id as string)
                }
              />
            ))}
          </div>

          {/* Mobile: Product cards (unchanged) */}
          <div className="mt-6 flex flex-col gap-4 lg:hidden">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id as string}
                product={product}
                category={category}
                position={index}
                attributes={attributes}
              />
            ))}
          </div>
        </>
      )}

      {/* Compare panel -- slides up when 2+ selected */}
      <ComparePanel
        products={sortedProducts.filter((p) =>
          compareIds.has(p.id as string),
        )}
        category={category}
        stripStats={stripStats}
        onRemove={handleCompareRemove}
        onClose={handleCompareClose}
      />

      <div className="py-8">
        <Link
          href="/how-we-rank"
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          How we rank {categoryDisplayNames[category]}
        </Link>
      </div>
    </div>
  );
}

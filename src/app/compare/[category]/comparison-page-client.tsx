'use client';

import { useQueryStates } from 'nuqs';
import Link from 'next/link';
import { ComparisonTable } from '@/components/compare/comparison-table';
import { ProductCard } from '@/components/compare/product-card';
import { ComparisonFilters } from '@/components/compare/comparison-filters';
import { ProductCount } from '@/components/compare/product-count';
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

// Column definitions per category
function getColumns(category: ProductCategory) {
  switch (category) {
    case 'credit-cards':
      return [
        { key: 'name', label: 'Card Name', sortable: true },
        { key: 'apr', label: 'APR', sortable: false },
        {
          key: 'annualFee',
          label: 'Annual Fee',
          sortable: true,
          render: (v: unknown) => (v === 0 ? '$0' : `$${v}`),
        },
        { key: 'rewardsRate', label: 'Rewards Rate', sortable: false },
        { key: 'signupBonus', label: 'Signup Bonus', sortable: false },
        {
          key: 'creditScoreMin',
          label: 'Credit Score',
          sortable: true,
          render: (v: unknown) => `${v}+`,
        },
      ];
    case 'personal-loans':
      return [
        { key: 'name', label: 'Lender', sortable: true },
        {
          key: 'aprLow',
          label: 'APR Range',
          sortable: true,
          render: (_v: unknown, p: Record<string, unknown>) =>
            `${p.aprLow}%-${p.aprHigh}%`,
        },
        {
          key: 'loanAmountMax',
          label: 'Loan Amount',
          sortable: true,
          render: (_v: unknown, p: Record<string, unknown>) =>
            `$${(p.loanAmountMin as number).toLocaleString()}-$${(p.loanAmountMax as number).toLocaleString()}`,
        },
        {
          key: 'termMax',
          label: 'Term',
          sortable: true,
          render: (_v: unknown, p: Record<string, unknown>) =>
            `${p.termMin}-${p.termMax} mo`,
        },
        { key: 'originationFee', label: 'Origination Fee', sortable: false },
        {
          key: 'creditScoreRange',
          label: 'Credit Score',
          sortable: false,
          render: (v: unknown) => {
            const labels: Record<string, string> = {
              excellent: 'Excellent (750+)',
              good: 'Good (670+)',
              fair: 'Fair (580+)',
            };
            return labels[v as string] || String(v);
          },
        },
      ];
    case 'savings-accounts':
      return [
        { key: 'name', label: 'Account', sortable: true },
        {
          key: 'apy',
          label: 'APY',
          sortable: true,
          render: (v: unknown) => `${v}%`,
        },
        {
          key: 'minimumDeposit',
          label: 'Min. Deposit',
          sortable: true,
          render: (v: unknown) =>
            (v as number) === 0 ? '$0' : `$${(v as number).toLocaleString()}`,
        },
        {
          key: 'accountType',
          label: 'Type',
          sortable: false,
          render: (v: unknown) =>
            v === 'high-yield-savings' ? 'High-Yield Savings' : 'CD',
        },
        {
          key: 'termMonths',
          label: 'Term',
          sortable: false,
          render: (v: unknown) =>
            v == null ? 'None' : `${v} months`,
        },
        { key: 'compounding', label: 'Compounding', sortable: false },
      ];
    case 'insurance':
      return [
        { key: 'name', label: 'Provider', sortable: true },
        { key: 'monthlyPremium', label: 'Monthly Premium', sortable: false },
        {
          key: 'coverageLevel',
          label: 'Coverage',
          sortable: true,
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
          sortable: true,
          render: (_v: unknown, p: Record<string, unknown>) =>
            `$${(p.deductibleMin as number).toLocaleString()}-$${(p.deductibleMax as number).toLocaleString()}`,
        },
        {
          key: 'coverageHighlights',
          label: 'Coverage Highlights',
          sortable: false,
        },
      ];
  }
}

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
  lastVerified,
}: ComparisonPageClientProps) {
  const [state, setState] = useQueryStates(categoryParams[category]);

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

  const columns = getColumns(category);
  const attributes = getAttributes(category);

  const handleSort = (column: string) => {
    if (state.sort === column) {
      if (state.dir === 'asc') {
        setState({ sort: column as typeof state.sort, dir: 'desc' as typeof state.dir });
      } else {
        // Reset sort
        setState({ sort: 'name' as typeof state.sort, dir: 'asc' as typeof state.dir });
      }
    } else {
      setState({ sort: column as typeof state.sort, dir: 'asc' as typeof state.dir });
    }
  };

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
      <ComparisonFilters
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
          <div className="mt-6">
            <ComparisonTable
              products={sortedProducts}
              columns={columns}
              category={category}
              sortColumn={state.sort as string}
              sortDirection={sortDirection}
              onSort={handleSort}
              lastVerified={lastVerified}
            />
          </div>

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

import { Suspense } from 'react';
import { products } from '#site/content';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { AffiliateDisclosure } from '@/components/trust/affiliate-disclosure';
import { ProductSchema } from '@/components/seo/product-schema';
import { ComparisonPageClient } from './comparison-page-client';
import { productCategories } from '@/lib/compare/product-types';
import type { ProductCategory } from '@/lib/compare/product-types';

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = products.find((p) => p.category === category);
  if (!data) return {};
  return createMetadata({
    title: `${data.categoryTitle} Comparison`,
    description: data.categoryDescription,
    path: `/compare/${data.category}`,
  });
}

const categoryIntros: Record<ProductCategory, string> = {
  'credit-cards':
    'Compare credit card rewards, annual fees, and APR rates side by side. Sort by what matters most to you and find the right card for your spending habits.',
  'personal-loans':
    'Compare personal loan rates, terms, and fees from top lenders. Filter by loan amount and credit score to find the best option for your situation.',
  'savings-accounts':
    'Compare high-yield savings accounts and CD rates. Find the best APY with the deposit minimums and terms that fit your savings goals.',
  insurance:
    'Compare auto and renters insurance quotes, coverage levels, and deductibles. Find the right policy for your budget and coverage needs.',
  'auto-insurance':
    'Compare auto insurance rates, coverage options, and discounts from top providers. Filter by AM Best rating to find the best policy for your driving needs.',
  'life-insurance':
    'Compare life insurance policies, premiums, and coverage amounts. Find the right term, whole, or universal life plan for your family.',
  'investment-platforms':
    'Compare investment platforms, fees, and account types. Find the right brokerage or robo-advisor for your investing goals.',
  'tax-software':
    'Compare tax filing software features, prices, and support options. Find the best tool for your tax situation.',
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!productCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const data = products.find((p) => p.category === category);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:py-12">
      <h1 className="text-2xl font-semibold text-foreground md:text-[24px]">
        {data.categoryTitle}
      </h1>
      <p className="mt-3 max-w-[640px] text-base leading-[1.6] text-muted-foreground">
        {categoryIntros[category as ProductCategory]}
      </p>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <ProductSchema
        products={data.products as { name: string; issuer: string; id: string; [key: string]: unknown }[]}
        category={data.category}
        categoryTitle={data.categoryTitle}
      />

      <Suspense
        fallback={
          <div className="mt-8">
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="mt-4 h-[400px] w-full animate-pulse rounded-lg bg-muted/50" />
          </div>
        }
      >
        <ComparisonPageClient
          products={data.products as Record<string, unknown>[]}
          category={category as ProductCategory}
          lastVerified={data.lastVerified}
        />
      </Suspense>
    </div>
  );
}

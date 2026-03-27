'use client';

import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { SortHeader } from './sort-header';
import { AffiliateLink, AffiliateLinkText } from './affiliate-link';
import { BestForBadge } from './best-for-badge';
import { ProductImage } from './product-image';
import type { ProductCategory } from '@/lib/compare/product-types';
import { ctaLabels } from '@/lib/compare/product-types';

interface ColumnDef {
  key: string;
  label: string;
  sortable: boolean;
  render?: (value: unknown, product: Record<string, unknown>) => React.ReactNode;
}

interface ComparisonTableProps {
  products: Record<string, unknown>[];
  columns: ColumnDef[];
  category: ProductCategory;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  lastVerified: string;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getAriaSortValue(
  column: string,
  sortColumn: string | null,
  sortDirection: 'asc' | 'desc',
): 'ascending' | 'descending' | 'none' {
  if (column !== sortColumn) return 'none';
  return sortDirection === 'asc' ? 'ascending' : 'descending';
}

export function ComparisonTable({
  products,
  columns,
  category,
  sortColumn,
  sortDirection,
  onSort,
  lastVerified,
}: ComparisonTableProps) {
  return (
    <div className="hidden lg:block">
      <Table>
        <TableCaption>
          Rates and terms as of {formatDate(lastVerified)}. See our{' '}
          <Link href="/how-we-rank" className="underline underline-offset-4 hover:text-foreground">
            ranking methodology
          </Link>{' '}
          for details.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col, colIndex) => (
              <TableHead
                key={col.key}
                scope="col"
                aria-sort={col.sortable ? getAriaSortValue(col.key, sortColumn, sortDirection) : undefined}
                className={
                  colIndex === 0
                    ? 'sticky left-0 z-10 bg-background w-[280px] min-w-[280px]'
                    : undefined
                }
              >
                {col.sortable ? (
                  <SortHeader
                    column={col.key}
                    label={col.label}
                    active={sortColumn === col.key}
                    direction={sortColumn === col.key ? sortDirection : null}
                    onSort={onSort}
                  />
                ) : (
                  col.label
                )}
              </TableHead>
            ))}
            <TableHead scope="col" className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, rowIndex) => (
            <TableRow key={product.id as string} className="even:bg-secondary/30">
              {columns.map((col, colIndex) => (
                <TableCell
                  key={col.key}
                  className={
                    colIndex === 0
                      ? 'sticky left-0 z-10 bg-background w-[280px] min-w-[280px]'
                      : undefined
                  }
                >
                  {colIndex === 0 ? (
                    <div className="flex items-center gap-3">
                      <ProductImage
                        imageUrl={product.imageUrl as string | undefined}
                        name={product.name as string}
                        issuer={product.issuer as string}
                      />
                      <div className="flex flex-col gap-1">
                        {typeof product.bestFor === 'string' && (
                          <BestForBadge label={product.bestFor} />
                        )}
                        <AffiliateLinkText
                          href={product.affiliateUrl as string}
                          productId={product.id as string}
                          category={category}
                          position={rowIndex}
                          productName={product.name as string}
                          utmSource={product.utmSource as string | undefined}
                          utmMedium={product.utmMedium as string | undefined}
                          utmCampaign={product.utmCampaign as string | undefined}
                        >
                          {col.render
                            ? col.render(product[col.key], product)
                            : (product[col.key] as React.ReactNode)}
                        </AffiliateLinkText>
                      </div>
                    </div>
                  ) : col.render ? (
                    col.render(product[col.key], product)
                  ) : (
                    (product[col.key] as React.ReactNode)
                  )}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <AffiliateLink
                  href={product.affiliateUrl as string}
                  productId={product.id as string}
                  category={category}
                  position={rowIndex}
                  productName={product.name as string}
                  utmSource={product.utmSource as string | undefined}
                  utmMedium={product.utmMedium as string | undefined}
                  utmCampaign={product.utmCampaign as string | undefined}
                >
                  {ctaLabels[category]}
                </AffiliateLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

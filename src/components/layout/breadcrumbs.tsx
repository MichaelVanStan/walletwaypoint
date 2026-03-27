'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { siteConfig } from '@/lib/site-config';
import { Home } from 'lucide-react';

interface BreadcrumbsProps {
  items?: { name: string; href: string }[];
}

function deslugify(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Do not render breadcrumbs on the homepage
  if (pathname === '/') {
    return null;
  }

  // Build breadcrumb items from pathname or use provided items
  const breadcrumbItems = items
    ? [{ name: 'Home', href: '/' }, ...items]
    : buildBreadcrumbsFromPath(pathname);

  // Build schema items with full URLs
  const schemaItems = breadcrumbItems.map((item) => ({
    name: item.name,
    url: `${siteConfig.url}${item.href}`,
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <React.Fragment key={item.href}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink render={<Link href={item.href} />}>
                          {index === 0 ? (
                            <span className="flex items-center gap-1.5">
                              <Home className="h-3.5 w-3.5" />
                              <span className="sr-only">{item.name}</span>
                            </span>
                          ) : (
                            item.name
                          )}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
}

function buildBreadcrumbsFromPath(
  pathname: string
): { name: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
  ];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      name: deslugify(segment),
      href: currentPath,
    });
  }

  return items;
}

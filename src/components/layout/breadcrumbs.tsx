'use client';

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
      <Breadcrumb aria-label="Breadcrumb">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <BreadcrumbItem key={item.href}>
                {index > 0 && <BreadcrumbSeparator />}
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={item.href} />}>
                    {item.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
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

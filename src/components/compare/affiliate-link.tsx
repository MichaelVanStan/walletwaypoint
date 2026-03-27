'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateLinkProps {
  productId: string;
  category: string;
  position: number;
  productName: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  productId,
  category,
  position,
  productName,
  className,
  children,
}: AffiliateLinkProps) {
  const href = `/go/${productId}`;

  const handleClick = () => {
    sendGAEvent('event', 'affiliate_click', {
      product_id: productId,
      category: category,
      position: position,
      product_name: productName,
      click_element: 'cta_button',
    });
  };

  return (
    <Button
      nativeButton={false}
      size="sm"
      className={className}
      render={
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={handleClick}
        />
      }
    >
      {children}
      <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
      <span className="sr-only">(opens in new tab)</span>
    </Button>
  );
}

interface AffiliateLinkTextProps {
  productId: string;
  category: string;
  position: number;
  productName: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLinkText({
  productId,
  category,
  position,
  productName,
  className,
  children,
}: AffiliateLinkTextProps) {
  const href = `/go/${productId}`;

  const handleClick = () => {
    sendGAEvent('event', 'affiliate_click', {
      product_id: productId,
      category: category,
      position: position,
      product_name: productName,
      click_element: 'product_name',
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={cn('font-medium underline-offset-2 hover:underline', className)}
    >
      {children}
    </a>
  );
}

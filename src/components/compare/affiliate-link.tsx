'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateLinkProps {
  href: string;
  productId: string;
  category: string;
  position: number;
  productName: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  className?: string;
  children: React.ReactNode;
}

function buildAffiliateUrl(
  baseHref: string,
  utmSource: string,
  utmMedium: string,
  utmCampaign: string,
): string {
  const url = new URL(baseHref);
  url.searchParams.set('utm_source', utmSource);
  url.searchParams.set('utm_medium', utmMedium);
  url.searchParams.set('utm_campaign', utmCampaign);
  return url.toString();
}

export function AffiliateLink({
  href,
  productId,
  category,
  position,
  productName,
  utmSource = 'walletwaypoint',
  utmMedium = 'comparison_table',
  utmCampaign,
  className,
  children,
}: AffiliateLinkProps) {
  const fullUrl = buildAffiliateUrl(href, utmSource, utmMedium, utmCampaign ?? category);

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
          href={fullUrl}
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
  href: string;
  productId: string;
  category: string;
  position: number;
  productName: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLinkText({
  href,
  productId,
  category,
  position,
  productName,
  utmSource = 'walletwaypoint',
  utmMedium = 'comparison_table',
  utmCampaign,
  className,
  children,
}: AffiliateLinkTextProps) {
  const fullUrl = buildAffiliateUrl(href, utmSource, utmMedium, utmCampaign ?? category);

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
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={cn('font-medium underline-offset-2 hover:underline', className)}
    >
      {children}
    </a>
  );
}

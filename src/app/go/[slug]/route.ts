import { NextResponse } from 'next/server';
import { products } from '#site/content';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Search across all product categories for a matching product id
  let matchedProduct: { destinationUrl: string; utmCampaign: string } | null = null;

  for (const categoryData of products) {
    const found = categoryData.products.find(
      (p: { id: string }) => p.id === slug,
    );
    if (found) {
      matchedProduct = {
        destinationUrl: found.destinationUrl,
        utmCampaign: found.utmCampaign,
      };
      break;
    }
  }

  // If no product found, redirect to the compare index page
  if (!matchedProduct) {
    return NextResponse.redirect(new URL('/compare', _request.url), {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store',
      },
    });
  }

  // Build destination URL with UTM params appended server-side
  const destinationUrl = new URL(matchedProduct.destinationUrl);
  destinationUrl.searchParams.set('utm_source', 'walletwaypoint');
  destinationUrl.searchParams.set('utm_medium', 'comparison_table');
  destinationUrl.searchParams.set('utm_campaign', matchedProduct.utmCampaign);

  return NextResponse.redirect(destinationUrl.toString(), {
    status: 302,
    headers: {
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

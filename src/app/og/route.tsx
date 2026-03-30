import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const TYPE_LABELS: Record<string, string> = {
  calculator: 'Calculator',
  guide: 'Guide',
  compare: 'Compare',
  hub: 'Hub',
};

const TYPE_COLORS: Record<string, string> = {
  calculator: '#2563eb',
  guide: '#059669',
  compare: '#7c3aed',
  hub: '#d97706',
  default: '#2563eb',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'WalletWaypoint';
  const description = searchParams.get('description') || '';
  const type = searchParams.get('type') || 'default';

  const typeLabel = TYPE_LABELS[type];
  const accentColor = TYPE_COLORS[type] || TYPE_COLORS.default;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            display: 'flex',
            width: '8px',
            height: '100%',
            backgroundColor: accentColor,
          }}
        />

        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 60px 50px 52px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Top section: type badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            {typeLabel && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: accentColor,
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                {typeLabel}
              </div>
            )}
          </div>

          {/* Middle section: title and description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '960px',
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? 36 : title.length > 40 ? 42 : 48,
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: 22,
                  color: '#64748b',
                  lineHeight: 1.4,
                  maxWidth: '800px',
                }}
              >
                {description.length > 120
                  ? description.slice(0, 117) + '...'
                  : description}
              </div>
            )}
          </div>

          {/* Bottom section: branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {/* Brand icon circle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: accentColor,
                  color: '#ffffff',
                  fontSize: '20px',
                  fontWeight: 700,
                }}
              >
                W
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#0f172a',
                  letterSpacing: '-0.01em',
                }}
              >
                WalletWaypoint
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: '#94a3b8',
              }}
            >
              walletwaypoint.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control':
          'public, max-age=86400, stale-while-revalidate=604800',
      },
    },
  );
}

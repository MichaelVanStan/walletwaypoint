import { AD_CONFIG, AD_SIZES } from './ad-config';

interface AdSlotProps {
  variant: 'sidebar' | 'leaderboard' | 'in-content';
  className?: string;
}

/**
 * CLS-safe ad container component.
 *
 * Renders an empty div with reserved min-height so Mediavine can fill it
 * dynamically without causing layout shift. When AD_CONFIG.enabled is false
 * (pre-qualification), the container is invisible but reserves space.
 *
 * Usage:
 *   <AdSlot variant="sidebar" />
 *   <AdSlot variant="in-content" className="mx-auto max-w-[1080px]" />
 */
export function AdSlot({ variant, className }: AdSlotProps) {
  const sizeMap = {
    sidebar: AD_SIZES.sidebar,
    leaderboard: AD_SIZES.leaderboard,
    'in-content': AD_SIZES.inContent,
  } as const;

  const minHeightMap = {
    sidebar: AD_CONFIG.sidebarMinHeight,
    leaderboard: AD_CONFIG.leaderboardMinHeight,
    'in-content': AD_CONFIG.inContentMinHeight,
  } as const;

  const size = sizeMap[variant];
  const minHeight = minHeightMap[variant];

  return (
    <div
      data-ad-slot={variant}
      aria-hidden="true"
      style={{ minHeight, maxWidth: size.width }}
      className={`w-full bg-transparent ${className ?? ''}`}
    />
  );
}

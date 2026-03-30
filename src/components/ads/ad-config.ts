/**
 * Ad size constants for standard IAB ad units.
 * Used by AdSlot and AdBreak to reserve CLS-safe min-heights.
 */
export const AD_SIZES = {
  sidebar: { width: 300, height: 250 },
  leaderboard: { width: 728, height: 90 },
  inContent: { width: 300, height: 250 },
} as const;

/**
 * Global ad configuration.
 * `enabled` stays false until Mediavine qualification (50K sessions/month).
 * When enabled, Mediavine's script dynamically fills containers matching
 * `data-ad-slot` attributes.
 */
export const AD_CONFIG = {
  enabled: false,
  provider: 'mediavine' as const,
  sidebarMinHeight: 250,
  leaderboardMinHeight: 90,
  inContentMinHeight: 250,
} as const;

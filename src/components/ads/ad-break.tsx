import { AD_CONFIG } from './ad-config';

interface AdBreakProps {
  className?: string;
}

/**
 * In-content ad break component.
 *
 * Inserted between guide content sections (e.g., after article body before FAQ,
 * after FAQ before related guides). Reserves vertical space for Mediavine to
 * fill with an in-content ad unit. CLS-safe: min-height is reserved even when
 * AD_CONFIG.enabled is false.
 */
export function AdBreak({ className }: AdBreakProps) {
  return (
    <div
      data-ad-break="true"
      aria-hidden="true"
      style={{ minHeight: AD_CONFIG.inContentMinHeight }}
      className={`my-8 w-full ${className ?? ''}`}
    />
  );
}

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';

interface GuidanceBannerProps {
  /** Guidance message text */
  message: string;
  /** Visual variant: info (accent-tinted) or warning (destructive-tinted) */
  variant?: 'info' | 'warning';
}

/**
 * Contextual financial guidance banner (D-11).
 *
 * Renders below the comparison table with an info or warning icon.
 * Default variant "info" uses accent-tinted background per UI-SPEC.
 */
export function GuidanceBanner({
  message,
  variant = 'info',
}: GuidanceBannerProps) {
  const isWarning = variant === 'warning';

  return (
    <Alert
      className={
        isWarning
          ? 'border-destructive/20 bg-destructive/5'
          : 'border-[oklch(0.55_0.12_175)]/20 bg-[oklch(0.55_0.12_175)]/5'
      }
    >
      {isWarning ? (
        <AlertTriangle className="size-4 text-destructive" />
      ) : (
        <Info className="size-4 text-[oklch(0.55_0.12_175)]" />
      )}
      <AlertDescription className="text-sm text-foreground">
        {message}
      </AlertDescription>
    </Alert>
  );
}

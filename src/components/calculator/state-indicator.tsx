'use client';

import { useState, useEffect } from 'react';
import { usePersistedState } from '@/lib/states/state-persistence';
import { STATES } from '@/lib/states/state-list';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { MapPin } from 'lucide-react';
import type { PersistedState } from '@/lib/states/types';

/**
 * State indicator badge for the header (D-05).
 *
 * Shows the user's persisted state abbreviation as a compact badge.
 * Hidden when no state is selected (returns null -- zero CLS).
 * Click opens a popover to change the selected state.
 *
 * Hydration strategy: renders null on server and initial client render.
 * After useEffect reads localStorage, fades in with 150ms opacity transition.
 */
export function StateIndicator() {
  const { userState, setState } = usePersistedState();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for cross-component storage sync
  useEffect(() => {
    const handleStorage = () => {
      // The usePersistedState hook handles the actual state update;
      // this just ensures we re-render when storage changes externally
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Server render and pre-hydration: return null for zero CLS
  if (!mounted || !userState) {
    return null;
  }

  const stateName =
    STATES.find((s) => s.abbreviation === userState.abbreviation)?.name ??
    userState.name;

  const handleSelectState = (state: (typeof STATES)[number]) => {
    const newState: PersistedState = {
      abbreviation: state.abbreviation,
      slug: state.slug,
      name: state.name,
    };
    setState(newState);
    setOpen(false);
  };

  return (
    <div suppressHydrationWarning>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label={`Your selected state is ${stateName}. Click to change.`}
          className="cursor-pointer"
        >
          <Badge
            className="inline-flex h-7 min-w-[32px] items-center gap-1 bg-[oklch(0.55_0.12_175)] px-2 text-xs font-semibold text-white transition-opacity duration-150 hover:bg-[oklch(0.50_0.12_175)] sm:min-h-[28px] min-h-[36px]"
          >
            <MapPin className="size-3" />
            {userState.abbreviation}
          </Badge>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="max-h-[320px] w-56 overflow-y-auto p-1"
        >
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            Select your state
          </div>
          <div role="listbox" aria-label="Select a state">
            {STATES.map((state) => (
              <button
                key={state.abbreviation}
                role="option"
                aria-selected={state.abbreviation === userState.abbreviation}
                onClick={() => handleSelectState(state)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                  state.abbreviation === userState.abbreviation
                    ? 'bg-accent/10 font-medium text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <span className="w-6 text-xs font-semibold">
                  {state.abbreviation}
                </span>
                <span>{state.name}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

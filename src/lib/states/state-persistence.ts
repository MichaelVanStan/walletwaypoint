'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PersistedState } from './types';

const STORAGE_KEY = 'ww_user_state';

/**
 * Hook for persisting user's state selection to localStorage.
 *
 * Used across calculators (paycheck, home affordability) so that
 * selecting a state once carries forward to all state-aware tools.
 * Dispatches a storage event for cross-component synchronization.
 */
export function usePersistedState() {
  const [userState, setUserState] = useState<PersistedState | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUserState(JSON.parse(stored));
    } catch {
      /* SSR or localStorage unavailable */
    }
  }, []);

  const setState = useCallback((state: PersistedState) => {
    setUserState(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Dispatch storage event for cross-component sync
      window.dispatchEvent(new Event('storage'));
    } catch {
      /* quota exceeded or private browsing */
    }
  }, []);

  const clearState = useCallback(() => {
    setUserState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('storage'));
    } catch {
      /* ignore */
    }
  }, []);

  return { userState, setState, clearState };
}

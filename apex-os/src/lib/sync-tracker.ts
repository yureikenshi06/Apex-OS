import type { QueryClient } from '@tanstack/react-query';
import { useSyncStore } from '@/store/sync-store';

/**
 * Mirrors TanStack Query's mutation cache into the sync store.
 *
 * With the default `networkMode: 'online'`, a mutation fired while offline is
 * *paused* (not failed) and resumes automatically on reconnect — that is the
 * app's real offline queue. Reading `isPaused` therefore tells us, truthfully,
 * which writes are still waiting and which module (`meta.scope`) they belong to,
 * so cards can show a "Queued" pill instead of a single ambiguous global dot.
 */
export function startSyncTracker(queryClient: QueryClient) {
  const cache = queryClient.getMutationCache();

  const recompute = () => {
    const { setQueuedScopes, setPendingChanges, setSyncStatus, setLastSynced } =
      useSyncStore.getState();
    const online = useSyncStore.getState().isOnline;

    const pending = cache.getAll().filter((m) => m.state.status === 'pending');
    const paused = pending.filter((m) => m.state.isPaused);

    const scopes: Record<string, number> = {};
    for (const m of paused) {
      const scope = (m.options.meta?.scope as string | undefined) ?? 'app';
      scopes[scope] = (scopes[scope] ?? 0) + 1;
    }

    setQueuedScopes(scopes);
    setPendingChanges(paused.length);

    if (!online) setSyncStatus('offline');
    else if (pending.length > 0) setSyncStatus('syncing');
    else {
      setSyncStatus('synced');
      setLastSynced(new Date());
    }
  };

  const unsubscribeCache = cache.subscribe(recompute);
  const unsubscribeStore = useSyncStore.subscribe((s, prev) => {
    if (s.isOnline !== prev.isOnline) recompute();
  });
  recompute();

  return () => {
    unsubscribeCache();
    unsubscribeStore();
  };
}

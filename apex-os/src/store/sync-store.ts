import { create } from 'zustand';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

interface SyncState {
  isOnline: boolean;
  syncStatus: SyncStatus;
  /** Writes made while offline that are waiting for a connection. */
  pendingChanges: number;
  /** Per-module count of queued writes, keyed by mutation `meta.scope`. */
  queuedScopes: Record<string, number>;
  lastSyncedAt: Date | null;

  setOnline: (isOnline: boolean) => void;
  setSyncStatus: (status: SyncStatus) => void;
  setPendingChanges: (count: number) => void;
  setQueuedScopes: (scopes: Record<string, number>) => void;
  setLastSynced: (date: Date) => void;
}

export const useSyncStore = create<SyncState>((set) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => set({ isOnline: true }));
    window.addEventListener('offline', () => set({ isOnline: false }));
  }

  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    syncStatus: 'synced',
    pendingChanges: 0,
    queuedScopes: {},
    lastSyncedAt: null,

    setOnline: (isOnline) => set({ isOnline }),
    setSyncStatus: (status) => set({ syncStatus: status }),
    setPendingChanges: (count) => set({ pendingChanges: count }),
    setQueuedScopes: (queuedScopes) => set({ queuedScopes }),
    setLastSynced: (date) => set({ lastSyncedAt: date }),
  };
});

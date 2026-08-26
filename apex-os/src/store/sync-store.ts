import { create } from 'zustand';

type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

interface SyncState {
  isOnline: boolean;
  syncStatus: SyncStatus;
  pendingChanges: number;
  lastSyncedAt: Date | null;
  
  setOnline: (isOnline: boolean) => void;
  setSyncStatus: (status: SyncStatus) => void;
  setPendingChanges: (count: number) => void;
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
    lastSyncedAt: null,
    
    setOnline: (isOnline) => set({ isOnline }),
    setSyncStatus: (status) => set({ syncStatus: status }),
    setPendingChanges: (count) => set({ pendingChanges: count }),
    setLastSynced: (date) => set({ lastSyncedAt: date }),
  };
});

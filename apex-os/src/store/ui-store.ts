import { create } from 'zustand';

export type QuickAddContext = 'task' | 'transaction' | 'workout' | 'food' | 'block' | 'planner' | null;

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  /** The 4-tile "Quick add" chooser (bottom sheet on phones). */
  quickAddSheetOpen: boolean;
  /** A specific create-form modal. */
  quickAddOpen: boolean;
  quickAddContext: QuickAddContext;
  voiceLogOpen: boolean;
  moreSheetOpen: boolean;
  helpModalOpen: boolean;
  theme: 'dark' | 'light';
  activeModule: string;

  toggleSidebar: () => void;
  setSidebarCollapsed: (val: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (val: boolean) => void;
  openQuickAddSheet: () => void;
  closeQuickAddSheet: () => void;
  openQuickAdd: (context?: QuickAddContext) => void;
  closeQuickAdd: () => void;
  setVoiceLogOpen: (val: boolean) => void;
  setMoreSheetOpen: (val: boolean) => void;
  toggleHelpModal: () => void;
  setHelpModalOpen: (val: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setActiveModule: (mod: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Open on desktop, rail-only on tablets/small laptops
  sidebarCollapsed: typeof window !== 'undefined' ? window.innerWidth < 1200 : false,
  commandPaletteOpen: false,
  quickAddSheetOpen: false,
  quickAddOpen: false,
  quickAddContext: null,
  voiceLogOpen: false,
  moreSheetOpen: false,
  helpModalOpen: false,
  theme: 'dark',
  activeModule: 'home',

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setCommandPaletteOpen: (val) => set({ commandPaletteOpen: val }),
  openQuickAddSheet: () => set({ quickAddSheetOpen: true }),
  closeQuickAddSheet: () => set({ quickAddSheetOpen: false }),
  openQuickAdd: (context = 'task') => set({ quickAddOpen: true, quickAddContext: context, quickAddSheetOpen: false }),
  closeQuickAdd: () => set({ quickAddOpen: false, quickAddContext: null }),
  setVoiceLogOpen: (val) => set({ voiceLogOpen: val, ...(val ? { quickAddSheetOpen: false } : {}) }),
  setMoreSheetOpen: (val) => set({ moreSheetOpen: val }),
  toggleHelpModal: () => set((state) => ({ helpModalOpen: !state.helpModalOpen })),
  setHelpModalOpen: (val) => set({ helpModalOpen: val }),
  setTheme: (theme) => set({ theme }),
  setActiveModule: (activeModule) => set({ activeModule }),
}));

import { create } from 'zustand';

export type QuickAddContext = 'task' | 'transaction' | 'workout' | 'food' | null;

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  quickAddOpen: boolean;
  quickAddContext: QuickAddContext;
  helpModalOpen: boolean;
  theme: 'dark' | 'light';
  activeModule: string;

  toggleSidebar: () => void;
  setSidebarCollapsed: (val: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (val: boolean) => void;
  openQuickAdd: (context?: QuickAddContext) => void;
  closeQuickAdd: () => void;
  toggleHelpModal: () => void;
  setHelpModalOpen: (val: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setActiveModule: (mod: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  quickAddOpen: false,
  quickAddContext: null,
  helpModalOpen: false,
  theme: 'dark',
  activeModule: 'home',

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setCommandPaletteOpen: (val) => set({ commandPaletteOpen: val }),
  openQuickAdd: (context = 'task') => set({ quickAddOpen: true, quickAddContext: context }),
  closeQuickAdd: () => set({ quickAddOpen: false, quickAddContext: null }),
  toggleHelpModal: () => set((state) => ({ helpModalOpen: !state.helpModalOpen })),
  setHelpModalOpen: (val) => set({ helpModalOpen: val }),
  setTheme: (theme) => set({ theme }),
  setActiveModule: (activeModule) => set({ activeModule }),
}));

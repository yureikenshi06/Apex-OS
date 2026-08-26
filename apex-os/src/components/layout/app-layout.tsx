import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { BottomNav } from './bottom-nav';
import { Header } from './header';
import { CommandPalette } from './command-palette';
import { QuickAddFab } from './quick-add-fab';
import { HelpModal } from './help-modal';
import { DailyDigestModal } from './daily-digest-modal';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useUIStore } from '@/store/ui-store';

export default function AppLayout() {
  useKeyboardShortcuts();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [digestOpen, setDigestOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastShown = localStorage.getItem('apex_digest_shown');
    if (lastShown !== today) {
      setDigestOpen(true);
      localStorage.setItem('apex_digest_shown', today);
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="mx-auto max-w-7xl h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <QuickAddFab />
      <HelpModal />
      <DailyDigestModal isOpen={digestOpen} onClose={() => setDigestOpen(false)} />
    </div>
  );
}

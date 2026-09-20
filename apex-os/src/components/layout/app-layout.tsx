import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { BottomNav } from './bottom-nav';
import { Header } from './header';
import { CommandPalette } from './command-palette';
import { QuickAddSheet } from './quick-add-sheet';
import { MoreSheet } from './more-sheet';
import { VoiceLogDialog } from './voice-log-dialog';
import { HelpModal } from './help-modal';
import { DailyDigestModal } from './daily-digest-modal';
import { AmbientBackground } from './ambient-background';
import { TaskFormModal } from '@/modules/tasks/task-form-modal';
import TransactionFormModal from '@/modules/finance/transaction-form-modal';
import { TimetableBlockModal } from '@/modules/timetable/timetable-block-modal';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useStreakReminders } from '@/hooks/use-streak-reminders';
import { useUIStore } from '@/store/ui-store';

export default function AppLayout() {
  useKeyboardShortcuts();
  useStreakReminders();
  const location = useLocation();
  const { commandPaletteOpen, setCommandPaletteOpen, quickAddOpen, quickAddContext, closeQuickAdd } = useUIStore();
  const [digestOpen, setDigestOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      if (localStorage.getItem('apex_digest_shown') !== today) {
        setDigestOpen(true);
        localStorage.setItem('apex_digest_shown', today);
      }
    } catch {
      /* storage blocked (private mode): skip the daily modal rather than nag every load */
    }
  }, []);

  // Each navigation starts at the top of the content area
  useEffect(() => {
    document.getElementById('main-scroll')?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-void font-sans text-foreground">
      <AmbientBackground />
      <Sidebar />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <Header />
        <main
          id="main-scroll"
          className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-4 md:px-8 md:pb-10 md:pt-7"
        >
          {/* keyed on the route so every screen gets the 180ms enter */}
          <div key={location.pathname} className="animate-enter mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNav />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <QuickAddSheet />
      <MoreSheet />
      <VoiceLogDialog />
      <HelpModal />
      <DailyDigestModal isOpen={digestOpen} onClose={() => setDigestOpen(false)} />

      {/* Create-form modals, opened from the quick-add sheet / palette / shortcuts */}
      <TaskFormModal isOpen={quickAddOpen && quickAddContext === 'task'} onClose={closeQuickAdd} />
      <TransactionFormModal isOpen={quickAddOpen && quickAddContext === 'transaction'} onClose={closeQuickAdd} />
      <TimetableBlockModal isOpen={quickAddOpen && quickAddContext === 'block'} onClose={closeQuickAdd} />
    </div>
  );
}

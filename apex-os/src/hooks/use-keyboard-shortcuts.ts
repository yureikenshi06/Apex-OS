import { useEffect, useState, useRef } from 'react';
import { useUIStore } from '@/store/ui-store';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const { toggleCommandPalette, openQuickAdd } = useUIStore();
  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      if (e.key === 'Escape') {
        useUIStore.setState({ commandPaletteOpen: false, quickAddOpen: false });
        return;
      }

      if (e.key === 'n') {
        e.preventDefault();
        openQuickAdd('task');
        return;
      }
      
      if (e.key === '?') {
        console.log('Toggle Help Modal');
        return;
      }

      if (e.key === 'g' && keySequence.length === 0) {
        setKeySequence(['g']);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setKeySequence([]), 1000);
        return;
      }

      if (keySequence.length === 1 && keySequence[0] === 'g') {
        e.preventDefault();
        switch (e.key) {
          case 'h': navigate('/'); break;
          case 't': navigate('/timetable'); break;
          case 'f': navigate('/finance'); break;
          case 'w': navigate('/fitness'); break;
          case 'c': navigate('/cfa'); break;
        }
        setKeySequence([]);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [keySequence, toggleCommandPalette, openQuickAdd, navigate]);
}

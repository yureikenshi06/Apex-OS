import { useEffect } from 'react';
import { create } from 'zustand';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { STREAK_LABELS, useStreaks } from '@/modules/home/insights';

/**
 * ONE daily notification, timed for the streak most at risk today — instead of a
 * separate reminder per module.
 *
 * Honest limits: there is no push server, so the check runs while the app is
 * open or is brought back to the foreground (the installed PWA's service worker
 * displays the notification and handles the tap). If the app hasn't been
 * opened since the reminder hour, it fires the next time it is.
 */

const PREFS_KEY = 'apex_streak_reminders';
const LAST_SENT_KEY = 'apex_streak_reminder_last';

interface Prefs {
  enabled: boolean;
  /** Local hour (0–23) after which today's reminder may fire. */
  hour: number;
}

const readPrefs = (): Prefs => {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { enabled: false, hour: 19, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { enabled: false, hour: 19 };
};

const writePrefs = (p: Prefs) => {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
};

interface ReminderStore extends Prefs {
  supported: boolean;
  permission: NotificationPermission | 'unsupported';
  enable: () => Promise<void>;
  disable: () => void;
  setHour: (hour: number) => void;
  refreshPermission: () => void;
}

const supported = typeof window !== 'undefined' && 'Notification' in window;

export const useReminderStore = create<ReminderStore>((set, get) => ({
  ...readPrefs(),
  supported,
  permission: supported ? Notification.permission : 'unsupported',

  enable: async () => {
    if (!supported) {
      toast.error('Notifications aren’t supported on this browser.');
      return;
    }
    let permission = Notification.permission;
    if (permission === 'default') permission = await Notification.requestPermission();
    set({ permission });

    if (permission === 'granted') {
      const next = { enabled: true, hour: get().hour };
      writePrefs(next);
      set(next);
      toast.success('Streak reminders on', {
        description: `You’ll get one nudge after ${get().hour}:00 if a streak is at risk.`,
      });
    } else {
      toast.error('Notifications are blocked', {
        description: 'Allow notifications for this site in your browser settings, then try again.',
      });
    }
  },
  disable: () => {
    const next = { enabled: false, hour: get().hour };
    writePrefs(next);
    set(next);
  },
  setHour: (hour) => {
    const next = { enabled: get().enabled, hour };
    writePrefs(next);
    set({ hour });
  },
  refreshPermission: () => {
    if (supported) set({ permission: Notification.permission });
  },
}));

async function showNotification(title: string, body: string, url: string) {
  const options: NotificationOptions & { renotify?: boolean } = {
    body,
    icon: '/icons/icon-192.svg',
    badge: '/icons/icon-192.svg',
    tag: 'apex-streak',
    data: { url },
  };
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) {
      await reg.showNotification(title, options);
      return;
    }
  } catch {
    /* fall through to the page-level API */
  }
  new Notification(title, options);
}

/** Mount once (in the app shell). */
export function useStreakReminders() {
  const enabled = useReminderStore((s) => s.enabled);
  const hour = useReminderStore((s) => s.hour);
  const permission = useReminderStore((s) => s.permission);
  const { atRisk } = useStreaks();

  const top = atRisk[0];
  const topKey = top?.key;
  const topCount = top?.count;

  useEffect(() => {
    if (!enabled || permission !== 'granted' || !topKey || !topCount) return;

    const check = () => {
      const now = new Date();
      if (now.getHours() < hour) return;
      const today = format(now, 'yyyy-MM-dd');
      try {
        if (localStorage.getItem(LAST_SENT_KEY) === today) return;
        localStorage.setItem(LAST_SENT_KEY, today);
      } catch {
        /* storage blocked: worst case we notify again on the next check */
      }
      const meta = STREAK_LABELS[topKey];
      void showNotification(
        `Keep your ${topCount}-day ${meta.noun} streak alive`,
        `${meta.action} before midnight.`,
        meta.path
      );
    };

    check();
    const id = window.setInterval(check, 5 * 60_000);
    const onVisible = () => document.visibilityState === 'visible' && check();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [enabled, permission, hour, topKey, topCount]);
}

import { useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useReminderStore } from '@/hooks/use-streak-reminders';

const HOURS = [17, 18, 19, 20, 21];

/** Icon button for the desktop header. */
export function StreakReminderButton({ className }: { className?: string }) {
  const { enabled, permission, enable, disable, supported, refreshPermission } = useReminderStore();
  useEffect(refreshPermission, [refreshPermission]);
  if (!supported) return null;

  const on = enabled && permission === 'granted';
  return (
    <button
      type="button"
      onClick={() => (on ? disable() : void enable())}
      aria-pressed={on}
      aria-label={on ? 'Turn off streak reminders' : 'Turn on streak reminders'}
      title={on ? 'Streak reminders on' : 'Get a daily nudge when a streak is at risk'}
      className={cn(
        'tap grid h-9 w-9 place-items-center rounded-[10px] border border-line-strong bg-surface-2 transition-colors hover:bg-surface-3',
        on ? 'text-blue-400' : 'text-fg-muted',
        className
      )}
    >
      {on ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
    </button>
  );
}

/** Settings row (used in the mobile "More" sheet). */
export function StreakReminderRow() {
  const { enabled, permission, hour, enable, disable, setHour, supported, refreshPermission } = useReminderStore();
  useEffect(refreshPermission, [refreshPermission]);
  if (!supported) return null;

  const on = enabled && permission === 'granted';
  return (
    <div className="rounded-2xl border border-line bg-surface-2 p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary/[0.14]">
          <Bell className="h-4 w-4 text-blue-400" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">Streak reminders</div>
          <div className="text-xs text-fg-muted">
            {permission === 'denied' ? 'Blocked in browser settings' : 'One nudge a day, for the streak most at risk'}
          </div>
        </div>
        <Switch
          checked={on}
          disabled={permission === 'denied'}
          onCheckedChange={(v) => (v ? void enable() : disable())}
          aria-label="Streak reminders"
        />
      </div>
      {on && (
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
          <span className="text-xs font-semibold text-fg-muted">Remind me after</span>
          <div className="flex gap-1">
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHour(h)}
                className={cn(
                  'tap h-8 rounded-lg px-2 font-mono text-xs font-semibold transition-colors',
                  h === hour ? 'bg-primary text-white' : 'bg-white/[0.05] text-fg-muted hover:bg-white/[0.09]'
                )}
              >
                {h}:00
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

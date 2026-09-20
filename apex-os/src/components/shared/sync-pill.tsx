import { CloudOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSyncStore } from '@/store/sync-store';

/**
 * Per-card offline indicator. Renders nothing unless this module has writes
 * that haven't reached the server yet, so it costs zero visual noise online.
 */
export function SyncPill({ scope, className }: { scope: string; className?: string }) {
  const queued = useSyncStore((s) => s.queuedScopes[scope] ?? 0);
  if (queued === 0) return null;

  return (
    <span
      role="status"
      title={`${queued} change${queued > 1 ? 's' : ''} waiting to sync`}
      className={cn(
        'animate-fade inline-flex shrink-0 items-center gap-1 rounded-md bg-warning/[0.14] px-1.5 py-0.5 text-[11px] font-bold text-amber-400',
        className
      )}
    >
      <CloudOff className="h-3 w-3" aria-hidden />
      Queued{queued > 1 ? ` · ${queued}` : ''}
    </span>
  );
}

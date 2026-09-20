import { useRouteError } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';

export function PageLoader() {
  return (
    <div className="grid h-dvh w-screen place-items-center bg-void" role="status" aria-label="Loading">
      <div className="animate-fade flex flex-col items-center gap-4">
        <Logo size={44} className="animate-pulse" />
        <span className="text-xs font-semibold text-fg-subtle">Loading Apex OS…</span>
      </div>
    </div>
  );
}

/**
 * Shown when a route fails to load. The usual cause is a stale tab after a
 * deploy (the old chunk no longer exists), and a reload fixes it.
 */
export function RouteError() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Something went wrong loading this screen.';

  return (
    <div className="grid min-h-dvh w-full place-items-center bg-void p-6 text-center">
      <div className="animate-enter flex max-w-sm flex-col items-center gap-4">
        <Logo size={44} />
        <h1 className="text-lg font-extrabold">This screen didn’t load</h1>
        <p className="text-sm text-fg-muted">
          Apex may have been updated since you opened it, or your connection dropped. Reloading usually fixes it.
        </p>
        <p className="max-w-full truncate font-mono text-[11px] text-fg-subtle">{message}</p>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw /> Reload
        </Button>
      </div>
    </div>
  );
}

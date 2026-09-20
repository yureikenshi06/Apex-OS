import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/layout/auth-provider';
import { router } from './router';
import { startSyncTracker } from '@/lib/sync-tracker';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  // Enforce dark mode on HTML element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Mirror paused (offline) mutations into the sync store → "Queued" pills
  useEffect(() => startSyncTracker(queryClient), []);

  return (
    // reducedMotion="user": framer-motion honours the OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          {/* top-centre keeps toasts clear of the bottom nav / FAB on phones */}
          <Toaster
            theme="dark"
            position="top-center"
            offset="max(16px, env(safe-area-inset-top))"
            toastOptions={{
              style: {
                background: 'rgb(18 22 31)',
                border: '1px solid rgb(35 40 56)',
                color: 'rgb(242 244 248)',
                borderRadius: '14px',
                fontFamily: 'Manrope, system-ui, sans-serif',
              },
            }}
          />
        </AuthProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

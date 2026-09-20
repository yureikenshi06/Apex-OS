import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { PageLoader, RouteError } from '@/components/shared/page-states';

/**
 * Every screen is its own chunk, so the first paint only downloads the shell
 * plus the page you asked for (the app used to ship as one ~1.7 MB bundle).
 * React Router holds navigation until the chunk arrives — no flash of nothing.
 */
const page = (load: () => Promise<{ default: ComponentType }>): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => ({ Component: (await load()).default }),
});

export const router = createBrowserRouter([
  {
    path: '/login',
    ...page(() => import('@/modules/auth/login-page')),
    hydrateFallbackElement: <PageLoader />,
    errorElement: <RouteError />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    hydrateFallbackElement: <PageLoader />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', ...page(() => import('@/modules/home/home-page')) },
      { path: 'tasks', ...page(() => import('@/modules/tasks/tasks-page')) },
      { path: 'timetable', ...page(() => import('@/modules/timetable/timetable-page')) },
      { path: 'timetable/daily', ...page(() => import('@/modules/timetable/daily-planner-page')) },
      { path: 'timetable/habits', ...page(() => import('@/modules/timetable/habit-tracker-page')) },
      { path: 'timetable/placement', ...page(() => import('@/modules/timetable/placement-page')) },
      { path: 'timetable/academic', ...page(() => import('@/modules/timetable/academic-page')) },
      { path: 'timetable/brand', ...page(() => import('@/modules/timetable/personal-brand-page')) },
      { path: 'timetable/review', ...page(() => import('@/modules/timetable/weekly-review-page')) },
      { path: 'finance', ...page(() => import('@/modules/finance/finance-page')) },
      { path: 'finance/transactions', ...page(() => import('@/modules/finance/transactions-page')) },
      { path: 'finance/budgets', ...page(() => import('@/modules/finance/budgets-page')) },
      { path: 'finance/recurring', ...page(() => import('@/modules/finance/recurring-page')) },
      { path: 'finance/splits', ...page(() => import('@/modules/finance/splits-page')) },
      { path: 'finance/networth', ...page(() => import('@/modules/finance/net-worth-page')) },
      { path: 'fitness', ...page(() => import('@/modules/fitness/fitness-page')) },
      { path: 'fitness/workout', ...page(() => import('@/modules/fitness/workout-page')) },
      { path: 'fitness/log', ...page(() => import('@/modules/fitness/workout-log-page')) },
      { path: 'fitness/habits', ...page(() => import('@/modules/fitness/fitness-habits-page')) },
      { path: 'fitness/meals', ...page(() => import('@/modules/fitness/meals-page')) },
      { path: 'fitness/food-log', ...page(() => import('@/modules/fitness/food-log-page')) },
      { path: 'fitness/grocery', ...page(() => import('@/modules/fitness/grocery-page')) },
      { path: 'fitness/supplements', ...page(() => import('@/modules/fitness/supplements-page')) },
      { path: 'fitness/body', ...page(() => import('@/modules/fitness/body-page')) },
      { path: 'fitness/cardio', ...page(() => import('@/modules/fitness/cardio-page')) },
      { path: 'fitness/sleep', ...page(() => import('@/modules/fitness/sleep-page')) },
      { path: 'cfa', ...page(() => import('@/modules/cfa/cfa-page')) },
      { path: 'cfa/topics', ...page(() => import('@/modules/cfa/cfa-topics-page')) },
      { path: 'cfa/revision', ...page(() => import('@/modules/cfa/cfa-revision-page')) },
      { path: 'settings', element: <Navigate to="/home" replace /> },
    ],
  },
]);

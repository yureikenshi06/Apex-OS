import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import LoginPage from '@/modules/auth/login-page';
import HomePage from '@/modules/home/home-page';
import TasksPage from '@/modules/tasks/tasks-page';
import TimetablePage from '@/modules/timetable/timetable-page';
import DailyPlannerPage from '@/modules/timetable/daily-planner-page';
import HabitTrackerPage from '@/modules/timetable/habit-tracker-page';
import PlacementPage from '@/modules/timetable/placement-page';
import AcademicPage from '@/modules/timetable/academic-page';
import PersonalBrandPage from '@/modules/timetable/personal-brand-page';
import WeeklyReviewPage from '@/modules/timetable/weekly-review-page';
import FinancePage from '@/modules/finance/finance-page';
import TransactionsPage from '@/modules/finance/transactions-page';
import BudgetsPage from '@/modules/finance/budgets-page';
import RecurringPage from '@/modules/finance/recurring-page';
import SplitsPage from '@/modules/finance/splits-page';
import NetWorthPage from '@/modules/finance/net-worth-page';
import FitnessPage from '@/modules/fitness/fitness-page';
import WorkoutPage from '@/modules/fitness/workout-page';
import WorkoutLogPage from '@/modules/fitness/workout-log-page';
import FitnessHabitsPage from '@/modules/fitness/fitness-habits-page';
import MealsPage from '@/modules/fitness/meals-page';
import FoodLogPage from '@/modules/fitness/food-log-page';
import GroceryPage from '@/modules/fitness/grocery-page';
import SupplementsPage from '@/modules/fitness/supplements-page';
import BodyPage from '@/modules/fitness/body-page';
import CardioPage from '@/modules/fitness/cardio-page';
import SleepPage from '@/modules/fitness/sleep-page';
import CFAPage from '@/modules/cfa/cfa-page';
import CFATopicsPage from '@/modules/cfa/cfa-topics-page';
import CFARevisionPage from '@/modules/cfa/cfa-revision-page';
import SettingsPage from '@/modules/settings/settings-page';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'timetable', element: <TimetablePage /> },
      { path: 'timetable/daily', element: <DailyPlannerPage /> },
      { path: 'timetable/habits', element: <HabitTrackerPage /> },
      { path: 'timetable/placement', element: <PlacementPage /> },
      { path: 'timetable/academic', element: <AcademicPage /> },
      { path: 'timetable/brand', element: <PersonalBrandPage /> },
      { path: 'timetable/review', element: <WeeklyReviewPage /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'finance/transactions', element: <TransactionsPage /> },
      { path: 'finance/budgets', element: <BudgetsPage /> },
      { path: 'finance/recurring', element: <RecurringPage /> },
      { path: 'finance/splits', element: <SplitsPage /> },
      { path: 'finance/networth', element: <NetWorthPage /> },
      { path: 'fitness', element: <FitnessPage /> },
      { path: 'fitness/workout', element: <WorkoutPage /> },
      { path: 'fitness/log', element: <WorkoutLogPage /> },
      { path: 'fitness/habits', element: <FitnessHabitsPage /> },
      { path: 'fitness/meals', element: <MealsPage /> },
      { path: 'fitness/food-log', element: <FoodLogPage /> },
      { path: 'fitness/grocery', element: <GroceryPage /> },
      { path: 'fitness/supplements', element: <SupplementsPage /> },
      { path: 'fitness/body', element: <BodyPage /> },
      { path: 'fitness/cardio', element: <CardioPage /> },
      { path: 'fitness/sleep', element: <SleepPage /> },
      { path: 'cfa', element: <CFAPage /> },
      { path: 'cfa/topics', element: <CFATopicsPage /> },
      { path: 'cfa/revision', element: <CFARevisionPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

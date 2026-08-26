import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { getTasks } from '@/api/tasks';
import { getDailyPlannerEntries } from '@/api/timetable';
import { getTransactions, getBudgets } from '@/api/finance';
import { getFitnessHabitDaily } from '@/api/fitness';
import { getCFATopics } from '@/api/cfa';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isToday, parseISO } from 'date-fns';

export function useHomeStats() {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const monthStart = startOfMonth(new Date()).toISOString().split('T')[0];
  const monthEnd = endOfMonth(new Date()).toISOString().split('T')[0];

  const tasksQuery = useQuery({
    queryKey: ['tasks', owner_id],
    queryFn: () => getTasks(owner_id),
    enabled: !!owner_id,
  });

  const spendQuery = useQuery({
    queryKey: ['transactions', owner_id, monthStart, monthEnd],
    queryFn: () => getTransactions(owner_id, { month: new Date().toLocaleString('default', { month: 'long' }), year: new Date().getFullYear() }),
    enabled: !!owner_id,
  });

  const budgetsQuery = useQuery({
    queryKey: ['budgets', owner_id],
    queryFn: () => getBudgets(owner_id),
    enabled: !!owner_id,
  });

  const fitnessHabitsQuery = useQuery({
    queryKey: ['fitnessHabits', owner_id, todayStr],
    queryFn: () => getFitnessHabitDaily(owner_id, todayStr),
    enabled: !!owner_id,
  });

  const cfaTopicsQuery = useQuery({
    queryKey: ['cfaTopics', owner_id],
    queryFn: () => getCFATopics(owner_id),
    enabled: !!owner_id,
  });

  const tasks = tasksQuery.data || [];
  const overdueCount = tasks.filter(t => t.deadline && isBefore(parseISO(t.deadline), new Date()) && !isToday(parseISO(t.deadline)) && t.status !== 'Done').length;
  const todayCount = tasks.filter(t => t.deadline && isToday(parseISO(t.deadline)) && t.status !== 'Done').length;

  const transactions = spendQuery.data || [];
  const monthlySpendTotal = transactions
    .filter(t => t.transaction_type === 'Expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const budgets = budgetsQuery.data || [];
  const totalBudget = budgets.reduce((sum, b) => sum + (b.monthly_budget || 0), 0) || 50000;

  const fitnessHabit = fitnessHabitsQuery.data;
  let habitsCompleted = 0;
  if (fitnessHabit) {
    if (fitnessHabit.workout_completed) habitsCompleted++;
    if (fitnessHabit.steps_completed) habitsCompleted++;
    if (fitnessHabit.calories_within_target) habitsCompleted++;
    if (fitnessHabit.protein_target_hit) habitsCompleted++;
    if (fitnessHabit.water_target_hit) habitsCompleted++;
    if (fitnessHabit.sleep_target_hit) habitsCompleted++;
    if (fitnessHabit.fruits_veg_consumed) habitsCompleted++;
    if (fitnessHabit.no_junk_food) habitsCompleted++;
    if (fitnessHabit.mobility_stretching) habitsCompleted++;
  }

  const cfaTopics = cfaTopicsQuery.data || [];
  const totalPlannedCfaHours = cfaTopics
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + (t.planned_hours || 0), 0);

  return {
    cfaHours: { value: totalPlannedCfaHours || 12.5, target: 20 },
    monthlySpend: { value: monthlySpendTotal || 0, budget: totalBudget },
    fitnessHabits: { completed: habitsCompleted, total: 9 },
    tasksDue: { overdue: overdueCount, today: todayCount },
    isLoading: tasksQuery.isLoading || spendQuery.isLoading,
  };
}

export function useDailyScore(date: string) {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['dailyScore', owner_id, date],
    queryFn: async () => {
      const entries = await getDailyPlannerEntries(owner_id, date);
      if (!entries || entries.length === 0) return 0;
      
      let totalWeight = 0;
      let earned = 0;
      entries.forEach(entry => {
        const weight = 1;
        const val = entry.completion_status === 'Completed' ? 1 : entry.completion_status === 'In Progress' ? 0.5 : 0;
        totalWeight += weight;
        earned += weight * val;
      });
      return totalWeight > 0 ? (earned / totalWeight) * 100 : 0;
    },
    enabled: !!owner_id,
  });
}

export function useNeedsAttention() {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['needsAttention', owner_id],
    queryFn: async () => {
      const tasks = await getTasks(owner_id);
      const overdueTasks = tasks?.filter(t => t.deadline && isBefore(parseISO(t.deadline), new Date()) && !isToday(parseISO(t.deadline)) && t.status !== 'Done') || [];
      
      const attentionItems = overdueTasks.map(t => ({
        id: `task-${t.id}`,
        type: 'task',
        title: `Overdue Task: ${t.title}`,
        urgency: 'red',
      }));
      return attentionItems;
    },
    enabled: !!owner_id,
  });
}

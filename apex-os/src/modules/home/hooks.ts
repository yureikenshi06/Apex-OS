import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { getTasks } from '@/api/tasks';
import { getDailyPlannerEntries, getTimetableBlocks } from '@/api/timetable';
import { getTransactions, getBudgets } from '@/api/finance';
import { getFitnessHabitDaily } from '@/api/fitness';
import { getCFATopics } from '@/api/cfa';
import { MASTER_TIMETABLE_SEED } from '../timetable/master-timetable-seed';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isToday, parseISO } from 'date-fns';

export function useHomeStats() {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const now = new Date();
  const currentMonthNum = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const tasksQuery = useQuery({
    queryKey: ['tasks', owner_id],
    queryFn: () => getTasks(owner_id),
    enabled: !!owner_id,
  });

  const spendQuery = useQuery({
    queryKey: ['transactions', owner_id, currentMonthNum, currentYear],
    queryFn: () => getTransactions(owner_id, { month: currentMonthNum, year: currentYear }),
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
  const totalActiveTasks = tasks.filter(t => t.status !== 'Done').length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;

  const transactions = spendQuery.data || [];
  const monthlySpendTotal = transactions
    .filter(t => t.transaction_type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const monthlyIncomeTotal = transactions
    .filter(t => t.transaction_type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const budgets = budgetsQuery.data || [];
  const totalBudget = budgets.reduce((sum, b) => sum + Number(b.monthly_budget || 0), 0) || 50000;

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
  const completedTopicsCount = cfaTopics.filter(t => t.status === 'Completed').length;
  const totalTopicsCount = cfaTopics.length || 100;
  const cfaMasteryPct = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  return {
    cfaHours: { 
      value: 12.5, 
      target: 20, 
      masteryPct: cfaMasteryPct,
      completedTopics: completedTopicsCount,
      totalTopics: totalTopicsCount 
    },
    monthlySpend: { 
      value: monthlySpendTotal, 
      budget: totalBudget,
      income: monthlyIncomeTotal 
    },
    fitnessHabits: { 
      completed: habitsCompleted, 
      total: 9,
      pct: Math.round((habitsCompleted / 9) * 100)
    },
    tasksDue: { 
      overdue: overdueCount, 
      today: todayCount,
      active: totalActiveTasks,
      completed: completedTasks 
    },
    isLoading: tasksQuery.isLoading || spendQuery.isLoading,
  };
}

// --- Automatic Today Schedule Hook ---
export function useTodaySchedule(dateStr?: string) {
  const { user } = useAuth();
  const owner_id = user?.id || '';
  const today = dateStr || format(new Date(), 'yyyy-MM-dd');
  
  // Calculate today's day of week (0=Mon ... 6=Sun)
  const now = new Date();
  const jsDay = now.getDay(); // 0 is Sun, 1 is Mon
  const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

  const plannerQuery = useQuery({
    queryKey: ['dailyPlanner', owner_id, today],
    queryFn: () => getDailyPlannerEntries(owner_id, today),
    enabled: !!owner_id,
  });

  const timetableQuery = useQuery({
    queryKey: ['timetableBlocks', owner_id],
    queryFn: () => getTimetableBlocks(owner_id),
    enabled: !!owner_id,
  });

  const plannerEntries = plannerQuery.data || [];
  const dbTimetableBlocks = timetableQuery.data || [];

  // If planner entries exist for today, use them; otherwise use today's timetable blocks or master seed
  const scheduleItems = useMemo(() => {
    if (plannerEntries.length > 0) {
      return plannerEntries.map(e => ({
        id: e.id,
        activity: e.planned_activity,
        start_time: e.start_time,
        end_time: e.end_time,
        category: e.category,
        completion_status: e.completion_status || 'To Do',
        priority: e.priority,
        source: 'planner' as const,
      }));
    }

    const todayDbBlocks = dbTimetableBlocks.filter(b => b.day_of_week === dayOfWeek);
    if (todayDbBlocks.length > 0) {
      return todayDbBlocks.map((b, idx) => ({
        id: b.id || `tb-${idx}`,
        activity: b.activity,
        start_time: b.start_time,
        end_time: b.end_time,
        category: b.category,
        color: b.color,
        completion_status: 'To Do',
        priority: 'P1',
        source: 'timetable' as const,
      }));
    }

    // Fallback directly to Master Seed routine for today's day of week
    const seedToday = MASTER_TIMETABLE_SEED.filter(s => s.day_of_week === dayOfWeek);
    return seedToday.map((s, idx) => ({
      id: `seed-today-${idx}`,
      activity: s.activity,
      start_time: s.start_time,
      end_time: s.end_time,
      category: s.category,
      color: s.color,
      completion_status: 'To Do',
      priority: 'P1',
      source: 'seed' as const,
    }));
  }, [plannerEntries, dbTimetableBlocks, dayOfWeek]);

  // Find currently ongoing block and next upcoming block
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let ongoingBlock: any = null;
  let nextBlock: any = null;

  scheduleItems.forEach((item: any) => {
    if (!item.start_time || !item.end_time) return;
    const [sh, sm] = item.start_time.split(':').map(Number);
    const [eh, em] = item.end_time.split(':').map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    if (currentMinutes >= startMin && currentMinutes <= endMin) {
      ongoingBlock = item;
    } else if (startMin > currentMinutes && (!nextBlock || startMin < (parseInt(nextBlock.start_time.split(':')[0]) * 60 + parseInt(nextBlock.start_time.split(':')[1])))) {
      nextBlock = item;
    }
  });

  return {
    schedule: scheduleItems,
    ongoingBlock,
    nextBlock,
    isLoading: plannerQuery.isLoading || timetableQuery.isLoading,
  };
}

// --- Composite Daily Execution Score Hook ---
export function useDailyScore(dateStr?: string) {
  const { user } = useAuth();
  const owner_id = user?.id || '';
  const today = dateStr || format(new Date(), 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['dailyExecutionScore', owner_id, today],
    queryFn: async () => {
      if (!owner_id) return 78; // High performance default baseline

      const [plannerEntries, fitnessHabits, tasks] = await Promise.all([
        getDailyPlannerEntries(owner_id, today),
        getFitnessHabitDaily(owner_id, today),
        getTasks(owner_id),
      ]);

      let score = 0;
      let components = 0;

      // 1. Schedule Execution (Weight 40%)
      if (plannerEntries && plannerEntries.length > 0) {
        const completed = plannerEntries.filter(e => e.completion_status === 'Completed').length;
        const inProg = plannerEntries.filter(e => e.completion_status === 'In Progress').length;
        const schedPct = ((completed + inProg * 0.5) / plannerEntries.length) * 100;
        score += schedPct * 0.4;
      } else {
        score += 85 * 0.4; // standard routine baseline
      }
      components += 40;

      // 2. Fitness Habits (Weight 30%)
      if (fitnessHabits) {
        let hCount = 0;
        if (fitnessHabits.workout_completed) hCount += 3;
        if (fitnessHabits.steps_completed) hCount += 1;
        if (fitnessHabits.calories_within_target) hCount += 1;
        if (fitnessHabits.protein_target_hit) hCount += 1;
        if (fitnessHabits.water_target_hit) hCount += 1;
        if (fitnessHabits.sleep_target_hit) hCount += 1;
        if (fitnessHabits.fruits_veg_consumed) hCount += 1;
        const fitPct = Math.min(100, (hCount / 9) * 100);
        score += fitPct * 0.3;
      } else {
        score += 75 * 0.3;
      }
      components += 30;

      // 3. Task Deliverables (Weight 30%)
      if (tasks && tasks.length > 0) {
        const done = tasks.filter(t => t.status === 'Done').length;
        const taskPct = (done / tasks.length) * 100;
        score += taskPct * 0.3;
      } else {
        score += 80 * 0.3;
      }
      components += 30;

      return Math.round(score);
    },
    enabled: !!owner_id,
  });
}

// --- Smart Attention Radar Hook (Intelligence Engine) ---
export function useNeedsAttention() {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['smartRadarAttention', owner_id],
    queryFn: async () => {
      if (!owner_id) return [];

      const [tasks, transactions, budgets, fitnessHabits, cfaTopics] = await Promise.all([
        getTasks(owner_id),
        getTransactions(owner_id, { month: new Date().getMonth() + 1, year: new Date().getFullYear() }),
        getBudgets(owner_id),
        getFitnessHabitDaily(owner_id, format(new Date(), 'yyyy-MM-dd')),
        getCFATopics(owner_id),
      ]);

      const items: Array<{
        id: string;
        type: string;
        title: string;
        description: string;
        urgency: 'critical' | 'warning' | 'info' | 'good';
        link: string;
        actionText: string;
      }> = [];

      // 1. Overdue Tasks
      const overdueTasks = tasks.filter(t => t.deadline && isBefore(parseISO(t.deadline), new Date()) && !isToday(parseISO(t.deadline)) && t.status !== 'Done');
      if (overdueTasks.length > 0) {
        items.push({
          id: 'overdue-tasks',
          type: 'Tasks',
          title: `${overdueTasks.length} Overdue Deliverable${overdueTasks.length > 1 ? 's' : ''}`,
          description: `Priority item: "${overdueTasks[0]?.title}" needs immediate closure.`,
          urgency: 'critical',
          link: '/tasks',
          actionText: 'View Tasks',
        });
      }

      // 2. High Priority Task due today
      const highToday = tasks.filter(t => t.priority === 'High' && isToday(parseISO(t.deadline || '')) && t.status !== 'Done');
      if (highToday.length > 0) {
        items.push({
          id: 'high-priority-today',
          type: 'Tasks',
          title: `High-Priority Action Due Today`,
          description: `"${highToday[0]?.title}" is scheduled for completion today.`,
          urgency: 'warning',
          link: '/tasks',
          actionText: 'Execute',
        });
      }

      // 3. Budget Limits Overruns
      const catSpend: Record<string, number> = {};
      transactions.filter(t => t.transaction_type === 'Expense').forEach(t => {
        catSpend[t.category || 'Other'] = (catSpend[t.category || 'Other'] || 0) + Number(t.amount || 0);
      });
      budgets.forEach(b => {
        const spent = catSpend[b.category] || 0;
        const limit = Number(b.monthly_budget || 0);
        if (limit > 0 && spent >= limit) {
          items.push({
            id: `budget-over-${b.category}`,
            type: 'Finance',
            title: `Budget Exceeded: ${b.category}`,
            description: `Spent ₹${spent.toLocaleString()} of ₹${limit.toLocaleString()} limit.`,
            urgency: 'critical',
            link: '/finance/budgets',
            actionText: 'Inspect Budget',
          });
        } else if (limit > 0 && spent >= limit * 0.85) {
          items.push({
            id: `budget-warn-${b.category}`,
            type: 'Finance',
            title: `Approaching Limit: ${b.category}`,
            description: `${Math.round((spent/limit)*100)}% of monthly allocation used.`,
            urgency: 'warning',
            link: '/finance/budgets',
            actionText: 'Review Spend',
          });
        }
      });

      // 4. CFA Milestone Check
      const highCfaPending = cfaTopics.filter(t => t.priority === 'High' && t.status !== 'Completed');
      if (highCfaPending.length > 0) {
        items.push({
          id: 'cfa-milestone',
          type: 'CFA',
          title: `CFA Milestone in Progress`,
          description: `${highCfaPending[0]?.module}: ${highCfaPending[0]?.chapter_topic}`,
          urgency: 'info',
          link: '/cfa/topics',
          actionText: 'Study LOS',
        });
      }

      // 5. Workout Check-in
      if (!fitnessHabits?.workout_completed) {
        items.push({
          id: 'fitness-workout',
          type: 'Fitness',
          title: `Daily Gym Session Pending`,
          description: `Log your workout sets & cardio logs for today.`,
          urgency: 'info',
          link: '/fitness/workout',
          actionText: 'Log Workout',
        });
      }

      return items;
    },
    enabled: !!owner_id,
  });
}

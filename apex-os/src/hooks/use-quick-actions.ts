import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useAddTask } from '@/modules/tasks/hooks';
import { useAddTransaction, useBudgets } from '@/modules/finance/hooks';
import { useFinanceCategories } from '@/modules/finance/category-store';
import { getFitnessHabitDaily, upsertFitnessHabitDaily } from '@/api/fitness';
import { describeParsed, parseQuickCommand, type ParsedCommand } from '@/lib/quick-parse';

/**
 * Parses free text into an action and executes it against the same mutations
 * the forms use — so a voice/palette entry is indistinguishable from a manual one
 * (and is queued/paused offline exactly like one).
 */
export function useQuickActions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const addTask = useAddTask();
  const addTransaction = useAddTransaction();
  const { data: budgets = [] } = useBudgets();
  const { categories: financeCategories } = useFinanceCategories();
  const expenseCategories = useMemo(() => Object.keys(financeCategories?.Expense ?? {}), [financeCategories]);

  const markWorkout = useMutation({
    meta: { scope: 'fitness' },
    mutationFn: async () => {
      const owner_id = user?.id ?? '';
      const date = format(new Date(), 'yyyy-MM-dd');
      const existing = await getFitnessHabitDaily(owner_id, date);
      return upsertFitnessHabitDaily({ ...(existing ?? {}), owner_id, date, workout_completed: true } as never);
    },
    onSuccess: () => {
      ['fitnessHabits', 'streaks', 'dailyExecutionScore', 'weeklyDigest', 'smartRadarAttention'].forEach((k) =>
        queryClient.invalidateQueries({ queryKey: [k] })
      );
    },
  });

  // The user's own category names first ("Dining" from their budgets), then the defaults
  const categories = useMemo(
    () => Array.from(new Set([...budgets.map((b) => b.category), ...expenseCategories])).filter(Boolean),
    [budgets, expenseCategories]
  );

  const parse = useCallback((text: string) => parseQuickCommand(text, { categories }), [categories]);

  const run = useCallback(
    async (cmd: ParsedCommand) => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const { title } = describeParsed(cmd);
      try {
        if (cmd.kind === 'task') {
          await addTask.mutateAsync({
            title: cmd.title,
            category: 'Personal',
            priority: cmd.priority ?? 'Medium',
            status: 'To Do',
            deadline: cmd.deadline ?? null,
          });
        } else if (cmd.kind === 'expense' || cmd.kind === 'income') {
          await addTransaction.mutateAsync({
            date: today,
            transaction_type: cmd.kind === 'income' ? 'Income' : 'Expense',
            category: cmd.category,
            description: cmd.description,
            amount: cmd.amount,
            status: 'Completed',
          });
        } else {
          await markWorkout.mutateAsync();
        }
        toast.success('Added', { description: title });
        return true;
      } catch (err) {
        toast.error('Couldn’t save that', { description: err instanceof Error ? err.message : undefined });
        return false;
      }
    },
    [addTask, addTransaction, markWorkout]
  );

  return { parse, run, isSaving: addTask.isPending || addTransaction.isPending || markWorkout.isPending };
}

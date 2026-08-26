import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/layout/auth-provider';
import { getTasks, addTask, updateTask, deleteTask } from '@/api/tasks';
import type { Task } from '@/types/database';

export function useTasks(filters?: { category?: string; priority?: string; status?: string }) {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['tasks', owner_id, filters],
    queryFn: async () => {
      const tasks = await getTasks(owner_id);
      if (!tasks) return [];
      return tasks.filter(t => {
        if (filters?.category && t.category !== filters.category) return false;
        if (filters?.priority && t.priority !== filters.priority) return false;
        if (filters?.status && t.status !== filters.status) return false;
        return true;
      });
    },
    enabled: !!owner_id,
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (newTask: Partial<Task>) => addTask({ ...newTask, owner_id: user?.id || '' } as Task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) => updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: any) => {
        if (!old) return old;
        return old.map((t: any) => (t.id === id ? { ...t, ...updates } : t));
      });
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

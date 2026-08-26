import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/layout/auth-provider';
import { getTasks, addTask, updateTask, deleteTask } from '@/api/tasks';
import type { Task, TaskInsert, TaskUpdate } from '@/api/types';

export interface TaskFilters {
  category?: string;
  priority?: string;
  status?: string;
  search?: string;
}

export function useTasks(filters?: TaskFilters) {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['tasks', owner_id, filters],
    queryFn: async () => {
      if (!owner_id) return [];
      const tasks = await getTasks(owner_id);
      if (!tasks) return [];

      return tasks.filter(t => {
        if (filters?.category && filters.category !== 'all' && t.category !== filters.category) return false;
        if (filters?.priority && filters.priority !== 'all' && t.priority !== filters.priority) return false;
        if (filters?.status && filters.status !== 'all') {
          if (filters.status === 'Incomplete') {
            if (t.status === 'Done') return false;
          } else if (t.status !== filters.status) {
            return false;
          }
        }
        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = t.title?.toLowerCase().includes(q);
          const matchNotes = t.notes?.toLowerCase().includes(q);
          const matchCat = t.category?.toLowerCase().includes(q);
          if (!matchTitle && !matchNotes && !matchCat) return false;
        }
        return true;
      });
    },
    enabled: !!owner_id,
  });
}

export function useAllTasks() {
  const { user } = useAuth();
  const owner_id = user?.id || '';

  return useQuery({
    queryKey: ['tasks', owner_id, 'all-unfiltered'],
    queryFn: async () => {
      if (!owner_id) return [];
      return (await getTasks(owner_id)) || [];
    },
    enabled: !!owner_id,
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (newTask: Omit<TaskInsert, 'owner_id'>) => 
      addTask({ ...newTask, owner_id: user?.id || '' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['home-stats'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TaskUpdate }) => 
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['home-stats'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['home-stats'] });
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/api/cfa';
import { addTask } from '@/api/tasks';
import { useAuth } from '@/hooks/use-auth';
import type { CFATopic, CFARevisionPlan, CFATopicInsert } from '@/api/types';

export function useCFATopics(filters?: { module?: string; status?: string; priority?: string; revision_status?: string; row_type?: string; search?: string }) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cfaTopics', user?.id, filters],
    queryFn: async () => {
      if (!user?.id) return [];
      const topics = await api.getCFATopics(user.id, filters?.module === 'All' ? undefined : filters?.module);
      return topics.filter(t => {
        if (filters?.status && filters.status !== 'All' && t.status !== filters.status) return false;
        if (filters?.priority && filters.priority !== 'All' && t.priority !== filters.priority) return false;
        if (filters?.revision_status && filters.revision_status !== 'All' && t.revision_status !== filters.revision_status) return false;
        if (filters?.row_type && filters.row_type !== 'All' && t.row_type !== filters.row_type) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const matchCh = t.chapter_topic?.toLowerCase().includes(s);
          const matchSub = t.subtopic_lo?.toLowerCase().includes(s);
          if (!matchCh && !matchSub) return false;
        }
        return true;
      });
    },
    enabled: !!user?.id,
  });
}

export function useAddCFATopic() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (topic: CFATopicInsert) => api.addCFATopic({ ...topic, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cfaTopics'] });
      queryClient.invalidateQueries({ queryKey: ['cfaDashboardStats'] });
    },
  });
}

export function useUpdateCFATopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; updates: Partial<CFATopic> }) => api.updateCFATopic(args.id, args.updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['cfaTopics'] });
      const previous = queryClient.getQueryData(['cfaTopics']);
      queryClient.setQueryData(['cfaTopics'], (old: any) =>
        old?.map((t: any) => (t.id === id ? { ...t, ...updates } : t))
      );
      return { previous };
    },
    onError: (err, variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(['cfaTopics'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cfaTopics'] });
      queryClient.invalidateQueries({ queryKey: ['cfaDashboardStats'] });
    },
  });
}

export function useDeleteCFATopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteCFATopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cfaTopics'] });
      queryClient.invalidateQueries({ queryKey: ['cfaDashboardStats'] });
    },
  });
}

export function useLinkTopicToTask() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (topic: CFATopic) => {
      if (!user?.id) throw new Error('No user');
      const newTask = await addTask({
        owner_id: user.id,
        title: `[${topic.module}] ${topic.chapter_topic}`,
        category: 'CFA',
        priority: topic.priority === 'High' ? 'High' : topic.priority === 'Low' ? 'Low' : 'Medium',
        status: topic.completed ? 'Done' : 'To Do',
        estimated_hours: topic.planned_hours || 2,
        linked_area: topic.module,
        linked_cfa_topic_id: topic.id,
      });
      await api.linkTopicToTask(topic.id, newTask.id);
      return { topicId: topic.id, taskId: newTask.id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cfaTopics'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUnlinkTopicFromTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (topicId: string) => {
      await api.unlinkTopicFromTask(topicId);
      return { topicId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cfaTopics'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useCFARevisionPlan() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cfaRevisionPlan', user?.id],
    queryFn: () => api.getCFARevisionPlan(user?.id!),
    enabled: !!user?.id,
  });
}

export function useAddRevisionItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (item: any) => api.addCFARevisionItem({ ...item, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cfaRevisionPlan'] }),
  });
}

export function useUpdateRevisionItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; updates: Partial<CFARevisionPlan> }) => api.updateCFARevisionItem(args.id, args.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cfaRevisionPlan'] }),
  });
}

export function useDeleteRevisionItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteCFARevisionItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cfaRevisionPlan'] }),
  });
}

const CFA_MODULES = [
  'Quantitative Methods',
  'Economics',
  'Corporate Finance',
  'Financial Statement Analysis',
  'Equities',
  'Fixed Income',
  'Derivatives',
  'Alternative Investments',
  'Portfolio Construction',
  'Ethical and Professional Standards',
];

export function useCFADashboardStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cfaDashboardStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return {
        totalCompleted: 0,
        totalTopics: 0,
        overallHoursLogged: 0,
        modules: [],
        chaptersCompleted: 0,
        losCovered: 0,
        studyTopicsDone: 0,
        reviewTopicsDone: 0,
      };

      const stats = await api.getCFADashboardStats(user.id);
      const topics = await api.getCFATopics(user.id);

      const modules = CFA_MODULES.map((modName, i) => {
        const total = stats.totalByModule[modName] || 0;
        const completed = stats.completedByModule[modName] || 0;
        const plannedHours = stats.hoursPerModule[modName] || 0;
        return {
          name: `M${i + 1}`,
          fullName: modName,
          completed,
          total: total || 1,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
          plannedHours,
          actualHours: completed > 0 ? Math.round(plannedHours * (completed / (total || 1))) : 0,
        };
      });

      const studyTopicsDone = topics.filter(t => t.row_type === 'STUDY' && (t.completed || t.status === 'Completed')).length;
      const reviewTopicsDone = topics.filter(t => t.row_type === 'REVIEW' && (t.completed || t.status === 'Completed')).length;

      return {
        totalCompleted: stats.completedTopics,
        totalTopics: stats.totalTopics,
        overallHoursLogged: topics.filter(t => t.completed || t.status === 'Completed').reduce((sum, t) => sum + Number(t.planned_hours || 0), 0),
        modules,
        chaptersCompleted: stats.completedTopics,
        losCovered: stats.completedTopics * 2,
        studyTopicsDone,
        reviewTopicsDone,
      };
    },
    enabled: !!user?.id,
  });
}

export function useCFADeadlineCountdown() {
  return useQuery({
    queryKey: ['cfaDeadline'],
    queryFn: () => {
      const deadline = new Date('2027-01-31T00:00:00Z');
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
    },
  });
}

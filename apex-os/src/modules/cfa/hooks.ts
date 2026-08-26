import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/api/cfa';
import { addTask } from '@/api/tasks';
import { useAuth } from '@/hooks/use-auth';
import type { CFATopic, CFARevisionPlan, CFATopicInsert } from '@/api/types';

export const CFA_MODULE_CONFIG = [
  { name: 'M1', fullName: 'Quantitative Methods', short: 'Quant', weight: '6% – 9%', weightMid: 7.5, color: '#3b82f6' },
  { name: 'M2', fullName: 'Economics', short: 'Econ', weight: '6% – 9%', weightMid: 7.5, color: '#06b6d4' },
  { name: 'M3', fullName: 'Corporate Issuers', aliases: ['Corporate Issuers', 'Corporate Finance', 'CorpFin'], short: 'Corp Issuers', weight: '6% – 9%', weightMid: 7.5, color: '#8b5cf6' },
  { name: 'M4', fullName: 'Financial Statement Analysis', aliases: ['Financial Statement Analysis', 'FSA'], short: 'FSA', weight: '11% – 14%', weightMid: 12.5, color: '#ef4444' },
  { name: 'M5', fullName: 'Equity Investments', aliases: ['Equity Investments', 'Equities'], short: 'Equities', weight: '11% – 14%', weightMid: 12.5, color: '#10b981' },
  { name: 'M6', fullName: 'Fixed Income', aliases: ['Fixed Income', 'FixedIncome'], short: 'Fixed Income', weight: '11% – 14%', weightMid: 12.5, color: '#f59e0b' },
  { name: 'M7', fullName: 'Derivatives', aliases: ['Derivatives'], short: 'Derivatives', weight: '5% – 8%', weightMid: 6.5, color: '#ec4899' },
  { name: 'M8', fullName: 'Alternative Investments', aliases: ['Alternative Investments', 'Alts'], short: 'Alts', weight: '7% – 10%', weightMid: 8.5, color: '#6366f1' },
  { name: 'M9', fullName: 'Portfolio Management', aliases: ['Portfolio Management', 'Portfolio Construction', 'Portfolio'], short: 'Portfolio', weight: '8% – 12%', weightMid: 10, color: '#14b8a6' },
  { name: 'M10', fullName: 'Ethical and Professional Standards', aliases: ['Ethical and Professional Standards', 'Ethics'], short: 'Ethics', weight: '15% – 20%', weightMid: 17.5, color: '#dc2626' },
];

export function useCFATopics(filters?: { module?: string; status?: string; priority?: string; revision_status?: string; row_type?: string; search?: string }) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cfaTopics', user?.id, filters],
    queryFn: async () => {
      if (!user?.id) return [];
      const topics = await api.getCFATopics(user.id);
      const modFilter = filters?.module;
      
      return topics.filter(t => {
        if (modFilter && modFilter !== 'All Modules' && modFilter !== 'All') {
          const cfg = CFA_MODULE_CONFIG.find(c => c.fullName === modFilter || c.short === modFilter || (c.aliases && c.aliases.includes(modFilter)));
          const matchesModule = cfg 
            ? (t.module === cfg.fullName || (cfg.aliases && cfg.aliases.includes(t.module)))
            : t.module.toLowerCase().includes(modFilter.toLowerCase());
          if (!matchesModule) return false;
        }
        if (filters?.status && filters.status !== 'All' && t.status !== filters.status) return false;
        if (filters?.priority && filters.priority !== 'All' && t.priority !== filters.priority) return false;
        if (filters?.revision_status && filters.revision_status !== 'All' && t.revision_status !== filters.revision_status) return false;
        if (filters?.row_type && filters.row_type !== 'All' && t.row_type !== filters.row_type) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const matchCh = t.chapter_topic?.toLowerCase().includes(s);
          const matchSub = t.subtopic_lo?.toLowerCase().includes(s);
          const matchMod = t.module?.toLowerCase().includes(s);
          if (!matchCh && !matchSub && !matchMod) return false;
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
    mutationFn: (topic: Omit<CFATopicInsert, 'owner_id'>) => api.addCFATopic({ ...topic, owner_id: user?.id! }),
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
        title: `[CFA ${topic.module}] ${topic.chapter_topic}`,
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

export function useCFADashboardStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cfaDashboardStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const topics = await api.getCFATopics(user.id);
      const totalTopics = topics.length || 324;
      const completedTopics = topics.filter(t => t.completed || t.status === 'Completed').length;

      const modules = CFA_MODULE_CONFIG.map((cfg) => {
        const modTopics = topics.filter(t => t.module === cfg.fullName || cfg.aliases?.includes(t.module));
        const total = modTopics.length || 1;
        const completed = modTopics.filter(t => t.completed || t.status === 'Completed').length;
        const plannedHours = modTopics.reduce((sum, t) => sum + Number(t.planned_hours || 0), 0);
        const actualHours = completed > 0 ? (plannedHours * (completed / total)) : 0;
        const firstPassDone = modTopics.filter(t => t.revision_status === 'First Pass Done').length;
        const revisedCount = modTopics.filter(t => t.revision_status === 'Revised Once' || t.revision_status === 'Revised Twice').length;
        const masteredCount = modTopics.filter(t => t.revision_status === 'Mastered').length;

        return {
          name: cfg.name,
          fullName: cfg.fullName,
          short: cfg.short,
          weight: cfg.weight,
          weightMid: cfg.weightMid,
          color: cfg.color,
          completed,
          total: modTopics.length,
          percentage: modTopics.length > 0 ? Math.round((completed / modTopics.length) * 100) : 0,
          plannedHours: Number(plannedHours.toFixed(1)),
          actualHours: Number(actualHours.toFixed(1)),
          firstPassDone,
          revisedCount,
          masteredCount,
        };
      });

      const studyTopicsDone = topics.filter(t => t.row_type === 'STUDY' && (t.completed || t.status === 'Completed')).length;
      const reviewTopicsDone = topics.filter(t => t.row_type === 'REVIEW' && (t.completed || t.status === 'Completed')).length;
      const firstPassTotal = topics.filter(t => t.revision_status === 'First Pass Done').length;
      const revisedTotal = topics.filter(t => t.revision_status === 'Revised Once' || t.revision_status === 'Revised Twice').length;
      const masteredTotal = topics.filter(t => t.revision_status === 'Mastered').length;
      const totalHoursLogged = topics.filter(t => t.completed || t.status === 'Completed').reduce((sum, t) => sum + Number(t.planned_hours || 0), 0);

      // Trajectory Burn-up simulation
      const trajectory = [
        { month: 'Aug 26', targetHours: 20, actualHours: Math.min(25, Math.round(totalHoursLogged)) },
        { month: 'Sep 26', targetHours: 60, actualHours: totalHoursLogged > 50 ? 55 : null },
        { month: 'Oct 26', targetHours: 110, actualHours: null },
        { month: 'Nov 26', targetHours: 165, actualHours: null },
        { month: 'Dec 26', targetHours: 225, actualHours: null },
        { month: 'Jan 27', targetHours: 300, actualHours: null },
        { month: 'Feb 27 (Mocks)', targetHours: 340, actualHours: null },
      ];

      return {
        totalCompleted: completedTopics,
        totalTopics,
        overallHoursLogged: Number(totalHoursLogged.toFixed(1)),
        modules,
        chaptersCompleted: completedTopics,
        losCovered: completedTopics * 2,
        studyTopicsDone,
        reviewTopicsDone,
        firstPassTotal,
        revisedTotal,
        masteredTotal,
        trajectory,
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
      const days = Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
      const weeks = (days / 7).toFixed(1);
      return { days, weeks };
    },
  });
}

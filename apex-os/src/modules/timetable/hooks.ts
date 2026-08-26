import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/api/timetable';
import { useAuth } from '@/hooks/use-auth';

// --- Timetable Blocks ---
export function useTimetableBlocks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['timetableBlocks', user?.id],
    queryFn: () => api.getTimetableBlocks(user?.id!),
    enabled: !!user?.id,
  });
}

export function useAddBlock() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.addTimetableBlock({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timetableBlocks'] }),
  });
}

export function useUpdateBlock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; updates: any }) => api.updateTimetableBlock(data.id, data.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timetableBlocks'] }),
  });
}

export function useDeleteBlock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteTimetableBlock(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timetableBlocks'] }),
  });
}

// --- Daily Planner ---
export function useDailyPlanner(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dailyPlanner', user?.id, date],
    queryFn: () => api.getDailyPlannerEntries(user?.id!, date),
    enabled: !!user?.id && !!date,
  });
}

export function useAddPlannerEntry() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.addDailyPlannerEntry({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyPlanner'] }),
  });
}

export function useUpdatePlannerEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; updates: any }) => api.updateDailyPlannerEntry(data.id, data.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyPlanner'] }),
  });
}

export function useDeletePlannerEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteDailyPlannerEntry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyPlanner'] }),
  });
}

export function useGenerateFromTemplate() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (date: string) => {
      if (!user?.id) return;
      const targetDay = new Date(date).getDay();
      // Map JS getDay() (0=Sun, 1=Mon, ..., 6=Sat)
      const blocks = await api.getTimetableBlocks(user.id);
      const dayBlocks = blocks.filter(b => b.day_of_week === targetDay);
      for (const block of dayBlocks) {
        await api.addDailyPlannerEntry({
          owner_id: user.id,
          date,
          planned_activity: block.activity,
          actual_activity: null,
          start_time: block.start_time,
          end_time: block.end_time,
          category: block.category,
          priority: 'P1',
          planned_duration_min: 60,
          actual_duration_min: null,
          completion_status: null,
          energy_level: null,
          notes: null,
          reason_for_missed: null,
          sort_order: block.sort_order || 0
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyPlanner'] }),
  });
}

// --- Habit Tracker ---
export function useHabitTracker(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['habitTracker', user?.id, date],
    queryFn: async () => {
      const results = await api.getHabitTrackerDaily(user?.id!, date);
      return results[0] || null;
    },
    enabled: !!user?.id && !!date,
  });
}

export function useHabitTrackerRange(start: string, end: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['habitTracker', user?.id, start, end],
    queryFn: () => api.getHabitTrackerRange(user?.id!, start, end),
    enabled: !!user?.id && !!start && !!end,
  });
}

export function useUpsertHabitTracker() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.upsertHabitTrackerDaily({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habitTracker'] }),
  });
}

// --- Placement Tracker ---
export function usePlacementTracker() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['placementTracker', user?.id],
    queryFn: () => api.getPlacementTrackerItems(user?.id!),
    enabled: !!user?.id,
  });
}

export function useAddPlacement() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.addPlacementItem({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['placementTracker'] }),
  });
}

export function useUpdatePlacement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; updates: any }) => api.updatePlacementItem(data.id, data.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['placementTracker'] }),
  });
}

export function useDeletePlacement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePlacementItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['placementTracker'] }),
  });
}

// --- Academic Tracker ---
export function useAcademicTracker() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['academicTracker', user?.id],
    queryFn: () => api.getAcademicTrackerItems(user?.id!),
    enabled: !!user?.id,
  });
}

export function useAddAcademic() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.addAcademicItem({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academicTracker'] }),
  });
}

export function useUpdateAcademic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; updates: any }) => api.updateAcademicItem(data.id, data.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academicTracker'] }),
  });
}

export function useDeleteAcademic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteAcademicItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academicTracker'] }),
  });
}

// --- Personal Brand Tracker ---
export function usePersonalBrand() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['personalBrand', user?.id],
    queryFn: () => api.getPersonalBrandItems(user?.id!),
    enabled: !!user?.id,
  });
}

export function useAddBrand() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.addPersonalBrandItem({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personalBrand'] }),
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; updates: any }) => api.updatePersonalBrandItem(data.id, data.updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personalBrand'] }),
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePersonalBrandItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personalBrand'] }),
  });
}

// --- Weekly Review ---
export function useWeeklyReviews() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['weeklyReviews', user?.id],
    queryFn: () => api.getWeeklyReviews(user?.id!),
    enabled: !!user?.id,
  });
}

export function useWeeklyReview(weekOf: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['weeklyReview', user?.id, weekOf],
    queryFn: () => api.getWeeklyReview(user?.id!, weekOf),
    enabled: !!user?.id && !!weekOf,
  });
}

export function useUpsertWeeklyReview() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: any) => api.upsertWeeklyReview({ ...data, owner_id: user?.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['weeklyReview'] }),
  });
}

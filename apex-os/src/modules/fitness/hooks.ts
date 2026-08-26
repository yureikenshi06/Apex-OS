import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as fitnessApi from '@/api/fitness';
import { useAuth } from '@/hooks/use-auth';
import { TRAINER_WORKOUT_PLAN } from './trainer-workout-seed';
import type {
  WorkoutPlanInsert,
  WorkoutLogInsert,
  BodyMeasurementInsert,
  CardioStepsLogInsert,
  SleepLogInsert,
} from '@/api/types';

// --- Trainer Workout Plan Hooks ---
export const useWorkoutPlan = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['workoutPlan', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const dbPlan = await fitnessApi.getWorkoutPlan(user.id);
      return dbPlan;
    },
    enabled: !!user?.id,
  });
};

export const usePopulateTrainerWorkoutPlan = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async () => {
      if (!user?.id) return;
      const items: any[] = [];
      let sortOrder = 0;
      TRAINER_WORKOUT_PLAN.forEach((day) => {
        day.exercises.forEach((ex) => {
          items.push({
            day_of_week: day.day_of_week,
            section_label: day.focus,
            exercise: ex.name,
            muscle_group: ex.muscle_group,
            sets: `${ex.sets} sets`,
            reps: ex.reps,
            rest_sec: ex.rest_sec,
            notes: ex.notes || `${day.warmup} | Cooldown: ${day.cooldown}`,
            sort_order: sortOrder++,
          });
        });
      });
      return fitnessApi.bulkAddWorkoutPlan(user.id, items);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPlan'] }),
  });
};

export const useAddPlanItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: WorkoutPlanInsert) => fitnessApi.addWorkoutPlanItem({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPlan'] }),
  });
};

export const useUpdatePlanItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutPlanInsert> }) =>
      fitnessApi.updateWorkoutPlanItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPlan'] }),
  });
};

export const useDeletePlanItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteWorkoutPlanItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPlan'] }),
  });
};

// --- Workout Logs Hooks ---
export const useWorkoutLogs = (date?: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['workoutLogs', user?.id, date],
    queryFn: () => fitnessApi.getWorkoutLogs(user?.id!, date),
    enabled: !!user?.id,
  });
};

export const useAddWorkoutLog = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: WorkoutLogInsert) => fitnessApi.addWorkoutLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useUpdateWorkoutLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutLogInsert> }) =>
      fitnessApi.updateWorkoutLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useDeleteWorkoutLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteWorkoutLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

// --- Body Weight & Measurements Hooks ---
export const useBodyMeasurements = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['bodyMeasurements', user?.id],
    queryFn: () => fitnessApi.getBodyMeasurements(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddMeasurement = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: BodyMeasurementInsert) => fitnessApi.addBodyMeasurement({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useDeleteMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteBodyMeasurement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useUpdateMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BodyMeasurementInsert> }) =>
      fitnessApi.updateBodyMeasurement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

// --- Steps & Cardio Logs Hooks ---
export const useCardioSteps = (date?: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cardioSteps', user?.id, date],
    queryFn: () => fitnessApi.getCardioStepsLog(user?.id!, date),
    enabled: !!user?.id,
  });
};

export const useAddCardio = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: CardioStepsLogInsert) => fitnessApi.addCardioStepsLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cardioSteps'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useUpdateCardio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CardioStepsLogInsert> }) =>
      fitnessApi.updateCardioStepsLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cardioSteps'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useDeleteCardio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteCardioStepsLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cardioSteps'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

// --- Sleep & Recovery Hooks ---
export const useSleepLog = (date?: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['sleepLog', user?.id, date],
    queryFn: () => fitnessApi.getSleepLog(user?.id!, date),
    enabled: !!user?.id,
  });
};

export const useAddSleep = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: SleepLogInsert) => fitnessApi.addSleepLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepLog'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useUpdateSleep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SleepLogInsert> }) =>
      fitnessApi.updateSleepLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepLog'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

export const useDeleteSleep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteSleepLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepLog'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

// --- Executive Fitness Stats & Analytics ---
export const useFitnessStats = () => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['fitnessStats', user?.id, today],
    queryFn: async () => {
      if (!user?.id) {
        return {
          currentWeight: 83.0,
          targetWeight: 75.0,
          startingWeight: 83.0,
          weightLost: 0,
          weightRemaining: 8.0,
          progressPct: 0,
          bmi: 30.5,
          workoutStreak: 12,
          stepsToday: 8500,
          stepsTarget: 8000,
          sleepLastNight: 7.5,
          sleepQuality: 4,
          totalWorkoutsThisWeek: 4,
          totalVolumeKg: 14250,
        };
      }

      const [measurements, cardioLogs, sleepLogs, workoutLogs] = await Promise.all([
        fitnessApi.getBodyMeasurements(user.id),
        fitnessApi.getCardioStepsLog(user.id),
        fitnessApi.getSleepLog(user.id),
        fitnessApi.getWorkoutLogs(user.id),
      ]);

      const latestWeight = measurements.length > 0 ? Number(measurements[0].body_weight_kg) : 83.0;
      const startingWeight = 83.0;
      const targetWeight = 75.0;
      const weightLost = Math.max(0, parseFloat((startingWeight - latestWeight).toFixed(1)));
      const weightRemaining = Math.max(0, parseFloat((latestWeight - targetWeight).toFixed(1)));
      const totalToLose = Math.max(0.1, startingWeight - targetWeight);
      const progressPct = Math.min(100, Math.max(0, Math.round((weightLost / totalToLose) * 100)));

      // Steps today
      const todayCardio = cardioLogs.find(c => c.date === today);
      const stepsToday = todayCardio?.steps || (cardioLogs[0]?.steps || 8420);

      // Sleep last night
      const todaySleep = sleepLogs.find(s => s.date === today) || sleepLogs[0];
      const sleepLastNight = todaySleep ? Number(todaySleep.total_sleep_hrs || 7.5) : 7.5;
      const sleepQuality = todaySleep?.sleep_quality || 4;

      // Total Volume
      const totalVolumeKg = workoutLogs.reduce((sum, w) => sum + Number(w.volume || (Number(w.weight_kg || 0) * (w.reps || 0) * (w.sets || 1))), 0) || 12800;

      return {
        currentWeight: latestWeight,
        targetWeight,
        startingWeight,
        weightLost,
        weightRemaining,
        progressPct,
        bmi: parseFloat((latestWeight / (1.65 * 1.65)).toFixed(1)),
        workoutStreak: 12,
        stepsToday,
        stepsTarget: 8000,
        sleepLastNight,
        sleepQuality,
        totalWorkoutsThisWeek: Math.max(1, workoutLogs.length),
        totalVolumeKg,
      };
    },
    enabled: !!user?.id,
  });
};

export const useResetAllFitnessData = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: () => fitnessApi.resetAllFitnessData(user?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] });
      queryClient.invalidateQueries({ queryKey: ['cardioSteps'] });
      queryClient.invalidateQueries({ queryKey: ['sleepLog'] });
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['workoutPlan'] });
      queryClient.invalidateQueries({ queryKey: ['fitnessStats'] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as fitnessApi from '@/api/fitness';
import { useAuth } from '@/hooks/use-auth';
import type {
  WorkoutPlanInsert,
  WorkoutLogInsert,
  FitnessHabitDailyInsert,
  MealPlanItemInsert,
  FoodLogInsert,
  GroceryLogInsert,
  SupplementInsert,
  BodyMeasurementInsert,
  ProgressPhotoInsert,
  CardioStepsLogInsert,
  SleepLogInsert,
} from '@/api/types';

// Workout Plan
export const useWorkoutPlan = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['workoutPlan', user?.id],
    queryFn: () => fitnessApi.getWorkoutPlan(user?.id!),
    enabled: !!user?.id,
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

// Workout Logs
export const useWorkoutLogs = (date?: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['workoutLogs', user?.id, date],
    queryFn: () => fitnessApi.getWorkoutLogs(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddWorkoutLog = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: WorkoutLogInsert) => fitnessApi.addWorkoutLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutLogs'] }),
  });
};

export const useUpdateWorkoutLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutLogInsert> }) =>
      fitnessApi.updateWorkoutLog(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutLogs'] }),
  });
};

export const useDeleteWorkoutLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteWorkoutLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutLogs'] }),
  });
};

// Fitness Habits
export const useFitnessHabits = (date: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['fitnessHabits', user?.id, date],
    queryFn: () => fitnessApi.getFitnessHabitDaily(user?.id!, date),
    enabled: !!user?.id && !!date,
  });
};

export const useUpsertFitnessHabit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: FitnessHabitDailyInsert) => fitnessApi.upsertFitnessHabitDaily({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fitnessHabits'] }),
  });
};

// Meal Plan
export const useMealPlan = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['mealPlan', user?.id],
    queryFn: () => fitnessApi.getMealPlanItems(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddMealItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: MealPlanItemInsert) => fitnessApi.addMealPlanItem({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mealPlan'] }),
  });
};

export const useUpdateMealItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MealPlanItemInsert> }) =>
      fitnessApi.updateMealPlanItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mealPlan'] }),
  });
};

export const useDeleteMealItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteMealPlanItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mealPlan'] }),
  });
};

// Food Log
export const useFoodLog = (date: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['foodLog', user?.id, date],
    queryFn: () => fitnessApi.getFoodLog(user?.id!, date),
    enabled: !!user?.id && !!date,
  });
};

export const useAddFoodLog = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: FoodLogInsert) => fitnessApi.addFoodLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['foodLog'] }),
  });
};

export const useUpdateFoodLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FoodLogInsert> }) =>
      fitnessApi.updateFoodLog(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['foodLog'] }),
  });
};

export const useDeleteFoodLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteFoodLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['foodLog'] }),
  });
};

// Grocery Log
export const useGroceryLog = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['groceryLog', user?.id],
    queryFn: () => fitnessApi.getGroceryLog(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddGrocery = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: GroceryLogInsert) => fitnessApi.addGroceryLog({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceryLog'] }),
  });
};

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GroceryLogInsert> }) =>
      fitnessApi.updateGroceryLog(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceryLog'] }),
  });
};

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteGroceryLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceryLog'] }),
  });
};

// Supplements
export const useSupplements = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['supplements', user?.id],
    queryFn: () => fitnessApi.getSupplements(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddSupplement = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: SupplementInsert) => fitnessApi.addSupplement({ ...data, owner_id: user?.id! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supplements'] }),
  });
};

export const useUpdateSupplement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SupplementInsert> }) =>
      fitnessApi.updateSupplement(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supplements'] }),
  });
};

export const useDeleteSupplement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteSupplement(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supplements'] }),
  });
};

// Body Measurements
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] }),
  });
};

export const useUpdateMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BodyMeasurementInsert> }) =>
      fitnessApi.updateBodyMeasurement(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] }),
  });
};

export const useDeleteMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fitnessApi.deleteBodyMeasurement(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bodyMeasurements'] }),
  });
};

// Cardio Steps
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cardioSteps'] }),
  });
};

// Sleep Log
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sleepLog'] }),
  });
};

// Stats
export const useFitnessStats = () => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['fitnessStats', user?.id, today],
    queryFn: async () => {
      if (!user?.id) return {
        currentWeight: 83,
        targetWeight: 75,
        startingWeight: 83,
        weightLost: 0,
        bmi: 30.5,
        calorieTarget: 2199,
        proteinTarget: 149,
        caloriesToday: 1850,
        proteinToday: 135,
        workoutStreak: 12,
        stepsToday: 8420,
        sleepLastNight: 7.5,
        consistencyScore: 90,
      };

      const measurements = await fitnessApi.getBodyMeasurements(user.id);
      const latestWeight = measurements[0]?.body_weight_kg || 83;
      const todayHabit = await fitnessApi.getFitnessHabitDaily(user.id, today);
      const foodLogs = await fitnessApi.getFoodLog(user.id, today);

      const caloriesToday = foodLogs.reduce((sum, f) => sum + (f.calories || 0), 0) || 1850;
      const proteinToday = foodLogs.reduce((sum, f) => sum + Number(f.protein_g || 0), 0) || 135;

      return {
        currentWeight: latestWeight,
        targetWeight: 75,
        startingWeight: 83,
        weightLost: Math.max(0, 83 - latestWeight),
        bmi: parseFloat((latestWeight / ((1.65) * (1.65))).toFixed(2)),
        calorieTarget: 2199,
        proteinTarget: 149,
        caloriesToday,
        proteinToday,
        workoutStreak: todayHabit?.workout_streak || 12,
        stepsToday: 8420,
        sleepLastNight: 7.5,
        consistencyScore: todayHabit?.consistency_score || 90,
      };
    },
    enabled: !!user?.id,
  });
};

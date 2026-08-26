import { supabase } from '@/lib/supabase';
import type { 
  WorkoutPlan, WorkoutPlanInsert,
  WorkoutLog, WorkoutLogInsert,
  FitnessHabitDaily, FitnessHabitDailyInsert,
  MealPlanItem, MealPlanItemInsert,
  FoodLog, FoodLogInsert,
  GroceryLog, GroceryLogInsert,
  Supplement, SupplementInsert,
  BodyMeasurement, BodyMeasurementInsert,
  ProgressPhoto, ProgressPhotoInsert,
  CardioStepsLog, CardioStepsLogInsert,
  SleepLog, SleepLogInsert
} from '@/api/types';

// Workout Plan
export async function getWorkoutPlan(ownerId: string): Promise<WorkoutPlan[]> {
  const { data, error } = await supabase
    .from('workout_plan')
    .select('*')
    .eq('owner_id', ownerId)
    .order('day_of_week', { ascending: true })
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addWorkoutPlanItem(item: WorkoutPlanInsert): Promise<WorkoutPlan> {
  const { data, error } = await supabase.from('workout_plan').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateWorkoutPlanItem(id: string, updates: Partial<WorkoutPlanInsert>): Promise<WorkoutPlan> {
  const { data, error } = await supabase.from('workout_plan').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteWorkoutPlanItem(id: string): Promise<void> {
  const { error } = await supabase.from('workout_plan').delete().eq('id', id);
  if (error) throw error;
}

export async function bulkAddWorkoutPlan(ownerId: string, items: Omit<WorkoutPlanInsert, 'owner_id'>[]): Promise<WorkoutPlan[]> {
  await supabase.from('workout_plan').delete().eq('owner_id', ownerId);
  const payload = items.map(i => ({ ...i, owner_id: ownerId }));
  const { data, error } = await supabase.from('workout_plan').insert(payload).select();
  if (error) throw error;
  return data || [];
}

// Workout Logs
export async function getWorkoutLogs(ownerId: string, date?: string): Promise<WorkoutLog[]> {
  let query = supabase.from('workout_log').select('*').eq('owner_id', ownerId).order('date', { ascending: false });
  if (date) {
    query = query.eq('date', date);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getWorkoutLogsByRange(ownerId: string, startDate: string, endDate: string): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from('workout_log')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addWorkoutLog(item: WorkoutLogInsert): Promise<WorkoutLog> {
  const { data, error } = await supabase.from('workout_log').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateWorkoutLog(id: string, updates: Partial<WorkoutLogInsert>): Promise<WorkoutLog> {
  const { data, error } = await supabase.from('workout_log').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteWorkoutLog(id: string): Promise<void> {
  const { error } = await supabase.from('workout_log').delete().eq('id', id);
  if (error) throw error;
}

// Fitness Habits
export async function getFitnessHabitDaily(ownerId: string, date: string): Promise<FitnessHabitDaily | null> {
  const { data, error } = await supabase.from('fitness_habit_daily').select('*').eq('owner_id', ownerId).eq('date', date).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getFitnessHabitRange(ownerId: string, startDate: string, endDate: string): Promise<FitnessHabitDaily[]> {
  const { data, error } = await supabase
    .from('fitness_habit_daily')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function upsertFitnessHabitDaily(item: FitnessHabitDailyInsert): Promise<FitnessHabitDaily> {
  const { data, error } = await supabase.from('fitness_habit_daily').upsert(item).select().single();
  if (error) throw error;
  return data;
}

// Meal Plan
export async function getMealPlanItems(ownerId: string): Promise<MealPlanItem[]> {
  const { data, error } = await supabase
    .from('meal_plan_items')
    .select('*')
    .eq('owner_id', ownerId)
    .order('meal_category', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addMealPlanItem(item: MealPlanItemInsert): Promise<MealPlanItem> {
  const { data, error } = await supabase.from('meal_plan_items').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateMealPlanItem(id: string, updates: Partial<MealPlanItemInsert>): Promise<MealPlanItem> {
  const { data, error } = await supabase.from('meal_plan_items').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMealPlanItem(id: string): Promise<void> {
  const { error } = await supabase.from('meal_plan_items').delete().eq('id', id);
  if (error) throw error;
}

// Food Logs
export async function getFoodLog(ownerId: string, date: string): Promise<FoodLog[]> {
  const { data, error } = await supabase.from('food_log').select('*').eq('owner_id', ownerId).eq('date', date);
  if (error) throw error;
  return data || [];
}

export async function getFoodLogByRange(ownerId: string, startDate: string, endDate: string): Promise<FoodLog[]> {
  const { data, error } = await supabase
    .from('food_log')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate);
  if (error) throw error;
  return data || [];
}

export async function addFoodLog(item: FoodLogInsert): Promise<FoodLog> {
  const { data, error } = await supabase.from('food_log').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateFoodLog(id: string, updates: Partial<FoodLogInsert>): Promise<FoodLog> {
  const { data, error } = await supabase.from('food_log').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteFoodLog(id: string): Promise<void> {
  const { error } = await supabase.from('food_log').delete().eq('id', id);
  if (error) throw error;
}

// Grocery Logs
export async function getGroceryLog(ownerId: string): Promise<GroceryLog[]> {
  const { data, error } = await supabase
    .from('grocery_log')
    .select('*')
    .eq('owner_id', ownerId)
    .order('purchase_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addGroceryLog(item: GroceryLogInsert): Promise<GroceryLog> {
  const { data, error } = await supabase.from('grocery_log').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateGroceryLog(id: string, updates: Partial<GroceryLogInsert>): Promise<GroceryLog> {
  const { data, error } = await supabase.from('grocery_log').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteGroceryLog(id: string): Promise<void> {
  const { error } = await supabase.from('grocery_log').delete().eq('id', id);
  if (error) throw error;
}

// Supplements
export async function getSupplements(ownerId: string): Promise<Supplement[]> {
  const { data, error } = await supabase.from('supplements').select('*').eq('owner_id', ownerId);
  if (error) throw error;
  return data || [];
}

export async function addSupplement(item: SupplementInsert): Promise<Supplement> {
  const { data, error } = await supabase.from('supplements').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateSupplement(id: string, updates: Partial<SupplementInsert>): Promise<Supplement> {
  const { data, error } = await supabase.from('supplements').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSupplement(id: string): Promise<void> {
  const { error } = await supabase.from('supplements').delete().eq('id', id);
  if (error) throw error;
}

// Body Measurements
export async function getBodyMeasurements(ownerId: string): Promise<BodyMeasurement[]> {
  const { data, error } = await supabase
    .from('body_measurements')
    .select('*')
    .eq('owner_id', ownerId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addBodyMeasurement(item: BodyMeasurementInsert): Promise<BodyMeasurement> {
  const { data, error } = await supabase.from('body_measurements').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateBodyMeasurement(id: string, updates: Partial<BodyMeasurementInsert>): Promise<BodyMeasurement> {
  const { data, error } = await supabase.from('body_measurements').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBodyMeasurement(id: string): Promise<void> {
  const { error } = await supabase.from('body_measurements').delete().eq('id', id);
  if (error) throw error;
}

// Progress Photos
export async function getProgressPhotos(ownerId: string): Promise<ProgressPhoto[]> {
  const { data, error } = await supabase
    .from('progress_photos')
    .select('*')
    .eq('owner_id', ownerId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addProgressPhoto(item: ProgressPhotoInsert): Promise<ProgressPhoto> {
  const { data, error } = await supabase.from('progress_photos').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateProgressPhoto(id: string, updates: Partial<ProgressPhotoInsert>): Promise<ProgressPhoto> {
  const { data, error } = await supabase.from('progress_photos').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProgressPhoto(id: string): Promise<void> {
  const { error } = await supabase.from('progress_photos').delete().eq('id', id);
  if (error) throw error;
}

// Cardio Steps Logs
export async function getCardioStepsLog(ownerId: string, date?: string): Promise<CardioStepsLog[]> {
  let query = supabase.from('cardio_steps_log').select('*').eq('owner_id', ownerId).order('date', { ascending: false });
  if (date) query = query.eq('date', date);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getCardioStepsByRange(ownerId: string, startDate: string, endDate: string): Promise<CardioStepsLog[]> {
  const { data, error } = await supabase
    .from('cardio_steps_log')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addCardioStepsLog(item: CardioStepsLogInsert): Promise<CardioStepsLog> {
  const { data, error } = await supabase.from('cardio_steps_log').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateCardioStepsLog(id: string, updates: Partial<CardioStepsLogInsert>): Promise<CardioStepsLog> {
  const { data, error } = await supabase.from('cardio_steps_log').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCardioStepsLog(id: string): Promise<void> {
  const { error } = await supabase.from('cardio_steps_log').delete().eq('id', id);
  if (error) throw error;
}

// Sleep Logs
export async function getSleepLog(ownerId: string, date?: string): Promise<SleepLog[]> {
  let query = supabase.from('sleep_log').select('*').eq('owner_id', ownerId).order('date', { ascending: false });
  if (date) query = query.eq('date', date);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getSleepLogByRange(ownerId: string, startDate: string, endDate: string): Promise<SleepLog[]> {
  const { data, error } = await supabase
    .from('sleep_log')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addSleepLog(item: SleepLogInsert): Promise<SleepLog> {
  const { data, error } = await supabase.from('sleep_log').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateSleepLog(id: string, updates: Partial<SleepLogInsert>): Promise<SleepLog> {
  const { data, error } = await supabase.from('sleep_log').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSleepLog(id: string): Promise<void> {
  const { error } = await supabase.from('sleep_log').delete().eq('id', id);
  if (error) throw error;
}

export async function resetAllFitnessData(ownerId: string): Promise<void> {
  await Promise.all([
    supabase.from('body_measurements').delete().eq('owner_id', ownerId),
    supabase.from('cardio_steps_log').delete().eq('owner_id', ownerId),
    supabase.from('sleep_log').delete().eq('owner_id', ownerId),
    supabase.from('workout_log').delete().eq('owner_id', ownerId),
    supabase.from('workout_plan').delete().eq('owner_id', ownerId),
    supabase.from('fitness_habit_daily').delete().eq('owner_id', ownerId),
  ]);
}

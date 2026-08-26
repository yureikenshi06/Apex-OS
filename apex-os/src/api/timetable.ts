import { supabase } from '@/lib/supabase';
import type { 
  TimetableBlock, TimetableBlockInsert, TimetableBlockUpdate,
  DailyPlannerEntry, DailyPlannerEntryInsert, DailyPlannerEntryUpdate,
  HabitTrackerDaily, HabitTrackerDailyInsert,
  PlacementTrackerItem, PlacementTrackerItemInsert, PlacementTrackerItemUpdate,
  AcademicTrackerItem, AcademicTrackerItemInsert, AcademicTrackerItemUpdate,
  PersonalBrandItem, PersonalBrandItemInsert, PersonalBrandItemUpdate,
  WeeklyReview, WeeklyReviewInsert
} from '@/api/types';

// Timetable Blocks
export async function getTimetableBlocks(ownerId: string): Promise<TimetableBlock[]> {
  const { data, error } = await supabase
    .from('timetable_blocks')
    .select('*')
    .eq('owner_id', ownerId)
    .order('day_of_week', { ascending: true })
    .order('start_time', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addTimetableBlock(item: TimetableBlockInsert): Promise<TimetableBlock> {
  const { data, error } = await supabase.from('timetable_blocks').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateTimetableBlock(id: string, updates: TimetableBlockUpdate): Promise<TimetableBlock> {
  const { data, error } = await supabase.from('timetable_blocks').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTimetableBlock(id: string): Promise<void> {
  const { error } = await supabase.from('timetable_blocks').delete().eq('id', id);
  if (error) throw error;
}

// Daily Planner Entries
export async function getDailyPlannerEntries(ownerId: string, date: string): Promise<DailyPlannerEntry[]> {
  const { data, error } = await supabase
    .from('daily_planner_entries')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('date', date)
    .order('start_time', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getDailyPlannerEntriesRange(ownerId: string, startDate: string, endDate: string): Promise<DailyPlannerEntry[]> {
  const { data, error } = await supabase
    .from('daily_planner_entries')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addDailyPlannerEntry(item: DailyPlannerEntryInsert): Promise<DailyPlannerEntry> {
  const { data, error } = await supabase.from('daily_planner_entries').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateDailyPlannerEntry(id: string, updates: DailyPlannerEntryUpdate): Promise<DailyPlannerEntry> {
  const { data, error } = await supabase.from('daily_planner_entries').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteDailyPlannerEntry(id: string): Promise<void> {
  const { error } = await supabase.from('daily_planner_entries').delete().eq('id', id);
  if (error) throw error;
}

// Habit Tracker
export async function getHabitTrackerDaily(ownerId: string, date: string): Promise<HabitTrackerDaily[]> {
  const { data, error } = await supabase
    .from('habit_tracker_daily')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('date', date);
  if (error) throw error;
  return data;
}

export async function getHabitTrackerRange(ownerId: string, startDate: string, endDate: string): Promise<HabitTrackerDaily[]> {
  const { data, error } = await supabase
    .from('habit_tracker_daily')
    .select('*')
    .eq('owner_id', ownerId)
    .gte('date', startDate)
    .lte('date', endDate);
  if (error) throw error;
  return data;
}

export async function upsertHabitTrackerDaily(item: HabitTrackerDailyInsert): Promise<HabitTrackerDaily> {
  const { data, error } = await supabase.from('habit_tracker_daily').upsert(item).select().single();
  if (error) throw error;
  return data;
}

// Placement Tracker
export async function getPlacementTrackerItems(ownerId: string): Promise<PlacementTrackerItem[]> {
  const { data, error } = await supabase
    .from('placement_tracker')
    .select('*')
    .eq('owner_id', ownerId)
    .order('priority', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addPlacementItem(item: PlacementTrackerItemInsert): Promise<PlacementTrackerItem> {
  const { data, error } = await supabase.from('placement_tracker').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updatePlacementItem(id: string, updates: PlacementTrackerItemUpdate): Promise<PlacementTrackerItem> {
  const { data, error } = await supabase.from('placement_tracker').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePlacementItem(id: string): Promise<void> {
  const { error } = await supabase.from('placement_tracker').delete().eq('id', id);
  if (error) throw error;
}

// Academic Tracker
export async function getAcademicTrackerItems(ownerId: string): Promise<AcademicTrackerItem[]> {
  const { data, error } = await supabase
    .from('academic_tracker')
    .select('*')
    .eq('owner_id', ownerId)
    .order('deadline', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addAcademicItem(item: AcademicTrackerItemInsert): Promise<AcademicTrackerItem> {
  const { data, error } = await supabase.from('academic_tracker').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateAcademicItem(id: string, updates: AcademicTrackerItemUpdate): Promise<AcademicTrackerItem> {
  const { data, error } = await supabase.from('academic_tracker').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAcademicItem(id: string): Promise<void> {
  const { error } = await supabase.from('academic_tracker').delete().eq('id', id);
  if (error) throw error;
}

// Personal Brand
export async function getPersonalBrandItems(ownerId: string): Promise<PersonalBrandItem[]> {
  const { data, error } = await supabase
    .from('personal_brand')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addPersonalBrandItem(item: PersonalBrandItemInsert): Promise<PersonalBrandItem> {
  const { data, error } = await supabase.from('personal_brand').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updatePersonalBrandItem(id: string, updates: PersonalBrandItemUpdate): Promise<PersonalBrandItem> {
  const { data, error } = await supabase.from('personal_brand').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePersonalBrandItem(id: string): Promise<void> {
  const { error } = await supabase.from('personal_brand').delete().eq('id', id);
  if (error) throw error;
}

// Weekly Reviews
export async function getWeeklyReviews(ownerId: string): Promise<WeeklyReview[]> {
  const { data, error } = await supabase
    .from('weekly_reviews')
    .select('*')
    .eq('owner_id', ownerId)
    .order('week_of', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getWeeklyReview(ownerId: string, weekOf: string): Promise<WeeklyReview> {
  const { data, error } = await supabase
    .from('weekly_reviews')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('week_of', weekOf)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertWeeklyReview(item: WeeklyReviewInsert): Promise<WeeklyReview> {
  const { data, error } = await supabase.from('weekly_reviews').upsert(item).select().single();
  if (error) throw error;
  return data;
}

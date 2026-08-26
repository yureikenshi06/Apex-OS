import { supabase } from '@/lib/supabase';
import type { Task, TaskInsert, TaskUpdate } from '@/api/types';

export async function getTasks(ownerId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getTasksByStatus(ownerId: string, status: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('status', status)
    .order('deadline', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTasksDueToday(ownerId: string): Promise<Task[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('owner_id', ownerId)
    .lte('deadline', today)
    .neq('status', 'Done')
    .order('priority', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addTask(task: TaskInsert): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: TaskUpdate): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

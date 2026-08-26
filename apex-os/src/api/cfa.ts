import { supabase } from '@/lib/supabase';
import type { 
  CFATopic, CFATopicInsert, CFATopicUpdate,
  CFARevisionPlan, CFARevisionPlanInsert, CFARevisionPlanUpdate
} from '@/api/types';

export interface CFADashboardStats {
  totalTopics: number;
  completedTopics: number;
  totalByModule: Record<string, number>;
  completedByModule: Record<string, number>;
  hoursPerModule: Record<string, number>;
}

// CFA Topics
export async function getCFATopics(ownerId: string, module?: string): Promise<CFATopic[]> {
  let query = supabase
    .from('cfa_topics')
    .select('*')
    .eq('owner_id', ownerId)
    .order('sort_order', { ascending: true });

  if (module) {
    query = query.eq('module', module);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getCFATopicsByModule(ownerId: string, module: string): Promise<CFATopic[]> {
  return getCFATopics(ownerId, module);
}

export async function addCFATopic(item: CFATopicInsert): Promise<CFATopic> {
  const { data, error } = await supabase.from('cfa_topics').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateCFATopic(id: string, updates: CFATopicUpdate): Promise<CFATopic> {
  const { data, error } = await supabase.from('cfa_topics').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCFATopic(id: string): Promise<void> {
  const { error } = await supabase.from('cfa_topics').delete().eq('id', id);
  if (error) throw error;
}

export async function linkTopicToTask(topicId: string, taskId: string): Promise<CFATopic> {
  return updateCFATopic(topicId, { linked_task_id: taskId });
}

export async function unlinkTopicFromTask(topicId: string): Promise<CFATopic> {
  return updateCFATopic(topicId, { linked_task_id: null });
}

// CFA Revision Plan
export async function getCFARevisionPlan(ownerId: string): Promise<CFARevisionPlan[]> {
  const { data, error } = await supabase
    .from('cfa_revision_plan')
    .select('*')
    .eq('owner_id', ownerId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addCFARevisionItem(item: CFARevisionPlanInsert): Promise<CFARevisionPlan> {
  const { data, error } = await supabase.from('cfa_revision_plan').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateCFARevisionItem(id: string, updates: CFARevisionPlanUpdate): Promise<CFARevisionPlan> {
  const { data, error } = await supabase.from('cfa_revision_plan').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCFARevisionItem(id: string): Promise<void> {
  const { error } = await supabase.from('cfa_revision_plan').delete().eq('id', id);
  if (error) throw error;
}

// Dashboard Stats
export async function getCFADashboardStats(ownerId: string): Promise<CFADashboardStats> {
  const { data: topics, error } = await supabase
    .from('cfa_topics')
    .select('*')
    .eq('owner_id', ownerId);
    
  if (error) throw error;

  const topicList = topics || [];
  const totalTopics = topicList.length;
  const completedTopics = topicList.filter(t => t.completed || t.status === 'Completed').length;

  const totalByModule: Record<string, number> = {};
  const completedByModule: Record<string, number> = {};
  const hoursPerModule: Record<string, number> = {};

  topicList.forEach(topic => {
    const mod = topic.module;
    if (!totalByModule[mod]) {
      totalByModule[mod] = 0;
      completedByModule[mod] = 0;
      hoursPerModule[mod] = 0;
    }
    totalByModule[mod]++;
    if (topic.completed || topic.status === 'Completed') completedByModule[mod]++;
    if (topic.planned_hours) hoursPerModule[mod] += Number(topic.planned_hours);
  });

  return {
    totalTopics,
    completedTopics,
    totalByModule,
    completedByModule,
    hoursPerModule
  };
}

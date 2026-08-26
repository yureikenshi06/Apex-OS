import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { getSettings, upsertSettings } from '@/api/settings';
import type { AppSettings } from '@/lib/constants';

export function useSettings() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['settings', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user');
      return getSettings(user.id);
    },
    enabled: !!user?.id,
  });
}

export function useUpdateSettings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newSettings: Partial<AppSettings>) => {
      if (!user?.id) throw new Error('No user');
      return upsertSettings(user.id, newSettings);
    },
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: ['settings', user?.id] });
      const previousSettings = queryClient.getQueryData(['settings', user?.id]);
      
      queryClient.setQueryData(['settings', user?.id], (old: any) => ({
        ...old,
        ...newSettings,
      }));
      
      return { previousSettings };
    },
    onError: (err, newSettings, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(['settings', user?.id], context.previousSettings);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', user?.id] });
    },
  });
}

export function useExportAllData() {
  const { user } = useAuth();
  return async () => {
    if (!user?.id) return;
    const tables = [
      'timetable_blocks',
      'daily_planner_entries',
      'habit_tracker_daily',
      'placement_tracker',
      'academic_tracker',
      'personal_brand_tracker',
      'weekly_reviews',
      'transactions',
      'budgets',
      'recurring_expenses',
      'people_splits',
      'net_worth_entries',
      'workout_plan',
      'workout_log',
      'fitness_habit_daily',
      'meal_plan_items',
      'food_log',
      'grocery_log',
      'supplements',
      'body_measurements',
      'progress_photos',
      'cardio_steps_log',
      'sleep_log',
      'cfa_topics',
      'cfa_revision_plan',
      'tasks',
      'app_settings'
    ];
    
    const exportData: Record<string, any> = {};
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('owner_id', user.id);
      if (!error && data) {
        exportData[table] = data;
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apex-os-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}

export function useExportTableCSV() {
  const { user } = useAuth();
  return async (tableName: string) => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('owner_id', user.id);
    if (error || !data || data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row: any) => 
      Object.values(row).map(v => {
        if (v === null || v === undefined) return '""';
        if (typeof v === 'object') return `"${JSON.stringify(v).replace(/"/g, '""')}"`;
        return `"${String(v).replace(/"/g, '""')}"`;
      }).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}

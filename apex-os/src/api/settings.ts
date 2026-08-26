import { supabase } from '@/lib/supabase';
import { DEFAULT_SETTINGS, type AppSettings } from '@/lib/constants';

export async function getSettings(ownerId: string): Promise<AppSettings> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('settings')
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.settings) {
    return DEFAULT_SETTINGS;
  }
  return { ...DEFAULT_SETTINGS, ...(data.settings as Record<string, any>) };
}

export async function upsertSettings(ownerId: string, settings: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getSettings(ownerId);
  const merged = { ...current, ...settings };

  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ owner_id: ownerId, settings: merged }, { onConflict: 'owner_id' })
    .select('settings')
    .single();

  if (error) throw error;
  return { ...DEFAULT_SETTINGS, ...((data?.settings as Record<string, any>) || {}) };
}

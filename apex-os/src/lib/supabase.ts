import { createClient } from '@supabase/supabase-js';

// Default Supabase project credentials (used if environment variables are not injected)
const DEFAULT_SUPABASE_URL = 'https://zwnuvuljbpshsgqebhdg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bnV2dWxqYnBzaHNncWViaGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTA5NzQsImV4cCI6MjEwMzMyNjk3NH0.lyMmoHvaYkhesDL6WeI5wni1Xj77zAG_PLKrzUV5anI';

function sanitizeSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return DEFAULT_SUPABASE_URL;
  let clean = rawUrl.trim().replace(/^["']|["']$/g, '');
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  clean = clean.replace(/\/auth\/v1\/?$/i, '');
  clean = clean.replace(/\/+$/, '');
  return clean || DEFAULT_SUPABASE_URL;
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = (rawAnonKey || DEFAULT_SUPABASE_ANON_KEY).trim().replace(/^["']|["']$/g, '');

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

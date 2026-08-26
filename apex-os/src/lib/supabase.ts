import { createClient } from '@supabase/supabase-js';

// Sanitize the URL in case /rest/v1 or trailing slashes or quotes were accidentally pasted
function sanitizeSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return 'https://placeholder.supabase.co';
  let clean = rawUrl.trim().replace(/^["']|["']$/g, '');
  // Remove /rest/v1 or /auth/v1 if present at the end
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  clean = clean.replace(/\/auth\/v1\/?$/i, '');
  // Remove trailing slashes
  clean = clean.replace(/\/+$/, '');
  return clean;
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = rawAnonKey.trim().replace(/^["']|["']$/g, '');

if (!rawUrl || !rawAnonKey) {
  console.warn('Supabase credentials are missing or using placeholder.');
}

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

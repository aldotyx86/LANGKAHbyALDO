import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://mtrochonrdilgpgstptt.supabase.co';

const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL) &&
  rawAnonKey &&
  rawAnonKey !== '******' &&
  rawAnonKey !== 'your-anon-public-key-here'
);

// Fallback dummy token berformat JWT agar parser auth Supabase tidak crash saat mode lokal/demo
const safeAnonKey = isSupabaseConfigured && rawAnonKey
  ? rawAnonKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase = createClient(supabaseUrl, safeAnonKey, {
  auth: {
    persistSession: isSupabaseConfigured,
    autoRefreshToken: isSupabaseConfigured,
  },
});

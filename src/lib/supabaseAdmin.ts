import { createClient } from '@supabase/supabase-js';

/**
 * Server-Side Only: Supabase Admin Client dengan Service Role Key
 * Kunci ini HANYA boleh dipanggil di server (server.ts / Serverless API Routes)
 * dan TIDAK PERNAH dikirim ke browser/client untuk menjaga keamanan basis data.
 */
export const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mtrochonrdilgpgstptt.supabase.co';

const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(
  rawServiceKey &&
  rawServiceKey !== '******' &&
  rawServiceKey !== 'your-service-role-key-here'
);

const safeServiceKey = isSupabaseAdminConfigured && rawServiceKey
  ? rawServiceKey
  : '******';

export const supabaseAdmin = createClient(SUPABASE_PROJECT_URL, safeServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

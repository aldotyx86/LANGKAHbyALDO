import { createClient } from '@supabase/supabase-js';

/**
 * Server-Side Only: Supabase Admin Client dengan Service Role Key
 * Kunci ini HANYA boleh dipanggil di server (server.ts / Serverless API Routes)
 * dan TIDAK PERNAH dikirim ke browser/client untuk menjaga keamanan basis data.
 */
export const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mtrochonrdilgpgstptt.supabase.co';

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cm9jaG9ucmRpbGdwZ3N0cHR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjQ5ODE5OCwiZXhwIjoyMTA4MDc0MTk4fQ.hhuR840XlNVv1FjHmLVookDc-D-yyGek3cnIJxwIAKg';

export const supabaseAdmin = createClient(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

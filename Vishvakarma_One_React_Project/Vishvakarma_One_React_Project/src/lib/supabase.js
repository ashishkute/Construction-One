import { createClient } from '@supabase/supabase-js';

// Supabase publishable keys are intended for use in browser applications.
// Database access must still be protected by Supabase Auth and Row Level Security.
const supabaseUrl = 'https://ujfhuykjqglgshriulfn.supabase.co';
const supabasePublishableKey = 'sb_publishable_FUuPAb30NnPwON3huAKVcQ_iWda1vap';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

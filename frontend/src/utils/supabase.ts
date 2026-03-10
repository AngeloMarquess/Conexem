import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key when generating the real env files.
// For now, this serves as the singleton instance for client connections.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://SUPABASE_URL_PLACEHOLDER.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'SUPABASE_ANON_KEY_PLACEHOLDER';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

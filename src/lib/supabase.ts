
import { createClient } from '@supabase/supabase-js';

// Using direct connection information
const supabaseUrl = 'https://tatpertvicmrravewuml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdHBlcnR2aWNtcnJhdmV3dW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNTY1NDYsImV4cCI6MTk5MDkzMjU0Nn0.kZuuIhRHA4bO2xZIxfjF3RqdRWvhad5pb0eV1gE478M';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSupabase() {
  return supabase;
}

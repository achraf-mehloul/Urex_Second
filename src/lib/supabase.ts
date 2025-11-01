import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Registration {
  id: string;
  full_name: string;
  last_name: string;
  date_of_birth: string;
  major: string;
  department: string;
  campus: string;
  programming_knowledge: string;
  programming_goals: string;
  created_at: string;
}

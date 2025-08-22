import { createClient } from '@supabase/supabase-js'

// ✅ Vite exposes only variables prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

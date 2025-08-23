import { createClient } from '@supabase/supabase-js'

// Correct: use DATABASE_URL (Netlify injects this)
const supabaseUrl = import.meta.env.VITE_SUPABASE_DATABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

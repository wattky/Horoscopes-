
// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Environment variables (must start with VITE_ for frontend)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables for frontend")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

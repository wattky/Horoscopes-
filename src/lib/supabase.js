import { createClient } from '@supabase/supabase-js'

/**
 * Safe Supabase client.
 * If VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing in this
 * environment (e.g., local dev or a fresh Netlify site), we export `null`
 * instead of throwing. App code should handle `supabase === null`.
 */
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (url && key) ? createClient(url, key) : null


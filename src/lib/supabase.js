// src/lib/supabase.js

// A fake Supabase client for local/demo use
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: (cb) => {
      // Immediately return a fake subscription
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    signInWithOtp: async ({ email }) => {
      console.log(`Pretend sign in with magic link for: ${email}`)
      return { data: { user: { email } }, error: null }
    },
    signOut: async () => {
      console.log("Pretend sign out")
      return { error: null }
    }
  },
  from: (table) => ({
    insert: async (values) => {
      console.log(`Pretend insert into ${table}:`, values)
      return { data: values, error: null }
    },
    select: async () => {
      console.log(`Pretend select from ${table}`)
      return { data: [], error: null }
    }
  })
}

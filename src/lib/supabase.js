// src/lib/supabase.js
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe(){} } } }),
    signInWithOtp: async ({ email }) => ({ data: { user: { id: 'fake-user', email } }, error: null }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    insert: async () => ({ data: null, error: null }),
    select: async () => ({ data: [], error: null }),
  })
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔹 Try to get session (stubbed Supabase just resolves null)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    // 🔹 Listen to auth changes (stub will just no-op)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  // Fake login just sets a mock user instantly
  const login = (email) => {
    console.log(`Mock login for: ${email}`)
    setUser({ id: 'fake-user', email })
  }

  const logout = () => {
    console.log("Mock logout")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

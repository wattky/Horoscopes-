import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fake auth flow — always resolves quickly
  useEffect(() => {
    setTimeout(() => {
      setUser(null) // No logged in user
      setLoading(false)
    }, 300) // short delay to mimic loading
  }, [])

  // Fake login/logout functions
  const login = (email) => {
    console.log(`Pretend logging in with: ${email}`)
    setUser({ email }) // simulate a user
  }

  const logout = () => {
    console.log('Pretend logging out')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

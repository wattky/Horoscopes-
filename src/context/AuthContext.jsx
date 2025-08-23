import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [isPremium, setIsPremium] = useState(false)

  const login = (email) => setUser({ id: 'fake', email })
  const logout = () => { setUser(null); setIsPremium(false) }
  const upgrade = () => setIsPremium(true)

  return (
    <AuthContext.Provider value={{ user, isPremium, login, logout, upgrade }}>
      {children}
    </AuthContext.Provider>
  )
}

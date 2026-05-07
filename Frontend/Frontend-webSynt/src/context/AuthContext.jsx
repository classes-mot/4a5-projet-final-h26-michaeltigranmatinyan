import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))

  const login = (jwtToken) => {
    if (jwtToken) {
      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
      setIsLoggedIn(true)
    }
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

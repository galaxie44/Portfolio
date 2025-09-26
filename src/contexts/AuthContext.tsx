import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginCredentials, AuthState } from '../types/auth'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Configuration admin (en production, utilisez des variables d'environnement)
const ADMIN_CONFIG = {
  username: 'Edouard',
  password: 'Obscur64!', // Changez ce mot de passe !
  email: 'edouard@portfolio.com'
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem('portfolio_user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        // Vérifier que l'utilisateur est valide
        if (user && user.username && user.role === 'admin') {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          localStorage.removeItem('portfolio_user')
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          })
        }
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('portfolio_user')
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulation d'une authentification
    if (credentials.username === ADMIN_CONFIG.username && credentials.password === ADMIN_CONFIG.password) {
      const user: User = {
        id: '1',
        username: ADMIN_CONFIG.username,
        email: ADMIN_CONFIG.email,
        role: 'admin',
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('portfolio_user', JSON.stringify(user))
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('portfolio_user')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

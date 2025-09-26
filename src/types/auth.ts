export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
  replied: boolean
}

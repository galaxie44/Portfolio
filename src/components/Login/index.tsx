import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, Home } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './styles.module.css'

interface LoginProps {
  onSuccess: () => void
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const success = await login(credentials)
      if (success) onSuccess()
      else setError("Nom d'utilisateur ou mot de passe incorrect")
    } catch {
      setError("Une erreur s'est produite lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const goToHome = () => { window.location.href = '/' }

  return (
    <div className={styles.pageWrap}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className={styles.logoCircle}>
              <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Connexion Admin</h1>
            <p className="text-dark-600 dark:text-dark-400 mt-2">Accédez au tableau de bord administrateur</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Nom d'utilisateur</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-dark-400" />
                </div>
                <input id="username" name="username" type="text" required value={credentials.username} onChange={handleInputChange} className={styles.input} placeholder="Votre nom d'utilisateur" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={credentials.password} onChange={handleInputChange} className={styles.inputWithIcon} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {error}
              </motion.div>
            )}

            <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </motion.button>
          </form>

          <div className="mt-4">
            <motion.button onClick={goToHome} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={styles.backBtn}>
              <Home className="w-4 h-4" />
              <span>Retour au portfolio</span>
            </motion.button>
          </div>

          <div className={styles.infoBox}>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Accès administrateur</strong><br />
              Entrez vos identifiants pour accéder au tableau de bord
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Vérifier le thème préféré
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Appliquer le thème
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Vérifier si on est sur la route admin
  const isAdminRoute = window.location.pathname === '/admin'

  // Attendre que l'authentification soit chargée avant de décider
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="text-dark-600 dark:text-dark-400">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si on est sur la route admin et pas connecté, afficher le login
  if (isAdminRoute && !isAuthenticated) {
    return <Login onSuccess={() => {}} />
  }

  // Si on est sur la route admin et connecté, afficher le dashboard
  if (isAdminRoute && isAuthenticated) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

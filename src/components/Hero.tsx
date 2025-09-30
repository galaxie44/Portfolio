import { motion } from 'framer-motion'
import { ChevronDown, Download, Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      default:
        return <Mail className="w-5 h-5" />
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-dark-900 dark:to-dark-800" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="container relative z-10">
        <div className="text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-lg text-primary-600 dark:text-primary-400 font-medium">
              Bonjour, je suis
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl text-dark-600 dark:text-dark-400 mb-8 font-light"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-dark-600 dark:text-dark-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Me contacter
            </motion.a>

            {personalInfo.resumeUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resumeUrl}
                download
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger CV
              </motion.a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center space-x-6 mb-16"
          >
            {personalInfo.socialLinks.map((social) => (
              <motion.a
                key={social.name}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {getIcon(social.icon)}
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={scrollToNext}
              className="p-2 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

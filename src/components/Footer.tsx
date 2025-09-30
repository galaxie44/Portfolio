import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className="bg-dark-900 dark:bg-black text-white">
      <div className="container">
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Portfolio
              </h3>
              <p className="text-dark-400 mb-4">
                Développeur passionné créant des expériences numériques exceptionnelles.
              </p>
              <div className="flex space-x-4">
                {personalInfo.socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-dark-800 hover:bg-primary-600 rounded-lg transition-colors duration-200 text-dark-400 hover:text-white"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.name === 'GitHub' && '🐙'}
                    {social.name === 'LinkedIn' && '💼'}
                    {social.name === 'Instagram' && '📷'}
                    {social.name === 'Twitter' && '🐦'}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Accueil', href: '#home' },
                  { name: 'À propos', href: '#about' },
                  { name: 'Compétences', href: '#skills' },
                  { name: 'Projets', href: '#projects' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-dark-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-dark-400">
                <p>{personalInfo.email}</p>
                {personalInfo.phone && <p>{personalInfo.phone}</p>}
                <p>{personalInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-dark-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-dark-400">
                <span>© {getCurrentYear()} {personalInfo.name}. Fait avec</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-red-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.span>
                <span>et beaucoup de café ☕</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200 text-white"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Retour en haut</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

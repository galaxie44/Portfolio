import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Edit3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { personalInfo, experiences as defaultExperiences } from '../data/personalInfo'
import { getExperiences } from '../utils/adminStorage'
import { Experience } from '../types'
import AdminEditMode from './AdminEditMode'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const { isAuthenticated } = useAuth()
  const [showEditMode, setShowEditMode] = useState(false)
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences)

  useEffect(() => {
    // Charger les expériences depuis le localStorage
    const storedExperiences = getExperiences()
    if (storedExperiences.length > 0) {
      setExperiences(storedExperiences)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="about" className="section bg-dark-50 dark:bg-dark-800/50">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                À propos de <span className="gradient-text">moi</span>
              </h2>
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEditMode(true)}
                  className="p-2 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-lg transition-colors"
                  title="Mode édition admin"
                >
                  <Edit3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </motion.button>
              )}
            </div>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Découvrez mon parcours, mes passions et ce qui me motive dans le développement
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-dark-700 dark:text-dark-300 leading-relaxed">
                  {personalInfo.bio}
                </p>
                <p className="text-dark-700 dark:text-dark-300 leading-relaxed">
                  Basé à {personalInfo.location}, je me spécialise dans la création d'applications web modernes
                  et performantes. Mon approche combine créativité et rigueur technique pour livrer des
                  solutions qui répondent parfaitement aux besoins des utilisateurs.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-dark-700 dark:text-dark-300">
                    <strong>Localisation:</strong> {personalInfo.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-dark-700 dark:text-dark-300">
                    <strong>Email:</strong> {personalInfo.email}
                  </span>
                </div>
                {personalInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-dark-700 dark:text-dark-300">
                      <strong>Téléphone:</strong> {personalInfo.phone}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
                Mon parcours
              </h3>

              <div className="space-y-6">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>

                    <div className="card hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-semibold text-dark-900 dark:text-white">
                          {exp.title}
                        </h4>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {exp.startDate} - {exp.endDate || 'Présent'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-lg font-medium text-dark-700 dark:text-dark-300">
                          {exp.company}
                        </p>
                        <p className="text-dark-600 dark:text-dark-400">
                          {exp.location}
                        </p>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <span className="text-dark-700 dark:text-dark-300 text-sm">
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Admin Edit Mode Modal */}
      {showEditMode && (
        <AdminEditMode
          onClose={() => {
            setShowEditMode(false)
            // Recharger les expériences après fermeture du mode édition
            const updatedExperiences = getExperiences()
            if (updatedExperiences.length > 0) {
              setExperiences(updatedExperiences)
            }
          }}
        />
      )}
    </section>
  )
}

export default About

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, Edit3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getProjects, getFeaturedProjects } from '../utils/adminStorage'
import AdminEditMode from './AdminEditMode'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const { isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [projects] = useState(getProjects())
  const [featuredProjects] = useState(getFeaturedProjects())
  const [showEditMode, setShowEditMode] = useState(false)

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

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'desktop', name: 'Desktop' },
    { id: 'other', name: 'Autres' }
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="section bg-dark-50 dark:bg-dark-800/50">
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
                Mes <span className="gradient-text">projets</span>
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
              Découvrez quelques-uns de mes projets récents et les technologies utilisées
            </p>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-8 text-center">
                Projets en vedette
              </h3>

              <div className="flex justify-center">
                <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {featuredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className={`card hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                      featuredProjects.length === 1 ? 'lg:col-span-2 lg:justify-self-center' : ''
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                        {project.image && project.image !== '/images/project.jpg' ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl opacity-20">🚀</div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        {project.githubUrl && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-dark-900 hover:bg-primary-100 transition-colors"
                          >
                            <Github className="w-6 h-6" />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-dark-900 hover:bg-primary-100 transition-colors"
                          >
                            <ExternalLink className="w-6 h-6" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                        {project.title}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-400 mb-4">
                        {project.longDescription || project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">Démo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </motion.div>
          )}

            {/* All Projects */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-8 text-center">
                Tous les projets
              </h3>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-dark-800 text-dark-700 dark:text-dark-300 border border-dark-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4 opacity-50">
                  {selectedCategory === 'web' ? '🌐' :
                   selectedCategory === 'mobile' ? '📱' :
                   selectedCategory === 'desktop' ? '💻' :
                   selectedCategory === 'other' ? '🔧' : '📁'}
                </div>
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  Aucun projet {selectedCategory === 'all' ? '' : `dans la catégorie ${categories.find(c => c.id === selectedCategory)?.name}`}
                </h3>
                <p className="text-dark-600 dark:text-dark-400 max-w-md mx-auto">
                  {selectedCategory === 'all'
                    ? "Aucun projet n'a encore été ajouté. Connectez-vous en tant qu'administrateur pour ajouter vos premiers projets."
                    : `Aucun projet ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} n'a encore été ajouté.`}
                </p>
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
                {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className={`card hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                    filteredProjects.length === 1 ? 'sm:col-span-2 lg:col-span-2 justify-self-center' : ''
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                      {project.image && project.image !== '/images/project.jpg' ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl opacity-20">💻</div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full text-dark-900 hover:bg-primary-100 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full text-dark-900 hover:bg-primary-100 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-dark-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-400 text-sm mb-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Démo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Admin Edit Mode Modal */}
      {showEditMode && (
        <AdminEditMode
          initialTab="projects"
          allowedTabs={['projects']}
          onClose={() => {
            setShowEditMode(false)
            // Recharger les projets après fermeture du mode édition
            window.location.reload()
          }}
        />
      )}
    </section>
  )
}

export default Projects

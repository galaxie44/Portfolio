import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getSkills } from '../utils/adminStorage'
import { getSkillLevelFromPercentage } from '../utils/skillLevels'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [skills] = useState(getSkills())

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    database: skills.filter(skill => skill.category === 'database'),
    tools: skills.filter(skill => skill.category === 'tools'),
    other: skills.filter(skill => skill.category === 'other')
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend'
      case 'backend':
        return 'Backend'
      case 'database':
        return 'Base de données'
      case 'tools':
        return 'Outils'
      default:
        return 'Autres'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return '🎨'
      case 'backend':
        return '⚙️'
      case 'database':
        return '🗄️'
      case 'tools':
        return '🛠️'
      default:
        return '📦'
    }
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mes <span className="gradient-text">compétences</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Technologies et outils que j'utilise pour créer des solutions innovantes
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(skillCategories)
              .filter(([, categorySkills]) => categorySkills.length > 0)
              .map(([category, categorySkills]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-72 max-w-sm"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
                    {getCategoryTitle(category)}
                  </h3>
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-dark-700 dark:text-dark-300">
                          {skill.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSkillLevelFromPercentage(skill.level).color} bg-opacity-20`}>
                          {getSkillLevelFromPercentage(skill.level).label}
                        </span>
                      </div>

                      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default Skills

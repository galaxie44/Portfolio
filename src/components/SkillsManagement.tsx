import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { Skill } from '../types'
import { getSkillLevelFromPercentage, getSkillLevelsOptions } from '../utils/skillLevels'

interface SkillsManagementProps {
  skills: Skill[]
  onAdd: (skill: Omit<Skill, 'id'>) => void
  onUpdate: (skillName: string, updates: Partial<Skill>) => void
  onDelete: (skillName: string) => void
  onEdit: (skill: Skill) => void
  showForm: boolean
  editingSkill: Skill | null
  onShowForm: (show: boolean) => void
  onCancelEdit: () => void
}

const SkillsManagement: React.FC<SkillsManagementProps> = ({
  skills,
  onAdd,
  onUpdate,
  onDelete,
  onEdit,
  showForm,
  editingSkill,
  onShowForm,
  onCancelEdit
}) => {
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 50,
    category: 'frontend'
  })

  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    database: skills.filter(skill => skill.category === 'database'),
    tools: skills.filter(skill => skill.category === 'tools')
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend': return 'Frontend'
      case 'backend': return 'Backend'
      case 'database': return 'Base de données'
      case 'tools': return 'Outils'
      default: return 'Autres'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return '🎨'
      case 'backend': return '⚙️'
      case 'database': return '🗄️'
      case 'tools': return '🛠️'
      default: return '📦'
    }
  }

  const handleSubmit = () => {
    if (editingSkill) {
      onUpdate(editingSkill.name, newSkill)
    } else {
      onAdd(newSkill)
    }
    setNewSkill({ name: '', level: 50, category: 'frontend' })
    onCancelEdit()
  }

  const handleEditClick = (skill: Skill) => {
    setNewSkill({
      name: skill.name,
      level: skill.level,
      category: skill.category
    })
    onEdit(skill)
  }

  const handleCancel = () => {
    setNewSkill({ name: '', level: 50, category: 'frontend' })
    onCancelEdit()
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec bouton ajouter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
          Gestion des Compétences
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => showForm ? handleCancel() : onShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Annuler' : 'Ajouter une compétence'}</span>
        </motion.button>
      </div>

      {/* Formulaire pour ajouter/modifier */}
      {(showForm || editingSkill) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700"
        >
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
            {editingSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Nom de la compétence
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: CSS, JavaScript..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Catégorie
              </label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Base de données</option>
                <option value="tools">Outils</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Niveau: {getSkillLevelFromPercentage(newSkill.level).label}
              </label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
              >
                {getSkillLevelsOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </select>
              <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${newSkill.level}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!newSkill.name.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingSkill ? 'Modifier' : 'Ajouter'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Annuler</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Liste des compétences par catégorie */}
      <div className="flex flex-wrap justify-center gap-6">
        {Object.entries(skillCategories)
          .map(([category, categorySkills]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(category)}</div>
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
                  {getCategoryTitle(category)}
                </h3>
              </div>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                {categorySkills.length} compétences
              </span>
            </div>

            {categorySkills.length === 0 ? (
              <div className="text-center py-8 text-dark-500 dark:text-dark-400">
                <p>Aucune compétence dans cette catégorie</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-dark-50 dark:bg-dark-700 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-between w-full">
                        <h4 className="font-medium text-dark-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillLevelFromPercentage(skill.level).color} bg-opacity-20`}>
                          {getSkillLevelFromPercentage(skill.level).label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditClick(skill)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDelete(skill.name)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Barre de progression */}
                    <div className="w-full bg-dark-200 dark:bg-dark-600 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full relative overflow-hidden"
                      >
                        {/* Effet brillant sur la barre */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SkillsManagement

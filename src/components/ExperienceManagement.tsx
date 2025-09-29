import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Calendar, MapPin, Building } from 'lucide-react'
import { Experience } from '../types'

interface ExperienceManagementProps {
  experiences: Experience[]
  onAdd: (experience: Omit<Experience, 'id'>) => void
  onUpdate: (experienceId: string, updates: Partial<Experience>) => void
  onDelete: (experienceId: string) => void
  onEdit: (experience: Experience) => void
  showForm: boolean
  editingExperience: Experience | null
  onShowForm: (show: boolean) => void
  onCancelEdit: () => void
}

const ExperienceManagement: React.FC<ExperienceManagementProps> = ({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
  onEdit,
  showForm,
  editingExperience,
  onShowForm,
  onCancelEdit
}) => {
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: [''],
    technologies: []
  })

  const [newDescription, setNewDescription] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  const handleSubmit = () => {
    if (editingExperience) {
      onUpdate(editingExperience.id, newExperience)
    } else {
      onAdd(newExperience)
    }
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [''],
      technologies: []
    })
    setNewDescription('')
    setNewTechnology('')
    onCancelEdit()
  }

  const handleEditClick = (experience: Experience) => {
    setNewExperience({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      description: experience.description,
      technologies: experience.technologies
    })
    onEdit(experience)
  }

  const handleCancel = () => {
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [''],
      technologies: []
    })
    setNewDescription('')
    setNewTechnology('')
    onCancelEdit()
  }

  const addDescription = () => {
    if (newDescription.trim()) {
      setNewExperience({
        ...newExperience,
        description: [...newExperience.description, newDescription.trim()]
      })
      setNewDescription('')
    }
  }

  const removeDescription = (index: number) => {
    setNewExperience({
      ...newExperience,
      description: newExperience.description.filter((_, i) => i !== index)
    })
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setNewExperience({
        ...newExperience,
        technologies: [...newExperience.technologies, newTechnology.trim()]
      })
      setNewTechnology('')
    }
  }

  const removeTechnology = (index: number) => {
    setNewExperience({
      ...newExperience,
      technologies: newExperience.technologies.filter((_, i) => i !== index)
    })
  }

  const updateDescription = (index: number, value: string) => {
    const updatedDescriptions = [...newExperience.description]
    updatedDescriptions[index] = value
    setNewExperience({
      ...newExperience,
      description: updatedDescriptions
    })
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec bouton ajouter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
          Gestion du Parcours
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => showForm ? handleCancel() : onShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Annuler' : 'Ajouter une expérience'}</span>
        </motion.button>
      </div>

      {/* Formulaire pour ajouter/modifier */}
      {(showForm || editingExperience) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700"
        >
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
            {editingExperience ? 'Modifier l\'expérience' : 'Nouvelle expérience'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Titre du poste
              </label>
              <input
                type="text"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: Développeur Full Stack"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: Tech Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: Paris, France"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Date de début
              </label>
              <input
                type="text"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: 2022-01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Date de fin (laisser vide si en cours)
              </label>
              <input
                type="text"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="ex: 2024-01 ou laisser vide"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
              Descriptions des missions
            </label>
            <div className="space-y-2">
              {newExperience.description.map((desc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                    placeholder="Description de la mission"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeDescription(index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="flex-1 px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                  placeholder="Ajouter une nouvelle description"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={addDescription}
                  className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                  title="Ajouter"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
              Technologies utilisées
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newExperience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => removeTechnology(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="flex-1 px-3 py-2 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                placeholder="Ajouter une technologie"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={addTechnology}
                className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                title="Ajouter"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!newExperience.title.trim() || !newExperience.company.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingExperience ? 'Modifier' : 'Ajouter'}</span>
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

      {/* Liste des expériences */}
      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-dark-500 dark:text-dark-400">
            <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune expérience ajoutée</p>
          </div>
        ) : (
          experiences.map((experience) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
                      {experience.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-dark-600 dark:text-dark-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{experience.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {experience.startDate} - {experience.endDate || 'Présent'}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {experience.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span className="text-dark-700 dark:text-dark-300 text-sm">
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditClick(experience)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(experience.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default ExperienceManagement

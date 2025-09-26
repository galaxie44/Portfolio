import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Star,
  StarOff,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Project, Skill } from '../types'
import {
  getProjects,
  saveProjects,
  addProject,
  updateProject,
  deleteProject,
  getSkills,
  saveSkills,
  addSkill,
  updateSkill,
  deleteSkill
} from '../utils/adminStorage'

interface AdminEditModeProps {
  onClose: () => void
}

const AdminEditMode: React.FC<AdminEditModeProps> = ({ onClose }) => {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    setProjects(getProjects())
    setSkills(getSkills())
  }

  const handleSaveProjects = () => {
    saveProjects(projects)
    // Recharger les données depuis le localStorage
    setProjects(getProjects())
    alert('Projets sauvegardés avec succès!')
  }

  const handleSaveSkills = () => {
    saveSkills(skills)
    // Recharger les données depuis le localStorage
    setSkills(getSkills())
    alert('Compétences sauvegardées avec succès!')
  }

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject = addProject(projectData)
    setProjects(getProjects()) // Recharger depuis localStorage
    setShowAddForm(false)
  }

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    updateProject(id, updates)
    setProjects(getProjects()) // Recharger depuis localStorage
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    deleteProject(id)
    setProjects(getProjects()) // Recharger depuis localStorage
  }

  const handleAddSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill = addSkill(skillData)
    setSkills(getSkills()) // Recharger depuis localStorage
    setShowAddForm(false)
  }

  const handleUpdateSkill = (name: string, updates: Partial<Skill>) => {
    updateSkill(name, updates)
    setSkills(getSkills()) // Recharger depuis localStorage
    setEditingSkill(null)
  }

  const handleDeleteSkill = (name: string) => {
    deleteSkill(name)
    setSkills(getSkills()) // Recharger depuis localStorage
  }

  const moveProjectPriority = (id: string, direction: 'up' | 'down') => {
    const project = projects.find(p => p.id === id)
    if (!project) return

    const currentPriority = project.priority || 999
    const newPriority = direction === 'up' ? currentPriority - 1 : currentPriority + 1

    // Ensure priority doesn't go below 1
    if (newPriority < 1) return

    handleUpdateProject(id, { priority: newPriority })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-200 dark:border-dark-700">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
            Mode Édition Admin
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-200 dark:border-dark-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'skills'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            }`}
          >
            Compétences
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'projects' && (
            <ProjectsEditor
              projects={projects}
              onAdd={handleAddProject}
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
              onMovePriority={moveProjectPriority}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsEditor
              skills={skills}
              onAdd={handleAddSkill}
              onUpdate={handleUpdateSkill}
              onDelete={handleDeleteSkill}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              editingSkill={editingSkill}
              setEditingSkill={setEditingSkill}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-dark-200 dark:border-dark-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={activeTab === 'projects' ? handleSaveProjects : handleSaveSkills}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Sauvegarder {activeTab === 'projects' ? 'Projets' : 'Compétences'}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Projects Editor Component
const ProjectsEditor: React.FC<{
  projects: Project[]
  onAdd: (project: Omit<Project, 'id'>) => void
  onUpdate: (id: string, updates: Partial<Project>) => void
  onDelete: (id: string) => void
  onMovePriority: (id: string, direction: 'up' | 'down') => void
  showAddForm: boolean
  setShowAddForm: (show: boolean) => void
  editingProject: Project | null
  setEditingProject: (project: Project | null) => void
}> = ({ projects, onAdd, onUpdate, onDelete, onMovePriority, showAddForm, setShowAddForm, editingProject, setEditingProject }) => {
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    longDescription: '',
    image: '/images/project.jpg',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    priority: 999,
    category: 'web'
  })

  const handleAddProject = () => {
    onAdd(newProject)
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      image: '/images/project.jpg',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      featured: false,
      priority: 999,
      category: 'web'
    })
  }

  const sortedProjects = [...projects].sort((a, b) => (a.priority || 999) - (b.priority || 999))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
          Gestion des Projets
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un projet</span>
        </button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h4 className="text-lg font-semibold mb-4">Nouveau Projet</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Titre du projet"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Description courte"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <textarea
              placeholder="Description longue"
              value={newProject.longDescription}
              onChange={(e) => setNewProject({ ...newProject, longDescription: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
              rows={3}
            />
            <input
              type="number"
              placeholder="Priorité (1 = plus élevé)"
              value={newProject.priority}
              onChange={(e) => setNewProject({ ...newProject, priority: parseInt(e.target.value) || 999 })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <select
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="other">Autre</option>
            </select>
            <input
              type="text"
              placeholder="URL GitHub"
              value={newProject.githubUrl}
              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="URL Live"
              value={newProject.liveUrl}
              onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm text-dark-700 dark:text-dark-300">
                Projet en vedette
              </label>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleAddProject}
              className="btn-primary"
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {sortedProjects.map((project) => (
          <div key={project.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-dark-900 dark:text-white">
                    {project.title}
                  </h4>
                  {project.priority && project.priority <= 2 && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    Priorité: {project.priority || 999}
                  </span>
                </div>
                <p className="text-dark-600 dark:text-dark-400 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onMovePriority(project.id!, 'up')}
                  className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"
                  title="Augmenter la priorité"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onMovePriority(project.id!, 'down')}
                  className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"
                  title="Diminuer la priorité"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const newTitle = prompt('Nouveau titre:', project.title)
                    if (newTitle && newTitle.trim()) {
                      onUpdate(project.id!, { title: newTitle.trim() })
                    }
                  }}
                  className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"
                  title="Modifier le titre"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?`)) {
                      onDelete(project.id!)
                    }
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600 dark:text-red-400"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skills Editor Component
const SkillsEditor: React.FC<{
  skills: Skill[]
  onAdd: (skill: Omit<Skill, 'id'>) => void
  onUpdate: (name: string, updates: Partial<Skill>) => void
  onDelete: (name: string) => void
  showAddForm: boolean
  setShowAddForm: (show: boolean) => void
  editingSkill: Skill | null
  setEditingSkill: (skill: Skill | null) => void
}> = ({ skills, onAdd, onUpdate, onDelete, showAddForm, setShowAddForm, editingSkill, setEditingSkill }) => {
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 50,
    category: 'frontend'
  })

  const handleAddSkill = () => {
    onAdd(newSkill)
    setNewSkill({
      name: '',
      level: 50,
      category: 'frontend'
    })
  }

  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    database: skills.filter(skill => skill.category === 'database'),
    tools: skills.filter(skill => skill.category === 'tools')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
          Gestion des Compétences
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une compétence</span>
        </button>
      </div>

      {/* Add Skill Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h4 className="text-lg font-semibold mb-4">Nouvelle Compétence</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nom de la compétence"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <input
              type="number"
              placeholder="Niveau (1-100)"
              min="1"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 50 })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
              className="px-3 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Base de données</option>
              <option value="tools">Outils</option>
            </select>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleAddSkill}
              className="btn-primary"
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </motion.div>
      )}

      {/* Skills by Category */}
      {Object.entries(skillCategories).map(([category, categorySkills]) => (
        <div key={category} className="card">
          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 capitalize">
            {category === 'frontend' ? 'Frontend' :
             category === 'backend' ? 'Backend' :
             category === 'database' ? 'Base de données' : 'Outils'}
          </h4>
          <div className="space-y-3">
            {categorySkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-dark-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      const newLevel = prompt(`Nouveau niveau pour ${skill.name} (1-100):`, skill.level.toString())
                      if (newLevel && !isNaN(parseInt(newLevel)) && parseInt(newLevel) >= 1 && parseInt(newLevel) <= 100) {
                        onUpdate(skill.name, { level: parseInt(newLevel) })
                      }
                    }}
                    className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"
                    title="Modifier le niveau"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Êtes-vous sûr de vouloir supprimer la compétence "${skill.name}" ?`)) {
                        onDelete(skill.name)
                      }
                    }}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600 dark:text-red-400"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminEditMode

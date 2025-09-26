import { Project, Skill, PersonalInfo } from '../types'

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  personalInfo: 'portfolio_personal_info'
}

// Projects
export const saveProjects = (projects: Project[]): void => {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects))
}

export const getProjects = (): Project[] => {
  try {
    const projects = localStorage.getItem(STORAGE_KEYS.projects)
    if (projects) {
      return JSON.parse(projects)
    }
    // Si pas de données en localStorage, retourner les données par défaut
    const { projects: defaultProjects } = require('../data/personalInfo')
    return defaultProjects
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

export const addProject = (project: Omit<Project, 'id'>): Project => {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: Date.now().toString()
  }
  const updatedProjects = [...projects, newProject]
  saveProjects(updatedProjects)
  return newProject
}

export const updateProject = (id: string, updates: Partial<Project>): void => {
  const projects = getProjects()
  const updatedProjects = projects.map(project =>
    project.id === id ? { ...project, ...updates } : project
  )
  saveProjects(updatedProjects)
}

export const deleteProject = (id: string): void => {
  const projects = getProjects()
  const updatedProjects = projects.filter(project => project.id !== id)
  saveProjects(updatedProjects)
}

// Skills
export const saveSkills = (skills: Skill[]): void => {
  localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills))
}

export const getSkills = (): Skill[] => {
  try {
    const skills = localStorage.getItem(STORAGE_KEYS.skills)
    if (skills) {
      return JSON.parse(skills)
    }
    // Si pas de données en localStorage, retourner les données par défaut
    const { skills: defaultSkills } = require('../data/personalInfo')
    return defaultSkills
  } catch (error) {
    console.error('Error loading skills:', error)
    return []
  }
}

export const addSkill = (skill: Omit<Skill, 'id'>): Skill => {
  const skills = getSkills()
  const newSkill: Skill = {
    ...skill,
    id: Date.now().toString()
  }
  const updatedSkills = [...skills, newSkill]
  saveSkills(updatedSkills)
  return newSkill
}

export const updateSkill = (name: string, updates: Partial<Skill>): void => {
  const skills = getSkills()
  const updatedSkills = skills.map(skill =>
    skill.name === name ? { ...skill, ...updates } : skill
  )
  saveSkills(updatedSkills)
}

export const deleteSkill = (name: string): void => {
  const skills = getSkills()
  const updatedSkills = skills.filter(skill => skill.name !== name)
  saveSkills(updatedSkills)
}

// Personal Info
export const savePersonalInfo = (info: PersonalInfo): void => {
  localStorage.setItem(STORAGE_KEYS.personalInfo, JSON.stringify(info))
}

export const getPersonalInfo = (): PersonalInfo | null => {
  try {
    const info = localStorage.getItem(STORAGE_KEYS.personalInfo)
    return info ? JSON.parse(info) : null
  } catch (error) {
    console.error('Error loading personal info:', error)
    return null
  }
}

// Featured projects logic
export const getFeaturedProjects = (): Project[] => {
  const projects = getProjects()
  return projects
    .filter(project => project.priority && project.priority <= 2) // Priorité 1 et 2
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
}

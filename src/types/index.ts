export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  priority?: number // 1 = plus élevé, pour les projets en vedette
  category: 'web' | 'mobile' | 'desktop' | 'other'
}

export interface Skill {
  id?: string
  name: string
  level: number // 1-100
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
  icon?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string[]
  technologies: string[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  bioExtended?: string
  heroIntro?: string
  location: string
  email: string
  phone?: string
  resumeUrl?: string
  resumeBase64?: string
  resumeFilename?: string
  socialLinks: SocialLink[]
  availability?: 'available' | 'busy' | 'unavailable'
}

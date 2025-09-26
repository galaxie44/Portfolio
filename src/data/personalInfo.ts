import { PersonalInfo, Project, Skill, Experience } from '../types'

export const personalInfo: PersonalInfo = {
  name: "Votre Nom",
  title: "Développeur Full Stack",
  bio: "Passionné par le développement web et les nouvelles technologies, je crée des expériences numériques exceptionnelles avec une approche moderne et centrée sur l'utilisateur.",
  location: "Ville, Pays",
  email: "votre.email@example.com",
  phone: "+33 6 12 34 56 78",
  resumeUrl: "/resume.pdf",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/votre-username",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/votre-profile",
      icon: "linkedin"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/votre-username",
      icon: "twitter"
    }
  ]
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiement et gestion d'admin",
    longDescription: "Une application e-commerce moderne construite avec React, Node.js et MongoDB. Inclut un système de panier, intégration de paiement Stripe, gestion des commandes et interface d'administration complète.",
    image: "/images/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/votre-username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
    category: "web"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Application de gestion de tâches avec collaboration en temps réel",
    longDescription: "Application de productivité permettant la gestion de projets et tâches avec collaboration en temps réel, notifications push et synchronisation multi-appareils.",
    image: "/images/project2.jpg",
    technologies: ["Vue.js", "Socket.io", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/votre-username/task-manager",
    liveUrl: "https://taskmanager-demo.com",
    featured: true,
    category: "web"
  },
  {
    id: "3",
    title: "Mobile Weather App",
    description: "Application météo native avec géolocalisation",
    longDescription: "Application mobile native développée avec React Native offrant des prévisions météo précises, géolocalisation automatique et notifications météo personnalisées.",
    image: "/images/project3.jpg",
    technologies: ["React Native", "Expo", "OpenWeather API", "AsyncStorage"],
    githubUrl: "https://github.com/votre-username/weather-app",
    featured: false,
    category: "mobile"
  }
]

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Vue.js", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "FastAPI", level: 75, category: "backend" },

  // Database
  { name: "MongoDB", level: 85, category: "database" },
  { name: "PostgreSQL", level: 80, category: "database" },
  { name: "Redis", level: 70, category: "database" },

  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AWS", level: 70, category: "tools" },
  { name: "Figma", level: 65, category: "tools" }
]

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Développeur Full Stack Senior",
    company: "Tech Company",
    location: "Paris, France",
    startDate: "2022-01",
    endDate: "2024-01",
    description: [
      "Développement d'applications web modernes avec React et Node.js",
      "Architecture et implémentation de microservices",
      "Mentorat d'une équipe de 3 développeurs juniors",
      "Optimisation des performances et de l'expérience utilisateur"
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
  },
  {
    id: "2",
    title: "Développeur Frontend",
    company: "Startup Inc",
    location: "Lyon, France",
    startDate: "2020-06",
    endDate: "2021-12",
    description: [
      "Développement d'interfaces utilisateur responsives",
      "Intégration d'APIs REST et GraphQL",
      "Collaboration avec l'équipe design pour l'implémentation d'UI/UX",
      "Tests unitaires et d'intégration"
    ],
    technologies: ["Vue.js", "JavaScript", "CSS3", "Jest", "GraphQL"]
  }
]

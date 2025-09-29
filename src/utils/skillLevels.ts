export interface SkillLevel {
  label: string
  color: string
  description: string
}

export const getSkillLevelFromPercentage = (percentage: number): SkillLevel => {
  if (percentage >= 90) {
    return {
      label: 'Expert',
      color: 'text-red-600 dark:text-red-400',
      description: 'Maîtrise complète'
    }
  } else if (percentage >= 75) {
    return {
      label: 'Avancé',
      color: 'text-orange-600 dark:text-orange-400',
      description: 'Très bon niveau'
    }
  } else if (percentage >= 50) {
    return {
      label: 'Intermédiaire',
      color: 'text-yellow-600 dark:text-yellow-400',
      description: 'Niveau moyen'
    }
  } else if (percentage >= 25) {
    return {
      label: 'Débutant',
      color: 'text-blue-600 dark:text-blue-400',
      description: 'Début de l\'apprentissage'
    }
  } else {
    return {
      label: 'Novice',
      color: 'text-gray-600 dark:text-gray-400',
      description: 'Premiers pas'
    }
  }
}

export const getSkillLevelsOptions = (): Array<{value: number, label: string, description: string}> => {
  return [
    { value: 20, label: 'Novice', description: 'Premiers pas (0-24%)' },
    { value: 35, label: 'Débutant', description: 'Début de l\'apprentissage (25-49%)' },
    { value: 65, label: 'Intermédiaire', description: 'Niveau moyen (50-74%)' },
    { value: 85, label: 'Avancé', description: 'Très bon niveau (75-89%)' },
    { value: 95, label: 'Expert', description: 'Maîtrise complète (90-100%)' }
  ]
}

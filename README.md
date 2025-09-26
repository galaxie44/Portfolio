# Portfolio Personnel

Un portfolio moderne et responsive construit avec React, TypeScript et Tailwind CSS.

## 🚀 Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **React Intersection Observer** - Animations au scroll

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Header.tsx      # Navigation principale
│   ├── Hero.tsx        # Section d'accueil
│   ├── About.tsx       # Section à propos
│   ├── Skills.tsx      # Section compétences
│   ├── Projects.tsx    # Section projets
│   ├── Contact.tsx     # Section contact
│   ├── Footer.tsx      # Pied de page
│   └── LoadingScreen.tsx # Écran de chargement
├── data/               # Données du portfolio
│   └── personalInfo.ts # Informations personnelles
├── types/              # Types TypeScript
│   └── index.ts        # Définitions de types
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🛠️ Installation et démarrage

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📝 Personnalisation

### Modifier vos informations personnelles

Éditez le fichier `src/data/personalInfo.ts` pour personnaliser :

- Nom et titre
- Bio et description
- Informations de contact
- Liens sociaux
- Projets
- Compétences
- Expériences professionnelles

### Personnaliser les couleurs

Modifiez le fichier `tailwind.config.js` pour changer la palette de couleurs :

```javascript
colors: {
  primary: {
    // Vos couleurs primaires
  },
  dark: {
    // Vos couleurs sombres
  }
}
```

### Ajouter des projets

Dans `src/data/personalInfo.ts`, ajoutez vos projets dans le tableau `projects` :

```typescript
{
  id: "unique-id",
  title: "Nom du projet",
  description: "Description courte",
  longDescription: "Description détaillée",
  image: "/images/project.jpg",
  technologies: ["React", "TypeScript", "Tailwind"],
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://demo.com",
  featured: true,
  category: "web"
}
```

## 🎨 Fonctionnalités

- ✅ Design responsive
- ✅ Mode sombre/clair
- ✅ Animations fluides
- ✅ Navigation smooth scroll
- ✅ Formulaire de contact
- ✅ Filtrage des projets
- ✅ Écran de chargement
- ✅ Optimisé pour le SEO
- ✅ Accessibilité

## 📦 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Vérifie le code avec ESLint

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Vercel et déploiera

### Netlify
1. Build le projet : `npm run build`
2. Uploadez le dossier `dist` sur Netlify

### GitHub Pages
1. Installez `gh-pages` : `npm install --save-dev gh-pages`
2. Ajoutez dans `package.json` :
   ```json
   "homepage": "https://username.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Déployez : `npm run deploy`

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Si vous avez des questions ou besoin d'aide, n'hésitez pas à me contacter :

- Email : votre.email@example.com
- LinkedIn : [Votre profil LinkedIn]
- GitHub : [Votre profil GitHub]
# Portfolio

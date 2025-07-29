# 🤝 Guide de Contribution - ShopEase Suite

Merci de votre intérêt pour contribuer à ShopEase Suite ! Ce guide vous aidera à comprendre comment participer au développement du projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Configuration de l'Environnement](#configuration-de-lenvironnement)
- [Standards de Code](#standards-de-code)
- [Processus de Pull Request](#processus-de-pull-request)
- [Signalement de Bugs](#signalement-de-bugs)
- [Suggestions de Fonctionnalités](#suggestions-de-fonctionnalités)

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite. Soyez respectueux, inclusif et constructif dans toutes vos interactions.

## 🚀 Comment Contribuer

### Types de Contributions

- 🐛 **Correction de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📚 **Amélioration de la documentation**
- 🎨 **Améliorations UI/UX**
- ⚡ **Optimisations de performance**
- 🧪 **Tests**

### Avant de Commencer

1. Consultez les [issues existantes](../../issues)
2. Vérifiez si votre contribution n'est pas déjà en cours
3. Ouvrez une issue pour discuter des changements majeurs

## 🛠️ Configuration de l'Environnement

### Prérequis

- Node.js 18+
- MongoDB 5.0+
- Git

### Installation

```bash
# 1. Fork et cloner le repository
git clone https://github.com/votre-username/shopease-suite.git
cd shopease-suite

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Installer les dépendances frontend
cd ../shop-ease-suite
npm install

# 4. Configurer les variables d'environnement
cd ../backend
cp .env.example .env
# Modifier .env avec vos configurations

# 5. Initialiser la base de données
npm run seed

# 6. Démarrer les serveurs
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd shop-ease-suite
npm run dev
```

## 📝 Standards de Code

### Backend (Node.js)

```javascript
// Utiliser des noms descriptifs
const getUserById = async (userId) => {
  // Gestion d'erreur appropriée
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Validation des données
const validateUserInput = (userData) => {
  if (!userData.email || !userData.password) {
    throw new Error('Email and password are required');
  }
};
```

### Frontend (React/TypeScript)

```typescript
// Utiliser TypeScript pour le typage
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Composants fonctionnels avec hooks
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      const userData = await userService.getUser(id);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.firstName} {user.lastName}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

### Conventions de Nommage

- **Variables/Fonctions** : camelCase (`getUserData`)
- **Composants React** : PascalCase (`UserProfile`)
- **Fichiers** : kebab-case (`user-profile.tsx`)
- **Constantes** : UPPER_SNAKE_CASE (`API_BASE_URL`)

### Style CSS

```css
/* Utiliser Tailwind CSS classes */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>
```

## 🔄 Processus de Pull Request

### 1. Créer une Branche

```bash
# Créer une branche depuis main
git checkout main
git pull origin main
git checkout -b feature/nom-de-la-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/description-du-bug
```

### 2. Développer

- Écrivez du code propre et documenté
- Ajoutez des tests si nécessaire
- Respectez les standards de code
- Committez régulièrement avec des messages clairs

### 3. Messages de Commit

```bash
# Format recommandé
git commit -m "type(scope): description"

# Exemples
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(cart): resolve quantity update bug"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(header): improve mobile navigation"
```

### 4. Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd shop-ease-suite
npm run type-check
npm run lint
```

### 5. Soumettre la PR

1. Push votre branche
2. Ouvrez une Pull Request
3. Remplissez le template de PR
4. Assignez des reviewers
5. Répondez aux commentaires

### Template de Pull Request

```markdown
## Description
Brève description des changements

## Type de Changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests manuels effectués
- [ ] Tous les tests passent

## Checklist
- [ ] Code respecte les standards
- [ ] Documentation mise à jour
- [ ] Pas de conflits de merge
- [ ] PR prête pour review
```

## 🐛 Signalement de Bugs

### Avant de Signaler

1. Vérifiez les issues existantes
2. Reproduisez le bug
3. Testez sur la dernière version

### Template de Bug Report

```markdown
**Description du Bug**
Description claire et concise du problème

**Étapes pour Reproduire**
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement Attendu**
Ce qui devrait se passer

**Captures d'Écran**
Si applicable, ajoutez des captures d'écran

**Environnement**
- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome 91]
- Version Node.js: [ex: 18.0.0]

**Informations Supplémentaires**
Tout autre contexte utile
```

## 💡 Suggestions de Fonctionnalités

### Template de Feature Request

```markdown
**Problème à Résoudre**
Description du problème que cette fonctionnalité résoudrait

**Solution Proposée**
Description claire de ce que vous voulez

**Alternatives Considérées**
Autres solutions envisagées

**Informations Supplémentaires**
Contexte, captures d'écran, etc.
```

## 📚 Ressources Utiles

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Outils de Développement
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## 🎉 Reconnaissance

Tous les contributeurs seront reconnus dans notre fichier CONTRIBUTORS.md et dans les notes de version.

## 📞 Contact

- **Issues GitHub** : Pour les bugs et fonctionnalités
- **Discussions** : Pour les questions générales
- **Email** : contact@shopease-suite.com

---

Merci de contribuer à ShopEase Suite ! 🚀

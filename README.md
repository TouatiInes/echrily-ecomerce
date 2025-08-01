# 🛒 MarketEase

Une application e-commerce moderne et complète construite avec la stack MERN (MongoDB, Express.js, React, Node.js). ShopEase Suite offre une expérience d'achat fluide avec un système d'authentification sécurisé, une gestion avancée des produits, et une interface utilisateur moderne.

![ShopEase Suite](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Node](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)

## 🌟 Fonctionnalités

### 🔐 Authentification & Sécurité
- ✅ Inscription et connexion sécurisées avec JWT
- ✅ Hachage des mots de passe avec bcrypt
- ✅ Protection des routes et contrôle d'accès basé sur les rôles
- ✅ Validation des données côté serveur
- ✅ Protection contre les attaques par force brute (rate limiting)

### 🛍️ Gestion des Produits
- ✅ Catalogue de produits avec pagination
- ✅ Recherche avancée et filtrage par catégories
- ✅ Tri par nom, prix, note, date
- ✅ Système de notation et d'avis clients
- ✅ Gestion de l'inventaire en temps réel
- ✅ Produits mis en avant sur la page d'accueil

### 🛒 Panier & Commandes
- ✅ Panier d'achat persistant
- ✅ Gestion des quantités
- ✅ Processus de commande complet
- ✅ Suivi des commandes
- ✅ Historique des achats

### 👤 Profil Utilisateur
- ✅ Gestion du profil personnel
- ✅ Historique des commandes
- ✅ Paramètres de compte
- ✅ Adresses de livraison

### 🎨 Interface Utilisateur
- ✅ Design moderne et responsive
- ✅ Interface intuitive et accessible
- ✅ Thème sombre/clair
- ✅ Animations fluides
- ✅ Compatible mobile et desktop

## 🏗️ Architecture Technique

### Backend (Node.js + Express)
```
backend/
├── config/          # Configuration de la base de données
├── controllers/     # Logique métier des API
├── middleware/      # Middlewares (auth, validation, erreurs)
├── models/         # Modèles MongoDB (User, Product, Order)
├── routes/         # Routes API
├── utils/          # Utilitaires (JWT, seeder)
└── server.js       # Point d'entrée du serveur
```

### Frontend (React + TypeScript)
```
shop-ease-suite/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── contexts/      # Contextes React (Auth, Cart)
│   ├── pages/         # Pages de l'application
│   ├── services/      # Services API
│   ├── types/         # Types TypeScript
│   └── utils/         # Utilitaires frontend
```

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+ 
- MongoDB 5.0+
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <repository-url>
cd echrily
```

### 2. Configuration du Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` :
```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# Base de données
MONGODB_URI=mongodb://localhost:27017/shopease-suite

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:8081

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Configuration du Frontend
```bash
cd shop-ease-suite
npm install
```

### 4. Initialiser la base de données
```bash
cd backend
npm run seed
```

### 5. Démarrer l'application

**Backend :**
```bash
cd backend
npm run dev
```

**Frontend :**
```bash
cd shop-ease-suite
npm run dev
```

L'application sera accessible sur :
- **Frontend** : http://localhost:8081
- **Backend API** : http://localhost:5000

## 🔑 Comptes de Test

### Administrateur
- **Email** : `admin@shopease.com`
- **Mot de passe** : `Admin123!`

### Utilisateur
- **Email** : `john@example.com`
- **Mot de passe** : `User123!`

## 📡 API Endpoints

### Authentification
```
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion
GET  /api/auth/me          # Profil utilisateur
PUT  /api/auth/profile     # Mise à jour du profil
POST /api/auth/logout      # Déconnexion
```

### Produits
```
GET    /api/products           # Liste des produits
GET    /api/products/:id       # Détails d'un produit
POST   /api/products           # Créer un produit (Admin)
PUT    /api/products/:id       # Modifier un produit (Admin)
DELETE /api/products/:id       # Supprimer un produit (Admin)
GET    /api/products/categories # Catégories
POST   /api/products/:id/reviews # Ajouter un avis
```

### Commandes
```
POST /api/orders              # Créer une commande
GET  /api/orders              # Commandes utilisateur
GET  /api/orders/:id          # Détails d'une commande
PUT  /api/orders/:id/cancel   # Annuler une commande
GET  /api/orders/admin/all    # Toutes les commandes (Admin)
```

## 🛠️ Scripts Disponibles

### Backend
```bash
npm start        # Démarrer en production
npm run dev      # Démarrer en développement
npm run seed     # Initialiser la base de données
```

### Frontend
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

## 🧪 Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcryptjs** - Hachage des mots de passe
- **express-validator** - Validation des données
- **helmet** - Sécurité HTTP
- **cors** - Gestion CORS

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Composants UI
- **React Router** - Routage
- **Axios** - Client HTTP
- **Lucide React** - Icônes

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 **Mobile** (320px+)
- 📱 **Tablette** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🔒 Sécurité

- **Authentification JWT** sécurisée
- **Hachage des mots de passe** avec bcrypt
- **Validation des données** côté serveur
- **Protection CORS** configurée
- **Rate limiting** contre les attaques
- **Headers de sécurité** avec Helmet
- **Sanitisation des données** d'entrée

## 🚀 Déploiement

### Variables d'environnement de production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shopease
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://your-domain.com
```

### Commandes de build
```bash
# Backend
npm start

# Frontend
npm run build
npm run preview
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 🙏 Remerciements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

⭐ **N'hésitez pas à donner une étoile si ce projet vous a aidé !**

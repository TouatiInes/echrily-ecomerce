# 🚀 ShopEase Suite - Backend API

API REST sécurisée pour l'application e-commerce ShopEase Suite, construite avec Node.js, Express.js et MongoDB.

## 🏗️ Architecture

```
backend/
├── config/
│   └── database.js         # Configuration MongoDB
├── controllers/
│   ├── authController.js   # Authentification
│   ├── productController.js # Gestion des produits
│   └── orderController.js  # Gestion des commandes
├── middleware/
│   ├── auth.js            # Middleware d'authentification
│   ├── validation.js      # Validation des données
│   └── errorHandler.js    # Gestion des erreurs
├── models/
│   ├── User.js           # Modèle utilisateur
│   ├── Product.js        # Modèle produit
│   └── Order.js          # Modèle commande
├── routes/
│   ├── auth.js           # Routes d'authentification
│   ├── products.js       # Routes des produits
│   └── orders.js         # Routes des commandes
├── utils/
│   ├── jwt.js            # Utilitaires JWT
│   └── seeder.js         # Script de peuplement
├── .env                  # Variables d'environnement
├── package.json          # Dépendances et scripts
└── server.js            # Point d'entrée
```

## 🔧 Installation

### Prérequis
- Node.js 18+
- MongoDB 5.0+
- npm ou yarn

### Configuration
```bash
# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env

# Initialiser la base de données
npm run seed

# Démarrer le serveur de développement
npm run dev
```

## 🌐 Variables d'Environnement

```env
# Serveur
PORT=5000
NODE_ENV=development

# Base de données
MONGODB_URI=mongodb://localhost:27017/shopease-suite

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:8081

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

## 📡 Endpoints API

### 🔐 Authentification (`/api/auth`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/register` | Inscription utilisateur | Public |
| POST | `/login` | Connexion utilisateur | Public |
| GET | `/me` | Profil utilisateur actuel | Privé |
| PUT | `/profile` | Mise à jour du profil | Privé |
| PUT | `/change-password` | Changer le mot de passe | Privé |
| POST | `/logout` | Déconnexion | Privé |

### 🛍️ Produits (`/api/products`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/` | Liste des produits | Public |
| GET | `/categories` | Catégories disponibles | Public |
| GET | `/:id` | Détails d'un produit | Public |
| POST | `/` | Créer un produit | Admin |
| PUT | `/:id` | Modifier un produit | Admin |
| DELETE | `/:id` | Supprimer un produit | Admin |
| POST | `/:id/reviews` | Ajouter un avis | Privé |

### 📦 Commandes (`/api/orders`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/` | Créer une commande | Privé |
| GET | `/` | Commandes de l'utilisateur | Privé |
| GET | `/admin/all` | Toutes les commandes | Admin |
| GET | `/:id` | Détails d'une commande | Privé |
| PUT | `/:id/status` | Modifier le statut | Admin |
| PUT | `/:id/cancel` | Annuler une commande | Privé |

## 📊 Modèles de Données

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  avatar: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isEmailVerified: Boolean,
  lastLogin: Date,
  isActive: Boolean
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  brand: String,
  sku: String (unique),
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  features: [String],
  inventory: {
    quantity: Number,
    reserved: Number,
    lowStockThreshold: Number
  },
  rating: {
    average: Number,
    count: Number
  },
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  tags: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  createdBy: ObjectId
}
```

### Order
```javascript
{
  orderNumber: String (unique),
  user: ObjectId,
  items: [{
    product: ObjectId,
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentInfo: {
    method: String,
    status: String,
    transactionId: String,
    paidAt: Date
  },
  pricing: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    discount: Number,
    total: Number
  },
  shippingMethod: String,
  status: String,
  trackingNumber: String,
  estimatedDelivery: Date,
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String
  }]
}
```

## 🔒 Sécurité

### Authentification JWT
- Tokens sécurisés avec expiration
- Middleware de protection des routes
- Contrôle d'accès basé sur les rôles

### Validation des Données
- Validation côté serveur avec express-validator
- Sanitisation des entrées utilisateur
- Messages d'erreur détaillés

### Protection
- Rate limiting (100 req/15min par IP)
- Headers de sécurité avec Helmet
- CORS configuré pour le frontend
- Hachage des mots de passe avec bcrypt

## 🧪 Scripts NPM

```bash
# Développement
npm run dev          # Serveur avec nodemon
npm start           # Serveur de production

# Base de données
npm run seed        # Peupler la DB avec des données de test

# Tests
npm test           # Lancer les tests (à implémenter)
```

## 📈 Monitoring & Logs

### Health Check
```
GET /health
```
Retourne l'état du serveur et de la base de données.

### Logs
- Erreurs serveur loggées en console
- Requêtes HTTP trackées
- Erreurs de base de données capturées

## 🚀 Déploiement

### Production
```bash
# Variables d'environnement
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret

# Démarrage
npm start
```

### Docker (optionnel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔧 Développement

### Ajouter un nouveau endpoint
1. Créer le contrôleur dans `controllers/`
2. Ajouter la validation dans `middleware/validation.js`
3. Définir la route dans `routes/`
4. Tester avec Postman/Thunder Client

### Ajouter un nouveau modèle
1. Créer le schéma dans `models/`
2. Ajouter les index nécessaires
3. Mettre à jour le seeder si nécessaire

## 📚 Documentation API

Pour une documentation interactive, vous pouvez utiliser :
- **Postman Collection** : Importer les endpoints
- **Swagger/OpenAPI** : À implémenter
- **Thunder Client** : Extension VS Code

## 🐛 Debugging

### Logs utiles
```bash
# Voir les logs en temps réel
npm run dev

# Debug MongoDB
# Activer les logs Mongoose
mongoose.set('debug', true);
```

### Erreurs communes
- **Port déjà utilisé** : Changer le PORT dans .env
- **MongoDB non connecté** : Vérifier MONGODB_URI
- **JWT invalide** : Vérifier JWT_SECRET

## 🤝 Contribution

1. Respecter la structure des dossiers
2. Ajouter la validation pour les nouveaux endpoints
3. Documenter les nouvelles fonctionnalités
4. Tester avant de commit

---

🔗 **API Base URL** : `http://localhost:5000/api`

# 🎨 ShopEase Suite - Frontend

Interface utilisateur moderne et responsive pour l'application e-commerce ShopEase Suite, construite avec React, TypeScript et Tailwind CSS.

## 🏗️ Architecture

```
shop-ease-suite/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── ui/            # Composants UI de base (shadcn/ui)
│   │   ├── Header.tsx     # En-tête de l'application
│   │   ├── Footer.tsx     # Pied de page
│   │   ├── Cart.tsx       # Panier d'achat
│   │   └── ...
│   ├── contexts/          # Contextes React
│   │   ├── AuthContext.tsx # Gestion de l'authentification
│   │   └── CartContext.tsx # Gestion du panier
│   ├── pages/             # Pages de l'application
│   │   ├── Index.tsx      # Page d'accueil
│   │   ├── Products.tsx   # Catalogue produits
│   │   ├── SignIn.tsx     # Connexion
│   │   ├── SignUp.tsx     # Inscription
│   │   └── ...
│   ├── services/          # Services API
│   │   ├── api.ts         # Configuration Axios
│   │   ├── authService.ts # Service d'authentification
│   │   ├── productService.ts # Service produits
│   │   └── orderService.ts # Service commandes
│   ├── types/             # Types TypeScript
│   ├── utils/             # Utilitaires
│   └── App.tsx           # Composant racine
├── tailwind.config.js     # Configuration Tailwind
├── vite.config.ts        # Configuration Vite
└── package.json          # Dépendances et scripts
```

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Configuration
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f73270b7-1be6-4868-97a1-0a3be5a7b2c7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

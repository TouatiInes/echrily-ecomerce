# 📋 Deployment Checklist

## 🔧 Pre-Deployment Setup

### Frontend (shop-ease-suite)
- [x] ✅ Updated API configuration to use environment variables
- [x] ✅ Created `.env.example` and `.env.local` files
- [x] ✅ Updated Vercel configuration (`vercel.json`)
- [x] ✅ Ensured build works locally (`npm run build`)

### Backend
- [x] ✅ Updated CORS configuration for production
- [x] ✅ Created `.env.example` file
- [x] ✅ Added production-ready error handling
- [x] ✅ Seeder script ready for database population

### Repository
- [x] ✅ Updated `.gitignore` for deployment files
- [x] ✅ Created root `package.json` for monorepo
- [x] ✅ Updated README with deployment instructions
- [x] ✅ Created deployment documentation

## 🚀 Deployment Steps

### 1. GitHub Repository
- [ ] Push all changes to GitHub
- [ ] Ensure repository is public or accessible to Vercel
- [ ] Verify all files are committed

### 2. Database Setup (MongoDB Atlas)
- [ ] Create MongoDB Atlas account
- [ ] Create new cluster
- [ ] Create database user with read/write permissions
- [ ] Whitelist IP addresses (0.0.0.0/0 for global access)
- [ ] Get connection string
- [ ] Test connection locally

### 3. Backend Deployment
Choose one platform:

#### Option A: Railway
- [ ] Connect GitHub repository to Railway
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - `NODE_ENV=production`
  - `PORT=5000`
  - `MONGODB_URI=<your_atlas_connection_string>`
  - `JWT_SECRET=<generate_secure_secret>`
  - `FRONTEND_URL=<your_vercel_domain>`

#### Option B: Heroku
- [ ] Create Heroku app
- [ ] Set buildpack to Node.js
- [ ] Add environment variables via Heroku dashboard
- [ ] Deploy from GitHub

### 4. Frontend Deployment (Vercel)
- [ ] Connect GitHub repository to Vercel
- [ ] Set root directory to `shop-ease-suite`
- [ ] Configure build settings:
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Add environment variables:
  - `VITE_API_URL=<your_backend_url>/api`
  - `VITE_APP_NAME=ShopEase Suite`

### 5. Post-Deployment Configuration
- [ ] Update backend CORS with actual Vercel domain
- [ ] Seed database with sample data
- [ ] Test all API endpoints
- [ ] Verify frontend-backend communication

## 🧪 Testing Checklist

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] Product catalog displays
- [ ] Search and filtering work
- [ ] User registration works
- [ ] User login works
- [ ] Cart functionality works
- [ ] Responsive design on mobile

### Backend Tests
- [ ] Health check endpoint responds
- [ ] User authentication endpoints work
- [ ] Product CRUD operations work
- [ ] Cart operations work
- [ ] Order creation works
- [ ] Database queries execute properly

### Integration Tests
- [ ] Frontend can fetch products from backend
- [ ] User authentication flow works end-to-end
- [ ] Cart operations sync between frontend and backend
- [ ] Order placement works completely

## 🔧 Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app/api
VITE_APP_NAME=ShopEase Suite
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopease
JWT_SECRET=your_super_secure_jwt_secret_key_here
FRONTEND_URL=https://your-app.vercel.app
```

## 🐛 Common Issues & Solutions

### CORS Errors
- Ensure backend CORS includes your Vercel domain
- Check that FRONTEND_URL environment variable is set correctly

### API Connection Issues
- Verify VITE_API_URL is correct and includes `/api`
- Check that backend is deployed and accessible

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Ensure IP whitelist includes 0.0.0.0/0
- Check database user permissions

### Build Failures
- Ensure all dependencies are in package.json
- Check for TypeScript errors
- Verify environment variables are set

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

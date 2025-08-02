# 🚀 Deployment Guide

This guide will help you deploy the ShopEase Suite e-commerce application to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- MongoDB Atlas account (for database)
- Backend hosting service (Railway, Heroku, etc.)

## 🎯 Frontend Deployment (Vercel)

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `shop-ease-suite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Environment Variables
Add these environment variables in Vercel:

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_APP_NAME=ShopEase Suite
VITE_APP_VERSION=1.0.0
```

## 🗄️ Backend Deployment

### Option 1: Railway
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Select the `backend` folder
4. Add environment variables:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

### Option 2: Heroku
1. Install Heroku CLI
2. Create new app:
   ```bash
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_connection
   heroku config:set JWT_SECRET=your_secret
   ```

## 🗃️ Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string
6. Update backend environment variables

## 🌱 Seed Database

After deployment, seed your database:
```bash
# If using Railway/Heroku
npm run seed

# Or manually run the seeder
node utils/seeder.js
```

## 🔧 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Authentication flow works
- [ ] Product catalog displays
- [ ] Cart functionality works
- [ ] Order placement works

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domain
2. **API Connection**: Verify VITE_API_URL is correct
3. **Database Connection**: Check MongoDB Atlas connection string
4. **Build Errors**: Ensure all dependencies are in package.json

### Debug Commands:
```bash
# Check build locally
npm run build

# Test production build
npm run preview

# Check environment variables
echo $VITE_API_URL
```

## 📊 Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)

## 🔄 CI/CD

The project is configured for automatic deployment:
- Push to `main` branch triggers Vercel deployment
- Backend can be configured for auto-deploy from GitHub

## 📞 Support

If you encounter issues:
1. Check the logs in Vercel/Railway dashboard
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity

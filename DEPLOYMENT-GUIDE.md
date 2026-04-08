# 🚀 Deployment Guide - Parking Lot Management System

This guide will help you deploy your Parking Lot Management System to production.

## 📋 Prerequisites

- GitHub account (code already pushed)
- Netlify account (for frontend)
- Render account (for backend)
- Cloud MySQL database (PlanetScale, Railway, or Aiven)

---

## 🗄️ Step 1: Set Up Cloud MySQL Database

### Option A: Railway (Recommended - Easy & Free Tier)

1. Go to [Railway.app](https://railway.app) and sign up
2. Click "New Project" → "Provision MySQL"
3. Click on the MySQL service → "Variables" tab
4. Copy these values:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

5. Connect to your database using a MySQL client or Railway's built-in query editor
6. Run the database setup script from `setup-database.sql`

### Option B: PlanetScale

1. Go to [PlanetScale](https://planetscale.com) and sign up
2. Create a new database
3. Get connection details from "Connect" button
4. Run the setup SQL script

### Option C: Aiven

1. Go to [Aiven](https://aiven.io) and sign up
2. Create a MySQL service
3. Get connection details
4. Run the setup SQL script

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [Render](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `yoga-deepan/Parking-Lot-System`
4. Configure the service:
   - **Name**: `parking-lot-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 2.2 Add Environment Variables

In Render dashboard, go to "Environment" tab and add:

```
NODE_ENV=production
PORT=5000
DB_HOST=your-railway-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=parking_lot
DB_PORT=3306
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
FRONTEND_URL=https://your-app-name.netlify.app
```

**Important**: Replace the database values with your Railway/PlanetScale/Aiven credentials.

### 2.3 Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete (2-3 minutes)
3. Copy your backend URL (e.g., `https://parking-lot-backend.onrender.com`)
4. Test the health endpoint: `https://your-backend-url.onrender.com/health`

---

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Deploy via Netlify UI

1. Go to [Netlify](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select repository: `yoga-deepan/Parking-Lot-System`
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Branch**: `main`

### 3.2 Add Environment Variables

Before deploying, go to "Site settings" → "Environment variables" and add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Important**: Replace with your actual Render backend URL from Step 2.

### 3.3 Deploy

1. Click "Deploy site"
2. Wait for build to complete (1-2 minutes)
3. Your site will be live at: `https://random-name.netlify.app`
4. You can customize the domain in "Site settings" → "Domain management"

---

## 🔄 Step 4: Update Backend CORS

Now that you have your Netlify URL, update the backend environment variable:

1. Go back to Render dashboard
2. Navigate to your backend service → "Environment" tab
3. Update `FRONTEND_URL` with your Netlify URL:
   ```
   FRONTEND_URL=https://your-actual-site.netlify.app
   ```
4. Save changes (this will trigger a redeploy)

---

## ✅ Step 5: Test Your Deployment

1. Open your Netlify URL in a browser
2. Try parking a vehicle
3. Check the dashboard for available slots
4. Test vehicle exit functionality

### Troubleshooting

**Frontend can't connect to backend:**
- Check browser console for CORS errors
- Verify `VITE_API_URL` in Netlify environment variables
- Verify `FRONTEND_URL` in Render environment variables
- Make sure both URLs use `https://`

**Database connection errors:**
- Verify all database credentials in Render
- Check if `DB_SSL=true` is set
- Ensure database is accessible from external connections
- Check Railway/PlanetScale/Aiven firewall settings

**Backend not starting:**
- Check Render logs for errors
- Verify `npm start` command works locally
- Ensure all required environment variables are set

---

## 🔧 Alternative: Deploy via Netlify CLI

If you prefer using the CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (from project root)
netlify deploy --prod

# Follow prompts and set environment variables via UI
```

---

## 📊 Monitoring & Logs

### Backend Logs (Render)
- Go to your service dashboard
- Click "Logs" tab to see real-time logs

### Frontend Logs (Netlify)
- Go to your site dashboard
- Click "Deploys" → Select a deploy → "Deploy log"

### Database Monitoring
- Railway: Check "Metrics" tab
- PlanetScale: Check "Insights" dashboard
- Aiven: Check service metrics

---

## 🔐 Security Best Practices

1. ✅ Never commit `.env` files (already in `.gitignore`)
2. ✅ Use strong database passwords
3. ✅ Enable SSL for database connections
4. ✅ Keep dependencies updated: `npm audit fix`
5. ✅ Use environment variables for all secrets
6. ✅ Enable CORS only for your frontend domain

---

## 🔄 Continuous Deployment

Both Netlify and Render support automatic deployments:

- **Push to GitHub** → Automatically deploys to production
- **Pull Request** → Creates preview deployment (Netlify)
- **Rollback** → Available in both platforms

---

## 💰 Cost Estimate

- **Railway MySQL**: Free tier (500 hours/month)
- **Render Backend**: Free tier (750 hours/month, sleeps after inactivity)
- **Netlify Frontend**: Free tier (100GB bandwidth/month)

**Total**: $0/month for small projects

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Render and Netlify logs
3. Verify all environment variables are correct
4. Test database connection separately
5. Check GitHub repository for latest code

---

## 🎉 Success!

Your Parking Lot Management System is now live in production!

- **Frontend**: https://your-site.netlify.app
- **Backend**: https://your-backend.onrender.com
- **Database**: Hosted on Railway/PlanetScale/Aiven

Share your live URL and enjoy your deployed application! 🚗✨

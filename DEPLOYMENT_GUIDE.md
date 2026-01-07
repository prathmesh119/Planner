# Planner App - Deployment Guide (Vercel + Railway)

## Overview
Deploy your Planner app for FREE using:
- **Frontend:** Vercel (React app)
- **Backend:** Railway (Node.js server)
- **Database:** Railway MySQL

---

## STEP 1: Prepare Your Code for GitHub

### 1.1 Create a GitHub Account
- Go to [github.com](https://github.com) and sign up

### 1.2 Create a GitHub Repository
1. Click "+" → "New repository"
2. Name it: `planner-app`
3. Choose "Public" (for free hosting)
4. Click "Create repository"

### 1.3 Push Code to GitHub

**From your project root directory:**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Planner app with React frontend and Node backend"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/planner-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If git commands don't work:**
- Install Git: https://git-scm.com/download/win
- Then run the commands above

---

## STEP 2: Deploy Backend on Railway

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start Project"
3. Sign up with GitHub (recommended)

### 2.2 Deploy Node.js Backend

1. On Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your `planner-app` repository
4. Configure:
   - **Root Directory:** `backend`
   - **Environment:** Node.js

### 2.3 Add MySQL Database

1. In Railway project, click "Add"
2. Select "MySQL"
3. This creates a MySQL database automatically

### 2.4 Configure Environment Variables

In Railway project settings, add these variables:

```
DB_NAME=railway
DB_USER=root
DB_PASSWORD=[Copy from MySQL service info]
DB_HOST=[Copy from MySQL service info]
DB_PORT=3306
JWT_SECRET=your_secret_key_here_change_this
NODE_ENV=production
PORT=3000
```

**To get MySQL credentials:**
- Click on MySQL service
- Click "Connect"
- Copy the connection variables

### 2.5 Get Backend URL

After deployment completes:
1. Click on Node.js service
2. Copy the "Public URL"
3. This is your `RAILWAY_BACKEND_URL` (e.g., `https://xxx.railway.app`)

**Save this URL - you'll need it for Vercel!**

---

## STEP 3: Update Frontend for Production

### 3.1 Update API URL

Edit `my-app/.env` or `my-app/.env.production`:

```
REACT_APP_API_URL=https://YOUR_RAILWAY_BACKEND_URL/api
```

Replace `YOUR_RAILWAY_BACKEND_URL` with the URL from Step 2.5

Example:
```
REACT_APP_API_URL=https://xxx-production.up.railway.app/api
```

### 3.2 Update Backend CORS

Edit `backend/server.js` and update CORS to allow Vercel domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://YOUR_VERCEL_APP.vercel.app',  // Will add this after Vercel deployment
    'http://localhost:5000'
  ],
  credentials: true
}));
```

### 3.3 Push Changes to GitHub

```bash
git add .
git commit -m "Configure for production deployment"
git push
```

---

## STEP 4: Deploy Frontend on Vercel

### 4.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### 4.2 Import and Deploy Project

1. On Vercel dashboard, click "Add New" → "Project"
2. Select your `planner-app` repository
3. Configure:
   - **Framework Preset:** Next.js (or React if available)
   - **Root Directory:** `my-app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 4.3 Add Environment Variables

In Vercel project settings, add:

```
REACT_APP_API_URL=https://YOUR_RAILWAY_BACKEND_URL/api
```

### 4.4 Deploy

Click "Deploy" and wait for completion.

**Your Vercel URL:** `https://your-app-name.vercel.app`

---

## STEP 5: Final Configuration

### 5.1 Update Backend CORS with Vercel URL

1. Go back to Railway project
2. Update `CORS_ORIGIN` environment variable:

```
CORS_ORIGIN=https://your-app-name.vercel.app
```

3. Railway will redeploy automatically

### 5.2 Test the Deployment

1. Open `https://your-app-name.vercel.app`
2. Try to login
3. Create a category
4. Add an entry

---

## STEP 6: Custom Domain (Optional)

### On Vercel:
1. Go to "Settings" → "Domains"
2. Add your domain (e.g., `myplanner.com`)
3. Follow DNS setup instructions

### Get a Free Domain:
- **Freenom:** Free for 1 year (.tk, .ml, etc.)
- **eu.org:** Free forever
- Or buy cheap domain: Namecheap ($0.99/year)

---

## Troubleshooting

### "API not found" or "Failed to fetch"
- Check `REACT_APP_API_URL` is correct
- Verify Railway backend is running
- Check CORS settings

### "Cannot GET /"
- Make sure `build` folder exists
- Check build command in Vercel settings

### Database connection error
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` in Railway
- Test connection from Railway dashboard

### Login fails
- Check JWT_SECRET is set in Railway
- Verify backend URL in frontend

---

## Monitoring & Debugging

### Check Railway Logs:
1. Go to Railway project
2. Click on Node.js service
3. View "Logs" tab for errors

### Check Vercel Logs:
1. Go to Vercel project
2. Click on deployment
3. View "Logs" for build/runtime errors

---

## Summary of URLs

After deployment, you'll have:

```
Frontend URL:  https://your-app-name.vercel.app
Backend URL:   https://your-railway-app.railway.app
API URL:       https://your-railway-app.railway.app/api
Database:      MySQL on Railway (auto-configured)
```

---

## What's Next?

✅ Your app is now LIVE!

Future improvements:
- Add custom domain
- Set up backups
- Monitor usage
- Add more features

---

**Need help? Check Railway and Vercel documentation or your error logs!**

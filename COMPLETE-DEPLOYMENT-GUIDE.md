# Complete Backend + Frontend Deployment Guide

## Architecture Overview

```
GitHub Pages Frontend (Static)
         ↓ API Calls ↓
    Railway Backend (Server)
         ↓
    Your Database
```

## Quick Summary

✅ **Frontend**: Deployed to GitHub Pages (https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/)
✅ **Backend**: Deploy to Railway (serverless Node.js)
✅ **Communication**: Frontend calls Railway backend APIs

---

## Step 1: Deploy Backend to Railway

### Option 1: Railway CLI (Simple)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Go to your project folder
cd USDT-Flasher

# 3. Login to Railway
railway login

# 4. Create and deploy
railway up
```

### Option 2: GitHub Integration (Recommended)

1. Go to https://railway.app/dashboard
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your fork of the repository
4. Railway auto-detects it's a Node.js project
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment ✓

---

## Step 2: Get Your Railway Backend URL

After deployment completes:
1. Open your Railway project
2. Click on the deployment
3. Copy the **URL** (looks like: `https://bold-flasher-prod.up.railway.app`)
4. **Save this URL** - you'll need it!

---

## Step 3: Update Frontend to Use Railway Backend

### Method 1: Environment Variable (Recommended)

1. Go to your static-site directory
2. Create a config file with your backend URL
3. Update all API calls to use Railway URL

### Method 2: Direct Update

Find all API calls in your app and change:

**From (old - doesn't work):**
```javascript
fetch('/api/auth/login', ...)
```

**To (new - works with Railway):**
```javascript
fetch('https://your-railway-url.up.railway.app/api/auth/login', ...)
```

---

## Step 4: Configure CORS

Your Railway backend needs to allow requests from GitHub Pages.

In `server/index.ts`, update CORS:

```typescript
app.use(cors({
  origin: [
    'https://chidinmajackson586-arch.github.io',
    'http://localhost:3000', // for testing
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
```

Then redeploy to Railway.

---

## Step 5: Test It Works

### Test 1: Backend Health
```bash
curl https://your-railway-url.up.railway.app/api/health
```

### Test 2: Login
```bash
curl -X POST https://your-railway-url.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"usdt123"}'
```

### Test 3: Full Flow
1. Go to your GitHub Pages site
2. Try to login
3. Should work now! ✓

---

## Environment Variables for Railway

Add these in Railway Dashboard (Project Settings → Variables):

```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://chidinmajackson586-arch.github.io
DATABASE_URL=your_database_url (if using)
```

---

## Troubleshooting

### 405 Error (Not Allowed)
- Backend is still not deployed or URL is wrong
- Check Railway deployment status
- Verify CORS settings

### CORS Error
- Add your GitHub Pages URL to CORS_ORIGIN
- Redeploy backend to Railway

### Login Not Working
- Check backend logs in Railway dashboard
- Verify database connection
- Check credentials (admin/usdt123)

### Can't Deploy
- Check Railway dashboard for build errors
- Ensure package.json has correct build script
- Verify Node.js version compatibility

---

## Final Checklist

- [ ] Railway backend deployed and running
- [ ] Have your Railway backend URL
- [ ] Frontend API calls updated to use Railway URL
- [ ] CORS configured for GitHub Pages domain
- [ ] Login tested and working
- [ ] Transactions working
- [ ] All features functional

---

## URLs After Setup

- **Frontend (GitHub Pages)**: https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/
- **Backend (Railway)**: https://your-railway-url.up.railway.app
- **API Base**: https://your-railway-url.up.railway.app/api

---

## Support

- Railway Docs: https://docs.railway.app
- GitHub Issues: Create an issue with deployment problems
- Check Railway logs for detailed error messages

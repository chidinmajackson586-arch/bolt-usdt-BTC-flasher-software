# Railway Backend Deployment Guide

## Quick Setup

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project

### Step 2: Deploy to Railway

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create and deploy
railway init
railway up
```

**Option B: Using GitHub Integration (Recommended)**
1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub repository
5. Select the USDT-Flasher repo
6. Railway will automatically detect and deploy

### Step 3: Configure Environment Variables

In Railway Dashboard:
1. Go to your project settings
2. Add these environment variables:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (if using database)
CORS_ORIGIN=https://chidinmajackson586-arch.github.io
```

### Step 4: Get Your Backend URL

After deployment:
1. Open your Railway project
2. Look for the "Deployments" section
3. Copy the public URL (e.g., `https://your-app.up.railway.app`)

### Step 5: Update Frontend

In your GitHub Pages static site, update all API calls:

**Before:**
```javascript
fetch('/api/auth/login', ...)
```

**After:**
```javascript
fetch('https://your-app.up.railway.app/api/auth/login', ...)
```

Or use environment variable:
```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'https://your-app.up.railway.app';
fetch(`${API_BASE}/api/auth/login`, ...)
```

## Deployment Status

✅ Railway configuration ready
✅ Procfile created
✅ Build script configured
✅ Ready to deploy!

## Testing After Deployment

1. **Test Backend Health:**
   ```
   curl https://your-app.up.railway.app/api/health
   ```

2. **Test Authentication:**
   ```bash
   curl -X POST https://your-app.up.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"usdt123"}'
   ```

3. **Access from GitHub Pages:**
   - Go to your GitHub Pages site
   - Try logging in
   - Should now work with backend running on Railway!

## Support

- Railway Docs: https://docs.railway.app
- Troubleshooting: Check Railway dashboard logs for errors
- CORS Issues: Ensure `CORS_ORIGIN` env var matches your frontend URL

## Next Steps After Deployment

1. Update all frontend API URLs to point to Railway backend
2. Test login, registration, and transactions
3. Monitor Railway logs for any errors
4. Scale as needed in Railway dashboard

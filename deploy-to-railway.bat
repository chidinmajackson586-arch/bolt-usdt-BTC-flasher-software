@echo off
REM Quick Railway Deployment Script
REM This helps you deploy to Railway quickly

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║        RAILWAY BACKEND DEPLOYMENT - QUICK START              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo OPTION 1: Deploy with Railway CLI (Recommended for developers)
echo ────────────────────────────────────────────────────────────────
echo 1. npm install -g @railway/cli
echo 2. railway login
echo 3. railway up
echo.

echo OPTION 2: Deploy with GitHub Integration (Easiest)
echo ────────────────────────────────────────────────────────────────
echo 1. Go to https://railway.app
echo 2. Sign up with GitHub (or login)
echo 3. Click "New Project"
echo 4. Select "Deploy from GitHub"
echo 5. Select your USDT-Flasher repository
echo 6. Click "Deploy"
echo 7. Wait for deployment (2-3 minutes)
echo.

echo AFTER DEPLOYMENT:
echo ────────────────────────────────────────────────────────────────
echo 1. Go to Railway dashboard
echo 2. Find your project
echo 3. Copy the public URL (e.g., https://xyz.up.railway.app)
echo 4. Save this URL
echo 5. Use it to configure your frontend
echo.

echo CONFIGURE FRONTEND:
echo ────────────────────────────────────────────────────────────────
echo Update your frontend API calls to use Railway backend:
echo From: fetch('/api/auth/login', ...)
echo To:   fetch('https://your-railway-url/api/auth/login', ...)
echo.

echo DOCUMENTATION:
echo ────────────────────────────────────────────────────────────────
echo Full Guide: COMPLETE-DEPLOYMENT-GUIDE.md
echo Railway Setup: RAILWAY-DEPLOYMENT.md
echo.

echo Need help? Check the guides above or visit https://docs.railway.app
echo.
pause

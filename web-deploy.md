# Bolt Crypto Flasher - Web Application Deployment Guide

## Overview
This is a production-ready web application for cryptocurrency flash transactions, optimized for web distribution and hosting.

## Application Features
- **Multi-Chain Support**: Bitcoin, Ethereum, USDT, and BNB
- **Flash Transaction System**: Minimum 5,000 USDT transactions with 0.019 ETH flash fees
- **Dynamic Balance System**: Real-time balance updates based on completed transactions
- **Subscription-Based Access**: Three tier system with admin bypass
- **Mobile-Responsive Design**: Optimized for all devices
- **Professional UI**: Modern dark theme with gradient effects

## Web Deployment Options

### Option 1: Replit Deployment (Recommended)
1. Click the "Deploy" button in Replit
2. Choose "Static Site" or "Full Stack" deployment
3. Your app will be available at `your-app-name.replit.app`

### Option 2: Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables (DATABASE_URL, etc.)

### Option 3: Netlify Deployment
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configure environment variables

### Option 4: Self-Hosted VPS
1. Upload code to your server
2. Install Node.js and dependencies: `npm install`
3. Build the application: `npm run build`
4. Start with PM2: `pm2 start dist/index.js`
5. Configure reverse proxy (Nginx/Apache)

## Environment Variables Required
```
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
SESSION_SECRET=your_session_secret
```

## Production Optimizations
- ✅ Removed Electron desktop dependencies
- ✅ SEO-optimized meta tags and descriptions
- ✅ Mobile-responsive design
- ✅ Production build configuration
- ✅ Database persistence
- ✅ Session management
- ✅ Security headers

## Distribution Features
- **Cross-Platform**: Works on any device with a web browser
- **No Installation Required**: Users access via URL
- **Automatic Updates**: Deploy once, users get updates instantly
- **Global Access**: Available worldwide through web hosting
- **Secure**: HTTPS encryption and secure session management

## Admin Access
- Username: `admin` / Password: `usdt123` (full access, no subscription required)
- Username: `SoftwareHenry` / Password: `Rmabuw190` (full access, no subscription required)

## Flash Fee Payment
All transactions require flash fee payment to Tron wallet: `TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y`

## Custom Domain Setup
1. Purchase a domain name
2. Point DNS to your hosting provider
3. Configure SSL certificate
4. Update canonical URLs in HTML meta tags

Your Bolt Crypto Flasher web application is now ready for distribution!
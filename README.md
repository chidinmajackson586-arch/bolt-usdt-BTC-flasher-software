# USDT-Flasher Static Site

Production-ready static site build of the USDT-Flasher application.

## Deployment Status

### GitHub Pages
✅ **Live at**: https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/

This site is automatically deployed and updated via GitHub Pages from the `master` branch.

## What's Included

- **Full React Application**: All components, pages, and functionality intact
- **Optimized Build**: Production-optimized JavaScript bundles
- **Responsive Design**: Mobile-friendly, fully responsive UI
- **All Animations**: Transitions and animations preserved
- **SEO Optimized**: Meta tags, sitemap, robots.txt included
- **PWA Ready**: Manifest file for installation support

## Technical Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 5.4.19
- **Deployment**: GitHub Pages

## Build Information

- **Build Time**: 14.43 seconds
- **Total Assets**: 56 files (46 JavaScript chunks, CSS, images)
- **Main Bundle**: 511.44 kB (minified)
- **Style Bundle**: Optimized CSS

## Local Development

To run this site locally:

```bash
# Clone the repository
git clone https://github.com/chidinmajackson586-arch/bolt-usdt-BTC-flasher-software.git
cd bolt-usdt-BTC-flasher-software

# Start a local server
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js (install http-server first)
npx http-server

# Visit http://localhost:8000
```

## GitHub Pages Configuration

This repository is configured for automatic GitHub Pages deployment:

1. **Branch**: `master` (automatic source)
2. **Build**: No build process needed (static files)
3. **Domain**: https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/
4. **Files**: All files in repository root are served

### Client-Side Routing

For React SPA routing:
- `index.html` serves as the default entry point
- `404.html` redirects 404 errors back to `index.html` (enables client-side routing)
- `.nojekyll` disables Jekyll processing

## Updating the Site

To update the site:

1. Make changes to the source code
2. Build with Vite: `npm run build`
3. Copy files from `dist/public` to this directory
4. Commit and push to `master` branch
5. GitHub Pages automatically updates

```bash
cd USDT-Flasher
npm run build
cp -r dist/public/* ../static-site/
cd ../static-site
git add .
git commit -m "Update: [description of changes]"
git push
```

## Troubleshooting

### Site not updating after push
- GitHub Pages can take up to 1-2 minutes to rebuild
- Check your repository settings to ensure Pages is enabled
- Clear your browser cache (Ctrl+Shift+Delete)

### Broken assets/styles
- Ensure `.nojekyll` file exists in repository root
- Verify `robots.txt` and other meta files are present
- Check that all paths use absolute URLs starting with `/`

### Routing not working
- Verify `404.html` exists in repository root
- This enables single-page app routing on GitHub Pages

## Repository

- **GitHub**: https://github.com/chidinmajackson586-arch/bolt-usdt-BTC-flasher-software
- **Live Site**: https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/

## Support

For issues or questions, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Last Updated**: November 21, 2025
**Status**: Production Ready ✅

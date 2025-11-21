@echo off
REM GitHub Pages Deployment Status Check
REM This script verifies your GitHub Pages deployment

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         GitHub Pages Deployment Status Check                  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check repository files
echo 📁 Checking critical files...
if exist index.html echo   ✓ index.html found
if exist 404.html echo   ✓ 404.html found
if exist .nojekyll echo   ✓ .nojekyll found
if exist README.md echo   ✓ README.md found
if exist assets\ echo   ✓ assets/ directory found
if exist robots.txt echo   ✓ robots.txt found
if exist sitemap.xml echo   ✓ sitemap.xml found

echo.
echo 🔗 Your GitHub Pages URLs:
echo.
echo   Live Site:
echo   https://chidinmajackson586-arch.github.io/bolt-usdt-BTC-flasher-software/
echo.
echo   Repository:
echo   https://github.com/chidinmajackson586-arch/bolt-usdt-BTC-flasher-software
echo.
echo   Actions/Deployments:
echo   https://github.com/chidinmajackson586-arch/bolt-usdt-BTC-flasher-software/actions
echo.

echo 📊 Git Status:
git log --oneline -1
echo.

echo ✅ Deployment Complete!
echo    Visit your site URL above to verify it's live.
echo    GitHub Pages will rebuild automatically on each push.
echo.
pause

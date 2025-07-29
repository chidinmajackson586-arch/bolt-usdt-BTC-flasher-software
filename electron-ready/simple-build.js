#!/usr/bin/env node
// Simple portable build script that avoids electron-builder issues

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Creating simple portable app...\n');

try {
  // Create portable folder
  const portableDir = path.join(__dirname, 'crypto-gateway-portable');
  if (fs.existsSync(portableDir)) {
    fs.rmSync(portableDir, { recursive: true });
  }
  fs.mkdirSync(portableDir, { recursive: true });

  // Install electron locally if not exists
  console.log('📦 Installing Electron...');
  try {
    execSync('npm list electron', { stdio: 'ignore' });
  } catch {
    execSync('npm install electron --save-dev', { stdio: 'inherit' });
  }

  // Create simple package.json for the portable app
  const portablePackage = {
    "name": "crypto-gateway-portable",
    "version": "1.0.0",
    "description": "Crypto Gateway Desktop App",
    "main": "main.js",
    "scripts": {
      "start": "electron ."
    }
  };

  fs.writeFileSync(
    path.join(portableDir, 'package.json'),
    JSON.stringify(portablePackage, null, 2)
  );

  // Copy main.js
  fs.copyFileSync(
    path.join(__dirname, 'electron', 'main.js'),
    path.join(portableDir, 'main.js')
  );

  // Copy preload.js
  fs.copyFileSync(
    path.join(__dirname, 'electron', 'preload.js'),
    path.join(portableDir, 'preload.js')
  );

  // Copy dist folder
  execSync(`cp -r "${path.join(__dirname, 'dist')}" "${path.join(portableDir, 'dist')}"`, { stdio: 'inherit' });

  // Create run script
  const runScript = `@echo off
title Crypto Gateway
echo Starting Crypto Gateway...
echo Please wait while the application loads...
echo.
node_modules\\.bin\\electron .
pause`;

  fs.writeFileSync(path.join(portableDir, 'run.bat'), runScript);

  // Create installer script
  const installScript = `@echo off
title Crypto Gateway Setup
echo Installing Crypto Gateway...
echo This may take a few minutes...
echo.
npm install electron
echo.
echo Installation complete!
echo You can now run Crypto Gateway by double-clicking "run.bat"
echo.
pause`;

  fs.writeFileSync(path.join(portableDir, 'install.bat'), installScript);

  // Create README
  const readme = `# Crypto Gateway Desktop App

## How to Run

1. First time setup: Double-click "install.bat" and wait for it to complete
2. To run the app: Double-click "run.bat"

## What it does

- Opens your crypto wallet in a desktop window
- Works offline once installed
- Admin accounts: admin/usdt123 and SoftwareHenry/Rmabuw190

## Troubleshooting

If the app doesn't start:
1. Make sure Node.js is installed on your computer
2. Run install.bat again
3. Try running: npm install electron

Your crypto gateway is ready to use!`;

  fs.writeFileSync(path.join(portableDir, 'README.txt'), readme);

  console.log('\n✅ Portable app created successfully!');
  console.log('📁 Location: crypto-gateway-portable/');
  console.log('📋 Instructions:');
  console.log('   1. Copy the crypto-gateway-portable folder to any Windows computer');
  console.log('   2. Run install.bat (first time only)');
  console.log('   3. Run run.bat to start the app');
  console.log('\n🎉 Your crypto gateway is ready for distribution!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('\n💡 Alternative: Try the manual approach in README.txt');
}
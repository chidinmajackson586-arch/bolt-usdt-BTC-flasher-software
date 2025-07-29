#!/usr/bin/env node
// This script fixes the desktop app to work without external database dependencies

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing desktop app for standalone operation...\n');

// Create a standalone server version that doesn't need external database
const standaloneServer = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for desktop app
let users = new Map();
let wallets = new Map();
let transactions = new Map();
let subscriptions = new Map();

// Default admin users
users.set('admin', {
  id: 'admin',
  username: 'admin',
  password: 'usdt123',
  isAdmin: true
});

users.set('SoftwareHenry', {
  id: 'SoftwareHenry', 
  username: 'SoftwareHenry',
  password: 'Rmabuw190',
  isAdmin: true
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  
  if (user && user.password === password) {
    res.json({ 
      user: { id: user.id, username: user.username, isAdmin: user.isAdmin },
      token: 'desktop-token-' + user.id 
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  
  if (users.has(username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const user = {
    id: username,
    username,
    password,
    isAdmin: false
  };
  
  users.set(username, user);
  res.json({ 
    user: { id: user.id, username: user.username, isAdmin: user.isAdmin },
    token: 'desktop-token-' + user.id 
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// User routes  
app.get('/api/auth/user', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !token.startsWith('desktop-token-')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const userId = token.replace('desktop-token-', '');
  const user = users.get(userId);
  
  if (user) {
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Wallet routes
app.get('/api/wallets/:userId', (req, res) => {
  const { userId } = req.params;
  let userWallets = wallets.get(userId);
  
  if (!userWallets) {
    userWallets = {
      btc: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', balance: 0 },
      eth: { address: '0x742d35Cc6634C0532925a3b8D2c2C4A2c76E4829', balance: 0 },
      usdt: { address: 'TEpSxaE3cmB2BnxrBctbNXkp2MZxLjrZjm', balance: 0 },
      bnb: { address: 'bnb1xy2kgdygjrsqtzq2n0yrf2493p83kkfj', balance: 0 }
    };
    wallets.set(userId, userWallets);
  }
  
  res.json(userWallets);
});

// Transaction routes
app.get('/api/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  const userTransactions = transactions.get(userId) || [];
  res.json(userTransactions);
});

app.post('/api/transactions', (req, res) => {
  const { userId, type, amount, to, network, gasSpeed } = req.body;
  
  const transaction = {
    id: Date.now().toString(),
    userId,
    type,
    amount: parseFloat(amount),
    to,
    network,
    gasSpeed,
    status: 'pending',
    createdAt: new Date().toISOString(),
    gasWallet: 'TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y'
  };
  
  let userTransactions = transactions.get(userId) || [];
  userTransactions.push(transaction);
  transactions.set(userId, userTransactions);
  
  res.json(transaction);
});

// Subscription routes
app.get('/api/subscription-plans', (req, res) => {
  res.json([
    { id: 'basic', name: 'Basic Plan', price: 550, features: ['Basic transactions', 'Email support'] },
    { id: 'pro', name: 'Pro Plan', price: 950, features: ['All Basic features', 'Priority support', 'Advanced analytics'] },
    { id: 'full', name: 'Full Plan', price: 3000, features: ['All Pro features', 'White-label solution', '24/7 support'] }
  ]);
});

app.get('/api/user-subscription/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.get(userId);
  
  // Admin users get full access
  if (user && user.isAdmin) {
    return res.json({
      id: 'admin-full',
      userId,
      planId: 'full',
      status: 'active',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  const subscription = subscriptions.get(userId);
  if (subscription) {
    res.json(subscription);
  } else {
    res.status(404).json({ message: 'No subscription found' });
  }
});

app.post('/api/purchase-subscription', (req, res) => {
  const { userId, planId, transactionHash } = req.body;
  
  const subscription = {
    id: Date.now().toString(),
    userId,
    planId,
    status: 'pending',
    transactionHash,
    createdAt: new Date().toISOString()
  };
  
  subscriptions.set(userId, subscription);
  res.json(subscription);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(\`[express] serving on port \${PORT}\`);
});
`;

// Write the standalone server
fs.writeFileSync(path.join(__dirname, 'dist', 'standalone-server.js'), standaloneServer);

// Update main.js to use the standalone server
const mainJsPath = path.join(__dirname, 'electron', 'main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Replace the server path to use standalone server
mainJsContent = mainJsContent.replace(
  "const serverPath = path.join(__dirname, '../dist/index.js');",
  "const serverPath = path.join(__dirname, '../dist/standalone-server.js');"
);

// Remove database environment variable
mainJsContent = mainJsContent.replace(
  "DATABASE_URL: 'sqlite:memory:' // Use in-memory database for desktop app",
  "// No database needed for standalone desktop app"
);

fs.writeFileSync(mainJsPath, mainJsContent);

console.log('✅ Desktop app fixed for standalone operation!');
console.log('🔄 Now rebuild your app:');
console.log('   npm run build-win');
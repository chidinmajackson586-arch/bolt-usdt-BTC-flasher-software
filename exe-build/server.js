const express = require('express');
const path = require('path');
const { createServer } = require('http');

const app = express();
const PORT = 5000;

// Serve static files from bundled assets
app.use(express.static(path.join(__dirname, 'public')));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bolt Crypto Flasher is running' });
});

// API endpoints for basic functionality
app.get('/api/subscription-plans', (req, res) => {
  res.json([
    { id: '1', name: 'Basic', price: 550, features: ['BTC', 'ETH'] },
    { id: '2', name: 'Pro', price: 950, features: ['BTC', 'ETH', 'USDT'] },
    { id: '3', name: 'Full', price: 3000, features: ['All Networks', 'Premium Support'] }
  ]);
});

app.get('/api/auth/user', (req, res) => {
  // Return admin user for exe version
  res.json({
    id: 'admin',
    username: 'admin',
    hasActiveSubscription: true,
    subscriptionPlan: 'Full'
  });
});

app.post('/api/transactions', express.json(), (req, res) => {
  const { amount, recipient, currency, network } = req.body;
  
  // Simulate transaction creation
  const transaction = {
    id: Date.now().toString(),
    amount,
    recipient,
    currency,
    network,
    status: 'pending',
    flashFee: '0.019 ETH',
    flashAddress: 'TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y',
    createdAt: new Date().toISOString()
  };
  
  res.json(transaction);
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

console.log('🔥 Bolt Crypto Flasher is starting...');
console.log('💰 Professional Cryptocurrency Flash Platform');
console.log('🌐 Opening browser to: http://localhost:5000');
console.log('');

const server = createServer(app);

server.listen(PORT, () => {
  console.log('⚡ Server running on http://localhost:5000');
  console.log('🎯 Ready for flash transactions!');
  console.log('📝 Login with: admin / usdt123');
  
  // Auto-open browser
  if (process.platform === 'win32') {
    const { exec } = require('child_process');
    setTimeout(() => {
      exec('start http://localhost:5000');
    }, 1000);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('
🛑 Shutting down Bolt Crypto Flasher...');
  server.close(() => {
    console.log('✅ Server stopped gracefully');
    process.exit(0);
  });
});
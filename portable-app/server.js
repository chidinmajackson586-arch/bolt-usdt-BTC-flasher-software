// Bolt Crypto Flasher Portable Server
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import and use your server routes
const { createServer } = require('./server/index.js');

console.log('🔥 Bolt Crypto Flasher is starting...');
console.log('💰 Professional Cryptocurrency Flash Platform');
console.log('🌐 Open your browser to: http://localhost:5000');
console.log('');

app.listen(PORT, () => {
  console.log('⚡ Server running on http://localhost:5000');
  console.log('🎯 Ready for flash transactions!');
});
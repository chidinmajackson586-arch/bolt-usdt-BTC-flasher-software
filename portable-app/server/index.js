var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertTransactionSchema: () => insertTransactionSchema,
  insertUserSchema: () => insertUserSchema,
  insertWalletSchema: () => insertWalletSchema,
  sessions: () => sessions,
  subscriptionPlans: () => subscriptionPlans,
  transactions: () => transactions,
  userSubscriptions: () => userSubscriptions,
  users: () => users,
  wallets: () => wallets
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  network: text("network").notNull(),
  // BTC, ETH, BSC, TRX
  balance: decimal("balance", { precision: 18, scale: 8 }).default("5000000.00"),
  createdAt: timestamp("created_at").defaultNow()
});
var transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  fromAddress: text("from_address"),
  toAddress: text("to_address").notNull(),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  token: text("token").notNull(),
  // BTC, ETH, USDT, BNB
  network: text("network").notNull(),
  gasSpeed: text("gas_speed"),
  // slow, medium, fast
  gasFee: decimal("gas_fee", { precision: 18, scale: 8 }),
  gasFeePaid: boolean("gas_fee_paid").default(false),
  status: text("status").notNull().default("pending"),
  // pending, completed, failed
  txHash: text("tx_hash"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertWalletSchema = createInsertSchema(wallets).omit({
  id: true,
  createdAt: true
});
var insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  txHash: true
});
var subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  price: varchar("price").notNull(),
  features: text("features").array().notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  planId: varchar("plan_id").notNull().references(() => subscriptionPlans.id),
  status: varchar("status").notNull().default("pending"),
  // pending, active, expired
  paymentTxHash: varchar("payment_tx_hash"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at")
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";
var DatabaseStorage = class {
  gasReceiverAddress = "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y";
  constructor() {
    this.initializeDefaultData();
  }
  async initializeDefaultData() {
    try {
      const existingAdmin = await this.getUserByUsername("admin");
      if (existingAdmin) return;
      const adminUser = await db.insert(users).values({
        username: "admin",
        password: "usdt123"
      }).returning();
      const henryUser = await db.insert(users).values({
        username: "SoftwareHenry",
        password: "Rmabuw190"
      }).returning();
      const plans = await db.insert(subscriptionPlans).values([
        {
          name: "Basic",
          price: "550",
          features: ["Basic crypto transactions", "Standard support", "Single wallet"]
        },
        {
          name: "Pro",
          price: "950",
          features: ["Advanced trading tools", "Priority support", "Multiple wallets", "Analytics dashboard"]
        },
        {
          name: "Full",
          price: "3000",
          features: ["All features", "24/7 dedicated support", "Unlimited wallets", "Advanced analytics", "API access"]
        }
      ]).returning();
      if (adminUser[0] && henryUser[0] && plans[2]) {
        await db.insert(userSubscriptions).values([
          {
            userId: adminUser[0].id,
            planId: plans[2].id,
            status: "active",
            paymentTxHash: "admin-default",
            expiresAt: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1e3)
            // 10 years
          },
          {
            userId: henryUser[0].id,
            planId: plans[2].id,
            status: "active",
            paymentTxHash: "admin-default",
            expiresAt: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1e3)
            // 10 years
          }
        ]);
        await db.insert(wallets).values([
          {
            userId: adminUser[0].id,
            name: "Bitcoin Wallet",
            address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
            network: "BTC",
            balance: "1.234"
          },
          {
            userId: adminUser[0].id,
            name: "Ethereum Wallet",
            address: "0x742d35Cc0123456789012345678901234567890a",
            network: "ETH",
            balance: "15.67"
          },
          {
            userId: adminUser[0].id,
            name: "USDT Wallet",
            address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5oNDMnt",
            network: "TRX",
            balance: "5000000.00"
          }
        ]);
      }
    } catch (error) {
      console.error("Error initializing default data:", error);
    }
  }
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  async getWalletsByUserId(userId) {
    return await db.select().from(wallets).where(eq(wallets.userId, userId));
  }
  async createWallet(walletData) {
    const [wallet] = await db.insert(wallets).values(walletData).returning();
    return wallet;
  }
  async getTransactionsByUserId(userId) {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }
  async createTransaction(transactionData) {
    const [transaction] = await db.insert(transactions).values({
      ...transactionData,
      txHash: `0x${randomUUID().replace(/-/g, "")}`
    }).returning();
    return transaction;
  }
  async updateTransaction(id, updates) {
    const [updated] = await db.update(transactions).set(updates).where(eq(transactions.id, id)).returning();
    if (!updated) {
      throw new Error("Transaction not found");
    }
    return updated;
  }
  getGasReceiverAddress() {
    return this.gasReceiverAddress;
  }
  setGasReceiverAddress(address) {
    this.gasReceiverAddress = address;
  }
  async getSubscriptionPlans() {
    return await db.select().from(subscriptionPlans);
  }
  async getUserSubscriptions(userId) {
    return await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId));
  }
  async createSubscription(subscriptionData) {
    const [subscription] = await db.insert(userSubscriptions).values(subscriptionData).returning();
    return subscription;
  }
  async getUserSubscription(userId) {
    const [subscription] = await db.select().from(userSubscriptions).where(and(
      eq(userSubscriptions.userId, userId),
      eq(userSubscriptions.status, "active")
    ));
    return subscription || void 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
var loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
var gasPaymentSchema = z.object({
  transactionId: z.string(),
  confirmed: z.boolean()
});
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({
        user: { id: user.id, username: user.username },
        token: `token_${user.id}`
        // Simplified token
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const newUser = await storage.createUser({
        username,
        password
        // In production, hash this password
      });
      res.json({
        user: { id: newUser.id, username: newUser.username },
        token: `token_${newUser.id}`,
        // Simplified token
        message: "Registration successful"
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });
  app2.get("/api/wallets/:userId", async (req, res) => {
    try {
      const wallets2 = await storage.getWalletsByUserId(req.params.userId);
      res.json(wallets2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallets" });
    }
  });
  app2.get("/api/transactions/:userId", async (req, res) => {
    try {
      const transactions2 = await storage.getTransactionsByUserId(req.params.userId);
      res.json(transactions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  app2.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      if (!transactionData.gasFeePaid) {
        return res.status(400).json({
          message: "Gas fee payment required for all transactions"
        });
      }
      const transaction = await storage.createTransaction(transactionData);
      setTimeout(async () => {
        await storage.updateTransaction(transaction.id, {
          status: "completed"
        });
      }, 5e3);
      res.json(transaction);
    } catch (error) {
      console.error("Transaction creation error:", error);
      res.status(400).json({ message: "Failed to create transaction" });
    }
  });
  app2.patch("/api/transactions/:id/gas-payment", async (req, res) => {
    try {
      const { confirmed } = gasPaymentSchema.parse(req.body);
      const transaction = await storage.updateTransaction(req.params.id, {
        gasFeePaid: confirmed
      });
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Failed to update gas payment status" });
    }
  });
  app2.get("/api/gas-fees", (req, res) => {
    const gasReceiverAddress = storage.getGasReceiverAddress() || "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y";
    res.json({
      receiverAddress: gasReceiverAddress,
      fees: {
        slow: "0.019 ETH",
        medium: "0.019 ETH",
        fast: "0.019 ETH"
      }
    });
  });
  app2.post("/api/admin/gas-receiver", async (req, res) => {
    try {
      const { address } = req.body;
      if (!address || typeof address !== "string") {
        return res.status(400).json({ message: "Valid wallet address is required" });
      }
      const isEthereumAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
      const isTronAddress = /^T[A-Za-z1-9]{33}$/.test(address);
      if (!isEthereumAddress && !isTronAddress) {
        return res.status(400).json({ message: "Invalid wallet address format. Must be Ethereum (0x...) or Tron (T...) address" });
      }
      storage.setGasReceiverAddress(address);
      res.json({ message: "Gas receiver address updated successfully", address });
    } catch (error) {
      console.error("Error updating gas receiver address:", error);
      res.status(500).json({ message: "Failed to update gas receiver address" });
    }
  });
  app2.get("/api/admin/gas-receiver", (req, res) => {
    const address = storage.getGasReceiverAddress();
    res.json({ address });
  });
  app2.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });
  app2.post("/api/subscriptions", async (req, res) => {
    try {
      const { userId, planId, paymentTxHash } = req.body;
      if (!userId || !planId || !paymentTxHash) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const subscription = await storage.createSubscription({
        userId,
        planId,
        paymentTxHash,
        status: "active",
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3)
        // 1 year
      });
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });
  app2.get("/api/subscriptions/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (userId === "admin" || userId === "SoftwareHenry") {
        return res.json({
          id: `admin-sub-${userId}`,
          userId,
          planId: "admin-plan",
          status: "active",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString()
          // 1 year
        });
      }
      const userSubscriptions2 = await storage.getUserSubscriptions(userId);
      const activeSubscription = userSubscriptions2.find((sub) => sub.status === "active");
      if (!activeSubscription) {
        return res.status(404).json({ message: "No active subscription found" });
      }
      res.json(activeSubscription);
    } catch (error) {
      console.error("Get subscription error:", error);
      res.status(500).json({ message: "Failed to get subscription" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

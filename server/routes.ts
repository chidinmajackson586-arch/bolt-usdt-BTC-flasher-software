import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const gasPaymentSchema = z.object({
  transactionId: z.string(),
  confirmed: z.boolean(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, use proper session management
      res.json({ 
        user: { id: user.id, username: user.username },
        token: `token_${user.id}` // Simplified token
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  // Wallets
  app.get("/api/wallets/:userId", async (req, res) => {
    try {
      const wallets = await storage.getWalletsByUserId(req.params.userId);
      res.json(wallets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallets" });
    }
  });

  // Transactions
  app.get("/api/transactions/:userId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByUserId(req.params.userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      
      // Validate gas fee payment for Ethereum-based networks
      if (["ETH", "BSC"].includes(transactionData.network) && !transactionData.gasFeePaid) {
        return res.status(400).json({ 
          message: "Gas fee payment required for Ethereum-based networks" 
        });
      }

      const transaction = await storage.createTransaction(transactionData);
      
      // Simulate transaction processing
      setTimeout(async () => {
        await storage.updateTransaction(transaction.id, { 
          status: "completed" 
        });
      }, 5000);

      res.json(transaction);
    } catch (error) {
      console.error("Transaction creation error:", error);
      res.status(400).json({ message: "Failed to create transaction" });
    }
  });

  app.patch("/api/transactions/:id/gas-payment", async (req, res) => {
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

  // Gas fee information
  app.get("/api/gas-fees", (req, res) => {
    res.json({
      receiverAddress: "0x363bce7c51e88a095bbad8de2dfbc624bff8068e",
      fees: {
        slow: "0.0006",
        medium: "0.0009", 
        fast: "0.0012"
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

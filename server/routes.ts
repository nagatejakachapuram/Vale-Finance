import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { agentManager } from "./services/agentManager";
import { seiNetwork } from "./services/seiNetwork";
import { insertAgentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Agent management routes
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      const validatedData = insertAgentSchema.parse(req.body);
      const agent = await agentManager.createAndDeployAgent(validatedData);
      res.json(agent);
    } catch (error) {
      res.status(400).json({ error: "Failed to create agent" });
    }
  });

  app.put("/api/agents/:id/stop", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const success = await agentManager.stopAgent(agentId);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Agent not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to stop agent" });
    }
  });

  // Transaction routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const { agentId, recipient, amount, currency } = req.body;
      
      if (!agentId || !recipient || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const txHash = await agentManager.executePayment(agentId, recipient, amount, currency);
      res.json({ success: true, txHash });
    } catch (error) {
      res.status(500).json({ error: "Failed to execute payment" });
    }
  });

  // Integration status routes
  app.get("/api/integrations", async (req, res) => {
    try {
      const integrations = await storage.getIntegrations();
      res.json(integrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch integrations" });
    }
  });

  // Activity feed routes
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Metrics routes
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await agentManager.getAgentMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // Sei network routes
  app.get("/api/sei/network", async (req, res) => {
    try {
      const networkInfo = await seiNetwork.getNetworkInfo();
      res.json(networkInfo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network info" });
    }
  });

  app.get("/api/sei/balance/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const balance = await seiNetwork.getBalance(address);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch balance" });
    }
  });

  // MCP conversation routes
  app.post("/api/mcp/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      // Mock MCP response based on message content
      let response = "";
      
      if (message.toLowerCase().includes("outflow") || message.toLowerCase().includes("suppliers")) {
        response = "Based on your payment history, total outflow to suppliers this month was $24,750 USDC across 15 transactions. The largest payment was $5,200 to TechSupply Corp on Dec 15th.";
      } else if (message.toLowerCase().includes("recurring") || message.toLowerCase().includes("schedule")) {
        response = "I've created a recurring payment schedule for the amount specified. The payment will be processed through your Payroll Agent. Would you like me to set up any specific conditions or oracle triggers?";
      } else if (message.toLowerCase().includes("balance")) {
        response = "Your treasury currently holds $45,250 USDC across all agents, with $15,000 allocated to yield-generating pools earning 2.5% APY.";
      } else {
        response = "I understand you want to manage your Vale Finance operations. I can help you with payments, agent management, treasury operations, and financial insights. What would you like to do?";
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

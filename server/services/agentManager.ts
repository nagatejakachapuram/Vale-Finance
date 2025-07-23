import { storage } from "../storage";
import { elizaService } from "./elizaService";
import { seiNetwork } from "./seiNetwork";
import { Agent, InsertAgent } from "@shared/schema";

export class AgentManager {
  async createAndDeployAgent(agentData: InsertAgent): Promise<Agent> {
    try {
      // Create agent in storage
      const agent = await storage.createAgent(agentData);

      // Create Crossmint wallet if enabled
      if (agentData.crossmintEnabled) {
        const walletAddress = await this.createCrossmintWallet(agent);
        await storage.updateAgent(agent.id, { walletAddress });
      }

      // Deploy ElizaOS agent
      const deployed = await elizaService.deployAgent(agent);
      if (!deployed) {
        throw new Error("Failed to deploy ElizaOS agent");
      }

      // Update agent status
      const updatedAgent = await storage.updateAgent(agent.id, { status: "active" });

      // Log activity
      await storage.createActivity({
        type: "agent_action",
        title: `${agent.name} deployed successfully`,
        description: `Agent type: ${agent.type}, Budget: $${agent.budget} USDC`,
        agentId: agent.id,
        metadata: { deployment: "success" },
      });

      return updatedAgent!;
    } catch (error) {
      console.error("Error creating and deploying agent:", error);
      throw error;
    }
  }

  async stopAgent(agentId: number): Promise<boolean> {
    try {
      const agent = await storage.getAgent(agentId);
      if (!agent) return false;

      // Stop ElizaOS agent
      await elizaService.stopAgent(agentId);

      // Update status
      await storage.updateAgent(agentId, { status: "inactive" });

      // Log activity
      await storage.createActivity({
        type: "agent_action",
        title: `${agent.name} stopped`,
        description: "Agent deactivated by user",
        agentId: agentId,
        metadata: { action: "stop" },
      });

      return true;
    } catch (error) {
      console.error("Error stopping agent:", error);
      return false;
    }
  }

  async executePayment(agentId: number, recipient: string, amount: number, currency: string = "USDC"): Promise<string> {
    try {
      const agent = await storage.getAgent(agentId);
      if (!agent) throw new Error("Agent not found");

      // Execute payment through Sei network
      const txHash = await seiNetwork.sendTransaction(agent.walletAddress!, recipient, amount, currency);

      // Record transaction
      await storage.createTransaction({
        agentId,
        type: "payment",
        amount,
        currency,
        recipient,
        description: `Payment sent by ${agent.name}`,
      });

      // Log activity
      await storage.createActivity({
        type: "agent_action",
        title: `Payment sent by ${agent.name}`,
        description: `${amount} ${currency} sent to ${recipient}`,
        agentId,
        metadata: { txHash, recipient, amount, currency },
      });

      return txHash;
    } catch (error) {
      console.error("Error executing payment:", error);
      throw error;
    }
  }

  private async createCrossmintWallet(agent: Agent): Promise<string> {
    try {
      // Mock Crossmint wallet creation
      console.log(`Creating Crossmint wallet for agent: ${agent.name}`);
      
      // Simulate API call to Crossmint
      const walletAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      console.log(`Crossmint wallet created: ${walletAddress}`);
      return walletAddress;
    } catch (error) {
      console.error("Error creating Crossmint wallet:", error);
      throw error;
    }
  }

  async getAgentMetrics(): Promise<any> {
    const agents = await storage.getAgents();
    const transactions = await storage.getTransactions();

    const activeAgents = agents.filter(a => a.status === "active").length;
    const totalBudget = agents.reduce((sum, a) => sum + (a.budget || 0), 0);  
    const monthlyPayments = transactions.filter(t => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return t.createdAt >= monthAgo;
    }).reduce((sum, t) => sum + t.amount, 0);

    return {
      treasuryBalance: totalBudget,
      activeAgents,
      monthlyPayments,
      smartInvoices: 7, // Mock value
    };
  }
}

export const agentManager = new AgentManager();

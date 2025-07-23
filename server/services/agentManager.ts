import { storage } from "../storage";
import { elizaService } from "./elizaService";
import { seiNetwork } from "./seiNetwork";
import { crossmintService } from "./crossmintService";
import { Agent, InsertAgent } from "@shared/schema";

export class AgentManager {
  async createAndDeployAgent(agentData: InsertAgent): Promise<Agent> {
    try {
      // Create agent in storage
      const agent = await storage.createAgent(agentData);

      // Create Crossmint wallet if enabled
      if (agentData.crossmintEnabled) {
        try {
          const wallet = await crossmintService.createWallet(agent.id, agent.name);
          await storage.updateAgent(agent.id, { walletAddress: wallet.address });
          agent.walletAddress = wallet.address;
          console.log(`Crossmint wallet created for agent ${agent.name}: ${wallet.address}`);
        } catch (error) {
          console.error(`Failed to create Crossmint wallet for agent ${agent.name}:`, error);
          // Continue without wallet - can be created later
        }
      }

      // Deploy AI-powered agent
      const deployed = await elizaService.deployAgent(agent);
      if (!deployed) {
        throw new Error("Failed to deploy AI agent");
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

      // Stop AI agent
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

      let txHash: string;

      // Use Crossmint for wallet transactions if agent has Crossmint enabled
      if (agent.crossmintEnabled && agent.walletAddress) {
        try {
          txHash = await crossmintService.sendTransaction(
            `agent-${agent.id}`, 
            recipient, 
            amount, 
            currency
          );
          console.log(`Crossmint transaction executed: ${txHash}`);
        } catch (crossmintError) {
          console.error("Crossmint transaction failed, fallback to Sei:", crossmintError);
          // Fallback to direct Sei network transaction
          txHash = await seiNetwork.sendTransaction(agent.walletAddress, recipient, amount, currency);
        }
      } else {
        // Execute payment through Sei network directly
        txHash = await seiNetwork.sendTransaction(agent.walletAddress!, recipient, amount, currency);
      }

      // Record transaction
      await storage.createTransaction({
        agentId,
        type: "payment",
        amount,
        currency,
        recipient,
        txHash,
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

  async getAgentMetrics(): Promise<any> {
    const agents = await storage.getAgents();
    const transactions = await storage.getTransactions();

    const activeAgents = agents.filter(a => a.status === "active").length;
    const totalBudget = agents.reduce((sum, a) => sum + (a.budget || 0), 0);  
    const monthlyPayments = transactions.filter(t => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return t.createdAt && t.createdAt >= monthAgo;
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
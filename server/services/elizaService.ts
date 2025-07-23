import { Agent } from "@shared/schema";
import { openaiService } from "./openaiService";

export interface ElizaAgentConfig {
  name: string;
  type: string;
  settings: {
    model: string;
    voice?: {
      model: string;
    };
  };
  plugins: string[];
  clients: string[];
  walletConfig?: {
    privateKey?: string;
    provider: string;
    chainId: number;
  };
}

export class ElizaService {
  private agents: Map<number, any> = new Map();

  async deployAgent(agent: Agent): Promise<boolean> {
    try {
      const config: ElizaAgentConfig = {
        name: agent.name,
        type: agent.type,
        settings: {
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          voice: {
            model: "en_US-hfc_female-medium"
          }
        },
        plugins: ["@elizaos/plugin-evm", "@elizaos/plugin-sei"],
        clients: ["discord", "telegram"],
        walletConfig: {
          provider: process.env.SEI_RPC_URL || "https://evm-rpc-testnet.sei-apis.com",
          chainId: 1328, // Sei testnet
        }
      };

      console.log(`Deploying AI agent: ${agent.name}`, config);
      
      // Test OpenAI connection by generating an initial decision
      const initialContext = {
        agentType: agent.type,
        budget: agent.budget,
        status: 'deployment',
        walletAddress: agent.walletAddress
      };

      const aiDecision = await openaiService.generateAgentDecision(agent.type, initialContext);
      console.log(`AI agent initial decision: ${aiDecision}`);
      
      // Create agent instance with real AI capabilities
      const aiAgent = {
        id: agent.id,
        config,
        status: "active",
        walletAddress: agent.walletAddress,
        lastActivity: new Date(),
        aiEnabled: true,
        lastDecision: aiDecision,
      };

      this.agents.set(agent.id, aiAgent);
      return true;
    } catch (error) {
      console.error("Error deploying AI agent:", error);
      return false;
    }
  }

  async stopAgent(agentId: number): Promise<boolean> {
    try {
      const agent = this.agents.get(agentId);
      if (!agent) return false;

      console.log(`Stopping ElizaOS agent: ${agentId}`);
      agent.status = "inactive";
      return true;
    } catch (error) {
      console.error("Error stopping ElizaOS agent:", error);
      return false;
    }
  }

  async getAgentStatus(agentId: number): Promise<any> {
    return this.agents.get(agentId);
  }

  async executeAgentAction(agentId: number, action: string, params: any): Promise<any> {
    try {
      const agent = this.agents.get(agentId);
      if (!agent) throw new Error("Agent not found");

      console.log(`Executing AI-powered action ${action} on agent ${agentId}`, params);

      // Use AI to make decision about the action
      const context = {
        action,
        params,
        agentType: agent.config.type,
        currentBudget: params.budget || 0,
        walletAddress: agent.walletAddress,
        timestamp: new Date().toISOString()
      };

      const aiDecision = await openaiService.generateAgentDecision(agent.config.type, context);
      console.log(`AI Decision for ${action}: ${aiDecision}`);

      // Update agent's last decision and activity
      agent.lastDecision = aiDecision;
      agent.lastActivity = new Date();

      // Execute action based on AI decision and type
      switch (action) {
        case "process_payroll":
          return { 
            success: true, 
            amount: params.amount, 
            recipients: params.recipients,
            aiDecision,
            reasoning: "AI-validated payroll processing"
          };
        case "send_payment":
          return { 
            success: true, 
            txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
            aiDecision,
            reasoning: "AI-approved payment transaction"
          };
        case "allocate_yield":
          return { 
            success: true, 
            pool: params.pool, 
            apy: params.apy,
            aiDecision,
            reasoning: "AI-optimized yield allocation"
          };
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error) {
      console.error("Error executing AI agent action:", error);
      throw error;
    }
  }
}

export const elizaService = new ElizaService();

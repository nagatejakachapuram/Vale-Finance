import { openaiService } from "./openaiService";
import { storage } from "../storage";
import { agentManager } from "./agentManager";

interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ConversationContext {
  userId?: number;
  agentId?: number;
  sessionId: string;
  messages: ConversationMessage[];
}

export class ConversationService {
  private conversations: Map<string, ConversationContext> = new Map();

  async startConversation(sessionId: string, userId?: number): Promise<ConversationContext> {
    const context: ConversationContext = {
      userId,
      sessionId,
      messages: [{
        role: 'system',
        content: this.getSystemPrompt(),
        timestamp: new Date()
      }],
    };

    this.conversations.set(sessionId, context);
    return context;
  }

  async processMessage(sessionId: string, message: string): Promise<string> {
    try {
      let context = this.conversations.get(sessionId);
      
      if (!context) {
        context = await this.startConversation(sessionId);
      }

      // Add user message to context
      context.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // Analyze message for financial commands
      const command = await this.analyzeCommand(message);
      
      if (command.action && command.action !== 'conversation') {
        // Execute financial action
        const result = await this.executeFinancialCommand(command, context);
        
        const responseMessage = `I've ${command.action === 'create_agent' ? 'created' : 'executed'} the ${command.action}: ${result.summary}
        
${result.details}`;

        context.messages.push({
          role: 'assistant',
          content: responseMessage,
          timestamp: new Date()
        });

        return responseMessage;
      } else {
        // Regular conversation with financial context
        const response = await openaiService.processConversation(context.messages);
        
        context.messages.push({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });

        return response;
      }
    } catch (error) {
      console.error('Error processing conversation message:', error);
      return 'I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.';
    }
  }

  private async analyzeCommand(message: string): Promise<any> {
    try {
      const analysisPrompt = `Analyze this user message and determine if it contains a specific financial command that should be executed:

Message: "${message}"

Respond with a JSON object containing:
{
  "action": "create_agent" | "send_payment" | "check_balance" | "conversation",
  "parameters": {
    // relevant parameters for the action
  },
  "confidence": 0.0 to 1.0
}

Financial actions to detect:
- create_agent: "create a payroll agent", "deploy invoice agent", etc.
- send_payment: "send $100 to address", "pay the supplier", etc.
- check_balance: "what's my balance", "check treasury", etc.
- conversation: regular conversation or questions

Only return "conversation" if no clear financial action is detected.`;

      const analysisResponse = await openaiService.processConversation([
        { role: 'system', content: 'You are a financial command analyzer. Respond only with valid JSON.' },
        { role: 'user', content: analysisPrompt }
      ]);

      try {
        return JSON.parse(analysisResponse);
      } catch {
        return { action: 'conversation', parameters: {}, confidence: 0.5 };
      }
    } catch (error) {
      console.error('Error analyzing command:', error);
      return { action: 'conversation', parameters: {}, confidence: 0.0 };
    }
  }

  private async executeFinancialCommand(command: any, context: ConversationContext): Promise<any> {
    try {
      switch (command.action) {
        case 'create_agent':
          const agentData = {
            name: command.parameters.name || `Agent ${Date.now()}`,
            type: command.parameters.type || 'payroll',
            budget: command.parameters.budget || 1000,
            crossmintEnabled: command.parameters.crossmintEnabled || true,
            rivalzEnabled: command.parameters.rivalzEnabled || false
          };

          const agent = await agentManager.createAndDeployAgent(agentData);
          
          return {
            summary: `${agent.type} agent "${agent.name}" successfully created`,
            details: `Agent ID: ${agent.id}
Budget: $${agent.budget} USDC
Wallet: ${agent.walletAddress || 'Creating...'}
Status: ${agent.status}`
          };

        case 'send_payment':
          const { agentId, recipient, amount, currency } = command.parameters;
          
          if (!agentId || !recipient || !amount) {
            throw new Error('Missing required parameters for payment');
          }

          const txHash = await agentManager.executePayment(
            parseInt(agentId), 
            recipient, 
            parseFloat(amount), 
            currency || 'USDC'
          );

          return {
            summary: `payment of ${amount} ${currency || 'USDC'} sent to ${recipient}`,
            details: `Transaction Hash: ${txHash}
Status: Pending confirmation on Sei network
Agent ID: ${agentId}`
          };

        case 'check_balance':
          const metrics = await agentManager.getAgentMetrics();
          
          return {
            summary: 'current treasury and agent status',
            details: `Treasury Balance: $${metrics.treasuryBalance} USDC
Active Agents: ${metrics.activeAgents}
Monthly Payments: $${metrics.monthlyPayments}
Smart Invoices: ${metrics.smartInvoices}`
          };

        default:
          throw new Error(`Unknown financial action: ${command.action}`);
      }
    } catch (error) {
      console.error('Error executing financial command:', error);
      return {
        summary: 'encountered an error',
        details: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      };
    }
  }

  private getSystemPrompt(): string {
    return `You are Vale Finance AI, an intelligent conversational interface for a B2B payment platform built on the Sei blockchain. You help users manage their autonomous payment agents, execute transactions, and optimize their financial workflows.

Key capabilities:
- Create and manage AI-powered payment agents (payroll, invoice, treasury, supplier)
- Execute secure payments on the Sei network using Crossmint wallets
- Provide real-time financial insights and recommendations
- Integrate with external oracles for smart invoice automation

Guidelines:
- Be professional but approachable in your responses
- Always prioritize security and accuracy in financial operations
- Provide clear explanations of blockchain transactions and agent decisions
- Offer proactive suggestions for optimizing payment workflows
- When executing actions, confirm details before proceeding

You can help with:
1. Agent Management: Creating, configuring, and monitoring payment agents
2. Payment Processing: Executing secure transactions and tracking status
3. Financial Analytics: Providing insights on spending, budgets, and performance
4. Integration Setup: Connecting external services and oracles
5. Troubleshooting: Resolving issues with agents or transactions

Always ask for clarification if a request is ambiguous and provide helpful context about the platform's capabilities.`;
  }

  getConversationHistory(sessionId: string): ConversationMessage[] {
    const context = this.conversations.get(sessionId);
    return context ? context.messages.filter(m => m.role !== 'system') : [];
  }

  clearConversation(sessionId: string): boolean {
    return this.conversations.delete(sessionId);
  }
}

export const conversationService = new ConversationService();
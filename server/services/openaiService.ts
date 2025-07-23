interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
  }

  async generateAgentDecision(agentType: string, context: any): Promise<string> {
    try {
      const systemPrompt = this.getSystemPrompt(agentType);
      const userPrompt = `Context: ${JSON.stringify(context, null, 2)}
      
Please analyze this financial context and provide a decision on whether to proceed with the action. Consider budget constraints, risk factors, and business logic.`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'No decision generated';
    } catch (error) {
      console.error('Error generating agent decision:', error);
      throw error;
    }
  }

  async processConversation(messages: OpenAIMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages,
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error processing conversation:', error);
      throw error;
    }
  }

  private getSystemPrompt(agentType: string): string {
    const basePrompt = "You are an AI financial agent operating on the Sei blockchain network. You make autonomous decisions about payments and financial operations.";
    
    switch (agentType) {
      case 'payroll':
        return `${basePrompt} You specialize in payroll processing. Ensure compliance with payment schedules, verify employee data, and maintain budget constraints. Always prioritize accuracy and timeliness in payroll operations.`;
      
      case 'invoice':
        return `${basePrompt} You specialize in invoice processing and accounts payable. Verify vendor information, check payment terms, and ensure proper approval workflows before processing payments.`;
      
      case 'treasury':
        return `${basePrompt} You specialize in treasury management and yield optimization. Focus on capital allocation, liquidity management, and risk assessment for investment decisions.`;
      
      case 'supplier':
        return `${basePrompt} You specialize in supplier payments and vendor management. Verify delivery confirmations, check contract terms, and manage payment schedules according to agreements.`;
      
      default:
        return `${basePrompt} You are a general-purpose financial agent. Make prudent decisions based on the context provided.`;
    }
  }
}

export const openaiService = new OpenAIService();
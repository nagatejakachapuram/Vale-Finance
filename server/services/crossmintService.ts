interface CrossmintWallet {
  address: string;
  walletId: string;
  blockchain: string;
}

interface CrossmintApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class CrossmintService {
  private serverKey: string;
  private projectId: string;
  private baseUrl = 'https://staging.crossmint.com/api';

  constructor() {
    this.serverKey = process.env.CROSSMINT_SERVER_KEY || '';
    this.projectId = process.env.CROSSMINT_PROJECT_ID || '';
    
    if (!this.serverKey || !this.projectId) {
      throw new Error('CROSSMINT_SERVER_KEY and CROSSMINT_PROJECT_ID environment variables are required');
    }
  }

  async createWallet(agentId: number, agentName: string): Promise<CrossmintWallet> {
    try {
      console.log(`Creating Crossmint wallet for agent ${agentId}: ${agentName}`);

      const response = await fetch(`${this.baseUrl}/v1-alpha2/wallets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.serverKey}`,
          'Content-Type': 'application/json',
          'X-PROJECT-ID': this.projectId,
        },
        body: JSON.stringify({
          type: 'evm-smart-wallet',
          linkedUser: `agent-${agentId}`,
          metadata: {
            agentId: agentId.toString(),
            agentName,
            createdBy: 'vale-finance',
            blockchain: 'sei'
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Crossmint API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.address) {
        throw new Error('No wallet address returned from Crossmint');
      }

      console.log(`Crossmint wallet created successfully: ${data.address}`);

      return {
        address: data.address,
        walletId: data.id || `agent-${agentId}`,
        blockchain: 'sei'
      };
    } catch (error) {
      console.error('Error creating Crossmint wallet:', error);
      throw error;
    }
  }

  async getWalletBalance(walletAddress: string): Promise<number> {
    try {
      // For Sei network, we'll use the native RPC to get balance
      const seiRpcUrl = process.env.SEI_RPC_URL || "https://evm-rpc-testnet.sei-apis.com";
      
      const response = await fetch(seiRpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [walletAddress, 'latest'],
          id: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`RPC error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`);
      }

      // Convert wei to SEI (assuming 18 decimals like ETH)
      const balanceWei = parseInt(data.result, 16);
      const balanceSei = balanceWei / Math.pow(10, 18);
      
      return balanceSei;
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return 0;
    }
  }

  async sendTransaction(fromWalletId: string, toAddress: string, amount: number, currency: string = 'SEI'): Promise<string> {
    if (!this.isAvailable) {
      throw new Error('Crossmint service is not available. Please configure CROSSMINT_SERVER_KEY and CROSSMINT_PROJECT_ID.');
    }

    try {
      console.log(`Sending ${amount} ${currency} from wallet ${fromWalletId} to ${toAddress}`);

      const response = await fetch(`${this.baseUrl}/v1-alpha2/wallets/${fromWalletId}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.serverKey}`,
          'Content-Type': 'application/json',
          'X-PROJECT-ID': this.projectId,
        },
        body: JSON.stringify({
          recipient: toAddress,
          amount: amount.toString(),
          currency: currency.toUpperCase(),
          blockchain: 'sei',
          metadata: {
            purpose: 'automated-payment',
            timestamp: new Date().toISOString(),
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Crossmint transaction error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.txId && !data.transactionHash) {
        throw new Error('No transaction hash returned from Crossmint');
      }

      const txHash = data.txId || data.transactionHash;
      console.log(`Transaction sent successfully: ${txHash}`);
      
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  async getTransactionStatus(txHash: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v1-alpha2/transactions/${txHash}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.serverKey}`,
          'X-PROJECT-ID': this.projectId,
        },
      });

      if (!response.ok) {
        throw new Error(`Crossmint API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.status || 'unknown';
    } catch (error) {
      console.error('Error getting transaction status:', error);
      return 'unknown';
    }
  }
}

export const crossmintService = new CrossmintService();
import { 
  users, agents, transactions, integrations, activities,
  type User, type InsertUser, type Agent, type InsertAgent,
  type Transaction, type InsertTransaction, type Activity, type InsertActivity,
  type Integration
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Agent methods
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, updates: Partial<Agent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;

  // Transaction methods
  getTransactions(): Promise<Transaction[]>;
  getTransactionsByAgent(agentId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Integration methods
  getIntegrations(): Promise<Integration[]>;
  updateIntegration(name: string, status: string, metadata?: any): Promise<Integration | undefined>;

  // Activity methods
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private agents: Map<number, Agent>;
  private transactions: Map<number, Transaction>;
  private integrations: Map<string, Integration>;
  private activities: Map<number, Activity>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.agents = new Map();
    this.transactions = new Map(); 
    this.integrations = new Map();
    this.activities = new Map();
    this.currentId = 1;

    // Initialize with default integrations
    this.initializeIntegrations();
    this.initializeSampleData();
  }

  private initializeIntegrations() {
    const defaultIntegrations = [
      { name: "ElizaOS Framework", status: "connected", version: "v2.1.0", metadata: { description: "Core agent runtime" } },
      { name: "GOAT SDK", status: "active", version: "v1.2.0", metadata: { description: "Agentic finance toolkit" } },
      { name: "Crossmint SDK", status: "syncing", version: "v0.8.5", metadata: { description: "Invisible wallet creation" } },
      { name: "Rivalz Oracles", status: "connected", version: "v1.0.2", metadata: { description: "Real-world event triggers" } },
      { name: "Sei MCP Server", status: "online", version: "v1.1.0", metadata: { description: "Conversational interface" } },
      { name: "Sei Testnet", status: "connected", version: "atlantic-2", metadata: { description: "Chain ID: 1328" } },
    ];

    defaultIntegrations.forEach(integration => {
      const id = this.currentId++;
      this.integrations.set(integration.name, {
        id,
        ...integration,
        lastChecked: new Date(),
      });
    });
  }

  private initializeSampleData() {
    // Create sample agents
    const sampleAgents = [
      { name: "Payroll Agent", type: "payroll", status: "active", budget: 25000, crossmintEnabled: true, rivalzEnabled: false },
      { name: "Invoice Agent", type: "invoice", status: "monitoring", budget: 15000, crossmintEnabled: true, rivalzEnabled: true },
      { name: "Treasury Agent", type: "treasury", status: "earning", budget: 45000, crossmintEnabled: false, rivalzEnabled: false },
    ];

    sampleAgents.forEach(agentData => {
      const id = this.currentId++;
      const agent: Agent = {
        id,
        ...agentData,
        walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        configuration: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.agents.set(id, agent);
    });

    // Create sample activities
    const sampleActivities = [
      { type: "agent_action", title: "Payroll Agent executed monthly payment batch", description: "Processed $8,500 to 12 employees", agentId: 1 },
      { type: "agent_action", title: "Smart Invoice triggered by delivery confirmation", description: "Invoice #INV-2024-089 • $2,400 USDC sent", agentId: 2 },
      { type: "agent_action", title: "Treasury Agent allocated funds to yield pool", description: "$15,000 USDC → Yei Finance • 2.8% APY", agentId: 3 },
      { type: "system_event", title: "Crossmint wallet created for new Payment Agent", description: "Agent ID: PA-2024-003 • Secure wallet deployed", agentId: undefined },
    ];

    sampleActivities.forEach(activityData => {
      const id = this.currentId++;
      const activity: Activity = {
        id,
        ...activityData,
        metadata: {},
        createdAt: new Date(),
      };
      this.activities.set(id, activity);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.currentId++;
    const agent: Agent = {
      ...insertAgent,
      id,
      status: "inactive",
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      configuration: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.set(id, agent);
    return agent;
  }

  async updateAgent(id: number, updates: Partial<Agent>): Promise<Agent | undefined> {
    const agent = this.agents.get(id);
    if (!agent) return undefined;
    
    const updatedAgent = { ...agent, ...updates, updatedAt: new Date() };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAgent(id: number): Promise<boolean> {
    return this.agents.delete(id);
  }

  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getTransactionsByAgent(agentId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(tx => tx.agentId === agentId);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      status: "pending",
      txHash: null,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getIntegrations(): Promise<Integration[]> {
    return Array.from(this.integrations.values());
  }

  async updateIntegration(name: string, status: string, metadata?: any): Promise<Integration | undefined> {
    const integration = this.integrations.get(name);
    if (!integration) return undefined;

    const updated = { 
      ...integration, 
      status, 
      lastChecked: new Date(),
      ...(metadata && { metadata: { ...integration.metadata, ...metadata } })
    };
    this.integrations.set(name, updated);
    return updated;
  }

  async getActivities(limit: number = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentId++;
    const activity: Activity = {
      ...insertActivity,
      id,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();

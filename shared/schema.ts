import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'payroll', 'invoice', 'treasury', 'supplier'
  status: text("status").notNull().default("inactive"), // 'active', 'inactive', 'monitoring', 'error'
  walletAddress: text("wallet_address"),
  budget: integer("budget").default(0),
  configuration: jsonb("configuration"),
  crossmintEnabled: boolean("crossmint_enabled").default(false),
  rivalzEnabled: boolean("rivalz_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  type: text("type").notNull(), // 'payment', 'yield', 'swap', 'invoice'
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("USDC"),
  recipient: text("recipient"),
  txHash: text("tx_hash"),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const integrations = pgTable("integrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull().default("disconnected"), // 'connected', 'disconnected', 'syncing', 'error'
  version: text("version"),
  lastChecked: timestamp("last_checked").defaultNow(),
  metadata: jsonb("metadata"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'agent_action', 'system_event', 'user_action'
  title: text("title").notNull(),
  description: text("description"),
  agentId: integer("agent_id").references(() => agents.id),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  name: true,
  type: true,
  budget: true,
  crossmintEnabled: true,
  rivalzEnabled: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  agentId: true,
  type: true,
  amount: true,
  currency: true,
  recipient: true,
  txHash: true,
  description: true,
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  title: true,
  description: true,
  agentId: true,
  metadata: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type Integration = typeof integrations.$inferSelect;

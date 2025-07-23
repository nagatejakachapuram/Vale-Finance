# Vale Finance - ElizaOS Agent Platform

## Overview

Vale Finance is an intelligent B2B payment platform built on the Sei blockchain network. It functions as a comprehensive financial command center that enables businesses to automate complex corporate financial workflows through AI-powered agents. The platform now features real integrations with OpenAI for autonomous decision-making, Crossmint for secure wallet operations, and a conversational AI interface for natural language interaction.

## Recent Changes (January 23, 2025)

✓ **Real AI Integration**: Replaced mock ElizaOS with actual OpenAI API integration
✓ **Crossmint Wallet Creation**: Implemented real wallet creation using Crossmint API
✓ **Conversational Interface**: Added AI-powered chat interface for natural language commands
✓ **Enhanced Agent Intelligence**: Agents now make real AI-powered decisions for financial operations
✓ **Production-Ready APIs**: All external service integrations use authentic API calls

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **Architecture Pattern**: RESTful API with modular service layer
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Agent Framework**: ElizaOS for autonomous agent orchestration
- **Blockchain Integration**: Sei Network EVM compatibility layer

### Database Design
The application uses a PostgreSQL database with the following core entities:
- **Users**: Authentication and user management
- **Agents**: AI payment agents with configuration and status tracking
- **Transactions**: Financial transaction records with blockchain integration
- **Integrations**: External service connection status and metadata
- **Activities**: System activity logs and audit trail

## Key Components

### Agent Management System
- **ElizaOS Integration**: Manages autonomous payment agents with configurable behaviors
- **Agent Types**: Supports payroll, invoice, treasury, and supplier payment agents
- **Crossmint Wallet Creation**: Automated secure wallet generation for each agent
- **Configuration Management**: JSON-based agent configuration with budget controls

### Blockchain Integration
- **Sei Network**: EVM-compatible blockchain for fast, low-cost transactions
- **Testnet Support**: Atlantic-2 testnet integration for development
- **Wallet Management**: Secure private key handling through Crossmint
- **Transaction Processing**: USDC-based stablecoin payments with transaction tracking

### External Service Integrations
- **Crossmint GOAT SDK**: Secure wallet creation and management without seed phrases
- **Rivalz Oracles**: Real-world data integration for smart invoice automation
- **Sei MCP**: Conversational interface for natural language finance management
- **ElizaOS Plugins**: EVM and Sei-specific blockchain interaction capabilities

### User Interface Components
- **Dashboard**: Real-time metrics, agent status, and activity monitoring
- **Agent Deployment**: Visual agent creation with integration toggles
- **Conversational Interface**: Natural language interaction with the platform
- **Activity Feeds**: Real-time system activity and transaction history

## Data Flow

### Agent Creation Flow
1. User configures agent parameters through the dashboard
2. Backend validates configuration and creates database record
3. Crossmint SDK generates secure wallet for the agent (if enabled)
4. ElizaOS deploys the autonomous agent with specified configuration
5. Agent status updates to "active" and begins monitoring/operations

### Payment Processing Flow
1. Agent receives payment trigger (scheduled, API call, or oracle data)
2. ElizaOS agent validates payment conditions and budget constraints
3. Sei Network transaction is initiated through the agent's wallet
4. Transaction hash is recorded in the database with pending status
5. Blockchain confirmation updates transaction status to completed

### Conversational Interface Flow
1. User inputs natural language command through the dashboard
2. Sei MCP processes the command and determines required actions
3. Backend executes the requested operations (payments, queries, configurations)
4. Results are formatted and returned to the user in natural language

## External Dependencies

### Blockchain Infrastructure
- **Sei Network**: Primary blockchain for transaction processing
- **Neon Database**: PostgreSQL hosting with serverless scaling
- **EVM RPC**: Sei's Ethereum-compatible JSON-RPC interface

### AI and Agent Services
- **ElizaOS**: Autonomous agent framework and runtime
- **OpenAI**: Language model for conversational interface (GPT-4o-mini)
- **Crossmint**: Secure wallet infrastructure and key management
- **Rivalz**: Oracle network for real-world data integration

### Development Infrastructure
- **Replit**: Cloud development and hosting environment
- **Vite**: Development server with hot module replacement
- **Drizzle Kit**: Database schema management and migrations
- **TanStack Query**: API state management and caching

## Deployment Strategy

### Development Environment
- **Replit Integration**: Full development environment with live reload
- **Hot Module Replacement**: Instant updates during development
- **Error Overlay**: Runtime error detection and display
- **Environment Variables**: Secure configuration management

### Production Deployment
- **Build Process**: Vite frontend build with ESBuild backend compilation
- **Static Asset Serving**: Optimized frontend bundle serving
- **Database Migrations**: Automated schema updates via Drizzle
- **Environment Configuration**: Production-specific settings for Sei mainnet

### Monitoring and Logging
- **Activity Tracking**: Comprehensive logging of agent actions and system events
- **Transaction Monitoring**: Real-time blockchain transaction status tracking
- **Integration Health**: External service connection status monitoring
- **Error Handling**: Centralized error management with user-friendly messages

The architecture emphasizes modularity, security, and scalability while maintaining a simple development experience. The platform leverages the speed and cost-effectiveness of the Sei blockchain while providing enterprise-grade financial automation through AI-powered agents.
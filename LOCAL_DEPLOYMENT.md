# Vale Finance - Local Deployment Guide

This guide will help you set up and run Vale Finance locally on your machine. Vale Finance is an intelligent B2B payment platform with AI-powered agents, real blockchain integration via Sei Network, and conversational AI interface.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- **PostgreSQL** (optional - uses in-memory storage by default for testing)

## Step 1: Download or Clone the Project

Download the project files to your local machine and navigate to the project directory:

```bash
# If cloning from a repository
git clone <your-repository-url>
cd vale-finance

# Or if you have the project files, navigate to the directory
cd path/to/vale-finance
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all the required packages for both frontend and backend.

## Step 3: Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Crossmint Configuration
CROSSMINT_PROJECT_ID=your_crossmint_project_id
CROSSMINT_CLIENT_KEY=your_crossmint_client_key
CROSSMINT_SERVER_KEY=your_crossmint_server_key

# Database Configuration (optional - uses in-memory by default)
DATABASE_URL=postgresql://username:password@localhost:5432/vale_finance

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Getting API Keys

1. **OpenAI API Key** (Required for AI features):
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Sign up/login and go to API Keys section
   - Create a new secret key
   - Note: You need a paid OpenAI account for production usage (free tier has rate limits)

2. **Crossmint API Keys** (Required for wallet operations):
   - Visit [Crossmint Developer Console](https://www.crossmint.com/console)
   - Sign up/login and create a new project
   - Get your Project ID, Client Key, and Server Key from the project settings
   - These enable secure wallet creation and blockchain transactions

## Step 4: Database Setup (Optional)

If you want to use PostgreSQL instead of in-memory storage:

1. Install and start PostgreSQL on your machine
2. Create a database named `vale_finance`
3. Update the `DATABASE_URL` in your `.env` file
4. Run database migrations:

```bash
npm run db:migrate
```

**Note**: The application works perfectly with in-memory storage for development and testing.

## Step 5: Start the Application

Run the development server:

```bash
npm run dev
```

This command will:
- Start the Express backend server on port 5000
- Start the Vite frontend development server
- Open your browser automatically
- Enable hot reload for both frontend and backend

## Step 6: Access the Application

Once the servers are running, you can access:

- **Main Application**: `http://localhost:5000`
- **API Endpoints**: `http://localhost:5000/api/*`

## Features You Can Test

### 1. AI-Powered Agent Management
- Create payroll, treasury, invoice, or supplier payment agents
- Each agent gets a real Crossmint wallet (with proper API keys)
- Agents use AI-powered decision making with intelligent fallback logic
- Rate limit handling ensures agents work even during OpenAI limits

### 2. Conversational AI Interface
- Chat with the AI assistant using natural language
- Commands like "Create a payroll agent with $5000 budget"
- Smart keyword detection reduces API calls
- Graceful degradation when AI services are rate limited

### 3. Quick Payment System
- Send payments directly through the dashboard interface
- Supports USDC, SEI, and ETH on Sei Network testnet
- Real blockchain transactions via Crossmint or direct Sei integration
- Manual payment option when AI is unavailable

### 4. Real-time Dashboard
- Live metrics and agent status monitoring
- Transaction history and activity feeds
- Integration status for all external services
- Fixed scroll position (stays at top when launching)

## Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations (if using PostgreSQL)
npm run db:migrate

# Generate database schema
npm run db:generate
```

## Project Structure

```
vale-finance/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom hooks
│   │   └── lib/        # Utilities
├── server/          # Express backend
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   └── index.ts     # Server entry point
├── shared/          # Shared types and schemas
└── package.json     # Dependencies and scripts
```

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**:
   ```bash
   # On macOS/Linux - Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   
   # On Windows - Find and kill process
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

2. **OpenAI rate limits (429 errors)**:
   - The app gracefully handles rate limits with intelligent fallback logic
   - Agent creation still works with rule-based decisions
   - Consider upgrading your OpenAI plan for higher limits
   - Use the Quick Payment interface when AI is rate limited

3. **Crossmint API errors (403 Forbidden)**:
   - Verify your API keys are correct in the .env file
   - Check that your Crossmint project is properly configured
   - Ensure you're using the correct Project ID, Client Key, and Server Key
   - The app automatically falls back to direct Sei transactions if Crossmint fails

4. **Dashboard scroll issues**:
   - The dashboard now includes scroll prevention
   - Clear browser cache if you experience old behavior
   - Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

5. **Database connection issues**:
   - PostgreSQL is optional - app uses in-memory storage by default
   - If using database, ensure PostgreSQL is running
   - Verify your DATABASE_URL is correct
   - Check database permissions and network connectivity

### Getting Help

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all prerequisites are installed
4. Try restarting the development server

## Production Deployment

For production deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables
3. Use a proper PostgreSQL database
4. Configure proper security headers and HTTPS
5. Use a process manager like PM2 for the Node.js server

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript  
- **Database**: PostgreSQL with Drizzle ORM (optional, defaults to in-memory)
- **Blockchain**: Sei Network Atlantic-2 testnet (EVM-compatible)
- **AI**: OpenAI GPT-4o-mini with intelligent fallback systems
- **Wallet**: Crossmint GOAT SDK for secure wallet management
- **UI**: Radix UI components with shadcn/ui design system
- **State Management**: TanStack React Query for server state

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- Use environment-specific configurations
- Enable proper CORS and security headers in production
- Consider using secrets management for production deployments

## Recent Updates

- **Rate Limit Resilience**: Comprehensive fallback mechanisms for OpenAI API limits
- **Fixed Dashboard Scroll**: Dashboard now properly stays at the top when launched
- **Quick Payment Interface**: Manual payment system for when AI is unavailable  
- **Smart Command Parsing**: Keyword-based analysis reduces API calls
- **Enhanced Error Handling**: Better user experience during service interruptions

---

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all prerequisites are properly installed
4. Try restarting the development server
5. Clear browser cache and hard refresh the page

The application is designed to work reliably even when external APIs are rate limited or temporarily unavailable.

**Happy coding!** 🚀
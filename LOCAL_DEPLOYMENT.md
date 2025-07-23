# Vale Finance - Local Deployment Guide

This guide will help you set up and run Vale Finance on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **PostgreSQL** (optional - you can use in-memory storage for testing)

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd vale-finance
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

1. **OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Sign up/login and go to API Keys section
   - Create a new secret key

2. **Crossmint API Keys**:
   - Visit [Crossmint Developer Console](https://www.crossmint.com/console)
   - Sign up/login and create a new project
   - Get your Project ID, Client Key, and Server Key from the project settings

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

### 1. Agent Management
- Create payroll, treasury, invoice, or supplier payment agents
- Each agent gets a real Crossmint wallet (if API keys are configured)
- Agents use AI-powered decision making with fallback logic

### 2. Conversational Interface
- Chat with the AI assistant using natural language
- Commands like "Create a payroll agent with $5000 budget"
- Graceful handling of OpenAI rate limits

### 3. Quick Payments
- Send payments directly through the dashboard
- Supports USDC, SEI, and ETH on Sei Network
- Real blockchain transactions via Crossmint or direct Sei integration

### 4. Real-time Dashboard
- Live metrics and agent status
- Transaction history and activity feeds
- Integration status monitoring

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
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **OpenAI rate limits**:
   - The app gracefully handles rate limits with fallback logic
   - Consider upgrading your OpenAI plan for higher limits

3. **Crossmint API errors**:
   - Verify your API keys are correct
   - Check that your Crossmint project is properly configured
   - The app falls back to direct Sei transactions if Crossmint fails

4. **Database connection issues**:
   - Make sure PostgreSQL is running (if using database)
   - Verify your DATABASE_URL is correct
   - The app defaults to in-memory storage if database is unavailable

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
- **Database**: PostgreSQL with Drizzle ORM (optional)
- **Blockchain**: Sei Network (EVM-compatible)
- **AI**: OpenAI GPT-4o-mini
- **Wallet**: Crossmint GOAT SDK
- **UI**: Radix UI components with shadcn/ui

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- Use environment-specific configurations
- Enable proper CORS and security headers in production
- Consider using secrets management for production deployments

---

**Happy coding!** 🚀

For additional support or questions, refer to the project documentation or create an issue in the repository.
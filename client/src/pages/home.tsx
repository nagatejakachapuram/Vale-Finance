import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Vale Finance</h1>
              <p className="text-xs text-gray-300">ElizaOS Agent Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Powered by ElizaOS on Sei Network
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Intelligent B2B
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Payment Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Deploy autonomous payment agents to automate your corporate financial workflows. 
              Vale Finance integrates ElizaOS, GOAT SDK, Crossmint wallets, and Rivalz oracles 
              for seamless B2B transactions on Sei Network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg">
                <i className="fas fa-rocket mr-2"></i>
                Launch Application
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <i className="fas fa-book mr-2"></i>
              Read Documentation
            </Button>
          </div>

          {/* Feature Preview */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-wallet text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Earn</h3>
              <p className="text-gray-300 text-sm">
                Automatically allocate idle treasury funds into secure, high-yield DeFi protocols on Sei Network.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-paper-plane text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Pay</h3>
              <p className="text-gray-300 text-sm">
                Streamline accounts payable with smart invoices that execute based on real-world oracle triggers.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-chart-line text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Control</h3>
              <p className="text-gray-300 text-sm">
                Unified dashboard with conversational AI interface for complete financial visibility and control.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="relative px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Built on Cutting-Edge Technology</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Vale Finance integrates the most advanced blockchain and AI technologies for enterprise-grade financial automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-robot text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ElizaOS Framework</h3>
              <p className="text-gray-400 text-sm">Autonomous agent runtime with multi-platform support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-coins text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">GOAT SDK</h3>
              <p className="text-gray-400 text-sm">Agentic finance toolkit for blockchain operations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-shield-alt text-purple-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Crossmint SDK</h3>
              <p className="text-gray-400 text-sm">Invisible wallet creation without seed phrases</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-satellite text-yellow-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rivalz Oracles</h3>
              <p className="text-gray-400 text-sm">Real-world data integration for smart contracts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Perfect for Modern Businesses</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Whether you're a startup, Web3 company, or global enterprise, Vale Finance adapts to your payment needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <i className="fas fa-rocket text-blue-400 text-2xl mb-4"></i>
              <h3 className="text-lg font-semibold text-white mb-2">Startups & SMBs</h3>
              <p className="text-gray-400 text-sm">Operating with digital assets and stablecoins</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <i className="fas fa-cube text-purple-400 text-2xl mb-4"></i>
              <h3 className="text-lg font-semibold text-white mb-2">Web3 Companies</h3>
              <p className="text-gray-400 text-sm">Professional treasury management for DAOs</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <i className="fas fa-globe text-green-400 text-2xl mb-4"></i>
              <h3 className="text-lg font-semibold text-white mb-2">Global Teams</h3>
              <p className="text-gray-400 text-sm">Cross-border payments for remote workforce</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <i className="fas fa-building text-yellow-400 text-2xl mb-4"></i>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprises</h3>
              <p className="text-gray-400 text-sm">Inflation protection and operational efficiency</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Finance?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of B2B payments with autonomous agents powered by AI and blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg">
                <i className="fas fa-rocket mr-2"></i>
                Get Started Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <i className="fas fa-calendar mr-2"></i>
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative px-6 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">Vale Finance</h3>
                <p className="text-xs text-gray-400">ElizaOS Agent Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Vale Finance. Built on Sei Network with ElizaOS, GOAT SDK, and Crossmint.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
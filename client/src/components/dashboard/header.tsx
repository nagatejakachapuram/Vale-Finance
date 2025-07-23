import { WalletConnect } from "@/components/wallet/wallet-connect";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vale Finance</h1>
                <p className="text-xs text-gray-500">ElizaOS Agent Platform</p>
              </div>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/dashboard">
              <Button 
                variant={location === "/dashboard" ? "default" : "ghost"}
                className="text-sm"
              >
                <i className="fas fa-tachometer-alt mr-2"></i>
                Dashboard
              </Button>
            </Link>
            <Link href="/treasury">
              <Button 
                variant={location === "/treasury" ? "default" : "ghost"}
                className="text-sm"
              >
                <i className="fas fa-wallet mr-2"></i>
                Treasury
              </Button>
            </Link>
            <Link href="/payments">
              <Button 
                variant={location === "/payments" ? "default" : "ghost"}
                className="text-sm"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Payments
              </Button>
            </Link>
            <Link href="/analytics">
              <Button 
                variant={location === "/analytics" ? "default" : "ghost"}
                className="text-sm"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Analytics
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <i className="fas fa-bell mr-2"></i>
            Notifications
          </Button>
          <WalletConnect />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-gray-600 text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
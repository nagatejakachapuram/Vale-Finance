import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Treasury() {
  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Treasury Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Treasury Management</h2>
            <p className="text-gray-600 mb-6">Manage your company's digital assets and generate yield through automated DeFi strategies.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Treasury Balance</p>
                    <p className="text-3xl font-bold">${metrics?.treasuryBalance?.toLocaleString() || '85,000'}</p>
                    <p className="text-green-100 text-sm">USDC equivalent</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-wallet text-white text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Earning Yield</p>
                    <p className="text-3xl font-bold">$32,500</p>
                    <p className="text-blue-100 text-sm">2.8% APY</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-white text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Available Liquidity</p>
                    <p className="text-3xl font-bold">$52,500</p>
                    <p className="text-purple-100 text-sm">Ready for deployment</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-coins text-white text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yield Strategies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Yield Strategies</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-seedling text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Yei Finance USDC Pool</h4>
                      <p className="text-sm text-gray-600">Low-risk lending protocol</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">2.8% APY</p>
                    <p className="text-sm text-gray-500">$32,500 allocated</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-exchange-alt text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Sei DEX Liquidity Pool</h4>
                      <p className="text-sm text-gray-600">USDC/SEI pair</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">4.2% APY</p>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Treasury Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <i className="fas fa-plus mr-2"></i>
                  Allocate to Yield Strategy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Withdraw from Strategy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="fas fa-chart-bar mr-2"></i>
                  Rebalance Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="fas fa-cog mr-2"></i>
                  Configure Auto-allocation
                </Button>
              </div>
            </div>
          </div>

          {/* Portfolio Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                </div>
                <p className="font-semibold text-gray-900">$65,000</p>
                <p className="text-sm text-gray-600">USDC</p>
                <p className="text-xs text-green-600">76.5%</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-coins text-blue-600 text-xl"></i>
                </div>
                <p className="font-semibold text-gray-900">12,500</p>
                <p className="text-sm text-gray-600">SEI</p>
                <p className="text-xs text-blue-600">18.2%</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-gem text-purple-600 text-xl"></i>
                </div>
                <p className="font-semibold text-gray-900">$3,200</p>
                <p className="text-sm text-gray-600">LP Tokens</p>
                <p className="text-xs text-purple-600">3.8%</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-star text-yellow-600 text-xl"></i>
                </div>
                <p className="font-semibold text-gray-900">$1,300</p>
                <p className="text-sm text-gray-600">Other</p>
                <p className="text-xs text-yellow-600">1.5%</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
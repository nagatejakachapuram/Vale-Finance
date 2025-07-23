import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
  });

  const { data: transactions } = useQuery({
    queryKey: ["/api/transactions"],
  });

  const monthlyData = [
    { month: 'Jul', payments: 15200, yield: 3400 },
    { month: 'Aug', payments: 18900, yield: 3800 },
    { month: 'Sep', payments: 22100, yield: 4200 },
    { month: 'Oct', payments: 19800, yield: 4100 },
    { month: 'Nov', payments: 26300, yield: 4600 },
    { month: 'Dec', payments: 24750, yield: 4950 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Analytics Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Analytics</h2>
            <p className="text-gray-600 mb-6">Comprehensive insights into your organization's financial performance and agent efficiency.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-chart-line text-blue-600 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">+18.5%</p>
                <p className="text-sm text-gray-600">Payment Volume Growth</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-coins text-green-600 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">2.8%</p>
                <p className="text-sm text-gray-600">Average Yield APY</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-robot text-purple-600 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-sm text-gray-600">Agent Success Rate</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-clock text-orange-600 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">12s</p>
                <p className="text-sm text-gray-600">Avg Transaction Time</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Volume Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Volume Trends</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.payments / 30000) * 200}px` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                    <p className="text-xs font-medium text-gray-900">${(data.payments / 1000).toFixed(0)}k</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Yield Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yield Performance</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${(data.yield / 6000) * 200}px` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                    <p className="text-xs font-medium text-gray-900">${(data.yield / 1000).toFixed(1)}k</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-blue-900">Payroll Agent</h4>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-white text-sm"></i>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Transactions</span>
                    <span className="font-medium text-blue-900">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Success Rate</span>
                    <span className="font-medium text-blue-900">96.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Total Volume</span>
                    <span className="font-medium text-blue-900">$18,400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Avg Time</span>
                    <span className="font-medium text-blue-900">8s</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-green-900">Invoice Agent</h4>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-invoice text-white text-sm"></i>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Transactions</span>
                    <span className="font-medium text-green-900">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Success Rate</span>
                    <span className="font-medium text-green-900">91.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Total Volume</span>
                    <span className="font-medium text-green-900">$8,750</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Avg Time</span>
                    <span className="font-medium text-green-900">15s</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-purple-900">Treasury Agent</h4>
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Allocations</span>
                    <span className="font-medium text-purple-900">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Success Rate</span>
                    <span className="font-medium text-purple-900">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Total Volume</span>
                    <span className="font-medium text-purple-900">$32,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Yield Generated</span>
                    <span className="font-medium text-purple-900">$1,820</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-700">Regular Payments</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">58%</p>
                    <p className="text-sm text-gray-500">$14,350</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-700">Smart Invoices</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">28%</p>
                    <p className="text-sm text-gray-500">$6,930</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-gray-700">Yield Allocations</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">14%</p>
                    <p className="text-sm text-gray-500">$3,470</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Savings</h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-900">Manual Processing Eliminated</p>
                      <p className="text-sm text-green-700">Automation vs traditional methods</p>
                    </div>
                    <p className="text-xl font-bold text-green-600">$4,200</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900">Transaction Fees Saved</p>
                      <p className="text-sm text-blue-700">Sei network efficiency</p>
                    </div>
                    <p className="text-xl font-bold text-blue-600">$890</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-purple-900">Yield Generated</p>
                      <p className="text-sm text-purple-700">Treasury optimization</p>
                    </div>
                    <p className="text-xl font-bold text-purple-600">$1,820</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
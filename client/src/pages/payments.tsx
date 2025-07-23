import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction } from "@shared/schema";

export default function Payments() {
  const { data: transactions } = useQuery({
    queryKey: ["/api/transactions"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment": return "fas fa-paper-plane text-blue-600";
      case "invoice": return "fas fa-file-invoice text-green-600";
      case "yield": return "fas fa-chart-line text-purple-600";
      case "swap": return "fas fa-exchange-alt text-orange-600";
      default: return "fas fa-dollar-sign text-gray-600";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Payment Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Management</h2>
            <p className="text-gray-600 mb-6">Send payments, manage invoices, and track all financial transactions across your organization.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">This Month</p>
                    <p className="text-2xl font-bold text-blue-900">$24,750</p>
                    <p className="text-blue-600 text-sm">18 transactions</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-credit-card text-white"></i>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold text-green-900">15</p>
                    <p className="text-green-600 text-sm">Success rate: 94%</p>
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check text-white"></i>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">3</p>
                    <p className="text-yellow-600 text-sm">Awaiting confirmation</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-white"></i>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Smart Invoices</p>
                    <p className="text-2xl font-bold text-purple-900">7</p>
                    <p className="text-purple-600 text-sm">Oracle-triggered</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-invoice text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Payment Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Payment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                  <Input placeholder="0x... or sei1..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="SEI">SEI</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Input placeholder="Payment description..." />
                </div>
                <Button className="w-full">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Payment
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <Button variant="outline" size="sm">
                  <i className="fas fa-download mr-2"></i>
                  Export
                </Button>
              </div>
              
              <div className="space-y-3">
                {transactions?.slice(0, 6).map((transaction: Transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className={getTypeIcon(transaction.type)}></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.amount} {transaction.currency}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.description || transaction.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.recipient && `To: ${transaction.recipient.slice(0, 8)}...${transaction.recipient.slice(-6)}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Invoices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Smart Invoices</h3>
              <Button>
                <i className="fas fa-plus mr-2"></i>
                Create Smart Invoice
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending Trigger
                  </span>
                  <i className="fas fa-satellite text-gray-400"></i>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">TechSupply Corp Invoice</h4>
                <p className="text-sm text-gray-600 mb-3">$5,200 USDC • Trigger: Delivery confirmation</p>
                <div className="flex items-center text-xs text-gray-500">
                  <i className="fas fa-clock mr-1"></i>
                  Created 2 days ago
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Oracle Active
                  </span>
                  <i className="fas fa-satellite text-blue-400"></i>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Marketing Agency Payment</h4>
                <p className="text-sm text-gray-600 mb-3">$3,000 USDC • Trigger: Monthly milestone</p>
                <div className="flex items-center text-xs text-gray-500">
                  <i className="fas fa-clock mr-1"></i>
                  Next trigger: Jan 15, 2025
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                  <i className="fas fa-check text-green-400"></i>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">DevOps Contractor</h4>
                <p className="text-sm text-gray-600 mb-3">$2,800 USDC • Triggered successfully</p>
                <div className="flex items-center text-xs text-gray-500">
                  <i className="fas fa-check mr-1"></i>
                  Completed yesterday
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
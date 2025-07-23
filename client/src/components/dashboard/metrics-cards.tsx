import { useQuery } from "@tanstack/react-query";

export function MetricsCards() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Treasury Balance</p>
            <p className="text-2xl font-bold text-gray-900">${metrics?.treasuryBalance?.toLocaleString() || '45,250'}.00</p>
            <p className="text-green-600 text-sm"><i className="fas fa-arrow-up mr-1"></i>+2.5% yield</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-wallet text-green-600 text-lg"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Active Agents</p>
            <p className="text-2xl font-bold text-gray-900">{metrics?.activeAgents || 3}</p>
            <p className="text-gray-500 text-sm">2 Payroll, 1 Invoice</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-robot text-blue-600 text-lg"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Monthly Payments</p>
            <p className="text-2xl font-bold text-gray-900">${metrics?.monthlyPayments?.toLocaleString() || '12,400'}</p>
            <p className="text-green-600 text-sm">18 transactions</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-credit-card text-yellow-600 text-lg"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Smart Invoices</p>
            <p className="text-2xl font-bold text-gray-900">{metrics?.smartInvoices || 7}</p>
            <p className="text-gray-500 text-sm">5 pending triggers</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-invoice text-purple-600 text-lg"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    { 
      href: "/dashboard", 
      icon: "fas fa-tachometer-alt", 
      label: "Dashboard",
      description: "Overview & metrics"
    },
    { 
      href: "/treasury", 
      icon: "fas fa-wallet", 
      label: "Treasury",
      description: "Asset management"
    },
    { 
      href: "/payments", 
      icon: "fas fa-paper-plane", 
      label: "Payments",
      description: "Send & receive"
    },
    { 
      href: "/analytics", 
      icon: "fas fa-chart-line", 
      label: "Analytics",
      description: "Performance insights"
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  location === item.href
                    ? "bg-blue-50 border border-blue-200 text-blue-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  location === item.href
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  <i className={`${item.icon} text-sm`}></i>
                </div>
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <i className="fas fa-plus mr-2"></i>
              Deploy Agent
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <i className="fas fa-paper-plane mr-2"></i>
              Send Payment
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <i className="fas fa-file-invoice mr-2"></i>
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Agent Status */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-900">System Status</span>
          </div>
          <p className="text-xs text-green-700">All agents operational</p>
          <p className="text-xs text-green-600">Last sync: 2 min ago</p>
        </div>
      </div>
    </aside>
  );
}
export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-16 border-r border-gray-200">
      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-primary bg-primary/10 rounded-lg font-medium">
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-robot"></i>
          <span>Agent Management</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-coins"></i>
          <span>Treasury</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-credit-card"></i>
          <span>Payments</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-chart-bar"></i>
          <span>Analytics</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-plug"></i>
          <span>Integrations</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
}

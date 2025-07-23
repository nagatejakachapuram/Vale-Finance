import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";

export function ActiveAgents() {
  const { data: agents, isLoading } = useQuery({
    queryKey: ["/api/agents"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50 border-green-200";
      case "monitoring": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "earning": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "payroll": return "fas fa-users text-white";
      case "invoice": return "fas fa-file-invoice text-white";
      case "treasury": return "fas fa-chart-line text-white";
      default: return "fas fa-robot text-white";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "monitoring": return "bg-yellow-500";
      case "earning": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Payment Agents</h3>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Active Payment Agents</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {agents?.map((agent: Agent) => (
          <div key={agent.id} className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(agent.status)}`}>
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${getStatusBg(agent.status)} rounded-lg flex items-center justify-center`}>
                <i className={getStatusIcon(agent.type)}></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{agent.name}</h4>
                <p className="text-sm text-gray-600">{agent.type} automation</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : agent.status === 'monitoring' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <span className={`text-sm font-medium capitalize ${agent.status === 'active' ? 'text-green-600' : agent.status === 'monitoring' ? 'text-yellow-600' : 'text-blue-600'}`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {agent.status === 'active' && 'Next: Dec 31, 2024'}
                {agent.status === 'monitoring' && '5 triggers pending'}
                {agent.status === 'earning' && '2.5% APY'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

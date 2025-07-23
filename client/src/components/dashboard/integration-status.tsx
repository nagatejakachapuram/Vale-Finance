import { useQuery } from "@tanstack/react-query";
import { Integration } from "@shared/schema";

export function IntegrationStatus() {
  const { data: integrations, isLoading } = useQuery({
    queryKey: ["/api/integrations"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "online":
        return "bg-green-500 text-white";
      case "syncing":
        return "bg-yellow-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "online":
        return "fas fa-check";
      case "syncing":
        return "fas fa-sync";
      case "error":
        return "fas fa-exclamation";
      default:
        return "fas fa-question";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Integration Status</h3>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Integration Status</h3>
      </div>
      <div className="p-6 space-y-4">
        {integrations?.map((integration: Integration) => (
          <div key={integration.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(integration.status)}`}>
                <i className={`${getStatusIcon(integration.status)} text-white text-sm`}></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-600">
                  {integration.version} - {integration.metadata?.description}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(integration.status)}`}>
              {integration.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

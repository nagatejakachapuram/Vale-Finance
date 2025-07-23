import { useQuery } from "@tanstack/react-query";
import { Activity } from "@shared/schema";

export function RecentActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["/api/activities"],
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "agent_action": return "fas fa-check text-white text-xs";
      case "system_event": return "fas fa-sync text-white text-xs";
      default: return "fas fa-bell text-white text-xs";
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "agent_action": return "bg-green-500";
      case "system_event": return "bg-gray-400";
      default: return "bg-yellow-500";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 space-y-4">
        {activities?.map((activity: Activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`w-8 h-8 ${getActivityBg(activity.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
              <i className={getActivityIcon(activity.type)}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">
                {activity.description} • {formatTimeAgo(activity.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

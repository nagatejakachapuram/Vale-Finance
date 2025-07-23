import React, { useEffect } from 'react';
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ActiveAgents } from "@/components/dashboard/active-agents";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { AgentDeployment } from "@/components/dashboard/agent-deployment";
import ConversationalInterface from "@/components/ConversationalInterface";
import QuickPayment from "@/components/QuickPayment";

export default function Dashboard() {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6 h-[calc(100vh-64px)] overflow-y-auto">
          {/* Welcome Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Vale Finance</h2>
                <p className="text-gray-600 mb-4">Your intelligent B2B payment platform powered by AI agents on Sei Network</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">AI Framework Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Sei Testnet Connected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Crossmint Integrated</span>
                  </div>
                </div>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                <i className="fas fa-plus mr-2"></i>Deploy New Agent
              </button>
            </div>
          </div>

          <MetricsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActiveAgents />
            <AgentDeployment />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <QuickPayment />
          </div>

          <ConversationalInterface />
        </main>
      </div>
    </div>
  );
}

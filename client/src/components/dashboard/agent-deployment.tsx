import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function AgentDeployment() {
  const [agentType, setAgentType] = useState("");
  const [agentName, setAgentName] = useState("");
  const [initialBudget, setInitialBudget] = useState("");
  const [crossmintEnabled, setCrossmintEnabled] = useState(false);
  const [rivalzEnabled, setRivalzEnabled] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deployAgent = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/agents", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Agent Deployed Successfully",
        description: "Your new payment agent is now active and ready to use.",
      });
      
      // Reset form
      setAgentType("");
      setAgentName("");
      setInitialBudget("");
      setCrossmintEnabled(false);
      setRivalzEnabled(false);

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
    },
    onError: () => {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy the agent. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentType || !agentName || !initialBudget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    deployAgent.mutate({
      name: agentName,
      type: agentType,
      budget: parseInt(initialBudget),
      crossmintEnabled,
      rivalzEnabled,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Deploy New Agent</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleDeploy} className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Agent Type</label>
            <Select value={agentType} onValueChange={setAgentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payroll">Payroll Agent</SelectItem>
                <SelectItem value="invoice">Invoice Agent</SelectItem>
                <SelectItem value="treasury">Treasury Agent</SelectItem>
                <SelectItem value="supplier">Supplier Payment Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Agent Name</label>
            <Input 
              type="text" 
              placeholder="e.g., Marketing Payroll Agent"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Initial Budget (USDC)</label>
            <Input 
              type="number" 
              placeholder="10000"
              value={initialBudget}
              onChange={(e) => setInitialBudget(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="crossmint"
                checked={crossmintEnabled}
                onCheckedChange={setCrossmintEnabled}
              />
              <label htmlFor="crossmint" className="text-sm text-gray-700">Enable Crossmint wallet</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rivalz"
                checked={rivalzEnabled}
                onCheckedChange={setRivalzEnabled}
              />
              <label htmlFor="rivalz" className="text-sm text-gray-700">Connect to Rivalz Oracles</label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={deployAgent.isPending}
          >
            {deployAgent.isPending ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Deploying...
              </>
            ) : (
              <>
                <i className="fas fa-rocket mr-2"></i>Deploy Agent
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

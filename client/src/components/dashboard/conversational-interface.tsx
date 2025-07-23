import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ConversationalInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Vale, what was our total outflow to suppliers this month?",
      isUser: true,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      text: "Based on your payment history, total outflow to suppliers this month was $24,750 USDC across 15 transactions. The largest payment was $5,200 to TechSupply Corp on Dec 15th.",
      isUser: false,
      timestamp: new Date(Date.now() - 280000),
    },
    {
      id: "3",
      text: "Schedule a recurring payment of 2,000 USDC to our marketing contractor on the 15th of every month",
      isUser: true,
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "4",
      text: "I've created a recurring payment schedule for 2,000 USDC on the 15th of each month. The payment will be processed through your Payroll Agent. Would you like me to set up any specific conditions or oracle triggers?",
      isUser: false,
      timestamp: new Date(Date.now() - 100000),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/mcp/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      // Add AI response
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessage.mutate(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Conversational Finance Management</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Sei MCP Server Online</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? '' : 'justify-end'}`}>
              {message.isUser ? (
                <>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-gray-600 text-sm"></i>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                    <p className="text-sm text-gray-900">{message.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-primary text-white rounded-lg px-4 py-2 max-w-md">
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-white text-sm"></i>
                  </div>
                </>
              )}
            </div>
          ))}
          {sendMessage.isPending && (
            <div className="flex items-start space-x-3 justify-end">
              <div className="bg-primary text-white rounded-lg px-4 py-2 max-w-md">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <Input
            type="text"
            placeholder="Ask Vale about your finances..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            type="submit"
            disabled={sendMessage.isPending || !inputMessage.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </form>
      </div>
    </div>
  );
}

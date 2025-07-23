import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, Bot, User } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ConversationResponse {
  success: boolean;
  response: string;
  sessionId: string;
  timestamp: string;
}

export default function ConversationalInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m Vale Finance AI, your intelligent assistant for managing payments and agents on the Sei blockchain. I can help you:\n\n• Create and manage payment agents\n• Execute secure transactions\n• Check balances and analytics\n• Answer questions about your financial operations\n\nWhat would you like to do today?',
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [messages.length]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<ConversationResponse> => {
      const response = await fetch('/api/conversation/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          userId: 1, // Mock user ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          timestamp: data.timestamp,
        }
      ]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try again.',
          timestamp: new Date().toISOString(),
        }
      ]);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || sendMessageMutation.isPending) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      }
    ]);

    // Send to AI
    sendMessageMutation.mutate(userMessage);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Vale Finance AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                    }
                  `}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div
                    className={`
                      rounded-lg px-4 py-2 text-sm
                      ${message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap">
                      {formatMessage(message.content)}
                    </div>
                    <div className={`
                      text-xs mt-1 opacity-70
                      ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}
                    `}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {sendMessageMutation.isPending && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">Thinking...</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about payments, agents, balances, or anything else..."
              disabled={sendMessageMutation.isPending}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!inputMessage.trim() || sendMessageMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="text-xs text-gray-500 mt-2">
            Try: "Create a payroll agent with $5000 budget" or "Show me my treasury balance"
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
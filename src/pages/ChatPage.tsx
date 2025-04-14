import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { PageLayout } from '../components/layout/PageLayout';
import { useChat } from '../hooks/useChat';
import { cn } from '../lib/utils';

export const ChatPage: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearHistory } = useChat();

  return (
    <PageLayout showClearButton={messages.length > 0} onClearClick={clearHistory}>
      <div className="container max-w-4xl mx-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-400">
            <MessageSquare className="w-12 h-12 mb-4" />
            <p>Start a conversation by typing a message below</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="p-4 text-center text-gray-400">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
        
        {error && (
          <div className={cn(
            "p-4 text-center text-red-500 rounded-lg",
            "bg-red-900/20"
          )}>
            {error}
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </PageLayout>
  );
};

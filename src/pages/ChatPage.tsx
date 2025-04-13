import React from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { useChatStore } from '../store/chat';
import { useThemeStore } from '../store/theme';
import { getChatCompletion } from '../lib/openai_client';
import { MessageSquare, Sun, Moon, Trash2 } from 'lucide-react';

// system message defined once
const systemMessage = {
  role: 'system' as const,
  content: `
You are an AI-powered astrology assistant designed to provide personalized astrological guidance...
  `,
};

export const ChatPage: React.FC = () => {
  const { messages, isLoading, error, addMessage, setLoading, setError, clearHistory } = useChatStore();
  const { isDark, toggleTheme } = useThemeStore();

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    try {
      const userMessage = { role: 'user' as const, content: input };
      addMessage(userMessage);

      const conversationForAPI = [systemMessage, ...messages, userMessage];
      setLoading(true);
      setError(null);

      const response = await getChatCompletion(conversationForAPI);
      addMessage({ role: 'assistant', content: response });
    } catch (err) {
      console.error('Chat error:', err);
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          <h1 className="text-xl font-semibold">AI Astrolog</h1>
        </div>
        <div className="flex gap-2">
          {messages.length > 0 && (
            <button 
              onClick={clearHistory} 
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Clear chat history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-[calc(100vh-200px)] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>Start a conversation by typing a message below</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} isDark={isDark} />
              ))}
            </div>
          )}
          {isLoading && (
            <div className={`p-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
          {error && (
            <div className={`p-4 text-center text-red-500 ${isDark ? 'bg-red-900/20' : 'bg-red-50'} rounded-lg`}>
              {error}
            </div>
          )}
        </div>
      </main>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} isDark={isDark} />
    </div>
  );
};

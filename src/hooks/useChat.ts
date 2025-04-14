import { useState, useCallback } from 'react';
import { useChatStore } from '../store/chat';
import { getChatCompletion } from '../lib/openai_client';
import { SYSTEM_MESSAGE } from '../constants';

export function useChat() {
  const { 
    messages, 
    isLoading, 
    error, 
    addMessage, 
    setLoading, 
    setError, 
    clearHistory 
  } = useChatStore();
  
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    try {
      // Create user message
      const userMessage = { role: 'user' as const, content };
      addMessage(userMessage);

      // Prepare message history including system message
      const conversationForAPI = [SYSTEM_MESSAGE, ...messages, userMessage];
      
      // Set loading state
      setLoading(true);
      setError(null);
      
      // Create an AbortController for the request
      const controller = new AbortController();
      setAbortController(controller);

      // Get completion from OpenAI
      const response = await getChatCompletion(conversationForAPI);
      
      // Add assistant response
      addMessage({ role: 'assistant', content: response });
      
      // Reset AbortController
      setAbortController(null);
      
      return response;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Chat error:', err);
        setError('An error occurred while processing your request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [messages, addMessage, setLoading, setError]);

  const cancelRequest = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setLoading(false);
    }
  }, [abortController, setLoading]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    cancelRequest,
    clearHistory
  };
}

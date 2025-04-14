import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatState, Message } from '../types/chat';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      
      // Actions
      addMessage: (message: Message) => 
        set((state) => ({ messages: [...state.messages, message] })),
      
      setLoading: (loading: boolean) => 
        set({ isLoading: loading }),
      
      setError: (error: string | null) => 
        set({ error }),
      
      clearHistory: () => 
        set({ messages: [] }),
        
      // New action that combines multiple updates
      sendMessage: (userMessage: Message, assistantMessage: Message) =>
        set((state) => ({ 
          messages: [...state.messages, userMessage, assistantMessage],
          isLoading: false,
          error: null
        })),
    }),
    {
      name: 'chat-history-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
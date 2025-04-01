import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState } from '../types/chat';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      addMessage: (message) => 
        set((state) => ({ messages: [...state.messages, message] })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearHistory: () => set({ messages: [] }),
    }),
    {
      name: 'chat-history-storage',
      // Only persist messages, not loading state or errors
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
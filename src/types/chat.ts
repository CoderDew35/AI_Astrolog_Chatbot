export type Message =
  | { role: 'system' | 'user' | 'assistant'; content: string }
  | { role: 'function'; content: string; name: string };

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearHistory: () => void;
}

export type Message =
  | { role: 'system' | 'user'; content: string }
  | { 
      role: 'assistant'; 
      content: string; 
      tool_calls?: Array<{
        id: string;
        type: 'function';
        function: {
          name: string;
          arguments: string;
        };
      }>;
    }
  | { role: 'function'; content: string; name: string }
  | { role: 'tool'; content: string; tool_call_id: string };

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearHistory: () => void;
}
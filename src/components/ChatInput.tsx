import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useThemeStore } from '../store/theme';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { isDark } = useThemeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'p-4 border-t',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}
    >
      <div className="flex gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 p-2 border rounded-lg resize-none min-h-[40px] max-h-[120px]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          )}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className={cn(
            'p-2 text-white bg-blue-500 rounded-lg',
            'hover:bg-blue-600 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
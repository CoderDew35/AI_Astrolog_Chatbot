import React from 'react';
import { MessageSquare, Sun, Moon, Trash2 } from 'lucide-react';
import { useThemeStore } from '../../store/theme';
import { cn } from '../../lib/utils';

interface HeaderProps {
  title?: string;
  showClearButton?: boolean;
  onClearClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'AI Astrolog',
  showClearButton = false,
  onClearClick
}) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header 
      className={cn(
        'flex items-center justify-between p-4 border-b',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}
    >
      <div className="flex items-center gap-2">
        <MessageSquare className={cn(
          'w-6 h-6',
          isDark ? 'text-blue-400' : 'text-blue-500'
        )} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex gap-2">
        {showClearButton && onClearClick && (
          <button 
            onClick={onClearClick} 
            className={cn(
              'p-2 rounded-lg',
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            )}
            title="Clear history"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={toggleTheme} 
          className={cn(
            'p-2 rounded-lg',
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          )}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

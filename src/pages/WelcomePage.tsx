import React from 'react';
import { MessageSquare, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/theme';

interface WelcomePageProps {
  onSelectPage: (page: 'chat' | 'stats') => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectPage }) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <>
      {/* Header with dark/light mode toggle */}
      <header className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          <h1 className="text-xl font-semibold">AI Astrolog</h1>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>
      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-3xl font-bold mb-6">Welcome to AI Astrolog</h1>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded" 
            onClick={() => onSelectPage('chat')}
          >
            Chat
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded" 
            onClick={() => onSelectPage('stats')}
          >
            Daily Stats
          </button>
        </div>
      </div>
    </>
  );
};

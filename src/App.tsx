import { useState, useCallback } from 'react';
import { WelcomePage } from './pages/WelcomePage';
import { ChatPage } from './pages/ChatPage';
import { DailyStatsPage } from './pages/DailyStatsPage';
import { useThemeStore } from './store/theme';
import { cn } from './lib/utils';

type Page = 'welcome' | 'chat' | 'stats';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const { isDark } = useThemeStore();
  
  const handleSelectPage = useCallback((page: 'chat' | 'stats') => {
    setCurrentPage(page);
  }, []);
  
  const handleBack = useCallback(() => {
    setCurrentPage('welcome');
  }, []);

  return (
    <div className={cn(
      'flex flex-col h-screen',
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    )}>
      {currentPage === 'welcome' && <WelcomePage onSelectPage={handleSelectPage} />}
      {currentPage === 'chat' && <ChatPage />}
      {currentPage === 'stats' && <DailyStatsPage onBack={handleBack} />}
    </div>
  );
}

export default App;

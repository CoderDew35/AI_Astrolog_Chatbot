import React, { ReactNode } from 'react';
import { useThemeStore } from '../../store/theme';
import { cn } from '../../lib/utils';
import { Header } from '../ui/Header';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showClearButton?: boolean;
  onClearClick?: () => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showClearButton,
  onClearClick
}) => {
  const { isDark } = useThemeStore();

  return (
    <div className={cn(
      'flex flex-col h-screen',
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    )}>
      <Header 
        title={title} 
        showClearButton={showClearButton} 
        onClearClick={onClearClick} 
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

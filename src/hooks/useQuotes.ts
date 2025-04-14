import { useState, useCallback } from 'react';
import { fetchQuotes } from '../lib/api-client';

interface Quote {
  quote: string;
  author: string;
  category: string;
}

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getQuotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchQuotes();
      setQuotes(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch quotes.';
      
      setError(errorMessage);
      setQuotes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    quotes,
    isLoading,
    error,
    getQuotes
  };
}

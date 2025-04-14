import { useState, useCallback } from 'react';
import { ZodiacSign } from '../constants';
import { fetchDailyHoroscope } from '../lib/api-client';

export function useHoroscope() {
  const [horoscope, setHoroscope] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getHoroscope = useCallback(async (sign: ZodiacSign) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchDailyHoroscope(sign);
      setHoroscope(data.horoscope_data);
      setDate(data.date);
      return data.horoscope_data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch daily horoscope.';
      
      setError(errorMessage);
      setHoroscope('');
      setDate('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    horoscope,
    date,
    isLoading,
    error,
    getHoroscope
  };
}

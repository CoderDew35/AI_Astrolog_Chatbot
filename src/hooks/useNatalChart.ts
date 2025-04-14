import { useState, useCallback } from 'react';
import { fetchNatalChart } from '../lib/api-client';

export interface NatalChartData {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
}

export function useNatalChart() {
  const [chartUrl, setChartUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getDefaultNatalChartData = (): NatalChartData => {
    const now = new Date();
    
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1, // JS months are 0-indexed
      date: now.getDate(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: 0,
      latitude: 40.7128, // Default to New York
      longitude: -74.0060,
      timezone: -4, // EDT
    };
  };

  const getNatalChart = useCallback(async (data?: Partial<NatalChartData>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Merge provided data with defaults
      const requestData = {
        ...getDefaultNatalChartData(),
        ...data
      };
      
      const result = await fetchNatalChart(requestData);
      setChartUrl(result.output);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch natal chart.';
      
      setError(errorMessage);
      setChartUrl('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    chartUrl,
    isLoading,
    error,
    getNatalChart,
    getDefaultNatalChartData
  };
}

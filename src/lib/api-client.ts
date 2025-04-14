import { ZodiacSign } from '../constants';

interface HoroscopeApiResponse {
  data: {
    date: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
}

interface Quote {
  quote: string;
  author: string;
  category: string;
}

interface NatalChartRequest {
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

interface NatalChartResponse {
  statusCode: number;
  output: string; // This is the SVG URL
}

/**
 * Fetches the daily horoscope for a given zodiac sign
 */
export async function fetchDailyHoroscope(sign: ZodiacSign): Promise<HoroscopeApiResponse['data']> {
  try {
    const params = new URLSearchParams({ 
      sign, 
      day: 'TODAY' 
    });
    
    const response = await fetch(`http://185.23.72.79:8008/horoscope/daily/?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const responseData: HoroscopeApiResponse = await response.json();
    
    if (!responseData.success) {
      throw new Error(`API returned error with status: ${responseData.status}`);
    }
    
    return responseData.data;
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch horoscope data');
  }
}


export async function fetchQuotes(): Promise<Quote[]> {
  try {
    const response = await fetch(`http://185.23.72.79:8008/quotes/`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const quotes: Quote[] = await response.json();
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch quotes');
  }
}

/**
 * Fetches natal chart data based on birth details
 */
export async function fetchNatalChart(data: NatalChartRequest): Promise<NatalChartResponse> {
  try {
    const response = await fetch('http://185.23.72.79:8008/natal-chart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching natal chart:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch natal chart data');
  }
}

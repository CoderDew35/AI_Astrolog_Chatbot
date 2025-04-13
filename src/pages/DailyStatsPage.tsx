import React, { useState } from 'react';
import { MessageSquare, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/theme';

interface DailyStatsPageProps {
  onBack: () => void;
}

export const DailyStatsPage: React.FC<DailyStatsPageProps> = ({ onBack }) => {
  const { isDark, toggleTheme } = useThemeStore();

  // New local state
  const [selectedOption, setSelectedOption] = useState<string>('selectOption');
  const [sign, setSign] = useState<string>('Aries');
  const [day] = useState<string>('TODAY');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    console.log('Selected option:', e.target.value);

    // Auto-fetch if default option is selected
    if (e.target.value === 'dailyHoroscope') {
      fetchDailyHoroscope();
    }

  };

  const fetchDailyHoroscope = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sign, day });
      const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?${params.toString()}` );
      
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json(); // assuming plain text response
      console.log('API response:', data);
      setResult(data.horoscope_data);
    } catch (error) {
      setResult('Failed to fetch daily horoscope.');
    } finally {
      setLoading(false);
    }
  };

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
      {/* Main content with dynamic background */}
      <div className={`flex flex-col items-center justify-start p-4 h-[calc(100vh-64px)] ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-3xl font-bold mb-6">Daily Stats</h1>
        {/* New dropdown for selecting stats option */}
        <div className="mb-4">
          <label className="mr-2">Select Option:</label>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className={`p-2 border rounded ${
              isDark 
                ? 'bg-gray-700 text-white border-gray-600 [&>option]:bg-gray-700 [&>option]:text-white' 
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          >
            <option value="selectOption">Select Option</option>
            <option value="dailyHoroscope">Daily Horoscope Comment</option>
            {/* Future options go here */}
          </select>
        </div>
        {selectedOption === 'dailyHoroscope' && (
          <div className="mb-4 flex flex-col items-center">
            <label className="mb-2">Select Zodiac Sign:</label>
            <select
              value={sign}
              onChange={(e) => setSign(e.target.value)}
              className={`p-2 border rounded ${
                isDark 
                  ? 'bg-gray-700 text-white border-gray-600 [&>option]:bg-gray-700 [&>option]:text-white' 
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            >
              {zodiacSigns.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={fetchDailyHoroscope}>
              {loading ? 'Loading...' : 'Get Daily Horoscope'}
            </button>
          </div>
        )}
        {result && (
          <div className="mt-4 p-4 border rounded bg-gray-200 text-gray-800 w-full max-w-xl">
            {result}
          </div>
        )}
        <button className="mt-6 px-4 py-2 bg-gray-700 text-white rounded" onClick={onBack}>
          Back
        </button>
      </div>
    </>
  );
};

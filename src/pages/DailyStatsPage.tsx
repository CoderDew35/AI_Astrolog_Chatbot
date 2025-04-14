import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useHoroscope } from '../hooks/useHoroscope';
import { useQuotes } from '../hooks/useQuotes';
import { useNatalChart, NatalChartData } from '../hooks/useNatalChart';
import { ZODIAC_SIGNS, ZodiacSign } from '../constants';
import { cn } from '../lib/utils';
import { useThemeStore } from '../store/theme';
import { Calendar, Clock, MapPin, Quote, Star, Globe } from 'lucide-react';

interface DailyStatsPageProps {
  onBack: () => void;
}

type OptionType = 'selectOption' | 'dailyHoroscope' | 'inspirationalQuote' | 'natalChart';

export const DailyStatsPage: React.FC<DailyStatsPageProps> = ({ onBack }) => {
  const { isDark } = useThemeStore();
  const { horoscope, date, isLoading: horoscopeLoading, error: horoscopeError, getHoroscope } = useHoroscope();
  const { quotes, isLoading: quotesLoading, error: quotesError, getQuotes } = useQuotes();
  const { chartUrl, isLoading: chartLoading, error: chartError, getNatalChart, getDefaultNatalChartData } = useNatalChart();
  
  const [selectedOption, setSelectedOption] = useState<OptionType>('selectOption');
  const [sign, setSign] = useState<ZodiacSign>('Aries');
  const [birthData, setBirthData] = useState<NatalChartData>(getDefaultNatalChartData());

  const handleBirthDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirthData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' || name === 'timezone' 
        ? parseFloat(value) 
        : parseInt(value, 10)
    }));
  };

  const handleGetNatalChart = () => {
    getNatalChart(birthData);
  };

  const isLoading = horoscopeLoading || quotesLoading || chartLoading;
  const error = selectedOption === 'dailyHoroscope' 
    ? horoscopeError 
    : selectedOption === 'inspirationalQuote' 
      ? quotesError 
      : chartError;

  // Card style based on theme
  const cardStyle = cn(
    "w-full max-w-2xl rounded-lg shadow-md p-6 mb-6 transition-all duration-200",
    isDark 
      ? "bg-gray-800 border border-gray-700 hover:border-blue-600" 
      : "bg-white border border-gray-200 hover:border-blue-400"
  );

  // Input style based on theme
  const inputStyle = cn(
    "w-full p-2 border rounded transition-colors focus:ring-2 focus:ring-opacity-50 focus:outline-none",
    isDark 
      ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" 
      : "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-300"
  );

  // Button style based on purpose and theme
  const primaryButtonStyle = cn(
    "px-4 py-2 rounded-md font-medium shadow-sm transition-colors duration-200",
    "flex items-center justify-center gap-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    isDark
      ? "bg-blue-600 hover:bg-blue-700 text-white disabled:hover:bg-blue-600"
      : "bg-blue-500 hover:bg-blue-600 text-white disabled:hover:bg-blue-500"
  );

  const secondaryButtonStyle = cn(
    "px-4 py-2 rounded-md font-medium shadow-sm transition-colors duration-200",
    "flex items-center justify-center gap-2",
    isDark
      ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300"
  );

  return (
    <PageLayout title="Astrological Insights">
      <div className={cn(
        "flex flex-col items-center justify-start p-4 h-[calc(100vh-64px)] overflow-y-auto",
        "max-w-5xl mx-auto w-full"
      )}>
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className={cn(
            isDark ? "text-blue-400" : "text-blue-600"
          )}>Explore</span> Astrological Insights
        </h1>
        
        {/* Options cards */}
        {selectedOption === 'selectOption' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
            <button
              onClick={() => {
                setSelectedOption('dailyHoroscope');
                getHoroscope(sign);
              }}
              className={cn(
                "flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-200 text-left",
                "border hover:shadow-lg transform hover:-translate-y-1",
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:border-blue-600" 
                  : "bg-white border-gray-200 hover:border-blue-400"
              )}
            >
              <Star size={32} className={isDark ? "text-yellow-400 mb-4" : "text-yellow-500 mb-4"} />
              <h3 className="text-xl font-semibold mb-2">Daily Horoscope</h3>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                Get your personalized daily horoscope forecast based on your zodiac sign
              </p>
            </button>
            
            <button
              onClick={() => {
                setSelectedOption('inspirationalQuote');
                getQuotes();
              }}
              className={cn(
                "flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-200 text-left",
                "border hover:shadow-lg transform hover:-translate-y-1",
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:border-blue-600" 
                  : "bg-white border-gray-200 hover:border-blue-400"
              )}
            >
              <Quote size={32} className={isDark ? "text-green-400 mb-4" : "text-green-500 mb-4"} />
              <h3 className="text-xl font-semibold mb-2">Inspirational Quote</h3>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                Discover motivational quotes to inspire your day
              </p>
            </button>
            
            <button
              onClick={() => setSelectedOption('natalChart')}
              className={cn(
                "flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-200 text-left",
                "border hover:shadow-lg transform hover:-translate-y-1",
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:border-blue-600" 
                  : "bg-white border-gray-200 hover:border-blue-400"
              )}
            >
              <Globe size={32} className={isDark ? "text-purple-400 mb-4" : "text-purple-500 mb-4"} />
              <h3 className="text-xl font-semibold mb-2">Birth Chart</h3>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                Generate your detailed astrological birth chart
              </p>
            </button>
          </div>
        )}
        
        {selectedOption !== 'selectOption' && (
          <div className={cardStyle}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {selectedOption === 'dailyHoroscope' && (
                  <span className="flex items-center gap-2">
                    <Star size={20} className={isDark ? "text-yellow-400" : "text-yellow-500"} />
                    Daily Horoscope
                  </span>
                )}
                {selectedOption === 'inspirationalQuote' && (
                  <span className="flex items-center gap-2">
                    <Quote size={20} className={isDark ? "text-green-400" : "text-green-500"} />
                    Inspirational Quote
                  </span>
                )}
                {selectedOption === 'natalChart' && (
                  <span className="flex items-center gap-2">
                    <Globe size={20} className={isDark ? "text-purple-400" : "text-purple-500"} />
                    Birth Chart
                  </span>
                )}
              </h2>
              <button 
                className={secondaryButtonStyle + " text-sm"}
                onClick={() => setSelectedOption('selectOption')}
              >
                Back to Options
              </button>
            </div>
            
            {/* Feature-specific controls */}
            {selectedOption === 'dailyHoroscope' && (
              <div className="mb-6">
                <label className="block mb-2 font-medium">Select Your Zodiac Sign:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ZODIAC_SIGNS.map((zodiacSign) => (
                    <button
                      key={zodiacSign}
                      onClick={() => {
                        setSign(zodiacSign);
                        getHoroscope(zodiacSign);
                      }}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                        sign === zodiacSign 
                          ? isDark 
                            ? "bg-blue-600 text-white" 
                            : "bg-blue-500 text-white"
                          : isDark 
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      )}
                    >
                      {zodiacSign}
                    </button>
                  ))}
                </div>
                <button 
                  className={primaryButtonStyle}
                  onClick={() => getHoroscope(sign)}
                  disabled={isLoading}
                >
                  <Star size={16} />
                  {horoscopeLoading ? 'Loading...' : 'Refresh Horoscope'}
                </button>
              </div>
            )}
            
            {selectedOption === 'inspirationalQuote' && (
              <div className="mb-6 flex flex-col items-center">
                <p className={cn("text-sm mb-4", isDark ? "text-gray-400" : "text-gray-600")}>
                  Click the button below to receive an inspiring quote for today
                </p>
                <button 
                  className={primaryButtonStyle}
                  onClick={() => getQuotes()}
                  disabled={isLoading}
                >
                  <Quote size={16} />
                  {quotesLoading ? 'Loading...' : 'Get New Quote'}
                </button>
              </div>
            )}
            
            {selectedOption === 'natalChart' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Enter Birth Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <Calendar size={14} /> Date of Birth
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Year</label>
                          <input
                            type="number"
                            name="year"
                            value={birthData.year}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Month (1-12)</label>
                          <input
                            type="number"
                            name="month"
                            min="1"
                            max="12"
                            value={birthData.month}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Day</label>
                          <input
                            type="number"
                            name="date"
                            min="1"
                            max="31"
                            value={birthData.date}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <Clock size={14} /> Time of Birth
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Hour (0-23)</label>
                          <input
                            type="number"
                            name="hours"
                            min="0"
                            max="23"
                            value={birthData.hours}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Minute</label>
                          <input
                            type="number"
                            name="minutes"
                            min="0"
                            max="59"
                            value={birthData.minutes}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Second</label>
                          <input
                            type="number"
                            name="seconds"
                            min="0"
                            max="59"
                            value={birthData.seconds}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <MapPin size={14} /> Birth Location
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Latitude</label>
                          <input
                            type="number"
                            name="latitude"
                            step="0.0001"
                            value={birthData.latitude}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 opacity-70">Longitude</label>
                          <input
                            type="number"
                            name="longitude"
                            step="0.0001"
                            value={birthData.longitude}
                            onChange={handleBirthDataChange}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <Globe size={14} /> Timezone
                      </label>
                      <div>
                        <input
                          type="number"
                          name="timezone"
                          step="0.5"
                          min="-12"
                          max="14"
                          value={birthData.timezone}
                          onChange={handleBirthDataChange}
                          className={inputStyle}
                        />
                        <p className="text-xs mt-1 opacity-70">
                          Example: UTC-5 would be -5, UTC+1 would be 1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className={primaryButtonStyle}
                  onClick={handleGetNatalChart}
                  disabled={isLoading}
                >
                  <Globe size={16} />
                  {chartLoading ? 'Generating Chart...' : 'Generate Birth Chart'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className={cn(
            "w-full max-w-2xl p-4 border rounded-lg mb-6",
            "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30",
            "flex items-center gap-2"
          )}>
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>{error}</div>
          </div>
        )}
        
        {/* Horoscope result */}
        {selectedOption === 'dailyHoroscope' && horoscope && !error && (
          <div className={cn(
            "w-full max-w-2xl rounded-lg shadow-md p-6 mb-6 transition-all",
            isDark 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Star size={18} className={isDark ? "text-yellow-400" : "text-yellow-500"} />
                {sign} Horoscope
              </h3>
              {date && (
                <div className={cn(
                  "text-sm py-1 px-2 rounded-full",
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                )}>
                  {date}
                </div>
              )}
            </div>
            <div className={cn(
              "prose max-w-none",
              isDark ? "prose-invert" : ""
            )}>
              <p className="whitespace-pre-wrap leading-relaxed">{horoscope}</p>
            </div>
          </div>
        )}
        
        {/* Quotes result */}
        {selectedOption === 'inspirationalQuote' && quotes.length > 0 && !error && (
          <div className="w-full max-w-2xl space-y-4 mb-6">
            {quotes.map((quote, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 border rounded-lg shadow-md transition-all",
                  isDark 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                )}
              >
                <blockquote className={cn(
                  "text-lg italic mb-3 leading-relaxed",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-lg">— {quote.author}</div>
                  {quote.category && (
                    <div className={cn(
                      "text-sm py-1 px-2 rounded-full",
                      isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                    )}>
                      {quote.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Natal Chart result */}
        {selectedOption === 'natalChart' && chartUrl && !error && (
          <div className={cn(
            "w-full max-w-2xl rounded-lg shadow-md p-6 mb-6 transition-all",
            isDark 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          )}>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe size={18} className={isDark ? "text-purple-400" : "text-purple-500"} />
              Your Birth Chart
            </h3>
            <div className="bg-white p-2 rounded mb-4 overflow-hidden">
              <img 
                src={chartUrl} 
                alt="Birth Chart" 
                className="max-w-full h-auto rounded shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <a 
                href={chartUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 rounded text-sm",
                  isDark
                    ? "bg-gray-700 text-blue-400 hover:bg-gray-600" 
                    : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in new tab
              </a>
            </div>
          </div>
        )}
        
        {/* Back button (only for completed views) */}
        {selectedOption === 'selectOption' && (
          <button 
            className={secondaryButtonStyle}
            onClick={onBack}
          >
            Back to Main Menu
          </button>
        )}
      </div>
    </PageLayout>
  );
};

import React, { useState } from 'react';
import { 
  CloudSun, 
  Search, 
  Wind, 
  Droplets, 
  Thermometer, 
  Calendar, 
  Sparkles, 
  Shirt 
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';

interface WeatherViewProps {
  onNavigate: (tab: string) => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ onNavigate }) => {
  const { weather, fetchWeather } = useWardrobe();
  const [searchCity, setSearchCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    setIsSearching(true);
    try {
      await fetchWeather(searchCity.trim());
      setSearchCity('');
    } finally {
      setIsSearching(false);
    }
  };

  const popularCities = ['London', 'Paris', 'Tokyo', 'New York', 'Milan', 'Mumbai', 'Sydney'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-1">
          <CloudSun className="w-3.5 h-3.5" />
          <span>Real-time Meteorological Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Weather & Daily Styling</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Live forecasts and actionable clothing recommendations for your local temperature and conditions.
        </p>
      </div>

      {/* City Search Bar & Quick Chips */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchCity}
              onChange={e => setSearchCity(e.target.value)}
              placeholder="Search global city (e.g. London, Tokyo, San Francisco)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isSearching ? 'Fetching...' : 'Get Forecast'}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500">Popular:</span>
          {popularCities.map(city => (
            <button
              key={city}
              onClick={() => fetchWeather(city)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Current Conditions Card */}
      {weather && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="text-5xl sm:text-6xl select-none">
                {weather.icon}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{weather.city}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold text-amber-400">{weather.tempC}°C</span>
                  <span className="text-sm text-slate-300 capitalize font-medium">• {weather.condition}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex gap-4">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[80px]">
                <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block uppercase">Humidity</span>
                <span className="text-sm font-bold text-white">{weather.humidity}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[80px]">
                <Wind className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block uppercase">Wind</span>
                <span className="text-sm font-bold text-white">{weather.windKph} km/h</span>
              </div>
            </div>
          </div>

          {/* Wardrobe Styling Advice Banner */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-semibold mb-0.5">What to wear today in {weather.city}:</strong>
                <p className="text-slate-300">{weather.advice}</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('outfits')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-md transition-all self-stretch sm:self-auto text-center"
            >
              Generate Matching Looks →
            </button>
          </div>

          {/* Multi-Day Forecast Strip */}
          {weather.forecast && weather.forecast.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Upcoming 3-Day Outlook
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {weather.forecast.map((fc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-white block">{fc.day}</span>
                      <span className="text-[11px] text-slate-400 capitalize">{fc.condition}</span>
                    </div>
                    <span className="text-sm font-bold text-amber-400">{fc.tempC}°C</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

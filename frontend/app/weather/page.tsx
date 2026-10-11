'use client';

import React, { useState } from 'react';
import { useWardrobe } from '@/lib/wardrobeContext';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  MapPin,
  Bookmark,
} from 'lucide-react';

const CITIES = [
  { name: 'Paris', temp: '16°C', condition: 'Partly Cloudy', humidity: '55%', wind: '14 km/h', icon: CloudSun },
  { name: 'London', temp: '12°C', condition: 'Light Rain', humidity: '82%', wind: '20 km/h', icon: CloudRain },
  { name: 'New York', temp: '18°C', condition: 'Sunny & Crisp', humidity: '42%', wind: '10 km/h', icon: Sun },
  { name: 'Milan', temp: '20°C', condition: 'Warm Breeze', humidity: '48%', wind: '8 km/h', icon: Sun },
  { name: 'Tokyo', temp: '17°C', condition: 'Breezy Autumn', humidity: '50%', wind: '16 km/h', icon: Wind },
  { name: 'Mumbai', temp: '30°C', condition: 'Humid & Sunny', humidity: '78%', wind: '12 km/h', icon: Sun },
];

const ACTIVITIES = [
  'Office Workday',
  'Weekend City Stroll',
  'Evening Gallery & Drinks',
  'Airport & Transit',
];

export default function WeatherOutfitPage() {
  const { items, saveOutfit } = useWardrobe();

  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(ACTIVITIES[0]);

  const activeCity = CITIES[selectedCityIndex];
  const WeatherIcon = activeCity.icon;

  // Generate weather fit based on selected temperature and activity
  const isColdOrRain = activeCity.temp.includes('12') || activeCity.condition.includes('Rain');
  const isWarm = parseInt(activeCity.temp) >= 22;

  // Select items from user collection
  const top = isWarm
    ? items.find((i) => i.id === 'CIA-TOP-004') || items[0]
    : items.find((i) => i.id === 'CIA-TOP-001') || items[0];

  const outer = isColdOrRain
    ? items.find((i) => i.id === 'CIA-OUT-001') // Trench coat
    : items.find((i) => i.id === 'CIA-OUT-002'); // Navy blazer

  const bot = isWarm
    ? items.find((i) => i.id === 'CIA-BOT-003') || items[1]
    : items.find((i) => i.id === 'CIA-BOT-001') || items[1];

  const shoe = isColdOrRain
    ? items.find((i) => i.id === 'CIA-FOT-001') // Chelsea boots
    : items.find((i) => i.id === 'CIA-FOT-002'); // White sneakers

  const handleSaveLook = () => {
    saveOutfit({
      id: `weather-look-${Date.now()}`,
      name: `${activeCity.name} ${selectedActivity} Edit`,
      occasion: selectedActivity.includes('Office') ? 'Office' : 'Casual day',
      stylePersona: 'Weather Optimized',
      topItem: top,
      bottomItem: bot,
      outerwearItem: outer,
      footwearItem: shoe,
      matchScore: 97,
      matchReason: `Calibrated specifically for ${activeCity.temp} ${activeCity.condition} in ${activeCity.name}. Breathable layering protects against humidity and unexpected breezes.`,
      createdAt: '2026-10-10',
      weatherFit: `${activeCity.temp} • ${activeCity.condition}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Meteorological Style Forecast</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Weather & Daily Outfit
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-light">
            Plan your day with precision. Layering recommendations adjusted for outdoor temperature, humidity, and your scheduled activities.
          </p>
        </div>

        <div className="text-xs text-neutral-500 bg-neutral-100 px-3.5 py-2 rounded-2xl">
          Simulated Weather API Sandbox
        </div>
      </div>

      {/* City & Activity Selector */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Select City Location
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CITIES.map((city, idx) => {
              const isSelected = selectedCityIndex === idx;
              const Icon = city.icon;
              return (
                <button
                  key={city.name}
                  onClick={() => setSelectedCityIndex(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`}
                    />
                    <span className="font-serif font-bold text-sm">{city.temp}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{city.name}</h4>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {city.condition}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity Pills */}
        <div className="pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Select Today&apos;s Activity
          </span>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map((act) => (
              <button
                key={act}
                onClick={() => setSelectedActivity(act)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  selectedActivity === act
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The Daily Weather & Outfit Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weather Status Card */}
        <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#0B0F19] to-[#121B2F] text-white p-6 sm:p-8 shadow-xl space-y-6 border border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <MapPin className="w-4 h-4" />
              <span>{activeCity.name}, Current Climate</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-neutral-400">Live</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-white">
                {activeCity.temp}
              </span>
              <WeatherIcon className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-base text-neutral-300 font-light">{activeCity.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-neutral-400 block">Humidity</span>
                <span className="font-bold text-white">{activeCity.humidity}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-neutral-400 block">Wind Speed</span>
                <span className="font-bold text-white">{activeCity.wind}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
            <strong className="block text-amber-300 mb-1">Layering Protocol:</strong>
            {isColdOrRain
              ? 'Transitional weather warning. Water-resistant outerwear recommended with leather footwear to navigate wet pavements.'
              : 'Mild thermal conditions. Natural cotton poplin or fine merino wool will keep you fresh from morning meetings through evening dinner.'}
          </div>
        </div>

        {/* Recommended Daily Outfit */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                Algorithmically Curated Fit
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-900">
                Today&apos;s Look for {selectedActivity}
              </h2>
            </div>

            <button
              onClick={handleSaveLook}
              className="px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold shadow-md flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save Today&apos;s Outfit</span>
            </button>
          </div>

          {/* Outfit Pieces Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {outer && (
              <div className="rounded-2xl p-2.5 bg-neutral-50 border border-neutral-200 text-left">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={outer.imageUrl}
                    alt={outer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase block">
                  Outerwear Layer
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                  {outer.name}
                </h4>
                <p className="text-[10px] text-neutral-500">{outer.fabric}</p>
              </div>
            )}

            {top && (
              <div className="rounded-2xl p-2.5 bg-neutral-50 border border-neutral-200 text-left">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={top.imageUrl}
                    alt={top.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase block">
                  Base Shirt
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                  {top.name}
                </h4>
                <p className="text-[10px] text-neutral-500">{top.colour}</p>
              </div>
            )}

            {bot && (
              <div className="rounded-2xl p-2.5 bg-neutral-50 border border-neutral-200 text-left">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bot.imageUrl}
                    alt={bot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase block">
                  Bottoms
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                  {bot.name}
                </h4>
                <p className="text-[10px] text-neutral-500">{bot.colour}</p>
              </div>
            )}

            {shoe && (
              <div className="rounded-2xl p-2.5 bg-neutral-50 border border-neutral-200 text-left">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shoe.imageUrl}
                    alt={shoe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase block">
                  Footwear
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                  {shoe.name}
                </h4>
                <p className="text-[10px] text-neutral-500">{shoe.brand || 'Leather'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

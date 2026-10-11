'use client';

import React, { useState } from 'react';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Occasion, WardrobeItem } from '@/lib/types';
import {
  Compass,
  Sparkles,
  Bookmark,
  Trash2,
} from 'lucide-react';

const OCCASIONS: Occasion[] = [
  'Office',
  'Casual day',
  'Party',
  'Travel',
  'College',
  'Wedding or special occasion',
];

const WEATHER_PRESETS = [
  'Mild Autumn (16°C – 20°C)',
  'Warm & Sunny (22°C – 28°C)',
  'Chilly & Rainy (10°C – 15°C)',
  'Cold Winter (2°C – 8°C)',
];

const STYLE_AESTHETICS = [
  'Quiet Luxury & Tailored',
  'Effortless Parisian Minimalist',
  'Contemporary Streetwear Luxe',
  'Monochromatic Architecture',
];

export default function OutfitPlannerPage() {
  const { savedOutfits, saveOutfit, deleteOutfit, generateOutfitsForOccasion } =
    useWardrobe();

  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('Office');
  const [selectedWeather, setSelectedWeather] = useState(WEATHER_PRESETS[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_AESTHETICS[0]);
  const [activeTab, setActiveTab] = useState<'generate' | 'saved'>('generate');

  // Generated outfits from user's wardrobe items
  const generatedOutfits = generateOutfitsForOccasion(
    selectedOccasion,
    selectedWeather,
    selectedStyle
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Smart Stylist Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Smart Outfit Matching
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-light">
            Zero decision fatigue every morning. Generates complete coordinated looks from your wardrobe based on occasion, weather, and color synergy.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'generate'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Outfit Studio
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'saved'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Saved Lookbook</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 text-[10px]">
              {savedOutfits.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'generate' ? (
        <div className="space-y-10">
          {/* Controls */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                1. Select Occasion
              </span>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      selectedOccasion === occ
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                  Weather & Temperature:
                </label>
                <select
                  value={selectedWeather}
                  onChange={(e) => setSelectedWeather(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium outline-none focus:border-neutral-900"
                >
                  {WEATHER_PRESETS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                  Style Mood & Persona:
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium outline-none focus:border-neutral-900"
                >
                  {STYLE_AESTHETICS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Generated Outfits */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900">
                  Recommended For {selectedOccasion}
                </h2>
                <p className="text-xs text-neutral-500">
                  Built using authentic pieces currently hanging in your wardrobe
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Wardrobe Owned
              </span>
            </div>

            <div className="space-y-8">
              {generatedOutfits.map((outfit, index) => (
                <div
                  key={outfit.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xl space-y-6"
                >
                  {/* Outfit Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-900 text-white">
                          Look {index + 1}
                        </span>
                        <span className="text-xs text-indigo-600 font-semibold">
                          {outfit.stylePersona}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                        {outfit.name}
                      </h3>
                      <p className="text-xs text-neutral-500">{outfit.weatherFit}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-lg font-serif font-bold text-emerald-600 block">
                          {outfit.matchScore}%
                        </span>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                          Harmonic Synergy
                        </span>
                      </div>

                      <button
                        onClick={() => saveOutfit(outfit)}
                        className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save Outfit</span>
                      </button>
                    </div>
                  </div>

                  {/* Wardrobe Items Magazine Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                    {outfit.topItem && (
                      <OutfitPieceCard label="Top Layer" item={outfit.topItem} />
                    )}
                    {outfit.dressItem && (
                      <OutfitPieceCard label="Statement Dress" item={outfit.dressItem} />
                    )}
                    {outfit.bottomItem && (
                      <OutfitPieceCard label="Bottoms" item={outfit.bottomItem} />
                    )}
                    {outfit.outerwearItem && (
                      <OutfitPieceCard label="Outerwear" item={outfit.outerwearItem} />
                    )}
                    {outfit.footwearItem && (
                      <OutfitPieceCard label="Footwear" item={outfit.footwearItem} />
                    )}
                    {outfit.bagItem && (
                      <OutfitPieceCard label="Handbag" item={outfit.bagItem} />
                    )}
                  </div>

                  {/* Why They Match Note */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-indigo-950">
                      <strong className="block font-bold mb-0.5">
                        Stylist Rationale: Why This Look Works
                      </strong>
                      <p className="leading-relaxed font-light">{outfit.matchReason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* SAVED LOOKBOOK TAB */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-neutral-900">
              Your Curated Lookbook ({savedOutfits.length})
            </h2>
          </div>

          {savedOutfits.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white border border-neutral-200 text-center space-y-4">
              <Bookmark className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-neutral-900">
                No outfits saved yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Generate matching outfits in the Outfit Studio and click &ldquo;Save Outfit&rdquo; to build your personal capsule lookbook.
              </p>
              <button
                onClick={() => setActiveTab('generate')}
                className="px-5 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition"
              >
                Go to Outfit Studio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedOutfits.map((look) => (
                <div
                  key={look.id}
                  className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-lg space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                          {look.occasion}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-neutral-900">
                          {look.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => deleteOutfit(look.id)}
                        className="text-neutral-400 hover:text-rose-600 transition p-1"
                        title="Delete look"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Pieces Mini Row */}
                    <div className="flex items-center gap-2 overflow-x-auto py-2">
                      {[
                        look.topItem,
                        look.bottomItem,
                        look.dressItem,
                        look.outerwearItem,
                        look.footwearItem,
                      ]
                        .filter(Boolean)
                        .map((piece, i) => (
                          <div
                            key={i}
                            className="w-14 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200"
                            title={piece?.name}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={piece?.imageUrl}
                              alt={piece?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {look.matchReason}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span>Saved on {look.createdAt}</span>
                    <span className="font-bold text-emerald-600">
                      {look.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OutfitPieceCard({ label, item }: { label: string; item: WardrobeItem }) {
  return (
    <div className="rounded-2xl p-2.5 bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between text-left group hover:bg-white hover:shadow-md transition">
      <div>
        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-neutral-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          {label}
        </span>
        <h4 className="text-xs font-semibold text-neutral-900 truncate mt-0.5">
          {item.name}
        </h4>
        <p className="text-[10px] text-neutral-500 truncate">{item.colour}</p>
      </div>
      <div className="mt-2 pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[10px] text-neutral-400">
        <span>{item.brand || 'Atelier'}</span>
        <span className="text-emerald-600 font-semibold">Owned</span>
      </div>
    </div>
  );
}

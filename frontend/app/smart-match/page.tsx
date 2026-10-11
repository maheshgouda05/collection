'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useWardrobe } from '@/lib/wardrobeContext';
import { WardrobeItem, Occasion, Outfit, ShopItem } from '@/lib/types';
import { matcherService } from '@/lib/services/matcherService';
import { shoppingService, ShoppingFilterOptions } from '@/lib/services/shoppingService';
import { weatherService, WeatherCondition } from '@/lib/services/weatherService';
import {
  Compass,
  Sparkles,
  ShoppingBag,
  Heart,
  Bookmark,
  RefreshCw,
  Layers,
  CloudSun,
  Filter,
  Eye,
  Check,
  ExternalLink,
  Info,
  AlertTriangle,
  ChevronRight,
  X,
  Plus,
} from 'lucide-react';

const OCCASIONS: Occasion[] = [
  'Office',
  'Casual day',
  'Party',
  'College',
  'Travel',
  'Wedding or special occasion',
  'Other',
];

const WEATHER_PRESETS = [
  'Mild Autumn (16°C – 20°C)',
  'Warm & Sunny (22°C – 28°C)',
  'Chilly & Rainy (10°C – 15°C)',
  'Cold Winter (2°C – 8°C)',
  'All Season Ambient',
];

const STYLE_AESTHETICS = [
  'Quiet Luxury & Tailored',
  'Effortless Parisian Minimalist',
  'Contemporary Streetwear Luxe',
  'Monochromatic Architecture',
  'Casual College Chic',
];

const COLOR_PREFERENCES = [
  'All Harmonious Combinations',
  'Neutral Contrast (White & Black/Navy)',
  'Warm Earth Tones (Camel, Beige & Cream)',
  'Monochromatic Single-Tone',
];

export default function SmartMatchPage() {
  const {
    items,
    savedOutfits,
    saveOutfit,
    deleteOutfit,
    showToast,
  } = useWardrobe();

  // Active View Tab: Matcher vs Shop Matching vs Saved Lookbook
  const [activeTab, setActiveTab] = useState<'match' | 'shop' | 'saved'>('match');

  // Matcher Inputs
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('Office');
  const [anchorItemId, setAnchorItemId] = useState<string>('none');
  const [selectedWeather, setSelectedWeather] = useState<string>(WEATHER_PRESETS[0]);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLE_AESTHETICS[0]);
  const [colorPref, setColorPref] = useState<string>(COLOR_PREFERENCES[0]);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Detail Modal
  const [detailedOutfitModal, setDetailedOutfitModal] = useState<Outfit | null>(null);

  // Shop Matching Items State
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [shopColor, setShopColor] = useState<string>('All');
  const [shopBudget, setShopBudget] = useState<number>(350);
  const [shopStyle, setShopStyle] = useState<string>('All');
  const [shopItemsList, setShopItemsList] = useState<ShopItem[]>([]);
  const [loadingShop, setLoadingShop] = useState(false);

  // Weather Condition integration
  const [liveWeather, setLiveWeather] = useState<WeatherCondition | null>(null);

  useEffect(() => {
    weatherService.getForecast('Paris').then(setLiveWeather);
  }, []);

  // Fetch Sample Shop Items
  useEffect(() => {
    let cancelled = false;
    setLoadingShop(true);
    shoppingService
      .getMatchingItemsForGap(shopCategory === 'All' ? undefined : shopCategory, items, {
        category: shopCategory === 'All' ? undefined : shopCategory,
        colour: shopColor === 'All' ? undefined : shopColor,
        maxBudget: shopBudget,
        style: shopStyle === 'All' ? undefined : shopStyle,
      })
      .then((res) => {
        if (!cancelled) {
          setShopItemsList(res);
          setLoadingShop(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [shopCategory, shopColor, shopBudget, shopStyle, items]);

  // Selected Anchor Item object
  const anchorItem = useMemo(() => {
    if (anchorItemId === 'none') return undefined;
    return items.find((i) => i.id === anchorItemId);
  }, [items, anchorItemId]);

  // Generated Outfits
  const generatedOutfits = useMemo(() => {
    if (!items.length) return [];
    const results = matcherService.generateOutfits(items, {
      anchorItem,
      occasion: selectedOccasion,
      weatherFilter: selectedWeather,
      stylePreference: selectedStyle,
    });

    // If shuffled, randomize order slightly
    if (shuffleKey > 0) {
      return [...results].reverse();
    }
    return results;
  }, [items, anchorItem, selectedOccasion, selectedWeather, selectedStyle, shuffleKey]);

  // Wardrobe Gaps detected
  const detectedGaps = useMemo(() => {
    return shoppingService.detectWardrobeGaps(items);
  }, [items]);

  const isSaved = (outfitId: string) => savedOutfits.some((o) => o.id === outfitId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Smart Matcher & Wardrobe Synergy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Smart Matcher
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-light">
            Match clothes you already own. Assemble complete coordinated outfits based on occasion, color harmony, and weather without buying duplicates.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('match')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'match'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Match My Closet
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'shop'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
            <span>Shop Missing Pieces</span>
            {detectedGaps.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Saved Outfits</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 text-[10px]">
              {savedOutfits.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: MATCH CLOSET */}
      {activeTab === 'match' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Input Controls Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  Outfit Parameters
                </h3>
              </div>
              <button
                onClick={() => setShuffleKey((k) => k + 1)}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Another Combination</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option A: Pick Specific Item from Closet */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  1. Anchor Around an Item <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={anchorItemId}
                  onChange={(e) => setAnchorItemId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
                >
                  <option value="none">✨ Any Item (Full Closet Synthesis)</option>
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.colour} • {i.category})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Choose a specific shirt, trousers or dress you want to wear today.
                </p>
              </div>

              {/* Option B: Choose Occasion */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  2. Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value as Occasion)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Filters by formal standards, ease of movement, and social context.
                </p>
              </div>

              {/* Option C: Weather */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  3. Weather & Temperature
                </label>
                <select
                  value={selectedWeather}
                  onChange={(e) => setSelectedWeather(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
                >
                  {WEATHER_PRESETS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {liveWeather && (
                  <p className="text-[10px] text-cyan-600 mt-1 font-medium">
                    Live reference: {liveWeather.city} {liveWeather.tempFormatted} ({liveWeather.condition})
                  </p>
                )}
              </div>
            </div>

            {/* Additional Preferences Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-neutral-100">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Style Aesthetic & Dress Code
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
                >
                  {STYLE_AESTHETICS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Colour Coordination Rules
                </label>
                <select
                  value={colorPref}
                  onChange={(e) => setColorPref(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
                >
                  {COLOR_PREFERENCES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  Recommended Combinations ({generatedOutfits.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Rule-based compatibility scores evaluating silhouette, palette harmony, and occasion context.
                </p>
              </div>

              {detectedGaps.length > 0 && (
                <button
                  onClick={() => setActiveTab('shop')}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Detected Gaps ({detectedGaps.join(', ')})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Empty State */}
            {generatedOutfits.length === 0 ? (
              <div className="p-16 rounded-3xl bg-white border border-neutral-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <Layers className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-neutral-900">
                    Cannot form a complete outfit
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                    Your collection needs complementary pieces to complete this look. For example, add trousers or shoes to pair with your tops.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    href="/collection"
                    className="px-5 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition"
                  >
                    + Add Missing Items to Collection
                  </Link>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="px-5 py-2.5 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition cursor-pointer"
                  >
                    Shop Matching Pieces
                  </button>
                </div>
              </div>
            ) : (
              /* Outfits Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {generatedOutfits.map((outfit) => {
                  const saved = isSaved(outfit.id);

                  // Extract all pieces in this outfit
                  const pieces = [
                    outfit.dressItem,
                    outfit.topItem,
                    outfit.bottomItem,
                    outfit.outerwearItem,
                    outfit.footwearItem,
                    outfit.bagItem,
                    outfit.accessoryItem,
                  ].filter(Boolean) as WardrobeItem[];

                  return (
                    <div
                      key={outfit.id}
                      className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-6"
                    >
                      {/* Outfit Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white">
                              {outfit.occasion}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-50 text-cyan-800">
                              {outfit.matchScore}% Match
                            </span>
                          </div>
                          <h4 className="font-serif text-xl font-bold text-neutral-900">
                            {outfit.name}
                          </h4>
                          <p className="text-xs text-neutral-500">{outfit.stylePersona}</p>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => {
                            if (saved) {
                              deleteOutfit(outfit.id);
                            } else {
                              saveOutfit(outfit);
                            }
                          }}
                          className={`p-2.5 rounded-2xl border transition cursor-pointer ${
                            saved
                              ? 'bg-rose-50 border-rose-200 text-rose-600'
                              : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-500'
                          }`}
                          title={saved ? 'Saved in lookbook' : 'Save as favourite'}
                        >
                          <Bookmark className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Item Photo Showcase */}
                      <div className="grid grid-cols-4 gap-2">
                        {pieces.slice(0, 4).map((p) => (
                          <div
                            key={p.id}
                            className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 relative group"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[9px] text-white font-medium truncate">
                              {p.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Match Analysis Breakdown */}
                      <div className="space-y-3 text-xs">
                        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-700 space-y-1.5">
                          <p className="leading-relaxed">
                            <strong>Why it matches:</strong> {outfit.matchReason}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            <strong>Suitability:</strong> {outfit.occasionSuitability}
                          </p>
                          {outfit.weatherFit && (
                            <p className="text-[11px] text-cyan-700 flex items-center gap-1">
                              <CloudSun className="w-3 h-3 shrink-0" />
                              <span>{outfit.weatherFit}</span>
                            </p>
                          )}
                        </div>

                        {/* Missing items or optional improvements */}
                        {outfit.missingItems && outfit.missingItems.length > 0 && (
                          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>Missing piece:</strong> {outfit.missingItems.join(', ')}.
                              <button
                                onClick={() => setActiveTab('shop')}
                                className="underline ml-1 font-semibold hover:text-amber-950 cursor-pointer"
                              >
                                View shop recommendations
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setDetailedOutfitModal(outfit)}
                          className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Look</span>
                        </button>
                        <button
                          onClick={() => {
                            if (saved) {
                              deleteOutfit(outfit.id);
                            } else {
                              saveOutfit(outfit);
                            }
                          }}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            saved
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-neutral-900 hover:bg-black text-white'
                          }`}
                        >
                          {saved ? 'Saved in Lookbook' : 'Save as Favourite'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SHOP MATCHING ITEMS */}
      {activeTab === 'shop' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header & Purpose Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Smart Wardrobe Completion • Avoid Unnecessary Purchases</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">
              Buy Only What Completes Your Existing Closet
            </h3>
            <p className="text-xs text-neutral-600 max-w-3xl leading-relaxed">
              These sample curated pieces are matched directly against what is already in your wardrobe. Rather than buying duplicate items on impulse, these targeted essentials unlock maximum new outfit combinations.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-neutral-200 text-[11px] font-medium text-neutral-600">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>Sample mock recommendations with simulated external links. No live retail affiliate transactions.</span>
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <Filter className="w-4 h-4" />
              <span>Filter Missing Pieces</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-neutral-500 mb-1">Category</label>
                <select
                  value={shopCategory}
                  onChange={(e) => setShopCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 outline-none"
                >
                  <option value="All">All Missing Categories</option>
                  <option value="Footwear">Footwear / Shoes</option>
                  <option value="Bottoms">Trousers / Bottoms</option>
                  <option value="Outerwear">Outerwear / Blazers</option>
                  <option value="Accessories">Accessories & Scarves</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Colour Palette</label>
                <select
                  value={shopColor}
                  onChange={(e) => setShopColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 outline-none"
                >
                  <option value="All">All Colours</option>
                  <option value="Black">Black</option>
                  <option value="Camel">Camel / Tan</option>
                  <option value="Beige">Stone Beige</option>
                  <option value="White">Off-White / Ecru</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Style Tone</label>
                <select
                  value={shopStyle}
                  onChange={(e) => setShopStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 outline-none"
                >
                  <option value="All">All Styles</option>
                  <option value="Tailored">Tailored Formal</option>
                  <option value="Quiet Luxury">Quiet Luxury</option>
                  <option value="Casual Chic">Casual Chic</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <span>Max Budget</span>
                  <span className="font-bold text-neutral-900">${shopBudget}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={400}
                  step={10}
                  value={shopBudget}
                  onChange={(e) => setShopBudget(parseInt(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Shop Products Grid */}
          {loadingShop ? (
            <div className="p-12 text-center text-xs text-neutral-500">
              Evaluating closet gap matches...
            </div>
          ) : shopItemsList.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-neutral-200 text-center space-y-3">
              <p className="font-serif text-lg font-bold text-neutral-900">
                No matching gap pieces in this budget or filter range
              </p>
              <button
                onClick={() => {
                  setShopCategory('All');
                  setShopColor('All');
                  setShopBudget(350);
                  setShopStyle('All');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItemsList.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Image Area */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 relative mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 font-serif font-bold text-xs shadow-sm">
                        ${product.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider block">
                        Fills {product.gapCategory} Gap
                      </span>
                      <h4 className="font-serif text-lg font-bold text-neutral-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {product.colour} • {product.style}
                      </p>
                    </div>

                    {/* Synergy explanation */}
                    <div className="mt-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-900 block mb-0.5">Why it matches your clothes:</strong>
                      {product.matchReason}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm hover:scale-[1.02]"
                    >
                      <span>Shop Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED LOOKBOOK */}
      {activeTab === 'saved' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-serif text-2xl font-bold text-neutral-900">
              Saved Outfits ({savedOutfits.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Curated outfits bookmarked for quick dressing inspiration.
            </p>
          </div>

          {savedOutfits.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white border border-neutral-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-neutral-900">
                  Your lookbook is currently empty
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Click the bookmark icon on any combination in Smart Matcher to save it here for instant reference.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('match')}
                className="px-5 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition cursor-pointer"
              >
                Explore Combinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white inline-block mb-1">
                        {outfit.occasion}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-neutral-900">
                        {outfit.name}
                      </h4>
                      <p className="text-xs text-neutral-500">{outfit.stylePersona}</p>
                    </div>

                    <button
                      onClick={() => deleteOutfit(outfit.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-2xl">
                    {outfit.matchReason}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="font-semibold text-cyan-700">
                      {outfit.matchScore}% Match Score
                    </span>
                    <button
                      onClick={() => setDetailedOutfitModal(outfit)}
                      className="text-neutral-900 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Pieces</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FULL LOOK DETAIL MODAL */}
      {detailedOutfitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white inline-block mb-1">
                  {detailedOutfitModal.occasion}
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  {detailedOutfitModal.name}
                </h3>
                <p className="text-xs text-neutral-500">{detailedOutfitModal.stylePersona}</p>
              </div>
              <button
                onClick={() => setDetailedOutfitModal(null)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pieces Showcase */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                Outfit Components from Your Closet:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  detailedOutfitModal.dressItem,
                  detailedOutfitModal.topItem,
                  detailedOutfitModal.bottomItem,
                  detailedOutfitModal.outerwearItem,
                  detailedOutfitModal.footwearItem,
                  detailedOutfitModal.bagItem,
                  detailedOutfitModal.accessoryItem,
                ]
                  .filter(Boolean)
                  .map((piece) => (
                    <div
                      key={piece!.id}
                      className="p-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-neutral-200 mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={piece!.imageUrl}
                          alt={piece!.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-semibold text-neutral-900 truncate">
                        {piece!.name}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {piece!.category} • {piece!.colour}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Rationales */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2 text-xs">
              <p>
                <strong>Styling Synergy:</strong> {detailedOutfitModal.matchReason}
              </p>
              <p>
                <strong>Occasion Suitability:</strong> {detailedOutfitModal.occasionSuitability}
              </p>
              {detailedOutfitModal.weatherFit && (
                <p>
                  <strong>Weather Suitability:</strong> {detailedOutfitModal.weatherFit}
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setDetailedOutfitModal(null)}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Category, ShoppingComparisonResult } from '@/lib/types';
import { MALL_SHOPPING_PRESETS } from '@/lib/mockData';
import {
  ShoppingBag,
  Sparkles,
  Camera,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Check,
  Layers,
  Compass,
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Footwear',
  'Bags',
  'Accessories',
  'Jewellery',
];

export default function CheckBeforeYouBuyPage() {
  const { items, checkShoppingItem, addItem, showToast } = useWardrobe();

  // Form State for the item being tested
  const [candidateName, setCandidateName] = useState('Oversized Washed Denim Jacket');
  const [candidateCategory, setCandidateCategory] = useState<Category>('Outerwear');
  const [candidateColour, setCandidateColour] = useState('Light Faded Indigo Blue');
  const [candidateBrand, setCandidateBrand] = useState('Zara Studio');
  const [candidatePrice, setCandidatePrice] = useState<number>(89);
  const [candidateFabric, setCandidateFabric] = useState('100% Rigid Cotton Denim');
  const [candidateStore, setCandidateStore] = useState('Zara, Westfield Mall');
  const [candidateImage, setCandidateImage] = useState<string>(
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80'
  );

  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'upload'>('presets');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [addedToWardrobeSuccess, setAddedToWardrobeSuccess] = useState(false);

  // Generate comparison result dynamically from wardrobe data
  const comparisonResult: ShoppingComparisonResult = checkShoppingItem({
    name: candidateName,
    category: candidateCategory,
    colour: candidateColour,
    brand: candidateBrand,
    price: candidatePrice,
    fabric: candidateFabric,
    imageUrl: imagePreviewUrl || candidateImage,
    storeName: candidateStore,
  });

  const handleSelectPreset = (preset: (typeof MALL_SHOPPING_PRESETS)[0]) => {
    setCandidateName(preset.name);
    setCandidateCategory(preset.category);
    setCandidateColour(preset.colour);
    setCandidateBrand(preset.brand);
    setCandidatePrice(preset.price);
    setCandidateFabric(preset.fabric);
    setCandidateStore(preset.storeName);
    setCandidateImage(preset.imageUrl);
    setImagePreviewUrl(null);
    setAddedToWardrobeSuccess(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
      setCandidateImage(url);
      showToast('Photo uploaded from your shopping session');
    }
  };

  const handleBuyAndAdd = () => {
    addItem({
      name: candidateName,
      category: candidateCategory,
      colour: candidateColour,
      colorFamily: candidateColour.toLowerCase().includes('white')
        ? 'white'
        : candidateColour.toLowerCase().includes('blue')
        ? 'blue'
        : 'other',
      size: 'Standard',
      fabric: candidateFabric || 'Mixed Blend',
      brand: candidateBrand,
      price: candidatePrice,
      imageUrl: imagePreviewUrl || candidateImage,
      notes: `Purchased at ${candidateStore}. Verified with Shopping Assistant.`,
      tags: ['newly-bought', 'mall-purchase'],
      seasons: ['All Season'],
      condition: 'New',
    });
    setAddedToWardrobeSuccess(true);
  };

  // Color coding for verdict badge
  const isHighDuplication = comparisonResult.verdict === 'Do Not Buy (High Duplication)';
  const isConsider = comparisonResult.verdict === 'Consider (Moderate Need)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mall Shopping Shield</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Do I Already Own This?
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-2xl font-light">
            Standing in front of a rack in a shopping mall? Check your digital wardrobe in seconds. Discover if you already own duplicates, check what matches, and see if it fills a genuine wardrobe gap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/collection"
            className="px-4 py-2.5 rounded-2xl bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Layers className="w-4 h-4" />
            <span>Browse My {items.length} Items</span>
          </Link>
        </div>
      </div>

      {/* INPUT MODE TOGGLE TABS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Select Or Input The Shopping Mall Item
          </span>
          <span className="text-xs text-neutral-500">
            Attribute-matching against active wardrobe
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'presets'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Quick Mall Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'upload'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload Mall Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'custom'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Custom Item Entry</span>
          </button>
        </div>

        {/* Tab 1: Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {MALL_SHOPPING_PRESETS.map((preset) => {
              const isSelected = candidateName === preset.name;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-500/20'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.imageUrl}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 block">
                      ${preset.price} • {preset.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                      {preset.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                      {preset.colour}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Upload Photo */}
        {activeTab === 'upload' && (
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <label className="cursor-pointer border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/30 hover:bg-rose-50/60 transition p-6 rounded-2xl flex flex-col items-center justify-center text-center w-full sm:w-64 shrink-0">
                <Camera className="w-8 h-8 text-rose-500 mb-2" />
                <span className="text-xs font-bold text-neutral-900">Take or Upload Photo</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG, or Camera stream</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Item Description / Name Seen on Tag:
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Vintage Leather Biker Jacket"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Category:
                    </label>
                    <select
                      value={candidateCategory}
                      onChange={(e) => setCandidateCategory(e.target.value as Category)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:border-neutral-900 outline-none bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Colour:
                    </label>
                    <input
                      type="text"
                      value={candidateColour}
                      onChange={(e) => setCandidateColour(e.target.value)}
                      placeholder="e.g. Midnight Black"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Custom Item Entry Form */}
        {activeTab === 'custom' && (
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Item Name:
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Category:
              </label>
              <select
                value={candidateCategory}
                onChange={(e) => setCandidateCategory(e.target.value as Category)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Colour:
              </label>
              <input
                type="text"
                value={candidateColour}
                onChange={(e) => setCandidateColour(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Brand / Store:
              </label>
              <input
                type="text"
                value={candidateBrand}
                onChange={(e) => setCandidateBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        )}
      </div>

      {/* DUAL COMPARISON SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Candidate Mall Piece */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xl space-y-6 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Mall Candidate Item
              </span>
            </div>
            <span className="text-xs font-semibold text-neutral-500">
              {candidateStore}
            </span>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreviewUrl || candidateImage}
              alt={candidateName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ${candidatePrice}
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {candidateCategory}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-neutral-900">
              {candidateName}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-medium">
                Brand: <strong>{candidateBrand || 'Unknown'}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-medium">
                Colour: <strong>{candidateColour}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-medium">
                Fabric: <strong>{candidateFabric}</strong>
              </span>
            </div>
          </div>

          <div className="pt-2">
            {addedToWardrobeSuccess ? (
              <div className="w-full py-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Successfully Added to Your Wardrobe!</span>
              </div>
            ) : (
              <button
                onClick={handleBuyAndAdd}
                className="w-full py-3.5 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Decided to Buy? Add Directly to My Wardrobe</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Matching Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* VERDICT CARD */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
              isHighDuplication
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : isConsider
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 backdrop-blur-sm shadow-sm">
                  {isHighDuplication ? (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  ) : isConsider ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>{comparisonResult.verdict}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  {isHighDuplication
                    ? 'You may not need another one.'
                    : isConsider
                    ? 'Similar items already found in closet.'
                    : 'Fills a verified gap in your wardrobe!'}
                </h2>
              </div>

              {/* Score Badge */}
              <div className="shrink-0 text-center">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-white font-serif font-bold text-xl sm:text-2xl shadow-lg ${
                    isHighDuplication
                      ? 'bg-gradient-to-br from-rose-500 to-rose-700'
                      : isConsider
                      ? 'bg-gradient-to-br from-amber-500 to-amber-700'
                      : 'bg-gradient-to-br from-emerald-500 to-teal-700'
                  }`}
                >
                  <span>{comparisonResult.verdictScore}%</span>
                  <span className="text-[9px] font-sans uppercase font-medium tracking-wider opacity-80">
                    Synergy
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-black/10 space-y-3">
              <p className="text-sm font-medium leading-relaxed">
                {comparisonResult.verdictReason}
              </p>
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm text-xs leading-relaxed font-normal shadow-sm">
                <strong className="block font-bold mb-1">Personal Stylist Note:</strong>
                {comparisonResult.shoppingAdvice}
              </div>
            </div>
          </div>

          {/* SIMILAR ITEMS */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900">
                  Already In Your Wardrobe
                </h3>
                <p className="text-xs text-neutral-500">
                  Items you own in the same category & color spectrum
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {comparisonResult.similarItems.length} Similar Found
              </span>
            </div>

            {comparisonResult.similarItems.length === 0 ? (
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-emerald-900">
                  No direct duplicates found in your wardrobe!
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  You don&apos;t currently own a similar piece in this category and shade.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {comparisonResult.similarItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-rose-600 block uppercase">
                        Already Owned
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {item.colour} • {item.brand || 'Your piece'}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Worn {item.timesWorn} times (${item.price || 0})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAIRING MATRIX */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900">
                  Works With Items In Your Closet
                </h3>
                <p className="text-xs text-neutral-500">
                  Compatible pieces you own that pair seamlessly with this item
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono">
                {comparisonResult.matchingPairItems.length} Pairs Ready
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {comparisonResult.matchingPairItems.map((pair) => (
                <div
                  key={pair.id}
                  className="group rounded-2xl p-2.5 border border-neutral-100 bg-neutral-50/60 hover:bg-white hover:border-neutral-200 transition text-left"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pair.imageUrl}
                      alt={pair.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    {pair.category}
                  </span>
                  <h4 className="text-xs font-semibold text-neutral-900 truncate">
                    {pair.name}
                  </h4>
                  <p className="text-[10px] text-neutral-500 truncate">{pair.colour}</p>
                </div>
              ))}
            </div>
          </div>

          {/* POTENTIAL OUTFITS UNLOCKED */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#121B2F] text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-serif font-bold text-white">
                  Could Complete {comparisonResult.potentialOutfitsCount} New Outfits
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-300">
                Formula Verified
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              If added to your collection, this item fits immediately into:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-bold text-rose-300 uppercase block">
                  Look 1: Smart Casual Layering
                </span>
                <p className="text-xs text-white font-medium mt-1">
                  This piece + Your Poplin Shirt + Charcoal Wide-Leg Trousers + Minimalist Sneakers
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-bold text-indigo-300 uppercase block">
                  Look 2: Weekend Transit
                </span>
                <p className="text-xs text-white font-medium mt-1">
                  This piece + Breton Striped Top + Vintage Selvedge Jeans + Chelsea Boots
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-400">Harmonizing Palette:</span>
              {comparisonResult.complementaryColours.map((col) => (
                <span
                  key={col}
                  className="px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-medium text-white"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

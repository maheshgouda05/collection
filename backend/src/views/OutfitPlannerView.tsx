import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Trash2, 
  Layers, 
  CloudSun, 
  AlertTriangle, 
  Check, 
  ChevronRight,
  Shirt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { matcherService, RecommendedOutfit } from '../lib/services/matcherService.ts';
import type { WardrobeItem } from '../lib/types.ts';

export const OutfitPlannerView: React.FC = () => {
  const { items, weather, savedOutfits, saveOutfit, deleteOutfit } = useWardrobe();

  const [activeTab, setActiveTab] = useState<'generate' | 'lookbook'>('generate');
  const [selectedAnchorId, setSelectedAnchorId] = useState<string>('');
  const [occasion, setOccasion] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendedOutfits, setRecommendedOutfits] = useState<RecommendedOutfit[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [missingNotice, setMissingNotice] = useState<string[]>([]);
  const [savedIdList, setSavedIdList] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setMissingNotice([]);

    try {
      const res = await matcherService.generateRecommendations({
        anchorItemId: selectedAnchorId || undefined,
        occasion,
        weatherTemp: weather ? weather.tempC : 22,
      });

      if (!res.success) {
        setErrorMessage(res.message || 'Unable to generate outfits.');
        if (res.missingCategories) {
          setMissingNotice(res.missingCategories);
        }
      } else {
        setRecommendedOutfits(res.outfits);
        if (res.outfits[0]?.missingCategories?.length > 0) {
          setMissingNotice(res.outfits[0].missingCategories);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Smart matching failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOutfit = async (outfit: RecommendedOutfit) => {
    try {
      await saveOutfit({
        name: outfit.name,
        occasion: outfit.occasion,
        itemIds: outfit.itemIds,
        matchScore: outfit.matchScore,
        explanation: outfit.explanation,
        weatherContext: weather ? { tempC: weather.tempC, condition: weather.condition, city: weather.city } : undefined,
      });

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
      });

      setSavedIdList(prev => [...prev, outfit.name]);
    } catch (err: any) {
      alert(err.message || 'Failed to save outfit');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Harmonious Algorithmic Pairing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Outfit Planner & Lookbook</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build coordinated looks using only items in your collection, tailored to current weather and occasions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'generate' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Smart Matcher
          </button>
          <button
            onClick={() => setActiveTab('lookbook')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'lookbook' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Lookbook ({savedOutfits.length})
          </button>
        </div>
      </div>

      {activeTab === 'generate' ? (
        <div className="space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Optional Anchor Garment */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Anchor Garment (Optional)</label>
                <select
                  value={selectedAnchorId}
                  onChange={e => setSelectedAnchorId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="">-- Auto-select from Wardrobe --</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.category} • {item.colour})
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Occasion</label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 capitalize"
                >
                  <option value="casual">Casual Outing</option>
                  <option value="college">College / University</option>
                  <option value="office">Office / Professional</option>
                  <option value="party">Party / Night Out</option>
                  <option value="date">Date Night</option>
                  <option value="formal">Formal Event</option>
                </select>
              </div>

              {/* Weather Context Indicator */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Weather Context</label>
                <div className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{weather ? `${weather.city}: ${weather.tempC}°C` : 'Standard (22°C)'}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 capitalize">{weather?.condition || 'Clear'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || items.length === 0}
              className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-rose-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <span>Evaluating Wardrobe Harmony...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Coordinated Outfits</span>
                </>
              )}
            </button>
          </div>

          {/* Error / Empty Wardrobe Alert */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Missing Category Gap Warning */}
          {missingNotice.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <strong className="block text-white font-semibold">Wardrobe Gap Identified:</strong>
                <span>
                  To complete this ensemble, you are currently missing owned items in: {' '}
                  <strong className="text-rose-400 underline capitalize">{missingNotice.join(', ')}</strong>.
                  Consider checking before you buy or adding items to those categories.
                </span>
              </div>
            </div>
          )}

          {/* Recommended Outfits Cards */}
          <div className="space-y-6">
            {recommendedOutfits.map((outfit, idx) => {
              const isSaved = savedIdList.includes(outfit.name);
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{outfit.name}</h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 capitalize">
                          {outfit.occasion}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{outfit.explanation}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Match Score</span>
                        <span className="text-xl font-extrabold text-emerald-400">{outfit.matchScore}%</span>
                      </div>

                      <button
                        onClick={() => handleSaveOutfit(outfit)}
                        disabled={isSaved}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                        }`}
                      >
                        {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        <span>{isSaved ? 'Saved to Lookbook' : 'Save Outfit'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Garment Lineup Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {outfit.items.map(item => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between group"
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 mb-2">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase text-rose-400 block">
                            {item.category}
                          </span>
                          <span className="text-xs font-medium text-white truncate block">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-500 capitalize">
                            {item.colour} • {item.size}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Weather Suitability Note */}
                  <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 flex items-center gap-2">
                    <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Weather Suitability:</strong> {outfit.weatherSuitability}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Saved Lookbook Tab */
        <div className="space-y-6">
          {savedOutfits.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Your Lookbook is Empty</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                Generate outfits in the Smart Matcher and save your favorite styled looks here for quick morning decisions.
              </p>
              <button
                onClick={() => setActiveTab('generate')}
                className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md"
              >
                Go to Smart Matcher
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedOutfits.map(outfit => (
                <div
                  key={outfit.id}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-white text-base">{outfit.name}</h3>
                        <span className="text-[11px] text-slate-400 capitalize">
                          Occasion: <strong className="text-slate-200">{outfit.occasion}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => deleteOutfit(outfit.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Delete look"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mb-4">{outfit.explanation}</p>

                    {/* Pieces Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {(outfit.items || []).map(item => (
                        <div key={item.id} className="aspect-square rounded-xl overflow-hidden bg-slate-950 relative group">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 flex flex-col justify-end text-[10px] text-white">
                            <span className="font-bold truncate">{item.name}</span>
                            <span className="text-slate-300 capitalize">{item.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <span>Match Score: <strong className="text-emerald-400">{outfit.matchScore}%</strong></span>
                    <span>{new Date(outfit.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

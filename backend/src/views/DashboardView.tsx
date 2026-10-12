import React from 'react';
import { 
  Shirt, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  DollarSign, 
  Heart, 
  CloudSun, 
  ArrowRight,
  TrendingUp,
  Bot
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { WardrobeCard } from '../components/WardrobeCard.tsx';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, items, stats, weather, savedOutfits } = useWardrobe();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Wardrobe & 3D Styling</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {user ? `Welcome back, ${user.fullName}!` : 'Collection It All — Ward Room'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Digitize your wardrobe, inspect your 3D body model preview, receive weather-tailored daily outfit recommendations, and consult your personal Gemini fashion stylist.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('add-dress')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/20 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Garment</span>
            </button>
            <button
              onClick={() => onNavigate('outfits')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Today's Outfit</span>
            </button>
            <button
              onClick={() => onNavigate('assistant')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 shadow-md transition-all"
            >
              <Bot className="w-4 h-4 text-rose-400" />
              <span>Ask AI Stylist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics & Analytics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Garments */}
        <div 
          onClick={() => onNavigate('collection')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Garments</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Shirt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
            {stats?.totalItems ?? items.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
            <span>View wardrobe collection</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Closet Valuation */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Closet Valuation</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
            ${(stats?.totalValue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400">
            Tracked investment
          </div>
        </div>

        {/* Favourites */}
        <div 
          onClick={() => onNavigate('collection')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Curated Favourites</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
            {stats?.favouriteCount ?? items.filter(i => i.isFavourite).length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Quick-grab staples
          </div>
        </div>

        {/* Saved Lookbook Outfits */}
        <div 
          onClick={() => onNavigate('outfits')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Saved Lookbook</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
            {savedOutfits.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Ready-to-wear combos
          </div>
        </div>
      </div>

      {/* Weather Dressing Advice Card */}
      {weather && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl shadow-inner">
              {weather.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{weather.city}</span>
                <span className="text-sm font-semibold text-amber-400">• {weather.tempC}°C</span>
                <span className="text-xs text-slate-400 capitalize">({weather.condition})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {weather.advice}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('weather')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition-colors whitespace-nowrap self-stretch md:self-auto text-center"
          >
            Detailed Weather Forecast →
          </button>
        </div>
      )}

      {/* Wardrobe Category Distribution */}
      {stats && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Wardrobe Composition</h2>
              <p className="text-xs text-slate-400">Garment breakdown across primary categories</p>
            </div>
            <button
              onClick={() => onNavigate('collection')}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Browse All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(stats.categoryCounts).map(([cat, count]) => {
              const total = stats.totalItems || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-400 capitalize block">{cat}</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-white">{count}</span>
                    <span className="text-[10px] text-slate-500">{pct}%</span>
                  </div>
                  <div className="mt-2 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recently Added Garments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recently Added Pieces</h2>
            <p className="text-xs text-slate-400">Latest additions to your wardrobe catalog</p>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            View Full Wardrobe →
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800/80">
            <Shirt className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">Your Wardrobe is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
              Start by photographing or uploading your dresses, tops, shoes, and accessories to unlock intelligent outfit pairings and 3D preview.
            </p>
            <button
              onClick={() => onNavigate('add-dress')}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Add Your First Garment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.slice(0, 5).map(item => (
              <WardrobeCard key={item.id} item={item} onTryOn={() => onNavigate('my-model')} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

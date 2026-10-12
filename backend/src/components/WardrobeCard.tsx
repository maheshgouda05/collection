import React from 'react';
import { Heart, Trash2, CheckCircle2, Sparkles, Tag, Eye } from 'lucide-react';
import type { WardrobeItem } from '../lib/types.ts';
import { useWardrobe } from '../lib/wardrobeContext.tsx';

interface WardrobeCardProps {
  item: WardrobeItem;
  onSelect?: (item: WardrobeItem) => void;
  onTryOn?: (item: WardrobeItem) => void;
}

export const WardrobeCard: React.FC<WardrobeCardProps> = ({ item, onSelect, onTryOn }) => {
  const { toggleFavourite, recordWorn, deleteItem } = useWardrobe();

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(item.id);
  };

  const handleWear = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordWorn(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Remove "${item.name}" from your wardrobe?`)) {
      deleteItem(item.id);
    }
  };

  const categoryColorMap: Record<string, string> = {
    dresses: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    tops: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    bottoms: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    outerwear: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    shoes: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    accessories: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    bags: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  };

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Garment Image & Top Overlays */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

        {/* Category Badge & Code */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border backdrop-blur-md ${categoryColorMap[item.category] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
            {item.category}
          </span>
          <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/60 text-slate-300 backdrop-blur-sm border border-white/10">
            {item.itemCode}
          </span>
        </div>

        {/* Favourite Button */}
        <button
          onClick={handleToggleFav}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            item.isFavourite
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
          }`}
          title={item.isFavourite ? 'Favorited' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${item.isFavourite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag if available */}
        {item.price && (
          <div className="absolute bottom-2.5 left-2.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/75 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
            ${item.price.toFixed(2)}
          </div>
        )}

        {/* Size Badge */}
        <div className="absolute bottom-2.5 right-2.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/75 text-white border border-white/15 backdrop-blur-sm">
          {item.size}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-sm text-white truncate group-hover:text-rose-300 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>{item.brand || 'Unbranded'}</span>
            <span>•</span>
            <span className="capitalize">{item.colour}</span>
            {item.fabric && (
              <>
                <span>•</span>
                <span>{item.fabric}</span>
              </>
            )}
          </div>
        </div>

        {/* Wearing Stats & Quick Actions Footer */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Worn <strong className="text-white">{item.timesWorn}</strong>x</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleWear}
              title="Record worn today (+1)"
              className="px-2 py-1 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-[11px] font-medium rounded-lg border border-slate-700/80 transition-colors"
            >
              +1 Worn
            </button>
            {onTryOn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTryOn(item);
                }}
                title="Fit estimate & 3D preview"
                className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleDelete}
              title="Delete garment"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

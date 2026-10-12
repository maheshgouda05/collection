import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Layers, 
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { shoppingService } from '../lib/services/shoppingService.ts';
import type { ClothingCategory, ShoppingCheckResult } from '../lib/types.ts';

export const CheckBeforeBuyView: React.FC = () => {
  const { items } = useWardrobe();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('dresses');
  const [colour, setColour] = useState('Emerald Green');
  const [brand, setBrand] = useState('Zara');
  const [fabric, setFabric] = useState('Satin');
  const [price, setPrice] = useState('95');
  const [imageUrl, setImageUrl] = useState('');

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ShoppingCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Quick preset inspiration pieces
  const testCandidates = [
    { name: 'Red Floral Silk Dress', category: 'dresses' as ClothingCategory, colour: 'Red', brand: 'Reformation', price: '140' },
    { name: 'Black Double-Breasted Blazer', category: 'outerwear' as ClothingCategory, colour: 'Black', brand: 'Mango', price: '120' },
    { name: 'Khaki Pleated Trousers', category: 'bottoms' as ClothingCategory, colour: 'Khaki', brand: 'Cos', price: '110' },
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsEvaluating(true);
    setError(null);

    try {
      const res = await shoppingService.checkGarment({
        name: name.trim(),
        category,
        colour: colour.trim(),
        brand: brand.trim() || undefined,
        fabric: fabric.trim() || undefined,
        price: price ? parseFloat(price) : undefined,
        imageUrl: imageUrl.trim() || undefined,
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to complete wardrobe comparison');
    } finally {
      setIsEvaluating(false);
    }
  };

  const getVerdictBadge = (verdict: ShoppingCheckResult['verdict']) => {
    switch (verdict) {
      case 'Buy with confidence':
        return {
          icon: CheckCircle2,
          color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        };
      case 'Consider alternative':
        return {
          icon: AlertTriangle,
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        };
      case 'Skip - Redundant item':
      default:
        return {
          icon: XCircle,
          color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Intentional Closet Curation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Check Before You Buy</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Input prospective garments to identify potential duplicates, evaluate color harmony with your existing clothes, and avoid unnecessary purchases.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Garment Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Olive Green Trench Coat"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-rose-500 capitalize"
              >
                <option value="dresses">Dresses</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="outerwear">Outerwear</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
                <option value="bags">Bags</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Colour / Shade</label>
              <input
                type="text"
                value={colour}
                onChange={e => setColour(e.target.value)}
                placeholder="e.g. Navy, Burgundy"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Brand / Store</label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="e.g. Mango"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 89"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isEvaluating ? (
              <span>Evaluating Closet Redundancy...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Purchase Against Wardrobe</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Test Chips */}
        <div className="pt-3 border-t border-slate-800/60">
          <span className="text-[11px] text-slate-400 block mb-2">Try sample candidate items:</span>
          <div className="flex flex-wrap gap-2">
            {testCandidates.map((cand, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setName(cand.name);
                  setCategory(cand.category);
                  setColour(cand.colour);
                  setBrand(cand.brand);
                  setPrice(cand.price);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
              >
                {cand.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Result Card */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          {/* Header & Verdict Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Curation Verdict for:</span>
              <h2 className="text-xl font-bold text-white">{result.candidate.name}</h2>
              <span className="text-xs text-slate-400 capitalize">
                {result.candidate.category} • {result.candidate.colour}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Closet Score</span>
                <span className="text-xl font-bold text-white">{result.score}/100</span>
              </div>

              {(() => {
                const badge = getVerdictBadge(result.verdict);
                const Icon = badge.icon;
                return (
                  <div className={`px-3.5 py-2 rounded-xl border font-bold text-xs flex items-center gap-2 ${badge.color}`}>
                    <Icon className="w-4 h-4" />
                    <span>{result.verdict}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Stylist & Algorithmic Rationale */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ward Room Stylist Analysis</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {result.recommendationReason}
            </p>
          </div>

          {/* Gap Analysis & Similar Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wardrobe Gap */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1">Wardrobe Gap Analysis</span>
              <p className="text-xs text-slate-400">{result.gapAnalysis}</p>
              <div className="mt-2 text-xs">
                {result.wardrobeGapFilled ? (
                  <span className="text-emerald-400 font-medium">✓ Introduces brand new versatility</span>
                ) : (
                  <span className="text-amber-400 font-medium">△ Existing category already populated</span>
                )}
              </div>
            </div>

            {/* Existing Owned Similar Items */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1">
                Owned Pieces in this Category ({result.similarOwnedItems.length})
              </span>
              {result.similarOwnedItems.length === 0 ? (
                <span className="text-xs text-slate-500">None currently in wardrobe.</span>
              ) : (
                <div className="flex gap-2 overflow-x-auto pt-1 no-scrollbar">
                  {result.similarOwnedItems.map(item => (
                    <div key={item.id} className="w-16 shrink-0 text-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mb-1">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-slate-300 truncate block">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Styling Tips with Owned Clothes */}
          {result.stylingTipsWithWardrobe.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Potential Pairings with Your Owned Wardrobe:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.stylingTipsWithWardrobe.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

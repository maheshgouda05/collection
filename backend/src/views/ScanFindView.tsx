import React, { useState } from 'react';
import { 
  Scan, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Shirt, 
  Camera, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { apiRequest } from '../lib/services/apiClient.ts';
import type { WardrobeItem } from '../lib/types.ts';

interface ScanFindViewProps {
  onNavigate: (tab: string) => void;
}

export const ScanFindView: React.FC<ScanFindViewProps> = ({ onNavigate }) => {
  const { items } = useWardrobe();
  const [codeQuery, setCodeQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundItem, setFoundItem] = useState<WardrobeItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearchCode = async (codeToSearch?: string) => {
    const code = (codeToSearch || codeQuery).trim();
    if (!code) return;

    setIsScanning(true);
    setErrorMessage(null);
    setFoundItem(null);

    try {
      const res = await apiRequest<{ found: boolean; item: WardrobeItem; message: string }>(`/api/scan/${encodeURIComponent(code)}`);
      if (res.found && res.item) {
        setFoundItem(res.item);
      } else {
        setErrorMessage(res.message || 'Garment not found in your collection');
      }
    } catch (err: any) {
      setErrorMessage(err.message || `No wardrobe piece found matching code '${code}'`);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-1">
          <Scan className="w-3.5 h-3.5" />
          <span>Garment Tag Identification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Scan & Find Garment</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Look up items instantly using their unique wardrobe tags (e.g., CIA-AB1234) or garment identifiers.
        </p>
      </div>

      {/* Camera / Reticle Mock Frame */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Optical Scanning Reticle */}
        <div className="relative w-64 h-32 border-2 border-dashed border-indigo-500/60 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse absolute top-1/2 left-0" />
          <Scan className="w-8 h-8 text-indigo-400 mb-2" />
          <span className="text-[11px] font-mono text-slate-400">Position Garment Code in Frame</span>
        </div>
      </div>

      {/* Code Input Search Box */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearchCode();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={codeQuery}
              onChange={e => setCodeQuery(e.target.value)}
              placeholder="Enter tag code e.g. CIA-..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-500 uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={isScanning || !codeQuery.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isScanning ? 'Locating...' : 'Locate Garment'}
          </button>
        </form>

        {/* Quick Click Sample Codes from Owned Items */}
        {items.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-2">Your owned garment codes:</span>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, 6).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCodeQuery(item.itemCode);
                    handleSearchCode(item.itemCode);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
                >
                  {item.itemCode}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Feedback */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Matched Garment Result Card */}
      {foundItem && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Garment Verified in Authenticated Wardrobe</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-36 h-48 rounded-2xl overflow-hidden bg-slate-950 shrink-0">
              <img
                src={foundItem.imageUrl}
                alt={foundItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {foundItem.itemCode}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{foundItem.name}</h3>
                <span className="text-xs text-slate-400 capitalize">
                  {foundItem.category} • {foundItem.colour} • Size {foundItem.size}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Brand</span>
                  <span className="font-semibold text-white">{foundItem.brand || 'Unbranded'}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Fabric</span>
                  <span className="font-semibold text-white">{foundItem.fabric || 'Cotton Blend'}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Times Worn</span>
                  <span className="font-semibold text-white">{foundItem.timesWorn} times</span>
                </div>
              </div>

              {foundItem.notes && (
                <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  Styling Notes: {foundItem.notes}
                </p>
              )}

              <div className="flex gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect in Collection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

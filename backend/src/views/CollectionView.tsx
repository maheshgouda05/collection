import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Heart, 
  PlusCircle, 
  Shirt, 
  X, 
  Calendar, 
  Tag, 
  Sparkles,
  Edit2
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { WardrobeCard } from '../components/WardrobeCard.tsx';
import type { ClothingCategory, WardrobeItem } from '../lib/types.ts';

interface CollectionViewProps {
  onNavigate: (tab: string) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ onNavigate }) => {
  const { items, updateItem, deleteItem, recordWorn, toggleFavourite } = useWardrobe();

  const [activeCategory, setActiveCategory] = useState<ClothingCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColour, setSelectedColour] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'worn_most' | 'name_asc' | 'price_high' | 'price_low'>('newest');

  // Selected item modal
  const [inspectItem, setInspectItem] = useState<WardrobeItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');

  const categories: Array<{ id: ClothingCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Items' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'bags', label: 'Bags' },
  ];

  // Client-side filtering & sorting of real user collection
  const filteredItems = useMemo(() => {
    let result = [...items];

    if (activeCategory !== 'all') {
      result = result.filter(i => i.category === activeCategory);
    }

    if (onlyFavourites) {
      result = result.filter(i => i.isFavourite);
    }

    if (selectedColour !== 'all') {
      result = result.filter(i => i.colour.toLowerCase() === selectedColour.toLowerCase());
    }

    if (selectedSeason !== 'all') {
      result = result.filter(i => i.season.includes(selectedSeason) || i.season.includes('all-season'));
    }

    if (selectedOccasion !== 'all') {
      result = result.filter(i => i.occasion.includes(selectedOccasion));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.itemCode.toLowerCase().includes(q) ||
        i.colour.toLowerCase().includes(q) ||
        (i.brand && i.brand.toLowerCase().includes(q)) ||
        (i.fabric && i.fabric.toLowerCase().includes(q)) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'worn_most':
        result.sort((a, b) => (b.timesWorn || 0) - (a.timesWorn || 0));
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'price_low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [items, activeCategory, onlyFavourites, selectedColour, selectedSeason, selectedOccasion, searchQuery, sortBy]);

  const handleOpenInspect = (item: WardrobeItem) => {
    setInspectItem(item);
    setEditNotes(item.notes || '');
    setIsEditing(false);
  };

  const handleSaveNotes = async () => {
    if (!inspectItem) return;
    const updated = await updateItem(inspectItem.id, { notes: editNotes });
    setInspectItem(updated);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Wardrobe Collection</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your personal garment inventory ({filteredItems.length} of {items.length} items shown)
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-dress')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Garment</span>
        </button>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex overflow-x-auto pb-1 gap-2 no-scrollbar">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          const count = cat.id === 'all' ? items.length : items.filter(i => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-800 text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, code (CIA-...), colour..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Season Filter */}
        <div>
          <select
            value={selectedSeason}
            onChange={e => setSelectedSeason(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Season: All</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall / Autumn</option>
            <option value="winter">Winter</option>
            <option value="all-season">All-Season</option>
          </select>
        </div>

        {/* Occasion Filter */}
        <div>
          <select
            value={selectedOccasion}
            onChange={e => setSelectedOccasion(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Occasion: All</option>
            <option value="casual">Casual</option>
            <option value="college">College / Campus</option>
            <option value="office">Office / Work</option>
            <option value="party">Party / Night Out</option>
            <option value="formal">Formal</option>
            <option value="date">Date Night</option>
          </select>
        </div>

        {/* Sort & Favourites Toggle */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Sort: Newest</option>
            <option value="worn_most">Sort: Most Worn</option>
            <option value="name_asc">Sort: Name (A-Z)</option>
            <option value="price_high">Sort: Price (High)</option>
            <option value="price_low">Sort: Price (Low)</option>
          </select>

          <button
            onClick={() => setOnlyFavourites(prev => !prev)}
            className={`p-2 rounded-xl border transition-all ${
              onlyFavourites
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Show only favourites"
          >
            <Heart className={`w-4 h-4 ${onlyFavourites ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Garments Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
          <Shirt className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Matching Garments Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            {items.length === 0
              ? 'Your wardrobe is currently empty. Add your first dress, top, or accessory to begin building your digital collection.'
              : 'Try clearing your filters or search terms to see other garments in your closet.'}
          </p>
          {items.length === 0 ? (
            <button
              onClick={() => onNavigate('add-dress')}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Add First Garment
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedColour('all');
                setSelectedSeason('all');
                setSelectedOccasion('all');
                setOnlyFavourites(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map(item => (
            <WardrobeCard
              key={item.id}
              item={item}
              onSelect={handleOpenInspect}
              onTryOn={() => onNavigate('my-model')}
            />
          ))}
        </div>
      )}

      {/* Inspect Item Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setInspectItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Garment Image */}
            <div className="md:w-1/2 bg-slate-950 aspect-[3/4] md:aspect-auto">
              <img
                src={inspectItem.imageUrl}
                alt={inspectItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Details & Operations */}
            <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {inspectItem.itemCode}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-rose-400">
                    {inspectItem.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white">{inspectItem.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Brand: <strong className="text-slate-200">{inspectItem.brand || 'Unbranded'}</strong>
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Colour</span>
                    <span className="font-semibold text-white capitalize">{inspectItem.colour}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Size</span>
                    <span className="font-semibold text-white">{inspectItem.size}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Fabric</span>
                    <span className="font-semibold text-white">{inspectItem.fabric || 'Cotton blend'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Times Worn</span>
                    <span className="font-semibold text-white">{inspectItem.timesWorn} times</span>
                  </div>
                </div>

                {inspectItem.price && (
                  <div className="mt-3 text-xs text-slate-300">
                    Original Price: <strong className="text-emerald-400">${inspectItem.price.toFixed(2)}</strong>
                  </div>
                )}

                {/* Notes & Styling Advice */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Styling Notes</span>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        placeholder="Add styling tips, pairing reminders, or fit notes..."
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 h-20"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotes}
                          className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      {inspectItem.notes || 'No styling notes added yet.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    recordWorn(inspectItem.id);
                    setInspectItem(prev => prev ? { ...prev, timesWorn: prev.timesWorn + 1 } : null);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  +1 Wore Today
                </button>
                <button
                  onClick={() => {
                    toggleFavourite(inspectItem.id);
                    setInspectItem(prev => prev ? { ...prev, isFavourite: !prev.isFavourite } : null);
                  }}
                  className={`p-2 rounded-xl border transition-colors ${
                    inspectItem.isFavourite
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                  }`}
                  title="Toggle favourite"
                >
                  <Heart className={`w-4 h-4 ${inspectItem.isFavourite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${inspectItem.name}" from your wardrobe?`)) {
                      deleteItem(inspectItem.id);
                      setInspectItem(null);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                  title="Delete garment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

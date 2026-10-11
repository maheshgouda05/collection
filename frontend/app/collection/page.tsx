'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Category, WardrobeItem } from '@/lib/types';
import {
  Layers,
  Search,
  Plus,
  Heart,
  Eye,
  Trash2,
  Edit3,
  X,
  Grid,
  List,
  Upload,
  Camera,
  Shirt,
  Sparkles,
  Tag,
  AlertCircle,
  CheckCircle2,
  Filter,
} from 'lucide-react';

const STANDARD_CATEGORIES = [
  'All',
  'Tops',
  'Shirt',
  'T-shirt',
  'Bottoms',
  'Trousers',
  'Jeans',
  'Dresses',
  'Outerwear',
  'Jacket',
  'Footwear',
  'Shoes',
  'Bags',
  'Accessories',
  'Jewellery',
];

export default function CollectionPage() {
  const { items, toggleFavorite, deleteItem, updateItem, addItem, showToast } = useWardrobe();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-desc' | 'price-asc' | 'times-worn' | 'name'>('recent');

  // Modals
  const [activeItemModal, setActiveItemModal] = useState<WardrobeItem | null>(null);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<WardrobeItem | null>(null);

  // Add Item Form State
  const [addName, setAddName] = useState('');
  const [addCategory, setAddCategory] = useState('Shirt');
  const [addCustomCategory, setAddCustomCategory] = useState('');
  const [addBrand, setAddBrand] = useState('');
  const [addSize, setAddSize] = useState('');
  const [addColour, setAddColour] = useState('');
  const [addFabric, setAddFabric] = useState('');
  const [addPrice, setAddPrice] = useState<string>('');
  const [addPurchaseDate, setAddPurchaseDate] = useState('');
  const [addNotes, setAddNotes] = useState('');
  const [addTags, setAddTags] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');
  const [addFormError, setAddFormError] = useState<string | null>(null);

  // Derived filter options from user collection
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.colour) set.add(i.colour.split(' ')[0]);
    });
    return Array.from(set);
  }, [items]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.size) set.add(i.size);
    });
    return Array.from(set);
  }, [items]);

  // Filtered & Sorted items
  const displayedItems = useMemo(() => {
    let result = [...items];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((i) => {
        const cat = i.category.toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (sel === 'shirt') return cat.includes('shirt') || (cat.includes('top') && i.name.toLowerCase().includes('shirt'));
        if (sel === 't-shirt') return cat.includes('t-shirt') || cat.includes('tee') || i.name.toLowerCase().includes('tee');
        if (sel === 'trousers') return cat.includes('trouser') || i.name.toLowerCase().includes('trouser');
        if (sel === 'jeans') return cat.includes('jean') || i.name.toLowerCase().includes('jean') || i.name.toLowerCase().includes('denim');
        if (sel === 'jacket') return cat.includes('jacket') || cat.includes('coat') || cat.includes('outerwear');
        if (sel === 'shoes') return cat.includes('footwear') || cat.includes('shoe') || cat.includes('boot');
        return cat === sel;
      });
    }

    // Color filter
    if (selectedColor !== 'All') {
      result = result.filter((i) =>
        i.colour.toLowerCase().includes(selectedColor.toLowerCase()) ||
        i.colorFamily.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    // Size filter
    if (selectedSize !== 'All') {
      result = result.filter((i) => i.size.toLowerCase() === selectedSize.toLowerCase());
    }

    // Favorites filter
    if (onlyFavorites) {
      result = result.filter((i) => i.isFavorite);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.colour.toLowerCase().includes(q) ||
          i.fabric.toLowerCase().includes(q) ||
          (i.brand && i.brand.toLowerCase().includes(q)) ||
          (i.notes && i.notes.toLowerCase().includes(q)) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          i.id.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'times-worn') {
      result.sort((a, b) => b.timesWorn - a.timesWorn);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, selectedCategory, selectedColor, selectedSize, onlyFavorites, searchQuery, sortBy]);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAddImageUrl(previewUrl);
      setAddFormError(null);
      showToast('Photo uploaded & previewed');
    }
  };

  // Add Item Submit
  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddFormError(null);

    // CRITICAL: only photo OR name is required!
    const hasPhoto = Boolean(addImageUrl && addImageUrl.trim());
    const hasName = Boolean(addName && addName.trim());

    if (!hasPhoto && !hasName) {
      setAddFormError('Please enter an item name OR upload a photo. Everything else is optional.');
      return;
    }

    const finalCategory =
      addCategory === 'Custom' ? addCustomCategory.trim() || 'Custom Piece' : addCategory;

    const tagsArray = addTags
      ? addTags.split(',').map((t) => t.trim()).filter(Boolean)
      : ['capsule'];

    addItem({
      name: addName.trim() || undefined,
      imageUrl: addImageUrl.trim() || undefined,
      category: finalCategory,
      brand: addBrand.trim() || undefined,
      size: addSize.trim() || 'Unspecified',
      colour: addColour.trim() || 'Neutral',
      fabric: addFabric.trim() || 'Not specified',
      price: addPrice ? parseFloat(addPrice) : undefined,
      purchaseDate: addPurchaseDate || undefined,
      notes: addNotes.trim() || undefined,
      tags: tagsArray,
    });

    // Reset Form
    setAddName('');
    setAddImageUrl('');
    setAddBrand('');
    setAddSize('');
    setAddColour('');
    setAddFabric('');
    setAddPrice('');
    setAddPurchaseDate('');
    setAddNotes('');
    setAddTags('');
    setAddCustomCategory('');
    setIsAddModalOpen(false);
  };

  // Handle Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateItem(editingItem);
    setActiveItemModal(editingItem);
    setEditingItem(null);
  };

  // Total wardrobe estimated value
  const totalValue = items.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Digital Wardrobe Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            My Collection
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl font-light">
            Every garment, pair of shoes, and accessory in your possession. Indexed by fabric, brand, and compatibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-neutral-900/10 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            <span>+ Add Item</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-white border border-neutral-200/80 shadow-sm text-xs">
        <div>
          <span className="text-neutral-500 block">Total Items</span>
          <span className="text-xl font-serif font-bold text-neutral-900">{items.length}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">Estimated Closet Value</span>
          <span className="text-xl font-serif font-bold text-neutral-900">${totalValue.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">Favourites</span>
          <span className="text-xl font-serif font-bold text-rose-600">
            {items.filter((i) => i.isFavorite).length}
          </span>
        </div>
        <div>
          <span className="text-neutral-500 block">Showing Filtered</span>
          <span className="text-xl font-serif font-bold text-neutral-900">{displayedItems.length}</span>
        </div>
      </div>

      {/* Control Bar: Search & Category Chips */}
      <div className="space-y-4">
        {/* Search & Action Row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, fabric (e.g. linen, silk), colour, brand, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white text-sm rounded-2xl border border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Color Filter */}
            {availableColors.length > 0 && (
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="px-3 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 outline-none"
              >
                <option value="All">All Colours</option>
                {availableColors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 outline-none"
              >
                <option value="All">All Sizes</option>
                {availableSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}

            {/* Favorites Toggle */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                onlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>Favourites</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as 'recent' | 'price-desc' | 'price-asc' | 'times-worn' | 'name'
                )
              }
              className="px-3 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 outline-none"
            >
              <option value="recent">Sort: Recently Added</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="times-worn">Most Worn</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-white border border-neutral-200 rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  viewMode === 'list' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {STANDARD_CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? items.length
                : items.filter((i) => {
                    const c = i.category.toLowerCase();
                    const target = cat.toLowerCase();
                    return c.includes(target) || i.name.toLowerCase().includes(target);
                  }).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid or List Display */}
      {displayedItems.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white border border-neutral-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-neutral-900">
              No clothing items found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              No pieces match your current filters. Add a new item with just a photo or name, or reset your filters.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedColor('All');
                setSelectedSize('All');
                setOnlyFavorites(false);
                setSearchQuery('');
              }}
              className="px-4 py-2.5 rounded-2xl bg-neutral-100 text-neutral-700 text-xs font-semibold hover:bg-neutral-200 transition cursor-pointer"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-rose-400" />
              <span>+ Add Item Now</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItemModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Photo Area with Fallback */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 flex items-center justify-center">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400 bg-gradient-to-br from-neutral-50 to-neutral-200 w-full h-full">
                    <Shirt className="w-12 h-12 stroke-[1.2] text-neutral-400 mb-2" />
                    <span className="font-serif text-sm font-semibold text-neutral-600 line-clamp-2">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider font-mono">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                    {item.category}
                  </span>
                  {item.brand && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-900/80 backdrop-blur-md text-white shadow-sm">
                      {item.brand}
                    </span>
                  )}
                </div>

                {/* Favorite Heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition shadow-md cursor-pointer ${
                    item.isFavorite
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-neutral-500 hover:text-rose-500'
                  }`}
                  aria-label="Toggle favourite"
                >
                  <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-white' : ''}`} />
                </button>

                {/* Quick actions hover banner */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItemModal(item);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white text-neutral-900 text-xs font-bold shadow-lg hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(item);
                    }}
                    className="p-2 rounded-xl bg-white/90 text-neutral-900 text-xs font-bold shadow-lg hover:scale-105 transition cursor-pointer"
                    title="Edit item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setItemToDelete(item);
                    }}
                    className="p-2 rounded-xl bg-white/90 text-rose-600 text-xs font-bold shadow-lg hover:scale-105 transition cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm text-neutral-900 truncate group-hover:text-rose-600 transition">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    {item.id}
                  </span>
                </div>

                <p className="text-xs text-neutral-500">
                  {item.colour} {item.size ? `• ${item.size}` : ''} {item.fabric ? `• ${item.fabric}` : ''}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-neutral-900">
                    {item.price !== undefined ? `$${item.price}` : 'Price unlisted'}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Worn {item.timesWorn} times
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-neutral-100">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItemModal(item)}
                className="p-4 hover:bg-neutral-50 transition flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-400">
                      <Shirt className="w-6 h-6" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900 truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {item.id}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {item.category} • {item.colour} {item.size ? `• Size ${item.size}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-sm font-serif font-bold text-neutral-900 block">
                      {item.price !== undefined ? `$${item.price}` : '—'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Worn {item.timesWorn}x
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className={`p-2 rounded-full transition cursor-pointer ${
                      item.isFavorite ? 'text-rose-500' : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setItemToDelete(item);
                    }}
                    className="p-2 rounded-full text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* + ADD ITEM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 max-h-[92vh] flex flex-col">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Add Item to Wardrobe</h3>
                  <p className="text-[11px] text-neutral-500">
                    Only item name OR photo is required. All other fields are optional.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              {addFormError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{addFormError}</span>
                </div>
              )}

              {/* Photo Upload & Preview Area */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-2">
                  Photo Upload (or paste image URL)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="relative aspect-square rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
                    {addImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={addImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-3 text-neutral-400">
                        <Camera className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-[10px]">Photo Preview</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="text-[10px] text-neutral-400">Or paste an online image URL:</div>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={addImageUrl}
                      onChange={(e) => setAddImageUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Item Name */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Item Name <span className="text-neutral-400 font-normal">(Optional if photo provided)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Classic White Linen Button-Down Shirt"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                />
              </div>

              {/* Category & Custom Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Category</label>
                  <select
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs bg-white"
                  >
                    <option value="Shirt">Shirt</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Dresses">Dress</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Outerwear">Outerwear / Coat</option>
                    <option value="Shoes">Shoes / Footwear</option>
                    <option value="Bags">Bags</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Custom">+ Custom Category</option>
                  </select>
                </div>

                {addCategory === 'Custom' && (
                  <div>
                    <label className="block font-semibold text-neutral-800 mb-1">Custom Category Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Kimono, Swimwear, Loungewear"
                      value={addCustomCategory}
                      onChange={(e) => setAddCustomCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Zara, COS, Massimo Dutti"
                    value={addBrand}
                    onChange={(e) => setAddBrand(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
              </div>

              {/* Size, Colour, Fabric */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Size</label>
                  <input
                    type="text"
                    placeholder="e.g. M, 38, 30x32"
                    value={addSize}
                    onChange={(e) => setAddSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Colour</label>
                  <input
                    type="text"
                    placeholder="e.g. Crisp White, Olive"
                    value={addColour}
                    onChange={(e) => setAddColour(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Fabric / Material</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Linen, Silk"
                    value={addFabric}
                    onChange={(e) => setAddFabric(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
              </div>

              {/* Price, Purchase Date, Tags */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Price ($)</label>
                  <input
                    type="number"
                    placeholder="e.g. 95"
                    value={addPrice}
                    onChange={(e) => setAddPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Purchase Date</label>
                  <input
                    type="date"
                    value={addPurchaseDate}
                    onChange={(e) => setAddPurchaseDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Tags</label>
                  <input
                    type="text"
                    placeholder="work, casual, travel"
                    value={addTags}
                    onChange={(e) => setAddTags(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Notes & Styling Advice</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pairs best untucked over tailored trousers or layered under trench coat."
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold shadow-md cursor-pointer transition hover:scale-[1.02]"
                >
                  Save to Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-neutral-400">
                  {activeItemModal.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white">
                  {activeItemModal.category}
                </span>
              </div>
              <button
                onClick={() => setActiveItemModal(null)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                  {activeItemModal.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeItemModal.imageUrl}
                      alt={activeItemModal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Shirt className="w-16 h-16 text-neutral-400" />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900">
                      {activeItemModal.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {activeItemModal.brand || 'Personal Wardrobe Piece'}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <p>
                      <strong>Colour:</strong> {activeItemModal.colour}
                    </p>
                    <p>
                      <strong>Size:</strong> {activeItemModal.size || 'Not specified'}
                    </p>
                    <p>
                      <strong>Fabric:</strong> {activeItemModal.fabric || 'Not specified'}
                    </p>
                    <p>
                      <strong>Purchase Price:</strong>{' '}
                      {activeItemModal.price !== undefined ? `$${activeItemModal.price}` : 'Not listed'}
                    </p>
                    <p>
                      <strong>Wear Count:</strong> {activeItemModal.timesWorn} times
                    </p>
                    <p>
                      <strong>Condition:</strong> {activeItemModal.condition || 'Good'}
                    </p>
                  </div>

                  {activeItemModal.notes && (
                    <div className="text-xs text-neutral-600 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
                      <strong className="text-rose-900 block mb-1">Styling Note:</strong>
                      {activeItemModal.notes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingItem(activeItemModal);
                        setActiveItemModal(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-black transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      onClick={() => {
                        setItemToDelete(activeItemModal);
                        setActiveItemModal(null);
                      }}
                      className="p-2.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition border border-neutral-200 cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-lg font-serif font-bold text-neutral-900">
                Edit Item: {editingItem.name}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Colour</label>
                  <input
                    type="text"
                    value={editingItem.colour}
                    onChange={(e) => setEditingItem({ ...editingItem, colour: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Size</label>
                  <input
                    type="text"
                    value={editingItem.size}
                    onChange={(e) => setEditingItem({ ...editingItem, size: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Fabric</label>
                  <input
                    type="text"
                    value={editingItem.fabric}
                    onChange={(e) => setEditingItem({ ...editingItem, fabric: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editingItem.price ?? ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Notes / Styling</label>
                <textarea
                  rows={3}
                  value={editingItem.notes || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Remove Item?
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to remove &quot;{itemToDelete.name}&quot; from your wardrobe?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteItem(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
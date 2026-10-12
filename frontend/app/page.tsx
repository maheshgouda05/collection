'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Category, WardrobeItem } from '@/lib/types';
import {
  Sparkles,
  ShoppingBag,
  Layers,
  Compass,
  Scan,
  Heart,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle2,
  Trash2,
  X,
  User,
  Bot,
  Shirt,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Footwear',
  'Bags',
  'Accessories',
  'Jewellery',
];

export default function DashboardPage() {
  const router = useRouter();
  const { items, savedOutfits, toggleFavorite, deleteItem, bodyProfile, authSession, isLoaded } = useWardrobe();
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [selectedItemForModal, setSelectedItemForModal] = useState<WardrobeItem | null>(null);

  useEffect(() => {
    if (isLoaded && !authSession.isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoaded, authSession.isAuthenticated, router]);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const totalValue = items.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const totalWornCount = items.reduce((acc, curr) => acc + curr.timesWorn, 0);
  const avgCostPerWear =
    totalWornCount > 0 ? (totalValue / totalWornCount).toFixed(1) : '12.4';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#121B2F] to-[#0A0D14] text-white p-8 md:p-12 shadow-2xl border border-neutral-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 via-rose-500/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-600/20 via-indigo-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-rose-300">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Smart Digital Wardrobe & Mall Companion</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
                Your Wardrobe. <br />
                <span className="bg-gradient-to-r from-rose-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  Smarter Than Ever.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
                Everything you own, always in your pocket. Match pieces seamlessly, calibrate your personal 2D body model, and shop without buying duplicates in shopping malls.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/collection"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-sm shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
              >
                <span>Explore My Wardrobe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/smart-match"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-indigo-300" />
                <span>Smart Matcher</span>
              </Link>

              <Link
                href="/add-dress"
                className="px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4 text-rose-400" />
                <span>+ Add Item</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl font-serif font-bold text-white">{items.length}</p>
                <p className="text-xs text-neutral-400">Total Pieces</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-emerald-400">
                  ${totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-400">Closet Net Worth</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-rose-300">
                  {savedOutfits.length}
                </p>
                <p className="text-xs text-neutral-400">Saved Looks</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md h-80 sm:h-96">
              <div className="absolute inset-x-8 inset-y-4 rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
                  alt="Classic Trench Coat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300">
                    Essential Capsule Outerwear
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Classic Double-Breasted Trench
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Worn 31 times • Pairs with 8 wardrobe staples
                  </p>
                </div>
              </div>

              {/* Floating Card 1: My Model Snapshot */}
              <Link
                href="/my-model"
                className="absolute -top-3 -right-2 w-44 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/40 text-neutral-900 animate-float block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight truncate">My Model</p>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {bodyProfile.height}cm • {bodyProfile.bodyType}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Floating Card 2: AI Assistant Shortcut */}
              <Link
                href="/ai-assistant"
                className="absolute -bottom-3 -left-2 w-48 bg-neutral-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/20 text-white animate-float-delayed block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-violet-300">AI Stylist Ready</p>
                    <p className="text-[10px] text-neutral-300">Ask: What should I wear?</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS & MODULE PREVIEWS ROW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick My Model Card */}
        <Link
          href="/my-model"
          className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                Digital Body Twin
              </span>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-0.5">
                My Model & Proportions
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Calibrate your {bodyProfile.height} cm / {bodyProfile.weight} kg mannequin frame, skin tone, and preview virtual collection pieces.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
            <span>Open Model Studio</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Quick Smart Matcher Suggestions */}
        <Link
          href="/smart-match"
          className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 block">
                Occasion Pairings
              </span>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-0.5">
                Smart Matcher Suggestions
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Generate coordinated outfits for Office, Casual, College, or Gala using clothes you already own.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-cyan-700 group-hover:translate-x-1 transition-transform">
            <span>Explore Matched Outfits</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Quick AI Assistant Shortcut */}
        <Link
          href="/ai-assistant"
          className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block">
                Personal Stylist
              </span>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-0.5">
                AI Assistant Shortcut
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Ask questions like &ldquo;What should I wear today?&rdquo; or attach any saved garment for 3 styling variations.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-violet-700 group-hover:translate-x-1 transition-transform">
            <span>Chat with Assistant</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      {/* PROMINENT MALL SHOPPING BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Mall Shopping Companion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Shopping right now? &ldquo;Do I Already Own This?&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-rose-100 font-light">
              Don&apos;t guess while standing in front of a clothing rack. Snap or search any item to instantly check if you own duplicates, discover matching outfits, or confirm if it fills a real wardrobe gap!
            </p>
          </div>

          <Link
            href="/check-before-you-buy"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-rose-700 hover:bg-neutral-100 font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Open Shopping Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* RECENTLY ADDED & COLLECTION SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Live Closet Archive
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              My Collection Gallery
            </h2>
            <p className="text-sm text-neutral-500">
              Showing {filteredItems.length} items logged ({items.length} total pieces)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/add-dress"
              className="px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-md transition hover:scale-105"
            >
              <Plus className="w-4 h-4 text-rose-400" />
              <span>+ Add New Item</span>
            </Link>

            <Link
              href="/collection"
              className="px-4 py-2.5 rounded-2xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>Full Wardrobe View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                    {item.category}
                  </span>
                  {item.brand && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-900/80 backdrop-blur-md text-white shadow-sm">
                      {item.brand}
                    </span>
                  )}
                </div>

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

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedItemForModal(item)}
                    className="px-4 py-2 rounded-xl bg-white text-neutral-900 text-xs font-bold shadow-lg hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                <div>
                  <h3 className="font-semibold text-sm text-neutral-900 truncate group-hover:text-rose-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {item.colour} {item.size ? `• Size ${item.size}` : ''} {item.fabric ? `• ${item.fabric}` : ''}
                  </p>
                </div>

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

        {filteredItems.length > 8 && (
          <div className="text-center pt-4">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition"
            >
              <span>View All {items.length} Items in My Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* ITEM DETAIL MODAL */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-neutral-400">
                  {selectedItemForModal.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white">
                  {selectedItemForModal.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedItemForModal.imageUrl}
                    alt={selectedItemForModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900">
                      {selectedItemForModal.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {selectedItemForModal.brand || 'Personal Wardrobe Piece'}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <p>
                      <strong>Colour:</strong> {selectedItemForModal.colour}
                    </p>
                    <p>
                      <strong>Size:</strong> {selectedItemForModal.size || 'Not specified'}
                    </p>
                    <p>
                      <strong>Fabric:</strong> {selectedItemForModal.fabric || 'Not specified'}
                    </p>
                    <p>
                      <strong>Purchase Price:</strong>{' '}
                      {selectedItemForModal.price !== undefined ? `$${selectedItemForModal.price}` : 'Not listed'}
                    </p>
                    <p>
                      <strong>Wear Count:</strong> {selectedItemForModal.timesWorn} times
                    </p>
                    <p>
                      <strong>Condition:</strong> {selectedItemForModal.condition || 'Like New'}
                    </p>
                  </div>

                  {selectedItemForModal.notes && (
                    <div className="text-xs text-neutral-600 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
                      <strong className="text-rose-900 block mb-1">Styling Note:</strong>
                      {selectedItemForModal.notes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        toggleFavorite(selectedItemForModal.id);
                        setSelectedItemForModal({
                          ...selectedItemForModal,
                          isFavorite: !selectedItemForModal.isFavorite,
                        });
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition cursor-pointer ${
                        selectedItemForModal.isFavorite
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          selectedItemForModal.isFavorite ? 'fill-white' : ''
                        }`}
                      />
                      <span>
                        {selectedItemForModal.isFavorite ? 'Favorited' : 'Add to Favorites'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove "${selectedItemForModal.name}" from your collection?`)) {
                          deleteItem(selectedItemForModal.id);
                          setSelectedItemForModal(null);
                        }
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
    </div>
  );
}
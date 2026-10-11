'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Category, Season } from '@/lib/types';
import {
  Plus,
  Camera,
  Heart,
  QrCode,
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

const PRESET_PHOTO_TEMPLATES = [
  {
    name: 'Silk Shirt',
    category: 'Tops' as Category,
    url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Camel Knit',
    category: 'Tops' as Category,
    url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Trench Coat',
    category: 'Outerwear' as Category,
    url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Leather Boots',
    category: 'Footwear' as Category,
    url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Leather Crossbody',
    category: 'Bags' as Category,
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Emerald Dress',
    category: 'Dresses' as Category,
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
  },
];

export default function AddClothingItemPage() {
  const router = useRouter();
  const { addItem, showToast } = useWardrobe();

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Tops');
  const [subCategory] = useState('');
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('M');
  const [fabric, setFabric] = useState('100% Organic Cotton');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | ''>(95);
  const [purchaseDate, setPurchaseDate] = useState('2026-10-10');
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [condition] = useState<'New' | 'Like New' | 'Good' | 'Vintage'>('New');
  const [seasons] = useState<Season[]>(['All Season']);
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTO_TEMPLATES[0].url);

  // Derived Passport ID
  const prefix = category.substring(0, 3).toUpperCase();
  const previewId = `CIA-${prefix}-991`;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      showToast('Photo uploaded successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasPhoto = Boolean(imageUrl && imageUrl.trim());
    const hasName = Boolean(name && name.trim());

    if (!hasPhoto && !hasName) {
      showToast('Please enter an item name OR provide a photo. Everything else is optional.');
      return;
    }

    const colLower = colour.toLowerCase();
    const colorFamily = colLower.includes('white')
      ? 'white'
      : colLower.includes('black')
      ? 'black'
      : colLower.includes('blue') || colLower.includes('navy')
      ? 'blue'
      : colLower.includes('camel') || colLower.includes('brown') || colLower.includes('beige')
      ? 'beige'
      : colLower.includes('green')
      ? 'green'
      : 'other';

    addItem({
      name: name.trim() || undefined,
      category,
      subCategory: subCategory.trim() || undefined,
      colour: colour.trim() || 'Neutral',
      colorFamily,
      size: size.trim() || 'M',
      fabric: fabric.trim() || 'Fabric Blend',
      brand: brand.trim() || undefined,
      price: typeof price === 'number' ? price : undefined,
      purchaseDate: purchaseDate || undefined,
      imageUrl: imageUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      isFavorite,
      tags: [category.toLowerCase(), 'closet-piece'],
      seasons,
      condition,
    });

    router.push('/collection');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Wardrobe Ingestion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Add Clothing to Collection
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl font-light">
            Log clothes, shoes, bags, or jewellery into your digital wardrobe. Assign unique QR identifiers and fabric profiles.
          </p>
        </div>

        <Link
          href="/collection"
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
        >
          ← Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Input Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6"
        >
          {/* Photo Upload Area */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
              Item Photo (Upload or Camera)
            </label>

            <div className="space-y-3">
              <label className="cursor-pointer border-2 border-dashed border-neutral-300 hover:border-neutral-500 bg-neutral-50 hover:bg-neutral-100 transition p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <Camera className="w-8 h-8 text-neutral-400 mb-2" />
                <span className="text-xs font-bold text-neutral-900">
                  Take a Photo or Browse Files
                </span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  Clear, well-lit photo of your garment
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>

              {/* Fast Photo Presets */}
              <div>
                <span className="text-[11px] text-neutral-500 block mb-1.5">
                  Or pick a curated demo photo preset:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {PRESET_PHOTO_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageUrl(tmpl.url);
                        setCategory(tmpl.category);
                        setName(tmpl.name);
                      }}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        imageUrl === tmpl.url
                          ? 'border-neutral-900 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tmpl.url}
                        alt={tmpl.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Item Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Italian Linen Oxford Shirt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Colour, Size, Fabric */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Colour
              </label>
              <input
                type="text"
                placeholder="e.g. Crisp White"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Size
              </label>
              <input
                type="text"
                placeholder="e.g. M, 32, EU 42"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Fabric / Material
              </label>
              <input
                type="text"
                placeholder="e.g. 100% Linen"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Brand, Price, Purchase Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g. Massimo Dutti"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Price ($)
              </label>
              <input
                type="number"
                placeholder="110"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Notes & Styling Info */}
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1">
              Styling Notes & Care Instructions
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Dry clean only. Looks great paired with charcoal culottes or dark raw denim."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900 resize-none"
            />
          </div>

          {/* Favorite Toggle Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                isFavorite
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-neutral-200 text-neutral-600'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
              />
              <span>{isFavorite ? 'Marked as Favourite' : 'Mark as Favourite'}</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-neutral-900 hover:bg-black text-white text-sm font-bold shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Save Item To My Wardrobe</span>
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Live Card Preview & Auto-ID Generator */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Live Digital Wardrobe Card Preview
            </span>

            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xl flex flex-col justify-between">
              {/* Image */}
              <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={name || 'Item Preview'}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                    {category}
                  </span>
                  {brand && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-900/80 backdrop-blur-md text-white shadow-sm">
                      {brand}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-neutral-700 flex items-center justify-center shadow-md">
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-neutral-900 truncate">
                      {name || 'Untiled Fashion Item'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {colour || 'No colour'} • Size {size} • {fabric}
                    </p>
                  </div>
                  <span className="text-xs font-serif font-bold text-neutral-900">
                    ${price || 0}
                  </span>
                </div>

                {notes && (
                  <p className="text-xs text-neutral-600 italic bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    &ldquo;{notes}&rdquo;
                  </p>
                )}

                {/* Auto Generated Barcode / Digital Passport Preview */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-mono font-bold text-neutral-600">
                      {previewId}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Digital Passport Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
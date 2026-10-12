import React, { useState } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Shirt, 
  DollarSign, 
  Tag, 
  Layers 
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { collectionService } from '../lib/services/collectionService.ts';
import type { ClothingCategory } from '../lib/types.ts';

interface AddDressViewProps {
  onSuccess: () => void;
}

export const AddDressView: React.FC<AddDressViewProps> = ({ onSuccess }) => {
  const { addItem } = useWardrobe();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('dresses');
  const [colour, setColour] = useState('Crimson Red');
  const [colourFamily, setColourFamily] = useState('Red');
  const [size, setSize] = useState('M');
  const [fabric, setFabric] = useState('Silk blend');
  const [brand, setBrand] = useState('Zara');
  const [price, setPrice] = useState<string>('89');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80');
  const [notes, setNotes] = useState('');
  const [tagsInput, setTagsInput] = useState('evening, elegant, midi');
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>(['spring', 'summer']);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(['party', 'date']);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Quick fashion photo presets
  const samplePresets = [
    {
      name: 'Emerald Satin Slip Dress',
      category: 'dresses' as ClothingCategory,
      colour: 'Emerald Green',
      fabric: 'Satin',
      url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Tailored Ivory Linen Blazer',
      category: 'outerwear' as ClothingCategory,
      colour: 'Ivory White',
      fabric: 'Linen',
      url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Classic Black Evening Midi',
      category: 'dresses' as ClothingCategory,
      colour: 'Black',
      fabric: 'Crepe',
      url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'High-Waist Wide-Leg Trousers',
      category: 'bottoms' as ClothingCategory,
      colour: 'Camel Tan',
      fabric: 'Wool Blend',
      url: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Crisp Oversized Poplin Shirt',
      category: 'tops' as ClothingCategory,
      colour: 'Sky Blue',
      fabric: 'Organic Cotton',
      url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Leather Pointed Ankle Boots',
      category: 'shoes' as ClothingCategory,
      colour: 'Burgundy',
      fabric: 'Calfskin Leather',
      url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const uploadRes = await collectionService.uploadImage(base64, file.type);
          setImageUrl(uploadRes.url);
          setPreviewImage(uploadRes.url);
        } catch (err: any) {
          setError(err.message || 'Image upload failed');
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'Failed to read image');
      setIsUploading(false);
    }
  };

  const handleToggleSeason = (s: string) => {
    setSelectedSeasons(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleToggleOccasion = (o: string) => {
    setSelectedOccasions(prev =>
      prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Garment name is required');
      return;
    }
    const finalImage = imageUrl || previewImage;
    if (!finalImage) {
      setError('Please upload or select an image for this garment');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      await addItem({
        name: name.trim(),
        category,
        colour,
        colourFamily,
        size,
        fabric,
        brand,
        price: price ? parseFloat(price) : undefined,
        imageUrl: finalImage,
        season: selectedSeasons.length > 0 ? selectedSeasons : ['all-season'],
        occasion: selectedOccasions.length > 0 ? selectedOccasions : ['casual'],
        tags,
        notes,
        isFavourite: false,
        timesWorn: 0,
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 900);
    } catch (err: any) {
      setError(err.message || 'Failed to save garment to wardrobe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Add New Garment</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Catalog a dress, top, shoes, or accessory into your personal digital collection.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Garment saved successfully to wardrobe! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500">
                <Shirt className="w-16 h-16 mb-2 stroke-1" />
                <span className="text-xs">No image selected</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-xs gap-2">
                <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                <span>Uploading image to storage...</span>
              </div>
            )}

            {/* Upload Button Overlay */}
            <label className="absolute bottom-4 left-4 right-4 py-2.5 px-4 bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700/80 rounded-2xl text-xs font-semibold text-white cursor-pointer shadow-lg flex items-center justify-center gap-2 transition-all">
              <Upload className="w-4 h-4" />
              <span>{previewImage ? 'Replace Photo' : 'Upload Garment Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Quick Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Or pick an inspirational piece:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setName(preset.name);
                    setCategory(preset.category);
                    setColour(preset.colour);
                    setFabric(preset.fabric);
                    setPreviewImage(preset.url);
                    setImageUrl(preset.url);
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition-all text-left"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] text-white font-medium leading-tight truncate">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Garment Metadata Form */}
        <div className="lg:col-span-7 space-y-5 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          {/* Garment Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Garment Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Silk Emerald Evening Dress"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category & Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 capitalize"
              >
                <option value="dresses">Dresses</option>
                <option value="tops">Tops / Shirts</option>
                <option value="bottoms">Bottoms / Trousers</option>
                <option value="outerwear">Outerwear / Jackets</option>
                <option value="shoes">Shoes / Footwear</option>
                <option value="accessories">Accessories</option>
                <option value="bags">Bags / Purses</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Size</label>
              <select
                value={size}
                onChange={e => setSize(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="XS">XS (Extra Small)</option>
                <option value="S">S (Small)</option>
                <option value="M">M (Medium)</option>
                <option value="L">L (Large)</option>
                <option value="XL">XL (Extra Large)</option>
                <option value="XXL">XXL</option>
                <option value="Custom">Custom Tailored</option>
              </select>
            </div>
          </div>

          {/* Colour & Fabric */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Colour / Shade</label>
              <input
                type="text"
                value={colour}
                onChange={e => setColour(e.target.value)}
                placeholder="e.g. Navy Blue"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Fabric / Material</label>
              <input
                type="text"
                value={fabric}
                onChange={e => setFabric(e.target.value)}
                placeholder="e.g. 100% Linen, Wool blend"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Brand & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Brand / Designer</label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="e.g. Mango, Reformation"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Estimated Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 120"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Seasons */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Suitable Seasons</label>
            <div className="flex flex-wrap gap-2">
              {['spring', 'summer', 'fall', 'winter', 'all-season'].map(s => {
                const isSelected = selectedSeasons.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleToggleSeason(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasions */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Suitable Occasions</label>
            <div className="flex flex-wrap gap-2">
              {['casual', 'college', 'office', 'party', 'formal', 'date'].map(o => {
                const isSelected = selectedOccasions.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => handleToggleOccasion(o)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags & Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="e.g. vintage, breathable, cocktail, favorite"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Styling Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Dry clean only. Best worn with silver jewelry or nude pointed heels."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 h-20"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Saving to Wardrobe...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Garment to Wardrobe</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

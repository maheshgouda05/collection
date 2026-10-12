'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import {
  User,
  RotateCcw,
  LogOut,
  Camera,
  Check,
  Ruler,
  Sparkles,
  Layers,
  ArrowRight,
  Shield,
  Palette,
  Heart,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const {
    items,
    savedOutfits,
    userProfile,
    bodyProfile,
    updateProfile,
    updateBodyProfile,
    resetToDefaultData,
    logout,
    showToast,
  } = useWardrobe();

  // Local form editing state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [stylePersona, setStylePersona] = useState(userProfile.stylePersona);
  const [topSize, setTopSize] = useState(userProfile.sizes.tops);
  const [bottomSize, setBottomSize] = useState(userProfile.sizes.bottoms);
  const [shoeSize, setShoeSize] = useState(userProfile.sizes.footwear);
  const [outerwearSize, setOuterwearSize] = useState(userProfile.sizes.outerwear);
  const [fitPreference, setFitPreference] = useState(userProfile.fitPreference);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    bodyProfile.unitSystem || 'metric'
  );
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync state if userProfile updates from backend hydration
  React.useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setStylePersona(userProfile.stylePersona);
    setTopSize(userProfile.sizes.tops);
    setBottomSize(userProfile.sizes.bottoms);
    setShoeSize(userProfile.sizes.footwear);
    setOuterwearSize(userProfile.sizes.outerwear);
    setFitPreference(userProfile.fitPreference);
    setAvatarUrl(userProfile.avatarUrl);
  }, [userProfile]);

  const totalValue = items.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const totalWears = items.reduce((acc, curr) => acc + curr.timesWorn, 0);
  const avgCostPerWear = totalWears > 0 ? (totalValue / totalWears).toFixed(1) : '14.2';

  // Category breakdown calculation
  const categoryCounts: Record<string, number> = {};
  items.forEach((item) => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      showToast('Avatar profile photo updated');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await updateProfile({
        name,
        email,
        avatarUrl,
        stylePersona,
        location: userProfile.location,
        sizes: {
          tops: topSize,
          bottoms: bottomSize,
          footwear: shoeSize,
          outerwear: outerwearSize,
        },
        fitPreference,
      });
      await updateBodyProfile({
        unitSystem,
        usualSizes: {
          tops: topSize,
          bottoms: bottomSize,
          footwear: shoeSize,
          outerwear: outerwearSize,
        },
      });

      if (res && 'error' in res && res.error) {
        setStatusMessage({ type: 'error', text: res.error });
        showToast(res.error);
      } else {
        const msg =
          res && 'message' in res && res.message
            ? res.message
            : 'Profile & style preferences saved successfully!';
        setStatusMessage({ type: 'success', text: msg });
        showToast(msg);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save profile';
      setStatusMessage({ type: 'error', text: msg });
      showToast(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Wardrobe Settings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Account & Style Preferences
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-light">
            Manage your personal fit profile, measurement units, aesthetic persona, and session settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset your wardrobe to the curated luxury demo collection?')) {
                resetToDefaultData();
              }
            }}
            className="px-4 py-2.5 rounded-2xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-neutral-500" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Wardrobe Economics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Total Collection Value
          </span>
          <div className="text-3xl font-serif font-bold text-neutral-900">
            ${totalValue.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-600 font-medium pt-1">
            {items.length} authenticated items
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Avg Cost Per Wear
          </span>
          <div className="text-3xl font-serif font-bold text-rose-600">
            ${avgCostPerWear}
          </div>
          <p className="text-xs text-neutral-500 pt-1">
            {totalWears} logged wear events
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Saved Outfits
          </span>
          <div className="text-3xl font-serif font-bold text-indigo-600">
            {savedOutfits.length}
          </div>
          <p className="text-xs text-neutral-500 pt-1">Bookmarked combinations</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Model Calibration
          </span>
          <div className="text-3xl font-serif font-bold text-purple-600">
            {bodyProfile.height} cm
          </div>
          <p className="text-xs text-neutral-500 pt-1">
            {bodyProfile.bodyType} frame ({bodyProfile.weight} kg)
          </p>
        </div>
      </div>

      {/* Profile & Style Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-neutral-200 shadow-sm"
              />
              <label
                className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white shadow-md cursor-pointer transition"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-neutral-900">{name}</h2>
              <p className="text-xs text-neutral-500">{email}</p>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">
                {stylePersona}
              </span>
            </div>
          </div>

          <Link
            href="/my-model"
            className="px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition"
          >
            <Ruler className="w-4 h-4 text-purple-600" />
            <span>Customize 2D Body Mannequin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
          {/* Identity Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                required
              />
            </div>
          </div>

          {/* Style Persona & Measurement Units */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Style Persona
              </label>
              <input
                type="text"
                value={stylePersona}
                onChange={(e) => setStylePersona(e.target.value)}
                placeholder="e.g. Quiet Luxury & Parisian Minimalist"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Measurement Units
              </label>
              <select
                value={unitSystem}
                onChange={(e) => setUnitSystem(e.target.value as 'metric' | 'imperial')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs bg-white"
              >
                <option value="metric">Metric (Centimeters / Kilograms)</option>
                <option value="imperial">Imperial (Inches / Pounds)</option>
              </select>
            </div>
          </div>

          {/* Sizing Preferences */}
          <div className="pt-2 border-t border-neutral-100">
            <h4 className="font-semibold text-neutral-800 text-xs uppercase tracking-wider mb-3">
              Standard Clothing Sizes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Top Size
                </label>
                <input
                  type="text"
                  value={topSize}
                  onChange={(e) => setTopSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Bottom Size
                </label>
                <input
                  type="text"
                  value={bottomSize}
                  onChange={(e) => setBottomSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Footwear Size
                </label>
                <input
                  type="text"
                  value={shoeSize}
                  onChange={(e) => setShoeSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Outerwear Size
                </label>
                <input
                  type="text"
                  value={outerwearSize}
                  onChange={(e) => setOuterwearSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Fit Silhouette */}
          <div className="pt-2 border-t border-neutral-100">
            <label className="text-xs font-semibold text-neutral-700 block mb-1">
              Preferred Garment Silhouette
            </label>
            <select
              value={fitPreference}
              onChange={(e) =>
                setFitPreference(
                  e.target.value as 'Tailored' | 'Relaxed' | 'Oversized' | 'Regular'
                )
              }
              className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none focus:border-neutral-900 text-xs bg-white"
            >
              <option value="Tailored">Tailored & Architectural</option>
              <option value="Relaxed">Relaxed & Fluid</option>
              <option value="Oversized">Oversized Contemporary</option>
              <option value="Regular">Regular Classic</option>
            </select>
          </div>

          {statusMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 transition animate-in fade-in duration-200 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Shield className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-100">
            <p className="text-[11px] text-neutral-400">
              Settings automatically adjust styling recommendations across Smart Matcher and AI Assistant.
            </p>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 rounded-2xl text-white text-xs font-bold transition min-h-[44px] cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                isSaving
                  ? 'bg-neutral-600 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-black hover:scale-105 active:scale-95'
              }`}
            >
              {isSaving ? 'Saving to Server...' : 'Save Profile Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
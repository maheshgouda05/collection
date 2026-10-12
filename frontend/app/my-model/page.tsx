'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWardrobe } from '@/lib/wardrobeContext';
import {
  FaceShape,
  HairStyle,
  HairColour,
  SkinToneKey,
  SKIN_TONE_PALETTE,
} from '@/lib/types';
import HumanModel2D, { ClothingPreview } from '@/components/HumanModel2D';
import {
  User,
  Ruler,
  Check,
  RotateCcw,
  Shirt,
  Info,
  Save,
  Palette,
  Scissors,
  Smile,
  Sparkles,
  HelpCircle,
  FileText,
} from 'lucide-react';

const FACE_SHAPES: { key: FaceShape; label: string; desc: string }[] = [
  { key: 'Oval', label: 'Oval', desc: 'Balanced egg-silhouette with rounded chin' },
  { key: 'Round', label: 'Round', desc: 'Equal width & height with soft curved jaw' },
  { key: 'Square', label: 'Square', desc: 'Defined angular jaw corners & flat chin' },
  { key: 'Heart', label: 'Heart', desc: 'Wide forehead tapering to pointed chin' },
  { key: 'Diamond', label: 'Diamond', desc: 'Wide high cheekbones with narrow chin' },
  { key: 'Oblong', label: 'Oblong', desc: 'Elongated vertical silhouette with straight cheeks' },
];

const HAIRSTYLES: HairStyle[] = [
  'None / Clean',
  'Short Textured',
  'Bob Cut',
  'Long Wavy',
  'Sleek Bun',
  'Curly Afro',
  'Buzz Cut',
];

const HAIR_COLORS: { key: HairColour; hex: string }[] = [
  { key: 'Espresso Black', hex: '#1C1917' },
  { key: 'Chocolate Brown', hex: '#44281D' },
  { key: 'Honey Blonde', hex: '#D4AF37' },
  { key: 'Platinum', hex: '#E2E8F0' },
  { key: 'Auburn Red', hex: '#882215' },
  { key: 'Silver Grey', hex: '#94A3B8' },
];

export default function MyModelPage() {
  const { bodyProfile, updateBodyProfile, showToast } = useWardrobe();

  // 1. Core 6 Body Measurements (with sensible defaults)
  const [heightCm, setHeightCm] = useState<number>(() => bodyProfile.height || 175);
  const [weightKg, setWeightKg] = useState<number>(() => bodyProfile.weight || 68);
  const [chestCm, setChestCm] = useState<number>(() => bodyProfile.chestCm || 96);
  const [bicepsCm, setBicepsCm] = useState<number>(() => bodyProfile.bicepsCm || 32);
  const [wristCm, setWristCm] = useState<number>(() => bodyProfile.wristCm || 17);
  const [shouldersCm, setShouldersCm] = useState<number>(() => bodyProfile.shouldersCm || 44);

  // 2. Appearance Parameters
  const [skinTone, setSkinTone] = useState<SkinToneKey>(
    () => bodyProfile.appearance?.skinTone || 'Medium Golden'
  );
  const [customSkinColor, setCustomSkinColor] = useState<string>(
    () => bodyProfile.appearance?.customSkinColor || ''
  );
  const [useCustomSkin, setUseCustomSkin] = useState<boolean>(
    () => Boolean(bodyProfile.appearance?.customSkinColor)
  );
  const [faceShape, setFaceShape] = useState<FaceShape>(
    () => bodyProfile.appearance?.faceShape || 'Oval'
  );
  const [hairstyle, setHairstyle] = useState<HairStyle>(
    () => bodyProfile.appearance?.hairstyle || 'Short Textured'
  );
  const [hairColour, setHairColour] = useState<HairColour>(
    () => bodyProfile.appearance?.hairColour || 'Espresso Black'
  );
  const [customHairColor, setCustomHairColor] = useState<string>(
    () => bodyProfile.appearance?.customHairColor || ''
  );
  const [appearanceDescription, setAppearanceDescription] = useState<string>(
    () => bodyProfile.appearance?.appearanceDescription || ''
  );

  // 3. UI State
  const [clothingPreview, setClothingPreview] = useState<ClothingPreview>('none');
  const [showTapeGuides, setShowTapeGuides] = useState<boolean>(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Refs for input focus synchronization
  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync state if bodyProfile changes externally
  useEffect(() => {
    if (bodyProfile.height) setHeightCm(bodyProfile.height);
    if (bodyProfile.weight) setWeightKg(bodyProfile.weight);
    if (bodyProfile.chestCm) setChestCm(bodyProfile.chestCm);
    if (bodyProfile.bicepsCm) setBicepsCm(bodyProfile.bicepsCm);
    if (bodyProfile.wristCm) setWristCm(bodyProfile.wristCm);
    if (bodyProfile.shouldersCm) setShouldersCm(bodyProfile.shouldersCm);

    if (bodyProfile.appearance) {
      if (bodyProfile.appearance.skinTone) setSkinTone(bodyProfile.appearance.skinTone);
      if (bodyProfile.appearance.customSkinColor) {
        setCustomSkinColor(bodyProfile.appearance.customSkinColor);
        setUseCustomSkin(true);
      }
      if (bodyProfile.appearance.faceShape) setFaceShape(bodyProfile.appearance.faceShape);
      if (bodyProfile.appearance.hairstyle) setHairstyle(bodyProfile.appearance.hairstyle);
      if (bodyProfile.appearance.hairColour) setHairColour(bodyProfile.appearance.hairColour);
      if (bodyProfile.appearance.appearanceDescription) {
        setAppearanceDescription(bodyProfile.appearance.appearanceDescription);
      }
    }
  }, [bodyProfile]);

  // Handle live measurement selection from on-canvas tape guide
  const handleSelectMeasurement = (key: string) => {
    setFocusedField(key);
    const targetInput = inputsRef.current[key];
    if (targetInput) {
      targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetInput.focus();
    }
  };

  // Reset to default standard mannequin proportions
  const handleReset = () => {
    setHeightCm(175);
    setWeightKg(68);
    setChestCm(96);
    setBicepsCm(32);
    setWristCm(17);
    setShouldersCm(44);
    setSkinTone('Medium Golden');
    setUseCustomSkin(false);
    setFaceShape('Oval');
    setHairstyle('Short Textured');
    setHairColour('Espresso Black');
    setAppearanceDescription('');
    setSaveSuccess(false);
    showToast('Reset measurements and appearance to defaults');
  };

  // Save Model Settings to localStorage and Context
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBodyProfile({
        height: heightCm || 175,
        weight: weightKg || 68,
        chestCm: chestCm || 96,
        bicepsCm: bicepsCm || 32,
        wristCm: wristCm || 17,
        shouldersCm: shouldersCm || 44,
        appearance: {
          skinTone,
          customSkinColor: useCustomSkin ? customSkinColor : undefined,
          faceShape,
          hairstyle,
          hairColour,
          customHairColor: customHairColor || undefined,
          appearanceDescription,
        },
      });
      setSaveSuccess(true);
      showToast('2D Model and measurements saved successfully!');
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch {
      showToast('Error saving model settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 text-rose-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
            <User className="w-3 h-3" />
            <span>2D Body Model Studio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            My 2D Body Model
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 max-w-xl font-light">
            Adjust your six core measurements and appearance. Your personalized 2D avatar updates live in real time.
          </p>
        </div>

        {/* Global Action Header Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs cursor-pointer min-h-[42px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer min-h-[42px]"
          >
            <Save className="w-4 h-4 text-rose-400" />
            <span>{isSaving ? 'Saving...' : 'Save Model'}</span>
          </button>
        </div>
      </div>

      {/* Save Success Alert Banner */}
      {saveSuccess && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                Model settings saved to your device!
              </p>
              <p className="text-[11px] text-emerald-700">
                Your 2D model proportions and appearance have been stored and will be restored upon your return.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccess(false)}
            className="text-xs text-emerald-600 hover:text-emerald-900 underline font-medium cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mobile Sticky Quick Preview Header (So mobile users don't have to scroll) */}
      <div className="lg:hidden p-3 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-2 shadow-md">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border border-white/30"
            style={{ backgroundColor: useCustomSkin ? customSkinColor || '#D7A787' : skinTone }}
          />
          <span className="text-xs font-bold truncate">
            {heightCm}cm • {weightKg}kg • Chest {chestCm}cm
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const previewEl = document.getElementById('avatar-preview-container');
            if (previewEl) previewEl.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium"
        >
          View Full Preview ↓
        </button>
      </div>

      {/* Main Two-Column Layout (Form on Left, Live Avatar on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==================================================================== */}
        {/* LEFT COLUMN: BODY MEASUREMENTS & APPEARANCE SETTINGS */}
        {/* ==================================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-6">
          {/* SECTION 1: BODY MEASUREMENTS (EXACT 6 MEASUREMENTS ONLY) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                    Body Measurements
                  </h2>
                  <p className="text-xs text-neutral-500">
                    All values in standard metric units (cm, kg). Updates the avatar live.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* 1. Height */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'height'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('height')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Height <span className="text-[11px] font-normal text-neutral-500">(cm)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setHeightCm((prev) => Math.max(130, (prev || 175) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Height"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.height = el;
                      }}
                      type="number"
                      min={130}
                      max={220}
                      value={heightCm || ''}
                      placeholder="175"
                      onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setHeightCm((prev) => Math.min(220, (prev || 175) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Height"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">cm</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={130}
                    max={220}
                    value={heightCm || 175}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>130 cm</span>
                  <span className="font-semibold text-neutral-500">Default: 175 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* 2. Weight */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'weight'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('weight')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Weight <span className="text-[11px] font-normal text-neutral-500">(kg)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setWeightKg((prev) => Math.max(35, (prev || 68) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Weight"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.weight = el;
                      }}
                      type="number"
                      min={35}
                      max={150}
                      value={weightKg || ''}
                      placeholder="68"
                      onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setWeightKg((prev) => Math.min(150, (prev || 68) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Weight"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">kg</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={35}
                    max={150}
                    value={weightKg || 68}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>35 kg</span>
                  <span className="font-semibold text-neutral-500">Default: 68 kg</span>
                  <span>150 kg</span>
                </div>
              </div>

              {/* 3. Chest Circumference */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'chest'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('chest')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Chest Circumference{' '}
                    <span className="text-[11px] font-normal text-neutral-500">(cm)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setChestCm((prev) => Math.max(65, (prev || 96) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Chest"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.chest = el;
                      }}
                      type="number"
                      min={65}
                      max={145}
                      value={chestCm || ''}
                      placeholder="96"
                      onChange={(e) => setChestCm(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setChestCm((prev) => Math.min(145, (prev || 96) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Chest"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">cm</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={65}
                    max={145}
                    value={chestCm || 96}
                    onChange={(e) => setChestCm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>65 cm</span>
                  <span className="font-semibold text-neutral-500">
                    Around widest chest: 96 cm
                  </span>
                  <span>145 cm</span>
                </div>
              </div>

              {/* 4. Biceps Circumference */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'biceps'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('biceps')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Biceps Circumference{' '}
                    <span className="text-[11px] font-normal text-neutral-500">(cm)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setBicepsCm((prev) => Math.max(18, (prev || 32) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Biceps"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.biceps = el;
                      }}
                      type="number"
                      min={18}
                      max={55}
                      value={bicepsCm || ''}
                      placeholder="32"
                      onChange={(e) => setBicepsCm(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setBicepsCm((prev) => Math.min(55, (prev || 32) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Biceps"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">cm</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={18}
                    max={55}
                    value={bicepsCm || 32}
                    onChange={(e) => setBicepsCm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>18 cm</span>
                  <span className="font-semibold text-neutral-500">
                    Upper arm: 32 cm
                  </span>
                  <span>55 cm</span>
                </div>
              </div>

              {/* 5. Wrist Circumference */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'wrist'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('wrist')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Wrist Circumference{' '}
                    <span className="text-[11px] font-normal text-neutral-500">(cm)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setWristCm((prev) => Math.max(12, (prev || 17) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Wrist"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.wrist = el;
                      }}
                      type="number"
                      min={12}
                      max={26}
                      value={wristCm || ''}
                      placeholder="17"
                      onChange={(e) => setWristCm(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setWristCm((prev) => Math.min(26, (prev || 17) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Wrist"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">cm</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={12}
                    max={26}
                    value={wristCm || 17}
                    onChange={(e) => setWristCm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>12 cm</span>
                  <span className="font-semibold text-neutral-500">
                    Forearm & wrist: 17 cm
                  </span>
                  <span>26 cm</span>
                </div>
              </div>

              {/* 6. Shoulder-to-Shoulder Width */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  focusedField === 'shoulders'
                    ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20'
                    : 'border-neutral-200 bg-neutral-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement('shoulders')}
                    className="text-left text-xs font-bold text-neutral-800 hover:text-rose-600 transition cursor-pointer"
                  >
                    Shoulder-to-Shoulder Width{' '}
                    <span className="text-[11px] font-normal text-neutral-500">(cm)</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShouldersCm((prev) => Math.max(30, (prev || 44) - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Decrease Shoulders"
                    >
                      -
                    </button>
                    <input
                      ref={(el) => {
                        inputsRef.current.shoulders = el;
                      }}
                      type="number"
                      min={30}
                      max={62}
                      value={shouldersCm || ''}
                      placeholder="44"
                      onChange={(e) => setShouldersCm(Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-center focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShouldersCm((prev) => Math.min(62, (prev || 44) + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold text-sm touch-manipulation cursor-pointer active:scale-95 shadow-xs"
                      aria-label="Increase Shoulders"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-neutral-500 ml-1">cm</span>
                  </div>
                </div>
                <div className="py-1">
                  <input
                    type="range"
                    min={30}
                    max={62}
                    value={shouldersCm || 44}
                    onChange={(e) => setShouldersCm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>30 cm</span>
                  <span className="font-semibold text-neutral-500">
                    Shoulder span: 44 cm
                  </span>
                  <span>62 cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: APPEARANCE CUSTOMIZATION */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                  Appearance Settings
                </h2>
                <p className="text-xs text-neutral-500">
                  Customize your skin tone, face shape, and hair styling.
                </p>
              </div>
            </div>

            {/* A. Realistic Skin Tone Palette */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                Skin Tone Colour
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SKIN_TONE_PALETTE.map((tone) => (
                  <button
                    key={tone.key}
                    type="button"
                    onClick={() => {
                      setSkinTone(tone.key);
                      setUseCustomSkin(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      !useCustomSkin && skinTone === tone.key
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900/40'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className="w-5 h-5 rounded-full border border-white/40 shadow-xs"
                        style={{ backgroundColor: tone.hex }}
                      />
                      {!useCustomSkin && skinTone === tone.key && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{tone.label}</span>
                      <span
                        className={`text-[10px] ${
                          !useCustomSkin && skinTone === tone.key
                            ? 'text-neutral-300'
                            : 'text-neutral-500'
                        }`}
                      >
                        {tone.undertone} undertone
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Skin Color Picker */}
              <div className="mt-2 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    Custom Skin Tone Hex
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Use color dropper or type hex value
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customSkinColor || '#D7A787'}
                    onChange={(e) => {
                      setCustomSkinColor(e.target.value);
                      setUseCustomSkin(true);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300 bg-transparent"
                  />
                  <input
                    type="text"
                    value={customSkinColor}
                    placeholder="#D7A787"
                    onChange={(e) => {
                      setCustomSkinColor(e.target.value);
                      setUseCustomSkin(true);
                    }}
                    className="w-20 px-2 py-1 text-xs border border-neutral-300 rounded-lg font-mono uppercase bg-white text-neutral-900"
                  />
                  {useCustomSkin && (
                    <button
                      type="button"
                      onClick={() => setUseCustomSkin(false)}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* B. Face Shape Selector (Oval, Round, Square, Heart, Diamond, Oblong) */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                Face Shape Outline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FACE_SHAPES.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFaceShape(f.key)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      faceShape === f.key
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{f.label}</span>
                      {faceShape === f.key && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <p
                      className={`text-[10px] leading-snug ${
                        faceShape === f.key ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {f.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* C. Optional Hairstyle & Hair Colour */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                Hairstyle & Hair Colour{' '}
                <span className="text-[10px] font-normal text-neutral-400">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {HAIRSTYLES.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHairstyle(h)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition cursor-pointer truncate ${
                      hairstyle === h
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* Hair Color Swatches */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {HAIR_COLORS.map((hc) => (
                  <button
                    key={hc.key}
                    type="button"
                    onClick={() => {
                      setHairColour(hc.key);
                      setCustomHairColor('');
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      hairColour === hc.key && !customHairColor
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-neutral-300 shrink-0"
                      style={{ backgroundColor: hc.hex }}
                    />
                    <span>{hc.key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* D. Optional Appearance Description */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                Describe Your Appearance{' '}
                <span className="text-[10px] font-normal text-neutral-400">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={appearanceDescription}
                onChange={(e) => setAppearanceDescription(e.target.value)}
                placeholder="e.g. Athletic build, high cheekbones, dark wavy hair. Saved for future AI styling features."
                className="w-full p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
              />
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                This description is saved locally to your device. It will be ready for future AI styling integrations.
              </p>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between gap-3 p-4 rounded-3xl bg-neutral-50 border border-neutral-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black transition cursor-pointer"
            >
              Reset to Defaults
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4 text-rose-400" />
              <span>{isSaving ? 'Saving...' : 'Save Model Settings'}</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: LARGE LIVE 2D AVATAR PREVIEW (Sticky on desktop) */}
        {/* ==================================================================== */}
        <div
          id="avatar-preview-container"
          className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-6 space-y-4"
        >
          <div className="h-[580px] sm:h-[640px] lg:h-[680px] w-full">
            <HumanModel2D
              heightCm={heightCm}
              weightKg={weightKg}
              chestCm={chestCm}
              bicepsCm={bicepsCm}
              wristCm={wristCm}
              shouldersCm={shouldersCm}
              skinTone={skinTone}
              customSkinColor={useCustomSkin ? customSkinColor : undefined}
              faceShape={faceShape}
              hairstyle={hairstyle}
              hairColour={hairColour}
              customHairColor={customHairColor}
              clothingPreview={clothingPreview}
              onClothingPreviewChange={setClothingPreview}
              showTapeGuides={showTapeGuides}
              onToggleTapeGuides={() => setShowTapeGuides((v) => !v)}
              onSelectMeasurement={handleSelectMeasurement}
            />
          </div>

          {/* Sizing & Virtual Try-On Disclaimer Card */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs flex items-start gap-3">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-neutral-900 block">
                Illustrative 2D Model Preview
              </span>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                This preview provides an anatomically balanced visual representation of your
                measurements. Clothing overlays are illustrative styling layers; precise 3D fabric
                drape analysis will be available in future updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useWardrobe } from '@/lib/wardrobeContext';
import {
  BodyShape,
  FaceShape,
  HairStyle,
  HairColour,
  SkinToneKey,
  WardrobeItem,
  TryOnResult,
  Body3DParams,
  Appearance3DParams,
  PoseOption,
  ViewModeOption,
  FacialHairOption,
  EyeColorOption,
} from '@/lib/types';
import {
  DEFAULT_BODY_3D_PARAMS,
  DEFAULT_APPEARANCE_3D_PARAMS,
} from '@/lib/mock/bodyProfile';
import { tryOnService } from '@/lib/services/tryOnService';
import {
  User,
  Sparkles,
  Camera,
  Ruler,
  Check,
  RotateCcw,
  Shirt,
  Info,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Layers,
  Sliders,
  Eye,
  RefreshCw,
  Maximize2,
  ShieldAlert,
  Save,
  Palette,
  Scissors,
  Smile,
} from 'lucide-react';

// Dynamic import of 3D Canvas with SSR disabled
const HumanModel3D = dynamic(() => import('@/components/HumanModel3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#121B2F] text-neutral-400 gap-3 min-h-[380px]">
      <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-300">
        Loading 3D Anatomical Studio...
      </p>
    </div>
  ),
});

const BODY_SHAPE_PRESETS: {
  key: string;
  label: string;
  desc: string;
  params: Partial<Body3DParams>;
}[] = [
  {
    key: 'slim',
    label: 'Slim',
    desc: 'Lean linear frame with slender contours',
    params: {
      build: 22,
      muscle: 25,
      bodyFat: 16,
      shoulderWidth: 42,
      chestWidth: 36,
      waistWidth: 28,
      hipWidth: 38,
      armThickness: 32,
      legThickness: 34,
    },
  },
  {
    key: 'athletic',
    label: 'Athletic',
    desc: 'Toned muscular back, tapered waist, defined shoulders',
    params: {
      build: 56,
      muscle: 76,
      bodyFat: 20,
      shoulderWidth: 68,
      chestWidth: 65,
      waistWidth: 32,
      hipWidth: 44,
      armThickness: 62,
      legThickness: 60,
    },
  },
  {
    key: 'average',
    label: 'Average',
    desc: 'Harmonious balanced proportions',
    params: {
      build: 45,
      muscle: 40,
      bodyFat: 30,
      shoulderWidth: 50,
      chestWidth: 48,
      waistWidth: 38,
      hipWidth: 52,
      armThickness: 45,
      legThickness: 48,
    },
  },
  {
    key: 'broad',
    label: 'Broad',
    desc: 'Powerful shoulder span and wider ribcage',
    params: {
      build: 66,
      muscle: 58,
      bodyFat: 35,
      shoulderWidth: 78,
      chestWidth: 68,
      waistWidth: 48,
      hipWidth: 52,
      armThickness: 58,
      legThickness: 56,
    },
  },
  {
    key: 'curvy',
    label: 'Curvy',
    desc: 'Pronounced hip-to-waist ratio and defined bust',
    params: {
      build: 55,
      muscle: 32,
      bodyFat: 42,
      shoulderWidth: 48,
      chestWidth: 62,
      waistWidth: 26,
      hipWidth: 76,
      armThickness: 46,
      legThickness: 58,
    },
  },
  {
    key: 'plus',
    label: 'Plus-Size',
    desc: 'Generous softened silhouette with relaxed waist',
    params: {
      build: 82,
      muscle: 35,
      bodyFat: 68,
      shoulderWidth: 56,
      chestWidth: 72,
      waistWidth: 65,
      hipWidth: 75,
      armThickness: 65,
      legThickness: 68,
    },
  },
];

const FACE_SHAPES: FaceShape[] = ['Oval', 'Round', 'Square', 'Heart', 'Diamond'];

const HAIRSTYLES: HairStyle[] = [
  'Long Wavy',
  'Bob Cut',
  'Short Textured',
  'Sleek Bun',
  'Curly Afro',
  'Buzz Cut',
];

const HAIR_COLORS: HairColour[] = [
  'Espresso Black',
  'Chocolate Brown',
  'Honey Blonde',
  'Platinum',
  'Auburn Red',
  'Silver Grey',
];

const SKIN_TONES: SkinToneKey[] = [
  'Fair',
  'Light Warm',
  'Medium Golden',
  'Olive',
  'Rich Deep',
  'Ebony',
];

const FACIAL_HAIR_OPTIONS: FacialHairOption[] = [
  'None',
  'Stubble',
  'Trimmed Beard',
  'Full Beard',
  'Mustache',
];

const EYE_COLORS: EyeColorOption[] = [
  'Dark Brown',
  'Hazel',
  'Green',
  'Blue',
  'Grey',
  'Amber',
];

export default function MyModelPage() {
  const { bodyProfile, updateBodyProfile, items, showToast } = useWardrobe();

  // 1. Core 3D Body Parameters
  const [bodyParams, setBodyParams] = useState<Body3DParams>(() => {
    return {
      ...DEFAULT_BODY_3D_PARAMS,
      ...(bodyProfile.body3D || {}),
      heightCm: bodyProfile.height || 174,
      weightKg: bodyProfile.weight || 64,
      unitSystem: bodyProfile.unitSystem || 'metric',
      shouldersCm: bodyProfile.shouldersCm || 42,
      chestCm: bodyProfile.chestCm || 90,
      waistCm: bodyProfile.waistCm || 68,
      hipsCm: bodyProfile.hipsCm || 96,
    };
  });

  // 2. Core 3D Appearance Parameters
  const [appearanceParams, setAppearanceParams] = useState<Appearance3DParams>(() => {
    return {
      ...DEFAULT_APPEARANCE_3D_PARAMS,
      ...(bodyProfile.appearance3D || {}),
      faceShape: bodyProfile.appearance?.faceShape || 'Oval',
      hairstyle: bodyProfile.appearance?.hairstyle || 'Long Wavy',
      hairColour: bodyProfile.appearance?.hairColour || 'Espresso Black',
      skinTone: bodyProfile.appearance?.skinTone || 'Medium Golden',
      facePhotoUrl: bodyProfile.appearance?.facePhotoUrl || DEFAULT_APPEARANCE_3D_PARAMS.facePhotoUrl,
    };
  });

  // 3. Studio Camera & Pose Controls
  const [pose, setPose] = useState<PoseOption>('apose');
  const [viewMode, setViewMode] = useState<ViewModeOption>('front');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showReferenceSheet, setShowReferenceSheet] = useState(false);

  // 4. Mobile Bottom Sheet State
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'body' | 'face' | 'hair' | 'skin' | 'measurements' | 'clothes'
  >('body');

  // 5. Clothing & Virtual Try-On
  const [activeItemForTryOn, setActiveItemForTryOn] = useState<WardrobeItem | null>(
    items[0] || null
  );
  const [selectedTryOnSize, setSelectedTryOnSize] = useState<string>(
    items[0]?.size || 'M'
  );
  const [tryOnResult, setTryOnResult] = useState<TryOnResult | null>(null);

  // Recalculate virtual try-on whenever item, size, or body proportions change
  useEffect(() => {
    if (!activeItemForTryOn) {
      setTryOnResult(null);
      return;
    }
    let isCancelled = false;
    tryOnService
      .simulateTryOn(
        {
          ...bodyProfile,
          height: bodyParams.heightCm,
          weight: bodyParams.weightKg,
          bodyType: 'Hourglass',
          shouldersCm: bodyParams.shouldersCm,
          chestCm: bodyParams.chestCm,
          waistCm: bodyParams.waistCm,
          hipsCm: bodyParams.hipsCm,
        },
        activeItemForTryOn,
        selectedTryOnSize
      )
      .then((res) => {
        if (!isCancelled) {
          setTryOnResult(res);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [
    activeItemForTryOn,
    selectedTryOnSize,
    bodyParams.heightCm,
    bodyParams.weightKg,
    bodyParams.shouldersCm,
    bodyParams.chestCm,
    bodyParams.waistCm,
    bodyParams.hipsCm,
    bodyProfile,
  ]);

  // Unit conversion helpers
  const isMetric = bodyParams.unitSystem === 'metric';
  const displayedHeight = isMetric
    ? bodyParams.heightCm
    : Math.round(bodyParams.heightCm / 2.54);
  const displayedWeight = isMetric
    ? bodyParams.weightKg
    : Math.round(bodyParams.weightKg * 2.20462);

  const setUnitSystem = (unit: 'metric' | 'imperial') => {
    setBodyParams((prev) => ({ ...prev, unitSystem: unit }));
  };

  const handleHeightChange = (val: number) => {
    const cm = isMetric ? val : Math.round(val * 2.54);
    setBodyParams((prev) => ({ ...prev, heightCm: cm }));
  };

  const handleWeightChange = (val: number) => {
    const kg = isMetric ? val : Math.round(val / 2.20462);
    setBodyParams((prev) => ({ ...prev, weightKg: kg }));
  };

  // Tape Measurement inputs update proportions approximately
  const handleTapeChange = (key: 'chestCm' | 'waistCm' | 'hipsCm' | 'shouldersCm', val: number) => {
    const cmVal = isMetric ? val : Math.round(val * 2.54);
    setBodyParams((prev) => {
      const updated = { ...prev, [key]: cmVal };
      if (key === 'waistCm') {
        const mapped = Math.min(95, Math.max(10, Math.round(((cmVal - 55) / 55) * 100)));
        updated.waistWidth = mapped;
      } else if (key === 'chestCm') {
        const mapped = Math.min(95, Math.max(10, Math.round(((cmVal - 75) / 50) * 100)));
        updated.chestWidth = mapped;
      } else if (key === 'hipsCm') {
        const mapped = Math.min(95, Math.max(10, Math.round(((cmVal - 80) / 50) * 100)));
        updated.hipWidth = mapped;
      } else if (key === 'shouldersCm') {
        const mapped = Math.min(95, Math.max(10, Math.round(((cmVal - 34) / 24) * 100)));
        updated.shoulderWidth = mapped;
      }
      return updated;
    });
  };

  // Apply Body Shape Preset
  const applyPreset = (presetKey: string) => {
    const found = BODY_SHAPE_PRESETS.find((p) => p.key === presetKey);
    if (!found) return;
    setBodyParams((prev) => ({
      ...prev,
      ...found.params,
    }));
    showToast(`Applied ${found.label} proportion preset`);
  };

  // Reset to default
  const handleResetBody = () => {
    setBodyParams(DEFAULT_BODY_3D_PARAMS);
    setAppearanceParams(DEFAULT_APPEARANCE_3D_PARAMS);
    showToast('Reset 3D mannequin to default anatomical proportions');
  };

  // Face Photo File Upload
  const handleFacePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAppearanceParams((prev) => ({
        ...prev,
        facePhotoUrl: previewUrl,
      }));
      showToast('Face photo updated (saved as preview URL)');
    }
  };

  // Save Model Profile (stored through modelService as JSON)
  const [isSaving, setIsSaving] = useState(false);
  const handleSaveModel = async () => {
    setIsSaving(true);
    try {
      await updateBodyProfile({
        height: bodyParams.heightCm,
        weight: bodyParams.weightKg,
        unitSystem: bodyParams.unitSystem,
        shouldersCm: bodyParams.shouldersCm,
        chestCm: bodyParams.chestCm,
        waistCm: bodyParams.waistCm,
        hipsCm: bodyParams.hipsCm,
        appearance: {
          facePhotoUrl: appearanceParams.facePhotoUrl,
          faceShape: appearanceParams.faceShape,
          hairstyle: appearanceParams.hairstyle,
          hairColour: appearanceParams.hairColour,
          skinTone: appearanceParams.skinTone,
        },
        body3D: bodyParams,
        appearance3D: appearanceParams,
      });
      showToast('3D Mannequin profile saved successfully!');
    } catch {
      showToast('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 text-rose-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
            <User className="w-3 h-3" />
            <span>Clay Anatomical Studio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            My Model
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 max-w-xl font-light">
            Interactive neutral grey 3D mannequin. Rotate, inspect angles, and calibrate body
            proportions live.
          </p>
        </div>

        {/* Global Action Header Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Unit Toggle */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-2xl p-1 text-xs font-semibold shadow-xs">
            <button
              type="button"
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer min-h-[38px] ${
                isMetric
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Metric (cm/kg)
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer min-h-[38px] ${
                !isMetric
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Imperial (in/lb)
            </button>
          </div>

          {/* Save Model Button */}
          <button
            type="button"
            onClick={handleSaveModel}
            disabled={isSaving}
            className="px-4 py-2 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <Save className="w-4 h-4 text-rose-400" />
            <span>{isSaving ? 'Saving...' : 'Save Model'}</span>
          </button>
        </div>
      </div>

      {/* MAIN VIEWPORT & CONTROLS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ==================================================================== */}
        {/* TOP / LEFT: 3D MODEL VIEWPORT (Fills top 56% on mobile, stays visible) */}
        {/* ==================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 sticky top-2 z-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#090D16] border border-neutral-800 shadow-2xl">
            {/* Viewport Top Studio Bar */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
              {/* Display Mode Toggle (Clay Mannequin vs Realistic Coloured) */}
              <div className="pointer-events-auto flex items-center bg-black/70 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() =>
                    setAppearanceParams((p) => ({ ...p, displayMode: 'mannequin' }))
                  }
                  className={`px-2.5 py-1 rounded-xl transition min-h-[36px] ${
                    appearanceParams.displayMode === 'mannequin'
                      ? 'bg-white text-neutral-900 font-bold shadow-xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Clay Mannequin
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setAppearanceParams((p) => ({ ...p, displayMode: 'coloured' }))
                  }
                  className={`px-2.5 py-1 rounded-xl transition min-h-[36px] ${
                    appearanceParams.displayMode === 'coloured'
                      ? 'bg-rose-500 text-white font-bold shadow-xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Coloured Mode
                </button>
              </div>

              {/* Reference Sheet Mode Toggle */}
              <button
                type="button"
                onClick={() => setShowReferenceSheet((v) => !v)}
                title="Toggle Triple-Angle Reference Sheet"
                className={`pointer-events-auto min-w-[40px] min-h-[38px] px-2.5 py-1 rounded-2xl border text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md transition shadow-lg ${
                  showReferenceSheet
                    ? 'bg-white text-neutral-900 border-white'
                    : 'bg-black/70 text-neutral-300 border-white/10 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reference Sheet</span>
              </button>
            </div>

            {/* Standard Interactive 3D Canvas (Top 55-58% on mobile) */}
            {!showReferenceSheet ? (
              <div className="h-[52vh] sm:h-[56vh] lg:h-[620px] w-full relative">
                <HumanModel3D
                  bodyParams={bodyParams}
                  appearanceParams={appearanceParams}
                  clothing={activeItemForTryOn}
                  pose={pose}
                  viewMode={viewMode}
                  autoRotate={autoRotate}
                  onAutoRotateToggle={setAutoRotate}
                  onViewChange={(v) => {
                    if (v !== 'reference_sheet') setViewMode(v);
                  }}
                />
              </div>
            ) : (
              /* Triple Angle Reference Sheet View (Front / Side / Back side-by-side) */
              <div className="p-3 bg-[#0B0F19] text-white">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-rose-300">
                      Triple-Angle Reference Sheet
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReferenceSheet(false)}
                    className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    Close Sheet
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 h-[46vh] sm:h-[52vh] lg:h-[560px]">
                  {/* Front Snapshot */}
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/10 flex flex-col items-center">
                    <div className="absolute top-1.5 left-1.5 z-10 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-neutral-300">
                      Front
                    </div>
                    <div className="w-full h-full">
                      <HumanModel3D
                        bodyParams={bodyParams}
                        appearanceParams={appearanceParams}
                        clothing={activeItemForTryOn}
                        pose={pose}
                        viewMode="front"
                        autoRotate={false}
                        showControlsOverlay={false}
                      />
                    </div>
                  </div>

                  {/* Side Profile Snapshot */}
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/10 flex flex-col items-center">
                    <div className="absolute top-1.5 left-1.5 z-10 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-neutral-300">
                      Side
                    </div>
                    <div className="w-full h-full">
                      <HumanModel3D
                        bodyParams={bodyParams}
                        appearanceParams={appearanceParams}
                        clothing={activeItemForTryOn}
                        pose={pose}
                        viewMode="side"
                        autoRotate={false}
                        showControlsOverlay={false}
                      />
                    </div>
                  </div>

                  {/* Back Snapshot */}
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/10 flex flex-col items-center">
                    <div className="absolute top-1.5 left-1.5 z-10 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-neutral-300">
                      Back
                    </div>
                    <div className="w-full h-full">
                      <HumanModel3D
                        bodyParams={bodyParams}
                        appearanceParams={appearanceParams}
                        clothing={activeItemForTryOn}
                        pose={pose}
                        viewMode="back"
                        autoRotate={false}
                        showControlsOverlay={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Viewport Bottom Quick Sub-bar: Pose Selector & Reset */}
            <div className="p-2.5 bg-neutral-950/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <span className="text-[11px] text-neutral-400 hidden sm:inline">Pose:</span>
                {(['apose', 'stand', 'relaxed'] as PoseOption[]).map((pOption) => (
                  <button
                    key={pOption}
                    type="button"
                    onClick={() => setPose(pOption)}
                    className={`min-h-[38px] px-2.5 py-1 rounded-xl font-medium capitalize transition cursor-pointer text-xs ${
                      pose === pOption
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {pOption === 'apose' ? 'A-Pose' : pOption}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetBody}
                  className="min-h-[38px] px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white flex items-center gap-1 transition text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* BOTTOM SHEET / RIGHT PANEL: 6 TABS (Body, Face, Hair, Skin, Tape, Clothes) */}
        {/* ==================================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-3">
          {/* Mobile Drag Indicator & Collapse/Expand Bar */}
          <div className="lg:hidden flex items-center justify-between px-3 py-1 bg-neutral-100 rounded-2xl border border-neutral-200">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
              Model Controls ({activeTab})
            </span>
            <button
              type="button"
              onClick={() => setIsBottomSheetExpanded((v) => !v)}
              className="text-xs text-neutral-600 flex items-center gap-1 py-1 px-2 font-medium"
            >
              {isBottomSheetExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" /> Compact View
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" /> Expand Controls
                </>
              )}
            </button>
          </div>

          {/* 6 Tabs Bar (Body, Face, Hair, Skin, Measurements, Clothes) */}
          <div className="flex items-center overflow-x-auto p-1 rounded-2xl bg-white border border-neutral-200/90 shadow-xs no-scrollbar gap-1 text-xs font-semibold">
            {[
              { key: 'body' as const, label: 'Body', icon: User },
              { key: 'face' as const, label: 'Face', icon: Smile },
              { key: 'hair' as const, label: 'Hair', icon: Scissors },
              { key: 'skin' as const, label: 'Skin', icon: Palette },
              { key: 'measurements' as const, label: 'Measurements', icon: Ruler },
              { key: 'clothes' as const, label: 'Clothes', icon: Shirt },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 min-h-[44px] px-2.5 py-1.5 rounded-xl whitespace-nowrap flex items-center justify-center gap-1.5 transition cursor-pointer text-xs ${
                    activeTab === tab.key
                      ? 'bg-neutral-900 text-white shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: BODY (Presets, Height, Weight, Build, Muscle, Body Fat, Sliders) */}
          {activeTab === 'body' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              {/* Presets Grid */}
              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1.5">
                  Body Shape Archetypes
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BODY_SHAPE_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => applyPreset(preset.key)}
                      className="p-2.5 rounded-2xl border border-neutral-200 hover:border-neutral-900 text-left transition hover:bg-neutral-50 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[64px]"
                    >
                      <span className="text-xs font-bold text-neutral-900">{preset.label}</span>
                      <span className="text-[10px] text-neutral-500 line-clamp-2 leading-tight">
                        {preset.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Height & Weight Sliders */}
              <div className="space-y-3.5 pt-2 border-t border-neutral-100">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-neutral-800">Height</span>
                    <span className="font-serif font-bold text-neutral-900">
                      {displayedHeight} {isMetric ? 'cm' : 'in'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isMetric ? 140 : 55}
                    max={isMetric ? 210 : 83}
                    value={displayedHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    aria-label="Height slider"
                    className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-neutral-800">Weight</span>
                    <span className="font-serif font-bold text-neutral-900">
                      {displayedWeight} {isMetric ? 'kg' : 'lb'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isMetric ? 40 : 88}
                    max={isMetric ? 140 : 308}
                    value={displayedWeight}
                    onChange={(e) => handleWeightChange(Number(e.target.value))}
                    aria-label="Weight slider"
                    className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-neutral-800">
                      Gender Presentation Blend
                    </span>
                    <span className="text-[11px] text-neutral-600 font-medium">
                      {bodyParams.genderBlend < 40
                        ? 'Feminine'
                        : bodyParams.genderBlend > 60
                        ? 'Masculine'
                        : 'Neutral'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={bodyParams.genderBlend}
                    onChange={(e) =>
                      setBodyParams((p) => ({ ...p, genderBlend: Number(e.target.value) }))
                    }
                    aria-label="Gender presentation blend slider"
                    className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                  />
                </div>

                {/* Muscle & Softness */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-neutral-800">Muscle Tone</span>
                      <span className="text-neutral-500 font-mono text-[11px]">
                        {bodyParams.muscle}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={bodyParams.muscle}
                      onChange={(e) =>
                        setBodyParams((p) => ({ ...p, muscle: Number(e.target.value) }))
                      }
                      aria-label="Muscle tone slider"
                      className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-neutral-800">Body Softness</span>
                      <span className="text-neutral-500 font-mono text-[11px]">
                        {bodyParams.bodyFat}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={bodyParams.bodyFat}
                      onChange={(e) =>
                        setBodyParams((p) => ({ ...p, bodyFat: Number(e.target.value) }))
                      }
                      aria-label="Body softness slider"
                      className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Live Proportion Morphing Sliders */}
                <div className="pt-3 border-t border-neutral-100 space-y-3">
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                    Part Morphing Sliders
                  </span>
                  {[
                    { key: 'shoulderWidth', label: 'Shoulder Span', val: bodyParams.shoulderWidth },
                    { key: 'chestWidth', label: 'Chest / Ribcage', val: bodyParams.chestWidth },
                    { key: 'waistWidth', label: 'Waist Taper', val: bodyParams.waistWidth },
                    { key: 'hipWidth', label: 'Hip / Pelvis', val: bodyParams.hipWidth },
                    { key: 'armLength', label: 'Arm Length', val: bodyParams.armLength },
                    { key: 'armThickness', label: 'Arm Thickness', val: bodyParams.armThickness },
                    { key: 'legLength', label: 'Leg Length', val: bodyParams.legLength },
                    { key: 'legThickness', label: 'Leg Thickness', val: bodyParams.legThickness },
                    { key: 'neckLength', label: 'Neck Length', val: bodyParams.neckLength },
                  ].map((slider) => (
                    <div key={slider.key}>
                      <div className="flex justify-between items-center text-xs mb-0.5">
                        <span className="font-medium text-neutral-700">{slider.label}</span>
                        <span className="font-mono text-neutral-400 text-[10px]">
                          {slider.val}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={95}
                        value={slider.val}
                        onChange={(e) =>
                          setBodyParams((prev) => ({
                            ...prev,
                            [slider.key]: Number(e.target.value),
                          }))
                        }
                        aria-label={`${slider.label} slider`}
                        className="w-full accent-neutral-900 cursor-pointer min-h-[44px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACE (Face Shape, Facial Hair, Eye Color, Face Photo Upload) */}
          {activeTab === 'face' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-2">
                  Face Shape
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FACE_SHAPES.map((fShape) => (
                    <button
                      key={fShape}
                      type="button"
                      onClick={() =>
                        setAppearanceParams((p) => ({ ...p, faceShape: fShape }))
                      }
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        appearanceParams.faceShape === fShape
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {fShape}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-100">
                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                    Facial Hair
                  </label>
                  <select
                    value={appearanceParams.facialHair}
                    onChange={(e) =>
                      setAppearanceParams((p) => ({
                        ...p,
                        facialHair: e.target.value as FacialHairOption,
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[44px]"
                  >
                    {FACIAL_HAIR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                    Eye Colour
                  </label>
                  <select
                    value={appearanceParams.eyeColor}
                    onChange={(e) =>
                      setAppearanceParams((p) => ({
                        ...p,
                        eyeColor: e.target.value as EyeColorOption,
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[44px]"
                  >
                    {EYE_COLORS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Face Photo Profile Upload (Honest label: profile image preview) */}
              <div className="pt-3 border-t border-neutral-100">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                  Face Portrait Photo
                </label>
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  {appearanceParams.facePhotoUrl ? (
                    <img
                      src={appearanceParams.facePhotoUrl}
                      alt="Uploaded face portrait"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 shrink-0">
                      <Camera className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 text-xs">
                    <p className="text-neutral-700 font-medium">Model Profile Portrait</p>
                    <p className="text-[10px] text-neutral-500 mb-2">
                      Displayed as your profile portrait preview.
                    </p>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs cursor-pointer hover:bg-black transition min-h-[38px]">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFacePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HAIR (6 Hairstyles + Swappable 3D meshes + Hair colors) */}
          {activeTab === 'hair' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-2">
                  Hairstyle (3D Swappable)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HAIRSTYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        setAppearanceParams((p) => ({ ...p, hairstyle: style }))
                      }
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border text-left transition cursor-pointer ${
                        appearanceParams.hairstyle === style
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Hair Colour
                  </label>
                  <span className="text-xs text-neutral-500 font-medium">
                    {appearanceParams.hairColour}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {HAIR_COLORS.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() =>
                        setAppearanceParams((p) => ({
                          ...p,
                          hairColour: col,
                          customHairColor: undefined,
                        }))
                      }
                      className={`min-h-[44px] p-2 rounded-xl border text-[11px] font-medium flex flex-col items-center justify-center transition cursor-pointer ${
                        appearanceParams.hairColour === col && !appearanceParams.customHairColor
                          ? 'border-neutral-900 ring-2 ring-neutral-900 font-bold bg-neutral-100'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <span className="text-center leading-tight">{col}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SKIN (6 Swatches + Custom Hex + Clay Mannequin Toggle) */}
          {activeTab === 'skin' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-2">
                  Skin Tone Swatches
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() =>
                        setAppearanceParams((p) => ({
                          ...p,
                          skinTone: tone,
                          customSkinColor: undefined,
                          displayMode: 'coloured',
                        }))
                      }
                      className={`min-h-[44px] p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                        appearanceParams.skinTone === tone && !appearanceParams.customSkinColor
                          ? 'border-neutral-900 ring-2 ring-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shrink-0"
                        style={{
                          backgroundColor:
                            tone === 'Fair'
                              ? '#F6D9CA'
                              : tone === 'Light Warm'
                              ? '#EDC4AF'
                              : tone === 'Medium Golden'
                              ? '#D7A787'
                              : tone === 'Olive'
                              ? '#B8825D'
                              : tone === 'Rich Deep'
                              ? '#8A5333'
                              : '#422416',
                        }}
                      />
                      <span className="text-xs font-medium text-neutral-800">{tone}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Custom Skin Tint</span>
                  <span className="text-[11px] text-neutral-500">Fine-tune tone</span>
                </div>
                <input
                  type="color"
                  value={appearanceParams.customSkinColor || '#D7A787'}
                  onChange={(e) =>
                    setAppearanceParams((p) => ({
                      ...p,
                      customSkinColor: e.target.value,
                      displayMode: 'coloured',
                    }))
                  }
                  className="w-12 h-10 rounded-xl cursor-pointer border border-neutral-200 min-h-[40px]"
                />
              </div>
            </div>
          )}

          {/* TAB 5: MEASUREMENTS (cm / in inputs with approximate preview label) */}
          {activeTab === 'measurements' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-4 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Tailoring Tape Measurements
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                  <strong>Approximate preview:</strong> Entering real measurements updates
                  the mannequin proportions approximately. Never exact fit.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    key: 'shouldersCm' as const,
                    label: 'Shoulder Breadth',
                    val: isMetric
                      ? bodyParams.shouldersCm || 42
                      : Math.round((bodyParams.shouldersCm || 42) / 2.54),
                  },
                  {
                    key: 'chestCm' as const,
                    label: 'Chest / Bust',
                    val: isMetric
                      ? bodyParams.chestCm || 90
                      : Math.round((bodyParams.chestCm || 90) / 2.54),
                  },
                  {
                    key: 'waistCm' as const,
                    label: 'Waist',
                    val: isMetric
                      ? bodyParams.waistCm || 68
                      : Math.round((bodyParams.waistCm || 68) / 2.54),
                  },
                  {
                    key: 'hipsCm' as const,
                    label: 'Hips',
                    val: isMetric
                      ? bodyParams.hipsCm || 96
                      : Math.round((bodyParams.hipsCm || 96) / 2.54),
                  },
                ].map((item) => (
                  <div key={item.key} className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      {item.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={item.val}
                        onChange={(e) => handleTapeChange(item.key, Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[44px]"
                      />
                      <span className="absolute right-3 top-3 text-xs text-neutral-400 font-medium">
                        {isMetric ? 'cm' : 'in'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CLOTHES (Honest Garment Overlay & Try-On Service) */}
          {activeTab === 'clothes' && (
            <div
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-4 overflow-y-auto ${
                isBottomSheetExpanded ? 'max-h-[70vh]' : 'max-h-[45vh] lg:max-h-none'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shirt className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Garment Silhouette Overlay
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600">
                  Select an item from your collection to drape over the 3D mannequin.
                </p>
              </div>

              {/* Items Picker Carousel */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-700 block">
                  Choose Item from Closet:
                </span>
                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveItemForTryOn(item);
                        setSelectedTryOnSize(item.size || 'M');
                      }}
                      className={`min-h-[44px] p-2 rounded-2xl border flex items-center gap-2 text-left transition cursor-pointer ${
                        activeItemForTryOn?.id === item.id
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="truncate text-xs">
                        <p className="font-semibold truncate">{item.name}</p>
                        <p className="text-[10px] opacity-75">{item.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Try-On Results & Honest Disclaimer */}
              {tryOnResult && (
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fit Analysis & Silhouette</span>
                  </div>
                  <p className="text-neutral-700">{tryOnResult.fitNotes}</p>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    {tryOnResult.silhouetteEffect}
                  </p>
                  <div className="pt-2 border-t border-neutral-200/60 text-[10px] text-neutral-500 font-medium">
                    {tryOnResult.disclaimer}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

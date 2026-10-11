'use client';

import React, { useState } from 'react';
import {
  BodyShape,
  FaceShape,
  HairStyle,
  HairColour,
  SkinToneKey,
  BodyProfile,
  SKIN_TONE_PALETTE,
} from '@/lib/types';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  Palette,
  Ruler,
  HelpCircle,
  Save,
  Sliders,
  Scissors,
  Info,
} from 'lucide-react';
import HumanModel2D from './HumanModel2D';

export interface BodyCalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: BodyProfile;
  onSave: (updatedProfile: Partial<BodyProfile>) => void;
}

const BODY_SHAPE_OPTIONS: {
  key: BodyShape;
  label: string;
  desc: string;
  ratioHint: string;
}[] = [
  {
    key: 'Hourglass',
    label: 'Hourglass',
    desc: 'Balanced bust and hips with a distinctly defined, cinched waist.',
    ratioHint: 'Waist is 25%+ narrower than bust & hips',
  },
  {
    key: 'Pear',
    label: 'Pear / Triangle',
    desc: 'Hips and thighs are wider than shoulders and bust.',
    ratioHint: 'Hips are 5%+ larger than bust/shoulders',
  },
  {
    key: 'Rectangle',
    label: 'Rectangle / Athletic',
    desc: 'Shoulders, bust, and hips are of uniform proportion with subtle waist taper.',
    ratioHint: 'Bust, waist, and hips within 5% of each other',
  },
  {
    key: 'Inverted Triangle',
    label: 'Inverted Triangle',
    desc: 'Broader shoulder span and fuller bust with narrower hips and waist.',
    ratioHint: 'Shoulders/bust significantly wider than hips',
  },
  {
    key: 'Athletic',
    label: 'Athletic / Toned',
    desc: 'Broad sculpted clavicles, muscular back, defined torso, and firm legs.',
    ratioHint: 'High muscle definition with tapered waist',
  },
  {
    key: 'Oval',
    label: 'Apple / Oval',
    desc: 'Weight centered around the midsection with slender legs and arms.',
    ratioHint: 'Midriff / waist is the most prominent measurement',
  },
];

const HAIRSTYLES: HairStyle[] = [
  'Long Wavy',
  'Bob Cut',
  'Short Textured',
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

export default function BodyCalibrationModal({
  isOpen,
  onClose,
  initialProfile,
  onSave,
}: BodyCalibrationModalProps) {
  // Step state: 1 (Gender & Units) -> 2 (Skin Tone & Hair) -> 3 (Height & Weight & Shape) -> 4 (All Tape Measurements) -> 5 (Review & Save)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states initialized from existing body profile
  const [gender, setGender] = useState<'female' | 'male' | 'neutral'>(
    initialProfile.gender || 'female'
  );
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    initialProfile.unitSystem || 'metric'
  );

  // Skin tone & Appearance
  const [skinTone, setSkinTone] = useState<SkinToneKey>(
    initialProfile.appearance?.skinTone || 'Medium Golden'
  );
  const [customSkinColor, setCustomSkinColor] = useState<string>(
    initialProfile.appearance?.customSkinColor || ''
  );
  const [useCustomSkin, setUseCustomSkin] = useState<boolean>(
    Boolean(initialProfile.appearance?.customSkinColor)
  );
  const [hairstyle, setHairstyle] = useState<HairStyle>(
    initialProfile.appearance?.hairstyle || 'Long Wavy'
  );
  const [hairColour, setHairColour] = useState<HairColour>(
    initialProfile.appearance?.hairColour || 'Espresso Black'
  );
  const [faceShape, setFaceShape] = useState<FaceShape>(
    initialProfile.appearance?.faceShape || 'Oval'
  );

  // Core Measurements
  const [heightCm, setHeightCm] = useState<number>(initialProfile.height || 174);
  const [weightKg, setWeightKg] = useState<number>(initialProfile.weight || 64);
  const [bodyShape, setBodyShape] = useState<BodyShape>(
    (initialProfile.bodyType as BodyShape) || 'Hourglass'
  );

  // Detailed Tape Measurements
  const [shouldersCm, setShouldersCm] = useState<number>(
    initialProfile.shouldersCm || 42
  );
  const [chestCm, setChestCm] = useState<number>(initialProfile.chestCm || 90);
  const [underbustCm, setUnderbustCm] = useState<number>(
    initialProfile.underbustCm || 76
  );
  const [waistCm, setWaistCm] = useState<number>(initialProfile.waistCm || 68);
  const [hipsCm, setHipsCm] = useState<number>(initialProfile.hipsCm || 96);
  const [inseamCm, setInseamCm] = useState<number>(initialProfile.inseamCm || 79);
  const [thighCm, setThighCm] = useState<number>(initialProfile.thighCm || 54);
  const [armLengthCm, setArmLengthCm] = useState<number>(
    initialProfile.armLengthCm || 58
  );
  const [neckCm, setNeckCm] = useState<number>(initialProfile.neckCm || 34);

  // Measurement Guide Hint State
  const [showMeasureHelp, setShowMeasureHelp] = useState<string | null>(null);

  if (!isOpen) return null;

  // Conversion helpers for Imperial display
  const cmToIn = (cm: number) => (cm / 2.54).toFixed(1);
  const kgToLbs = (kg: number) => Math.round(kg * 2.20462);

  const handleNext = () => {
    if (step < 5) setStep((s) => (s + 1) as any);
  };

  const handlePrev = () => {
    if (step > 1) setStep((s) => (s - 1) as any);
  };

  const handleSaveAll = () => {
    onSave({
      gender,
      unitSystem,
      height: heightCm,
      weight: weightKg,
      bodyType: bodyShape,
      shouldersCm,
      chestCm,
      underbustCm,
      waistCm,
      hipsCm,
      inseamCm,
      thighCm,
      armLengthCm,
      neckCm,
      appearance: {
        faceShape,
        hairstyle,
        hairColour,
        skinTone,
        customSkinColor: useCustomSkin ? customSkinColor : undefined,
        facePhotoUrl: initialProfile.appearance?.facePhotoUrl,
      },
      // Keep backwards compatibility for any consumers reading body3D
      body3D: {
        ...(initialProfile.body3D || ({} as any)),
        heightCm,
        weightKg,
        unitSystem,
        shouldersCm,
        chestCm,
        waistCm,
        hipsCm,
        genderBlend: gender === 'female' ? 20 : gender === 'male' ? 80 : 50,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                Calibrate Your 2D Fitting Model
              </h2>
              <p className="text-xs text-neutral-400">
                Step {step} of 5: Accurate measurements & skin tone ensure perfect virtual fitting.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-neutral-900 h-1">
          <div
            className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: Silhouette & Unit System */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h3 className="text-base font-bold text-white">Choose Your Silhouette & Units</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Select your primary anatomical silhouette to configure body curves, chest contour, and posture.
                </p>
              </div>

              {/* Silhouette Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    key: 'female',
                    title: 'Feminine Silhouette',
                    desc: 'Bust curvature, tapered waistline, and wider hip-to-waist flare.',
                  },
                  {
                    key: 'male',
                    title: 'Masculine Silhouette',
                    desc: 'Broader shoulder span, muscular chest plates, and athletic V-taper.',
                  },
                  {
                    key: 'neutral',
                    title: 'Androgynous / Neutral',
                    desc: 'Balanced mannequin proportions with minimalist streamlined lines.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setGender(opt.key as any)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      gender === opt.key
                        ? 'bg-rose-500/10 border-rose-500 shadow-lg shadow-rose-950/30'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{opt.title}</span>
                      {gender === opt.key && (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>

              {/* Unit System */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Measurement Units</h4>
                  <p className="text-xs text-neutral-400">Display inputs in centimeters/kg or inches/lbs.</p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setUnitSystem('metric')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      unitSystem === 'metric'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      unitSystem === 'imperial'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Imperial (in / lbs)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skin Tone Colour & Hair (The user explicitly asked to ask for skin tone color!) */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-rose-400" />
                  Select Your Skin Tone Colour & Undertone
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Choose from our curated anatomical Fitzpatrick skin tone palette or specify your exact custom shade.
                </p>
              </div>

              {/* Skin Tone Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SKIN_TONE_PALETTE.map((tone) => (
                  <button
                    key={tone.key}
                    type="button"
                    onClick={() => {
                      setSkinTone(tone.key);
                      setUseCustomSkin(false);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                      !useCustomSkin && skinTone === tone.key
                        ? 'bg-neutral-800/90 border-rose-500 shadow-xl shadow-rose-950/40 ring-2 ring-rose-500/20'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md"
                          style={{ backgroundColor: tone.hex }}
                        />
                        <div>
                          <span className="font-bold text-xs text-white block">
                            {tone.label}
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {tone.undertone} Undertone
                          </span>
                        </div>
                      </div>
                      {!useCustomSkin && skinTone === tone.key && (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      {tone.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Custom Skin Color Picker */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">Custom Hex Color Swatch</h4>
                  <p className="text-xs text-neutral-400">
                    Enter an exact Pantone/HEX code or use the color dropper.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customSkinColor || '#D7A787'}
                    onChange={(e) => {
                      setCustomSkinColor(e.target.value);
                      setUseCustomSkin(true);
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={customSkinColor}
                    placeholder="#D7A787"
                    onChange={(e) => {
                      setCustomSkinColor(e.target.value);
                      setUseCustomSkin(true);
                    }}
                    className="w-28 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono"
                  />
                  {useCustomSkin && (
                    <button
                      type="button"
                      onClick={() => setUseCustomSkin(false)}
                      className="text-xs text-neutral-400 hover:text-rose-400 underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Hair Style & Color */}
              <div className="pt-2 border-t border-neutral-800 space-y-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-purple-400" />
                  Hairstyle & Hair Color
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HAIRSTYLES.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHairstyle(h)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        hairstyle === h
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                          : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-xs text-neutral-400">Hair Color:</span>
                  {HAIR_COLORS.map((hc) => (
                    <button
                      key={hc.key}
                      type="button"
                      onClick={() => setHairColour(hc.key)}
                      title={hc.key}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs border transition ${
                        hairColour === hc.key
                          ? 'bg-neutral-800 border-rose-500 text-white'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: hc.hex }}
                      />
                      <span>{hc.key}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Core Measurements & Body Shape */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Height, Weight & Primary Body Shape
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  These core metrics establish your frame scale and base anatomical proportions.
                </p>
              </div>

              {/* Height & Weight Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Height */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">Total Height</span>
                    <span className="text-sm font-bold text-rose-400">
                      {heightCm} cm{' '}
                      <span className="text-xs text-neutral-500">
                        ({cmToIn(heightCm)}&quot;)
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={145}
                    max={210}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>145 cm (4&apos;9&quot;)</span>
                    <span>174 cm (5&apos;8&quot;)</span>
                    <span>210 cm (6&apos;11&quot;)</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">Body Weight</span>
                    <span className="text-sm font-bold text-indigo-400">
                      {weightKg} kg{' '}
                      <span className="text-xs text-neutral-500">
                        ({kgToLbs(weightKg)} lbs)
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={140}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>40 kg (88 lbs)</span>
                    <span>64 kg (141 lbs)</span>
                    <span>140 kg (308 lbs)</span>
                  </div>
                </div>
              </div>

              {/* Body Shape Selector */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Body Shape Archetype</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BODY_SHAPE_OPTIONS.map((shp) => (
                    <button
                      key={shp.key}
                      type="button"
                      onClick={() => setBodyShape(shp.key)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        bodyShape === shp.key
                          ? 'bg-indigo-500/10 border-indigo-500 shadow-md shadow-indigo-950/30'
                          : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{shp.label}</span>
                        {bodyShape === shp.key && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug">{shp.desc}</p>
                      <span className="inline-block mt-2 text-[10px] text-indigo-400 font-medium">
                        {shp.ratioHint}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: All Body Tape Measurements (Comprehensive!) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-emerald-400" />
                  All Body Tape Measurements
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fine-tune each anatomical measurement for millimeter-accurate 2D garment fitting.
                </p>
              </div>

              {/* Measurements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shoulder Span */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Shoulder Span
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {shouldersCm} cm ({cmToIn(shouldersCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={32}
                    max={60}
                    value={shouldersCm}
                    onChange={(e) => setShouldersCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    From tip of left acromion bone to right acromion bone.
                  </p>
                </div>

                {/* Bust / Chest */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      {gender === 'female' ? 'Bust Circumference' : 'Chest Circumference'}
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {chestCm} cm ({cmToIn(chestCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={140}
                    value={chestCm}
                    onChange={(e) => setChestCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    Around fullest point of chest/bust with tape level.
                  </p>
                </div>

                {/* Waist Circumference */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Natural Waist
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {waistCm} cm ({cmToIn(waistCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={54}
                    max={130}
                    value={waistCm}
                    onChange={(e) => setWaistCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    Narrowest point of torso, ~2-3cm above the navel.
                  </p>
                </div>

                {/* Hip Circumference */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Hips & Glutes
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {hipsCm} cm ({cmToIn(hipsCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={145}
                    value={hipsCm}
                    onChange={(e) => setHipsCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    Widest circumference across pelvic crest and buttocks.
                  </p>
                </div>

                {/* Inseam / Leg Length */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Inseam / Leg Length
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {inseamCm} cm ({cmToIn(inseamCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={100}
                    value={inseamCm}
                    onChange={(e) => setInseamCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    From highest inner crotch seam down to the ankle bone.
                  </p>
                </div>

                {/* Thigh Circumference */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Thigh Circumference
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {thighCm} cm ({cmToIn(thighCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={85}
                    value={thighCm}
                    onChange={(e) => setThighCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    Fullest upper thigh circumference below gluteal fold.
                  </p>
                </div>

                {/* Arm Length */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Arm Length
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {armLengthCm} cm ({cmToIn(armLengthCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={46}
                    max={74}
                    value={armLengthCm}
                    onChange={(e) => setArmLengthCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    From shoulder joint point down past elbow to wrist bone.
                  </p>
                </div>

                {/* Neck Circumference */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      Neck Circumference
                    </span>
                    <span className="text-xs font-bold text-rose-400">
                      {neckCm} cm ({cmToIn(neckCm)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={28}
                    max={50}
                    value={neckCm}
                    onChange={(e) => setNeckCm(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <p className="text-[10px] text-neutral-500">
                    Around base of neck above collarbone for shirt sizing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Save */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Review Your Calibrated 2D Model
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Here is your real-time 2D anatomical avatar morphed to your exact measurements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* 2D Model Live Preview */}
                <div className="h-[380px] w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                  <HumanModel2D
                    gender={gender}
                    heightCm={heightCm}
                    weightKg={weightKg}
                    shouldersCm={shouldersCm}
                    chestCm={chestCm}
                    underbustCm={underbustCm}
                    waistCm={waistCm}
                    hipsCm={hipsCm}
                    inseamCm={inseamCm}
                    thighCm={thighCm}
                    armLengthCm={armLengthCm}
                    neckCm={neckCm}
                    skinTone={skinTone}
                    customSkinColor={useCustomSkin ? customSkinColor : undefined}
                    hairstyle={hairstyle}
                    hairColour={hairColour}
                    faceShape={faceShape}
                    compact
                    showTapeGuides={true}
                  />
                </div>

                {/* Summary Card */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Model Profile Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-neutral-500 block">Silhouette</span>
                        <span className="font-semibold text-white capitalize">{gender}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Skin Tone</span>
                        <span className="font-semibold text-rose-300">
                          {useCustomSkin ? 'Custom HEX' : skinTone}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Height & Weight</span>
                        <span className="font-semibold text-white">
                          {heightCm} cm / {weightKg} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Body Shape</span>
                        <span className="font-semibold text-indigo-400">{bodyShape}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Bust / Waist / Hips</span>
                        <span className="font-semibold text-white">
                          {chestCm} / {waistCm} / {hipsCm} cm
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Inseam</span>
                        <span className="font-semibold text-white">{inseamCm} cm</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-300">Ready to Apply</h5>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                        These measurements will automatically update your virtual fitting studio,
                        size recommendations, and wardrobe try-on experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition"
            >
              Cancel
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-lg shadow-rose-950/40 hover:opacity-95 transition"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 transition"
              >
                <Save className="w-4 h-4" />
                Apply to My 2D Model
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

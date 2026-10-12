import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Save, 
  Check, 
  Sliders, 
  User, 
  RotateCcw,
  Info
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { BodyModel3D } from '../components/BodyModel3D.tsx';
import type { BodyProfile, BodyType, FaceStructure } from '../lib/types.ts';

export const MyModelView: React.FC = () => {
  const { bodyProfile, updateBodyProfile } = useWardrobe();

  // Local state for interactive editing before save
  const [formData, setFormData] = useState<Partial<BodyProfile>>({
    heightCm: 170,
    weightKg: 65,
    chestCm: 92,
    bicepsCm: 30,
    wristCm: 16.5,
    shoulderCm: 44,
    waistCm: 78,
    hipsCm: 96,
    inseamCm: 76,
    bodyType: 'regular',
    skinTone: '#f5c6a5',
    faceStructure: 'oval',
    hairstyle: 'short_wavy',
    hairColor: '#2d1d13',
    selfDescription: 'Contemporary versatile style',
    modelPreset: 'default',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (bodyProfile) {
      setFormData(bodyProfile);
    }
  }, [bodyProfile]);

  const handleSliderChange = (field: keyof BodyProfile, val: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: val,
    }));
  };

  const handlePresetSelect = (preset: 'default' | 'athletic' | 'petite' | 'tall' | 'curvy') => {
    switch (preset) {
      case 'athletic':
        setFormData(prev => ({
          ...prev,
          heightCm: 176,
          weightKg: 72,
          chestCm: 98,
          bicepsCm: 34,
          shoulderCm: 48,
          waistCm: 74,
          hipsCm: 94,
          bodyType: 'athletic',
          modelPreset: 'athletic',
        }));
        break;
      case 'petite':
        setFormData(prev => ({
          ...prev,
          heightCm: 158,
          weightKg: 52,
          chestCm: 84,
          bicepsCm: 25,
          shoulderCm: 39,
          waistCm: 68,
          hipsCm: 88,
          bodyType: 'slim',
          modelPreset: 'petite',
        }));
        break;
      case 'tall':
        setFormData(prev => ({
          ...prev,
          heightCm: 184,
          weightKg: 74,
          chestCm: 94,
          bicepsCm: 31,
          shoulderCm: 47,
          waistCm: 76,
          hipsCm: 98,
          bodyType: 'regular',
          modelPreset: 'tall',
        }));
        break;
      case 'curvy':
        setFormData(prev => ({
          ...prev,
          heightCm: 165,
          weightKg: 75,
          chestCm: 102,
          bicepsCm: 32,
          shoulderCm: 43,
          waistCm: 82,
          hipsCm: 108,
          bodyType: 'curvy',
          modelPreset: 'curvy',
        }));
        break;
      case 'default':
      default:
        setFormData(prev => ({
          ...prev,
          heightCm: 170,
          weightKg: 65,
          chestCm: 92,
          bicepsCm: 30,
          shoulderCm: 44,
          waistCm: 78,
          hipsCm: 96,
          bodyType: 'regular',
          modelPreset: 'default',
        }));
        break;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBodyProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const skinToneSwatches = [
    { label: 'Fair Ivory', hex: '#ffe0bd' },
    { label: 'Warm Peach', hex: '#f5c6a5' },
    { label: 'Golden Olive', hex: '#d1a374' },
    { label: 'Almond Tan', hex: '#ad7a56' },
    { label: 'Deep Mocha', hex: '#77472d' },
    { label: 'Rich Espresso', hex: '#442b1a' },
  ];

  const hairColorSwatches = [
    { label: 'Jet Black', hex: '#1a1a1a' },
    { label: 'Dark Brown', hex: '#2d1d13' },
    { label: 'Auburn', hex: '#7a3b2e' },
    { label: 'Honey Blonde', hex: '#c5a059' },
    { label: 'Silver Gray', hex: '#94a3b8' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Parametric 3D Anatomical Avatar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My 3D Model & Body Profile</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Adjust your measurements below. The 3D avatar dynamically morphs in real time to simulate garment fit.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Measurements Saved!</span>
            </>
          ) : isSaving ? (
            <span>Saving to Database...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Measurements</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Body Model Viewport */}
        <div className="lg:col-span-5 space-y-4">
          <BodyModel3D bodyProfile={formData as BodyProfile} activeCategory="dresses" />

          {/* Preset Buttons */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <span className="text-xs font-semibold text-slate-300 block mb-2">Model Proportional Presets:</span>
            <div className="grid grid-cols-5 gap-1.5">
              {(['default', 'athletic', 'petite', 'tall', 'curvy'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePresetSelect(p)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium capitalize border transition-all ${
                    formData.modelPreset === p
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Honest Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              The 3D model renders proportional geometry derived from your anatomical parameters. It serves as an ergonomic reference for garment pairing and size checks.
            </span>
          </div>
        </div>

        {/* Right Column: Measurements & Appearance Sliders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Anatomical Measurements */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Core Body Dimensions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Height */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Height</span>
                  <span className="font-bold text-white">{formData.heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="140"
                  max="215"
                  value={formData.heightCm}
                  onChange={e => handleSliderChange('heightCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Weight */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Weight</span>
                  <span className="font-bold text-white">{formData.weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={formData.weightKg}
                  onChange={e => handleSliderChange('weightKg', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Chest */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Chest Circumference</span>
                  <span className="font-bold text-white">{formData.chestCm} cm</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="135"
                  value={formData.chestCm}
                  onChange={e => handleSliderChange('chestCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Shoulder Width */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Shoulder to Shoulder</span>
                  <span className="font-bold text-white">{formData.shoulderCm} cm</span>
                </div>
                <input
                  type="range"
                  min="34"
                  max="60"
                  value={formData.shoulderCm}
                  onChange={e => handleSliderChange('shoulderCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Waist */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Waist</span>
                  <span className="font-bold text-white">{formData.waistCm} cm</span>
                </div>
                <input
                  type="range"
                  min="55"
                  max="125"
                  value={formData.waistCm}
                  onChange={e => handleSliderChange('waistCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Hips */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Hips</span>
                  <span className="font-bold text-white">{formData.hipsCm} cm</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="135"
                  value={formData.hipsCm}
                  onChange={e => handleSliderChange('hipsCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Biceps */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Biceps</span>
                  <span className="font-bold text-white">{formData.bicepsCm} cm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="52"
                  value={formData.bicepsCm}
                  onChange={e => handleSliderChange('bicepsCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Wrist */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Wrist</span>
                  <span className="font-bold text-white">{formData.wristCm} cm</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="25"
                  step="0.5"
                  value={formData.wristCm}
                  onChange={e => handleSliderChange('wristCm', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Visual Appearance & Styling Identity */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Appearance & Phenotype
            </h2>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Body Silhouette Archetype</label>
              <div className="grid grid-cols-5 gap-2">
                {(['athletic', 'slim', 'regular', 'curvy', 'muscular'] as BodyType[]).map(bt => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, bodyType: bt }))}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      formData.bodyType === bt
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Skin Tone Palette</label>
              <div className="flex flex-wrap gap-2.5">
                {skinToneSwatches.map(tone => (
                  <button
                    key={tone.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, skinTone: tone.hex }))}
                    className={`w-9 h-9 rounded-full transition-transform border-2 ${
                      formData.skinTone === tone.hex ? 'scale-110 border-white ring-2 ring-indigo-500' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: tone.hex }}
                    title={tone.label}
                  />
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Hair Color</label>
              <div className="flex flex-wrap gap-2.5">
                {hairColorSwatches.map(color => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hairColor: color.hex }))}
                    className={`w-9 h-9 rounded-full transition-transform border-2 ${
                      formData.hairColor === color.hex ? 'scale-110 border-white ring-2 ring-indigo-500' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Face Structure */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Face Structure</label>
              <div className="grid grid-cols-5 gap-2">
                {(['oval', 'round', 'square', 'heart', 'diamond'] as FaceStructure[]).map(fs => (
                  <button
                    key={fs}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, faceStructure: fs }))}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      formData.faceStructure === fs
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {fs}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

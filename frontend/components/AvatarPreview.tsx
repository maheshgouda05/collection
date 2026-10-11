'use client';

import React from 'react';
import {
  BodyShape,
  FaceShape,
  HairStyle,
  HairColour,
  SkinToneKey,
  WardrobeItem,
  TryOnResult,
} from '@/lib/types';
import { Sparkles, Info, Shirt, Layers } from 'lucide-react';

export interface AvatarPreviewProps {
  heightCm: number;
  weightKg: number;
  bodyShape: BodyShape | 'Unspecified';
  skinTone: SkinToneKey;
  hairstyle: HairStyle;
  hairColour: HairColour;
  faceShape: FaceShape;
  activeItem?: WardrobeItem | null;
  selectedSize?: string;
  tryOnResult?: TryOnResult | null;
  className?: string;
}

const SKIN_TONE_COLORS: Record<SkinToneKey, { body: string; shadow: string }> = {
  Fair: { body: '#F9E5DC', shadow: '#E8C5B5' },
  'Light Warm': { body: '#F2D0BE', shadow: '#DDB298' },
  'Medium Golden': { body: '#D7A787', shadow: '#B8825D' },
  Olive: { body: '#BF8C64', shadow: '#9D6E46' },
  'Rich Deep': { body: '#8A5333', shadow: '#6B381B' },
  Ebony: { body: '#4A2A1A', shadow: '#31190E' },
};

const HAIR_COLORS: Record<HairColour, string> = {
  'Espresso Black': '#1C1917',
  'Chocolate Brown': '#44281D',
  'Honey Blonde': '#D4AF37',
  Platinum: '#E2E8F0',
  'Auburn Red': '#882215',
  'Silver Grey': '#94A3B8',
};

export default function AvatarPreview({
  heightCm,
  weightKg,
  bodyShape,
  skinTone,
  hairstyle,
  hairColour,
  faceShape,
  activeItem,
  selectedSize,
  tryOnResult,
  className = '',
}: AvatarPreviewProps) {
  const skin = SKIN_TONE_COLORS[skinTone] || SKIN_TONE_COLORS['Medium Golden'];
  const hair = HAIR_COLORS[hairColour] || '#1C1917';

  // Dynamic silhouette geometry adjustments based on body type
  let shoulderWidth = 46;
  let waistWidth = 32;
  let hipWidth = 44;

  switch (bodyShape) {
    case 'Hourglass':
      shoulderWidth = 48;
      waistWidth = 26;
      hipWidth = 48;
      break;
    case 'Inverted Triangle':
      shoulderWidth = 54;
      waistWidth = 32;
      hipWidth = 38;
      break;
    case 'Pear':
      shoulderWidth = 40;
      waistWidth = 30;
      hipWidth = 52;
      break;
    case 'Rectangle':
      shoulderWidth = 44;
      waistWidth = 36;
      hipWidth = 42;
      break;
    case 'Athletic':
      shoulderWidth = 50;
      waistWidth = 30;
      hipWidth = 42;
      break;
    case 'Oval':
      shoulderWidth = 44;
      waistWidth = 46;
      hipWidth = 44;
      break;
    default:
      shoulderWidth = 46;
      waistWidth = 32;
      hipWidth = 44;
      break;
  }

  // Weight offset (subtle widening)
  const weightFactor = Math.max(-4, Math.min(6, (weightKg - 65) / 5));
  shoulderWidth += weightFactor * 0.4;
  waistWidth += weightFactor * 0.8;
  hipWidth += weightFactor * 0.6;

  // Height scaling
  const heightRatio = Math.max(0.92, Math.min(1.08, heightCm / 172));

  // Determine Garment Color for overlay
  const garmentColor = activeItem
    ? activeItem.colour.toLowerCase().includes('white')
      ? '#F8FAFC'
      : activeItem.colour.toLowerCase().includes('black')
      ? '#18181B'
      : activeItem.colour.toLowerCase().includes('blue') || activeItem.colour.toLowerCase().includes('navy')
      ? '#1E3A8A'
      : activeItem.colour.toLowerCase().includes('camel') || activeItem.colour.toLowerCase().includes('beige')
      ? '#D4A373'
      : activeItem.colour.toLowerCase().includes('green') || activeItem.colour.toLowerCase().includes('emerald')
      ? '#065F46'
      : '#E11D48'
    : null;

  const isTop = activeItem && (activeItem.category.toLowerCase().includes('top') || activeItem.category.toLowerCase().includes('shirt'));
  const isBottom = activeItem && (activeItem.category.toLowerCase().includes('bottom') || activeItem.category.toLowerCase().includes('trouser') || activeItem.category.toLowerCase().includes('jean'));
  const isDress = activeItem && activeItem.category.toLowerCase().includes('dress');
  const isOuterwear = activeItem && (activeItem.category.toLowerCase().includes('outer') || activeItem.category.toLowerCase().includes('jacket') || activeItem.category.toLowerCase().includes('coat'));

  return (
    <div
      className={`relative flex flex-col items-center justify-between p-6 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-[#0A0D14] border border-neutral-800 text-white overflow-hidden shadow-2xl ${className}`}
    >
      {/* Background Studio Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner: Proportions Specs */}
      <div className="w-full flex items-center justify-between text-xs z-10 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            2D Mannequin Rig
          </span>
        </div>
        <div className="text-[11px] font-mono text-neutral-400">
          {heightCm}cm • {weightKg}kg • {bodyShape}
        </div>
      </div>

      {/* Stylized SVG Avatar Canvas */}
      <div className="relative my-4 flex items-center justify-center w-full max-w-[280px] aspect-[1/2]">
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full drop-shadow-2xl transition-all duration-500"
          style={{ transform: `scaleY(${heightRatio})` }}
        >
          <defs>
            <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={skin.body} />
              <stop offset="100%" stopColor={skin.shadow} />
            </linearGradient>
            <linearGradient id="neutralGarment" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>
          </defs>

          {/* HEAD & FACE */}
          <ellipse
            cx="100"
            cy="52"
            rx={faceShape === 'Round' ? '19' : faceShape === 'Square' ? '18' : '17'}
            ry="23"
            fill="url(#bodySkinGrad)"
          />

          {/* NECK */}
          <rect x="94" y="70" width="12" height="18" rx="3" fill="url(#bodySkinGrad)" />

          {/* HAIRSTYLE */}
          {hairstyle === 'Buzz Cut' && (
            <path
              d="M82,48 Q100,28 118,48 Q118,34 100,31 Q82,34 82,48 Z"
              fill={hair}
            />
          )}
          {hairstyle === 'Short Textured' && (
            <path
              d="M78,48 Q100,22 122,48 Q120,30 100,26 Q80,30 78,48 Z"
              fill={hair}
            />
          )}
          {hairstyle === 'Bob Cut' && (
            <path
              d="M77,55 Q100,24 123,55 Q125,76 117,78 Q112,50 100,48 Q88,50 83,78 Q75,76 77,55 Z"
              fill={hair}
            />
          )}
          {hairstyle === 'Long Wavy' && (
            <path
              d="M77,55 Q100,22 123,55 Q128,105 118,110 Q112,52 100,48 Q88,52 82,110 Q72,105 77,55 Z"
              fill={hair}
            />
          )}
          {hairstyle === 'Sleek Bun' && (
            <g>
              <ellipse cx="100" cy="24" rx="10" ry="9" fill={hair} />
              <path
                d="M80,50 Q100,28 120,50 Q122,34 100,32 Q78,34 80,50 Z"
                fill={hair}
              />
            </g>
          )}
          {hairstyle === 'Curly Afro' && (
            <ellipse cx="100" cy="46" rx="27" ry="26" fill={hair} />
          )}

          {/* TORSO / CHEST */}
          <path
            d={`M${100 - shoulderWidth / 2},88 Q100,84 ${100 + shoulderWidth / 2},88 L${
              100 + waistWidth / 2
            },155 L${100 - waistWidth / 2},155 Z`}
            fill="url(#bodySkinGrad)"
          />

          {/* LOWER BODY (HIPS & WAIST) */}
          <path
            d={`M${100 - waistWidth / 2},155 L${100 + waistWidth / 2},155 L${
              100 + hipWidth / 2
            },200 L${100 - hipWidth / 2},200 Z`}
            fill="url(#bodySkinGrad)"
          />

          {/* LEGS */}
          {/* Left Leg */}
          <path
            d={`M${100 - hipWidth / 2 + 3},200 L${100 - hipWidth / 4},200 L${88},350 L${78},350 Z`}
            fill="url(#bodySkinGrad)"
          />
          {/* Right Leg */}
          <path
            d={`M${100 + hipWidth / 4},200 L${100 + hipWidth / 2 - 3},200 L${122},350 L${112},350 Z`}
            fill="url(#bodySkinGrad)"
          />

          {/* FEET / ANKLES */}
          <path d="M76,350 L89,350 L91,365 L73,365 Z" fill="url(#bodySkinGrad)" />
          <path d="M111,350 L124,350 L127,365 L109,365 Z" fill="url(#bodySkinGrad)" />

          {/* ARMS */}
          {/* Left Arm */}
          <path
            d={`M${100 - shoulderWidth / 2},88 Q${100 - shoulderWidth / 2 - 12},140 ${70},205 L${78},208 Q${
              100 - shoulderWidth / 2 - 4
            },140 ${100 - shoulderWidth / 2 + 7},94 Z`}
            fill="url(#bodySkinGrad)"
          />
          {/* Right Arm */}
          <path
            d={`M${100 + shoulderWidth / 2},88 Q${100 + shoulderWidth / 2 + 12},140 ${130},205 L${122},208 Q${
              100 + shoulderWidth / 2 + 4
            },140 ${100 + shoulderWidth / 2 - 7},94 Z`}
            fill="url(#bodySkinGrad)"
          />

          {/* --- BASE UNDERGARMENTS (When no garment is selected) --- */}
          {!isDress && !isTop && (
            <path
              d={`M${100 - shoulderWidth / 2 + 6},92 Q100,90 ${100 + shoulderWidth / 2 - 6},92 L${
                100 + waistWidth / 2 - 1
              },138 L${100 - waistWidth / 2 + 1},138 Z`}
              fill="#27272A"
              opacity="0.9"
            />
          )}

          {!isDress && !isBottom && (
            <path
              d={`M${100 - waistWidth / 2},145 L${100 + waistWidth / 2},145 L${
                100 + hipWidth / 2
              },190 L${100 - hipWidth / 2},190 Z`}
              fill="#27272A"
              opacity="0.9"
            />
          )}

          {/* --- LAYERED GARMENTS OVERLAY --- */}
          {/* Dress Overlay */}
          {isDress && (
            <g className="animate-in fade-in duration-300">
              <path
                d={`M${100 - shoulderWidth / 2 + 4},90 Q100,88 ${100 + shoulderWidth / 2 - 4},90 L${
                  100 + hipWidth / 2 + 10
                },275 L${100 - hipWidth / 2 - 10},275 Z`}
                fill={garmentColor || '#E11D48'}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
            </g>
          )}

          {/* Top / Shirt Overlay */}
          {isTop && !isDress && (
            <g className="animate-in fade-in duration-300">
              <path
                d={`M${100 - shoulderWidth / 2},88 Q100,84 ${100 + shoulderWidth / 2},88 L${
                  100 + waistWidth / 2 + 3
                },165 L${100 - waistWidth / 2 - 3},165 Z`}
                fill={garmentColor || '#F8FAFC'}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
              {/* Short / Long Sleeves */}
              <path
                d={`M${100 - shoulderWidth / 2},88 L${68},135 L${78},138 L${
                  100 - shoulderWidth / 2 + 7
                },94 Z`}
                fill={garmentColor || '#F8FAFC'}
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              <path
                d={`M${100 + shoulderWidth / 2},88 L${132},135 L${122},138 L${
                  100 + shoulderWidth / 2 - 7
                },94 Z`}
                fill={garmentColor || '#F8FAFC'}
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.2"
              />
            </g>
          )}

          {/* Bottom / Trousers / Jeans Overlay */}
          {isBottom && !isDress && (
            <g className="animate-in fade-in duration-300">
              <path
                d={`M${100 - waistWidth / 2},150 L${100 + waistWidth / 2},150 L${
                  100 + hipWidth / 2 + 2
                },200 L${124},345 L${108},345 L${100},208 L${92},345 L${76},345 L${
                  100 - hipWidth / 2 - 2
                },200 Z`}
                fill={garmentColor || '#1E3A8A'}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
            </g>
          )}

          {/* Outerwear Overlay */}
          {isOuterwear && (
            <g className="animate-in fade-in duration-300">
              <path
                d={`M${100 - shoulderWidth / 2 - 4},84 Q100,82 ${100 + shoulderWidth / 2 + 4},84 L${
                  100 + hipWidth / 2 + 6
                },235 L${100 - hipWidth / 2 - 6},235 Z`}
                fill={garmentColor || '#D4A373'}
                fillOpacity="0.85"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
            </g>
          )}
        </svg>

        {/* Selected Garment Tag Chip Over Avatar */}
        {activeItem && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-max max-w-[90%] px-3 py-1.5 rounded-full bg-neutral-900/95 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-2 text-[10px]">
            <Sparkles className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="font-semibold text-white truncate">{activeItem.name}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-mono">
              {selectedSize || activeItem.size || 'M'}
            </span>
          </div>
        )}
      </div>

      {/* Mandatory Virtual Try-On Disclaimer Area */}
      <div className="w-full space-y-2 pt-3 border-t border-neutral-800/80 z-10">
        {tryOnResult ? (
          <div className="p-3 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 space-y-1.5 text-left">
            <div className="flex items-center gap-1.5 text-neutral-300 font-semibold text-[11px]">
              <Layers className="w-3.5 h-3.5 text-rose-400" />
              <span>Drape Simulation Note</span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              {tryOnResult.fitNotes}
            </p>
          </div>
        ) : null}

        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 text-[11px] text-amber-200/90 text-left">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Preview only:</strong> Accurate physical fit, tension, and drape requires a virtual try-on integration.
          </p>
        </div>
      </div>
    </div>
  );
}

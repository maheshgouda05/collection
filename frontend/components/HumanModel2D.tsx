'use client';

import React, { useState, useMemo } from 'react';
import {
  FaceShape,
  HairStyle,
  HairColour,
  SkinToneKey,
  SKIN_TONE_PALETTE,
} from '@/lib/types';
import {
  Ruler,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Shirt,
  Info,
  Check,
  Palette,
} from 'lucide-react';

export type ClothingPreview = 'none' | 'casual' | 'dress';

export interface HumanModel2DProps {
  // Required 6 Body Measurements
  heightCm?: number;
  weightKg?: number;
  chestCm?: number;
  bicepsCm?: number;
  wristCm?: number;
  shouldersCm?: number;
  gender?: 'female' | 'male' | 'neutral';
  underbustCm?: number;
  waistCm?: number;
  hipsCm?: number;
  inseamCm?: number;
  thighCm?: number;
  armLengthCm?: number;
  neckCm?: number;

  // Appearance Settings
  skinTone?: SkinToneKey;
  customSkinColor?: string;
  faceShape?: FaceShape;
  hairstyle?: HairStyle;
  hairColour?: HairColour;
  customHairColor?: string;
  appearanceDescription?: string;

  // Interactive Options
  clothingPreview?: ClothingPreview;
  onClothingPreviewChange?: (val: ClothingPreview) => void;
  showTapeGuides?: boolean;
  onToggleTapeGuides?: () => void;
  onSelectMeasurement?: (measurementKey: string) => void;

  className?: string;
  compact?: boolean;
}

// Map skin tones to realistic base, highlight, and contour shades
function getSkinColors(skinTone: SkinToneKey = 'Medium Golden', customSkinColor?: string) {
  if (customSkinColor) {
    return {
      base: customSkinColor,
      highlight: '#FFFFFF22',
      shadow: '#00000033',
      outline: '#1F161044',
      contour: '#2D160055',
    };
  }

  const found = SKIN_TONE_PALETTE.find((s) => s.key === skinTone);
  if (found) {
    return {
      base: found.hex,
      highlight: found.highlightHex,
      shadow: found.shadowHex,
      outline: found.shadowHex,
      contour: found.shadowHex,
    };
  }

  return {
    base: '#D7A787',
    highlight: '#E7BD9F',
    shadow: '#B8825D',
    outline: '#8D5538',
    contour: '#8D5538',
  };
}

const HAIR_COLOR_MAP: Record<HairColour, string> = {
  'Espresso Black': '#1C1917',
  'Chocolate Brown': '#44281D',
  'Honey Blonde': '#D4AF37',
  Platinum: '#E2E8F0',
  'Auburn Red': '#882215',
  'Silver Grey': '#94A3B8',
};

// Clamping helper for safe normalization
function clamp(val: number, min: number, max: number): number {
  if (isNaN(val)) return (min + max) / 2;
  return Math.max(min, Math.min(max, val));
}

export default function HumanModel2D({
  heightCm = 175,
  weightKg = 68,
  chestCm = 96,
  bicepsCm = 32,
  wristCm = 17,
  shouldersCm = 44,

  skinTone = 'Medium Golden',
  customSkinColor,
  faceShape = 'Oval',
  hairstyle = 'Short Textured',
  hairColour = 'Espresso Black',
  customHairColor,

  clothingPreview: controlledClothing,
  onClothingPreviewChange,
  showTapeGuides: controlledTapeGuides,
  onToggleTapeGuides,
  onSelectMeasurement,

  className = '',
  compact = false,
}: HumanModel2DProps) {
  const [internalClothing, setInternalClothing] = useState<ClothingPreview>('none');
  const [internalTapeGuides, setInternalTapeGuides] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const activeClothing =
    controlledClothing !== undefined ? controlledClothing : internalClothing;
  const setClothing = (c: ClothingPreview) => {
    if (onClothingPreviewChange) onClothingPreviewChange(c);
    else setInternalClothing(c);
  };

  const showTape =
    controlledTapeGuides !== undefined ? controlledTapeGuides : internalTapeGuides;
  const toggleTape = () => {
    if (onToggleTapeGuides) onToggleTapeGuides();
    else setInternalTapeGuides((v) => !v);
  };

  const skin = useMemo(
    () => getSkinColors(skinTone, customSkinColor),
    [skinTone, customSkinColor]
  );
  const hairFill = customHairColor || HAIR_COLOR_MAP[hairColour] || '#1C1917';

  // =========================================================================
  // NORMALIZATION & DYNAMIC GEOMETRY MAPPING
  // =========================================================================
  // Canvas coordinate system: 460 x 760. Center line is CX = 230.
  const cx = 230;

  // 1. Height normalization: base 175cm, scales vertical elements
  const safeHeight = clamp(heightCm, 130, 220);
  const heightFactor = clamp(safeHeight / 175, 0.84, 1.22);

  // 2. Weight normalization: base 68kg, contributes to overall build & mass
  const safeWeight = clamp(weightKg, 35, 150);
  const weightFactor = clamp((safeWeight - 68) / 60, -0.4, 0.7);

  // 3. Shoulder-to-shoulder width: base 44cm, scales shoulder span
  const safeShoulders = clamp(shouldersCm, 30, 62);
  const shoulderSpan = 54 + ((safeShoulders - 44) / 44) * 36;

  // 4. Chest circumference: base 96cm, scales torso width at chest level
  const safeChest = clamp(chestCm, 65, 145);
  const chestHalfWidth =
    45 + ((safeChest - 96) / 96) * 32 + (weightFactor > 0 ? weightFactor * 6 : 0);

  // 5. Biceps circumference: base 32cm, scales upper arm thickness
  const safeBiceps = clamp(bicepsCm, 18, 55);
  const bicepWidth =
    13.5 + ((safeBiceps - 32) / 32) * 12 + (weightFactor > 0 ? weightFactor * 3.5 : 0);

  // 6. Wrist circumference: base 17cm, scales wrist width and forearm taper
  const safeWrist = clamp(wristCm, 12, 26);
  const wristWidth = 7.5 + ((safeWrist - 17) / 17) * 5.5;

  // Anatomical anchor vertical coordinates
  const headCenterY = 82;
  const neckTopY = headCenterY + 28;
  const neckBottomY = neckTopY + 26;
  const shoulderY = neckBottomY + 8;
  const chestY = shoulderY + 44;
  const waistY = chestY + 54 * heightFactor;
  const hipY = waistY + 48 * heightFactor;
  const crotchY = hipY + 28 * heightFactor;

  // Legs vertical span
  const legSpan = 290 * heightFactor;
  const kneeY = crotchY + legSpan * 0.48;
  const ankleY = crotchY + legSpan;
  const feetY = ankleY + 20;

  // Arms vertical span
  const armSpan = 220 * heightFactor;
  const elbowY = shoulderY + armSpan * 0.48;
  const wristY = shoulderY + armSpan;
  const handY = wristY + 24;

  // Proportional widths for connected torso
  const neckWidth = 14 + (weightFactor > 0 ? weightFactor * 3.5 : 0);
  const waistHalfWidth =
    chestHalfWidth * 0.74 + (weightFactor > 0 ? weightFactor * 14 : weightFactor * 6);
  const hipHalfWidth =
    chestHalfWidth * 0.92 + (weightFactor > 0 ? weightFactor * 15 : weightFactor * 4);

  // Thigh, knee, calf widths (harmoniously scaled by weight and height)
  const thighWidth = 23 + (weightFactor > 0 ? weightFactor * 10 : weightFactor * 4);
  const kneeWidth = 15 + (weightFactor > 0 ? weightFactor * 5 : 0);
  const calfWidth = 16.5 + (weightFactor > 0 ? weightFactor * 7 : weightFactor * 3);
  const ankleWidth = wristWidth * 1.15;

  const handleMarkerClick = (key: string) => {
    setActiveHighlight(key);
    if (onSelectMeasurement) onSelectMeasurement(key);
  };

  // =========================================================================
  // FACE SHAPE OUTLINE BUILDER
  // =========================================================================
  const renderFaceOutline = () => {
    switch (faceShape) {
      case 'Round':
        return (
          <path
            d={`
              M ${cx} ${headCenterY - 32}
              C ${cx + 31} ${headCenterY - 32}, ${cx + 31} ${headCenterY + 14}, ${cx + 22} ${headCenterY + 28}
              C ${cx + 14} ${headCenterY + 34}, ${cx - 14} ${headCenterY + 34}, ${cx - 22} ${headCenterY + 28}
              C ${cx - 31} ${headCenterY + 14}, ${cx - 31} ${headCenterY - 32}, ${cx} ${headCenterY - 32}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );

      case 'Square':
        return (
          <path
            d={`
              M ${cx - 25} ${headCenterY - 32}
              L ${cx + 25} ${headCenterY - 32}
              C ${cx + 29} ${headCenterY - 18}, ${cx + 29} ${headCenterY + 4}, ${cx + 27} ${headCenterY + 22}
              L ${cx + 14} ${headCenterY + 33}
              L ${cx - 14} ${headCenterY + 33}
              L ${cx - 27} ${headCenterY + 22}
              C ${cx - 29} ${headCenterY + 4}, ${cx - 29} ${headCenterY - 18}, ${cx - 25} ${headCenterY - 32}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );

      case 'Heart':
        return (
          <path
            d={`
              M ${cx} ${headCenterY - 33}
              C ${cx + 29} ${headCenterY - 33}, ${cx + 29} ${headCenterY - 6}, ${cx + 23} ${headCenterY + 14}
              C ${cx + 15} ${headCenterY + 24}, ${cx + 7} ${headCenterY + 34}, ${cx} ${headCenterY + 35}
              C ${cx - 7} ${headCenterY + 34}, ${cx - 15} ${headCenterY + 24}, ${cx - 23} ${headCenterY + 14}
              C ${cx - 29} ${headCenterY - 6}, ${cx - 29} ${headCenterY - 33}, ${cx} ${headCenterY - 33}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );

      case 'Diamond':
        return (
          <path
            d={`
              M ${cx} ${headCenterY - 34}
              C ${cx + 17} ${headCenterY - 28}, ${cx + 31} ${headCenterY - 4}, ${cx + 30} ${headCenterY + 7}
              C ${cx + 23} ${headCenterY + 20}, ${cx + 12} ${headCenterY + 31}, ${cx} ${headCenterY + 36}
              C ${cx - 12} ${headCenterY + 31}, ${cx - 23} ${headCenterY + 20}, ${cx - 30} ${headCenterY + 7}
              C ${cx - 31} ${headCenterY - 4}, ${cx - 17} ${headCenterY - 28}, ${cx} ${headCenterY - 34}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );

      case 'Oblong':
        return (
          <path
            d={`
              M ${cx} ${headCenterY - 38}
              C ${cx + 23} ${headCenterY - 38}, ${cx + 23} ${headCenterY + 18}, ${cx + 18} ${headCenterY + 36}
              C ${cx + 11} ${headCenterY + 42}, ${cx - 11} ${headCenterY + 42}, ${cx - 18} ${headCenterY + 36}
              C ${cx - 23} ${headCenterY + 18}, ${cx - 23} ${headCenterY - 38}, ${cx} ${headCenterY - 38}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );

      case 'Oval':
      default:
        return (
          <path
            d={`
              M ${cx} ${headCenterY - 34}
              C ${cx + 26} ${headCenterY - 34}, ${cx + 26} ${headCenterY + 12}, ${cx + 18} ${headCenterY + 28}
              C ${cx + 11} ${headCenterY + 35}, ${cx - 11} ${headCenterY + 35}, ${cx - 18} ${headCenterY + 28}
              C ${cx - 26} ${headCenterY + 12}, ${cx - 26} ${headCenterY - 34}, ${cx} ${headCenterY - 34}
              Z
            `}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="1.2"
            filter="url(#subtleShadow)"
          />
        );
    }
  };

  // =========================================================================
  // HAIRSTYLE BUILDER
  // =========================================================================
  const renderHairstyle = () => {
    if (hairstyle === 'None / Clean') return null;

    switch (hairstyle) {
      case 'Long Wavy':
        return (
          <g filter="url(#subtleShadow)">
            <path
              d={`
                M ${cx - 26} ${headCenterY + 2}
                C ${cx - 32} ${headCenterY - 38}, ${cx + 32} ${headCenterY - 38}, ${cx + 26} ${headCenterY + 2}
                C ${cx + 34} ${headCenterY + 42}, ${cx + 36} ${neckBottomY + 44}, ${cx + 26} ${neckBottomY + 85}
                C ${cx + 17} ${neckBottomY + 80}, ${cx + 22} ${neckBottomY + 40}, ${cx + 16} ${headCenterY + 10}
                C ${cx + 8} ${headCenterY - 24}, ${cx - 8} ${headCenterY - 24}, ${cx - 16} ${headCenterY + 10}
                C ${cx - 22} ${neckBottomY + 40}, ${cx - 17} ${neckBottomY + 80}, ${cx - 26} ${neckBottomY + 85}
                C ${cx - 36} ${neckBottomY + 44}, ${cx - 34} ${headCenterY + 42}, ${cx - 26} ${headCenterY + 2}
                Z
              `}
              fill={hairFill}
            />
            {/* Hair highlight */}
            <path
              d={`M ${cx - 14} ${headCenterY - 26} Q ${cx} ${headCenterY - 30} ${cx + 14} ${headCenterY - 26}`}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );

      case 'Bob Cut':
        return (
          <path
            d={`
              M ${cx - 27} ${headCenterY + 14}
              C ${cx - 31} ${headCenterY - 36}, ${cx + 31} ${headCenterY - 36}, ${cx + 27} ${headCenterY + 14}
              C ${cx + 26} ${neckBottomY - 2}, ${cx + 18} ${neckBottomY + 8}, ${cx + 14} ${neckBottomY + 6}
              C ${cx + 20} ${headCenterY + 12}, ${cx + 10} ${headCenterY - 20}, ${cx} ${headCenterY - 22}
              C ${cx - 10} ${headCenterY - 20}, ${cx - 20} ${headCenterY + 12}, ${cx - 14} ${neckBottomY + 6}
              C ${cx - 18} ${neckBottomY + 8}, ${cx - 26} ${neckBottomY - 2}, ${cx - 27} ${headCenterY + 14}
              Z
            `}
            fill={hairFill}
            filter="url(#subtleShadow)"
          />
        );

      case 'Sleek Bun':
        return (
          <g filter="url(#subtleShadow)">
            <circle cx={cx} cy={headCenterY - 38} r={14} fill={hairFill} />
            <path
              d={`
                M ${cx - 24} ${headCenterY}
                C ${cx - 26} ${headCenterY - 32}, ${cx + 26} ${headCenterY - 32}, ${cx + 24} ${headCenterY}
                C ${cx + 8} ${headCenterY - 20}, ${cx - 8} ${headCenterY - 20}, ${cx - 24} ${headCenterY}
                Z
              `}
              fill={hairFill}
            />
          </g>
        );

      case 'Curly Afro':
        return (
          <g filter="url(#subtleShadow)">
            <circle cx={cx} cy={headCenterY - 6} r={39} fill={hairFill} />
            {/* Cutout to reveal face */}
            <circle cx={cx} cy={headCenterY + 4} r={28} fill="url(#skinGradient)" />
          </g>
        );

      case 'Buzz Cut':
        return (
          <path
            d={`
              M ${cx - 25} ${headCenterY - 14}
              C ${cx - 27} ${headCenterY - 36}, ${cx + 27} ${headCenterY - 36}, ${cx + 25} ${headCenterY - 14}
              Z
            `}
            fill={hairFill}
            opacity="0.85"
          />
        );

      case 'Short Textured':
      default:
        return (
          <path
            d={`
              M ${cx - 25} ${headCenterY - 4}
              C ${cx - 28} ${headCenterY - 36}, ${cx + 28} ${headCenterY - 36}, ${cx + 25} ${headCenterY - 4}
              C ${cx + 22} ${headCenterY - 12}, ${cx + 12} ${headCenterY - 22}, ${cx} ${headCenterY - 24}
              C ${cx - 12} ${headCenterY - 22}, ${cx - 22} ${headCenterY - 12}, ${cx - 25} ${headCenterY - 4}
              Z
            `}
            fill={hairFill}
            filter="url(#subtleShadow)"
          />
        );
    }
  };

  // =========================================================================
  // CONNECTED TORSO, ARMS, LEGS GEOMETRY
  // =========================================================================
  const lShoulderX = cx - shoulderSpan;
  const rShoulderX = cx + shoulderSpan;

  const lChestX = cx - chestHalfWidth;
  const rChestX = cx + chestHalfWidth;

  const lWaistX = cx - waistHalfWidth;
  const rWaistX = cx + waistHalfWidth;

  const lHipX = cx - hipHalfWidth;
  const rHipX = cx + hipHalfWidth;

  // Continuous seamless Torso Path
  const torsoPath = `
    M ${cx - neckWidth} ${neckTopY}
    L ${cx - neckWidth - 2} ${neckBottomY}
    C ${cx - neckWidth - 12} ${shoulderY - 2}, ${lShoulderX + 10} ${shoulderY - 2}, ${lShoulderX} ${shoulderY + 6}
    C ${lShoulderX - 4} ${shoulderY + 18}, ${lChestX - 2} ${chestY - 14}, ${lChestX} ${chestY}
    C ${lChestX + 2} ${chestY + 24}, ${lWaistX - 2} ${waistY - 16}, ${lWaistX} ${waistY}
    C ${lWaistX + 2} ${waistY + 20}, ${lHipX - 4} ${hipY - 14}, ${lHipX} ${hipY}
    C ${lHipX - 2} ${hipY + 14}, ${cx - 16} ${crotchY + 4}, ${cx} ${crotchY}
    C ${cx + 16} ${crotchY + 4}, ${rHipX + 2} ${hipY + 14}, ${rHipX} ${hipY}
    C ${rHipX + 4} ${hipY - 14}, ${rWaistX - 2} ${waistY + 20}, ${rWaistX} ${waistY}
    C ${rWaistX + 2} ${waistY - 16}, ${rChestX - 2} ${chestY + 24}, ${rChestX} ${chestY}
    C ${rChestX + 2} ${chestY - 14}, ${rShoulderX + 4} ${shoulderY + 18}, ${rShoulderX} ${shoulderY + 6}
    C ${rShoulderX - 10} ${shoulderY - 2}, ${cx + neckWidth + 12} ${shoulderY - 2}, ${cx + neckWidth + 2} ${neckBottomY}
    L ${cx + neckWidth} ${neckTopY}
    Z
  `;

  // Left Arm (Deltoid -> Bicep -> Elbow -> Forearm -> Wrist -> Hand)
  const lArmAngle = 20;
  const lElbowX = lShoulderX - lArmAngle;
  const lWristX = lShoulderX - lArmAngle * 1.35;
  const lElbowWidth = bicepWidth * 0.85;

  const leftArmPath = `
    M ${lShoulderX + 2} ${shoulderY + 4}
    C ${lShoulderX - 6} ${shoulderY + 20}, ${lElbowX - bicepWidth} ${elbowY - 20}, ${lElbowX - lElbowWidth} ${elbowY}
    C ${lElbowX - lElbowWidth * 0.8} ${elbowY + 24}, ${lWristX - wristWidth} ${wristY - 16}, ${lWristX - wristWidth} ${wristY}
    L ${lWristX - wristWidth * 0.9} ${handY}
    L ${lWristX + wristWidth * 0.9} ${handY}
    L ${lWristX + wristWidth} ${wristY}
    C ${lWristX + wristWidth} ${wristY - 16}, ${lElbowX + lElbowWidth * 0.4} ${elbowY + 24}, ${lElbowX + lElbowWidth * 0.4} ${elbowY}
    C ${lElbowX + bicepWidth * 0.5} ${elbowY - 20}, ${lChestX - 1} ${chestY - 12}, ${lChestX} ${chestY}
    C ${lChestX - 2} ${chestY - 14}, ${lShoulderX - 4} ${shoulderY + 18}, ${lShoulderX + 2} ${shoulderY + 4}
    Z
  `;

  // Right Arm
  const rElbowX = rShoulderX + lArmAngle;
  const rWristX = rShoulderX + lArmAngle * 1.35;

  const rightArmPath = `
    M ${rShoulderX - 2} ${shoulderY + 4}
    C ${rShoulderX + 6} ${shoulderY + 20}, ${rElbowX + bicepWidth} ${elbowY - 20}, ${rElbowX + lElbowWidth} ${elbowY}
    C ${rElbowX + lElbowWidth * 0.8} ${elbowY + 24}, ${rWristX + wristWidth} ${wristY - 16}, ${rWristX + wristWidth} ${wristY}
    L ${rWristX + wristWidth * 0.9} ${handY}
    L ${rWristX - wristWidth * 0.9} ${handY}
    L ${rWristX - wristWidth} ${wristY}
    C ${rWristX - wristWidth} ${wristY - 16}, ${rElbowX - lElbowWidth * 0.4} ${elbowY + 24}, ${rElbowX - lElbowWidth * 0.4} ${elbowY}
    C ${rElbowX - bicepWidth * 0.5} ${elbowY - 20}, ${rChestX + 1} ${chestY - 12}, ${rChestX} ${chestY}
    C ${rChestX + 2} ${chestY - 14}, ${rShoulderX + 4} ${shoulderY + 18}, ${rShoulderX - 2} ${shoulderY + 4}
    Z
  `;

  // Left Leg Path
  const lLegCenterX = cx - hipHalfWidth * 0.45;
  const leftLegPath = `
    M ${cx - 3} ${crotchY - 2}
    C ${cx - 5} ${crotchY + 20}, ${lLegCenterX + thighWidth * 0.55} ${kneeY - 40}, ${lLegCenterX + kneeWidth * 0.4} ${kneeY}
    C ${lLegCenterX + kneeWidth * 0.3} ${kneeY + 40}, ${lLegCenterX + calfWidth * 0.45} ${kneeY + 70}, ${lLegCenterX + ankleWidth * 0.5} ${ankleY}
    L ${lLegCenterX + ankleWidth * 0.6} ${feetY}
    L ${lLegCenterX - ankleWidth * 0.9} ${feetY}
    L ${lLegCenterX - ankleWidth * 0.5} ${ankleY}
    C ${lLegCenterX - calfWidth * 0.75} ${kneeY + 70}, ${lLegCenterX - kneeWidth * 0.7} ${kneeY + 40}, ${lLegCenterX - kneeWidth * 0.6} ${kneeY}
    C ${lLegCenterX - thighWidth * 0.85} ${kneeY - 50}, ${lHipX - 2} ${hipY + 10}, ${lHipX} ${hipY}
    C ${lHipX - 2} ${hipY + 16}, ${cx - 20} ${crotchY + 2}, ${cx - 3} ${crotchY - 2}
    Z
  `;

  // Right Leg Path
  const rLegCenterX = cx + hipHalfWidth * 0.45;
  const rightLegPath = `
    M ${cx + 3} ${crotchY - 2}
    C ${cx + 5} ${crotchY + 20}, ${rLegCenterX - thighWidth * 0.55} ${kneeY - 40}, ${rLegCenterX - kneeWidth * 0.4} ${kneeY}
    C ${rLegCenterX - kneeWidth * 0.3} ${kneeY + 40}, ${rLegCenterX - calfWidth * 0.45} ${kneeY + 70}, ${rLegCenterX - ankleWidth * 0.5} ${ankleY}
    L ${rLegCenterX - ankleWidth * 0.6} ${feetY}
    L ${rLegCenterX + ankleWidth * 0.9} ${feetY}
    L ${rLegCenterX + ankleWidth * 0.5} ${ankleY}
    C ${rLegCenterX + calfWidth * 0.75} ${kneeY + 70}, ${rLegCenterX + kneeWidth * 0.7} ${kneeY + 40}, ${rLegCenterX + kneeWidth * 0.6} ${kneeY}
    C ${rLegCenterX + thighWidth * 0.85} ${kneeY - 50}, ${rHipX + 2} ${hipY + 10}, ${rHipX} ${hipY}
    C ${rHipX + 2} ${hipY + 16}, ${cx + 20} ${crotchY + 2}, ${cx + 3} ${crotchY - 2}
    Z
  `;

  // =========================================================================
  // SEPARATE CLOTHING LAYER (FOR VIRTUAL TRY-ON EXTENSION)
  // =========================================================================
  const renderClothingLayer = () => {
    if (activeClothing === 'none') return null;

    if (activeClothing === 'casual') {
      const topHemY = waistY + 18;
      const topPath = `
        M ${cx - neckWidth - 4} ${neckBottomY + 2}
        L ${lShoulderX + 4} ${shoulderY + 8}
        L ${lShoulderX - 12} ${chestY - 8}
        L ${lChestX - 6} ${chestY + 6}
        L ${lWaistX - 4} ${topHemY}
        Q ${cx} ${topHemY + 4} ${rWaistX + 4} ${topHemY}
        L ${rChestX + 6} ${chestY + 6}
        L ${rShoulderX + 12} ${chestY - 8}
        L ${rShoulderX - 4} ${shoulderY + 8}
        L ${cx + neckWidth + 4} ${neckBottomY + 2}
        Q ${cx} ${neckBottomY + 14} ${cx - neckWidth - 4} ${neckBottomY + 2}
        Z
      `;

      const pantsPath = `
        M ${lWaistX - 2} ${topHemY - 4}
        L ${lHipX - 4} ${hipY}
        L ${lLegCenterX - kneeWidth * 0.7} ${kneeY}
        L ${lLegCenterX - ankleWidth * 0.8} ${ankleY}
        L ${lLegCenterX + ankleWidth * 0.8} ${ankleY}
        L ${lLegCenterX + kneeWidth * 0.6} ${kneeY}
        L ${cx} ${crotchY + 4}
        L ${rLegCenterX - kneeWidth * 0.6} ${kneeY}
        L ${rLegCenterX - ankleWidth * 0.8} ${ankleY}
        L ${rLegCenterX + ankleWidth * 0.8} ${ankleY}
        L ${rLegCenterX + kneeWidth * 0.7} ${kneeY}
        L ${rHipX + 4} ${hipY}
        L ${rWaistX + 2} ${topHemY - 4}
        Z
      `;

      return (
        <g id="clothing-overlay" filter="url(#garmentShadow)">
          {/* Chinos */}
          <path
            d={pantsPath}
            fill="#334155"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
          />
          {/* Crewneck Top */}
          <path
            d={topPath}
            fill="#E11D48"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          />
        </g>
      );
    }

    if (activeClothing === 'dress') {
      const dressHemY = kneeY + 12;
      const hemWidth = hipHalfWidth * 1.25;
      const dressPath = `
        M ${cx - neckWidth - 5} ${neckBottomY + 2}
        L ${lShoulderX + 3} ${shoulderY + 8}
        L ${lChestX - 4} ${chestY + 6}
        L ${lWaistX - 3} ${waistY}
        L ${lHipX - 4} ${hipY}
        L ${cx - hemWidth} ${dressHemY}
        Q ${cx} ${dressHemY + 8} ${cx + hemWidth} ${dressHemY}
        L ${rHipX + 4} ${hipY}
        L ${rWaistX + 3} ${waistY}
        L ${rChestX + 4} ${chestY + 6}
        L ${rShoulderX - 3} ${shoulderY + 8}
        L ${cx + neckWidth + 5} ${neckBottomY + 2}
        Q ${cx} ${neckBottomY + 16} ${cx - neckWidth - 5} ${neckBottomY + 2}
        Z
      `;

      return (
        <g id="clothing-overlay" filter="url(#garmentShadow)">
          <path
            d={dressPath}
            fill="#4F46E5"
            fillOpacity="0.95"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          />
        </g>
      );
    }

    return null;
  };

  // =========================================================================
  // INTERACTIVE MEASUREMENT MARKERS / TAPE GUIDES
  // =========================================================================
  const renderMeasurementGuides = () => {
    if (!showTape) return null;

    const markers = [
      {
        key: 'shoulders',
        label: 'Shoulders',
        val: `${shouldersCm} cm`,
        x1: lShoulderX,
        x2: rShoulderX,
        y: shoulderY,
        badgeX: rShoulderX + 16,
        badgeY: shoulderY - 12,
      },
      {
        key: 'chest',
        label: 'Chest',
        val: `${chestCm} cm`,
        x1: lChestX,
        x2: rChestX,
        y: chestY,
        badgeX: rChestX + 16,
        badgeY: chestY - 12,
      },
      {
        key: 'biceps',
        label: 'Biceps',
        val: `${bicepsCm} cm`,
        x1: lElbowX - bicepWidth,
        x2: lElbowX + bicepWidth * 0.5,
        y: (shoulderY + elbowY) / 2,
        badgeX: lElbowX - bicepWidth - 76,
        badgeY: (shoulderY + elbowY) / 2 - 12,
      },
      {
        key: 'wrist',
        label: 'Wrist',
        val: `${wristCm} cm`,
        x1: lWristX - wristWidth,
        x2: lWristX + wristWidth,
        y: wristY,
        badgeX: lWristX - wristWidth - 76,
        badgeY: wristY - 12,
      },
    ];

    return (
      <g className="transition-all duration-200">
        {markers.map((m) => {
          const isHighlighted = activeHighlight === m.key;
          const stroke = isHighlighted ? '#F43F5E' : '#EC4899';
          const fillBg = isHighlighted ? '#881337' : '#1E1B4B';

          return (
            <g
              key={m.key}
              className="cursor-pointer group"
              onClick={() => handleMarkerClick(m.key)}
            >
              {/* Measurement Guide Line */}
              <line
                x1={m.x1}
                y1={m.y}
                x2={m.x2}
                y2={m.y}
                stroke={stroke}
                strokeWidth="1.8"
                strokeDasharray="4,4"
                opacity="0.85"
              />
              <circle cx={m.x1} cy={m.y} r={3} fill={stroke} />
              <circle cx={m.x2} cy={m.y} r={3} fill={stroke} />

              {/* Connecting line to floating badge */}
              <line
                x1={m.badgeX > m.x1 ? m.x2 : m.x1}
                y1={m.y}
                x2={m.badgeX > m.x1 ? m.badgeX : m.badgeX + 66}
                y2={m.y}
                stroke={stroke}
                strokeWidth="1.2"
                strokeDasharray="2,2"
                opacity="0.5"
              />

              {/* Pill Badge */}
              <g transform={`translate(${m.badgeX}, ${m.badgeY})`}>
                <rect
                  width="68"
                  height="24"
                  rx="12"
                  fill={fillBg}
                  stroke={stroke}
                  strokeWidth="1.4"
                  className="group-hover:fill-rose-900 transition-colors"
                />
                <text
                  x="34"
                  y="11"
                  textAnchor="middle"
                  fill="#FDF2F8"
                  fontSize="8.5"
                  fontWeight="700"
                  letterSpacing="0.3"
                >
                  {m.label}
                </text>
                <text
                  x="34"
                  y="20"
                  textAnchor="middle"
                  fill="#F472B6"
                  fontSize="8"
                  fontWeight="600"
                >
                  {m.val}
                </text>
              </g>
            </g>
          );
        })}

        {/* Height Stature Vertical Guide */}
        <g
          transform="translate(24, 50)"
          className="cursor-pointer group"
          onClick={() => handleMarkerClick('height')}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={feetY - 50}
            stroke="#94A3B8"
            strokeWidth="1.6"
            strokeDasharray="4,4"
            opacity="0.75"
          />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#94A3B8" strokeWidth="2" />
          <line
            x1="-5"
            y1={feetY - 50}
            x2="5"
            y2={feetY - 50}
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <g transform={`translate(10, ${(feetY - 50) / 2 - 12})`}>
            <rect
              width="64"
              height="24"
              rx="12"
              fill="#0F172A"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <text
              x="32"
              y="11"
              textAnchor="middle"
              fill="#E2E8F0"
              fontSize="8.5"
              fontWeight="700"
            >
              Height
            </text>
            <text
              x="32"
              y="20"
              textAnchor="middle"
              fill="#38BDF8"
              fontSize="8"
              fontWeight="600"
            >
              {heightCm} cm
            </text>
          </g>
        </g>
      </g>
    );
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-full select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#090D16] via-[#0E1526] to-[#121B2F] border border-neutral-800 shadow-2xl ${className}`}
    >
      {/* Top Floating Viewport Toolbar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Tape Guides Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTape}
            title="Toggle Tape Measurement Guide Callouts"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold backdrop-blur-md border transition-all ${
              showTape
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm'
                : 'bg-neutral-900/80 border-neutral-700/60 text-neutral-400 hover:text-white'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Tape Guides</span>
          </button>

          {/* Garment Try-On Overlay Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700/60 text-xs">
            <button
              type="button"
              onClick={() => setClothing('none')}
              className={`px-2.5 py-1 rounded-xl font-medium transition ${
                activeClothing === 'none'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Body Only
            </button>
            <button
              type="button"
              onClick={() => setClothing('casual')}
              className={`px-2.5 py-1 rounded-xl font-medium transition ${
                activeClothing === 'casual'
                  ? 'bg-neutral-800 text-rose-300 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Outfit
            </button>
            <button
              type="button"
              onClick={() => setClothing('dress')}
              className={`px-2.5 py-1 rounded-xl font-medium transition ${
                activeClothing === 'dress'
                  ? 'bg-neutral-800 text-indigo-300 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dress
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700/60">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.35, z + 0.1))}
            title="Zoom In"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
            title="Zoom Out"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Vector SVG Viewport */}
      <div
        className="w-full h-full flex items-center justify-center p-2 sm:p-5 overflow-hidden transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 460 760"
          className="w-full h-full max-h-[720px] drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* SVG Definitions */}
          <defs>
            {/* Directional Skin Lighting Gradient */}
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skin.highlight} />
              <stop offset="60%" stopColor={skin.base} />
              <stop offset="100%" stopColor={skin.shadow} />
            </linearGradient>

            {/* Subtle Drop Shadow for Body Segments */}
            <filter id="subtleShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="rgba(0,0,0,0.38)"
              />
            </filter>

            {/* Garment Drop Shadow */}
            <filter id="garmentShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="8"
                floodColor="rgba(0,0,0,0.45)"
              />
            </filter>
          </defs>

          {/* Floor Shadow */}
          <ellipse
            cx={cx}
            cy={feetY + 12}
            rx={hipHalfWidth * 0.95}
            ry={14}
            fill="rgba(0,0,0,0.22)"
            filter="blur(8px)"
          />

          {/* Base Connected Body Layers */}
          {/* 1. Arms (Behind torso outline slightly for clean overlap) */}
          <path
            d={leftArmPath}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="0.8"
            filter="url(#subtleShadow)"
          />
          <path
            d={rightArmPath}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="0.8"
            filter="url(#subtleShadow)"
          />

          {/* 2. Legs & Feet */}
          <path
            d={leftLegPath}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="0.8"
            filter="url(#subtleShadow)"
          />
          <path
            d={rightLegPath}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="0.8"
            filter="url(#subtleShadow)"
          />

          {/* 3. Torso & Pelvis */}
          <path
            d={torsoPath}
            fill="url(#skinGradient)"
            stroke={skin.shadow}
            strokeWidth="0.8"
            filter="url(#subtleShadow)"
          />

          {/* 4. Anatomical Accent Lines (Clavicles, Chest, Abdomen) */}
          {/* Clavicles */}
          <path
            d={`M ${cx - neckWidth - 4} ${neckBottomY + 4} Q ${cx - shoulderSpan * 0.45} ${neckBottomY + 6} ${lShoulderX + 12} ${shoulderY + 6}`}
            stroke={skin.shadow}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <path
            d={`M ${cx + neckWidth + 4} ${neckBottomY + 4} Q ${cx + shoulderSpan * 0.45} ${neckBottomY + 6} ${rShoulderX - 12} ${shoulderY + 6}`}
            stroke={skin.shadow}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Chest / Torso Arch */}
          <path
            d={`M ${cx - chestHalfWidth * 0.85} ${chestY + 2} Q ${cx} ${chestY + 12} ${cx + chestHalfWidth * 0.85} ${chestY + 2}`}
            stroke={skin.shadow}
            strokeWidth="1.2"
            fill="none"
            opacity="0.45"
          />

          {/* Abdominal midline & Navel */}
          <line
            x1={cx}
            y1={chestY + 18}
            x2={cx}
            y2={waistY + 16}
            stroke={skin.shadow}
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.38"
          />
          <ellipse
            cx={cx}
            cy={waistY + 24}
            rx={2}
            ry={3.2}
            fill={skin.shadow}
            opacity="0.65"
          />

          {/* 5. Head and Face Shape (Morphs dynamically with faceShape) */}
          {renderFaceOutline()}

          {/* Clean Simplified Facial Features */}
          <g opacity="0.68">
            {/* Eyebrows */}
            <path
              d={`M ${cx - 15} ${headCenterY - 6} Q ${cx - 9} ${headCenterY - 10} ${cx - 3} ${headCenterY - 6}`}
              stroke={skin.shadow}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d={`M ${cx + 3} ${headCenterY - 6} Q ${cx + 9} ${headCenterY - 10} ${cx + 15} ${headCenterY - 6}`}
              stroke={skin.shadow}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Eyes */}
            <ellipse cx={cx - 9} cy={headCenterY - 2} rx={3} ry={1.7} fill={skin.shadow} />
            <ellipse cx={cx + 9} cy={headCenterY - 2} rx={3} ry={1.7} fill={skin.shadow} />
            {/* Nose Bridge */}
            <path
              d={`M ${cx} ${headCenterY - 2} L ${cx} ${headCenterY + 8} Q ${cx + 2.5} ${headCenterY + 10} ${cx} ${headCenterY + 10}`}
              stroke={skin.shadow}
              strokeWidth="1.2"
              fill="none"
            />
            {/* Soft Lips */}
            <path
              d={`M ${cx - 6} ${headCenterY + 17} Q ${cx} ${headCenterY + 15.5} ${cx + 6} ${headCenterY + 17} Q ${cx} ${headCenterY + 20} ${cx - 6} ${headCenterY + 17}`}
              fill={skin.shadow}
              opacity="0.65"
            />
          </g>

          {/* 6. Hairstyle Layer */}
          {renderHairstyle()}

          {/* 7. Clothing Layer (Separate Overlay) */}
          {renderClothingLayer()}

          {/* 8. Interactive Measurement Tape Guides */}
          {renderMeasurementGuides()}
        </svg>
      </div>

      {/* Bottom Live Stats Indicator */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 shadow-xl text-neutral-300 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">{heightCm} cm</span>
          <span className="text-neutral-500">•</span>
          <span>{weightKg} kg</span>
          <span className="text-neutral-500">•</span>
          <span>Chest {chestCm} cm</span>
          <span className="text-neutral-500">•</span>
          <span>Biceps {bicepsCm} cm</span>
        </div>

        {/* Active Face Shape & Skin Tone Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 shadow-xl text-xs text-neutral-300">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
            style={{ backgroundColor: skin.base }}
          />
          <span className="font-medium text-white">{faceShape}</span>
        </div>
      </div>
    </div>
  );
}

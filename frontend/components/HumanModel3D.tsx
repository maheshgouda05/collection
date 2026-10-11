'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  Body3DParams,
  Appearance3DParams,
  PoseOption,
  ViewModeOption,
  WardrobeItem,
  SkinToneKey,
  HairStyle,
  HairColour,
  FacialHairOption,
  EyeColorOption,
  ModelPresetType,
  MIXAMO_ANIMATIONS,
} from '@/lib/types';
import {
  RotateCcw,
  RefreshCw,
  Info,
  Check,
  Upload,
  User,
  Sparkles,
  Layers,
  ChevronDown,
  Film,
  Play,
  Pause,
  Box,
  FileCode,
} from 'lucide-react';

export interface HumanModel3DProps {
  bodyParams: Body3DParams;
  appearanceParams: Appearance3DParams;
  clothing?: WardrobeItem | null;
  pose?: PoseOption;
  viewMode?: ViewModeOption;
  autoRotate?: boolean;
  onViewChange?: (view: ViewModeOption) => void;
  onAutoRotateToggle?: (active: boolean) => void;
  className?: string;
  engineMode?: 'auto' | 'glb' | 'procedural';
  modelPreset?: ModelPresetType;
  customModelUrl?: string | null;
  customModelName?: string | null;
  activeAnimation?: string;
  onModelPresetChange?: (preset: ModelPresetType) => void;
  onCustomModelUpload?: (file: File) => void;
  onAnimationChange?: (anim: string) => void;
  showControlsOverlay?: boolean;
  showModelSwitcherOverlay?: boolean;
}

const SKIN_TONES_MAP: Record<SkinToneKey, string> = {
  Fair: '#F6D9CA',
  'Light Warm': '#EDC4AF',
  'Medium Golden': '#D7A787',
  Olive: '#B8825D',
  'Rich Deep': '#8A5333',
  Ebony: '#422416',
};

const HAIR_COLORS_MAP: Record<HairColour, string> = {
  'Espresso Black': '#1C1917',
  'Chocolate Brown': '#452A1E',
  'Honey Blonde': '#D4AF37',
  Platinum: '#E2E8F0',
  'Auburn Red': '#8A2C1F',
  'Silver Grey': '#94A3B8',
};

const EYE_COLORS_MAP: Record<EyeColorOption, string> = {
  'Dark Brown': '#2C1B14',
  Hazel: '#7B6634',
  Green: '#2D5A36',
  Blue: '#2A5288',
  Grey: '#64748B',
  Amber: '#B4782A',
};

export default function HumanModel3D({
  bodyParams,
  appearanceParams,
  clothing = null,
  pose = 'apose',
  viewMode = 'front',
  autoRotate = false,
  onViewChange,
  onAutoRotateToggle,
  className = '',
  engineMode = 'auto',
  modelPreset,
  customModelUrl,
  customModelName,
  activeAnimation,
  onModelPresetChange,
  onCustomModelUpload,
  onAnimationChange,
  showControlsOverlay = true,
  showModelSwitcherOverlay = true,
}: HumanModel3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active preset resolution (prop overrides bodyParams)
  const currentModelPreset: ModelPresetType =
    modelPreset || bodyParams.modelPreset || 'procedural-female';
  const effectiveCustomModelUrl = customModelUrl || bodyParams.customModelUrl || null;
  const effectiveCustomModelName = customModelName || bodyParams.customModelName || null;
  const currentAnimation = activeAnimation || bodyParams.activeAnimation || 'none';

  // Three.js instances ref
  const instancesRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    modelGroup: THREE.Group;
    proceduralGroup: THREE.Group;
    mixamoGroup: THREE.Group;
    customGlbGroup: THREE.Group;
    clothesGroup: THREE.Group;
    hairGroup: THREE.Group;
    beardGroup: THREE.Group;
    eyesGroup: THREE.Group;
    currentEngine: 'glb' | 'procedural';
    animationFrameId: number | null;
    isDestroyed: boolean;
    glbBones: Map<string, THREE.Bone>;
    materials: THREE.Material[];
    geometries: THREE.BufferGeometry[];
    textures: THREE.Texture[];
    clayMaterial: THREE.MeshStandardMaterial;
    skinMaterial: THREE.MeshStandardMaterial;
    hairMaterial: THREE.MeshStandardMaterial;
    eyeMaterial: THREE.MeshStandardMaterial;
    clothesMaterial: THREE.MeshStandardMaterial;
    mixamoMixer: THREE.AnimationMixer | null;
    mixamoClips: THREE.AnimationClip[];
    customMixer: THREE.AnimationMixer | null;
    customClips: THREE.AnimationClip[];
    loadedCustomUrl: string | null;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentCameraAngle, setCurrentCameraAngle] = useState<'front' | 'side' | 'back' | 'free'>(
    viewMode === 'side' ? 'side' : viewMode === 'back' ? 'back' : 'front'
  );
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isAnimMenuOpen, setIsAnimMenuOpen] = useState(false);
  const [customModelError, setCustomModelError] = useState<string | null>(null);

  // Keep rotation synced with props
  useEffect(() => {
    setIsRotating(autoRotate);
  }, [autoRotate]);

  // Sync camera view angle if viewMode prop changes
  useEffect(() => {
    if (viewMode === 'front' || viewMode === 'side' || viewMode === 'back' || viewMode === 'free') {
      setCurrentCameraAngle(viewMode);
    }
  }, [viewMode]);

  // --------------------------------------------------------------------------
  // PROCEDURAL MANNEQUIN BUILDER (Female & Male Anatomical Sculpting)
  // --------------------------------------------------------------------------
  const buildProceduralMannequin = useCallback(
    (
      parentGroup: THREE.Group,
      params: Body3DParams,
      material: THREE.Material,
      currentPose: PoseOption,
      preset: ModelPresetType
    ) => {
      // Clear previous children
      while (parentGroup.children.length > 0) {
        const child = parentGroup.children[0];
        parentGroup.remove(child);
      }

      const {
        heightCm,
        genderBlend = 20,
        shoulderWidth,
        chestWidth,
        waistWidth,
        hipWidth,
        armLength,
        armThickness,
        legLength,
        legThickness,
        neckLength,
        muscle,
        bodyFat,
      } = params;

      // Normalised scale factors around 1.0
      const heightFactor = heightCm / 174;
      const sWidthFactor = 0.8 + (shoulderWidth / 100) * 0.45;
      const cWidthFactor = 0.8 + (chestWidth / 100) * 0.45;
      const wWidthFactor = 0.75 + (waistWidth / 100) * 0.5;
      const hWidthFactor = 0.8 + (hipWidth / 100) * 0.5;
      const aLenFactor = 0.85 + (armLength / 100) * 0.3;
      const aThickFactor = 0.8 + (armThickness / 100) * 0.4 + (muscle / 100) * 0.1;
      const lLenFactor = 0.85 + (legLength / 100) * 0.3;
      const lThickFactor = 0.8 + (legThickness / 100) * 0.4 + (bodyFat / 100) * 0.08;
      const nLenFactor = 0.85 + (neckLength / 100) * 0.3;

      // Determine feminine factor based on preset + slider
      let feminineFactor = 1 - genderBlend / 100;
      if (preset === 'procedural-female' && feminineFactor < 0.55) {
        feminineFactor = 0.8;
      } else if (preset === 'procedural-male' && feminineFactor > 0.45) {
        feminineFactor = 0.15;
      }

      const baseGroup = new THREE.Group();
      baseGroup.name = 'ProceduralMannequinMesh';

      // 1. Pelvis / Hips (wider for female silhouette)
      const pelvisW = (0.24 + feminineFactor * 0.05) * hWidthFactor;
      const pelvisH = 0.16 * heightFactor;
      const pelvisGeo = new THREE.CylinderGeometry(pelvisW * 0.82, pelvisW, pelvisH, 24);
      const pelvisMesh = new THREE.Mesh(pelvisGeo, material);
      pelvisMesh.position.y = 0.95 * heightFactor;
      pelvisMesh.castShadow = true;
      baseGroup.add(pelvisMesh);

      // 2. Waist / Abdomen (tapered for female, athletic for male)
      const waistW = (0.17 + (1 - feminineFactor) * 0.05) * wWidthFactor;
      const waistH = 0.15 * heightFactor;
      const waistD = (0.13 + (1 - feminineFactor) * 0.03) * wWidthFactor;
      const waistGeo = new THREE.CylinderGeometry(waistW * 1.12, waistW, waistH, 24);
      const waistMesh = new THREE.Mesh(waistGeo, material);
      waistMesh.position.y = 1.08 * heightFactor;
      waistMesh.scale.set(1, 1, waistD / waistW);
      waistMesh.castShadow = true;
      baseGroup.add(waistMesh);

      // 3. Ribcage / Chest / Torso
      const chestW = (0.22 + (1 - feminineFactor) * 0.07) * cWidthFactor * sWidthFactor;
      const chestH = 0.22 * heightFactor;
      const chestD = 0.16 + (muscle / 100) * 0.04;
      const chestGeo = new THREE.CylinderGeometry(chestW * 1.15, chestW * 0.95, chestH, 24);
      const chestMesh = new THREE.Mesh(chestGeo, material);
      chestMesh.position.y = 1.25 * heightFactor;
      chestMesh.scale.set(1, 1, chestD / chestW);
      chestMesh.castShadow = true;
      baseGroup.add(chestMesh);

      // Bust curves for Female Sculpted Mannequin
      if (feminineFactor > 0.35) {
        const bustScale = (0.052 + (chestWidth / 100) * 0.024) * feminineFactor;
        [-0.07 * sWidthFactor, 0.07 * sWidthFactor].forEach((xOffset) => {
          const bustGeo = new THREE.SphereGeometry(bustScale, 18, 14);
          bustGeo.scale(1.0, 1.06, 1.25);
          const bustMesh = new THREE.Mesh(bustGeo, material);
          bustMesh.position.set(xOffset, 1.25 * heightFactor, 0.11 * cWidthFactor + bustScale * 0.45);
          bustMesh.rotation.x = 0.12;
          bustMesh.castShadow = true;
          baseGroup.add(bustMesh);
        });
      }

      // Athletic pectoral plates for Male Sculpted Mannequin
      if (feminineFactor <= 0.35) {
        [-0.08 * sWidthFactor, 0.08 * sWidthFactor].forEach((xOffset) => {
          const pecGeo = new THREE.BoxGeometry(0.10 * sWidthFactor, 0.08 * heightFactor, 0.04);
          const pecMesh = new THREE.Mesh(pecGeo, material);
          pecMesh.position.set(xOffset, 1.26 * heightFactor, 0.10 * cWidthFactor);
          pecMesh.rotation.y = xOffset > 0 ? -0.08 : 0.08;
          pecMesh.castShadow = true;
          baseGroup.add(pecMesh);
        });
      }

      // 4. Clavicles / Shoulder Beam
      const shoulderSpan = (0.36 + (1 - feminineFactor) * 0.08) * sWidthFactor;
      const shoulderGeo = new THREE.CapsuleGeometry(0.044, shoulderSpan * 0.72, 12, 16);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, material);
      shoulderMesh.rotation.z = Math.PI / 2;
      shoulderMesh.position.y = 1.37 * heightFactor;
      shoulderMesh.castShadow = true;
      baseGroup.add(shoulderMesh);

      // 5. Neck
      const neckR = 0.052 + (1 - feminineFactor) * 0.015 + (muscle / 100) * 0.01;
      const neckH = 0.09 * nLenFactor * heightFactor;
      const neckGeo = new THREE.CylinderGeometry(neckR, neckR * 1.1, neckH, 16);
      const neckMesh = new THREE.Mesh(neckGeo, material);
      neckMesh.position.y = (1.4 + neckH / 2) * heightFactor;
      neckMesh.castShadow = true;
      baseGroup.add(neckMesh);

      // 6. Head (Anatomical cranium + jawline)
      const headGroup = new THREE.Group();
      headGroup.name = 'HeadGroup';
      headGroup.position.y = (1.42 + neckH + 0.12) * heightFactor;

      // Cranium
      const craniumGeo = new THREE.SphereGeometry(0.105, 24, 20);
      craniumGeo.scale(1, 1.18, 1.12);
      const craniumMesh = new THREE.Mesh(craniumGeo, material);
      craniumMesh.castShadow = true;
      headGroup.add(craniumMesh);

      // Jaw/Chin (slighter square contour for male)
      const jawGeo = new THREE.ConeGeometry(0.08, 0.12, 16);
      const jawMesh = new THREE.Mesh(jawGeo, material);
      jawMesh.rotation.x = Math.PI;
      jawMesh.position.set(0, -0.06, 0.02);
      const jawScaleX = feminineFactor > 0.4 ? 0.88 : 1.06;
      jawMesh.scale.set(jawScaleX, 1, 0.75);
      jawMesh.castShadow = true;
      headGroup.add(jawMesh);
      baseGroup.add(headGroup);

      // Arm Poses
      let leftArmAngle = 0.32; // A-pose default radians ~18 deg
      let rightArmAngle = -0.32;
      let elbowBend = 0.08;

      if (currentPose === 'stand') {
        leftArmAngle = 0.12;
        rightArmAngle = -0.12;
        elbowBend = 0.04;
      } else if (currentPose === 'relaxed') {
        leftArmAngle = 0.18;
        rightArmAngle = -0.26;
        elbowBend = 0.18;
      }

      // 7. Left & Right Arms
      const shoulderOffset = shoulderSpan * 0.48;
      const upperArmLen = 0.26 * aLenFactor * heightFactor;
      const forearmLen = 0.24 * aLenFactor * heightFactor;
      const armR = (0.042 + (1 - feminineFactor) * 0.01) * aThickFactor;

      [-1, 1].forEach((side) => {
        const armGroup = new THREE.Group();
        armGroup.position.set(side * shoulderOffset, 1.36 * heightFactor, 0);

        // Shoulder joint
        const sJoint = new THREE.Mesh(new THREE.SphereGeometry(armR * 1.15, 16, 12), material);
        armGroup.add(sJoint);

        // Upper arm
        const upperArmMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(armR * 0.9, armR * 1.1, upperArmLen, 16),
          material
        );
        upperArmMesh.position.y = -upperArmLen / 2;
        upperArmMesh.castShadow = true;

        const upperArmContainer = new THREE.Group();
        upperArmContainer.rotation.z = side === 1 ? rightArmAngle : -leftArmAngle;
        upperArmContainer.add(upperArmMesh);

        // Elbow joint
        const elbowMesh = new THREE.Mesh(new THREE.SphereGeometry(armR * 0.9, 14, 10), material);
        elbowMesh.position.y = -upperArmLen;
        upperArmContainer.add(elbowMesh);

        // Forearm
        const forearmContainer = new THREE.Group();
        forearmContainer.position.y = -upperArmLen;
        forearmContainer.rotation.x = elbowBend;
        const forearmMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(armR * 0.7, armR * 0.88, forearmLen, 16),
          material
        );
        forearmMesh.position.y = -forearmLen / 2;
        forearmMesh.castShadow = true;
        forearmContainer.add(forearmMesh);

        // Hand
        const handMesh = new THREE.Mesh(
          new THREE.BoxGeometry(armR * 1.2, 0.08 * aLenFactor, armR * 0.6),
          material
        );
        handMesh.position.set(0, -forearmLen - 0.04, 0);
        handMesh.castShadow = true;
        forearmContainer.add(handMesh);

        upperArmContainer.add(forearmContainer);
        armGroup.add(upperArmContainer);
        baseGroup.add(armGroup);
      });

      // 8. Left & Right Legs
      const hipOffset = pelvisW * 0.42;
      const thighLen = 0.42 * lLenFactor * heightFactor;
      const calfLen = 0.4 * lLenFactor * heightFactor;
      const legR = (0.072 + (1 - feminineFactor) * 0.012) * lThickFactor;

      [-1, 1].forEach((side) => {
        const legGroup = new THREE.Group();
        legGroup.position.set(side * hipOffset, 0.92 * heightFactor, 0);

        // Hip joint ball
        const hJoint = new THREE.Mesh(new THREE.SphereGeometry(legR * 1.05, 16, 12), material);
        legGroup.add(hJoint);

        // Thigh
        const thighMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(legR * 0.85, legR * 1.05, thighLen, 18),
          material
        );
        thighMesh.position.y = -thighLen / 2;
        thighMesh.castShadow = true;
        legGroup.add(thighMesh);

        // Knee joint
        const kneeMesh = new THREE.Mesh(new THREE.SphereGeometry(legR * 0.85, 14, 10), material);
        kneeMesh.position.y = -thighLen;
        legGroup.add(kneeMesh);

        // Calf / Lower Leg
        const calfGroup = new THREE.Group();
        calfGroup.position.y = -thighLen;
        const calfMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(legR * 0.62, legR * 0.84, calfLen, 18),
          material
        );
        calfMesh.position.y = -calfLen / 2;
        calfMesh.castShadow = true;
        calfGroup.add(calfMesh);

        // Ankle & Foot
        const footGeo = new THREE.BoxGeometry(legR * 1.1, 0.06, 0.17 * heightFactor);
        const footMesh = new THREE.Mesh(footGeo, material);
        footMesh.position.set(0, -calfLen - 0.03, 0.04);
        footMesh.castShadow = true;
        calfGroup.add(footMesh);

        legGroup.add(calfGroup);
        baseGroup.add(legGroup);
      });

      parentGroup.add(baseGroup);
    },
    []
  );

  // --------------------------------------------------------------------------
  // HAIR MESH BUILDER
  // --------------------------------------------------------------------------
  const buildHairMesh = useCallback(
    (hairGroup: THREE.Group, style: HairStyle, material: THREE.Material, headY: number) => {
      while (hairGroup.children.length > 0) {
        hairGroup.remove(hairGroup.children[0]);
      }

      hairGroup.position.y = headY;

      switch (style) {
        case 'Long Wavy': {
          const crown = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), material);
          crown.scale.set(1.05, 1.1, 1.1);
          crown.position.y = 0.02;
          hairGroup.add(crown);
          const back = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 0.42, 16), material);
          back.position.set(0, -0.16, -0.06);
          back.rotation.x = -0.15;
          hairGroup.add(back);
          [-0.11, 0.11].forEach((x) => {
            const sideWave = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.32, 8, 12), material);
            sideWave.position.set(x, -0.14, 0.02);
            sideWave.rotation.z = x > 0 ? 0.1 : -0.1;
            hairGroup.add(sideWave);
          });
          break;
        }
        case 'Bob Cut': {
          const crown = new THREE.Mesh(new THREE.SphereGeometry(0.125, 16, 16), material);
          crown.scale.set(1.08, 1.12, 1.1);
          hairGroup.add(crown);
          const bobSides = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.18, 16), material);
          bobSides.position.set(0, -0.06, 0);
          hairGroup.add(bobSides);
          break;
        }
        case 'Short Textured': {
          const crown = new THREE.Mesh(new THREE.SphereGeometry(0.118, 16, 16), material);
          crown.scale.set(1.06, 1.18, 1.08);
          crown.position.y = 0.02;
          hairGroup.add(crown);
          for (let i = 0; i < 7; i++) {
            const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 6), material);
            tuft.position.set((Math.random() - 0.5) * 0.12, 0.11, (Math.random() - 0.5) * 0.12);
            tuft.rotation.set((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3);
            hairGroup.add(tuft);
          }
          break;
        }
        case 'Sleek Bun': {
          const cap = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 16), material);
          cap.scale.set(1.04, 1.08, 1.04);
          hairGroup.add(cap);
          const bun = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), material);
          bun.position.set(0, 0.12, -0.06);
          hairGroup.add(bun);
          break;
        }
        case 'Curly Afro': {
          const afro = new THREE.Mesh(new THREE.SphereGeometry(0.165, 18, 18), material);
          afro.scale.set(1.15, 1.25, 1.18);
          afro.position.y = 0.04;
          hairGroup.add(afro);
          break;
        }
        case 'Buzz Cut': {
          const buzz = new THREE.Mesh(new THREE.SphereGeometry(0.112, 16, 16), material);
          buzz.scale.set(1.02, 1.06, 1.02);
          hairGroup.add(buzz);
          break;
        }
      }
    },
    []
  );

  // --------------------------------------------------------------------------
  // CLOTHING OVERLAY LAYER
  // --------------------------------------------------------------------------
  const buildClothingOverlay = useCallback(
    (clothesGroup: THREE.Group, item: WardrobeItem | null, material: THREE.Material, body: Body3DParams) => {
      while (clothesGroup.children.length > 0) {
        clothesGroup.remove(clothesGroup.children[0]);
      }

      if (!item) return;

      const h = body.heightCm / 174;
      const cat = item.category;

      if (cat === 'Tops' || cat === 'Outerwear') {
        const shirtGeo = new THREE.CylinderGeometry(0.245, 0.21, 0.38 * h, 20);
        const shirtMesh = new THREE.Mesh(shirtGeo, material);
        shirtMesh.position.y = 1.22 * h;
        shirtMesh.scale.set(1.06, 1, 1.06);
        shirtMesh.castShadow = true;
        clothesGroup.add(shirtMesh);

        [-0.19, 0.19].forEach((side) => {
          const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.22 * h, 14), material);
          sleeve.position.set(side * 1.05, 1.28 * h, 0);
          sleeve.rotation.z = side > 0 ? -0.32 : 0.32;
          clothesGroup.add(sleeve);
        });
      } else if (cat === 'Bottoms') {
        const waistShell = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.25, 0.2 * h, 20), material);
        waistShell.position.y = 0.96 * h;
        clothesGroup.add(waistShell);

        [-0.09, 0.09].forEach((side) => {
          const pantLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.075, 0.72 * h, 16), material);
          pantLeg.position.set(side, 0.5 * h, 0);
          clothesGroup.add(pantLeg);
        });
      } else if (cat === 'Dresses') {
        const dressTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.2, 0.32 * h, 20), material);
        dressTorso.position.y = 1.2 * h;
        clothesGroup.add(dressTorso);

        const dressSkirt = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.58 * h, 22), material);
        dressSkirt.position.y = 0.76 * h;
        clothesGroup.add(dressSkirt);
      } else if (cat === 'Footwear') {
        [-0.09, 0.09].forEach((side) => {
          const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.19 * h), material);
          shoe.position.set(side, 0.04 * h, 0.04);
          clothesGroup.add(shoe);
        });
      }
    },
    []
  );

  // --------------------------------------------------------------------------
  // INITIALISE THREE.JS ENGINE ON MOUNT
  // --------------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglAvailable(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebglAvailable(false);
      setIsLoading(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 25);
    camera.position.set(0, 0.95, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    canvasRef.current = renderer.domElement;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(2.2, 4.0, 2.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.1);
    fillLight.position.set(-2.5, 2.0, -1.8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 3.2, -3.0);
    scene.add(rimLight);

    const floorGeo = new THREE.CircleGeometry(1.4, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.005;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.2;
    controls.maxDistance = 4.2;
    controls.maxPolarAngle = Math.PI / 2 + 0.04;
    controls.minPolarAngle = 0.15;
    controls.target.set(0, 0.95, 0);
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    const modelGroup = new THREE.Group();
    modelGroup.name = 'MainModelContainer';
    scene.add(modelGroup);

    const proceduralGroup = new THREE.Group();
    proceduralGroup.name = 'ProceduralGroup';
    modelGroup.add(proceduralGroup);

    const mixamoGroup = new THREE.Group();
    mixamoGroup.name = 'MixamoGroup';
    modelGroup.add(mixamoGroup);

    const customGlbGroup = new THREE.Group();
    customGlbGroup.name = 'CustomGLBGroup';
    modelGroup.add(customGlbGroup);

    const hairGroup = new THREE.Group();
    hairGroup.name = 'HairGroup';
    modelGroup.add(hairGroup);

    const clothesGroup = new THREE.Group();
    clothesGroup.name = 'ClothesGroup';
    modelGroup.add(clothesGroup);

    const clayMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.58,
      metalness: 0.06,
    });

    const skinColor =
      appearanceParams.displayMode === 'mannequin'
        ? 0xd4d4d8
        : new THREE.Color(
            appearanceParams.customSkinColor ||
              SKIN_TONES_MAP[appearanceParams.skinTone] ||
              '#D7A787'
          );

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.65,
      metalness: 0.04,
    });

    const hairColor = new THREE.Color(
      appearanceParams.customHairColor ||
        HAIR_COLORS_MAP[appearanceParams.hairColour] ||
        '#1C1917'
    );
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: hairColor,
      roughness: 0.52,
      metalness: 0.12,
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(EYE_COLORS_MAP[appearanceParams.eyeColor] || '#2C1B14'),
      roughness: 0.2,
      metalness: 0.1,
    });

    const clothesMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.7,
      metalness: 0.05,
    });

    const glbBonesMap = new Map<string, THREE.Bone>();

    const instances = {
      scene,
      camera,
      renderer,
      controls,
      modelGroup,
      proceduralGroup,
      mixamoGroup,
      customGlbGroup,
      clothesGroup,
      hairGroup,
      beardGroup: new THREE.Group(),
      eyesGroup: new THREE.Group(),
      currentEngine: 'procedural' as 'glb' | 'procedural',
      animationFrameId: null as number | null,
      isDestroyed: false,
      glbBones: glbBonesMap,
      materials: [clayMaterial, skinMaterial, hairMaterial, eyeMaterial, clothesMaterial],
      geometries: [floorGeo],
      textures: [] as THREE.Texture[],
      clayMaterial,
      skinMaterial,
      hairMaterial,
      eyeMaterial,
      clothesMaterial,
      mixamoMixer: null as THREE.AnimationMixer | null,
      mixamoClips: [] as THREE.AnimationClip[],
      customMixer: null as THREE.AnimationMixer | null,
      customClips: [] as THREE.AnimationClip[],
      loadedCustomUrl: null as string | null,
    };

    instancesRef.current = instances;

    // Load Mixamo Model in background (cached)
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/base_human.glb',
      (gltf) => {
        if (!instancesRef.current || instancesRef.current.isDestroyed) return;
        const root = gltf.scene;
        root.scale.set(0.95, 0.95, 0.95);
        root.position.y = 0;

        root.traverse((node) => {
          if ((node as THREE.Bone).isBone) {
            glbBonesMap.set(node.name, node as THREE.Bone);
          }
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = clayMaterial;
          }
        });

        mixamoGroup.add(root);
        instances.mixamoClips = gltf.animations || [];
        if (instances.mixamoClips.length > 0) {
          instances.mixamoMixer = new THREE.AnimationMixer(root);
        }
        setIsLoading(false);
      },
      undefined,
      () => {
        setIsLoading(false);
      }
    );

    // Initial build of procedural mannequin
    buildProceduralMannequin(
      proceduralGroup,
      bodyParams,
      appearanceParams.displayMode === 'mannequin' ? clayMaterial : skinMaterial,
      pose,
      currentModelPreset
    );

    const headHeight = (1.42 + 0.09 + 0.12) * (bodyParams.heightCm / 174);
    buildHairMesh(hairGroup, appearanceParams.hairstyle, hairMaterial, headHeight);
    buildClothingOverlay(clothesGroup, clothing, clothesMaterial, bodyParams);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      if (instances.isDestroyed) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (instances.mixamoMixer && mixamoGroup.visible) {
        instances.mixamoMixer.update(delta);
      }
      if (instances.customMixer && customGlbGroup.visible) {
        instances.customMixer.update(delta);
      }

      if (instancesRef.current && isRotating) {
        modelGroup.rotation.y += delta * 0.45;
      }

      controls.update();
      renderer.render(scene, camera);
      instances.animationFrameId = requestAnimationFrame(animate);
    };

    instances.animationFrameId = requestAnimationFrame(animate);

    return () => {
      instances.isDestroyed = true;
      if (instances.animationFrameId) {
        cancelAnimationFrame(instances.animationFrameId);
      }
      resizeObserver.disconnect();

      controls.dispose();
      instances.materials.forEach((m) => m.dispose());
      instances.geometries.forEach((g) => g.dispose());
      instances.textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.forceContextLoss();

      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      instancesRef.current = null;
    };
  }, []); // Run once on mount

  // --------------------------------------------------------------------------
  // LIVE UPDATES: Switch Model Preset & Custom Model Loading
  // --------------------------------------------------------------------------
  useEffect(() => {
    const inst = instancesRef.current;
    if (!inst) return;

    const { proceduralGroup, mixamoGroup, customGlbGroup, hairGroup, clothesGroup } = inst;

    // 1. Procedural Models (Female & Male)
    if (currentModelPreset === 'procedural-female' || currentModelPreset === 'procedural-male') {
      proceduralGroup.visible = true;
      mixamoGroup.visible = false;
      customGlbGroup.visible = false;
      hairGroup.visible = true;
      clothesGroup.visible = true;

      const activeMat =
        appearanceParams.displayMode === 'mannequin' ? inst.clayMaterial : inst.skinMaterial;

      if (appearanceParams.displayMode === 'coloured') {
        const hex =
          appearanceParams.customSkinColor ||
          SKIN_TONES_MAP[appearanceParams.skinTone] ||
          '#D7A787';
        inst.skinMaterial.color.set(hex);
      }

      const hairHex =
        appearanceParams.customHairColor ||
        HAIR_COLORS_MAP[appearanceParams.hairColour] ||
        '#1C1917';
      inst.hairMaterial.color.set(hairHex);

      buildProceduralMannequin(proceduralGroup, bodyParams, activeMat, pose, currentModelPreset);

      const headHeight = (1.42 + 0.09 + 0.12) * (bodyParams.heightCm / 174);
      buildHairMesh(
        hairGroup,
        appearanceParams.hairstyle,
        appearanceParams.displayMode === 'mannequin' ? inst.clayMaterial : inst.hairMaterial,
        headHeight
      );

      if (clothing?.colour) {
        const colorLower = clothing.colour.toLowerCase();
        if (colorLower.includes('black')) inst.clothesMaterial.color.set('#1e1e24');
        else if (colorLower.includes('white') || colorLower.includes('cream'))
          inst.clothesMaterial.color.set('#f3f4f6');
        else if (colorLower.includes('blue') || colorLower.includes('navy'))
          inst.clothesMaterial.color.set('#2563eb');
        else if (colorLower.includes('red') || colorLower.includes('burgundy'))
          inst.clothesMaterial.color.set('#b91c1c');
        else if (colorLower.includes('green') || colorLower.includes('olive'))
          inst.clothesMaterial.color.set('#15803d');
        else if (colorLower.includes('camel') || colorLower.includes('beige'))
          inst.clothesMaterial.color.set('#d97706');
        else inst.clothesMaterial.color.set('#4f46e5');
      }
      buildClothingOverlay(clothesGroup, clothing, inst.clothesMaterial, bodyParams);
    }

    // 2. Mixamo Humanoid Armature GLB
    else if (currentModelPreset === 'mixamo-humanoid') {
      proceduralGroup.visible = false;
      mixamoGroup.visible = true;
      customGlbGroup.visible = false;
      hairGroup.visible = false;
      clothesGroup.visible = false;

      // Bone scaling with body measurements
      if (inst.glbBones.size > 0) {
        const hScale = bodyParams.heightCm / 174;
        const sScale = 0.85 + (bodyParams.shoulderWidth / 100) * 0.35;
        const cScale = 0.85 + (bodyParams.chestWidth / 100) * 0.35;
        const wScale = 0.8 + (bodyParams.waistWidth / 100) * 0.4;
        const hipScale = 0.85 + (bodyParams.hipWidth / 100) * 0.35;

        const hipsBone = inst.glbBones.get('mixamorig:Hips');
        if (hipsBone) hipsBone.scale.set(hipScale, hScale, hipScale);
        const spineBone = inst.glbBones.get('mixamorig:Spine');
        if (spineBone) spineBone.scale.set(wScale, 1, wScale);
        const spine1Bone = inst.glbBones.get('mixamorig:Spine1');
        if (spine1Bone) spine1Bone.scale.set(cScale, 1, cScale);
        const lShoulder = inst.glbBones.get('mixamorig:LeftShoulder');
        const rShoulder = inst.glbBones.get('mixamorig:RightShoulder');
        if (lShoulder) lShoulder.scale.set(sScale, 1, 1);
        if (rShoulder) rShoulder.scale.set(sScale, 1, 1);
      }

      // Mixamo Animation playback
      if (inst.mixamoMixer && inst.mixamoClips.length > 0) {
        if (!currentAnimation || currentAnimation === 'none') {
          inst.mixamoMixer.stopAllAction();
        } else {
          const clip = inst.mixamoClips.find(
            (c) => c.name.toLowerCase() === currentAnimation.toLowerCase()
          );
          if (clip) {
            inst.mixamoMixer.stopAllAction();
            const action = inst.mixamoMixer.clipAction(clip);
            action.reset().fadeIn(0.2).play();
          }
        }
      }
    }

    // 3. Custom Uploaded GLB/GLTF Model
    else if (currentModelPreset === 'custom-glb') {
      proceduralGroup.visible = false;
      mixamoGroup.visible = false;
      customGlbGroup.visible = true;
      hairGroup.visible = false;
      clothesGroup.visible = false;

      if (effectiveCustomModelUrl && inst.loadedCustomUrl !== effectiveCustomModelUrl) {
        setIsLoading(true);
        setCustomModelError(null);

        // Remove previous custom model
        while (customGlbGroup.children.length > 0) {
          customGlbGroup.remove(customGlbGroup.children[0]);
        }
        if (inst.customMixer) {
          inst.customMixer.stopAllAction();
          inst.customMixer = null;
        }

        const loader = new GLTFLoader();
        loader.load(
          effectiveCustomModelUrl,
          (gltf) => {
            if (!instancesRef.current || instancesRef.current.isDestroyed) return;
            const root = gltf.scene;

            // Compute bounding box and normalize scale & center
            const box = new THREE.Box3().setFromObject(root);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);

            // Scale to standard mannequin height ~1.74m
            let scaleFactor = 1.0;
            if (size.y > 0.05) {
              scaleFactor = 1.74 / size.y;
            }
            root.scale.setScalar(scaleFactor);

            // Center horizontally and rest on floor (y = 0)
            root.position.x = -center.x * scaleFactor;
            root.position.z = -center.z * scaleFactor;
            root.position.y = -box.min.y * scaleFactor;

            // Traverse and enable shadows
            root.traverse((node) => {
              if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (!bodyParams.useCustomMaterials && appearanceParams.displayMode === 'mannequin') {
                  mesh.material = inst.clayMaterial;
                }
              }
            });

            customGlbGroup.add(root);
            inst.loadedCustomUrl = effectiveCustomModelUrl;
            inst.customClips = gltf.animations || [];
            if (inst.customClips.length > 0) {
              inst.customMixer = new THREE.AnimationMixer(root);
              const action = inst.customMixer.clipAction(inst.customClips[0]);
              action.play();
            }

            setIsLoading(false);
          },
          undefined,
          (err) => {
            console.error('Custom GLB load error:', err);
            setCustomModelError('Failed to load custom 3D model. Ensure it is a valid .glb or .gltf file.');
            setIsLoading(false);
          }
        );
      }
    }
  }, [
    currentModelPreset,
    effectiveCustomModelUrl,
    currentAnimation,
    bodyParams,
    appearanceParams,
    clothing,
    pose,
    buildProceduralMannequin,
    buildHairMesh,
    buildClothingOverlay,
  ]);

  // --------------------------------------------------------------------------
  // CAMERA QUICK VIEWS (Front, Side, Back, Free)
  // --------------------------------------------------------------------------
  const setCameraView = useCallback(
    (angle: 'front' | 'side' | 'back' | 'free') => {
      const inst = instancesRef.current;
      if (!inst) return;

      const { camera, controls, modelGroup } = inst;
      setIsRotating(false);
      onAutoRotateToggle?.(false);
      modelGroup.rotation.y = 0;

      switch (angle) {
        case 'front':
          camera.position.set(0, 0.95, 3.2);
          break;
        case 'side':
          camera.position.set(3.2, 0.95, 0);
          break;
        case 'back':
          camera.position.set(0, 0.95, -3.2);
          break;
        case 'free':
          camera.position.set(2.0, 1.2, 2.6);
          break;
      }
      controls.target.set(0, 0.88, 0);
      controls.update();
      setCurrentCameraAngle(angle);
      onViewChange?.(angle);
    },
    [onAutoRotateToggle, onViewChange]
  );

  const toggleRotation = useCallback(() => {
    setIsRotating((prev) => {
      const next = !prev;
      onAutoRotateToggle?.(next);
      return next;
    });
  }, [onAutoRotateToggle]);

  // File picker handler for custom .GLB
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onCustomModelUpload?.(file);
    setIsModelMenuOpen(false);
  };

  const handleSelectPreset = (preset: ModelPresetType) => {
    if (preset === 'custom-glb' && !effectiveCustomModelUrl) {
      fileInputRef.current?.click();
    }
    onModelPresetChange?.(preset);
    setIsModelMenuOpen(false);
  };

  const getModelLabel = (preset: ModelPresetType) => {
    switch (preset) {
      case 'procedural-female':
        return 'Sculpted Female';
      case 'procedural-male':
        return 'Sculpted Male';
      case 'mixamo-humanoid':
        return 'Mixamo Humanoid';
      case 'custom-glb':
        return effectiveCustomModelName || 'Custom Model';
      default:
        return '3D Model';
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden ${className}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
          onCustomModelUpload?.(file);
          onModelPresetChange?.('custom-glb');
        }
      }}
    >
      {/* Hidden File Input for GLB Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload 3D model file"
      />

      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
      />

      {!webglAvailable && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 text-white p-6 text-center z-20">
          <Info className="w-10 h-10 text-amber-400 mb-3" />
          <h4 className="text-base font-semibold mb-1">WebGL Acceleration Unavailable</h4>
          <p className="text-xs text-neutral-300 max-w-sm">
            Your browser or device does not support hardware 3D WebGL. Try viewing in Safari / Chrome
            with hardware acceleration enabled.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs text-white z-10 pointer-events-none">
          <RefreshCw className="w-8 h-8 text-rose-400 animate-spin mb-2" />
          <span className="text-xs tracking-wider uppercase font-medium text-neutral-200">
            Initialising 3D Studio...
          </span>
        </div>
      )}

      {customModelError && (
        <div className="absolute top-16 left-4 right-4 z-20 flex items-center justify-between bg-red-950/90 border border-red-500/30 text-red-200 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl">
          <span>{customModelError}</span>
          <button
            type="button"
            onClick={() => setCustomModelError(null)}
            className="text-xs underline ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Garment Preview Overlay Banner */}
      {clothing && (
        <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-auto z-10 pointer-events-none">
          <div className="bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white text-[11px] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate max-w-[160px] sm:max-w-xs font-medium">
              Garment Preview: {clothing.name}
            </span>
          </div>
        </div>
      )}

      {/* TOP FLOATING MODEL SWITCHER BADGE & DROPDOWN */}
      {showModelSwitcherOverlay && (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsModelMenuOpen((prev) => !prev)}
              aria-label="Change 3D Model"
              className="flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-white shadow-xl transition cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold tracking-wide text-[11px]">
                {getModelLabel(currentModelPreset)}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                  isModelMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Model Presets Dropdown */}
            {isModelMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 shadow-2xl text-white space-y-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Select 3D Model
                </div>

                {/* 1. Sculpted Female */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset('procedural-female')}
                  className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${
                    currentModelPreset === 'procedural-female'
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                      : 'hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <User className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>Sculpted Female</span>
                      {currentModelPreset === 'procedural-female' && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Custom female curves, bust & tape measurements
                    </p>
                  </div>
                </button>

                {/* 2. Sculpted Male */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset('procedural-male')}
                  className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${
                    currentModelPreset === 'procedural-male'
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                      : 'hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <User className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>Sculpted Male</span>
                      {currentModelPreset === 'procedural-male' && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Athletic broad shoulders, V-taper frame
                    </p>
                  </div>
                </button>

                {/* 3. Mixamo Humanoid */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset('mixamo-humanoid')}
                  className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${
                    currentModelPreset === 'mixamo-humanoid'
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                      : 'hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <Box className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>Mixamo Humanoid</span>
                      {currentModelPreset === 'mixamo-humanoid' && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Rigged skeletal armature with animations
                    </p>
                  </div>
                </button>

                {/* 4. Upload Custom .GLB */}
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsModelMenuOpen(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${
                    currentModelPreset === 'custom-glb'
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                      : 'hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <Upload className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>Upload Custom .GLB</span>
                      {currentModelPreset === 'custom-glb' && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight truncate">
                      {effectiveCustomModelName || 'Import local .glb / .gltf file'}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CUSTOM MODEL EMPTY STATE PROMPT */}
      {currentModelPreset === 'custom-glb' && !effectiveCustomModelUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/50 backdrop-blur-xs">
          <div className="p-4 rounded-3xl bg-neutral-900/90 border border-white/15 max-w-sm flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Load Custom 3D Model</h4>
              <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
                Import any standard .glb or .gltf model from Ready Player Me, Blender, or Sketchfab.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold text-xs shadow-lg hover:opacity-95 transition cursor-pointer"
            >
              Choose 3D Model File (.glb)
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM CONTROLS OVERLAY: Front / Side / Back & Rotation & Anim Player */}
      {showControlsOverlay && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto z-10">
          {/* Quick Camera Angle Views */}
          <div className="flex items-center gap-1 bg-neutral-950/85 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl">
            {(['front', 'side', 'back'] as const).map((angle) => (
              <button
                key={angle}
                type="button"
                onClick={() => setCameraView(angle)}
                aria-label={`${angle} view`}
                className={`min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize flex items-center justify-center transition cursor-pointer ${
                  currentCameraAngle === angle
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {angle}
              </button>
            ))}
          </div>

          {/* Center: Animation Selector (only for Mixamo Humanoid) */}
          {currentModelPreset === 'mixamo-humanoid' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAnimMenuOpen((v) => !v)}
                aria-label="Mixamo animation clips"
                className="flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-xs text-white shadow-xl transition cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-emerald-400" />
                <span className="capitalize text-[11px] font-medium hidden sm:inline">
                  {MIXAMO_ANIMATIONS.find((a) => a.key === currentAnimation)?.label || 'Animation'}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isAnimMenuOpen && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-1.5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-0.5 z-30">
                  <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Skeletal Animations
                  </div>
                  {MIXAMO_ANIMATIONS.map((anim) => (
                    <button
                      key={anim.key}
                      type="button"
                      onClick={() => {
                        onAnimationChange?.(anim.key);
                        setIsAnimMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                        currentAnimation === anim.key
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{anim.label}</span>
                      {currentAnimation === anim.key && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right Tools: Auto-Rotate & Reset View */}
          <div className="flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl">
            <button
              type="button"
              onClick={toggleRotation}
              aria-label={isRotating ? 'Pause 360 rotation' : 'Start 360 rotation'}
              title="360° Auto-Rotate"
              className={`min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 font-medium transition cursor-pointer ${
                isRotating
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span className="text-[11px] hidden sm:inline">360°</span>
            </button>
            <button
              type="button"
              onClick={() => setCameraView('front')}
              aria-label="Reset view position"
              title="Reset View"
              className="min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 text-xs flex items-center justify-center transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { BodyProfile } from '../lib/types.ts';

interface BodyModel3DProps {
  bodyProfile: BodyProfile;
  activeCategory?: string;
  onPoseChange?: (pose: string) => void;
}

export const BodyModel3D: React.FC<BodyModel3DProps> = ({ bodyProfile, activeCategory }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (viewMode !== '3d' || !mountRef.current) return;

    const width = mountRef.current.clientWidth || 380;
    const height = mountRef.current.clientHeight || 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    mountRef.current.replaceChildren(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xf472b6, 0.4);
    backLight.position.set(0, 3, -3);
    scene.add(backLight);

    // Floor platform
    const floorGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.08, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.04;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid ring
    const ringGeo = new THREE.RingGeometry(0.8, 0.82, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    scene.add(ring);

    // 3. Dynamic Humanoid Model Group based on BodyProfile
    const modelGroup = new THREE.Group();

    // Scale factors derived from real user body profile measurements
    const heightScale = (bodyProfile.heightCm || 170) / 170;
    const chestFactor = (bodyProfile.chestCm || 92) / 92;
    const waistFactor = (bodyProfile.waistCm || 78) / 78;
    const shoulderFactor = (bodyProfile.shoulderCm || 44) / 44;
    const bicepFactor = (bodyProfile.bicepsCm || 30) / 30;

    const skinColorHex = parseInt((bodyProfile.skinTone || '#f5c6a5').replace('#', '0x'), 16);
    const skinMat = new THREE.MeshStandardMaterial({
      color: isNaN(skinColorHex) ? 0xf5c6a5 : skinColorHex,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Clothing accent material
    const clothColor = activeCategory === 'dresses' ? 0xe11d48 : 0x4f46e5;
    const clothMat = new THREE.MeshStandardMaterial({
      color: clothColor,
      roughness: 0.7,
      metalness: 0.1,
    });

    // Torso / Chest
    const chestGeo = new THREE.CylinderGeometry(
      0.18 * shoulderFactor,
      0.16 * waistFactor,
      0.38 * heightScale,
      24
    );
    const chest = new THREE.Mesh(chestGeo, skinMat);
    chest.position.y = 1.15 * heightScale;
    chest.castShadow = true;
    modelGroup.add(chest);

    // Garment layer preview on torso
    const garmentGeo = new THREE.CylinderGeometry(
      0.19 * shoulderFactor,
      0.17 * waistFactor,
      0.39 * heightScale,
      24
    );
    const garment = new THREE.Mesh(garmentGeo, clothMat);
    garment.position.y = 1.15 * heightScale;
    modelGroup.add(garment);

    // Hips / Lower Torso
    const hipsFactor = (bodyProfile.hipsCm || 96) / 96;
    const hipsGeo = new THREE.CylinderGeometry(
      0.16 * waistFactor,
      0.19 * hipsFactor,
      0.24 * heightScale,
      24
    );
    const hips = new THREE.Mesh(hipsGeo, skinMat);
    hips.position.y = 0.88 * heightScale;
    hips.castShadow = true;
    modelGroup.add(hips);

    // Head
    const headGeo = new THREE.SphereGeometry(0.12 * heightScale, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.52 * heightScale;
    head.castShadow = true;
    modelGroup.add(head);

    // Hair
    const hairColorHex = parseInt((bodyProfile.hairColor || '#2d1d13').replace('#', '0x'), 16);
    const hairMat = new THREE.MeshStandardMaterial({
      color: isNaN(hairColorHex) ? 0x2d1d13 : hairColorHex,
      roughness: 0.9,
    });
    const hairGeo = new THREE.SphereGeometry(0.125 * heightScale, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 1.54 * heightScale;
    modelGroup.add(hair);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.1 * heightScale, 16);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 1.38 * heightScale;
    modelGroup.add(neck);

    // Arms
    const armRadius = 0.048 * bicepFactor;
    const armLength = 0.48 * heightScale;
    const armGeo = new THREE.CylinderGeometry(armRadius, armRadius * 0.85, armLength, 16);

    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.set(-0.25 * shoulderFactor, 1.12 * heightScale, 0);
    leftArm.rotation.z = 0.12;
    modelGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.set(0.25 * shoulderFactor, 1.12 * heightScale, 0);
    rightArm.rotation.z = -0.12;
    modelGroup.add(rightArm);

    // Legs
    const legRadius = 0.075 * ((bodyProfile.weightKg || 65) / 65);
    const legLength = 0.72 * heightScale;
    const legGeo = new THREE.CylinderGeometry(legRadius, legRadius * 0.7, legLength, 16);

    const leftLeg = new THREE.Mesh(legGeo, skinMat);
    leftLeg.position.set(-0.11, 0.42 * heightScale, 0);
    modelGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, skinMat);
    rightLeg.position.set(0.11, 0.42 * heightScale, 0);
    modelGroup.add(rightLeg);

    scene.add(modelGroup);

    // Mouse drag rotation support
    let isDragging = false;
    let prevMouseX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      modelGroup.rotation.y += deltaX * 0.01;
      prevMouseX = e.clientX;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      mountRef.current?.replaceChildren();
    };
  }, [bodyProfile, viewMode, isRotating, activeCategory]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center">
      {/* Top View Mode & Control Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-lg text-xs">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === '3d' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            3D Interactive
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === '2d' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            2D Silhouette
          </button>
        </div>

        {viewMode === '3d' && (
          <button
            onClick={() => setIsRotating(prev => !prev)}
            className="px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-xl border border-slate-700/60 backdrop-blur-md shadow-md transition-all flex items-center gap-1.5"
            title="Toggle rotation"
          >
            <span>{isRotating ? '⏸ Pause' : '▶ Rotate'}</span>
          </button>
        )}
      </div>

      {/* Main Viewport */}
      {viewMode === '3d' ? (
        <div ref={mountRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="w-full h-[460px] p-6 flex flex-col items-center justify-center bg-slate-900">
          <svg viewBox="0 0 200 400" className="h-full drop-shadow-2xl">
            {/* 2D Silhouette graphic */}
            <circle cx="100" cy="40" r="22" fill={bodyProfile.skinTone || '#f5c6a5'} />
            <path
              d="M80,30 Q100,12 120,30 Q100,24 80,30"
              fill={bodyProfile.hairColor || '#2d1d13'}
            />
            {/* Neck */}
            <rect x="94" y="60" width="12" height="15" fill={bodyProfile.skinTone || '#f5c6a5'} />
            {/* Torso */}
            <polygon
              points={`
                ${100 - (bodyProfile.shoulderCm / 2)},75
                ${100 + (bodyProfile.shoulderCm / 2)},75
                ${100 + (bodyProfile.waistCm / 3)},150
                ${100 + (bodyProfile.hipsCm / 2.8)},195
                ${100 - (bodyProfile.hipsCm / 2.8)},195
                ${100 - (bodyProfile.waistCm / 3)},150
              `}
              fill="#4f46e5"
              opacity="0.85"
            />
            {/* Arms */}
            <line x1={100 - (bodyProfile.shoulderCm / 2)} y1="80" x2="60" y2="175" stroke={bodyProfile.skinTone || '#f5c6a5'} strokeWidth="12" strokeLinecap="round" />
            <line x1={100 + (bodyProfile.shoulderCm / 2)} y1="80" x2="140" y2="175" stroke={bodyProfile.skinTone || '#f5c6a5'} strokeWidth="12" strokeLinecap="round" />
            {/* Legs */}
            <line x1="86" y1="195" x2="80" y2="350" stroke={bodyProfile.skinTone || '#f5c6a5'} strokeWidth="16" strokeLinecap="round" />
            <line x1="114" y1="195" x2="120" y2="350" stroke={bodyProfile.skinTone || '#f5c6a5'} strokeWidth="16" strokeLinecap="round" />
          </svg>
          <div className="text-center text-xs text-slate-400 mt-2">
            Proportional 2D Silhouette • Type: <span className="text-indigo-400 font-medium capitalize">{bodyProfile.bodyType}</span>
          </div>
        </div>
      )}

      {/* Floating Measurement Indicator Badge */}
      <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-xs flex justify-between items-center shadow-lg">
        <div className="flex gap-4">
          <span><strong className="text-white">{bodyProfile.heightCm}</strong> cm</span>
          <span><strong className="text-white">{bodyProfile.weightKg}</strong> kg</span>
          <span>Chest: <strong className="text-white">{bodyProfile.chestCm}</strong> cm</span>
          <span>Waist: <strong className="text-white">{bodyProfile.waistCm}</strong> cm</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] capitalize">{bodyProfile.bodyType} Avatar</span>
        </div>
      </div>
    </div>
  );
};

(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/HumanModel3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HumanModel3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/film.mjs [app-client] (ecmascript) <export default as Film>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.mjs [app-client] (ecmascript) <export default as Box>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const SKIN_TONES_MAP = {
    Fair: '#F6D9CA',
    'Light Warm': '#EDC4AF',
    'Medium Golden': '#D7A787',
    Olive: '#B8825D',
    'Rich Deep': '#8A5333',
    Ebony: '#422416'
};
const HAIR_COLORS_MAP = {
    'Espresso Black': '#1C1917',
    'Chocolate Brown': '#452A1E',
    'Honey Blonde': '#D4AF37',
    Platinum: '#E2E8F0',
    'Auburn Red': '#8A2C1F',
    'Silver Grey': '#94A3B8'
};
const EYE_COLORS_MAP = {
    'Dark Brown': '#2C1B14',
    Hazel: '#7B6634',
    Green: '#2D5A36',
    Blue: '#2A5288',
    Grey: '#64748B',
    Amber: '#B4782A'
};
function HumanModel3D({ bodyParams, appearanceParams, clothing = null, pose = 'apose', viewMode = 'front', autoRotate = false, onViewChange, onAutoRotateToggle, className = '', engineMode = 'auto', modelPreset, customModelUrl, customModelName, activeAnimation, onModelPresetChange, onCustomModelUpload, onAnimationChange, showControlsOverlay = true, showModelSwitcherOverlay = true }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Active preset resolution (prop overrides bodyParams)
    const currentModelPreset = modelPreset || bodyParams.modelPreset || 'procedural-female';
    const effectiveCustomModelUrl = customModelUrl || bodyParams.customModelUrl || null;
    const effectiveCustomModelName = customModelName || bodyParams.customModelName || null;
    const currentAnimation = activeAnimation || bodyParams.activeAnimation || 'none';
    // Three.js instances ref
    const instancesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentCameraAngle, setCurrentCameraAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(viewMode === 'side' ? 'side' : viewMode === 'back' ? 'back' : 'front');
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(autoRotate);
    const [webglAvailable, setWebglAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isModelMenuOpen, setIsModelMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAnimMenuOpen, setIsAnimMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customModelError, setCustomModelError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Keep rotation synced with props
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HumanModel3D.useEffect": ()=>{
            setIsRotating(autoRotate);
        }
    }["HumanModel3D.useEffect"], [
        autoRotate
    ]);
    // Sync camera view angle if viewMode prop changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HumanModel3D.useEffect": ()=>{
            if (viewMode === 'front' || viewMode === 'side' || viewMode === 'back' || viewMode === 'free') {
                setCurrentCameraAngle(viewMode);
            }
        }
    }["HumanModel3D.useEffect"], [
        viewMode
    ]);
    // --------------------------------------------------------------------------
    // PROCEDURAL MANNEQUIN BUILDER (Female & Male Anatomical Sculpting)
    // --------------------------------------------------------------------------
    const buildProceduralMannequin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HumanModel3D.useCallback[buildProceduralMannequin]": (parentGroup, params, material, currentPose, preset)=>{
            // Clear previous children
            while(parentGroup.children.length > 0){
                const child = parentGroup.children[0];
                parentGroup.remove(child);
            }
            const { heightCm, genderBlend = 20, shoulderWidth, chestWidth, waistWidth, hipWidth, armLength, armThickness, legLength, legThickness, neckLength, muscle, bodyFat } = params;
            // Normalised scale factors around 1.0
            const heightFactor = heightCm / 174;
            const sWidthFactor = 0.8 + shoulderWidth / 100 * 0.45;
            const cWidthFactor = 0.8 + chestWidth / 100 * 0.45;
            const wWidthFactor = 0.75 + waistWidth / 100 * 0.5;
            const hWidthFactor = 0.8 + hipWidth / 100 * 0.5;
            const aLenFactor = 0.85 + armLength / 100 * 0.3;
            const aThickFactor = 0.8 + armThickness / 100 * 0.4 + muscle / 100 * 0.1;
            const lLenFactor = 0.85 + legLength / 100 * 0.3;
            const lThickFactor = 0.8 + legThickness / 100 * 0.4 + bodyFat / 100 * 0.08;
            const nLenFactor = 0.85 + neckLength / 100 * 0.3;
            // Determine feminine factor based on preset + slider
            let feminineFactor = 1 - genderBlend / 100;
            if (preset === 'procedural-female' && feminineFactor < 0.55) {
                feminineFactor = 0.8;
            } else if (preset === 'procedural-male' && feminineFactor > 0.45) {
                feminineFactor = 0.15;
            }
            const baseGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            baseGroup.name = 'ProceduralMannequinMesh';
            // 1. Pelvis / Hips (wider for female silhouette)
            const pelvisW = (0.24 + feminineFactor * 0.05) * hWidthFactor;
            const pelvisH = 0.16 * heightFactor;
            const pelvisGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](pelvisW * 0.82, pelvisW, pelvisH, 24);
            const pelvisMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](pelvisGeo, material);
            pelvisMesh.position.y = 0.95 * heightFactor;
            pelvisMesh.castShadow = true;
            baseGroup.add(pelvisMesh);
            // 2. Waist / Abdomen (tapered for female, athletic for male)
            const waistW = (0.17 + (1 - feminineFactor) * 0.05) * wWidthFactor;
            const waistH = 0.15 * heightFactor;
            const waistD = (0.13 + (1 - feminineFactor) * 0.03) * wWidthFactor;
            const waistGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](waistW * 1.12, waistW, waistH, 24);
            const waistMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](waistGeo, material);
            waistMesh.position.y = 1.08 * heightFactor;
            waistMesh.scale.set(1, 1, waistD / waistW);
            waistMesh.castShadow = true;
            baseGroup.add(waistMesh);
            // 3. Ribcage / Chest / Torso
            const chestW = (0.22 + (1 - feminineFactor) * 0.07) * cWidthFactor * sWidthFactor;
            const chestH = 0.22 * heightFactor;
            const chestD = 0.16 + muscle / 100 * 0.04;
            const chestGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](chestW * 1.15, chestW * 0.95, chestH, 24);
            const chestMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](chestGeo, material);
            chestMesh.position.y = 1.25 * heightFactor;
            chestMesh.scale.set(1, 1, chestD / chestW);
            chestMesh.castShadow = true;
            baseGroup.add(chestMesh);
            // Bust curves for Female Sculpted Mannequin
            if (feminineFactor > 0.35) {
                const bustScale = (0.052 + chestWidth / 100 * 0.024) * feminineFactor;
                [
                    -0.07 * sWidthFactor,
                    0.07 * sWidthFactor
                ].forEach({
                    "HumanModel3D.useCallback[buildProceduralMannequin]": (xOffset)=>{
                        const bustGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](bustScale, 18, 14);
                        bustGeo.scale(1.0, 1.06, 1.25);
                        const bustMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](bustGeo, material);
                        bustMesh.position.set(xOffset, 1.25 * heightFactor, 0.11 * cWidthFactor + bustScale * 0.45);
                        bustMesh.rotation.x = 0.12;
                        bustMesh.castShadow = true;
                        baseGroup.add(bustMesh);
                    }
                }["HumanModel3D.useCallback[buildProceduralMannequin]"]);
            }
            // Athletic pectoral plates for Male Sculpted Mannequin
            if (feminineFactor <= 0.35) {
                [
                    -0.08 * sWidthFactor,
                    0.08 * sWidthFactor
                ].forEach({
                    "HumanModel3D.useCallback[buildProceduralMannequin]": (xOffset)=>{
                        const pecGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.10 * sWidthFactor, 0.08 * heightFactor, 0.04);
                        const pecMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](pecGeo, material);
                        pecMesh.position.set(xOffset, 1.26 * heightFactor, 0.10 * cWidthFactor);
                        pecMesh.rotation.y = xOffset > 0 ? -0.08 : 0.08;
                        pecMesh.castShadow = true;
                        baseGroup.add(pecMesh);
                    }
                }["HumanModel3D.useCallback[buildProceduralMannequin]"]);
            }
            // 4. Clavicles / Shoulder Beam
            const shoulderSpan = (0.36 + (1 - feminineFactor) * 0.08) * sWidthFactor;
            const shoulderGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.044, shoulderSpan * 0.72, 12, 16);
            const shoulderMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shoulderGeo, material);
            shoulderMesh.rotation.z = Math.PI / 2;
            shoulderMesh.position.y = 1.37 * heightFactor;
            shoulderMesh.castShadow = true;
            baseGroup.add(shoulderMesh);
            // 5. Neck
            const neckR = 0.052 + (1 - feminineFactor) * 0.015 + muscle / 100 * 0.01;
            const neckH = 0.09 * nLenFactor * heightFactor;
            const neckGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](neckR, neckR * 1.1, neckH, 16);
            const neckMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](neckGeo, material);
            neckMesh.position.y = (1.4 + neckH / 2) * heightFactor;
            neckMesh.castShadow = true;
            baseGroup.add(neckMesh);
            // 6. Head (Anatomical cranium + jawline)
            const headGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            headGroup.name = 'HeadGroup';
            headGroup.position.y = (1.42 + neckH + 0.12) * heightFactor;
            // Cranium
            const craniumGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.105, 24, 20);
            craniumGeo.scale(1, 1.18, 1.12);
            const craniumMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](craniumGeo, material);
            craniumMesh.castShadow = true;
            headGroup.add(craniumMesh);
            // Jaw/Chin (slighter square contour for male)
            const jawGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.08, 0.12, 16);
            const jawMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](jawGeo, material);
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
            [
                -1,
                1
            ].forEach({
                "HumanModel3D.useCallback[buildProceduralMannequin]": (side)=>{
                    const armGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    armGroup.position.set(side * shoulderOffset, 1.36 * heightFactor, 0);
                    // Shoulder joint
                    const sJoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](armR * 1.15, 16, 12), material);
                    armGroup.add(sJoint);
                    // Upper arm
                    const upperArmMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](armR * 0.9, armR * 1.1, upperArmLen, 16), material);
                    upperArmMesh.position.y = -upperArmLen / 2;
                    upperArmMesh.castShadow = true;
                    const upperArmContainer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    upperArmContainer.rotation.z = side === 1 ? rightArmAngle : -leftArmAngle;
                    upperArmContainer.add(upperArmMesh);
                    // Elbow joint
                    const elbowMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](armR * 0.9, 14, 10), material);
                    elbowMesh.position.y = -upperArmLen;
                    upperArmContainer.add(elbowMesh);
                    // Forearm
                    const forearmContainer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    forearmContainer.position.y = -upperArmLen;
                    forearmContainer.rotation.x = elbowBend;
                    const forearmMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](armR * 0.7, armR * 0.88, forearmLen, 16), material);
                    forearmMesh.position.y = -forearmLen / 2;
                    forearmMesh.castShadow = true;
                    forearmContainer.add(forearmMesh);
                    // Hand
                    const handMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](armR * 1.2, 0.08 * aLenFactor, armR * 0.6), material);
                    handMesh.position.set(0, -forearmLen - 0.04, 0);
                    handMesh.castShadow = true;
                    forearmContainer.add(handMesh);
                    upperArmContainer.add(forearmContainer);
                    armGroup.add(upperArmContainer);
                    baseGroup.add(armGroup);
                }
            }["HumanModel3D.useCallback[buildProceduralMannequin]"]);
            // 8. Left & Right Legs
            const hipOffset = pelvisW * 0.42;
            const thighLen = 0.42 * lLenFactor * heightFactor;
            const calfLen = 0.4 * lLenFactor * heightFactor;
            const legR = (0.072 + (1 - feminineFactor) * 0.012) * lThickFactor;
            [
                -1,
                1
            ].forEach({
                "HumanModel3D.useCallback[buildProceduralMannequin]": (side)=>{
                    const legGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    legGroup.position.set(side * hipOffset, 0.92 * heightFactor, 0);
                    // Hip joint ball
                    const hJoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](legR * 1.05, 16, 12), material);
                    legGroup.add(hJoint);
                    // Thigh
                    const thighMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](legR * 0.85, legR * 1.05, thighLen, 18), material);
                    thighMesh.position.y = -thighLen / 2;
                    thighMesh.castShadow = true;
                    legGroup.add(thighMesh);
                    // Knee joint
                    const kneeMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](legR * 0.85, 14, 10), material);
                    kneeMesh.position.y = -thighLen;
                    legGroup.add(kneeMesh);
                    // Calf / Lower Leg
                    const calfGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    calfGroup.position.y = -thighLen;
                    const calfMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](legR * 0.62, legR * 0.84, calfLen, 18), material);
                    calfMesh.position.y = -calfLen / 2;
                    calfMesh.castShadow = true;
                    calfGroup.add(calfMesh);
                    // Ankle & Foot
                    const footGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](legR * 1.1, 0.06, 0.17 * heightFactor);
                    const footMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](footGeo, material);
                    footMesh.position.set(0, -calfLen - 0.03, 0.04);
                    footMesh.castShadow = true;
                    calfGroup.add(footMesh);
                    legGroup.add(calfGroup);
                    baseGroup.add(legGroup);
                }
            }["HumanModel3D.useCallback[buildProceduralMannequin]"]);
            parentGroup.add(baseGroup);
        }
    }["HumanModel3D.useCallback[buildProceduralMannequin]"], []);
    // --------------------------------------------------------------------------
    // HAIR MESH BUILDER
    // --------------------------------------------------------------------------
    const buildHairMesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HumanModel3D.useCallback[buildHairMesh]": (hairGroup, style, material, headY)=>{
            while(hairGroup.children.length > 0){
                hairGroup.remove(hairGroup.children[0]);
            }
            hairGroup.position.y = headY;
            switch(style){
                case 'Long Wavy':
                    {
                        const crown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.12, 16, 16), material);
                        crown.scale.set(1.05, 1.1, 1.1);
                        crown.position.y = 0.02;
                        hairGroup.add(crown);
                        const back = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.11, 0.16, 0.42, 16), material);
                        back.position.set(0, -0.16, -0.06);
                        back.rotation.x = -0.15;
                        hairGroup.add(back);
                        [
                            -0.11,
                            0.11
                        ].forEach({
                            "HumanModel3D.useCallback[buildHairMesh]": (x)=>{
                                const sideWave = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapsuleGeometry"](0.04, 0.32, 8, 12), material);
                                sideWave.position.set(x, -0.14, 0.02);
                                sideWave.rotation.z = x > 0 ? 0.1 : -0.1;
                                hairGroup.add(sideWave);
                            }
                        }["HumanModel3D.useCallback[buildHairMesh]"]);
                        break;
                    }
                case 'Bob Cut':
                    {
                        const crown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.125, 16, 16), material);
                        crown.scale.set(1.08, 1.12, 1.1);
                        hairGroup.add(crown);
                        const bobSides = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.13, 0.15, 0.18, 16), material);
                        bobSides.position.set(0, -0.06, 0);
                        hairGroup.add(bobSides);
                        break;
                    }
                case 'Short Textured':
                    {
                        const crown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.118, 16, 16), material);
                        crown.scale.set(1.06, 1.18, 1.08);
                        crown.position.y = 0.02;
                        hairGroup.add(crown);
                        for(let i = 0; i < 7; i++){
                            const tuft = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.03, 0.06, 6), material);
                            tuft.position.set((Math.random() - 0.5) * 0.12, 0.11, (Math.random() - 0.5) * 0.12);
                            tuft.rotation.set((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3);
                            hairGroup.add(tuft);
                        }
                        break;
                    }
                case 'Sleek Bun':
                    {
                        const cap = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.115, 16, 16), material);
                        cap.scale.set(1.04, 1.08, 1.04);
                        hairGroup.add(cap);
                        const bun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.065, 14, 14), material);
                        bun.position.set(0, 0.12, -0.06);
                        hairGroup.add(bun);
                        break;
                    }
                case 'Curly Afro':
                    {
                        const afro = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.165, 18, 18), material);
                        afro.scale.set(1.15, 1.25, 1.18);
                        afro.position.y = 0.04;
                        hairGroup.add(afro);
                        break;
                    }
                case 'Buzz Cut':
                    {
                        const buzz = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.112, 16, 16), material);
                        buzz.scale.set(1.02, 1.06, 1.02);
                        hairGroup.add(buzz);
                        break;
                    }
            }
        }
    }["HumanModel3D.useCallback[buildHairMesh]"], []);
    // --------------------------------------------------------------------------
    // CLOTHING OVERLAY LAYER
    // --------------------------------------------------------------------------
    const buildClothingOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HumanModel3D.useCallback[buildClothingOverlay]": (clothesGroup, item, material, body)=>{
            while(clothesGroup.children.length > 0){
                clothesGroup.remove(clothesGroup.children[0]);
            }
            if (!item) return;
            const h = body.heightCm / 174;
            const cat = item.category;
            if (cat === 'Tops' || cat === 'Outerwear') {
                const shirtGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.245, 0.21, 0.38 * h, 20);
                const shirtMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shirtGeo, material);
                shirtMesh.position.y = 1.22 * h;
                shirtMesh.scale.set(1.06, 1, 1.06);
                shirtMesh.castShadow = true;
                clothesGroup.add(shirtMesh);
                [
                    -0.19,
                    0.19
                ].forEach({
                    "HumanModel3D.useCallback[buildClothingOverlay]": (side)=>{
                        const sleeve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.065, 0.055, 0.22 * h, 14), material);
                        sleeve.position.set(side * 1.05, 1.28 * h, 0);
                        sleeve.rotation.z = side > 0 ? -0.32 : 0.32;
                        clothesGroup.add(sleeve);
                    }
                }["HumanModel3D.useCallback[buildClothingOverlay]"]);
            } else if (cat === 'Bottoms') {
                const waistShell = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.21, 0.25, 0.2 * h, 20), material);
                waistShell.position.y = 0.96 * h;
                clothesGroup.add(waistShell);
                [
                    -0.09,
                    0.09
                ].forEach({
                    "HumanModel3D.useCallback[buildClothingOverlay]": (side)=>{
                        const pantLeg = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.088, 0.075, 0.72 * h, 16), material);
                        pantLeg.position.set(side, 0.5 * h, 0);
                        clothesGroup.add(pantLeg);
                    }
                }["HumanModel3D.useCallback[buildClothingOverlay]"]);
            } else if (cat === 'Dresses') {
                const dressTorso = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.23, 0.2, 0.32 * h, 20), material);
                dressTorso.position.y = 1.2 * h;
                clothesGroup.add(dressTorso);
                const dressSkirt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.38, 0.58 * h, 22), material);
                dressSkirt.position.y = 0.76 * h;
                clothesGroup.add(dressSkirt);
            } else if (cat === 'Footwear') {
                [
                    -0.09,
                    0.09
                ].forEach({
                    "HumanModel3D.useCallback[buildClothingOverlay]": (side)=>{
                        const shoe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.09, 0.07, 0.19 * h), material);
                        shoe.position.set(side, 0.04 * h, 0.04);
                        clothesGroup.add(shoe);
                    }
                }["HumanModel3D.useCallback[buildClothingOverlay]"]);
            }
        }
    }["HumanModel3D.useCallback[buildClothingOverlay]"], []);
    // --------------------------------------------------------------------------
    // INITIALISE THREE.JS ENGINE ON MOUNT
    // --------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HumanModel3D.useEffect": ()=>{
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
            } catch  {
                setWebglAvailable(false);
                setIsLoading(false);
                return;
            }
            const width = container.clientWidth || 400;
            const height = container.clientHeight || 500;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](34, width / height, 0.1, 25);
            camera.position.set(0, 0.95, 3.2);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
            renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
            renderer.toneMappingExposure = 1.1;
            canvasRef.current = renderer.domElement;
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
            const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 1.2);
            scene.add(ambientLight);
            const keyLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xfff7ed, 2.4);
            keyLight.position.set(2.2, 4.0, 2.5);
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.width = 1024;
            keyLight.shadow.mapSize.height = 1024;
            keyLight.shadow.camera.near = 0.5;
            keyLight.shadow.camera.far = 10;
            keyLight.shadow.bias = -0.0005;
            scene.add(keyLight);
            const fillLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xe0e7ff, 1.1);
            fillLight.position.set(-2.5, 2.0, -1.8);
            scene.add(fillLight);
            const rimLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 1.5);
            rimLight.position.set(0, 3.2, -3.0);
            scene.add(rimLight);
            const floorGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](1.4, 32);
            const floorMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0x0f172a,
                roughness: 0.9,
                metalness: 0.1,
                transparent: true,
                opacity: 0.35
            });
            const floorMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](floorGeo, floorMat);
            floorMesh.rotation.x = -Math.PI / 2;
            floorMesh.position.y = -0.005;
            floorMesh.receiveShadow = true;
            scene.add(floorMesh);
            const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.06;
            controls.minDistance = 1.2;
            controls.maxDistance = 4.2;
            controls.maxPolarAngle = Math.PI / 2 + 0.04;
            controls.minPolarAngle = 0.15;
            controls.target.set(0, 0.95, 0);
            controls.touches = {
                ONE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].ROTATE,
                TWO: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_PAN
            };
            const modelGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            modelGroup.name = 'MainModelContainer';
            scene.add(modelGroup);
            const proceduralGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            proceduralGroup.name = 'ProceduralGroup';
            modelGroup.add(proceduralGroup);
            const mixamoGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            mixamoGroup.name = 'MixamoGroup';
            modelGroup.add(mixamoGroup);
            const customGlbGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            customGlbGroup.name = 'CustomGLBGroup';
            modelGroup.add(customGlbGroup);
            const hairGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            hairGroup.name = 'HairGroup';
            modelGroup.add(hairGroup);
            const clothesGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            clothesGroup.name = 'ClothesGroup';
            modelGroup.add(clothesGroup);
            const clayMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0xd4d4d8,
                roughness: 0.58,
                metalness: 0.06
            });
            const skinColor = appearanceParams.displayMode === 'mannequin' ? 0xd4d4d8 : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](appearanceParams.customSkinColor || SKIN_TONES_MAP[appearanceParams.skinTone] || '#D7A787');
            const skinMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: skinColor,
                roughness: 0.65,
                metalness: 0.04
            });
            const hairColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](appearanceParams.customHairColor || HAIR_COLORS_MAP[appearanceParams.hairColour] || '#1C1917');
            const hairMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: hairColor,
                roughness: 0.52,
                metalness: 0.12
            });
            const eyeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](EYE_COLORS_MAP[appearanceParams.eyeColor] || '#2C1B14'),
                roughness: 0.2,
                metalness: 0.1
            });
            const clothesMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0x4f46e5,
                roughness: 0.7,
                metalness: 0.05
            });
            const glbBonesMap = new Map();
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
                beardGroup: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"](),
                eyesGroup: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"](),
                currentEngine: 'procedural',
                animationFrameId: null,
                isDestroyed: false,
                glbBones: glbBonesMap,
                materials: [
                    clayMaterial,
                    skinMaterial,
                    hairMaterial,
                    eyeMaterial,
                    clothesMaterial
                ],
                geometries: [
                    floorGeo
                ],
                textures: [],
                clayMaterial,
                skinMaterial,
                hairMaterial,
                eyeMaterial,
                clothesMaterial,
                mixamoMixer: null,
                mixamoClips: [],
                customMixer: null,
                customClips: [],
                loadedCustomUrl: null
            };
            instancesRef.current = instances;
            // Load Mixamo Model in background (cached)
            const gltfLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"]();
            gltfLoader.load('/models/base_human.glb', {
                "HumanModel3D.useEffect": (gltf)=>{
                    if (!instancesRef.current || instancesRef.current.isDestroyed) return;
                    const root = gltf.scene;
                    root.scale.set(0.95, 0.95, 0.95);
                    root.position.y = 0;
                    root.traverse({
                        "HumanModel3D.useEffect": (node)=>{
                            if (node.isBone) {
                                glbBonesMap.set(node.name, node);
                            }
                            if (node.isMesh) {
                                const mesh = node;
                                mesh.castShadow = true;
                                mesh.receiveShadow = true;
                                mesh.material = clayMaterial;
                            }
                        }
                    }["HumanModel3D.useEffect"]);
                    mixamoGroup.add(root);
                    instances.mixamoClips = gltf.animations || [];
                    if (instances.mixamoClips.length > 0) {
                        instances.mixamoMixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](root);
                    }
                    setIsLoading(false);
                }
            }["HumanModel3D.useEffect"], undefined, {
                "HumanModel3D.useEffect": ()=>{
                    setIsLoading(false);
                }
            }["HumanModel3D.useEffect"]);
            // Initial build of procedural mannequin
            buildProceduralMannequin(proceduralGroup, bodyParams, appearanceParams.displayMode === 'mannequin' ? clayMaterial : skinMaterial, pose, currentModelPreset);
            const headHeight = (1.42 + 0.09 + 0.12) * (bodyParams.heightCm / 174);
            buildHairMesh(hairGroup, appearanceParams.hairstyle, hairMaterial, headHeight);
            buildClothingOverlay(clothesGroup, clothing, clothesMaterial, bodyParams);
            const resizeObserver = new ResizeObserver({
                "HumanModel3D.useEffect": (entries)=>{
                    for (const entry of entries){
                        const { width: w, height: h } = entry.contentRect;
                        if (w > 0 && h > 0) {
                            camera.aspect = w / h;
                            camera.updateProjectionMatrix();
                            renderer.setSize(w, h);
                        }
                    }
                }
            }["HumanModel3D.useEffect"]);
            resizeObserver.observe(container);
            let lastTime = performance.now();
            const animate = {
                "HumanModel3D.useEffect.animate": (currentTime)=>{
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
                }
            }["HumanModel3D.useEffect.animate"];
            instances.animationFrameId = requestAnimationFrame(animate);
            return ({
                "HumanModel3D.useEffect": ()=>{
                    instances.isDestroyed = true;
                    if (instances.animationFrameId) {
                        cancelAnimationFrame(instances.animationFrameId);
                    }
                    resizeObserver.disconnect();
                    controls.dispose();
                    instances.materials.forEach({
                        "HumanModel3D.useEffect": (m)=>m.dispose()
                    }["HumanModel3D.useEffect"]);
                    instances.geometries.forEach({
                        "HumanModel3D.useEffect": (g)=>g.dispose()
                    }["HumanModel3D.useEffect"]);
                    instances.textures.forEach({
                        "HumanModel3D.useEffect": (t)=>t.dispose()
                    }["HumanModel3D.useEffect"]);
                    renderer.dispose();
                    renderer.forceContextLoss();
                    if (container && renderer.domElement) {
                        container.innerHTML = '';
                    }
                    instancesRef.current = null;
                }
            })["HumanModel3D.useEffect"];
        }
    }["HumanModel3D.useEffect"], []); // Run once on mount
    // --------------------------------------------------------------------------
    // LIVE UPDATES: Switch Model Preset & Custom Model Loading
    // --------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HumanModel3D.useEffect": ()=>{
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
                const activeMat = appearanceParams.displayMode === 'mannequin' ? inst.clayMaterial : inst.skinMaterial;
                if (appearanceParams.displayMode === 'coloured') {
                    const hex = appearanceParams.customSkinColor || SKIN_TONES_MAP[appearanceParams.skinTone] || '#D7A787';
                    inst.skinMaterial.color.set(hex);
                }
                const hairHex = appearanceParams.customHairColor || HAIR_COLORS_MAP[appearanceParams.hairColour] || '#1C1917';
                inst.hairMaterial.color.set(hairHex);
                buildProceduralMannequin(proceduralGroup, bodyParams, activeMat, pose, currentModelPreset);
                const headHeight = (1.42 + 0.09 + 0.12) * (bodyParams.heightCm / 174);
                buildHairMesh(hairGroup, appearanceParams.hairstyle, appearanceParams.displayMode === 'mannequin' ? inst.clayMaterial : inst.hairMaterial, headHeight);
                if (clothing?.colour) {
                    const colorLower = clothing.colour.toLowerCase();
                    if (colorLower.includes('black')) inst.clothesMaterial.color.set('#1e1e24');
                    else if (colorLower.includes('white') || colorLower.includes('cream')) inst.clothesMaterial.color.set('#f3f4f6');
                    else if (colorLower.includes('blue') || colorLower.includes('navy')) inst.clothesMaterial.color.set('#2563eb');
                    else if (colorLower.includes('red') || colorLower.includes('burgundy')) inst.clothesMaterial.color.set('#b91c1c');
                    else if (colorLower.includes('green') || colorLower.includes('olive')) inst.clothesMaterial.color.set('#15803d');
                    else if (colorLower.includes('camel') || colorLower.includes('beige')) inst.clothesMaterial.color.set('#d97706');
                    else inst.clothesMaterial.color.set('#4f46e5');
                }
                buildClothingOverlay(clothesGroup, clothing, inst.clothesMaterial, bodyParams);
            } else if (currentModelPreset === 'mixamo-humanoid') {
                proceduralGroup.visible = false;
                mixamoGroup.visible = true;
                customGlbGroup.visible = false;
                hairGroup.visible = false;
                clothesGroup.visible = false;
                // Bone scaling with body measurements
                if (inst.glbBones.size > 0) {
                    const hScale = bodyParams.heightCm / 174;
                    const sScale = 0.85 + bodyParams.shoulderWidth / 100 * 0.35;
                    const cScale = 0.85 + bodyParams.chestWidth / 100 * 0.35;
                    const wScale = 0.8 + bodyParams.waistWidth / 100 * 0.4;
                    const hipScale = 0.85 + bodyParams.hipWidth / 100 * 0.35;
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
                        const clip = inst.mixamoClips.find({
                            "HumanModel3D.useEffect.clip": (c)=>c.name.toLowerCase() === currentAnimation.toLowerCase()
                        }["HumanModel3D.useEffect.clip"]);
                        if (clip) {
                            inst.mixamoMixer.stopAllAction();
                            const action = inst.mixamoMixer.clipAction(clip);
                            action.reset().fadeIn(0.2).play();
                        }
                    }
                }
            } else if (currentModelPreset === 'custom-glb') {
                proceduralGroup.visible = false;
                mixamoGroup.visible = false;
                customGlbGroup.visible = true;
                hairGroup.visible = false;
                clothesGroup.visible = false;
                if (effectiveCustomModelUrl && inst.loadedCustomUrl !== effectiveCustomModelUrl) {
                    setIsLoading(true);
                    setCustomModelError(null);
                    // Remove previous custom model
                    while(customGlbGroup.children.length > 0){
                        customGlbGroup.remove(customGlbGroup.children[0]);
                    }
                    if (inst.customMixer) {
                        inst.customMixer.stopAllAction();
                        inst.customMixer = null;
                    }
                    const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"]();
                    loader.load(effectiveCustomModelUrl, {
                        "HumanModel3D.useEffect": (gltf)=>{
                            if (!instancesRef.current || instancesRef.current.isDestroyed) return;
                            const root = gltf.scene;
                            // Compute bounding box and normalize scale & center
                            const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(root);
                            const size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                            box.getSize(size);
                            const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
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
                            root.traverse({
                                "HumanModel3D.useEffect": (node)=>{
                                    if (node.isMesh) {
                                        const mesh = node;
                                        mesh.castShadow = true;
                                        mesh.receiveShadow = true;
                                        if (!bodyParams.useCustomMaterials && appearanceParams.displayMode === 'mannequin') {
                                            mesh.material = inst.clayMaterial;
                                        }
                                    }
                                }
                            }["HumanModel3D.useEffect"]);
                            customGlbGroup.add(root);
                            inst.loadedCustomUrl = effectiveCustomModelUrl;
                            inst.customClips = gltf.animations || [];
                            if (inst.customClips.length > 0) {
                                inst.customMixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](root);
                                const action = inst.customMixer.clipAction(inst.customClips[0]);
                                action.play();
                            }
                            setIsLoading(false);
                        }
                    }["HumanModel3D.useEffect"], undefined, {
                        "HumanModel3D.useEffect": (err)=>{
                            console.error('Custom GLB load error:', err);
                            setCustomModelError('Failed to load custom 3D model. Ensure it is a valid .glb or .gltf file.');
                            setIsLoading(false);
                        }
                    }["HumanModel3D.useEffect"]);
                }
            }
        }
    }["HumanModel3D.useEffect"], [
        currentModelPreset,
        effectiveCustomModelUrl,
        currentAnimation,
        bodyParams,
        appearanceParams,
        clothing,
        pose,
        buildProceduralMannequin,
        buildHairMesh,
        buildClothingOverlay
    ]);
    // --------------------------------------------------------------------------
    // CAMERA QUICK VIEWS (Front, Side, Back, Free)
    // --------------------------------------------------------------------------
    const setCameraView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HumanModel3D.useCallback[setCameraView]": (angle)=>{
            const inst = instancesRef.current;
            if (!inst) return;
            const { camera, controls, modelGroup } = inst;
            setIsRotating(false);
            onAutoRotateToggle?.(false);
            modelGroup.rotation.y = 0;
            switch(angle){
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
        }
    }["HumanModel3D.useCallback[setCameraView]"], [
        onAutoRotateToggle,
        onViewChange
    ]);
    const toggleRotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HumanModel3D.useCallback[toggleRotation]": ()=>{
            setIsRotating({
                "HumanModel3D.useCallback[toggleRotation]": (prev)=>{
                    const next = !prev;
                    onAutoRotateToggle?.(next);
                    return next;
                }
            }["HumanModel3D.useCallback[toggleRotation]"]);
        }
    }["HumanModel3D.useCallback[toggleRotation]"], [
        onAutoRotateToggle
    ]);
    // File picker handler for custom .GLB
    const handleFileSelect = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        onCustomModelUpload?.(file);
        setIsModelMenuOpen(false);
    };
    const handleSelectPreset = (preset)=>{
        if (preset === 'custom-glb' && !effectiveCustomModelUrl) {
            fileInputRef.current?.click();
        }
        onModelPresetChange?.(preset);
        setIsModelMenuOpen(false);
    };
    const getModelLabel = (preset)=>{
        switch(preset){
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden ${className}`,
        onDragOver: (e)=>e.preventDefault(),
        onDrop: (e)=>{
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
                onCustomModelUpload?.(file);
                onModelPresetChange?.('custom-glb');
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".glb,.gltf",
                onChange: handleFileSelect,
                className: "hidden",
                "aria-label": "Upload 3D model file"
            }, void 0, false, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                className: "w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
            }, void 0, false, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1189,
                columnNumber: 7
            }, this),
            !webglAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 text-white p-6 text-center z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                        className: "w-10 h-10 text-amber-400 mb-3"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-base font-semibold mb-1",
                        children: "WebGL Acceleration Unavailable"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-neutral-300 max-w-sm",
                        children: "Your browser or device does not support hardware 3D WebGL. Try viewing in Safari / Chrome with hardware acceleration enabled."
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1198,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1195,
                columnNumber: 9
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs text-white z-10 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                        className: "w-8 h-8 text-rose-400 animate-spin mb-2"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1207,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs tracking-wider uppercase font-medium text-neutral-200",
                        children: "Initialising 3D Studio..."
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1206,
                columnNumber: 9
            }, this),
            customModelError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-16 left-4 right-4 z-20 flex items-center justify-between bg-red-950/90 border border-red-500/30 text-red-200 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: customModelError
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setCustomModelError(null),
                        className: "text-xs underline ml-2 cursor-pointer",
                        children: "Dismiss"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1215,
                columnNumber: 9
            }, this),
            clothing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 left-3 right-3 sm:left-4 sm:right-auto z-10 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white text-[11px] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1231,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate max-w-[160px] sm:max-w-xs font-medium",
                            children: [
                                "Garment Preview: ",
                                clothing.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1232,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel3D.tsx",
                    lineNumber: 1230,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1229,
                columnNumber: 9
            }, this),
            showModelSwitcherOverlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setIsModelMenuOpen((prev)=>!prev),
                            "aria-label": "Change 3D Model",
                            className: "flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-white shadow-xl transition cursor-pointer active:scale-95",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-3.5 h-3.5 text-rose-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold tracking-wide text-[11px]",
                                    children: getModelLabel(currentModelPreset)
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: `w-3.5 h-3.5 text-neutral-400 transition-transform ${isModelMenuOpen ? 'rotate-180' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1253,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1243,
                            columnNumber: 13
                        }, this),
                        isModelMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 shadow-2xl text-white space-y-1 z-30 animate-in fade-in zoom-in-95 duration-150",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider",
                                    children: "Select 3D Model"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1263,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleSelectPreset('procedural-female'),
                                    className: `w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${currentModelPreset === 'procedural-female' ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40' : 'hover:bg-white/10 text-neutral-300'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "w-4 h-4 text-rose-400 mt-0.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1277,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Sculpted Female"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1280,
                                                            columnNumber: 23
                                                        }, this),
                                                        currentModelPreset === 'procedural-female' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "w-3.5 h-3.5 text-rose-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1282,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1279,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-neutral-400 leading-tight",
                                                    children: "Custom female curves, bust & tape measurements"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1285,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1278,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1268,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleSelectPreset('procedural-male'),
                                    className: `w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${currentModelPreset === 'procedural-male' ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40' : 'hover:bg-white/10 text-neutral-300'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "w-4 h-4 text-sky-400 mt-0.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1301,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Sculpted Male"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1304,
                                                            columnNumber: 23
                                                        }, this),
                                                        currentModelPreset === 'procedural-male' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "w-3.5 h-3.5 text-rose-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1306,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1303,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-neutral-400 leading-tight",
                                                    children: "Athletic broad shoulders, V-taper frame"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1302,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1292,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleSelectPreset('mixamo-humanoid'),
                                    className: `w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${currentModelPreset === 'mixamo-humanoid' ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40' : 'hover:bg-white/10 text-neutral-300'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            className: "w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Mixamo Humanoid"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1328,
                                                            columnNumber: 23
                                                        }, this),
                                                        currentModelPreset === 'mixamo-humanoid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "w-3.5 h-3.5 text-rose-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1330,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1327,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-neutral-400 leading-tight",
                                                    children: "Rigged skeletal armature with animations"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1326,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1316,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        fileInputRef.current?.click();
                                        setIsModelMenuOpen(false);
                                    },
                                    className: `w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition cursor-pointer ${currentModelPreset === 'custom-glb' ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40' : 'hover:bg-white/10 text-neutral-300'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            className: "w-4 h-4 text-amber-400 mt-0.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1352,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Upload Custom .GLB"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1355,
                                                            columnNumber: 23
                                                        }, this),
                                                        currentModelPreset === 'custom-glb' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "w-3.5 h-3.5 text-rose-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/HumanModel3D.tsx",
                                                            lineNumber: 1357,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1354,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-neutral-400 leading-tight truncate",
                                                    children: effectiveCustomModelName || 'Import local .glb / .gltf file'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1360,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1353,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1340,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1262,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel3D.tsx",
                    lineNumber: 1242,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1241,
                columnNumber: 9
            }, this),
            currentModelPreset === 'custom-glb' && !effectiveCustomModelUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/50 backdrop-blur-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-3xl bg-neutral-900/90 border border-white/15 max-w-sm flex flex-col items-center gap-3 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1376,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1375,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-bold text-white mb-1",
                                    children: "Load Custom 3D Model"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1379,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-neutral-300 mb-3 leading-relaxed",
                                    children: "Import any standard .glb or .gltf model from Ready Player Me, Blender, or Sketchfab."
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1380,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1378,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>fileInputRef.current?.click(),
                            className: "w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold text-xs shadow-lg hover:opacity-95 transition cursor-pointer",
                            children: "Choose 3D Model File (.glb)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel3D.tsx",
                            lineNumber: 1384,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel3D.tsx",
                    lineNumber: 1374,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1373,
                columnNumber: 9
            }, this),
            showControlsOverlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 bg-neutral-950/85 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl",
                        children: [
                            'front',
                            'side',
                            'back'
                        ].map((angle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCameraView(angle),
                                "aria-label": `${angle} view`,
                                className: `min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize flex items-center justify-center transition cursor-pointer ${currentCameraAngle === angle ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-300 hover:text-white hover:bg-white/10'}`,
                                children: angle
                            }, angle, false, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1401,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1399,
                        columnNumber: 11
                    }, this),
                    currentModelPreset === 'mixamo-humanoid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setIsAnimMenuOpen((v)=>!v),
                                "aria-label": "Mixamo animation clips",
                                className: "flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-xs text-white shadow-xl transition cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__["Film"], {
                                        className: "w-3.5 h-3.5 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1426,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "capitalize text-[11px] font-medium hidden sm:inline",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIXAMO_ANIMATIONS"].find((a)=>a.key === currentAnimation)?.label || 'Animation'
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1427,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "w-3 h-3 text-neutral-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1430,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1420,
                                columnNumber: 15
                            }, this),
                            isAnimMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-1.5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-0.5 z-30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider",
                                        children: "Skeletal Animations"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1435,
                                        columnNumber: 19
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIXAMO_ANIMATIONS"].map((anim)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                onAnimationChange?.(anim.key);
                                                setIsAnimMenuOpen(false);
                                            },
                                            className: `w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${currentAnimation === anim.key ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-neutral-300 hover:bg-white/10'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: anim.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1452,
                                                    columnNumber: 23
                                                }, this),
                                                currentAnimation === anim.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/HumanModel3D.tsx",
                                                    lineNumber: 1453,
                                                    columnNumber: 57
                                                }, this)
                                            ]
                                        }, anim.key, true, {
                                            fileName: "[project]/components/HumanModel3D.tsx",
                                            lineNumber: 1439,
                                            columnNumber: 21
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1434,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1419,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: toggleRotation,
                                "aria-label": isRotating ? 'Pause 360 rotation' : 'Start 360 rotation',
                                title: "360° Auto-Rotate",
                                className: `min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 font-medium transition cursor-pointer ${isRotating ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-neutral-300 hover:text-white hover:bg-white/10'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: `w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1474,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] hidden sm:inline",
                                        children: "360°"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel3D.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1463,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCameraView('front'),
                                "aria-label": "Reset view position",
                                title: "Reset View",
                                className: "min-w-[42px] min-h-[40px] px-2.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 text-xs flex items-center justify-center transition cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel3D.tsx",
                                    lineNumber: 1484,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel3D.tsx",
                                lineNumber: 1477,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel3D.tsx",
                        lineNumber: 1462,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel3D.tsx",
                lineNumber: 1397,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HumanModel3D.tsx",
        lineNumber: 1167,
        columnNumber: 5
    }, this);
}
_s(HumanModel3D, "J3VoKrr16npSNdXyu7TwjAhqNLw=");
_c = HumanModel3D;
var _c;
__turbopack_context__.k.register(_c, "HumanModel3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HumanModel3D.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/HumanModel3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_HumanModel3D_tsx_00e8spo._.js.map
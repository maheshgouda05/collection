(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/my-model/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyModelPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wardrobeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wardrobeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HumanModel2D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HumanModel2D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.mjs [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.mjs [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.mjs [app-client] (ecmascript) <export default as Palette>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const FACE_SHAPES = [
    {
        key: 'Oval',
        label: 'Oval',
        desc: 'Balanced egg-silhouette with rounded chin'
    },
    {
        key: 'Round',
        label: 'Round',
        desc: 'Equal width & height with soft curved jaw'
    },
    {
        key: 'Square',
        label: 'Square',
        desc: 'Defined angular jaw corners & flat chin'
    },
    {
        key: 'Heart',
        label: 'Heart',
        desc: 'Wide forehead tapering to pointed chin'
    },
    {
        key: 'Diamond',
        label: 'Diamond',
        desc: 'Wide high cheekbones with narrow chin'
    },
    {
        key: 'Oblong',
        label: 'Oblong',
        desc: 'Elongated vertical silhouette with straight cheeks'
    }
];
const HAIRSTYLES = [
    'None / Clean',
    'Short Textured',
    'Bob Cut',
    'Long Wavy',
    'Sleek Bun',
    'Curly Afro',
    'Buzz Cut'
];
const HAIR_COLORS = [
    {
        key: 'Espresso Black',
        hex: '#1C1917'
    },
    {
        key: 'Chocolate Brown',
        hex: '#44281D'
    },
    {
        key: 'Honey Blonde',
        hex: '#D4AF37'
    },
    {
        key: 'Platinum',
        hex: '#E2E8F0'
    },
    {
        key: 'Auburn Red',
        hex: '#882215'
    },
    {
        key: 'Silver Grey',
        hex: '#94A3B8'
    }
];
function MyModelPage() {
    _s();
    const { bodyProfile, updateBodyProfile, showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wardrobeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWardrobe"])();
    // 1. Core 6 Body Measurements (with sensible defaults)
    const [heightCm, setHeightCm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.height || 175
    }["MyModelPage.useState"]);
    const [weightKg, setWeightKg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.weight || 68
    }["MyModelPage.useState"]);
    const [chestCm, setChestCm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.chestCm || 96
    }["MyModelPage.useState"]);
    const [bicepsCm, setBicepsCm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.bicepsCm || 32
    }["MyModelPage.useState"]);
    const [wristCm, setWristCm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.wristCm || 17
    }["MyModelPage.useState"]);
    const [shouldersCm, setShouldersCm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.shouldersCm || 44
    }["MyModelPage.useState"]);
    // 2. Appearance Parameters
    const [skinTone, setSkinTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.skinTone || 'Medium Golden'
    }["MyModelPage.useState"]);
    const [customSkinColor, setCustomSkinColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.customSkinColor || ''
    }["MyModelPage.useState"]);
    const [useCustomSkin, setUseCustomSkin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>Boolean(bodyProfile.appearance?.customSkinColor)
    }["MyModelPage.useState"]);
    const [faceShape, setFaceShape] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.faceShape || 'Oval'
    }["MyModelPage.useState"]);
    const [hairstyle, setHairstyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.hairstyle || 'Short Textured'
    }["MyModelPage.useState"]);
    const [hairColour, setHairColour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.hairColour || 'Espresso Black'
    }["MyModelPage.useState"]);
    const [customHairColor, setCustomHairColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.customHairColor || ''
    }["MyModelPage.useState"]);
    const [appearanceDescription, setAppearanceDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MyModelPage.useState": ()=>bodyProfile.appearance?.appearanceDescription || ''
    }["MyModelPage.useState"]);
    // 3. UI State
    const [clothingPreview, setClothingPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [showTapeGuides, setShowTapeGuides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [focusedField, setFocusedField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveSuccess, setSaveSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Refs for input focus synchronization
    const inputsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    // Sync state if bodyProfile changes externally
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyModelPage.useEffect": ()=>{
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
        }
    }["MyModelPage.useEffect"], [
        bodyProfile
    ]);
    // Handle live measurement selection from on-canvas tape guide
    const handleSelectMeasurement = (key)=>{
        setFocusedField(key);
        const targetInput = inputsRef.current[key];
        if (targetInput) {
            targetInput.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            targetInput.focus();
        }
    };
    // Reset to default standard mannequin proportions
    const handleReset = ()=>{
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
    const handleSave = async ()=>{
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
                    appearanceDescription
                }
            });
            setSaveSuccess(true);
            showToast('2D Model and measurements saved successfully!');
            setTimeout(()=>setSaveSuccess(false), 4500);
        } catch  {
            showToast('Error saving model settings');
        } finally{
            setIsSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 text-rose-300 text-[11px] font-semibold uppercase tracking-wider mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "2D Body Model Studio"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight",
                                children: "My 2D Body Model"
                            }, void 0, false, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs sm:text-sm text-neutral-600 mt-0.5 max-w-xl font-light",
                                children: "Adjust your six core measurements and appearance. Your personalized 2D avatar updates live in real time."
                            }, void 0, false, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleReset,
                                className: "px-3.5 py-2 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs cursor-pointer min-h-[42px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Reset to Defaults"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleSave,
                                disabled: isSaving,
                                className: "px-5 py-2 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer min-h-[42px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4 text-rose-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: isSaving ? 'Saving...' : 'Save Model'
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/my-model/page.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            saveSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/my-model/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs sm:text-sm font-bold",
                                        children: "Model settings saved to your device!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-emerald-700",
                                        children: "Your 2D model proportions and appearance have been stored and will be restored upon your return."
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSaveSuccess(false),
                        className: "text-xs text-emerald-600 hover:text-emerald-900 underline font-medium cursor-pointer",
                        children: "Dismiss"
                    }, void 0, false, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/my-model/page.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden p-3 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-2 shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-4 h-4 rounded-full border border-white/30",
                                style: {
                                    backgroundColor: useCustomSkin ? customSkinColor || '#D7A787' : skinTone
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold truncate",
                                children: [
                                    heightCm,
                                    "cm • ",
                                    weightKg,
                                    "kg • Chest ",
                                    chestCm,
                                    "cm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            const previewEl = document.getElementById('avatar-preview-container');
                            if (previewEl) previewEl.scrollIntoView({
                                behavior: 'smooth'
                            });
                        },
                        className: "text-xs px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium",
                        children: "View Full Preview ↓"
                    }, void 0, false, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/my-model/page.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-6 xl:col-span-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between pb-3 border-b border-neutral-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/my-model/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-sm sm:text-base font-bold text-neutral-900",
                                                            children: "Body Measurements"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/my-model/page.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-neutral-500",
                                                            children: "All values in standard metric units (cm, kg). Updates the avatar live."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/my-model/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/my-model/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/my-model/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'height' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Height ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(cm)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 28
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.height = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 130,
                                                                        max: 220,
                                                                        value: heightCm || '',
                                                                        placeholder: "175",
                                                                        onChange: (e)=>setHeightCm(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 314,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "cm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 326,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 130,
                                                        max: 220,
                                                        value: heightCm || 175,
                                                        onChange: (e)=>setHeightCm(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "130 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 175 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "220 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'weight' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Weight ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(kg)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 28
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.weight = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 35,
                                                                        max: 150,
                                                                        value: weightKg || '',
                                                                        placeholder: "68",
                                                                        onChange: (e)=>setWeightKg(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 357,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "kg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 369,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 35,
                                                        max: 150,
                                                        value: weightKg || 68,
                                                        onChange: (e)=>setWeightKg(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "35 kg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 68 kg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 382,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "150 kg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'chest' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Chest Circumference",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(cm)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.chest = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 65,
                                                                        max: 145,
                                                                        value: chestCm || '',
                                                                        placeholder: "96",
                                                                        onChange: (e)=>setChestCm(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "cm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 65,
                                                        max: 145,
                                                        value: chestCm || 96,
                                                        onChange: (e)=>setChestCm(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "65 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 96 cm (Around widest chest)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 426,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "145 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 388,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'biceps' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Biceps Circumference",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(cm)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.biceps = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 18,
                                                                        max: 55,
                                                                        value: bicepsCm || '',
                                                                        placeholder: "32",
                                                                        onChange: (e)=>setBicepsCm(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "cm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 459,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 18,
                                                        max: 55,
                                                        value: bicepsCm || 32,
                                                        onChange: (e)=>setBicepsCm(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "18 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 471,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 32 cm (Upper arm thickness)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "55 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 475,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'wrist' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Wrist Circumference",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(cm)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.wrist = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 12,
                                                                        max: 26,
                                                                        value: wristCm || '',
                                                                        placeholder: "17",
                                                                        onChange: (e)=>setWristCm(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "cm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 12,
                                                        max: 26,
                                                        value: wristCm || 17,
                                                        onChange: (e)=>setWristCm(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "12 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 17 cm (Forearm & wrist taper)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "26 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3.5 rounded-2xl border transition-all ${focusedField === 'shoulders' ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500/20' : 'border-neutral-200 bg-neutral-50/60'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-bold text-neutral-800",
                                                                children: [
                                                                    "Shoulder-to-Shoulder Width",
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-normal text-neutral-500",
                                                                        children: "(cm)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 536,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: (el)=>{
                                                                            inputsRef.current.shoulders = el;
                                                                        },
                                                                        type: "number",
                                                                        min: 30,
                                                                        max: 62,
                                                                        value: shouldersCm || '',
                                                                        placeholder: "44",
                                                                        onChange: (e)=>setShouldersCm(Number(e.target.value) || 0),
                                                                        className: "w-16 px-2 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 text-right focus:border-rose-500 focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-neutral-500",
                                                                        children: "cm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 551,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 30,
                                                        max: 62,
                                                        value: shouldersCm || 44,
                                                        onChange: (e)=>setShouldersCm(Number(e.target.value)),
                                                        className: "w-full accent-rose-500 cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-neutral-400 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "30 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 563,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-neutral-500",
                                                                children: "Example: 44 cm (Tip of left to right shoulder)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "62 cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 567,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 526,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5 pb-3 border-b border-neutral-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/my-model/page.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 576,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-sm sm:text-base font-bold text-neutral-900",
                                                        children: "Appearance Settings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-neutral-500",
                                                        children: "Customize your skin tone, face shape, and hair styling."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 579,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 575,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-neutral-800 uppercase tracking-wider block",
                                                children: "Skin Tone Colour"
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 591,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKIN_TONE_PALETTE"].map((tone)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setSkinTone(tone.key);
                                                            setUseCustomSkin(false);
                                                        },
                                                        className: `p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${!useCustomSkin && skinTone === tone.key ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900/40' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-5 h-5 rounded-full border border-white/40 shadow-xs",
                                                                        style: {
                                                                            backgroundColor: tone.hex
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 610,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    !useCustomSkin && skinTone === tone.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3.5 h-3.5 text-rose-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold block",
                                                                        children: tone.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 619,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-[10px] ${!useCustomSkin && skinTone === tone.key ? 'text-neutral-300' : 'text-neutral-500'}`,
                                                                        children: [
                                                                            tone.undertone,
                                                                            " undertone"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 620,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 618,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, tone.key, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 594,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-neutral-900 block",
                                                                children: "Custom Skin Tone Hex"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] text-neutral-500",
                                                                children: "Use color dropper or type hex value"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 636,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "color",
                                                                value: customSkinColor || '#D7A787',
                                                                onChange: (e)=>{
                                                                    setCustomSkinColor(e.target.value);
                                                                    setUseCustomSkin(true);
                                                                },
                                                                className: "w-8 h-8 rounded-lg cursor-pointer border border-neutral-300 bg-transparent"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: customSkinColor,
                                                                placeholder: "#D7A787",
                                                                onChange: (e)=>{
                                                                    setCustomSkinColor(e.target.value);
                                                                    setUseCustomSkin(true);
                                                                },
                                                                className: "w-20 px-2 py-1 text-xs border border-neutral-300 rounded-lg font-mono uppercase bg-white text-neutral-900"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 19
                                                            }, this),
                                                            useCustomSkin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setUseCustomSkin(false),
                                                                className: "text-[11px] text-rose-600 hover:underline",
                                                                children: "Reset"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 pt-2 border-t border-neutral-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-neutral-800 uppercase tracking-wider block",
                                                children: "Face Shape Outline"
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 679,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                                children: FACE_SHAPES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setFaceShape(f.key),
                                                        className: `p-3 rounded-2xl border text-left transition-all cursor-pointer ${faceShape === f.key ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold",
                                                                        children: f.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    faceShape === f.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3.5 h-3.5 text-rose-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/my-model/page.tsx",
                                                                        lineNumber: 697,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 694,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `text-[10px] leading-snug ${faceShape === f.key ? 'text-neutral-300' : 'text-neutral-500'}`,
                                                                children: f.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, f.key, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 678,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 pt-2 border-t border-neutral-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-neutral-800 uppercase tracking-wider block",
                                                children: [
                                                    "Hairstyle & Hair Colour",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-normal text-neutral-400",
                                                        children: "(Optional)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5",
                                                children: HAIRSTYLES.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setHairstyle(h),
                                                        className: `py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition cursor-pointer truncate ${hairstyle === h ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`,
                                                        children: h
                                                    }, h, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 718,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 pt-1",
                                                children: HAIR_COLORS.map((hc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setHairColour(hc.key);
                                                            setCustomHairColor('');
                                                        },
                                                        className: `flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition cursor-pointer ${hairColour === hc.key && !customHairColor ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-3 h-3 rounded-full border border-neutral-300 shrink-0",
                                                                style: {
                                                                    backgroundColor: hc.hex
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: hc.key
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/my-model/page.tsx",
                                                                lineNumber: 755,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, hc.key, true, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 736,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 713,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 pt-2 border-t border-neutral-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-neutral-800 uppercase tracking-wider block",
                                                children: [
                                                    "Describe Your Appearance",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-normal text-neutral-400",
                                                        children: "(Optional)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/my-model/page.tsx",
                                                        lineNumber: 765,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 2,
                                                value: appearanceDescription,
                                                onChange: (e)=>setAppearanceDescription(e.target.value),
                                                placeholder: "e.g. Athletic build, high cheekbones, dark wavy hair. Saved for future AI styling features.",
                                                className: "w-full p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 767,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-neutral-400 leading-relaxed",
                                                children: "This description is saved locally to your device. It will be ready for future AI styling integrations."
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 774,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 762,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3 p-4 rounded-3xl bg-neutral-50 border border-neutral-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleReset,
                                        className: "px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black transition cursor-pointer",
                                        children: "Reset to Defaults"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 782,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSave,
                                        disabled: isSaving,
                                        className: "px-6 py-2.5 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "w-4 h-4 text-rose-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: isSaving ? 'Saving...' : 'Save Model Settings'
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 797,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 790,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 781,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "avatar-preview-container",
                        className: "lg:col-span-6 xl:col-span-6 lg:sticky lg:top-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[580px] sm:h-[640px] lg:h-[680px] w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HumanModel2D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    heightCm: heightCm,
                                    weightKg: weightKg,
                                    chestCm: chestCm,
                                    bicepsCm: bicepsCm,
                                    wristCm: wristCm,
                                    shouldersCm: shouldersCm,
                                    skinTone: skinTone,
                                    customSkinColor: useCustomSkin ? customSkinColor : undefined,
                                    faceShape: faceShape,
                                    hairstyle: hairstyle,
                                    hairColour: hairColour,
                                    customHairColor: customHairColor,
                                    clothingPreview: clothingPreview,
                                    onClothingPreviewChange: setClothingPreview,
                                    showTapeGuides: showTapeGuides,
                                    onToggleTapeGuides: ()=>setShowTapeGuides((v)=>!v),
                                    onSelectMeasurement: handleSelectMeasurement
                                }, void 0, false, {
                                    fileName: "[project]/app/my-model/page.tsx",
                                    lineNumber: 810,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 809,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                        className: "w-4 h-4 text-neutral-400 shrink-0 mt-0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 833,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-neutral-900 block",
                                                children: "Illustrative 2D Model Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 835,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] leading-relaxed text-neutral-500",
                                                children: "This preview provides an anatomically balanced visual representation of your measurements. Clothing overlays are illustrative styling layers; precise 3D fabric drape analysis will be available in future updates."
                                            }, void 0, false, {
                                                fileName: "[project]/app/my-model/page.tsx",
                                                lineNumber: 838,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/my-model/page.tsx",
                                        lineNumber: 834,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/my-model/page.tsx",
                                lineNumber: 832,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/my-model/page.tsx",
                        lineNumber: 805,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/my-model/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/my-model/page.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_s(MyModelPage, "UMl6tTWRiprThQkWhW0DVVUxZzs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wardrobeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWardrobe"]
    ];
});
_c = MyModelPage;
var _c;
__turbopack_context__.k.register(_c, "MyModelPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HumanModel2D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HumanModel2D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.mjs [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.mjs [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.mjs [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Map skin tones to realistic base, highlight, and contour shades
function getSkinColors(skinTone = 'Medium Golden', customSkinColor) {
    if (customSkinColor) {
        return {
            base: customSkinColor,
            highlight: '#FFFFFF22',
            shadow: '#00000033',
            outline: '#1F161044',
            contour: '#2D160055'
        };
    }
    const found = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKIN_TONE_PALETTE"].find((s)=>s.key === skinTone);
    if (found) {
        return {
            base: found.hex,
            highlight: found.highlightHex,
            shadow: found.shadowHex,
            outline: found.shadowHex,
            contour: found.shadowHex
        };
    }
    return {
        base: '#D7A787',
        highlight: '#E7BD9F',
        shadow: '#B8825D',
        outline: '#8D5538',
        contour: '#8D5538'
    };
}
const HAIR_COLOR_MAP = {
    'Espresso Black': '#1C1917',
    'Chocolate Brown': '#44281D',
    'Honey Blonde': '#D4AF37',
    Platinum: '#E2E8F0',
    'Auburn Red': '#882215',
    'Silver Grey': '#94A3B8'
};
// Clamping helper for safe normalization
function clamp(val, min, max) {
    if (isNaN(val)) return (min + max) / 2;
    return Math.max(min, Math.min(max, val));
}
function HumanModel2D({ heightCm = 175, weightKg = 68, chestCm = 96, bicepsCm = 32, wristCm = 17, shouldersCm = 44, skinTone = 'Medium Golden', customSkinColor, faceShape = 'Oval', hairstyle = 'Short Textured', hairColour = 'Espresso Black', customHairColor, clothingPreview: controlledClothing, onClothingPreviewChange, showTapeGuides: controlledTapeGuides, onToggleTapeGuides, onSelectMeasurement, className = '', compact = false }) {
    _s();
    const [internalClothing, setInternalClothing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [internalTapeGuides, setInternalTapeGuides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [zoomLevel, setZoomLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [activeHighlight, setActiveHighlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const activeClothing = controlledClothing !== undefined ? controlledClothing : internalClothing;
    const setClothing = (c)=>{
        if (onClothingPreviewChange) onClothingPreviewChange(c);
        else setInternalClothing(c);
    };
    const showTape = controlledTapeGuides !== undefined ? controlledTapeGuides : internalTapeGuides;
    const toggleTape = ()=>{
        if (onToggleTapeGuides) onToggleTapeGuides();
        else setInternalTapeGuides((v)=>!v);
    };
    const skin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HumanModel2D.useMemo[skin]": ()=>getSkinColors(skinTone, customSkinColor)
    }["HumanModel2D.useMemo[skin]"], [
        skinTone,
        customSkinColor
    ]);
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
    const shoulderSpan = 54 + (safeShoulders - 44) / 44 * 36;
    // 4. Chest circumference: base 96cm, scales torso width at chest level
    const safeChest = clamp(chestCm, 65, 145);
    const chestHalfWidth = 45 + (safeChest - 96) / 96 * 32 + (weightFactor > 0 ? weightFactor * 6 : 0);
    // 5. Biceps circumference: base 32cm, scales upper arm thickness
    const safeBiceps = clamp(bicepsCm, 18, 55);
    const bicepWidth = 13.5 + (safeBiceps - 32) / 32 * 12 + (weightFactor > 0 ? weightFactor * 3.5 : 0);
    // 6. Wrist circumference: base 17cm, scales wrist width and forearm taper
    const safeWrist = clamp(wristCm, 12, 26);
    const wristWidth = 7.5 + (safeWrist - 17) / 17 * 5.5;
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
    const waistHalfWidth = chestHalfWidth * 0.74 + (weightFactor > 0 ? weightFactor * 14 : weightFactor * 6);
    const hipHalfWidth = chestHalfWidth * 0.92 + (weightFactor > 0 ? weightFactor * 15 : weightFactor * 4);
    // Thigh, knee, calf widths (harmoniously scaled by weight and height)
    const thighWidth = 23 + (weightFactor > 0 ? weightFactor * 10 : weightFactor * 4);
    const kneeWidth = 15 + (weightFactor > 0 ? weightFactor * 5 : 0);
    const calfWidth = 16.5 + (weightFactor > 0 ? weightFactor * 7 : weightFactor * 3);
    const ankleWidth = wristWidth * 1.15;
    const handleMarkerClick = (key)=>{
        setActiveHighlight(key);
        if (onSelectMeasurement) onSelectMeasurement(key);
    };
    // =========================================================================
    // FACE SHAPE OUTLINE BUILDER
    // =========================================================================
    const renderFaceOutline = ()=>{
        switch(faceShape){
            case 'Round':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx} ${headCenterY - 32}
              C ${cx + 31} ${headCenterY - 32}, ${cx + 31} ${headCenterY + 14}, ${cx + 22} ${headCenterY + 28}
              C ${cx + 14} ${headCenterY + 34}, ${cx - 14} ${headCenterY + 34}, ${cx - 22} ${headCenterY + 28}
              C ${cx - 31} ${headCenterY + 14}, ${cx - 31} ${headCenterY - 32}, ${cx} ${headCenterY - 32}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 237,
                    columnNumber: 11
                }, this);
            case 'Square':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx - 25} ${headCenterY - 32}
              L ${cx + 25} ${headCenterY - 32}
              C ${cx + 29} ${headCenterY - 18}, ${cx + 29} ${headCenterY + 4}, ${cx + 27} ${headCenterY + 22}
              L ${cx + 14} ${headCenterY + 33}
              L ${cx - 14} ${headCenterY + 33}
              L ${cx - 27} ${headCenterY + 22}
              C ${cx - 29} ${headCenterY + 4}, ${cx - 29} ${headCenterY - 18}, ${cx - 25} ${headCenterY - 32}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 254,
                    columnNumber: 11
                }, this);
            case 'Heart':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx} ${headCenterY - 33}
              C ${cx + 29} ${headCenterY - 33}, ${cx + 29} ${headCenterY - 6}, ${cx + 23} ${headCenterY + 14}
              C ${cx + 15} ${headCenterY + 24}, ${cx + 7} ${headCenterY + 34}, ${cx} ${headCenterY + 35}
              C ${cx - 7} ${headCenterY + 34}, ${cx - 15} ${headCenterY + 24}, ${cx - 23} ${headCenterY + 14}
              C ${cx - 29} ${headCenterY - 6}, ${cx - 29} ${headCenterY - 33}, ${cx} ${headCenterY - 33}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 274,
                    columnNumber: 11
                }, this);
            case 'Diamond':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx} ${headCenterY - 34}
              C ${cx + 17} ${headCenterY - 28}, ${cx + 31} ${headCenterY - 4}, ${cx + 30} ${headCenterY + 7}
              C ${cx + 23} ${headCenterY + 20}, ${cx + 12} ${headCenterY + 31}, ${cx} ${headCenterY + 36}
              C ${cx - 12} ${headCenterY + 31}, ${cx - 23} ${headCenterY + 20}, ${cx - 30} ${headCenterY + 7}
              C ${cx - 31} ${headCenterY - 4}, ${cx - 17} ${headCenterY - 28}, ${cx} ${headCenterY - 34}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 292,
                    columnNumber: 11
                }, this);
            case 'Oblong':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx} ${headCenterY - 38}
              C ${cx + 23} ${headCenterY - 38}, ${cx + 23} ${headCenterY + 18}, ${cx + 18} ${headCenterY + 36}
              C ${cx + 11} ${headCenterY + 42}, ${cx - 11} ${headCenterY + 42}, ${cx - 18} ${headCenterY + 36}
              C ${cx - 23} ${headCenterY + 18}, ${cx - 23} ${headCenterY - 38}, ${cx} ${headCenterY - 38}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, this);
            case 'Oval':
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx} ${headCenterY - 34}
              C ${cx + 26} ${headCenterY - 34}, ${cx + 26} ${headCenterY + 12}, ${cx + 18} ${headCenterY + 28}
              C ${cx + 11} ${headCenterY + 35}, ${cx - 11} ${headCenterY + 35}, ${cx - 18} ${headCenterY + 28}
              C ${cx - 26} ${headCenterY + 12}, ${cx - 26} ${headCenterY - 34}, ${cx} ${headCenterY - 34}
              Z
            `,
                    fill: "url(#skinGradient)",
                    stroke: skin.shadow,
                    strokeWidth: "1.2",
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 328,
                    columnNumber: 11
                }, this);
        }
    };
    // =========================================================================
    // HAIRSTYLE BUILDER
    // =========================================================================
    const renderHairstyle = ()=>{
        if (hairstyle === 'None / Clean') return null;
        switch(hairstyle){
            case 'Long Wavy':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    filter: "url(#subtleShadow)",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `
                M ${cx - 26} ${headCenterY + 2}
                C ${cx - 32} ${headCenterY - 38}, ${cx + 32} ${headCenterY - 38}, ${cx + 26} ${headCenterY + 2}
                C ${cx + 34} ${headCenterY + 42}, ${cx + 36} ${neckBottomY + 44}, ${cx + 26} ${neckBottomY + 85}
                C ${cx + 17} ${neckBottomY + 80}, ${cx + 22} ${neckBottomY + 40}, ${cx + 16} ${headCenterY + 10}
                C ${cx + 8} ${headCenterY - 24}, ${cx - 8} ${headCenterY - 24}, ${cx - 16} ${headCenterY + 10}
                C ${cx - 22} ${neckBottomY + 40}, ${cx - 17} ${neckBottomY + 80}, ${cx - 26} ${neckBottomY + 85}
                C ${cx - 36} ${neckBottomY + 44}, ${cx - 34} ${headCenterY + 42}, ${cx - 26} ${headCenterY + 2}
                Z
              `,
                            fill: hairFill
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${cx - 14} ${headCenterY - 26} Q ${cx} ${headCenterY - 30} ${cx + 14} ${headCenterY - 26}`,
                            stroke: "rgba(255,255,255,0.22)",
                            strokeWidth: "2.5",
                            fill: "none",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 354,
                    columnNumber: 11
                }, this);
            case 'Bob Cut':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx - 27} ${headCenterY + 14}
              C ${cx - 31} ${headCenterY - 36}, ${cx + 31} ${headCenterY - 36}, ${cx + 27} ${headCenterY + 14}
              C ${cx + 26} ${neckBottomY - 2}, ${cx + 18} ${neckBottomY + 8}, ${cx + 14} ${neckBottomY + 6}
              C ${cx + 20} ${headCenterY + 12}, ${cx + 10} ${headCenterY - 20}, ${cx} ${headCenterY - 22}
              C ${cx - 10} ${headCenterY - 20}, ${cx - 20} ${headCenterY + 12}, ${cx - 14} ${neckBottomY + 6}
              C ${cx - 18} ${neckBottomY + 8}, ${cx - 26} ${neckBottomY - 2}, ${cx - 27} ${headCenterY + 14}
              Z
            `,
                    fill: hairFill,
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 381,
                    columnNumber: 11
                }, this);
            case 'Sleek Bun':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    filter: "url(#subtleShadow)",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: cx,
                            cy: headCenterY - 38,
                            r: 14,
                            fill: hairFill
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 399,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `
                M ${cx - 24} ${headCenterY}
                C ${cx - 26} ${headCenterY - 32}, ${cx + 26} ${headCenterY - 32}, ${cx + 24} ${headCenterY}
                C ${cx + 8} ${headCenterY - 20}, ${cx - 8} ${headCenterY - 20}, ${cx - 24} ${headCenterY}
                Z
              `,
                            fill: hairFill
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 400,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 398,
                    columnNumber: 11
                }, this);
            case 'Curly Afro':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    filter: "url(#subtleShadow)",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: cx,
                            cy: headCenterY - 6,
                            r: 39,
                            fill: hairFill
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 415,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: cx,
                            cy: headCenterY + 4,
                            r: 28,
                            fill: "url(#skinGradient)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 414,
                    columnNumber: 11
                }, this);
            case 'Buzz Cut':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx - 25} ${headCenterY - 14}
              C ${cx - 27} ${headCenterY - 36}, ${cx + 27} ${headCenterY - 36}, ${cx + 25} ${headCenterY - 14}
              Z
            `,
                    fill: hairFill,
                    opacity: "0.85"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 423,
                    columnNumber: 11
                }, this);
            case 'Short Textured':
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `
              M ${cx - 25} ${headCenterY - 4}
              C ${cx - 28} ${headCenterY - 36}, ${cx + 28} ${headCenterY - 36}, ${cx + 25} ${headCenterY - 4}
              C ${cx + 22} ${headCenterY - 12}, ${cx + 12} ${headCenterY - 22}, ${cx} ${headCenterY - 24}
              C ${cx - 12} ${headCenterY - 22}, ${cx - 22} ${headCenterY - 12}, ${cx - 25} ${headCenterY - 4}
              Z
            `,
                    fill: hairFill,
                    filter: "url(#subtleShadow)"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 437,
                    columnNumber: 11
                }, this);
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
    const renderClothingLayer = ()=>{
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                id: "clothing-overlay",
                filter: "url(#garmentShadow)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: pantsPath,
                        fill: "#334155",
                        stroke: "rgba(255,255,255,0.2)",
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 594,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: topPath,
                        fill: "#E11D48",
                        stroke: "rgba(255,255,255,0.3)",
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 601,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel2D.tsx",
                lineNumber: 592,
                columnNumber: 9
            }, this);
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                id: "clothing-overlay",
                filter: "url(#garmentShadow)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: dressPath,
                    fill: "#4F46E5",
                    fillOpacity: "0.95",
                    stroke: "rgba(255,255,255,0.3)",
                    strokeWidth: "1.2"
                }, void 0, false, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 633,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/HumanModel2D.tsx",
                lineNumber: 632,
                columnNumber: 9
            }, this);
        }
        return null;
    };
    // =========================================================================
    // INTERACTIVE MEASUREMENT MARKERS / TAPE GUIDES
    // =========================================================================
    const renderMeasurementGuides = ()=>{
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
                badgeY: shoulderY - 12
            },
            {
                key: 'chest',
                label: 'Chest',
                val: `${chestCm} cm`,
                x1: lChestX,
                x2: rChestX,
                y: chestY,
                badgeX: rChestX + 16,
                badgeY: chestY - 12
            },
            {
                key: 'biceps',
                label: 'Biceps',
                val: `${bicepsCm} cm`,
                x1: lElbowX - bicepWidth,
                x2: lElbowX + bicepWidth * 0.5,
                y: (shoulderY + elbowY) / 2,
                badgeX: lElbowX - bicepWidth - 76,
                badgeY: (shoulderY + elbowY) / 2 - 12
            },
            {
                key: 'wrist',
                label: 'Wrist',
                val: `${wristCm} cm`,
                x1: lWristX - wristWidth,
                x2: lWristX + wristWidth,
                y: wristY,
                badgeX: lWristX - wristWidth - 76,
                badgeY: wristY - 12
            }
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            className: "transition-all duration-200",
            children: [
                markers.map((m)=>{
                    const isHighlighted = activeHighlight === m.key;
                    const stroke = isHighlighted ? '#F43F5E' : '#EC4899';
                    const fillBg = isHighlighted ? '#881337' : '#1E1B4B';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        className: "cursor-pointer group",
                        onClick: ()=>handleMarkerClick(m.key),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: m.x1,
                                y1: m.y,
                                x2: m.x2,
                                y2: m.y,
                                stroke: stroke,
                                strokeWidth: "1.8",
                                strokeDasharray: "4,4",
                                opacity: "0.85"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 710,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: m.x1,
                                cy: m.y,
                                r: 3,
                                fill: stroke
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 720,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: m.x2,
                                cy: m.y,
                                r: 3,
                                fill: stroke
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 721,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: m.badgeX > m.x1 ? m.x2 : m.x1,
                                y1: m.y,
                                x2: m.badgeX > m.x1 ? m.badgeX : m.badgeX + 66,
                                y2: m.y,
                                stroke: stroke,
                                strokeWidth: "1.2",
                                strokeDasharray: "2,2",
                                opacity: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 724,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: `translate(${m.badgeX}, ${m.badgeY})`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        width: "68",
                                        height: "24",
                                        rx: "12",
                                        fill: fillBg,
                                        stroke: stroke,
                                        strokeWidth: "1.4",
                                        className: "group-hover:fill-rose-900 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 737,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "34",
                                        y: "11",
                                        textAnchor: "middle",
                                        fill: "#FDF2F8",
                                        fontSize: "8.5",
                                        fontWeight: "700",
                                        letterSpacing: "0.3",
                                        children: m.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 746,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "34",
                                        y: "20",
                                        textAnchor: "middle",
                                        fill: "#F472B6",
                                        fontSize: "8",
                                        fontWeight: "600",
                                        children: m.val
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 757,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 736,
                                columnNumber: 15
                            }, this)
                        ]
                    }, m.key, true, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 704,
                        columnNumber: 13
                    }, this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(24, 50)",
                    className: "cursor-pointer group",
                    onClick: ()=>handleMarkerClick('height'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: feetY - 50,
                            stroke: "#94A3B8",
                            strokeWidth: "1.6",
                            strokeDasharray: "4,4",
                            opacity: "0.75"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 778,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "-5",
                            y1: "0",
                            x2: "5",
                            y2: "0",
                            stroke: "#94A3B8",
                            strokeWidth: "2"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 788,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "-5",
                            y1: feetY - 50,
                            x2: "5",
                            y2: feetY - 50,
                            stroke: "#94A3B8",
                            strokeWidth: "2"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 789,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            transform: `translate(10, ${(feetY - 50) / 2 - 12})`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "64",
                                    height: "24",
                                    rx: "12",
                                    fill: "#0F172A",
                                    stroke: "#64748B",
                                    strokeWidth: "1.2"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 798,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "32",
                                    y: "11",
                                    textAnchor: "middle",
                                    fill: "#E2E8F0",
                                    fontSize: "8.5",
                                    fontWeight: "700",
                                    children: "Height"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 806,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "32",
                                    y: "20",
                                    textAnchor: "middle",
                                    fill: "#38BDF8",
                                    fontSize: "8",
                                    fontWeight: "600",
                                    children: [
                                        heightCm,
                                        " cm"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 816,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 797,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 773,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/HumanModel2D.tsx",
            lineNumber: 697,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex flex-col items-center justify-center w-full h-full select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#090D16] via-[#0E1526] to-[#121B2F] border border-neutral-800 shadow-2xl ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: toggleTape,
                                title: "Toggle Tape Measurement Guide Callouts",
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold backdrop-blur-md border transition-all ${showTape ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm' : 'bg-neutral-900/80 border-neutral-700/60 text-neutral-400 hover:text-white'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 850,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tape Guides"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 851,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 840,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 p-1 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700/60 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setClothing('none'),
                                        className: `px-2.5 py-1 rounded-xl font-medium transition ${activeClothing === 'none' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`,
                                        children: "Body Only"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 856,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setClothing('casual'),
                                        className: `px-2.5 py-1 rounded-xl font-medium transition ${activeClothing === 'casual' ? 'bg-neutral-800 text-rose-300 font-semibold' : 'text-neutral-400 hover:text-white'}`,
                                        children: "Outfit"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 867,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setClothing('dress'),
                                        className: `px-2.5 py-1 rounded-xl font-medium transition ${activeClothing === 'dress' ? 'bg-neutral-800 text-indigo-300 font-semibold' : 'text-neutral-400 hover:text-white'}`,
                                        children: "Dress"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 878,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 839,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 p-1 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setZoomLevel((z)=>Math.min(1.35, z + 0.1)),
                                title: "Zoom In",
                                className: "p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 900,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 894,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setZoomLevel((z)=>Math.max(0.75, z - 0.1)),
                                title: "Zoom Out",
                                className: "p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 908,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 902,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setZoomLevel(1),
                                title: "Reset Zoom",
                                className: "p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 916,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 910,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 893,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel2D.tsx",
                lineNumber: 837,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex items-center justify-center p-2 sm:p-5 overflow-hidden transition-transform duration-200",
                style: {
                    transform: `scale(${zoomLevel})`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 460 760",
                    className: "w-full h-full max-h-[720px] drop-shadow-2xl",
                    preserveAspectRatio: "xMidYMid meet",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "skinGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: skin.highlight
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel2D.tsx",
                                            lineNumber: 935,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: skin.base
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel2D.tsx",
                                            lineNumber: 936,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: skin.shadow
                                        }, void 0, false, {
                                            fileName: "[project]/components/HumanModel2D.tsx",
                                            lineNumber: 937,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 934,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "subtleShadow",
                                    x: "-15%",
                                    y: "-15%",
                                    width: "130%",
                                    height: "130%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                        dx: "0",
                                        dy: "4",
                                        stdDeviation: "6",
                                        floodColor: "rgba(0,0,0,0.38)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 942,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 941,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "garmentShadow",
                                    x: "-15%",
                                    y: "-15%",
                                    width: "130%",
                                    height: "130%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                        dx: "0",
                                        dy: "6",
                                        stdDeviation: "8",
                                        floodColor: "rgba(0,0,0,0.45)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HumanModel2D.tsx",
                                        lineNumber: 952,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 951,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 932,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: cx,
                            cy: feetY + 12,
                            rx: hipHalfWidth * 0.95,
                            ry: 14,
                            fill: "rgba(0,0,0,0.22)",
                            filter: "blur(8px)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 962,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: leftArmPath,
                            fill: "url(#skinGradient)",
                            stroke: skin.shadow,
                            strokeWidth: "0.8",
                            filter: "url(#subtleShadow)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 973,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: rightArmPath,
                            fill: "url(#skinGradient)",
                            stroke: skin.shadow,
                            strokeWidth: "0.8",
                            filter: "url(#subtleShadow)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 980,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: leftLegPath,
                            fill: "url(#skinGradient)",
                            stroke: skin.shadow,
                            strokeWidth: "0.8",
                            filter: "url(#subtleShadow)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 989,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: rightLegPath,
                            fill: "url(#skinGradient)",
                            stroke: skin.shadow,
                            strokeWidth: "0.8",
                            filter: "url(#subtleShadow)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 996,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: torsoPath,
                            fill: "url(#skinGradient)",
                            stroke: skin.shadow,
                            strokeWidth: "0.8",
                            filter: "url(#subtleShadow)"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1005,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${cx - neckWidth - 4} ${neckBottomY + 4} Q ${cx - shoulderSpan * 0.45} ${neckBottomY + 6} ${lShoulderX + 12} ${shoulderY + 6}`,
                            stroke: skin.shadow,
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            fill: "none",
                            opacity: "0.6"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1015,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${cx + neckWidth + 4} ${neckBottomY + 4} Q ${cx + shoulderSpan * 0.45} ${neckBottomY + 6} ${rShoulderX - 12} ${shoulderY + 6}`,
                            stroke: skin.shadow,
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            fill: "none",
                            opacity: "0.6"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1023,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${cx - chestHalfWidth * 0.85} ${chestY + 2} Q ${cx} ${chestY + 12} ${cx + chestHalfWidth * 0.85} ${chestY + 2}`,
                            stroke: skin.shadow,
                            strokeWidth: "1.2",
                            fill: "none",
                            opacity: "0.45"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1033,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: cx,
                            y1: chestY + 18,
                            x2: cx,
                            y2: waistY + 16,
                            stroke: skin.shadow,
                            strokeWidth: "1.3",
                            strokeLinecap: "round",
                            opacity: "0.38"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1042,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: cx,
                            cy: waistY + 24,
                            rx: 2,
                            ry: 3.2,
                            fill: skin.shadow,
                            opacity: "0.65"
                        }, void 0, false, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1052,
                            columnNumber: 11
                        }, this),
                        renderFaceOutline(),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            opacity: "0.68",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M ${cx - 15} ${headCenterY - 6} Q ${cx - 9} ${headCenterY - 10} ${cx - 3} ${headCenterY - 6}`,
                                    stroke: skin.shadow,
                                    strokeWidth: "1.5",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1067,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M ${cx + 3} ${headCenterY - 6} Q ${cx + 9} ${headCenterY - 10} ${cx + 15} ${headCenterY - 6}`,
                                    stroke: skin.shadow,
                                    strokeWidth: "1.5",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1073,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                    cx: cx - 9,
                                    cy: headCenterY - 2,
                                    rx: 3,
                                    ry: 1.7,
                                    fill: skin.shadow
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1080,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                    cx: cx + 9,
                                    cy: headCenterY - 2,
                                    rx: 3,
                                    ry: 1.7,
                                    fill: skin.shadow
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1081,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M ${cx} ${headCenterY - 2} L ${cx} ${headCenterY + 8} Q ${cx + 2.5} ${headCenterY + 10} ${cx} ${headCenterY + 10}`,
                                    stroke: skin.shadow,
                                    strokeWidth: "1.2",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1083,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M ${cx - 6} ${headCenterY + 17} Q ${cx} ${headCenterY + 15.5} ${cx + 6} ${headCenterY + 17} Q ${cx} ${headCenterY + 20} ${cx - 6} ${headCenterY + 17}`,
                                    fill: skin.shadow,
                                    opacity: "0.65"
                                }, void 0, false, {
                                    fileName: "[project]/components/HumanModel2D.tsx",
                                    lineNumber: 1090,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HumanModel2D.tsx",
                            lineNumber: 1065,
                            columnNumber: 11
                        }, this),
                        renderHairstyle(),
                        renderClothingLayer(),
                        renderMeasurementGuides()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HumanModel2D.tsx",
                    lineNumber: 926,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/HumanModel2D.tsx",
                lineNumber: 922,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 shadow-xl text-neutral-300 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-white",
                                children: [
                                    heightCm,
                                    " cm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neutral-500",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    weightKg,
                                    " kg"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neutral-500",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Chest ",
                                    chestCm,
                                    " cm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neutral-500",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Biceps ",
                                    bicepsCm,
                                    " cm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 1110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 shadow-xl text-xs text-neutral-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs",
                                style: {
                                    backgroundColor: skin.base
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-white",
                                children: faceShape
                            }, void 0, false, {
                                fileName: "[project]/components/HumanModel2D.tsx",
                                lineNumber: 1127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HumanModel2D.tsx",
                        lineNumber: 1122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HumanModel2D.tsx",
                lineNumber: 1109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HumanModel2D.tsx",
        lineNumber: 833,
        columnNumber: 5
    }, this);
}
_s(HumanModel2D, "bW9oLN+8sWZMEcbxVpPgt5pNBNU=");
_c = HumanModel2D;
var _c;
__turbopack_context__.k.register(_c, "HumanModel2D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIXAMO_ANIMATIONS",
    ()=>MIXAMO_ANIMATIONS,
    "SKIN_TONE_PALETTE",
    ()=>SKIN_TONE_PALETTE
]);
const MIXAMO_ANIMATIONS = [
    {
        key: 'none',
        label: 'Default Pose'
    },
    {
        key: 'idle',
        label: 'Idle Breathing'
    },
    {
        key: 'walk',
        label: 'Casual Walk'
    },
    {
        key: 'agree',
        label: 'Nod / Agree'
    },
    {
        key: 'headShake',
        label: 'Head Shake'
    },
    {
        key: 'sad_pose',
        label: 'Sad Pose'
    },
    {
        key: 'sneak_pose',
        label: 'Sneak Pose'
    }
];
const SKIN_TONE_PALETTE = [
    {
        key: 'Fair',
        label: 'Fair Porcelain',
        hex: '#F9E5DC',
        shadowHex: '#E8C5B5',
        highlightHex: '#FFF2EC',
        undertone: 'Cool',
        description: 'Ivory alabaster with delicate rosy undertones'
    },
    {
        key: 'Light Warm',
        label: 'Light Warm Beige',
        hex: '#F2D0BE',
        shadowHex: '#DDB298',
        highlightHex: '#FAE2D4',
        undertone: 'Warm',
        description: 'Soft peach-beige with golden undertones'
    },
    {
        key: 'Medium Golden',
        label: 'Medium Golden Honey',
        hex: '#D7A787',
        shadowHex: '#B8825D',
        highlightHex: '#E7BD9F',
        undertone: 'Warm',
        description: 'Sun-kissed bronze with rich honey glow'
    },
    {
        key: 'Olive',
        label: 'Olive Caramel',
        hex: '#BF8C64',
        shadowHex: '#9D6E46',
        highlightHex: '#CFA079',
        undertone: 'Neutral',
        description: 'Mediterranean olive with warm amber depth'
    },
    {
        key: 'Rich Deep',
        label: 'Rich Deep Chestnut',
        hex: '#8A5333',
        shadowHex: '#6B381B',
        highlightHex: '#A26543',
        undertone: 'Warm',
        description: 'Velvety espresso-chestnut with copper sheen'
    },
    {
        key: 'Ebony',
        label: 'Deep Obsidian Ebony',
        hex: '#4A2A1A',
        shadowHex: '#31190E',
        highlightHex: '#5F3824',
        undertone: 'Cool',
        description: 'Deep onyx-ebony with obsidian luminosity'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0a-hm2j._.js.map
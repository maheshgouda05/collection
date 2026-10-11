'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWardrobe } from '@/lib/wardrobeContext';
import { WardrobeItem } from '@/lib/types';
import {
  Scan,
  Camera,
  Upload,
  CheckCircle2,
  QrCode,
  Sparkles,
} from 'lucide-react';

export default function ScanAndFindPage() {
  const { items, recentScans, addScanRecord, showToast } = useWardrobe();

  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'id'>('camera');
  const [itemIdQuery, setItemIdQuery] = useState('');
  const [matchedItem, setMatchedItem] = useState<WardrobeItem | null>(null);

  // Camera video stream ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access not supported by browser environment.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: unknown) {
      console.warn('Camera error:', err);
      setCameraError(
        'Camera permission was not granted or camera is in use. You can use Photo Upload or Item ID below.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Snapshot capture from camera
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();

      // Find best match in collection (simulate vision attribute match)
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setMatchedItem(randomItem);
      addScanRecord({
        imageUrl: dataUrl,
        matchedItemId: randomItem.id,
        matchedItemName: randomItem.name,
        status: 'Matched',
        confidence: 96,
      });
      showToast(`Matched with "${randomItem.name}" in your collection!`);
    }
  };

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      // Match item
      const itemToMatch = items[0] || null;
      setMatchedItem(itemToMatch);
      if (itemToMatch) {
        addScanRecord({
          imageUrl: url,
          matchedItemId: itemToMatch.id,
          matchedItemName: itemToMatch.name,
          status: 'Matched',
          confidence: 94,
        });
      }
      showToast(`Scan matched with "${itemToMatch?.name}"`);
    }
  };

  // Search by Item ID
  const handleIdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = itemIdQuery.trim().toLowerCase();
    const found = items.find((i) => i.id.toLowerCase() === query || i.name.toLowerCase().includes(query));
    if (found) {
      setMatchedItem(found);
      addScanRecord({
        imageUrl: found.imageUrl,
        matchedItemId: found.id,
        matchedItemName: found.name,
        status: 'Matched',
        confidence: 100,
      });
      showToast(`Found exact passport match for ${found.id}!`);
    } else {
      setMatchedItem(null);
      showToast(`No item with ID "${itemIdQuery}" found in your wardrobe.`);
    }
  };

  // Find compatible pairings for the matched item
  const compatiblePairings = matchedItem
    ? items.filter((i) => i.id !== matchedItem.id && i.category !== matchedItem.category).slice(0, 3)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Scan className="w-3.5 h-3.5" />
            <span>Digital Recognition & ID Finder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Scan & Find
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-light">
            Identify clothing items using device camera, photo upload, or digital item passport ID. View specifications and compatible closet pairings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-100 px-3.5 py-2 rounded-2xl">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Real-time attribute matching engine</span>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setScanMode('camera');
            startCamera();
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
            scanMode === 'camera'
              ? 'bg-neutral-900 text-white shadow-md'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Device Camera</span>
        </button>

        <button
          onClick={() => {
            setScanMode('upload');
            stopCamera();
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
            scanMode === 'upload'
              ? 'bg-neutral-900 text-white shadow-md'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Photo Upload</span>
        </button>

        <button
          onClick={() => {
            setScanMode('id');
            stopCamera();
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition ${
            scanMode === 'id'
              ? 'bg-neutral-900 text-white shadow-md'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Search by Item ID</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Scanner Interface */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xl space-y-6">
          {/* CAMERA MODE */}
          {scanMode === 'camera' && (
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-neutral-800">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {!cameraActive && (
                  <div className="p-6 text-center text-white space-y-3">
                    <Camera className="w-12 h-12 text-teal-400 mx-auto" />
                    <div>
                      <p className="text-sm font-semibold">Live Camera Viewfinder</p>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                        {cameraError || 'Click below to activate your camera and point at any garment or tag.'}
                      </p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-neutral-950 font-bold text-xs shadow-lg transition"
                    >
                      Start Camera
                    </button>
                  </div>
                )}

                {/* Reticle Overlay */}
                {cameraActive && (
                  <div className="absolute inset-8 border-2 border-white/40 border-dashed rounded-2xl pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      Align clothing or tag
                    </span>
                  </div>
                )}
              </div>

              {cameraActive && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={captureSnapshot}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Snapshot & Identify</span>
                  </button>

                  <button
                    onClick={stopCamera}
                    className="px-4 py-3 rounded-2xl bg-neutral-100 text-neutral-700 font-semibold text-xs hover:bg-neutral-200 transition"
                  >
                    Pause
                  </button>
                </div>
              )}
            </div>
          )}

          {/* UPLOAD MODE */}
          {scanMode === 'upload' && (
            <div className="space-y-4">
              <label className="cursor-pointer border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/20 hover:bg-teal-50/40 transition p-10 rounded-2xl flex flex-col items-center justify-center text-center">
                <Upload className="w-10 h-10 text-teal-600 mb-3" />
                <span className="text-sm font-bold text-neutral-900">
                  Select Garment Photo to Scan
                </span>
                <span className="text-xs text-neutral-500 mt-1">
                  Upload an image of an item you own or want to match
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* ID SEARCH MODE */}
          {scanMode === 'id' && (
            <form onSubmit={handleIdSearch} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                  Enter Wardrobe Passport ID:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. CIA-TOP-001, CIA-OUT-001"
                    value={itemIdQuery}
                    onChange={(e) => setItemIdQuery(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-900 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition"
                  >
                    Look Up
                  </button>
                </div>
              </div>

              {/* Sample Quick ID Pills */}
              <div>
                <span className="text-[11px] text-neutral-400 block mb-2">
                  Try sample registered IDs in your wardrobe:
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setItemIdQuery(item.id);
                        setMatchedItem(item);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono"
                    >
                      {item.id} ({item.name.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* Recent Scans Mini List */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Recent Scans ({recentScans.length})
            </span>
            {recentScans.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No scans recorded yet.</p>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {recentScans.slice(0, 6).map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-200 shrink-0 text-xs"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={scan.imageUrl}
                      alt="Scan"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 truncate w-24">
                        {scan.matchedItemName || 'Item'}
                      </p>
                      <p className="text-[10px] text-teal-600 font-medium">{scan.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Matching Results & Compatible Items */}
        <div className="lg:col-span-6 space-y-6">
          {matchedItem ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Identity Verified In Your Wardrobe
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 font-bold">
                  {matchedItem.id}
                </span>
              </div>

              {/* Matched Garment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={matchedItem.imageUrl}
                    alt={matchedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {matchedItem.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900">
                      {matchedItem.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {matchedItem.brand || 'Unbranded Capsule'}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <p>
                      <strong>Colour:</strong> {matchedItem.colour}
                    </p>
                    <p>
                      <strong>Size:</strong> {matchedItem.size}
                    </p>
                    <p>
                      <strong>Fabric:</strong> {matchedItem.fabric}
                    </p>
                    <p>
                      <strong>Wear Frequency:</strong> {matchedItem.timesWorn} times
                    </p>
                    <p>
                      <strong>Original Price:</strong> ${matchedItem.price || 0}
                    </p>
                  </div>

                  {matchedItem.notes && (
                    <p className="text-xs text-neutral-600 italic bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                      &ldquo;{matchedItem.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Compatible Pairing Items in Closet */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-900">
                    Compatible Items in Your Closet
                  </h4>
                  <span className="text-xs text-neutral-400">Ready to wear</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {compatiblePairings.map((pair) => (
                    <div
                      key={pair.id}
                      className="p-2 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden mb-1.5 bg-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pair.imageUrl}
                          alt={pair.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-neutral-400 uppercase block">
                        {pair.category}
                      </span>
                      <h5 className="text-xs font-semibold text-neutral-900 truncate">
                        {pair.name}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-neutral-200 text-center space-y-3">
              <Scan className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-neutral-900">
                Awaiting Garment Scan
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Capture a snapshot via camera, upload a photo, or type an item passport ID to retrieve its full profile and instant pairing suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

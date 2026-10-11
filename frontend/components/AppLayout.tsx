'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import {
  Sparkles,
  ShoppingBag,
  Layers,
  Shirt,
  Compass,
  Scan,
  CloudSun,
  User,
  Search,
  Bell,
  Plus,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  LogOut,
  Bot,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    items,
    savedOutfits,
    userProfile,
    activeToast,
    authSession,
    logout,
    login,
  } = useWardrobe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus when route changes (React 19 pattern)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setNotificationsOpen(false);
  }

  // Click outside to close search dropdown & notifications
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white">
        {children}
        {activeToast && <Toast message={activeToast} />}
      </div>
    );
  }

  // UI-level route guard.
  // Note: Real security requires backend authentication with verified session tokens and secure HttpOnly cookies.
  if (!authSession.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative z-10 backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-white">
              Authentication Required
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Please sign in to access your digital wardrobe, custom body model, and styling match engine.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>Sign In to Your Wardrobe</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => login('elena@collectionitall.com', 'demo', true)}
              className="w-full py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition cursor-pointer"
            >
              Continue with 1-Click Demo Session
            </button>
          </div>

          <p className="text-[10px] text-neutral-500">
            🔒 Note: Authentication is simulated for frontend demonstration.
          </p>
        </div>

        {activeToast && <Toast message={activeToast} />}
      </div>
    );
  }

  // Filter items for quick search dropdown
  const filteredSearchResults = searchQuery.trim()
    ? items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.colour.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
            item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const navLinks = [
    {
      href: '/home',
      label: 'Home',
      icon: Shirt,
      badge: null,
      color: 'hover:text-violet-400',
      activeGradient: 'from-violet-600 to-indigo-600',
    },
    {
      href: '/collection',
      label: 'My Collection',
      icon: Layers,
      badge: `${items.length}`,
      color: 'hover:text-emerald-400',
      activeGradient: 'from-emerald-500 to-teal-600',
    },
    {
      href: '/add-dress',
      label: 'Add Item',
      icon: Plus,
      badge: null,
      color: 'hover:text-rose-400',
      activeGradient: 'from-rose-500 to-pink-600',
    },
    {
      href: '/my-model',
      label: 'My Model',
      icon: User,
      badge: '2D Rig',
      color: 'hover:text-purple-400',
      activeGradient: 'from-purple-600 to-indigo-600',
    },
    {
      href: '/smart-match',
      label: 'Smart Matcher',
      icon: Sparkles,
      badge: 'Synergy',
      color: 'hover:text-cyan-400',
      activeGradient: 'from-cyan-500 to-blue-600',
    },
    {
      href: '/ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      badge: 'Stylist',
      color: 'hover:text-fuchsia-400',
      activeGradient: 'from-violet-600 to-fuchsia-600',
    },
    {
      href: '/check-before-you-buy',
      label: 'Check Before You Buy',
      icon: ShoppingBag,
      badge: 'Mall Shield',
      highlight: true,
      color: 'hover:text-rose-400',
      activeGradient: 'from-rose-500 via-pink-600 to-amber-500',
    },
    {
      href: '/outfit-planner',
      label: 'Outfit Planner',
      icon: Compass,
      badge: savedOutfits.length > 0 ? `${savedOutfits.length}` : null,
      color: 'hover:text-indigo-400',
      activeGradient: 'from-indigo-500 to-purple-600',
    },
    {
      href: '/weather',
      label: 'Weather & Daily Fit',
      icon: CloudSun,
      badge: 'Paris 18°C',
      color: 'hover:text-amber-400',
      activeGradient: 'from-amber-500 to-orange-600',
    },
    {
      href: '/profile',
      label: 'Profile & Settings',
      icon: User,
      badge: null,
      color: 'hover:text-purple-400',
      activeGradient: 'from-purple-600 to-pink-600',
    },
  ];

  const totalValue = items.reduce((acc, curr) => acc + (curr.price || 0), 0);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 flex flex-col md:flex-row font-sans selection:bg-rose-500 selection:text-white">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0B0F19] text-white shrink-0 border-r border-neutral-800/80 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-neutral-800/80">
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M12 2a3 3 0 0 0-3 3c0 1.3.8 2.4 2 2.8V9L3.4 16.2A2 2 0 0 0 5 19.5h14a2 2 0 0 0 1.6-3.3L13 9V7.8c1.2-.4 2-1.5 2-2.8a3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight font-bold bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Collection It All
              </span>
              <p className="text-[11px] text-neutral-400 tracking-wider uppercase font-medium">
                Smart Digital Wardrobe
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1 custom-scrollbar">
          <div className="px-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Wardrobe Operations
            </p>
          </div>

          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href === '/home' && pathname === '/');
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                  isActive
                    ? `bg-gradient-to-r ${link.activeGradient} text-white shadow-lg shadow-black/40`
                    : link.highlight
                    ? 'text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : link.highlight
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'text-neutral-400 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="tracking-wide">{link.label}</span>
                </div>

                {link.badge && (
                  <span
                    suppressHydrationWarning
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : link.highlight
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Wardrobe Quick Insight Card */}
        <div className="p-3.5 mx-4 mb-3 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
              Wardrobe Net Worth
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          <div suppressHydrationWarning className="text-lg font-bold font-serif text-white">
            ${totalValue.toLocaleString()}
          </div>
          <div className="mt-2 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <span suppressHydrationWarning>{items.length} items logged</span>
            <Link
              href="/collection"
              className="text-rose-400 hover:text-rose-300 flex items-center gap-0.5 font-medium"
            >
              Browse <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* User Mini Bar with Logout */}
        <div className="p-3.5 border-t border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2.5 group min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-neutral-700 group-hover:border-rose-400 transition shrink-0"
            />
            <div className="truncate w-28">
              <div className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                {userProfile.name}
              </div>
              <div className="text-[10px] text-neutral-400 truncate">
                {userProfile.stylePersona.split('&')[0]}
              </div>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-8 h-8 rounded-lg bg-neutral-800/80 hover:bg-rose-600 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Sign Out"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-neutral-200/80 px-4 md:px-8 py-3.5 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Mobile Brand / Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/home" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white">
                  <Shirt className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-lg tracking-tight">Collection It All</span>
              </Link>
            </div>

            {/* Global Search Bar */}
            <div ref={searchRef} className="relative flex-1 max-w-xl hidden sm:block">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search your wardrobe, brands, fabrics, or outfit ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-10 pr-10 py-2.5 bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white text-sm rounded-full border border-neutral-200/80 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 text-xs font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown Preview */}
              {searchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-50 p-2 animate-in fade-in duration-150">
                  <div className="px-3 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 flex items-center justify-between">
                    <span>Wardrobe Matches</span>
                    <Link
                      href={`/collection?q=${encodeURIComponent(searchQuery)}`}
                      className="text-rose-600 hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  {filteredSearchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-500">
                      No matching wardrobe pieces found for &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-50">
                      {filteredSearchResults.map((item) => (
                        <Link
                          key={item.id}
                          href="/collection"
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-2xl transition"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-neutral-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-neutral-500">
                              {item.category} • {item.colour} • {item.brand || 'No Brand'}
                            </p>
                          </div>
                          <span className="text-xs font-serif font-bold text-neutral-900">
                            ${item.price || 0}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications Toggle */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition relative cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-50 p-2 animate-in fade-in duration-150">
                    <div className="p-3 border-b border-neutral-100 flex items-center justify-between">
                      <span className="font-semibold text-xs text-neutral-900">Notifications</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold">
                        3 New
                      </span>
                    </div>
                    <div className="divide-y divide-neutral-100 text-xs">
                      <div className="p-3 hover:bg-neutral-50 transition">
                        <p className="font-semibold text-neutral-900">Paris Weather Shift (18°C)</p>
                        <p className="text-neutral-500 text-[11px] mt-0.5">
                          Trench coat + Merino Wool knit pairing recommended today.
                        </p>
                      </div>
                      <div className="p-3 hover:bg-neutral-50 transition">
                        <p className="font-semibold text-neutral-900">Style Gap Identified</p>
                        <p className="text-neutral-500 text-[11px] mt-0.5">
                          Missing Minimalist Derby Oxfords to unlock 8 formal combinations.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar */}
              <Link href="/profile" className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-neutral-200 hover:border-rose-500 transition shadow-sm"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* MOBILE DRAWER MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-[#0B0F19] text-white p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href === '/home' && pathname === '/');
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? `bg-gradient-to-r ${link.activeGradient} text-white`
                        : link.highlight
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <Link href="/profile" className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold">{userProfile.name}</div>
                  <div className="text-[10px] text-neutral-400">View Style Profile</div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1">{children}</main>
      </div>

      {/* FLOATING AI ASSISTANT LAUNCHER (When not on /ai-assistant) */}
      {pathname !== '/ai-assistant' && (
        <Link
          href="/ai-assistant"
          className="fixed bottom-20 md:bottom-8 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-2xl shadow-violet-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs font-bold group border border-white/20"
        >
          <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Ask AI Stylist</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </Link>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        <Link
          href="/home"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition ${
            pathname === '/home' || pathname === '/'
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-500'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <Link
          href="/collection"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition ${
            pathname === '/collection' ? 'text-neutral-900 font-bold' : 'text-neutral-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Closet</span>
        </Link>

        {/* Center Smart Matcher Button */}
        <Link
          href="/smart-match"
          className="relative -top-2 flex flex-col items-center group"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 via-pink-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold text-rose-600 mt-0.5 tracking-tight">
            Match
          </span>
        </Link>

        <Link
          href="/my-model"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition ${
            pathname === '/my-model' ? 'text-neutral-900 font-bold' : 'text-neutral-500'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Model</span>
        </Link>

        <Link
          href="/ai-assistant"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition ${
            pathname === '/ai-assistant' ? 'text-neutral-900 font-bold' : 'text-neutral-500'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Stylist</span>
        </Link>
      </nav>

      {/* Global Toast */}
      {activeToast && <Toast message={activeToast} />}
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-24 md:bottom-8 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-neutral-900/95 text-white text-xs font-semibold shadow-2xl border border-neutral-700/60 backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}

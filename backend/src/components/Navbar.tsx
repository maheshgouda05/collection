import React from 'react';
import { 
  Sparkles, 
  Layers, 
  PlusCircle, 
  User, 
  Shirt, 
  CloudSun, 
  Scan, 
  ShoppingBag, 
  Bot, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAuth }) => {
  const { user, weather, logout } = useWardrobe();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'collection', label: 'Wardrobe', icon: Shirt },
    { id: 'add-dress', label: 'Add Dress', icon: PlusCircle },
    { id: 'my-model', label: 'My Model', icon: Sparkles },
    { id: 'outfits', label: 'Outfit Planner', icon: Sparkles },
    { id: 'assistant', label: 'AI Stylist', icon: Bot },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'scan', label: 'Scan & Find', icon: Scan },
    { id: 'check-buy', label: 'Check Before Buy', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-rose-200 bg-clip-text text-transparent">
                Collection It All
              </span>
              <span className="text-[10px] block text-rose-400 font-semibold tracking-wider uppercase -mt-1">
                Ward Room
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Weather Quick-Chip & User Account */}
          <div className="flex items-center gap-3">
            {weather && (
              <button
                onClick={() => onSelectTab('weather')}
                className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 hover:bg-slate-700/80 transition-colors"
                title={`${weather.city}: ${weather.condition}`}
              >
                <span>{weather.icon}</span>
                <span className="font-semibold text-white">{weather.tempC}°C</span>
                <span className="text-slate-400 text-[11px] truncate max-w-[80px]">{weather.city}</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTab('profile')}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all ${
                    currentTab === 'profile'
                      ? 'border-rose-500 bg-rose-500/10'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                  }`}
                >
                  <img
                    src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                    alt={user.fullName}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-rose-400/50"
                  />
                  <span className="text-xs font-medium text-slate-200 hidden sm:inline">
                    {user.fullName.split(' ')[0]}
                  </span>
                </button>
                <button
                  onClick={() => logout()}
                  title="Log out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white shadow-md transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Mobile Horizontal Scroll Nav */}
        <div className="xl:hidden flex overflow-x-auto py-2 gap-1.5 no-scrollbar border-t border-slate-800/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

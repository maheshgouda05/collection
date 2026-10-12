import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Sparkles, 
  Save, 
  Check, 
  LogOut, 
  ShieldCheck, 
  Palette 
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';

interface ProfileViewProps {
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAuth }) => {
  const { user, profile, updateProfile, logout } = useWardrobe();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [favoriteStyles, setFavoriteStyles] = useState<string[]>(['smart casual', 'minimalist']);
  const [defaultOccasion, setDefaultOccasion] = useState('casual');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setUsername(profile.username || '');
      setAvatarUrl(profile.avatarUrl || '');
      if (profile.preferences?.favoriteStyles) {
        setFavoriteStyles(profile.preferences.favoriteStyles);
      }
      if (profile.preferences?.defaultOccasion) {
        setDefaultOccasion(profile.preferences.defaultOccasion);
      }
    } else if (user) {
      setFullName(user.fullName || '');
      setUsername(user.username || '');
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [profile, user]);

  const styleAesthetics = [
    'minimalist',
    'smart casual',
    'streetwear',
    'chic & elegant',
    'vintage',
    'bohemian',
    'classic tailored',
    'athleisure',
  ];

  const handleToggleStyle = (style: string) => {
    setFavoriteStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        fullName,
        username,
        avatarUrl,
        preferences: {
          favoriteStyles,
          defaultOccasion,
        },
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center p-12 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl mt-8">
        <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white">Sign In Required</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Log in or register to access your profile preferences and saved 3D styling data.
        </p>
        <button
          onClick={onOpenAuth}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Profile & Styling Persona</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your account identity, security preferences, and personal style aesthetics.
          </p>
        </div>

        <button
          onClick={() => logout()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identity Information Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${fullName || 'User'}`}
              alt={fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500/50 shadow-md"
            />
            <div>
              <h2 className="text-lg font-bold text-white">{fullName || 'Ward Room Member'}</h2>
              <span className="text-xs text-slate-400 font-mono">@{username || 'fashionista'}</span>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Account Session</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address (Managed by Session)</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-850 rounded-xl text-slate-400 text-xs sm:text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Avatar Image URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Style Persona & Aesthetics */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-400" />
              <span>Aesthetic Preferences</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your favorite styles. Gemini will bias daily pairings toward these silhouettes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {styleAesthetics.map(style => {
              const isSelected = favoriteStyles.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleToggleStyle(style)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white border-transparent shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Default Occasion</label>
            <select
              value={defaultOccasion}
              onChange={e => setDefaultOccasion(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 capitalize"
            >
              <option value="casual">Casual Daily</option>
              <option value="college">College / University</option>
              <option value="office">Office / Work</option>
              <option value="party">Party / Night Out</option>
              <option value="formal">Formal</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-rose-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Profile Updated Successfully!</span>
            </>
          ) : isSaving ? (
            <span>Saving Changes...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Profile & Preferences</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Shirt, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signup, showToast } = useWardrobe();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please provide a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms and Conditions to proceed.');
      return;
    }

    setLoading(true);
    try {
      const res = await signup(fullName, email, username, password);
      if (res.success) {
        showToast(`Welcome to Collection It All, ${fullName}!`);
        router.push('/home');
      } else {
        setErrorMessage(res.error || 'Registration failed.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-rose-500/20 via-purple-600/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-600/20 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition">
              <Shirt className="w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Collection It All
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-white pt-2">
            Build Your Digital Closet
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Catalog every garment you own, coordinate outfits with smart rules, and shop without duplicates.
          </p>
        </div>

        {/* Signup Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-4 text-xs"
        >
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Elena Rostova"
              className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
                required
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. elena_style"
                className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Password <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Confirm Password <span className="text-rose-400">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
              required
            />
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-neutral-300 select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-rose-500 bg-neutral-800 border-neutral-700 shrink-0"
              />
              <span className="text-[11px] leading-relaxed text-neutral-400">
                I agree to the Terms of Service & Privacy Policy for simulated digital wardrobe management.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold transition mt-2 shadow-lg hover:shadow-rose-500/25 cursor-pointer"
          >
            {loading ? 'Creating Wardrobe...' : 'Create My Account'}
          </button>

          <div className="pt-2 text-center text-[11px] text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="text-rose-400 hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </form>

        <p className="text-[11px] text-center text-neutral-400 max-w-sm mx-auto">
          🔒 Note: Authentication is simulated for frontend demonstration. No sensitive data or real passwords are saved.
        </p>
      </div>
    </main>
  );
}
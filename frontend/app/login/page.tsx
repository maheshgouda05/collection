'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/lib/wardrobeContext';
import { Shirt, Eye, EyeOff, KeyRound, Sparkles, AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, requestPasswordReset, showToast, authSession, isLoaded } = useWardrobe();

  const [emailOrUsername, setEmailOrUsername] = useState('elena@collectionitall.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /home immediately
  useEffect(() => {
    if (isLoaded && authSession.isAuthenticated) {
      router.replace('/home');
    }
  }, [isLoaded, authSession.isAuthenticated, router]);

  // Forgot Password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailOrUsername.trim()) {
      setErrorMessage('Please enter your email or username.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(emailOrUsername, password, rememberMe);
      if (res.success) {
        router.push('/home');
      } else {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    } catch {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    const res = await login('elena@collectionitall.com', 'password123', true);
    setLoading(false);
    if (res.success) {
      router.push('/home');
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);
    setRecoverySuccess(null);

    if (!recoveryEmail || !recoveryEmail.includes('@')) {
      setRecoveryError('Please provide a valid email address.');
      return;
    }

    setRecoveryLoading(true);
    const res = await requestPasswordReset(recoveryEmail);
    setRecoveryLoading(false);
    if (res.success) {
      setRecoverySuccess(res.message);
    } else {
      setRecoveryError(res.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Ambient Gradients */}
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
            Welcome Back to Your Wardrobe
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Sign in to access your digital wardrobe, body model, and outfit styling engine.
          </p>
        </div>

        {/* 1-Click Demo Shortcut */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-rose-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              1-Click Demo Access
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            Pre-loaded with Elena&apos;s curated luxury wardrobe & body proportions.
          </p>
          <button
            type="button"
            onClick={handleDemoAccess}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold shadow-lg transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {loading ? 'Entering...' : 'Enter as Demo Fashionista'}
          </button>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
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
              Email Address or Username
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="e.g. elena@collectionitall.com or elena"
              className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-white outline-none focus:border-rose-400 text-xs transition"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-neutral-300 font-semibold">Password</label>
              <button
                type="button"
                onClick={() => {
                  setRecoveryEmail(emailOrUsername.includes('@') ? emailOrUsername : '');
                  setForgotModalOpen(true);
                }}
                className="text-[11px] text-neutral-400 hover:text-rose-400 transition cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-300 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500 bg-neutral-800 border-neutral-700"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold transition mt-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div className="pt-2 text-center text-[11px] text-neutral-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-rose-400 hover:underline font-semibold">
              Create One
            </Link>
          </div>
        </form>

        {/* Note on Simulated Auth */}
        <p className="text-[11px] text-center text-neutral-400 max-w-sm mx-auto">
          🔒 Note: Authentication is simulated for frontend demonstration. No sensitive data or real passwords are saved.
        </p>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setRecoverySuccess(null);
                setRecoveryError(null);
              }}
              className="absolute right-4 top-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Reset Password</h3>
                <p className="text-xs text-neutral-400">Frontend recovery simulator</p>
              </div>
            </div>

            {recoverySuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recovery Link Sent</span>
                </div>
                <p className="text-xs leading-relaxed">{recoverySuccess}</p>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Enter your registered email address. We will simulate sending a password reset link to your inbox.
                </p>

                {recoveryError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                    {recoveryError}
                  </div>
                )}

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 text-xs">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs outline-none focus:border-rose-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={recoveryLoading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md"
                  >
                    {recoveryLoading ? 'Sending...' : 'Send Recovery Instructions'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
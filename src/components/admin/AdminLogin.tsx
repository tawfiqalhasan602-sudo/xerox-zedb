import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';

interface AdminLoginProps {
  onSuccess: () => void;
  onReturnToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onReturnToStore }) => {
  const [email, setEmail] = useState('admin@zedbeauty.com');
  const [password, setPassword] = useState('admin123password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.loginAdmin(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1819] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8c3b31]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8c3b31] to-[#3a1d19] border border-[#f3d0d7]/30 shadow-2xl mb-4">
            <Sparkles className="w-8 h-8 text-[#d4af37]" />
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            ZEDBEAUTY
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Luxury Skincare Administration
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900/90 border border-[#8c3b31]/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-800">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-sm font-bold text-neutral-200 tracking-wide uppercase">
              Secure Staff Authentication
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium flex items-start gap-2 animate-fadeIn">
              <span className="font-bold text-red-400">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zedbeauty.com"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#8c3b31] focus:ring-1 focus:ring-[#8c3b31] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#8c3b31] focus:ring-1 focus:ring-[#8c3b31] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#8c3b31] to-[#b34d40] hover:from-[#a84438] hover:to-[#c65648] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Access Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <button
              onClick={onReturnToStore}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              ← Return to ZEDBEAUTY Storefront
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-neutral-500 mt-6">
          ZEDBEAUTY Luxury Skincare © 2026. Protected Enterprise Administration Route.
        </p>
      </div>
    </div>
  );
};

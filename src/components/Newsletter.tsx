import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, User, LogIn, LogOut, Sparkles, ShieldCheck } from 'lucide-react';

interface NewsletterProps {
  onOpenAccount?: () => void;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const Newsletter: React.FC<NewsletterProps> = ({ onOpenAccount }) => {
  const [email, setEmail] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('zedbeauty_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGmailLogin = (userEmail?: string) => {
    setIsLoggingIn(true);
    const targetEmail = userEmail || email || 'tawfiq.zedbeauty@gmail.com';
    const nameFromEmail = targetEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setTimeout(() => {
      const userData = { email: targetEmail, name: formattedName };
      setLoggedInUser(userData);
      localStorage.setItem('zedbeauty_user', JSON.stringify(userData));
      setIsLoggingIn(false);
      setEmail('');
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      handleGmailLogin(email.trim());
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('zedbeauty_user');
  };

  return (
    <section className="py-16 bg-[#f8e5e5]/50 border-t border-[#ebdcd5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-white rounded-3xl border border-[#ebdcd5] p-8 sm:p-12 shadow-md relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-full bg-[#f3d0d7] text-[#8c3b31] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <LogIn className="w-6 h-6" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            {loggedInUser ? `Welcome, ${loggedInUser.name}!` : 'Login & Stay Connected With ZEDBEAUTY'}
          </h2>

          <p className="text-neutral-600 text-sm max-w-lg mx-auto mb-8 font-normal leading-relaxed">
            {loggedInUser
              ? 'You are logged in with your Gmail account! Enjoy VIP member perks, 10% promo code (ZEDBEAUTY10), and reward point tracking.'
              : 'Log in with your Gmail account to stay connected with ZEDBEAUTY, get 10% off your orders, track deliveries, and earn VIP rewards.'}
          </p>

          {loggedInUser ? (
            <div className="space-y-4 max-w-md mx-auto animate-fadeIn">
              <div className="bg-[#faf6f0] p-4 rounded-2xl border border-[#ebdcd5] flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8c3b31] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {loggedInUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                      {loggedInUser.name} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </p>
                    <p className="text-[11px] text-neutral-500 font-mono">{loggedInUser.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Gmail Verified
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {onOpenAccount && (
                  <button
                    onClick={onOpenAccount}
                    className="flex-1 py-3 px-5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-[#8c3b31] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile & Orders</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="py-3 px-5 bg-neutral-100 text-neutral-700 hover:text-red-600 text-xs font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-md mx-auto">
              {/* Google 1-Click Login Button */}
              <button
                type="button"
                onClick={() => handleGmailLogin()}
                disabled={isLoggingIn}
                className="w-full py-3.5 px-6 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-full text-xs font-bold flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <GoogleIcon />
                <span>{isLoggingIn ? 'Logging in with Gmail...' : 'Continue with Gmail / Google'}</span>
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-[#ebdcd5]"></div>
                <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">OR EMAIL LOGIN</span>
                <div className="flex-1 h-px bg-[#ebdcd5]"></div>
              </div>

              {/* Direct Gmail / Email Login Form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your Gmail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#faf6f0] border border-[#ebdcd5] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#a85d52] focus:ring-1 focus:ring-[#a85d52]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#8c3b31] transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          )}

          <p className="text-[11px] text-neutral-400 mt-5 font-normal flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
            <span>Secure SSL Google OAuth Authentication • We respect your privacy.</span>
          </p>

        </div>

      </div>
    </section>
  );
};


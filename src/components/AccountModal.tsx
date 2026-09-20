import React, { useState, useEffect } from 'react';
import { X, User, Package, MapPin, Heart, LogOut, CheckCircle2, Mail, ShieldCheck, LogIn } from 'lucide-react';
import { Order } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  pastOrders: Order[];
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

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, pastOrders }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [inputEmail, setInputEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
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

  useEffect(() => {
    const saved = localStorage.getItem('zedbeauty_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, [isOpen]);

  const handleGmailLogin = (customEmail?: string) => {
    setIsLoggingIn(true);
    const targetEmail = customEmail || inputEmail || 'tawfiq.zedbeauty@gmail.com';
    const nameFromEmail = targetEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setTimeout(() => {
      const userData = { email: targetEmail, name: formattedName };
      setUser(userData);
      localStorage.setItem('zedbeauty_user', JSON.stringify(userData));
      setIsLoggingIn(false);
      setInputEmail('');
    }, 700);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail.trim()) {
      handleGmailLogin(inputEmail.trim());
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zedbeauty_user');
  };

  const displayName = user ? user.name : 'Guest User';
  const displayEmail = user ? user.email : 'Not logged in';
  const avatarInitials = user ? user.name.charAt(0).toUpperCase() : 'Z';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd5]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#f8e5e5] text-[#8c3b31] font-bold text-lg flex items-center justify-center border border-[#ebdcd5] shadow-xs">
              {avatarInitials}
            </div>
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-neutral-900">{displayName}</h2>
              <p className="text-xs text-neutral-500">
                {user ? 'ZEDBEAUTY VIP Member • Dhaka' : 'Log in to access your profile & orders'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#ebdcd5] gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>My Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({pastOrders.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' ? (
          <div className="space-y-4 text-xs">
            {/* User Details Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Account Status:</span>
                <span className="font-semibold text-neutral-900 flex items-center gap-1">
                  {user ? (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Logged In (Gmail)
                    </span>
                  ) : (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px] font-bold">
                      Guest Session
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-bold">Email Address:</span>
                <span className="font-semibold text-neutral-900 font-mono">{displayEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-bold">Default Location:</span>
                <span className="font-semibold text-neutral-900">Nazira Bazar, Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Login / Authentication Box */}
            {user ? (
              <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900 text-xs flex items-center gap-1">
                    Connected as {user.email} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </p>
                  <p className="text-[11px] text-neutral-500">Enjoy member benefits and order history synchronization.</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-red-600 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="bg-white p-5 rounded-2xl border border-[#ebdcd5] space-y-3.5">
                <div className="text-left space-y-1">
                  <p className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                    <LogIn className="w-4 h-4 text-[#8c3b31]" />
                    <span>Login with Gmail Account</span>
                  </p>
                  <p className="text-neutral-500 text-[11px]">
                    Log in with your Gmail account to stay connected, save order details, and track deliveries.
                  </p>
                </div>

                {/* 1-Click Google Button */}
                <button
                  type="button"
                  onClick={() => handleGmailLogin()}
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-full text-xs font-bold flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <GoogleIcon />
                  <span>{isLoggingIn ? 'Logging in with Gmail...' : 'Continue with Gmail / Google'}</span>
                </button>

                <div className="flex items-center gap-2 my-1">
                  <div className="flex-1 h-px bg-[#ebdcd5]"></div>
                  <span className="text-[10px] text-neutral-400 font-medium uppercase">OR</span>
                  <div className="flex-1 h-px bg-[#ebdcd5]"></div>
                </div>

                {/* Direct Email Form */}
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter Gmail address"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-full bg-[#faf6f0] border border-[#ebdcd5] text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#a85d52]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-[#8c3b31] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p className="text-[10px] text-neutral-400 font-normal flex items-center gap-1 pt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                  <span>Your email is securely stored for order updates.</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
            {pastOrders.length === 0 ? (
              <p className="text-neutral-500 py-6 text-center">No past orders placed yet.</p>
            ) : (
              pastOrders.map((ord) => (
                <div key={ord.id} className="bg-white p-4 rounded-2xl border border-[#ebdcd5] space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-[#8c3b31]">Order #{ord.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">Date: {ord.date} • Total: <strong>৳ {ord.total.toLocaleString()}</strong></p>
                  <p className="text-neutral-500 text-[11px]">Items: {ord.items.map(i => i.product.name).join(', ')}</p>
                </div>
              ))
            )}
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-[#8c3b31] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};


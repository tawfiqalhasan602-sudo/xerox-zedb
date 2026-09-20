import React from 'react';
import { CheckCircle2, ShoppingBag, Heart } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'cart' | 'wishlist' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'cart' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#a85d52] flex items-center gap-3 text-xs font-semibold">
        {type === 'cart' && <ShoppingBag className="w-4 h-4 text-[#f8d4c1]" />}
        {type === 'wishlist' && <Heart className="w-4 h-4 text-pink-400 fill-current" />}
        {type === 'info' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        <span>{message}</span>
      </div>
    </div>
  );
};

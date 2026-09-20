import React, { useState } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface AnnouncementBarProps {
  onPromoClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onPromoClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1f1a1c] text-[#fbf4f0] text-xs md:text-sm py-2 px-4 relative flex items-center justify-between transition-all">
      <div className="flex-1 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#e5b382] animate-pulse" />
        <span>
          <strong className="text-[#f8d4c1]">✨ Cathy Doll White Cushion</strong> 22% OFF | Express Shipping across Bangladesh 🚚
        </span>
        <button
          onClick={onPromoClick}
          className="ml-2 inline-flex items-center gap-0.5 text-[#e5b382] hover:underline font-medium text-xs cursor-pointer"
        >
          Shop Sale <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#d8c2b8] hover:text-white transition-colors p-1"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

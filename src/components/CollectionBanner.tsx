import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface CollectionBannerProps {
  settings?: SiteSettings;
  onShopCollection: () => void;
}

export const CollectionBanner: React.FC<CollectionBannerProps> = ({ settings, onShopCollection }) => {
  const badgeText = settings?.collectionBannerBadge || '100% ORIGINAL MADE IN KOREA';
  const title = settings?.collectionBannerTitle || 'Plush Cushion Foam, Instant Glow.';
  const subtitle =
    settings?.collectionBannerSubtitle ||
    'Formulated with Snail Mucin, Berry Complex & Collagen to deeply cleanse makeup, remove urban pollutants, and reduce dark spots for a radiant, soft skin feel.';
  const imageUrl = settings?.collectionBannerImageUrl || '/cathy_doll_cushion.jpg';
  const buttonText = settings?.collectionBannerButtonText || 'Explore Full Collection';

  return (
    <section className="py-12 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-[#1f1a1c] text-white shadow-2xl min-h-[380px] flex items-center">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={imageUrl}
              alt={title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
              }}
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity transform scale-105 hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3d0d7]/20 border border-[#f3d0d7]/30 text-[#f8d4c1] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{badgeText}</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2">
              <button
                onClick={onShopCollection}
                className="px-8 py-4 bg-gradient-to-r from-[#f8e5e5] to-[#f3d0d7] text-[#8c3b31] font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings?: SiteSettings;
  onShopNow: () => void;
  onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onShopNow, onExploreCollection }) => {
  const badgeText = settings?.heroBadgeText || 'OFFICIAL EXCLUSIVE PRODUCT LAUNCH';
  const title = settings?.heroTitle || 'White Cushion Facial Foam Cleanser 120ml';
  const subtitle =
    settings?.heroSubtitle ||
    'Cathy Doll Face Wash (Made In Korea) — Gentle plush cushion foam cleanser enriched with Snail Mucin & Berry Extracts for deep makeup removal, intense radiance & dark spot reduction.';
  const imageUrl = settings?.heroImageUrl || '/cathy_doll_cushion.jpg';
  const price = settings?.heroPrice ?? 790;
  const originalPrice = settings?.heroOriginalPrice ?? 990;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6f0] via-[#f7ebe6] to-[#faf6f0] pt-8 pb-16 lg:py-20">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#f8e5e5]/60 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f3d0d7]/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3d0d7]/50 border border-[#e8c0c8] text-[#8c3b31] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#a85d52]" />
              <span>{badgeText}</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-medium text-sm rounded-full shadow-lg hover:bg-[#8c3b31] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Buy Now (৳ {price})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-xs text-neutral-900 font-medium text-sm rounded-full border border-[#ebd0d0] hover:bg-[#f8e5e5] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Full Details & Ingredients</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-8 border-t border-[#ebd0d0]/60 grid grid-cols-3 gap-2 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#a85d52]" />
                <span className="text-xs font-medium text-neutral-700">100% Authentic</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <Truck className="w-5 h-5 text-[#a85d52]" />
                <span className="text-xs font-medium text-neutral-700">Fast BD Delivery</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <Clock className="w-5 h-5 text-[#a85d52]" />
                <span className="text-xs font-medium text-neutral-700">Cash on Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#f3d0d7] via-[#f8e5e5] to-[#f5e1da] rounded-3xl transform rotate-2 blur-xs"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#f3d0d7]/60 aspect-[3/4]">
                <img
                  src={imageUrl}
                  alt={title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                  }}
                  className="w-full h-full object-contain p-4 object-center transform hover:scale-105 transition-transform duration-700 bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#f3d0d7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#a85d52] uppercase block">
                      EXCLUSIVE K-BEAUTY LAUNCH
                    </span>
                    <h3 className="font-serif-display text-base font-bold text-neutral-900 line-clamp-1">{title}</h3>
                    <p className="text-xs text-neutral-600 font-bold">
                      ৳ {price}{' '}
                      {originalPrice > price && (
                        <>
                          <span className="line-through text-neutral-400 font-normal">৳ {originalPrice}</span>{' '}
                          <span className="text-[#a85d52] font-semibold">
                            ({Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF)
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={onShopNow}
                    className="px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-[#a85d52] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

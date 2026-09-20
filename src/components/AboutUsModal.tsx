import React from 'react';
import { X, Sparkles, Heart, ShieldCheck, Award } from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd5]">
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-2xl font-bold text-neutral-900">About ZEDBEAUTY</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          <p>
            Founded in Dhaka, <strong>ZEDBEAUTY</strong> was created to solve a fundamental challenge for beauty lovers in Bangladesh: accessing 100% authentic, high-efficacy skincare and cosmetic formulations at fair, transparent BDT prices.
          </p>

          <p>
            Every serum, cushion, toner, and lip mask in our store undergoes strict authenticity verification directly from official manufacturer distributors in South Korea, Japan, France, and Thailand.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] text-center">
              <ShieldCheck className="w-6 h-6 text-[#8c3b31] mx-auto mb-1" />
              <h4 className="font-serif-display text-base font-bold text-neutral-900">100% Genuine</h4>
              <p className="text-[11px] text-neutral-500">Direct distributor sourcing</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] text-center">
              <Award className="w-6 h-6 text-[#8c3b31] mx-auto mb-1" />
              <h4 className="font-serif-display text-base font-bold text-neutral-900">Dermatologist Approved</h4>
              <p className="text-[11px] text-neutral-500">Cruelty-free & clean formulas</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] text-center">
              <Heart className="w-6 h-6 text-[#8c3b31] mx-auto mb-1" />
              <h4 className="font-serif-display text-base font-bold text-neutral-900">50,000+ Glows</h4>
              <p className="text-[11px] text-neutral-500">Happy BD customers</p>
            </div>
          </div>
        </div>

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

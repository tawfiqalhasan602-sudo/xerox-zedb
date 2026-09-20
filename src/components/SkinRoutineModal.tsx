import React, { useState } from 'react';
import { Product } from '../types';
import { X, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Bot } from 'lucide-react';

interface SkinRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const SkinRoutineModal: React.FC<SkinRoutineModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [skinType, setSkinType] = useState('Combination');
  const [primaryConcern, setPrimaryConcern] = useState('Dullness & Glow');
  const [budget, setBudget] = useState('Moderate');
  const [isGenerating, setIsGenerating] = useState(false);

  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
  const concerns = ['Dullness & Glow', 'Acne & Blemishes', 'Aging & Fine Lines', 'Dark Spots & Pigmentation', 'Dehydration'];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 1000);
  };

  // Recommended routine picks
  const recommendedCleanser = products[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f8e5e5] text-[#8c3b31] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl font-bold text-neutral-900">
                Personalized Beauty & Skin Routine AI
              </h2>
              <p className="text-[10px] text-neutral-500">ZEDBEAUTY Dermatological Matchmaker</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Skin Type */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <span className="text-xs font-bold text-[#a85d52] uppercase">Step 1 of 3</span>
            <h3 className="font-serif-display text-2xl font-bold text-neutral-900">
              What is your primary skin type?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSkinType(type)}
                  className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    skinType === type
                      ? 'border-[#8c3b31] bg-[#f8e5e5] text-[#8c3b31] shadow-xs'
                      : 'border-[#ebdcd5] bg-white text-neutral-800 hover:bg-[#faf6f0]'
                  }`}
                >
                  {type} Skin
                </button>
              ))}
            </div>

            <div className="pt-4 text-right">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-[#8c3b31] transition-colors cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Skin Concern */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <span className="text-xs font-bold text-[#a85d52] uppercase">Step 2 of 3</span>
            <h3 className="font-serif-display text-2xl font-bold text-neutral-900">
              What concern would you like to target?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {concerns.map((c) => (
                <button
                  key={c}
                  onClick={() => setPrimaryConcern(c)}
                  className={`p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                    primaryConcern === c
                      ? 'border-[#8c3b31] bg-[#f8e5e5] text-[#8c3b31] shadow-xs'
                      : 'border-[#ebdcd5] bg-white text-neutral-800 hover:bg-[#faf6f0]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-neutral-500 font-bold hover:underline"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="px-6 py-3 bg-[#8c3b31] text-white text-xs font-bold rounded-xl hover:bg-neutral-900 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Routine</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Generated Results */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-medium space-y-1">
              <span className="font-bold block text-sm">✨ Routine Tailored For You:</span>
              <p>Skin Type: <strong>{skinType}</strong> • Target Concern: <strong>{primaryConcern}</strong></p>
            </div>

            <h3 className="font-serif-display text-xl font-bold text-neutral-900">
              Recommended Cleanser Match
            </h3>

            {recommendedCleanser && (
              <div className="bg-white p-4 rounded-2xl border border-[#ebdcd5] flex items-center gap-4 shadow-sm">
                <img
                  src={recommendedCleanser.image}
                  alt={recommendedCleanser.name}
                  className="w-20 h-20 rounded-xl object-contain bg-[#faf6f0] p-1 border border-[#ebdcd5]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#8c3b31] uppercase block tracking-wider">
                    Core Step 1: Gentle Cleansing & Brightening
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-snug">{recommendedCleanser.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{recommendedCleanser.shortDescription}</p>
                  <p className="text-sm font-extrabold text-neutral-900 mt-1">৳ {recommendedCleanser.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onAddToCart(recommendedCleanser, 1)}
                  className="px-4 py-2.5 bg-[#8c3b31] text-white hover:bg-neutral-900 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  + Add To Cart
                </button>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-neutral-500 font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Over
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-[#8c3b31] transition-colors cursor-pointer"
              >
                Close Routine
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Product } from '../types';
import { Star, CheckCircle2, ShoppingBag, Zap, Heart, ShieldAlert } from 'lucide-react';

interface FeaturedProductProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  product,
  isWishlisted,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <section className="py-16 bg-gradient-to-b from-[#f8e5e5]/40 via-[#fdf8f6] to-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Badge Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="px-4 py-1.5 rounded-full bg-[#f3d0d7] text-[#8c3b31] text-xs font-bold uppercase tracking-widest inline-block mb-2">
            SPOTLIGHT FEATURED FORMULA
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900">
            {product.name}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-[#ebdcd5] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#faf6f0] border border-[#f0e4dd] shadow-inner">
              <img
                src={product.gallery[selectedImageIndex] || product.image}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                }}
                className="w-full h-full object-contain p-4 bg-white object-center transition-all duration-500"
              />

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#8c3b31] text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                  SAVE {discountPercent}% OFF
                </div>
              )}

              <button
                onClick={(e) => onToggleWishlist(product, e)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#8c3b31] text-white'
                    : 'bg-white/80 text-neutral-700 hover:text-[#8c3b31]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImageIndex === idx ? 'border-[#8c3b31] scale-105 shadow-xs' : 'border-[#ebdcd5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain p-1 bg-white" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Info */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#a85d52] uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {product.stockStatus} — Fast BD Dispatch
                </span>
              </div>

              <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-900">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#eee0d8] flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-neutral-900">
                ৳ {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  ৳ {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-[#8c3b31] bg-[#f3d0d7]/60 px-3 py-1 rounded-full">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Key Benefits List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold tracking-wider text-neutral-900 uppercase">Key Benefits:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#a85d52] flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#eee0d8]">
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-neutral-800 uppercase">Quantity:</span>
                <div className="inline-flex items-center rounded-xl border border-[#ebdcd5] bg-[#faf6f0] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white font-bold text-neutral-800 hover:bg-[#f3d0d7] transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white font-bold text-neutral-800 hover:bg-[#f3d0d7] transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="py-3.5 px-6 bg-white border-2 border-neutral-900 text-neutral-900 font-bold text-sm rounded-xl hover:bg-neutral-900 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onBuyNow(product, quantity)}
                  className="py-3.5 px-6 bg-[#8c3b31] text-white font-bold text-sm rounded-xl hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current text-[#f8d4c1]" />
                  <span>Buy Now (৳ {(product.price * quantity).toLocaleString()})</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-[#ebdcd5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Product Image Container (3:4 Aspect Ratio) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#fdf8f6]">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
          }}
          className="w-full h-full object-contain p-3 bg-white object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-[#8c3b31] text-white text-[11px] font-bold rounded-md uppercase tracking-wider shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-neutral-900 text-[#f8d4c1] text-[10px] font-extrabold rounded-md uppercase tracking-wider">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-[#8c3b31] text-white shadow-md'
              : 'bg-white/80 text-neutral-700 hover:text-[#8c3b31] hover:bg-white'
          }`}
          aria-label="Wishlist"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold rounded-xl border border-[#ebdcd5] shadow-md hover:bg-neutral-900 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[11px] font-bold tracking-wider text-[#a85d52] uppercase mb-1">
          {product.brand}
        </span>

        <h3 className="font-serif-display text-lg font-bold text-neutral-900 group-hover:text-[#8c3b31] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-2 mt-1 mb-3 font-normal">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-[#d4af37]">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
          <span className="text-xs text-neutral-400">({product.reviewCount})</span>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="mt-auto pt-3 border-t border-[#f0e4dd] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-neutral-900">
                ৳ {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ৳ {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className="px-3.5 py-2 bg-[#f3d0d7] text-[#8c3b31] hover:bg-[#8c3b31] hover:text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

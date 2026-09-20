import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs"></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf6f0] shadow-2xl flex flex-col border-l border-[#ebdcd5]">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#ebdcd5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8c3b31] fill-current" />
              <h2 className="font-serif-display text-xl font-bold text-neutral-900">
                Your Saved Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-[#faf6f0] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#f8e5e5] text-[#8c3b31] flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-neutral-900">
                  No saved items yet
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any product card to save your favorite beauty items here!
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#ebdcd5] flex gap-3 items-center shadow-2xs"
                >
                  <div className="w-14 aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#f0e4dd] flex-shrink-0 p-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#a85d52] uppercase block">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-neutral-900 mt-1">
                      ৳ {product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1.5 bg-[#8c3b31] text-white rounded-xl text-xs font-bold hover:bg-neutral-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-neutral-400 hover:text-red-600 transition-colors text-[10px] text-center cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

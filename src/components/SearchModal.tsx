import React, { useState } from 'react';
import { Product } from '../types';
import { X, Search, ShoppingBag, Eye, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4); // show top 4 suggestions when query is empty

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] space-y-4 p-6">
        
        {/* Search Header Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8c3b31]" />
          <input
            type="text"
            autoFocus
            placeholder="Search skincare, serum, cushion, toner, SPF..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white border border-[#ebdcd5] rounded-2xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#8c3b31] focus:ring-1 focus:ring-[#8c3b31] shadow-xs"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-neutral-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Keyword Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 font-bold uppercase text-[10px]">Popular:</span>
          {['Serum', 'Cushion', 'Sunscreen', 'Toner', 'Lip Mask'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-white border border-[#ebdcd5] text-neutral-700 hover:bg-[#f3d0d7] transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            {query.trim() ? `Found ${filteredProducts.length} Results` : 'Top Recommended Searches'}
          </span>

          {filteredProducts.length === 0 ? (
            <p className="text-xs text-neutral-500 py-8 text-center">
              No beauty products matched "{query}". Try searching "Collagen", "Anua", or "Cushion".
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="bg-white p-3 rounded-2xl border border-[#ebdcd5] hover:border-[#8c3b31] transition-all flex items-center gap-3 cursor-pointer group shadow-2xs"
              >
                <div className="w-12 aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#f0e4dd] flex-shrink-0 p-1">
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
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#8c3b31] transition-colors truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-bold text-neutral-900">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, e);
                  }}
                  className="px-3 py-1.5 bg-[#f3d0d7] text-[#8c3b31] hover:bg-[#8c3b31] hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  + Add
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

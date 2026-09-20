import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
  wishlistIds: Set<string>;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  selectedCategory,
  onSelectCategory,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const categories = ['All', 'Face Wash', 'Cleanser & Brightening', 'Made In Korea'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory || selectedCategory === 'Face Wash' || selectedCategory === 'Made In Korea' || selectedCategory === 'Cleanser & Brightening');
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list;
  }, [products, selectedCategory, maxPrice]);

  return (
    <section id="shop-section" className="py-16 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#ebdcd5] pb-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#a85d52] uppercase block mb-1">
              EXCLUSIVE LAUNCH COLLECTION
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900">
              Cathy Doll Korean Face Wash
            </h2>
          </div>

          {/* Controls: Sorting and Price Range */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Price slider quick filter */}
            <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#ebdcd5] text-xs">
              <span className="text-neutral-500 font-medium">Max Price:</span>
              <span className="font-bold text-neutral-900">৳ {maxPrice.toLocaleString()}</span>
              <input
                type="range"
                min="800"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#a85d52] cursor-pointer"
              />
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#ebdcd5] text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#a85d52]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Best Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-[#f3d0d7]/40 border border-[#ebdcd5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#ebdcd5]">
            <p className="text-neutral-500 font-medium text-base">No products match your selected filter.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setMaxPrice(4000);
              }}
              className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-full hover:bg-[#a85d52] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface FeaturedCategoriesProps {
  settings?: SiteSettings;
  onSelectCategory: (categoryName: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ settings, onSelectCategory }) => {
  const categoriesToDisplay =
    settings?.categoryList && settings.categoryList.length > 0
      ? settings.categoryList
      : CATEGORIES;

  return (
    <section className="py-16 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-[#a85d52] uppercase block mb-2">
            CURATED COLLECTIONS
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900">
            Featured Categories
          </h2>
          <p className="text-neutral-600 text-sm mt-2">
            Explore our thoughtfully categorized beauty & skincare range designed for your routine.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToDisplay.map((cat) => (
            <div
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.name === 'Best Sellers' ? 'All' : cat.name)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#ebdcd5] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-72"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-900/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 mt-auto p-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] font-semibold text-[#f8d4c1] tracking-wider uppercase mb-1 block">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-white group-hover:text-[#f8d4c1] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#a85d52] group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

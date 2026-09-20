import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-[#a85d52] uppercase block mb-2">
            REAL STORIES & FEEDBACK
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900">
            Loved By Thousands Across BD
          </h2>
          <p className="text-neutral-600 text-sm mt-2">
            Read real reviews from our valued Bangladeshi beauty and skincare customers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#ebdcd5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#f3d0d7]/60 group-hover:text-[#f3d0d7] transition-colors" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#d4af37] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="font-serif-display text-base font-bold text-neutral-900 mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed font-normal mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#f0e4dd] flex items-center gap-3">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#ebdcd5]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#f8e5e5] text-[#8c3b31] font-bold text-sm flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-neutral-900">{rev.author}</h4>
                    {rev.verifiedPurchase && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500 font-medium">
                    {rev.location} • <span className="text-[#a85d52]">Verified Buyer</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

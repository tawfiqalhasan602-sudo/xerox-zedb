import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, CheckCircle2, ShoppingBag, Zap, Heart, Shield, Sparkles, MessageSquarePlus } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients' | 'reviews'>('benefits');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Local user review state
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'r-user-1',
      author: 'Tasnim Fatima',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      date: '5 days ago',
      title: 'Remarkable glowing skin results!',
      comment: 'Authentic item received in Dhaka. Highly hydrating and soft texture.',
      verifiedPurchase: true,
    },
    {
      id: 'r-user-2',
      author: 'Sabrina N.',
      location: 'Chittagong',
      rating: 5,
      date: '1 week ago',
      title: 'Smooth & Non-greasy formula',
      comment: 'Works perfectly in hot humid weather. The packaging from ZEDBEAUTY was super premium.',
      verifiedPurchase: true,
    }
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const newRev: Review = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        location: 'Dhaka',
        rating: newReviewRating,
        date: 'Just now',
        title: 'Customer Review',
        comment: newReviewComment,
        verifiedPurchase: true,
      };
      setReviewsList([newRev, ...reviewsList]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#ebdcd5] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#a85d52] uppercase tracking-wider">{product.brand}</span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs text-neutral-500 font-medium">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-[#faf6f0] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#ebdcd5] shadow-sm">
                <img
                  src={product.gallery[selectedImageIndex] || product.image}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                  }}
                  className="w-full h-full object-contain p-3 bg-white object-center"
                />

                {discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-[#8c3b31] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs uppercase">
                    {discountPercent}% OFF
                  </span>
                )}

                <button
                  onClick={(e) => onToggleWishlist(product, e)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isWishlisted ? 'bg-[#8c3b31] text-white' : 'bg-white/80 text-neutral-700 hover:text-[#8c3b31]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === i ? 'border-[#8c3b31]' : 'border-[#ebdcd5] opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-1 bg-white" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
                  <span className="text-xs text-neutral-500">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-xl bg-white border border-[#ebdcd5] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-neutral-900">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500">All Bangladesh Taxes & VAT Included</p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {product.stockStatus}
                  </span>
                  <p className="text-[10px] text-neutral-500 mt-1">Ships in 24 hrs</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-800 uppercase">Quantity:</span>
                  <div className="inline-flex items-center rounded-lg border border-[#ebdcd5] bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded bg-[#faf6f0] text-sm font-bold text-neutral-800 hover:bg-[#f3d0d7] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded bg-[#faf6f0] text-sm font-bold text-neutral-800 hover:bg-[#f3d0d7] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="py-3 px-4 bg-white border border-neutral-900 text-neutral-900 text-xs font-bold rounded-xl hover:bg-neutral-900 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, quantity);
                      onClose();
                    }}
                    className="py-3 px-4 bg-[#8c3b31] text-white text-xs font-bold rounded-xl hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Zap className="w-4 h-4 text-[#f8d4c1] fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-3 bg-[#f8e5e5]/50 rounded-xl text-[11px] text-[#8c3b31] flex items-center justify-between font-medium border border-[#ebdcd5]">
                <span>✓ 100% Authentic Guarantee</span>
                <span>✓ Cash on Delivery Available</span>
                <span>✓ Easy 7-Day Returns</span>
              </div>

            </div>

          </div>

          {/* Tabbed Info Section */}
          <div className="pt-6 border-t border-[#ebdcd5]">
            <div className="flex border-b border-[#ebdcd5] gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'benefits' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
                }`}
              >
                Key Benefits
              </button>
              <button
                onClick={() => setActiveTab('howToUse')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'howToUse' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'ingredients' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'border-b-2 border-[#8c3b31] text-[#8c3b31]' : 'text-neutral-500'
                }`}
              >
                Customer Reviews ({reviewsList.length})
              </button>
            </div>

            <div className="pt-4 text-xs text-neutral-700 leading-relaxed font-normal">
              {activeTab === 'benefits' && (
                <ul className="space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#a85d52]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'howToUse' && (
                <p className="bg-white p-4 rounded-xl border border-[#ebdcd5]">
                  {product.howToUse}
                </p>
              )}

              {activeTab === 'ingredients' && (
                <p className="bg-white p-4 rounded-xl border border-[#ebdcd5] font-mono text-[11px] text-neutral-600">
                  {product.ingredients}
                </p>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews List */}
                  <div className="space-y-3">
                    {reviewsList.map((r) => (
                      <div key={r.id} className="bg-white p-4 rounded-xl border border-[#ebdcd5]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-neutral-900">{r.author}</span>
                          <span className="text-[10px] text-neutral-400">{r.date}</span>
                        </div>
                        <div className="flex text-[#d4af37] mb-2">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-600">{r.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-white p-5 rounded-2xl border border-[#ebdcd5]">
                    <h4 className="font-bold text-xs text-neutral-900 uppercase mb-3 flex items-center gap-1.5">
                      <MessageSquarePlus className="w-4 h-4 text-[#a85d52]" />
                      <span>Write a Review</span>
                    </h4>

                    {reviewSubmitted && (
                      <div className="p-3 mb-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold">
                        ✓ Thank you! Your review has been added.
                      </div>
                    )}

                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name (e.g. Nusrat Jahan)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <textarea
                          required
                          rows={2}
                          placeholder="Share your experience with this product..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-neutral-500 font-medium">Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className="text-[#d4af37] p-1 cursor-pointer"
                            >
                              <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-[#8c3b31] transition-colors cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#ebdcd5]">
              <h3 className="font-serif-display text-xl font-bold text-neutral-900 mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={isWishlisted}
                    onAddToCart={(item, e) => {
                      e.stopPropagation();
                      onAddToCart(item, 1);
                    }}
                    onToggleWishlist={onToggleWishlist}
                    onQuickView={onSelectProduct}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

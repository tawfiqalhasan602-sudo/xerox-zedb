import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { api } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1500;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const shippingFee = subtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 60; // ৳ 60 inside Dhaka
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;

    setIsValidatingCoupon(true);
    setCouponError('');

    try {
      const res = await api.validateCoupon(coupon.trim(), subtotal);
      setAppliedCoupon(res.coupon.code);
      setDiscountAmount(res.discountAmount);
      setCouponError('');
    } catch (err: any) {
      setCouponError(err.message || 'Invalid or expired promo code.');
      setAppliedCoupon(null);
      setDiscountAmount(0);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf6f0] shadow-2xl flex flex-col border-l border-[#ebdcd5]">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#ebdcd5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8c3b31]" />
              <h2 className="font-serif-display text-xl font-bold text-neutral-900">
                Your Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-[#faf6f0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#f8e5e5] border-b border-[#ebdcd5]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#8c3b31] mb-1.5">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> 🎉 You unlocked FREE Delivery across BD!
                  </span>
                ) : (
                  <span>Add ৳ {remainingForFreeShipping.toLocaleString()} more for FREE Delivery!</span>
                )}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-[#f3d0d7] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#8c3b31] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f3d0d7]/40 text-[#8c3b31] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-neutral-900">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our premium skincare, cushions, and serums to start building your glow routine.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-3 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-[#8c3b31] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#ebdcd5] flex gap-3 items-center shadow-2xs"
                >
                  <div className="w-14 aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#f0e4dd] flex-shrink-0 p-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cathy_doll_cushion.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#a85d52] font-semibold mt-0.5">
                      ৳ {item.product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="inline-flex items-center rounded-md border border-[#ebdcd5] bg-[#faf6f0]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 text-xs font-bold text-neutral-800 hover:bg-[#f3d0d7] rounded-l cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 text-xs font-bold text-neutral-800 hover:bg-[#f3d0d7] rounded-r cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-bold text-xs text-neutral-900">
                    ৳ {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ebdcd5] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (ZEDBEAUTY10)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-[#8c3b31] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Promo code '{appliedCoupon}' applied (-৳ {discountAmount})
                  </p>
                )}
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-[#f0e4dd]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">৳ {subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>- ৳ {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery (Bangladesh)</span>
                  <span className="font-semibold text-neutral-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `৳ ${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-2 border-t border-[#f0e4dd]">
                  <span>Total Amount</span>
                  <span className="text-[#8c3b31]">৳ {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout(discountAmount, appliedCoupon || '');
                  onClose();
                }}
                className="w-full py-4 bg-neutral-900 text-white font-bold text-sm rounded-xl hover:bg-[#8c3b31] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-neutral-400 font-normal">
                🔒 Safe checkout with Cash on Delivery, bKash & Card options.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CartItem, ShippingAddress, PaymentMethod, Order } from '../types';
import { X, ShieldCheck, MapPin, Phone, CreditCard, Banknote, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  appliedCoupon: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  appliedCoupon,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    division: 'Dhaka',
    district: 'Dhaka',
    thanaArea: '',
    fullAddress: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shipping Fee calculation
  const isInsideDhaka = address.division === 'Dhaka';
  const calculatedShippingFee = subtotal >= 1500 ? 0 : isInsideDhaka ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + calculatedShippingFee);

  const divisions = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Rangpur',
    'Mymensingh',
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.fullAddress) {
      alert('Please fill out all required address fields.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !bkashTrxId) {
      alert(`Please enter your ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Transaction ID.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const placedOrder = await api.placeOrder({
        items: cartItems,
        shippingAddress: address,
        subtotal,
        shippingFee: calculatedShippingFee,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        trxId: bkashTrxId || undefined
      });

      setIsSubmitting(false);
      onOrderPlaced(placedOrder);
    } catch (err: any) {
      setIsSubmitting(false);
      alert(err.message || 'Failed to place order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#ebdcd5] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-2xl font-bold text-neutral-900">ZEDBEAUTY Checkout</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f8e5e5] text-[#8c3b31] font-semibold">
              Bangladesh Shipping
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-[#faf6f0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Address & Payment Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Customer Info Section */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ebdcd5] space-y-4">
                <h3 className="font-serif-display text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8c3b31]" />
                  <span>1. Delivery Address in Bangladesh</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs focus:ring-1 focus:ring-[#8c3b31]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Phone Number (+880) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs focus:ring-1 focus:ring-[#8c3b31]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. nusrat@gmail.com"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Division *
                    </label>
                    <select
                      value={address.division}
                      onChange={(e) => setAddress({ ...address, division: e.target.value, district: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      {divisions.map((d) => (
                        <option key={d} value={d}>
                          {d} Division
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      District / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka / Chittagong / Sylhet"
                      value={address.district}
                      onChange={(e) => setAddress({ ...address, district: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Area / Thana / Upazila
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi / Banani / Panchlaish"
                      value={address.thanaArea}
                      onChange={(e) => setAddress({ ...address, thanaArea: e.target.value })}
                      className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Full Street Address (House No, Road No, Flat) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. House 14, Road 5, Block B, Dhanmondi, Dhaka"
                    value={address.fullAddress}
                    onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                    className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Delivery Instructions / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leave package with security guard"
                    value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Payment Option Selection */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ebdcd5] space-y-4">
                <h3 className="font-serif-display text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-[#8c3b31]" />
                  <span>2. Payment Option</span>
                </h3>

                <div className="space-y-2">
                  
                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#8c3b31] bg-[#f8e5e5]/40' : 'border-[#ebdcd5] bg-[#faf6f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#8c3b31]"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">Cash on Delivery (COD)</span>
                        <span className="text-[10px] text-neutral-500">Pay cash directly to courier upon delivery</span>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-neutral-700" />
                  </label>

                  {/* bKash Mobile Banking */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'bkash' ? 'border-[#8c3b31] bg-[#f8e5e5]/40' : 'border-[#ebdcd5] bg-[#faf6f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-[#8c3b31]"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">bKash Mobile Banking</span>
                        <span className="text-[10px] text-neutral-500">Send money to 01700000000 & enter TrxID</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-pink-600 text-white font-extrabold text-[10px] rounded">bKash</span>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'nagad' ? 'border-[#8c3b31] bg-[#f8e5e5]/40' : 'border-[#ebdcd5] bg-[#faf6f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'nagad'}
                        onChange={() => setPaymentMethod('nagad')}
                        className="accent-[#8c3b31]"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">Nagad / Rocket</span>
                        <span className="text-[10px] text-neutral-500">Instant merchant payment</span>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-orange-600" />
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-[#8c3b31] bg-[#f8e5e5]/40' : 'border-[#ebdcd5] bg-[#faf6f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#8c3b31]"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">Credit / Debit Card</span>
                        <span className="text-[10px] text-neutral-500">Visa, Mastercard, AMEX</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-neutral-700" />
                  </label>

                </div>

                {/* bKash / Nagad Transaction ID Input */}
                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <div className="p-3 bg-[#f8e5e5]/60 rounded-xl border border-[#ebdcd5] space-y-2 animate-fadeIn">
                    <p className="text-[11px] text-[#8c3b31] font-semibold">
                      Please send ৳ {grandTotal.toLocaleString()} to Merchant Number: <strong>01700-000000</strong> via {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} app.
                    </p>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Enter Transaction ID (e.g. TRX982731)"
                        value={bkashTrxId}
                        onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                        className="w-full p-2.5 bg-white border border-[#ebdcd5] rounded-xl text-xs uppercase font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Order Summary (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ebdcd5] space-y-4">
                <h3 className="font-serif-display text-lg font-bold text-neutral-900">
                  Order Summary
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#ebdcd5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-900 truncate">{item.product.name}</h4>
                        <p className="text-neutral-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-neutral-900">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-[#f0e4dd] space-y-2 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-900">৳ {subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount ({appliedCoupon})</span>
                      <span>- ৳ {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                    <span className="font-bold text-neutral-900">
                      {calculatedShippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `৳ ${calculatedShippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-3 border-t border-[#f0e4dd]">
                    <span>Grand Total</span>
                    <span className="text-[#8c3b31]">৳ {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#8c3b31] text-white text-sm font-bold rounded-xl hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (৳ {grandTotal.toLocaleString()})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-1">
                  <span className="text-[10px] text-neutral-400 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Guaranteed 100% Authentic Products
                  </span>
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

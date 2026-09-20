import React, { useState } from 'react';
import { Ticket, Plus, Trash2, CheckCircle2, XCircle, Search, Sparkles, X } from 'lucide-react';
import { Coupon } from '../../types';
import { api } from '../../services/api';

interface AdminCouponsProps {
  coupons: Coupon[];
  onRefreshCoupons: () => void;
  showToast: (msg: string, type?: any) => void;
}

export const AdminCoupons: React.FC<AdminCouponsProps> = ({
  coupons,
  onRefreshCoupons,
  showToast
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number | ''>(10);
  const [minPurchase, setMinPurchase] = useState<number | ''>(1000);
  const [usageLimit, setUsageLimit] = useState<number | ''>(100);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [loading, setLoading] = useState(false);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createCoupon({
        code,
        discountType,
        discountValue: Number(discountValue) || 0,
        minPurchase: Number(minPurchase) || 0,
        usageLimit: usageLimit ? Number(usageLimit) : undefined,
        expiryDate,
        isActive: true
      });

      showToast(`Promo Coupon "${code.toUpperCase()}" created successfully!`);
      setIsModalOpen(false);
      setCode('');
      onRefreshCoupons();
    } catch (err: any) {
      showToast(err.message || 'Failed to create coupon', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (id: string, couponCode: string) => {
    if (confirm(`Are you sure you want to delete coupon code "${couponCode}"?`)) {
      try {
        await api.deleteCoupon(id);
        showToast(`Coupon ${couponCode} deleted`);
        onRefreshCoupons();
      } catch (err: any) {
        showToast(err.message || 'Failed to delete coupon', 'info');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#d4af37]" />
            <span>Discount & Promo Coupons ({coupons.length})</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Create custom coupon codes, set percentage or fixed BDT discounts, and manage promotional campaigns.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-gradient-to-r from-[#8c3b31] to-[#b34d40] hover:from-[#a84438] hover:to-[#c65648] text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg relative flex flex-col justify-between group hover:border-[#8c3b31] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#8c3b31] to-[#632720] text-[#f3d0d7] font-mono font-bold text-sm tracking-widest border border-[#f3d0d7]/20 shadow-md">
                  {coupon.code}
                </span>

                <button
                  onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="font-serif-display text-2xl font-bold text-white">
                  {coupon.discountType === 'percentage' ? (
                    <span>{coupon.discountValue}% OFF</span>
                  ) : (
                    <span>৳ {coupon.discountValue} OFF</span>
                  )}
                </div>

                <p className="text-xs text-neutral-400">
                  Min Order Amount:{' '}
                  <span className="font-bold text-white">
                    ৳ {coupon.minPurchase.toLocaleString()}
                  </span>
                </p>

                <p className="text-xs text-neutral-400">
                  Total Uses:{' '}
                  <span className="font-bold text-white">
                    {coupon.usageCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ''} times
                  </span>
                </p>

                <p className="text-xs text-neutral-400">
                  Expires On:{' '}
                  <span className="font-bold text-neutral-300">
                    {new Date(coupon.expiryDate).toLocaleDateString('en-GB')}
                  </span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#312325] flex items-center justify-between text-[11px]">
              <span
                className={`font-bold flex items-center gap-1 ${
                  coupon.isActive ? 'text-emerald-400' : 'text-neutral-500'
                }`}
              >
                {coupon.isActive ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Promo Code</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Inactive</span>
                  </>
                )}
              </span>

              <span className="text-neutral-500 font-mono text-[10px]">{coupon.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Create Coupon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#211a1c] border border-[#4a3436] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#312325] flex items-center justify-between">
              <h3 className="font-serif-display text-lg font-bold text-white">
                Create Promo Coupon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. KBEAUTY10 or ZED200"
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs font-mono font-bold text-[#d4af37] focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31] cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder={discountType === 'percentage' ? '10' : '100'}
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Minimum Order Purchase (৳ BDT)
                </label>
                <input
                  type="number"
                  value={minPurchase}
                  onChange={(e) => setMinPurchase(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1000"
                  className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Max Usage Limit
                  </label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="100"
                    className="w-full px-4 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#312325] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Save Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

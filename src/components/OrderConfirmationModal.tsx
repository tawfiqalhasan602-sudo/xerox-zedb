import React from 'react';
import { Order } from '../types';
import { CheckCircle, Truck, Printer, ShoppingBag, MapPin, Calendar, FileText } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 p-6 sm:p-8 space-y-6">
        
        {/* Success Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold tracking-widest text-[#a85d52] uppercase">
            THANK YOU FOR YOUR ORDER!
          </span>

          <h2 className="font-serif-display text-3xl font-bold text-neutral-900">
            Order Confirmed #{order.id}
          </h2>

          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            We have received your order! A confirmation SMS and email have been sent to <strong>{order.shippingAddress.phone}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#faf6f0] p-5 rounded-2xl border border-[#ebdcd5] space-y-4 text-xs">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-3 border-b border-[#ebdcd5] text-neutral-600">
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400">Order ID</span>
              <span className="font-bold text-neutral-900">{order.id}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400">Date</span>
              <span className="font-bold text-neutral-900">{order.date}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400">Estimated Delivery</span>
              <span className="font-bold text-[#8c3b31]">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
              Shipping Address
            </span>
            <p className="font-bold text-neutral-900">{order.shippingAddress.fullName}</p>
            <p className="text-neutral-600">{order.shippingAddress.fullAddress}, {order.shippingAddress.district}, {order.shippingAddress.division}</p>
            <p className="text-neutral-600">Phone: {order.shippingAddress.phone}</p>
          </div>

          {/* Items Summary Table */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-neutral-400 mb-2">
              Purchased Beauty Products
            </span>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <span className="text-neutral-800 font-medium truncate max-w-xs">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-bold text-neutral-900">
                    ৳ {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="pt-3 border-t border-[#ebdcd5] space-y-1">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>৳ {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount</span>
                <span>- ৳ {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `৳ ${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-[#ebdcd5]">
              <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
              <span className="text-[#8c3b31]">৳ {order.total.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handlePrintInvoice}
            className="flex-1 py-3 px-4 bg-white border border-[#ebdcd5] text-neutral-900 text-xs font-bold rounded-xl hover:bg-[#faf6f0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-neutral-600" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-[#8c3b31] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

      </div>
    </div>
  );
};

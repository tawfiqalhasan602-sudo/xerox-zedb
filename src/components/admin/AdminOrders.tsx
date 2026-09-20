import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Printer,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  showToast: (msg: string, type?: any) => void;
  selectedOrderFromDashboard?: Order | null;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  orders,
  onUpdateOrderStatus,
  showToast,
  selectedOrderFromDashboard = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(selectedOrderFromDashboard);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress.phone.includes(searchTerm) ||
      o.shippingAddress.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      case 'Confirmed':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/50';
      case 'Processing':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/50';
      case 'Shipped':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50';
      case 'Delivered':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
      case 'Cancelled':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
    showToast(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
            <span>Customer Orders ({orders.length})</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Fulfill store orders, verify delivery addresses, payment details, and update status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-semibold">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-[#171315] border border-[#3d2b2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#8c3b31] cursor-pointer"
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID, customer name, phone or district..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#211a1c] border border-[#3d2b2d] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#8c3b31]"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#171315] text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-[#312325]">
              <tr>
                <th className="px-5 py-4">Order ID & Date</th>
                <th className="px-5 py-4">Customer Contact</th>
                <th className="px-5 py-4">Delivery Location</th>
                <th className="px-5 py-4">Items & Price</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4">Order Status</th>
                <th className="px-5 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2023]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-500">
                    No orders matching your filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  return (
                    <tr key={order.id} className="hover:bg-[#282022] transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-white">
                        {order.id}
                        <span className="block text-[10px] text-neutral-500 font-sans font-normal">
                          {new Date(order.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-white block">
                          {order.shippingAddress.fullName}
                        </span>
                        <span className="text-[11px] text-neutral-400 block">
                          {order.shippingAddress.phone}
                        </span>
                        {order.shippingAddress.email && (
                          <span className="text-[10px] text-neutral-500 block">
                            {order.shippingAddress.email}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold text-neutral-200 block">
                          {order.shippingAddress.district}, {order.shippingAddress.division}
                        </span>
                        <span className="text-[11px] text-neutral-400 line-clamp-1 max-w-[180px]">
                          {order.shippingAddress.fullAddress}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-extrabold text-[#d4af37] block">
                          ৳ {order.total.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-400 block">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} Items
                        </span>
                      </td>

                      <td className="px-5 py-4 uppercase text-[10px] font-bold">
                        <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-200 block w-fit">
                          {order.paymentMethod}
                        </span>
                        {order.trxId && (
                          <span className="text-[10px] text-[#d4af37] font-mono block mt-1">
                            Trx: {order.trxId}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none ${getStatusBadgeClass(
                            order.orderStatus
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#8c3b31] text-neutral-200 hover:text-white transition-colors cursor-pointer text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Invoice</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Order Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn print:p-0 print:bg-white">
          <div className="bg-[#211a1c] border border-[#4a3436] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#312325] flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif-display text-lg font-bold text-white">
                  Invoice & Order #{selectedOrder.id}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintInvoice}
                  className="px-3.5 py-1.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs print:text-black print:p-8 print:bg-white">
              {/* Invoice Top Brand Header */}
              <div className="flex justify-between items-start border-b border-[#3d2b2d] print:border-gray-300 pb-4">
                <div>
                  <h1 className="font-serif-display text-2xl font-bold text-white print:text-black">
                    ZEDBEAUTY
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold print:text-gray-600">
                    Luxury Skincare Order Receipt
                  </p>
                  <p className="text-[11px] text-neutral-400 print:text-gray-600 mt-1">
                    Gulshan Avenue, Dhaka, Bangladesh | +880 1700-000000
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-white print:text-black block">
                    {selectedOrder.id}
                  </span>
                  <span className="text-[11px] text-neutral-400 print:text-gray-600 block">
                    Date: {new Date(selectedOrder.date).toLocaleDateString('en-GB')}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1.5 ${getStatusBadgeClass(
                      selectedOrder.orderStatus
                    )}`}
                  >
                    Status: {selectedOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-2 gap-6 bg-[#171315] print:bg-gray-50 p-4 rounded-2xl border border-[#312325] print:border-gray-200">
                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[10px] mb-2 text-[#d4af37]">
                    Customer Information
                  </h4>
                  <p className="font-bold text-neutral-200 print:text-black">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p className="text-neutral-400 print:text-gray-700 flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3 text-neutral-500" />
                    <span>{selectedOrder.shippingAddress.phone}</span>
                  </p>
                  {selectedOrder.shippingAddress.email && (
                    <p className="text-neutral-400 print:text-gray-700 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-neutral-500" />
                      <span>{selectedOrder.shippingAddress.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[10px] mb-2 text-[#d4af37]">
                    Delivery Shipping Address
                  </h4>
                  <p className="text-neutral-300 print:text-gray-800 leading-relaxed">
                    {selectedOrder.shippingAddress.fullAddress}
                  </p>
                  <p className="text-neutral-400 print:text-gray-600 mt-1">
                    {selectedOrder.shippingAddress.thanaArea},{' '}
                    {selectedOrder.shippingAddress.district},{' '}
                    {selectedOrder.shippingAddress.division}
                  </p>
                  {selectedOrder.shippingAddress.notes && (
                    <p className="text-amber-400 print:text-amber-700 mt-1 italic">
                      Note: {selectedOrder.shippingAddress.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items List */}
              <div>
                <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[10px] mb-3">
                  Ordered Skincare Items
                </h4>
                <div className="border border-[#3d2b2d] print:border-gray-300 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#171315] print:bg-gray-100 text-neutral-400 print:text-gray-700 uppercase tracking-wider text-[10px] border-b border-[#312325]">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2023] print:divide-gray-200">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-white print:text-black flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt=""
                              className="w-8 h-8 rounded object-contain bg-white p-0.5 print:hidden"
                            />
                            <span>{item.product.name}</span>
                          </td>
                          <td className="p-3 text-center font-bold text-neutral-300 print:text-black">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right text-neutral-400 print:text-black">
                            ৳ {item.product.price.toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-bold text-[#d4af37] print:text-black">
                            ৳ {(item.product.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary Calculation */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-2 bg-[#171315] print:bg-gray-50 p-4 rounded-2xl border border-[#312325] print:border-gray-200">
                  <div className="flex justify-between text-neutral-400 print:text-gray-700">
                    <span>Items Subtotal:</span>
                    <span>৳ {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-400 print:text-gray-700">
                    <span>Delivery Fee:</span>
                    <span>৳ {selectedOrder.shippingFee.toLocaleString()}</span>
                  </div>

                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 print:text-emerald-700">
                      <span>Promo Discount:</span>
                      <span>-৳ {selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-extrabold text-white print:text-black pt-2 border-t border-[#312325]">
                    <span>Grand Total:</span>
                    <span className="text-[#d4af37] print:text-black">
                      ৳ {selectedOrder.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-[10px] text-neutral-400 print:text-gray-600 pt-1 text-right uppercase font-bold">
                    Method: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 text-[10px] text-neutral-500 print:text-gray-500">
                Thank you for shopping with ZEDBEAUTY Luxury Skincare.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

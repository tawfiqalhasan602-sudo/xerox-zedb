import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Product, Order, Customer } from '../../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  onNavigateTab: (tab: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onViewOrderDetails: (order: Order) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  customers,
  onNavigateTab,
  onUpdateOrderStatus,
  onViewOrderDetails
}) => {
  // Key Metrics
  const totalRevenue = orders.reduce(
    (sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.total : sum),
    0
  );
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending');
  const lowStockProducts = products.filter(
    (p) => (p.stockQuantity ?? 50) <= 10 || p.stockStatus === 'Low Stock' || p.stockStatus === 'Out of Stock'
  );

  // Recent 5 Orders
  const recentOrders = [...orders].slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Sales */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#8c3b31] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-[#8c3b31]/20 text-[#d4af37] border border-[#8c3b31]/40">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white mb-1">
            ৳ {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Lifetime Gross Sales</span>
          </div>
        </div>

        {/* Metric 2: Orders */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#8c3b31] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="p-2.5 rounded-xl bg-blue-950/50 text-blue-400 border border-blue-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white mb-1">
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingOrders.length} Pending Orders Need Action</span>
          </div>
        </div>

        {/* Metric 3: Active Products */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#8c3b31] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Catalog Items
            </span>
            <div className="p-2.5 rounded-xl bg-purple-950/50 text-purple-400 border border-purple-500/30">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white mb-1">
            {products.length} Products
          </div>
          <div className="text-[11px] text-rose-400 flex items-center gap-1 font-semibold">
            {lowStockProducts.length > 0 && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{lowStockProducts.length} Items Low / Out of Stock</span>
          </div>
        </div>

        {/* Metric 4: Total Customers */}
        <div className="bg-[#211a1c] border border-[#3d2b2d] p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#8c3b31] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Customers
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white mb-1">
            {customers.length}
          </div>
          <div className="text-[11px] text-neutral-400 font-semibold">
            Verified Customer Profiles
          </div>
        </div>
      </div>

      {/* Action Quick Shortcuts */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-serif-display">
            Quick Actions & Management
          </h3>
          <p className="text-xs text-neutral-400">
            Rapid access to catalog additions, pending order fulfillment, and discount rules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigateTab('products')}
            className="px-4 py-2.5 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-all border border-neutral-700 flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>View Pending Orders ({pendingOrders.length})</span>
          </button>

          <button
            onClick={() => onNavigateTab('coupons')}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-all border border-neutral-700 flex items-center gap-2 cursor-pointer"
          >
            <span>Coupons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Orders Table & Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Orders Table */}
        <div className="lg:col-span-8 bg-[#211a1c] border border-[#3d2b2d] rounded-2xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#312325] flex items-center justify-between">
            <div>
              <h3 className="font-serif-display text-lg font-bold text-white">Recent Orders</h3>
              <p className="text-xs text-neutral-400">Latest customer transactions</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-[#d4af37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-[#171315] text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-[#312325]">
                <tr>
                  <th className="px-5 py-3.5">Order ID</th>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Payment</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2023]">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-neutral-500">
                      No orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    return (
                      <tr key={order.id} className="hover:bg-[#282022] transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-white">
                          {order.id}
                          <span className="block text-[10px] text-neutral-500 font-sans font-normal">
                            {new Date(order.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-bold text-white block">
                            {order.shippingAddress.fullName}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {order.shippingAddress.phone}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-bold text-[#d4af37]">
                          ৳ {order.total.toLocaleString()}
                        </td>
                        <td className="px-5 py-4 uppercase text-[10px] font-bold">
                          <span className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none ${
                              order.orderStatus === 'Pending'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                                : order.orderStatus === 'Confirmed'
                                ? 'bg-blue-950/80 text-blue-300 border-blue-500/50'
                                : order.orderStatus === 'Delivered'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                                : order.orderStatus === 'Cancelled'
                                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                                : 'bg-purple-950/80 text-purple-300 border-purple-500/50'
                            }`}
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
                            onClick={() => onViewOrderDetails(order)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-[#8c3b31] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                            title="Inspect Order Invoice"
                          >
                            <Eye className="w-4 h-4" />
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

        {/* Right Column: Inventory & Product Stock Monitor */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#312325]">
              <h3 className="font-serif-display text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Inventory Alerts</span>
              </h3>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-[11px] text-[#d4af37] font-bold hover:underline cursor-pointer"
              >
                Manage Stock
              </button>
            </div>

            <div className="space-y-3">
              {products.map((product) => {
                const stock = product.stockQuantity ?? 50;
                const isLow = stock <= 10;
                return (
                  <div
                    key={product.id}
                    className="p-3 rounded-xl bg-[#171315] border border-[#2e2325] flex items-center justify-between gap-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                      <p className="text-[11px] text-neutral-400">
                        Price: ৳ {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isLow
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {stock} Units
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2a1e20] to-[#1a1415] border border-[#4a2e30] p-6 rounded-2xl shadow-lg">
            <h4 className="font-serif-display font-bold text-sm text-[#d4af37] mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Store Sync</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              All storefront transactions, product price changes, and coupon creations update
              instantly on your live e-commerce platform.
            </p>
            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full py-2.5 bg-neutral-900 border border-neutral-700 text-white rounded-xl text-xs font-bold hover:border-[#8c3b31] transition-all cursor-pointer text-center"
            >
              Configure Store Delivery & Fees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

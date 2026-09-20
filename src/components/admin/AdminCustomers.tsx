import React, { useState } from 'react';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag, Eye, Calendar, Sparkles } from 'lucide-react';
import { Customer, Order } from '../../types';

interface AdminCustomersProps {
  customers: Customer[];
  orders: Order[];
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({ customers, orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    return (
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get orders associated with selected customer
  const customerOrders = selectedCustomer
    ? orders.filter(
        (o) =>
          o.shippingAddress.phone === selectedCustomer.phone ||
          (o.shippingAddress.email && o.shippingAddress.email === selectedCustomer.email)
      )
    : [];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211a1c] border border-[#3d2b2d] p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#d4af37]" />
            <span>Customer CRM Directory ({customers.length})</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Track customer contact profiles, delivery locations, order frequency, and lifetime spending value.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name, phone, email or address..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#211a1c] border border-[#3d2b2d] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#8c3b31]"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-[#211a1c] border border-[#3d2b2d] rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#171315] text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-[#312325]">
              <tr>
                <th className="px-5 py-4">Customer Name</th>
                <th className="px-5 py-4">Contact Phone & Email</th>
                <th className="px-5 py-4">Primary Address</th>
                <th className="px-5 py-4">Total Orders</th>
                <th className="px-5 py-4">Total Spent</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2023]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-neutral-500">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#282022] transition-colors">
                    <td className="px-5 py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8c3b31] to-[#42221f] text-[#d4af37] font-bold text-xs flex items-center justify-center border border-[#f3d0d7]/30">
                        {c.fullName.charAt(0)}
                      </div>
                      <div>
                        <span>{c.fullName}</span>
                        <span className="block text-[10px] text-neutral-500 font-mono font-normal">
                          {c.id}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-white font-semibold">
                        <Phone className="w-3 h-3 text-[#d4af37]" />
                        <span>{c.phone}</span>
                      </div>
                      {c.email && (
                        <div className="flex items-center gap-1 text-neutral-400 text-[11px] mt-0.5">
                          <Mail className="w-3 h-3 text-neutral-500" />
                          <span>{c.email}</span>
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-neutral-300 line-clamp-2 leading-relaxed">{c.address}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold">
                        {c.totalOrders} Orders
                      </span>
                    </td>

                    <td className="px-5 py-4 font-extrabold text-[#d4af37]">
                      ৳ {c.totalSpent.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#8c3b31] text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Order History</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#211a1c] border border-[#4a3436] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-[#312325] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8c3b31] text-[#d4af37] font-bold text-sm flex items-center justify-center">
                  {selectedCustomer.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-white">
                    {selectedCustomer.fullName}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Phone: {selectedCustomer.phone} | Total Spent: ৳ {selectedCustomer.totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Customer Order History ({customerOrders.length})
              </h4>

              {customerOrders.length === 0 ? (
                <p className="text-xs text-neutral-500 italic py-4">
                  No previous orders linked directly to this customer record.
                </p>
              ) : (
                customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-[#171315] border border-[#312325] space-y-2"
                  >
                    <div className="flex justify-between items-center font-mono text-xs text-white">
                      <span className="font-bold">{order.id}</span>
                      <span className="text-[#d4af37] font-extrabold">
                        ৳ {order.total.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-400 flex justify-between">
                      <span>
                        Date: {new Date(order.date).toLocaleDateString('en-GB')}
                      </span>
                      <span className="uppercase font-bold text-emerald-400">
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#2a2023] text-[11px] text-neutral-300">
                      {order.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{i.product.name} × {i.quantity}</span>
                          <span>৳ {i.product.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

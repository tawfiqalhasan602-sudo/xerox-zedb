import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Ticket,
  BarChart3,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';
import { removeAdminToken } from '../../services/api';

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onGoToStore: () => void;
  children: React.ReactNode;
  pendingOrdersCount?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  onGoToStore,
  children,
  pendingOrdersCount = 0
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons & Promo', icon: Ticket },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    removeAdminToken();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#161214] text-neutral-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-[#1f1a1c] border-b border-[#3d2b28] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8c3b31] to-[#3a1d19] border border-[#f3d0d7]/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div>
            <span className="font-serif-display font-bold text-base text-white block leading-none">
              ZEDBEAUTY
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#d4af37]">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToStore}
            className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
            title="View Storefront"
          >
            <Store className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-[#8c3b31] text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden animate-fadeIn"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1c1719] border-r border-[#312325] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#312325] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8c3b31] to-[#45201c] border border-[#f3d0d7]/30 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h1 className="font-serif-display font-bold text-lg text-white leading-tight">
                  ZEDBEAUTY
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  Luxury Admin
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Management Modules
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8c3b31] to-[#6d2c23] text-white shadow-lg border border-[#f3d0d7]/20'
                      : 'text-neutral-400 hover:bg-[#282022] hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#f3d0d7]' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge) && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#312325] space-y-2 bg-[#171315]">
          <button
            onClick={onGoToStore}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-[#8c3b31] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-[#d4af37]" />
              <span>View Storefront</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          </button>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Admin</span>
          </button>

          <div className="pt-2 px-1 text-[10px] text-neutral-500 text-center">
            ZEDBEAUTY Enterprise v2.4
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#161214] min-h-screen flex flex-col">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-[#1c1719]/80 backdrop-blur-md border-b border-[#312325] sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-bold font-serif-display text-white capitalize">
              {activeTab === 'dashboard' && 'Executive Overview'}
              {activeTab === 'products' && 'Product Inventory Catalog'}
              {activeTab === 'orders' && 'Order Fulfillment Management'}
              {activeTab === 'customers' && 'Customer CRM Directory'}
              {activeTab === 'coupons' && 'Promotions & Discount Codes'}
              {activeTab === 'analytics' && 'Revenue & Sales Analytics'}
              {activeTab === 'settings' && 'Storefront & Admin Settings'}
            </h2>
            <p className="text-xs text-neutral-400">
              Logged in as <span className="text-[#d4af37] font-semibold">admin@zedbeauty.com</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {pendingOrdersCount > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold animate-pulse">
                <Bell className="w-3.5 h-3.5 text-red-400" />
                <span>{pendingOrdersCount} Pending Orders Need Action</span>
              </div>
            )}

            <button
              onClick={onGoToStore}
              className="px-4 py-2 bg-[#8c3b31] hover:bg-[#a84438] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Visit Store</span>
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
};

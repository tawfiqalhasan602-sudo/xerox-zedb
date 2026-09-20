import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCoupons } from './AdminCoupons';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { api, getAdminToken } from '../../services/api';
import { Product, Order, Customer, Coupon, SiteSettings, OrderStatus } from '../../types';

interface AdminMasterProps {
  onReturnToStorefront: () => void;
  showToast: (msg: string, type?: any) => void;
}

export const AdminMaster: React.FC<AdminMasterProps> = ({
  onReturnToStorefront,
  showToast
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Store data state
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    storeName: 'ZEDBEAUTY',
    announcementText: '✨ 100% Original Korean Skincare — Fast Shipping Across Bangladesh | Free Shipping Over ৳ 1,500!',
    supportPhone: '+880 1700-000000',
    supportEmail: 'support@zedbeauty.com',
    address: 'Gulshan Avenue, Dhaka, Bangladesh',
    insideDhakaFee: 60,
    outsideDhakaFee: 120,
    freeShippingThreshold: 1500
  });

  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const token = getAdminToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const isValid = await api.verifyAdmin();
    setIsAuthenticated(isValid);
    if (isValid) {
      loadAllAdminData();
    }
  };

  const loadAllAdminData = async () => {
    try {
      const [prods, ords, custs, cpns, stgs] = await Promise.all([
        api.getProducts().catch(() => []),
        api.getOrders().catch(() => []),
        api.getCustomers().catch(() => []),
        api.getCoupons().catch(() => []),
        api.getSettings().catch(() => settings)
      ]);

      setProducts(prods);
      setOrders(ords);
      setCustomers(custs);
      setCoupons(cpns);
      if (stgs) setSettings(stgs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err: any) {
      showToast(err.message || 'Failed to update order status', 'info');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#161214] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#8c3b31] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={() => {
          setIsAuthenticated(true);
          loadAllAdminData();
          showToast('Welcome to ZEDBEAUTY Admin Portal!');
        }}
        onReturnToStore={onReturnToStorefront}
      />
    );
  }

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending').length;

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={() => {
        setIsAuthenticated(false);
        showToast('Logged out of admin panel', 'info');
      }}
      onGoToStore={onReturnToStorefront}
      pendingOrdersCount={pendingOrdersCount}
    >
      {activeTab === 'dashboard' && (
        <AdminDashboard
          products={products}
          orders={orders}
          customers={customers}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onViewOrderDetails={(order) => {
            setInspectingOrder(order);
            setActiveTab('orders');
          }}
        />
      )}

      {activeTab === 'products' && (
        <AdminProducts
          products={products}
          onRefreshProducts={loadAllAdminData}
          showToast={showToast}
        />
      )}

      {activeTab === 'orders' && (
        <AdminOrders
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          showToast={showToast}
          selectedOrderFromDashboard={inspectingOrder}
        />
      )}

      {activeTab === 'customers' && (
        <AdminCustomers customers={customers} orders={orders} />
      )}

      {activeTab === 'coupons' && (
        <AdminCoupons
          coupons={coupons}
          onRefreshCoupons={loadAllAdminData}
          showToast={showToast}
        />
      )}

      {activeTab === 'analytics' && (
        <AdminAnalytics orders={orders} products={products} />
      )}

      {activeTab === 'settings' && (
        <AdminSettings
          settings={settings}
          onRefreshSettings={loadAllAdminData}
          showToast={showToast}
        />
      )}
    </AdminLayout>
  );
};

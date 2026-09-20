import { Product, Order, Customer, Coupon, SiteSettings, AdminUser, SalesAnalytics } from '../types';

const API_BASE = '/api';

// Admin Auth Token helper
export function getAdminToken(): string | null {
  return sessionStorage.getItem('zed_admin_token') || localStorage.getItem('zed_admin_token');
}

export function setAdminToken(token: string) {
  sessionStorage.setItem('zed_admin_token', token);
  localStorage.setItem('zed_admin_token', token);
}

export function removeAdminToken() {
  sessionStorage.removeItem('zed_admin_token');
  localStorage.removeItem('zed_admin_token');
}

function authHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // --- AUTH ---
  async loginAdmin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    setAdminToken(data.token);
    return data;
  },

  async verifyAdmin(): Promise<boolean> {
    const token = getAdminToken();
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        headers: authHeaders()
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateAdminCredentials(newEmail?: string, newPassword?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/credentials`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ newEmail, newPassword })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update credentials');
    }
  },

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(productData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create product');
    }
    const data = await res.json();
    return data.product;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(productData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update product');
    }
    const data = await res.json();
    return data.product;
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete product');
    }
  },

  // --- IMAGE UPLOAD ---
  async uploadImage(imageBase64: string): Promise<string> {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ imageBase64 })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to upload image');
    }
    const data = await res.json();
    return data.url;
  },

  // --- ORDERS ---
  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async placeOrder(orderPayload: Partial<Order>): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to place order');
    }
    const data = await res.json();
    return data.order;
  },

  async updateOrderStatus(orderId: string, orderStatus: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ orderStatus })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update order status');
    }
    const data = await res.json();
    return data.order;
  },

  // --- CUSTOMERS ---
  async getCustomers(): Promise<Customer[]> {
    const res = await fetch(`${API_BASE}/customers`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },

  // --- COUPONS ---
  async getCoupons(): Promise<Coupon[]> {
    const res = await fetch(`${API_BASE}/coupons`);
    if (!res.ok) throw new Error('Failed to fetch coupons');
    return res.json();
  },

  async createCoupon(couponData: Partial<Coupon>): Promise<Coupon> {
    const res = await fetch(`${API_BASE}/coupons`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(couponData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create coupon');
    }
    const data = await res.json();
    return data.coupon;
  },

  async deleteCoupon(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/coupons/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete coupon');
  },

  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discountAmount: number; coupon: Coupon }> {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Invalid coupon code');
    }
    return res.json();
  },

  // --- SETTINGS ---
  async getSettings(): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch site settings');
    return res.json();
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update settings');
    }
    const data = await res.json();
    return data.settings;
  },

  // --- ANALYTICS ---
  async getAnalytics(): Promise<SalesAnalytics> {
    const res = await fetch(`${API_BASE}/analytics`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  }
};

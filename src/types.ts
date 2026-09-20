export interface Product {
  id: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number; // in ৳ BDT
  originalPrice?: number; // in ৳ BDT
  stockQuantity?: number;
  productStatus?: 'Active' | 'Draft' | 'Out of Stock';
  rating: number;
  reviewCount: number;
  category: 'Skincare' | 'Face Care' | 'Face Wash' | 'Hair Care' | 'Body Care' | 'Beauty Essentials' | string;
  image: string;
  gallery: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  benefits: string[];
  howToUse: string;
  ingredients: string;
  skinType?: string[];
  volume?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  location?: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  thanaArea: string;
  fullAddress: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  estimatedDelivery: string;
  trxId?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  usageCount: number;
  usageLimit?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: string;
}

export interface SiteSettings {
  storeName: string;
  announcementText: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  insideDhakaFee: number;
  outsideDhakaFee: number;
  freeShippingThreshold: number;
  // Exclusive K-Beauty Launch & Hero Banner Settings
  heroBadgeText?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroPrice?: number;
  heroOriginalPrice?: number;
  // Collection Banner Settings
  collectionBannerBadge?: string;
  collectionBannerTitle?: string;
  collectionBannerSubtitle?: string;
  collectionBannerImageUrl?: string;
  collectionBannerButtonText?: string;
  // Featured Categories
  categoryList?: CategoryItem[];
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token?: string;
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  pendingOrdersCount: number;
  deliveredOrdersCount: number;
  totalCustomers: number;
  dailySales: { date: string; amount: number; count: number }[];
  weeklySales: { week: string; amount: number; count: number }[];
  monthlySales: { month: string; amount: number; count: number }[];
  topProducts: { name: string; quantity: number; revenue: number }[];
}


import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, SiteSettings } from './types';
import { api } from './services/api';

// Admin Master Container
import { AdminMaster } from './components/admin/AdminMaster';

// Components
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { FeaturedProduct } from './components/FeaturedProduct';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CollectionBanner } from './components/CollectionBanner';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SkinRoutineModal } from './components/SkinRoutineModal';
import { AboutUsModal } from './components/AboutUsModal';
import { ContactModal } from './components/ContactModal';
import { AccountModal } from './components/AccountModal';
import { Toast } from './components/Toast';

export default function App() {
  // Routing State
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'store';
  });

  // Listen to browser popstate for /admin route
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname === '/admin' ? 'admin' : 'store');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    if (route === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Products loaded from API
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings | undefined>(undefined);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
        }
      })
      .catch(() => {});

    api
      .getSettings()
      .then((stgs) => {
        if (stgs) setSettings(stgs);
      })
      .catch(() => {});
  }, [currentRoute]);

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['cathy-doll-white-cushion-face-wash'])
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRoutineAIOpen, setIsRoutineAIOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' | 'info' } | null>(null);

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info' = 'cart') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Render Admin Route if on /admin
  if (currentRoute === 'admin') {
    return (
      <AdminMaster
        onReturnToStorefront={() => navigateTo('store')}
        showToast={showToast}
      />
    );
  }

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(`Added ${quantity}× "${product.name}" to cart!`, 'cart');
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [{ product, quantity }];
    });

    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from wishlist.`, 'wishlist');
      } else {
        next.add(product.id);
        showToast(`Saved "${product.name}" to wishlist!`, 'wishlist');
      }
      return next;
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  // Checkout and Order placement
  const handleProceedToCheckout = (discount: number, couponCode: string) => {
    setAppliedDiscount(discount);
    setAppliedCoupon(couponCode);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: Order) => {
    setConfirmedOrder(order);
    setPastOrders((prev) => [order, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredProduct = productsList[0] || PRODUCTS[0];
  const wishlistedProductsList = productsList.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f0] text-neutral-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onPromoClick={() => {
          setSelectedProductDetail(productsList[0] || PRODUCTS[0]);
        }}
      />

      {/* Header Navigation */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRoutineAI={() => setIsRoutineAIOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onCategorySelect={handleCategorySelect}
        activeCategory={selectedCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          settings={settings}
          onShopNow={() => handleCategorySelect('All')}
          onExploreCollection={() => handleCategorySelect('Skincare')}
        />

        {/* Featured Category Cards */}
        <FeaturedCategories
          settings={settings}
          onSelectCategory={handleCategorySelect}
        />

        {/* Best Sellers & Category Filter Grid */}
        <BestSellers
          products={productsList}
          wishlistIds={wishlistIds}
          onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setSelectedProductDetail(product)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Spotlight Featured Product */}
        {featuredProduct && (
          <FeaturedProduct
            product={featuredProduct}
            isWishlisted={wishlistIds.has(featuredProduct.id)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Why Choose ZEDBEAUTY Trust Badges */}
        <WhyChooseUs />

        {/* Beauty Collection Banner */}
        <CollectionBanner
          settings={settings}
          onShopCollection={() => handleCategorySelect('All')}
        />

        {/* Google / Gmail Login Section */}
        <Newsletter onOpenAccount={() => setIsAccountOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onCategorySelect={handleCategorySelect}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProductDetail ? wishlistIds.has(selectedProductDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
        allProducts={productsList}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProductsList}
        onRemoveFromWishlist={(p) => handleToggleWishlist(p, { stopPropagation: () => {} } as any)}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productsList}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountAmount={appliedDiscount}
        appliedCoupon={appliedCoupon}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <SkinRoutineModal
        isOpen={isRoutineAIOpen}
        onClose={() => setIsRoutineAIOpen(false)}
        products={productsList}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
      />

      <AboutUsModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        pastOrders={pastOrders}
      />

      {/* Floating Toast Notification */}
      <Toast message={toast?.message || null} type={toast?.type} />

    </div>
  );
}

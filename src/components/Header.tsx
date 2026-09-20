import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Sparkles, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenRoutineAI: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenRoutineAI,
  onOpenAccount,
  onOpenAbout,
  onOpenContact,
  onCategorySelect,
  activeCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: 'All' },
    { label: 'Cathy Doll Face Wash', value: 'Face Wash' },
    { label: 'Cleanser Benefits', value: 'Cleanser & Brightening' },
    { label: 'Made In Korea', value: 'Made In Korea' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf6f0]/90 backdrop-blur-md shadow-sm border-b border-[#f0e4dd]'
          : 'bg-[#faf6f0] border-b border-[#f3e6de]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-neutral-800 hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onCategorySelect('All')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-wider text-neutral-900 group-hover:text-[#a85d52] transition-colors">
                  ZEDBEAUTY
                </span>
                <span className="w-2 h-2 rounded-full bg-[#d4af37] inline-block animate-pulse"></span>
              </div>
              <p className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-medium">
                LUXURY SKINCARE • BD
              </p>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onCategorySelect(item.value)}
                className={`text-sm font-medium transition-all duration-200 cursor-pointer relative py-1 ${
                  activeCategory === item.value && item.value !== 'All'
                    ? 'text-[#a85d52] font-semibold'
                    : 'text-neutral-700 hover:text-[#a85d52]'
                }`}
              >
                {item.label}
                {activeCategory === item.value && item.value !== 'All' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a85d52] rounded-full"></span>
                )}
              </button>
            ))}
            
            <button
              onClick={onOpenAbout}
              className="text-sm font-medium text-neutral-700 hover:text-[#a85d52] transition-colors cursor-pointer"
            >
              About Us
            </button>
            
            <button
              onClick={onOpenContact}
              className="text-sm font-medium text-neutral-700 hover:text-[#a85d52] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* AI Skin Routine Finder */}
            <button
              onClick={onOpenRoutineAI}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f8e5e5] to-[#f3d0d7] text-[#8c3b31] border border-[#ebd0d0] hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b05d52]" />
              <span>Skin Routine AI</span>
            </button>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-700 hover:text-[#a85d52] rounded-full hover:bg-[#f3e6de]/50 transition-colors cursor-pointer"
              aria-label="Search"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={onOpenAccount}
              className="p-2 text-neutral-700 hover:text-[#a85d52] rounded-full hover:bg-[#f3e6de]/50 transition-colors cursor-pointer"
              aria-label="Account"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Heart Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-700 hover:text-[#a85d52] rounded-full hover:bg-[#f3e6de]/50 transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#a85d52] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="p-2.5 bg-neutral-900 text-white rounded-full hover:bg-[#8c3b31] transition-all relative flex items-center justify-center shadow-sm cursor-pointer hover:scale-[1.03]"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-neutral-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#faf6f0] border-b border-[#ebdcd5] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#eee0d8]">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onCategorySelect(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === item.value
                    ? 'bg-[#f3d0d7]/40 text-[#a85d52] font-semibold'
                    : 'text-neutral-800 hover:bg-[#f3e6de]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onOpenRoutineAI();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-semibold bg-[#f8e5e5] text-[#8c3b31]"
            >
              <Sparkles className="w-4 h-4 text-[#a85d52]" />
              <span>Personalized Skin Routine AI</span>
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-[#f3e6de]"
            >
              About ZEDBEAUTY
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-[#f3e6de]"
            >
              Contact Customer Care
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

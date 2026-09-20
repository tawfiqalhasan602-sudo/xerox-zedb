import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onCategorySelect: (category: string) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategorySelect, onOpenAbout, onOpenContact, onOpenAdmin }) => {
  return (
    <footer className="bg-[#1f1a1c] text-[#fbf4f0] pt-16 pb-12 border-t border-[#3a3134]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3a3134]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-3xl font-bold tracking-wider text-white">
                ZEDBEAUTY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            </div>

            <p className="text-xs text-[#d8c2b8] leading-relaxed max-w-sm font-normal">
              ZEDBEAUTY is Bangladesh’s premier destination for authentic skincare, cosmetics, and beauty care essentials. Curated to deliver natural glow and healthy, radiant skin.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2f272a] text-[#f8d4c1] hover:bg-[#8c3b31] hover:text-white transition-all flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2f272a] text-[#f8d4c1] hover:bg-[#8c3b31] hover:text-white transition-all flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2f272a] text-[#f8d4c1] hover:bg-[#8c3b31] hover:text-white transition-all flex items-center justify-center"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d8c2b8]">
              <li>
                <button onClick={() => onCategorySelect('All')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('Skincare')} className="hover:text-white transition-colors cursor-pointer">
                  Skincare Collection
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('Face Care')} className="hover:text-white transition-colors cursor-pointer">
                  Face Care & Cushions
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('Hair Care')} className="hover:text-white transition-colors cursor-pointer">
                  Haircare Treatments
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('Body Care')} className="hover:text-white transition-colors cursor-pointer">
                  Body Lotions & Butter
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  About ZEDBEAUTY
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-[#d4af37] hover:underline font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    🔐 Admin Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 tracking-wide uppercase text-xs">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d8c2b8]">
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); alert("Express delivery: 24-48 hrs inside Dhaka (৳ 60), 3-5 days outside Dhaka (৳ 120). Free on orders over ৳ 1,500!"); }} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => { e.preventDefault(); alert("Easy 7-day return policy for damaged or incorrect authentic items."); }} className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Your privacy and customer information are 100% encrypted and safe."); }} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Standard Bangladeshi e-commerce terms & conditions apply."); }} className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Help & Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#d8c2b8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e5b382] flex-shrink-0 mt-0.5" />
                <span>House 8/1, Road 2, Block D, Nazira Bazar, Dhaka-1100, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e5b382] flex-shrink-0" />
                <span>+880 1814-024099</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e5b382] flex-shrink-0" />
                <span>support@zedbeauty.com.bd</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-[#2f272a] rounded-full text-[10px] text-[#e5b382] font-semibold border border-[#3a3134]">
                  💳 Cash on Delivery • bKash • Nagad
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a08f88] gap-4">
          <p>
            Copyright © 2026 ZEDBEAUTY. All rights reserved. Crafted with care in Bangladesh.
          </p>

          <div className="flex items-center space-x-2 text-[11px]">
            <span>100% Authentic Beauty Guarantee</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Award, ShieldCheck, Truck, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Authentic Products',
      description: '100% genuine products sourced directly from authorized international brand distributors.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assured',
      description: 'Dermatologically tested, cruelty-free formulas checked for expiration and quality.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: '24-48 hour delivery inside Dhaka; 3-5 days across all 64 districts in Bangladesh.',
    },
    {
      icon: Lock,
      title: 'Secure Payment',
      description: 'Cash on Delivery (COD) available nationwide alongside bKash, Nagad & Card options.',
    },
  ];

  return (
    <section className="py-16 bg-[#faf6f0] border-y border-[#ebdcd5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-[#a85d52] uppercase block mb-2">
            THE ZEDBEAUTY PROMISE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-neutral-900">
            Why Choose ZEDBEAUTY
          </h2>
          <p className="text-neutral-600 text-sm mt-2">
            We prioritize your skin health, trust, and shopping convenience above all else.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#ebdcd5] hover:border-[#a85d52]/50 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="w-14 h-14 rounded-full bg-[#f8e5e5] text-[#8c3b31] flex items-center justify-center mb-5 group-hover:bg-[#8c3b31] group-hover:text-white transition-all transform group-hover:scale-110">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

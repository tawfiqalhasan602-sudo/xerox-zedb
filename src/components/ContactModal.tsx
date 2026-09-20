import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf6f0] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#ebdcd5] my-6 p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd5]">
          <div>
            <h2 className="font-serif-display text-2xl font-bold text-neutral-900">Contact Customer Care</h2>
            <p className="text-xs text-neutral-500">We are here to help you 7 days a week</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Contact Details */}
          <div className="space-y-4 text-xs text-neutral-700 bg-white p-5 rounded-2xl border border-[#ebdcd5]">
            <h3 className="font-bold text-neutral-900 text-sm uppercase">Dhaka Flagship Headquarters</h3>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#8c3b31] flex-shrink-0 mt-0.5" />
              <span>House 8/1, Road 2, Block D, Nazira Bazar, Dhaka-1100, Bangladesh</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8c3b31] flex-shrink-0" />
              <span>+880 1814-024099</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#8c3b31] flex-shrink-0" />
              <span>support@zedbeauty.com.bd</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#8c3b31] flex-shrink-0" />
              <span>Saturday - Thursday: 10:00 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-5 rounded-2xl border border-[#ebdcd5]">
            {sent ? (
              <div className="text-center py-8 space-y-2 text-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Message Received!</h4>
                <p className="text-xs text-neutral-600">Our customer care team will call or reply to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhana Siddique"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01700000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ask about product availability, order status, or skincare advice..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 bg-[#faf6f0] border border-[#ebdcd5] rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#8c3b31] text-white font-bold text-xs rounded-xl hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

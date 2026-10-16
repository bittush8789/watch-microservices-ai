import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Truck, RotateCcw, Award, Mail, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#060c1d] text-slate-300 border-t border-amber-500/20 pt-14 pb-8">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Truck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Free Express Delivery</p>
              <p className="text-[11px] text-slate-400">On all orders over ₹2,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">2-Year Neek Warranty</p>
              <p className="text-[11px] text-slate-400">Authentic international coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <RotateCcw className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">7-Day Easy Returns</p>
              <p className="text-[11px] text-slate-400">Hassle-free replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">100% Certified Genuine</p>
              <p className="text-[11px] text-slate-400">Direct from master watchmakers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Bio */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-['Cinzel',serif] text-xl font-bold tracking-wider text-amber-400 block leading-none">
                NEEK WATCHES
              </span>
              <span className="text-[9px] tracking-[0.25em] text-slate-400 uppercase font-semibold block mt-0.5">
                Precision & Prestige
              </span>
            </div>
          </Link>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Neek Watches crafts and curates premier horological masterpieces. From handcrafted automatic calibres and 18K gold chronographs to next-generation fitness smartwatches, every timepiece embodies enduring artistry.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-white mb-2">Subscribe to the Neek Collector&apos;s Gazette</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Welcome to the Neek Horological Society.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
            Collections
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products" className="hover:text-amber-300 transition-colors">
                All 15 Watches
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link to={`/products?category=${encodeURIComponent(cat)}`} className="hover:text-amber-300 transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products?filter=bestseller" className="hover:text-amber-300 transition-colors">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/products?filter=new" className="hover:text-amber-300 transition-colors">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/cart" className="hover:text-amber-300 transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-amber-300 transition-colors">
                My Saved Wishlist
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-amber-300 transition-colors">
                Order Status & Checkout
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-amber-300 transition-colors text-amber-300 font-semibold">
                Track Order Status (Live Timeline)
              </Link>
            </li>
            <li className="text-slate-400">
              International Delivery Info
            </li>
            <li className="text-slate-400">
              Watch Sizing & Strap Guide
            </li>
            <li className="text-slate-400">
              Service Center Locator
            </li>
          </ul>
        </div>

        {/* Legal & Assistance */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
            Contact & Support
          </h4>
          <div className="space-y-2 text-xs text-slate-400">
            <p><strong>Concierge:</strong> 1800-420-NEEK</p>
            <p><strong>Email:</strong> support@neekwatches.com</p>
            <p><strong>Atelier:</strong> New Delhi & Mumbai, India</p>
            <p><strong>Hours:</strong> Mon – Sat, 9:00 AM – 8:00 PM IST</p>
            <div className="pt-2 text-[11px] text-slate-500">
              Protected by 256-bit SSL Banking Grade Encryption
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Neek Watches Inc. All rights reserved. Indian Rupee (₹) Pricing.</p>
        <div className="flex items-center gap-4 text-xs">
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Terms of Sale</span>
          <span>·</span>
          <span>Warranty Policy</span>
        </div>
      </div>
    </footer>
  );
};

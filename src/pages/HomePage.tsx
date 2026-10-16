import React from 'react';
import { Link } from 'react-router-dom';
import { WATCH_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Compass,
  Flame,
  Star,
  CheckCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const trendingWatches = WATCH_PRODUCTS.filter((w) => w.isTrending).slice(0, 4);
  const bestSellers = WATCH_PRODUCTS.filter((w) => w.isBestSeller).slice(0, 4);
  const newArrivals = WATCH_PRODUCTS.filter((w) => w.isNewArrival).slice(0, 4);

  // Category showcase details
  const categoryHighlights = [
    {
      name: "Men's Watches",
      desc: 'Surgical steel, chronographs & rugged field watches',
      count: WATCH_PRODUCTS.filter((w) => w.category === "Men's Watches").length,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: "Women's Watches",
      desc: 'Delicate rose gold, mother-of-pearl & crystal accents',
      count: WATCH_PRODUCTS.filter((w) => w.category === "Women's Watches").length,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Smart Watches',
      desc: 'AMOLED displays, multi-day battery & health telemetry',
      count: WATCH_PRODUCTS.filter((w) => w.category === 'Smart Watches').length,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Luxury Watches',
      desc: 'Automatic skeleton calibres & 18K gold sovereign dials',
      count: WATCH_PRODUCTS.filter((w) => w.category === 'Luxury Watches').length,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* 1. Large Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#070e24] via-[#0b1739] to-[#040817] text-white py-16 md:py-24 border-b border-amber-500/20">
        {/* Subtle radial ambient light */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>The 2026 Sovereign Timepiece Collection</span>
              </div>

              <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Mastery in Every Second.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 mt-2">
                  Neek Watches.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Discover 15 exceptional timepieces sculpted with surgical-grade 316L steel, sapphire crystals, and exquisite Swiss and Japanese movements. Engineered for the discerning horologist.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  to="/products?category=Luxury%20Watches"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-200 border border-amber-500/30 font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore Luxury Series</span>
                </Link>
              </div>

              {/* Stat callouts */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-bold text-amber-400 font-['Cinzel',serif]">15</p>
                  <p className="text-xs text-slate-400">Unique Models</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-['Cinzel',serif]">100%</p>
                  <p className="text-xs text-slate-400">Certified Authentic</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400 font-['Cinzel',serif]">2 Years</p>
                  <p className="text-xs text-slate-400">Official Warranty</p>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-br from-amber-500/40 via-slate-800 to-slate-900 shadow-2xl">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
                    alt="Neek Golden Luxury Watch"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating card pill */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-amber-300">Featured Sovereign</p>
                      <p className="text-sm font-bold text-white">Premium Gold Automatic Watch</p>
                      <p className="text-xs text-slate-300">₹2,999 · 21-Jewel Skeleton</p>
                    </div>
                    <Link
                      to="/products/premium-gold-automatic-watch"
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Categories Showcase Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Curated Horology
            </h2>
            <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Shop by Category
            </h3>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 group"
          >
            <span>View All 15 Watches</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-950 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-amber-300">
                  {cat.count} Timepieces
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-amber-700 group-hover:text-amber-900">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Watches Section */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                <Flame className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span>Trending Now</span>
              </div>
              <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
                Most Popular Timepieces
              </h3>
            </div>
            <Link
              to="/products?filter=trending"
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>Explore All Trending</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingWatches.map((watch) => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Spotlight Promotional Banner */}
      <section className="py-16 bg-[#0a1128] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-slate-900/90 via-[#001f54]/70 to-slate-900/90 p-8 sm:p-12 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Special Limited Offer
              </span>
              <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
                Save an Extra 10% With Code <span className="text-amber-400">NEEK10</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Receive complimentary luxury presentation box, personalized certificate of origin, and 2-year international warranty with every watch ordered today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/products"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg"
              >
                Claim Discount
              </Link>
              <Link
                to="/cart"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Customer Top Rated</span>
            </div>
            <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
              Neek Best Sellers
            </h3>
          </div>
          <Link
            to="/products?filter=bestseller"
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((watch) => (
            <ProductCard key={watch.id} product={watch} />
          ))}
        </div>
      </section>

      {/* 6. New Arrivals Section */}
      <section className="py-14 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Fresh Horology</span>
              </div>
              <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
                New Arrivals
              </h3>
            </div>
            <Link
              to="/products?filter=new"
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>Explore All Releases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((watch) => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

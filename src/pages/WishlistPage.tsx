import React from 'react';
import { Link } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { WatchImage } from '../components/WatchImage';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, wishlistCount, toggleWishlist, moveToCartFromWishlist } = useCartWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200/90 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              You haven&apos;t saved any luxury timepieces to your wishlist yet. Tap the heart icon on any watch in our catalog to save it for later.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <span>Explore All 15 Watches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <h1 className="font-['Cinzel',serif] text-3xl font-bold text-slate-900">
              My Saved Wishlist
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              You have {wishlistCount} {wishlistCount === 1 ? 'watch' : 'watches'} bookmarked
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                  <Link to={`/products/${product.id}`} className="block w-full h-full">
                    <WatchImage product={product} className="w-full h-full" />
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-rose-500 shadow-md cursor-pointer transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-amber-800 uppercase text-[10px]">
                      {product.brand}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {product.rating}
                    </span>
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-slate-900 text-sm hover:text-amber-800 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-slate-950 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions: Move to Cart */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => moveToCartFromWishlist(product)}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Move to Cart</span>
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="block text-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

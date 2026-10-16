import React from 'react';
import { Link } from 'react-router-dom';
import { WatchProduct } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';
import { WatchImage } from './WatchImage';
import { Star, Heart, ShoppingBag, Eye, Zap, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: WatchProduct;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${
        featured ? 'ring-1 ring-amber-400/50' : ''
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <WatchImage
            product={product}
            className="w-full h-full"
            imageClassName="group-hover:scale-108 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges: Quiet typography tags & Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountPercentage > 0 && (
            <span className="bg-amber-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm tracking-wide">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-20 cursor-pointer shadow-md ${
            wishlisted
              ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Quick View Details Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-3 px-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <Link
            to={`/products/${product.id}`}
            className="pointer-events-auto bg-slate-900/90 hover:bg-slate-950 text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category quiet metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-amber-800 tracking-wide uppercase text-[11px]">
              {product.brand}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-xs font-bold border border-amber-200/60">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Pricing & Savings */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-950 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} with deal
            </p>
          </div>
        </div>

        {/* Action Buttons: Add to Cart and View Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add to Cart</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center transition-colors hover:text-slate-950"
            aria-label="View Details"
          >
            <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

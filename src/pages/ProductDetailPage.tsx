import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WATCH_PRODUCTS } from '../data/products';
import { useCartWishlist } from '../context/CartWishlistContext';
import { WatchImage } from '../components/WatchImage';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Share2,
  PenSquare,
  ThumbsUp,
} from 'lucide-react';
import { WriteReview, UserReview } from '../components/WriteReview';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);

  const product = WATCH_PRODUCTS.find((p) => p.id === id);

  const [userReviews, setUserReviews] = useState<UserReview[]>(() => {
    if (!product) return [];
    try {
      const saved = localStorage.getItem(`neek_watch_reviews_${product.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
          <Clock className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="font-['Cinzel',serif] text-2xl font-bold text-slate-900">
            Timepiece Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The requested watch model could not be located in our atelier catalog.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors hover:bg-amber-400"
          >
            Return to Watch Catalog
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  // Related products from same category, excluding current
  const relatedProducts = WATCH_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-slate-800">Watches</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-800">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
          
          {/* Left Column: Visual Showcase Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
              <WatchImage
                product={product}
                className="w-full h-full"
                showZoom={true}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.discountPercentage > 0 && (
                  <span className="bg-amber-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-slate-900/90 text-amber-300 font-semibold text-[11px] px-2.5 py-1 rounded-md shadow-md">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Share & Wishlist quick actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-all cursor-pointer"
                  title="Copy Link"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
                    wishlisted
                      ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white stroke-white' : ''}`} />
                </button>
              </div>

              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  Hover to inspect timepiece details
                </span>
              </div>
            </div>

            {copiedLink && (
              <p className="text-xs text-center text-emerald-600 font-medium animate-in fade-in">
                Link copied to clipboard!
              </p>
            )}

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <ShieldCheck className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">2-Year Warranty</p>
                <p className="text-[10px] text-slate-500">Official Atelier</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <Truck className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Free Express</p>
                <p className="text-[10px] text-slate-500">Fast insured delivery</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <RotateCcw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">7 Days Return</p>
                <p className="text-[10px] text-slate-500">Hassle-free guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Horology Info, Price, Quantity & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-800 font-bold uppercase tracking-wider text-xs">
                  {product.brand}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{product.category}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium italic mt-1">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <span className="text-xs font-bold text-amber-900">{product.rating}</span>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.reviewCount} verified horological ratings
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine
                </span>
              </div>

              {/* Pricing in Rupees */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      M.R.P.: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.discountPercentage}% off
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Inclusive of all taxes. Free delivery on this order.
                </p>
                <div className="text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Coupon NEEK10 applicable at checkout for extra savings!</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-xs">
                {product.inStock ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    In Stock ({product.stockCount} units available)
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">Temporarily Sold Out</span>
                )}
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">Ships within 24 hours</span>
              </div>

            </div>

            {/* Bottom Actions: Quantity Selector, Add to Cart & Buy Now */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              
              {/* Quantity row */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Total: ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                  <span>Buy Now</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Horological Details: Specs, Features & Reviews */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'features'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Master Features & Craft
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700 w-1/3">Calibre Movement</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.movement}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Case Diameter</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.caseDiameter}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Case Thickness</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.caseThickness}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Glass Crystal</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.glassMaterial}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Water Resistance Rating</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.waterResistance}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Strap / Bracelet Material</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.strapMaterial}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Strap Width</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.strapWidth}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Clasp Type</th>
                      <td className="py-3 px-4 text-slate-900">{product.specs.claspType}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Official Warranty</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold text-emerald-800">
                        {product.specs.warranty}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Horological Highlights</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Reviews Summary & CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto">
                    <div className="text-center sm:text-left">
                      <p className="text-4xl font-extrabold text-slate-900">{product.rating} / 5</p>
                      <div className="flex text-amber-500 my-1 justify-center sm:justify-start">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Based on {product.reviewCount + userReviews.length} customer ratings
                      </p>
                    </div>

                    <div className="w-full sm:w-60 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <span>5 Star</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[84%]" />
                        </div>
                        <span>84%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>4 Star</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-[12%]" />
                        </div>
                        <span>12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>3 Star</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-300 w-[4%]" />
                        </div>
                        <span>4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Write a Review Button */}
                  <button
                    onClick={() => setShowWriteReview(!showWriteReview)}
                    className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-98"
                  >
                    <PenSquare className="w-4 h-4" />
                    <span>{showWriteReview ? 'Hide Review Form' : 'Write a Customer Review'}</span>
                  </button>
                </div>

                {/* Write Review Form Component */}
                {showWriteReview && (
                  <WriteReview
                    product={product}
                    onReviewSubmitted={(newRev) => {
                      setUserReviews((prev) => [newRev, ...prev]);
                    }}
                    onCancel={() => setShowWriteReview(false)}
                  />
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {/* Newly Submitted Customer Reviews */}
                  {userReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/90 space-y-2.5 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                          <span className="text-slate-400">· {rev.location}</span>
                          {rev.verifiedBuyer && (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                              <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-[11px]">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="font-bold text-slate-900 text-xs">{rev.headline}</h5>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>

                      {rev.recommended && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold pt-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                          <span>Recommends this timepiece</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Seeded Verified Reviews */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Rajesh V. — Verified Buyer, Mumbai</span>
                      <span className="text-slate-400">2 days ago</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs">Remarkable case finishing</h5>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      &ldquo;Incredible craftsmanship. The dial finish and bracelet weight feel identical to luxury timepieces costing 4x more. Arrived in pristine condition within 48 hours.&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Ananya S. — Verified Buyer, Bangalore</span>
                      <span className="text-slate-400">1 week ago</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs">Pure sapphire clarity</h5>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      &ldquo;The sapphire crystal is crystal clear and completely scratch-resistant. Excellent presentation box and warranty papers. Highly recommended!&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Cinzel',serif] text-2xl font-bold text-slate-900">
                  You May Also Like
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complementary timepieces from the {product.category} collection
                </p>
              </div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <span>View More in {product.category}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

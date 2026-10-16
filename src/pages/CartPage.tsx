import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { WatchImage } from '../components/WatchImage';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    discountAmount,
    appliedPromo,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCartWishlist();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.message, error: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200/90 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto text-amber-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
              Your Neek Shopping Cart is Empty
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              Explore our master collection of 15 handcrafted timepieces and find the ideal watch for your wrist or collection.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All 15 Watches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/wishlist"
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
            >
              Check Saved Wishlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 999;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <h1 className="font-['Cinzel',serif] text-3xl font-bold text-slate-900">
              Shopping Cart
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        </div>

        {/* Free Shipping Alert Box */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
          <Truck className="w-6 h-6 text-amber-600 shrink-0" />
          <div className="flex-1 text-xs">
            {qualifiesForFreeShipping ? (
              <p className="text-emerald-700 font-bold">
                ✓ You qualified for Free Express Delivery across India!
              </p>
            ) : (
              <p className="text-slate-700">
                Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more to qualify for <strong>FREE Delivery</strong>!
              </p>
            )}
          </div>
        </div>

        {/* Main Grid: Cart Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Cart Items Table/List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/products/${product.id}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-950 shrink-0 shadow-inner group"
                  >
                    <WatchImage product={product} className="w-full h-full" />
                  </Link>

                  {/* Watch Info */}
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      {product.brand} · {product.category}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="block font-semibold text-slate-900 text-sm sm:text-base hover:text-amber-800 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {product.specs.movement} · {product.specs.caseDiameter}
                    </p>
                    <p className="text-xs text-emerald-700 font-medium">In Stock</p>

                    <div className="pt-1 flex items-baseline justify-center sm:justify-start gap-2">
                      <span className="text-base font-bold text-slate-950 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stockCount}
                        className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-bold text-xs cursor-pointer"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-extrabold text-slate-900 tabular-nums">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Guarantee Banner */}
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>2-Year Official Neek Atelier Warranty & 7-Day Replacement Guarantee</span>
              </div>
              <Link to="/products" className="text-amber-400 hover:underline font-semibold shrink-0 ml-2">
                Add more watches
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <h2 className="font-['Cinzel',serif] text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Promo Coupon Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Have a Promo Code?
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-600" />
                      <span className="font-bold">{appliedPromo}</span>
                      <span className="text-emerald-700">Applied</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove promo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NEEK10, GOLDEN"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-xs ${promoMessage.error ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
                <p className="text-[11px] text-slate-400">
                  Try coupon code <strong>NEEK10</strong> for 10% off or <strong>GOLDEN</strong> for royal savings.
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-semibold tabular-nums text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>GST / Taxes</span>
                  <span>Included in prices</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-950">
                  <span>Total Amount</span>
                  <span className="text-amber-800 text-xl tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <Link
                to="/products"
                className="block text-center text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

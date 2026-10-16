import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { CheckoutFormData, PlacedOrder } from '../types';
import { WatchImage } from '../components/WatchImage';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  QrCode,
  Banknote,
  Clock,
  Printer,
  ChevronRight,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartCount, subtotal, shippingFee, discountAmount, total, placeOrder } = useCartWishlist();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Abhishek Kumar',
    email: 'abhishekkumar526732@gmail.com',
    phone: '9876543210',
    streetAddress: 'Flat 402, Royal Horology Residency, MG Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'upi',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit PIN code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(formData);
      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 800);
  };

  // If order is placed, show confirmation screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in-50 duration-300">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold">
              Order Confirmed & Certified!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
              Thank you, {confirmedOrder.customerDetails.fullName}. Your handcrafted Neek timepiece order has been successfully placed into our dispatch queue.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-200 font-mono text-xs font-semibold tracking-wider">
              Order Reference ID: {confirmedOrder.orderId}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Delivery & Dispatch Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Estimated Delivery</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{confirmedOrder.estimatedDelivery}</p>
                <p className="text-emerald-700 font-medium">Free Express Insured Courier</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Shipping Address</p>
                <p className="font-semibold text-slate-800 mt-0.5">{confirmedOrder.customerDetails.streetAddress}</p>
                <p className="text-slate-600">
                  {confirmedOrder.customerDetails.city}, {confirmedOrder.customerDetails.state} - {confirmedOrder.customerDetails.pincode}
                </p>
                <p className="text-slate-500 mt-1">Phone: {confirmedOrder.customerDetails.phone}</p>
              </div>
            </div>

            {/* Itemized Order List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Items In This Order ({confirmedOrder.items.length})
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {confirmedOrder.items.map(({ product, quantity }) => (
                  <div key={product.id} className="p-3 sm:p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0">
                        <WatchImage product={product} className="w-full h-full" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{product.name}</p>
                        <p className="text-[11px] text-slate-500">{product.brand} · Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {confirmedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Savings</span>
                  <span className="tabular-nums">- ₹{confirmedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span>{confirmedOrder.shipping === 0 ? 'FREE' : `₹${confirmedOrder.shipping}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-slate-950 text-sm">
                <span>Amount Paid / Payable</span>
                <span className="text-amber-800 tabular-nums text-base">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Payment Mode: {confirmedOrder.customerDetails.paymentMethod.toUpperCase()} · Verified
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={`/track?id=${confirmedOrder.orderId}`}
                className="flex-1 py-3 px-4 bg-[#0a1128] hover:bg-[#001f54] text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md text-center"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Track Order Live Timeline</span>
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Order Receipt</span>
              </button>
              <Link
                to="/products"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md text-center"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect message
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="font-['Cinzel',serif] text-xl font-bold text-slate-900">
            No Items in Checkout
          </h2>
          <p className="text-xs text-slate-500">
            Your shopping cart is currently empty. Add at least one timepiece to proceed with checkout.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow"
          >
            Browse Watches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Breadcrumb & Title */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/cart" className="hover:text-slate-800">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Demo Checkout</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="font-['Cinzel',serif] text-3xl font-bold text-slate-900">
              Express Checkout
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Secure demo transaction · No real charges will occur
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold">256-Bit SSL Secured</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Delivery Address & Payment Method Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Customer & Delivery Address Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="font-['Cinzel',serif] text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Truck className="w-5 h-5 text-amber-600" />
                1. Delivery & Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Abhishek Kumar"
                    className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                      errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address (for Receipt) *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@domain.com"
                    className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                      errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="10-digit mobile number"
                    className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                      errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Delivery House / Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    placeholder="Flat number, building name, street..."
                    className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                      errors.streetAddress ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.streetAddress && <p className="text-[11px] text-rose-600 mt-1">{errors.streetAddress}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g. New Delhi"
                    className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                      errors.city ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                </div>

                {/* State & Pincode */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Delhi"
                      className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                        errors.state ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.state && <p className="text-[11px] text-rose-600 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="110001"
                      className={`w-full text-xs p-3 border rounded-xl focus:outline-none focus:border-amber-500 ${
                        errors.pincode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="font-['Cinzel',serif] text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-amber-600" />
                2. Select Payment Method
              </h2>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'upi'
                      ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => handleInputChange('paymentMethod', 'upi')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">Instant UPI & QR Code</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Fastest</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay via Google Pay, PhonePe, Paytm or UPI ID directly upon confirmation.
                    </p>
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => handleInputChange('paymentMethod', 'card')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">Credit / Debit Card</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Visa, Mastercard, RuPay & American Express accepted.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => handleInputChange('paymentMethod', 'cod')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash or UPI upon package inspection at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary Preview & Submit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5 sticky top-24">
              <h2 className="font-['Cinzel',serif] text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Order Review</span>
                <span className="text-xs font-sans text-slate-500 font-normal">{cartCount} timepieces</span>
              </h2>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded bg-slate-950 overflow-hidden shrink-0">
                        <WatchImage product={product} className="w-full h-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 line-clamp-1">{product.name}</p>
                        <p className="text-[11px] text-slate-400">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="tabular-nums">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-950">
                  <span>Grand Total</span>
                  <span className="text-amber-800 text-xl tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>Securing Order Details...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center space-y-2">
                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  Includes Official Neek Authenticity Certificate
                </p>
                <Link to="/cart" className="text-xs text-slate-500 hover:underline">
                  Modify cart items
                </Link>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

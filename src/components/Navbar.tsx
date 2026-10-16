import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { WATCH_PRODUCTS, CATEGORIES } from '../data/products';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Check,
  Truck,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount, wishlistCount, subtotal, orders } = useCartWishlist();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCat, setSelectedSearchCat] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered preview matches for instant dropdown
  const searchSuggestions = searchQuery.trim()
    ? WATCH_PRODUCTS.filter((w) => {
        const matchesQuery =
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedSearchCat === 'All' || w.category === selectedSearchCat;
        return matchesQuery && matchesCat;
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}${selectedSearchCat !== 'All' ? `&category=${encodeURIComponent(selectedSearchCat)}` : ''}`);
    } else {
      navigate('/products');
    }
  };

  const selectSuggestion = (productId: string) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a1128] text-white shadow-xl border-b border-amber-500/20">
      {/* Top Banner / Announcement bar */}
      <div className="bg-gradient-to-r from-[#001f54] via-[#0a1128] to-[#001f54] px-4 py-1.5 text-xs text-amber-200/90 font-medium border-b border-slate-800 flex items-center justify-center gap-4 text-center">
        <span>✨ Festive Horology Sale: Up to 45% Off + Free Express Shipping across India</span>
        <span className="hidden md:inline text-amber-400">· Use Code: <strong>NEEK10</strong> for Extra 10% Off</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 md:gap-6">
          
          {/* Logo & Delivery Location */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-['Cinzel',serif] text-xl md:text-2xl font-bold tracking-wider text-amber-400 block leading-none">
                  NEEK
                </span>
                <span className="text-[10px] tracking-[0.28em] text-slate-300 uppercase font-semibold block mt-0.5">
                  WATCHES
                </span>
              </div>
            </Link>

            {/* Amazon-style Deliver To Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer pl-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="leading-tight">
                <span className="text-[10px] text-slate-400 block">Deliver to</span>
                <span className="font-semibold text-slate-200">India 110001</span>
              </div>
            </div>
          </div>

          {/* Amazon-Style Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl mx-1 md:mx-4">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-lg overflow-hidden border border-amber-500/30 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/40 transition-all bg-white shadow-inner"
            >
              {/* Category selector dropdown */}
              <select
                value={selectedSearchCat}
                onChange={(e) => setSelectedSearchCat(e.target.value)}
                className="hidden sm:block bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-3 py-2.5 border-r border-slate-300 cursor-pointer focus:outline-none transition-colors"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Input field */}
              <input
                type="text"
                placeholder="Search luxury, analog, chronograph, smart watches..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full px-3.5 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none bg-transparent"
              />

              {/* Clear button if has query */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 flex items-center justify-center font-bold transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            {/* Live Search Instant Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in-50 duration-150">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500 flex justify-between">
                  <span>Watch Suggestions</span>
                  <span>Press Enter to view all</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectSuggestion(item.id)}
                      className="w-full px-3 py-2.5 text-left hover:bg-amber-50 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-700">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.brand} · {item.category}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSearchSubmit}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-center text-slate-700 block transition-colors border-t border-slate-200"
                >
                  View all results for &ldquo;{searchQuery}&rdquo;
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            
            {/* Account / Profile Dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    openAuthModal('login');
                  } else {
                    setAccountMenuOpen(!accountMenuOpen);
                  }
                }}
                className="flex items-center gap-1.5 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                aria-label="Account menu"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {isAuthenticated && user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <div className="hidden md:block text-left text-xs leading-tight">
                  <span className="text-[10px] text-slate-400 block truncate max-w-[110px]">
                    {isAuthenticated && user ? `Hello, ${user.name.split(' ')[0]}` : 'Hello, Sign In'}
                  </span>
                  <span className="font-semibold text-slate-200 flex items-center gap-0.5">
                    {isAuthenticated ? 'Account' : 'My Account'} <ChevronDown className="w-3 h-3" />
                  </span>
                </div>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 text-slate-200 text-sm animate-in fade-in-50 duration-150">
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-800">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 font-semibold">
                            Verified Member
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/wishlist"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-slate-800 transition-colors text-xs"
                        >
                          <span>Your Saved Wishlist</span>
                          <span className="text-amber-400 font-bold">{wishlistCount}</span>
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-slate-800 transition-colors text-xs"
                        >
                          <span>Active Shopping Cart</span>
                          <span className="text-amber-400 font-bold">{cartCount} items</span>
                        </Link>
                        <Link
                          to="/checkout"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-slate-800 transition-colors text-xs"
                        >
                          <span>Direct Express Checkout</span>
                        </Link>
                        <Link
                          to="/track"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-slate-800 transition-colors text-xs text-amber-300 font-semibold"
                        >
                          <span>Track Order Status</span>
                          <Truck className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="px-4 pt-2 pb-1 border-t border-slate-800 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full py-1.5 px-3 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 space-y-3 text-center">
                      <p className="text-xs text-slate-300">
                        Sign in to access your saved watches and synchronized shopping cart.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          openAuthModal('login');
                        }}
                        className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Sign In
                      </button>
                      <p className="text-[11px] text-slate-400">
                        New collector?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAccountMenuOpen(false);
                            openAuthModal('register');
                          }}
                          className="text-amber-400 hover:underline font-semibold cursor-pointer"
                        >
                          Create Account
                        </button>
                      </p>
                    </div>
                  )}

                  <div className="px-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>2-Year Authentic Warranty Guarantee</span>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-400/30' : 'text-slate-300'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md animate-scale">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon with Subtotal */}
            <Link
              to="/cart"
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors group"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-5 h-5 bg-amber-500 text-slate-950 rounded-full text-[11px] font-black flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <span className="text-[10px] text-slate-400 block">Cart</span>
                <span className="font-bold text-amber-300 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Secondary Category Subnav Bar */}
      <nav className="bg-[#001738] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium overflow-x-auto no-scrollbar py-2 gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>All 15 Watches</span>
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/products?filter=bestseller"
              className="text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Best Sellers
            </Link>
            <Link
              to="/products?filter=trending"
              className="text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Trending
            </Link>
            <Link
              to="/track"
              className="text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap flex items-center gap-1 font-semibold"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-400 text-[11px] shrink-0">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> 100% Genuine Certified
            </span>
            <span>·</span>
            <span>7-Day Replacement</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-slate-900 rounded-lg text-amber-300 font-medium"
            >
              Browse All Watches
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-slate-900 rounded-lg text-slate-200 hover:text-white"
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2 bg-slate-900 rounded-lg text-amber-300 font-semibold flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Order Status</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-300">
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-400" /> Wishlist ({wishlistCount})
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4 text-amber-400" /> Cart ({cartCount})
            </Link>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-400 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="text-amber-400 font-bold flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

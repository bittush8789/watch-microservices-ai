import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WATCH_PRODUCTS, CATEGORIES, BRANDS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  ArrowUpDown,
  Star,
  Check,
  RotateCcw,
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query parameter defaults
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || 'all';

  const [category, setCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state if query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);

    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);

    const flt = searchParams.get('filter');
    if (flt === 'bestseller') setSortBy('bestseller');
    if (flt === 'trending') setSortBy('trending');
    if (flt === 'new') setSortBy('newest');
  }, [searchParams]);

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return WATCH_PRODUCTS.filter((product) => {
      // Category filter
      if (category !== 'All' && product.category !== category) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All Brands' && product.brand !== selectedBrand) {
        return false;
      }

      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesTagline && !matchesCat) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under-5000' && product.price >= 5000) return false;
      if (priceRange === '5000-10000' && (product.price < 5000 || product.price > 10000)) return false;
      if (priceRange === '10000-20000' && (product.price < 10000 || product.price > 20000)) return false;
      if (priceRange === 'above-20000' && product.price <= 20000) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // In-stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      return 0; // featured default
    });
  }, [category, selectedBrand, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  const resetFilters = () => {
    setCategory('All');
    setSelectedBrand('All Brands');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== 'All' ||
    selectedBrand !== 'All Brands' ||
    searchQuery !== '' ||
    priceRange !== 'all' ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title & Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Watches</span>
            {category !== 'All' && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-semibold">{category}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Cinzel',serif] text-3xl font-bold text-slate-900">
                {category === 'All' ? 'All Watch Collections' : category}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {filteredProducts.length} of {WATCH_PRODUCTS.length} curated luxury timepieces
              </p>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Filter & Sort ({filteredProducts.length})</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                  Filter Watches
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Search Within Catalog */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Search Model / Spec
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="E.g. Gold, Leather, Automatic..."
                    className="w-full text-xs px-3 py-2 pl-8 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setCategory('All')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      category === 'All' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[11px] text-slate-400">{WATCH_PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => {
                    const count = WATCH_PRODUCTS.filter((w) => w.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                          category === cat
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="text-[11px] text-slate-400">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Brand Atelier
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Price in Rupees (₹)
                </label>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-5000', label: 'Under ₹5,000' },
                    { id: '5000-10000', label: '₹5,000 – ₹10,000' },
                    { id: '10000-20000', label: '₹10,000 – ₹20,000' },
                    { id: 'above-20000', label: 'Above ₹20,000 (Luxury)' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                      <input
                        type="radio"
                        name="priceFilter"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Customer Rating
                </label>
                <div className="space-y-1 text-xs">
                  {[0, 4.5, 4.8].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setMinRating(rate)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between cursor-pointer ${
                        minRating === rate ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {rate === 0 ? 'All Ratings' : `${rate}★ & Above`}
                        {rate > 0 && <Star className="w-3 h-3 fill-amber-500 text-amber-500" />}
                      </span>
                      {minRating === rate && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Exclude Out of Stock items</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid & Controls */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Bar: Sort selector & Active Pills */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600 w-full sm:w-auto">
                <span className="font-semibold text-slate-900">{filteredProducts.length} Watches</span>
                <span>found</span>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="bestseller">Best Sellers First</option>
                  <option value="newest">New Arrivals First</option>
                </select>
              </div>
            </div>

            {/* Product Card Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((watch) => (
                  <ProductCard key={watch.id} product={watch} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-['Cinzel',serif] text-xl font-bold text-slate-900">
                  No Matching Watches Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any timepieces matching your current filter criteria. Try resetting filters or searching for another term.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-5/6 max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="font-bold text-base text-slate-900">Filter & Sort</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-bold text-slate-900 mb-2 uppercase">Category</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setCategory('All')}
                  className={`p-2 rounded text-left ${category === 'All' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100'}`}
                >
                  All
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`p-2 rounded text-left ${category === c ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold text-slate-900 mb-2 uppercase">Price Band</p>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-5000', label: 'Under ₹5,000' },
                  { id: '5000-10000', label: '₹5,000 – ₹10,000' },
                  { id: '10000-20000', label: '₹10,000 – ₹20,000' },
                  { id: 'above-20000', label: 'Above ₹20,000' },
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-2 py-1">
                    <input
                      type="radio"
                      name="mPrice"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id)}
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

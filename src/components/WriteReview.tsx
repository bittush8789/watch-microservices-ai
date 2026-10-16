import React, { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, X, Sparkles, ShieldCheck } from 'lucide-react';
import { WatchProduct } from '../types';

export interface UserReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  headline: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  recommended: boolean;
}

interface WriteReviewProps {
  product: WatchProduct;
  onReviewSubmitted?: (review: UserReview) => void;
  onCancel?: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: '1 Star — Disappointing',
  2: '2 Stars — Below Expectations',
  3: '3 Stars — Average Quality',
  4: '4 Stars — Very Good Timepiece',
  5: '5 Stars — Outstanding Masterpiece',
};

export const WriteReview: React.FC<WriteReviewProps> = ({
  product,
  onReviewSubmitted,
  onCancel,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [author, setAuthor] = useState('Abhishek Kumar');
  const [location, setLocation] = useState('New Delhi');
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [recommended, setRecommended] = useState<boolean>(true);
  const [verifiedBuyer, setVerifiedBuyer] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const activeStarCount = hoverRating || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a star rating between 1 and 5.');
      return;
    }
    if (!author.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!headline.trim()) {
      setError('Please enter a headline for your review.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 15) {
      setError('Please provide a review description with at least 15 characters.');
      return;
    }

    setError('');

    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'India',
      rating,
      headline: headline.trim(),
      comment: comment.trim(),
      date: 'Just now',
      verifiedBuyer,
      recommended,
    };

    // Save to localStorage for this product
    try {
      const storageKey = `neek_watch_reviews_${product.id}`;
      const existing = localStorage.getItem(storageKey);
      const list: UserReview[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem(storageKey, JSON.stringify([newReview, ...list]));
    } catch (err) {
      console.error(err);
    }

    // Persist to MongoDB backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        author: newReview.author,
        location: newReview.location,
        rating: newReview.rating,
        headline: newReview.headline,
        comment: newReview.comment,
        date: newReview.date,
        verifiedBuyer: newReview.verifiedBuyer,
        recommended: newReview.recommended,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.savedToDatabase) {
          console.log(`[MongoDB] Review saved to MongoDB collection for ${product.name}`);
        }
      })
      .catch((err) => {
        console.warn('[MongoDB Review Sync]: Backend offline or operating locally', err);
      });

    setSubmitted(true);
    if (onReviewSubmitted) {
      onReviewSubmitted(newReview);
    }
  };

  const resetForm = () => {
    setHeadline('');
    setComment('');
    setRating(5);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-200">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-['Cinzel',serif] text-xl font-bold text-emerald-950">
            Review Submitted Successfully!
          </h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto mt-1 leading-relaxed">
            Thank you, {author}. Your verified feedback on the <strong>{product.name}</strong> has been recorded and published in the customer reviews section.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Submit Another Review
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Verified Customer Feedback</span>
          </div>
          <h3 className="font-['Cinzel',serif] text-xl font-bold text-slate-900">
            Write a Review for {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Share your horological experience, comfort, movement accuracy, and craftsmanship.
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close review form"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Star Rating Interactive Selector */}
        <div>
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isLit = starVal <= activeStarCount;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-120 cursor-pointer"
                    aria-label={`Rate ${starVal} out of 5 stars`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        isLit
                          ? 'fill-amber-500 text-amber-500 drop-shadow-sm'
                          : 'fill-slate-200 text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-700 ml-2">
              {RATING_LABELS[activeStarCount] || `${activeStarCount} Stars`}
            </span>
          </div>
        </div>

        {/* Reviewer Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Abhishek Kumar"
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your City / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. New Delhi, Mumbai, Bengaluru"
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
            />
          </div>
        </div>

        {/* Review Headline */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Review Headline / Summary *
          </label>
          <input
            type="text"
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Outstanding dial luster, exceptional automatic precision!"
            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900 font-semibold"
          />
        </div>

        {/* Detailed Review Description */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-700 block">
              Detailed Written Review *
            </label>
            <span className="text-[11px] text-slate-400">
              {comment.length} / 15+ characters
            </span>
          </div>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike about this timepiece? How is the weight, the strap comfort, the lume brightness, or the packaging?"
            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900 leading-relaxed"
          />
        </div>

        {/* Recommendation and Verified Options */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">
              Would you recommend this timepiece to friends & collectors?
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRecommended(true)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  recommended ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setRecommended(false)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  !recommended ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedBuyer}
                onChange={(e) => setVerifiedBuyer(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span>Tag as Verified Horology Buyer</span>
            </label>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Authenticity Badge
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Submit Customer Review
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

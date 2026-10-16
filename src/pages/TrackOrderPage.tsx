import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { OrderTracker } from '../components/OrderTracker';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || '';

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Track Order</span>
        </div>

        <OrderTracker initialOrderId={orderId} />

        <div className="text-center pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Watch Catalog</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCartWishlist();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        if (toast.type === 'cart') {
          icon = <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'wishlist') {
          icon = <Heart className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0" />;
        } else if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-xl shadow-2xl text-slate-100 text-sm animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="font-medium text-slate-200 line-clamp-2">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

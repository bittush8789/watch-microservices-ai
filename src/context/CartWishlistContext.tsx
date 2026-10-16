import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, WatchProduct, CheckoutFormData, PlacedOrder } from '../types';

interface ToastNotification {
  id: string;
  message: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
}

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: WatchProduct[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  appliedPromo: string | null;
  total: number;
  addToCart: (product: WatchProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  toggleWishlist: (product: WatchProduct) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: WatchProduct) => void;
  placeOrder: (formData: CheckoutFormData) => PlacedOrder;
  orders: PlacedOrder[];
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('neek_watches_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WatchProduct[]>(() => {
    try {
      const saved = localStorage.getItem('neek_watches_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('neek_watches_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('neek_watches_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('neek_watches_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Synchronize cart & wishlist across devices to MongoDB user collection
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem('neek_auth_user');
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser?.email) {
          fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: savedUser.email,
              cart: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
              wishlist: wishlist.map((p) => p.id),
            }),
          }).catch(() => {});
        }
      }
    } catch {
      // Ignore
    }
  }, [cart, wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('neek_watches_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string, type: ToastNotification['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: WatchProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart`, 'cart');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (product: WatchProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveToCartFromWishlist = (product: WatchProduct) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  let discountAmount = 0;
  if (appliedPromo === 'NEEK10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'GOLDEN') {
    discountAmount = Math.min(500, Math.round(subtotal * 0.2));
  } else if (appliedPromo === 'FIRSTWATCH') {
    discountAmount = Math.round(subtotal * 0.15);
  }

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NEEK10') {
      setAppliedPromo('NEEK10');
      showToast('Coupon NEEK10 applied! 10% instant discount saved', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'GOLDEN') {
      setAppliedPromo('GOLDEN');
      showToast('Coupon GOLDEN applied! Instant royal discount saved', 'success');
      return { success: true, message: 'Royal discount applied!' };
    }
    if (clean === 'FIRSTWATCH') {
      setAppliedPromo('FIRSTWATCH');
      showToast('Coupon FIRSTWATCH applied! 15% welcome discount saved', 'success');
      return { success: true, message: '15% welcome discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promo code. Try NEEK10, GOLDEN, or FIRSTWATCH' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder = (formData: CheckoutFormData): PlacedOrder => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `NEEK-2026-${randomNum}`;

    // Calculate delivery date 3 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newOrder: PlacedOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total,
      customerDetails: formData,
      estimatedDelivery: formattedDelivery,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Asynchronously synchronize with MongoDB backend
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.savedToDatabase) {
          console.log(`[MongoDB] Order ${orderId} confirmed and persisted in MongoDB database.`);
        }
      })
      .catch((err) => {
        console.warn('[MongoDB Sync]: Backend offline or operating locally', err);
      });

    showToast(`Order #${orderId} successfully placed!`, 'success');
    return newOrder;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        wishlistCount,
        subtotal,
        shippingFee,
        discountAmount,
        appliedPromo,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        placeOrder,
        orders,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};

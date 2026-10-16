export interface WatchProduct {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  category: "Men's Watches" | "Women's Watches" | "Smart Watches" | "Luxury Watches";
  price: number; // in INR (₹)
  originalPrice: number; // in INR (₹)
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  features: string[];
  specs: {
    movement: string;
    caseDiameter: string;
    caseThickness: string;
    waterResistance: string;
    glassMaterial: string;
    strapMaterial: string;
    strapWidth: string;
    claspType: string;
    warranty: string;
  };
  inStock: boolean;
  stockCount: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  themeColor: string; // Dial / accent color
  watchVisualType:
    | 'silver-analog'
    | 'black-leather'
    | 'golden-luxury'
    | 'rose-gold-women'
    | 'modern-smart'
    | 'black-sports'
    | 'white-minimalist'
    | 'steel-mens'
    | 'bracelet-women'
    | 'digital-sports'
    | 'chronograph-mens'
    | 'blue-luxury'
    | 'fitness-smart'
    | 'vintage-brown'
    | 'gold-automatic';
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerDetails: CheckoutFormData;
  estimatedDelivery: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  provider?: 'local' | 'google';
  cart?: Array<{
    productId: string;
    quantity: number;
  }>;
  wishlist?: string[];
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
  token?: string;
}

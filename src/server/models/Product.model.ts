import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDocument extends Document {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  category: string;
  price: number;
  originalPrice: number;
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
  themeColor: string;
  watchVisualType: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    tagline: { type: String, default: '' },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    specs: {
      movement: { type: String, default: '' },
      caseDiameter: { type: String, default: '' },
      caseThickness: { type: String, default: '' },
      waterResistance: { type: String, default: '' },
      glassMaterial: { type: String, default: '' },
      strapMaterial: { type: String, default: '' },
      strapWidth: { type: String, default: '' },
      claspType: { type: String, default: '' },
      warranty: { type: String, default: '' },
    },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 10 },
    isTrending: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    themeColor: { type: String, default: '#e2e8f0' },
    watchVisualType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);

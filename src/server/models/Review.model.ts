import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDocument extends Document {
  productId: string;
  author: string;
  location: string;
  rating: number;
  headline: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  recommended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    productId: { type: String, required: true, index: true },
    author: { type: String, required: true },
    location: { type: String, default: 'India' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    headline: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    verifiedBuyer: { type: Boolean, default: true },
    recommended: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel =
  mongoose.models.Review || mongoose.model<IReviewDocument>('Review', ReviewSchema);

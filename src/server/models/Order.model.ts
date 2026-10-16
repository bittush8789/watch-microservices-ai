import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDocument extends Document {
  orderId: string;
  date: string;
  items: Array<{
    product: any;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: string;
  };
  estimatedDelivery: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    date: { type: String, required: true },
    items: [
      {
        product: { type: Schema.Types.Mixed, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      paymentMethod: { type: String, default: 'upi' },
    },
    estimatedDelivery: { type: String, required: true },
    status: { type: String, default: 'In Transit — Express Air Freight' },
  },
  {
    timestamps: true,
  }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<IOrderDocument>('Order', OrderSchema);

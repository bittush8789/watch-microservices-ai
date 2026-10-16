import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  phone?: string;
  cart: Array<{
    productId: string;
    quantity: number;
  }>;
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
  verifyPassword(password: string): boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    phone: { type: String, default: '' },
    cart: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    wishlist: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Method to verify password using crypto PBKDF2
UserSchema.methods.verifyPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.passwordHash === hash;
};

// Static helper to create password hash and salt
export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { salt, passwordHash };
};

export const UserModel =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

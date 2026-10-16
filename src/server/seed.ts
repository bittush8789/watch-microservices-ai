import { ProductModel } from './models/Product.model';
import { WATCH_PRODUCTS } from '../data/products';

export const seedProductsToMongoDB = async (): Promise<number> => {
  try {
    const existingCount = await ProductModel.countDocuments();
    if (existingCount === 0) {
      console.log('[MongoDB Seed] Seeding watch products into MongoDB collection...');
      await ProductModel.insertMany(WATCH_PRODUCTS);
      console.log(`[MongoDB Seed] Successfully seeded ${WATCH_PRODUCTS.length} watches into MongoDB!`);
      return WATCH_PRODUCTS.length;
    } else {
      // Sync latest pricing and details for all products in MongoDB
      for (const prod of WATCH_PRODUCTS) {
        await ProductModel.findOneAndUpdate({ id: prod.id }, { $set: prod }, { upsert: true });
      }
      console.log(`[MongoDB Seed] Successfully synced ${WATCH_PRODUCTS.length} watches with updated pricing.`);
      return WATCH_PRODUCTS.length;
    }
  } catch (error) {
    console.error('[MongoDB Seed Error]:', error);
    return 0;
  }
};

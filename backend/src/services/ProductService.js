import { BaseService } from './BaseService.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

export class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  async findProductsByUser(userId, options = {}) {
    const filter = { user: userId };
    return await this.findMany(filter, ['category'], options);
  }

  async createProduct(productData, userId) {
    // Validate category exists and belongs to user
    const category = await Category.findOne({ 
      _id: productData.category, 
      user: userId 
    });
    
    if (!category) {
      throw new Error('The specified category does not exist or does not belong to the user');
    }

    return await this.create({
      ...productData,
      user: userId
    });
  }

  async updateProduct(productId, updateData, userId) {
    // Verify product belongs to user
    const existingProduct = await this.findOne({
      _id: productId,
      user: userId
    });

    if (!existingProduct) {
      throw new Error('Product not found or does not belong to the user');
    }

    // If category is being updated, validate it
    if (updateData.category) {
      const category = await Category.findOne({
        _id: updateData.category,
        user: userId
      });

      if (!category) {
        throw new Error('The new specified category does not exist or does not belong to the user');
      }
    }

    return await this.update(productId, updateData);
  }

  async deleteProduct(productId, userId) {
    // Verify product belongs to user
    const existingProduct = await this.findOne({
      _id: productId,
      user: userId
    });

    if (!existingProduct) {
      throw new Error('Product not found or does not belong to the user');
    }

    return await this.delete(productId);
  }

  async getProductStats(userId) {
    const totalProducts = await this.count({ user: userId });
    const lowStockProducts = await this.count({ 
      user: userId, 
      stock: { $lt: 10 } 
    });
    
    const categoryStats = await this.model.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
      { $unwind: '$categoryInfo' },
      { $project: { categoryName: '$categoryInfo.name', count: 1 } }
    ]);

    return {
      totalProducts,
      lowStockProducts,
      categoryStats
    };
  }
}

export const productService = new ProductService();
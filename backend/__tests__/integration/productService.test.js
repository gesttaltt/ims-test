const request = require('supertest');
const app = require('../../src/server');
const { productService } = require('../../src/services/ProductService');
const Category = require('../../src/models/Category');
const User = require('../../src/models/User');

describe('Product Service Integration Tests', () => {
  let testUser;
  let testCategory;

  beforeEach(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user'
    });

    // Create test category
    testCategory = await Category.create({
      name: 'Test Category',
      user: testUser._id
    });
  });

  describe('Product Creation', () => {
    it('should create product with valid data', async () => {
      const productData = {
        name: 'Test Product',
        category: testCategory._id,
        price: 99.99,
        stock: 50
      };

      const product = await productService.createProduct(productData, testUser._id);

      expect(product).toBeDefined();
      expect(product.name).toBe(productData.name);
      expect(product.price).toBe(productData.price);
      expect(product.stock).toBe(productData.stock);
      expect(product.user.toString()).toBe(testUser._id.toString());
      expect(product.category.toString()).toBe(testCategory._id.toString());
    });

    it('should throw error for invalid category', async () => {
      const productData = {
        name: 'Test Product',
        category: new mongoose.Types.ObjectId(),
        price: 99.99,
        stock: 50
      };

      await expect(
        productService.createProduct(productData, testUser._id)
      ).rejects.toThrow('The specified category does not exist or does not belong to user');
    });

    it('should throw validation error for missing fields', async () => {
      const productData = {
        name: 'Test Product'
        // Missing category, price, stock
      };

      await expect(
        productService.createProduct(productData, testUser._id)
      ).rejects.toThrow();
    });
  });

  describe('Product Retrieval', () => {
    beforeEach(async () => {
      await productService.createProduct({
        name: 'Product 1',
        category: testCategory._id,
        price: 10.99,
        stock: 20
      }, testUser._id);
      
      await productService.createProduct({
        name: 'Product 2',
        category: testCategory._id,
        price: 20.99,
        stock: 30
      }, testUser._id);
    });

    it('should retrieve all products for user', async () => {
      const products = await productService.findProductsByUser(testUser._id);

      expect(products).toHaveLength(2);
      expect(products[0].user.toString()).toBe(testUser._id.toString());
    });

    it('should paginate results correctly', async () => {
      const options = {
        limit: 1,
        skip: 1
      };
      
      const products = await productService.findProductsByUser(testUser._id, options);

      expect(products).toHaveLength(1);
    });

    it('should sort results correctly', async () => {
      const options = {
        sort: { name: 1 }
      };
      
      const products = await productService.findProductsByUser(testUser._id, options);

      expect(products[0].name).toBe('Product 1');
      expect(products[1].name).toBe('Product 2');
    });
  });

  describe('Product Update', () => {
    let existingProduct;

    beforeEach(async () => {
      existingProduct = await productService.createProduct({
        name: 'Original Product',
        category: testCategory._id,
        price: 10.99,
        stock: 20
      }, testUser._id);
    });

    it('should update product successfully', async () => {
      const updateData = {
        name: 'Updated Product',
        price: 15.99
      };

      const updatedProduct = await productService.updateProduct(
        existingProduct._id,
        updateData,
        testUser._id
      );

      expect(updatedProduct.name).toBe(updateData.name);
      expect(updatedProduct.price).toBe(updateData.price);
      expect(updatedProduct.stock).toBe(existingProduct.stock); // Unchanged
    });

    it('should throw error for non-existent product', async () => {
      await expect(
        productService.updateProduct(
          new mongoose.Types.ObjectId(),
          { name: 'Updated' },
          testUser._id
        )
      ).rejects.toThrow('Product not found or does not belong to user');
    });

    it('should throw error for unauthorized update', async () => {
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'hashedpassword',
        role: 'user'
      });

      await expect(
        productService.updateProduct(
          existingProduct._id,
          { name: 'Hijacked' },
          otherUser._id
        )
      ).rejects.toThrow('Product not found or does not belong to user');
    });
  });

  describe('Product Statistics', () => {
    beforeEach(async () => {
      // Create test products for stats
      await productService.createProduct({
        name: 'Low Stock Product',
        category: testCategory._id,
        price: 10.99,
        stock: 5
      }, testUser._id);

      await productService.createProduct({
        name: 'Normal Stock Product',
        category: testCategory._id,
        price: 20.99,
        stock: 50
      }, testUser._id);
    });

    it('should calculate correct statistics', async () => {
      const stats = await productService.getProductStats(testUser._id);

      expect(stats.totalProducts).toBe(2);
      expect(stats.lowStockProducts).toBe(1);
      expect(stats.categoryStats).toBeDefined();
      expect(stats.categoryStats).toHaveLength(1);
      expect(stats.categoryStats[0].categoryName).toBe('Test Category');
      expect(stats.categoryStats[0].count).toBe(2);
    });
  });
});
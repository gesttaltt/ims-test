import { productService } from '../services/ProductService.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

export const getProducts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
  const options = {
    sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
    limit: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit)
  };

  const products = await productService.findProductsByUser(userId, options);
  const total = await productService.count({ user: userId });

  res.status(200).json({
    products,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, category, price, stock } = req.body;

  const product = await productService.createProduct(
    { name, category, price, stock },
    userId
  );

  res.status(201).json({
    message: 'Product created successfully',
    product: await productService.findById(product._id, ['category'])
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const updateData = req.body;

  const product = await productService.updateProduct(id, updateData, userId);

  res.status(200).json({
    message: 'Product updated successfully',
    product: await productService.findById(product._id, ['category'])
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await productService.deleteProduct(id, userId);

  res.status(200).json({
    message: 'Product deleted successfully'
  });
});

export const getProductStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  const stats = await productService.getProductStats(userId);

  res.status(200).json({
    message: 'Product statistics retrieved successfully',
    stats
  });
});
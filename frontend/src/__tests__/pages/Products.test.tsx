import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Products from '../../../pages/Products';

const mockProducts = [
  {
    _id: '1',
    name: 'Test Product 1',
    category: { _id: 'cat1', name: 'Electronics' },
    price: 99.99,
    stock: 10
  },
  {
    _id: '2',
    name: 'Test Product 2',
    category: { _id: 'cat2', name: 'Clothing' },
    price: 49.99,
    stock: 25
  }
];

const MockProductsComponent = () => (
  <BrowserRouter>
    <AuthProvider>
      <Products />
    </AuthProvider>
  </BrowserRouter>
);

// Mock the API calls
vi.mock('../../../api/productApi', () => ({
  getProducts: vi.fn(() => Promise.resolve(mockProducts)),
  createProduct: vi.fn(() => Promise.resolve(mockProducts[0])),
  updateProduct: vi.fn(() => Promise.resolve(mockProducts[0])),
  deleteProduct: vi.fn(() => Promise.resolve())
}));

describe('Products Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays products list correctly', async () => {
    render(<MockProductsComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getByText('99.99')).toBeInTheDocument();
      expect(screen.getByText('49.99')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<MockProductsComponent />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays empty state when no products', async () => {
    const { getProducts } = await import('../../../api/productApi');
    getProducts.mockReturnValue(Promise.resolve([]));
    
    render(<MockProductsComponent />);
    
    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });
  });

  it('handles product creation', async () => {
    const { createProduct } = await import('../../../api/productApi');
    
    render(<MockProductsComponent />);
    
    const addButton = screen.getByText(/add product/i);
    fireEvent.click(addButton);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/product name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const stockInput = screen.getByLabelText(/stock/i);
    
    fireEvent.change(nameInput, { target: { value: 'New Product' } });
    fireEvent.change(priceInput, { target: { value: '29.99' } });
    fireEvent.change(stockInput, { target: { value: '15' } });
    
    const submitButton = screen.getByText(/create product/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith({
        name: 'New Product',
        price: '29.99',
        stock: '15'
      });
    });
  });

  it('handles product deletion', async () => {
    const { deleteProduct } = await import('../../../api/productApi');
    
    render(<MockProductsComponent />);
    
    await waitFor(() => {
      const deleteButtons = screen.getAllByText(/delete/i);
      fireEvent.click(deleteButtons[0]);
    });
    
    const confirmButton = await screen.findByText(/confirm delete/i);
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith('1');
    });
  });

  it('filters products by search term', async () => {
    render(<MockProductsComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    });
  });

  it('sorts products correctly', async () => {
    render(<MockProductsComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
    
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'name-asc' } });
    
    await waitFor(() => {
      const products = screen.getAllByTestId(/product-/i);
      expect(products[0]).toHaveTextContent('Test Product 1');
      expect(products[1]).toHaveTextContent('Test Product 2');
    });
  });
});
import api from './api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand?: string;
  sku: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  features: string[];
  inventory: {
    quantity: number;
    reserved: number;
    lowStockThreshold: number;
  };
  rating: {
    average: number;
    count: number;
  };
  reviews: Array<{
    _id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
  // Virtual fields
  availableQuantity: number;
  inStock: boolean;
  isLowStock: boolean;
  discountPercentage: number;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface ProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  inStock?: boolean;
}

class ProductService {
  // Get all products with filters
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  }

  // Get single product by ID
  async getProduct(id: string): Promise<ProductResponse> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  // Get product categories
  async getCategories(): Promise<{ success: boolean; data: { categories: string[] } }> {
    const response = await api.get('/products/categories');
    return response.data;
  }

  // Add product review
  async addReview(productId: string, rating: number, comment: string): Promise<any> {
    const response = await api.post(`/products/${productId}/reviews`, {
      rating,
      comment
    });
    return response.data;
  }

  // Create product (Admin only)
  async createProduct(productData: Partial<Product>): Promise<any> {
    const response = await api.post('/products', productData);
    return response.data;
  }

  // Update product (Admin only)
  async updateProduct(id: string, productData: Partial<Product>): Promise<any> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  }

  // Delete product (Admin only)
  async deleteProduct(id: string): Promise<any> {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }

  // Search products
  async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...filters, search: query });
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<ProductsResponse> {
    return this.getProducts({ featured: true, limit });
  }

  // Get products by category
  async getProductsByCategory(category: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...filters, category });
  }
}

export default new ProductService();

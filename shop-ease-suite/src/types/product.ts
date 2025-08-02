export interface Product {
  _id: string;
  id?: string; // For backward compatibility
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
  image?: string; // For backward compatibility - will be derived from images
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

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
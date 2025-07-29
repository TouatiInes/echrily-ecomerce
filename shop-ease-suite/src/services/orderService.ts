import api from './api';
import { Product } from './productService';

export interface OrderItem {
  product: string | Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'stripe' | 'cash_on_delivery';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  shippingMethod: 'standard' | 'express' | 'overnight';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  notes?: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
  updatedAt: string;
  // Virtual fields
  orderAge: number;
}

export interface CreateOrderData {
  items: Array<{
    product: string;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentInfo: Omit<PaymentInfo, 'status' | 'paidAt'>;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

export interface OrdersResponse {
  success: boolean;
  data: {
    orders: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalOrders: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface OrderResponse {
  success: boolean;
  data: {
    order: Order;
  };
}

class OrderService {
  // Create new order
  async createOrder(orderData: CreateOrderData): Promise<OrderResponse> {
    const response = await api.post('/orders', orderData);
    return response.data;
  }

  // Get user orders
  async getUserOrders(page: number = 1, limit: number = 10, status?: string): Promise<OrdersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    if (status) {
      params.append('status', status);
    }

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  }

  // Get single order
  async getOrder(orderId: string): Promise<OrderResponse> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }

  // Cancel order
  async cancelOrder(orderId: string, reason?: string): Promise<any> {
    const response = await api.put(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  }

  // Update order status (Admin only)
  async updateOrderStatus(orderId: string, status: string, note?: string): Promise<any> {
    const response = await api.put(`/orders/${orderId}/status`, { status, note });
    return response.data;
  }

  // Get all orders (Admin only)
  async getAllOrders(
    page: number = 1, 
    limit: number = 20, 
    status?: string, 
    startDate?: string, 
    endDate?: string
  ): Promise<OrdersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    if (status) params.append('status', status);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/orders/admin/all?${params.toString()}`);
    return response.data;
  }

  // Calculate shipping cost
  calculateShippingCost(method: 'standard' | 'express' | 'overnight'): number {
    switch (method) {
      case 'express':
        return 15.99;
      case 'overnight':
        return 29.99;
      default:
        return 0; // Free standard shipping
    }
  }

  // Calculate tax (8%)
  calculateTax(subtotal: number): number {
    return subtotal * 0.08;
  }

  // Calculate order total
  calculateTotal(subtotal: number, shippingMethod: 'standard' | 'express' | 'overnight', discount: number = 0): number {
    const shipping = this.calculateShippingCost(shippingMethod);
    const tax = this.calculateTax(subtotal);
    return subtotal + shipping + tax - discount;
  }

  // Get order status color
  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Format order status
  formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

export default new OrderService();

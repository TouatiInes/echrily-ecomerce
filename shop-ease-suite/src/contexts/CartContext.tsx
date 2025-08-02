import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, CartContextType } from '@/types/product';
import { toast } from '@/hooks/use-toast';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const productId = action.payload._id || action.payload.id;
      const existingItem = state.find(item => (item._id || item.id) === productId);
      if (existingItem) {
        return state.map(item =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Ensure backward compatibility by setting both _id and id
      const cartItem = {
        ...action.payload,
        id: productId,
        _id: action.payload._id,
        quantity: 1
      };
      return [...state, cartItem];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => (item._id || item.id) !== action.payload);
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity === 0) {
        return state.filter(item => (item._id || item.id) !== action.payload.id);
      }
      return state.map(item =>
        (item._id || item.id) === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('marketease-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marketease-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
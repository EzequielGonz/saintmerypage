"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalPrice = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace('.', '').replace(',', '.'));
      return sum + (price * (item.quantity || 1));
    }, 0);
    return `$${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 
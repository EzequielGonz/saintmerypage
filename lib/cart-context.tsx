"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  prices: { [key: string]: string };
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, price: string) => void;
  removeFromCart: (productId: number, selectedSize: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedSize: string, price: string) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existingProductIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedSize, price }];
    });
  };

  const removeFromCart = (productId: number, selectedSize: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalPrice = () => {
    const total = cart.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace('$', '').replace('.', '').replace(',', '.'));
      return sum + (priceValue * (item.quantity || 1));
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
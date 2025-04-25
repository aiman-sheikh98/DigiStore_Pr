
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Update cart count and total
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(items.reduce((total, item) => total + (item.product.price * item.quantity), 0));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product exists
        const updatedItems = prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        toast({
          title: "Item quantity updated",
          description: `${product.title} quantity increased in your cart.`
        });
        return updatedItems;
      } else {
        // Add new item if product doesn't exist
        toast({
          title: "Item added to cart",
          description: `${product.title} has been added to your cart.`
        });
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      
      if (itemToRemove && itemToRemove.quantity > 1) {
        // Decrease quantity if more than 1
        return prevItems.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // Remove item if quantity is 1
        toast({
          title: "Item removed from cart",
          description: itemToRemove ? `${itemToRemove.product.title} has been removed from your cart.` : "Item removed"
        });
        return prevItems.filter(item => item.product.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

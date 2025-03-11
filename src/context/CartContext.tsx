
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category?: string;
  hasDiscount?: boolean;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  hasDiscountedItems: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasDiscountedItems, setHasDiscountedItems] = useState<boolean>(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('tastyHubCart');
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        setItems(parsedItems);
        // Check if any item has a discount
        setHasDiscountedItems(parsedItems.some((item: CartItem) => item.hasDiscount));
      } catch (error) {
        console.error('Failed to parse cart data from localStorage', error);
        localStorage.removeItem('tastyHubCart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tastyHubCart', JSON.stringify(items));
    setHasDiscountedItems(items.some(item => item.hasDiscount));
  }, [items]);
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    // Check if item has discount
    if (item.hasDiscount && hasDiscountedItems) {
      toast({
        title: "Only One Deal Allowed",
        description: "You can only apply one deal per order. Please remove discounted items first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Item already exists in cart, increase quantity
        const updatedItems = prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        toast({
          title: "Item Updated",
          description: `${item.name} quantity increased in your cart.`,
          duration: 3000,
        });
        return updatedItems;
      } else {
        // New item
        toast({
          title: "Added to Cart",
          description: `${item.name} has been added to your cart.`,
          duration: 3000,
        });
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Item Removed",
          description: `${itemToRemove.name} has been removed from your cart.`,
          duration: 3000,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      itemCount,
      hasDiscountedItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

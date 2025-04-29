
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { getLocationById } from '@/data/locations';

export type DeliveryMethod = 'delivery' | 'carryout';

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category?: string;
  hasDiscount?: boolean;
  dealName?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  hasDiscountedItems: boolean;
  totalAmount: number;
  checkAuthBeforeCheckout: () => boolean;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  selectedLocationId: string | null;
  setSelectedLocationId: (locationId: string | null) => void;
  deliveryFee: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasDiscountedItems, setHasDiscountedItems] = useState<boolean>(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const { user, session } = useAuth();
  
  // Set delivery fee
  const deliveryFee = deliveryMethod === 'delivery' ? 3.99 : 0;
  
  useEffect(() => {
    const savedCart = localStorage.getItem('tastyHubCart');
    const savedMethod = localStorage.getItem('tastyHubDeliveryMethod');
    const savedLocationId = localStorage.getItem('tastyHubSelectedLocation');
    
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        setItems(parsedItems);
        setHasDiscountedItems(parsedItems.some((item: CartItem) => item.hasDiscount));
      } catch (error) {
        console.error('Failed to parse cart data from localStorage', error);
        localStorage.removeItem('tastyHubCart');
      }
    }
    
    if (savedMethod && (savedMethod === 'delivery' || savedMethod === 'carryout')) {
      setDeliveryMethod(savedMethod as DeliveryMethod);
    }
    
    if (savedLocationId) {
      setSelectedLocationId(savedLocationId);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tastyHubCart', JSON.stringify(items));
    localStorage.setItem('tastyHubDeliveryMethod', deliveryMethod);
    if (selectedLocationId) {
      localStorage.setItem('tastyHubSelectedLocation', selectedLocationId);
    } else {
      localStorage.removeItem('tastyHubSelectedLocation');
    }
    setHasDiscountedItems(items.some(item => item.hasDiscount));
  }, [items, deliveryMethod, selectedLocationId]);
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
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
  
  const checkAuthBeforeCheckout = (): boolean => {
    console.log("Checking auth before checkout:", !!user, !!session);
    
    if (!session || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed to checkout.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }
    
    if (deliveryMethod === 'carryout' && !selectedLocationId) {
      toast({
        title: "Location Required",
        description: "Please select a location for carryout.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }
    
    return true;
  };
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const totalAmount = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      itemCount,
      hasDiscountedItems,
      totalAmount,
      checkAuthBeforeCheckout,
      deliveryMethod,
      setDeliveryMethod,
      selectedLocationId,
      setSelectedLocationId,
      deliveryFee
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

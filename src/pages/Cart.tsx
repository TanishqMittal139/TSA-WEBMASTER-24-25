
import React from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BlurImage from '../components/ui/blur-image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import DeliveryMethodSelector from '@/components/cart/DeliveryMethodSelector';
import LocationSelector from '@/components/cart/LocationSelector';

const Cart: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    itemCount, 
    totalAmount, 
    checkAuthBeforeCheckout,
    deliveryFee 
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + tax + deliveryFee;
  
  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (checkAuthBeforeCheckout()) {
      navigate('/checkout');
    } else {
      navigate('/sign-in', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Review your items and proceed to checkout.
            </p>
          </div>
          
          {itemCount > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-medium">Cart Items ({itemCount})</h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 flex items-start">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <BlurImage 
                            src={item.image} 
                            alt={item.name}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              {item.dealName && (
                                <span className="text-sm text-primary">{item.dealName}</span>
                              )}
                            </div>
                            <p className="font-semibold">{item.price}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md border border-input hover:bg-muted transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="mx-3 min-w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md border border-input hover:bg-muted transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Method Selection */}
                <div className="mt-6">
                  <DeliveryMethodSelector />
                  <LocationSelector />
                </div>
                
                <div className="mt-6">
                  <Link
                    to="/menu"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-medium">Order Summary</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-border my-3 pt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleProceedToCheckout}
                      className="w-full mt-4"
                      disabled={items.length === 0}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                    
                    {!user && (
                      <div className="mt-4 text-sm text-center">
                        <Link to="/sign-in" className="text-primary hover:underline">
                          Sign in
                        </Link> to earn rewards points with your purchase!
                      </div>
                    )}
                    
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      By proceeding, you agree to our Terms of Service and Privacy Policy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <ShoppingBag size={24} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/menu"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;

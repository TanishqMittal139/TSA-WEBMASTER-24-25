
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const CheckoutConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderDetails = location.state?.orderDetails;
  
  // If no order details are available, redirect to the cart page
  if (!orderDetails) {
    React.useEffect(() => {
      navigate('/cart');
    }, [navigate]);
    return null;
  }
  
  // Clear the cart once confirmation is shown
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  const orderDate = new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setMinutes(deliveryDate.getMinutes() + 30);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your order. We're preparing your food with care!
            </p>
            
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-center">Order Details</h2>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium text-lg">{orderDetails.orderNumber}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Order Type</p>
                    <p className="font-medium">{orderDetails.orderType}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">{deliveryDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              </div>
              
              {orderDetails.address && (
                <div className="flex items-start mb-6">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-medium">{orderDetails.address}</p>
                  </div>
                </div>
              )}
              
              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-4">
                  {orderDetails.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">{item.quantity}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{orderDetails.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{orderDetails.tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{orderDetails.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 text-lg">
                    <span>Total</span>
                    <span>{orderDetails.total}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/menu')} className="flex items-center gap-2">
                Order Again
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Homepage
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutConfirmation;

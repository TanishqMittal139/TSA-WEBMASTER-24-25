
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { motion } from 'framer-motion';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  
  // Redirect if user directly navigates to this page
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasOrderConfirmation = sessionStorage.getItem('orderConfirmed');
      if (!hasOrderConfirmation) {
        navigate('/menu');
      }
    }, 500);
    
    // Set session variable to indicate we're in confirmation flow
    sessionStorage.setItem('orderConfirmed', 'true');
    
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  
  // Clear confirmation when leaving
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('orderConfirmed');
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              Order Confirmed!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Thank you for your order. We've received your payment and will start preparing your delicious meal right away.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <div>
                    <p className="font-medium">Preparation</p>
                    <p className="text-muted-foreground text-sm">Your order is being prepared by our chefs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-muted-foreground text-sm">A delivery partner will pick up your order and bring it to your address.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <div>
                    <p className="font-medium">Enjoy!</p>
                    <p className="text-muted-foreground text-sm">Your meal will arrive hot and ready to enjoy.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
              
              <Button 
                size="lg"
                onClick={() => navigate('/menu')}
                className="w-full sm:w-auto"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Order More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutConfirmation;

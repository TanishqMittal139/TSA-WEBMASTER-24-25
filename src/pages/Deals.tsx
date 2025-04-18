
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AnimatedHeader from '@/components/ui/animated-header';
import BlurImage from '@/components/ui/blur-image';

// Define and export the DealData interface
export interface DealData {
  id: string;
  title: string;
  description: string;
  discount: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  appliesTo: 'all' | 'category' | 'specific';
  categories?: string[];
  items?: string[];
  image: string;
  code: string;
}

const Deals = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2670&auto=format&fit=crop"
              alt="Deals"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <AnimatedHeader 
              title="Special Offers" 
              subtitle="Discover our latest deals and promotions for great savings"
              className="mb-12"
            />
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Deal Card */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551782450-a2132b4ba212?q=80&w=2069&auto=format&fit=crop"
                alt="Deal 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Burger & Fries Combo</h3>
                <p className="text-muted-foreground mb-3">Get a juicy burger with crispy fries for a discounted price.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">$9.99</span>
                  <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sample Deal Card */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543332141-6c85301e3ed7?q=80&w=2070&auto=format&fit=crop"
                alt="Deal 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Pizza Night Special</h3>
                <p className="text-muted-foreground mb-3">Enjoy a large pizza with your choice of toppings at a special price.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">$14.99</span>
                  <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sample Deal Card */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2e35b?q=80&w=2070&auto=format&fit=crop"
                alt="Deal 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Salad & Drink Combo</h3>
                <p className="text-muted-foreground mb-3">Get a refreshing salad with a drink of your choice for a healthy meal.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">$7.99</span>
                  <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;

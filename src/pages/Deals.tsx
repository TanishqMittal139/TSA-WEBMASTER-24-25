
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Check, Coffee, Soup, Sandwich, Gift, Users, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const deals = [
  {
    id: 'combo-meal',
    title: 'Combo Meal Deal',
    description: 'Choose 1 sandwich, 1 coffee, and 1 soup and get 15% off your order.',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?q=80&w=2670&auto=format&fit=crop',
    features: [
      { icon: <Sandwich size={16} />, text: '1 Sandwich of your choice' },
      { icon: <Coffee size={16} />, text: '1 Coffee of your choice' },
      { icon: <Soup size={16} />, text: '1 Soup of your choice' }
    ],
    popular: true
  },
  {
    id: 'catering',
    title: 'Catering Special',
    description: 'Get 10% off when catering for events and gatherings.',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1536392706976-e486e2ba97af?q=80&w=2670&auto=format&fit=crop',
    features: [
      { icon: <Users size={16} />, text: 'Perfect for events of any size' },
      { icon: <Package size={16} />, text: 'Custom packaging options' },
      { icon: <Check size={16} />, text: 'Available for delivery or pickup' }
    ],
    popular: false
  },
  {
    id: 'subscription',
    title: 'Weekly Subscription',
    description: 'Subscribe to weekly meal plans and save 20% on your favorite items.',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1553025934-296397db4010?q=80&w=2574&auto=format&fit=crop',
    features: [
      { icon: <Check size={16} />, text: 'Choose your weekly meal plan' },
      { icon: <Check size={16} />, text: 'Skip or modify anytime' },
      { icon: <Check size={16} />, text: 'Convenient billing options' }
    ],
    popular: false
  },
  {
    id: 'gift-card',
    title: 'Gift Card Bonus',
    description: 'Get a $5 bonus when you purchase a $50 gift card.',
    discount: '$5 BONUS',
    image: 'https://images.unsplash.com/photo-1612599316791-451087e8f877?q=80&w=2628&auto=format&fit=crop',
    features: [
      { icon: <Gift size={16} />, text: 'Perfect gift for food lovers' },
      { icon: <Check size={16} />, text: 'Digital or physical card options' },
      { icon: <Check size={16} />, text: 'No expiration date' }
    ],
    popular: false
  }
];

const Deals: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.fade-up, .stagger-item');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleGetDeal = (deal: typeof deals[0]) => {
    toast({
      title: "Deal Selected",
      description: `You've selected the ${deal.title}. Sign in to redeem this offer.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=2574&auto=format&fit=crop"
              alt="Deals banner"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className={cn(
              "transition-all duration-1000 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Special Offers
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals</h1>
              <p className="text-muted-foreground max-w-xl">
                Enjoy our special deals and save on your favorite meals. Sign up to unlock even more exclusive offers.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Deals Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Promotions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From combo meals to catering discounts, we've got special offers to make your dining experience even better.
              </p>
            </div>
            
            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {deals.map((deal, index) => (
                <div key={deal.id} className={`stagger-item rounded-xl overflow-hidden shadow-lg bg-card transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl ${deal.popular ? 'border-2 border-primary' : 'border border-border'}`}>
                  <div className="relative">
                    <BlurImage
                      src={deal.image}
                      alt={deal.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      {deal.discount}
                    </div>
                    {deal.popular && (
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                    <p className="text-muted-foreground mb-4">{deal.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {deal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="text-primary">{feature.icon}</span>
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleGetDeal(deal)}
                        className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                      >
                        Get This Deal
                      </button>
                      <Link
                        to="/sign-in"
                        className="flex-1 border border-primary text-primary px-4 py-2 rounded-md font-medium hover:bg-primary/10 transition-colors text-center"
                      >
                        Sign In to Redeem
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Save?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sign up today to unlock all our special offers and start saving on your favorite meals.
            </p>
            <Link
              to="/sign-in"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;

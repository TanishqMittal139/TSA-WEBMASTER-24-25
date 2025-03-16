
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Check, Coffee, Soup, Sandwich, Gift, Users, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { isAuthenticated } from '@/services/auth';
import { useCart } from '@/context/CartContext';

export interface DealData {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  features: { icon: React.ReactNode; text: string }[];
  popular: boolean;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
  appliesTo: 'all' | 'category' | 'specific';
  categories?: string[];
  items?: string[];
  minimumPurchase?: number;
  code: string;
}

const deals: DealData[] = [
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
    popular: true,
    discountAmount: 15,
    discountType: 'percentage',
    appliesTo: 'category',
    categories: ['sandwiches', 'beverages', 'soups'],
    code: 'COMBO15'
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
    popular: false,
    discountAmount: 10,
    discountType: 'percentage',
    appliesTo: 'all',
    minimumPurchase: 50, // Reduced from 100
    code: 'CATER10'
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
    popular: false,
    discountAmount: 20,
    discountType: 'percentage',
    appliesTo: 'all',
    code: 'WEEKLY20'
  },
  {
    id: 'gift-card',
    title: 'Gift Card Bonus',
    description: 'Get a $5 bonus when you purchase a $25 gift card.', // Reduced from $50
    discount: '$5 BONUS',
    image: 'https://images.unsplash.com/photo-1612599316791-451087e8f877?q=80&w=2628&auto=format&fit=crop',
    features: [
      { icon: <Gift size={16} />, text: 'Perfect gift for food lovers' },
      { icon: <Check size={16} />, text: 'Digital or physical card options' },
      { icon: <Check size={16} />, text: 'No expiration date' }
    ],
    popular: false,
    discountAmount: 5,
    discountType: 'fixed',
    appliesTo: 'specific',
    items: ['gift-card-25'], // Changed from gift-card-50
    code: 'GIFT5'
  }
];

const Deals: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
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

  // Clear any existing active deal when component mounts
  useEffect(() => {
    localStorage.removeItem('active_deal');
  }, []);

  const handleGetDeal = (deal: DealData) => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: `Please sign in to redeem the ${deal.title}.`,
        duration: 3000,
      });
      navigate('/sign-in', { state: { redirectTo: '/deals', dealId: deal.id } });
      return;
    }

    // Clear any existing active deal before setting a new one
    localStorage.removeItem('active_deal');
    
    // Store the active deal in localStorage
    localStorage.setItem('active_deal', JSON.stringify(deal));
    
    toast({
      title: "Deal Activated",
      description: `The ${deal.title} has been applied. Select items to use it!`,
      duration: 3000,
    });
    
    navigate(`/deals/${deal.id}/use`);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner with updated background image */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Exclusive Deals</h1>
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
              {deals.map((deal) => (
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
                        {isAuthenticated() ? "Get This Deal" : "Sign In to Redeem"}
                      </button>
                      {!isAuthenticated() && (
                        <Link
                          to="/sign-in"
                          className="flex-1 border border-primary text-primary px-4 py-2 rounded-md font-medium hover:bg-primary/10 transition-colors text-center"
                        >
                          Sign In
                        </Link>
                      )}
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
            {!isAuthenticated() ? (
              <Link
                to="/sign-in"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/menu"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors"
              >
                Browse Menu
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;

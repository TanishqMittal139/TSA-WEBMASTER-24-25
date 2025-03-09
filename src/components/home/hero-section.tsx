
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import BlurImage from '../ui/blur-image';
import { cn } from '@/lib/utils';

const OrderOptions = [
  { id: 'pickup', label: 'Pickup' },
  { id: 'delivery', label: 'Delivery' }
];

const HeroSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('pickup');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-accent opacity-50" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={cn(
            "space-y-8 transform transition-all duration-1000 ease-out",
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          )}>
            {/* Order Type Selector */}
            <div className="inline-flex p-1 bg-secondary rounded-full">
              {OrderOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedOption === option.id
                      ? "bg-primary text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Fresh, Sustainable,</span> <br />
              Plant-Based Food
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Experience our farm-to-table dining with locally sourced ingredients and 
              eco-friendly practices that nourish both you and the planet.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="button-primary flex items-center space-x-2 group">
                <span>Order Now</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/find-location" className="button-outline flex items-center space-x-2 group">
                <span>Find Location</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className={cn(
            "relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out delay-300",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <BlurImage
              src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=2574&auto=format&fit=crop"
              alt="Delicious plant-based food arrangement"
              className="rounded-2xl"
            />
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 glass-card p-4 rounded-xl shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">4.9</span>
                </div>
                <div>
                  <p className="font-semibold">Top Rated</p>
                  <p className="text-xs text-muted-foreground">350+ Reviews</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 glass-card p-4 rounded-xl shadow-lg max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
              <p className="font-medium">Eco-friendly packaging for all orders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

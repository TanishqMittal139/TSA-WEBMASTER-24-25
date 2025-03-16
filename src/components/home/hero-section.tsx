
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import BlurImage from '../ui/blur-image';
import { cn } from '@/lib/utils';
import ImageSlider from './image-slider';

const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=2574&auto=format&fit=crop",
    alt: "Delicious plant-based food arrangement",
    title: "Farm to Table Experience",
    description: "Locally sourced ingredients prepared with care for sustainable dining."
  },
  {
    src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2428&auto=format&fit=crop",
    alt: "Organic vegetables and herbs",
    title: "Fresh Organic Ingredients",
    description: "We use only the freshest organic produce in all our dishes."
  },
  {
    src: "https://images.unsplash.com/photo-1551807501-9e2e9c277c76?q=80&w=2624&auto=format&fit=crop",
    alt: "Chef preparing food",
    title: "Crafted With Passion",
    description: "Our chefs bring years of experience and creativity to every plate."
  },
  {
    src: "https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=2672&auto=format&fit=crop",
    alt: "Beautifully plated meal",
    title: "Culinary Excellence",
    description: "Experience artfully prepared dishes that delight all senses."
  }
];

const HeroSection: React.FC = () => {
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
                <span>Explore Our Menu</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/find-location" className="button-outline flex items-center space-x-2 group">
                <span>Find Location</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Image Slider */}
          <div className={cn(
            "relative transform transition-all duration-1000 ease-out delay-300",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <ImageSlider images={sliderImages} className="shadow-2xl rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

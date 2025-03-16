
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import BlurImage from '../ui/blur-image';
import { cn } from '@/lib/utils';
import ImageSlider from './image-slider';

const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    alt: "Healthy bowl with vegetables and greens",
    title: "Organic, Farm to Table",
    description: "Fresh ingredients sourced locally for mindful, healthy eating."
  },
  {
    src: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop",
    alt: "Fresh organic vegetables",
    title: "Ethically Sourced Ingredients",
    description: "We partner with local farms to reduce our carbon footprint."
  },
  {
    src: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=2070&auto=format&fit=crop",
    alt: "Vegetable buddha bowl",
    title: "Plant-Based Power",
    description: "Nutritious, colorful meals that taste as good as they look."
  },
  {
    src: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=2070&auto=format&fit=crop",
    alt: "Smoothie bowls with fresh fruit",
    title: "Nourish Your Body",
    description: "Natural, unprocessed foods that promote wellness and vitality."
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
      <div className="absolute inset-0 bg-accent opacity-50 dark:opacity-30 dark:bg-accent" aria-hidden="true">
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
            
            <p className="text-lg text-muted-foreground max-w-md dark:text-gray-300">
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


import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Sandwich, Soup } from 'lucide-react';
import BlurImage from '../ui/blur-image';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    description: 'Gourmet plant-based sandwiches with fresh ingredients',
    icon: <Sandwich size={24} />,
    image: 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?q=80&w=2525&auto=format&fit=crop',
    link: '/menu?category=sandwiches'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Ethically sourced, freshly brewed specialty coffee',
    icon: <Coffee size={24} />,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2537&auto=format&fit=crop',
    link: '/menu?category=coffee'
  },
  {
    id: 'soups',
    name: 'Soups',
    description: 'Hearty, homemade soups prepared with seasonal vegetables',
    icon: <Soup size={24} />,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2771&auto=format&fit=crop',
    link: '/menu?category=soups'
  }
];

const popularItems = [
  {
    id: 'grilled-cheese',
    name: 'Grilled Cheese Deluxe',
    description: 'Classic melted cheddar & mozzarella with a crispy golden crust',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2573&auto=format&fit=crop',
    price: '$8.99'
  },
  {
    id: 'tomato-soup',
    name: 'Tomato Basil Soup',
    description: 'Creamy roasted tomato soup with fresh basil and a hint of garlic',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=2574&auto=format&fit=crop',
    price: '$6.99'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and frothy foam',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=2274&auto=format&fit=crop',
    price: '$4.99'
  },
  {
    id: 'avocado-sandwich',
    name: 'Avocado & Sprouts Sandwich',
    description: 'Creamy avocado, alfalfa sprouts, tomatoes, and spicy mayo on whole wheat',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=2680&auto=format&fit=crop',
    price: '$10.99'
  }
];

const FeaturedSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const staggerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const items = categoryRef.current?.querySelectorAll('.stagger-item');
        items?.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, i * 100);
        });
      }
    }, { threshold: 0.1 });
    
    const popularObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const items = popularRef.current?.querySelectorAll('.stagger-item');
        items?.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, i * 100);
        });
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      const fadeElements = sectionRef.current.querySelectorAll('.fade-up');
      fadeElements.forEach(el => observer.observe(el));
    }
    
    if (categoryRef.current) {
      staggerObserver.observe(categoryRef.current);
    }
    
    if (popularRef.current) {
      popularObserver.observe(popularRef.current);
    }
    
    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
      popularObserver.disconnect();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Categories Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-up">Explore Our Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto fade-up">
              Discover our range of freshly prepared, plant-based options made with locally sourced ingredients
            </p>
          </div>
          
          <div ref={categoryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={category.link}
                className="stagger-item hover-lift rounded-xl overflow-hidden"
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md h-80">
                  <div className="absolute inset-0 w-full h-full">
                    <BlurImage 
                      src={category.image} 
                      alt={category.name}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary">
                      {category.icon}
                    </div>
                    
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/80 mb-4">{category.description}</p>
                      <div className="flex items-center text-sm font-medium group">
                        <span>View Items</span>
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Popular Items Section */}
        <div>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 fade-up">Popular Items</h2>
              <p className="text-muted-foreground fade-up">Our most loved dishes that keep customers coming back</p>
            </div>
            <Link to="/menu" className="hidden md:flex button-outline">
              See Full Menu
            </Link>
          </div>
          
          <div ref={popularRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item, index) => (
              <div 
                key={item.id}
                className={cn(
                  "stagger-item bg-white rounded-xl overflow-hidden shadow-md hover-lift",
                  `stagger-delay-${index + 1}`
                )}
              >
                <div className="relative h-48">
                  <BlurImage 
                    src={item.image} 
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-primary font-semibold">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="button-outline inline-flex">
              See Full Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

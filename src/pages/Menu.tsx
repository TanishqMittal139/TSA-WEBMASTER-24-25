import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { Coffee, Sandwich, Soup, Filter } from 'lucide-react';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const categories = [
  { id: 'all', name: 'All Items', icon: null },
  { id: 'sandwiches', name: 'Sandwiches', icon: <Sandwich size={18} /> },
  { id: 'soups', name: 'Soups', icon: <Soup size={18} /> },
  { id: 'coffee', name: 'Coffee', icon: <Coffee size={18} /> },
];

// Menu items data
const menuItems = [
  // Sandwiches
  {
    id: 'grilled-cheese',
    name: 'Grilled Cheese Deluxe',
    description: 'Classic melted cheddar & mozzarella with a crispy golden crust.',
    price: '$8.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2573&auto=format&fit=crop'
  },
  {
    id: 'caprese-panini',
    name: 'Caprese Panini',
    description: 'Fresh mozzarella, basil, and tomatoes with balsamic glaze on ciabatta.',
    price: '$9.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?q=80&w=2613&auto=format&fit=crop'
  },
  {
    id: 'avocado-sandwich',
    name: 'Avocado & Sprouts Sandwich',
    description: 'Creamy avocado, alfalfa sprouts, tomatoes, and spicy mayo on whole wheat.',
    price: '$10.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=2680&auto=format&fit=crop'
  },
  {
    id: 'mushroom-melt',
    name: 'Mushroom & Swiss Melt',
    description: 'Sautéed mushrooms with melted Swiss cheese on a toasted baguette.',
    price: '$9.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2640&auto=format&fit=crop'
  },
  
  // Soups
  {
    id: 'tomato-soup',
    name: 'Tomato Basil Soup',
    description: 'Creamy roasted tomato soup with fresh basil and a hint of garlic.',
    price: '$6.99',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 'butternut-squash',
    name: 'Butternut Squash Soup',
    description: 'Velvety smooth squash soup with a touch of cinnamon and nutmeg.',
    price: '$6.99',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2771&auto=format&fit=crop'
  },
  {
    id: 'minestrone',
    name: 'Minestrone Soup',
    description: 'Hearty Italian soup with tomatoes, beans, pasta, and seasonal vegetables.',
    price: '$7.99',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1605384226435-6a236b6ce4f1?q=80&w=2532&auto=format&fit=crop'
  },
  {
    id: 'lentil-soup',
    name: 'Lentil Soup',
    description: 'Protein-packed lentils simmered with carrots, celery, and aromatic spices.',
    price: '$7.99',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1562114938-7254dfc99a4f?q=80&w=2348&auto=format&fit=crop'
  },
  
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A rich, bold shot of concentrated coffee.',
    price: '$3.99',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1535403396060-dd9daec50b74?q=80&w=2235&auto=format&fit=crop'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and frothy foam.',
    price: '$4.99',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=2274&auto=format&fit=crop'
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    price: '$4.99',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=2225&auto=format&fit=crop'
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-steeped, smooth, and less acidic cold coffee.',
    price: '$5.99',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1559525832-cb0f00398399?q=80&w=2574&auto=format&fit=crop'
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && categories.some(c => c.id === category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
  }, [location.search]);
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  }, [filteredItems]);

  const handleAddToOrder = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: categories.find(c => c.id === item.category)?.name
    });
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2670&auto=format&fit=crop"
              alt="Menu banner"
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
                Our Menu
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Offerings</h1>
              <p className="text-muted-foreground max-w-xl">
                Fresh, sustainable ingredients prepared with care. All items are made to order.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-10 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full flex items-center space-x-2 transition-all",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary hover:bg-secondary/70 text-secondary-foreground"
                    )}
                  >
                    {category.icon && <span>{category.icon}</span>}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="stagger-item bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <BlurImage 
                      src={item.image} 
                      alt={item.name}
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {categories.find(c => c.id === item.category)?.name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <button 
                      onClick={() => handleAddToOrder(item)}
                      className="w-full px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded-md text-sm font-medium"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No menu items found for this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;

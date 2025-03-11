import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { Coffee, Sandwich, Soup, Filter, X, ChevronDown, Utensils, Cake, Salad, Croissant, Clock, TagIcon } from 'lucide-react';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { menuCategories, allMenuItems, dietaryTags, cuisineTypes, MenuItem } from '@/data/menu-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'sandwiches':
      return <Sandwich size={18} />;
    case 'soups':
      return <Soup size={18} />;
    case 'coffee':
      return <Coffee size={18} />;
    case 'salads':
      return <Salad size={18} />;
    case 'pastries':
      return <Croissant size={18} />;
    case 'desserts':
      return <Cake size={18} />;
    default:
      return <Utensils size={18} />;
  }
};

const Menu: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(allMenuItems);
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDietaryTags, setActiveDietaryTags] = useState<string[]>([]);
  const [activeCuisineTypes, setActiveCuisineTypes] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && menuCategories.some(c => c.id === category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
  }, [location.search]);
  
  useEffect(() => {
    let items = allMenuItems;
    
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (activeDietaryTags.length > 0) {
      items = items.filter(item => {
        return activeDietaryTags.every(tag => {
          switch (tag) {
            case 'vegetarian':
              return item.vegetarian;
            case 'vegan':
              return item.vegan;
            case 'gluten-free':
              return item.glutenFree;
            default:
              return item.tags?.includes(tag);
          }
        });
      });
    }
    
    if (activeCuisineTypes.length > 0) {
      items = items.filter(item => 
        item.cuisineType && activeCuisineTypes.includes(item.cuisineType.toLowerCase())
      );
    }
    
    setFilteredItems(items);
  }, [activeCategory, searchTerm, activeDietaryTags, activeCuisineTypes]);
  
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

  const handleAddToOrder = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: menuCategories.find(c => c.id === item.category)?.name
    });
  };
  
  const toggleDietaryTag = (tagId: string) => {
    setActiveDietaryTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId) 
        : [...prev, tagId]
    );
  };
  
  const toggleCuisineType = (cuisineId: string) => {
    setActiveCuisineTypes(prev => 
      prev.includes(cuisineId) 
        ? prev.filter(t => t !== cuisineId) 
        : [...prev, cuisineId]
    );
  };
  
  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveDietaryTags([]);
    setActiveCuisineTypes([]);
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
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Explore Our Offerings</h3>
              <p className="text-muted-foreground max-w-xl text-sm">
                Fresh, sustainable ingredients prepared with care. All items are made to order.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search menu items..."
                  className="w-full md:w-64 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-9">
                      <Filter size={14} />
                      <span className="text-sm">Filters</span>
                      {(activeDietaryTags.length > 0 || activeCuisineTypes.length > 0) && (
                        <Badge variant="secondary" className="ml-1 h-5 min-w-5 flex items-center justify-center text-xs">
                          {activeDietaryTags.length + activeCuisineTypes.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[350px] p-4">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium">Filter Menu</h3>
                        {(activeDietaryTags.length > 0 || activeCuisineTypes.length > 0) && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={clearAllFilters}>
                            Clear All
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1 overflow-auto space-y-5">
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                            <TagIcon size={14} />
                            Dietary Preferences
                          </h4>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {dietaryTags.map(tag => (
                              <Badge 
                                key={tag.id}
                                variant={activeDietaryTags.includes(tag.id) ? "default" : "outline"}
                                className="cursor-pointer text-xs"
                                onClick={() => toggleDietaryTag(tag.id)}
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Utensils size={14} />
                            Cuisine Types
                          </h4>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {cuisineTypes.map(cuisine => (
                              <Badge 
                                key={cuisine.id}
                                variant={activeCuisineTypes.includes(cuisine.id) ? "default" : "outline"}
                                className="cursor-pointer text-xs"
                                onClick={() => toggleCuisineType(cuisine.id)}
                              >
                                {cuisine.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <SheetClose asChild>
                        <Button className="mt-4" size="sm">Apply Filters</Button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-9">
                      <span className="text-sm">Sort</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-xs">Sort Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm">Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">Name: A to Z</DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">Popularity</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent pb-1">
              <div className="flex space-x-2 min-w-max">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    "px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all text-sm",
                    activeCategory === 'all'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary hover:bg-secondary/70 text-secondary-foreground"
                  )}
                >
                  <Utensils size={14} />
                  <span>All Items</span>
                </button>
                {menuCategories.filter(c => c.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all text-sm",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary hover:bg-secondary/70 text-secondary-foreground"
                    )}
                  >
                    {category.icon || getCategoryIcon(category.id)}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {(activeDietaryTags.length > 0 || activeCuisineTypes.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-xs text-muted-foreground">Active filters:</span>
                {activeDietaryTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 text-xs py-0.5 px-2"
                  >
                    {dietaryTags.find(t => t.id === tag)?.name}
                    <X 
                      size={12} 
                      className="cursor-pointer" 
                      onClick={() => toggleDietaryTag(tag)}
                    />
                  </Badge>
                ))}
                {activeCuisineTypes.map(cuisine => (
                  <Badge 
                    key={cuisine}
                    variant="secondary"
                    className="flex items-center gap-1 text-xs py-0.5 px-2"
                  >
                    {cuisineTypes.find(c => c.id === cuisine)?.name}
                    <X 
                      size={12} 
                      className="cursor-pointer" 
                      onClick={() => toggleCuisineType(cuisine)}
                    />
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-6 px-2" 
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative border border-border/30"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link to={`/menu/${item.id}`} className="block">
                    <div className="relative h-48">
                      <BlurImage 
                        src={item.image} 
                        alt={item.name}
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {menuCategories.find(c => c.id === item.category)?.name}
                        </div>
                        
                        {item.vegetarian && (
                          <div className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                            Vegetarian
                          </div>
                        )}
                        
                        {item.vegan && (
                          <div className="px-2 py-1 bg-green-600/90 text-white text-xs font-medium rounded-full">
                            Vegan
                          </div>
                        )}
                        
                        {item.glutenFree && (
                          <div className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-medium rounded-full">
                            Gluten-Free
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={cn(
                          "absolute inset-0 bg-background/90 p-4 flex flex-col justify-center transition-opacity duration-300",
                          hoveredItem === item.id ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                      >
                        <h4 className="font-bold text-lg mb-2">Nutrition Facts</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <span className="font-medium">Calories:</span> {item.nutrition?.calories}
                          </div>
                          <div>
                            <span className="font-medium">Protein:</span> {item.nutrition?.protein}
                          </div>
                          <div>
                            <span className="font-medium">Carbs:</span> {item.nutrition?.carbs}
                          </div>
                          <div>
                            <span className="font-medium">Fat:</span> {item.nutrition?.fat}
                          </div>
                        </div>
                        
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium text-yellow-600">Allergens:</span>{' '}
                            {item.allergens.join(', ')}
                          </div>
                        )}
                        
                        <div className="mt-auto text-xs text-muted-foreground italic">
                          Click for full details
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/menu/${item.id}`} className="block">
                        <h3 className="font-bold text-lg hover:text-primary transition-colors">{item.name}</h3>
                      </Link>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      {item.preparationTime && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={14} className="mr-1" />
                          <span>{item.preparationTime}</span>
                        </div>
                      )}
                      
                      {item.rating && (
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < Math.floor(item.rating as number) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs ml-1 text-muted-foreground">{item.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handleAddToOrder(item)}
                      className="w-full px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded-md text-sm font-medium"
                    >
                      Add to Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No menu items found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
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

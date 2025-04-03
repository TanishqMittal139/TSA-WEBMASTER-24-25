import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Search, Filter, X, Check, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { 
  menuCategories, 
  allMenuItems, 
  getMealsByCategory, 
  searchMeals,
  MenuItem, 
  cuisineTypes, 
  dietaryTags 
} from '@/data/menu-data';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define interfaces for our filter states
interface FilterState {
  dietary: string[];
  cuisine: string[];
  allergenFree: string[];
  priceRange: string;
  sortBy: string;
  rating: number | null;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>(allMenuItems);
  const [isSearching, setIsSearching] = useState(false);
  const { addItem } = useCart();
  
  // More refined filtering
  const [filters, setFilters] = useState<FilterState>({
    dietary: [],
    cuisine: [],
    allergenFree: [],
    priceRange: 'all',
    sortBy: 'default',
    rating: null
  });
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Filter and search the menu items whenever filters or search query changes
  useEffect(() => {
    let filteredItems: MenuItem[] = [];
    
    if (isSearching && searchQuery) {
      // If searching, use search results across all categories
      filteredItems = searchMeals(searchQuery);
    } else {
      // Otherwise filter by active category
      filteredItems = getMealsByCategory(activeCategory);
    }
    
    // Apply dietary filters
    if (filters.dietary.length > 0) {
      filteredItems = filteredItems.filter(item => {
        return filters.dietary.every(diet => {
          if (diet === 'vegetarian') return item.vegetarian;
          if (diet === 'vegan') return item.vegan;
          if (diet === 'gluten-free') return item.glutenFree;
          return true;
        });
      });
    }
    
    // Apply cuisine filters
    if (filters.cuisine.length > 0) {
      filteredItems = filteredItems.filter(item => 
        item.cuisineType && filters.cuisine.includes(item.cuisineType)
      );
    }
    
    // Apply allergen filters
    if (filters.allergenFree.length > 0) {
      filteredItems = filteredItems.filter(item => {
        if (!item.allergens) return true;
        return !item.allergens.some(allergen => 
          filters.allergenFree.includes(allergen.toLowerCase())
        );
      });
    }
    
    // Apply price range filter
    if (filters.priceRange !== 'all') {
      filteredItems = filteredItems.filter(item => {
        const price = parseFloat(item.price.replace('$', ''));
        
        switch (filters.priceRange) {
          case 'under-10':
            return price < 10;
          case '10-15':
            return price >= 10 && price <= 15;
          case '15-20':
            return price > 15 && price <= 20;
          case 'over-20':
            return price > 20;
          default:
            return true;
        }
      });
    }
    
    // Apply rating filter
    if (filters.rating) {
      filteredItems = filteredItems.filter(item => 
        item.rating && item.rating >= filters.rating
      );
    }
    
    // Apply sorting
    if (filters.sortBy !== 'default') {
      filteredItems.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low-high':
            return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
          case 'price-high-low':
            return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
          case 'name-a-z':
            return a.name.localeCompare(b.name);
          case 'name-z-a':
            return b.name.localeCompare(a.name);
          case 'rating-high-low':
            return (b.rating || 0) - (a.rating || 0);
          default:
            return 0;
        }
      });
    }
    
    setDisplayedItems(filteredItems);
    
    // Calculate active filters count
    let count = 0;
    count += filters.dietary.length;
    count += filters.cuisine.length;
    count += filters.allergenFree.length;
    if (filters.priceRange !== 'all') count++;
    if (filters.rating) count++;
    if (filters.sortBy !== 'default') count++;
    
    setActiveFiltersCount(count);
  }, [activeCategory, searchQuery, isSearching, filters]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(!!searchQuery);
    
    if (!searchQuery) {
      // If search is cleared, reset to the active category
      setDisplayedItems(getMealsByCategory(activeCategory));
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      dietary: [],
      cuisine: [],
      allergenFree: [],
      priceRange: 'all',
      sortBy: 'default',
      rating: null
    });
    setSearchQuery('');
    setIsSearching(false);
  };
  
  // Toggle filters for multi-select options
  const toggleFilter = (type: 'dietary' | 'cuisine' | 'allergenFree', value: string) => {
    setFilters(prevFilters => {
      const current = prevFilters[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prevFilters, [type]: updated };
    });
  };
  
  // Check if a filter is active
  const isFilterActive = (type: 'dietary' | 'cuisine' | 'allergenFree', value: string) => {
    return filters[type].includes(value);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
            <p className="text-muted-foreground">
              Explore our selection of fresh, plant-forward dishes
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full md:w-auto flex-1">
              <Input
                type="search"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Menu</SheetTitle>
                  <SheetDescription>
                    Customize your menu view with these filters.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6">
                  <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                    <Accordion type="multiple" defaultValue={['dietary', 'sort']}>
                      {/* Dietary Preferences */}
                      <AccordionItem value="dietary">
                        <AccordionTrigger>Dietary Preferences</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            {dietaryTags.map((diet) => (
                              <div key={diet.id} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`diet-${diet.id}`}
                                  checked={isFilterActive('dietary', diet.id)}
                                  onCheckedChange={() => toggleFilter('dietary', diet.id)}
                                />
                                <Label htmlFor={`diet-${diet.id}`}>{diet.name}</Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Cuisine Type */}
                      <AccordionItem value="cuisine">
                        <AccordionTrigger>Cuisine Type</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-2">
                            {cuisineTypes.map((cuisine) => (
                              <div key={cuisine.id} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`cuisine-${cuisine.id}`}
                                  checked={isFilterActive('cuisine', cuisine.id)}
                                  onCheckedChange={() => toggleFilter('cuisine', cuisine.id)}
                                />
                                <Label htmlFor={`cuisine-${cuisine.id}`}>{cuisine.name}</Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Allergen Free */}
                      <AccordionItem value="allergens">
                        <AccordionTrigger>Allergen Free</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            {['gluten', 'dairy', 'nuts', 'soy', 'eggs', 'fish', 'sesame'].map((allergen) => (
                              <div key={allergen} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`allergen-${allergen}`}
                                  checked={isFilterActive('allergenFree', allergen)}
                                  onCheckedChange={() => toggleFilter('allergenFree', allergen)}
                                />
                                <Label htmlFor={`allergen-${allergen}`}>No {allergen.charAt(0).toUpperCase() + allergen.slice(1)}</Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Price Range */}
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup 
                            value={filters.priceRange} 
                            onValueChange={(value) => setFilters({...filters, priceRange: value})}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="all" id="price-all" />
                              <Label htmlFor="price-all">All Prices</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="under-10" id="price-under-10" />
                              <Label htmlFor="price-under-10">Under $10</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="10-15" id="price-10-15" />
                              <Label htmlFor="price-10-15">$10 - $15</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="15-20" id="price-15-20" />
                              <Label htmlFor="price-15-20">$15 - $20</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="over-20" id="price-over-20" />
                              <Label htmlFor="price-over-20">Over $20</Label>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Rating */}
                      <AccordionItem value="rating">
                        <AccordionTrigger>Minimum Rating</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup 
                            value={filters.rating?.toString() || ''} 
                            onValueChange={(value) => setFilters({...filters, rating: value ? parseInt(value) : null})}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="" id="rating-any" />
                              <Label htmlFor="rating-any">Any Rating</Label>
                            </div>
                            {[3, 3.5, 4, 4.5].map((rating) => (
                              <div key={rating} className="flex items-center gap-2">
                                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                                <Label htmlFor={`rating-${rating}`} className="flex items-center">
                                  {rating}+ <Star className="h-3 w-3 fill-current text-yellow-500 ml-1" />
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Sort Options */}
                      <AccordionItem value="sort">
                        <AccordionTrigger>Sort By</AccordionTrigger>
                        <AccordionContent>
                          <Select 
                            value={filters.sortBy} 
                            onValueChange={(value) => setFilters({...filters, sortBy: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sort order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                              <SelectItem value="rating-high-low">Rating: High to Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </ScrollArea>
                </div>
                
                <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                  <div className="flex w-full gap-2">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">Reset All</Button>
                    <SheetClose asChild>
                      <Button className="flex-1">
                        Apply Filters
                      </Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Status Bar with active filters */}
        {(isSearching || activeFiltersCount > 0) && (
          <div className="bg-muted/40 rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center flex-wrap gap-2">
              {isSearching && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>Search: {searchQuery}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearching(false);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.dietary.map(diet => (
                <Badge key={diet} variant="secondary" className="flex items-center gap-1">
                  <span>{diet}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => toggleFilter('dietary', diet)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {filters.cuisine.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>Cuisines: {filters.cuisine.length}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setFilters({...filters, cuisine: []})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.allergenFree.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>Allergen-free: {filters.allergenFree.length}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setFilters({...filters, allergenFree: []})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.priceRange !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    {filters.priceRange === 'under-10' ? 'Under $10' : 
                     filters.priceRange === '10-15' ? '$10-$15' :
                     filters.priceRange === '15-20' ? '$15-$20' : 'Over $20'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setFilters({...filters, priceRange: 'all'})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>{filters.rating}+ Stars</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setFilters({...filters, rating: null})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.sortBy !== 'default' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    {filters.sortBy === 'price-low-high' ? 'Price: Low-High' :
                     filters.sortBy === 'price-high-low' ? 'Price: High-Low' :
                     filters.sortBy === 'name-a-z' ? 'Name: A-Z' :
                     filters.sortBy === 'name-z-a' ? 'Name: Z-A' : 'Rating: High-Low'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setFilters({...filters, sortBy: 'default'})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
            
            <Button variant="ghost" size="sm" onClick={resetFilters}>Clear All</Button>
          </div>
        )}
        
        {/* Menu Categories */}
        {!isSearching && (
          <Tabs 
            defaultValue="all" 
            value={activeCategory} 
            onValueChange={setActiveCategory} 
            className="mb-8"
          >
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="mb-4">
                {menuCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            
            {menuCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {/* Category content is handled by the displayedItems state */}
              </TabsContent>
            ))}
          </Tabs>
        )}
        
        {/* Menu Items Grid */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden h-full flex flex-col">
                <Link to={`/menu/${item.id}`} className="group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.popular && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        Popular
                      </Badge>
                    )}
                    
                    {/* Show dietary badges */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {item.vegetarian && (
                        <Badge variant="outline" className="bg-background/80 border-green-500 text-green-600 text-xs">
                          Vegetarian
                        </Badge>
                      )}
                      {item.vegan && (
                        <Badge variant="outline" className="bg-background/80 border-green-600 text-green-700 text-xs">
                          Vegan
                        </Badge>
                      )}
                      {item.glutenFree && (
                        <Badge variant="outline" className="bg-background/80 border-amber-500 text-amber-600 text-xs">
                          GF
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
                
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="mb-1 flex justify-between items-start">
                    <Link to={`/menu/${item.id}`} className="group">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {/* Show rating if available */}
                    {item.rating && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Tags row */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge variant="outline" className="text-xs cursor-pointer">
                              +{item.tags.length - 2}
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  )}
                  
                  {/* Price and Add button */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <div>
                      {item.hasDiscount && item.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{item.discountPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            {item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-semibold">{item.price}</span>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => addItem({
                        id: item.id,
                        name: item.name,
                        price: item.hasDiscount && item.discountPrice ? item.discountPrice : item.price,
                        image: item.image,
                        category: item.category,
                        hasDiscount: item.hasDiscount
                      })}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium mb-2">No matching items found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;

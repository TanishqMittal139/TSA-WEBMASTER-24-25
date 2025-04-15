
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { 
  menuCategories, 
  getAllMeals,
  getMealsByCategory,
  dietaryTags,
  cuisineTypes,
  MenuItem
} from '@/data/menu-data';
import { Search, Filter, XCircle } from 'lucide-react';
import { NutritionCard } from '@/components/ui/nutrition-card';

const Menu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [displayedMeals, setDisplayedMeals] = useState<MenuItem[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const allMeals = getAllMeals();

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && menuCategories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
    
    // Filter meals based on active criteria
    filterMeals();

    // Check if any filters are active
    setIsFilterActive(!!searchTerm || !!dietaryFilter || !!cuisineFilter);
  }, [location.search, activeCategory, searchTerm, dietaryFilter, cuisineFilter]);

  const filterMeals = () => {
    // Start with category filter
    let filteredMeals = activeCategory === 'all' ? getAllMeals() : getMealsByCategory(activeCategory);
    
    // Apply search term filter if any
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredMeals = filteredMeals.filter(meal => 
        meal.name.toLowerCase().includes(term) || 
        meal.description.toLowerCase().includes(term) ||
        (meal.tags && meal.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply dietary filter if any
    if (dietaryFilter && dietaryFilter !== 'all_dietary') {
      switch (dietaryFilter) {
        case 'vegetarian':
          filteredMeals = filteredMeals.filter(meal => meal.vegetarian);
          break;
        case 'vegan':
          filteredMeals = filteredMeals.filter(meal => meal.vegan);
          break;
        case 'gluten-free':
          filteredMeals = filteredMeals.filter(meal => meal.glutenFree);
          break;
      }
    }
    
    // Apply cuisine filter if any
    if (cuisineFilter && cuisineFilter !== 'all_cuisines') {
      filteredMeals = filteredMeals.filter(meal => meal.cuisineType === cuisineFilter);
    }
    
    // Ensure no duplicates in the results
    const uniqueMeals = Array.from(new Map(filteredMeals.map(meal => [meal.id, meal])).values());
    setDisplayedMeals(uniqueMeals);
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDietaryFilterChange = (value: string) => {
    setDietaryFilter(value);
  };

  const handleCuisineFilterChange = (value: string) => {
    setCuisineFilter(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDietaryFilter('');
    setCuisineFilter('');
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-28 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground relative inline-block">
            Our Menu
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary/50 rounded-full animate-pulse"></span>
          </h1>
          
          <p className="text-muted-foreground mt-2 md:mt-0 max-w-md">
            Discover our nutritionally balanced dishes crafted with fresh ingredients for a healthier you
          </p>
        </div>
        
        {/* Search and filter section */}
        <div className="mb-8 space-y-4 glass-card dark:bg-black/20 bg-white/30 p-6 rounded-xl backdrop-blur-md border border-white/20 dark:border-white/10 animate-scale-in">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search our menu..."
                className="pl-10 bg-background/50 backdrop-blur border-primary/20 focus:border-primary transition-all"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>
            
            <Button 
              variant={isFilterActive ? "default" : "outline"} 
              className="flex items-center gap-2 min-w-[120px]"
              onClick={isFilterActive ? clearFilters : undefined}
            >
              {isFilterActive ? (
                <>
                  <XCircle size={16} />
                  <span>Clear</span>
                </>
              ) : (
                <>
                  <Filter size={16} />
                  <span>Filter</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Select value={dietaryFilter} onValueChange={handleDietaryFilterChange}>
                <SelectTrigger className="bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
                  <SelectValue placeholder="Dietary Preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_dietary">All Dietary Preferences</SelectItem>
                  {dietaryTags.map(tag => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={cuisineFilter} onValueChange={handleCuisineFilterChange}>
                <SelectTrigger className="bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_cuisines">All Cuisines</SelectItem>
                  {cuisineTypes.map(cuisine => (
                    <SelectItem key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-12">
          <TabsList className="mb-8 flex flex-wrap bg-background/20 backdrop-blur-md p-1 rounded-xl border border-white/10">
            <TabsTrigger value="all" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All
            </TabsTrigger>
            {menuCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMeals.length > 0 ? (
                displayedMeals.map((meal, index) => (
                  <div 
                    key={meal.id}
                    className={`transition-all duration-500 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MealCard meal={meal} />
                  </div>
                ))
              ) : (
                <NoResults clearFilters={clearFilters} />
              )}
            </div>
          </TabsContent>
          
          {menuCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMeals.length > 0 ? (
                  displayedMeals.map((meal, index) => (
                    <div 
                      key={meal.id}
                      className={`transition-all duration-500 animate-fade-in`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <MealCard meal={meal} />
                    </div>
                  ))
                ) : (
                  <NoResults clearFilters={clearFilters} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

// Meal Card Component
const MealCard = ({ meal }: { meal: MenuItem }) => {
  // Fallback image for meals without images
  const fallbackImage = "/placeholder.svg";
  
  return (
    <NutritionCard 
      nutrition={meal.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}}
      name={meal.name}
    >
      <Link to={`/menu/${meal.id}`} className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
            <img
              src={meal.image || fallbackImage}
              alt={meal.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
            {meal.hasDiscount && (
              <div className="absolute top-2 right-2 animate-pulse">
                <Badge className="bg-red-500 text-white font-semibold px-3 py-1">
                  Special Offer
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-foreground">{meal.name}</h3>
              <div>
                {meal.hasDiscount ? (
                  <div className="text-right">
                    <span className="line-through text-muted-foreground text-sm mr-2">
                      {meal.price}
                    </span>
                    <span className="text-red-500 font-semibold">
                      {meal.discountPrice}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-foreground">{meal.price}</span>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mt-2 mb-3 line-clamp-2">
              {meal.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {meal.vegetarian && (
                <Badge variant="outline" className="text-xs border-green-500 text-green-600 dark:text-green-400">
                  Vegetarian
                </Badge>
              )}
              {meal.vegan && (
                <Badge variant="outline" className="text-xs border-green-600 text-green-700 dark:text-green-500">
                  Vegan
                </Badge>
              )}
              {meal.glutenFree && (
                <Badge variant="outline" className="text-xs border-amber-500 text-amber-600 dark:text-amber-400">
                  Gluten-Free
                </Badge>
              )}
              {meal.cuisineType && (
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {meal.cuisineType.charAt(0).toUpperCase() + meal.cuisineType.slice(1)}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </NutritionCard>
  );
};

// No Results Component
const NoResults = ({ clearFilters }: { clearFilters: () => void }) => {
  return (
    <div className="text-center py-16 animate-fade-in col-span-3">
      <div className="mb-4 text-6xl">🍽️</div>
      <p className="text-xl text-muted-foreground mb-4">No items match your current filters.</p>
      <Button variant="default" onClick={clearFilters} className="mt-4 px-6">
        Clear Filters
      </Button>
    </div>
  );
};

export default Menu;

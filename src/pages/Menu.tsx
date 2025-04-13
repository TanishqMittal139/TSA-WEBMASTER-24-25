
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
import { Search } from 'lucide-react';
import { NutritionCard } from '@/components/ui/nutrition-card';

const Menu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [displayedMeals, setDisplayedMeals] = useState<MenuItem[]>([]);
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
    if (dietaryFilter) {
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
        // Add more dietary filters as needed
      }
    }
    
    // Apply cuisine filter if any
    if (cuisineFilter) {
      filteredMeals = filteredMeals.filter(meal => meal.cuisineType === cuisineFilter);
    }
    
    setDisplayedMeals(filteredMeals);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/70">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Our Menu</h1>
        
        {/* Search and filter section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search our menu..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={dietaryFilter} onValueChange={handleDietaryFilterChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Dietary Preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Dietary Preferences</SelectItem>
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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cuisine Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  {cuisineTypes.map(cuisine => (
                    <SelectItem key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Category tabs */}
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="all" className="px-6">
              All
            </TabsTrigger>
            {menuCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="px-6">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMeals.map(meal => (
                <NutritionCard 
                  key={meal.id}
                  nutrition={meal.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}}
                  name={meal.name}
                >
                  <Link to={`/menu/${meal.id}`} className="block h-full">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                      <div className="aspect-w-16 aspect-h-9 relative h-48">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                        {meal.hasDiscount && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-red-500 text-white">
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
                            <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                              Vegetarian
                            </Badge>
                          )}
                          {meal.vegan && (
                            <Badge variant="outline" className="text-xs border-green-600 text-green-700">
                              Vegan
                            </Badge>
                          )}
                          {meal.glutenFree && (
                            <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">
                              Gluten-Free
                            </Badge>
                          )}
                          {meal.cuisineType && (
                            <Badge variant="secondary" className="text-xs">
                              {meal.cuisineType.charAt(0).toUpperCase() + meal.cuisineType.slice(1)}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </NutritionCard>
              ))}
            </div>
            
            {displayedMeals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items match your current filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          {menuCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMeals.map(meal => (
                  <NutritionCard 
                    key={meal.id}
                    nutrition={meal.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}}
                    name={meal.name}
                  >
                    <Link to={`/menu/${meal.id}`} className="block h-full">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                        <div className="aspect-w-16 aspect-h-9 relative h-48">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                          {meal.hasDiscount && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-red-500 text-white">
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
                              <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                                Vegetarian
                              </Badge>
                            )}
                            {meal.vegan && (
                              <Badge variant="outline" className="text-xs border-green-600 text-green-700">
                                Vegan
                              </Badge>
                            )}
                            {meal.glutenFree && (
                              <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">
                                Gluten-Free
                              </Badge>
                            )}
                            {meal.cuisineType && (
                              <Badge variant="secondary" className="text-xs">
                                {meal.cuisineType.charAt(0).toUpperCase() + meal.cuisineType.slice(1)}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </NutritionCard>
                ))}
              </div>
              
              {displayedMeals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No items match your current filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;

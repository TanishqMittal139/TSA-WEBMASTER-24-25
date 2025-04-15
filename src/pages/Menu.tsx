
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import SearchFilters from '@/components/menu/SearchFilters';
import MenuTabs from '@/components/menu/MenuTabs';
import { 
  menuCategories, 
  getAllMeals,
  getMealsByCategory,
  MenuItem
} from '@/data/menu-data';

const Menu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [displayedMeals, setDisplayedMeals] = useState<MenuItem[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

        <SearchFilters
          searchTerm={searchTerm}
          dietaryFilter={dietaryFilter}
          cuisineFilter={cuisineFilter}
          isFilterActive={isFilterActive}
          onSearchChange={handleSearchChange}
          onDietaryFilterChange={setDietaryFilter}
          onCuisineFilterChange={setCuisineFilter}
          onClearFilters={clearFilters}
        />

        <MenuTabs
          activeCategory={activeCategory}
          displayedMeals={displayedMeals}
          onCategoryChange={setActiveCategory}
          onClearFilters={clearFilters}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;

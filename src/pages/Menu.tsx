import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import SearchFilters from '@/components/menu/SearchFilters';
import MenuTabs from '@/components/menu/MenuTabs';
import AnimatedHeader from '@/components/ui/animated-header';
import BlurImage from '@/components/ui/blur-image';
import { 
  menuCategories, 
  getAllMeals,
  getMealsByCategory,
} from '@/data/menu';
import { MenuItem } from '@/types/menu';

const Menu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [displayedMeals, setDisplayedMeals] = useState<MenuItem[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && menuCategories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
    
    filterMeals();

    setIsFilterActive(!!searchTerm || !!dietaryFilter || !!cuisineFilter);
  }, [location.search, activeCategory, searchTerm, dietaryFilter, cuisineFilter]);

  const filterMeals = () => {
    let filteredMeals = activeCategory === 'all' ? getAllMeals() : getMealsByCategory(activeCategory);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredMeals = filteredMeals.filter(meal => 
        meal.name.toLowerCase().includes(term) || 
        meal.description.toLowerCase().includes(term) ||
        (meal.tags && meal.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
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
    
    if (cuisineFilter && cuisineFilter !== 'all_cuisines') {
      filteredMeals = filteredMeals.filter(meal => meal.cuisineType === cuisineFilter);
    }
    
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
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop"
              alt="Our Menu"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <AnimatedHeader 
              title="Our Menu" 
              subtitle="Discover our nutritionally balanced dishes crafted with fresh ingredients for a healthier you"
              className="mb-12"
            />
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;

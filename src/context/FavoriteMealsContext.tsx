
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type FavoriteMeal = {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
};

type FavoriteMealsContextType = {
  favoriteMeals: FavoriteMeal[];
  addFavoriteMeal: (meal: FavoriteMeal) => void;
  removeFavoriteMeal: (id: string) => void;
  isFavoriteMeal: (id: string) => boolean;
};

const FavoriteMealsContext = createContext<FavoriteMealsContextType | undefined>(undefined);

export const FavoriteMealsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteMeals, setFavoriteMeals] = useState<FavoriteMeal[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tastyHubFavoriteMeals');
    if (savedFavorites) {
      try {
        setFavoriteMeals(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorite meals data from localStorage', error);
        localStorage.removeItem('tastyHubFavoriteMeals');
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tastyHubFavoriteMeals', JSON.stringify(favoriteMeals));
  }, [favoriteMeals]);
  
  const addFavoriteMeal = (meal: FavoriteMeal) => {
    if (!isFavoriteMeal(meal.id)) {
      setFavoriteMeals(prev => [...prev, meal]);
      toast({
        title: "Meal Favorited",
        description: `${meal.name} has been added to your favorite meals.`,
        duration: 3000,
      });
    }
  };
  
  const removeFavoriteMeal = (id: string) => {
    const mealToRemove = favoriteMeals.find(meal => meal.id === id);
    if (mealToRemove) {
      setFavoriteMeals(prev => prev.filter(meal => meal.id !== id));
      toast({
        title: "Meal Removed",
        description: `${mealToRemove.name} has been removed from your favorite meals.`,
        duration: 3000,
      });
    }
  };
  
  const isFavoriteMeal = (id: string) => {
    return favoriteMeals.some(meal => meal.id === id);
  };
  
  return (
    <FavoriteMealsContext.Provider value={{ 
      favoriteMeals, 
      addFavoriteMeal, 
      removeFavoriteMeal, 
      isFavoriteMeal 
    }}>
      {children}
    </FavoriteMealsContext.Provider>
  );
};

export const useFavoriteMeals = () => {
  const context = useContext(FavoriteMealsContext);
  if (context === undefined) {
    throw new Error('useFavoriteMeals must be used within a FavoriteMealsProvider');
  }
  return context;
};

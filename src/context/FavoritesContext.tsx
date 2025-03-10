
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type FavoriteLocation = {
  id: string;
  name: string;
};

type FavoritesContextType = {
  favoriteLocations: FavoriteLocation[];
  addFavoriteLocation: (location: FavoriteLocation) => void;
  removeFavoriteLocation: (id: string) => void;
  isFavoriteLocation: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteLocations, setFavoriteLocations] = useState<FavoriteLocation[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tastyHubFavoriteLocations');
    if (savedFavorites) {
      try {
        setFavoriteLocations(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites data from localStorage', error);
        localStorage.removeItem('tastyHubFavoriteLocations');
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tastyHubFavoriteLocations', JSON.stringify(favoriteLocations));
  }, [favoriteLocations]);
  
  const addFavoriteLocation = (location: FavoriteLocation) => {
    if (!isFavoriteLocation(location.id)) {
      setFavoriteLocations(prev => [...prev, location]);
      toast({
        title: "Location Favorited",
        description: `${location.name} has been added to your favorite locations.`,
        duration: 3000,
      });
    }
  };
  
  const removeFavoriteLocation = (id: string) => {
    const locationToRemove = favoriteLocations.find(loc => loc.id === id);
    if (locationToRemove) {
      setFavoriteLocations(prev => prev.filter(loc => loc.id !== id));
      toast({
        title: "Location Removed",
        description: `${locationToRemove.name} has been removed from your favorite locations.`,
        duration: 3000,
      });
    }
  };
  
  const isFavoriteLocation = (id: string) => {
    return favoriteLocations.some(loc => loc.id === id);
  };
  
  return (
    <FavoritesContext.Provider value={{ 
      favoriteLocations, 
      addFavoriteLocation, 
      removeFavoriteLocation, 
      isFavoriteLocation 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

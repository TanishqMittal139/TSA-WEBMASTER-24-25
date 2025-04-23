
import { MenuItem } from '@/types/menu';
import { menuItems } from './menu-items';
import { additionalMenuItems } from './additional-menu-items';

// Get all menu items
export const getAllMeals = (): MenuItem[] => [...menuItems, ...additionalMenuItems];

export const getMealsByCategory = (category: string): MenuItem[] => {
  if (category === 'all') {
    return getAllMeals();
  }
  return [...menuItems, ...additionalMenuItems].filter(meal => meal.category === category);
};

// Return only 4 popular meals, each assigned a unique fallback image if needed
export const getPopularMeals = (): MenuItem[] => {
  const popular: MenuItem[] = [...menuItems, ...additionalMenuItems].slice(0, 4);

  // Unique fallback images from the provided placeholder set
  const fallbacks = [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop"
  ];

  // Ensure each meal gets a unique fallback if they lack image/imageUrl
  return popular.map((meal, i) => ({
    ...meal,
    image: meal.image || meal.imageUrl || fallbacks[i % fallbacks.length]
  }));
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return [...menuItems, ...additionalMenuItems].find(item => item.id === id);
};

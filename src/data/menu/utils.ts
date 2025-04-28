
import { MenuItem } from '@/types/menu';
import { menuItems } from './menu-items';
import { additionalMenuItems } from './additional-menu-items';

// Get all menu items
export const getAllMeals = (): MenuItem[] => {
  const allItems = [...menuItems, ...additionalMenuItems];
  
  // Ensure all items have valid image URLs
  return allItems.map(item => ({
    ...item,
    image: item.imageUrl || item.image || getCategoryFallbackImage(item.category)
  }));
};

// Get a fallback image based on category
const getCategoryFallbackImage = (category: string): string => {
  const categoryFallbacks: Record<string, string> = {
    entrees: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    sides: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop",
    beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop"
  };
  
  return categoryFallbacks[category.toLowerCase()] || '/placeholder.svg';
};

export const getMealsByCategory = (category: string): MenuItem[] => {
  const items = category === 'all' ? 
    getAllMeals() : 
    [...menuItems, ...additionalMenuItems].filter(meal => meal.category === category);
  
  // Ensure all items have valid image URLs
  return items.map(item => ({
    ...item,
    image: item.imageUrl || item.image || getCategoryFallbackImage(item.category)
  }));
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
  console.log("getMenuItemById called for:", id);
  const allMeals = [...menuItems, ...additionalMenuItems];
  const foundItem = allMeals.find(item => item.id === id);
  
  if (foundItem) {
    const enhancedItem = {
      ...foundItem,
      image: foundItem.imageUrl || foundItem.image || getCategoryFallbackImage(foundItem.category)
    };
    console.log("Found item:", enhancedItem.name, "with image:", enhancedItem.image);
    return enhancedItem;
  }
  
  console.log("Item not found for id:", id);
  return undefined;
};

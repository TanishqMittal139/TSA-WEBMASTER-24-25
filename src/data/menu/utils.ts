
import { MenuItem } from '@/types/menu';
import { menuItems } from './menu-items';
import { additionalMenuItems } from './additional-menu-items';

// Filter function to only include vegetarian or vegan meals
const isVegetarianOrVegan = (item: MenuItem): boolean => {
  return item.vegetarian === true || item.vegan === true;
};

// Filter additional menu items to only include vegetarian or vegan items
const filteredAdditionalMenuItems = additionalMenuItems.filter(isVegetarianOrVegan);

// Set of reliable placeholder images that work well with resizing
const RELIABLE_IMAGES = [
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop"
];

// Get all menu items
export const getAllMeals = (): MenuItem[] => {
  const allItems = [...menuItems, ...filteredAdditionalMenuItems];
  
  // Ensure all items have valid image URLs
  return allItems.map(item => ({
    ...item,
    image: getValidImageUrl(item)
  }));
};

// Get a valid image URL for a menu item - this is the single source of truth for image URLs
export const getValidImageUrl = (item: MenuItem): string => {
  // Prioritize any available image source
  const imageSource = item.imageUrl || item.image || getCategoryFallbackImage(item.category);
  
  // If the image URL contains "unsplash" and doesn't have size parameters, add them
  if (imageSource && imageSource.includes('unsplash.com') && !imageSource.includes('w=')) {
    return `${imageSource}?w=800&auto=format&fit=crop`;
  }
  
  return imageSource;
};

// Get a fallback image based on category
const getCategoryFallbackImage = (category: string): string => {
  const categoryFallbacks: Record<string, string> = {
    entrees: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    sides: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop",
    beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop",
    breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop",
    lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    dinner: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop"
  };
  
  return categoryFallbacks[category.toLowerCase()] || RELIABLE_IMAGES[Math.floor(Math.random() * RELIABLE_IMAGES.length)];
};

export const getMealsByCategory = (category: string): MenuItem[] => {
  const items = category === 'all' ? 
    getAllMeals() : 
    [...menuItems, ...filteredAdditionalMenuItems].filter(meal => meal.category === category);
  
  // Ensure all items have valid image URLs
  return items.map(item => ({
    ...item,
    image: getValidImageUrl(item)
  }));
};

// Return only 4 popular meals, each assigned a unique fallback image if needed
export const getPopularMeals = (): MenuItem[] => {
  const popular: MenuItem[] = [...menuItems, ...filteredAdditionalMenuItems].slice(0, 4);

  // Use the reliable fallbacks
  return popular.map((meal, i) => ({
    ...meal,
    image: getValidImageUrl(meal) || RELIABLE_IMAGES[i % RELIABLE_IMAGES.length]
  }));
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  console.log("getMenuItemById called for:", id);
  const allMeals = [...menuItems, ...filteredAdditionalMenuItems];
  const foundItem = allMeals.find(item => item.id === id);
  
  if (foundItem) {
    const enhancedItem = {
      ...foundItem,
      image: getValidImageUrl(foundItem)
    };
    console.log("Found item:", enhancedItem.name, "with image:", enhancedItem.image);
    return enhancedItem;
  }
  
  console.log("Item not found for id:", id);
  return undefined;
};

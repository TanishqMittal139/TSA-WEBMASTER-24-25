
import { MenuItem } from '@/types/menu';
import { menuItems } from './menu-items';
import { additionalMenuItems } from './additional-menu-items';

// Expanded set of unique placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&auto=format&fit=crop"
];

// Get all menu items
export const getAllMeals = (): MenuItem[] => [...menuItems, ...additionalMenuItems];

export const getMealsByCategory = (category: string): MenuItem[] => {
  if (category === 'all') {
    return getAllMeals();
  }
  return [...menuItems, ...additionalMenuItems].filter(meal => meal.category === category);
};

// Return only 4 popular meals, each with a unique fallback image
export const getPopularMeals = (): MenuItem[] => {
  const allMeals = [...menuItems, ...additionalMenuItems];
  
  // Ensure unique images for popular meals
  return allMeals.slice(0, 4).map((meal, index) => ({
    ...meal,
    image: meal.image || meal.imageUrl || placeholderImages[index % placeholderImages.length]
  }));
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  console.log("getMenuItemById called for:", id);
  const allMeals = [...menuItems, ...additionalMenuItems];
  const foundItem = allMeals.find(item => item.id === id);
  
  // If item found and no image, assign a unique placeholder
  if (foundItem && !foundItem.image && !foundItem.imageUrl) {
    const imageIndex = allMeals.indexOf(foundItem) % placeholderImages.length;
    foundItem.image = placeholderImages[imageIndex];
  }
  
  console.log("Found item:", foundItem ? foundItem.name : "Not found");
  return foundItem;
};


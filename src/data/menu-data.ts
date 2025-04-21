import { FileText, Utensils, Percent, Navigation, Tag } from 'lucide-react';
import { additionalMenuItems } from './additional-menu-items';

export const menuCategories = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'entrees', name: 'Entrées', icon: Utensils },
  { id: 'sides', name: 'Sides', icon: Tag },
  { id: 'desserts', name: 'Desserts', icon: Utensils },
  { id: 'beverages', name: 'Beverages', icon: Navigation }
];

export interface NutritionInfo {
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
  sodium?: number | string;
  fiber?: number | string;
  sugar?: number | string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  cuisineType: string;
  tags?: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  
  image?: string;
  nutrition?: NutritionInfo;
  hasDiscount?: boolean;
  discountPrice?: number;
  rating?: number;
  allergens?: string[];
  preparationTime?: string;
  ingredients?: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a09aa3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8MA==',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pizza', 'italian'],
    vegetarian: true,
    nutrition: {
      calories: 850,
      protein: '30g',
      carbs: '95g',
      fat: '28g'
    }
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-490e7991940f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8MA==',
    category: 'sides',
    cuisineType: 'american',
    tags: ['salad', 'healthy'],
    vegetarian: true,
    glutenFree: true
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1630743252587-ac5416f2c080?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['chocolate', 'cake'],
    vegetarian: true
  },
  {
    id: '4',
    name: 'Iced Coffee',
    description: 'Refreshing iced coffee with your choice of flavor.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-162358835d0f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWNlZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['coffee', 'iced'],
    vegetarian: true,
    vegan: true
  },
  {
    id: '5',
    name: 'Spaghetti Bolognese',
    description: 'Classic spaghetti with a rich meat sauce.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1674492153593-5f9a9727899f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fDA=',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pasta', 'italian']
  },
  {
    id: '6',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic and herbs.',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'sides',
    cuisineType: 'american',
    tags: ['bread', 'garlic'],
    vegetarian: true
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and cocoa.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1633978372244-3967657c5619?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlyYW1pc3V8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'italian',
    tags: ['tiramisu', 'coffee'],
    vegetarian: true
  },
  {
    id: '8',
    name: 'Lemonade',
    description: 'Refreshing lemonade with a hint of lemon.',
    price: 2.99,
    imageUrl: 'https://images.unsplash.com/photo-1563720239558-9ea5c06c339a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVtb25hZGV8ZW58MHx8MHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['lemonade', 'refreshing'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  },
  {
    id: '9',
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'entrees',
    cuisineType: 'american',
    tags: ['salad', 'healthy', 'chicken'],
  },
  {
    id: '10',
    name: 'Mashed Potatoes',
    description: 'Creamy mashed potatoes with butter and herbs.',
    price: 6.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'sides',
    cuisineType: 'american',
    tags: ['potatoes', 'creamy'],
    vegetarian: true,
    glutenFree: true
  },
  {
    id: '11',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream.',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['ice cream', 'vanilla'],
    vegetarian: true
  },
  {
    id: '12',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['juice', 'orange'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  },
];

export const dietaryTags = [
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'gluten-free', name: 'Gluten-Free' }
];

export const cuisineTypes = [
  { id: 'italian', name: 'Italian' },
  { id: 'american', name: 'American' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'indian', name: 'Indian' }
];

export const getAllMeals = (): MenuItem[] => [...menuItems, ...additionalMenuItems];

export const getMealsByCategory = (category: string): MenuItem[] => {
  if (category === 'all') {
    return getAllMeals();
  }
  return [...menuItems, ...additionalMenuItems].filter(meal => meal.category === category);
};

export const getPopularMeals = (): MenuItem[] => {
  return [...menuItems, ...additionalMenuItems].slice(0, 6);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return [...menuItems, ...additionalMenuItems].find(item => item.id === id);
};

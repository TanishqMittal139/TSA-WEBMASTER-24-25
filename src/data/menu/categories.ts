
import { FileText, Utensils, Percent, Navigation, Tag } from 'lucide-react';
import { MenuCategory, CuisineType, DietaryTag } from '@/types/menu';

export const menuCategories: MenuCategory[] = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'entrees', name: 'Entrées', icon: Utensils },
  { id: 'sides', name: 'Sides', icon: Tag },
  { id: 'desserts', name: 'Desserts', icon: Utensils },
  { id: 'beverages', name: 'Beverages', icon: Navigation },
  { id: 'lunch', name: 'Lunch', icon: Utensils }
];

export const dietaryTags: DietaryTag[] = [
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'gluten-free', name: 'Gluten-Free' }
];

export const cuisineTypes: CuisineType[] = [
  { id: 'italian', name: 'Italian' },
  { id: 'american', name: 'American' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'indian', name: 'Indian' }
];

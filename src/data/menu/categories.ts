
import { FileText, Utensils, Percent, Navigation, Tag, Coffee } from 'lucide-react';
import { MenuCategory, CuisineType, DietaryTag } from '@/types/menu';

export const menuCategories: MenuCategory[] = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'entrees', name: 'Entrées', icon: Utensils },
  { id: 'sides', name: 'Sides', icon: Tag },
  { id: 'lunch', name: 'Lunch', icon: FileText },
  { id: 'breakfast', name: 'Breakfast', icon: Coffee },
  { id: 'dinner', name: 'Dinner', icon: Utensils },
  { id: 'desserts', name: 'Desserts', icon: Utensils },
  { id: 'beverages', name: 'Beverages', icon: Navigation }
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
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'asian', name: 'Asian' },
  { id: 'indian', name: 'Indian' },
  { id: 'french', name: 'French' },
  { id: 'international', name: 'International' }
];

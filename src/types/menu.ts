
import { LucideIcon } from 'lucide-react';

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

export interface NutritionInfo {
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
  sodium?: number | string;
  fiber?: number | string;
  sugar?: number | string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface CuisineType {
  id: string;
  name: string;
}

export interface DietaryTag {
  id: string;
  name: string;
}

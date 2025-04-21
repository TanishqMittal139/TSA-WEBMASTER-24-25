
import { MenuItem } from '@/types/menu';
import { menuItems } from './menu-items';
import { additionalMenuItems } from './additional-menu-items';

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

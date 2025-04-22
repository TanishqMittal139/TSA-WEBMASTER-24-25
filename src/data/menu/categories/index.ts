
import { MenuItem } from '@/types/menu';
import { entreeItems } from './entrees';
import { sideItems } from './sides';
import { dessertItems } from './desserts';
import { beverageItems } from './beverages';

// Combine all category items into a single menuItems array
export const menuItems: MenuItem[] = [
  ...entreeItems,
  ...sideItems,
  ...dessertItems,
  ...beverageItems
];

// Also export the individual category arrays
export {
  entreeItems,
  sideItems,
  dessertItems,
  beverageItems
};

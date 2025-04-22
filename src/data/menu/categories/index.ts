
import { MenuItem } from '@/types/menu';
import { entreeItems } from './entrees';
import { sideItems } from './sides';
import { dessertItems } from './desserts';
import { beverageItems } from './beverages';

export const menuItems: MenuItem[] = [
  ...entreeItems,
  ...sideItems,
  ...dessertItems,
  ...beverageItems
];

export {
  entreeItems,
  sideItems,
  dessertItems,
  beverageItems
};


// Import from the correct location - the categories/index.ts file
export { menuItems } from './categories/index';

// Also export filtered menu items that are vegetarian or vegan only
export const vegetarianMenuItems = menuItems.filter(
  item => item.vegetarian === true || item.vegan === true
);


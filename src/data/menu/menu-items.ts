
// Import from the correct location - the categories/index.ts file
import { menuItems } from './categories/index';

// Export the menuItems
export { menuItems };

// Also export filtered menu items that are vegetarian or vegan only
export const vegetarianMenuItems = menuItems.filter(
  item => item.vegetarian === true || item.vegan === true
);

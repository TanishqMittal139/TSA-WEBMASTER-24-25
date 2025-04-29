
import { MenuItem } from '@/types/menu';
import { entreeItems } from './entrees';
import { sideItems } from './sides';
import { dessertItems } from './desserts';
import { beverageItems } from './beverages';

// Filter function to only include vegetarian or vegan meals
const isVegetarianOrVegan = (item: MenuItem): boolean => {
  return item.vegetarian === true || item.vegan === true;
};

// Filter each category to only include vegetarian or vegan items
const filteredEntreeItems = entreeItems.filter(isVegetarianOrVegan);
const filteredSideItems = sideItems.filter(isVegetarianOrVegan);
const filteredDessertItems = dessertItems.filter(isVegetarianOrVegan);
const filteredBeverageItems = beverageItems.filter(isVegetarianOrVegan);

// Combine all filtered category items into a single menuItems array
export const menuItems: MenuItem[] = [
  ...filteredEntreeItems,
  ...filteredSideItems,
  ...filteredDessertItems,
  ...filteredBeverageItems
];

// Also export the individual filtered category arrays
export {
  filteredEntreeItems as entreeItems,
  filteredSideItems as sideItems,
  filteredDessertItems as dessertItems,
  filteredBeverageItems as beverageItems
};


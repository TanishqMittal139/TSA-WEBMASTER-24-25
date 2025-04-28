
import { MenuItem } from '@/types/menu';

export const dessertItems: MenuItem[] = [
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&auto=format&fit=crop&q=60',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['chocolate', 'cake'],
    vegetarian: true,
    nutrition: {
      calories: 380,
      protein: '6g',
      carbs: '48g',
      fat: '18g',
      sodium: '220mg',
      fiber: '2g',
      sugar: '32g'
    },
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla extract'],
    preparationTime: '15-20 min',
    allergens: ['Eggs', 'Dairy', 'Wheat']
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and cocoa.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=60',
    category: 'desserts',
    cuisineType: 'italian',
    tags: ['tiramisu', 'coffee'],
    vegetarian: true,
    nutrition: {
      calories: 420,
      protein: '7g',
      carbs: '46g',
      fat: '22g',
      sodium: '180mg',
      fiber: '1g',
      sugar: '28g'
    },
    ingredients: ['Ladyfingers', 'Mascarpone cheese', 'Coffee', 'Eggs', 'Sugar', 'Cocoa powder'],
    preparationTime: '20-25 min',
    allergens: ['Eggs', 'Dairy', 'Wheat']
  },
  {
    id: '11',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream.',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=60',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['ice cream', 'vanilla'],
    vegetarian: true,
    nutrition: {
      calories: 280,
      protein: '4g',
      carbs: '28g',
      fat: '16g',
      sodium: '95mg',
      fiber: '0g',
      sugar: '24g'
    },
    ingredients: ['Cream', 'Milk', 'Sugar', 'Vanilla extract', 'Egg yolks'],
    preparationTime: '5-10 min',
    allergens: ['Dairy', 'Eggs']
  }
];
